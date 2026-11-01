# Bàn giao ShareMeal — 01/11/2026

Flutter kết nối Firebase Authentication và Realtime Database trực tiếp; ảnh và giấy tờ lưu Cloudinary. Không cần Cloud Functions, máy chủ API riêng, Firebase Storage hay Blaze.

## Giao diện và mã nguồn

Giữ nguyên 105 file page gốc: đối chiếu hash cho kết quả 0 file thay đổi. Đã bỏ các màn hình backend thay thế. `backend_route_gate.dart` chỉ kiểm tra quyền/điều hướng; `backend_actions.dart` gọi nghiệp vụ từ các nút cũ; `live_figma_bindings.dart` và `live_detail_bindings.dart` đưa dữ liệu thật vào đúng node và mẫu thẻ hiện có. Kiểm tra widget xác nhận việc gắn dữ liệu giữ kích thước, vị trí, style và asset gốc.

Nghiệp vụ chia thành `direct_accounts.dart`, `direct_foods.dart`, `direct_orders.dart`, `direct_community.dart`; phiên và listener ở `firebase_app_state.dart`; upload ở `cloudinary_storage.dart`. Sơ đồ bảng và trách nhiệm file: [BACKEND_ARCHITECTURE](BACKEND_ARCHITECTURE.md).

## Các luồng đã nối

| Vai trò | Chức năng |
| --- | --- |
| Chung | Đăng ký/đăng nhập email, liên kết xác minh/khôi phục mật khẩu Firebase, phiên đăng nhập, đăng xuất, hồ sơ, chọn/gửi xét duyệt role, thông báo, hỗ trợ |
| Người cho | Đăng/sửa/đóng món, ảnh Cloudinary, chờ admin duyệt, nhận/từ chối yêu cầu, lịch lấy, mã bàn giao, chat, đánh giá và báo cáo |
| Tổ chức từ thiện | Danh sách món Firebase, đăng/sửa/đóng nhu cầu chờ duyệt, xin nhận/tự lấy/giao hộ, hủy, xác nhận số thực nhận và ảnh, kho/phân phát, chat/đánh giá/cảm ơn kèm ảnh |
| Tình nguyện viên | Chuyến chờ, nhận chuyến, lịch/ca, PIN/QR giao nhận, ảnh lấy hàng, yêu cầu chuyển giao, chat và lịch sử |
| Admin duy nhất | Duyệt/bổ sung/từ chối hồ sơ; duyệt món/nhu cầu trong hàng đợi gốc; phân công người giao; xử lý hỗ trợ; khóa/mở tài khoản; số liệu vận hành |

Món và nhu cầu chưa duyệt không được công khai. Sửa nội dung đưa tin về chờ duyệt. Đóng tin ẩn món khỏi tìm kiếm và hủy các yêu cầu còn chờ; giữ lịch sử các đơn đã nhận. Giao hộ cần xác nhận mã nhận trước hoàn tất. Số lượng, trạng thái và quyền được kiểm tra trong Database Rules.

## Kết quả kiểm tra

49 kiểm thử Flutter đã qua; 9 kiểm tra binding/route chạy lại sau rà soát đã qua. Android Emulator đã qua luồng bốn vai trò với Auth/Database Emulator và upload Cloudinary thật. Đã kiểm tra thêm hai tài khoản và một món trên Firebase thật; dữ liệu/ảnh hiển thị và cập nhật trực tiếp trên giao diện gốc. Kết quả chi tiết và giới hạn: [FIREBASE_TEST_RESULT](FIREBASE_TEST_RESULT.md).

Đã xóa toàn bộ fixture Firebase thật (hai tài khoản, món và 14 đường dẫn liên quan) cùng 7 ảnh thử Cloudinary. Không thay tài khoản/admin có sẵn. App không giữ món DEMO để trưng bày: danh sách trống là bình thường nếu chưa có món được duyệt.

## Cài và sử dụng

APK debug: `frontend/build/app/outputs/flutter-apk/app-debug.apk`. Bản bàn giao build từ `lib/main.dart`, kết nối Firebase thật; không phải APK chạy integration test. Đây là bản cài thử, chưa ký phát hành Play Store.

Chủ project đăng ký tài khoản của mình, xác minh email, gán `users/<uid>/role` thành `admin` một lần trong Console rồi đăng nhập lại. App dùng `config/adminUid` để chỉ một admin có quyền. Ba tài khoản người dùng chọn role và gửi hồ sơ; admin duyệt rồi mới mở nghiệp vụ. Hướng dẫn: [BACKEND_SETUP](BACKEND_SETUP.md).

Email dùng liên kết Firebase theo lựa chọn đã thống nhất; các ô mã trên giao diện gốc không yêu cầu OTP 6 số. Nhập email tại mục quên mật khẩu để nhận liên kết khôi phục.

Phạm vi demo: thông báo trong app, chưa có push nền; mở địa điểm qua Google Maps, chưa có GPS trực tiếp; khối lượng báo cáo ước tính từ số suất. Media Cloudinary có URL công khai, phù hợp giấy tờ giả lập; 8 MB là giới hạn trong app. API Secret không nằm trong Flutter/APK. Preset unsigned và cấu hình công khai đã được tạo trong cloud `toanvip`.
