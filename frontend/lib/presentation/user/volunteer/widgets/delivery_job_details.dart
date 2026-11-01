import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/food_photo.dart';
import '../../../shared/interaction/meal_map.dart';
import '../../../shared/interaction/frontend_actions.dart';

class DeliveryJobDetails extends StatelessWidget {
  const DeliveryJobDetails({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final order = s.selectedOrder;
    final food = s.foods.where((f) => f.id == order.foodId).firstOrNull ??
        s.selectedFood;
    Widget place(
            IconData icon, String label, String name, String description) =>
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 12),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Icon(icon, color: mealGreen, size: 22),
            const SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(label,
                      style: const TextStyle(
                          color: Color(0xFF687C74), fontSize: 11)),
                  const SizedBox(height: 5),
                  Text(name,
                      style: const TextStyle(
                          color: mealInk,
                          fontSize: 15,
                          fontWeight: FontWeight.w600)),
                  const SizedBox(height: 5),
                  Text(description,
                      style: const TextStyle(
                          color: Color(0xFF687C74), fontSize: 12, height: 1.4)),
                ])),
          ]),
        );
    return ListView(padding: const EdgeInsets.only(bottom: 16), children: [
      const MealMap(height: 220),
      const SizedBox(height: 14),
      Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(18)),
        child: Row(children: [
          SizedBox(width: 92, height: 96, child: FoodPhoto.listing(food)),
          const SizedBox(width: 14),
          Expanded(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                Text(food.name,
                    style: const TextStyle(
                        color: mealInk,
                        fontSize: 17,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                Text('${order.quantity} suất · ${food.storage}',
                    style: const TextStyle(color: mealGreen, fontSize: 13)),
                const SizedBox(height: 7),
                Text('Giờ lấy ${order.time}',
                    style: const TextStyle(
                        color: Color(0xFF687C74), fontSize: 12)),
                const SizedBox(height: 5),
                Text('#${order.id}',
                    style: const TextStyle(
                        color: Color(0xFF687C74), fontSize: 11)),
              ])),
        ]),
      ),
      const SizedBox(height: 14),
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        decoration: BoxDecoration(
            color: Colors.white, borderRadius: BorderRadius.circular(18)),
        child: Column(children: [
          place(
              Icons.storefront_outlined, 'ĐIỂM LẤY', food.donor, food.address),
          const Divider(height: 1, color: Color(0xFFDCE7DF)),
          place(
              Icons.volunteer_activism_outlined,
              'TỔ CHỨC NHẬN',
              order.organization,
              'Xác nhận địa chỉ giao với tổ chức trước khi nhận chuyến.'),
        ]),
      ),
      const SizedBox(height: 12),
      const Text('Chưa có định tuyến hoặc thời gian di chuyển trực tiếp.',
          textAlign: TextAlign.center,
          style: TextStyle(fontSize: 11, color: Color(0xFF687C74))),
    ]);
  }
}

class CourierContact extends StatelessWidget {
  const CourierContact({super.key});
  @override
  Widget build(BuildContext context) {
    final order = FigmaPrototypeScope.of(context).frontend.selectedOrder;
    final assigned =
        ['assigned', 'pickedUp', 'completed'].contains(order.status) &&
            order.driver.isNotEmpty;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          border: Border.all(color: const Color(0xFFDCE7DF))),
      child: Row(children: [
        const CircleAvatar(
            backgroundColor: Color(0xFFE3F2E9),
            child: Icon(Icons.local_shipping_outlined, color: mealGreen)),
        const SizedBox(width: 12),
        Expanded(
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
              Text(assigned ? order.driver : 'Đang chờ người giao',
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                      color: mealInk,
                      fontSize: 15,
                      fontWeight: FontWeight.w600)),
              const SizedBox(height: 4),
              Text(
                  assigned
                      ? 'Tình nguyện viên'
                      : 'Liên hệ xuất hiện khi có người nhận',
                  style:
                      const TextStyle(color: Color(0xFF687C74), fontSize: 11)),
            ])),
        if (assigned) ...[
          IconButton(
              tooltip: 'Nhắn tin',
              onPressed: () => Navigator.pushNamed(context, '/shared/chat'),
              icon: const Icon(Icons.chat_bubble_outline, color: mealGreen)),
          IconButton(
              tooltip: 'Gọi điện',
              onPressed: () =>
                  FrontendActions.run(context, '6:661', {'action': 'call'}),
              icon: const Icon(Icons.call_outlined, color: mealGreen)),
        ],
      ]),
    );
  }
}

class PickupContact extends StatelessWidget {
  const PickupContact({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final food = s.selectedFood;
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(18)),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Row(children: [
          const Icon(Icons.storefront_outlined, color: mealGreen),
          const SizedBox(width: 10),
          Expanded(
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                Text(food.donor,
                    style: const TextStyle(
                        color: mealInk,
                        fontSize: 16,
                        fontWeight: FontWeight.w600)),
                const SizedBox(height: 5),
                Text(food.address,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                        color: Color(0xFF687C74), fontSize: 12)),
              ])),
          IconButton(
              tooltip: 'Gọi bên cho',
              onPressed: () =>
                  FrontendActions.run(context, '6:1971', {'action': 'call'}),
              icon: const Icon(Icons.call_outlined, color: mealGreen)),
        ]),
        const SizedBox(height: 12),
        Text('Giờ lấy ${s.selectedOrder.time} · ${food.storage}',
            style: const TextStyle(color: mealGreen, fontSize: 12)),
        if (food.note.isNotEmpty) ...[
          const SizedBox(height: 8),
          Text(food.note,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(color: Color(0xFF687C74), fontSize: 11)),
        ],
      ]),
    );
  }
}

class HandoverTimeline extends StatelessWidget {
  const HandoverTimeline({super.key});
  @override
  Widget build(BuildContext context) {
    final order = FigmaPrototypeScope.of(context).frontend.selectedOrder;
    final step = switch (order.status) {
      'accepted' => 1,
      'assigned' => 2,
      'pickedUp' => 3,
      'completed' => 4,
      _ => 0
    };
    const labels = [
      'Yêu cầu được gửi',
      'Người cho đã chấp nhận',
      'Tình nguyện viên nhận chuyến',
      'Đã lấy hàng',
      'Bàn giao hoàn tất'
    ];
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
          color: Colors.white, borderRadius: BorderRadius.circular(18)),
      child:
          Column(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        for (var i = 0; i < labels.length; i++)
          Row(children: [
            Icon(
                i <= step && order.status != 'cancelled'
                    ? Icons.check_circle
                    : Icons.radio_button_unchecked,
                color: i <= step && order.status != 'cancelled'
                    ? mealGreen
                    : const Color(0xFFBFCBC5),
                size: 23),
            const SizedBox(width: 14),
            Expanded(
                child: Text(
                    order.status == 'cancelled' && i == 0
                        ? 'Yêu cầu đã hủy'
                        : labels[i],
                    style: TextStyle(
                        fontSize: 13,
                        color: i <= step ? mealInk : const Color(0xFF83948C)))),
          ]),
      ]),
    );
  }
}

class DeliveryAcceptanceSummary extends StatelessWidget {
  const DeliveryAcceptanceSummary({super.key});
  @override
  Widget build(BuildContext context) {
    final o = FigmaPrototypeScope.of(context).frontend.selectedOrder;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
          color: const Color(0xFFE3F2E9),
          borderRadius: BorderRadius.circular(18)),
      child:
          Column(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        for (final row in [
          ('Số suất cần giao', '${o.quantity} suất'),
          ('Giờ lấy đã hẹn', o.time),
          ('Phương thức', o.transport)
        ])
          Row(children: [
            Expanded(
                child: Text(row.$1,
                    style: const TextStyle(
                        color: Color(0xFF687C74), fontSize: 12))),
            Text(row.$2,
                style: const TextStyle(
                    color: mealInk, fontSize: 13, fontWeight: FontWeight.w600))
          ]),
      ]),
    );
  }
}
