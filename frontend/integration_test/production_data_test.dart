import 'dart:convert';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/data/firebase/firebase_services.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/firebase_options.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';

Future<Map<String, dynamic>> control(String path,
    [Map<String, dynamic>? body]) async {
  final http = HttpClient();
  try {
    final url = Uri.parse('http://10.0.2.2:8766$path');
    final req = body == null ? await http.getUrl(url) : await http.postUrl(url);
    if (body != null) {
      req.headers.contentType = ContentType.json;
      req.write(jsonEncode(body));
    }
    final response = await req.close();
    final result = Map<String, dynamic>.from(
        jsonDecode(await utf8.decoder.bind(response).join()) as Map);
    if (response.statusCode != 200) throw StateError('$path: $result');
    return result;
  } finally {
    http.close(force: true);
  }
}

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  testWidgets(
      'Android: food is read from production Firebase and reacts to remote changes',
      (tester) async {
    expect(const String.fromEnvironment('FIREBASE_EMULATOR_HOST'), '');
    final fixtures = await control('/fixtures');
    expect(fixtures['mode'], 'production-synthetic-only');
    final states = <String, FirebaseAppState>{},
        controllers = <String, FigmaPrototypeController>{};
    final apps = <FirebaseApp>[];
    Future<void> until(bool Function() check, String label) async {
      final deadline = DateTime.now().add(const Duration(seconds: 45));
      while (!check() && DateTime.now().isBefore(deadline)) {
        await tester.pump(const Duration(milliseconds: 100));
        await Future<void>.delayed(const Duration(milliseconds: 100));
      }
      expect(check(), isTrue,
          reason: '$label | ${states.map((k, s) => MapEntry(k, s.error))}');
    }

    Future<void> mount(String role, String route) async {
      await tester.pumpWidget(ShareMealApp(
          key: UniqueKey(), prototype: controllers[role], initialRoute: route));
      await tester.pump(const Duration(milliseconds: 350));
      expect(tester.takeException(), isNull);
    }

    Future<void> stage(String name) async {
      debugPrint('PRODUCTION PASS: $name');
      await control('/stage', {'name': name});
    }

    try {
      for (final raw in fixtures['users'] as List) {
        final user = Map<String, dynamic>.from(raw as Map),
            role = user['role'] as String;
        final app = await Firebase.initializeApp(
            name: 'live-$role',
            options: DefaultFirebaseOptions.currentPlatform);
        expect(app.options.projectId, 'sharemeal-e17c9');
        apps.add(app);
        final state = states[role] = FirebaseAppState(FirebaseServices(app));
        controllers[role] =
            FigmaPrototypeController(frontend: state, enableTimeouts: false);
        await state.initialize();
        if (role == 'charity') {
          await until(() => !state.loading, 'signed-out UI ready');
          await mount(role, '/auth/login');
          await tester.enterText(
              find.byKey(
                  const ValueKey('input/auth.login.email.hoac.so.dien.thoai')),
              user['email'] as String);
          await tester.enterText(
              find.byKey(const ValueKey('input/auth.login.mat.khau')),
              user['password'] as String);
          await tester.testTextInput.receiveAction(TextInputAction.done);
          await tester.pumpAndSettle();
          await tester.tap(find.text('Đăng nhập').last);
          await until(() => state.role == 'charity' && !state.loading,
              'login UI authenticates with production Firebase');
        } else {
          await state.login(
              user['email'] as String, user['password'] as String);
        }
        await until(() => state.approved, 'fixture role loaded');
      }
      final donor = states['donor']!, charity = states['charity']!;
      await stage('native Firebase production auth + actual login button');
      final payload = <String, dynamic>{
        'name': 'DEMO Firebase thật ${fixtures['run']}',
        'quantity': 6,
        'category': 'Rau củ',
        'storage': 'Giữ mát',
        'address': 'DEMO điểm lấy',
        'pickup': 'Trong 1 giờ',
        'allergens': <String>[],
        'photo': fixtures['photo'],
        'note': 'Synthetic Android integration fixture',
        'safe': true,
        'expiresAt': DateTime.now()
            .add(const Duration(hours: 2))
            .toUtc()
            .toIso8601String()
      };
      final foodId =
          (await donor.command('publishFood', payload))['id'] as String;
      await mount('charity', '/user/organization/food-discovery');
      expect(find.textContaining(payload['name'] as String), findsNothing);
      await control('/approve-test-food', {'id': foodId});
      await until(
          () => find
              .textContaining(payload['name'] as String)
              .evaluate()
              .isNotEmpty,
          'real Firebase approved food appears without refresh');
      expect(charity.foods.singleWhere((f) => f.id == foodId).photo,
          fixtures['photo']);
      await until(
          () => tester
              .widgetList<RawImage>(find.byType(RawImage))
              .any((w) => w.image != null),
          'Cloudinary image actually decodes on Android');
      await stage('REAL DATABASE FOOD VISIBLE ON ANDROID');
      // Short pause allows an external window capture of the actual data screen.
      await Future<void>.delayed(const Duration(seconds: 30));
      await tester.pump();
      final name = 'DEMO Firebase thật đã sửa ${fixtures['run']}';
      await donor.command('editFood', {...payload, 'id': foodId, 'name': name});
      await until(
          () =>
              find.textContaining(payload['name'] as String).evaluate().isEmpty,
          'pending edit disappears from actual screen');
      await control('/approve-test-food', {'id': foodId});
      await until(() => find.textContaining(name).evaluate().isNotEmpty,
          'renamed real Firebase row updates visible screen');
      final audit = await control('/audit');
      expect((audit['foods'] as List).single['name'], name);
      await stage(
          'server readback equals UI + realtime edits + pending moderation');
      final orderId = (await charity.command('requestFood', {
        'foodId': foodId,
        'quantity': 2,
        'transport': 'Tự đến lấy',
        'time': 'DEMO 19:30',
        'note': 'DEMO self pickup'
      }))['id'];
      await donor
          .command('transitionOrder', {'id': orderId, 'status': 'accepted'});
      await until(
          () => charity.foods.singleWhere((f) => f.id == foodId).quantity == 4,
          'real reservation updates quantity');
      final pin = await donor
          .command('renewHandover', {'id': orderId, 'stage': 'pickup'});
      await charity.command('verifyHandover',
          {'id': orderId, 'stage': 'pickup', 'pin': pin['pin']});
      await charity.command('transitionOrder',
          {'id': orderId, 'status': 'completed', 'received': 2});
      expect(charity.warehouseBalance, 2);
      await charity.command('saveReview', {
        'orderId': orderId,
        'rating': 5,
        'note': 'DEMO đánh giá production'
      });
      await until(
          () => donor.rows('reviews').any((r) => r['orderId'] == orderId),
          'real review listener');
      await donor.command('closeFood', {'id': foodId});
      await until(() => find.textContaining(name).evaluate().isEmpty,
          'closed real food hidden');
      await stage(
          'production Rules + self pickup PIN + inventory + review + closed listing');
      expect(tester.takeException(), isNull);
    } finally {
      await tester.pumpWidget(const SizedBox());
      for (final state in states.values) {
        await state.logout();
      }
      for (final controller in controllers.values) {
        controller.dispose();
      }
      for (final app in apps) {
        await app.delete();
      }
    }
  }, timeout: const Timeout(Duration(minutes: 8)));
}
