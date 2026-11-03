abstract interface class AuthRepository {
  Stream<String?> watchUserId();
  Future<String> signIn({required String email, required String password});
  Future<String> register({required String email, required String password});
  Future<void> signOut();
}
