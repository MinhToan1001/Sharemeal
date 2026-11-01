package com.example.sharemeal;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

/**
 * ShareMeal high-fidelity implementation map.
 *
 * The 30 entries below deliberately map one-to-one to distinct Figma Page 2
 * flows: onboarding, identity, food supply/demand, delivery, safety, rewards,
 * community, volunteer, restaurant/individual, and administration.
 */
public class MainActivity extends AppCompatActivity {
    private static final int GREEN = Color.rgb(0, 122, 89);
    private static final int DEEP_GREEN = Color.rgb(0, 77, 57);
    private static final int PALE_GREEN = Color.rgb(232, 246, 239);
    private static final int INK = Color.rgb(27, 42, 36);
    private static final int MUTED = Color.rgb(104, 120, 113);
    private static final int ORANGE = Color.rgb(247, 139, 34);

    private final Screen[] screens = new Screen[] {
            new Screen("01", "Chào mừng đến ShareMeal", "Kết nối thực phẩm dư thừa với người cần hỗ trợ.", "Bắt đầu", "Đăng nhập", "Khởi đầu & tài khoản"),
            new Screen("02", "Chọn vai trò", "Bạn tham gia với tư cách cá nhân, nhà hàng hay tổ chức?", "Cá nhân", "Nhà hàng / tổ chức", "Khởi đầu & tài khoản"),
            new Screen("03", "Tạo tài khoản", "Dùng email hoặc số điện thoại để tạo tài khoản an toàn.", "Tiếp tục", "Đã có tài khoản", "Tài khoản"),
            new Screen("04", "Đăng nhập", "Chào mừng bạn quay lại với cộng đồng ShareMeal.", "Đăng nhập", "Quên mật khẩu", "Tài khoản"),
            new Screen("05", "Hồ sơ đang được xét duyệt", "Chúng tôi đang kiểm tra thông tin để giữ cộng đồng đáng tin cậy.", "Xem trạng thái", "Cập nhật hồ sơ", "Xác minh hồ sơ"),
            new Screen("06", "Xác minh danh tính", "Chụp giấy tờ hợp lệ và ảnh chân dung để bảo vệ người dùng.", "Bắt đầu xác minh", "Tìm hiểu thêm", "Xác minh hồ sơ"),
            new Screen("07", "Trang chủ", "Hôm nay có 12 phần thực phẩm gần bạn cần được kết nối.", "Xem thực phẩm", "Đăng thực phẩm", "Người dùng"),
            new Screen("08", "Tìm thực phẩm", "Khám phá thực phẩm phù hợp theo vị trí, thời gian và khẩu phần.", "Lọc kết quả", "Xem bản đồ", "Ghép cung - cầu"),
            new Screen("09", "Chi tiết thực phẩm", "Cơm trưa 25 phần • nhận trước 11:30 • cách bạn 1,2 km.", "Đặt nhận", "Liên hệ người đăng", "Ghép cung - cầu"),
            new Screen("10", "Yêu cầu nhận thực phẩm", "Xác nhận số phần, giờ nhận và ghi chú cho người đăng.", "Gửi yêu cầu", "Quay lại", "Ghép cung - cầu"),
            new Screen("11", "Đơn nhận của tôi", "Theo dõi trạng thái các yêu cầu: chờ duyệt, đã xác nhận, hoàn tất.", "Xem đơn đang chờ", "Lịch sử", "Ghép cung - cầu"),
            new Screen("12", "Đăng thực phẩm", "Chia sẻ thực phẩm an toàn, còn hạn dùng và sẵn sàng trao tặng.", "Thêm món ăn", "Lưu nháp", "Đăng thực phẩm nâng cao"),
            new Screen("13", "Đăng nhiều món một lần", "Tạo danh sách nhiều món để tiết kiệm thời gian cho nhà hàng.", "Thêm món khác", "Xem trước bài đăng", "04 - Đăng nhiều món một lần"),
            new Screen("14", "Quét mã vạch sản phẩm", "Quét mã để tự động điền tên, thành phần và ngày dùng tốt nhất.", "Mở camera", "Nhập mã thủ công", "03 - Quét mã vạch sản phẩm"),
            new Screen("15", "Kiểm tra an toàn thực phẩm", "Xác nhận nhiệt độ, bao bì và thời hạn trước khi đăng.", "Đạt tiêu chuẩn", "Xem hướng dẫn", "Giao nhận & an toàn thực phẩm"),
            new Screen("16", "Ghép cung - cầu", "Gợi ý các điểm nhận phù hợp nhất với số lượng thực phẩm bạn có.", "Chấp nhận gợi ý", "Tự chọn người nhận", "Ghép cung - cầu nâng cao"),
            new Screen("17", "Chọn phương thức giao nhận", "Tự giao, hẹn điểm gặp hoặc nhờ tình nguyện viên hỗ trợ.", "Tự giao", "Tìm tình nguyện viên", "Giao nhận & an toàn thực phẩm"),
            new Screen("18", "Theo dõi giao nhận", "Người giao đang trên đường. Mã xác nhận: 4812.", "Liên hệ", "Báo sự cố", "Giao nhận & an toàn thực phẩm"),
            new Screen("19", "Hoàn tất giao nhận", "Xác nhận đã nhận đủ thực phẩm và đánh giá trải nghiệm.", "Xác nhận hoàn tất", "Cần hỗ trợ", "Giao nhận & an toàn thực phẩm"),
            new Screen("20", "Quyên tặng định kỳ", "Lên lịch chia sẻ thực phẩm mỗi ngày, mỗi tuần hoặc theo sự kiện.", "Tạo lịch", "Quản lý lịch", "02 - Quyên tặng định kỳ"),
            new Screen("21", "Điểm thưởng của tôi", "Bạn có 1.240 điểm nhờ 18 lần đóng góp tích cực.", "Đổi ưu đãi", "Xem lịch sử điểm", "Điểm thưởng"),
            new Screen("22", "Cộng đồng & tác động", "Xem số bữa ăn đã cứu, lượng thực phẩm giảm lãng phí và câu chuyện tốt.", "Khám phá câu chuyện", "Chia sẻ thành tích", "Cộng đồng & tác động"),
            new Screen("23", "Tình nguyện viên", "Nhận chuyến giao phù hợp với khu vực và thời gian rảnh của bạn.", "Nhận chuyến giao", "Lịch hoạt động", "Tình nguyện viên"),
            new Screen("24", "Hồ sơ tình nguyện", "Thiết lập khu vực phục vụ, phương tiện và khung giờ bạn có thể hỗ trợ.", "Lưu thay đổi", "Xem thành tích", "Tình nguyện viên"),
            new Screen("25", "Tổ chức từ thiện", "Quản lý nhu cầu, số người hưởng lợi và các yêu cầu đang chờ.", "Tạo nhu cầu", "Xem báo cáo", "Tổ chức từ thiện"),
            new Screen("26", "Nhà hàng & cá nhân", "Bảng điều khiển riêng để quản lý lượng thực phẩm và lượt trao tặng.", "Đăng thực phẩm", "Xem thống kê", "Người cho - nhà hàng & cá nhân"),
            new Screen("27", "Quản trị viên thực phẩm", "Duyệt bài đăng, theo dõi rủi ro an toàn và xử lý báo cáo.", "Duyệt bài đăng", "Xem cảnh báo", "Quản trị viên thực phẩm"),
            new Screen("28", "Tài khoản, nhóm & bảo mật", "Quản lý thông tin cá nhân, nhóm cộng tác và bảo mật đăng nhập.", "Chỉnh sửa hồ sơ", "Cài đặt bảo mật", "Tài khoản, nhóm & bảo mật"),
            new Screen("29", "Thông báo", "Bạn có 3 cập nhật mới về đơn nhận và hoạt động cộng đồng.", "Đánh dấu đã đọc", "Tùy chỉnh thông báo", "Tài khoản"),
            new Screen("30", "Trợ giúp & phản hồi", "Tìm câu trả lời nhanh hoặc gửi phản hồi để cải thiện ShareMeal.", "Trung tâm trợ giúp", "Gửi phản hồi", "Tài khoản")
    };
    private int current = 0;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        render();
    }

    private void render() {
        Screen screen = screens[current];
        ScrollView scroll = new ScrollView(this);
        scroll.setBackgroundColor(Color.WHITE);
        LinearLayout root = column(22);
        root.setPadding(dp(20), dp(18), dp(20), dp(24));

        LinearLayout top = new LinearLayout(this);
        top.setGravity(Gravity.CENTER_VERTICAL);
        TextView mark = text("SHARE", 14, Color.WHITE, Typeface.BOLD);
        mark.setGravity(Gravity.CENTER);
        mark.setBackgroundColor(GREEN);
        top.addView(mark, new LinearLayout.LayoutParams(dp(68), dp(32)));
        TextView count = text("Màn hình " + screen.id + " / 30", 14, MUTED, Typeface.NORMAL);
        LinearLayout.LayoutParams countParams = new LinearLayout.LayoutParams(0, dp(32), 1);
        countParams.setMargins(dp(12), 0, 0, 0);
        top.addView(count, countParams);
        root.addView(top);

        TextView flow = text(screen.flow.toUpperCase(), 12, GREEN, Typeface.BOLD);
        flow.setPadding(0, dp(22), 0, dp(8));
        root.addView(flow);
        root.addView(text(screen.title, 30, INK, Typeface.BOLD));
        TextView subtitle = text(screen.description, 16, MUTED, Typeface.NORMAL);
        subtitle.setLineSpacing(dp(4), 1f);
        subtitle.setPadding(0, dp(10), 0, dp(20));
        root.addView(subtitle);

        root.addView(infoCard("GỢI Ý", cardMessage(screen)));
        root.addView(actionButton(screen.primary, GREEN));
        Button secondary = actionButton(screen.secondary, PALE_GREEN);
        secondary.setTextColor(DEEP_GREEN);
        root.addView(secondary);

        TextView section = text("Khám phá nhanh", 15, INK, Typeface.BOLD);
        section.setPadding(0, dp(16), 0, dp(8));
        root.addView(section);
        LinearLayout quick = new LinearLayout(this);
        quick.setOrientation(LinearLayout.HORIZONTAL);
        quick.addView(smallButton("Trang chủ", 6));
        quick.addView(smallButton("Đăng món", 11));
        quick.addView(smallButton("Đơn nhận", 10));
        root.addView(quick);

        LinearLayout nav = new LinearLayout(this);
        nav.setGravity(Gravity.CENTER_VERTICAL);
        nav.setPadding(0, dp(16), 0, 0);
        Button previous = actionButton("← Trước", Color.TRANSPARENT);
        previous.setTextColor(DEEP_GREEN);
        previous.setEnabled(current > 0);
        previous.setOnClickListener(v -> { if (current > 0) { current--; render(); } });
        nav.addView(previous, new LinearLayout.LayoutParams(0, dp(48), 1));
        Button next = actionButton(current == screens.length - 1 ? "Hoàn tất ✓" : "Tiếp →", GREEN);
        next.setOnClickListener(v -> { if (current < screens.length - 1) { current++; render(); } else { current = 0; render(); } });
        LinearLayout.LayoutParams nextParams = new LinearLayout.LayoutParams(0, dp(48), 1);
        nextParams.setMargins(dp(10), 0, 0, 0);
        nav.addView(next, nextParams);
        root.addView(nav);

        scroll.addView(root);
        setContentView(scroll);
    }

    private String cardMessage(Screen s) {
        if (s.flow.contains("an toàn")) return "Đảm bảo thực phẩm an toàn trước khi chuyển đến người nhận.";
        if (s.flow.contains("Xác minh")) return "Thông tin được bảo vệ và chỉ dùng để tạo niềm tin trong cộng đồng.";
        if (s.flow.contains("Tình nguyện")) return "Mỗi chuyến giao giúp bữa ăn đến đúng nơi, đúng lúc.";
        return "Thiết kế này được chọn từ Page 2 để tạo một luồng riêng, hạn chế trùng lặp.";
    }

    private LinearLayout column(int spacing) {
        LinearLayout layout = new LinearLayout(this);
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setBackgroundColor(Color.WHITE);
        return layout;
    }

    private TextView text(String value, int size, int color, int style) {
        TextView view = new TextView(this);
        view.setText(value);
        view.setTextSize(size);
        view.setTextColor(color);
        view.setTypeface(Typeface.create("sans", style));
        return view;
    }

    private LinearLayout infoCard(String label, String value) {
        LinearLayout card = column(0);
        card.setPadding(dp(16), dp(14), dp(16), dp(14));
        card.setBackgroundColor(PALE_GREEN);
        TextView tag = text(label, 11, GREEN, Typeface.BOLD);
        TextView message = text(value, 14, INK, Typeface.NORMAL);
        message.setPadding(0, dp(6), 0, 0);
        card.addView(tag);
        card.addView(message);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(-1, -2);
        params.setMargins(0, 0, 0, dp(12));
        card.setLayoutParams(params);
        return card;
    }

    private Button actionButton(String label, int background) {
        Button button = new Button(this);
        button.setAllCaps(false);
        button.setText(label);
        button.setTextSize(15);
        button.setTextColor(background == GREEN ? Color.WHITE : INK);
        button.setBackgroundColor(background);
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(-1, dp(50));
        params.setMargins(0, 0, 0, dp(10));
        button.setLayoutParams(params);
        return button;
    }

    private Button smallButton(String title, int destination) {
        Button button = new Button(this);
        button.setText(title);
        button.setAllCaps(false);
        button.setTextSize(11);
        button.setTextColor(DEEP_GREEN);
        button.setBackgroundColor(PALE_GREEN);
        button.setOnClickListener(v -> { current = destination; render(); });
        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(0, dp(46), 1);
        params.setMargins(0, 0, dp(6), 0);
        button.setLayoutParams(params);
        return button;
    }

    private int dp(int value) { return (int) (value * getResources().getDisplayMetrics().density + 0.5f); }

    private static class Screen {
        final String id, title, description, primary, secondary, flow;
        Screen(String id, String title, String description, String primary, String secondary, String flow) {
            this.id = id; this.title = title; this.description = description;
            this.primary = primary; this.secondary = secondary; this.flow = flow;
        }
    }
}
