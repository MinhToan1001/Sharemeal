import 'package:flutter/material.dart';
import 'auth_routes.dart';
import 'admin_routes.dart';
import 'donor_routes.dart';
import 'organization_routes.dart';
import 'shared_routes.dart';
import 'volunteer_routes.dart';
import '../../presentation/user/donor/pages/impact_report_page.dart';
import 'session_route_gate.dart';
import '../../presentation/user/volunteer/pages/pickup_photo_page.dart';
import '../../presentation/user/volunteer/pages/handover_scanner_page.dart';
import '../../presentation/shared/controllers/firebase_app_state.dart';
import '../../presentation/shared/figma/figma_prototype_controller.dart';

Widget _handoverPage(BuildContext context) =>
    FigmaPrototypeScope.of(context).frontend is FirebaseAppState
        ? const UserVolunteerPickupPhotoPage()
        : const UserVolunteerHandoverScannerPage();

abstract final class AppRouter {
  static final Map<String, WidgetBuilder> pages = {
    ...AuthRoutes.pages,
    ...AdminRoutes.pages,
    ...DonorRoutes.pages,
    ...OrganizationRoutes.pages,
    ...VolunteerRoutes.pages,
    ...SharedRoutes.pages,
    DonorImpactReportPage.routeName: (_) => const DonorImpactReportPage(),
    '/shared/handover-scanner': _handoverPage,
    '/user/volunteer/handover-scanner': _handoverPage,
  };

  static Route<dynamic> onGenerateRoute(RouteSettings settings) {
    final builder = pages[settings.name];
    if (builder == null) {
      throw FlutterError('Unknown ShareMeal route: ${settings.name}');
    }
    return PageRouteBuilder<void>(
      settings: settings,
      pageBuilder: (context, animation, secondaryAnimation) =>
          SessionRouteGate(route: settings.name!, child: builder(context)),
      transitionDuration: const Duration(milliseconds: 180),
      reverseTransitionDuration: const Duration(milliseconds: 180),
      transitionsBuilder: (context, animation, secondaryAnimation, child) =>
          FadeTransition(opacity: animation, child: child),
    );
  }
}
