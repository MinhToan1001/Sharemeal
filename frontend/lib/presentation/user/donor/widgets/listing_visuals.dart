import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/food_photo.dart';
import '../../../shared/interaction/frontend_actions.dart';

class ListingSummary extends StatelessWidget {
  const ListingSummary({super.key});
  @override
  Widget build(BuildContext context) {
    final food = FigmaPrototypeScope.of(context).frontend.selectedFood;
    return Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        clipBehavior: Clip.antiAlias,
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          SizedBox(
              height: 176,
              width: double.infinity,
              child: FoodPhoto.listing(food, radius: 0)),
          Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(food.name,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.w700,
                            color: mealInk)),
                    const SizedBox(height: 8),
                    Row(children: [
                      _Badge('${food.quantity} suất'),
                      const SizedBox(width: 8),
                      _Badge(food.storage)
                    ]),
                    const SizedBox(height: 12),
                    Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Icon(Icons.place_outlined,
                              color: mealGreen, size: 18),
                          const SizedBox(width: 6),
                          Expanded(
                              child: Text(food.address,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: const TextStyle(
                                      fontSize: 12, color: Color(0xFF687C74))))
                        ]),
                    const SizedBox(height: 8),
                    Row(children: [
                      const Icon(Icons.schedule, color: mealGreen, size: 18),
                      const SizedBox(width: 6),
                      Text(food.pickup,
                          style: const TextStyle(fontSize: 12, color: mealInk))
                    ]),
                  ])),
        ]));
  }
}

class ListingRequestsPrompt extends StatelessWidget {
  const ListingRequestsPrompt({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final count = s.orders
        .where((o) => o.status == 'awaiting' && o.foodId == s.selectedFood.id)
        .length;
    return Material(
        color: const Color(0xFFFFF0D7),
        borderRadius: BorderRadius.circular(16),
        child: InkWell(
            borderRadius: BorderRadius.circular(16),
            onTap: () =>
                Navigator.pushNamed(context, '/user/donor/incoming-requests'),
            child: Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                child: Row(children: [
                  const Icon(Icons.mark_email_unread_outlined,
                      color: mealGreen, size: 28),
                  const SizedBox(width: 12),
                  Expanded(
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                        Text('$count yêu cầu cho tin này',
                            style: const TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.w600,
                                color: mealInk)),
                        const SizedBox(height: 4),
                        const Text('Xem các yêu cầu và gợi ý ghép nối',
                            style: TextStyle(
                                fontSize: 11, color: Color(0xFF687C74)))
                      ])),
                  const Icon(Icons.chevron_right, color: mealGreen)
                ]))));
  }
}

class PublishSummary extends StatelessWidget {
  const PublishSummary({super.key});
  @override
  Widget build(BuildContext context) {
    final food = FigmaPrototypeScope.of(context).frontend.selectedFood;
    return Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
            color: mealBackground, borderRadius: BorderRadius.circular(20)),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text('Mã tin · ${food.id}',
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(fontSize: 12, color: Color(0xFF687C74))),
          const SizedBox(height: 14),
          Expanded(
              child: Row(children: [
            SizedBox(width: 118, height: 128, child: FoodPhoto.listing(food)),
            const SizedBox(width: 14),
            Expanded(
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(food.name,
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                      style: const TextStyle(
                          fontSize: 17,
                          fontWeight: FontWeight.w700,
                          color: mealInk)),
                  const SizedBox(height: 10),
                  _Badge('${food.quantity} suất'),
                  const SizedBox(height: 10),
                  Text('Giờ lấy ${food.pickup}',
                      style: const TextStyle(
                          fontSize: 12, color: Color(0xFF687C74)))
                ]))
          ])),
          const SizedBox(height: 12),
          const Row(children: [
            Icon(Icons.check_circle_outline, size: 18, color: mealGreen),
            SizedBox(width: 6),
            Expanded(
                child: Text('Tin đã được lưu trên thiết bị',
                    style: TextStyle(fontSize: 12, color: mealGreen)))
          ]),
        ]));
  }
}

class FoodSafetyHero extends StatelessWidget {
  const FoodSafetyHero({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    return Material(
        color: const Color(0xFFFFF0D7),
        borderRadius: BorderRadius.circular(20),
        child: Padding(
            padding: const EdgeInsets.all(16),
            child: Row(children: [
              SizedBox(
                  width: 92,
                  height: 128,
                  child: FoodPhoto(
                      name: s.get('food.name', 'Cơm gà xối mỡ'),
                      category: s.get('food.category', 'Cơm & món mặn'),
                      photo: s.get('food.photo', ''))),
              const SizedBox(width: 14),
              Expanded(
                  child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                    const Text('Thời gian an toàn',
                        style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                            color: mealInk)),
                    const SizedBox(height: 10),
                    for (final spec in const [
                      ['food.cooked', 'Nấu lúc', '17:00'],
                      ['food.expiry', 'Dùng trước', '23:00']
                    ])
                      InkWell(
                          key: ValueKey('food/time/${spec[0]}'),
                          onTap: () => FrontendActions.run(context, '6:416', {
                                'action': 'pickTime',
                                'key': spec[0],
                                'initial': spec[2]
                              }),
                          child: Padding(
                              padding: const EdgeInsets.symmetric(vertical: 8),
                              child: Row(children: [
                                Expanded(
                                    child: Text(
                                        '${spec[1]} ${s.get(spec[0], spec[2])}',
                                        style: TextStyle(
                                            fontSize: 13,
                                            color: spec[0] == 'food.expiry'
                                                ? const Color(0xFFAA5B00)
                                                : mealInk,
                                            fontWeight: FontWeight.w600))),
                                const Icon(Icons.edit_outlined,
                                    size: 17, color: mealGreen)
                              ]))),
                  ])),
            ])));
  }
}

class PickupDetails extends StatelessWidget {
  const PickupDetails({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    return Material(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            child: Column(children: [
              Expanded(
                  child: InkWell(
                      onTap: () => FrontendActions.run(context, '6:473', {
                            'action': 'editAddress',
                            'key': 'food.address',
                            'initial': '45 Nguyễn Thị Minh Khai, Quận 1'
                          }),
                      child: Row(children: [
                        const Icon(Icons.place_outlined, color: mealGreen),
                        const SizedBox(width: 12),
                        Expanded(
                            child: Text(
                                s.get('food.address',
                                    '45 Nguyễn Thị Minh Khai, Quận 1'),
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                    color: mealInk,
                                    fontSize: 14,
                                    fontWeight: FontWeight.w600))),
                        const Icon(Icons.edit_outlined,
                            color: mealGreen, size: 19)
                      ]))),
              const Divider(height: 1, color: Color(0xFFDCE7DF)),
              Expanded(
                  child: InkWell(
                      onTap: () => FrontendActions.run(context, '6:473', {
                            'action': 'pickTime',
                            'key': 'food.pickup',
                            'initial': '19:00'
                          }),
                      child: Row(children: [
                        const Icon(Icons.schedule, color: mealGreen),
                        const SizedBox(width: 12),
                        const Expanded(
                            child: Text('Giờ đến lấy',
                                style: TextStyle(
                                    color: Color(0xFF687C74), fontSize: 13))),
                        Text(s.get('food.pickup', '19:00–20:30'),
                            style: const TextStyle(
                                color: mealGreen,
                                fontWeight: FontWeight.w600,
                                fontSize: 13)),
                        const SizedBox(width: 8),
                        const Icon(Icons.edit_outlined,
                            size: 18, color: mealGreen)
                      ]))),
            ])));
  }
}

class _Badge extends StatelessWidget {
  const _Badge(this.text);
  final String text;
  @override
  Widget build(BuildContext context) => Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
          color: const Color(0xFFE3F2E9),
          borderRadius: BorderRadius.circular(9)),
      child: Text(text,
          style: const TextStyle(
              color: mealGreen, fontSize: 12, fontWeight: FontWeight.w600)));
}
