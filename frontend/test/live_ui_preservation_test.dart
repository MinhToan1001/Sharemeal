import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/app/routing/app_router.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';
import 'package:sharemeal/presentation/shared/figma/live_figma_bindings.dart';
import 'backend_state_test.dart' show TestServices, TestUser, view;

class TestContext extends Fake implements BuildContext {}

void main() {
  test('Firebase text bindings preserve the original node geometry and styles',
      () {
    final services = TestServices()..auth.account = TestUser();
    final state = FirebaseAppState(services)..applyView(view());
    var checked = 0;
    void sameLayout(FigmaBox original, FigmaBox live) {
      expect([
        live.width,
        live.height,
        live.x,
        live.y,
        live.fixedHeight
      ], [
        original.width,
        original.height,
        original.x,
        original.y,
        original.fixedHeight
      ]);
      expect(live.style, original.style);
      expect(live.asset, original.asset);
      expect(live.children.length, original.children.length);
      checked++;
      for (var i = 0; i < original.children.length; i++) {
        sameLayout(original.children[i], live.children[i]);
      }
    }

    for (final route in [
      '/auth/login',
      '/auth/register',
      '/auth/email-verification',
      '/user/donor/dashboard',
      '/user/donor/create-listing',
      '/user/donor/listing-detail',
      '/user/organization/dashboard',
      '/user/organization/food-detail',
      '/user/volunteer/dashboard',
      '/admin/donor-review',
      '/admin/reports'
    ]) {
      final page = AppRouter.pages[route]!(TestContext()) as StatelessWidget;
      // Inspect the immutable generated specification without mounting a route.
      // ignore: invalid_use_of_protected_member
      final screen = page.build(TestContext()) as FigmaScreen;
      sameLayout(
          screen.child, bindLiveScreen(screen.child, screen.frameId, state));
    }
    expect(checked, greaterThan(300));
    state.dispose();
  });
}
