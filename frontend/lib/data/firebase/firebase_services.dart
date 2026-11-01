import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import '../../core/config/firebase_config.dart';

/// Chỉ tạo sau khi bootstrapFirebase trả về ready.
class FirebaseServices {
  FirebaseServices(FirebaseApp app, {String? databaseUrl})
      : auth = FirebaseAuth.instanceFor(app: app),
        database = FirebaseDatabase.instanceFor(
          app: app,
          databaseURL: databaseUrl ?? FirebaseConfig.databaseUrl,
        );
  final FirebaseAuth auth;
  final FirebaseDatabase database;
}
