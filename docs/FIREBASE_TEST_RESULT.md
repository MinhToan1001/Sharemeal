# Kết quả kiểm tra — 01/11/2026

Bản được kiểm tra dùng Flutter SDK Firebase trực tiếp và Cloudinary, giữ các page giao diện gốc. Không dùng kết quả của kiến trúc Cloud Functions cũ.

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| File page gốc | 105 file, 0 file bị sửa | `tooling/screen-preservation-result.json` |
| Flutter unit/widget | 49/49 qua | `tooling/preserved-ui-tests.log` |
| Binding và route sau rà soát cuối | 9/9 qua | `tooling/preserved-bindings-tests.log` |
| Phân tích toàn bộ mã | Không có issue ở lần kiểm tra đầy đủ | `tooling/preserved-ui-analyze.log` |
| Android + Auth/Database Emulator | Qua luồng bốn vai trò | `tooling/android-preserved-ui-test.log` |
| Android + Firebase thật | Qua luồng hai tài khoản, một món DEMO | `tooling/android-production-data-test.log` |

Luồng Android cục bộ đã kiểm tra đăng ký/xác minh email bằng liên kết của Auth Emulator; admin duy nhất; chặn tự nâng quyền và đọc hồ sơ của người khác; bổ sung/từ chối/duyệt hồ sơ; upload ảnh Cloudinary thật; đăng món chờ duyệt; nút duyệt trên giao diện admin gốc; sửa tên và giờ lấy trên form gốc; cập nhật danh sách qua listener; đăng/sửa/đóng và duyệt nhu cầu.

Các kiểm tra nghiệp vụ còn gồm hai yêu cầu cạnh tranh không vượt tồn, hủy trả số lượng, nhận chuyến, chat riêng theo đơn, PIN sai/hết hạn/đổi mã, lấy hàng, ảnh lấy hàng/nhận hàng/cảm ơn, phân công lại, xác nhận nhận và số thực nhận, kho/phân phát trong tồn, đánh giá/cảm ơn, hỗ trợ và phản hồi admin, thông báo đã đọc, ca tình nguyện, hồ sơ, tự đến lấy, đóng món hủy yêu cầu chờ, khóa/mở tài khoản, khôi phục mật khẩu và đăng nhập lại.

Trên project thật `sharemeal-e17c9`, đã dùng đúng hai tài khoản thử được cho phép: đăng nhập bằng nút gốc, xác nhận món đọc từ Firebase và ảnh Cloudinary giải mã được trên Android, thay đổi tên/trạng thái từ cơ sở dữ liệu cập nhật màn hình, giữ số lượng, PIN tự nhận, nhập kho, đánh giá và đóng món. Đã quan sát trực tiếp màn hình Emulator có món Firebase thật trong bố cục gốc.

Sau kiểm tra đã xóa hai tài khoản Auth, hồ sơ, món và bản ghi liên quan (14 đường dẫn), xác minh tài khoản/bản ghi thử không còn; xóa 7 ảnh Cloudinary do các lượt thử tạo ra. Không thay tài khoản hoặc admin có sẵn. Không để lại món mẫu.

Các giới hạn của kết quả: không phải mọi nút trên cả 105 page đều được chạy tự động; email đăng ký được kiểm tra qua Auth Emulator, chưa xác nhận giao thư tới hộp thư thật. Kiểm thử không thay thế việc chủ project kiểm tra lại app bằng tài khoản của mình. Xem [BACKEND_HANDOVER](BACKEND_HANDOVER.md).
