import 'package:flutter/widgets.dart';
import '../../presentation/user/donor/pages/dashboard_page.dart';
import '../../presentation/user/donor/pages/donor_type_page.dart';
import '../../presentation/user/donor/pages/individual_verification_page.dart';
import '../../presentation/user/donor/pages/business_verification_page.dart';
import '../../presentation/user/donor/pages/business_license_page.dart';
import '../../presentation/user/donor/pages/facility_photos_page.dart';
import '../../presentation/user/donor/pages/availability_page.dart';
import '../../presentation/user/donor/pages/commitment_page.dart';
import '../../presentation/user/donor/pages/create_listing_page.dart';
import '../../presentation/user/donor/pages/food_safety_page.dart';
import '../../presentation/user/donor/pages/pickup_location_page.dart';
import '../../presentation/user/donor/pages/listing_preview_page.dart';
import '../../presentation/user/donor/pages/publish_success_page.dart';
import '../../presentation/user/donor/pages/my_listings_page.dart';
import '../../presentation/user/donor/pages/listing_detail_page.dart';
import '../../presentation/user/donor/pages/edit_listing_page.dart';
import '../../presentation/user/donor/pages/close_listing_page.dart';
import '../../presentation/user/donor/pages/incoming_requests_page.dart';
import '../../presentation/user/donor/pages/matching_page.dart';
import '../../presentation/user/donor/pages/match_success_page.dart';
import '../../presentation/user/donor/pages/pickup_schedule_page.dart';
import '../../presentation/user/donor/pages/order_tracking_page.dart';
import '../../presentation/user/donor/pages/handover_qr_page.dart';
import '../../presentation/user/donor/pages/donation_history_page.dart';
import '../../presentation/user/donor/pages/recipient_review_page.dart';
abstract final class DonorRoutes { static final Map<String,WidgetBuilder> pages = {
UserDonorDashboardPage.routeName: (_) => const UserDonorDashboardPage(),
UserDonorDonorTypePage.routeName: (_) => const UserDonorDonorTypePage(),
UserDonorIndividualVerificationPage.routeName: (_) => const UserDonorIndividualVerificationPage(),
UserDonorBusinessVerificationPage.routeName: (_) => const UserDonorBusinessVerificationPage(),
UserDonorBusinessLicensePage.routeName: (_) => const UserDonorBusinessLicensePage(),
UserDonorFacilityPhotosPage.routeName: (_) => const UserDonorFacilityPhotosPage(),
UserDonorAvailabilityPage.routeName: (_) => const UserDonorAvailabilityPage(),
UserDonorCommitmentPage.routeName: (_) => const UserDonorCommitmentPage(),
UserDonorCreateListingPage.routeName: (_) => const UserDonorCreateListingPage(),
UserDonorFoodSafetyPage.routeName: (_) => const UserDonorFoodSafetyPage(),
UserDonorPickupLocationPage.routeName: (_) => const UserDonorPickupLocationPage(),
UserDonorListingPreviewPage.routeName: (_) => const UserDonorListingPreviewPage(),
UserDonorPublishSuccessPage.routeName: (_) => const UserDonorPublishSuccessPage(),
UserDonorMyListingsPage.routeName: (_) => const UserDonorMyListingsPage(),
UserDonorListingDetailPage.routeName: (_) => const UserDonorListingDetailPage(),
UserDonorEditListingPage.routeName: (_) => const UserDonorEditListingPage(),
UserDonorCloseListingPage.routeName: (_) => const UserDonorCloseListingPage(),
UserDonorIncomingRequestsPage.routeName: (_) => const UserDonorIncomingRequestsPage(),
UserDonorMatchingPage.routeName: (_) => const UserDonorMatchingPage(),
UserDonorMatchSuccessPage.routeName: (_) => const UserDonorMatchSuccessPage(),
UserDonorPickupSchedulePage.routeName: (_) => const UserDonorPickupSchedulePage(),
UserDonorOrderTrackingPage.routeName: (_) => const UserDonorOrderTrackingPage(),
UserDonorHandoverQrPage.routeName: (_) => const UserDonorHandoverQrPage(),
UserDonorDonationHistoryPage.routeName: (_) => const UserDonorDonationHistoryPage(),
UserDonorRecipientReviewPage.routeName: (_) => const UserDonorRecipientReviewPage(),
}; }
