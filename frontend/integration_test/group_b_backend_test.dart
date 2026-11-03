import 'dart:convert';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:sharemeal_client/sharemeal_client.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  const host = '10.0.2.2';
  final clients = <String, (FirebaseServices, ShareMealClient)>{};
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

  Future<ShareMealClient> client(String uid, {String? name}) async {
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
    final api = ShareMealClient(s);
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
  Future<void> cancel(ShareMealClient api, String id) => api.call('transitionOrder',
      {'id': id, 'status': 'cancelled', 'reason': 'Kiểm thử hủy'});
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
      'native reserve/cancel retries and parallel cancellation keep stock correct',
      (t) async {
    await seed({
      'orders': {'order': order('order')}
    });
    final donor = await client('donor'), charity = await client('charity');
    await donor.call('transitionOrder', {'id': 'order', 'status': 'accepted'});
    expect((await state())['demo']['foods']['food']['reserved'], 10);
    await Future.wait([cancel(donor, 'order'), cancel(charity, 'order')]);
    await cancel(charity, 'order');
    final data = await state(), o = data['demo']['orders']['order'];
    expect(data['demo']['foods']['food']['reserved'], 0);
    expect(o['stockReleased'], true);
    expect(o['cancelReason'], 'Kiểm thử hủy');
  });
  testWidgets(
      'same native Firebase client serializes reservations for different orders',
      (t) async {
    await seed({
      'orders': {'one': order('one'), 'two': order('two')}
    });
    final donor = await client('donor');
    await Future.wait([
      donor.call('transitionOrder', {'id': 'one', 'status': 'accepted'}),
      donor.call('transitionOrder', {'id': 'two', 'status': 'accepted'}),
    ]);
    expect((await state())['demo']['foods']['food']['reserved'], 20);
  });
  testWidgets(
      'legacy assigned cancellation detaches volunteer and invalidates PIN',
      (t) async {
    final o = {
      ...order('order', status: 'assigned'),
      'volunteerId': 'volunteer',
      'driver': 'Volunteer'
    };
    await seed({
      'reserved': 10,
      'orders': {'order': o}
    });
    final donor = await client('donor');
    final code =
        await donor.call('renewHandover', {'id': 'order', 'stage': 'pickup'});
    expect(code['result']['pin'], isNotEmpty);
    final volunteer = await client('volunteer');
    await cancel(await client('admin'), 'order');
    final data = await state();
    expect(data['demo']['orders']['order']['volunteerId'], isNull);
    expect(data['demo']['foods']['food']['reserved'], 0);
    await expectLater(
        volunteer.call('verifyHandover',
            {'id': 'order', 'stage': 'pickup', 'pin': code['result']['pin']}),
        throwsA(anything));
    expect((await volunteer.snapshot())['orders'], isEmpty);
  });
  testWidgets(
      'reload recovers both cancellation crash windows and reserve intent',
      (t) async {
    final donor = await client('donor'), charity = await client('charity');
    for (final stockCommitted in [false, true]) {
      final o = {
        ...order('order', status: 'cancelled'),
        'cancelledBy': 'charity',
        'cancelReason': 'Mất mạng',
        'cancelledAt': '2026-11-01',
        'cancelHadStock': true,
        'stockState': 'releasePending',
        'stockReleased': false
      };
      await seed({
        'reserved': stockCommitted ? 0 : 10,
        'food': {if (stockCommitted) 'stockJournal': '|order:R|'},
        'orders': {'order': o}
      });
      await charity.call('refresh');
      final data = await state();
      expect(data['demo']['foods']['food']['reserved'], 0);
      expect(data['demo']['orders']['order']['stockReleased'], true);
    }
    await seed({
      'reserved': 10,
      'food': {'stockJournal': '|order:H|'},
      'orders': {
        'order': {...order('order'), 'stockState': 'reserving'}
      }
    });
    await donor.call('refresh');
    expect((await state())['demo']['orders']['order']['status'], 'accepted');
    await cancel(charity, 'order');
    expect((await state())['demo']['foods']['food']['reserved'], 0);
  });
  testWidgets(
      'legacy closed-food cancellation and already cancelled records stay compatible',
      (t) async {
    await seed({
      'reserved': 10,
      'food': {'status': 'closed'},
      'orders': {'order': order('order', status: 'accepted')}
    });
    final charity = await client('charity');
    await cancel(charity, 'order');
    expect((await state())['demo']['foods']['food']['reserved'], 0);
    await seed({
      'orders': {'order': order('order', status: 'cancelled')}
    });
    await cancel(charity, 'order');
    final data = await state();
    expect(data['demo']['foods']['food']['reserved'], 0);
    expect(data['demo']['foods']['food']['stockJournal'], isNull);
  });
  testWidgets(
      'real admin snapshots can reopen and review each pending record type',
      (t) async {
    const document =
        'https://res.cloudinary.com/toanvip/image/upload/local-fixture-not-uploaded.png';
    final applications = <String, dynamic>{};
    for (final uid in ['donor', 'charity', 'volunteer']) {
      applications[uid] = {
        'id': uid,
        'uid': uid,
        'role': uid,
        'name': uid,
        'details': '{}',
        'documents': [document],
        'status': 'pending',
        'createdAt': '2026-11-01'
      };
    }
    await seed({
      'food': {'status': 'pending'},
      'demo': {
        'applications': applications,
        'needs': {
          'need': {
            'id': 'need',
            'uid': 'charity',
            'title': 'Demo need',
            'quantity': 4,
            'category': 'Cơm',
            'status': 'pending',
            'createdAt': '2026-11-01'
          }
        },
      }
    });
    final admin = await client('admin');
    for (final choice in [
      ('applications', 'donor', 'reviewApplication', 'approved'),
      ('applications', 'charity', 'reviewApplication', 'rejected'),
      ('applications', 'volunteer', 'reviewApplication', 'supplement'),
      ('foods', 'food', 'reviewFood', 'open'),
      ('needs', 'need', 'reviewNeed', 'rejected'),
    ]) {
      await admin.call('refresh');
      final reopened = await admin.snapshot();
      expect(
          (reopened[choice.$1] as List)
              .where((r) => r['id'] == choice.$2)
              .single['status'],
          'pending');
      await admin.call(choice.$3, {
        'id': choice.$2,
        'status': choice.$4,
        'note': 'Đã đối chiếu sau khi mở lại'
      });
      expect(
          (await state())['demo'][choice.$1][choice.$2]['status'], choice.$4);
    }
  });
  testWidgets(
      'all roles blocked after pickup; original 20/10/9/6/3 flow still works',
      (t) async {
    await seed({
      'reserved': 10,
      'orders': {
        'order': order('order', status: 'pickedUp', transport: 'Tự đến lấy')
      }
    });
    for (final uid in ['donor', 'charity', 'admin']) {
      await expectLater(cancel(await client(uid), 'order'), throwsA(anything));
    }
    final charity = await client('charity');
    await charity.call('transitionOrder',
        {'id': 'order', 'status': 'completed', 'received': 9});
    await charity.call('distribute', {'quantity': 6});
    final inv = (await state())['demo']['inventory']['charity'];
    expect(inv['received'], 9);
    expect(inv['distributed'], 6);
    expect(inv['received'] - inv['distributed'], 3);
    await expectLater(
        cancel(await client('admin'), 'order'), throwsA(anything));
  });
}
