import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/sharemeal_app.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';

void main() {
  testWidgets('Original layered Figma fill remains green in community report',
      (tester) async {
    tester.view.physicalSize = const Size(402, 874);
    tester.view.devicePixelRatio = 1;
    addTearDown(tester.view.resetPhysicalSize);
    addTearDown(tester.view.resetDevicePixelRatio);
    final controller = FigmaPrototypeController(enableTimeouts: false);
    await tester.pumpWidget(ShareMealApp(
        initialRoute: '/shared/community-report', prototype: controller));
    await tester.pumpAndSettle();
    final card =
        find.byWidgetPredicate((w) => w is FigmaBox && w.nodeId == '6:2455');
    expect(card, findsOneWidget);
    final decorated = tester.widgetList<DecoratedBox>(
        find.descendant(of: card, matching: find.byType(DecoratedBox)));
    final decoration = decorated.first.decoration as BoxDecoration;
    expect(decoration.color, const Color(0xFF006642));
    final boundary = tester.renderObject<RenderRepaintBoundary>(
        find.byKey(const ValueKey('figma/6:2404')));
    await tester.runAsync(() async {
      final image = await boundary.toImage();
      final data = await image.toByteData(format: ui.ImageByteFormat.rawRgba);
      // Sample empty card fill; readable labels may now paint at the old point.
      final offset = (110 * image.width + 40) * 4;
      expect(data!.buffer.asUint8List().sublist(offset, offset + 4),
          [0, 102, 66, 255]);
      image.dispose();
    });
    await tester.pumpWidget(const SizedBox.shrink());
    controller.dispose();
  });
}
