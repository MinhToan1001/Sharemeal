import 'package:flutter/widgets.dart';
import '../../presentation/shared/pages/profile_page.dart';
import '../../presentation/shared/pages/settings_page.dart';
import '../../presentation/shared/pages/role_management_page.dart';
import '../../presentation/shared/pages/verification_pending_page.dart';
import '../../presentation/shared/pages/verification_approved_page.dart';
import '../../presentation/shared/pages/verification_supplement_page.dart';
import '../../presentation/shared/pages/verification_rejected_page.dart';
import '../../presentation/shared/pages/browse_only_page.dart';
import '../../presentation/shared/pages/notifications_page.dart';
import '../../presentation/shared/pages/chat_page.dart';
import '../../presentation/shared/pages/support_page.dart';
import '../../presentation/shared/pages/support_ticket_page.dart';
import '../../presentation/shared/pages/support_status_page.dart';
import '../../presentation/shared/pages/support_resolved_page.dart';
import '../../presentation/shared/pages/report_issue_page.dart';
import '../../presentation/shared/pages/report_discrepancy_page.dart';
import '../../presentation/shared/pages/packaging_guide_page.dart';
import '../../presentation/shared/pages/location_picker_page.dart';
import '../../presentation/shared/pages/transfer_delivery_page.dart';
import '../../presentation/shared/pages/handover_receipt_page.dart';
import '../../presentation/shared/pages/community_report_page.dart';
abstract final class SharedRoutes { static final Map<String,WidgetBuilder> pages = {
SharedProfilePage.routeName: (_) => const SharedProfilePage(),
SharedSettingsPage.routeName: (_) => const SharedSettingsPage(),
SharedRoleManagementPage.routeName: (_) => const SharedRoleManagementPage(),
SharedVerificationPendingPage.routeName: (_) => const SharedVerificationPendingPage(),
SharedVerificationApprovedPage.routeName: (_) => const SharedVerificationApprovedPage(),
SharedVerificationSupplementPage.routeName: (_) => const SharedVerificationSupplementPage(),
SharedVerificationRejectedPage.routeName: (_) => const SharedVerificationRejectedPage(),
SharedBrowseOnlyPage.routeName: (_) => const SharedBrowseOnlyPage(),
SharedNotificationsPage.routeName: (_) => const SharedNotificationsPage(),
SharedChatPage.routeName: (_) => const SharedChatPage(),
SharedSupportPage.routeName: (_) => const SharedSupportPage(),
SharedSupportTicketPage.routeName: (_) => const SharedSupportTicketPage(),
SharedSupportStatusPage.routeName: (_) => const SharedSupportStatusPage(),
SharedSupportResolvedPage.routeName: (_) => const SharedSupportResolvedPage(),
SharedReportIssuePage.routeName: (_) => const SharedReportIssuePage(),
SharedReportDiscrepancyPage.routeName: (_) => const SharedReportDiscrepancyPage(),
SharedPackagingGuidePage.routeName: (_) => const SharedPackagingGuidePage(),
SharedLocationPickerPage.routeName: (_) => const SharedLocationPickerPage(),
SharedTransferDeliveryPage.routeName: (_) => const SharedTransferDeliveryPage(),
SharedHandoverReceiptPage.routeName: (_) => const SharedHandoverReceiptPage(),
SharedCommunityReportPage.routeName: (_) => const SharedCommunityReportPage(),
}; }
