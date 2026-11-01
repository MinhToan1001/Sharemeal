import 'dart:convert';
import 'dart:io';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/data/firebase/firebase_services.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/firebase_options.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';

const bridgeUrl = 'http://10.0.2.2:8765';
Future<Map<String, dynamic>> bridge(String path,
    [Map<String, dynamic>? body]) async {
  final http = HttpClient();
  try {
    final req = body == null
        ? await http.getUrl(Uri.parse('$bridgeUrl$path'))
        : await http.postUrl(Uri.parse('$bridgeUrl$path'));
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
      'Android: direct Firebase roles, live food UI, approvals, delivery and stock',
      (tester) async {
    expect(const String.fromEnvironment('FIREBASE_EMULATOR_HOST'), '10.0.2.2',
        reason: 'This test must never change production users or roles.');
    expect((await bridge('/health'))['mode'], 'emulator');
    await bridge('/reset', {});
    final states = <String, FirebaseAppState>{};
    final controllers = <String, FigmaPrototypeController>{};
    final apps = <FirebaseApp>[];
    final run = DateTime.now().millisecondsSinceEpoch;
    const password = 'ShareMeal-Test-2026!';

    Future<void> until(bool Function() check, String label) async {
      final deadline = DateTime.now().add(const Duration(seconds: 35));
      while (!check() && DateTime.now().isBefore(deadline)) {
        await tester.pump(const Duration(milliseconds: 100));
        await Future<void>.delayed(const Duration(milliseconds: 100));
      }
      expect(check(), isTrue,
          reason: '$label | ${states.map((k, s) => MapEntry(k, s.error))}');
    }

    Future<void> stage(String name) async {
      debugPrint('PASS STAGE: $name');
      await bridge('/stage', {'name': name});
    }

    Future<void> mount(String who, String route) async {
      await tester.pumpWidget(ShareMealApp(
          key: UniqueKey(), prototype: controllers[who], initialRoute: route));
      await tester.pump(const Duration(milliseconds: 300));
      expect(tester.takeException(), isNull, reason: 'Widget route $route');
    }

    Future<FirebaseAppState> signup(String who) async {
      final app = await Firebase.initializeApp(
          name: 'e2e-$who-$run',
          options: DefaultFirebaseOptions.currentPlatform);
      apps.add(app);
      final state = states[who] = FirebaseAppState(FirebaseServices(app));
      controllers[who] =
          FigmaPrototypeController(frontend: state, enableTimeouts: false);
      await state.initialize();
      await state.register('$who-$run@example.invalid', password, 'DEMO $who');
      await until(() => state.profile.isNotEmpty, 'registered $who');
      expect(state.verified, isFalse);
      final codes = (await bridge(
              '/oob?email=${Uri.encodeQueryComponent(state.user!.email!)}'))[
          'codes'] as List;
      final verification = codes.lastWhere((c) => c['type'] == 'VERIFY_EMAIL');
      await state.services.auth.applyActionCode(verification['code'] as String);
      await state.confirmEmailVerification();
      expect(state.verified, isTrue);
      return state;
    }

    try {
      final admin = await signup('admin');
      await bridge('/console-admin', {'uid': admin.user!.uid});
      await admin.refresh();
      expect(admin.role, 'admin');
      final donor = await signup('donor');
      final charity = await signup('charity');
      final volunteer = await signup('volunteer');
      final charity2 = await signup('charity2');
      await stage(
          'register + native email link verification + singleton admin');

      final image = await rootBundle.load('assets/images/food/vegetables.png');
      final file = File(
          '${(await getTemporaryDirectory()).path}/sharemeal-e2e-$run.png');
      await file.writeAsBytes(
          image.buffer.asUint8List(image.offsetInBytes, image.lengthInBytes));
      final photo = await donor.api.upload(file.path, 'food');
      expect(photo, startsWith('https://res.cloudinary.com/toanvip/'));
      await bridge('/record-media', {'url': photo});
      await file.delete();
      await stage('real Cloudinary multipart image upload');

      Future<String> application(FirebaseAppState state, String role) async {
        if (state.role.isEmpty) {
          await state.command('selectRole', {'role': role});
        }
        final result = await state.command('submitApplication', {
          'role': role,
          'documents': [photo],
          'details': 'DEMO contact and verification document',
          'consent': true
        });
        return result['id'] as String;
      }

      Future<void> approve(FirebaseAppState state, String role) async {
        final id = await application(state, role);
        await admin.command('reviewApplication',
            {'id': id, 'status': 'approved', 'note': 'DEMO approved'});
        await until(() => state.approved && state.role == role,
            'live application approval $role');
      }

      await donor.command('selectRole', {'role': 'donor'});
      donor.set('individual_verification.file.giay.to.tuy.than.cccd.giay.t',
          {'name': 'DEMO.png', 'path': photo});
      donor.set('verification.individual.consent', true);
      donor.set('profile.address', 'DEMO địa chỉ người cho');
      await mount('donor', '/user/donor/individual-verification');
      final submitApplication = find.text('Gửi hồ sơ cá nhân');
      await tester.scrollUntilVisible(submitApplication, 200,
          scrollable: find.byType(Scrollable).first, maxScrolls: 8);
      await tester.tap(submitApplication);
      await until(() => donor.profile['verificationStatus'] == 'pending',
          'original onboarding form submits real application');
      final donorApplication = '${donor.profile['applicationId']}';
      await expectLater(
          donor.services.database
              .ref('users/${donor.user!.uid}/role')
              .set('admin'),
          throwsA(isA<FirebaseException>()));
      await expectLater(
          charity.services.database
              .ref('demo/applications/$donorApplication')
              .get(),
          throwsA(isA<FirebaseException>()));
      await admin.command('reviewApplication', {
        'id': donorApplication,
        'status': 'supplement',
        'note': 'DEMO add document'
      });
      await until(() => donor.profile['verificationStatus'] == 'supplement',
          'supplement arrives');
      await approve(donor, 'donor');
      final charityApplication = await application(charity, 'charity');
      await admin.command('reviewApplication', {
        'id': charityApplication,
        'status': 'rejected',
        'note': 'DEMO reject'
      });
      await until(() => charity.profile['verificationStatus'] == 'rejected',
          'rejection arrives');
      await approve(charity, 'charity');
      await approve(volunteer, 'volunteer');
      await approve(charity2, 'charity');
      await stage(
          'private documents + block self admin + supplement/reject/approve all user roles');

      final foodPayload = <String, dynamic>{
        'name': 'DEMO Firebase rau $run',
        'quantity': 10,
        'category': 'Rau củ',
        'storage': 'Giữ mát',
        'address': 'DEMO điểm lấy thực phẩm',
        'pickup': 'Trong 2 giờ',
        'allergens': <String>[],
        'note': 'Android integration test',
        'photo': photo,
        'expiresAt': DateTime.now()
            .add(const Duration(hours: 3))
            .toUtc()
            .toIso8601String(),
        'safe': true
      };
      final foodId =
          (await donor.command('publishFood', foodPayload))['id'] as String;
      await until(() => admin.foods.any((f) => f.id == foodId),
          'admin sees pending food');
      await mount('charity', '/user/organization/food-discovery');
      expect(find.textContaining(foodPayload['name'] as String), findsNothing);
      expect(find.textContaining('Bếp Nhà Lan'), findsNothing);
      await mount('admin', '/admin/approval-queue');
      expect(
          find.textContaining(foodPayload['name'] as String), findsOneWidget);
      await tester.tap(find.text('Mở hồ sơ xét duyệt').first);
      await tester.pumpAndSettle();
      for (var i = 0; i < 3; i++) {
        final check = find.byKey(ValueKey('review/check/$i'));
        await tester.scrollUntilVisible(check, 200,
            scrollable: find.byType(Scrollable).first, maxScrolls: 12);
        await tester.tap(check);
        await tester.pump();
      }
      final approveButton = find.text('Phê duyệt món ăn');
      await tester.scrollUntilVisible(approveButton, 200,
          scrollable: find.byType(Scrollable).first, maxScrolls: 12);
      await tester.tap(approveButton);
      await until(() => charity.foods.any((f) => f.id == foodId),
          'admin button approval streams to charity');
      await mount('charity', '/user/organization/food-discovery');
      expect(
          find.textContaining(foodPayload['name'] as String), findsOneWidget);
      final renamed = 'DEMO Firebase cập nhật $run';
      donor.selectFood(foodId);
      await mount('donor', '/user/donor/edit-listing');
      for (final field in {
        'edit.name': renamed,
        'edit.from': '18:10',
        'edit.to': '20:20'
      }.entries) {
        final input = find.byKey(ValueKey('input/${field.key}'));
        await tester.ensureVisible(input);
        await tester.enterText(input, field.value);
      }
      await tester.testTextInput.receiveAction(TextInputAction.done);
      await tester.pumpAndSettle();
      final save = find.text('Lưu và thông báo');
      await tester.scrollUntilVisible(save, 200,
          scrollable: find.byType(Scrollable).first, maxScrolls: 10);
      await tester.tap(save);
      await until(() => charity.foods.every((f) => f.id != foodId),
          'edit returns to pending and disappears without refresh');
      await until(
          () => donor
              .rows('foods')
              .any((f) => f['id'] == foodId && f['pickup'] == '18:10–20:20'),
          'donor receives the committed edit snapshot');
      expect(
          donor.rows('foods').singleWhere((f) => f['id'] == foodId)['pickup'],
          '18:10–20:20');
      expect(donor.rows('foods').singleWhere((f) => f['id'] == foodId)['note'],
          'Android integration test');
      await mount('charity', '/user/organization/food-discovery');
      await admin.command('reviewFood', {
        'id': foodId,
        'status': 'open',
        'note': 'DEMO edited food approved'
      });
      await until(() => find.textContaining(renamed).evaluate().isNotEmpty,
          'visible screen automatically receives renamed Firebase record');
      expect(charity.foods.singleWhere((f) => f.id == foodId).photo, photo);
      await stage(
          'food UI reads Firebase, pending hidden, admin UI approval, edit and realtime name change');

      final need = (await charity.command('addNeed', {
        'title': 'DEMO nhu cầu',
        'quantity': 3,
        'category': 'Rau',
        'priority': 'Bình thường'
      }))['id'];
      await admin.command('reviewNeed',
          {'id': need, 'status': 'open', 'note': 'DEMO approved'});
      await until(() => donor.needs.any((n) => n['id'] == need),
          'need approval stream');
      await charity.command('editNeed',
          {'id': need, 'title': 'DEMO nhu cầu đã sửa', 'quantity': 4});
      await until(() => donor.needs.every((n) => n['id'] != need),
          'need edit returns to moderation');
      await admin.command('reviewNeed',
          {'id': need, 'status': 'open', 'note': 'DEMO edited need approved'});
      await charity.command('closeNeed', {'id': need});
      await until(() => donor.needs.every((n) => n['id'] != need),
          'closed need hidden from other accounts');

      Future<String> request(FirebaseAppState state, int qty,
              [String transport = 'Nhờ giao hộ']) async =>
          (await state.command('requestFood', {
            'foodId': foodId,
            'quantity': qty,
            'transport': transport,
            'time': 'Trong 1 giờ',
            'note': 'DEMO request'
          }))['id'] as String;
      final race1 = await request(charity, 8),
          race2 = await request(charity2, 8);
      final results = await Future.wait([race1, race2].map((id) async {
        try {
          await donor.api
              .call('transitionOrder', {'id': id, 'status': 'accepted'});
          return true;
        } catch (_) {
          return false;
        }
      }));
      expect(results.where((r) => r).length, 1,
          reason: 'Two acceptances must never oversell 10 servings');
      final acceptedRace = results[0] ? race1 : race2;
      await donor.command(
          'transitionOrder', {'id': acceptedRace, 'status': 'cancelled'});
      await donor.command('transitionOrder',
          {'id': results[0] ? race2 : race1, 'status': 'rejected'});
      await until(
          () => donor.foods.singleWhere((f) => f.id == foodId).quantity == 10,
          'cancellation restores stock');
      await stage(
          'concurrent reservation cannot oversell; cancel restores stock; reject request');

      final orderId = await request(charity, 4);
      await until(() => donor.rows('orders').any((o) => o['id'] == orderId),
          'new donor request');
      await mount('donor', '/user/donor/incoming-requests');
      await tester.tap(find.text('Chấp nhận').first);
      await until(() => volunteer.rows('orders').any((o) => o['id'] == orderId),
          'accept button makes delivery job visible');
      await volunteer
          .command('transitionOrder', {'id': orderId, 'status': 'assigned'});
      await expectLater(
          charity2.api
              .call('transitionOrder', {'id': orderId, 'status': 'assigned'}),
          throwsA(anything));
      await donor.command('confirmSchedule',
          {'id': orderId, 'time': 'DEMO 19:30', 'note': 'DEMO schedule'});
      await donor.command('sendMessage',
          {'orderId': orderId, 'text': 'DEMO tin nhắn từ người cho'});
      await until(() => charity.messages.any((m) => m['orderId'] == orderId),
          'message stream');
      await expectLater(
          charity2.services.database
              .ref('demo/messages')
              .orderByChild('orderId')
              .equalTo(orderId)
              .get(),
          throwsA(isA<FirebaseException>()));

      await donor.command('renewHandover', {'id': orderId, 'stage': 'pickup'});
      for (var i = 0; i < 5; i++) {
        await expectLater(
            volunteer.command('verifyHandover',
                {'id': orderId, 'stage': 'pickup', 'pin': '000000'}),
            throwsA(isA<StateError>()));
      }
      await donor.command('renewHandover', {'id': orderId, 'stage': 'pickup'});
      await bridge('/expire-code', {'id': orderId, 'stage': 'pickup'});
      await expectLater(
          volunteer.command('verifyHandover',
              {'id': orderId, 'stage': 'pickup', 'pin': '000000'}),
          throwsA(isA<StateError>()));
      final pickup = await donor
          .command('renewHandover', {'id': orderId, 'stage': 'pickup'});
      await volunteer.command('verifyHandover',
          {'id': orderId, 'stage': 'pickup', 'pin': pickup['pin']});
      await volunteer
          .command('savePickupPhoto', {'id': orderId, 'path': photo});
      await volunteer.command(
          'transferJob', {'id': orderId, 'reason': 'DEMO transfer request'});
      await admin.command(
          'assignVolunteer', {'id': orderId, 'uid': volunteer.user!.uid});
      await expectLater(
          charity.command('transitionOrder',
              {'id': orderId, 'status': 'completed', 'received': 3}),
          throwsA(isA<StateError>()));
      final receipt = await charity
          .command('renewHandover', {'id': orderId, 'stage': 'receipt'});
      await volunteer.command('verifyHandover',
          {'id': orderId, 'stage': 'receipt', 'pin': receipt['pin']});
      await charity.command('transitionOrder', {
        'id': orderId,
        'status': 'completed',
        'received': 3,
        'photo': photo
      });
      expect(
          charity
              .rows('orders')
              .singleWhere((o) => o['id'] == orderId)['receiptPhoto'],
          photo);
      await until(
          () => donor
              .rows('orders')
              .any((o) => o['id'] == orderId && o['status'] == 'completed'),
          'completed order streams to donor');
      expect(charity.get('warehouse.received', 0), 3);
      await expectLater(charity.command('distribute', {'quantity': 4}),
          throwsA(isA<StateError>()));
      await charity.command('distribute', {'quantity': 2});
      expect(charity.warehouseBalance, 1);
      await stage(
          'volunteer delivery + private chat + PIN attempts/expiry + pickup/receipt/proof + inventory/distribution');

      await charity.command('saveReview', {
        'orderId': orderId,
        'rating': 5,
        'note': 'DEMO đánh giá từ Firebase'
      });
      await donor.command('saveReview', {
        'orderId': orderId,
        'rating': 4,
        'note': 'DEMO người nhận đúng hẹn'
      });
      await charity.command('sendThanks', {
        'orderId': orderId,
        'text': 'DEMO cảm ơn đã chia sẻ',
        'photo': photo
      });
      expect(
          charity
              .rows('orders')
              .singleWhere((o) => o['id'] == orderId)['thanksPhoto'],
          photo);
      await until(() => donor.rows('reviews').length == 2, 'reviews stream');
      donor.selectOrder(orderId);
      await mount('donor', '/user/donor/recipient-review');
      await tester.pumpAndSettle();
      expect(find.text('DEMO người nhận đúng hẹn'), findsOneWidget);
      final ticketId = (await charity.command('submitTicket', {
        'orderId': orderId,
        'reason': 'DEMO hỗ trợ',
        'detail': 'DEMO chi tiết',
        'photo': photo
      }))['id'];
      await admin.command('resolveTicket',
          {'id': ticketId, 'status': 'investigating', 'note': 'DEMO đang xem'});
      await admin.command('resolveTicket',
          {'id': ticketId, 'status': 'resolved', 'note': 'DEMO đã giải quyết'});
      await until(
          () => charity.tickets
              .any((t) => t['id'] == ticketId && t['status'] == 'resolved'),
          'ticket response stream');
      await charity.command('readAll');
      expect(charity.rows('notifications').every((n) => n['read'] == true),
          isTrue);
      final date = DateTime.now()
          .add(const Duration(days: 1))
          .toIso8601String()
          .split('T')
          .first;
      await volunteer.command('registerShift', {'date': date});
      expect(volunteer.rows('shifts').length, 1);
      await volunteer.command('registerShift', {'date': date, 'cancel': true});
      expect(volunteer.rows('shifts'), isEmpty);
      await donor.command('updateProfile', {
        'phone': '0900000000',
        'address': 'DEMO address',
        'name': 'DEMO donor updated'
      });
      expect(donor.profile['name'], 'DEMO donor updated');
      await stage(
          'reviews render from database + thanks + support resolution + notifications + shifts + profile');

      final selfOrder = await request(charity, 1, 'Tự đến lấy');
      await donor
          .command('transitionOrder', {'id': selfOrder, 'status': 'accepted'});
      final selfPin = await donor
          .command('renewHandover', {'id': selfOrder, 'stage': 'pickup'});
      await charity.command('verifyHandover',
          {'id': selfOrder, 'stage': 'pickup', 'pin': selfPin['pin']});
      await charity.command('transitionOrder',
          {'id': selfOrder, 'status': 'completed', 'received': 1});
      expect(charity.get('warehouse.received', 0), 4);
      await stage('self pickup adds actual receipt to inventory');
      final closingRequest = await request(charity2, 1);
      await donor.command('closeFood', {'id': foodId});
      await until(
          () => charity2.rows('orders').any(
              (o) => o['id'] == closingRequest && o['status'] == 'cancelled'),
          'closing food cancels waiting requests');
      await mount('charity', '/user/organization/food-discovery');
      await until(() => find.textContaining(renamed).evaluate().isEmpty,
          'closed food disappears from discovery');
      await admin.command(
          'setAccountDisabled', {'uid': volunteer.user!.uid, 'disabled': true});
      await until(
          () => volunteer.profile['disabled'] == true, 'live account lock');
      await expectLater(volunteer.api.call('registerShift', {'date': date}),
          throwsA(isA<StateError>()));
      await admin.command('setAccountDisabled',
          {'uid': volunteer.user!.uid, 'disabled': false});
      await until(
          () => volunteer.profile['disabled'] == false, 'live account unlock');
      await donor.services.auth
          .sendPasswordResetEmail(email: donor.user!.email!);
      final resetCodes = (await bridge(
              '/oob?email=${Uri.encodeQueryComponent(donor.user!.email!)}'))[
          'codes'] as List;
      final reset = resetCodes.lastWhere((c) => c['type'] == 'PASSWORD_RESET');
      expect(
          await donor.services.auth
              .verifyPasswordResetCode(reset['code'] as String),
          donor.user!.email);
      final donorEmail = donor.user!.email!;
      await donor.logout();
      expect(donor.foods, isEmpty);
      expect(donor.snapshot, isEmpty);
      await donor.login(donorEmail, password);
      await until(() => donor.role == 'donor', 'login restores role');
      await stage(
          'self pickup + closed food hidden + account lock/unlock + reset link + logout clears data + login');
      await mount('admin', '/admin/reports');
      expect(find.textContaining('suất'), findsWidgets);
      expect(tester.takeException(), isNull);
      await stage('ALL ANDROID DIRECT FIREBASE CHECKS COMPLETE');
    } catch (error, stack) {
      debugPrint('ANDROID CHECK FAILURE: $error\n$stack');
      rethrow;
    } finally {
      await tester.pumpWidget(const SizedBox());
      for (final controller in controllers.values) {
        controller.dispose();
      }
      for (final app in apps) {
        // Android Database callbacks can outlive Dart subscription cancellation.
        // Named test apps are process scoped; take connections offline instead
        // of deleting an app while a native Database task is still draining.
        await FirebaseDatabase.instanceFor(app: app).goOffline();
      }
    }
  }, timeout: const Timeout(Duration(minutes: 15)));
}
