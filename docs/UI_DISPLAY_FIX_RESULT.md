# Bản sửa hiển thị ShareMeal — 02/11/2026

Đợt này hoàn tất các lỗi hiển thị người dùng gửi. Giữ palette, font Inter, thứ tự nội dung và cấu trúc màn hiện có; sửa bộ render dùng chung thay vì chỉnh hàng loạt trang sinh từ Figma.

## Các thay đổi

- Hiển thị đầy đủ chữ trên nút, nhãn kiểm tra và thông báo. Text được dùng đúng chiều rộng, xuống dòng hoặc co vừa vùng khi cần; bỏ dấu ba chấm trên các nhãn thao tác. Giữ kích thước icon và nút điều hướng.
- Thanh đầu/cuối trang chỉ có đường phân cách ngang, bỏ hai cạnh dọc của khung chữ nhật.
- Sửa hai ô số suất/giờ của form Đăng nhu cầu để nằm trọn màn hình.
- Các dải danh mục và dị ứng bị thiếu chỗ có thể vuốt ngang; có mũi tên khi còn lựa chọn bên phải. Lựa chọn cuối vẫn bấm được.
- Chọn, thêm và bỏ ảnh món ăn, tối đa 6 ảnh. Giữ danh sách ảnh đã upload khi thử gửi lại để tránh upload lại ảnh thành công. Ảnh đại diện lấy từ ảnh đầu.
- Admin xem ảnh theo từng món, vuốt/trước/sau, đếm ảnh và chạm phóng to. Đọc được photos dạng list, map của RTDB hoặc bản ghi cũ chỉ có photo.
- Vùng bản đồ hiển thị tile đường phố, nhà cửa. Chạm bản đồ xem trước hoặc nút Mở Google Maps để mở ứng dụng ngoài. Form chỉnh vị trí vẫn cho chạm chọn điểm và lưu tọa độ.

## Dữ liệu

Dùng lại `demo/foods/<id>/photo` và `photos`; URL ảnh lưu Cloudinary. Không thêm database hay dịch vụ trả phí. Bản ghi cũ không có ảnh cần người cho bổ sung ảnh thật; app không tự chèn ảnh mẫu vào Firebase. UI đăng mới yêu cầu ít nhất một ảnh để admin có tài liệu kiểm tra.

Đợt sửa hiển thị này không triển khai rules và không thay dữ liệu/tài khoản trên Firebase thật. App chạy từ `lib/main.dart` tiếp tục dùng cấu hình Firebase hiện có.

## Kết quả đã chạy

- Toàn bộ Flutter unit/widget: **71/71 đạt**, log `tooling/ui-display-all-tests.log`.
- Android Emulator: **5/5 đạt**, log `tooling/ui-display-android.log`. Kiểm tra chữ, header, vuốt danh mục, chuyển hai món trong admin, vuốt/phóng ảnh, HTTP tile thật và có ảnh tile đã decode trong widget bản đồ.
- Phân tích tĩnh đợt cuối: **không có vấn đề**, log `tooling/ui-display-final-analyze.log`.
- Chọn nhiều ảnh được kiểm tra bằng mock kênh image_picker; bài Android kiểm tra thư viện ảnh thực tế trong app, không tự thao tác trình chọn ảnh hệ thống hay mở ứng dụng Google Maps ngoài.
- Ảnh render hiện tại: `docs/figma/actual/6_1380.png` (nhu cầu), `6_416.png` (an toàn), `6_1212.png` (tìm món), `6_246.png` (đăng nhập). Các ảnh trong thư mục actual được cập nhật bởi bộ test render toàn bộ trang.

## Bản đồ

Nguồn HOT / OSM France thay endpoint cũ bị từ chối kết nối trên máy kiểm thử. Ghi nguồn hiển thị trong bản đồ, có User-Agent nhận diện app và cache Android. Cần mạng để tải vùng chưa có cache; không phải theo dõi GPS trực tiếp. Nếu địa chỉ cũ chưa có tọa độ và tìm địa chỉ thất bại, không đặt ghim giả; bản đồ dùng tâm mặc định TP.HCM.

Chính sách nguồn: [OSM France — usage](https://www.openstreetmap.fr/usage/), [các nền bản đồ](https://www.openstreetmap.fr/fonds-de-carte/), [tile server](https://wiki.openstreetmap.org/wiki/FR:Serveurs/tile.openstreetmap.fr). Nguồn này dành cho demo phi lợi nhuận, lưu lượng vừa phải; không tải hàng loạt/offline.

## Cách chạy từ PowerShell

Dự án hiện ở `D:\HocTap\hk7\ShareMeal`.

```powershell
Set-Location D:\HocTap\hk7\ShareMeal
& "$env:LOCALAPPDATA\Android\Sdk\emulator\emulator.exe" -avd Medium_Phone_2
```

Mở PowerShell khác sau khi máy ảo khởi động:

```powershell
Set-Location D:\HocTap\hk7\ShareMeal
.\run_flutter.cmd run -d emulator-5554 --target lib/main.dart
```

Để cài APK đã build lên máy ảo đang mở:

```powershell
& "$env:LOCALAPPDATA\Android\Sdk\platform-tools\adb.exe" -s emulator-5554 install -r .\frontend\build\app\outputs\flutter-apk\app-debug.apk
```

## Thứ tự tự kiểm tra

1. Đăng nhập: chữ trên nút đầy đủ, không có viền dọc ở thanh đầu trang.
2. Tìm món: vuốt dải danh mục sang lựa chọn cuối, chọn và kiểm tra bộ lọc.
3. Đăng nhu cầu: ô giờ nằm trọn màn hình, nút Đăng nhu cầu không có dấu ba chấm.
4. Người cho đã duyệt: chọn 2–6 ảnh món thật, xem trước, bỏ/thêm ảnh, gửi tin.
5. Admin: mở từng món chờ duyệt, kiểm tra số ảnh, vuốt và phóng to; duyệt hoặc từ chối như luồng hiện có.
6. Người nhận: kiểm tra ảnh món đã duyệt và bản đồ đường phố; chạm để mở Google Maps.

Phạm vi bàn giao là bản sửa hiển thị này và các luồng backend B/E/F đã có trước đó; không tuyên bố các nhóm backend khác đã hoàn tất.

## Chạy sau khi chuyển ổ đĩa

Build phát hiện cache Kotlin không tính được đường dẫn tương đối giữa project ở D: và Pub cache ở C:. Đặt `kotlin.incremental=false` trong `frontend/android/gradle.properties` để tránh lỗi này ở lần chạy tiếp theo. Không tắt Flutter hot reload. Tham khảo cấu hình chính thức: [Kotlin compilation and caches](https://kotlinlang.org/docs/gradle-compilation-and-caches.html).

## APK bàn giao

- Build chính từ `lib/main.dart` đã thành công sau sửa cấu hình chuyển ổ: log `tooling/ui-display-main-build-final.log`.
- File: `frontend/build/app/outputs/flutter-apk/app-debug.apk`, 208686348 byte.
- SHA256: `1ab3499ed2835273f5dbfd6e9f23e6c2dfe1bd9da60df64c47ebb990f23dea13`.
- Đã cài thành công lên `emulator-5554` và xác nhận màn chào có nội dung/nút đầy đủ qua ảnh `frontend/build/ui-display/startup-main.png`. Lần mở đầu trên máy ảo tải chậm; `am start -W` hết thời gian chờ trước khi khung hình xuất hiện, sau đó app đã hiển thị. Không phát hiện crash của tiến trình ShareMeal trong kiểm tra này.
- Giữ máy ảo mở để người dùng kiểm tra. Không đăng nhập/tạo dữ liệu Firebase trong bước kiểm tra khởi động.
