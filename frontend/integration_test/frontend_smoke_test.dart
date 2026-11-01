import 'package:integration_test/integration_test.dart';
import '../test/frontend_controls_test.dart' as controls;
import '../test/frontend_flow_test.dart' as flow;
import '../test/frontend_review_test.dart' as review;
import '../test/navigation_media_test.dart' as navigation;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  controls.main();
  flow.main();
  review.main();
  navigation.main();
}
