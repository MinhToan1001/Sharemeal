# ShareMeal Flutter

`frontend` chứa ứng dụng Flutter: màn hình, widget, điều hướng, theme, tương tác thiết bị và trạng thái giao diện.

- `lib/app/`: khởi tạo, theme, route registry và `routing/session_route_gate.dart` kiểm tra phiên để điều hướng.
- `lib/presentation/`: page, widget và controller theo vai trò/chức năng.
- `lib/presentation/shared/controllers/firebase_app_state.dart`: nhận snapshot từ backend client, cập nhật trạng thái giao diện và quản lý phiên.
- `lib/presentation/shared/interaction/firebase_actions.dart`: lấy dữ liệu form, gọi lệnh nghiệp vụ, hiển thị kết quả và điều hướng.
- `lib/presentation/shared/figma/`: bố cục và liên kết dữ liệu cho các màn hình.
- `lib/firebase_options.dart` và `android/`: cấu hình Firebase/platform của ứng dụng client.

Mã truy cập Firebase, Cloudinary, model và nghiệp vụ nằm tại [`backend/client`](../backend/client/README.md), được dùng qua package `sharemeal_client`. Không sao chép mã nghiệp vụ vào frontend hoặc import trực tiếp `package:sharemeal_client/src/...`.

Luồng hiện tại: `ShareMealApp` → `FirebaseAppState` → `ShareMealClient` → Firebase Authentication / Realtime Database. Ảnh tải qua Cloudinary. Firebase Rules thực thi quyền truy cập; route gate chỉ phục vụ điều hướng giao diện.

Từ thư mục gốc: `run_flutter.cmd pub get`, `run_flutter.cmd analyze --no-pub`, `run_flutter.cmd test --no-pub`, `run_flutter.cmd run`.

Không dùng Cloud Functions trong bản demo hiện tại. Hướng dẫn: [BACKEND_SETUP](../docs/BACKEND_SETUP.md).

