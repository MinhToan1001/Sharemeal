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
import 'backend_state_test.dart' show TestServices, TestUser, view;

class DeferredAcceptState extends FirebaseAppState {
  DeferredAcceptState() : super(TestServices()..auth.account = TestUser());
  @override
  Future<Map<String, dynamic>> command(String name,
      [Map<String, dynamic> payload = const {}]) async {
    final next = <String, dynamic>{
      ...snapshot,
      'version': 2,
      'orders': rows('orders')
          .map((o) => <String, dynamic>{...o, 'status': 'accepted'})
          .toList()
    };
    busy = true;
    applyView(next);
    // Simulate a realtime snapshot removing the request before command ACK.
    await Future<void>.delayed(const Duration(milliseconds: 250));
    busy = false;
    changed();
    return {};
  }
}

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
  Map<String, dynamic> data() {
    final v = view(role: 'charity');
    (v['profile'] as Map)
      ..['verificationStatus'] = 'approved'
      ..['name'] = 'Nguyen Khanh';
    final old = (v['foods'] as List).single as Map;
    old
      ..['name'] = 'bun thit nuong'
      ..['quantity'] = 0
      ..['status'] = 'open';
    v['foods'] = <Map<String, dynamic>>[
      Map<String, dynamic>.from(old),
      <String, dynamic>{
        ...old,
        'id': 'corn-real-id',
        'name': 'com ga oi mo',
        'quantity': 11,
        'expiresAt':
            DateTime.now().add(const Duration(hours: 2)).toIso8601String()
      }
    ];
    v['needs'] = [
      {
        'id': 'need',
        'uid': 'donor',
        'status': 'open',
        'quantity': 32,
        'title': 'Bữa tối cho 32 người'
      }
    ];
    v['orders'] = [
      {
        'id': 'accepted',
        'foodId': 'real-food',
        'organization': 'Nguyen Khanh',
        'quantity': 10,
        'status': 'accepted',
        'transport': 'Tự đến lấy',
        'driver': '',
        'time': '19:00',
        'received': 0
      }
    ];
    return v;
  }

  Future<FigmaPrototypeController> open(
      WidgetTester t, String route, FirebaseAppState s) async {
    t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final c = FigmaPrototypeController(frontend: s, enableTimeouts: false);
    addTearDown(c.dispose);
    await t.pumpWidget(ShareMealApp(prototype: c, initialRoute: route));
    await t.pumpAndSettle();
    return c;
  }

  Future<void> capture(WidgetTester t, String id) async {
    await t.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 150)));
    await t.pumpAndSettle();
    final b = t
        .renderObject<RenderRepaintBoundary>(find.byKey(ValueKey('figma/$id')));
    await t.runAsync(() async {
      final img = await b.toImage(pixelRatio: 1);
      final bytes = await img.toByteData(format: ui.ImageByteFormat.png);
      Directory('build/dashboard-identity').createSync(recursive: true);
      File('build/dashboard-identity/${id.replaceAll(':', '_')}.png')
          .writeAsBytesSync(bytes!.buffer.asUint8List());
      img.dispose();
    });
  }

  testWidgets(
      'real recommendation opens exactly its displayed food, not a stale sample ID',
      (t) async {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser())
      ..applyView(data());
    expect(s.selectedFood.id, 'real-food');
    await open(t, '/user/organization/dashboard', s);
    expect(find.text('com ga oi mo · 11 suất'), findsOneWidget);
    expect(find.text('Tìm thêm 22 suất còn thiếu'), findsOneWidget);
    expect(find.text('10 / 32 suất đã được ghép', findRichText: true),
        findsOneWidget);
    await capture(t, '6:1155');
    await t.tap(find.byKey(const ValueKey('control/6:1155/66:1412/action')));
    await t.pumpAndSettle();
    expect(s.selectedFood.id, 'corn-real-id');
    expect(find.text('com ga oi mo'), findsWidgets);
    expect(find.text('bun thit nuong'), findsNothing);
    await capture(t, '6:1282');
    expect(t.takeException(), isNull);
  });
  test('missing IDs cannot silently select another food on refresh', () {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser())
      ..applyView(data());
    expect(() => s.selectFood('SM-2039'), throwsStateError);
    s.selectFood('corn-real-id');
    final v = data();
    v['version'] = 2;
    (v['foods'] as List).removeLast();
    s.applyView(v);
    expect(s.selectedFood.id, '');
    s.dispose();
  });
  testWidgets(
      'profile header remains readable with missing phone and long name',
      (t) async {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser());
    final v = data();
    (v['profile'] as Map)['name'] = 'Nguyễn Khánh — Tổ chức chia sẻ bữa ăn';
    s.applyView(v);
    await open(t, '/shared/profile', s);
    expect(find.text('Chưa cập nhật số điện thoại'), findsOneWidget);
    await capture(t, '6:2504');
    expect(t.takeException(), isNull);
  });
  testWidgets('expired requests show a specific reason and cannot be accepted',
      (t) async {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser());
    final v = data();
    (v['profile'] as Map)['role'] = 'donor';
    final f = (v['foods'] as List).first as Map;
    f
      ..['quantity'] = 10
      ..['mine'] = true
      ..['expiresAtMs'] = DateTime.now()
          .subtract(const Duration(hours: 1))
          .millisecondsSinceEpoch;
    ((v['orders'] as List).first as Map)['status'] = 'awaiting';
    s.applyView(v);
    await open(t, '/user/donor/incoming-requests', s);
    expect(find.textContaining('Món đã hết hạn'), findsOneWidget);
    final button =
        t.widget<FilledButton>(find.widgetWithText(FilledButton, 'Chấp nhận'));
    expect(button.onPressed, isNull);
    await capture(t, '6:609');
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'asynchronous approval still confirms and navigates after request card disappears',
      (t) async {
    final s = DeferredAcceptState();
    final v = data();
    (v['profile'] as Map)['role'] = 'donor';
    ((v['foods'] as List).first as Map)
      ..['quantity'] = 10
      ..['mine'] = true;
    ((v['orders'] as List).first as Map)['status'] = 'awaiting';
    s.applyView(v);
    await open(t, '/user/donor/incoming-requests', s);
    await t.tap(find.widgetWithText(FilledButton, 'Chấp nhận'));
    await t.pump(const Duration(milliseconds: 1));
    await t.pump(const Duration(milliseconds: 300));
    await t.pumpAndSettle();
    expect(s.orders.single.status, 'accepted');
    final route = ModalRoute.of(t.element(find.byType(FigmaScreen).first));
    expect(route?.settings.name, '/user/donor/pickup-schedule');
    expect(find.textContaining('Đã chấp nhận yêu cầu'), findsOneWidget);
  });
}
