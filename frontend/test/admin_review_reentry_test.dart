import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/controllers/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/firebase_actions.dart';
import 'package:sharemeal/presentation/admin/widgets/review_content.dart';
import 'firebase_app_state_test.dart' show TestServices, TestUser, view;

class ReviewState extends FirebaseAppState {
  ReviewState() : super(TestServices()..auth.account = TestUser());
  final writes = <Map<String, dynamic>>[];
  @override
  Future<Map<String, dynamic>> command(String command,
      [Map<String, dynamic> payload = const {}]) async {
    writes.add({'command': command, ...payload});
    return {};
  }
}

void main() {
  testWidgets(
      'leave and reopen each review; explicit record survives global selection changes',
      (t) async {
    t.view.physicalSize = const Size(390, 844);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final state = ReviewState();
    final data = view(role: 'admin');
    (data['profile'] as Map)['verificationStatus'] = 'approved';
    for (final kind in ['applications', 'foods', 'needs']) {
      data[kind] = [
        {
          'id': kind,
          'name': 'Hồ sơ $kind',
          'title': 'Nhu cầu',
          'role': 'donor',
          'status': 'pending',
          'quantity': 10,
          'donor': 'donor',
          'category': 'Cơm',
          'storage': 'Còn nóng',
          'address': 'Địa chỉ demo',
          'pickup': '19:00',
          'details': '{}',
          'documents': <String>[]
        }
      ];
    }
    state.applyView(data);
    final controller =
        FigmaPrototypeController(frontend: state, enableTimeouts: false);
    addTearDown(controller.dispose);
    await t.pumpWidget(ShareMealApp(
        prototype: controller, initialRoute: '/admin/approval-queue'));
    await t.pumpAndSettle();
    final nav = Navigator.of(t.element(find.byType(Scaffold).first));
    for (final kind in ['applications', 'foods', 'needs']) {
      Future<void> open() async {
        final ctx = t.element(find.byType(Scaffold).first);
        await FirebaseActions.run(ctx, '6:3712', {
          'action': 'openAdminRecord',
          'id': kind,
          'table': kind,
          'role': 'donor'
        });
        await t.pumpAndSettle();
      }

      await open();
      expect(find.byType(AdminReviewContent), findsOneWidget);
      nav.pop();
      await t.pumpAndSettle();
      await open();
      // Another inactive route or a selection refresh must not change identity.
      state.values['admin.selection.id'] = 'missing';
      state.values['admin.selection.kind'] = 'wrong-table';
      state.applyView({...data, 'version': 2});
      await t.pumpAndSettle();
      for (var i = 0; i < 3; i++) {
        await t.scrollUntilVisible(find.byKey(ValueKey('review/check/$i')), 180,
            scrollable: find.byType(Scrollable).first);
        await t.tap(find.byKey(ValueKey('review/check/$i')));
        await t.pumpAndSettle();
      }
      expect(
          t
              .widget<FilledButton>(
                  find.byKey(const ValueKey('review/approve')))
              .onPressed,
          isNotNull);
      await t.tap(find.byKey(const ValueKey('review/approve')));
      await t.pumpAndSettle();
      expect(state.writes.last['id'], kind);
      expect(
          state.writes.last['command'],
          kind == 'applications'
              ? 'reviewApplication'
              : kind == 'foods'
                  ? 'reviewFood'
                  : 'reviewNeed');
      nav.pop();
      await t.pumpAndSettle(); // result -> review
      nav.pop();
      await t.pumpAndSettle(); // review -> queue
      await open();
      await t.tap(find.widgetWithText(OutlinedButton, 'Từ chối'));
      await t.pumpAndSettle();
      await t.enterText(find.byType(TextField), 'Thông tin cần đối chiếu');
      await t.tap(find.widgetWithText(FilledButton, 'Lưu'));
      await t.pumpAndSettle();
      await t.pump(const Duration(milliseconds: 300));
      await t.pumpAndSettle();
      expect(state.writes.last['id'], kind);
      expect(state.writes.last['status'], 'rejected');
      nav.pop();
      await t.pumpAndSettle();
      nav.pop();
      await t.pumpAndSettle();
    }
    expect(t.takeException(), isNull);
  });
}
