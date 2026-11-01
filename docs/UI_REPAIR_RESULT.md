# Sửa giao diện và luồng thao tác ngày 1 tháng 11 năm 2026

Đợt sửa này xử lý các ảnh lỗi người dùng gửi. Giữ màu, kiểu thẻ và font Inter của app; các màn duyệt, đặt nhận, chat và theo dõi dùng bố cục Flutter có thể cuộn thay cho các khung xuất cố định đang cắt chữ và khó bấm. Không chỉnh 105 file trang được sinh từ Figma. Không nên hiểu điều này là giao diện render không đổi: các vùng lỗi được điều chỉnh theo yêu cầu lần này.

- Text trong khung cố định giới hạn dòng; ô nhập căn giữa, không dùng padding dọc lớn cắt chữ. Thống kê chưa khai báo hiển thị dấu gạch thay cho một cụm chữ dài trong ô số.
- Admin xem hồ sơ theo vai trò, tách thông tin kinh doanh, cá nhân, tổ chức và tình nguyện viên. Không đưa JSON vào giao diện. Tài liệu có bộ đếm, nút trước/sau, mở PDF và phóng to ảnh.
- Món và nhu cầu có tiêu chí duyệt riêng. Món hiển thị số suất, hạn dùng, dị ứng, bảo quản, địa điểm, giờ lấy và ghi chú. Bỏ nút bổ sung không áp dụng cho hai loại tin này; có từ chối kèm lý do.
- Chọn tối đa 6 ảnh món, lưu các URL vào foods/photos cùng ảnh đại diện foods/photo. Bản ghi cũ chỉ có photo vẫn hoạt động. Khi gửi hồ sơ mới, details/documentLabels lưu nhãn tài liệu và chỉ gom thông tin của vai trò hiện tại.
- Đặt nhận có nút cộng/trừ đủ lớn, chọn ô nào ô đó xanh, cam kết có thể tích/bỏ tích. Cần đồng ý cam kết và giờ HH:mm hợp lệ trước gửi. Lưu người đến nhận vào orders/receiver nếu cung cấp.
- Điều hướng nghiệp vụ giữ màn trước trong stack; đăng nhập/đăng xuất vẫn xóa stack. Theo dõi có nút quay lại rõ ràng và lối về trang chính theo role khi mở trực tiếp.
- Chat chia tin nhận/gửi theo UID, xuống dòng tin dài, thu gọn mã đơn và giữ ô nhập phía trên bàn phím. Không tạo tin nhắn chào giả.
- Bản đồ xem trước dùng flutter_map và OpenStreetMap, có ghi nguồn; mở Google Maps khi bấm nút. Chọn điểm lưu latitude/longitude. Tìm địa chỉ dùng Android Geocoder khi người dùng bấm tìm. Không theo dõi GPS trực tiếp. Thư viện dùng cache mặc định trên Android. Nguồn kỹ thuật: [flutter_map](https://docs.fleaflet.dev/), [chính sách tile OSM](https://operations.osmfoundation.org/policies/tiles/), [Android Geocoder](https://developer.android.com/reference/android/location/Geocoder).

## Xác minh

Flutter đầy đủ: 55/55, log `tooling/ui-repair-final-tests.log`. Kiểm tra code: không có lỗi, log `tooling/ui-repair-final-analyze.log`. Có ảnh đối chiếu bốn màn trong `frontend/test/goldens/repaired_*.png`; kiểm tra thêm quay lại từ chat về theo dõi rồi về trang chính.

Kiểm tra bổ sung sau bản sửa đồng bộ: 12/12, log `tooling/ui-final-focused-tests.log`; phân tích tĩnh phần cuối không có lỗi, log `tooling/ui-snapshot-analyze.log`. Lần đọc snapshot được đánh thứ tự lúc bắt đầu để kết quả cũ hoàn thành muộn không đè lên kết quả mới.

Android Emulator đã qua toàn bộ luồng bốn vai trò với Auth/Database Emulator và Cloudinary thật: `tooling/ui-android-e2e.log`, kết thúc `All tests passed`. Bài test còn kiểm tra không giữ quá số suất, PIN sai/hết hạn, xác nhận số thực nhận, tự đến lấy, đóng món, khóa/mở tài khoản, khôi phục mật khẩu và đăng nhập lại. Phần dọn test app được đổi sang đưa Database offline để tránh lỗi SDK khi xóa FirebaseApp còn callback native đang chạy.

Database Rules đã triển khai thành công lên project hiện tại (`tooling/ui-rules-deploy.log`). Đợt này không tạo hay sửa tài khoản/món thử trên Firebase production. Đã xóa 3 ảnh thử Cloudinary do các lần chạy Android tạo ra và reset dữ liệu Auth/Database Emulator; manifest ảnh thử đã rỗng (`tooling/ui-test-media-cleanup.log`).

Hướng dẫn người dùng: [Quy trình ShareMeal từ đăng ký đến phân phát](Huong_dan_quy_trinh_ShareMeal.docx), 7 trang, 42 bước, hai nhánh giao nhận và ví dụ tính kho. Đã render và đọc các trang PNG trong `tooling/doc-render/pages`.

APK cuối đã build từ `lib/main.dart`, không truyền `FIREBASE_EMULATOR_HOST`, cài và khởi động thành công trên `emulator-5554`. Bản này kết nối Firebase thật. Metadata và SHA256: `tooling/ui-repair-handover.json`; log khởi động: `tooling/ui-final-startup.log`. Các tiến trình Firebase Emulator/bridge của đợt thử đã dừng; Android Emulator được giữ mở. Sau khi bài test cài lại gói ứng dụng, người dùng cần đăng nhập lại bằng tài khoản của mình.
