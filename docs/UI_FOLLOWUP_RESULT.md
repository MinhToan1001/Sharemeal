# Sửa hiển thị, ảnh đơn nhận và tác động — 02/11/2026

## Kết quả

- Giữ font Inter, màu sắc và cấu trúc màn hiện tại. Sửa căn giữa trong hàng/cột thay vì kéo nhãn sang trái; dấu tích và số bước nằm giữa vòng tròn. Các nhãn trong ô vai trò được giữ đúng kích thước.
- Bỏ việc dùng các chấm/khung trang trí làm giới hạn chiều rộng của chữ. Tên cấp độ và tiêu đề huy hiệu không bị ép thành cột hẹp.
- Căn nhãn huy hiệu vào đúng ô, xử lý cả transform trong bản xuất. Sửa line-height lớn hơn khung (ví dụ line-height 32px trong ô 16px) để chữ giữ cỡ đọc được.
- Thẻ Đơn nhận thêm ảnh món, tên, số suất, người cho, giờ và cách nhận. URL ảnh thật ưu tiên; món cũ chưa có ảnh sử dụng ảnh dự phòng có nhãn Minh họa. Chỉ rút gọn mã đơn trong hiển thị, không đổi ID lưu trữ.
- Truy vết bàn giao: nhánh tự đến lấy ghi rõ tổ chức tự lấy; chưa có người giao ghi rõ trạng thái; chưa xác nhận không ghi nhầm là đã xác nhận 0 suất.
- Món không còn suất trống không cho bấm gửi thêm yêu cầu nhận. Ghi chú trống có lời nhắc rõ ràng.
- Bỏ nút Thêm yêu cầu kiểm thử khỏi màn Firebase thật. Số lượng trên tab admin/đơn nhận lấy từ snapshot hiện tại; tab Chờ duyệt lọc đúng các yêu cầu chờ.

## Tác động bằng 0

Lúc đối chiếu Firebase thật trong đợt này có **1 đơn accepted, 1 đơn awaiting, chưa có completed**. Vì vậy số suất đã trao và đơn hoàn tất bằng 0 là đúng. Không cộng đơn mới đăng hoặc đang vận chuyển vào số đã trao.

Màn báo cáo đã có giải thích số đơn đang xử lý và thời điểm cộng tác động: sau khi tổ chức xác nhận nhận hàng. Số lượng lấy từ qtyReceived/received thực tế, khối lượng ghi rõ là ước tính 0,5 kg/suất. Tuần tính từ thứ Hai, tháng và năm theo lịch; biểu đồ dùng cùng tập dữ liệu với tổng và nhãn đúng kỳ. PDF dùng cùng phép lọc kỳ. Bản ghi cũ không có thời gian hoàn tất/cập nhật không được tự gán là hoàn tất hôm nay.

## Lỗi Firebase từ chối chấp nhận món nhiều ảnh

Đã tái hiện permission_denied bằng fixture cục bộ có 2 ảnh và dị ứng. Rules cũ so sánh `.val()` của cả danh sách; API RulesDataSnapshot trả về sentinel ở node có con, không phải giá trị sâu của các phần tử. Đổi sang đối chiếu phần tử scalar có giới hạn, kèm kiểm tra ở node món để không bỏ qua việc xóa cả danh sách. Nguồn: [Firebase Rules API — val](https://firebase.google.com/docs/reference/security/database#val).

Sửa tại `backend/tools/build_demo_rules.py`, rồi sinh `backend/firebase/database/database.rules.json`. Chỉ phần validate của `demo/foods/$id` và danh sách photos/allergens thay đổi. Trước cập nhật, đối chiếu rules đang chạy với baseline đã commit; có bản sao lưu riêng trong backend/.private. Sau cập nhật, đọc lại và xác minh rules khớp file sinh ra.

Đã cập nhật lên `sharemeal-e17c9` theo phạm vi sửa giữ suất nhóm B đã được cho phép triển khai thật. Không tạo/sửa/xóa đơn, tài khoản, ảnh hay dữ liệu nghiệp vụ thật trong bước kiểm tra/triển khai này. Không thử chấp nhận đơn hiện có thay người dùng. Metadata triển khai: `tooling/ui-followup-rules-deployment.json`.

## Xác minh

- Flutter toàn bộ: **76/76 đạt**, `tooling/ui-followup-final-tests.log`.
- Kiểm tra bổ sung sau khi nối số lượng tab: **16/16 đạt**, tooling/ui-followup-counts-final.log; kiểm tra tĩnh ba file cuối không có vấn đề, tooling/ui-followup-counts-analyze.log.
- Thêm fixture hồ sơ chờ duyệt và truy vết đơn tự đến lấy: **5/5 đạt**, `tooling/ui-followup-visual-final.log`.
- Rules giữ/nhả suất, hủy, nhận hàng: **18/18 đạt**, `tooling/ui-followup-rules-after.log`.
- Kiểm tra bổ sung chống sửa/xóa danh sách ảnh/dị ứng khi giữ suất: **1/1 đạt**, `tooling/ui-followup-photo-security-final.log`.
- Phân tích tĩnh: không có vấn đề, `tooling/ui-followup-final-analyze.log`.
- APK chính build từ lib/main.dart thành công, cài lên emulator-5554 thành công. Không tự đăng nhập hoặc thao tác đơn thật sau cài.
- Ảnh render các màn với fixture cục bộ: `docs/figma/actual/followup/`. Bộ render toàn bộ trang cũng đã cập nhật các ảnh actual chung.

## APK và cách thử

File: `frontend/build/app/outputs/flutter-apk/app-debug.apk`.
SHA256: `1838eb223ce8739c980227062641ea001270452dad5bfae57c19a54bf49c037b`.

Mở lại ShareMeal trên máy ảo để dùng APK mới, hoặc chạy PowerShell:

```powershell
Set-Location D:\HocTap\hk7\ShareMeal
.\run_flutter.cmd run -d emulator-5554 --target lib/main.dart
```

Kiểm tra vai trò ở đăng nhập, các bước xác minh, trang huy hiệu, thẻ đơn nhận có ảnh và truy vết. Với người cho đã duyệt, thử chấp nhận yêu cầu món có nhiều ảnh. Với báo cáo tác động, hoàn tất lấy/giao rồi xác nhận nhận hàng bên tổ chức; số thực nhận sẽ được cộng vào kỳ tương ứng.
