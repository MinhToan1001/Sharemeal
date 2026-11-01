# Phân chia mã nguồn

`frontend/lib/presentation` chứa page, widget, controller theo cụm.
Mỗi page là một file/class riêng, không dùng một file dựng mọi màn theo ID.
104 page hiện có cây widget riêng được chuyển từ mã tham chiếu Figma.
`presentation/shared/figma` chứa primitive layout native, dữ liệu prototype và controller.
Thêm page Tác động người cho, tổng 105 route. `presentation/shared/interaction` chứa
state/repository cục bộ, command, danh sách động và các tích hợp thiết bị. Các input và
lựa chọn cập nhật state này; cây Figma chỉ cung cấp bố cục và đích điều hướng.
Không dùng WebView hoặc ảnh chụp toàn màn hình để thay giao diện.

Luồng phụ thuộc: page → controller → domain repository → data repository/datasource → Firebase SDK.
`domain` không import Flutter hoặc Firebase. `data` là mã client Flutter, không có quyền admin máy chủ.
`app` quản lý khởi tạo, theme và route registry; routes cũng tách theo cụm.

`backend` chứa Security Rules và phần máy chủ. Phê duyệt, cấp quyền, điều phối và
đổi trạng thái nhạy cảm cần được kiểm tra tại backend/Rules.
Không coi role hoặc trạng thái truyền từ màn hình là bằng chứng được phép thao tác.

Đường chạy Firebase đã nối Auth và Realtime Database trực tiếp qua
`FirebaseAppState` và `direct_backend.dart`; ảnh tải Cloudinary. Các form lưu draft
trong phiên, dữ liệu nghiệp vụ được lưu Firebase và bảo vệ bằng Rules đã deploy.
`FrontendState` cục bộ chỉ còn phục vụ preview và các form nháp.
Kiến trúc đang dùng: [BACKEND_ARCHITECTURE](BACKEND_ARCHITECTURE.md).
