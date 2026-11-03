# Cài Firebase và Cloudinary

Hướng dẫn này dùng cho Firebase project riêng hoặc project mà nhóm đã cấp quyền. Thay `YOUR_FIREBASE_PROJECT_ID`, URL database và thông tin Cloudinary bằng giá trị của bạn. Không cần dựng máy chủ Node để chạy app.

## 1. Tạo và nối Firebase

1. Tạo project trong [Firebase Console](https://console.firebase.google.com/).
2. Bật Authentication → Sign-in method → Email/Password.
3. Tạo Realtime Database. Sao chép chính xác URL database do Console cung cấp; URL có thể khác nhau theo vùng.
4. Đăng ký Android app với package `com.example.sharemeal`. Tải `google-services.json` vào `frontend/android/app/google-services.json`.
5. Cài Firebase CLI và FlutterFire CLI, rồi tạo cấu hình từ thư mục `frontend`:

```sh
npm install -g firebase-tools
firebase login
dart pub global activate flutterfire_cli
cd frontend
flutterfire configure --project=YOUR_FIREBASE_PROJECT_ID --platforms=android
```

Lệnh FlutterFire tạo/cập nhật `frontend/lib/firebase_options.dart`. Nếu CLI không tạo file JSON Android, tải lại từ Firebase Console và đặt đúng đường dẫn ở bước 4. Xem [tài liệu FlutterFire](https://firebase.google.com/docs/flutter/setup).

Cập nhật cả `projectId` và `databaseUrl` trong `backend/client/lib/src/config/firebase_config.dart`. Các giá trị phải cùng project với `firebase_options.dart` và `google-services.json`. Sau đó chạy `flutter pub get` trong `frontend`.

## 2. Triển khai Database Rules

Từ thư mục `backend`:

```sh
firebase deploy --only database --project YOUR_FIREBASE_PROJECT_ID
```

Cấu hình `backend/firebase.json` đã trỏ tới `firebase/database/database.rules.json`. Không cần khởi tạo lại project bằng `firebase init`. Khi sửa điều kiện nghiệp vụ trong nguồn sinh Rules, chạy từ thư mục gốc:

```sh
python backend/tools/build_demo_rules.py
```

Sau đó kiểm tra thay đổi và deploy lại Rules vào đúng project. Không nhập một database rỗng vào root của project đang có dữ liệu.

## 3. Cấu hình Cloudinary

Trong Cloudinary Console, tạo một **unsigned upload preset** cho app demo. Chọn định dạng JPG/JPEG/PNG; cho phép thêm PDF nếu dùng giấy tờ PDF. Dùng tên file ngẫu nhiên và không ghi đè file cũ. Tham khảo [upload presets](https://cloudinary.com/documentation/upload_presets).

Sao chép `backend/firebase/public-config.example.json` thành `backend/firebase/public-config.local.json`, điền:

```json
{
  "cloudinary": {
    "cloudName": "ten_cloud_cua_ban",
    "uploadPreset": "ten_unsigned_preset_cua_ban"
  }
}
```

Từ thư mục `backend`, lưu cấu hình công khai này vào Firebase:

```sh
firebase database:update /config/public firebase/public-config.local.json --project YOUR_FIREBASE_PROJECT_ID
```

Cũng có thể nhập cùng cấu trúc trực tiếp trong Console tại `config/public/cloudinary`. App đọc `cloudName` và `uploadPreset` ở đường dẫn này. Không đặt API Secret vào JSON, mã Flutter hay Firebase public config.

App kiểm tra tối đa 8 MB/file ở phía thiết bị. URL Cloudinary là công khai; với demo, sử dụng ảnh giấy tờ giả lập. Preset unsigned có thể được người biết tên preset sử dụng, nên quản lý hạn mức và tắt preset khi không còn cần demo.

## 4. Tạo admin đầu tiên

1. Mở app, đăng ký bằng email thật và bấm liên kết xác minh email.
2. Trong Firebase Console → Authentication, lấy UID của tài khoản.
3. Trong Realtime Database, đặt `users/<UID>/role` thành `admin`.
4. Đặt `config/adminUid` thành chính UID đó, rồi đăng xuất và đăng nhập lại app.

Chỉ dùng một admin theo cơ chế singleton hiện tại. Khi chuyển admin, chủ project cập nhật đồng thời role và `config/adminUid` qua Console. Người dùng thường chọn `donor`, `charity` hoặc `volunteer`, gửi hồ sơ để admin duyệt.

## 5. Kiểm tra lần đầu

1. Tạo tài khoản cho các vai trò, xác minh email, gửi và duyệt hồ sơ.
2. Người cho đăng món còn hạn; admin duyệt để món xuất hiện.
3. Tổ chức xin nhận; người cho chấp nhận để giữ suất.
4. Tình nguyện viên mở màn camera và bấm nút trắng để lấy hàng; tới tổ chức bấm Đã đến nơi rồi nút trắng để giao. Tổ chức nhập số thực nhận và hoàn tất; ảnh là tùy chọn. Luồng demo cần Rules mới đã triển khai, không yêu cầu PIN hoặc quét bằng hai thiết bị.
5. Kiểm tra kho, phân phát, đánh giá, chat và yêu cầu hỗ trợ.

Database mới có thể trống; không cần dữ liệu mẫu. Email xác minh và đặt lại mật khẩu được Firebase gửi bằng liên kết, không dùng SMTP hoặc OTP riêng.

