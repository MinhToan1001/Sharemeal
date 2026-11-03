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
p('Luồng chia sẻ thực phẩm và kết quả sửa lỗi', 'Subtitle')
p('Ngày lập 03 tháng 11 năm 2026')
p('Báo cáo mô tả cách các vai trò phối hợp trong ứng dụng sau đợt sửa lỗi luồng giao nhận. Luồng nhờ giao hộ là người cho trao hàng cho tình nguyện viên, tình nguyện viên vận chuyển đến tổ chức, rồi tổ chức xác nhận số thực nhận để nhập kho. Việc ghép nối chỉ giữ suất và xác định tổ chức nhận, chưa có nghĩa hàng đã được bàn giao.')
h('Các vai trò tham gia')
table(['Vai trò', 'Trách nhiệm chính'], [
    ('Người cho', 'Đăng món, xử lý yêu cầu nhận, hẹn giờ và xuất mã lấy hàng tại điểm lấy.'),
    ('Tổ chức từ thiện', 'Xin nhận, chọn cách nhận, xác nhận hàng đến, ghi số thực nhận và quản lý kho.'),
    ('Tình nguyện viên', 'Nhận chuyến nhờ giao hộ, lấy hàng ở người cho và giao đến tổ chức.'),
    ('Quản trị viên', 'Duyệt hồ sơ và tin, điều phối chuyến, quản lý tài khoản và xử lý sự cố.')
], [4, 13])
h('Hiểu đúng tình huống 9 suất và 7 suất')
p('Một tin đăng có 9 suất là một lô thực phẩm, không phải 9 đơn. Tổ chức xin 7 suất sẽ tạo một đơn có số lượng 7. Khi người cho chấp nhận, 7 suất được giữ và tin còn 2 suất có thể yêu cầu tiếp.')
table(['Thời điểm', 'Tổng tin', 'Đã giữ', 'Còn trống'], [
    ('Tin được duyệt', '9', '0', '9'),
    ('Đơn 7 suất được chấp nhận', '9', '7', '2'),
    ('Đơn bổ sung 2 suất được chấp nhận', '9', '9', '0')
], [8, 3, 3, 3])
p('Sau sửa lỗi, cùng một tổ chức có thể xin thêm 2 suất nếu đơn 7 suất đã được chấp nhận. Nếu vẫn còn một yêu cầu chưa được người cho phản hồi cho cùng món, app tiếp tục chặn gửi thêm để tránh trùng yêu cầu.')

page('Từ đăng ký đến ghép nối thành công')
h('Điều kiện trước khi bắt đầu')
p('Mỗi người đăng ký và xác minh email qua liên kết Firebase. Người dùng chọn đúng vai trò, gửi hồ sơ xác minh và chờ quản trị viên duyệt. Việc duyệt hồ sơ tình nguyện viên là điều kiện sử dụng vai trò; không phải một bước duyệt lại sau mỗi lần nhận chuyến.')
steps([
    'Người cho đăng tin: nhập tên món, số suất, ảnh, điều kiện bảo quản, thành phần dị ứng, hạn sử dụng, địa chỉ lấy và cam kết an toàn. Tin mới ở trạng thái pending.',
    'Quản trị viên mở hàng đợi, đối chiếu nội dung và phê duyệt tin. Tin chuyển sang open và có thể được tổ chức tìm thấy khi còn hạn và còn suất.',
    'Tổ chức mở chi tiết món, nhập 7 suất, người nhận và giờ nhận; chọn Nhờ giao hộ hoặc Tự đến lấy, xác nhận cam kết rồi gửi yêu cầu.',
    'App tạo đơn awaiting. Lúc này chưa giữ suất. Người cho xem yêu cầu từ dashboard hoặc mục yêu cầu nhận và kiểm tra số suất còn lại.',
    'Người cho chấp nhận: app giữ 7 suất theo giao thức chống giữ trùng, đơn chuyển accepted và tin còn 2 suất. Người cho có thể từ chối hoặc hủy theo quyền và trạng thái.',
    'Người cho xác nhận lịch lấy rồi tới màn Ghép nối thành công. Nút X hoặc Về trang chủ đóng màn kết quả; Theo dõi bàn giao mở đúng đơn vừa chấp nhận.',
    'Nếu tổ chức xin thêm 2 suất còn lại sau khi đơn 7 suất được chấp nhận, app tạo đơn bổ sung riêng. Người cho tiếp tục xét và chấp nhận đơn mới; không tự cộng vào đơn cũ.'
])
h('Hai cách nhận có đường đi khác nhau')
p('Nhờ giao hộ: đơn accepted xuất hiện trong danh sách chờ nhận của tình nguyện viên. Người cho chờ có người nhận chuyến rồi xuất mã lấy hàng khi người đó đã tới.')
p('Tự đến lấy: tổ chức trực tiếp tới người cho, xác nhận mã lấy hàng, rồi kiểm tra số thực nhận và ảnh để hoàn tất. Không có bước tình nguyện viên nhận chuyến hoặc mã giao hàng trung gian.')
h('Những thao tác trên dashboard')
p('Người cho bấm số yêu cầu chờ hoặc dòng yêu cầu để mở danh sách xử lý. Dòng đơn đang giao mở đúng đơn liên quan. Dashboard tình nguyện viên ưu tiên chuyến đang làm; danh sách Việc giao có hai mục Chờ nhận và Chuyến của tôi.')

page('Luồng nhờ tình nguyện viên giao hàng')
steps([
    'Tình nguyện viên mở Việc giao → Chờ nhận, chọn đơn accepted và kiểm tra người cho, tổ chức nhận, số suất, địa điểm lấy cùng giờ hẹn.',
    'Bấm Nhận chuyến và Xác nhận nhận việc. App lưu volunteerId, tên người giao và chuyển đơn sang assigned; sau đó mở chi tiết chuyến đang thực hiện.',
    'Đến điểm lấy của người cho. Đối chiếu đúng mã đơn và số suất, kiểm tra thực phẩm. Người cho mở Theo dõi bàn giao → Mã lấy hàng tại người cho.',
    'Tình nguyện viên bấm Xác nhận lấy hàng từ người cho, quét QR hoặc nhập PIN 6 số và nhập số suất thực lấy. Xác nhận đúng chuyển đơn sang pickedUp.',
    'Tình nguyện viên có thể lưu ảnh thực phẩm lúc lấy. Vận chuyển tới tổ chức nhận đã ghi trên đơn. Đối chiếu địa chỉ giao và người nhận qua chat trước khi đi.',
    'Khi hàng tới tổ chức, tổ chức mở Mã xác nhận nhận hàng. Tình nguyện viên bấm Xác nhận giao hàng tại tổ chức và quét hoặc nhập mã do tổ chức cung cấp.',
    'Xác nhận mã nhận đặt deliveryConfirmed thành true. Đơn vẫn pickedUp trong thời gian tổ chức kiểm đếm; tình nguyện viên thấy thông báo chờ tổ chức hoàn tất.',
    'Tổ chức bấm Kiểm tra và xác nhận nhận đủ, nhập số thực nhận, thêm ảnh nhận hàng bắt buộc và ghi chú nếu có chênh lệch. App nhập kho đúng số thực nhận và chuyển đơn completed.'
])
h('Phân biệt hai mã bàn giao')
table(['Mã', 'Ai tạo', 'Ai xác nhận', 'Kết quả'], [
    ('Lấy hàng pickup', 'Người cho', 'Tình nguyện viên hoặc tổ chức tự lấy', 'Ghi số thực lấy và chuyển pickedUp'),
    ('Nhận hàng receipt', 'Tổ chức nhận', 'Tình nguyện viên', 'Ghi hàng đã tới; chờ tổ chức hoàn tất nhập kho')
], [3.1, 3.1, 5.4, 5.4])
p('Mỗi mã gắn với mã đơn và loại bước. PIN có 6 chữ số, thời hạn 10 phút, tối đa 5 lần sai và chỉ dùng một lần. Không dùng mã lấy hàng để xác nhận giao hàng. Chỉ đưa mã khi các bên và thực phẩm đã ở đúng điểm bàn giao.')
p('Thông tin địa chỉ giao chưa được lưu thành trường riêng trên đơn hiện tại. Màn chuyến nêu rõ tổ chức nhận; các bên cần xác nhận địa chỉ qua chat. Đây là giới hạn cần lưu ý khi vận hành thực tế.')

page('Trạng thái đơn và nguyên tắc số lượng')
table(['Trạng thái', 'Ý nghĩa', 'Thao tác tiếp theo'], [
    ('awaiting', 'Tổ chức đã xin nhận; chưa giữ suất', 'Người cho chấp nhận, từ chối hoặc bên có quyền hủy'),
    ('accepted', 'Người cho đã giữ suất', 'Nhờ giao hộ: tình nguyện viên nhận; tự lấy: tổ chức đến lấy'),
    ('assigned', 'Đã có tình nguyện viên phụ trách', 'Đến người cho và xác nhận mã lấy hàng'),
    ('pickedUp', 'Đã xác nhận lấy hàng', 'Giao tới tổ chức; tổ chức đối chiếu số thực nhận'),
    ('completed', 'Đã xác nhận nhận và nhập kho', 'Cảm ơn, đánh giá, phân phát trong tồn'),
    ('rejected', 'Người cho từ chối yêu cầu', 'Tổ chức chọn lô khác hoặc gửi lại khi phù hợp'),
    ('cancelled', 'Đơn đã hủy theo quyền hợp lệ', 'App nhả phần suất đã giữ nếu có')
], [3.2, 5.8, 8])
h('Đặt nhận và nhập kho là hai phép tính khác nhau')
p('Số suất còn trống của tin bằng quantity trừ reserved. Chấp nhận đơn giữ suất; xác nhận số thực nhận mới tăng kho của tổ chức. Bấm nhận chuyến không nhập kho và không xác nhận rằng tình nguyện viên đã cầm hàng.')
p('Ví dụ đặt 7, thực lấy 6, thực nhận 5: đơn lưu ba số riêng. Kho tổ chức chỉ tăng 5. Vì có chênh lệch, tổ chức phải nhập ghi chú và app tạo yêu cầu đối soát. Phần thiếu không tự biến thành hàng có sẵn hoặc tự cộng trở lại tin.')
h('Nhận trực tiếp không qua tình nguyện viên')
steps([
    'Tổ chức chọn Tự đến lấy; sau khi người cho chấp nhận, đại diện tổ chức tới đúng điểm lấy.',
    'Người cho xuất mã pickup. Tổ chức nhập hoặc quét mã và ghi số thực lấy; đơn chuyển pickedUp.',
    'Tổ chức thêm ảnh, xác nhận số thực nhận và hoàn tất để nhập kho. Bỏ qua mã receipt dành cho tình nguyện viên.'
])
h('Khôi phục khi mạng không ổn định')
p('Các giao thức giữ suất, nhả suất và nhập kho lưu dấu vết giao dịch để thử lại không cộng trùng. Khi thấy trạng thái đang đồng bộ, mở lại đơn hoặc làm mới để tiếp tục. Không tạo một đơn khác để thay cho một lần ghi đã thành công nhưng chưa hiển thị xong.')

page('Các quy trình liên quan trong ứng dụng')
h('Quản lý hồ sơ và quyền')
p('Người dùng gửi hồ sơ ở vai trò đã chọn. Quản trị viên có thể phê duyệt, từ chối hoặc yêu cầu bổ sung tài liệu. Tài khoản bị khóa không được tiếp tục ghi nghiệp vụ. Admin đầu tiên được chủ Firebase chỉ định qua Console theo cơ chế một UID quản trị.')
h('Tin đăng và nhu cầu')
p('Người cho theo dõi tin và các yêu cầu nhận, sửa hoặc đóng tin. Nội dung chỉnh sửa có thể phải duyệt lại. Tổ chức có thể đăng nhu cầu nhận thực phẩm, theo dõi trạng thái duyệt và tìm các món phù hợp. Nhu cầu không tự tạo đơn hoặc tự chấp nhận một món.')
h('Kho và phân phát')
p('Tổ chức nhận kho từ các đơn completed. Khi ghi phân phát, nhập số suất cho các nhóm nhận; tổng phân phát phải nằm trong số còn tồn. Kho còn lại bằng tổng đã nhập trừ tổng đã phân phát. Báo cáo tác động lấy từ dữ liệu hoàn tất, không tính yêu cầu đang chờ như hàng đã trao.')
h('Chat và thông báo')
p('Các bên trong đơn trao đổi bằng chat theo mã đơn, xác nhận giờ hẹn, địa chỉ và sự cố. Thông báo trong app phản ánh hoạt động nghiệp vụ và mở thông tin liên quan khi có liên kết phù hợp. Ứng dụng hiện chưa có push notification nền qua FCM.')
h('Lịch và hoạt động tình nguyện')
p('Tình nguyện viên đăng ký hoặc hủy ca, xem lịch và chuyến của mình. Chuyến đã nhận được mở lại từ Việc giao → Chuyến của tôi hoặc dashboard. Đơn hoàn tất đóng góp vào lịch sử hoạt động và huy hiệu; không phải tất cả các con số trên bản thiết kế đều là chỉ số trực tiếp của dịch vụ.')
h('Hủy đơn và xử lý sự cố')
p('Trước khi lấy hàng, bên có quyền có thể hủy theo quy tắc của đơn; suất đã giữ được nhả theo giao thức khôi phục. Sau khi đã lấy hàng, xử lý thiếu hàng, an toàn thực phẩm hoặc chuyển người giao qua hỗ trợ và điều phối, không dùng hủy thông thường để làm mất dấu vết bàn giao.')
p('Tình nguyện viên có thể gửi yêu cầu chuyển chuyến kèm lý do. Quản trị viên xem sự cố, phân công lại cho tình nguyện viên hợp lệ và ghi kết quả xử lý. Việc gửi yêu cầu hỗ trợ không đồng nghĩa chuyến đã tự chuyển người.')
h('Bản đồ và giới hạn vận hành')
p('Bản đồ xem trước dùng OpenStreetMap; nút chỉ đường có thể mở Google Maps. Ứng dụng chưa theo dõi GPS liên tục, tính tuyến giao hoặc ETA trực tiếp. Cloudinary lưu media bằng URL công khai. Cần mạng để đồng bộ Firebase và tải ảnh; bản này phù hợp phạm vi demo hơn là cam kết vận hành quy mô lớn.')

page('Kết quả sửa lỗi và phạm vi kiểm tra')
table(['Vấn đề', 'Nguyên nhân trong mã', 'Điều chỉnh'], [
    ('Không đóng được màn ghép nối', 'Màn kết quả dựa vào control prototype, thiếu nút đóng rõ ràng cho luồng thật', 'Thêm nút X, Về trang chủ và Theo dõi bàn giao trên màn live'),
    ('Dashboard khó bấm mở yêu cầu', 'Chỉ số và dòng dữ liệu chưa được gắn lệnh live đầy đủ', 'Gắn chỉ số và dòng yêu cầu vào danh sách xử lý; mở đúng đơn đang giao'),
    ('Nhận chuyến lại về chờ duyệt', 'Sau khi ghi assigned vẫn thực thi điều hướng prototype', 'Điều hướng thẳng về chi tiết chuyến theo trạng thái Firebase'),
    ('Chuyến biến khỏi danh sách', 'Danh sách Việc giao chỉ lọc accepted', 'Thêm Chuyến của tôi để giữ assigned, pickedUp và lịch sử của người giao'),
    ('QR xuất hiện khó hiểu', 'Thiếu phân biệt bên tạo mã và giai đoạn bàn giao', 'Tách màn mã pickup, receipt, hướng dẫn từng vai trò và chưa tạo mã lấy khi chưa có người giao'),
    ('Không xin thêm 2 suất', 'Chặn mọi đơn chưa hoàn tất của cùng tổ chức và cùng món', 'Chỉ chặn yêu cầu awaiting trùng; cho phép đơn bổ sung theo suất còn trống')
], [4.2, 6.1, 6.7])
h('Kiểm thử hồi quy')
p('Bộ kiểm thử kiểm tra đóng màn kết quả, mở yêu cầu từ dashboard, nhận và mở lại chuyến, xác nhận hai bước PIN, cùng quy tắc xin thêm 2 suất khi 7 suất đã được giữ. Các kiểm thử nghiệp vụ hiện có tiếp tục kiểm tra giữ suất, hủy, khôi phục và nhập kho không cộng trùng.')
p('Các bài test luồng mới dùng Firebase giả lập tại lớp test để tái hiện điều hướng và payload. Chúng không thay cho việc chạy lại bốn tài khoản thật trên Firebase đã triển khai. Chưa thực hiện giao nhận thật hoặc thay đổi dữ liệu production trong đợt sửa này.')
h('Các điểm mã nguồn chính')
p('Frontend: live_handover_pages.dart, live_flow_pages.dart, firebase_actions.dart, live_figma_bindings.dart và delivery_jobs_content.dart. Backend client: modules/orders.dart; các giao thức tồn kho và nhận hàng giữ nguyên cơ chế xác thực bằng Firebase Rules.')
p('File test: frontend/test/workflow_regression_test.dart và backend/client/test/additional_request_test.dart. Thay đổi này không thêm trường database và không yêu cầu deploy Rules mới.')

page('Kịch bản nghiệm thu luồng 9 suất')
p('Dùng bốn tài khoản đã xác minh email và được duyệt đúng vai trò. Chạy bản app được build từ mã đã sửa; bản APK cũ trên điện thoại không tự nhận thay đổi mã nguồn.')
steps([
    'Người cho đăng một tin 9 suất còn hạn. Admin duyệt. Kiểm tra tổ chức thấy đúng tin, đúng số còn lại 9.',
    'Tổ chức gửi một yêu cầu 7 suất và chọn Nhờ giao hộ. Kiểm tra người cho thấy một yêu cầu; bấm cả chỉ số và dòng trên dashboard đều mở được danh sách.',
    'Người cho chấp nhận và xác nhận lịch. Kiểm tra tin còn 2 suất. Tại Ghép nối thành công, bấm X phải về dashboard; mở lại Theo dõi bàn giao vẫn thấy đúng đơn.',
    'Tổ chức xin thêm 2 suất của cùng tin. Kiểm tra đơn mới ở trạng thái chờ; không bị báo đã có đơn đang xử lý chỉ vì đơn 7 suất đã được chấp nhận.',
    'Tình nguyện viên nhận đơn 7 suất và xác nhận. Kiểm tra không bị đưa về yêu cầu duyệt hồ sơ. Mở Việc giao → Chuyến của tôi phải còn chuyến đó.',
    'Người cho xuất mã lấy khi tình nguyện viên đã tới. Tình nguyện viên nhập mã và số thực lấy 7. Kiểm tra người cho, tổ chức và tình nguyện viên đều thấy đã lấy hàng.',
    'Tình nguyện viên vận chuyển tới tổ chức. Tổ chức xuất mã nhận hàng. Tình nguyện viên xác nhận đúng mã; kiểm tra màn chuyến báo chờ tổ chức hoàn tất.',
    'Tổ chức thêm ảnh nhận hàng, ghi số thực nhận 7 và hoàn tất. Kiểm tra đơn completed, kho tăng đúng 7, làm mới hoặc mở lại không tăng thêm lần nữa.',
    'Xử lý tiếp đơn bổ sung 2 suất bằng quy trình riêng. Nếu nhận đủ cả hai đơn, kho tăng tổng 9. Kiểm tra cả hai mã đơn tách biệt và tin không còn suất trống.'
])
h('Kiểm tra các nhánh ngoại lệ')
p('Thử tự đến lấy để xác nhận không cần tình nguyện viên. Thử hủy trước lấy hàng để kiểm tra nhả suất. Thử PIN sai, hết hạn và dùng lại; thử nhập số nhận khác số đặt và kiểm tra yêu cầu ghi chú, ảnh và đối soát. Dừng nghiệm thu nếu một tài khoản bị gán sai vai trò hoặc chưa được duyệt thay vì tiếp tục trên luồng không đúng quyền.')
h('Cách chạy lại kiểm thử')
p('Từ frontend: flutter analyze và flutter test. Từ backend/client: flutter analyze và flutter test. Muốn dùng trên điện thoại, build lại APK debug hoặc chạy flutter run; không cần cài thêm Firebase trên thiết bị.')

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
