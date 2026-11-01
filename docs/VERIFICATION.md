# Kiểm tra khung dự án — 29/10/2026

**Cập nhật sau kết nối Firebase:** đã chạy trên Android emulator-5554,
test Firebase thật đã qua và mở app bình thường. Xem `FIREBASE_TEST_RESULT.md`.
Các ghi chú dưới đây ghi nhận bước dựng khung trước khi kết nối Firebase.

- Flutter stable 3.47.8, Dart 3.13.7, SDK tại `tooling/flutter`.
- Đã cài plugin Flutter 97.0.0 và Dart 510.0.0 cho Android Studio 2026.2.1.
- Đã bổ sung Android Command-line Tools, kiểm tra checksum của gói từ Google.
- `flutter doctor -v`: Android toolchain đạt, các license Android có sẵn đã được chấp nhận.
- SDK không thêm vào PATH hệ thống; gọi qua `run_flutter.cmd` hoặc cấu hình SDK trong IDE.
- `flutter analyze`: không phát hiện vấn đề.
- `flutter test`: 2 test qua; kiểm tra khởi động không có cấu hình Firebase và dựng các page trong registry.
- Danh mục có 104 route duy nhất, tương ứng 104 file page tồn tại.
- `flutter build apk --debug`: thành công.
- APK: `frontend/build/app/outputs/flutter-apk/app-debug.apk`.

Chưa chạy trên thiết bị hoặc emulator Android. Chưa kiểm tra dữ liệu Firebase thật,
đăng nhập thật, phân quyền hoặc nghiệp vụ; các page hiện là khung chờ triển khai.
Build hiện có cảnh báo từ các plugin Firebase về việc dùng Kotlin Gradle Plugin;
build vẫn thành công. Giữ `pubspec.lock` để dùng bộ phiên bản đã kiểm tra.
