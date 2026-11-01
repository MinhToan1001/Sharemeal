import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_database/firebase_database.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:sharemeal/app/bootstrap.dart';
import 'package:sharemeal/core/config/firebase_config.dart';

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('Android initializes ShareMeal and connects to Realtime Database',
      (tester) async {
    expect(await bootstrapFirebase(), FirebaseStartupState.ready);
    final app = Firebase.app();
    expect(app.options.projectId, 'sharemeal-e17c9');
    expect(app.options.appId, '1:606824930406:android:6c89885dfb3dff029961a7');
    expect(FirebaseAuth.instance.app.name, app.name);

    final database = FirebaseDatabase.instanceFor(
      app: app,
      databaseURL: FirebaseConfig.databaseUrl,
    );
    // Đường dẫn trạng thái kết nối, không đọc/ghi dữ liệu nghiệp vụ.
    final connected = await database
        .ref('.info/connected')
        .onValue
        .firstWhere((event) => event.snapshot.value == true)
        .timeout(const Duration(seconds: 45));
    expect(connected.snapshot.value, isTrue);
    await database.goOffline();
  });
}
