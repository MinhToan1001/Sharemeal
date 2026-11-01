import 'package:flutter/material.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'profile_summary.dart';
import 'frontend_actions.dart';
import 'package:url_launcher/url_launcher.dart';

class ProfilePageContent extends StatelessWidget {
  const ProfilePageContent({super.key});
  @override
  Widget build(BuildContext context) {
    final c = FigmaPrototypeScope.of(context);
    final role = c.values['VariableID:80:1172']?.toString() ?? 'donor';
    Widget item(
            IconData icon, String title, String subtitle, VoidCallback onTap) =>
        ListTile(
            dense: true,
            minTileHeight: 52,
            visualDensity: const VisualDensity(vertical: -2),
            leading: Icon(icon, color: mealGreen),
            title: Text(title,
                style: const TextStyle(
                    fontSize: 14, color: mealInk, fontWeight: FontWeight.w600)),
            subtitle: Text(subtitle,
                style: const TextStyle(fontSize: 11, color: Color(0xFF687C74))),
            trailing:
                const Icon(Icons.chevron_right, size: 20, color: mealGreen),
            onTap: onTap);
    Widget section(List<Widget> children) => Padding(
        padding: const EdgeInsets.only(bottom: 14),
        child: Material(
            color: Colors.white,
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(18),
                side: const BorderSide(color: Color(0xFFDCE7DF))),
            clipBehavior: Clip.antiAlias,
            child: Column(children: children)));
    void go(String route) => Navigator.pushNamed(context, route);
    void info() => showMealSheet(
        context,
        'Thông tin & giấy phép',
        Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text(
              'Bản đồ sử dụng Google Maps. Các ảnh món mặc định là ảnh minh họa; ảnh do người dùng tải lên được ưu tiên.',
              style: TextStyle(color: mealInk, fontSize: 14, height: 1.5)),
          TextButton(
              onPressed: () => launchUrl(
                  Uri.parse(
                      'https://www.google.com/intl/en_US/help/terms_maps/'),
                  mode: LaunchMode.externalApplication),
              child: const Text('Điều khoản Google Maps')),
          TextButton(
              onPressed: () => launchUrl(
                  Uri.parse('https://policies.google.com/privacy'),
                  mode: LaunchMode.externalApplication),
              child: const Text('Chính sách quyền riêng tư Google')),
          TextButton(
              onPressed: () => showLicensePage(
                  context: context, applicationName: 'ShareMeal'),
              child: const Text('Giấy phép thư viện mã nguồn mở')),
        ]));
    return PopScope(
        canPop: Navigator.canPop(context),
        onPopInvokedWithResult: (didPop, _) {
          if (!didPop) mealBack(context);
        },
        child: Column(children: [
          Padding(
              padding: const EdgeInsets.fromLTRB(10, 28, 20, 14),
              child: Row(children: [
                IconButton(
                    key: const ValueKey('profile/back'),
                    tooltip: 'Quay lại',
                    onPressed: () => mealBack(context),
                    icon: const Icon(Icons.arrow_back_ios_new,
                        size: 20, color: mealInk)),
                const SizedBox(width: 4),
                const Expanded(
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text('Hồ sơ của tôi',
                          style: TextStyle(
                              color: mealInk,
                              fontSize: 23,
                              fontWeight: FontWeight.w700)),
                      SizedBox(height: 5),
                      Text('Tài khoản & đóng góp của bạn',
                          style:
                              TextStyle(color: Color(0xFF687C74), fontSize: 12))
                    ]))
              ])),
          Expanded(
              child: ListView(
                  padding: const EdgeInsets.fromLTRB(20, 8, 20, 20),
                  children: [
                const SizedBox(height: 122, child: ProfileSummary()),
                const SizedBox(height: 16),
                section([
                  item(
                      Icons.volunteer_activism_outlined,
                      'Vai trò của tôi',
                      'Chuyển vai trò hoặc bổ sung hồ sơ',
                      () => go('/shared/role-management')),
                  item(
                      Icons.verified_user_outlined,
                      'Giấy tờ & xác minh',
                      'Xem trạng thái hồ sơ',
                      () => go('/shared/verification-pending')),
                ]),
                section([
                  item(
                      Icons.location_on_outlined,
                      'Địa chỉ & điểm nhận',
                      'Cập nhật nơi trao thực phẩm',
                      () => FrontendActions.run(context, '6:2504',
                          {'action': 'editAddress', 'key': 'food.address'})),
                  item(
                      Icons.bar_chart_outlined,
                      role == 'volunteer'
                          ? 'Huy hiệu & đóng góp'
                          : 'Báo cáo tác động',
                      role == 'volunteer'
                          ? 'Chuyến giao và dấu mốc của bạn'
                          : 'Suất ăn và đơn đã hoàn tất',
                      () => go(role == 'donor'
                          ? '/user/donor/impact-report'
                          : role == 'volunteer'
                              ? '/user/volunteer/badges'
                              : '/user/organization/impact-report')),
                  item(
                      Icons.support_agent_outlined,
                      'Trung tâm hỗ trợ',
                      'Theo dõi các yêu cầu hỗ trợ',
                      () => go('/shared/support')),
                  item(
                      Icons.notifications_outlined,
                      'Cài đặt thông báo',
                      'Nhắc chuyến & cập nhật xác minh',
                      () => go('/shared/settings')),
                  item(Icons.info_outline, 'Thông tin & giấy phép',
                      'Thông tin sử dụng bản đồ và thư viện', info),
                ]),
                OutlinedButton.icon(
                    key: const ValueKey('profile/logout'),
                    onPressed: () => FrontendActions.run(
                        context, '6:2504', {'action': 'logout'}),
                    icon: const Icon(Icons.logout, size: 20),
                    label: const Text('Đăng xuất')),
              ])),
          const SizedBox(
              height: 67,
              child: MealBottomBar(role: 'current', page: 'profile')),
        ]));
  }
}
