import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/routing/app_router.dart';
import 'package:sharemeal/presentation/shared/figma/figma_prototype_data.dart';

void main() {
  test('104 Figma frames have distinct native routes', () {
    expect(figmaFrameRoutes.length, 104);
    expect(figmaFrameRoutes.values.toSet().length, 104);
    expect(AppRouter.pages.keys.toSet(), {
      ...figmaFrameRoutes.values,
      '/user/donor/impact-report',
      '/shared/handover-scanner'
    });
    for (final name in figmaFrameRoutes.values) {
      expect(AppRouter.onGenerateRoute(RouteSettings(name: name)).settings.name,
          name);
    }
  });
  test('Every prototype destination exists', () {
    void inspect(dynamic item) {
      if (item is List) {
        for (final child in item) {
          inspect(child);
        }
      } else if (item is Map) {
        if (item['destinationId'] != null) {
          expect(figmaFrameRoutes.containsKey(item['destinationId']), isTrue,
              reason: item['destinationId'].toString());
        }
        for (final child in item.values) {
          inspect(child);
        }
      }
    }

    inspect(figmaPrototypeActions);
  });
}
