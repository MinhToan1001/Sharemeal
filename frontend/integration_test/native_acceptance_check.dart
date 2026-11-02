import 'dart:convert';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:integration_test/integration_test.dart';
import 'package:sharemeal/data/firebase/backend_api.dart';
import 'package:sharemeal/data/firebase/firebase_services.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  const host = '10.0.2.2';
  final clients = <String, (FirebaseServices, BackendApi)>{};
  Future<Map<String, dynamic>> bridge(String path,
      [Map<String, dynamic>? body]) async {
    final c = HttpClient();
    try {
      final request = await c.openUrl(
          body == null ? 'GET' : 'POST', Uri.parse('http://$host:8766$path'));
      if (body != null) {
        request.headers.contentType = ContentType.json;
        request.write(jsonEncode(body));
      }
      final response = await request.close();
      final result =
          jsonDecode(await utf8.decoder.bind(response).join()) as Map;
      expect(response.statusCode, 200, reason: '$result');
      return Map<String, dynamic>.from(result);
    } finally {
      c.close(force: true);
    }
  }

  Future<BackendApi> client(String uid, {String? name}) async {
    final key = name ?? uid;
    if (clients.containsKey(key)) return clients[key]!.$2;
    final app = await Firebase.initializeApp(
        name: 'group-b-$key',
        options: const FirebaseOptions(
            apiKey: 'fake-emulator-api-key',
            appId: '1:123:android:localdemo',
            messagingSenderId: '123',
            projectId: 'demo-sharemeal-b',
            databaseURL:
                'https://demo-sharemeal-b-default-rtdb.firebaseio.com'));
    final s = FirebaseServices(app,
        databaseUrl: 'https://demo-sharemeal-b-default-rtdb.firebaseio.com');
    await s.auth.useAuthEmulator(host, 9099);
    s.database.useDatabaseEmulator(host, 9000);
    await s.auth.signInWithEmailAndPassword(
        email: '$uid@example.test', password: 'Local-demo-only-123!');
    final api = BackendApi(s);
    clients[key] = (s, api);
    return api;
  }

  Map<String, dynamic> order(String id,
          {String status = 'awaiting', String transport = 'Nhờ giao hộ'}) =>
      {
        'id': id,
        'foodId': 'food',
        'donorId': 'donor',
        'organizationId': 'charity',
        'organization': 'charity',
        'quantity': 10,
        'status': status,
        'transport': transport,
        'driver': '',
        'time': '19:00',
        'received': 0,
        'createdAt': '2026-11-01',
      };
  Future<void> seed(Map<String, dynamic> p) => bridge('/seed', p);
  Future<Map<String, dynamic>> state() => bridge('/state');
  setUpAll(() async {
    await seed({});
  });
  tearDownAll(() async {
    for (final pair in clients.values) {
      pair.$2.close();
      await pair.$1.database.goOffline();
      await pair.$1.auth.signOut();
    }
    await bridge('/cleanup', {});
  });

  testWidgets(
      'native charity request -> donor taps Accept -> accepted snapshot, three photos, no double reserve',
      (t) async {
    await seed({
      'food': {
        'quantity': 19,
        'photos': [
          'https://res.cloudinary.com/toanvip/image/upload/native-fixture-1.png',
          'https://res.cloudinary.com/toanvip/image/upload/native-fixture-2.png',
          'https://res.cloudinary.com/toanvip/image/upload/native-fixture-3.png'
        ],
        'allergens': ['Trứng', 'Đậu phộng']
      }
    });
    final charity = await client('charity'), donor = await client('donor');
    final response = await charity.call('requestFood', {
      'foodId': 'food',
      'quantity': 8,
      'transport': 'Nhờ giao hộ',
      'time': '22:00',
      'note': 'Fixture cục bộ'
    });
    final id = response['result']['id'] as String;
    final s = FirebaseAppState(clients['donor']!.$1);
    s.applyView((await donor.call('refresh'))['view']);
    final controller =
        FigmaPrototypeController(frontend: s, enableTimeouts: false);
    await t.pumpWidget(ShareMealApp(
        prototype: controller, initialRoute: '/user/donor/incoming-requests'));
    await t.pumpAndSettle();
    expect(find.text('Xin nhận 8 suất'), findsOneWidget);
    await t.tap(find.widgetWithText(FilledButton, 'Chấp nhận'));
    for (var i = 0; i < 100; i++) {
      await t.pump(const Duration(milliseconds: 100));
      await Future<void>.delayed(const Duration(milliseconds: 100));
      if (!s.busy &&
          s.orders.any((o) => o.id == id && o.status == 'accepted')) {
        break;
      }
    }
    await t.pumpAndSettle();
    expect(s.orders.singleWhere((o) => o.id == id).status, 'accepted');
    expect(find.textContaining('Đã chấp nhận yêu cầu'), findsOneWidget);
    expect(find.textContaining('Firebase từ chối'), findsNothing);
    var live = await state();
    expect(live['demo']['foods']['food']['reserved'], 8);
    expect(live['demo']['foods']['food']['photos'].length, 3);
    final organization = await charity.snapshot();
    expect(
        (organization['orders'] as List)
            .singleWhere((o) => o['id'] == id)['status'],
        'accepted');
    await donor.call('transitionOrder', {'id': id, 'status': 'accepted'});
    await donor.call('transitionOrder', {'id': id, 'status': 'accepted'});
    live = await state();
    expect(live['demo']['foods']['food']['reserved'], 8);
    expect(t.takeException(), isNull);
    await t.pumpWidget(const SizedBox());
    controller.dispose();
  });
  testWidgets(
      'native expired request reports expiry before persisting reservation intent',
      (t) async {
    await seed({
      'food': {
        'expiresAtMs': DateTime.now()
            .subtract(const Duration(hours: 1))
            .millisecondsSinceEpoch
      },
      'orders': {'expired': order('expired')}
    });
    final donor = await client('donor');
    await expectLater(
        donor.call('transitionOrder', {'id': 'expired', 'status': 'accepted'}),
        throwsA(isA<StateError>()
            .having((e) => e.message, 'message', contains('hết hạn'))));
    final live = await state();
    expect(live['demo']['orders']['expired']['stockState'], isNull);
    expect(live['demo']['foods']['food']['reserved'], 0);
  });
}
