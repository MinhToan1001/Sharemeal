import 'package:flutter/material.dart';
import 'dart:io';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';

void main() {
  Future<FigmaPrototypeController> open(
      WidgetTester tester, String route) async {
    if (!Platform.isAndroid) {
      tester.view.physicalSize = const Size(402, 874);
      tester.view.devicePixelRatio = 1;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);
    }
    final c = FigmaPrototypeController(enableTimeouts: false);
    await tester.pumpWidget(ShareMealApp(initialRoute: route, prototype: c));
    await tester.pumpAndSettle();
    addTearDown(c.dispose);
    return c;
  }

  testWidgets('Storage, multiple allergens and safety checkboxes change state',
      (t) async {
    final c = await open(t, '/user/donor/food-safety');
    await t.tap(find.byKey(const ValueKey('control/6:416/74:1179/Để lạnh')));
    await t.pumpAndSettle();
    expect(c.frontend.get('food.storage', ''), 'Để lạnh');
    await t.tap(find.byKey(const ValueKey('control/6:416/74:1190/Hải sản')));
    await t.pumpAndSettle();
    expect(c.frontend.values['food.allergens'], ['Trứng', 'Hải sản']);
    await t.tap(find.byKey(const ValueKey('check/food.safe.fresh')));
    await t.pumpAndSettle();
    expect(c.frontend.get('food.safe.fresh', true), false);
    await t.tap(find.byKey(const ValueKey('tap/6:416/74:1206')));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:416')), findsOneWidget);
    expect(find.textContaining('Cần xác nhận'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets('Quantity plus/minus updates real displayed number', (t) async {
    final c = await open(t, '/user/donor/create-listing');
    await t.tap(find.byKey(const ValueKey('control/6:370/74:1092/step')));
    await t.pumpAndSettle();
    expect(c.frontend.get('food.quantity', 0), 21);
    expect(find.text('21'), findsOneWidget);
    await t.tap(find.byKey(const ValueKey('control/6:370/74:1090/step')));
    await t.pumpAndSettle();
    expect(c.frontend.get('food.quantity', 0), 20);
  });
  testWidgets('Search changes visible cards and has a no-results state',
      (t) async {
    await open(t, '/user/organization/food-discovery');
    await t.enterText(
        find.byKey(const ValueKey('input/market.query')), 'cơm gà');
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('food/SM-2041')), findsOneWidget);
    expect(find.byKey(const ValueKey('food/SM-2040')), findsNothing);
    expect(find.byKey(const ValueKey('food/SM-2039')), findsNothing);
    await t.enterText(
        find.byKey(const ValueKey('input/market.query')), 'món không có');
    await t.pumpAndSettle();
    expect(find.text('Không có món ăn phù hợp'), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets('All donor tabs keep donor navigation and Impact is not History',
      (t) async {
    final c = await open(t, '/user/donor/dashboard');
    c.frontend.history
      ..clear()
      ..add({
        'quantity': 43,
        'kg': 21.5,
        'completedAt': DateTime.now().toIso8601String(),
        'category': 'Rau củ'
      });
    await t.tap(find.byKey(const ValueKey('nav/donor/1')));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:1087')), findsOneWidget);
    expect(find.text('Tìm đồ ăn'), findsNothing);
    await t.tap(find.byKey(const ValueKey('nav/donor/2')));
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/donor-impact')), findsOneWidget);
    expect(find.byKey(const ValueKey('figma/6:723')), findsNothing);
    await t.tap(find.byKey(const ValueKey('impact/Tuần')));
    await t.pumpAndSettle();
    expect(find.text('43'), findsWidgets);
    expect(t.takeException(), isNull);
  });
}
