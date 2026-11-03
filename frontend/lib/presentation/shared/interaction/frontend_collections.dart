import 'package:flutter/material.dart';
import '../figma/figma_prototype_controller.dart';
import 'frontend_state.dart';
import '../controllers/firebase_app_state.dart';
import 'app_navigation.dart';
import 'frontend_actions.dart';
import 'food_photo.dart';
import 'meal_map.dart';

class FrontendCollection extends StatelessWidget {
  const FrontendCollection({super.key, required this.collection});
  final String collection;
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    if (collection == 'jobs') {
      final filter = s.get('jobs.filter', 'Gần nhất');
      final map = s.get('jobs.view', 'Danh sách') == 'Bản đồ';
      final items = s.orders
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
      }).toList();
      return _list(items.map((o) {
        final food = s.foods.firstWhere((f) => f.id == o.foodId);
        return _panel(InkWell(
            key: ValueKey('job/${o.id}'),
            onTap: () {
              s.selectOrder(o.id);
              if (map) {
                FrontendActions.run(context, 'jobs', {'action': 'directions'});
              } else {
                Navigator.pushNamed(context, '/user/volunteer/job-detail');
              }
            },
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text('${food.donor} → ${o.organization}', style: _title),
              const SizedBox(height: 10),
              Text('${food.name} · ${o.quantity} suất',
                  style: const TextStyle(color: mealGreen, fontSize: 14)),
              const SizedBox(height: 8),
              Text(
                  map
                      ? food.address
                      : '${food.distance} km đến điểm lấy · ${o.time}',
                  style: const TextStyle(fontSize: 13)),
              const SizedBox(height: 12),
              Text(
                  map
                      ? 'Mở vị trí trên bản đồ  ›'
                      : 'Xem tuyến & nhận chuyến  ›',
                  style: const TextStyle(
                      color: mealGreen,
                      fontWeight: FontWeight.w600,
                      fontSize: 14))
            ])));
      }).toList());
    }
    if (collection == 'history') {
      return _list(s.history
          .map((e) => _panel(InkWell(
              onTap: () {
                if (e['orderId'] != null) s.selectOrder('${e['orderId']}');
                Navigator.pushNamed(context, '/user/donor/recipient-review');
              },
              child: Row(children: [
                const Icon(Icons.check_circle_outline, color: mealGreen),
                const SizedBox(width: 12),
                Expanded(
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text('${e['name']} · ${e['quantity']} suất',
                          style: _title),
                      const SizedBox(height: 7),
                      Text('${e['daysAgo']} ngày trước · Hoàn tất',
                          style:
                              const TextStyle(fontSize: 12, color: mealGreen))
                    ])),
                const Icon(Icons.chevron_right, color: mealGreen)
              ]))))
          .toList());
    }
    if (collection == 'requests') {
      final items = s.orders
          .where((o) =>
              o.status == 'awaiting' &&
              s.foods.any((f) => f.id == o.foodId && f.mine))
          .toList();
      return _list(items.map((o) {
        final food = s.foods.firstWhere((f) => f.id == o.foodId);
        return _panel(
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(o.organization, style: _title),
          const SizedBox(height: 8),
          Text('${food.name} · Xin nhận ${o.quantity} suất',
              style: const TextStyle(color: mealGreen, fontSize: 14)),
          const SizedBox(height: 8),
          Text('Dự kiến ${o.time} · ${o.transport}',
              style: const TextStyle(fontSize: 13)),
          if (o.note.isNotEmpty)
            Padding(
                padding: const EdgeInsets.only(top: 10),
                child: Text(o.note, style: const TextStyle(fontSize: 13))),
          const SizedBox(height: 14),
          Row(children: [
            Expanded(
                child: OutlinedButton(
                    onPressed: () {
                      s.selectOrder(o.id);
                      FrontendActions.run(
                          context, '6:609', {'action': 'rejectOrder'});
                    },
                    child: const Text('Từ chối'))),
            const SizedBox(width: 12),
            Expanded(
                child: FilledButton(
                    onPressed: () {
                      s.selectOrder(o.id);
                      FrontendActions.run(
                          context, '6:609', {'action': 'acceptOrder'});
                    },
                    child: const Text('Chấp nhận')))
          ])
        ]));
      }).toList());
    }
    if (collection == 'needs') {
      final items = s.needs
          .where((n) =>
              n['status'] == s.get('needs.status', 'open') ||
              s.get('needs.status', 'open') == 'open' &&
                  ['pending', 'rejected'].contains(n['status']))
          .toList();
      return _list(items
          .map((n) => _panel(Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(n['title'], style: _title),
                    const SizedBox(height: 8),
                    Text(
                        '${n['matched'] ?? 0}/${n['quantity']} suất · ${n['priority']} · ${foodStatus('${n['status']}')}'),
                    const SizedBox(height: 12),
                    LinearProgressIndicator(
                        value: (n['matched'] as num? ?? 0) /
                            (n['quantity'] as num),
                        color: mealGreen,
                        backgroundColor: const Color(0xFFE3F2E9)),
                    Wrap(alignment: WrapAlignment.end, children: [
                      TextButton(
                          onPressed: () => Navigator.pushNamed(
                              context, '/user/organization/food-discovery'),
                          child: const Text('Tìm món')),
                      TextButton(
                          onPressed: () => _editNeed(context, s, n),
                          child: const Text('Chỉnh sửa')),
                      TextButton(
                          onPressed: () async {
                            if (s is FirebaseAppState) {
                              try {
                                await s.command('closeNeed', {'id': n['id']});
                              } catch (e) {
                                if (context.mounted) {
                                  FrontendActions.message(context,
                                      FirebaseAppState.readableError(e));
                                }
                              }
                            } else {
                              n['status'] = 'closed';
                              s.changed();
                            }
                          },
                          child: const Text('Đóng nhu cầu'))
                    ]),
                  ])))
          .toList());
    }
    if (collection == 'orders') {
      final filter = s.get('orders.status', 'active');
      final items = s.orders
          .where((o) => filter == 'completed'
              ? o.status == 'completed'
              : filter == 'awaiting'
                  ? o.status == 'awaiting'
                  : filter == 'upcoming'
                      ? ['assigned', 'pickedUp'].contains(o.status)
                      : !['completed', 'cancelled', 'rejected']
                          .contains(o.status))
          .toList();
      return _list(items.map((o) {
        final food = s.foods.firstWhere((f) => f.id == o.foodId);
        return _panel(InkWell(
            onTap: () {
              s.selectOrder(o.id);
              Navigator.pushNamed(context, '/user/organization/order-tracking');
            },
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
                SizedBox(width: 86, height: 86, child: FoodPhoto.listing(food)),
                const SizedBox(width: 12),
                Expanded(
                    child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                      Text(food.name, style: _title),
                      const SizedBox(height: 8),
                      Text('${o.quantity} suất · ${food.donor}'),
                      const SizedBox(height: 6),
                      Text('${o.time} · ${o.transport}',
                          style: const TextStyle(
                              fontSize: 12, color: Color(0xFF70847B))),
                    ])),
              ]),
              const SizedBox(height: 8),
              Text(
                  'Đơn ${o.id.length > 8 ? o.id.substring(o.id.length - 8) : o.id} · ${orderStatus(o.status)}',
                  style: const TextStyle(color: mealGreen)),
              const SizedBox(height: 12),
              LinearProgressIndicator(
                  value: o.progress / 100,
                  color: mealGreen,
                  backgroundColor: const Color(0xFFE3F2E9)),
              const SizedBox(height: 12),
              const Text('Theo dõi đơn  ›',
                  style:
                      TextStyle(color: mealGreen, fontWeight: FontWeight.w600)),
              Wrap(spacing: 8, children: [
                TextButton(
                    onPressed: () {
                      s.selectOrder(o.id);
                      Navigator.pushNamed(context, '/shared/chat');
                    },
                    child: const Text('Nhắn tin')),
                TextButton(
                    onPressed: () {
                      s.selectOrder(o.id);
                      FrontendActions.run(
                          context, 'orders', {'action': 'directions'});
                    },
                    child: const Text('Chỉ đường')),
                if (o.status == 'pickedUp' ||
                    o.status == 'accepted' && o.transport == 'Tự đến lấy')
                  TextButton(
                      onPressed: () {
                        s.selectOrder(o.id);
                        if (o.status == 'accepted') {
                          FigmaPrototypeScope.of(context)
                              .values['VariableID:80:1182'] = 'pickup';
                          Navigator.pushNamed(
                              context, '/shared/handover-scanner');
                          return;
                        }
                        Navigator.pushNamed(
                            context, '/user/organization/receipt-code');
                      },
                      child: const Text('Nhận hàng')),
                if (['awaiting', 'accepted', 'assigned'].contains(o.status))
                  TextButton(
                      onPressed: () {
                        s.selectOrder(o.id);
                        Navigator.pushNamed(
                            context, '/user/organization/cancel-request');
                      },
                      child: const Text('Hủy yêu cầu'))
              ]),
            ])));
      }).toList());
    }
    final mine = collection == 'myListings';
    final items = s.searchFoods(
        query: mine ? '' : s.get('market.query', ''),
        category: mine ? 'Tất cả' : s.get('market.category', 'Tất cả'),
        mine: mine,
        status: mine ? s.get('listings.status', 'open') : 'all');
    if (items.isEmpty) {
      return Center(
          child: Column(mainAxisSize: MainAxisSize.min, children: [
        const Icon(Icons.search_off, size: 42, color: Color(0xFF80958C)),
        const SizedBox(height: 12),
        const Text('Không có món ăn phù hợp', style: _title),
        const SizedBox(height: 8),
        const Text('Thử tên món hoặc loại thực phẩm khác.'),
        TextButton(
            onPressed: () {
              s.set('market.query', '');
              s.set('market.category', 'Tất cả');
              s.set('listings.status', 'all');
            },
            child: const Text('Xóa bộ lọc'))
      ]));
    }
    final map = s.get('market.view', 'Danh sách') == 'Bản đồ' && !mine;
    return _list([
      if (map) const MealMap(height: 260),
      ...items.map((f) => _food(context, s, f, mine, map))
    ]);
  }

  Widget _list(List<Widget> children) => children.isEmpty
      ? const Center(child: Text('Chưa có dữ liệu ở mục này.'))
      : ListView.separated(
          padding: const EdgeInsets.only(bottom: 12),
          itemBuilder: (_, i) => children[i],
          separatorBuilder: (_, i) => const SizedBox(height: 12),
          itemCount: children.length);
  Widget _food(BuildContext context, FrontendState s, FoodListing f, bool mine,
          bool map) =>
      Material(
          color: Colors.white,
          borderRadius: BorderRadius.circular(18),
          child: InkWell(
              key: ValueKey('food/${f.id}'),
              borderRadius: BorderRadius.circular(18),
              onTap: () {
                s.selectFood(f.id);
                if (map) {
                  FrontendActions.run(
                      context, 'market', {'action': 'directions'});
                  return;
                }
                Navigator.pushNamed(
                    context,
                    mine
                        ? '/user/donor/listing-detail'
                        : '/user/organization/food-detail');
              },
              child: Padding(
                  padding: const EdgeInsets.all(14),
                  child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(
                            width: 90, height: 96, child: FoodPhoto.listing(f)),
                        const SizedBox(width: 12),
                        Expanded(
                            child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                              Text(f.name, style: _title),
                              const SizedBox(height: 7),
                              Text(f.donor,
                                  style: const TextStyle(
                                      fontSize: 12, color: Color(0xFF70847B))),
                              const SizedBox(height: 7),
                              Text('${f.quantity} suất · ${f.storage}',
                                  style: const TextStyle(
                                      color: mealGreen,
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600)),
                              const SizedBox(height: 6),
                              Text(
                                  map
                                      ? f.address
                                      : '${f.distance} km · ${f.pickup}',
                                  style: const TextStyle(
                                      fontSize: 12, color: Color(0xFF70847B))),
                              if (mine)
                                Padding(
                                    padding: const EdgeInsets.only(top: 6),
                                    child: Text(foodStatus(f.status),
                                        style: const TextStyle(
                                            fontSize: 12, color: mealGreen)))
                            ])),
                        const Icon(Icons.chevron_right,
                            color: mealGreen, size: 20),
                      ]))));
  Future<void> _editNeed(
      BuildContext context, FrontendState s, Map<String, dynamic> n) async {
    final title = TextEditingController(text: n['title']);
    final qty = TextEditingController(text: '${n['quantity']}');
    final result = await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
                title: const Text('Chỉnh sửa nhu cầu'),
                content: Column(mainAxisSize: MainAxisSize.min, children: [
                  TextField(
                      controller: title,
                      decoration: const InputDecoration(labelText: 'Tiêu đề')),
                  TextField(
                      controller: qty,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(labelText: 'Số suất'))
                ]),
                actions: [
                  TextButton(
                      onPressed: () => Navigator.pop(context, false),
                      child: const Text('Hủy')),
                  FilledButton(
                      onPressed: () {
                        if (title.text.trim().isNotEmpty &&
                            (int.tryParse(qty.text) ?? 0) > 0) {
                          Navigator.pop(context, true);
                        }
                      },
                      child: const Text('Lưu'))
                ]));
    if (result == true) {
      if (s is FirebaseAppState) {
        try {
          await s.command('editNeed', {
            'id': n['id'],
            'title': title.text.trim(),
            'quantity': int.parse(qty.text)
          });
        } catch (e) {
          if (context.mounted) {
            FrontendActions.message(context, FirebaseAppState.readableError(e));
          }
        }
      } else {
        n['title'] = title.text.trim();
        n['quantity'] = int.parse(qty.text);
        s.changed();
      }
    }
    // Dialog's route has finished its exit animation before disposing its fields.
    await Future<void>.delayed(const Duration(milliseconds: 250));
    title.dispose();
    qty.dispose();
  }
}

const _title = TextStyle(
    fontFamily: 'Inter',
    fontSize: 15,
    fontWeight: FontWeight.w600,
    color: mealInk);
Widget _panel(Widget child) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(color: const Color(0xFFE0E9E4))),
    child: child);
String foodStatus(String status) => switch (status) {
      'pending' => 'Chờ admin duyệt',
      'rejected' => 'Admin từ chối',
      'open' => 'Đang mở',
      'assigned' => 'Đang giao',
      'closed' => 'Đã đóng',
      'expired' => 'Hết hạn',
      _ => status
    };
String orderStatus(String status) => switch (status) {
      'awaiting' => 'Chờ người cho duyệt',
      'accepted' => 'Đã chấp nhận',
      'assigned' => 'Đã có người giao',
      'pickedUp' => 'Đang giao đến tổ chức',
      'completed' => 'Đã hoàn tất',
      'cancelled' => 'Đã hủy',
      'rejected' => 'Đã từ chối',
      _ => status
    };

class FrontendMessages extends StatelessWidget {
  const FrontendMessages({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend;
    return ListView(padding: const EdgeInsets.all(4), reverse: true, children: [
      for (final m in s.messages
          .where((m) =>
              s is! FirebaseAppState || m['orderId'] == s.selectedOrderId)
          .toList()
          .reversed)
        Align(
            alignment: Alignment.centerRight,
            child: Container(
                margin: const EdgeInsets.only(left: 45, bottom: 14),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                    color: const Color(0xFFE3F2E9),
                    borderRadius: BorderRadius.circular(16)),
                child: Text(m['text'],
                    style: const TextStyle(color: mealInk, fontSize: 14)))),
      const Align(
          alignment: Alignment.centerLeft,
          child: Padding(
              padding: EdgeInsets.all(14),
              child: Text(
                  'Xin chào! Bạn có thể trao đổi về giờ và địa điểm bàn giao tại đây.',
                  style: TextStyle(color: mealInk, fontSize: 14))))
    ]);
  }
}
