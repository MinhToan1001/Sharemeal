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
      'E/F real Firebase: actual quantities, discrepancy ticket, once-only receipt and photo gate',
      (t) async {
    expect(const bool.fromEnvironment('ALLOW_GROUP_EF_PRODUCTION_TEST'), true);
    expect(const String.fromEnvironment('FIREBASE_EMULATOR_HOST'), '');
    const photoRequired = bool.fromEnvironment('REQUIRE_RECEIPT_PHOTO');
    final fixture = await control('/fixtures');
    expect(fixture['mode'], 'production-group-ef-fixtures-only');
    final states = <String, FirebaseAppState>{},
        controllers = <String, FigmaPrototypeController>{};
    Future<void> until(bool Function() f, String label) async {
      final end = DateTime.now().add(const Duration(seconds: 50));
      while (!f() && DateTime.now().isBefore(end)) {
        await t.pump(const Duration(milliseconds: 100));
        await Future<void>.delayed(const Duration(milliseconds: 100));
      }
      expect(f(), true, reason: label);
    }

    Future<void> stage(String name) async {
      debugPrint('LIVE E/F PASS: $name');
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
        final u = Map<String, dynamic>.from(raw as Map),
            label = u['label'] as String;
        if (label == 'other') continue;
        final app = await Firebase.initializeApp(
            name: '${fixture['prefix']}-$label',
            options: DefaultFirebaseOptions.currentPlatform);
        final s = states[label] = FirebaseAppState(FirebaseServices(app));
        controllers[label] =
            FigmaPrototypeController(frontend: s, enableTimeouts: false);
        await s.initialize();
        await s.login(u['email'] as String, u['password'] as String);
        await until(() => s.approved && !s.loading, 'login $label');
      }
      final donor = states['donor']!,
          org = states['charity']!,
          volunteer = states['volunteer']!;
      final food = (await donor.command('publishFood', {
        'name': 'DEMO E F ${fixture['prefix']}',
        'quantity': 20,
        'category': 'Rau củ',
        'storage': 'Giữ mát',
        'address': 'DEMO kiểm thử',
        'pickup': 'Trong 2 giờ',
        'safe': true,
        'photo': '',
        'note': 'DEMO sẽ xóa',
        'allergens': <String>[],
        'expiresAt': DateTime.now()
            .add(const Duration(hours: 3))
            .toUtc()
            .toIso8601String()
      }))['id'] as String;
      await control('/approve-food', {'id': food});
      Future<Map<String, dynamic>> audit(String id) =>
          control('/audit?food=$food&order=$id');
      Future<String> request(String transport) async =>
          (await org.command('requestFood', {
            'foodId': food,
            'quantity': 10,
            'transport': transport,
            'time': 'Trong 1 giờ',
            'note': 'DEMO E F'
          }))['id'] as String;
      Future<void> accept(String id) =>
          donor.command('transitionOrder', {'id': id, 'status': 'accepted'});
      // Native app SDK and deployed rules, no owner bypass for business writes.
      final delivery = await request('Nhờ giao hộ');
      await accept(delivery);
      await volunteer
          .command('transitionOrder', {'id': delivery, 'status': 'assigned'});
      final code = await donor
          .command('renewHandover', {'id': delivery, 'stage': 'pickup'});
      await volunteer.command('verifyHandover', {
        'id': delivery,
        'stage': 'pickup',
        'pin': code['pin'],
        'pickedUp': 10
      });
      await volunteer.command('verifyHandover', {
        'id': delivery,
        'stage': 'pickup',
        'pin': code['pin'],
        'pickedUp': 9
      });
      expect((await audit(delivery))['order']['qtyPickedUp'], 10,
          reason: 'PIN retry cannot rewrite actual pickup');
      await expectLater(
          org.api.call('transitionOrder', {
            'id': delivery,
            'status': 'completed',
            'received': 9,
            'note': 'Thiếu một suất'
          }),
          throwsA(anything));
      final receipt = await org
          .command('renewHandover', {'id': delivery, 'stage': 'receipt'});
      await volunteer.command('verifyHandover',
          {'id': delivery, 'stage': 'receipt', 'pin': receipt['pin']});
      await expectLater(
          org.api.call('transitionOrder',
              {'id': delivery, 'status': 'completed', 'received': 9}),
          throwsA(anything));
      await stage(
          'courier pickup quantity + PIN retry immutable + delivery PIN + discrepancy note required');
      String? photo;
      if (photoRequired) {
        await expectLater(
            org.api.call('transitionOrder', {
              'id': delivery,
              'status': 'completed',
              'received': 9,
              'note': 'Thiếu một suất'
            }),
            throwsA(anything));
        final dir = await Directory.systemTemp.createTemp('sharemeal-ef-');
        final file = File('${dir.path}/receipt.png');
        await file.writeAsBytes(base64Decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII='));
        photo = await org.api.upload(file.path, 'proof');
        await control('/media', {'url': photo});
        await file.delete();
        await dir.delete();
        final http = HttpClient();
        try {
          final r = await (await http.getUrl(Uri.parse(photo))).close();
          expect(r.statusCode, 200);
          await r.drain<void>();
        } finally {
          http.close(force: true);
        }
        await stage(
            'missing receipt photo rejected; native Cloudinary upload returns readable real image');
      }
      await until(
          () => org.rows('orders').any(
              (o) => o['id'] == delivery && o['deliveryConfirmed'] == true),
          'delivery stream');
      org.selectOrder(delivery);
      org.set('receipt.quantity', 9);
      if (photo != null) org.set('receipt.photo', photo);
      await mount('charity', '/user/organization/confirm-receipt');
      final confirm = find.text('Xác nhận đã nhận');
      await t.ensureVisible(confirm.first);
      await t.tap(confirm.first);
      await t.pumpAndSettle();
      expect(find.text('Ghi chú chênh lệch số lượng'), findsWidgets);
      await t.enterText(find.descendant(of: find.byType(AlertDialog),
          matching: find.byType(TextField)), 'DEMO thiếu một suất thực nhận');
      await t.testTextInput.receiveAction(TextInputAction.done);
      await t.pump();
      await t.tap(find.widgetWithText(FilledButton, 'Lưu'));
      await until(
          () => org
              .rows('orders')
              .any((o) => o['id'] == delivery && o['status'] == 'completed'),
          'UI completion');
      var a = await audit(delivery);
      expect(a['order']['qtyRequested'], 10);
      expect(a['order']['qtyPickedUp'], 10);
      expect(a['order']['qtyReceived'], 9);
      expect(a['order']['inventoryAdded'], true);
      expect(a['ticket']['orderId'], delivery);
      expect(a['ticket']['type'], 'quantityDiscrepancy');
      expect(a['inventory']['received'], 9);
      await Future.wait(List.generate(
          2,
          (_) => org.api.call('transitionOrder', {
                'id': delivery,
                'status': 'completed',
                'received': 9,
                'note': 'retry',
                if (photo != null) 'photo': photo
              })));
      await control('/receipt-gap', {'id': delivery});
      await org.refresh();
      expect((await audit(delivery))['inventory']['received'], 9);
      await until(
          () => org
              .rows('orders')
              .any((o) => o['id'] == delivery && o['status'] == 'completed'),
          'restart recovery');
      await org.command('distribute', {'quantity': 6});
      expect(org.warehouseBalance, 3);
      await donor.refresh();
      donor.selectOrder(delivery);
      await mount('donor', '/user/donor/order-tracking');
      expect(find.text('Đặt: 10 · Lấy: 10 · Nhận: 9'), findsOneWidget);
      await stage(
          'real UI discrepancy note, linked support, donor sees 10/10/9; duplicate/crash recovery; 20/10/9/6/3');
      final self = await request('Tự đến lấy');
      await accept(self);
      final selfCode =
          await donor.command('renewHandover', {'id': self, 'stage': 'pickup'});
      await org.command('verifyHandover', {
        'id': self,
        'stage': 'pickup',
        'pin': selfCode['pin'],
        'pickedUp': 8
      });
      if (photoRequired) {
        await expectLater(
            org.api.call('transitionOrder', {
              'id': self,
              'status': 'completed',
              'received': 8,
              'note': 'Chỉ lấy tám suất'
            }),
            throwsA(anything));
      }
      await org.command('transitionOrder', {
        'id': self,
        'status': 'completed',
        'received': 8,
        'note': 'DEMO chỉ lấy tám suất',
        if (photo != null) 'photo': photo
      });
      a = await audit(self);
      expect(a['order']['qtyPickedUp'], 8);
      expect(a['order']['qtyReceived'], 8);
      expect(a['order']['hasDiscrepancy'], true);
      expect(a['inventory']['received'], 17);
      expect(a['inventory']['distributed'], 6);
      expect(a['food']['reserved'], 20);
      await stage(
          'self pickup actual eight recorded; mismatch with requested ten opens support; no returned public stock');
      await donor.command('closeFood', {'id': food});
      expect(t.takeException(), isNull);
      await stage('ALL E/F PRODUCTION ANDROID CHECKS COMPLETE');
    } finally {
      await t.pumpWidget(const SizedBox());
      for (final s in states.values) {
        await s.logout();
      }
      for (final c in controllers.values) {
        c.dispose();
      }
      for (final s in states.values) {
        await s.services.database.goOffline();
      }
    }
  }, timeout: const Timeout(Duration(minutes: 12)));
}
