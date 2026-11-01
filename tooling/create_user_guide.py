from pathlib import Path
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT

ROOT = Path(__file__).resolve().parents[1]
doc = Document()
sec = doc.sections[0]
sec.page_height, sec.page_width = Cm(29.7), Cm(21)
sec.top_margin, sec.bottom_margin = Cm(1.7), Cm(1.7)
sec.left_margin, sec.right_margin = Cm(2.0), Cm(2.0)
for name in ['Normal', 'Title', 'Subtitle', 'Heading 1', 'Heading 2', 'Heading 3']:
    st = doc.styles[name]
    st.font.name = 'Arial'
    st.font.color.rgb = RGBColor(0,0,0)
    st.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'), 'Arial')
for style in doc.styles:
    for border in list(style.element.iter(qn('w:pBdr'))):
        border.getparent().remove(border)
normal = doc.styles['Normal']
normal.font.size = Pt(10.5)
normal.paragraph_format.line_spacing = 1.12
normal.paragraph_format.space_after = Pt(6)
doc.styles['Title'].font.size = Pt(25)
doc.styles['Heading 1'].font.size = Pt(18)
doc.styles['Heading 1'].paragraph_format.space_before = Pt(8)
doc.styles['Heading 2'].font.size = Pt(12)
doc.styles['Heading 2'].paragraph_format.space_before = Pt(9)
header = sec.header.paragraphs[0]
header.text = 'SHAREMEAL   HƯỚNG DẪN SỬ DỤNG BẢN DEMO'
header.runs[0].font.size = Pt(8)
footer = sec.footer.paragraphs[0]
footer.alignment = WD_ALIGN_PARAGRAPH.RIGHT
footer.add_run('ShareMeal  •  Trang ').font.size = Pt(8)
f = OxmlElement('w:fldSimple'); f.set(qn('w:instr'), 'PAGE'); footer._p.append(f)
doc.core_properties.title = 'Hướng dẫn quy trình ShareMeal từ đăng ký đến phân phát'
doc.core_properties.author = 'ShareMeal'
doc.core_properties.subject = 'Quy trình thực hành cho bốn vai trò trong app demo'

def p(text, bold=False):
    a = doc.add_paragraph(); a.add_run(text).bold = bold; return a
def h(text): doc.add_heading(text, 2)
def step(n, role, text):
    a = doc.add_paragraph(); a.add_run(f'{n}. {role}  ').bold = True; a.add_run(text); return a
def page(title): doc.add_page_break(); doc.add_heading(title, 1)
def table(headers, rows, widths):
    t = doc.add_table(rows=1, cols=len(headers)); t.alignment = WD_TABLE_ALIGNMENT.CENTER; t.autofit = False
    for c,w in zip(t.columns,widths): c.width=Cm(w)
    for i,s in enumerate(headers): t.rows[0].cells[i].text=s
    for values in rows:
        for c,s in zip(t.add_row().cells,values): c.text=str(s)
    for ri,row in enumerate(t.rows):
        for ci,c in enumerate(row.cells):
            c.width=Cm(widths[ci]); c.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER
            tcPr=c._tc.get_or_add_tcPr(); borders=OxmlElement('w:tcBorders')
            for edge in ['top','left','bottom','right']:
                e=OxmlElement('w:'+edge); e.set(qn('w:val'),'single'); e.set(qn('w:sz'),'5'); e.set(qn('w:color'),'D9D9D9'); borders.append(e)
            tcPr.append(borders)
            margins=OxmlElement('w:tcMar')
            for edge in ['top','left','bottom','right']:
                e=OxmlElement('w:'+edge); e.set(qn('w:w'),'100'); e.set(qn('w:type'),'dxa'); margins.append(e)
            tcPr.append(margins)
            if ri==0:
                sh=OxmlElement('w:shd'); sh.set(qn('w:fill'),'DFEAF2'); tcPr.append(sh)
            for a in c.paragraphs:
                a.paragraph_format.space_after=Pt(3)
                for r in a.runs: r.font.size=Pt(9); r.bold=ri==0
        if ri==0:
            repeat=OxmlElement('w:tblHeader'); row._tr.get_or_add_trPr().append(repeat)
    p('')

doc.add_paragraph('Hướng dẫn quy trình ShareMeal', 'Title')
doc.add_paragraph('Từ đăng ký tài khoản đến giao nhận và phân phát', 'Subtitle')
p('Tài liệu thực hành cho bản demo được cập nhật ngày 1 tháng 11 năm 2026. Bạn sẽ đi qua đầy đủ vai trò admin, người cho, tổ chức từ thiện và tình nguyện viên; đồng thời biết kiểm tra kết quả tại từng bước.')
p('Kết quả cần đạt: món chỉ xuất hiện công khai sau khi admin duyệt; tổ chức gửi yêu cầu, người cho chấp nhận; thực phẩm được xác minh khi lấy và khi nhận; số thực nhận vào kho rồi được trừ khi ghi nhận phân phát.', True)
h('Chuẩn bị trước khi thao tác')
p('Chuẩn bị bốn email để đăng nhập riêng cho bốn vai trò. Nếu dùng cùng một điện thoại, hãy đăng xuất và đổi tài khoản theo vai trò ghi ở mỗi bước. Có thể dùng nhiều thiết bị để thấy cập nhật trực tiếp.')
p('Dùng giấy tờ và ảnh giả lập phù hợp khi thử demo. Chuẩn bị ảnh món ăn, thông tin địa điểm lấy, hạn dùng còn hiệu lực và địa điểm tiếp nhận của tổ chức. Ảnh lưu trên Cloudinary; dữ liệu nghiệp vụ lưu trong Firebase Realtime Database.')
table(['Vai trò','Trách nhiệm chính'],[
    ('Admin','Duyệt hồ sơ, món ăn, nhu cầu; điều phối và xử lý hỗ trợ'),
    ('Người cho','Kê khai hồ sơ, đăng món, chấp nhận yêu cầu và bàn giao thực phẩm'),
    ('Tổ chức từ thiện','Gửi yêu cầu nhận, xác nhận số thực nhận, nhập kho và ghi nhận phân phát'),
    ('Tình nguyện viên','Nhận chuyến giao hộ, xác minh lấy hàng và giao đến tổ chức')], [3.7,13.3])
h('Ví dụ xuyên suốt')
p('Người cho đăng 20 suất bún thịt nướng. Tổ chức xin nhận 10 suất. Khi nhận thực tế chỉ có 9 suất đạt yêu cầu nên ghi nhận 9 suất. Sau đó tổ chức phát 6 suất và còn 3 suất trong kho. Các số này dùng để kiểm tra kết quả, không phải dữ liệu được tạo sẵn trong Firebase.')
p('Kho của tổ chức là số suất đã thực nhận và chưa phân phát. Số suất món còn công khai là lượng món người cho chưa giữ cho đơn khác. Đây là hai số khác nhau.')

page('Tạo tài khoản và gửi hồ sơ xác minh')
h('Tạo admin một lần')
step(1,'Chủ project','Đăng ký email và mật khẩu, mở email và bấm liên kết xác minh Firebase. App dùng liên kết email, không yêu cầu nhập OTP sáu số.')
step(2,'Chủ project','Trong Firebase Console mở Authentication để lấy UID của đúng tài khoản. Vào Realtime Database → users → UID đó → role và đổi giá trị thành admin. Chỉ dùng một tài khoản admin.')
step(3,'Admin','Đăng xuất rồi đăng nhập lại để vào Trung tâm điều hành. Không cần hoàn tất hồ sơ người cho, tổ chức hay tình nguyện viên. config/adminUid phải trùng UID admin duy nhất; không gán thêm một admin khác.')
p('Nếu tài khoản admin từng nhập hồ sơ người dùng, thông tin lịch sử vẫn có thể còn trong Firebase. Quyền điều hướng dựa trên role và adminUid, không dựa vào thông tin hồ sơ cũ.')
h('Tạo ba tài khoản người dùng')
step(4,'Mỗi người dùng','Bấm tạo tài khoản, nhập tên, email, mật khẩu và xác nhận điều khoản. Mở email xác minh, quay lại app và bấm nút xác nhận để tiếp tục chọn vai trò.')
step(5,'Người cho','Chọn vai trò người cho. Nếu là cá nhân, đi theo hồ sơ xác minh cá nhân và đính kèm giấy tờ được yêu cầu. Nếu là cơ sở kinh doanh, nhập tên đơn vị, mã số thuế, ngày cấp và loại hình; tải giấy phép và đủ năm ảnh cơ sở bắt buộc. Mã số thuế nhập 10 hoặc 13 chữ số; giữ cả số 0 đầu mã.')
step(6,'Người cho','Hoàn thành thông tin thời gian hoạt động nếu có; đọc và tích đủ bốn cam kết về an toàn thực phẩm, dị ứng, đóng gói và xét duyệt. Gửi hồ sơ. App hiển thị chờ xác minh.')
step(7,'Tổ chức','Chọn vai trò tổ chức từ thiện. Nhập tên và địa chỉ nhận, đính kèm giấy phép hoặc xác nhận hoạt động cùng ảnh địa điểm nhận. Tích cam kết tiếp nhận đúng nhu cầu, bảo quản và không phân phát thực phẩm không đạt chất lượng. Gửi hồ sơ.')
step(8,'Tình nguyện viên','Chọn vai trò tình nguyện viên. Nhập họ tên, phương tiện và biển số, đính kèm giấy tờ/ảnh theo các ô yêu cầu. Xác nhận đủ cam kết giao nhận rồi gửi hồ sơ.')
h('Dấu hiệu hoàn tất bước này')
p('Cả ba tài khoản có hồ sơ chờ duyệt. Người dùng chưa được thực hiện nghiệp vụ yêu cầu xác minh. Trong Firebase có users/UID và demo/applications/mã hồ sơ. Các nhánh chỉ xuất hiện khi có dữ liệu, không cần tạo bảng rỗng thủ công.')

page('Admin duyệt hồ sơ và người cho đăng món')
step(9,'Admin','Mở Hồ sơ trong thanh điều hướng. Chọn đúng tài khoản chờ duyệt. Kiểm tra vai trò và tên trước khi ra quyết định.')
step(10,'Admin','Đọc thông tin kê khai và xem toàn bộ tài liệu. Dùng nút trước/sau hoặc vuốt để chuyển ảnh; bộ đếm cho biết đang xem tệp nào. Bấm phóng to để đọc ảnh; với PDF, mở tài liệu gốc. Không chỉ dựa vào ảnh đầu tiên.')
table(['Loại hồ sơ','Nội dung cần đối chiếu'],[
    ('Người cho cá nhân','Danh tính, liên hệ, giấy tờ xác minh và cam kết chia sẻ an toàn'),
    ('Người cho kinh doanh','Tên cơ sở, mã số thuế, ngày cấp, loại hình, giấy phép và các ảnh cơ sở'),
    ('Tổ chức từ thiện','Tên tổ chức, địa điểm nhận, giấy phép/xác nhận, ảnh nơi nhận và cam kết'),
    ('Tình nguyện viên','Họ tên, giấy tờ/ảnh xác minh, phương tiện và biển số, cam kết giao nhận')], [4.0,13.0])
step(11,'Admin','Tích đủ ba điều kiện sau khi đã đối chiếu rồi bấm Phê duyệt hồ sơ. Nếu chưa đủ tài liệu, chọn Yêu cầu bổ sung và ghi nội dung cần bổ sung. Nếu không đạt, chọn Từ chối và ghi lý do.')
step(12,'Người dùng','Mở trạng thái hồ sơ và kiểm tra kết quả xác minh. Hồ sơ được duyệt mở quyền của vai trò. Hồ sơ cần bổ sung phải đính kèm nội dung thiếu và gửi lại; hồ sơ bị từ chối cần xem lý do, sửa và gửi hồ sơ mới.')
h('Tạo tin món ăn')
step(13,'Người cho đã duyệt','Mở tạo tin chia sẻ. Chọn từ một đến sáu ảnh thật của món, nhập tên, chọn nhóm thực phẩm và số lượng. Với ví dụ này nhập 20 suất. Ảnh đầu là ảnh đại diện; kiểm tra lại ảnh trước khi tiếp tục.')
step(14,'Người cho','Tại an toàn thực phẩm, khai báo bảo quản, thành phần dị ứng, hạn dùng và xác nhận các cam kết. Chọn giờ hết hạn sau thời điểm hiện tại; không đăng món đã hết hạn.')
step(15,'Người cho','Nhập địa chỉ và khung giờ lấy. Tìm địa chỉ trên bản đồ hoặc chạm chọn điểm lấy, đối chiếu vị trí. Nút Mở Google Maps chuyển sang ứng dụng bản đồ để xem/chỉ đường. Thêm ghi chú bàn giao rồi xem lại tin đăng.')
step(16,'Người cho','Gửi tin. Món nằm trong Tin đăng của tôi ở trạng thái chờ duyệt; chưa xuất hiện trong danh sách công khai của tổ chức.')

page('Duyệt món và đặt nhận thực phẩm')
step(17,'Admin','Trong hàng đợi mở mục món ăn. Xem ảnh, tên món, người cho, số lượng, nhóm món, cách bảo quản, địa điểm và giờ lấy, hạn dùng, dị ứng, ghi chú và cam kết an toàn.')
step(18,'Admin','Tích các điều kiện riêng cho thực phẩm rồi bấm Phê duyệt món ăn. Nếu không đạt, từ chối và ghi lý do để người cho sửa. Duyệt món không dùng tiêu chí mã số thuế hay giấy phép của hồ sơ tài khoản.')
step(19,'Tổ chức đã duyệt','Mở Tìm đồ ăn. Món đã duyệt và còn hạn dùng xuất hiện từ Firebase. Mở món để kiểm tra ảnh, số suất còn nhận được và thông tin lấy hàng.')
step(20,'Tổ chức','Bấm Gửi yêu cầu nhận. Dùng nút trừ/cộng để chọn 10 suất trong ví dụ. Không chọn vượt số còn có thể nhận. Chọn đúng cách nhận; ô được chọn có nền xanh nhạt, viền xanh và dấu tích.')
step(21,'Tổ chức','Chọn Nhờ giao hộ nếu cần tình nguyện viên. Chọn Tự đến lấy nếu tổ chức tự cử người đến. Nhập giờ dự kiến theo HH:mm, người đến nhận và mục đích sử dụng. Tích cam kết bảo quản, dùng đúng mục đích và không bán lại rồi gửi yêu cầu.')
step(22,'Người cho','Mở yêu cầu nhận và xem tổ chức, số lượng, mục đích, cách nhận và giờ hẹn. Chấp nhận nếu phù hợp; hoặc từ chối nếu không thể đáp ứng. Xác nhận lại lịch/ghi chú bàn giao khi cần.')
h('Kiểm tra sau khi chấp nhận')
p('Đơn chuyển từ chờ xác nhận sang đã chấp nhận. Hệ thống giữ 10 suất cho đơn này. Nếu món có tổng 20 suất và chưa có đơn khác, số còn có thể nhận là 10. Việc tổ chức chỉ bấm gửi yêu cầu chưa tự giữ hàng; người cho phải chấp nhận trước.')
p('Nếu chọn giao hộ, chuyến có thể được tình nguyện viên nhận hoặc admin phân công. Nếu tự đến lấy, đơn không cần tìm tình nguyện viên. Tổ chức xem trạng thái tại Đơn nhận và màn Theo dõi đơn nhận.')
h('Sửa món và đóng tin')
p('Người cho có thể sửa khi món chưa giữ suất cho đơn nhận. Sửa nội dung đưa món về chờ admin duyệt lại. Đóng tin sẽ ẩn món khỏi tìm kiếm và hủy các yêu cầu còn chờ; các đơn đã chấp nhận vẫn phải được xử lý và giữ lịch sử. Không đóng tin để thay cho xác nhận giao nhận.')

page('Nhánh giao hộ qua tình nguyện viên')
step(23,'Tình nguyện viên đã duyệt','Mở Việc giao, chọn chuyến đang cần người giao và xem nơi lấy, nơi nhận, giờ hẹn cùng số suất. Bấm nhận chuyến. Một chuyến chỉ có một tình nguyện viên phụ trách tại một thời điểm.')
step(24,'Admin nếu cần','Vào điều phối, chọn đơn rồi phân công tình nguyện viên đã được duyệt. Chỉ phân công lại khi đã thống nhất người phụ trách; không để hai người cùng đi lấy một đơn.')
step(25,'Người cho','Khi tình nguyện viên tới điểm hẹn, kiểm tra đúng đơn và người nhận chuyến, mở mã bàn giao lấy hàng. Mã gồm QR/PIN của đơn hiện tại.')
step(26,'Tình nguyện viên','Đối chiếu số lượng, đóng gói và tình trạng thực phẩm. Quét QR hoặc nhập PIN do người cho đưa. Xác minh thành công chuyển đơn sang đã lấy hàng. Có thể chụp ảnh bàn giao theo màn hình của chuyến.')
step(27,'Tình nguyện viên','Vận chuyển tới địa điểm của tổ chức. Dùng bản đồ để xem vị trí hoặc bấm mở Google Maps để chỉ đường; dùng chat để thống nhất điểm hẹn. App chưa hiển thị GPS di chuyển trực tiếp của người giao.')
step(28,'Tổ chức','Khi thực phẩm tới, mở mã xác nhận nhận hàng của đúng đơn và đưa cho tình nguyện viên sau khi đã kiểm tra bàn giao. Đây là mã nhận tại tổ chức, khác mã lấy tại người cho.')
step(29,'Tình nguyện viên','Quét hoặc nhập mã nhận của tổ chức để xác minh bàn giao. Hệ thống lưu đã xác nhận giao. Nếu mã sai, hết hạn hoặc đã dùng, yêu cầu bên tạo mã làm mới, không dùng mã của đơn khác.')
step(30,'Tổ chức','Mở kiểm tra/xác nhận nhận đủ, ghi số suất thực tế đạt yêu cầu và ảnh nhận hàng nếu có. Trong ví dụ nhận 9 suất từ đơn đặt 10 suất: ghi 9. Nếu có vấn đề, dùng báo sai lệch/hỗ trợ và ghi rõ tình trạng trước khi xác nhận.')
step(31,'Tổ chức','Xác nhận hoàn tất. Đơn chuyển hoàn tất; kho của tổ chức tăng đúng 9 suất thực nhận. Không bấm xác nhận thêm lần nữa cho cùng đơn.')
h('Hai loại mã cần phân biệt')
table(['Bước','Bên tạo mã','Bên xác minh','Kết quả'],[
    ('Lấy hàng','Người cho','Tình nguyện viên','Đơn đã lấy hàng'),
    ('Giao đến tổ chức','Tổ chức','Tình nguyện viên','Đã xác minh giao'),
    ('Nhận đủ và nhập kho','Không tạo mã mới','Tổ chức xác nhận số thực nhận','Đơn hoàn tất và cộng kho')], [3.7,3.0,4.0,6.3])
p('PIN có hiệu lực 10 phút, dùng một lần và tối đa năm lần nhập sai. Chỉ đưa mã khi đã kiểm tra đúng đơn và bàn giao thực tế. Việc xác minh mã giao chưa tự cộng kho; tổ chức còn phải xác nhận số thực nhận.')

page('Nhánh tự đến lấy và quản lý kho')
h('Tổ chức tự cử người đến lấy')
step(32,'Tổ chức','Ở bước đặt nhận chọn Tự đến lấy. Sau khi người cho chấp nhận, mở đơn để xem giờ và địa điểm; tự bố trí người đến. Đơn này không cần nhận chuyến tình nguyện viên.')
step(33,'Người cho','Đối chiếu người đến và đơn đã chấp nhận. Mở mã bàn giao của đơn ngay khi chuẩn bị giao thực phẩm.')
step(34,'Tổ chức','Trong Theo dõi đơn nhận bấm Xác minh lấy hàng. Dùng tài khoản tổ chức để quét/nhập mã lấy do người cho cung cấp. Đơn chuyển đã lấy hàng.')
step(35,'Tổ chức','Sau khi kiểm tra hàng, mở Kiểm tra và xác nhận nhận đủ, nhập số suất thực nhận rồi xác nhận hoàn tất. Tự đến lấy không cần thêm bước tình nguyện viên quét mã giao tại tổ chức. Số thực nhận được cộng kho một lần.')
h('Kho thể hiện điều gì')
p('Mở Điểm nhận và kho bằng tài khoản tổ chức. Tổng đã nhận là tổng suất thực nhận từ các đơn hoàn tất của tổ chức. Tổng đã phân phát là tổng các lần ghi nhận phân phát. Tồn kho được tính bằng đã nhận trừ đã phân phát.')
table(['Thời điểm trong ví dụ','Đã nhận','Đã phân phát','Còn trong kho'],[
    ('Chưa hoàn tất đơn',0,0,0),
    ('Xác nhận thực nhận 9 suất',9,0,9),
    ('Ghi nhận phát 6 suất',9,6,3),
    ('Ghi nhận phát tiếp 3 suất',9,9,0)], [7.0,3.3,3.3,3.4])
p('Kho trong demo tổng hợp theo đơn vị suất của từng tổ chức. Chưa phải hệ thống quản lý lô hàng, hạn dùng từng lô hay nhiều kho vật lý. Vì vậy không dùng số tồn tổng để kết luận riêng một món còn bao nhiêu hoặc món nào sắp hết hạn.')
h('Ghi nhận phân phát')
step(36,'Tổ chức','Mở Phân phát rồi chọn ghi nhận phân phát. Kiểm tra tồn kho trước khi nhập. Chỉ ghi sau khi đã phát thực tế, không dùng chức năng này để xin thêm thực phẩm.')
step(37,'Tổ chức','Trong ví dụ nhập 4 suất cho trẻ em và 2 suất cho người cao tuổi, tổng 6 suất. Gửi ghi nhận. Hệ thống kiểm tra tổng lớn hơn 0 và không vượt số còn trong kho.')
step(38,'Tổ chức','Quay lại kho và kiểm tra còn 3 suất. Nếu phát tiếp 3 suất thì ghi một lần mới với tổng 3, không ghi lại 6 của lần trước. Backend hiện lưu tổng mỗi lần phân phát; các số theo nhóm trên form được cộng thành tổng khi lưu.')
p('Nếu không có tồn kho, hãy kiểm tra đơn đã hoàn tất hay chỉ mới chấp nhận/đã lấy hàng/đã xác minh giao. Chưa hoàn tất nhận đủ thì chưa có số suất để phân phát.')

page('Cảm ơn đánh giá và kiểm tra toàn bộ quy trình')
step(39,'Tổ chức','Sau khi đơn hoàn tất, gửi lời cảm ơn và ảnh nếu muốn. Người cho xem lại trong phần lịch sử/đơn liên quan. Lời cảm ơn không thay đổi số tồn kho.')
step(40,'Người cho','Mở lịch sử quyên tặng và đánh giá bên nhận của đơn đã hoàn tất. Chọn số sao và nhập nhận xét rồi lưu. Kiểm tra lại nội dung đã lưu trước khi đổi tài khoản.')
step(41,'Các bên liên quan','Dùng chat của đúng đơn để trao đổi. Tin nhắn được đồng bộ cho các bên có quyền trong đơn. Hãy chọn đúng đơn trước khi gửi; màn chat hiển thị tên món và thông tin bàn giao để đối chiếu.')
step(42,'Người cần hỗ trợ','Mở báo vấn đề/yêu cầu hỗ trợ, ghi chi tiết và ảnh nếu cần. Admin mở vụ việc, xem đơn liên quan và trả lời/xử lý. Người dùng theo dõi kết quả hỗ trợ trong app.')
h('Nhu cầu của tổ chức là luồng bổ sung')
p('Tổ chức có thể tạo một nhu cầu về loại thực phẩm, số lượng và mức ưu tiên. Nhu cầu chờ admin duyệt trước khi công khai. Duyệt nhu cầu không tự tạo đơn nhận, không giữ suất của món và không cộng kho. Tổ chức vẫn cần chọn món và gửi yêu cầu nhận theo các bước ở trang 4.')
h('Kiểm tra kết quả khi tự demo')
table(['Kiểm tra','Kết quả cần thấy'],[
    ('Hồ sơ chưa được duyệt','Chưa thực hiện được nghiệp vụ yêu cầu xác minh'),
    ('Món đang chờ duyệt','Người cho thấy tin; tổ chức chưa thấy trong tìm kiếm'),
    ('Admin duyệt món','Tổ chức thấy món từ Firebase và mở được ảnh/thông tin'),
    ('Chấp nhận đơn nhận 10 trên tổng 20','Món còn 10 suất có thể nhận nếu chưa có đơn khác'),
    ('Hoàn tất thực nhận 9','Kho tổ chức tăng 9 suất'),
    ('Ghi nhận phân phát 6','Kho giảm còn 3 suất'),
    ('Quay lại và chat','Thoát được về màn trước; ô nhập không bị bàn phím che'),
    ('Đăng xuất và đăng nhập lại','Dữ liệu đã gửi vẫn còn; quyền và màn chính theo đúng role')], [6.2,10.8])
h('Một số tình huống dễ nhầm')
p('Không thấy món: kiểm tra trạng thái duyệt, hạn dùng, món đã đóng hoặc hết số còn nhận. Không nhập kho: kiểm tra bước xác nhận thực nhận đã hoàn tất. Không ghi được phân phát: kiểm tra tổng nhập và số tồn. Mã bị từ chối: kiểm tra đúng đơn, đúng bước lấy/nhận và thời hạn mã.')
p('Admin đăng xuất tại cuối phần nội dung trang Tổng quan. Khi chạy app bằng flutter run, dùng R viết hoa để khởi động lại và nạp thay đổi code; dùng q để dừng. Chạy bình thường không cần bật Firebase Emulator hay server backend riêng.')

out = ROOT / 'docs' / 'Huong_dan_quy_trinh_ShareMeal.docx'
doc.save(out)
print(out)
