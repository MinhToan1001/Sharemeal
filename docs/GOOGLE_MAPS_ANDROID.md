# Google Maps cho ShareMeal Android

Phần Flutter và Android đã được tích hợp. Chưa có key nên app hiển thị trạng thái
chưa cấu hình và nút **Mở Google Maps**; không giả bản đồ bằng hình vẽ. Không dùng key
Firebase thay cho Maps và không tự bật billing trên tài khoản của bạn.

## 1. Bật dịch vụ trong Google Cloud

Mở [Google Maps Platform](https://console.cloud.google.com/google/maps-apis/overview?project=sharemeal-e17c9),
chọn project `sharemeal-e17c9` (cùng project Firebase nếu bạn có quyền).
Google yêu cầu project có billing và bật SDK tương ứng để dùng bản đồ nhúng.
Bạn cần tự xem điều kiện chi phí trước khi liên kết tài khoản thanh toán.
[Điều kiện chính thức](https://developers.google.com/maps/flutter-package/overview).

Bật **Maps SDK for Android**. Chưa cần bật Places, Geocoding, Routes, Maps JavaScript
hoặc Maps Static API cho phần đã viết ở đợt này.

## 2. Tạo và giới hạn API key

Trong khu vực Credentials của Google Cloud, tạo API key riêng cho Android.
Ở **Application restrictions**, chọn **Android apps**, thêm:

| Trường | Giá trị bản debug trên máy hiện tại |
| --- | --- |
| Package name | `com.example.sharemeal` |
| SHA-1 | `73:17:C9:43:E4:CE:B0:0C:70:74:94:2D:DC:01:6D:78:DB:85:3F:03` |

Ở **API restrictions**, chỉ cho phép **Maps SDK for Android**.
SHA-1 trên được đọc từ debug keystore của máy này, không phải khóa phát hành.
Khi đổi máy hoặc ký bản release/Play Store, phải thêm fingerprint tương ứng.
Google khuyến nghị key và giới hạn riêng cho từng nền tảng.
[Hướng dẫn cấu hình chính thức](https://developers.google.com/maps/flutter-package/config).

## 3. Cấu hình trên máy, không gửi key vào chat

Sao chép `frontend/android/maps.properties.example` thành
`frontend/android/maps.properties`, rồi điền key trên máy:

```properties
MAPS_API_KEY=key_cua_ban
```

File `maps.properties` đã được ignore. Android build lấy key từ file này; nếu không
có thì có thể dùng biến môi trường `MAPS_API_KEY`. Dart chỉ đọc trạng thái có cấu hình,
không nhận chuỗi key. Key Android vẫn nằm trong APK theo cơ chế SDK: giới hạn package,
SHA-1 và API mới là biện pháp cần thiết; không coi file local là cách giấu tuyệt đối.

## 4. Build lại

Trong thư mục `C:\Users\ADMIN\AndroidStudioProjects\ShareMeal`:

```powershell
.\run_flutter.cmd run -d emulator-5554
```

Cần build lại, không chỉ hot reload, vì key nằm trong Android Manifest.
Nếu máy ảo chưa mở, mở Medium_Phone_2 trước.

Kiểm tra màn Hẹn nơi trao bữa ăn: bản đồ có thể kéo/zoom và chạm để chọn tọa độ lấy.
Địa chỉ vẫn nhập riêng; app chưa gọi dịch vụ geocoding. Tọa độ đã chọn đi cùng tin đăng.
Đổi địa chỉ bằng chữ sẽ xóa tọa độ cũ để tránh giữ ghim sai.

## Nếu chỉ thấy nền trống hoặc chữ Google

Kiểm tra: Maps SDK đã bật, billing hợp lệ, key đúng, package/SHA-1 đúng và thiết bị có
mạng. Mở log Android để tìm lỗi xác thực Maps; không đăng log có chứa key công khai.

Các vùng bản đồ đã thay: điểm lấy, tìm món, việc giao, chi tiết chuyến giao, đang đi lấy hàng,
điều phối admin, theo dõi đơn tổ chức, theo dõi bàn giao của người cho và lộ trình tình nguyện viên.
Khi chưa có tọa độ, SDK mở khu vực TP.HCM và không tự gán ghim
vào địa chỉ chưa được xác định. Nút mở ngoài dùng tìm kiếm địa chỉ trên Google Maps.
Chưa có GPS trực tiếp, định tuyến trong app hoặc ETA thật; không dùng đường thẳng và thời gian
giả để mô phỏng các chức năng đó. Chưa kiểm chứng tải tile Maps khi chưa có key của bạn.
