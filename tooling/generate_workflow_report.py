"""Build the workflow report using the managed document Python runtime."""
from pathlib import Path
from docx import Document
from docx.shared import Cm, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

ROOT = Path(__file__).resolve().parents[1]
doc = Document()
section = doc.sections[0]
section.page_width, section.page_height = Cm(21), Cm(29.7)
section.top_margin, section.bottom_margin = Cm(1.7), Cm(1.7)
section.left_margin, section.right_margin = Cm(2), Cm(2)
for name in ['Normal', 'Title', 'Subtitle', 'Heading 1', 'Heading 2']:
    style = doc.styles[name]
    style.font.name = 'Arial'
    style.font.color.rgb = RGBColor(0, 0, 0)
    style.element.get_or_add_rPr().rFonts.set(qn('w:eastAsia'), 'Arial')
    for border in list(style.element.iter(qn('w:pBdr'))):
        border.getparent().remove(border)
normal = doc.styles['Normal']
normal.font.size = Pt(10.5)
normal.paragraph_format.line_spacing = 1.12
normal.paragraph_format.space_after = Pt(7)
doc.styles['Title'].font.size = Pt(24)
doc.styles['Subtitle'].font.size = Pt(12)
doc.styles['Heading 1'].font.size = Pt(16)
doc.styles['Heading 2'].font.size = Pt(12)
for name in ['Heading 1', 'Heading 2']:
    doc.styles[name].paragraph_format.space_before = Pt(12)
    doc.styles[name].paragraph_format.space_after = Pt(7)
    doc.styles[name].paragraph_format.keep_with_next = True


def p(text, style=None):
    return doc.add_paragraph(text, style)


def h(text):
    return doc.add_heading(text, level=2)


def page(title):
    doc.add_page_break()
    doc.add_heading(title, level=1)


def steps(items):
    for i, text in enumerate(items, 1):
        para = p(f'{i}. {text}')
        para.paragraph_format.left_indent = Cm(.2)
        para.paragraph_format.first_line_indent = Cm(-.2)


def table(headers, records, widths):
    t = doc.add_table(rows=1, cols=len(headers))
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    t.autofit = False
    for col, width in zip(t.columns, widths):
        col.width = Cm(width)
    for i, text in enumerate(headers):
        t.rows[0].cells[i].text = text
    repeat = OxmlElement('w:tblHeader')
    t.rows[0]._tr.get_or_add_trPr().append(repeat)
    for record in records:
        for cell, text in zip(t.add_row().cells, record):
            cell.text = str(text)
    for i, row in enumerate(t.rows):
        row._tr.get_or_add_trPr().append(OxmlElement('w:cantSplit'))
        for j, cell in enumerate(row.cells):
            cell.width = Cm(widths[j])
            cell.vertical_alignment = WD_CELL_VERTICAL_ALIGNMENT.CENTER
            props = cell._tc.get_or_add_tcPr()
            shading = OxmlElement('w:shd')
            shading.set(qn('w:fill'), '203B53' if i == 0 else ('F2F5F7' if i % 2 == 0 else 'FFFFFF'))
            props.append(shading)
            borders = OxmlElement('w:tcBorders')
            for side in ['top', 'left', 'bottom', 'right']:
                edge = OxmlElement('w:' + side)
                for key, value in [('val', 'single'), ('sz', '5'), ('color', 'D9D9D9')]:
                    edge.set(qn('w:' + key), value)
                borders.append(edge)
            props.append(borders)
            margin = OxmlElement('w:tcMar')
            for side in ['top', 'bottom', 'left', 'right']:
                value = OxmlElement('w:' + side)
                value.set(qn('w:w'), '95')
                value.set(qn('w:type'), 'dxa')
                margin.append(value)
            props.append(margin)
            for para in cell.paragraphs:
                para.paragraph_format.space_after = Pt(3)
                para.paragraph_format.space_before = Pt(3)
                for run in para.runs:
                    run.font.size = Pt(9.5)
                    if i == 0:
                        run.bold = True
                        run.font.color.rgb = RGBColor(255, 255, 255)
    p('').paragraph_format.space_after = Pt(2)
    return t


p('Báo cáo quy trình hoạt động ShareMeal', 'Title')
p('Luồng demo theo giao diện Figma', 'Subtitle')
p('Cập nhật ngày 03 tháng 11 năm 2026')
p('Báo cáo dành cho người cài đặt, chạy thử và trình bày ứng dụng. Quy trình chính là người cho đăng món, admin duyệt, tổ chức xin nhận, người cho chấp nhận, tình nguyện viên lấy và giao hàng, cuối cùng tổ chức xác nhận nhập kho. Bản demo xác nhận bước lấy và giao bằng nút trắng trên màn camera Figma; không yêu cầu nhập PIN hay phối hợp quét mã bằng hai thiết bị.')
h('Vai trò và điều kiện sử dụng')
table(['Vai trò', 'Trách nhiệm'], [
 ('Người cho', 'Đăng món, xử lý yêu cầu, thống nhất giờ và bàn giao thực phẩm.'),
 ('Tổ chức từ thiện', 'Xin số suất cần nhận, chọn cách vận chuyển, kiểm tra hàng và nhập kho.'),
 ('Tình nguyện viên', 'Nhận chuyến giao hộ, lấy tại người cho rồi giao tới tổ chức.'),
 ('Quản trị viên', 'Duyệt hồ sơ và tin, điều phối, quản lý tài khoản và xử lý sự cố.')
], [4, 13])
p('Các tài khoản cần xác minh email và được duyệt đúng vai trò trước khi thực hiện nghiệp vụ. Việc bỏ PIN trong demo không bỏ kiểm tra người tham gia đơn, quyền tài khoản hoặc thứ tự trạng thái.')
h('Ý nghĩa của tin và đơn')
p('Tin 9 suất là một lô thực phẩm. Tổ chức yêu cầu 7 suất tạo một đơn 7 suất, không phải 7 đơn. Sau khi người cho chấp nhận, hệ thống giữ 7 và còn 2 suất có thể xin tiếp khi tin đang mở và còn hạn. Đơn bổ sung có mã riêng và được xét riêng.')
table(['Bước', 'Tổng tin', 'Đã giữ', 'Còn trống'], [
 ('Admin duyệt tin', '9', '0', '9'),
 ('Người cho nhận yêu cầu 7 suất', '9', '7', '2'),
 ('Người cho nhận thêm 2 suất', '9', '9', '0')
], [8, 3, 3, 3])

page('Đăng món và ghép nối')
h('Người cho đăng món')
steps([
 'Đăng nhập bằng tài khoản người cho đã được duyệt. Nhập tên món, số suất, ảnh, cách bảo quản, thành phần dị ứng, giờ lấy và địa chỉ.',
 'Kiểm tra hạn dùng trên màn thông tin an toàn và màn xem trước. Mặc định là khoảng hai giờ sau thời điểm hiện tại. Giờ đã qua trong ngày được hiểu là lần xuất hiện tiếp theo và hiển thị rõ ngày mai.',
 'Xác nhận các điều kiện an toàn rồi gửi. Tin chuyển pending, chưa xuất hiện trong danh sách món đang mở cho tổ chức.',
 'Admin mở hàng đợi, kiểm tra và duyệt. Tin chuyển open; tổ chức nhìn thấy số suất còn trống nếu tin còn hạn.'
])
h('Tổ chức xin nhận và người cho chấp nhận')
steps([
 'Tổ chức tìm món trong dashboard hoặc danh sách khám phá. Chọn tin, nhập số suất không vượt số còn lại, chọn Nhờ giao hộ hoặc Tự đến lấy và xác nhận cam kết.',
 'Hệ thống tạo đơn awaiting. Người cho bấm chỉ số hoặc dòng yêu cầu trên dashboard để mở danh sách và xử lý.',
 'Người cho chấp nhận. Hệ thống giữ đúng số suất và chuyển đơn accepted. Nếu thiếu suất do yêu cầu khác vừa được chấp nhận, thao tác bị từ chối để tránh giữ vượt tồn.',
 'Người cho xác nhận lịch. Màn Ghép cặp thành công giữ bố cục Figma; nút X quay về dashboard. Mở mã QR bàn giao dùng màn QR có sẵn, không mở màn PIN mới.'
])
h('Trường hợp còn 2 suất nhưng không thấy món')
p('Dữ liệu kiểm tra ngày 03/11/2026 cho thấy tin bún thịt nướng có tổng 9, đã giữ 7, trạng thái open nhưng hết hạn lúc 23:00 giờ Việt Nam. Sau giờ đó, 2 suất vẫn tồn tại trong phép tính nhưng không còn được đưa lên danh sách xin nhận. Không tự kéo dài hạn dùng của tin cũ. Khi demo lại, đăng tin mới với hạn còn hiệu lực và để admin duyệt.')
p('Hệ thống chỉ chặn gửi trùng khi tổ chức còn một yêu cầu awaiting cho cùng món. Khi đơn trước đã được chấp nhận, tổ chức có thể gửi đơn bổ sung theo số suất còn trống và còn hạn.')

page('Tình nguyện viên lấy và giao hàng')
h('Nhận và mở lại chuyến')
steps([
 'Tình nguyện viên mở Việc giao, chọn đơn accepted có hình thức Nhờ giao hộ và xác nhận nhận việc.',
 'Hệ thống gắn người giao và chuyển assigned rồi mở màn lấy hàng. Không chạy lại nhánh yêu cầu duyệt hồ sơ của prototype sau khi đã nhận chuyến.',
 'Khi đóng app hoặc quay lại, mở Việc giao rồi Chuyến của tôi. Chuyến assigned hoặc pickedUp vẫn ở đó; bấm Tiếp tục chuyến để đi tiếp đúng bước.'
])
h('Xác nhận lấy tại người cho')
steps([
 'Tới điểm lấy, kiểm đếm số suất và tình trạng thực phẩm. Mở Chụp ảnh xác nhận trên màn lấy hàng.',
 'App hiển thị màn camera màu xanh theo Figma 6:2041. Bấm nút trắng ở giữa để xác nhận demo. Không cần mở camera hệ thống, nhập PIN hay quét QR từ điện thoại khác.',
 'Chỉ khi Firebase ghi thành công, đơn chuyển pickedUp, số thực lấy trong demo bằng số đã đặt và app mở màn lộ trình giao hàng.'
])
h('Xác nhận giao tại tổ chức')
steps([
 'Vận chuyển từ người cho tới tổ chức. Trên màn lộ trình, bấm Đã đến nơi.',
 'App dùng lại bố cục camera Figma và đổi tiêu đề thành Ảnh xác nhận giao hàng. Bấm nút trắng để ghi deliveryConfirmed.',
 'App mở màn Giao thành công theo Figma 6:2105. Số suất và tên tổ chức lấy từ đơn đang chọn; trạng thái nhập kho vẫn chờ tổ chức xác nhận.'
])
p('Nút trắng là thao tác xác nhận quy trình demo, không tạo ảnh chụp thật. Có thể chọn ảnh nếu cần minh họa. Màn QR được giữ để trình bày thiết kế; mã không là điều kiện bắt buộc cho chuyển trạng thái trong luồng demo.')
h('Nhánh tự đến lấy')
p('Tổ chức tự đến lấy bỏ qua bước gán tình nguyện viên. Tổ chức mở xác minh lấy hàng, bấm nút trắng trên màn camera dùng chung rồi chuyển sang xác nhận nhận hàng. Quyền thao tác vẫn gắn với tổ chức của đơn.')

page('Nhập kho và các nhánh xử lý')
h('Tổ chức xác nhận hàng đến')
steps([
 'Sau khi tình nguyện viên xác nhận giao, tổ chức mở đơn và chọn Kiểm tra và xác nhận nhận đủ.',
 'Ghi số thực nhận, tình trạng và ghi chú. Ảnh nhận hàng là tùy chọn theo Figma. Nếu có gửi ảnh thì app kiểm tra định dạng và tải lên Cloudinary.',
 'Nếu số thực nhận khác số đặt hoặc số lấy, nhập ghi chú chênh lệch. Hệ thống ghi thông tin đối soát và yêu cầu hỗ trợ tương ứng.',
 'Xác nhận đã nhận. Hệ thống lưu ý định nhận hàng, cộng kho đúng một lần và chuyển completed. Làm mới hoặc mở lại không cộng lại số suất của đơn đã nhập.',
 'Tổ chức có thể gửi lời cảm ơn, đánh giá và tiếp tục phân phát từ tồn kho. Phân phát không được vượt số đã nhận trừ số đã phân phát.'
])
h('Chuỗi trạng thái')
table(['Trạng thái', 'Ý nghĩa'], [
 ('awaiting', 'Tổ chức đã gửi yêu cầu, chờ người cho xử lý.'),
 ('accepted', 'Người cho đã chấp nhận và giữ suất.'),
 ('assigned', 'Một tình nguyện viên đã nhận chuyến giao hộ.'),
 ('pickedUp', 'Đã lấy hàng; deliveryConfirmed ghi nhận việc giao tới tổ chức.'),
 ('completed', 'Tổ chức đã xác nhận số thực nhận và nhập kho.'),
 ('rejected hoặc cancelled', 'Yêu cầu bị từ chối hoặc hủy theo quyền và trạng thái cho phép.')
], [4.2, 12.8])
h('Hủy và sự cố')
p('Trước khi lấy hàng, người có quyền có thể hủy đơn kèm lý do; suất đã giữ được nhả theo giao thức khôi phục. Sau khi lấy hàng, dùng báo sự cố hoặc chuyển người giao để giữ dấu vết. Tình nguyện viên gửi yêu cầu chuyển chuyến; admin xem xét và phân công lại cho tài khoản hợp lệ.')
h('Các chức năng hỗ trợ')
p('Chat gắn với mã đơn để thống nhất điểm giao và tình trạng thực phẩm. Thông báo trong ứng dụng giúp mở yêu cầu hoặc đơn liên quan. Hồ sơ, nhu cầu, ca tình nguyện, kho và lịch sử lấy dữ liệu Firebase theo vai trò. Bản đồ xem trước và nút chỉ đường hỗ trợ tìm địa điểm; ứng dụng chưa theo dõi GPS hoặc ETA trực tiếp.')

page('Cài đặt và kiểm tra bản demo')
h('Cách chạy')
p('Từ thư mục gốc, chạy run_flutter.cmd pub get rồi run_flutter.cmd run. Máy phát triển cần Flutter và công cụ Android; người chỉ cài APK không cần cài Firebase. App kết nối project đã cấu hình khi có mạng. Người tải mã để dùng project riêng cần cấu hình Firebase theo README và docs/BACKEND_SETUP.md.')
p('Bản demo mới cần cả APK mới và Database Rules được sinh từ backend/tools/build_demo_rules.py. Nếu chỉ cài APK trong khi Rules cũ còn bắt buộc PIN, thao tác bấm nút trắng sẽ bị Firebase từ chối. Rules mới giữ kiểm tra vai trò đã duyệt, người tham gia, số lượng và thứ tự bước. Việc triển khai Rules lên project dùng chung là bước riêng cần chủ dự án phê duyệt.')
h('Kịch bản nghiệm thu')
steps([
 'Dùng bốn tài khoản đúng vai trò. Đăng tin mới 9 suất còn hạn, admin duyệt và kiểm tra tổ chức thấy 9.',
 'Tổ chức xin 7, người cho chấp nhận và hẹn giờ. Tin còn 2; bấm X màn ghép cặp phải đóng được.',
 'Tổ chức xin tiếp 2. Kiểm tra tạo đơn mới awaiting, không sửa số lượng đơn 7.',
 'Tình nguyện viên nhận chuyến 7, mở lại từ Chuyến của tôi và đến màn lấy hàng.',
 'Bấm Chụp ảnh xác nhận rồi nút trắng. Kiểm tra pickedUp và màn lộ trình.',
 'Bấm Đã đến nơi rồi nút trắng. Kiểm tra màn Giao thành công và tổ chức có thể xác nhận nhận hàng.',
 'Tổ chức ghi số nhận 7 và hoàn tất không cần ảnh. Kiểm tra kho tăng 7; mở lại không tăng thêm. Xử lý đơn 2 riêng để tổng nhận đủ 9.'
])
h('Phạm vi kiểm thử')
p('Kiểm thử Flutter bao phủ nút X, dashboard, nhận và mở lại chuyến, nút trắng lấy và giao, hiển thị 2 suất còn hạn và hạn dùng qua nửa đêm. Kiểm thử backend bao phủ đúng người thao tác, thứ tự bước, giữ suất, hủy, chênh lệch và nhập kho không trùng. Bộ kiểm tra Firebase Emulator xác nhận 14 thao tác được phép hoặc bị từ chối bởi Rules thật, gồm xin 2, chặn xin 3 và chặn xin món hết hạn.')
p('Đây là kiểm thử tự động với tài khoản và dữ liệu emulator hoặc lớp giả lập. Chưa thay cho nghiệm thu bốn tài khoản thật trên điện thoại. Các màn camera và kết quả giữ bố cục từ Figma; thao tác demo không là bằng chứng đã chụp hoặc quét thật.')

footer = section.footer.paragraphs[0]
footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
footer.add_run('ShareMeal  |  ')
field = OxmlElement('w:fldSimple')
field.set(qn('w:instr'), 'PAGE')
footer._p.append(field)
for run in footer.runs:
    run.font.size = Pt(9)
doc.core_properties.title = 'Báo cáo quy trình hoạt động ShareMeal'
doc.core_properties.subject = 'Workflow và sửa lỗi giao nhận thực phẩm'
doc.core_properties.author = 'ShareMeal'
doc.core_properties.keywords = 'ShareMeal workflow giao nhận Firebase'
output = ROOT / 'docs/Bao_cao_workflow_ShareMeal.docx'
doc.save(output)
print(output)
