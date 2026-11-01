import 'package:flutter/widgets.dart';
import '../../presentation/auth/pages/splash_page.dart';
import '../../presentation/auth/pages/welcome_page.dart';
import '../../presentation/auth/pages/login_page.dart';
import '../../presentation/auth/pages/register_page.dart';
import '../../presentation/auth/pages/email_verification_page.dart';
import '../../presentation/auth/pages/role_selection_page.dart';
import '../../presentation/auth/pages/forgot_password_page.dart';
abstract final class AuthRoutes { static final Map<String,WidgetBuilder> pages = {
SplashPage.routeName: (_) => const SplashPage(),
AuthWelcomePage.routeName: (_) => const AuthWelcomePage(),
AuthLoginPage.routeName: (_) => const AuthLoginPage(),
AuthRegisterPage.routeName: (_) => const AuthRegisterPage(),
AuthEmailVerificationPage.routeName: (_) => const AuthEmailVerificationPage(),
AuthRoleSelectionPage.routeName: (_) => const AuthRoleSelectionPage(),
AuthForgotPasswordPage.routeName: (_) => const AuthForgotPasswordPage(),
}; }
