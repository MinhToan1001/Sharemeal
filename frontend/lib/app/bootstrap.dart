import 'package:firebase_core/firebase_core.dart';
import '../firebase_options.dart';

enum FirebaseStartupState { notConfigured, ready, failed }

Future<FirebaseStartupState> bootstrapFirebase() async {
  try {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.currentPlatform,
    );
    return FirebaseStartupState.ready;
  } on FirebaseException {
    return FirebaseStartupState.failed;
  }
}
