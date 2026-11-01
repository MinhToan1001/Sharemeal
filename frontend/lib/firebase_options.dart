import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/foundation.dart';

/// Cấu hình Android lấy từ google-services.json chính thức của ShareMeal.
/// Đây là định danh ứng dụng, không phải service-account hoặc quyền admin.
abstract final class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (!kIsWeb && defaultTargetPlatform == TargetPlatform.android) {
      return android;
    }
    throw UnsupportedError('ShareMeal hiện chỉ cấu hình Firebase cho Android.');
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAAwHlNAAMGu5BXWJe3gVhAm9rgOtCeyIM',
    appId: '1:606824930406:android:6c89885dfb3dff029961a7',
    messagingSenderId: '606824930406',
    projectId: 'sharemeal-e17c9',
    databaseURL: 'https://sharemeal-e17c9-default-rtdb.firebaseio.com',
    storageBucket: 'sharemeal-e17c9.firebasestorage.app',
  );
}
