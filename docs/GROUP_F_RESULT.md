# Nhóm F — Ảnh nhận hàng bắt buộc

Thực hiện sau commit E `d2f49c0`, triển khai project thật `sharemeal-e17c9`
theo yêu cầu ưu tiên E/F. Không thực hiện C, D, G, H, I, A.

## Hành vi

- Cả giao hộ và tự lấy đều phải có ít nhất một ảnh nhận hàng trước khi hoàn tất.
- Dùng ô chọn ảnh/chụp ảnh trên màn xác nhận nhận hiện có. Không thêm màn,
  không đổi bố cục/theme/font. Nhãn đổi thành “Ảnh nhận hàng bắt buộc (JPG/PNG)”.
- Nếu thiếu ảnh, thông báo lỗi hiện trước khi gửi lệnh/xác nhận nhập kho.
- Ảnh tải qua Cloudinary unsigned preset hiện có; Firebase chỉ lưu URL vào
  `demo/orders/<id>/receiptPhoto`. Không thêm API Secret vào app.
- Chỉ nhận URL HTTPS của cloud `toanvip`, đường dẫn `image/upload`, JPG/JPEG/PNG.
  Không dùng ảnh lấy hàng `proof` thay cho ảnh tổ chức nhận hàng `receiptPhoto`.
- App kiểm tra và Rules cũng buộc ảnh hợp lệ ở lúc ghi intent, cộng kho và
  hoàn tất; không thể bỏ qua bằng cách ghi status/counter trực tiếp.

## Tương thích dữ liệu cũ

Đơn completed cũ thiếu ảnh vẫn mở được, retry không nhập kho lại và không bắt
bổ sung ảnh vào lịch sử cũ. Đơn pickedUp chưa có intent phải thêm ảnh khi nhận.
Nếu đã có intent pending của E nhưng thiếu ảnh: chỉ cho tổ chức nhận bổ sung
ảnh hợp lệ, giữ nguyên toàn bộ số lượng/ghi chú/trạng thái intent. Nếu kho đã
có marker của đơn, sau bổ sung ảnh chỉ hoàn tất, không cộng lại. Intent có ảnh
hợp lệ rồi thì không được thay/xóa ảnh qua luồng xác nhận. Không migration
hoặc sửa bản ghi sẵn có trên Firebase thật.

Rules chỉ kiểm tra hình thức URL, không xác thực nội dung ảnh hoặc chứng minh
ảnh là hàng nhận ngoài đời. Cloudinary unsigned của demo vẫn là cấu hình đã
được chủ project chấp thuận trước đây.

## File của F

- `frontend/lib/data/repositories/order_receipt_protocol.dart`: yêu cầu ảnh,
  nhận diện URL ảnh, bổ sung evidence cho intent cũ.
- `frontend/lib/data/repositories/direct_order_receipt.dart`: chặn recovery/nhập kho thiếu ảnh.
- `frontend/lib/data/repositories/firebase_app_state.dart`: mở lại intent pending
  phải hiện đúng số/ghi chú đã lưu, giữ ảnh mới chọn để bổ sung.
- `frontend/lib/presentation/shared/interaction/backend_actions.dart`: thông báo thiếu ảnh trước khi xử lý.
- `frontend/lib/presentation/shared/figma/live_detail_bindings.dart`,
  `live_figma_bindings.dart`: nhãn ảnh bắt buộc trong các vị trí cũ.
- `backend/tools/build_demo_rules.py`: nguồn Rules, sinh lại
  `backend/firebase/database/database.rules.json`; diff E → F tại `group-f-rules.diff`.
- `frontend/test/order_receipt_protocol_test.dart`,
  `frontend/test/handover_quantity_test.dart`,
  `backend/functions/test/receipt.emulator.cjs`: ảnh bắt buộc ở hai nhánh,
  PDF/link ngoài bị chặn, sửa evidence pending cũ không cộng lại kho.
- `frontend/integration_test/group_ef_production_test.dart`: kiểm tra thêm
  thông báo thiếu ảnh trên UI, upload/đọc ảnh Cloudinary thật, cả hai nhánh.
- `docs/GROUP_F_RESULT.md`, `docs/group-f-rules.diff`: bàn giao.

## Kiểm tra

17/17 bài Rules (B/E/F); 10/10 bài Flutter được chọn (protocol, hộp thoại,
stock, admin review reentry); flutter analyze toàn project sạch.
Kiểm tra bổ sung mở lại pending cũng đạt: hiện số 9 đã lưu thay vì số đặt 10,
giữ ghi chú đã chốt và ảnh người dùng vừa chọn. Không thêm package.

Android kết nối Firebase thật chạy đạt kịch bản E/F (53 giây chạy, không tính
build): UI/API thiếu ảnh bị chặn; upload Cloudinary thật và GET ảnh trả 200;
giao hộ và tự lấy đều yêu cầu ảnh; đối soát, ticket, retry/gap sau cộng kho,
20/10/9/6/3 vẫn đạt. Ảnh đã lưu vào receiptPhoto của đơn DEMO.

Cleanup cuối: xóa 4 tài khoản DEMO, 23 đường dẫn và 1 ảnh Cloudinary. Toàn bộ
cây dữ liệu RTDB, tập UID Authentication và adminUid giống mốc trước thử.
Không sửa hồ sơ, đơn hoặc ảnh sẵn có của bạn. Rules F vẫn được giữ triển khai.

Log không commit: `tooling/group-f-live-android.log`,
`group-f-live-cleanup.log`, `group-f-rules-tests.log`,
`group-f-flutter-tests.log`, `group-f-pending-reopen-test.log`,
`group-f-analyze.log`, `group-f-final-target-analyze.log`.
Nền bản đồ OSM vẫn có lỗi kết nối từ máy ảo như trước; E/F không sửa bản đồ.

Bridge live dùng `SHAREMEAL_ALLOW_GROUP_EF_LIVE_TEST=sharemeal-e17c9` và
manifest private. Đã ping Cloudinary xác minh quyền dọn ảnh trước khi upload.
Tất cả ảnh thử phải được ghi manifest; cleanup chỉ xóa đúng các public ID
nằm trong manifest của lượt DEMO, không liệt kê/xóa ảnh có sẵn của bạn.

Tự thử trên APK mới:

1. Tạo đơn và xác minh lấy hàng. Nếu giao hộ, xác minh mã giao tới tổ chức.
2. Tổ chức mở xác nhận nhận, chưa chọn ảnh rồi bấm xác nhận: phải báo thiếu ảnh,
   đơn chưa completed và kho chưa tăng.
3. Chọn/chụp JPG/PNG bằng ô cũ; nếu số lệch, ghi chú bắt buộc như E.
4. Xác nhận: ảnh Cloudinary lưu vào receiptPhoto, đơn completed, kho cộng đúng
   số thực nhận một lần. Mở lại/bấm lại không cộng thêm.
5. Lặp lại nhánh tự lấy: vẫn bắt buộc ảnh nhận hàng, không chỉ có PIN/QR.

Lệnh chạy kiểm thử Android thật (chỉ với sự cho phép của chủ project):

```powershell
$env:SHAREMEAL_ALLOW_GROUP_EF_LIVE_TEST = 'sharemeal-e17c9'
node .\backend\tools\group_ef_production_bridge.cjs
# Cửa sổ khác, AVD sẵn sàng:
.\run_flutter.cmd test integration_test/group_ef_production_test.dart -d emulator-5554 --dart-define=ALLOW_GROUP_EF_PRODUCTION_TEST=true --dart-define=REQUIRE_RECEIPT_PHOTO=true --reporter expanded
# Dọn bắt buộc sau khi ngừng bridge:
node .\backend\tools\group_ef_production_bridge.cjs --cleanup
```

Bản app thường dùng lib/main.dart, không cần các dart-define của bài test.

APK thường đã build thành công và cài lên máy ảo:
`frontend/build/app/outputs/flutter-apk/app-debug.apk`.
SHA256: `a325bc2ad40674ed3b5e9fd99615f05aee8cf183c34abde0d33ae8222eb9a01b`.
Kiểm tra analyze bổ sung các file cập nhật cuối cũng sạch. Sau khi cài APK,
đã dừng app và tắt máy ảo được mở cho lượt thử để giảm tải laptop.
