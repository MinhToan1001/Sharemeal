import '../domain/repositories/auth_repository.dart';
import 'auth_remote_data_source.dart';

class FirebaseAuthRepository implements AuthRepository {
  FirebaseAuthRepository(this._source);
  final AuthRemoteDataSource _source;

  @override
  Stream<String?> watchUserId() => _source.watchUserId();

  @override
  Future<String> signIn({required String email, required String password}) =>
      _source.signIn(email: email, password: password);

  @override
  Future<String> register({required String email, required String password}) =>
      _source.register(email: email, password: password);

  @override
  Future<void> signOut() => _source.signOut();
}
