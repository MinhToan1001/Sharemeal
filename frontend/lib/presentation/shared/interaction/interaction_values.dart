import 'frontend_state.dart';

bool controlEnabled(FrontendState state, Map<String, dynamic> spec) {
  final checks = spec['requiredChecks'] as List? ?? const [];
  if (checks.any((key) => !state.get<bool>(key.toString(), false))) {
    return false;
  }
  return switch (spec['enabledWhen']) {
    'licensePhoto' => state.get('license.photo', '').isNotEmpty,
    'facilityComplete' => state.facilityComplete,
    'commitmentComplete' => state.commitmentComplete,
    'safetyComplete' => ['untouched', 'packed', 'fresh']
        .every((key) => state.get('food.safe.$key', true)),
    _ => true,
  };
}

dynamic controlValue(FrontendState state, Map<String, dynamic> spec) {
  final key = spec['key'] as String? ?? '';
  if (state.values.containsKey(key)) return state.values[key];
  if (state.values.containsKey('backend.role') &&
      spec['kind'] == 'input' &&
      (key.startsWith('profile.') ||
          key.startsWith('license.') ||
          key.startsWith('verification.'))) {
    return '';
  }
  if (state.values.containsKey('backend.role') &&
      [
        'food.name',
        'food.address',
        'need.title',
        'need.notes',
        'review.note',
        'thanks.message',
        'support.detail',
        'request.purpose'
      ].contains(key)) {
    return '';
  }
  if (key == 'edit.name') return state.selectedFood.name;
  if (key == 'edit.from' || key == 'edit.to') {
    final range = state.selectedFood.pickup.split('–');
    return key == 'edit.from' ? range.first : range.last;
  }
  if (key == 'edit.note' && state.selectedFood.note.isNotEmpty) {
    return state.selectedFood.note;
  }
  if (key == 'edit.quantity' || key == 'edit.remaining') {
    return '${state.selectedFood.quantity}';
  }
  if (key == 'request.quantity') {
    return state.selectedFood.quantity < 15 ? state.selectedFood.quantity : 15;
  }
  if (key == 'receipt.quantity') return state.selectedOrder.quantity;
  return spec['initial'];
}

bool controlSelected(FrontendState state, Map<String, dynamic> spec) {
  final current = controlValue(state, spec);
  if (spec['kind'] == 'star') {
    return (current as num? ?? 0) >= (spec['value'] as num);
  }
  if (spec['multiple'] == true) {
    return (current as List? ?? const []).contains(spec['value']);
  }
  if (['checkbox', 'toggle', 'toggleCell'].contains(spec['kind'])) {
    return current == true;
  }
  return current == spec['value'];
}

String computedText(FrontendState s, String value) => switch (value) {
      'delivery.status' => switch (s.selectedOrder.status) {
          'assigned' => 'Đang đến lấy hàng',
          'pickedUp' => 'Đang giao thực phẩm',
          'completed' => 'Đã hoàn tất',
          _ => 'Theo dõi đơn giao'
        },
      'delivery.note' => 'Chưa có theo dõi GPS trực tiếp',
      'market.count' =>
        '${s.searchFoods(query: s.get('market.query', ''), category: s.get('market.category', 'Tất cả')).length} món phù hợp',
      'distribution.total' =>
        '${(int.tryParse(s.get('distribution.children', '10')) ?? 0) + (int.tryParse(s.get('distribution.elderly', '5')) ?? 0)} suất',
      'distribution.balance' => '${s.warehouseBalance} suất',
      'availability.total' =>
        '${s.values.entries.where((e) => e.key.startsWith('availability.') && e.value == true).length} khung giờ đã chọn',
      'selected.name' => s.selectedFood.name,
      'selected.quantity' => '${s.selectedFood.quantity}',
      'draft.name' => s.get('food.name', 'Cơm gà xối mỡ'),
      'draft.quantity' => '${s.get('food.quantity', 20)} suất',
      'draft.storage' => s.get('food.storage', 'Còn nóng'),
      'draft.summary' =>
        '${s.get('food.name', 'Cơm gà xối mỡ')} · ${s.get('food.quantity', 20)} suất',
      'draft.allergens' =>
        (s.values['food.allergens'] as List? ?? ['Trứng']).join(', ').isEmpty
            ? 'Không có'
            : (s.values['food.allergens'] as List? ?? ['Trứng']).join(', '),
      'draft.expiry' => '${s.get('food.expiry', '23:00')} hôm nay',
      'draft.pickup' => s.get('food.pickup', '19:00–20:30'),
      'draft.address' => s.get('food.address', '45 Nguyễn Thị Minh Khai'),
      'selected.remaining' => '${s.selectedFood.quantity} suất còn lại',
      'selected.storage' => s.selectedFood.storage,
      'selected.donor' => '${s.selectedFood.donor} · Người cho đã xác minh',
      'selected.pickup' => s.selectedFood.pickup,
      'selected.allergens' => s.selectedFood.allergens.isEmpty
          ? 'Không có thành phần dị ứng đã khai báo.'
          : 'Có thể chứa ${s.selectedFood.allergens.join(', ')}. Vui lòng đối chiếu nhu cầu trước khi đặt nhận.',
      'handover.pin' => s.get(
          'handover.pin', s.values.containsKey('backend.role') ? '' : '472914'),
      'receipt.pin' => s.get(
          'receipt.pin', s.values.containsKey('backend.role') ? '' : '482913'),
      'impact.meals' => '${s.impact(s.get('impact.period', 'Tháng'))['meals']}',
      'impact.kg' => '${s.impact(s.get('impact.period', 'Tháng'))['kg']}',
      'impact.orders' =>
        '${s.impact(s.get('impact.period', 'Tháng'))['orders']}',
      'donor.openCount' =>
        '${s.foods.where((f) => f.mine && f.status == 'open').length}',
      'donor.pendingCount' =>
        '${s.orders.where((o) => o.status == 'awaiting' && s.foods.any((f) => f.id == o.foodId && f.mine)).length}',
      'donor.pendingSummary' => s.orders.any((o) => o.status == 'awaiting')
          ? '${s.orders.firstWhere((o) => o.status == 'awaiting').organization} · yêu cầu mới'
          : 'Chưa có yêu cầu mới',
      'donor.pendingFood' => s.orders.any((o) => o.status == 'awaiting')
          ? 'Xin nhận ${s.orders.firstWhere((o) => o.status == 'awaiting').quantity} suất · chạm để duyệt'
          : 'Yêu cầu nhận sẽ hiển thị tại đây',
      'warehouse.summary' =>
        'Đã nhận ${s.get('warehouse.received', 15)} - đã phát ${s.get('warehouse.distributed', 0)}',
      'warehouse.balance' => '${s.warehouseBalance} suất',
      'warehouse.distributed' => '${s.get('warehouse.distributed', 0)} suất',
      'warehouse.ratio' =>
        '${s.get('warehouse.distributed', 0)} / ${s.warehouseBalance} suất',
      'receipt.donor' => s.selectedFood.donor,
      'receipt.organization' => s.selectedOrder.organization,
      'receipt.driver' => s.selectedOrder.driver,
      'receipt.quantity' =>
        '${s.selectedOrder.received == 0 ? s.selectedOrder.quantity : s.selectedOrder.received} suất',
      'receipt.id' => 'Mã xác thực ${s.selectedOrder.id}',
      'empty' => '—',
      'notEstimated' => 'Chưa ước tính',
      _ => value.startsWith('guide.') ? guideText(s, value) : value,
    };

// Temperature/time guidance: FDA /media/79871/download (see FRONTEND_INTERACTIONS.md).
String guideText(FrontendState s, String key) {
  final type = s.get('packaging.type', 'Món nóng');
  if (key == 'guide.warning') {
    return 'Đồ dễ hỏng: 2 giờ ngoài lạnh; 1 giờ nếu >32°C.';
  }
  final cold = type == 'Đồ lạnh', dry = type == 'Khô/ bánh';
  final i = int.tryParse(key.split('.').last) ?? 0;
  final titles = dry
      ? [
          'Bao bì sạch, khô',
          'Đóng kín thực phẩm',
          'Để riêng từng loại',
          'Dán nhãn'
        ]
      : cold
          ? [
              'Giữ lạnh ở ≤4°C',
              'Dùng hộp kín',
              'Túi / thùng giữ lạnh',
              'Dán nhãn'
            ]
          : [
              'Giữ nóng ở ≥60°C',
              'Dùng hộp chịu nhiệt',
              'Xếp vào thùng giữ nhiệt',
              'Dán nhãn'
            ];
  final bodies = dry
      ? [
          'Chọn bao bì dành cho thực phẩm, sạch và nguyên vẹn.',
          'Tránh ẩm và bụi bẩn; không để lẫn với thực phẩm sống.',
          'Bánh có kem hoặc nhân dễ hỏng vẫn cần giữ lạnh.',
          'Ghi tên món, thành phần dị ứng và hạn dùng theo sản phẩm.'
        ]
      : cold
          ? [
              'Duy trì nhiệt độ lạnh bằng tủ lạnh hoặc thùng có đá gel.',
              'Đựng thực phẩm trong hộp sạch, đóng kín để tránh nhiễm chéo.',
              'Dùng nguồn lạnh phù hợp trong suốt quá trình vận chuyển.',
              'Ghi tên món, giờ chuẩn bị, thành phần dị ứng và hạn dùng.'
            ]
          : [
              'Duy trì nhiệt độ giữ nóng; kiểm tra bằng nhiệt kế thực phẩm.',
              'Dùng hộp dành cho thực phẩm, phù hợp với món nóng.',
              'Xếp hộp thẳng đứng và giữ nhiệt trong quá trình vận chuyển.',
              'Ghi giờ nấu, tên món, thành phần dị ứng và hạn dùng.'
            ];
  return key.contains('.title.') ? titles[i] : bodies[i];
}
