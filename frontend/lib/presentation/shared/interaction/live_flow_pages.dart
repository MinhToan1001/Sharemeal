import 'package:flutter/material.dart';
import '../controllers/firebase_app_state.dart';
import '../figma/figma_prototype_controller.dart';
import 'app_navigation.dart';
import 'food_photo.dart';
import 'frontend_actions.dart';
import 'meal_map.dart';

Widget _card(Widget child) => Container(
    padding: const EdgeInsets.all(16),
    margin: const EdgeInsets.only(bottom: 14),
    decoration: BoxDecoration(
        color: Colors.white, borderRadius: BorderRadius.circular(18)),
    child: child);
AppBar _bar(BuildContext context, String title) => AppBar(
    backgroundColor: mealBackground,
    title: Text(title,
        style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
    leading: IconButton(
        key: const ValueKey('flow/back'),
        tooltip: 'Quay lại',
        onPressed: () => mealBack(context),
        icon: const Icon(Icons.arrow_back_ios_new, size: 20)));

class RequestFoodContent extends StatelessWidget {
  const RequestFoodContent({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final f = s.selectedFood;
    final maximum = f.quantity;
    final qty = s
        .get<int>('request.quantity', maximum < 15 ? maximum : 15)
        .clamp(maximum > 0 ? 1 : 0, maximum);
    final transport = s.get('request.transport', 'Nhờ giao hộ');
    Widget field(String key, String label, String initial,
            {int lines = 1, TextInputType? keyboard}) =>
        TextFormField(
            key: ValueKey('request/$key'),
            initialValue: s.get('request.$key', initial),
            keyboardType: keyboard,
            maxLines: lines,
            style: const TextStyle(fontSize: 14, color: mealInk),
            decoration: InputDecoration(
                labelText: label,
                filled: true,
                fillColor: Colors.white,
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
                border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(14))),
            onChanged: (v) => s.set('request.$key', v));
    Widget option(String value, String description, IconData icon) {
      final selected = value == transport;
      return Expanded(
          child: Semantics(
              selected: selected,
              button: true,
              child: InkWell(
                  key: ValueKey('request/transport/$value'),
                  onTap: () => s.set('request.transport', value),
                  borderRadius: BorderRadius.circular(15),
                  child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                          color:
                              selected ? const Color(0xFFE3F2E9) : Colors.white,
                          border: Border.all(
                              color: selected
                                  ? mealGreen
                                  : const Color(0xFF9CAAA3),
                              width: selected ? 1.5 : 1),
                          borderRadius: BorderRadius.circular(15)),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(children: [
                              Icon(icon,
                                  color: selected ? mealGreen : Colors.grey),
                              const Spacer(),
                              if (selected)
                                const Icon(Icons.check_circle,
                                    color: mealGreen, size: 20)
                            ]),
                            const SizedBox(height: 8),
                            Text(value,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w600)),
                            const SizedBox(height: 4),
                            Text(description,
                                style:
                                    const TextStyle(fontSize: 12, height: 1.4))
                          ])))));
    }

    return Scaffold(
        backgroundColor: mealBackground,
        appBar: _bar(context, 'Đặt nhận thực phẩm'),
        body: ListView(padding: const EdgeInsets.all(22), children: [
          Row(children: [
            SizedBox(width: 56, height: 56, child: FoodPhoto.listing(f)),
            const SizedBox(width: 12),
            Expanded(
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                  Text(f.name,
                      style: const TextStyle(
                          fontWeight: FontWeight.w600, color: mealInk)),
                  Text('${f.donor} · Còn $maximum suất',
                      style: const TextStyle(
                          fontSize: 12, color: Color(0xFF687C74)))
                ]))
          ]),
          const SizedBox(height: 22),
          _card(Row(children: [
            const Expanded(
                child:
                    Text('Số suất cần nhận', style: TextStyle(color: mealInk))),
            IconButton.outlined(
                key: const ValueKey('request/minus'),
                tooltip: 'Giảm số suất',
                onPressed:
                    qty > 1 ? () => s.set('request.quantity', qty - 1) : null,
                icon: const Icon(Icons.remove)),
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Text('$qty',
                    key: const ValueKey('request/quantity'),
                    style: const TextStyle(
                        fontWeight: FontWeight.w700, fontSize: 20))),
            IconButton.filled(
                key: const ValueKey('request/plus'),
                tooltip: 'Tăng số suất',
                onPressed: qty < maximum
                    ? () => s.set('request.quantity', qty + 1)
                    : null,
                icon: const Icon(Icons.add))
          ])),
          const Text('Cách nhận hàng',
              style: TextStyle(fontWeight: FontWeight.w600)),
          const SizedBox(height: 10),
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            option('Tự đến lấy', 'Tổ chức cử người đến', Icons.person_outline),
            const SizedBox(width: 10),
            option('Nhờ giao hộ', 'Tình nguyện viên giao',
                Icons.local_shipping_outlined)
          ]),
          const SizedBox(height: 22),
          Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Expanded(
                child: field('time', 'Dự kiến đến lúc', '19:30',
                    keyboard: TextInputType.datetime)),
            const SizedBox(width: 10),
            Expanded(
                child: field(
                    'receiver', 'Người đến nhận', '${s.profile['name'] ?? ''}'))
          ]),
          const SizedBox(height: 22),
          field('purpose', 'Mục đích sử dụng', '', lines: 3),
          const SizedBox(height: 14),
          CheckboxListTile(
              key: const ValueKey('request/commitment'),
              contentPadding: EdgeInsets.zero,
              controlAffinity: ListTileControlAffinity.leading,
              activeColor: mealGreen,
              value: s.get('request.commitment', false),
              onChanged: (v) => s.set('request.commitment', v ?? false),
              title: const Text(
                  'Chúng tôi cam kết dùng hết trong ngày, bảo quản đúng cách và không bán lại',
                  style: TextStyle(fontSize: 13, height: 1.4))),
        ]),
        bottomNavigationBar: SafeArea(
            child: Padding(
                padding: const EdgeInsets.all(22),
                child: SizedBox(
                    height: 52,
                    child: FilledButton(
                        key: const ValueKey('request/submit'),
                        onPressed:
                            maximum > 0 && s.get('request.commitment', false)
                                ? () => FrontendActions.run(context, '6:1333', {
                                      'action': 'requestFood',
                                      'label': 'Gửi yêu cầu nhận'
                                    })
                                : null,
                        child: const Text('Gửi yêu cầu nhận'))))));
  }
}

class ChatContent extends StatefulWidget {
  const ChatContent({super.key});
  @override
  State<ChatContent> createState() => _ChatContentState();
}

class _ChatContentState extends State<ChatContent> {
  final _text = TextEditingController();
  bool _sending = false;
  @override
  void dispose() {
    _text.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final order = s.selectedOrder, food = s.selectedFood;
    final messages = s.messages.where((m) => m['orderId'] == order.id).toList()
      ..sort((a, b) => '${a['time']}'.compareTo('${b['time']}'));
    Future<void> send([String? quick]) async {
      if (_sending) return;
      final text = (quick ?? _text.text).trim();
      if (text.isEmpty) return;
      setState(() => _sending = true);
      try {
        await s.command('sendMessage', {'orderId': order.id, 'text': text});
        if (quick == null) _text.clear();
      } catch (e) {
        if (context.mounted) {
          FrontendActions.message(context, FirebaseAppState.readableError(e));
        }
      } finally {
        if (mounted) setState(() => _sending = false);
      }
    }

    return Scaffold(
        backgroundColor: mealBackground,
        appBar: _bar(context, 'Trao đổi giao nhận'),
        body: SafeArea(
            top: false,
            child: Column(children: [
              InkWell(
                  onTap: () => Navigator.pushNamed(
                      context,
                      s.role == 'charity'
                          ? '/user/organization/order-tracking'
                          : s.role == 'donor'
                              ? '/user/donor/order-tracking'
                              : '/user/volunteer/job-detail'),
                  child: Container(
                      width: double.infinity,
                      margin: const EdgeInsets.fromLTRB(20, 6, 20, 12),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(color: const Color(0xFFDCE7DF))),
                      child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('${food.name} · ${order.quantity} suất',
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                    color: mealInk)),
                            const SizedBox(height: 4),
                            Text('${food.donor} → ${order.organization}',
                                maxLines: 2,
                                style: const TextStyle(
                                    fontSize: 12, color: Color(0xFF687C74))),
                            Text('Đơn ${order.id}',
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(fontSize: 11)),
                          ]))),
              Expanded(
                  child: messages.isEmpty
                      ? const Center(
                          child: Padding(
                              padding: EdgeInsets.all(24),
                              child: Text(
                                  'Chưa có tin nhắn. Trao đổi về thời gian và địa điểm giao nhận tại đây.',
                                  textAlign: TextAlign.center)))
                      : ListView.builder(
                          reverse: true,
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          itemCount: messages.length,
                          itemBuilder: (_, index) {
                            final m = messages[messages.length - 1 - index],
                                mine = m['uid'] == s.user?.uid;
                            return Align(
                                alignment: mine
                                    ? Alignment.centerRight
                                    : Alignment.centerLeft,
                                child: Container(
                                    constraints: BoxConstraints(
                                        maxWidth:
                                            MediaQuery.sizeOf(context).width *
                                                .78),
                                    margin: const EdgeInsets.only(bottom: 12),
                                    padding: const EdgeInsets.all(13),
                                    decoration: BoxDecoration(
                                        color: mine
                                            ? const Color(0xFFE3F2E9)
                                            : Colors.white,
                                        borderRadius:
                                            BorderRadius.circular(16)),
                                    child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          if (!mine)
                                            Text('${m['name'] ?? ''}',
                                                style: const TextStyle(
                                                    fontSize: 11,
                                                    color: mealGreen,
                                                    fontWeight:
                                                        FontWeight.w600)),
                                          Text('${m['text'] ?? ''}',
                                              style: const TextStyle(
                                                  fontSize: 14,
                                                  color: mealInk,
                                                  height: 1.4))
                                        ])));
                          })),
              SingleChildScrollView(
                  scrollDirection: Axis.horizontal,
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(children: [
                    for (final v in [
                      'Cảm ơn bạn',
                      'Bạn đến đâu rồi?',
                      'Mình đã tới điểm hẹn'
                    ])
                      Padding(
                          padding: const EdgeInsets.only(right: 8),
                          child: ActionChip(
                              label: Text(v),
                              onPressed: _sending ? null : () => send(v)))
                  ])),
              Padding(
                  padding: const EdgeInsets.fromLTRB(16, 8, 16, 12),
                  child: Row(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Expanded(
                            child: TextField(
                                key: const ValueKey('chat/input'),
                                controller: _text,
                                minLines: 1,
                                maxLines: 4,
                                style: const TextStyle(fontSize: 14),
                                textInputAction: TextInputAction.newline,
                                decoration: InputDecoration(
                                    hintText: 'Nhập tin nhắn',
                                    filled: true,
                                    fillColor: Colors.white,
                                    contentPadding: const EdgeInsets.symmetric(
                                        horizontal: 16, vertical: 12),
                                    border: OutlineInputBorder(
                                        borderRadius:
                                            BorderRadius.circular(24))))),
                        const SizedBox(width: 8),
                        IconButton.filled(
                            key: const ValueKey('chat/send'),
                            tooltip: 'Gửi tin nhắn',
                            onPressed: _sending ? null : () => send(),
                            icon: _sending
                                ? const SizedBox(
                                    width: 20,
                                    height: 20,
                                    child: CircularProgressIndicator(
                                        strokeWidth: 2, color: Colors.white))
                                : const Icon(Icons.send))
                      ]))
            ])));
  }
}

class OrderTrackingContent extends StatelessWidget {
  const OrderTrackingContent({super.key});
  @override
  Widget build(BuildContext context) {
    final s = FigmaPrototypeScope.of(context).frontend as FirebaseAppState;
    final o = s.selectedOrder, f = s.selectedFood;
    final record =
        s.rows('orders').where((r) => r['id'] == o.id).firstOrNull ?? {};
    final self = o.transport == 'Tự đến lấy';
    final status = switch (o.status) {
      'awaiting' => 'Chờ người cho chấp nhận',
      'accepted' => self ? 'Tổ chức tự đến lấy' : 'Đang tìm tình nguyện viên',
      'assigned' => 'Tình nguyện viên đã nhận chuyến',
      'pickedUp' =>
        self ? 'Đã lấy hàng · chờ xác nhận nhận đủ' : 'Đang giao thực phẩm',
      'completed' => 'Đã nhận và nhập kho',
      'cancelled' => 'Đơn đã hủy',
      _ => 'Yêu cầu bị từ chối'
    };
    void go(String route) => Navigator.pushNamed(context, route);
    Widget button(String label, VoidCallback tap) => Padding(
        padding: const EdgeInsets.only(bottom: 12),
        child: SizedBox(
            width: double.infinity,
            height: 50,
            child: OutlinedButton(onPressed: tap, child: Text(label))));
    return Scaffold(
        backgroundColor: mealBackground,
        appBar: _bar(context,
            s.role == 'charity' ? 'Theo dõi đơn nhận' : 'Theo dõi bàn giao'),
        body: ListView(padding: const EdgeInsets.all(22), children: [
          Text('${f.donor} → ${o.organization}',
              style: const TextStyle(color: mealInk)),
          const SizedBox(height: 16),
          const ExpansionTile(
              title: Text('Xem vị trí điểm lấy trên bản đồ'),
              children: [SizedBox(height: 210, child: MealMap())]),
          const SizedBox(height: 16),
          _card(Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Tiến trình đơn nhận',
                style: TextStyle(
                    fontSize: 16, fontWeight: FontWeight.w600, color: mealInk)),
            const SizedBox(height: 16),
            Text(status,
                style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: mealGreen)),
            const SizedBox(height: 14),
            LinearProgressIndicator(
                value: o.progress / 100,
                minHeight: 8,
                borderRadius: BorderRadius.circular(5)),
            const SizedBox(height: 14),
            Text('Giờ hẹn: ${o.time}'),
            Text('Cách nhận: ${o.transport}'),
            const SizedBox(height: 8),
            Text('Đặt: ${record['qtyRequested'] ?? o.quantity} · '
                'Lấy: ${record['qtyPickedUp'] ?? ([
                      'pickedUp',
                      'completed'
                    ].contains(o.status) ? o.quantity : '—')} · '
                'Nhận: ${record['qtyReceived'] ?? (o.status == 'completed' ? o.received : '—')}'),
            if (record['hasDiscrepancy'] == true)
              Text('Chênh lệch: ${record['discrepancyNote']}'),
            if (record['receiptState'] == 'pending')
              const Text(
                  'Đã ghi nhận số thực nhận. Đang đồng bộ nhập kho; mở lại hoặc làm mới để tiếp tục.'),
            if (o.driver.isNotEmpty) Text('Người giao: ${o.driver}')
          ])),
          _card(Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            SizedBox(
                height: 92,
                width: double.infinity,
                child: FoodPhoto.listing(f)),
            const SizedBox(height: 12),
            Text('${o.quantity} suất ${f.name}',
                style: const TextStyle(
                    fontWeight: FontWeight.w600, color: mealInk)),
            const SizedBox(height: 6),
            Text(f.address, style: const TextStyle(fontSize: 13))
          ])),
          if (s.role == 'charity') ...[
            if (o.status == 'awaiting')
              button('Xem yêu cầu đang chờ xác nhận',
                  () => go('/user/organization/request-pending')),
            if (o.status == 'accepted' && self)
              button('Xác minh lấy hàng', () {
                FigmaPrototypeScope.of(context).values['VariableID:80:1182'] =
                    'pickup';
                s.set('demo.handover.stage', 'pickup');
                go('/shared/handover-scanner');
              }),
            if (o.status == 'accepted' && !self)
              button('Xem tình trạng tìm người giao',
                  () => go('/user/organization/awaiting-courier')),
            if (o.status == 'pickedUp' &&
                !self &&
                record['deliveryConfirmed'] != true)
              button('Thông tin QR bàn giao',
                  () => go('/user/organization/receipt-code')),
            if (o.status == 'pickedUp' &&
                (self || record['deliveryConfirmed'] == true))
              button('Kiểm tra và xác nhận nhận đủ',
                  () => go('/user/organization/confirm-receipt')),
            if (o.status == 'completed')
              button(
                  'Gửi lời cảm ơn', () => go('/user/organization/thank-you')),
          ] else if (s.role == 'donor') ...[
            if (o.status == 'accepted' && !self)
              const Padding(
                  padding: EdgeInsets.only(bottom: 16),
                  child: Text(
                      'Đang chờ tình nguyện viên nhận chuyến. Khi người lấy tới, kiểm đếm và bàn giao.')),
            if (o.status == 'assigned' || o.status == 'accepted' && self)
              button('Mã lấy hàng tại người cho',
                  () => go('/user/donor/handover-qr')),
          ] else if (s.role == 'volunteer') ...[
            if (o.status == 'accepted')
              button('Nhận chuyến', () => go('/user/volunteer/accept-job')),
            if (o.status == 'assigned') ...[
              const Padding(
                  padding: EdgeInsets.only(bottom: 12),
                  child: Text(
                      'Bước 1 · Đến người cho, kiểm đếm và xác nhận lấy hàng.')),
              button('Xác nhận lấy hàng từ người cho', () {
                s.set('demo.handover.stage', 'pickup');
                go('/user/volunteer/pickup-photo');
              }),
            ],
            if (o.status == 'pickedUp') ...[
              button('Ảnh thực phẩm lúc lấy',
                  () => go('/user/volunteer/pickup-photo')),
              if (record['deliveryConfirmed'] != true) ...[
                const Padding(
                    padding: EdgeInsets.only(bottom: 12),
                    child: Text(
                        'Bước 2 · Vận chuyển đến tổ chức và xác nhận bàn giao.')),
                button('Xác nhận giao hàng tại tổ chức', () {
                  s.set('demo.handover.stage', 'receipt');
                  go('/user/volunteer/pickup-photo');
                }),
              ] else
                const Padding(
                    padding: EdgeInsets.only(bottom: 16),
                    child: Text(
                        'Đã giao hàng. Chờ tổ chức ghi số thực nhận và hoàn tất nhập kho.')),
            ],
            button('Chuyến của tôi', () {
              s.set('jobs.scope', 'mine');
              go('/user/volunteer/available-jobs');
            }),
          ],
          if (['awaiting', 'accepted', 'assigned'].contains(o.status) &&
              (s.role == 'admin' ||
                  [record['donorId'], record['organizationId']]
                      .contains(s.user?.uid)))
            button(
                'Hủy đơn',
                () => FrontendActions.run(context, 'order-tracking', {
                      'kind': 'action',
                      'action': 'cancelOrder',
                      'id': o.id,
                      'stay': true,
                    })),
          if (o.status == 'cancelled' && record['cancelReason'] != null)
            Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Text('Lý do hủy: ${record['cancelReason']}')),
          if (o.status == 'cancelled' &&
              record['stockState'] == 'releasePending') ...[
            const Text('Đã khóa đơn. Việc nhả suất đang chờ đồng bộ.'),
            button(
                'Thử lại nhả suất',
                () => FrontendActions.run(context, 'order-tracking', {
                      'kind': 'action',
                      'action': 'cancelOrder',
                      'id': o.id,
                      'stay': true,
                    })),
          ],
          button('Nhắn tin về đơn nhận', () => go('/shared/chat')),
          button('Báo vấn đề / Yêu cầu hỗ trợ',
              () => go('/shared/report-discrepancy')),
          if (s.orders.any(
              (other) => other.foodId == o.foodId && other.id != o.id)) ...[
            const Padding(
                padding: EdgeInsets.symmetric(vertical: 12),
                child: Text('Các đơn khác cùng tin',
                    style: TextStyle(fontWeight: FontWeight.w700))),
            for (final other in s.orders.where((other) =>
                other.foodId == o.foodId &&
                other.id != o.id &&
                (s.role != 'volunteer' ||
                    s.rows('orders').any((row) =>
                        row['id'] == other.id &&
                        row['volunteerId'] == s.user?.uid))))
              OutlinedButton(
                  key: ValueKey('order/switch/${other.id}'),
                  onPressed: () => s.selectOrder(other.id),
                  child: Text(
                      '${other.quantity} suất · ${other.id} · ${other.status}')),
          ],
          const SizedBox(height: 4),
          SelectableText('Mã đơn: ${o.id}',
              style: const TextStyle(fontSize: 11, color: Color(0xFF687C74)))
        ]));
  }
}
