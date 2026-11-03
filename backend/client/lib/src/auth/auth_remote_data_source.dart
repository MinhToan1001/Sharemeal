import 'package:firebase_auth/firebase_auth.dart';

class AuthRemoteDataSource {
  AuthRemoteDataSource(this._auth);
  final FirebaseAuth _auth;

  Stream<String?> watchUserId() =>
      _auth.authStateChanges().map((user) => user?.uid);

  Future<String> signIn({
    required String email,
    required String password,
  }) async {
    final credential = await _auth.signInWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    return credential.user!.uid;
  }

  Future<String> register({
    required String email,
    required String password,
  }) async {
    final credential = await _auth.createUserWithEmailAndPassword(
      email: email.trim(),
      password: password,
    );
    return credential.user!.uid;
  }

  Future<void> signOut() => _auth.signOut();
}
