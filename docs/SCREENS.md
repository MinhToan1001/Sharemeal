# Danh mục màn hình

104 file page riêng đã chuyển từ 104 frame mobile đang dùng trong Figma.
Thêm page Tác động người cho `/user/donor/impact-report`, tổng cộng 105 route.
Điều hướng và biến trạng thái được nhập từ prototype. Đường chạy Firebase hiện
được nối qua `BackendRouteGate`, `backend_actions.dart` và `live_figma_bindings.dart`;
giữ các page gốc, không dùng màn hình backend thay thế. Danh sách và trạng thái
nghiệp vụ lấy từ Realtime Database. Xem `BACKEND_HANDOVER.md`.
Ánh xạ chính xác frame → route → file: `figma/screen_map.json`.

| Cụm | Số file |
| --- | --- |
| Tài khoản | 7 |
| Quản trị viên | 16 |
| Người cho | 25 |
| Tổ chức từ thiện | 20 |
| Tình nguyện viên | 15 |
| Dùng chung | 21 |

## Tài khoản

| File trong presentation/auth/pages | Màn hình |
| --- | --- |
| splash_page.dart | Khởi động |
| welcome_page.dart | Giới thiệu |
| login_page.dart | Đăng nhập |
| register_page.dart | Đăng ký |
| email_verification_page.dart | Xác minh email |
| role_selection_page.dart | Chọn vai trò |
| forgot_password_page.dart | Quên mật khẩu |

## Quản trị viên

| File trong presentation/admin/pages | Màn hình |
| --- | --- |
| dashboard_page.dart | Tổng quan quản trị |
| approval_queue_page.dart | Hồ sơ chờ duyệt |
| donor_review_page.dart | Duyệt người cho |
| organization_review_page.dart | Duyệt tổ chức |
| volunteer_review_page.dart | Duyệt tình nguyện viên |
| approval_result_page.dart | Kết quả phê duyệt |
| supplement_request_page.dart | Yêu cầu bổ sung |
| rejection_result_page.dart | Kết quả từ chối |
| dispatch_map_page.dart | Điều phối chuyến giao |
| reassignment_result_page.dart | Kết quả điều phối lại |
| complaint_review_page.dart | Xử lý khiếu nại |
| case_resolution_page.dart | Kết quả xử lý |
| account_management_page.dart | Quản lý tài khoản và quyền |
| reports_page.dart | Báo cáo hoạt động |
| food_safety_incident_page.dart | Sự cố an toàn thực phẩm |
| notifications_page.dart | Thông báo quản trị |

## Người cho

| File trong presentation/user/donor/pages | Màn hình |
| --- | --- |
| dashboard_page.dart | Trang chủ người cho |
| donor_type_page.dart | Loại hình người cho |
| individual_verification_page.dart | Xác minh cá nhân |
| business_verification_page.dart | Xác minh cơ sở |
| business_license_page.dart | Giấy phép cơ sở |
| facility_photos_page.dart | Hình ảnh cơ sở |
| availability_page.dart | Giờ hoạt động |
| commitment_page.dart | Cam kết an toàn |
| create_listing_page.dart | Đăng thực phẩm |
| food_safety_page.dart | Thông tin an toàn |
| pickup_location_page.dart | Địa điểm nhận |
| listing_preview_page.dart | Xem trước tin đăng |
| publish_success_page.dart | Đăng tin thành công |
| my_listings_page.dart | Tin đã đăng |
| listing_detail_page.dart | Chi tiết tin đăng |
| edit_listing_page.dart | Chỉnh sửa tin |
| close_listing_page.dart | Đóng tin |
| incoming_requests_page.dart | Yêu cầu nhận thực phẩm |
| matching_page.dart | Gợi ý ghép đơn |
| match_success_page.dart | Ghép đơn thành công |
| pickup_schedule_page.dart | Hẹn giờ bàn giao |
| order_tracking_page.dart | Theo dõi đơn người cho |
| handover_qr_page.dart | Mã bàn giao |
| donation_history_page.dart | Lịch sử chia sẻ |
| recipient_review_page.dart | Đánh giá bên nhận |

## Tổ chức từ thiện

| File trong presentation/user/organization/pages | Màn hình |
| --- | --- |
| dashboard_page.dart | Trang chủ tổ chức |
| organization_profile_page.dart | Hồ sơ tổ chức |
| food_discovery_page.dart | Tìm thực phẩm |
| food_detail_page.dart | Chi tiết thực phẩm |
| request_food_page.dart | Yêu cầu nhận thực phẩm |
| request_pending_page.dart | Yêu cầu chờ duyệt |
| awaiting_courier_page.dart | Chờ người giao |
| orders_page.dart | Đơn nhận |
| order_tracking_page.dart | Theo dõi đơn nhận |
| receipt_code_page.dart | Mã nhận hàng |
| confirm_receipt_page.dart | Xác nhận nhận hàng |
| create_need_page.dart | Đăng nhu cầu |
| needs_page.dart | Danh sách nhu cầu |
| warehouse_page.dart | Kho thực phẩm |
| distribution_page.dart | Quản lý phân phối |
| record_distribution_page.dart | Ghi nhận phân phối |
| impact_report_page.dart | Báo cáo tác động |
| thank_you_page.dart | Gửi lời cảm ơn |
| thank_you_sent_page.dart | Đã gửi cảm ơn |
| cancel_request_page.dart | Hủy yêu cầu |

## Tình nguyện viên

| File trong presentation/user/volunteer/pages | Màn hình |
| --- | --- |
| dashboard_page.dart | Trang chủ tình nguyện viên |
| volunteer_profile_page.dart | Hồ sơ tình nguyện viên |
| available_jobs_page.dart | Việc giao |
| job_detail_page.dart | Chi tiết chuyến |
| accept_job_page.dart | Nhận chuyến |
| pickup_page.dart | Lấy thực phẩm |
| handover_scanner_page.dart | Quét mã bàn giao |
| pickup_photo_page.dart | Ảnh xác nhận lấy hàng |
| delivery_tracking_page.dart | Đang giao hàng |
| awaiting_receipt_page.dart | Chờ xác nhận nhận hàng |
| delivery_complete_page.dart | Giao hàng hoàn tất |
| calendar_page.dart | Lịch tình nguyện |
| shift_registration_page.dart | Đăng ký ca |
| shift_registered_page.dart | Đăng ký ca thành công |
| badges_page.dart | Huy hiệu |

## Dùng chung

| File trong presentation/shared/pages | Màn hình |
| --- | --- |
| profile_page.dart | Hồ sơ cá nhân |
| settings_page.dart | Cài đặt |
| role_management_page.dart | Quản lý vai trò |
| verification_pending_page.dart | Hồ sơ đang chờ duyệt |
| verification_approved_page.dart | Hồ sơ đã duyệt |
| verification_supplement_page.dart | Bổ sung hồ sơ |
| verification_rejected_page.dart | Hồ sơ bị từ chối |
| browse_only_page.dart | Chế độ xem |
| notifications_page.dart | Thông báo |
| chat_page.dart | Trò chuyện |
| support_page.dart | Trợ giúp |
| support_ticket_page.dart | Tạo yêu cầu hỗ trợ |
| support_status_page.dart | Theo dõi hỗ trợ |
| support_resolved_page.dart | Kết quả hỗ trợ |
| report_issue_page.dart | Báo cáo sự cố |
| report_discrepancy_page.dart | Báo thiếu hoặc hỏng |
| packaging_guide_page.dart | Hướng dẫn đóng gói |
| location_picker_page.dart | Chọn vị trí |
| transfer_delivery_page.dart | Chuyển giao chuyến |
| handover_receipt_page.dart | Biên nhận bàn giao |
| community_report_page.dart | Báo cáo cộng đồng |

File có thể đọc bằng chương trình: `screen_manifest.json`.
