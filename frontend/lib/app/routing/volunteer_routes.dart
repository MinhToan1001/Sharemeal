import 'package:flutter/widgets.dart';
import '../../presentation/user/volunteer/pages/dashboard_page.dart';
import '../../presentation/user/volunteer/pages/volunteer_profile_page.dart';
import '../../presentation/user/volunteer/pages/available_jobs_page.dart';
import '../../presentation/user/volunteer/pages/job_detail_page.dart';
import '../../presentation/user/volunteer/pages/accept_job_page.dart';
import '../../presentation/user/volunteer/pages/pickup_page.dart';
import '../../presentation/user/volunteer/pages/handover_scanner_page.dart';
import '../../presentation/user/volunteer/pages/pickup_photo_page.dart';
import '../../presentation/user/volunteer/pages/delivery_tracking_page.dart';
import '../../presentation/user/volunteer/pages/awaiting_receipt_page.dart';
import '../../presentation/user/volunteer/pages/delivery_complete_page.dart';
import '../../presentation/user/volunteer/pages/calendar_page.dart';
import '../../presentation/user/volunteer/pages/shift_registration_page.dart';
import '../../presentation/user/volunteer/pages/shift_registered_page.dart';
import '../../presentation/user/volunteer/pages/badges_page.dart';
abstract final class VolunteerRoutes { static final Map<String,WidgetBuilder> pages = {
UserVolunteerDashboardPage.routeName: (_) => const UserVolunteerDashboardPage(),
UserVolunteerVolunteerProfilePage.routeName: (_) => const UserVolunteerVolunteerProfilePage(),
UserVolunteerAvailableJobsPage.routeName: (_) => const UserVolunteerAvailableJobsPage(),
UserVolunteerJobDetailPage.routeName: (_) => const UserVolunteerJobDetailPage(),
UserVolunteerAcceptJobPage.routeName: (_) => const UserVolunteerAcceptJobPage(),
UserVolunteerPickupPage.routeName: (_) => const UserVolunteerPickupPage(),
UserVolunteerHandoverScannerPage.routeName: (_) => const UserVolunteerHandoverScannerPage(),
UserVolunteerPickupPhotoPage.routeName: (_) => const UserVolunteerPickupPhotoPage(),
UserVolunteerDeliveryTrackingPage.routeName: (_) => const UserVolunteerDeliveryTrackingPage(),
UserVolunteerAwaitingReceiptPage.routeName: (_) => const UserVolunteerAwaitingReceiptPage(),
UserVolunteerDeliveryCompletePage.routeName: (_) => const UserVolunteerDeliveryCompletePage(),
UserVolunteerCalendarPage.routeName: (_) => const UserVolunteerCalendarPage(),
UserVolunteerShiftRegistrationPage.routeName: (_) => const UserVolunteerShiftRegistrationPage(),
UserVolunteerShiftRegisteredPage.routeName: (_) => const UserVolunteerShiftRegisteredPage(),
UserVolunteerBadgesPage.routeName: (_) => const UserVolunteerBadgesPage(),
}; }
