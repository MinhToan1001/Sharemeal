import 'dart:convert';
import 'package:flutter/material.dart';
import '../../../data/repositories/firebase_app_state.dart';
import '../../shared/figma/figma_prototype_controller.dart';
import '../../shared/interaction/app_navigation.dart';
import '../../shared/interaction/frontend_actions.dart';
import '../../shared/interaction/live_screen_data.dart';
import '../../shared/interaction/media_gallery.dart';

class AdminReviewContent extends StatelessWidget {
  const AdminReviewContent({super.key, required this.frame});
  final String frame;
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final row = LiveScreenData.selected(s);
    final kind = s.get('admin.selection.kind', 'applications');
    final food = kind == 'foods', need = kind == 'needs';
    final role = '${row['role'] ?? ''}';
    Map<String, dynamic> d = {};
    try {
      d = Map<String, dynamic>.from(jsonDecode('${row['details']}') as Map);
    } catch (_) {}
    final user = s
            .rows('accounts')
            .where((u) => u['uid'] == (row['uid'] ?? row['donorId']))
            .firstOrNull ??
        {};
    String detail(List<String> keys, [dynamic fallback]) {
      for (final k in keys) {
        final v = d[k];
        if (v != null && '$v'.trim().isNotEmpty) return '$v';
      }
      return fallback == null || '$fallback'.isEmpty
          ? 'Chưa cung cấp'
          : '$fallback';
    }

    final name = '${row['name'] ?? row['title'] ?? 'Chưa chọn hồ sơ'}';
    final heading = food
        ? 'Duyệt món ăn'
        : need
            ? 'Duyệt nhu cầu'
            : 'Duyệt hồ sơ ${LiveScreenData.roleName(role).toLowerCase()}';
    final fields = <String, String>{};
    final checks = <String>[];
    if (food) {
      fields.addAll({
        'Tên món': name,
        'Người cho': '${row['donor'] ?? ''}',
        'Số lượng': '${row['quantity'] ?? 0} suất',
        'Nhóm thực phẩm': '${row['category'] ?? ''}',
        'Bảo quản': '${row['storage'] ?? ''}',
        'Địa điểm lấy': '${row['address'] ?? ''}',
        'Giờ lấy': '${row['pickup'] ?? ''}',
        'Hạn dùng': _date(row['expiresAt']),
        'Thành phần dị ứng': (row['allergens'] as List? ?? []).isEmpty
            ? 'Không khai báo'
            : (row['allergens'] as List).join(', '),
        'Ghi chú': '${row['note'] ?? ''}',
        'Cam kết an toàn': row['safe'] == true ? 'Đã xác nhận' : 'Chưa xác nhận'
      });
      checks.addAll([
        'Ảnh và mô tả đúng món ăn được chia sẻ',
        'Hạn dùng, bảo quản và giờ lấy còn phù hợp',
        'Số lượng, dị ứng và cam kết an toàn đã kiểm tra'
      ]);
    } else if (need) {
      fields.addAll({
        'Nội dung nhu cầu': name,
        'Tổ chức': '${user['name'] ?? ''}',
        'Số lượng cần': '${row['quantity'] ?? 0} suất',
        'Nhóm thực phẩm': '${row['category'] ?? ''}',
        'Mức ưu tiên': '${row['priority'] ?? ''}'
      });
      checks.addAll([
        'Tổ chức và nhu cầu đã đối chiếu',
        'Số lượng và nhóm thực phẩm phù hợp',
        'Nội dung tiếp nhận và phân phát rõ ràng'
      ]);
    } else if (role == 'charity') {
      fields.addAll({
        'Tên tổ chức':
            detail(['profile.organization.name', 'profile.name'], name),
        'Địa chỉ nhận': detail(
            ['profile.organization.address', 'profile.address'],
            user['address']),
        'Email liên hệ': detail(['profile.email'], user['email']),
        'Điện thoại': detail(['profile.phone'], user['phone'])
      });
      checks.addAll([
        'Tên tổ chức và địa điểm nhận khớp tài liệu',
        'Giấy phép hoặc xác nhận tổ chức đọc được và phù hợp',
        'Ảnh nơi nhận, bảo quản và cam kết tiếp nhận đã kiểm tra'
      ]);
    } else if (role == 'volunteer') {
      fields.addAll({
        'Họ tên': detail(['profile.volunteer.name', 'profile.name'], name),
        'Khu vực hoạt động': detail(
            ['profile.volunteer.address', 'profile.address'], user['address']),
        'Thông tin phương tiện': detail(['profile.vehicle']),
        'Điện thoại': detail(['profile.phone'], user['phone']),
        'Email': detail(['profile.email'], user['email'])
      });
      checks.addAll([
        'Họ tên và ảnh giấy tờ tùy thân đã đối chiếu',
        'Giấy tờ và phương tiện đủ thông tin để xác minh',
        'Cam kết giữ kín thực phẩm và giao đúng người nhận đã kiểm tra'
      ]);
    } else {
      final business = detail(['license.name'], '') != 'Chưa cung cấp';
      fields.addAll({
        'Người đại diện': detail(['profile.donor.name', 'profile.name'], name),
        if (business) ...{
          'Tên đơn vị': detail(['license.name']),
          'Mã số thuế': detail(['license.tax']),
          'Ngày cấp': detail(['license.issued']),
          'Loại hình': detail(['license.type'])
        },
        'Địa chỉ': detail(
            ['profile.donor.address', 'profile.address'], user['address']),
        'Điện thoại': detail(['profile.phone'], user['phone']),
        'Email': detail(['profile.email'], user['email'])
      });
      checks.addAll(business
          ? [
              'Tên đơn vị, mã số thuế và địa chỉ khớp tài liệu',
              'Giấy phép và toàn bộ ảnh cơ sở đã đối chiếu',
              'Cam kết an toàn, đóng gói và dị ứng đã kiểm tra'
            ]
          : [
              'Danh tính và thông tin liên hệ đã đối chiếu',
              'Giấy tờ xác minh cá nhân đọc được và phù hợp',
              'Cam kết chia sẻ thực phẩm an toàn đã kiểm tra'
            ]);
    }
    final urls = food
        ? <String>{
            if ('${row['photo'] ?? ''}'.isNotEmpty) '${row['photo']}',
            ...List<String>.from(row['photos'] as List? ?? [])
          }.toList()
        : List<String>.from(row['documents'] as List? ?? []);
    final labels = (d['documentLabels'] as Map?) ?? {};
    final pending = row['status'] == 'pending';
    final ready = pending &&
        List.generate(3, (i) => s.get('admin.audit.$frame.$i', false))
            .every((v) => v);
    Future<void> decide(String label) => FrontendActions.run(context, frame,
        {'kind': 'action', 'action': 'navigate', 'label': label});
    Widget card(Widget child) => Padding(
        padding: const EdgeInsets.only(bottom: 16),
        child: Material(
            color: Colors.white,
            borderRadius: BorderRadius.circular(18),
            child: Padding(padding: const EdgeInsets.all(16), child: child)));
    return Scaffold(
        backgroundColor: mealBackground,
        appBar: AppBar(
            backgroundColor: mealBackground,
            title: Text(heading, style: const TextStyle(fontSize: 19)),
            leading: IconButton(
                tooltip: 'Quay lại',
                onPressed: () => mealBack(context),
                icon: const Icon(Icons.arrow_back_ios_new, size: 20))),
        body: ListView(
            padding: const EdgeInsets.fromLTRB(22, 8, 22, 24),
            children: [
              Text(name,
                  style: const TextStyle(
                      color: mealInk,
                      fontSize: 22,
                      fontWeight: FontWeight.w700)),
              const SizedBox(height: 6),
              Text(
                  pending
                      ? 'Chờ kiểm tra và phê duyệt'
                      : LiveScreenData.status(row['status']),
                  style: const TextStyle(color: Color(0xFF687C74))),
              const SizedBox(height: 18),
              card(Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                        food
                            ? 'Thông tin món ăn'
                            : need
                                ? 'Thông tin nhu cầu'
                                : 'Thông tin kê khai',
                        style: const TextStyle(
                            color: mealInk,
                            fontSize: 16,
                            fontWeight: FontWeight.w600)),
                    for (final e in fields.entries)
                      Padding(
                          padding: const EdgeInsets.only(top: 12),
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(e.key,
                                    style: const TextStyle(
                                        fontSize: 12,
                                        color: Color(0xFF687C74))),
                                const SizedBox(height: 4),
                                SelectableText(
                                    e.value.isEmpty ? 'Chưa cung cấp' : e.value,
                                    style: const TextStyle(
                                        color: mealInk,
                                        fontSize: 14,
                                        height: 1.4))
                              ]))
                  ])),
              if (!need)
                card(Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                          food
                              ? 'Ảnh món ăn'
                              : 'Tài liệu xác minh · ${urls.length} tệp',
                          style: const TextStyle(
                              fontWeight: FontWeight.w600, color: mealInk)),
                      const SizedBox(height: 12),
                      MediaGallery(
                          key: ValueKey('review-media/${row['id']}'),
                          urls: urls,
                          labels: [
                            for (var i = 0; i < urls.length; i++)
                              '${labels[urls[i]] ?? (food ? 'Ảnh món ăn ${i + 1}' : 'Tài liệu ${i + 1}')}'
                          ])
                    ])),
              card(Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Điều kiện phê duyệt',
                        style: TextStyle(
                            fontWeight: FontWeight.w600,
                            color: mealInk,
                            fontSize: 16)),
                    for (var i = 0; i < checks.length; i++)
                      CheckboxListTile(
                          key: ValueKey('review/check/$i'),
                          contentPadding: EdgeInsets.zero,
                          controlAffinity: ListTileControlAffinity.leading,
                          activeColor: mealGreen,
                          value: s.get('admin.audit.$frame.$i', false),
                          onChanged: pending
                              ? (v) =>
                                  s.set('admin.audit.$frame.$i', v ?? false)
                              : null,
                          title: Text(checks[i],
                              style: const TextStyle(
                                  color: mealInk, fontSize: 13, height: 1.4)))
                  ])),
              if ('${row['reviewNote'] ?? row['note'] ?? ''}'.isNotEmpty)
                card(Text('${row['reviewNote'] ?? row['note']}')),
            ]),
        bottomNavigationBar: SafeArea(
            child: Padding(
                padding: const EdgeInsets.fromLTRB(22, 8, 22, 12),
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: FilledButton(
                          key: const ValueKey('review/approve'),
                          onPressed:
                              ready ? () => decide('Phê duyệt hồ sơ') : null,
                          child: Text(food
                              ? 'Phê duyệt món ăn'
                              : need
                                  ? 'Phê duyệt nhu cầu'
                                  : 'Phê duyệt hồ sơ'))),
                  const SizedBox(height: 8),
                  Row(children: [
                    if (!food && !need)
                      Expanded(
                          child: OutlinedButton(
                              onPressed: pending
                                  ? () => decide('Yêu cầu bổ sung')
                                  : null,
                              child: const Text('Yêu cầu bổ sung'))),
                    if (!food && !need) const SizedBox(width: 12),
                    Expanded(
                        child: OutlinedButton(
                            onPressed: pending ? () => decide('Từ chối') : null,
                            child: const Text('Từ chối')))
                  ])
                ]))));
  }

  String _date(dynamic value) {
    final d = DateTime.tryParse('$value')?.toLocal();
    return d == null
        ? 'Chưa cung cấp'
        : '${d.day}/${d.month}/${d.year} ${d.hour.toString().padLeft(2, '0')}:${d.minute.toString().padLeft(2, '0')}';
  }
}
