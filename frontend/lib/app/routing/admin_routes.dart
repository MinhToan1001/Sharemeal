import 'package:flutter/widgets.dart';
import '../../presentation/admin/pages/dashboard_page.dart';
import '../../presentation/admin/pages/approval_queue_page.dart';
import '../../presentation/admin/pages/donor_review_page.dart';
import '../../presentation/admin/pages/organization_review_page.dart';
import '../../presentation/admin/pages/volunteer_review_page.dart';
import '../../presentation/admin/pages/approval_result_page.dart';
import '../../presentation/admin/pages/supplement_request_page.dart';
import '../../presentation/admin/pages/rejection_result_page.dart';
import '../../presentation/admin/pages/dispatch_map_page.dart';
import '../../presentation/admin/pages/reassignment_result_page.dart';
import '../../presentation/admin/pages/complaint_review_page.dart';
import '../../presentation/admin/pages/case_resolution_page.dart';
import '../../presentation/admin/pages/account_management_page.dart';
import '../../presentation/admin/pages/reports_page.dart';
import '../../presentation/admin/pages/food_safety_incident_page.dart';
import '../../presentation/admin/pages/notifications_page.dart';
abstract final class AdminRoutes { static final Map<String,WidgetBuilder> pages = {
AdminDashboardPage.routeName: (_) => const AdminDashboardPage(),
AdminApprovalQueuePage.routeName: (_) => const AdminApprovalQueuePage(),
AdminDonorReviewPage.routeName: (_) => const AdminDonorReviewPage(),
AdminOrganizationReviewPage.routeName: (_) => const AdminOrganizationReviewPage(),
AdminVolunteerReviewPage.routeName: (_) => const AdminVolunteerReviewPage(),
AdminApprovalResultPage.routeName: (_) => const AdminApprovalResultPage(),
AdminSupplementRequestPage.routeName: (_) => const AdminSupplementRequestPage(),
AdminRejectionResultPage.routeName: (_) => const AdminRejectionResultPage(),
AdminDispatchMapPage.routeName: (_) => const AdminDispatchMapPage(),
AdminReassignmentResultPage.routeName: (_) => const AdminReassignmentResultPage(),
AdminComplaintReviewPage.routeName: (_) => const AdminComplaintReviewPage(),
AdminCaseResolutionPage.routeName: (_) => const AdminCaseResolutionPage(),
AdminAccountManagementPage.routeName: (_) => const AdminAccountManagementPage(),
AdminReportsPage.routeName: (_) => const AdminReportsPage(),
AdminFoodSafetyIncidentPage.routeName: (_) => const AdminFoodSafetyIncidentPage(),
AdminNotificationsPage.routeName: (_) => const AdminNotificationsPage(),
}; }
