import 'package:flutter/widgets.dart';
import '../../presentation/user/organization/pages/dashboard_page.dart';
import '../../presentation/user/organization/pages/organization_profile_page.dart';
import '../../presentation/user/organization/pages/food_discovery_page.dart';
import '../../presentation/user/organization/pages/food_detail_page.dart';
import '../../presentation/user/organization/pages/request_food_page.dart';
import '../../presentation/user/organization/pages/request_pending_page.dart';
import '../../presentation/user/organization/pages/awaiting_courier_page.dart';
import '../../presentation/user/organization/pages/orders_page.dart';
import '../../presentation/user/organization/pages/order_tracking_page.dart';
import '../../presentation/user/organization/pages/receipt_code_page.dart';
import '../../presentation/user/organization/pages/confirm_receipt_page.dart';
import '../../presentation/user/organization/pages/create_need_page.dart';
import '../../presentation/user/organization/pages/needs_page.dart';
import '../../presentation/user/organization/pages/warehouse_page.dart';
import '../../presentation/user/organization/pages/distribution_page.dart';
import '../../presentation/user/organization/pages/record_distribution_page.dart';
import '../../presentation/user/organization/pages/impact_report_page.dart';
import '../../presentation/user/organization/pages/thank_you_page.dart';
import '../../presentation/user/organization/pages/thank_you_sent_page.dart';
import '../../presentation/user/organization/pages/cancel_request_page.dart';
abstract final class OrganizationRoutes { static final Map<String,WidgetBuilder> pages = {
UserOrganizationDashboardPage.routeName: (_) => const UserOrganizationDashboardPage(),
UserOrganizationOrganizationProfilePage.routeName: (_) => const UserOrganizationOrganizationProfilePage(),
UserOrganizationFoodDiscoveryPage.routeName: (_) => const UserOrganizationFoodDiscoveryPage(),
UserOrganizationFoodDetailPage.routeName: (_) => const UserOrganizationFoodDetailPage(),
UserOrganizationRequestFoodPage.routeName: (_) => const UserOrganizationRequestFoodPage(),
UserOrganizationRequestPendingPage.routeName: (_) => const UserOrganizationRequestPendingPage(),
UserOrganizationAwaitingCourierPage.routeName: (_) => const UserOrganizationAwaitingCourierPage(),
UserOrganizationOrdersPage.routeName: (_) => const UserOrganizationOrdersPage(),
UserOrganizationOrderTrackingPage.routeName: (_) => const UserOrganizationOrderTrackingPage(),
UserOrganizationReceiptCodePage.routeName: (_) => const UserOrganizationReceiptCodePage(),
UserOrganizationConfirmReceiptPage.routeName: (_) => const UserOrganizationConfirmReceiptPage(),
UserOrganizationCreateNeedPage.routeName: (_) => const UserOrganizationCreateNeedPage(),
UserOrganizationNeedsPage.routeName: (_) => const UserOrganizationNeedsPage(),
UserOrganizationWarehousePage.routeName: (_) => const UserOrganizationWarehousePage(),
UserOrganizationDistributionPage.routeName: (_) => const UserOrganizationDistributionPage(),
UserOrganizationRecordDistributionPage.routeName: (_) => const UserOrganizationRecordDistributionPage(),
UserOrganizationImpactReportPage.routeName: (_) => const UserOrganizationImpactReportPage(),
UserOrganizationThankYouPage.routeName: (_) => const UserOrganizationThankYouPage(),
UserOrganizationThankYouSentPage.routeName: (_) => const UserOrganizationThankYouSentPage(),
UserOrganizationCancelRequestPage.routeName: (_) => const UserOrganizationCancelRequestPage(),
}; }
