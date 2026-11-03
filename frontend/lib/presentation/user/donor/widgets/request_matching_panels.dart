import 'package:flutter/material.dart';
import '../../../shared/figma/figma_prototype_controller.dart';
import '../../../shared/interaction/app_navigation.dart';
import '../../../shared/interaction/food_photo.dart';
import '../../../shared/interaction/frontend_actions.dart';
import '../../../shared/interaction/frontend_state.dart';
import '../../../shared/controllers/firebase_app_state.dart';

class RequestMatchingPanel extends StatelessWidget {
  const RequestMatchingPanel({super.key, this.matching = false});
  final bool matching;
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final items = s.orders
        .where((o) =>
            o.status == 'awaiting' &&
            s.foods.any((f) => f.id == o.foodId && f.mine))
        .toList();
    bool ready(MealOrder order) {
      final f = s.foods.firstWhere((f) => f.id == order.foodId);
      return f.status == 'open' && f.quantity >= order.quantity;
    }

    items.sort((a, b) {
      final availability = (ready(b) ? 1 : 0) - (ready(a) ? 1 : 0);
      return availability != 0
          ? availability
          : matching
              ? _score(s, b).compareTo(_score(s, a))
              : s.orders.indexOf(a).compareTo(s.orders.indexOf(b));
    });
    return ListView(padding: const EdgeInsets.only(bottom: 16), children: [
      Container(
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
              color: const Color(0xFFE3F2E9),
              borderRadius: BorderRadius.circular(16)),
          child: Row(children: [
            Icon(
                matching
                    ? Icons.handshake_outlined
                    : Icons.mark_email_unread_outlined,
                size: 32,
                color: mealGreen),
            const SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(
                      '${items.length} ${matching ? 'tổ chức đang cần' : 'yêu cầu đang chờ'}',
                      style: const TextStyle(
                          color: mealInk,
                          fontWeight: FontWeight.w600,
                          fontSize: 16)),
                  const SizedBox(height: 5),
                  Text(
                      matching
                          ? 'Xếp theo số suất và khoảng cách'
                          : 'Đối chiếu món và số suất trước khi nhận',
                      style: const TextStyle(
                          color: Color(0xFF687C74), fontSize: 11))
                ])),
          ])),
      const SizedBox(height: 14),
      if (items.isEmpty)
        const Padding(
            padding: EdgeInsets.all(24),
            child: Column(children: [
              Icon(Icons.inbox_outlined, size: 52, color: mealGreen),
              SizedBox(height: 12),
              Text('Chưa có yêu cầu chờ xử lý',
                  style: TextStyle(color: mealInk, fontSize: 16)),
              SizedBox(height: 6),
              Text('Yêu cầu mới sẽ xuất hiện tại đây.',
                  style: TextStyle(fontSize: 12, color: Color(0xFF687C74)))
            ])),
      for (final order in items)
        Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: _RequestCard(
                order: order, matching: matching, score: _score(s, order))),
      if (s is! FirebaseAppState)
        OutlinedButton.icon(
            key: const ValueKey('requests/add-demo'),
            onPressed: s is! FirebaseAppState &&
                    s.foods.any(
                        (f) => f.mine && f.status == 'open' && f.quantity > 0)
                ? () => s.addDemoRequests()
                : null,
            icon: const Icon(Icons.add, size: 18),
            label: const Text('Thêm yêu cầu kiểm thử')),
      const SizedBox(height: 8),
      Text(
          s is FirebaseAppState
              ? 'Yêu cầu mới sẽ tự động cập nhật tại đây.'
              : 'Các gợi ý hiện được xử lý trên thiết bị, chưa phải kết quả từ máy chủ.',
          textAlign: TextAlign.center,
          style: const TextStyle(
              fontSize: 10, color: Color(0xFF687C74), height: 1.5)),
    ]);
  }

  int _score(FrontendState s, MealOrder order) {
    final food = s.foods.firstWhere((f) => f.id == order.foodId);
    return (100 -
            food.distance * 5 -
            (food.quantity - order.quantity).abs() * .6)
        .round()
        .clamp(0, 99);
  }
}

class _RequestCard extends StatelessWidget {
  const _RequestCard(
      {required this.order, required this.matching, required this.score});
  final MealOrder order;
  final bool matching;
  final int score;
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    final food = s.foods.firstWhere((f) => f.id == order.foodId);
    final row = s is FirebaseAppState
        ? s.rows('foods').where((r) => r['id'] == food.id).firstOrNull
        : null;
    final expiry = row?['expiresAtMs'] is num
        ? DateTime.fromMillisecondsSinceEpoch(
            (row!['expiresAtMs'] as num).toInt())
        : DateTime.tryParse('${row?['expiresAt'] ?? ''}');
    final held = '${row?['stockJournal'] ?? ''}'.contains('|${order.id}:H|') &&
        !'${row?['stockJournal'] ?? ''}'.contains('|${order.id}:R|');
    final expired = !held && expiry != null && !expiry.isAfter(DateTime.now());
    final enough = held ||
        (food.quantity >= order.quantity && food.status == 'open' && !expired);
    final busy = s is FirebaseAppState && s.busy;
    void accept() {
      s.selectOrder(order.id);
      FrontendActions.run(
          context, '6:609', {'action': 'acceptOrder', 'id': order.id});
    }

    return Material(
        key: ValueKey('request/${order.id}'),
        color: Colors.white,
        shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFDCE7DF))),
        clipBehavior: Clip.antiAlias,
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          if (matching)
            Stack(children: [
              Image.asset(
                  'assets/figma/3239506a-0015-4c3d-8dbd-3453e66091cf.png',
                  width: double.infinity,
                  height: 112,
                  fit: BoxFit.cover),
              Positioned(
                  right: 12,
                  top: 12,
                  child: Container(
                      width: 62,
                      height: 62,
                      decoration: const BoxDecoration(
                          color: Colors.white, shape: BoxShape.circle),
                      child: Center(
                          child: Text('$score%',
                              style: const TextStyle(
                                  color: mealGreen,
                                  fontSize: 20,
                                  fontWeight: FontWeight.w700))))),
              const Positioned(
                  left: 12,
                  bottom: 10,
                  child:
                      _Chip(text: 'Ảnh minh họa', icon: Icons.favorite_border)),
            ]),
          Padding(
              padding: const EdgeInsets.all(14),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          SizedBox(
                              width: matching ? 66 : 92,
                              height: matching ? 66 : 92,
                              child: FoodPhoto.listing(food)),
                          const SizedBox(width: 12),
                          Expanded(
                              child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                Text(order.organization,
                                    style: const TextStyle(
                                        color: mealInk,
                                        fontWeight: FontWeight.w700,
                                        fontSize: 16)),
                                const SizedBox(height: 6),
                                Text(food.name,
                                    style: const TextStyle(
                                        color: Color(0xFF687C74),
                                        fontSize: 12)),
                                const SizedBox(height: 8),
                                Text('Xin nhận ${order.quantity} suất',
                                    style: const TextStyle(
                                        color: mealGreen,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 14))
                              ])),
                        ]),
                    const SizedBox(height: 14),
                    Wrap(spacing: 6, runSpacing: 6, children: [
                      _Chip(
                          text: '${food.distance} km',
                          icon: Icons.near_me_outlined),
                      _Chip(text: order.time, icon: Icons.schedule),
                      _Chip(
                          text: order.transport,
                          icon: Icons.local_shipping_outlined)
                    ]),
                    if (order.note.isNotEmpty)
                      ExpansionTile(
                          tilePadding: EdgeInsets.zero,
                          dense: true,
                          shape: const Border(),
                          collapsedShape: const Border(),
                          title: const Text('Lời nhắn từ tổ chức',
                              style: TextStyle(
                                  fontSize: 12, color: Color(0xFF687C74))),
                          children: [
                            Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: Text(order.note,
                                    style: const TextStyle(
                                        fontSize: 13,
                                        color: mealInk,
                                        height: 1.5)))
                          ]),
                    if (!enough)
                      Padding(
                          padding: const EdgeInsets.only(top: 10),
                          child: Text(
                              expired
                                  ? 'Món đã hết hạn, không thể chấp nhận thêm yêu cầu. Có thể từ chối để tổ chức chọn món khác.'
                                  : 'Tin còn ${food.quantity} suất · cần đối chiếu lại',
                              style: const TextStyle(
                                  color: Color(0xFFAA5B00), fontSize: 12))),
                    const SizedBox(height: 14),
                    Row(children: [
                      if (!matching) ...[
                        Expanded(
                            child: OutlinedButton(
                                onPressed: () {
                                  s.selectOrder(order.id);
                                  FrontendActions.run(context, '6:609', {
                                    'action': 'rejectOrder',
                                    'id': order.id
                                  });
                                },
                                child: const Text('Từ chối'))),
                        const SizedBox(width: 10)
                      ],
                      Expanded(
                          child: FilledButton(
                              onPressed: enough && !busy ? accept : null,
                              child: Text(matching
                                  ? 'Ghép tổ chức này'
                                  : 'Chấp nhận'))),
                    ]),
                  ])),
        ]));
  }
}

class _Chip extends StatelessWidget {
  const _Chip({required this.text, required this.icon});
  final String text;
  final IconData icon;
  @override
  Widget build(BuildContext context) => Container(
      padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 6),
      decoration: BoxDecoration(
          color: const Color(0xFFF0F6F2),
          borderRadius: BorderRadius.circular(9)),
      child: Row(mainAxisSize: MainAxisSize.min, children: [
        Icon(icon, size: 14, color: mealGreen),
        const SizedBox(width: 4),
        Text(text, style: const TextStyle(fontSize: 11, color: mealInk))
      ]));
}
