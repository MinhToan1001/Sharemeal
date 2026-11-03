import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/controllers/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/media_gallery.dart';
import 'firebase_app_state_test.dart' show TestServices, TestUser, view;

void main() {
  setUpAll(() async {
    await (FontLoader('Inter')
          ..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf')))
        .load();
    await (FontLoader('MaterialIcons')
          ..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf')))
        .load();
  });
  Future<FirebaseAppState> mount(WidgetTester t, String route,
      {String role = 'charity',
      Map<String, dynamic>? record,
      String kind = 'applications',
      List<Map<String, dynamic>> messages = const []}) async {
    t.view.physicalSize = const Size(390, 844);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final services = TestServices()..auth.account = TestUser();
    final data = view(role: role);
    (data['profile'] as Map)['verificationStatus'] = 'approved';
    data['orders'] = [
      {
        'id': '-P5MbDn4Q-cxz1L5FHIL-long-order-id',
        'foodId': 'real-food',
        'organization': 'Tổ chức tiếp nhận',
        'quantity': 5,
        'status': 'accepted',
        'transport': 'Nhờ giao hộ',
        'driver': '',
        'time': '19:30'
      }
    ];
    data['messages'] = messages;
    if (record != null) data[kind] = [record];
    final state = FirebaseAppState(services)..applyView(data);
    if (record != null) {
      state.values['admin.selection.id'] = record['id'];
      state.values['admin.selection.kind'] = kind;
    }
    final c = FigmaPrototypeController(enableTimeouts: false, frontend: state);
    addTearDown(c.dispose);
    await t.pumpWidget(ShareMealApp(prototype: c, initialRoute: route));
    await t.pumpAndSettle();
    return state;
  }

  testWidgets(
      'request controls toggle consent, step quantity and visibly select the chosen transport',
      (t) async {
    final s = await mount(t, '/user/organization/request-food');
    expect(s.get('request.commitment', false), false);
    expect(
        t
            .widget<FilledButton>(find.byKey(const ValueKey('request/submit')))
            .onPressed,
        isNull);
    await t.ensureVisible(find.byKey(const ValueKey('request/commitment')));
    await t.tap(find.byKey(const ValueKey('request/commitment')));
    await t.pumpAndSettle();
    expect(s.get('request.commitment', false), true);
    await t.tap(find.byKey(const ValueKey('request/commitment')));
    await t.pumpAndSettle();
    expect(s.get('request.commitment', false), false);
    await t.ensureVisible(find.byKey(const ValueKey('request/minus')));
    await t.tap(find.byKey(const ValueKey('request/minus')));
    await t.pumpAndSettle();
    expect(s.get('request.quantity', 0), 4);
    await t.tap(find.byKey(const ValueKey('request/plus')));
    await t.pumpAndSettle();
    expect(s.get('request.quantity', 0), 5);
    expect(t.getSize(find.byKey(const ValueKey('request/minus'))).width,
        greaterThanOrEqualTo(40));
    for (final choice in ['Tự đến lấy', 'Nhờ giao hộ']) {
      await t.tap(find.byKey(ValueKey('request/transport/$choice')));
      await t.pumpAndSettle();
      expect(s.get('request.transport', ''), choice);
      final sem = t.widget<Semantics>(find
          .ancestor(
              of: find.byKey(ValueKey('request/transport/$choice')),
              matching: find.byType(Semantics))
          .first);
      expect(sem.properties.selected, true);
    }
    expect(t.takeException(), isNull);
    await expectLater(find.byType(Scaffold).first,
        matchesGoldenFile('goldens/repaired_request.png'));
    await t.tap(find.byKey(const ValueKey('flow/back')));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('flow/back')), findsNothing);
  });
  testWidgets(
      'review shows role-specific fields and no raw JSON; all evidence is reachable',
      (t) async {
    final record = {
      'id': 'application-real',
      'uid': 'donor',
      'role': 'charity',
      'name': 'Tổ chức kiểm thử',
      'status': 'pending',
      'documents': [
        'https://res.cloudinary.com/toanvip/image/upload/a.png',
        'https://res.cloudinary.com/toanvip/image/upload/b.png'
      ],
      'details': jsonEncode({
        'profile.organization.name': 'Tổ chức kiểm thử',
        'profile.organization.address':
            'Địa điểm tiếp nhận rất dài cần được xuống dòng đầy đủ',
        'license.tax': 'OLD-OTHER-ROLE',
        'documentLabels': {
          'https://res.cloudinary.com/toanvip/image/upload/b.png':
              'Ảnh địa điểm nhận'
        }
      })
    };
    await mount(t, '/admin/organization-review', role: 'admin', record: record);
    expect(find.textContaining('OLD-OTHER-ROLE'), findsNothing);
    expect(find.textContaining('license.tax'), findsNothing);
    expect(find.text('Tên tổ chức'), findsOneWidget);
    await expectLater(find.byType(Scaffold).first,
        matchesGoldenFile('goldens/repaired_org_review.png'));
    await t.scrollUntilVisible(find.byType(MediaGallery), 250,
        scrollable: find.byType(Scrollable).first);
    await t.scrollUntilVisible(find.byKey(const ValueKey('media/next')), 120,
        scrollable: find.byType(Scrollable).first);
    await t.tap(find.byKey(const ValueKey('media/next')));
    await t.pumpAndSettle();
    expect(find.text('2/2 · Ảnh địa điểm nhận'), findsOneWidget);
    for (var i = 0; i < 3; i++) {
      await t.scrollUntilVisible(find.byKey(ValueKey('review/check/$i')), 150,
          scrollable: find.byType(Scrollable).first);
      await t.tap(find.byKey(ValueKey('review/check/$i')));
      await t.pumpAndSettle();
    }
    expect(
        t
            .widget<FilledButton>(find.byKey(const ValueKey('review/approve')))
            .onPressed,
        isNotNull);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'food approval has food criteria and no license or supplement action',
      (t) async {
    await mount(t, '/admin/donor-review',
        role: 'admin',
        kind: 'foods',
        record: {
          'id': 'food-review',
          'name': 'Bún thịt nướng',
          'donor': 'Người cho',
          'quantity': 10,
          'status': 'pending',
          'category': 'Cơm & món mặn',
          'storage': 'Giữ nóng',
          'address': 'Địa điểm lấy',
          'pickup': '19:00–20:00',
          'expiresAt': '2026-11-01T23:00:00Z',
          'safe': true,
          'photo': 'https://res.cloudinary.com/toanvip/image/upload/a.png'
        });
    expect(find.text('Duyệt món ăn'), findsOneWidget);
    expect(find.text('Phê duyệt món ăn'), findsOneWidget);
    await expectLater(find.byType(Scaffold).first,
        matchesGoldenFile('goldens/repaired_food_review.png'));
    expect(find.text('Yêu cầu bổ sung'), findsNothing);
    expect(find.textContaining('GIẤY CHỨNG NHẬN'), findsNothing);
    await t.scrollUntilVisible(find.text('Hạn dùng'), 200,
        scrollable: find.byType(Scrollable).first);
    expect(find.text('Hạn dùng'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'chat wraps long ids and incoming messages, keyboard leaves composer usable',
      (t) async {
    await mount(t, '/shared/chat', messages: [
      {
        'orderId': '-P5MbDn4Q-cxz1L5FHIL-long-order-id',
        'uid': 'someone-else',
        'name': 'Người cho',
        'text': List.filled(30, 'Tin nhắn dài').join(' '),
        'time': '2026-11-01T12:00:00Z'
      }
    ]);
    expect(find.text('Người cho'), findsOneWidget);
    await expectLater(find.byType(Scaffold).first,
        matchesGoldenFile('goldens/repaired_chat.png'));
    await t.enterText(
        find.byKey(const ValueKey('chat/input')), 'Nội dung cần gửi');
    t.view.viewInsets = const FakeViewPadding(bottom: 300);
    await t.pumpAndSettle();
    expect(t.getRect(find.byKey(const ValueKey('chat/send'))).bottom,
        lessThanOrEqualTo(544));
    expect(t.takeException(), isNull);
    t.view.resetViewInsets();
    await t.tap(find.byKey(const ValueKey('flow/back')));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('chat/input')), findsNothing);
  });
  testWidgets('tracking opens chat and back returns to tracking then role home',
      (t) async {
    await mount(t, '/user/organization/order-tracking');
    final chat = find.text('Nhắn tin về đơn nhận');
    await t.scrollUntilVisible(chat, 250,
        scrollable: find.byType(Scrollable).first);
    await t.tap(chat);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('chat/input')), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('flow/back')));
    await t.pumpAndSettle();
    expect(find.text('Theo dõi đơn nhận'), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('flow/back')));
    await t.pumpAndSettle();
    expect(find.text('Theo dõi đơn nhận'), findsNothing);
    expect(t.takeException(), isNull);
  });
}
