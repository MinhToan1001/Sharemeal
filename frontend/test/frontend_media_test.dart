import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_actions.dart';
import 'package:sharemeal/presentation/shared/interaction/frontend_state.dart';
import 'package:sharemeal/presentation/user/donor/widgets/verification_widgets.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();
  testWidgets(
      'Image picker cancel/denied do not count; selected real files copy, replace and remove correctly',
      (t) async {
    t.view.physicalSize = const Size(402, 874);
    t.view.devicePixelRatio = 1;
    addTearDown(t.view.resetPhysicalSize);
    addTearDown(t.view.resetDevicePixelRatio);
    final artifacts = Directory('build/test-media')
      ..createSync(recursive: true);
    final temp = artifacts.createTempSync('picker-');
    addTearDown(() async {
      try {
        await temp.delete(recursive: true);
      } on FileSystemException catch (error) {
        if (error.osError?.errorCode != 32) rethrow;
        // Windows codecs can memory-map thumbnails until the test engine exits.
        // These generated fixtures stay in ignored build/, not the source tree.
        debugPrint('Windows thumbnail fixture cleanup deferred: ${temp.path}');
      }
    });
    final source =
        File('assets/figma/1f5d1444-90df-44f6-af84-91ae84e86cc1.png').absolute;
    String? result;
    bool denied = false;
    final messenger =
        TestDefaultBinaryMessengerBinding.instance.defaultBinaryMessenger;
    const imageChannel = MethodChannel('plugins.flutter.io/image_picker');
    const pathChannel = MethodChannel('plugins.flutter.io/path_provider');
    messenger.setMockMethodCallHandler(imageChannel, (call) async {
      if (denied) throw PlatformException(code: 'photo_access_denied');
      return result;
    });
    messenger.setMockMethodCallHandler(pathChannel, (call) async => temp.path);
    addTearDown(() {
      messenger.setMockMethodCallHandler(imageChannel, null);
      messenger.setMockMethodCallHandler(pathChannel, null);
    });
    final c = FigmaPrototypeController(enableTimeouts: false);
    addTearDown(c.dispose);
    await t.pumpWidget(ShareMealApp(
        initialRoute: '/user/donor/facility-photos', prototype: c));
    await t.pumpAndSettle();
    Future<void> pick(String slot) async {
      final context = t.element(find.byType(FacilityPhotos));
      await t.runAsync(() => FrontendActions.run(context, '6:2754',
          {'action': 'pickImage', 'key': 'facility.photo.$slot'}));
      await t.pumpAndSettle();
    }

    await pick('front');
    expect(c.frontend.facilityPhotoCount, 0);
    denied = true;
    await pick('front');
    expect(c.frontend.facilityPhotoCount, 0);
    denied = false;
    result = source.path;
    for (final slot in FrontendState.facilitySlots) {
      await pick(slot);
      final saved = File(c.frontend.get('facility.photo.$slot', ''));
      expect(saved.existsSync(), true);
      expect(saved.path, isNot(source.path));
      expect(saved.lengthSync(), source.lengthSync());
    }
    expect(c.frontend.facilityPhotoCount, 5);
    await pick('front');
    expect(c.frontend.facilityPhotoCount, 5);
    final button = find.byWidgetPredicate(
        (w) => w is FigmaBox && w.control['action'] == 'facilityContinue');
    expect(
        t
            .widget<InkWell>(find
                .descendant(of: button, matching: find.byType(InkWell))
                .first)
            .onTap,
        isNotNull);
    ScaffoldMessenger.of(t.element(button)).removeCurrentSnackBar();
    await t.pumpAndSettle();
    await t.tap(find.byKey(const ValueKey('facility/slot/front')));
    await t.pumpAndSettle();
    await t.tap(find.text('Gỡ ảnh khỏi hồ sơ'));
    await t.pumpAndSettle();
    expect(c.frontend.facilityPhotoCount, 4);
    expect(
        t
            .widget<InkWell>(find
                .descendant(of: button, matching: find.byType(InkWell))
                .first)
            .onTap,
        isNull);
    expect(t.takeException(), isNull);
    // Let native image codecs finish before evicting file-backed thumbnails on Windows.
    await t.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 500)));
    await t.pumpWidget(const SizedBox.shrink());
    PaintingBinding.instance.imageCache.clear();
    PaintingBinding.instance.imageCache.clearLiveImages();
    await t.pump(const Duration(seconds: 5));
    await t.runAsync(
        () => Future<void>.delayed(const Duration(milliseconds: 200)));
  });
}
