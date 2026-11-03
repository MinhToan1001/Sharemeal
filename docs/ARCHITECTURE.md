# Kiến trúc mã nguồn

| Vị trí | Chức năng |
| --- | --- |
| `frontend/lib/app/` | Khởi tạo, theme, route registry và kiểm tra phiên để điều hướng |
| `frontend/lib/presentation/` | Page, widget, controller, form nháp và tích hợp thiết bị |
| `backend/client/lib/src/modules/` | Nghiệp vụ tài khoản, thực phẩm, đơn, giữ suất, nhận hàng và cộng đồng |
| `backend/client/lib/src/firebase/` | Truy vấn, listener và kết nối Firebase |
| `backend/client/lib/src/domain/` | Model, enum và hợp đồng repository dùng chung |
| `backend/client/lib/src/media/` | Tải file Cloudinary |
| `backend/client/lib/src/protocols/` | Biến đổi dữ liệu giữ suất và nhận hàng, có test độc lập |
| `backend/firebase/` | Security Rules, schema và cấu hình mẫu |
| `backend/tools/` | Sinh Rules và fixture Firebase Emulator |
| `tooling/` | Công cụ phát triển |
| `docs/` | Hướng dẫn sử dụng và kiến trúc |

Chiều phụ thuộc: **frontend → sharemeal_client → Firebase SDK / Cloudinary**.

Frontend khai báo `path: ../backend/client` trong `pubspec.yaml`, import các thư viện công khai như `package:sharemeal_client/sharemeal_client.dart` và `package:sharemeal_client/domain.dart`. Không import trực tiếp `src/` từ frontend. Package nghiệp vụ không import frontend; các model domain không import Flutter hoặc Firebase.

`FirebaseAppState` nằm tại `frontend/lib/presentation/shared/controllers`: quản lý phiên, nhận snapshot và cập nhật dữ liệu cho widget. `firebase_actions.dart` gom dữ liệu form, gọi lệnh, hiển thị kết quả và điều hướng. `session_route_gate.dart` chỉ kiểm tra phiên để chọn màn hình. Quyền dữ liệu thực tế do Firebase Rules kiểm tra.

Các màn hình được chia theo auth, admin, donor, organization, volunteer và shared. Asset trong `frontend/assets` phục vụ giao diện đang dùng. Unit/widget test nằm ở `frontend/test`; test giao thức nghiệp vụ nằm ở `backend/client/test`; test Android/Emulator nằm ở `frontend/integration_test`.

`backend/client` vẫn chạy trên thiết bị cùng Flutter. Ứng dụng không có máy chủ API riêng, Cloud Functions hoặc Firebase Storage. Xem [kiến trúc dữ liệu](BACKEND_ARCHITECTURE.md), [schema](../backend/firebase/database/SCHEMA.md) và [hướng dẫn cài backend](BACKEND_SETUP.md).

Các bản dựng, SDK cục bộ, log, cấu hình máy và bản lưu công cụ cũ được Git ignore; chúng không cần thiết khi clone mã nguồn.
