# Backend ShareMeal

Backend sử dụng Firebase Authentication và Realtime Database; ảnh tải lên Cloudinary.

| Thư mục | Trách nhiệm |
| --- | --- |
| [client](client/README.md) | Package Flutter `sharemeal_client`: tích hợp Firebase/Cloudinary, model và nghiệp vụ |
| `firebase/database/` | Security Rules và schema Realtime Database |
| `firebase/public-config.example.json` | Mẫu cấu hình Cloudinary công khai |
| [tools](tools/README.md) | Sinh Rules và fixture kiểm thử trên Emulator |

Frontend dùng package cục bộ `../backend/client`. Package chạy cùng Flutter; quyền đọc/ghi do Firebase Rules thực thi. Không có Cloud Functions hoặc máy chủ API cần khởi động.

Cài đặt dịch vụ, deploy Rules và tạo admin đầu tiên: [BACKEND_SETUP](../docs/BACKEND_SETUP.md).

