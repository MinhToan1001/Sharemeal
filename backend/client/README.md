# ShareMeal Firebase client

Package `sharemeal_client` chứa mã tích hợp backend và nghiệp vụ dùng bởi ứng dụng Flutter. Frontend khai báo dependency `path: ../backend/client` và chỉ import các thư viện công khai trong `lib/`.

| Thư mục | Chức năng |
| --- | --- |
| `lib/src/firebase/` | Kết nối Auth/Realtime Database, truy vấn, đồng bộ và gửi lệnh qua `ShareMealClient` |
| `lib/src/modules/` | Tài khoản, thực phẩm, đơn giao nhận, giữ/nhả suất, nhập kho và cộng đồng |
| `lib/src/protocols/` | Biến đổi dữ liệu thuần cho giao thức giữ suất và xác nhận nhận hàng |
| `lib/src/auth/` | Nguồn dữ liệu và repository xác thực |
| `lib/src/media/` | Tải ảnh lên Cloudinary |
| `lib/src/domain/` | Model, enum và hợp đồng repository dùng chung; không import Flutter/Firebase |
| `lib/src/config/` | Định danh Firebase công khai, không chứa thông tin quản trị |
| `test/` | Kiểm thử giao thức giữ suất và nhận hàng |

Các thư viện công khai: `sharemeal_client.dart`, `domain.dart`, `order_stock_protocol.dart`, `order_receipt_protocol.dart`. Không import `src/` từ frontend. Package không phụ thuộc mã giao diện hoặc package `sharemeal`.

Mã trong package này vẫn chạy trên thiết bị cùng Flutter. Firebase Authentication và [Realtime Database Rules](../firebase/database/database.rules.json) kiểm tra quyền trên dịch vụ Firebase. Không đặt Admin SDK hoặc secret vào package này. App không cần chạy Cloud Functions hay máy chủ API riêng.

Từ thư mục gốc trên Windows:

```sh
# From the repository root
cd frontend
flutter pub get
flutter analyze
flutter test
cd ../backend/client
flutter pub get
flutter analyze
flutter test
```
