# Chuyển giao diện ShareMeal từ Figma

Nguồn: https://www.figma.com/design/0S8fvpt4DT4noT5gzCYnDk/week1-2_uiux

## Phạm vi

- 104 frame mobile 402 × 874, 104 page Dart riêng theo cụm tài khoản, admin, người cho, tổ chức, tình nguyện viên và dùng chung.
- Font Inter, màu, ảnh và SVG lấy theo mã tham chiếu Figma; 638 asset lưu cục bộ, không phụ thuộc URL tạm lúc chạy.
- Các trang là widget Flutter native; không có WebView, HTML hoặc ảnh chụp màn hình làm UI.
- Bắt đầu từ splash, không thêm trang menu demo. Giữ các đích điều hướng, điều kiện, biến trạng thái và trạng thái ẩn/hiện của prototype.
- Input là TextField nhập được; vùng cuộn, nút và bottom bar dùng tương tác native.

Không chỉnh sửa file Figma trong lần chuyển UI này. Giao diện được giữ theo thiết kế,
không phải một bản thiết kế lại. Font rasterization của Flutter/Android có thể khác Figma
vài pixel; không coi kết quả là chứng nhận trùng tuyệt đối từng pixel.

## Cập nhật tương tác frontend

Đợt chuyển UI ban đầu đã được mở rộng thành frontend có trạng thái, lưu dữ liệu cục bộ,
điều khiển lựa chọn/checkbox/counter/search, danh sách động và thao tác thiết bị thật.
Thêm trang Tác động riêng cho người cho và sửa bottom bar theo vai trò. Xem
[FRONTEND_INTERACTIONS.md](FRONTEND_INTERACTIONS.md) để biết phạm vi và cách thử hiện tại.

## Giới hạn cần phân biệt

Firebase Android vẫn được khởi tạo bằng cấu hình đã có. Dữ liệu tương tác hiện được lưu
trên thiết bị, chưa đồng bộ Firebase. Chọn vai trò/duyệt hồ sơ phía client không cấp quyền
Firebase. Đăng nhập, OTP và đổi mật khẩu thật còn chờ Authentication/backend. QR/PIN,
camera, file picker và PDF đã có xử lý native; bản đồ mở ứng dụng ngoài, chưa có GPS trực tiếp.
Không thay đổi Rules hay deploy backend.

## Mã nguồn và đối chiếu

- `frontend/lib/presentation/**/pages`: từng màn hình native.
- `frontend/lib/presentation/shared/figma`: layout, input, SVG và controller prototype dùng chung.
- `docs/figma/screen_map.json`: frame Figma → route → file.
- `docs/figma/reference`: mã tham chiếu độ trung thực cao từ Figma.
- `docs/figma/behavior`, `prototype_variables.json`: điều hướng và trạng thái gốc.
- `docs/figma/asset_manifest.json`, `native_asset_callsites.json`: nguồn asset và các vị trí sử dụng.
- `docs/figma/expected`: ảnh Figma chỉ dùng kiểm chứng, không đóng gói trong app.
- `docs/figma/actual`: ảnh widget Flutter của toàn bộ màn hình.
- `docs/figma/comparison.png`: bảng so sánh các màn đại diện.

`tooling/figma-import` là công cụ chuyển đổi tại thời điểm phát triển; React/Playwright
chỉ đo mã tham chiếu, không chạy trong app. File Dart có nhãn GENERATED sẽ bị ghi lại
khi chạy `generate_flutter.cjs`; lưu thay đổi bền vững trong nguồn tham chiếu hoặc bộ chuyển đổi.
Font có giấy phép tại `frontend/assets/fonts/Inter-OFL.txt`.

## Chạy và kiểm tra

Mở `ShareMeal/frontend` trong Android Studio, chọn Flutter SDK `ShareMeal/tooling/flutter`.
Hoặc chạy tại thư mục ShareMeal:

```powershell
.\run_flutter.cmd analyze
.\run_flutter.cmd test
.\run_flutter.cmd build apk --debug
.\run_flutter.cmd run -d emulator-5554
```

`figma_visual_test.dart` dựng cả 104 màn hình và chụp ảnh native.
`app_startup_test.dart` kiểm tra splash → đăng nhập → đăng ký và tổ chức → theo dõi đơn.
`figma_prototype_test.dart` kiểm tra 4 vai trò, chặn hồ sơ chưa duyệt, admin duyệt và
6 trạng thái đơn tại 3 lối vào theo dõi. `route_registry_test.dart` kiểm tra 104 route và đích prototype.

Để triển khai app thật tiếp theo, thay dữ liệu mẫu bằng repository Firebase và xác thực
quyền ở Rules/backend; giữ nguyên các cây giao diện đang có.

## Kết quả đợt chuyển UI ban đầu ngày 29/10/2026

- `flutter analyze`: không có vấn đề.
- `flutter test`: 13 test đạt; có dựng/chụp 104 màn và 6 trạng thái đơn.
- Kiểm tra thêm thao tác cuộn đến nút nhận hàng và mở mã nhận: đạt.
- Đối chiếu ảnh Figma của 14 màn đại diện và rà ảnh của toàn bộ 104 màn theo cụm.
- `flutter build apk --debug`: thành công.
- Đã cài APK trên máy ảo Medium_Phone_2, chạy đăng ký/đăng nhập → tổ chức → theo dõi đơn;
  log Flutter không báo lỗi trong luồng thử này. Ảnh Android tại `docs/figma/android_*.png`.

APK: `frontend/build/app/outputs/flutter-apk/app-debug.apk`.
