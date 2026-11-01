# ShareMeal

Ứng dụng Flutter Android dùng Firebase Authentication, Realtime Database và Cloudinary. Luồng chạy hiện tại đọc/ghi Firebase trực tiếp; không cần Cloud Functions, máy chủ API riêng, Firebase Storage hay nâng cấp Blaze.

Giữ các file page Flutter gốc. Theo phản hồi kiểm thử, các vùng duyệt, đặt nhận, chat và theo dõi được sửa bố cục để tránh cắt chữ và vùng bấm nhỏ, giữ phong cách của app.

- Hướng dẫn thực hành 42 bước: [Quy trình ShareMeal](docs/Huong_dan_quy_trinh_ShareMeal.docx).
- Chi tiết đợt sửa giao diện: [UI_REPAIR_RESULT](docs/UI_REPAIR_RESULT.md).

- Mã Flutter: `frontend/lib`.
- Quyền dữ liệu: `backend/firebase/database/database.rules.json`.
- Cấu hình và tạo admin: [BACKEND_SETUP](docs/BACKEND_SETUP.md).
- Phạm vi, APK và trạng thái bàn giao: [BACKEND_HANDOVER](docs/BACKEND_HANDOVER.md).
- Cấu trúc dữ liệu và mã nghiệp vụ: [BACKEND_ARCHITECTURE](docs/BACKEND_ARCHITECTURE.md).

Chạy từ thư mục gốc bằng `run_flutter.cmd run`. Đóng gói Android bằng `run_flutter.cmd build apk --debug`. Android app nằm trong `frontend/android`; project Android cũ tại thư mục gốc không phải điểm build Flutter.

