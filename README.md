# ShareMeal

Ứng dụng Android chia sẻ thực phẩm, kết nối **người cho**, **tổ chức từ thiện**, **tình nguyện viên** và **quản trị viên**. App hỗ trợ đăng món, xin nhận, giao nhận bằng PIN/QR, quản lý kho, chat và xét duyệt hồ sơ.

Ứng dụng được viết bằng Flutter, sử dụng Firebase Authentication, Realtime Database và Cloudinary. Flutter gọi Firebase trực tiếp; quyền dữ liệu được kiểm tra bằng Firebase Rules. `backend/client` là package nghiệp vụ chạy cùng app, không phải một máy chủ cần khởi động riêng.

## 1. Chuẩn bị môi trường

| Công cụ | Mục đích |
| --- | --- |
| Git | Tải mã nguồn |
| Flutter SDK stable | Chạy app; phiên bản đã kiểm thử: **3.47.8**, Dart **3.13.7** đi kèm |
| Android Studio | Cài Android SDK, Command-line Tools và máy ảo Android; dùng JDK đi kèm Android Studio |
| Điện thoại Android hoặc máy ảo | Chạy và kiểm tra ứng dụng |
| Node.js và Firebase CLI | Chỉ cần khi tự cấu hình Firebase hoặc chạy Firebase Emulator |

Cài Flutter SDK và thêm thư mục `bin` vào `PATH`. Cài plugin Flutter/Dart trong IDE nếu cần. Làm theo [hướng dẫn Android của Flutter](https://docs.flutter.dev/platform-integration/android/setup), rồi kiểm tra:

```sh
flutter --version
flutter doctor -v
flutter doctor --android-licenses
flutter devices
```

Mở một máy ảo trong Android Studio → Device Manager, hoặc bật USB debugging trên điện thoại và kết nối với máy tính. Dự án hiện cấu hình **Android**; không chọn Chrome, Windows hay iOS để chạy.

## 2. Tải dự án và cài thư viện

```sh
git clone https://github.com/MinhToan1001/Sharemeal.git
cd Sharemeal/frontend
flutter pub get
```

Mở thư mục **`frontend`** bằng Android Studio/VS Code. Khi cần sửa cả nghiệp vụ, có thể mở toàn bộ repository. Giữ nguyên vị trí hai thư mục `frontend` và `backend`: frontend dùng package cục bộ tại `../backend/client`.

## 3. Cấu hình Firebase và Cloudinary

**Bước này cần hoàn tất trước lần chạy đầu tiên.** Repository không chứa thông tin đăng nhập quản trị hay file `google-services.json` trên máy của chủ dự án.

1. Nếu được cấp quyền vào Firebase của nhóm, lấy cấu hình Android từ chủ project. Nếu tự cài độc lập, tạo Firebase project riêng và bật **Authentication → Email/Password**, tạo **Realtime Database**.
2. Đăng ký Android app với package name `com.example.sharemeal`. Tải `google-services.json` và đặt tại **`frontend/android/app/google-services.json`**.
3. Trong `frontend`, chạy FlutterFire để tạo cấu hình cho project của bạn:

   ```sh
   npm install -g firebase-tools
   firebase login
   dart pub global activate flutterfire_cli
   flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID --platforms=android
   ```

   Thay `YOUR_FIREBASE_PROJECT_ID` bằng ID thật. Lệnh tạo/cập nhật `frontend/lib/firebase_options.dart`. Nếu không tìm thấy `flutterfire`, thêm thư mục Pub Cache `bin` vào `PATH` theo thông báo khi cài CLI. Tham khảo [hướng dẫn FlutterFire chính thức](https://firebase.google.com/docs/flutter/setup).
4. Cập nhật `projectId` và `databaseUrl` trong **`backend/client/lib/src/config/firebase_config.dart`** đúng project và URL Realtime Database. URL phụ thuộc vùng đã chọn; hãy sao chép từ Firebase Console.
5. Thiết lập Cloudinary unsigned upload preset và triển khai Rules theo **[hướng dẫn backend](docs/BACKEND_SETUP.md)**. Luồng hiện tại không dùng Cloud Functions, Firebase Storage hay SMTP.

Các định danh Firebase đi kèm mã nguồn đang trỏ tới project demo cũ; chúng không cấp quyền quản trị. Dùng cấu hình project của bạn hoặc cấu hình do nhóm cấp. Không commit service account, API Secret, token, keystore hay file cấu hình riêng trên máy.

## 4. Chạy ứng dụng

Từ thư mục `frontend`:

```sh
flutter devices
flutter run -d YOUR_DEVICE_ID
```

Thay `YOUR_DEVICE_ID` bằng ID do `flutter devices` trả về. Nếu chỉ có một thiết bị, dùng `flutter run`.

Trên Windows có thể chạy từ thư mục gốc:

```powershell
.\run_flutter.cmd pub get
.\run_flutter.cmd run
```

Script ưu tiên Flutter SDK cục bộ tại `tooling/flutter` nếu có, sau đó tìm Flutter trong `PATH`. SDK không được tải kèm repository.

Lần đầu sử dụng: đăng ký → xác minh email → chọn vai trò → gửi hồ sơ → admin duyệt. Sau đó người cho đăng món và admin duyệt để tổ chức tìm thấy. Database mới có thể chưa có món/đơn; dữ liệu được tạo khi sử dụng app. Cách tạo admin đầu tiên nằm trong [BACKEND_SETUP](docs/BACKEND_SETUP.md).

## 5. Kiểm tra và xuất APK

```sh
# Chạy từ frontend
flutter analyze
flutter test
flutter build apk --debug
```

APK debug nằm tại **`frontend/build/app/outputs/flutter-apk/app-debug.apk`**. APK debug dùng để thử trên thiết bị; cấu hình ký phát hành riêng trước khi đưa lên cửa hàng.

Kiểm thử nghiệp vụ của package backend:

```sh
cd ../backend/client
flutter pub get
flutter analyze
flutter test
```

Kiểm thử tích hợp trên máy ảo là bước riêng, xem [backend/tools](backend/tools/README.md). Bộ kiểm thử thông thường không yêu cầu chạy máy chủ Node. Ảnh do test sinh nằm trong `frontend/build/`, không được đưa lên Git.

## 6. Cấu trúc dự án

```text
Sharemeal/
├── frontend/                 Ứng dụng Flutter Android
│   ├── lib/app/              Khởi tạo, theme, điều hướng
│   ├── lib/presentation/     Màn hình, widget, controller theo vai trò
│   ├── android/              Project Android và Gradle wrapper
│   ├── assets/               Ảnh, icon, font đang dùng
│   ├── test/                 Unit test và widget test
│   └── integration_test/     Kiểm thử trên thiết bị/máy ảo
├── backend/
│   ├── client/               Package sharemeal_client: nghiệp vụ và tích hợp dịch vụ
│   │   ├── lib/src/modules/  Tài khoản, thực phẩm, đơn, kho, cộng đồng
│   │   ├── lib/src/domain/   Model, enum, hợp đồng repository
│   │   └── test/             Kiểm thử giữ suất và nhận hàng
│   ├── firebase/             Database Rules, schema và cấu hình mẫu
│   └── tools/                Sinh Rules và fixture kiểm thử Emulator
├── docs/                     Hướng dẫn sử dụng và kiến trúc
├── tooling/                  Công cụ phát triển; SDK cục bộ được ignore
├── run_flutter.cmd           Chạy Flutter từ thư mục gốc trên Windows
└── README.md
```

Chiều phụ thuộc: **frontend → sharemeal_client → Firebase/Cloudinary**. Mã backend client không import giao diện. Xem [kiến trúc mã nguồn](docs/ARCHITECTURE.md), [kiến trúc dữ liệu](docs/BACKEND_ARCHITECTURE.md) và [quy trình sử dụng](docs/Huong_dan_quy_trinh_ShareMeal.docx).

Báo cáo workflow và kịch bản kiểm tra 9 suất, nhận 7 rồi xin thêm 2: [Báo cáo workflow ShareMeal](docs/Bao_cao_workflow_ShareMeal.docx). Báo cáo phân biệt mã lấy hàng từ người cho, mã nhận hàng tại tổ chức và bước hoàn tất nhập kho.

## 7. Lỗi thường gặp

| Hiện tượng | Cách xử lý |
| --- | --- |
| Không tìm thấy `flutter` | Cài SDK, thêm `bin` vào `PATH`, mở lại terminal |
| `No devices` | Mở máy ảo hoặc bật USB debugging; kiểm tra bằng `flutter devices` |
| Thiếu `google-services.json` | Đặt cấu hình Android đúng project vào `frontend/android/app/` |
| Firebase sai project hoặc database | Kiểm tra cả `firebase_options.dart` và `FirebaseConfig`; build lại app |
| `operation-not-allowed` khi đăng ký | Bật Email/Password trong Firebase Authentication |
| `permission-denied` | Kiểm tra Rules đã deploy, xác minh email, trạng thái duyệt và quyền tài khoản |
| Không có món để nhận | Đăng món bằng người cho và duyệt món bằng admin |
| Không tải được ảnh | Kiểm tra cloud name, unsigned preset, kết nối mạng và cấu hình `/config/public/cloudinary` |
| Thiếu Android SDK/JDK hoặc license | Sửa các mục được báo trong `flutter doctor -v` |

Bản đồ xem trước hiện dùng OpenStreetMap; nút chỉ đường mở Google Maps. Không cần Maps API key cho luồng bản đồ xem trước hiện tại.

