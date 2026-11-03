import 'package:flutter/material.dart';
import '../../presentation/shared/controllers/firebase_app_state.dart';
import '../../presentation/shared/figma/figma_prototype_controller.dart';
import '../../presentation/shared/interaction/app_navigation.dart';

/// Authorization only. Routes always render their original screen.
class SessionRouteGate extends StatelessWidget {
  const SessionRouteGate({super.key, required this.route, required this.child});
  final String route;
  final Widget child;
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    if (state is! FirebaseAppState || state.loading) return child;
    String? destination;
    if (state.user == null || state.profile['disabled'] == true) {
      if (!route.startsWith('/auth/')) destination = '/auth/login';
    } else if (!state.verified) {
      if (!route.startsWith('/auth/')) destination = '/auth/email-verification';
    } else if (state.role.isEmpty) {
      if (!route.startsWith('/auth/')) destination = '/auth/role-selection';
    } else {
      if (['/auth/splash', '/auth/welcome', '/auth/login'].contains(route)) {
        destination = homeRoute(state.role);
      }
      final prefix =
          '/user/${state.role == 'charity' ? 'organization' : state.role}/';
      if (route.startsWith('/admin/') && state.role != 'admin' ||
          route.startsWith('/user/') &&
              !route.startsWith(prefix) &&
              ![
                'organization-profile',
                'volunteer-profile',
                'donor-type',
                'individual-verification',
                'business-license',
                'facility-photos',
                'availability',
                'commitment',
                'food-discovery',
                'food-detail'
              ].any((suffix) => route.endsWith('/$suffix'))) {
        destination = homeRoute(state.role);
      }
      const forms = [
        'create-listing',
        'food-safety',
        'pickup-location',
        'listing-preview',
        'edit-listing',
        'create-need',
        'request-food',
        'record-distribution',
        'recipient-review',
        'thank-you'
      ];
      if (!state.approved &&
          state.role != 'admin' &&
          forms.any((suffix) => route.endsWith('/$suffix'))) {
        destination = state.profile['verificationStatus'] == 'draft'
            ? applicationRoute(state.role)
            : '/shared/verification-pending';
      }
    }
    if (destination != null && destination != route) {
      final target = destination;
      WidgetsBinding.instance.addPostFrameCallback((_) {
        if (context.mounted && ModalRoute.of(context)?.isCurrent == true) {
          Navigator.pushReplacementNamed(context, target);
        }
      });
    }
    return child;
  }
}

String applicationRoute(String role) => switch (role) {
      'charity' => '/user/organization/organization-profile',
      'volunteer' => '/user/volunteer/volunteer-profile',
      _ => '/user/donor/donor-type',
    };
