import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/domain/models/meal_models.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/media_gallery.dart';
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
    if (!Platform.isAndroid) {
      t.view.physicalSize = const Size(402, 874);
      t.view.devicePixelRatio = 1;
      addTearDown(t.view.resetPhysicalSize);
      addTearDown(t.view.resetDevicePixelRatio);
    }
    final c = FigmaPrototypeController(frontend: state, enableTimeouts: false);
    await t.pumpWidget(
        ShareMealApp(key: UniqueKey(), prototype: c, initialRoute: route));
    await t.pumpAndSettle();
    addTearDown(c.dispose);
    return c;
  }

  Finder node(String id) =>
      find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == id);

  testWidgets(
      'Full button labels, readable safety checks and line-only page headers',
      (t) async {
    for (final pair in const [
      ['/auth/login', 'Đăng nhập'],
      ['/user/organization/create-need', 'Đăng nhu cầu'],
      ['/user/donor/food-safety', 'Tiếp tục: Địa điểm & giờ lấy']
    ]) {
      await open(t, pair[0]);
      expect(find.text(pair[1]), findsWidgets);
      for (final paragraph
          in t.renderObjectList<RenderParagraph>(find.byType(RichText))) {
        expect(paragraph.didExceedMaxLines, false,
            reason: paragraph.text.toPlainText());
      }
      expect(t.takeException(), isNull);
    }
    for (final text in [
      'Chưa ăn dở hoặc bị chạm vào',
      'Đóng hộp sạch, có nắp',
      'Không có dấu hiệu hỏng'
    ]) {
      final rect = t.getRect(find.text(text));
      expect(rect.width, greaterThan(100), reason: text);
      // The repaired text must not be shrunk to a tiny two-line label.
      final render = t.renderObject<RenderParagraph>(find.descendant(
          of: find.text(text), matching: find.byType(RichText)));
      final transform = render.getTransformTo(null);
      expect(transform.entry(0, 0), greaterThan(.8));
    }
    await open(t, '/user/organization/create-need');
    final before = find.byKey(const ValueKey('field/need.before'));
    expect(t.getRect(before).right,
        lessThanOrEqualTo(t.view.physicalSize.width / t.view.devicePixelRatio));
    expect(t.getRect(before).width, greaterThan(130));
    await open(t, '/user/organization/food-discovery');
    final borders = t
        .widgetList<DecoratedBox>(find.descendant(
            of: node('6:1247'), matching: find.byType(DecoratedBox)))
        .map((w) => w.decoration)
        .whereType<BoxDecoration>()
        .map((d) => d.border)
        .whereType<Border>();
    expect(
        borders.any((b) =>
            b.bottom.width > 0 &&
            b.left.width == 0 &&
            b.right.width == 0 &&
            b.top.width == 0),
        true);
  });

  testWidgets('Last category can be reached by horizontal swipe and selected',
      (t) async {
    final c = await open(t, '/user/organization/food-discovery');
    final strip = find.byKey(const ValueKey('figma/scroll-x/6:1256'));
    expect(strip, findsOneWidget);
    await t.drag(strip, const Offset(-250, 0));
    await t.pumpAndSettle();
    expect(t.getRect(strip).contains(t.getCenter(find.text('Rau củ'))), true);
    await t.tap(find.text('Rau củ'));
    await t.pumpAndSettle();
    expect(c.frontend.get('market.category', ''), 'Rau củ');
    expect(t.takeException(), isNull);
  });

  test('RTDB image arrays/maps and old cover-only records preserve all photos',
      () {
    expect(FoodListing.photoUrls({'1': 'b.png', '0': 'a.png'}, 'a.png'),
        ['a.png', 'b.png']);
    expect(FoodListing.photoUrls(null, 'old.jpg'), ['old.jpg']);
  });

  testWidgets('Admin switches between two foods and can swipe/zoom every image',
      (t) async {
    final s = FirebaseAppState(TestServices()..auth.account = TestUser());
    final data = view(role: 'admin');
    final food =
        Map<String, dynamic>.from((data['foods'] as List).first as Map);
    // Asset fixture files: no Firebase accounts/records or cloud uploads.
    final directory = Directory(Platform.isAndroid
        ? '${(await getTemporaryDirectory()).path}/ui-display'
        : 'build/test-media/ui-display')
      ..createSync(recursive: true);
    final paths = <String>[];
    for (final name in ['vegetables', 'bread']) {
      final bytes = await rootBundle.load('assets/images/food/$name.png');
      final f = File('${directory.absolute.path}/$name.png');
      f.writeAsBytesSync(
          bytes.buffer.asUint8List(bytes.offsetInBytes, bytes.lengthInBytes));
      paths.add(f.path);
    }
    s.applyView({
      ...data,
      'profile': {...data['profile'] as Map, 'verificationStatus': 'approved'},
      'foods': [
        for (var i = 0; i < 2; i++)
          {
            ...food,
            'id': 'food-$i',
            'name': 'Món kiểm tra $i',
            'photo': paths.first,
            'photos': paths,
            'safe': true,
            'status': 'pending'
          }
      ]
    });
    FigmaPrototypeController? controller;
    for (var i = 0; i < 2; i++) {
      s.set('admin.selection.kind', 'foods');
      s.set('admin.selection.id', 'food-$i');
      if (controller == null) {
        controller = await open(t, '/admin/donor-review', state: s);
      } else {
        await t.pumpWidget(ShareMealApp(
            key: UniqueKey(),
            prototype: controller,
            initialRoute: '/admin/donor-review'));
        await t.pumpAndSettle();
      }
      expect(find.text('Món kiểm tra $i'), findsWidgets);
      final gallery = find.byType(MediaGallery);
      await t.scrollUntilVisible(gallery, 200,
          scrollable: find.byType(Scrollable).first);
      expect(find.text('Ảnh món ăn · 2 ảnh'), findsOneWidget);
      expect(t.widget<MediaGallery>(gallery).urls.length, 2);
      await t.runAsync(
          () => Future<void>.delayed(const Duration(milliseconds: 120)));
      await t.pumpAndSettle();
      expect(find.textContaining('1/2'), findsOneWidget);
      await t.drag(find.byType(PageView).last, const Offset(-250, 0));
      await t.pumpAndSettle();
      expect(find.textContaining('2/2'), findsOneWidget);
      await t.tap(find.byKey(const ValueKey('media/open/1')));
      await t.pumpAndSettle();
      expect(find.byType(InteractiveViewer), findsOneWidget);
      Navigator.of(t.element(find.byType(InteractiveViewer))).pop();
      await t.pumpAndSettle();
      expect(t.takeException(), isNull);
    }
  });
}
