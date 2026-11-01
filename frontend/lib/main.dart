import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'app/bootstrap.dart';
import 'app/sharemeal_app.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await SystemChrome.setEnabledSystemUIMode(SystemUiMode.immersiveSticky);
  final firebaseState = await bootstrapFirebase();
  runApp(ShareMealApp(firebaseState: firebaseState));
}
