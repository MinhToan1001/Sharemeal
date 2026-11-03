# Schema Realtime Database đang dùng

Đối chiếu mã `backend/client/lib/src/modules/*.dart`, `backend/client/lib/src/firebase/sharemeal_client.dart` và `backend/tools/build_demo_rules.py`.

Có **15 nhóm dữ liệu logic**, nằm trong **5 nhánh gốc**: `users`, `demo`, `handover`, `foodAccess`, `config`. `demo` là nhánh gom 11 nhóm nghiệp vụ trên Firebase thật, không phải Firebase Emulator. Authentication và Cloudinary là hai dịch vụ riêng, không tính thành bảng Realtime Database.

Nhánh rỗng không được lưu. Schema trong mã/Rules không đồng nghĩa Console đã có sẵn 15 nhóm chứa bản ghi. Các nhóm xuất hiện khi thao tác tương ứng ghi dữ liệu.

Ký hiệu `?` là trường chỉ có khi người dùng bổ sung hoặc quy trình đi đến bước tương ứng. ID/UID nằm trong đường dẫn không tự động là một trường bên trong bản ghi.

## 1. users/<uid> — Tài khoản, hồ sơ và quyền

| Trường | Kiểu | Ý nghĩa |
| --- | --- | --- |
| uid | string | UID Firebase Authentication |
| name | string | Tên hiển thị |
| email | string | Email lúc tạo hồ sơ |
| role | string | Ban đầu rỗng; sau đó donor, charity, volunteer hoặc admin |
| verificationStatus | string | draft, pending, approved, rejected, supplement |
| disabled | boolean | Khóa tài khoản trong app |
| createdAt | string ISO UTC | Thời điểm tạo hồ sơ |
| phone? | string | Số điện thoại |
| address? | string | Địa chỉ |
| applicationId? | string | Hồ sơ xét duyệt hiện tại |

Ba vai trò người dùng và admin cùng dùng nhóm này. Không có bảng admin riêng. Mật khẩu và trạng thái xác minh email do Firebase Authentication quản lý, không lưu mật khẩu trong RTDB.

## 2. demo/applications/<id> — Hồ sơ xét duyệt

| Trường | Kiểu | Ý nghĩa |
| --- | --- | --- |
| id | string | Mã hồ sơ |
| uid | string | Người nộp |
| name | string | Tên người nộp tại thời điểm gửi |
| role | string | Vai trò xin xét duyệt |
| documents | list<string> | URL tài liệu/ảnh Cloudinary |
| details | string JSON | Thông tin riêng theo vai trò |
| status | string | pending, approved, rejected, supplement |
| createdAt | string ISO UTC | Thời điểm gửi |
| note? | string | Phản hồi admin |
| reviewedBy? | string | UID admin xử lý |
| reviewedAt? | string ISO UTC | Thời điểm xử lý |

`details` hiện là chuỗi JSON, chưa phải các cột riêng. Mã giao diện gom các giá trị draft có tiền tố `profile.`, `license.`, `availability.` vào đây: ví dụ tên/đại diện người cho, địa chỉ tổ chức, phương tiện tình nguyện viên, thông tin giấy phép và khung giờ. Chỉ có các giá trị thực sự được cung cấp; không phải bản ghi nào cũng có mọi khóa này.

## 3. demo/foods/<id> — Món ăn

| Trường | Kiểu | Ý nghĩa |
| --- | --- | --- |
| id | string | Mã món |
| donorId | string | UID người cho |
| donor | string | Tên người cho tại lúc tạo |
| name | string | Tên món |
| quantity | integer | Tổng số suất đăng |
| reserved | integer | Số suất đã giữ cho đơn nhận |
| category | string | Loại thực phẩm |
| storage | string | Điều kiện bảo quản |
| address | string | Địa chỉ lấy |
| pickup | string | Khung giờ lấy |
| allergens | list<string> | Thành phần dị ứng |
| note | string | Mô tả/ghi chú |
| photo | string | URL ảnh Cloudinary hoặc chuỗi rỗng |
| photos? | list string | Tối đa 6 URL ảnh món Cloudinary; photo là ảnh đại diện. Bản ghi cũ chỉ có photo vẫn đọc được |
| expiresAt | string ISO UTC | Hạn dùng |
| expiresAtMs | number | Hạn dùng dạng milliseconds để Rules so sánh |
| status | string | pending, open, rejected, closed |
| reviewNote | string | Phản hồi duyệt món |
| safe | boolean | Xác nhận điều kiện an toàn |
| createdAt | string ISO UTC | Ngày tạo |
| updatedAt | string ISO UTC | Lần cập nhật gần nhất |
| latitude?, longitude? | number | Tọa độ nếu đã cung cấp |
| reviewedBy? | string | UID admin duyệt |
| reviewedAt? | string ISO UTC | Thời điểm duyệt |
| lastStockOrderId? | string | Đơn gắn với lần thay đổi số đã giữ gần nhất |

Số suất có thể nhận hiển thị = `quantity - reserved`.

## 4. demo/needs/<id> — Nhu cầu của tổ chức

Các trường: `id` (string), `uid` (UID tổ chức), `title` (string), `quantity` (integer), `category` (string), `priority` (string), `status` (pending/open/rejected/closed), `createdAt` (ISO UTC), `updatedAt?` (ISO UTC), `reviewNote?` (string), `reviewedBy?` (UID admin), `reviewedAt?` (ISO UTC).

## 5. demo/orders/<id> — Yêu cầu nhận và giao hàng

| Trường | Kiểu | Ý nghĩa |
| --- | --- | --- |
| id | string | Mã đơn |
| foodId | string | Món được yêu cầu |
| donorId | string | UID người cho |
| organizationId | string | UID tổ chức nhận |
| organization | string | Tên tổ chức lúc tạo đơn |
| quantity | integer | Số suất yêu cầu |
| status | string | awaiting, accepted, assigned, pickedUp, completed, rejected, cancelled |
| transport | string | Tự đến lấy hoặc Nhờ giao hộ |
| driver | string | Tên người giao; ban đầu rỗng |
| time | string | Giờ hẹn |
| receiver? | string | Tên người đến nhận do tổ chức khai báo khi gửi yêu cầu |
| note | string | Ghi chú |
| received | integer | Số suất xác nhận thực nhận |
| createdAt | string ISO UTC | Ngày tạo |
| updatedAt? | string ISO UTC | Lần cập nhật trạng thái/lịch |
| volunteerId? | string | UID người giao đã nhận/phân công |
| deliveryConfirmed? | boolean | Đã đối chiếu mã giao tới tổ chức |
| proof? | string | URL ảnh xác nhận lấy hàng |
| proofAt? | string ISO UTC | Thời điểm gửi ảnh lấy hàng |
| receiptPhoto? | string | URL ảnh nhận hàng |
| completedAt? | string ISO UTC | Thời điểm hoàn tất |
| thanks? | string | Lời cảm ơn |
| thanksPhoto? | string | URL ảnh cảm ơn |

Yêu cầu nhận và chuyến giao cùng nằm trong một đơn; lời cảm ơn cũng nằm trong đơn. Không có ba bảng độc lập cho ba phần này.

## 6. demo/messages/<id> — Chat theo đơn

Các trường: `id` (string), `orderId` (string), `uid` (UID người gửi), `name` (tên người gửi), `text` (nội dung), `time` (ISO UTC).

## 7. demo/reviews/<orderId_uid> — Đánh giá

Các trường: `orderId` (string), `uid` (UID người đánh giá), `rating` (integer từ 1 đến 5), `note` (string), `createdAt` (ISO UTC). Khóa bản ghi ghép từ mã đơn và UID; không có trường `id` riêng bên trong dữ liệu được ghi.

## 8. demo/tickets/<id> — Hỗ trợ, sự cố, chuyển người giao

Các trường chung: `id` (string), `uid` (người gửi), `orderId` (mã đơn hoặc chuỗi rỗng), `detail` (string), `status` (open/investigating/resolved/rejected), `createdAt` (ISO UTC).

Yêu cầu hỗ trợ thông thường có thêm `name`, `reason`, `photo` (URL hoặc rỗng). Yêu cầu chuyển người giao có `type: transfer`; không mặc định có name/reason/photo. Sau xử lý có `resolution?` (phản hồi), `resolvedBy?` (UID admin).

## 9. demo/notifications/<id> — Thông báo trong app

Các trường: `uid` (UID người nhận), `senderId` (UID bên tạo thông báo), `title` (string), `body` (string), `read` (boolean), `createdAt` (ISO UTC). ID là khóa trên đường dẫn, không có trường `id` riêng được ghi. Đây không phải bảng token FCM.

## 10. demo/shifts/<uid_date> — Ngày đăng ký tình nguyện

Các trường: `id` (string), `uid` (UID tình nguyện viên), `date` (string YYYY-MM-DD). Phiên bản hiện tại lưu ngày đăng ký; chưa lưu giờ bắt đầu/kết thúc thành các trường riêng.

## 11. demo/inventory/<uid> — Tổng kho của tổ chức

Các trường: `received` (integer tổng đã nhận), `distributed` (integer tổng đã phân phát), `lastReceivedOrderId?` (string), `lastDistributionId?` (string). UID tổ chức nằm trên đường dẫn. Tồn hiển thị = `received - distributed`, không có trường balance riêng.

## 12. demo/distributions/<id> — Nhật ký phân phát

Các trường: `id` (string), `uid` (UID tổ chức), `quantity` (integer), `createdAt` (ISO UTC). Hiện lưu tổng số suất của một lượt phân phát; số riêng từng nhóm trẻ em/người cao tuổi trong form được cộng thành quantity trước khi ghi.

## 13. handover/<orderId>/<stage> — Mã giao nhận

`stage` trên đường dẫn là `pickup` (lấy hàng) hoặc `receipt` (giao tới tổ chức).

Các trường: `pin` (string 6 số), `creatorId` (UID bên tạo), `expiresAt` (number milliseconds), `attempts` (integer), `used` (boolean), `enteredPin?` (string mã vừa nhập), `verifierId?` (UID bên đối chiếu). Mã có hạn 10 phút, tối đa 5 lần nhập và dùng một lần. Đây là PIN nghiệp vụ giao nhận, khác xác minh email Firebase.

## 14. foodAccess/<foodId>/<uid> — Quyền đọc món theo đơn

Trường duy nhất: `orderId` (string). Food ID và UID nằm trong đường dẫn. Giúp các bên liên quan còn đọc được món của đơn khi tin đã đóng/không còn công khai.

## 15. config — Cấu hình

- `adminUid`: string, UID admin duy nhất.
- `public/cloudinary/cloudName`: string, hiện là `toanvip`.
- `public/cloudinary/uploadPreset`: string, hiện là `sharemeal_demo_unsigned`.

Không lưu Cloudinary API Secret trong Firebase.

## Dữ liệu ngoài RTDB và dữ liệu tính ra

- Firebase Authentication quản lý đăng nhập, mật khẩu, UID và trạng thái xác minh email.
- Cloudinary giữ file ảnh/tài liệu; RTDB giữ URL liên kết.
- `history`, `progress`, `mine`, `distance`, `balance` trong dữ liệu giao diện không phải các bảng/trường được ghi tương ứng trong RTDB. Lịch sử/báo cáo lấy từ đơn hoàn tất và dữ liệu liên quan; các thuộc tính khác được ánh xạ/tính trong app. Phiên bản hiện tại chưa tính khoảng cách thực tế từ GPS.
- Các node `state`, `views`, `media` của kiến trúc API cũ không được đường chạy hiện tại sử dụng.

Xem [BACKEND_ARCHITECTURE](../../../docs/BACKEND_ARCHITECTURE.md) để đọc quyền và chuyển trạng thái.
