import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_actions.dart';
import 'package:sharemeal/presentation/shared/interaction/media_gallery.dart';

void main() {
  testWidgets(
      'Multi picker caps six photos; remove then add one; preview stays a gallery and picker stays a button',
      (t) async {
    t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final directory = Directory('build/test-media/multi-food')
      ..createSync(recursive: true);
    final source = File('assets/images/food/vegetables.png').absolute.path;
    final messenger =
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    const images = MethodChannel('plugins.flutter.io/image_picker');
    const paths = MethodChannel('plugins.flutter.io/path_provider');
    var single = false;
    messenger.setMockMethodCallHandler(
        images, (call) async => single ? source : List.filled(8, source));
    messenger.setMockMethodCallHandler(
        paths, (_) async => directory.absolute.path);
    addTearDown(() {
      messenger.setMockMethodCallHandler(images, null);
      messenger.setMockMethodCallHandler(paths, null);
    });
    final c = FigmaPrototypeController(enableTimeouts: false);
    addTearDown(c.dispose);
    await t.pumpWidget(
        ShareMealApp(prototype: c, initialRoute: '/user/donor/create-listing'));
    await t.pumpAndSettle();
    Future<void>? pending;
    Future<void> pick() async {
      final context = t.element(find.byType(Scaffold).first);
      await t.runAsync(() async {
        final previous =
            (c.frontend.values['food.photos'] as List? ?? []).length;
        pending = FrontendActions.run(context, '6:370',
            {'kind': 'action', 'action': 'pickImage', 'key': 'food.photo'});
        final deadline = DateTime.now().add(const Duration(seconds: 8));
        while ((c.frontend.values['food.photos'] as List? ?? []).length ==
                previous &&
            DateTime.now().isBefore(deadline)) {
          await Future<void>.delayed(const Duration(milliseconds: 50));
        }
      });
      await t.pumpAndSettle();
    }

    Future<void> close() async {
      Navigator.of(t.element(find.text('Ảnh món ăn'))).pop();
      await t.pumpAndSettle();
      await t.runAsync(() async {
        await pending;
      });
    }

    await pick();
    expect((c.frontend.values['food.photos'] as List).length, 6);
    await t.tap(find.byIcon(Icons.delete_outline).first);
    await t.pumpAndSettle();
    expect((c.frontend.values['food.photos'] as List).length, 5);
    await close();
    expect(find.text('Chọn / thêm nhiều ảnh (5/6)'), findsOneWidget);
    expect(t.widget<MediaGallery>(find.byType(MediaGallery)).compact, true);
    single = true;
    await pick();
    expect((c.frontend.values['food.photos'] as List).length, 6);
    await close();
    expect(find.text('Chọn / thêm nhiều ảnh (6/6)'), findsOneWidget);
    expect(t.takeException(), isNull);
    await t.pumpWidget(const SizedBox());
  });
}
