# Công cụ phát triển

- `scan_staged_secrets.py`: kiểm tra nội dung đã stage trước khi commit. Từ thư mục gốc: `python tooling/scan_staged_secrets.py --all`.
- `flutter-version.json`: phiên bản Flutter/Dart đã dùng để kiểm thử.
- `flutter/`: Flutter SDK cục bộ tùy chọn, được Git ignore. Người clone có thể cài Flutter riêng và thêm vào PATH.

`run_flutter.cmd` ở thư mục gốc ưu tiên SDK cục bộ, sau đó dùng `flutter.bat` trong PATH. Mọi lệnh được chạy trong `frontend`.

Công cụ fixture Emulator và sinh Database Rules: [backend/tools](../backend/tools/README.md). Log, cache, ảnh test và bản lưu cũ không thuộc mã nguồn phát hành.
