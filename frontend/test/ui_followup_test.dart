import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/food_photo.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';
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
      {FirebaseAppState? state}) async {
    t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final c = FigmaPrototypeController(frontend: state, enableTimeouts: false);
    await t.pumpWidget(
        ShareMealApp(key: UniqueKey(), prototype: c, initialRoute: route));
    await t.pumpAndSettle();
    addTearDown(c.dispose);
    return c;
  }

  Finder node(String id) =>
      find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == id);
  Future<void> capture(WidgetTester t, String frame) async {
    await t.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 150)));
    await t.pumpAndSettle();
    final boundary = t.renderObject<RenderRepaintBoundary>(
        find.byKey(ValueKey('figma/$frame')));
    await t.runAsync(() async {
      final img = await boundary.toImage(pixelRatio: 1);
      final bytes = await img.toByteData(format: ui.ImageByteFormat.png);
      final dir = Directory('build/ui-followup')..createSync(recursive: true);
      File('${dir.path}/${frame.replaceAll(':', '_')}.png')
          .writeAsBytesSync(bytes!.buffer.asUint8List());
      img.dispose();
    });
  }

  FirebaseAppState live(String role) {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser());
    final data = view(role: role);
    (data['profile'] as Map)['verificationStatus'] = 'approved';
    s.applyView(data);
    return s;
  }

  testWidgets(
      'centered role labels and step circles stay centered; badge titles remain readable',
      (t) async {
    await open(t, '/auth/login');
    for (final id in ['98:1193', '98:1198', '98:1203', '98:1210']) {
      final label = t.getRect(node(id));
      expect(label.width, lessThanOrEqualTo(72));
    }
    await capture(t, '6:246');
    await open(t, '/shared/verification-pending');
    final circle = t.getCenter(node('64:1049'));
    expect((circle.dx - t.getCenter(find.text('2')).dx).abs(), lessThan(1));
    await capture(t, '6:4055');
    await open(t, '/user/volunteer/badges');
    expect(t.getSize(node('6:2154')).width, greaterThan(180));
    for (final pair in [
      ('6:2174', 16.0, 97.0),
      ('6:2180', 209.0, 290.0),
      ('6:2177', 306.0, 387.0)
    ]) {
      final rect = t.getRect(find
          .descendant(of: node(pair.$1), matching: find.byType(RichText))
          .first);
      expect(rect.left, greaterThanOrEqualTo(pair.$2));
      expect(rect.right, lessThanOrEqualTo(pair.$3));
    }
    await capture(t, '6:2142');
    expect(t.takeException(), isNull);
  });
  testWidgets('live approvals and trace summaries render their full rows',
      (t) async {
    await open(t, '/admin/approval-result', state: live('admin'));
    expect(t.getSize(node('62:1453')).width, greaterThan(240));
    await capture(t, '62:1405');
    final admin = live('admin');
    final data = view(role: 'admin');
    (data['profile'] as Map)['verificationStatus'] = 'approved';
    data['applications'] = [
      {
        'id': 'application-demo',
        'uid': 'donor',
        'name': 'Đơn vị thử cục bộ',
        'role': 'donor',
        'status': 'pending',
        'details': '{}',
        'documents': [],
        'createdAt': DateTime.now().toIso8601String()
      }
    ];
    data['orders'] = [
      {
        'id': 'order-demo',
        'foodId': 'real-food',
        'organization': 'Tổ chức nhận',
        'quantity': 10,
        'status': 'accepted',
        'transport': 'Tự đến lấy',
        'driver': '',
        'time': '19:00',
        'received': 0
      }
    ];
    admin.applyView(data);
    await open(t, '/admin/approval-queue', state: admin);
    expect(find.text('Kiểm tra tài liệu và nội dung trước khi ra quyết định.'),
        findsOneWidget);
    expect(find.text('Tất cả 2'), findsOneWidget);
    await capture(t, '6:3712');
    // Separate controller owns each state: route changes in the same app.
    final context = t.element(find.byType(FigmaScreen).first);
    Navigator.of(context).pushNamed('/admin/food-safety-incident');
    await t.pumpAndSettle();
    expect(find.text('Chưa xác nhận nhận hàng'), findsOneWidget);
    expect(find.text('Tổ chức tự đến lấy'), findsOneWidget);
    await capture(t, '62:1331');
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'receive orders include the food photo and sold out detail cannot request',
      (t) async {
    final s = live('charity');
    final data = view(role: 'charity');
    (data['profile'] as Map)['verificationStatus'] = 'approved';
    final food = (data['foods'] as List).single as Map;
    food['status'] = 'open';
    food['photo'] = '';
    data['orders'] = [
      {
        'id': 'long-order-id-12345678',
        'foodId': 'real-food',
        'organization': 'Tổ chức',
        'quantity': 5,
        'status': 'accepted',
        'transport': 'Tự đến lấy',
        'driver': '',
        'time': '19:00',
        'received': 0
      }
    ];
    s.applyView(data);
    await open(t, '/user/organization/orders', state: s);
    expect(find.byType(FoodPhoto), findsOneWidget);
    expect(find.textContaining('12345678'), findsOneWidget);
    expect(find.text('Đang xử lý - 1'), findsOneWidget);
    await capture(t, '6:1470');
    await t.tap(find.text('Chờ duyệt - 0'));
    await t.pumpAndSettle();
    expect(find.byType(FoodPhoto), findsNothing);
    final empty = live('charity');
    final other = view(role: 'charity');
    (other['profile'] as Map)['verificationStatus'] = 'approved';
    ((other['foods'] as List).single as Map)
      ..['quantity'] = 0
      ..['status'] = 'open';
    empty.applyView(other);
    await open(t, '/user/organization/food-detail', state: empty);
    expect(find.text('Hiện không còn suất trống'), findsOneWidget);
    await capture(t, '6:1282');
    expect(t.takeException(), isNull);
  });
  test(
      'calendar impact excludes future/old dates and chart totals match actual quantities',
      () {
    final s = FrontendState(), now = DateTime.now();
    s.history.clear();
    for (final e in [
      (DateTime(now.year, now.month, 1), 7),
      (now, 9),
      (DateTime(now.year, now.month - 1, 1), 20),
      (now.add(const Duration(days: 1)), 50)
    ]) {
      s.history.add({
        'completedAt': e.$1.toIso8601String(),
        'quantity': e.$2,
        'kg': e.$2 * .5,
        'category': 'Rau củ'
      });
    }
    expect(s.impact('Tháng')['meals'], 16);
    expect(s.impactBars('Tháng').reduce((a, b) => a + b), 16);
    expect(s.impactLabels('Năm').first, 'Quý 1');
    s.dispose();
  });
  testWidgets('true zero impact explains uncompleted orders', (t) async {
    await open(t, '/user/donor/impact-report', state: live('donor'));
    expect(
        find.textContaining('Chưa có đơn hoàn tất trong kỳ'), findsOneWidget);
    await capture(t, 'donor-impact');
    expect(t.takeException(), isNull);
  });
}
