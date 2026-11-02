import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:path_provider/path_provider.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_controller.dart';
import 'package:sharemeal/presentation/shared/interaction/meal_map.dart';
import '../test/ui_display_repair_test.dart' as display;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  display.main();
  testWidgets(
      'Android: real street tiles load inside preview; Google Maps entry remains available',
      (t) async {
    final client = HttpClient()
      ..connectionTimeout = const Duration(seconds: 15);
    try {
      final req = await client.getUrl(
          Uri.parse('https://a.tile.openstreetmap.fr/hot/15/26096/15397.png'));
      req.headers
          .set('User-Agent', 'ShareMeal-demo/1.0 (com.example.sharemeal)');
      final response = await req.close();
      expect(response.statusCode, 200);
      var size = 0;
      await for (final chunk in response) {
        size += chunk.length;
      }
      expect(size, greaterThan(1000));
    } finally {
      client.close(force: true);
    }
    final c = FigmaPrototypeController(enableTimeouts: false);
    c.frontend.selectedFood.latitude = 10.7769;
    c.frontend.selectedFood.longitude = 106.7009;
    await t.pumpWidget(FigmaPrototypeScope(
        controller: c,
        child: MaterialApp(
            home: RepaintBoundary(
                key: const ValueKey('map-capture'),
                child: Scaffold(
                    appBar: AppBar(title: const Text('Bản đồ xem trước')),
                    body: const Padding(
                        padding: EdgeInsets.all(20),
                        child: SizedBox(height: 280, child: MealMap())))))));
    for (var i = 0; i < 60; i++) {
      await t.pump(const Duration(milliseconds: 100));
      await Future<void>.delayed(const Duration(milliseconds: 100));
      if (t
          .renderObjectList<RenderImage>(find.byType(RawImage))
          .any((r) => r.image != null)) {
        break;
      }
    }
    expect(
        t
            .renderObjectList<RenderImage>(find.byType(RawImage))
            .any((r) => r.image != null),
        true,
        reason:
            'Preview must contain decoded street tile images, not only an address');
    expect(find.byKey(const ValueKey('map/open-google')), findsOneWidget);
    expect(find.text('© OpenStreetMap · HOT / OSM France'), findsOneWidget);
    final boundary = t.renderObject<RenderRepaintBoundary>(
        find.byKey(const ValueKey('map-capture')));
    final image = await boundary.toImage(pixelRatio: 1);
    final bytes = await image.toByteData(format: ui.ImageByteFormat.png);
    final file =
        File('${(await getTemporaryDirectory()).path}/ui-map-preview.png');
    await file.writeAsBytes(bytes!.buffer.asUint8List());
    image.dispose();
    debugPrint('UI MAP CAPTURE: ${file.path}');
    expect(t.takeException(), isNull);
    await t.pumpWidget(const SizedBox());
    c.dispose();
  });
}
