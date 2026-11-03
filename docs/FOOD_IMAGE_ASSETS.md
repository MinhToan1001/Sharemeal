# Ảnh món ăn

Ảnh người dùng tải lên được ưu tiên. Nếu chưa có ảnh hoặc file không còn đọc được,
widget `FoodPhoto` dùng ảnh minh họa đúng loại món, gắn nhãn “Minh họa”. Không dùng icon bát
cho các thẻ món đã chuyển đổi. Ảnh mặc định không phải bằng chứng về món ăn thực tế.

Ảnh cơm gà giữ từ nguồn Figma: `frontend/assets/figma/b06546c1-6369-4414-803f-e9faf884379d.png`.
Ảnh tổ chức trong gợi ý ghép nối là hình minh họa cộng đồng sẵn có từ Figma, không phải ảnh
xác minh của từng tổ chức. Không sửa hoặc xóa các asset gốc.

## Asset mới

Tạo bằng công cụ image generation tích hợp, không dùng CLI/API key riêng.
Các bản đã được lưu trong dự án:

- `frontend/assets/images/food/bread.png`
- `frontend/assets/images/food/vegetables.png`
- `frontend/assets/images/food/soup.png`

Các đường dẫn tính từ thư mục gốc repository.

## Prompt đã dùng

Phần chung:

> Use case: photorealistic-natural. Asset type: stock-style demo food photograph for a Vietnamese mobile food-sharing app. Subject: [subject]. Composition: single food subject centered, close three-quarter overhead angle, usable square crop, matte light wood table, softly blurred neutral kitchen backdrop. Natural warm window light, authentic everyday food, realistic textures. No people, no text, no watermark, no logos. Create one photograph, not a collage or UI.

Subject từng ảnh:

- Bread: A small tray of freshly baked Vietnamese plain baguette rolls and soft sweet bread rolls, golden crisp crust, no fillings, no packaging text.
- Vegetables: Clean freshly prepared carrots, broccoli, leafy greens and cabbage neatly arranged in a plain reusable food container, no meat.
- Soup: A white ceramic bowl of Vietnamese clear vegetable soup with carrot, cabbage, mushrooms and green herbs, no meat, natural clean broth.

Đã xem lại ba ảnh trước khi gắn vào app; các ảnh là raster thật, không phải CSS/SVG giả ảnh.
