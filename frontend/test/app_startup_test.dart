import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';

void main() {
  testWidgets('Original entry flow reaches login from splash', (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    await tester.pumpWidget(const ShareMealApp());
    expect(find.byKey(const ValueKey('figma/6:220')), findsOneWidget);
    await tester.pump(const Duration(milliseconds: 1300));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:229')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('tap/6:229/98:1351')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:246')), findsOneWidget);
    expect(find.byType(TextField), findsNWidgets(2));
    expect(tester.takeException(), isNull);
  });

  testWidgets('Registration and charity tracking are reachable from login',
      (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final controller = FigmaPrototypeController(enableTimeouts: false);
    await tester.pumpWidget(
        ShareMealApp(initialRoute: '/auth/login', prototype: controller));
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('tap/6:246/98:1225')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/46:526')), findsOneWidget);
    final navigator = tester.state<NavigatorState>(find.byType(Navigator));
    navigator.pop();
    await tester.pumpAndSettle();
    await tester.tap(find.byKey(const ValueKey('tap/6:246/98:1195')));
    await tester.pumpAndSettle();
    expect(find.text('hoasen@tochuc.vn'), findsOneWidget);
    final roleCheck = tester.widget<FigmaBox>(
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '105:1145'));
    expect(roleCheck.width, 12);
    expect(roleCheck.height, 12);
    expect(roleCheck.style['position'], 'absolute');
    final inputs = find.byType(TextField);
    await tester.enterText(inputs.at(0), 'hoasen@tochuc.vn');
    await tester.enterText(inputs.at(1), '123456');
    await tester.tap(find.byKey(const ValueKey('tap/6:246/98:1222')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:1155')), findsOneWidget);
    await tester.tap(find.byKey(const ValueKey('tap/6:1155/66:1398')));
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:1525')), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
    controller.dispose();
  });

  testWidgets(
      'Tracking renders delivery progress and conditional driver details',
      (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final controller = FigmaPrototypeController(enableTimeouts: false);
    controller.values
        .addAll({'VariableID:80:1177': true, 'VariableID:80:1178': true});
    controller.apply(controller.actionsFor('6:1155', '66:1398'));
    await tester.pumpWidget(ShareMealApp(
        initialRoute: '/user/organization/order-tracking',
        prototype: controller));
    await tester.pumpAndSettle();
    expect(find.text('80%'), findsOneWidget);
    expect(find.text('Đang giao đến tổ chức'), findsOneWidget);
    expect(find.text('Trần Quốc Bảo'), findsOneWidget);
    final driver = tester.widget<FigmaBox>(
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '110:1214'));
    expect(driver.width, 358);
    expect(driver.fixedHeight, isFalse);
    expect(driver.height, inInclusiveRange(100, 110));
    final receipt = find.byKey(const ValueKey('tap/6:1525/110:1223'));
    await tester.ensureVisible(receipt);
    await tester.pumpAndSettle();
    await tester.tap(receipt);
    await tester.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/65:1098')), findsOneWidget);
    expect(tester.takeException(), isNull);
    await tester.pumpWidget(const SizedBox.shrink());
    controller.dispose();
  });
}
