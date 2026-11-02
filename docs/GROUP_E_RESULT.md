# Nhóm E — Đối soát giao nhận và nhập kho

Phạm vi: giữ giao diện hiện có, thêm tối thiểu hộp thoại số thực lấy/ghi chú
và dòng Đặt / Lấy / Nhận trong trang theo dõi của người cho và tổ chức.
Không thực hiện C, D, G, H, I, A trong nhóm này. F là commit kế tiếp.
Chủ project đã cho phép triển khai E/F và kiểm thử bằng dữ liệu DEMO trên
Firebase thật `sharemeal-e17c9`; không sửa tài khoản/dữ liệu sẵn có.

## Dữ liệu

`demo/orders/<id>` bổ sung tùy chọn:

- `qtyRequested`: bằng `quantity` đã yêu cầu/giữ; không đổi.
- `qtyPickedUp`: số thực lấy, 1..quantity, mặc định bằng số đặt. QR và PIN
  dùng chung hộp thoại xác nhận. PIN thành công lưu số này trong
  `handover/<id>/pickup/qtyPickedUp`; retry không đổi số đã xác minh.
- `qtyReceived`: số tổ chức thực nhận, 0..quantity; `received` cũ lưu cùng số.
  Cho phép nhận 0 để ghi nhận mất/hỏng toàn bộ qua hỗ trợ.
- `hasDiscrepancy`, `discrepancyNote`, `discrepancyTicketId`: khi Nhận khác
  Đặt hoặc Lấy, bắt buộc ghi chú và có ticket `receipt_<id>`.
- `receiptState`: `pending` rồi `completed`; `inventoryAdded`: false rồi true.
- `receiptRequestedAt`: thời gian cố định của lần xác nhận nhận hàng.

`demo/inventory/<organizationUid>` bổ sung `receiptJournal` dạng chuỗi
append-only `|<orderId>:I|` và giữ `lastReceivedOrderId`. Marker cùng counter
nằm trong một transaction. Đơn hoàn tất không được nhập kho lại.

`demo/tickets/receipt_<orderId>` dùng bảng hỗ trợ sẵn có, type
`quantityDiscrepancy`, orderId, uid, name, detail, reason, status, createdAt.
ID cố định tránh tạo trùng. Admin thấy trong mục khiếu nại/hỗ trợ hiện có;
ấn vào liên kết để xem đơn và đối soát thực tế, ghi kết quả xử lý. Giải quyết
vụ hỗ trợ không sửa các số đã xác nhận và không nhả suất về món công khai.

## Thứ tự ghi, lỗi giữa chừng và idempotency

1. Transaction **một node đơn** ghi intent khi đơn pickedUp và đã xác minh
   giao hàng (tự lấy không cần mã giao). Đóng băng số lượng, ghi chú, ảnh đã
   gửi và ID ticket. Đơn vẫn pickedUp, chưa báo hoàn tất.
2. Nếu có sai lệch, transaction **một node ticket** tạo ticket ID cố định;
   nếu đã có thì giữ cả kết quả admin xử lý. Chưa tạo ticket thì chưa cộng kho.
3. Transaction **một node kho của tổ chức** kiểm tra marker, cộng chính xác
   qtyReceived và append marker. Giữ nguyên distributed, marker và dữ liệu cũ.
   Marker đã có thì bỏ qua; hai thiết bị cạnh tranh qua RTDB CAS. Trong cùng
   client tuần tự hóa thao tác kho để SDK không gộp hai journal append.
4. Transaction **một node đơn** chỉ chuyển completed/inventoryAdded=true
   khi rules thấy marker kho và ticket tương ứng (nếu lệch).

Nếu rớt mạng/đóng app ở bất kỳ bước nào: giữ intent, không trừ bù kho vì
thực phẩm đã được nhận; lần tải snapshot/làm mới/đăng nhập lại của tổ chức
sẽ tiếp tục. Bấm xác nhận lại dùng intent đã lưu, không đổi số giữa chừng.
Nếu counter kho cũ sai, không tự clamp; cần admin xử lý qua vụ hỗ trợ.
Admin không được thay tổ chức để nhập kho, phải để tổ chức nhận tiếp tục.
Không rollback dữ liệu thật hoặc dùng transaction toàn `/demo`.

Dữ liệu cũ thiếu qtyRequested/qtyPickedUp: dùng quantity làm giá trị dự phòng,
chỉ backfill khi xác minh lấy/xác nhận nhận. Đơn completed cũ không cộng lại.
Số suất thiếu không trả về món, kể cả nhận 0. Nhánh phân phát giữ nguyên hiện
có; transaction phân phát là G, chưa thuộc commit E.

## Rules và kiểm tra

Nguồn duy nhất: `backend/tools/build_demo_rules.py`; sinh lại JSON bằng:

```powershell
python .\backend\tools\build_demo_rules.py
```

Rules buộc thứ tự intent/ticket/marker/completed, khóa các số sau xác nhận,
chặn xóa journal/flag, từ chối hoàn tất trực tiếp hoặc cộng kho tùy ý.
Diff so với B ở `docs/group-e-rules.diff`. Bản APK cũ ghi kho trực tiếp bị
rules E từ chối; cần dùng APK bàn giao mới.

Kiểm tra cục bộ: `receipt.emulator.cjs` 7 tình huống, hồi quy cancellation
8 tình huống; Flutter protocol/admin reentry 8 bài; flutter analyze sạch.

Kiểm thử thật dùng `group_ef_production_bridge.cjs`, opt-in
SHAREMEAL_ALLOW_GROUP_EF_LIVE_TEST=sharemeal-e17c9, manifest riêng bị ignore.
Bridge chỉ tạo/xóa UID có prefix sm-ef-live, từ chối đơn/món ngoài fixture;
không tạo admin hoặc sửa adminUid. Luồng nghiệp vụ dùng SDK Android đăng nhập
thật, không dùng Admin SDK để bỏ qua rules. Owner chỉ setup/cleanup và tạo
khoảng lỗi mô phỏng trên đơn DEMO. Sau test bắt buộc chạy --cleanup.

Android thật đã chạy đạt một kịch bản đầy đủ: hai nhánh giao hộ/tự lấy,
retry PIN, thiếu ghi chú bị chặn, nhập ghi chú trên giao diện, ticket liên kết,
người cho thấy 10/10/9, retry đồng thời và mô phỏng khoảng lỗi sau cộng kho,
20/10/9/6/3. Lượt cuối 43 giây chạy test (không tính build).
Sau cleanup: xóa 4 tài khoản và 29 đường dẫn fixture; toàn bộ dữ liệu RTDB,
tập UID Authentication và adminUid giống mốc trước thử. Không tạo ảnh trong E.
Các lượt thử trước bị lỗi tệp kiểm thử/quyền đọc lại PIN cũng đã dọn sạch;
lỗi quyền đọc lại mã đã dùng đã được sửa và thêm kiểm tra hồi quy.
Log: `tooling/group-e-live-android.log`, `group-e-live-cleanup.log`,
`group-e-final-rules-tests.log`, `group-e-flutter-tests.log`,
`group-e-handover-test.log`, `group-e-analyze.log` (không commit).
Hộp thoại hủy không tiêu thụ PIN và hiển thị thực nhận 0 cũng được kiểm tra.
15/15 bài rules E+B, 9 bài Flutter được chọn, analyze sạch.
Android vẫn bị từ chối kết nối tile.openstreetmap.org; các bước Firebase
đạt, hình nền bản đồ chưa xác nhận tải được. E không sửa widget bản đồ.

## Tự thử trên bản app mới

1. Tài khoản đã duyệt: người cho đăng món 20 suất, admin duyệt, tổ chức xin 10.
2. Người cho chấp nhận, giao hộ hoặc tự lấy bằng QR/PIN. Nhập số thực lấy 10.
3. Tổ chức xác nhận giao (nếu giao hộ), chọn số thực nhận 9. Thiếu ghi chú
   sẽ bị chặn. Nhập ghi chú, xác nhận: đơn 10/10/9, kho +9, support có một vụ.
4. Bấm lại/làm mới: kho vẫn +9; phát 6: còn 3. Người cho thấy cả ba số.
5. Thử tự lấy thực tế 8, nhận 8 của đơn đặt 10: vẫn phải có ghi chú/vụ hỗ trợ.
6. Nhận 0 của đơn lấy 10: ghi chú bắt buộc, kho +0, không trả suất công khai.
7. Đơn từ pickedUp trở đi không hủy được, mọi sai lệch chuyển qua hỗ trợ.

Giới hạn: không có server nền. Recovery cần tổ chức mở app/kết nối mạng;
journal tăng theo lịch sử kho, cần thiết kế lưu trữ dài hạn nếu chạy thật.
Rules kiểm tra dữ liệu/chủ thể, không thể chứng minh số suất vật lý tại hiện trường.

## File thay đổi của E

- `frontend/lib/data/repositories/order_receipt_protocol.dart`: biến đổi intent/kho thuần, fallback dữ liệu cũ.
- `frontend/lib/data/repositories/direct_order_receipt.dart`: tạo vụ hỗ trợ, transaction nhập kho, hoàn tất và retry.
- `frontend/lib/data/repositories/direct_orders.dart`: lưu qtyRequested, xác minh số thực lấy, nối luồng hoàn tất.
- `frontend/lib/data/firebase/direct_backend.dart`: nối helper và phục hồi receipt pending khi snapshot.
- `frontend/lib/presentation/shared/interaction/handover_confirmation.dart`: hộp thoại chung QR/PIN.
- `frontend/lib/presentation/shared/interaction/backend_actions.dart`: ghi chú chênh lệch và payload.
- `frontend/lib/presentation/shared/interaction/handover_scanner.dart`, `frontend/lib/presentation/backend/backend_handover_scanner.dart`: dùng chung xác nhận số thực lấy.
- `frontend/lib/presentation/shared/interaction/live_flow_pages.dart`: ba số và trạng thái đang nhập kho.
- `frontend/lib/presentation/shared/interaction/interaction_values.dart`: đơn hoàn tất nhận 0 phải hiển thị 0, không thay bằng số đặt.
- `backend/tools/build_demo_rules.py`, `backend/firebase/database/database.rules.json`: nguồn/sản phẩm rules E.
- `frontend/test/order_receipt_protocol_test.dart`, `frontend/test/handover_quantity_test.dart`, `backend/functions/test/receipt.emulator.cjs`: kiểm tra logic, hộp thoại, rules/concurrency.
- `frontend/integration_test/group_ef_production_test.dart`, `backend/tools/group_ef_production_bridge.cjs`: kiểm thử thật có opt-in và cleanup.
- `docs/GROUP_E_RESULT.md`, `docs/group-e-rules.diff`: bàn giao và diff B → E.
