# Mã kiến trúc API cũ

Thư mục này được giữ lại để tham khảo. App demo hiện tại KHÔNG gọi API/Cloud Functions và `backend/firebase.json` không triển khai Functions.

Nghiệp vụ đang dùng nằm tại `frontend/lib/data/repositories/direct_*.dart`, kết hợp Realtime Database Rules. Bộ test cũ của thư mục này không xác nhận bản tích hợp Firebase trực tiếp hiện tại.

Công cụ cấu hình preset Cloudinary một lần còn dùng SDK Node được cài ở đây. API Secret chỉ đọc từ thư mục local bị gitignore `backend/.private`, không đóng gói vào APK.

