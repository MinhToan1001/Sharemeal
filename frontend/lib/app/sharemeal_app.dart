import 'package:flutter/material.dart';
import 'bootstrap.dart';
import 'routing/app_router.dart';
import 'theme/app_theme.dart';
import '../presentation/shared/figma/figma_prototype_controller.dart';
import 'package:firebase_core/firebase_core.dart';
import '../data/firebase/firebase_services.dart';
import '../data/repositories/firebase_app_state.dart';

class ShareMealApp extends StatefulWidget {
  const ShareMealApp({
    super.key,
    this.firebaseState = FirebaseStartupState.notConfigured,
    this.initialRoute = '/auth/splash',
    this.prototype,
  });
  final FirebaseStartupState firebaseState;
  final String initialRoute;
  final FigmaPrototypeController? prototype;

  @override
  State<ShareMealApp> createState() => _ShareMealAppState();
}

class _ShareMealAppState extends State<ShareMealApp> {
  late final FigmaPrototypeController _prototype;

  @override
  void initState() {
    super.initState();
    final live = widget.prototype == null &&
            widget.firebaseState == FirebaseStartupState.ready
        ? FirebaseAppState(FirebaseServices(Firebase.app()))
        : null;
    _prototype = widget.prototype ?? FigmaPrototypeController(frontend: live);
    if (live != null) {
      live.initialize().catchError((Object e) {
        live.loading = false;
        live.error = FirebaseAppState.readableError(e);
        live.changed();
      });
    } else if (widget.prototype == null) {
      _prototype.frontend.load();
    }
  }

  @override
  void dispose() {
    if (widget.prototype == null) _prototype.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) => widget.firebaseState ==
          FirebaseStartupState.failed
      ? MaterialApp(
          theme: AppTheme.light,
          home: const Scaffold(
              body: SafeArea(
                  child: Center(
                      child: Padding(
                          padding: EdgeInsets.all(24),
                          child: Text(
                              'Chưa khởi tạo được Firebase. Kiểm tra cấu hình Android và kết nối mạng rồi mở lại ứng dụng.'))))))
      : FigmaPrototypeScope(
          controller: _prototype,
          child: MaterialApp(
            title: 'ShareMeal',
            debugShowCheckedModeBanner: false,
            theme: AppTheme.light,
            initialRoute: widget.initialRoute,
            onGenerateInitialRoutes: (initialRoute) => [
              AppRouter.onGenerateRoute(RouteSettings(name: initialRoute)),
            ],
            onGenerateRoute: AppRouter.onGenerateRoute,
          ),
        );
}
