# Cấu hình ShareMeal demo — Firebase trực tiếp

Project `sharemeal-e17c9`, database `https://sharemeal-e17c9-default-rtdb.firebaseio.com`, cloud Cloudinary `toanvip`.

## Trạng thái đã thực hiện

- Đã nối Firebase Android bằng cấu hình project hiện có.
- Email/Password đã được chủ project bật trong Authentication.
- Đã triển khai Database Rules cho kiến trúc Flutter đọc/ghi trực tiếp.
- Đã tạo preset Cloudinary `sharemeal_demo_unsigned`, unsigned, JPG/JPEG/PNG/PDF, thư mục `sharemeal_demo`, tên file ngẫu nhiên, không ghi đè.
- Đã lưu `cloudName` và `uploadPreset` vào `/config/public/cloudinary`.
- Không nâng cấp Blaze, không triển khai Cloud Functions hay Firebase Storage.

Database có thể chưa có món/đơn: các bảng được tạo khi người dùng đăng ký, gửi hồ sơ, đăng món và thực hiện nghiệp vụ. App hiển thị trạng thái trống thay vì chèn món mẫu.

## Tạo tài khoản admin duy nhất

1. Cài APK, đăng ký bằng email của bạn, mở liên kết xác minh Firebase và quay lại bấm kiểm tra xác minh.
2. Trong Firebase Console → Realtime Database → Data → `users/<UID-của-bạn>/role`, sửa giá trị thành chuỗi `admin`. UID trùng UID trong Authentication.
3. Đăng xuất rồi đăng nhập lại. App ghi `config/adminUid` lần đầu bằng UID này và mở giao diện quản trị. Không cần duyệt hồ sơ cho admin.
4. Chỉ sửa role admin cho một tài khoản. Khi `config/adminUid` đã có, tài khoản khác không thể tự chiếm quyền admin. Nếu cần chuyển admin sau này, chủ project sửa đồng thời role và `config/adminUid` bằng Console.

Người dùng thường chỉ được chọn `donor`, `charity`, `volunteer`. Admin duyệt hồ sơ ở tab Hồ sơ; người dùng nhận kết quả qua listener và thông báo trong app.

## Email

Dùng liên kết xác minh và đặt lại mật khẩu do Firebase Authentication gửi, không dùng OTP 6 số và không cần SMTP. Nếu chưa thấy thư, kiểm tra Spam. Mở thư, bấm liên kết, quay lại màn hình xác minh cũ và bấm “Xác nhận & chọn vai trò”. Không cần nhập mã 6 số. Mục quên mật khẩu gửi liên kết khôi phục tới email đã nhập. Thay đổi mẫu email tại Authentication → Templates nếu cần.

## Ảnh và giấy tờ

App tải file lên Cloudinary rồi lưu URL HTTPS trong Firebase. API Secret không có trong mã Flutter/APK. App chặn quá 8 MB/file, ảnh món nhận JPG/PNG, tài liệu nhận thêm PDF. [Cloudinary không hỗ trợ giới hạn dung lượng riêng cho preset](https://cloudinary.com/documentation/upload_presets); server dùng hạn mức tài khoản, giới hạn 8 MB là kiểm tra trong app.

Đây là upload unsigned đã được chủ tài khoản đồng ý cho demo. Ai biết tên preset có thể upload và dùng hạn mức tài khoản; tắt unsigned hoặc xóa preset sau demo nếu không còn dùng. URL media Cloudinary là URL công khai: Rules bảo vệ bản ghi/URL trong Firebase, không biến file thành tài liệu riêng tư. Dùng ảnh giấy tờ giả lập cho demo. PDF có thể bị chặn phân phối theo cài đặt Cloudinary của tài khoản; ảnh JPG/PNG phù hợp để demo hồ sơ.

## Chạy và cập nhật

Từ thư mục gốc:

```powershell
.\run_flutter.cmd pub get
.\run_flutter.cmd run
.\run_flutter.cmd build apk --debug
python backend/tools/build_demo_rules.py
```

Từ `backend` nếu cần deploy lại:

```powershell
firebase deploy --only database --project sharemeal-e17c9
firebase database:update /config/public firebase/public-config.json --project sharemeal-e17c9 --force
```

Lệnh cập nhật cấu hình chỉ ghi tên cloud/preset ở đường dẫn công khai, không nhập hay xóa dữ liệu nghiệp vụ. Không import một file database rỗng vào root.

## Trình tự kiểm tra thủ công của chủ project

1. Tạo admin như trên và ba tài khoản người dùng khác nhau.
2. Mỗi người xác minh email, chọn vai trò, tải ảnh hồ sơ, nhập thông tin và gửi duyệt.
3. Admin thử yêu cầu bổ sung/từ chối/phê duyệt; người gửi nhìn thấy trạng thái mới.
4. Người cho đăng món còn hạn; admin duyệt; tổ chức tìm món, xin nhận tự lấy hoặc giao hộ.
5. Người cho nhận/từ chối yêu cầu. Nhận sẽ giữ số suất, hủy trước lấy hàng sẽ hoàn số suất.
6. Tình nguyện viên nhận chuyến hoặc admin phân công. Người cho tạo mã lấy hàng, người lấy nhập PIN/quét QR.
7. Nếu giao hộ: tình nguyện viên gửi ảnh, tổ chức tạo mã nhận, tình nguyện viên xác nhận mã; tổ chức nhập số thực nhận và hoàn tất đơn.
8. Kiểm tra kho, phân phát trong tồn, đánh giá/cảm ơn, trao đổi theo đơn, hỗ trợ và phản hồi admin.

Hai tài khoản và một món DEMO đã được tạo tạm để kiểm tra Firebase thật theo chấp thuận của chủ project, rồi xóa sạch. Không giữ dữ liệu mẫu. Lần mở app tiếp theo có thể chưa có món; hãy đăng món và duyệt bằng admin để thấy dữ liệu thật.

