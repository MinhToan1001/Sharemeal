# Backend trực tiếp Firebase

Project đang dùng: `sharemeal-e17c9`. Rules đã triển khai lên Realtime Database; cấu hình Cloudinary công khai đã lưu ở `/config/public/cloudinary`.

- `firebase/database/database.rules.json`: quyền đọc theo chủ sở hữu/đơn tham gia/admin, quyền ghi theo role và trạng thái.
- `tools/build_demo_rules.py`: tạo file Rules từ các điều kiện nghiệp vụ có tên rõ ràng.
- `firebase/public-config.json`: tên cloud và preset; không có secret.
- `tools/configure_cloudinary.cjs`: công cụ quản trị một lần cho preset demo đã được chủ tài khoản đồng ý.
- `functions/`: mã kiến trúc API cũ, giữ làm tham khảo; không được app gọi và không nằm trong cấu hình deploy hiện tại.

Nghiệp vụ chạy trong Flutter kết hợp Rules trên Firebase. Không deploy Functions, Storage hoặc dịch vụ email riêng. Xem [hướng dẫn](../docs/BACKEND_SETUP.md).

