# Frontend tương tác ShareMeal

## Phạm vi hiện tại

104 màn hình nguồn Figma được giữ lại, thêm trang **Tác động của người cho** tại
`/user/donor/impact-report` (tổng 105 route). Không chỉnh sửa file Figma, không deploy
backend và không thay Firebase Rules. Giữ font, bộ màu, hình và SVG của nguồn thiết kế;
Sửa vùng tương tác, trạng thái chọn, điều hướng sai và các danh sách cần dữ liệu động.
Đợt rà soát 30/10 có điều chỉnh các panel theo yêu cầu giảm chữ: thẻ cam kết, ô tải ảnh,
lịch và ca tình nguyện, minh họa trạng thái hồ sơ và các bước đóng gói. Không chỉnh file Figma.

Thiết kế Figma cung cấp bố cục và các đích điều hướng. Các ô nhập, lựa chọn, xác nhận
và thay đổi dữ liệu hiện do widget/command Flutter xử lý, không còn lớp hotspot trong suốt
đè lên giao diện. `figma_prototype_controller.dart` vẫn đọc tuyến và điều kiện của luồng
gốc; trạng thái nghiệp vụ phía client nằm riêng trong `FrontendState`.

## Các phần đã làm

- Bảo quản chọn một; dị ứng chọn nhiều; điều kiện an toàn bật/tắt được. Thiếu xác nhận
  an toàn thì không chuyển sang bước tiếp. Khung giờ, ngày, phương thức nhận, lý do hủy,
  tiêu chí đánh giá và lịch sẵn sàng có trạng thái chọn riêng.
- Số lượng tăng/giảm, không âm và không vượt số suất còn lại. Trường số dùng bàn phím số.
  Form có kiểm tra email, mật khẩu, mật khẩu lặp lại và dữ liệu bắt buộc.
- Tìm kiếm lọc từng từ, không phân biệt dấu/hoa thường. Gõ “cơm gà” hoặc “com ga” chỉ
  trả những món phù hợp. Có bộ lọc loại món và trạng thái không có kết quả.
- Đăng tin → xem lại → đăng thành công → tin của tôi dùng cùng dữ liệu. Có chỉnh sửa,
  đóng tin và cập nhật danh sách. Các đơn/yêu cầu nhận/nhu cầu/chat không còn là thẻ mẫu
  chỉ dùng để chuyển trang. Thay đổi được lưu cục bộ bằng SharedPreferences.
- Chuỗi liên vai trò trên **cùng một thiết bị**: tổ chức gửi yêu cầu → người cho duyệt →
  chọn giờ lấy → tình nguyện viên nhận chuyến → đối chiếu QR/PIN → xác nhận số lượng
  thực nhận → cập nhật lịch sử, tồn kho và tác động. Không tự hoàn tất đơn bằng nút xem
  trạng thái. Phân phát không được vượt tồn kho.
- Bottom bar người cho thống nhất: **Trang chủ / Tin đăng / Tác động / Tôi**. Trang Tác
  động có kỳ thời gian, số liệu, biểu đồ, tỷ trọng, lịch sử và xuất PDF; không dẫn nhầm
  sang Lịch sử. Các vai trò còn lại giữ bộ mục của vai trò đó.
- Ảnh/tài liệu mở trình chọn thật; ảnh camera dùng ứng dụng camera Android. File chọn
  được sao chép vào vùng tài liệu riêng của app, có xử lý hủy và từ chối quyền.
- QR được dựng từ mã đơn và PIN, không dùng ảnh QR mẫu. Camera quét qua mobile_scanner;
  có phương án nhập PIN sáu số, xóa ký tự, giới hạn số lần nhập sai và kiểm tra hết hạn.
- PDF được tạo từ dữ liệu client, mở hộp thoại lưu file; chia sẻ mở share sheet, không tự
  gửi email. Biên lai PDF và báo cáo tác động là hai nội dung riêng.
- Đã tích hợp Google Maps SDK cho Android vào các vùng bản đồ. **Chưa có API key của bạn nên
  chưa kiểm chứng tải bản đồ nhúng**; app báo rõ chưa cấu hình và có nút mở Google Maps bên ngoài.
  Không có GPS trực tiếp/ETA thật/geocoding. Xem [cấu hình Maps](GOOGLE_MAPS_ANDROID.md).
  Thêm lịch tạo file `.ics` theo ngày/giờ được chọn và mở trình chia sẻ/import của máy.
- Admin duyệt, yêu cầu bổ sung, từ chối và các điều kiện đối chiếu cập nhật trạng thái
  client, dùng cùng điều kiện chặn thao tác của các vai trò. Đây chưa phải phân quyền máy chủ.
- Form có thể cuộn khi bàn phím Android mở, không thu nhỏ toàn bộ bản thiết kế xuống
  vùng phía trên bàn phím.

## Không nhầm với backend đã hoàn thành

Dữ liệu khởi đầu là dữ liệu kiểm thử cục bộ. Các tài khoản/role/đơn trên những điện thoại
khác nhau **chưa đồng bộ**. Firebase chỉ giữ cấu hình/bootstrap có sẵn. Chưa gọi Authentication
để đăng nhập/đăng ký thật, gửi OTP/email hoặc đổi mật khẩu. Các chức năng này có thông báo
giới hạn, không giả vờ đã gửi email/đổi mật khẩu. Mã xác thực liên hệ dùng để thử UI: `123456`.

Mật khẩu, OTP và PIN không lưu trong SharedPreferences. Các mã bàn giao hiện là mã thử
phía client, không thay thế xác nhận máy chủ, Rules hay chữ ký chứng từ. Vị trí, trọng lượng,
điểm thưởng và số liệu khởi đầu chưa phải dữ liệu vận hành được xác minh. Notification/chat
chưa gửi đến tài khoản khác, gọi điện chỉ mở trình quay số.

Camera, quyền truy cập ảnh, hộp thoại lưu/chia sẻ và ứng dụng bản đồ/lịch còn tùy thiết bị.
Hủy trình chọn không làm mất dữ liệu trước đó. Cần kiểm thử thêm camera thật/QR giữa hai
thiết bị sau khi có backend và dữ liệu đồng bộ.

## Mã nguồn

- `frontend/lib/presentation/shared/interaction/frontend_state.dart`: dữ liệu client,
  tìm kiếm, kiểm tra nghiệp vụ, chuyển trạng thái và lưu cục bộ.
- `frontend_actions.dart`: command cho các nút; tích hợp file, ảnh, QR/PIN, PDF, lịch, map.
- `app_navigation.dart`: bottom bar theo vai trò, tái sử dụng SVG gốc.
- `frontend_collections.dart`: danh sách món/tin/đơn/nhu cầu/yêu cầu/việc giao/lịch sử và chat.
- `interaction_values.dart`, `impact_widgets.dart`, `handover_scanner.dart`: giá trị động,
  biểu đồ và camera scanner.
- `frontend/lib/presentation/user/donor/pages/impact_report_page.dart`: trang mới của người cho.
- `tooling/figma-import/frontend_controls.cjs`: ánh xạ ngữ nghĩa cho cây thiết kế. Sửa ở đây
  trước khi chạy `generate_flutter.cjs`, không sửa riêng các file màn hình GENERATED.
- `docs/frontend/control_audit.json`: danh mục điều khiển được sinh theo từng màn.

## Kiểm thử

```powershell
.\run_flutter.cmd analyze
.\run_flutter.cmd test
.\run_flutter.cmd test integration_test/frontend_smoke_test.dart -d emulator-5554
.\run_flutter.cmd build apk --debug
```

`frontend_controls_test.dart` kiểm tra đúng các vấn đề chọn bảo quản/dị ứng, dấu tích,
+/-, tìm kiếm, bottom bar và tác động. `frontend_flow_test.dart` đi qua các nút thực của
chuỗi đăng tin/gửi yêu cầu/duyệt/nhận chuyến/PIN/xác nhận, kiểm tra lưu lại dữ liệu và tạo PDF.
`figma_visual_test.dart` dựng 104 màn gốc + trang Tác động mới và sáu trạng thái theo dõi.
`integration_test/frontend_smoke_test.dart` chạy lại những ca tương tác trên Android.

### Kết quả xác minh ngày 29/10/2026

- `flutter analyze`: không có vấn đề.
- Toàn bộ 24 test đạt; render 105 trang và sáu trạng thái theo dõi không báo lỗi layout.
- 7 ca tích hợp trên Medium_Phone_2 / emulator-5554 đạt, gồm toàn chuỗi liên vai trò.
- Kiểm tra bổ sung lưu/khôi phục cục bộ, PDF và mặc định nhận khi món chỉ còn
  8 suất; không lưu mật khẩu: đạt.
- APK debug build thành công; bản entry `lib/main.dart` đã được cài và mở trên máy ảo.
- Đã xem lại ảnh trang an toàn, trang tác động và màn khởi đầu Android.
  Ảnh tại `docs/figma/actual` và `docs/frontend/android-entry.png`.

Gradle có cảnh báo chuyển đổi Kotlin của các plugin Firebase ở phiên bản Flutter tương lai;
không làm bản build hiện tại thất bại. Chưa nâng cấp phần Firebase/backend trong đợt này.

Nội dung hướng dẫn đóng gói thay đổi theo loại món. Các mốc giữ nóng/lạnh và thời gian
ngoài kiểm soát nhiệt độ đối chiếu [hướng dẫn FDA](https://www.fda.gov/media/79871/download).
Các nội dung này không thay thế quy trình kiểm tra ATTP của đơn vị vận hành.

### Rà soát ngày 30/10/2026

- Bút sửa thông tin giấy phép mở hộp thoại chỉnh sửa / chọn ngày, cập nhật ngay giá trị.
  Hồ sơ chung cũng sửa được tên và số điện thoại; có kiểm tra trống, số điện thoại và mã số thuế.
  Ảnh giấy phép dùng trình chọn/camera thật; chưa chọn thì nút dùng ảnh bị khóa.
  Không giả lập kết quả OCR từ hình khối mẫu của Figma.
- Ảnh cơ sở mặc định 0/5: mặt tiền, khu chế biến, tủ lạnh, khu rửa & đồ dùng,
  chứng nhận ATTP; ô thứ sáu không bắt buộc. Không có 3 ảnh tải sẵn. Chỉ đủ 5 ô bắt buộc
  mới bật nút tiếp tục màu xanh. Ảnh thay thế/ảnh bổ sung không tăng sai bộ đếm;
  có chọn/chụp/thay/gỡ ảnh. Hủy hoặc từ chối quyền không được tính là có ảnh.
- 4 cam kết mặc định chưa chọn, bật/tắt được; có tiến độ và phần nội dung mở rộng.
  Nút gửi chỉ bật khi đủ 4 mục, command cũng kiểm tra ảnh cơ sở trước khi gửi.
- Đồng bộ cách chặn nút gửi hồ sơ cá nhân, tổ chức, tình nguyện viên và nút admin duyệt:
  các xác nhận không tích sẵn. Nút khóa có `onTap: null`, semantics disabled, màu chữ/nền
  tương ứng và kiểm tra lại ở command, không chỉ đổi màu bề ngoài.
- Lịch dùng ngày hiện tại của thiết bị, chọn từng ngày/tuần hoặc lịch tháng được.
  Danh sách ca/chuyến đổi theo ngày. Đăng ký/hủy lưu theo từng ngày; chặn đăng ký ca quá khứ
  và đăng ký trùng. Đơn tự đến lấy không lẫn vào lịch giao của tình nguyện viên.
  Số chỗ/ca vẫn là dữ liệu kiểm thử cục bộ, không phải số liệu từ backend.
- Sửa vẽ viền dùng chung: clip nội dung trước, vẽ stroke phía trên. Sửa riêng viewport hồ sơ
  để không cắt đáy nút đăng xuất. Không thay bộ màu gốc: nút native dùng đúng `#006642`.
- Đã chạy **34 test đạt**, gồm dựng lại 105 route và 6 trạng thái theo dõi. Ca mới kiểm tra
  bút sửa, trạng thái ảnh/cam kết, lịch, xác nhận admin/tổ chức, lưu/khôi phục trạng thái.
  `frontend_media_test.dart` dùng file ảnh thật và mock ranh giới platform picker để kiểm tra
  copy file, hủy, từ chối quyền, thay, gỡ. Không coi đây là bằng chứng camera vật lý đã được thử.
- **16 ca tích hợp trên Medium_Phone_2 / emulator-5554 đạt**, bao gồm các ca mới và chuỗi
  liên vai trò. `flutter analyze --no-pub`: không có vấn đề.
- Đã build/cài/mở lại bản bình thường `lib/main.dart` trên máy ảo sau kiểm thử; không để
  lại APK test làm màn khởi đầu. Ảnh kiểm tra tại `docs/frontend/android-entry.png`;
  APK debug tại `frontend/build/app/outputs/flutter-apk/app-debug.apk`.
- `tooling/figma-import/audit_frontend_review.cjs` tạo `docs/frontend/review_audit.json`:
  thống kê chữ/ảnh của 104 nguồn, panel native và nút có điều kiện. Không dùng “0 Button chưa
  ánh xạ” để khẳng định tất cả trạng thái đều đúng; vẫn cần kiểm thử thiết bị và backend.

Mã mới được tách theo nhóm: `user/donor/widgets/verification_widgets.dart`,
`user/volunteer/widgets/volunteer_calendar.dart`, `shared/interaction/profile_summary.dart`,
`status_visuals.dart`. Ánh xạ nằm trong `frontend_controls.cjs`, có thể sinh lại màn hình
mà không mất các sửa tương tác.

### Bổ sung điều hướng, hình ảnh và bố cục

- Hồ sơ có nút quay lại, xử lý back tại route gốc và giữ bottom bar của người cho,
  tổ chức hoặc tình nguyện viên; bấm tab không làm mất vai trò hiện tại.
- Thẻ món, chi tiết, màn đăng thành công và bước an toàn dùng ảnh thay icon món ăn.
  Ưu tiên ảnh tải lên, ảnh mặc định có nhãn minh họa. Xem [asset và prompt](FOOD_IMAGE_ASSETS.md).
- Yêu cầu nhận và ghép nối có nhiều thẻ từ model đơn, ảnh, số suất, giờ nhận, khoảng cách
  và lựa chọn chấp nhận/từ chối đúng đơn. Điểm phù hợp chỉ là heuristic client, không phải AI/server.
  Ba yêu cầu mẫu được bổ sung một lần vào dữ liệu cục bộ, không xóa các đơn cũ.
- Việc cần giao chỉ còn một danh sách động, không chồng thẻ Figma tĩnh bên dưới.
  Bộ lọc cuộn ngang; ô ghi chú nhiều dòng cuộn nội dung, không tăng vượt khung nhập.
- Các thay đổi nằm ở widget riêng và semantic overlay của codegen; giữ font Inter,
  màu xanh nguồn thiết kế, icon bottom bar gốc, các page vẫn tách file.
- Bản đồ được thay ở điểm lấy, tìm món, việc giao, điều phối admin, theo dõi đơn và lộ trình.
  Chưa bật billing hoặc thay đổi Firebase/backend. Địa chỉ nhập chữ không tự biến thành tọa độ.
- Chi tiết chuyến giao và đang đi lấy hàng cũng dùng Maps, ảnh món và thông tin đơn đang chọn.
  Bỏ các con số ETA/điểm thưởng tĩnh trong chi tiết/xác nhận chuyến. Khung liên hệ người cho và
  tình nguyện viên dùng layout co giãn, không để nhiều lớp chữ địa chỉ chồng nhau.
- Tiến trình bàn giao của người cho lấy từ `MealOrder.status`, không tích sẵn các bước
  nhận chuyến/lấy hàng. Hồ sơ tình nguyện viên mở Huy hiệu thay vì báo cáo của tổ chức.

Kiểm thử bổ sung: `navigation_media_test.dart` kiểm tra back và bottom bar cả ba vai trò,
ảnh tải lên, lựa chọn đúng đơn khi ghép nối, bộ lọc, ô ghi chú dài, trạng thái Maps chưa key
và giới hạn khung bản đồ. Lượt Android mới nhất: **24 ca đạt** trên `emulator-5554`.
Các ca chưa có key kiểm tra trạng thái thiếu cấu hình, không phải tải tile Maps thật.

Lượt toàn bộ test sau các sửa cuối: **42 test đạt**, bao gồm render 105 route và sáu
trạng thái theo dõi. `flutter analyze --no-pub`: **No issues found**.
Bản chạy bình thường `lib/main.dart` đã build/cài/mở lại thành công sau lượt kiểm thử,
không để lại entry của integration test. APK: `frontend/build/app/outputs/flutter-apk/app-debug.apk`.
