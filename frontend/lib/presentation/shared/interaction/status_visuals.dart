import 'package:flutter/material.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'interaction_values.dart';
import '../controllers/firebase_app_state.dart';

/// Compact visual summaries; details stay available in the surrounding screen.
class VerificationHero extends StatelessWidget {
  const VerificationHero({super.key});
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final status = state is FirebaseAppState
        ? state.profile['verificationStatus']
        : 'pending';
    final title = switch (status) {
      'approved' => 'Đã được\nphê duyệt',
      'rejected' => 'Hồ sơ\nbị từ chối',
      'supplement' => 'Cần bổ sung\nhồ sơ',
      'draft' => 'Chưa gửi\nhồ sơ',
      _ => 'Đang chờ\nkiểm tra'
    };
    final application = state is FirebaseAppState
        ? state
                .rows('applications')
                .where((a) => a['id'] == state.profile['applicationId'])
                .firstOrNull ??
            <String, dynamic>{}
        : <String, dynamic>{};
    final note = application['note']?.toString() ??
        (state is FirebaseAppState
            ? 'Kết quả cập nhật trong Thông báo.'
            : 'Kết quả sẽ có trong Thông báo. Bản hiện tại đang kiểm thử trên thiết bị.');
    return Container(
        padding: const EdgeInsets.all(22),
        decoration: BoxDecoration(
            color: const Color(0xFF123F32),
            borderRadius: BorderRadius.circular(20)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Container(
                width: 76,
                height: 80,
                decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(14)),
                child: const Stack(alignment: Alignment.center, children: [
                  Icon(Icons.description_outlined, color: mealGreen, size: 53),
                  Positioned(
                      bottom: 0,
                      right: 0,
                      child: CircleAvatar(
                          radius: 17,
                          backgroundColor: Color(0xFFE3F2E9),
                          child: Icon(Icons.schedule,
                              color: mealGreen, size: 23))),
                ])),
            const SizedBox(width: 20),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text('ĐÃ NHẬN HỒ SƠ',
                      style: TextStyle(
                          color: Color(0xFFB8DDCA),
                          fontSize: 11,
                          fontWeight: FontWeight.w600)),
                  SizedBox(height: 8),
                  Text(title,
                      style: const TextStyle(
                          color: Colors.white,
                          fontSize: 24,
                          height: 1.2,
                          fontWeight: FontWeight.w700)),
                ]))
          ]),
          const SizedBox(height: 20),
          const Text('Cảm ơn bạn đã hoàn tất hồ sơ.',
              style: TextStyle(
                  color: Colors.white,
                  fontSize: 15,
                  fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          Flexible(
              child: Text(note,
                  maxLines: 3,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      color: Color(0xFFD8EAE0), fontSize: 12, height: 1.5))),
        ]));
  }
}

class PackagingStep extends StatelessWidget {
  const PackagingStep({super.key, required this.index});
  final int index;
  @override
  Widget build(BuildContext context) {
    final state = FigmaPrototypeScope.of(context).frontend;
    final cold = state.get('packaging.type', 'Món nóng') == 'Đồ lạnh';
    final icons = [
      cold ? Icons.ac_unit : Icons.device_thermostat,
      Icons.takeout_dining_outlined,
      Icons.inventory_2_outlined,
      Icons.sell_outlined
    ];
    return Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFDCE7DF))),
        child: Row(children: [
          Container(
              width: 52,
              height: 62,
              decoration: BoxDecoration(
                  color: const Color(0xFFE3F2E9),
                  borderRadius: BorderRadius.circular(14)),
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(icons[index], color: mealGreen, size: 29),
                    const SizedBox(height: 2),
                    Text('${index + 1}/4',
                        style: const TextStyle(
                            color: mealGreen,
                            fontSize: 10,
                            fontWeight: FontWeight.w600))
                  ])),
          const SizedBox(width: 12),
          Expanded(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                Text(computedText(state, 'guide.title.$index'),
                    style: const TextStyle(
                        color: mealInk,
                        fontSize: 14,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 5),
                Text(computedText(state, 'guide.body.$index'),
                    style: const TextStyle(
                        color: Color(0xFF687C74), fontSize: 12, height: 1.35)),
              ]))
        ]));
  }
}
