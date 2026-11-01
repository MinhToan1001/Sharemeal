import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/services.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_actions.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';
import 'package:sharemeal/presentation/shared/interaction/interaction_values.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'backend_state_test.dart' show TestServices, TestUser, view;

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(() async {
    await (FontLoader('Inter')
          ..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf')))
        .load();
    await (FontLoader('MaterialIcons')
          ..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf')))
        .load();
  });
  Future<FigmaPrototypeController> open(WidgetTester t, String route,
      {FrontendState? frontend}) async {
    if (!Platform.isAndroid) {
      t.view.physicalSize = const Size(402, 874);
      t.view.devicePixelRatio = 1;
      addTearDown(t.view.resetPhysicalSize);
      addTearDown(t.view.resetDevicePixelRatio);
    }
    final controller =
        FigmaPrototypeController(enableTimeouts: false, frontend: frontend);
    await t
        .pumpWidget(ShareMealApp(initialRoute: route, prototype: controller));
    await t.pumpAndSettle();
    addTearDown(controller.dispose);
    return controller;
  }

  Finder command(String action) => find
      .byWidgetPredicate((w) => w is FigmaBox && w.control['action'] == action);
  InkWell commandInk(WidgetTester t, String action) => t.widget<InkWell>(find
      .descendant(of: command(action), matching: find.byType(InkWell))
      .first);

  testWidgets('License pencils edit name/tax/date/type; cancel preserves data',
      (t) async {
    final c = await open(t, '/user/donor/business-license');
    expect(commandInk(t, 'licenseContinue').onTap, isNull);
    final paint = find.byWidgetPredicate(
        (w) => w is FigmaBox && w.control['kind'] == 'enabledPaint');
    expect(
        find.descendant(
            of: paint,
            matching: find.byWidgetPredicate((w) =>
                w is DecoratedBox &&
                w.decoration is BoxDecoration &&
                (w.decoration as BoxDecoration).color ==
                    const Color(0xFFC0CFC6))),
        findsOneWidget);
    await t.tap(find.byKey(const ValueKey('license/edit/name')));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), 'Bếp Hạnh Phúc');
    await t.tap(find.text('Lưu'));
    await t.pumpAndSettle();
    expect(c.frontend.get('license.name', ''), 'Bếp Hạnh Phúc');
    expect(find.text('Bếp Hạnh Phúc'), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('license/edit/tax')));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), '123');
    await t.tap(find.text('Hủy'));
    await t.pumpAndSettle();
    expect(c.frontend.values.containsKey('license.tax'), false);
    await t.tap(find.byKey(const ValueKey('license/edit/issued')));
    await t.pumpAndSettle();
    expect(find.byType(DatePickerDialog), findsOneWidget);
    await t.tap(find.text('Cancel'));
    await t.pumpAndSettle();
    expect(t.takeException(), isNull);
  });

  testWidgets(
      'Firebase donor license saves 10 and 13 digit tax codes from the edit dialog',
      (t) async {
    final services = TestServices()..auth.account = TestUser();
    final state = FirebaseAppState(services)..applyView(view());
    await open(t, '/user/donor/business-license', frontend: state);
    for (final code in [
      '1234567890',
      '1234567890123',
      '1234567890-123',
      ' 1234 567 890 ',
      '1234567890–123',
      '\u200b1234567890123\u00a0',
      '123.456.7890-123'
    ]) {
      await t.tap(find.byKey(const ValueKey('license/edit/tax')));
      await t.pumpAndSettle();
      await t.enterText(find.byType(TextField), code);
      await t.tap(find.text('Lưu'));
      await t.pumpAndSettle();
      final expected = code.replaceAll(RegExp(r'[^0-9]'), '');
      expect(state.get('license.tax', ''), expected);
      expect(find.text(expected), findsOneWidget);
      expect(find.textContaining('Mã số thuế phải'), findsNothing);
      expect(t.takeException(), isNull);
    }
    for (final invalid in [
      '123456789',
      '12345678901',
      '123456789012',
      '12345678901234',
      '123456789A',
      '1234567890abc'
    ]) {
      await t.tap(find.byKey(const ValueKey('license/edit/tax')));
      await t.pumpAndSettle();
      await t.enterText(find.byType(TextField), invalid);
      await t.tap(find.text('Lưu'));
      await t.pumpAndSettle();
      expect(state.get('license.tax', ''), '1234567890123');
      expect(find.textContaining('Mã số thuế phải gồm 10 hoặc 13 chữ số'),
          findsOneWidget);
      expect(t.takeException(), isNull);
    }
  });

  testWidgets(
      'Profile name and phone edit validate and display the saved values',
      (t) async {
    final c = await open(t, '/shared/profile');
    await t.tap(find.byKey(const ValueKey('profile/edit/phone')));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), 'abc');
    await t.tap(find.text('Lưu'));
    await t.pumpAndSettle();
    expect(c.frontend.values.containsKey('profile.phone'), false);
    await t.tap(find.byKey(const ValueKey('profile/edit/phone')));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), '0912345678');
    await t.tap(find.text('Lưu'));
    await t.pumpAndSettle();
    expect(find.text('0912345678'), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets(
      'Facility starts empty, optional/replacement do not count, five required enable continue',
      (t) async {
    final c = await open(t, '/user/donor/facility-photos');
    expect(c.frontend.facilityPhotoCount, 0);
    expect(find.text('0/5 ảnh bắt buộc'), findsOneWidget);
    expect(find.text('Chứng nhận ATTP'), findsOneWidget);
    expect(commandInk(t, 'facilityContinue').onTap, isNull);
    await t.tap(command('facilityContinue'));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:2754')), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('facility/slot/front')));
    await t.pumpAndSettle();
    expect(find.text('Chọn từ thư viện'), findsOneWidget);
    Navigator.pop(t.element(find.text('Chọn từ thư viện')));
    await t.pumpAndSettle();
    expect(c.frontend.facilityPhotoCount, 0);
    // Image-picker integration has its own platform boundary; test button gating
    // with supplied evidence paths and ignore thumbnail decode in this UI test.
    c.frontend.set('facility.photo.extra', 'test-extra.jpg');
    for (final slot in FrontendState.facilitySlots.take(4)) {
      c.frontend.set('facility.photo.$slot', 'test-$slot.jpg');
    }
    await t.pumpAndSettle();
    expect(c.frontend.facilityPhotoCount, 4);
    expect(commandInk(t, 'facilityContinue').onTap, isNull);
    final ctx = t.element(command('facilityContinue'));
    await FrontendActions.run(ctx, '6:2754',
        {'action': 'facilityContinue', 'enabledWhen': 'facilityComplete'});
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:2754')), findsOneWidget);
    c.frontend.set('facility.photo.front', 'replacement.jpg');
    expect(c.frontend.facilityPhotoCount, 4);
    c.frontend.set('facility.photo.certificate', 'certificate.jpg');
    await t.pumpAndSettle();
    expect(commandInk(t, 'facilityContinue').onTap, isNotNull);
    final box = t.widget<FigmaBox>(command('facilityContinue'));
    expect(controlEnabled(c.frontend, box.control), true);
    c.frontend.set('facility.photo.fridge', '');
    await t.pumpAndSettle();
    expect(commandInk(t, 'facilityContinue').onTap, isNull);
    c.frontend.set('facility.photo.fridge', 'fridge.jpg');
    await t.pumpAndSettle();
    await t.tap(command('facilityContinue'));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:2835')), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets(
      'Commitment starts unchecked; all four toggle; guarded submit requires evidence',
      (t) async {
    final c = await open(t, '/user/donor/commitment');
    expect(c.frontend.commitmentCount, 0);
    expect(commandInk(t, 'submitCommitment').onTap, isNull);
    for (final key in FrontendState.commitmentKeys) {
      await t.tap(find.byKey(ValueKey('commitment/$key')));
      await t.pumpAndSettle();
    }
    expect(c.frontend.commitmentCount, 4);
    expect(commandInk(t, 'submitCommitment').onTap, isNotNull);
    await t.tap(find.byKey(const ValueKey('commitment/fresh')));
    await t.pumpAndSettle();
    expect(c.frontend.commitmentCount, 3);
    expect(commandInk(t, 'submitCommitment').onTap, isNull);
    await t.tap(find.byKey(const ValueKey('commitment/fresh')));
    await t.pumpAndSettle();
    await t.tap(command('submitCommitment'));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:2805')), findsOneWidget);
    expect(c.frontend.values['verification.donor'], isNull);
    ScaffoldMessenger.of(t.element(command('submitCommitment')))
        .hideCurrentSnackBar();
    await t.pumpAndSettle();
    for (final slot in FrontendState.facilitySlots) {
      c.frontend.set('facility.photo.$slot', 'test-$slot.jpg');
    }
    await t.pumpAndSettle();
    await t.tap(command('submitCommitment'));
    await t.pumpAndSettle();
    expect(c.frontend.values['verification.donor'], 'pending');
    expect(find.byKey(const ValueKey('figma/6:4055')), findsOneWidget);
    expect(t.takeException(), isNull);
  });

  testWidgets(
      'Calendar selects real dates, changes week and registers/cancels selected day only',
      (t) async {
    final c = await open(t, '/user/volunteer/calendar');
    final today = FrontendState.dateOnly(c.frontend.now());
    await t.tap(find.byKey(const ValueKey('calendar/next')));
    await t.pumpAndSettle();
    final day = today.add(const Duration(days: 7));
    expect(c.frontend.calendarDate, day);
    final monday = day.subtract(Duration(days: day.weekday - 1));
    await t.tap(
        find.byKey(ValueKey('calendar/day/${FrontendState.dateKey(monday)}')));
    await t.pumpAndSettle();
    expect(c.frontend.calendarDate, monday);
    expect(find.text('${monday.day}'), findsWidgets);
    await t.tap(find.byKey(const ValueKey('calendar/register')));
    await t.pumpAndSettle();
    expect(c.frontend.shiftDate, monday);
    await t.tap(find.byKey(const ValueKey('shift/confirm')));
    await t.pumpAndSettle();
    expect(c.frontend.shiftRegistered(monday), true);
    expect(find.byKey(const ValueKey('calendar/cancel')), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('calendar/cancel')));
    await t.pumpAndSettle();
    await t.tap(find.text('Giữ ca'));
    await t.pumpAndSettle();
    expect(c.frontend.shiftRegistered(monday), true);
    await t.tap(find.byKey(const ValueKey('calendar/cancel')));
    await t.pumpAndSettle();
    await t.tap(find.text('Hủy ca'));
    await t.pumpAndSettle();
    expect(c.frontend.shiftRegistered(monday), false);
    await t.tap(find.byKey(const ValueKey('calendar/picker')));
    await t.pumpAndSettle();
    expect(find.byType(DatePickerDialog), findsOneWidget);
    await t.tap(find.text('Cancel'));
    await t.pumpAndSettle();
    expect(c.frontend.calendarDate, monday);
    expect(t.takeException(), isNull);
  });

  test(
      'Calendar persists per-day registration and handles year boundary/past dates',
      () {
    final state = FrontendState(now: () => DateTime(2026, 12, 31));
    state.set('shift.date', '2027-01-01');
    state.registerShift();
    expect(state.calendarDate, DateTime(2027, 1, 1));
    expect(state.shiftRegistered(DateTime(2027, 1, 1)), true);
    expect(state.shiftRegistered(DateTime(2027, 1, 2)), false);
    expect(state.registerShift, throwsStateError);
    state.set('shift.date', '2026-12-30');
    expect(state.registerShift, throwsStateError);
    state.dispose();
  });

  test(
      'Evidence, consent and per-day calendar restore without resetting to demo defaults',
      () async {
    SharedPreferences.setMockInitialValues({});
    final state = FrontendState();
    await state.load();
    state.set('facility.photo.front', 'saved-front.jpg');
    state.set('onboarding.commitment.fresh', true);
    state.set('calendar.date', '2027-01-02');
    state.set('shift.registered.2027-01-02', true);
    await state.flush();
    final restored = FrontendState();
    await restored.load();
    expect(restored.facilityPhotoCount, 1);
    expect(restored.facilityComplete, false);
    expect(restored.commitmentCount, 1);
    expect(restored.commitmentComplete, false);
    expect(restored.calendarDate, DateTime(2027, 1, 2));
    expect(restored.shiftRegistered(DateTime(2027, 1, 2)), true);
    state.dispose();
    restored.dispose();
  });

  testWidgets(
      'Admin cannot approve until three audit checks are explicitly selected',
      (t) async {
    final c = await open(t, '/admin/donor-review');
    final button = find.byWidgetPredicate((w) =>
        w is FigmaBox &&
        w.control['kind'] == 'action' &&
        w.control['label'] == 'Phê duyệt hồ sơ');
    expect(button, findsOneWidget);
    InkWell ink() => t.widget<InkWell>(
        find.descendant(of: button, matching: find.byType(InkWell)).first);
    expect(ink().onTap, isNull);
    for (var i = 0; i < 3; i++) {
      final check = find.byKey(ValueKey('check/admin.audit.6:3798.$i'));
      await t.ensureVisible(check);
      await t.tap(check);
      await t.pumpAndSettle();
      expect(ink().onTap != null, i == 2);
    }
    await t.tap(button);
    await t.pumpAndSettle();
    expect(c.frontend.get('verification.donor', ''), 'approved');
    expect(t.takeException(), isNull);
  });

  testWidgets(
      'Organization consent is empty and submit validates required fields',
      (t) async {
    final c = await open(t, '/user/organization/organization-profile');
    final button = find.byWidgetPredicate((w) =>
        w is FigmaBox &&
        w.control['kind'] == 'action' &&
        w.control['label'] == 'Gửi hồ sơ tổ chức');
    expect(button, findsOneWidget);
    InkWell ink() => t.widget<InkWell>(
        find.descendant(of: button, matching: find.byType(InkWell)).first);
    expect(ink().onTap, isNull);
    final check =
        find.byKey(const ValueKey('check/verification.organization.consent'));
    await t.ensureVisible(check);
    await t.tap(check);
    await t.pumpAndSettle();
    expect(ink().onTap, isNotNull);
    expect(c.frontend.get('verification.organization.consent', false), true);
    await t.ensureVisible(
        find.byKey(const ValueKey('input/profile.organization.name')));
    await t.enterText(
        find.byKey(const ValueKey('input/profile.organization.name')), '');
    FocusManager.instance.primaryFocus?.unfocus();
    await t.pumpAndSettle();
    await t.ensureVisible(button);
    await t.tap(button);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/64:880')), findsOneWidget);
    expect(c.frontend.values['verification.charity'], isNull);
    expect(t.takeException(), isNull);
  });
}
