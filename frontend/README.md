# ShareMeal Flutter

Chạy Firebase thật qua `lib/app/sharemeal_app.dart` → `FirebaseAppState` → `data/firebase/direct_backend.dart`. Giao diện đọc dữ liệu qua listener Realtime Database và lệnh ghi chịu Firebase Rules.

Các file `data/repositories/direct_*.dart` chia nghiệp vụ tài khoản, món, đơn giao nhận và cộng đồng. `data/cloudinary/cloudinary_storage.dart` tải ảnh trực tiếp, không chứa API Secret. Các page gốc giữ nguyên; `live_figma_bindings.dart` gắn dữ liệu vào node và mẫu thẻ cũ, `backend_actions.dart` nối nút với Firebase. `backend_route_gate.dart` chỉ kiểm tra quyền và điều hướng.

Không dùng Cloud Functions trong bản demo hiện tại. Hướng dẫn: [BACKEND_SETUP](../docs/BACKEND_SETUP.md).

