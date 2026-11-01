import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/interaction/food_photo.dart';
import 'package:sharemeal/presentation/shared/interaction/meal_map.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';
import 'package:sharemeal/presentation/user/volunteer/widgets/delivery_jobs_content.dart';
import 'package:sharemeal/presentation/user/donor/widgets/request_matching_panels.dart';

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
      {String role = 'donor', bool demo = false}) async {
    if (!Platform.isAndroid) {
      t.view.physicalSize = const Size(402, 874);
      t.view.devicePixelRatio = 1;
      addTearDown(t.view.resetPhysicalSize);
      addTearDown(t.view.resetDevicePixelRatio);
    }
    final c = FigmaPrototypeController(enableTimeouts: false);
    c.values['VariableID:80:1172'] = role;
    if (demo) c.frontend.addDemoRequests();
    await t.pumpWidget(ShareMealApp(
        key: ValueKey('$route/$role'), initialRoute: route, prototype: c));
    await t.pumpAndSettle();
    addTearDown(c.dispose);
    return c;
  }

  testWidgets(
      'Profile keeps role bottom navigation and back works at navigator root for all user roles',
      (t) async {
    for (final row in const [
      ['donor', '6:319'],
      ['charity', '6:1155'],
      ['volunteer', '6:1737']
    ]) {
      await open(t, '/shared/profile', role: row[0]);
      expect(find.byKey(ValueKey('nav/${row[0]}/0')), findsOneWidget);
      if (row[0] == 'volunteer') {
        await t.tap(find.text('Huy hiệu & đóng góp'));
        await t.pumpAndSettle();
        expect(find.byKey(const ValueKey('figma/6:2142')), findsOneWidget);
        t.state<NavigatorState>(find.byType(Navigator)).pop();
        await t.pumpAndSettle();
      }
      await t.tap(find.byKey(const ValueKey('profile/back')));
      await t.pumpAndSettle();
      expect(find.byKey(ValueKey('figma/${row[1]}')), findsOneWidget);
      expect(t.takeException(), isNull);
    }
  });
  testWidgets(
      'Bottom tab Profile retains volunteer identity; Android-style back returns home',
      (t) async {
    final c = await open(t, '/user/volunteer/dashboard', role: 'donor');
    await t.tap(find.byKey(const ValueKey('nav/volunteer/4')));
    await t.pumpAndSettle();
    expect(c.values['VariableID:80:1172'], 'volunteer');
    expect(find.byKey(const ValueKey('nav/volunteer/1')), findsOneWidget);
    await t.state<NavigatorState>(find.byType(Navigator)).maybePop();
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('figma/6:1737')), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'Food photos are category specific and uploaded photo takes precedence',
      (t) async {
    expect(foodPhotoAsset('Canh rau củ', 'Rau củ'), endsWith('soup.png'));
    expect(foodPhotoAsset('Bánh mì', 'Bánh'), endsWith('bread.png'));
    expect(foodPhotoAsset('Rau củ', 'Rau củ'), endsWith('vegetables.png'));
    await open(t, '/user/donor/my-listings');
    expect(find.byType(FoodPhoto), findsWidgets);
    expect(find.byType(Image), findsWidgets);
    final fixture = Platform.isAndroid
        ? (await t.runAsync(() async {
            final dir = await getTemporaryDirectory();
            final bytes = await rootBundle
                .load('assets/figma/b06546c1-6369-4414-803f-e9faf884379d.png');
            return File('${dir.path}/sharemeal-upload-preview-test.jpg')
                .writeAsBytes(bytes.buffer.asUint8List());
          }))!
        : File('assets/figma/b06546c1-6369-4414-803f-e9faf884379d.png');
    // Native widget exposes the actual FileImage rather than replacing user data with stock.
    await t.pumpWidget(MaterialApp(
        home: SizedBox(
            width: 100,
            height: 100,
            child: FoodPhoto(
                name: 'Món mới',
                category: 'Bánh',
                photo: fixture.absolute.path))));
    await t.pumpAndSettle();
    expect(t.widget<Image>(find.byType(Image)).image, isA<FileImage>());
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'Requests and matching display multiple real-model cards with images; selection accepts correct order',
      (t) async {
    final c = await open(t, '/user/donor/matching', demo: true);
    expect(find.byType(RequestMatchingPanel), findsOneWidget);
    expect(c.frontend.orders.where((o) => o.status == 'awaiting').length,
        greaterThanOrEqualTo(4));
    final button = find.text('Ghép tổ chức này').first;
    await t.ensureVisible(button);
    await t.tap(button);
    await t.pumpAndSettle();
    expect(c.frontend.selectedOrder.status, 'accepted');
    expect(find.byKey(const ValueKey('figma/6:3516')), findsOneWidget);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'Jobs has one live list, horizontally scrollable filters and safe Google Maps setup state',
      (t) async {
    final messenger =
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    const channel = MethodChannel('sharemeal/maps_config');
    messenger.setMockMethodCallHandler(channel, (_) async => false);
    addTearDown(() => messenger.setMockMethodCallHandler(channel, null));
    await open(t, '/user/volunteer/available-jobs', role: 'volunteer');
    expect(find.byType(DeliveryJobsContent), findsOneWidget);
    expect(
        find.byWidgetPredicate((w) =>
            w is FigmaBox && ['6:1844', '6:1850', '6:1826'].contains(w.nodeId)),
        findsNothing);
    expect(find.byKey(const ValueKey('job/DN-367')), findsOneWidget);
    final filter = find.byKey(const ValueKey('jobs/filter/Có tủ Lạnh'));
    await t.ensureVisible(filter);
    await t.tap(filter);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('job/DN-367')), findsNothing);
    await t.tap(find.byIcon(Icons.map_outlined).first);
    await t.pumpAndSettle();
    expect(find.byKey(const ValueKey('map/open-google')), findsOneWidget);
    expect(find.text('Chưa cấu hình khóa bản đồ trong app'), findsNothing);
    expect(t.takeException(), isNull);
  });
  testWidgets(
      'Job detail and both pickup/tracking previews replace fake maps without clipped text',
      (t) async {
    const channel = MethodChannel('sharemeal/maps_config');
    final messenger =
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    messenger.setMockMethodCallHandler(channel, (_) async => false);
    addTearDown(() => messenger.setMockMethodCallHandler(channel, null));
    for (final route in [
      '/user/volunteer/job-detail',
      '/user/volunteer/pickup',
      '/user/donor/order-tracking',
      '/user/volunteer/accept-job'
    ]) {
      await open(t, route,
          role: route.contains('/donor/') ? 'donor' : 'volunteer');
      if (!route.endsWith('accept-job')) {
        expect(find.byType(MealMap), findsOneWidget);
        expect(find.byKey(const ValueKey('map/open-google')), findsOneWidget);
        final mapRect = t.getRect(find.byType(MealMap));
        expect(mapRect.left, greaterThanOrEqualTo(0));
        expect(
            mapRect.right,
            lessThanOrEqualTo(
                t.view.physicalSize.width / t.view.devicePixelRatio + 1));
      }
      expect(find.text('~ 25 phút'), findsNothing);
      expect(find.text('0,8 km - ~4 phút'), findsNothing);
      expect(t.takeException(), isNull);
    }
  });
  testWidgets(
      'Long multiline input stays inside editable area without RenderFlex overflow',
      (t) async {
    await open(t, '/user/donor/edit-listing');
    final field = find.byKey(const ValueKey('input/edit.note'));
    await t.ensureVisible(field);
    await t.enterText(
        field, List.filled(10, 'Ghi chú cho người nhận thực phẩm.').join('\n'));
    await t.pumpAndSettle();
    expect(t.widget<TextField>(field).maxLines, inInclusiveRange(1, 3));
    expect(t.takeException(), isNull);
  });
  test(
      'Adding demo requests preserves prior orders and does not duplicate awaiting samples',
      () {
    final s = FrontendState();
    final original = s.orders.map((o) => o.id).toSet();
    s.addDemoRequests();
    final count = s.orders.length;
    s.addDemoRequests();
    expect(s.orders.length, count);
    expect(s.orders.map((o) => o.id).toSet().containsAll(original), true);
    expect(s.orders.where((o) => o.id.startsWith('DEMO-')).length, 3);
    s.dispose();
  });
}
