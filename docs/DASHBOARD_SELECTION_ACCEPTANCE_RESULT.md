# Sửa chọn món, căn số suất và phản hồi duyệt — 02/11/2026

## Nguyên nhân và cách sửa

1. Thẻ gợi ý trang tổ chức có tên lấy từ Firebase nhưng action openFood vẫn mang ID món mẫu SM-2039. Khi ID không tồn tại, trạng thái cũ chọn món đầu danh sách nên mở sai món. Bind ID cùng bản ghi với tên/số suất đang hiển thị; ID không tồn tại báo rõ, không chọn món khác. Snapshot xóa một món đang xem không tự thay bằng món đầu danh sách.
2. Hàng số suất dùng hai khung chữ có cỡ/chiều cao khác nhau nên lệch đường cơ sở. Dùng các span trên cùng một dòng; thanh tiến độ và nút Tìm thêm tính cùng số suất đã ghép/nhu cầu. Sửa nút trước đây giữ nhãn mẫu 17 suất. Chuông thông báo dùng icon 24px trong vùng bấm sẵn có.
3. Hồ sơ có tên dài hoặc số điện thoại rỗng dễ nhìn như hàng bị trống. Tên được xuống tối đa hai dòng; điện thoại rỗng ghi rõ Chưa cập nhật số điện thoại. Giữ thẻ, màu và font Inter.
4. Trong luồng duyệt, snapshot có thể loại thẻ yêu cầu khỏi danh sách trước khi command trả kết quả. Context của thẻ đã bị hủy nên code cũ bỏ qua thông báo và chuyển màn, dù Firebase đã accepted. Lưu Navigator/ScaffoldMessenger của route trước khi chờ; tiếp tục xác nhận/chuyển lịch lấy nếu người dùng vẫn ở route đó. Nếu người dùng đã rời route, không tự mở lại màn cũ. Nút chấp nhận/từ chối truyền ID đơn cụ thể.
5. Kiểm tra hạn dùng/suất trước khi ghi ý định giữ suất; transaction vẫn kiểm tra lại với dữ liệu server. Món thực sự hết hạn ghi rõ lý do và khóa chấp nhận; trường hợp giữ suất đã ghi journal vẫn cho khôi phục. Không suy ra hết hạn từ chuỗi giờ tự do.

## Đối chiếu dữ liệu thật

Lần đọc lúc 21:05 giờ Việt Nam ghi nhận hai đơn đều accepted: đơn 8 suất của món có 3 ảnh đã có stockState=held và journal giữ suất; đơn cũ 10 suất thuộc món đã hết hạn. Đây là lần đọc chẩn đoán, không sửa đơn, tài khoản, ảnh hoặc rules thật trong đợt này.

Lỗi mất phản hồi được tái hiện riêng: dữ liệu mock đã accepted nhưng route cũ vẫn incoming-requests. Sau sửa, cùng tình huống chuyển đúng pickup-schedule và hiển thị xác nhận thành công.

## Xác minh và artifact

- Kiểm tra chọn đúng món khi trước đó chọn món khác, ID không tồn tại, tên dài/điện thoại trống, món hết hạn, và thẻ duyệt biến mất: `frontend/test/dashboard_identity_test.dart`.
- Log tái hiện điều hướng trước sửa: `tooling/acceptance-context-before.log`.
- Log kiểm tra hồi quy: `tooling/dashboard-identity-regression-final.log`.
- Log phân tích tĩnh: `tooling/dashboard-identity-analyze-final.log`.
- Android với Firebase Auth + RTDB Emulator demo-sharemeal-b: `tooling/native-acceptance-check.log`. Tổ chức tạo yêu cầu 8/19 suất của món có 3 ảnh và dị ứng; người cho bấm Chấp nhận trên UI, kiểm tra view của cả hai phía và số giữ suất; bấm lại không giữ trùng. Kiểm tra món hết hạn không ghi ý định giữ suất. Không upload Cloudinary.
- Dữ liệu/tài khoản của native test chỉ ở Emulator, được dọn trong tearDownAll; bridge/Emulator dừng sau chạy. Script thử lại: `backend/tools/run_native_acceptance_check.ps1`, chạy qua Firebase emulators:exec đúng project demo như guard trong script.
- Ảnh đối chiếu: `docs/figma/actual/dashboard-identity/`.

## Cách thử

Mở lại ShareMeal bằng APK mới. Ở trang tổ chức, bấm món đang hiển thị trong Thực phẩm phù hợp: tên, ảnh và số suất ở chi tiết phải thuộc đúng món đó. Thử người cho chấp nhận một yêu cầu mới còn hạn: phải có xác nhận và chuyển sang lịch lấy; đơn chuyển Đã chấp nhận bên tổ chức. Nếu món hết hạn, đọc lý do và từ chối yêu cầu để tổ chức chọn món khác.

Không sửa dữ liệu thật để biến món cũ hết hạn thành món mới, không tạo suất hoặc đơn hoàn tất giả. Các đơn accepted hiện có không cần duyệt lại.

Kết quả cuối: **81/81 kiểm tra Flutter đạt**, **2/2 kiểm tra Android đạt**, phân tích tĩnh **không có vấn đề**. Android kiểm tra bằng SDK Firebase thật kết nối Emulator cục bộ; đối chiếu production chỉ đọc trạng thái hiện có. Luồng native bao gồm bấm nút trên UI, xác nhận thông báo và số suất sau khi duyệt.

APK chính đã build từ lib/main.dart và cài thành công lên emulator-5554. File: frontend/build/app/outputs/flutter-apk/app-debug.apk; 248799930 byte. SHA256: c4de6669c7ee3e1790b7d39bb944de220ffdd011e2a276a44a9917a7905bc87b. Không tự mở/tác động đơn thật sau cài.
