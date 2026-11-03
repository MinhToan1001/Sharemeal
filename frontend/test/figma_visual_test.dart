import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_data.dart';

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  setUpAll(() async {
    final loader = FontLoader('Inter')
      ..addFont(rootBundle.load('assets/fonts/Inter-Variable.ttf'));
    await loader.load();
    await (FontLoader('MaterialIcons')
          ..addFont(rootBundle.load('fonts/MaterialIcons-Regular.otf')))
        .load();
  });

  testWidgets('Figma pages render as native Flutter widgets', (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    const filter = String.fromEnvironment('FIGMA_SCREEN_FILTER');
    final output = Directory('build/visual-tests/screens')
      ..createSync(recursive: true);
    final errors = <String>[];
    for (final entry in {
      ...figmaFrameRoutes,
      'donor-impact': '/user/donor/impact-report'
    }.entries) {
      if (filter.isNotEmpty && !filter.split(',').contains(entry.key)) continue;
      final controller = FigmaPrototypeController(enableTimeouts: false);
      if (['6:609', '6:1023'].contains(entry.key)) {
        controller.frontend.addDemoRequests();
      }
      await tester.pumpWidget(ShareMealApp(
        key: ValueKey(entry.key),
        initialRoute: entry.value,
        prototype: controller,
      ));
      await tester.pumpAndSettle();
      await tester.runAsync(() async {
        await Future<void>.delayed(const Duration(milliseconds: 100));
      });
      await tester.pumpAndSettle();
      final error = tester.takeException();
      if (error != null) errors.add('${entry.key}: $error');
      final boundary = tester.renderObject<RenderRepaintBoundary>(
          find.byKey(ValueKey('figma/${entry.key}')));
      await tester.runAsync(() async {
        final image = await boundary.toImage(pixelRatio: 1);
        final data = await image.toByteData(format: ui.ImageByteFormat.png);
        File('${output.path}/${entry.key.replaceAll(':', '_')}.png')
            .writeAsBytesSync(data!.buffer.asUint8List());
        image.dispose();
      });
      await tester.pumpWidget(const SizedBox.shrink());
      controller.dispose();
    }
    expect(errors, isEmpty);
  });

  testWidgets('Tracking layout renders all six conditional states',
      (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final output = Directory('build/visual-tests/states')
      ..createSync(recursive: true);
    for (final state in [
      ['accepted', false, false, false, '35%'],
      ['accepted', true, false, false, '55%'],
      ['accepted', true, true, false, '80%'],
      ['accepted', true, true, true, '100%'],
      ['awaiting', false, false, false, '15%'],
      ['cancelled', true, true, true, '0%'],
    ]) {
      final controller = FigmaPrototypeController(enableTimeouts: false);
      controller.values.addAll({
        'VariableID:80:1176': state[0],
        'VariableID:80:1177': state[1],
        'VariableID:80:1178': state[2],
        'VariableID:80:1180': state[3]
      });
      controller.apply(controller.actionsFor('6:1155', '66:1398'));
      await tester.pumpWidget(ShareMealApp(
          key: ValueKey(state[4]),
          initialRoute: figmaFrameRoutes['6:1525']!,
          prototype: controller));
      await tester.pumpAndSettle();
      await tester.runAsync(() async {
        await Future<void>.delayed(const Duration(milliseconds: 100));
      });
      await tester.pumpAndSettle();
      expect(find.text(state[4] as String), findsOneWidget);
      expect(tester.takeException(), isNull);
      final boundary = tester.renderObject<RenderRepaintBoundary>(
          find.byKey(const ValueKey('figma/6:1525')));
      await tester.runAsync(() async {
        final image = await boundary.toImage(pixelRatio: 1);
        final data = await image.toByteData(format: ui.ImageByteFormat.png);
        File('${output.path}/tracking_${state[4].toString().replaceAll('%', '')}.png')
            .writeAsBytesSync(data!.buffer.asUint8List());
        image.dispose();
      });
      await tester.pumpWidget(const SizedBox.shrink());
      controller.dispose();
    }
  });
}
