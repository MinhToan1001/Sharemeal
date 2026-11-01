# Nhóm B — Hủy đơn và nhả suất

Phạm vi: nhóm B và lỗi admin thoát/vào lại màn duyệt. Giữ theme, font,
layout, route và các file trang Figma; chỉ bổ sung thao tác tối thiểu trên
màn hiện có. Không thêm package. Sau xác nhận bổ sung của chủ project ngày
02/11/2026, rules nhóm B đã triển khai lên `sharemeal-e17c9` để kiểm thử thật
bằng tài khoản/bản ghi DEMO tạm. Không tải/xóa ảnh Cloudinary thật, không push Git.

## Hành vi

- Người cho của đơn, tổ chức nhận và admin duy nhất được hủy khi trạng thái
  là `awaiting`, `accepted`, `assigned`. Phải có lý do.
- Tình nguyện viên và người ngoài không được hủy. Từ `pickedUp` trở đi,
  kể cả admin cũng không được hủy. Rules kiểm tra lại trạng thái trên server.
- Hủy gỡ `volunteerId`, xóa tên tài xế đang hoạt động, lưu người giao cũ để
  đối chiếu. Người giao không còn đọc/thao tác đơn sau khi bị gỡ.
- PIN/QR bị vô hiệu hóa theo trạng thái đơn ngay tại bước khóa đơn. Bản ghi
  mã cũ được giữ để đối chiếu; không thể tạo mới, xác minh hoặc dùng lại mã
  của đơn đã hủy. PIN lưu trong draft được xóa sau thao tác hủy trên UI.
- Có nút **Hủy đơn** và hộp nhập lý do trên màn theo dõi hiện có của người
  cho/tổ chức. Admin: **Điều phối → chọn chuyến/đơn → Hủy đơn** trong hộp chi
  tiết. Với đơn đã lấy hàng, hộp này dẫn sang khu hỗ trợ hiện có.
- Màn theo dõi hiển thị lý do hủy; nếu nhả suất chưa xong, hiển thị trạng
  thái chờ đồng bộ và nút thử lại. Nhãn **Đã hủy** đã có được tái sử dụng.
- Đóng tin món vẫn khóa tin trước, rồi hủy các yêu cầu chờ qua cùng giao thức.

## Trường bổ sung — đều tùy chọn với dữ liệu cũ

| Đường dẫn | Trường | Ý nghĩa |
|---|---|---|
| `demo/orders/<id>` | `cancelledBy`, `cancelReason`, `cancelledAt` | Người hủy, lý do, thời điểm UTC ISO |
| như trên | `cancelledVolunteerId` | Người giao cũ, chỉ có nếu đã phân công |
| như trên | `cancelHadStock` | Trước khi hủy đã ở accepted/assigned; dùng cho đơn cũ chưa có journal |
| như trên | `stockState` | `reserving`, `held`, `releasePending`, `released`; `idle` khi giữ suất bị từ chối chắc chắn |
| như trên | `stockReserved` | Cờ lịch sử đã giữ suất thành công; không phải số dư hiện tại |
| như trên | `stockReleased` | Cờ đã hoàn tất nhả suất; không được đặt true trước dấu R trên món |
| `demo/foods/<id>` | `stockJournal` | Chuỗi chỉ nối thêm `\|orderId:H\|` khi giữ và `\|orderId:R\|` khi nhả |

`reserved`, `quantity`, `lastStockOrderId`, mọi ID và đường dẫn cũ giữ nguyên.
Không tạo `requestedRole`, `suspended`, bảng mới hoặc Cloud Functions.

## Thứ tự ghi, cạnh tranh và bù lỗi

RTDB không có transaction xuyên nhiều node. Mỗi transaction dưới đây chỉ
chạy trên **một đơn** hoặc **một món**, không transaction ở `/` hay `/demo`.

**Tạo yêu cầu:** giữ cách cũ: ghi đơn `awaiting` + quyền xem món bằng một
multi-location update. Lúc này chưa giữ suất. Giữ suất chỉ xảy ra khi người
cho chấp nhận, nên không có cửa sổ “đã trừ suất nhưng chưa có đơn”.

**Chấp nhận:**

1. Transaction `orders/<id>` kiểm tra người cho/trạng thái chờ, ghi
   `stockState=reserving`.
2. Transaction `foods/<id>` kiểm tra số dư và hạn món, tăng `reserved` đúng
   lượng đặt và nối dấu H cho đơn. Nếu đã có H thì không ghi lại; nếu có R
   thì không thể giữ suất nữa.
3. Transaction đơn chuyển `accepted`, `held`, `stockReserved=true`.
   Rules chỉ cho bước này khi journal có H và chưa có R.
4. Nếu chắc chắn không đủ suất/món đóng, đọc lại journal; chỉ khi chưa có H
   mới trả intent về `idle`, giữ yêu cầu chờ để xử lý lại. Lỗi mạng không
   được coi là chắc chắn chưa ghi. Lần người cho tải lại sẽ thử tiếp intent.
   Nếu không muốn tiếp tục, người cho/tổ chức/admin có thể hủy đơn đó.

**Hủy:**

1. Transaction đơn kiểm tra trạng thái mới nhất, chuyển `cancelled`, ghi đủ
   thông tin hủy, gỡ người giao, đặt `releasePending`, `stockReleased=false`.
   Từ thời điểm này nhận chuyến/PIN/xác minh lấy hàng đều bị khóa bởi rules.
2. Transaction món nối dấu R và giảm `reserved` nếu có H, hoặc nếu là đơn cũ
   đã accepted/assigned (`cancelHadStock=true`). Yêu cầu chờ chưa giữ suất
   nối R nhưng giảm 0. Đã có R thì không ghi, không giảm lần hai.
3. Transaction đơn đặt `released`, `stockReleased=true`; chỉ được phép khi
   journal đã có R. Thông tin người hủy/lý do/thời điểm không sửa lại khi retry.

Mất mạng sau bước 1: đơn đã khóa, suất còn giữ cho đến khi retry. Mất mạng
sau bước 2: journal ngăn nhả lần hai, lần sau chỉ hoàn tất cờ trên đơn. Mở
lại app/tải snapshot sẽ tiếp tục các đơn `releasePending` thuộc quyền hủy
của người dùng, hoặc tất cả đơn đó khi admin tải dữ liệu. Không phụ thuộc
người đã bấm hủy còn online. Nếu không ai mở app, không có tác vụ nền tự chạy.

Nếu hủy xảy ra trong lúc chấp nhận, transaction trạng thái + rules quyết
định ai thắng. R cũng là dấu chặn H đến muộn. Nếu trạng thái đã `pickedUp`
thì transaction hủy bị từ chối; không có nhánh admin vượt qua điều kiện này.

Trong cùng Firebase client, thao tác trên cùng món được xếp hàng, vì SDK có
thể gom nhiều transaction chồng nhau thành một lần ghi. Giữa các thiết bị,
RTDB so sánh phiên bản và chạy lại transaction khi có cạnh tranh.

Với đơn cũ thiếu quyền `foodAccess`, tổ chức được khôi phục quyền đọc món
từ chính đơn thuộc tổ chức trước khi chạy transaction nhả suất; món đã đóng
vẫn xử lý được. Đơn cũ đã cancelled nhưng không có giao thức/cờ mới được
giữ nguyên, không suy đoán rồi nhả lần nữa.

Journal là chuỗi chỉ nối thêm để rules kiểm tra được nguyên vẹn lịch sử,
kể cả trường hợp xóa dấu marker. Không dùng map marker có thể xóa con rồi
nhả lần nữa. Định dạng ID của thao tác stock là ID push Firebase gồm ký tự
chữ/số/`_`/`-`. Không tự sửa hoặc xóa journal/cờ bằng Console. Journal tăng
theo số đơn của món và được giữ khi món còn tồn tại; chưa có cơ chế lưu trữ
lịch sử riêng để cắt bớt journal trong nhóm demo này.

**Hoàn tất + cộng kho:** chưa thay trong nhóm B, sẽ làm cùng nhóm E. Cách
hiện tại vẫn là multi-location update nguyên tử, chưa phải transaction kho
và chưa có cờ cộng kho trên đơn theo yêu cầu mới. Thiết kế cho E: khóa intent
nhận trên đơn → transaction kho cộng số thực nhận kèm dấu theo mã đơn →
transaction đơn xác nhận completed/cờ đã cộng kho. Retry đối chiếu dấu trên
kho trước khi cộng; mất mạng không được suy đoán để cộng lại hoặc trừ bù.
Đơn từ pickedUp không được hủy trong giai đoạn này. Cờ và kiểm thử triển
khai cụ thể sẽ nằm trong commit E, không tuyên bố đã hoàn thành ở B. Phần
trừ kho khi phân phát tương tự sẽ được chuyển sang transaction ở nhóm G.

## Đơn kẹt sau pickedUp — admin xử lý qua hỗ trợ

1. Thành viên bấm **Báo vấn đề / Yêu cầu hỗ trợ**, ghi đúng mã đơn, số lượng,
   tình trạng thực phẩm và bằng chứng. Admin mở vụ việc trong khu **Sự cố**.
2. Đối chiếu người cho, người giao, tổ chức, PIN và bằng chứng. Nếu tài xế
   không tiếp tục được, admin phân công lại trong Điều phối; đơn vẫn
   `pickedUp`, không trả thực phẩm về món công khai.
3. Khi thực phẩm đến nơi, tổ chức tiếp tục quy trình xác minh/nhận đủ hiện
   có. Kho chỉ được xử lý qua nhánh hoàn tất, không sửa counter tay để đóng vụ.
4. Admin ghi kết quả điều tra và xử lý ticket. Đóng ticket **không** đồng
   nghĩa đổi đơn thành cancelled/completed. Nếu mất/hỏng toàn bộ hoặc chưa
   thể xác nhận giao nhận, giữ hồ sơ đơn để đối soát, ghi rõ quyết định trong
   vụ hỗ trợ. Không “gỡ kẹt” bằng hủy/nhả suất sau pickedUp.

Giới hạn hiện tại: nhóm E mới bổ sung đối soát số đặt/lấy/nhận và vụ hỗ trợ
tự động. Nhóm B chưa thêm quyền admin ép hoàn tất hoặc xử lý nhận 0 suất;
không giả lập đã hoàn tất cho một đơn chưa có xác nhận nhận hàng.

## Lỗi duyệt admin khi quay lại

Mã và loại hồ sơ được truyền trong arguments của route và giữ riêng cho
từng màn duyệt. Checkbox và lệnh duyệt/từ chối gắn với đúng hồ sơ, không đọc
lại lựa chọn toàn cục có thể bị màn khác thay thế. Không thay style, layout
hay các bước xét duyệt. Kiểm thử bao gồm mở → quay lại → mở lại → duyệt và
từ chối cho hồ sơ, món, nhu cầu; cả trường hợp selection toàn cục bị đổi và
có snapshot mới trong lúc màn đang mở.

## Rules thay đổi trong nhóm B

Sửa duy nhất nguồn `backend/tools/build_demo_rules.py`, sau đó sinh
`backend/firebase/database/database.rules.json`. Diff đầy đủ ở
`docs/group-b-rules.diff`.

- Ghi counter món phải gắn với intent trên đơn và một dấu H/R hợp lệ;
  giới hạn `0 <= reserved <= quantity`, chống xóa/sửa journal.
- Chấp nhận cần H; kết thúc nhả cần R; không tự đặt/xóa các cờ thao tác.
- Hủy có quyền donor/org/admin nhưng chỉ trước pickedUp, cần đủ metadata,
  gỡ courier và giữ nguyên lịch sử khi retry. Không thể ghi mỗi status hủy
  để bỏ qua giao thức nhả suất.
- Nhánh từ chối yêu cầu không chạy khi đang có intent giữ suất.
- PIN dùng kiểm tra trạng thái đơn hiện có: trạng thái cancelled không đạt
  điều kiện tạo/xác minh. Không mở thêm quyền đọc/ghi handover.
- Không thay quy tắc role/adminUid của nhóm A trong commit này.

**Rủi ro tích hợp:** app mới và rules mới phải thử cùng nhau. Rules B đã được
đồng bộ với bản code hiện tại trên project thật. App cũ chấp nhận/hủy bằng
cách ghi counter trực tiếp sẽ bị rules mới từ chối; dùng bản APK mới. Nhóm A về quyền tài khoản vẫn
chưa làm; chưa xem rules này là bộ hardening cuối cùng của toàn app.

## Tự kiểm tra trên môi trường thử

Không cần sửa project thật. Dùng Firebase Emulator hoặc project thử riêng.
Chỉ sau khi đã xem diff và thử đạt mới tự cân nhắc đưa rules lên project thật.

PowerShell ở thư mục ShareMeal, cửa sổ 1:

```powershell
python .\backend\tools\build_demo_rules.py
$env:JAVA_HOME = 'C:\Program Files\Android\Android Studio\jbr'
$env:Path = "$env:JAVA_HOME\bin;$env:Path"
cd .\backend
firebase emulators:start --only auth,database --project demo-sharemeal-b
```

Cửa sổ 2, chạy các bài rules (chỉ namespace demo, localhost):

```powershell
node --test .\backend\functions\test\cancellation.emulator.cjs
```

Cần các dependency hiện có trong `backend/functions/node_modules`.
Test fixture và bridge chỉ chạy khi Auth/DB Emulator trỏ đúng localhost.
Kiểm thử Android dùng bridge riêng:

```powershell
$env:FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099'
$env:FIREBASE_DATABASE_EMULATOR_HOST = '127.0.0.1:9000'
node .\backend\tools\group_b_test_bridge.cjs
# Cửa sổ khác, sau khi khởi động AVD:
.\run_flutter.cmd test integration_test/group_b_backend_test.dart -d emulator-5554 --reporter expanded
```

Để thử **giao diện app chính** bằng Emulator: dừng phiên demo tự động trước,
khởi động emulator với `--project sharemeal-e17c9` (ID mà cấu hình app chính
đang dùng), rồi chạy lệnh sau. ID trùng project thật nhưng các kết nối Auth/DB
đều đi tới máy tính cục bộ qua cờ này; không triển khai rules lên project thật.

```powershell
# Cửa sổ Emulator, tại backend:
firebase emulators:start --only auth,database --project sharemeal-e17c9
# Cửa sổ app, tại ShareMeal:
.\run_flutter.cmd run -d emulator-5554 --dart-define=FIREBASE_EMULATOR_HOST=10.0.2.2
```

Đăng xuất trước, tạo tài khoản thử trong Auth Emulator. Chỉ thiết lập dữ
liệu/quyền approved/adminUid tại **Emulator UI http://127.0.0.1:4000**, không
thao tác Console project thật. Không dùng bridge demo để seed namespace app
chính. Có thể tạo món và đơn thử ở Database Emulator để kiểm tra các thao
tác B; test B không cần tải ảnh thật lên Cloudinary.

Playground phù hợp kiểm tra từng quyền, không mô phỏng transaction đồng thời.
Trên project thử: đặt adminUid bằng Console, chuẩn bị user approved và món
20 suất. Với donor/org/admin thử hủy đủ metadata ở awaiting/accepted/assigned;
thử hủy ở pickedUp/completed phải bị từ chối. Thử đổi `reserved` trực tiếp,
xóa journal, ghi `stockReleased=true` trước R đều phải bị từ chối. Dùng
Emulator để kiểm tra đủ chuỗi ghi, retry và cạnh tranh.

Các bước kiểm tra bằng app:

1. Món 20 suất → xin 10 → donor chấp nhận: còn nhận được 10 suất.
2. Org hoặc donor mở theo dõi → Hủy đơn → nhập lý do: trở lại 20 suất; đơn
   hiện Đã hủy và đúng lý do. Bấm lại/retry không tăng thêm.
3. Làm lại có courier nhận chuyến, hủy trước lấy hàng: courier mất chuyến,
   PIN/QR cũ không xác minh được. Kiểm tra lại bằng admin.
4. Xác minh lấy hàng trước, rồi thử hủy qua cả ba role: đều bị chặn. Báo hỗ
   trợ và thử phân công lại; số suất công khai không tăng.
5. Ngắt kết nối giữa các bước, mở lại: đơn khóa vẫn hiện, nhả suất tiếp tục
   mà không thực hiện hai lần. Không sửa flag bằng Console thật để thử lỗi.
6. Mở hồ sơ/món/nhu cầu chờ duyệt → quay lại → mở lại, đối chiếu checkbox và
   duyệt/từ chối: lệnh phải gửi đúng bản ghi vừa mở.
7. Luồng cũ: giữ 10 trên món 20 → nhận 9 → phát 6: kho còn 3.

## Kiểm chứng

| Hạng mục | Kết quả |
|---|---|
| Flutter analyze toàn dự án | Không có issue |
| Bộ unit/widget/golden hiện có và mới | 62/62 đạt |
| Firebase Rules Emulator | 8/8 đạt |
| Android + Firebase Emulator | 7/7 đạt, gồm luồng 20/10/9/6/3 |
| Android + Firebase thật | 1/1 kịch bản end-to-end đạt, exit code 0 |

Rules tests kiểm tra hủy/retry, hủy song song donor + org, tương thích đơn
cũ, PIN và quyền courier, từ chối mọi actor sau pickedUp/completed, hai cửa
sổ mất kết nối, hủy trong lúc giữ suất, chống vượt tổng suất, quyền intent và
cờ nhả. Kiểm thử Android dùng chính BackendApi và SDK native, gồm thêm
closed-food legacy, snapshot duyệt admin và luồng kho 20/10/9/6/3.

Log kiểm thử: `tooling/group-b-rules-tests.log`, `group-b-all-flutter-tests.log`,
`group-b-review-tests.log`, `group-b-android-tests.log`, `group-b-analyze.log`
(không commit log). Những HTTP 400 cho tile bản đồ trong widget tests là do
Flutter Test chặn HttpClient; không phải lần gọi dịch vụ thật. Ảnh golden
không thay đổi. Cảnh báo Gradle/Kotlin plugin hiện có không cản build Android.

Sau lượt Emulator: database demo cục bộ rỗng và Auth demo còn 0 tài khoản.
Bridge và Firebase Emulators của lượt kiểm thử đã dừng. Không có ảnh thật
được tạo trong lượt này. Các file trang, theme, font và asset không đổi.
Rules sinh lại cho kết quả byte giống hệt file đang bàn giao.

## Bổ sung: triển khai và kiểm thử Firebase thật ngày 02/11/2026

Chủ project đã xác nhận rõ việc triển khai rules B và tạo/xóa dữ liệu DEMO.
Đã sao lưu rules cũ cùng dữ liệu vào `backend/.private/` trước khi deploy.
Rules đang chạy trên `sharemeal-e17c9` đã được đọc lại và xác nhận khớp nội
dung JSON của file bàn giao. Ứng dụng tiếp tục kết nối Firebase trực tiếp;
bridge localhost chỉ phục vụ lượt kiểm thử và đã được tắt.

Đã chạy trên Android bằng chính BackendApi và Firebase Authentication/RTDB
thật, dùng 4 tài khoản DEMO (donor, charity, volunteer, thêm một charity để
thử cạnh tranh). Không tạo admin mới hoặc sửa tài khoản admin hiện có.

- Đăng nhập thật, hồ sơ approved được tải về đúng role.
- Món pending không xuất hiện công khai; sau duyệt xuất hiện ngay trên màn
  tìm món qua dữ liệu Firebase thật.
- Hai yêu cầu 12 suất cùng chấp nhận trên món 20: chỉ một yêu cầu thành
  công. Hủy trả món về đủ 20 suất.
- Nút Hủy đơn trên Android ghi lý do vào DB thật, gỡ courier, PIN cũ bị
  chặn; retry và khôi phục cửa sổ mất kết nối không nhả thêm lần hai.
- Quyền admin trên rules thật hủy được trước pickup và bị chặn sau pickup.
- Tự lấy 10 → thực nhận 9 → phân phát 6: kho còn 3; thực phẩm đã rời người
  cho không được trả về món công khai.

Admin trong lượt live được kiểm tra bằng `databaseAuthVariableOverride`
với UID singleton đang có, chịu chính rules đang triển khai. Xem cơ chế
[giới hạn quyền Admin SDK của Firebase](https://firebase.google.com/docs/database/admin/start#authenticate-with-limited-privileges).
Lượt này không đăng nhập UI bằng mật khẩu tài khoản admin thật. Hồi quy
thoát/mở lại UI duyệt đã có widget test và kiểm thử trên Emulator ở trên.

Sau cleanup, đã xóa 4 tài khoản thử và 42 đường dẫn dữ liệu fixture. So sánh
toàn bộ cây dữ liệu với mốc trước lượt thử cho kết quả **giống nhau**, tập
UID Authentication **giống nhau**, `config/adminUid` **không đổi**. Dữ liệu
DEMO không được giữ lại. Không có ảnh Cloudinary mới được tạo trong lượt này.

Giới hạn quan sát: Android có lỗi kết nối tới tile.openstreetmap.org trong
lượt live; nền bản đồ chưa được xác nhận tải thành công ở lượt này. Các bước
Firebase và nút hủy vẫn chạy đạt. Nhóm B không thay widget bản đồ.

Log: `tooling/group-b-live-deploy.log`, `group-b-live-android-tests.log`,
`group-b-live-cleanup.log`, `group-b-live-analyze.log` (đều không commit).
Manifest đã bỏ mật khẩu thử sau cleanup và nằm trong thư mục riêng bị ignore.

Chạy lại test live chỉ khi được chủ project cho phép; bridge có cờ opt-in,
kiểm tra prefix/UID và từ chối ghi/xóa bản ghi ngoài fixture:

```powershell
$env:SHAREMEAL_ALLOW_GROUP_B_LIVE_TEST = 'sharemeal-e17c9'
node .\backend\tools\group_b_production_bridge.cjs
# Cửa sổ khác, đã bật AVD:
.\run_flutter.cmd test integration_test/group_b_production_test.dart -d emulator-5554 --dart-define=ALLOW_GROUP_B_PRODUCTION_TEST=true --reporter expanded
# Sau khi test xong, bắt buộc dọn; cờ opt-in cần có trong cửa sổ cleanup:
node .\backend\tools\group_b_production_bridge.cjs --cleanup
```

## File thay đổi

| File | Nội dung |
|---|---|
| `frontend/lib/data/repositories/order_stock_protocol.dart` | Biến đổi dữ liệu thuần dùng trong transaction |
| `frontend/lib/data/repositories/direct_order_stock.dart` | Transaction, hàng đợi, giữ/nhả, retry và bù lỗi |
| `frontend/lib/data/repositories/direct_orders.dart` | Chấp nhận/hủy qua giao thức mới |
| `frontend/lib/data/repositories/direct_foods.dart` | Đóng tin dùng cùng nhánh hủy |
| `frontend/lib/data/firebase/direct_backend.dart` | Kết nối helper, phục hồi khi tải snapshot |
| `frontend/lib/data/firebase/firebase_services.dart` | Cho phép test chọn URL database emulator, mặc định cũ giữ nguyên |
| `frontend/lib/presentation/admin/widgets/review_content.dart` | Giữ riêng ID/loại hồ sơ theo route |
| `frontend/lib/presentation/shared/interaction/backend_actions.dart` | Arguments duyệt, lý do hủy, dialog admin |
| `frontend/lib/presentation/shared/interaction/live_flow_pages.dart` | Nút hủy, lý do và trạng thái nhả trên theo dõi |
| `backend/tools/build_demo_rules.py` | Nguồn rules cho giao thức stock/cancel |
| `backend/firebase/database/database.rules.json` | File rules sinh lại |
| `backend/functions/test/cancellation.emulator.cjs` | Các kiểm thử quyền/race trên RTDB Emulator |
| `backend/tools/group_b_test_bridge.cjs` | Fixture chỉ localhost/project demo cho Android |
| `frontend/integration_test/group_b_backend_test.dart` | Kiểm thử bằng SDK Android thật |
| `frontend/integration_test/group_b_production_test.dart` | Kiểm thử Android trên Firebase thật, bắt buộc cờ cho phép |
| `backend/tools/group_b_production_bridge.cjs` | Fixture và cleanup riêng; chỉ ghi dữ liệu DEMO, giữ nguyên admin |
| `frontend/test/order_stock_protocol_test.dart` | Unit test logic giữ/nhả |
| `frontend/test/admin_review_reentry_test.dart` | Hồi quy thoát/mở lại duyệt/từ chối |
| `frontend/integration_test/direct_backend_test.dart` | Bổ sung lý do hủy bắt buộc vào kịch bản integration cũ |
| `.gitignore`, `tooling/scan_staged_secrets.py` | Chặn credential, quét staged/all tracked index trước commit |
| `docs/GROUP_B_RESULT.md`, `docs/group-b-rules.diff` | Bàn giao, cách tự thử và diff rules |

## Thứ tự được xác nhận sau nhóm này

Dừng sau commit B. Chờ người dùng kiểm tra trước khi chuyển C → D → E → F →
G → H → I → A. C dùng lazy expiry, bỏ qua dữ liệu cũ thiếu timestamp; không
thêm ô nhập, quét thêm khi admin mở Tổng quan. H dùng lại `users/<uid>/disabled`.
A cuối cùng: Console đặt adminUid; user chỉ chọn role một lần trong ba role
donor/charity/volunteer, không requestedRole; verificationStatus/disabled
theo quyết định đã xác nhận. Không tự triển khai rules ở các nhóm sau.
