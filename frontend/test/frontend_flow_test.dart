import 'package:flutter/material.dart';
import 'dart:io';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_actions.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  setUpAll(() async {
    await (FontLoader('Inter')
          ..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf')))
        .load();
  });
  test(
      'Local drafts and published listings survive a repository reload; secrets do not',
      () async {
    SharedPreferences.setMockInitialValues({});
    final s = FrontendState();
    await s.load();
    s.set('food.name', 'Cơm gà để test');
    s.set('food.storage', 'Để lạnh');
    s.set('auth.login.password', 'do-not-store');
    s.publishFood();
    await s.flush();
    final restored = FrontendState();
    await restored.load();
    expect(restored.get('food.name', ''), 'Cơm gà để test');
    expect(restored.foods.first.name, 'Cơm gà để test');
    expect(restored.values.containsKey('auth.login.password'), false);
    s.dispose();
    restored.dispose();
  });
  test('Report export generates a PDF from the current local data', () async {
    final bytes = await FrontendActions.reportPdf(FrontendState());
    expect(bytes.length, greaterThan(1000));
    expect(String.fromCharCodes(bytes.take(4)), '%PDF');
  });
  testWidgets(
      'Publish, search, request, donor approval, volunteer acceptance and receipt form use one model',
      (t) async {
    if(!Platform.isAndroid){t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);}
    final c = FigmaPrototypeController(enableTimeouts: false);
    final s = c.frontend;
    await t.pumpWidget(
        ShareMealApp(initialRoute: '/user/donor/create-listing', prototype: c));
    await t.pumpAndSettle();
    Future<void> tap(String key) async {
      final finder = find.byKey(ValueKey(key));
      await t.ensureVisible(finder);
      await t.tap(finder);
      await t.pumpAndSettle();
      expect(t.takeException(), isNull);
    }

    Future<void> go(String route, String role) async {
      c.values['VariableID:80:1172'] = role;
      t.state<NavigatorState>(find.byType(Navigator)).pushNamed(route);
      await t.pumpAndSettle();
    }

    await t.enterText(
        find.byKey(const ValueKey('input/food.name')), 'Cơm gà lá chanh');
    await tap('control/6:370/74:1092/step');
    await tap('tap/6:370/74:1094');
    await tap('control/6:416/74:1179/Để lạnh');
    await tap('tap/6:416/74:1206');
    await tap('tap/6:473/74:1316');
    expect(find.text('Cơm gà lá chanh · 21 suất'), findsOneWidget);
    expect(find.text('Để lạnh'), findsOneWidget);
    await tap('tap/6:517/74:1404');
    expect(s.selectedFood.name, 'Cơm gà lá chanh');
    final foodId = s.selectedFoodId;
    await go('/user/organization/food-discovery', 'charity');
    await t.enterText(
        find.byKey(const ValueKey('input/market.query')), 'cơm gà lá chanh');
    await t.pumpAndSettle();
    await tap('food/$foodId');
    await tap('tap/6:1282/73:1165');
    await tap('tap/6:1333/84:1582');
    expect(s.selectedOrder.status, 'awaiting');
    final orderId = s.selectedOrderId;
    await go('/user/donor/incoming-requests', 'donor');
    await t.tap(find.text('Chấp nhận').first);
    await t.pumpAndSettle();
    expect(s.selectedOrderId, orderId);
    expect(s.selectedOrder.status, 'accepted');
    await tap('tap/6:3516/84:1670');
    expect(s.selectedOrder.time, '19:30');
    await go('/user/volunteer/available-jobs', 'volunteer');
    await tap('job/$orderId');
    await tap('tap/6:1890/84:1613');
    await tap('tap/6:1944/84:1615');
    expect(s.selectedOrder.status, 'assigned');
    await tap('tap/6:1971/84:1623');
    await tap('tap/65:1068/65:1096');
    for (final (id, digit) in [
      ('6:2966', '4'),
      ('6:2968', '7'),
      ('6:2978', '2'),
      ('6:2990', '9'),
      ('6:2964', '1'),
      ('6:2966', '4')
    ]) {
      await tap('control/6:2937/$id/$digit');
    }
    await tap('tap/6:2937/84:1652');
    expect(s.get('handover.verified', false), true);
    expect(s.selectedOrder.status, 'pickedUp');
    // The camera/file chooser is an Android hardware boundary; receipt is tested with the already verified local order.
    await go('/user/organization/confirm-receipt', 'charity');
    await tap('tap/6:1573/84:1602');
    expect(s.selectedOrder.status, 'completed');
    expect(s.history.first['name'], 'Cơm gà lá chanh');
    await t.pumpWidget(const SizedBox.shrink());
    c.dispose();
  });
}
