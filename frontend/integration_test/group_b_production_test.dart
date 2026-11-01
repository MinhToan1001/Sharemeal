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

// Requires explicit CLI opt-in and a fixture-scoped localhost bridge.
Future<Map<String, dynamic>> control(String path,
    [Map<String, dynamic>? body]) async {
  final http = HttpClient();
  try {
    final u = Uri.parse('http://10.0.2.2:8766$path');
    final request = await http.openUrl(body == null ? 'GET' : 'POST', u);
    if (body != null) {
      request.headers.contentType = ContentType.json;
      request.write(jsonEncode(body));
    }
    final response = await request.close();
    final data = Map<String, dynamic>.from(
        jsonDecode(await utf8.decoder.bind(response).join()) as Map);
    if (response.statusCode != 200) throw StateError('$path: ${data['error']}');
    return data;
  } finally {
    http.close(force: true);
  }
}

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  testWidgets(
      'Group B: real Firebase Android stock, cancellation, admin rules and inventory',
      (t) async {
    expect(const bool.fromEnvironment('ALLOW_GROUP_B_PRODUCTION_TEST'), true);
    expect(const String.fromEnvironment('FIREBASE_EMULATOR_HOST'), '');
    final fixture = await control('/fixtures');
    expect(fixture['mode'], 'production-group-b-fixtures-only');
    expect(fixture['projectId'], 'sharemeal-e17c9');
    final states = <String, FirebaseAppState>{},
        controllers = <String, FigmaPrototypeController>{};
    Future<void> until(bool Function() check, String label) async {
      final deadline = DateTime.now().add(const Duration(seconds: 50));
      while (!check() && DateTime.now().isBefore(deadline)) {
        await t.pump(const Duration(milliseconds: 100));
        await Future<void>.delayed(const Duration(milliseconds: 100));
      }
      expect(check(), true, reason: label);
    }

    Future<void> stage(String name) async {
      debugPrint('LIVE GROUP B PASS: $name');
      await control('/stage', {'name': name});
    }

    Future<void> mount(String who, String route) async {
      await t.pumpWidget(ShareMealApp(
          key: UniqueKey(), prototype: controllers[who], initialRoute: route));
      await t.pump(const Duration(milliseconds: 350));
      expect(t.takeException(), isNull);
    }

    try {
      for (final raw in fixture['users'] as List) {
        final user = Map<String, dynamic>.from(raw as Map),
            label = user['label'] as String;
        expect(
            (user['uid'] as String).startsWith('${fixture['prefix']}-'), true);
        final app = await Firebase.initializeApp(
            name: '${fixture['prefix']}-$label',
            options: DefaultFirebaseOptions.currentPlatform);
        expect(app.options.projectId, 'sharemeal-e17c9');
        final state = states[label] = FirebaseAppState(FirebaseServices(app));
        controllers[label] =
            FigmaPrototypeController(frontend: state, enableTimeouts: false);
        await state.initialize();
        await state.login(user['email'] as String, user['password'] as String);
        await until(() => state.approved && !state.loading,
            'production profile $label');
      }
      final donor = states['donor']!,
          charity = states['charity']!,
          volunteer = states['volunteer']!,
          other = states['other']!;
      await stage(
          'native production Authentication for fixture donor, charity and volunteer');
      final name = 'DEMO KHONG DAT - Group B ${fixture['prefix']}';
      final food = (await donor.command('publishFood', {
        'name': name,
        'quantity': 20,
        'category': 'Rau củ',
        'storage': 'Giữ mát',
        'address': 'DEMO kiểm thử tự động',
        'pickup': 'Trong 2 giờ',
        'allergens': <String>[],
        'photo': '',
        'safe': true,
        'note': 'DEMO Group B - dữ liệu tạm sẽ được xóa',
        'expiresAt': DateTime.now()
            .add(const Duration(hours: 3))
            .toUtc()
            .toIso8601String(),
      }))['id'] as String;
      await mount('charity', '/user/organization/food-discovery');
      expect(find.textContaining(name), findsNothing);
      await control('/approve-food', {'id': food});
      await until(() => find.textContaining(name).evaluate().isNotEmpty,
          'real approved food visible on Android');
      await stage(
          'pending hidden; singleton admin rule context approves; live food UI updates');
      Future<String> request(FirebaseAppState s, int qty,
              [String mode = 'Nhờ giao hộ']) async =>
          (await s.command('requestFood', {
            'foodId': food,
            'quantity': qty,
            'transport': mode,
            'time': 'Trong 1 giờ',
            'note': 'DEMO Group B'
          }))['id'] as String;
      Future<void> cancel(FirebaseAppState s, String id) => s.api.call(
          'transitionOrder',
          {'id': id, 'status': 'cancelled', 'reason': 'DEMO Group B hủy thử'});
      Future<Map<String, dynamic>> audit([String? order]) =>
          control('/audit?food=$food${order == null ? '' : '&order=$order'}');
      final first = await request(charity, 12),
          second = await request(other, 12);
      final results = await Future.wait([first, second].map((id) async {
        try {
          await donor.api
              .call('transitionOrder', {'id': id, 'status': 'accepted'});
          return true;
        } catch (_) {
          return false;
        }
      }));
      expect(results.where((v) => v).length, 1,
          reason: 'No overselling on real RTDB');
      final winner = results[0] ? first : second,
          loser = results[0] ? second : first;
      expect((await audit())['food']['reserved'], 12);
      await cancel(donor, winner);
      await donor
          .command('transitionOrder', {'id': loser, 'status': 'rejected'});
      expect((await audit())['food']['reserved'], 0);
      await stage(
          'concurrent real reservations cannot oversell; cancellation restores all 20');
      final delivery = await request(charity, 10);
      await donor
          .command('transitionOrder', {'id': delivery, 'status': 'accepted'});
      await volunteer
          .command('transitionOrder', {'id': delivery, 'status': 'assigned'});
      final pin = await donor
          .command('renewHandover', {'id': delivery, 'stage': 'pickup'});
      await until(
          () => charity
              .rows('orders')
              .any((o) => o['id'] == delivery && o['status'] == 'assigned'),
          'assigned stream');
      charity.selectOrder(delivery);
      await mount('charity', '/user/organization/order-tracking');
      final button = find.widgetWithText(OutlinedButton, 'Hủy đơn');
      await t.scrollUntilVisible(button, 180,
          scrollable: find.byType(Scrollable).first, maxScrolls: 15);
      await t.tap(button);
      await t.pumpAndSettle();
      await t.enterText(
          find.byType(TextField), 'DEMO hủy từ giao diện Android');
      await t.testTextInput.receiveAction(TextInputAction.done);
      await t.pump();
      await t.tap(find.widgetWithText(FilledButton, 'Lưu'));
      await until(
          () => charity
              .rows('orders')
              .any((o) => o['id'] == delivery && o['stockReleased'] == true),
          'UI cancellation commits');
      final cancelled = (await audit(delivery))['order'];
      expect(cancelled['cancelReason'], 'DEMO hủy từ giao diện Android');
      expect(cancelled['volunteerId'], isNull);
      expect(cancelled['driver'], '');
      expect((await audit())['food']['reserved'], 0);
      await expectLater(
          volunteer.api.call('verifyHandover',
              {'id': delivery, 'stage': 'pickup', 'pin': pin['pin']}),
          throwsA(anything));
      await cancel(charity, delivery);
      expect((await audit())['food']['reserved'], 0);
      await control('/simulate-finalization-gap', {'id': delivery});
      await charity.refresh();
      expect((await audit(delivery))['order']['stockReleased'], true);
      expect((await audit())['food']['reserved'], 0);
      await stage(
          'actual cancel button + reason + courier detached + PIN invalid + retry/crash recovery once');
      final adminOrder = await request(charity, 10, 'Tự đến lấy');
      await donor
          .command('transitionOrder', {'id': adminOrder, 'status': 'accepted'});
      await control('/admin-cancel', {'id': adminOrder});
      expect((await audit(adminOrder))['order']['status'], 'cancelled');
      expect((await audit())['food']['reserved'], 0);
      await stage(
          'existing singleton admin cancels fixture through deployed rules; no admin profile changes');
      final pickup = await request(charity, 10, 'Tự đến lấy');
      await donor
          .command('transitionOrder', {'id': pickup, 'status': 'accepted'});
      final code = await donor
          .command('renewHandover', {'id': pickup, 'stage': 'pickup'});
      await charity.command('verifyHandover',
          {'id': pickup, 'stage': 'pickup', 'pin': code['pin']});
      await expectLater(cancel(donor, pickup), throwsA(anything));
      await expectLater(cancel(charity, pickup), throwsA(anything));
      expect((await control('/admin-deny-cancel', {'id': pickup}))['denied'],
          true);
      await charity.command('transitionOrder',
          {'id': pickup, 'status': 'completed', 'received': 9});
      await charity.command('distribute', {'quantity': 6});
      expect(charity.warehouseBalance, 3);
      expect((await audit())['food']['reserved'], 10);
      await stage(
          'after pickedUp cancellation denied including admin; 20/10/9/6/3 confirmed on real Firebase');
      await donor.command('closeFood', {'id': food});
      expect(t.takeException(), isNull);
      await stage('ALL GROUP B PRODUCTION ANDROID CHECKS COMPLETE');
    } finally {
      await t.pumpWidget(const SizedBox());
      for (final state in states.values) {
        await state.logout();
      }
      for (final controller in controllers.values) {
        controller.dispose();
      }
      for (final state in states.values) {
        await state.services.database.goOffline();
      }
    }
  }, timeout: const Timeout(Duration(minutes: 12)));
}
