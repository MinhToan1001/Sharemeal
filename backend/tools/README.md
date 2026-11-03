# Công cụ backend và kiểm thử tích hợp

Chạy app thông thường không cần Node.js. `build_demo_rules.py` sinh Database Rules; các bridge Node tạo fixture cho kiểm thử trên Firebase Emulator.

## Sinh Rules

Từ thư mục gốc, với Python 3:

```sh
python backend/tools/build_demo_rules.py
```

Lệnh ghi lại `backend/firebase/database/database.rules.json`. Deploy riêng theo [BACKEND_SETUP](../../docs/BACKEND_SETUP.md).

## Kiểm thử Android với Emulator

Cần Node.js 22 trở lên, Firebase CLI, Java dùng được với Firebase Emulator, Android emulator đang chạy và Flutter đã được cấu hình theo README gốc.

```powershell
# Từ thư mục gốc
Push-Location backend/tools
npm ci
npm run check
Pop-Location
.\run_flutter.cmd pub get

Push-Location backend
firebase emulators:exec --project demo-sharemeal-b --only auth,database "powershell -NoProfile -ExecutionPolicy Bypass -File tools/run_native_acceptance_check.ps1"
Pop-Location
```

Mặc định dùng `emulator-5554`. Nếu khác, đặt `$env:SHAREMEAL_DEVICE = 'ID-tu-flutter-devices'` trước khi chạy. Android emulator truy cập Firebase trên máy chủ qua `10.0.2.2`; kịch bản này dành cho máy ảo Android.

`group_b_test_bridge.cjs` và `android_test_bridge.cjs` là hai HTTP fixture riêng. Chỉ khởi động một bridge tại một thời điểm; cổng được khai báo ở cuối từng file. Hai bridge đều từ chối chạy nếu biến môi trường không trỏ tới Auth Emulator `127.0.0.1:9099` và Database Emulator `127.0.0.1:9000`.

Log acceptance nằm trong `.local/logs`, được Git ignore. Các script riêng cho Firebase production và Cloud Functions cũ đã được bỏ khỏi mã nguồn đang dùng.
