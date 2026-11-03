import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/controllers/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'firebase_app_state_test.dart' show TestServices, TestUser, view;

class WorkflowState extends FirebaseAppState {
  WorkflowState() : super(TestServices()..auth.account = TestUser());
  final commands = <Map<String, dynamic>>[];
  @override
  Future<Map<String, dynamic>> command(String name,
      [Map<String, dynamic> payload = const {}]) async {
    commands.add({'command': name, ...payload});
    final records = rows('orders').map((o) => <String, dynamic>{...o}).toList();
    final order =
        records.firstWhere((o) => o['id'] == payload['id'], orElse: () => {});
    if (name == 'transitionOrder') {
      order['status'] = payload['status'];
      if (payload['status'] == 'assigned') {
        order['volunteerId'] = user!.uid;
        order['driver'] = 'Tình nguyện viên';
      }
    }
    if (name == 'confirmDemoHandover') {
      if (payload['stage'] == 'pickup') {
        order['status'] = 'pickedUp';
        order['qtyPickedUp'] = order['quantity'];
      } else {
        order['deliveryConfirmed'] = true;
      }
    }
    applyView({
      ...snapshot,
      'version': (snapshot['version'] as int) + 1,
      'orders': records
    });
    return {};
  }
}

Map<String, dynamic> workflow(String role, String status) {
  final data = view(role: role);
  (data['profile'] as Map)['verificationStatus'] = 'approved';
  (data['foods'] as List).single.addAll({
    'name': 'Cơm 9 suất',
    'quantity': 2,
    'status': 'open',
    'donor': 'Bếp người cho',
    'mine': role == 'donor'
  });
  data['orders'] = [
    {
      'id': 'seven',
      'foodId': 'real-food',
      'donorId': 'donor',
      'organizationId': 'charity',
      'organization': 'Tổ chức nhận',
      'quantity': 7,
      'qtyRequested': 7,
      'status': status,
      'transport': 'Nhờ giao hộ',
      'driver': '',
      'time': '19:30',
      'received': 0,
      if (['assigned', 'pickedUp'].contains(status)) 'volunteerId': 'donor'
    }
  ];
  return data;
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(() async {
    await (FontLoader('Inter')
          ..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf')))
        .load();
  });
  Future<FigmaPrototypeController> open(
      WidgetTester t, WorkflowState s, String route) async {
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

  Future<void> capture(WidgetTester t, String frame) async {
    final boundary = t.renderObject<RenderRepaintBoundary>(
        find.byKey(ValueKey('figma/$frame')));
    await t.runAsync(() async {
      final output = Directory('build/visual-tests/demo')
        ..createSync(recursive: true);
      final image = await boundary.toImage();
      final data = await image.toByteData(format: ui.ImageByteFormat.png);
      File('${output.path}/${frame.replaceAll(':', '_')}.png')
          .writeAsBytesSync(data!.buffer.asUint8List());
      image.dispose();
    });
  }

  testWidgets('match success close returns to donor dashboard', (t) async {
    final s = WorkflowState()..applyView(workflow('donor', 'accepted'));
    s.selectOrder('seven');
    await open(t, s, '/user/donor/match-success');
    expect(find.byKey(const ValueKey('figma/6:3567')), findsOneWidget);
    await capture(t, '6:3567');
    await t.tap(
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '6:3569'));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:319')), findsOneWidget);
  });
  testWidgets(
      'seven and additional two stay separate and can be selected for handover',
      (t) async {
    final data = workflow('donor', 'accepted');
    (data['orders'] as List).add(<String, Object>{
      ...(data['orders'] as List).single as Map<String, Object>,
      'id': 'additional-two',
      'quantity': 2,
      'qtyRequested': 2,
    });
    final s = WorkflowState()..applyView(data);
    s.selectOrder('seven');
    await open(t, s, '/user/donor/order-tracking');
    await t.scrollUntilVisible(
        find.byKey(const ValueKey('order/switch/additional-two')), 200);
    await t.tap(find.byKey(const ValueKey('order/switch/additional-two')));
    await t.pumpAndSettle();
    expect(s.selectedOrderId, 'additional-two');
    expect(s.selectedOrder.quantity, 2);
    expect(
        s.rows('orders').firstWhere((o) => o['id'] == 'seven')['quantity'], 7);
  });
  testWidgets(
      'donor dashboard pending metric and request row both open live requests',
      (t) async {
    final s = WorkflowState()..applyView(workflow('donor', 'awaiting'));
    await open(t, s, '/user/donor/dashboard');
    final metric =
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '66:1233');
    await t.tap(metric);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('request/seven')), findsOneWidget);
    Navigator.of(t.element(find.byKey(const ValueKey('request/seven')))).pop();
    await t.pumpAndSettle();
    final row =
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '66:1239');
    await t.tap(row);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('request/seven')), findsOneWidget);
  });
  testWidgets(
      'accepting a trip opens pickup workflow and keeps it in My trips after reopening',
      (t) async {
    final s = WorkflowState()..applyView(workflow('volunteer', 'accepted'));
    s.selectOrder('seven');
    await open(t, s, '/user/volunteer/accept-job');
    await t.tap(find.text('Xác nhận nhận việc').last);
    await t.pumpAndSettle();
    expect(s.selectedOrder.status, 'assigned');
    expect(find.byKey(const ValueKey('figma/6:1971')), findsOneWidget);
    expect(find.textContaining('chờ admin'), findsNothing);
    s.set('jobs.scope', 'mine');
    final context = t.element(find.byKey(const ValueKey('figma/6:1971')));
    Navigator.of(context).pushNamed('/user/volunteer/available-jobs');
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('job/seven')), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('job/seven')));
    await t.pumpAndSettle();
    await t.tap(find.text('Tiếp tục chuyến'));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:1971')), findsOneWidget);
  });
  testWidgets('Figma white shutter advances pickup and delivery without a PIN',
      (t) async {
    final s = WorkflowState()..applyView(workflow('volunteer', 'assigned'));
    s.selectOrder('seven');
    await open(t, s, '/user/volunteer/pickup-photo');
    expect(find.byKey(const ValueKey('figma/6:2041')), findsOneWidget);
    await capture(t, '6:2041');
    expect(find.byType(TextField), findsNothing);
    await t.tapAt(const Offset(201, 740));
    await t.pumpAndSettle();
    expect(s.selectedOrder.status, 'pickedUp');
    expect(s.commands.single['command'], 'confirmDemoHandover');
    expect(s.commands.single['stage'], 'pickup');
    expect(find.byKey(const ValueKey('figma/6:2064')), findsOneWidget);
    await t.tap(find.text('Đã đến nơi'));
    await t.pumpAndSettle();
    expect(find.text('Ảnh xác nhận giao hàng'), findsOneWidget);
    await t.tapAt(const Offset(201, 740));
    await t.pumpAndSettle();
    expect(s.commands.last['stage'], 'receipt');
    expect(find.byKey(const ValueKey('figma/6:2105')), findsOneWidget);
    expect(find.text('Giao thành công!'), findsOneWidget);
    await capture(t, '6:2105');
    expect(s.rows('orders').single['deliveryConfirmed'], true);
  });
  testWidgets(
      'remaining two appear on organization dashboard while food is unexpired',
      (t) async {
    final data = workflow('charity', 'accepted');
    (data['foods'] as List).single['expiresAt'] =
        DateTime.now().add(const Duration(hours: 1)).toUtc().toIso8601String();
    final s = WorkflowState()..applyView(data);
    await open(t, s, '/user/organization/dashboard');
    expect(find.text('Cơm 9 suất · 2 suất'), findsOneWidget);
    expect(s.searchFoods().single.quantity, 2);
  });
}
