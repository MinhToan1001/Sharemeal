import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/food_photo.dart';
import '../../../shared/interaction/meal_map.dart';

class DeliveryJobsContent extends StatelessWidget {
  const DeliveryJobsContent({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final filter = s.get('jobs.filter', 'Gần nhất');
    final map = s.get('jobs.view', 'Danh sách') == 'Bản đồ';
    final jobs = s.orders
        .where((o) => o.status == 'accepted' && o.transport != 'Tự đến lấy')
        .where((o) {
      final food = s.foods.firstWhere((f) => f.id == o.foodId);
      return filter == 'Có tủ Lạnh'
          ? food.storage == 'Để lạnh'
          : filter == 'Dưới 3 km'
              ? food.distance < 3
              : filter == 'Cần gấp'
                  ? o.quantity >= 15
                  : true;
    }).toList()
      ..sort((a, b) => s.foods
          .firstWhere((f) => f.id == a.foodId)
          .distance
          .compareTo(s.foods.firstWhere((f) => f.id == b.foodId).distance));
    return Column(children: [
      Padding(
          padding: const EdgeInsets.fromLTRB(20, 28, 20, 10),
          child: Row(children: [
            const Expanded(
                child: Text('Việc cần giao',
                    style: TextStyle(
                        fontSize: 23,
                        fontWeight: FontWeight.w700,
                        color: mealInk))),
            ToggleButtons(
                isSelected: [!map, map],
                borderRadius: BorderRadius.circular(10),
                constraints: const BoxConstraints(minHeight: 36, minWidth: 54),
                selectedColor: mealGreen,
                fillColor: const Color(0xFFE3F2E9),
                onPressed: (i) =>
                    s.set('jobs.view', i == 0 ? 'Danh sách' : 'Bản đồ'),
                children: const [
                  Icon(Icons.view_list_outlined, size: 20),
                  Icon(Icons.map_outlined, size: 20)
                ]),
          ])),
      SizedBox(
          height: 52,
          child: SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(children: [
                for (final label in [
                  'Gần nhất',
                  'Cần gấp',
                  'Dưới 3 km',
                  'Có tủ Lạnh'
                ])
                  Padding(
                      padding: const EdgeInsets.only(right: 8),
                      child: ChoiceChip(
                          key: ValueKey('jobs/filter/$label'),
                          label:
                              Text(label, style: const TextStyle(fontSize: 12)),
                          selected: filter == label,
                          onSelected: (_) => s.set('jobs.filter', label),
                          selectedColor: const Color(0xFFE3F2E9),
                          showCheckmark: false))
              ]))),
      Expanded(
          child: ListView(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 18),
              children: [
            if (map) ...[
              const MealMap(height: 260),
              const SizedBox(height: 16)
            ],
            Text('${jobs.length} chuyến phù hợp',
                style: const TextStyle(fontSize: 13, color: Color(0xFF687C74))),
            const SizedBox(height: 12),
            if (jobs.isEmpty)
              const Padding(
                  padding: EdgeInsets.all(28),
                  child: Column(children: [
                    Icon(Icons.local_shipping_outlined,
                        size: 52, color: mealGreen),
                    SizedBox(height: 12),
                    Text('Chưa có chuyến theo bộ lọc này',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: mealInk, fontSize: 15))
                  ])),
            for (final order in jobs)
              Padding(
                  padding: const EdgeInsets.only(bottom: 14),
                  child: Material(
                      color: Colors.white,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18),
                          side: const BorderSide(color: Color(0xFFDCE7DF))),
                      clipBehavior: Clip.antiAlias,
                      child: InkWell(
                          key: ValueKey('job/${order.id}'),
                          onTap: () {
                            s.selectOrder(order.id);
                            Navigator.pushNamed(
                                context, '/user/volunteer/job-detail');
                          },
                          child: Padding(
                              padding: const EdgeInsets.all(14),
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Row(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          SizedBox(
                                              width: 92,
                                              height: 92,
                                              child: FoodPhoto.listing(s.foods
                                                  .firstWhere((f) =>
                                                      f.id == order.foodId))),
                                          const SizedBox(width: 12),
                                          Expanded(
                                              child: Column(
                                                  crossAxisAlignment:
                                                      CrossAxisAlignment.start,
                                                  children: [
                                                Text(
                                                    s.foods
                                                        .firstWhere((f) =>
                                                            f.id ==
                                                            order.foodId)
                                                        .name,
                                                    style: const TextStyle(
                                                        fontSize: 16,
                                                        fontWeight:
                                                            FontWeight.w700,
                                                        color: mealInk)),
                                                const SizedBox(height: 7),
                                                Text(
                                                    '${order.quantity} suất · ${order.time}',
                                                    style: const TextStyle(
                                                        fontSize: 13,
                                                        color: mealGreen)),
                                                const SizedBox(height: 8),
                                                Text('#${order.id}',
                                                    style: const TextStyle(
                                                        fontSize: 11,
                                                        color:
                                                            Color(0xFF687C74)))
                                              ]))
                                        ]),
                                    const SizedBox(height: 14),
                                    _RouteStop(
                                        icon: Icons.storefront_outlined,
                                        title: s.foods
                                            .firstWhere(
                                                (f) => f.id == order.foodId)
                                            .donor),
                                    const SizedBox(height: 8),
                                    _RouteStop(
                                        icon: Icons.favorite_border,
                                        title: order.organization),
                                    const SizedBox(height: 14),
                                    Row(children: [
                                      const Icon(Icons.near_me_outlined,
                                          size: 16, color: mealGreen),
                                      const SizedBox(width: 6),
                                      Expanded(
                                          child: Text(
                                              '${s.foods.firstWhere((f) => f.id == order.foodId).distance} km đến điểm lấy',
                                              style: const TextStyle(
                                                  fontSize: 12,
                                                  color: Color(0xFF687C74)))),
                                      const Text('Xem chuyến →',
                                          style: TextStyle(
                                              fontSize: 12,
                                              color: mealGreen,
                                              fontWeight: FontWeight.w600))
                                    ]),
                                  ]))))),
          ])),
      const SizedBox(
          height: 67,
          child: MealBottomBar(role: 'volunteer', page: 'available_jobs')),
    ]);
  }
}

class _RouteStop extends StatelessWidget {
  const _RouteStop({required this.icon, required this.title});
  final IconData icon;
  final String title;
  @override
  Widget build(BuildContext context) => Row(children: [
        Icon(icon, size: 18, color: mealGreen),
        const SizedBox(width: 10),
        Expanded(
            child: Text(title,
                style: const TextStyle(color: mealInk, fontSize: 13)))
      ]);
}
