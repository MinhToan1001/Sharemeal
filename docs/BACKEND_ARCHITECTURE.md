# Kiến trúc backend hiện tại

Flutter → Firebase Authentication / Realtime Database. Flutter → Cloudinary unsigned upload → URL ảnh lưu trong Realtime Database. Không có API HTTP nghiệp vụ riêng.

## File chính

| File | Trách nhiệm |
| --- | --- |
| `frontend/lib/data/firebase/direct_backend.dart` | Kết nối, truy vấn đúng quyền, listener, chuyển dữ liệu cho UI |
| `frontend/lib/data/repositories/direct_accounts.dart` | Hồ sơ, role, duyệt, khóa/mở, ca tình nguyện |
| `frontend/lib/data/repositories/direct_foods.dart` | Đăng/sửa/đóng/duyệt món và nhu cầu |
| `frontend/lib/data/repositories/direct_orders.dart` | Xin nhận, duyệt đơn, số lượng, giao nhận, PIN/QR, kho |
| `frontend/lib/data/repositories/direct_community.dart` | Chat, đánh giá, cảm ơn, hỗ trợ, thông báo |
| `frontend/lib/data/repositories/firebase_app_state.dart` | Trạng thái phiên và dữ liệu giao diện; xóa khi đăng xuất |
| `frontend/lib/data/cloudinary/cloudinary_storage.dart` | Multipart upload Cloudinary, kiểm tra loại và 8 MB trong app |
| `frontend/lib/presentation/backend/backend_route_gate.dart` | Chỉ kiểm tra quyền và điều hướng đến màn hình gốc |
| `frontend/lib/presentation/shared/figma/live_figma_bindings.dart` | Gắn dữ liệu thật vào node và mẫu thẻ gốc, giữ nguyên style và bố cục |
| `frontend/lib/presentation/shared/figma/live_detail_bindings.dart` | Giá trị cho các màn xác nhận, theo dõi và kết quả gốc |
| `frontend/lib/presentation/shared/interaction/backend_actions.dart` | Nối form hiện có với lệnh Firebase |
| `backend/tools/build_demo_rules.py` | Nguồn tạo Rules theo điều kiện nghiệp vụ |

## Các bảng Realtime Database

| Đường dẫn | Nội dung |
| --- | --- |
| `users/<uid>` | Tên, email, role, trạng thái duyệt, khóa tài khoản |
| `config/adminUid` | UID admin duy nhất, chỉ được claim lần đầu sau khi Console đã gán role admin |
| `config/public/cloudinary` | Tên cloud và upload preset, không có secret |
| `demo/applications/<id>` | Hồ sơ chờ duyệt, tài liệu URL, phản hồi admin |
| `demo/foods/<id>` | Món, ảnh URL, số lượng ban đầu, số đã giữ, hạn dùng, trạng thái |
| `demo/needs/<id>` | Nhu cầu nhận, trạng thái duyệt |
| `demo/orders/<id>` | Các bên giao nhận, số suất, trạng thái, `proof`, `receiptPhoto`, `thanksPhoto` và lời cảm ơn |
| `demo/messages/<id>` | Tin nhắn theo orderId |
| `demo/reviews/<orderId_uid>` | Điểm sao và nội dung đánh giá sau hoàn tất |
| `demo/tickets/<id>` | Hỗ trợ/sự cố/chuyển người giao và kết quả admin |
| `demo/notifications/<id>` | Thông báo trong app, người nhận, đã đọc |
| `demo/shifts/<uid_date>` | Ca tình nguyện |
| `demo/inventory/<uid>` | Tổng nhận, đã phân phát và mã giao dịch cuối |
| `demo/distributions/<id>` | Nhật ký phân phát |
| `handover/<orderId>/<pickup hoặc receipt>` | PIN bàn giao 10 phút, số lần sai, người dùng mã |
| `foodAccess/<foodId>/<uid>` | Cho các bên trong đơn tiếp tục đọc món đã đóng |

Không cho client đọc root hoặc toàn bộ `demo`. Truy vấn hồ sơ/hỗ trợ/thông báo/ca theo UID; chat/đánh giá theo đơn có người tham gia; admin đọc qua kiểm tra UID singleton. Món/nhu cầu đã duyệt được truy vấn công khai trong nhóm tài khoản đã xác minh email và chưa khóa.

## Trạng thái và cập nhật

Hồ sơ: `draft → pending → approved / rejected / supplement`; hồ sơ cần bổ sung gửi bản mới để admin duyệt.

Món và nhu cầu: `pending → open / rejected`; sửa nội dung trở lại pending, đóng tin thành closed. Đóng món đồng thời hủy yêu cầu còn chờ; các đơn đã chấp nhận vẫn được giữ để hoàn tất giao nhận.

Đơn: `awaiting → accepted → assigned → pickedUp → completed`. Tự đến lấy bỏ qua assigned. Có nhánh rejected và cancelled trước lấy hàng. Giao hộ cần xác nhận mã nhận trước completed.

Số suất hiển thị = quantity − reserved. Chấp nhận/hủy dùng một update nhiều vị trí cho đơn và số đã giữ; Rules đối chiếu thay đổi trước/sau và số suất của đơn, chặn cập nhật theo số cũ khi có tranh chấp. Nhận chuyến cập nhật nguyên tử người giao, trạng thái và quyền đọc món; Rules chỉ cho nhận khi trạng thái hiện tại còn accepted và chưa có người giao. Nhập kho/phân phát dùng update nguyên tử kèm mã đơn/giao dịch, Rules kiểm tra tổng và tồn. Khi thao tác cạnh tranh bị từ chối, làm mới dữ liệu và thao tác lại.

Mã bàn giao nằm ngoài cây dữ liệu được truy vấn chung, có hạn 10 phút, tối đa 5 lần nhập mỗi mã, dùng một lần. Bản demo kiểm tra PIN bằng RTDB Rules và quyền các bên; không dùng máy chủ ký mã.

## Phạm vi demo

Thông báo là thông báo trong ứng dụng khi đồng bộ dữ liệu; chưa có FCM/push nền. Địa chỉ và tọa độ đã lưu có thể mở Google Maps; chưa có GPS trực tiếp hoặc tự ghép chuyến. Media Cloudinary có URL công khai, giới hạn 8 MB là phía app. Không có tác vụ nền tự xóa dữ liệu/media. Listener và truy vấn hiện phục vụ quy mô demo; không phải cam kết hiệu năng cho dữ liệu lớn.

Mã `backend/functions`, test và tài liệu kết quả kiểm thử kiến trúc API cũ không dùng để khẳng định chất lượng bản trực tiếp này.

