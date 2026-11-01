import '../../../shared/interaction/food_photo.dart';
import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/frontend_actions.dart';
import '../../../shared/interaction/frontend_state.dart';

const _softGreen = Color(0xFFE3F2E9);
const _muted = Color(0xFF687C74);

class LicensePhoto extends StatelessWidget {
  const LicensePhoto({super.key});
  @override
  Widget build(BuildContext context) {
    final file =
        FigmaPrototypeScope.of(context).frontend.get('license.photo', '');
    return ClipRRect(
        borderRadius: BorderRadius.circular(20),
        child: file.isNotEmpty
            ? Image(
                image: storedMealImage(file),
                fit: BoxFit.cover,
                errorBuilder: (_, e, st) => const Center(
                    child: Icon(Icons.broken_image_outlined,
                        color: mealGreen, size: 40)))
            : const ColoredBox(
                color: Color(0xFF172713),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.description_outlined,
                          size: 70, color: Colors.white),
                      SizedBox(height: 18),
                      Text('Chưa có ảnh giấy phép',
                          style: TextStyle(
                              color: Colors.white,
                              fontSize: 17,
                              fontWeight: FontWeight.w600)),
                      SizedBox(height: 10),
                      Text('Chạm để tải ảnh hoặc chọn “Chụp lại”',
                          style:
                              TextStyle(color: Colors.white70, fontSize: 12)),
                    ])));
  }
}

class FacilityPhotos extends StatelessWidget {
  const FacilityPhotos({super.key});
  static const labels = [
    'Mặt tiền',
    'Khu chế biến',
    'Tủ lạnh',
    'Khu rửa & đồ dùng',
    'Chứng nhận ATTP',
    'Ảnh bổ sung'
  ];
  static const icons = [
    Icons.storefront_outlined,
    Icons.soup_kitchen_outlined,
    Icons.kitchen_outlined,
    Icons.wash_outlined,
    Icons.verified_outlined,
    Icons.add_photo_alternate_outlined
  ];

  Future<void> _choose(BuildContext context, String slot) async {
    final state = FigmaPrototypeScope.of(context).frontend;
    final key = 'facility.photo.$slot';
    final action = await showModalBottomSheet<String>(
        context: context,
        showDragHandle: true,
        builder: (context) => SafeArea(
                child: Column(mainAxisSize: MainAxisSize.min, children: [
              ListTile(
                  leading: const Icon(Icons.photo_library_outlined),
                  title: const Text('Chọn từ thư viện'),
                  onTap: () => Navigator.pop(context, 'pickImage')),
              ListTile(
                  leading: const Icon(Icons.camera_alt_outlined),
                  title: const Text('Chụp ảnh mới'),
                  onTap: () => Navigator.pop(context, 'camera')),
              if (state.get(key, '').isNotEmpty)
                ListTile(
                    leading: const Icon(Icons.delete_outline),
                    title: const Text('Gỡ ảnh khỏi hồ sơ'),
                    onTap: () => Navigator.pop(context, 'remove')),
            ])));
    if (action == null || !context.mounted) return;
    if (action == 'remove') {
      state.set(key, '');
      return;
    }
    await FrontendActions.run(
        context, '6:2754', {'action': action, 'key': key});
  }

  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final count = state.facilityPhotoCount;
    return ListView(padding: const EdgeInsets.only(bottom: 12), children: [
      Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
              color: _softGreen, borderRadius: BorderRadius.circular(16)),
          child: Row(children: [
            const Icon(Icons.add_a_photo_outlined, color: mealGreen, size: 30),
            const SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  const Text('5 ảnh để hoàn tất hồ sơ',
                      style: TextStyle(
                          color: mealInk,
                          fontSize: 15,
                          fontWeight: FontWeight.w600)),
                  const SizedBox(height: 5),
                  Text('$count/5 ảnh bắt buộc',
                      key: const ValueKey('facility/count'),
                      style: const TextStyle(color: mealGreen, fontSize: 13)),
                  const SizedBox(height: 8),
                  LinearProgressIndicator(
                      value: count / 5,
                      minHeight: 5,
                      color: mealGreen,
                      backgroundColor: Colors.white,
                      borderRadius: BorderRadius.circular(8)),
                ])),
          ])),
      const SizedBox(height: 14),
      GridView.builder(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          itemCount: 6,
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: 12,
              crossAxisSpacing: 14,
              childAspectRatio: 1.12),
          itemBuilder: (context, index) {
            final slot =
                index < 5 ? FrontendState.facilitySlots[index] : 'extra';
            final file = state.get('facility.photo.$slot', '');
            return Material(
                color: Colors.white,
                shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                    side: BorderSide(
                        color: file.isNotEmpty
                            ? mealGreen
                            : const Color(0xFFDCE7DF))),
                clipBehavior: Clip.antiAlias,
                child: InkWell(
                    key: ValueKey('facility/slot/$slot'),
                    onTap: () => _choose(context, slot),
                    child: Stack(fit: StackFit.expand, children: [
                      if (file.isNotEmpty)
                        Image(
                            image: storedMealImage(file),
                            fit: BoxFit.cover,
                            errorBuilder: (_, e, st) => const Center(
                                child: Icon(Icons.broken_image_outlined,
                                    color: mealGreen, size: 32))),
                      if (file.isEmpty)
                        Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              CircleAvatar(
                                  radius: 23,
                                  backgroundColor: _softGreen,
                                  child: Icon(icons[index],
                                      color: mealGreen, size: 25)),
                              const SizedBox(height: 9),
                              Text(labels[index],
                                  textAlign: TextAlign.center,
                                  style: const TextStyle(
                                      color: mealGreen,
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600)),
                              const SizedBox(height: 5),
                              Text(
                                  index < 5
                                      ? 'Bắt buộc · Thêm ảnh'
                                      : 'Không bắt buộc',
                                  style: const TextStyle(
                                      color: _muted, fontSize: 11)),
                            ]),
                      if (file.isNotEmpty) ...[
                        Positioned(
                            bottom: 8,
                            left: 8,
                            right: 8,
                            child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 5),
                                decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(8)),
                                child: Text(labels[index],
                                    style: const TextStyle(
                                        color: mealInk,
                                        fontSize: 12,
                                        fontWeight: FontWeight.w600)))),
                        const Positioned(
                            top: 8,
                            right: 8,
                            child: CircleAvatar(
                                radius: 12,
                                backgroundColor: mealGreen,
                                child: Icon(Icons.check,
                                    size: 17, color: Colors.white))),
                      ]
                    ])));
          }),
      const SizedBox(height: 12),
      const Text(
          'Chạm ô để chụp hoặc tải ảnh. Chạm ảnh đã chọn để thay hoặc gỡ.',
          style: TextStyle(color: _muted, fontSize: 12, height: 1.5)),
    ]);
  }
}

class SafetyCommitments extends StatelessWidget {
  const SafetyCommitments({super.key});
  static const titles = [
    'Thực phẩm còn an toàn',
    'Khai báo đúng & đủ',
    'Đóng gói sạch, có nhãn',
    'Đồng ý quy định kiểm duyệt'
  ];
  static const descriptions = [
    'Chỉ đăng thực phẩm còn hạn sử dụng, chưa ăn dở và chưa bị chạm vào.',
    'Khai báo đầy đủ thành phần có thể gây dị ứng và nhiệt độ bảo quản đúng thực tế.',
    'Đóng trong hộp sạch, có nắp, dán nhãn giờ chế biến và hạn dùng.',
    'Chấp nhận để ShareMeal gỡ tin và tạm khóa tài khoản nếu có báo cáo vi phạm đã được xác minh.',
  ];
  static const icons = [
    Icons.health_and_safety_outlined,
    Icons.info_outline,
    Icons.inventory_2_outlined,
    Icons.policy_outlined
  ];
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    return ListView(padding: const EdgeInsets.only(bottom: 16), children: [
      Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
              color: _softGreen, borderRadius: BorderRadius.circular(20)),
          child: Row(children: [
            SizedBox(
                width: 65,
                height: 65,
                child: Stack(alignment: Alignment.center, children: [
                  SizedBox(
                      width: 60,
                      height: 60,
                      child: CircularProgressIndicator(
                          value: state.commitmentCount / 4,
                          strokeWidth: 5,
                          color: mealGreen,
                          backgroundColor: Colors.white)),
                  const Icon(Icons.volunteer_activism_outlined,
                      color: mealGreen, size: 30),
                ])),
            const SizedBox(width: 16),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  const Text('Chia sẻ có trách nhiệm',
                      style: TextStyle(
                          color: mealInk,
                          fontWeight: FontWeight.w600,
                          fontSize: 17)),
                  const SizedBox(height: 7),
                  Text('${state.commitmentCount}/4 cam kết đã xác nhận',
                      style: const TextStyle(color: mealGreen, fontSize: 13)),
                ]))
          ])),
      const SizedBox(height: 16),
      for (var i = 0; i < 4; i++)
        Padding(
            padding: const EdgeInsets.only(bottom: 12),
            child: _CommitmentTile(index: i)),
      const Text(
          'Bạn có thể bỏ tích để xem lại. Hồ sơ chỉ được gửi khi xác nhận đủ cả 4 mục.',
          style: TextStyle(color: _muted, fontSize: 12, height: 1.5)),
    ]);
  }
}

class _CommitmentTile extends StatelessWidget {
  const _CommitmentTile({required this.index});
  final int index;
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final key = 'onboarding.commitment.${FrontendState.commitmentKeys[index]}';
    final selected = state.get(key, false);
    return Material(
        color: Colors.white,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(16),
            side: BorderSide(
                color: selected ? mealGreen : const Color(0xFFDCE7DF))),
        child: Column(children: [
          CheckboxListTile(
              key:
                  ValueKey('commitment/${FrontendState.commitmentKeys[index]}'),
              value: selected,
              activeColor: mealGreen,
              controlAffinity: ListTileControlAffinity.trailing,
              contentPadding: const EdgeInsets.fromLTRB(12, 6, 8, 0),
              secondary: CircleAvatar(
                  radius: 19,
                  backgroundColor: _softGreen,
                  child: Icon(SafetyCommitments.icons[index],
                      color: mealGreen, size: 22)),
              title: Text(SafetyCommitments.titles[index],
                  style: const TextStyle(
                      color: mealInk,
                      fontSize: 14,
                      fontWeight: FontWeight.w600)),
              onChanged: (_) => state.toggle(key)),
          ExpansionTile(
              tilePadding: const EdgeInsets.symmetric(horizontal: 16),
              dense: true,
              visualDensity: VisualDensity.compact,
              shape: const Border(),
              collapsedShape: const Border(),
              title: const Text('Đọc nội dung cam kết',
                  style: TextStyle(color: _muted, fontSize: 12)),
              childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
              children: [
                Text(SafetyCommitments.descriptions[index],
                    style: const TextStyle(
                        color: mealInk, fontSize: 13, height: 1.5))
              ]),
        ]));
  }
}

class LicenseFields extends StatelessWidget {
  const LicenseFields({super.key});
  static const fields = [
    ['name', 'Tên đơn vị', 'Bếp Nhà Lan', 'text'],
    ['tax', 'Mã số thuế', '0312 458 971', 'number'],
    ['issued', 'Ngày cấp', '2023-03-14', 'date'],
    ['type', 'Loại hình', 'Quán ăn, nhà hàng', 'text'],
  ];
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Row(children: [
        Icon(Icons.fact_check_outlined, color: mealGreen, size: 23),
        SizedBox(width: 8),
        Expanded(
            child: Text('Kiểm tra thông tin giấy phép',
                style: TextStyle(
                    fontSize: 15, fontWeight: FontWeight.w600, color: mealInk)))
      ]),
      const SizedBox(height: 8),
      for (final field in fields)
        Expanded(
            child: Material(
                color: Colors.transparent,
                child: InkWell(
                    key: ValueKey('license/edit/${field[0]}'),
                    borderRadius: BorderRadius.circular(10),
                    onTap: () => FrontendActions.run(context, '6:2711', {
                          'action': 'editField',
                          'key': 'license.${field[0]}',
                          'label': field[1],
                          'initial': field[2],
                          'mode': field[3]
                        }),
                    child: Row(children: [
                      SizedBox(
                          width: 105,
                          child: Text(field[1],
                              style: const TextStyle(
                                  fontSize: 13, color: _muted))),
                      Expanded(
                          child: Text(
                              _display(
                                  state.get('license.${field[0]}', field[2]),
                                  field[3]),
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w600,
                                  color: mealInk))),
                      const SizedBox(width: 8),
                      const Icon(Icons.edit_outlined,
                          color: mealGreen, size: 21),
                      const SizedBox(width: 5),
                    ])))),
    ]);
  }

  String _display(String value, String mode) {
    final date = mode == 'date' ? DateTime.tryParse(value) : null;
    return date == null
        ? value
        : '${date.day.toString().padLeft(2, '0')}/${date.month.toString().padLeft(2, '0')}/${date.year}';
  }
}
