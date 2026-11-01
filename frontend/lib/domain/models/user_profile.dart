import '../enums/user_role.dart';
import '../enums/verification_status.dart';

class UserProfile {
  const UserProfile({
    required this.uid,
    required this.displayName,
    required this.role,
    required this.verificationStatus,
  });
  final String uid;
  final String displayName;
  final UserRole role;
  final VerificationStatus verificationStatus;
}
