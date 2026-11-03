import 'dart:convert';
import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:sharemeal_client/domain.dart';
export 'package:sharemeal_client/domain.dart';

/// Local draft and preview state. FirebaseAppState supplies production data.
class FrontendState extends ChangeNotifier {
  FrontendState({DateTime Function()? now}) : now = now ?? DateTime.now;
  final DateTime Function() now;
  final Map<String, dynamic> values = {};
  // Onboarding evidence is user supplied, never inferred from Figma placeholders.
  static const facilitySlots = [
    'front',
    'kitchen',
    'fridge',
    'washing',
    'certificate'
  ];
  static const commitmentKeys = ['fresh', 'allergens', 'packing', 'moderation'];
  int get facilityPhotoCount => facilitySlots
      .where((slot) => get<String>('facility.photo.$slot', '').isNotEmpty)
      .length;
  bool get facilityComplete => facilityPhotoCount == facilitySlots.length;
  int get commitmentCount => commitmentKeys
      .where((key) => get<bool>('onboarding.commitment.$key', false))
      .length;
  bool get commitmentComplete => commitmentCount == commitmentKeys.length;

  static DateTime dateOnly(DateTime date) =>
      DateTime(date.year, date.month, date.day);
  static String dateKey(DateTime date) =>
      '${date.year}-${date.month.toString().padLeft(2, '0')}-${date.day.toString().padLeft(2, '0')}';
  DateTime get calendarDate =>
      dateOnly(DateTime.tryParse(get('calendar.date', '')) ?? now());
  DateTime get shiftDate =>
      dateOnly(DateTime.tryParse(get('shift.date', '')) ?? calendarDate);
  bool shiftRegistered(DateTime day) =>
      get<bool>('shift.registered.${dateKey(day)}', false);
  void registerShift() {
    if (shiftDate.isBefore(dateOnly(now()))) {
      throw StateError('Không thể đăng ký ca đã qua.');
    }
    if (shiftRegistered(shiftDate)) throw StateError('Bạn đã đăng ký ca này.');
    values['calendar.date'] = dateKey(shiftDate);
    set('shift.registered.${dateKey(shiftDate)}', true);
  }

  void cancelShift(DateTime day) =>
      set('shift.registered.${dateKey(day)}', false);
  final Set<String> _dirty = {};
  SharedPreferences? _preferences;
  Future<void> _pendingWrite = Future.value();
  bool _disposed = false, _dataDirty = false;
  String selectedFoodId = 'SM-2041', selectedOrderId = 'DN-367';
  bool orderStateUsed = false;
  List<FoodListing> foods = [
    FoodListing(
        id: 'SM-2041',
        name: 'Cơm gà xối mỡ',
        donor: 'Bếp Nhà Lan',
        category: 'Cơm & món mặn',
        quantity: 20,
        mine: true),
    FoodListing(
        id: 'SM-2040',
        name: 'Bánh mì ngọt các loại',
        donor: 'Tiệm Bánh Sài Gòn',
        category: 'Bánh',
        quantity: 15,
        storage: 'Khô ráo',
        status: 'assigned',
        distance: 2.6,
        mine: true),
    FoodListing(
        id: 'SM-2038',
        name: 'Canh rau củ',
        donor: 'Bếp Nhà Lan',
        category: 'Rau củ',
        quantity: 12,
        mine: true,
        distance: 1.9),
    FoodListing(
        id: 'SM-2039',
        name: 'Rau củ sơ chế',
        donor: 'Siêu thị Xanh',
        category: 'Rau củ',
        quantity: 8,
        storage: 'Để lạnh',
        distance: 2.1),
  ];
  List<MealOrder> orders = [
    MealOrder(
        id: 'DN-367',
        foodId: 'SM-2041',
        organization: 'Mái ấm Hoa Sen',
        quantity: 15),
    MealOrder(
        id: 'DN-368',
        foodId: 'SM-2039',
        organization: 'Mái ấm Hoa Sen',
        quantity: 6,
        status: 'assigned',
        transport: 'Tự đến lấy'),
    MealOrder(
        id: 'DN-369',
        foodId: 'SM-2040',
        organization: 'Bếp Yêu Thương Q.10',
        quantity: 10,
        status: 'awaiting'),
  ];
  final List<Map<String, dynamic>> needs = [
    {
      'id': 'NC-101',
      'title': 'Bữa tối cho 32 người',
      'quantity': 32,
      'matched': 15,
      'status': 'open',
      'category': 'Cơm & món mặn',
      'priority': 'Cần gấp'
    },
    {
      'id': 'NC-102',
      'title': 'Rau củ cho bếp ăn tuần này',
      'quantity': 10,
      'matched': 6,
      'status': 'open',
      'category': 'Rau củ',
      'priority': 'Bình thường'
    },
    {
      'id': 'NC-100',
      'title': 'Bữa trưa cuối tuần',
      'quantity': 24,
      'matched': 24,
      'status': 'fulfilled',
      'category': 'Cơm & món mặn',
      'priority': 'Bình thường'
    },
  ];
  final List<Map<String, dynamic>> messages = [];
  final List<Map<String, dynamic>> tickets = [];
  final List<Map<String, dynamic>> history = [
    {
      'name': 'Cơm sườn nướng',
      'quantity': 18,
      'kg': 9,
      'category': 'Cơm & món mặn',
      'daysAgo': 2
    },
    {
      'name': 'Bánh bao & bánh ngọt',
      'quantity': 25,
      'kg': 5,
      'category': 'Bánh',
      'daysAgo': 5
    },
    {
      'name': 'Cháo gà',
      'quantity': 30,
      'kg': 10,
      'category': 'Cơm & món mặn',
      'daysAgo': 12
    },
    {
      'name': 'Rau củ sơ chế',
      'quantity': 12,
      'kg': 12,
      'category': 'Rau củ',
      'daysAgo': 20
    },
  ];

  T get<T>(String key, T fallback) {
    final value = values[key];
    if (value == null) return fallback;
    if (T == double && value is num) return value.toDouble() as T;
    return value is T ? value : fallback;
  }

  void set(String key, dynamic value) {
    values[key] = value;
    _dirty.add(key);
    changed();
  }

  void toggle(String key, [bool initial = false]) =>
      set(key, !get<bool>(key, initial));
  void choose(String key, String value,
      {bool multiple = false, List<String> initial = const []}) {
    if (!multiple) {
      set(key, value);
      return;
    }
    final selected = Set<String>.from(values[key] as List? ?? initial);
    if (!selected.add(value)) selected.remove(value);
    set(key, selected.toList());
  }

  void step(String key, int delta,
          {int initial = 0, int min = 0, int max = 10000}) =>
      set(key, (get<int>(key, initial) + delta).clamp(min, max));
  FoodListing get selectedFood => foods
      .firstWhere((f) => f.id == selectedFoodId, orElse: () => foods.first);
  MealOrder get selectedOrder => orders
      .firstWhere((o) => o.id == selectedOrderId, orElse: () => orders.first);
  void selectFood(String id) {
    values.removeWhere((k, v) => k.startsWith('request.'));
    if (selectedFoodId != id) {
      values.removeWhere(
          (k, v) => k.startsWith('edit.') || k.startsWith('request.'));
    }
    selectedFoodId = id;
    changed();
  }

  void addDemoRequests() {
    final available = foods
        .where((f) => f.mine && f.status == 'open' && f.quantity > 0)
        .toList();
    if (available.isEmpty) {
      throw StateError('Cần một tin đang mở để thêm yêu cầu kiểm thử.');
    }
    const organizations = [
      'Mái ấm Hoa Sen',
      'Bếp Yêu Thương Q.10',
      'Quỹ Bữa Cơm Sẻ Chia'
    ];
    for (var i = 0; i < organizations.length; i++) {
      final food = available[i % available.length];
      if (orders.any((o) =>
          o.id.startsWith('DEMO-') &&
          o.foodId == food.id &&
          o.organization == organizations[i] &&
          o.status == 'awaiting')) {
        continue;
      }
      orders.add(MealOrder(
          id: 'DEMO-${now().microsecondsSinceEpoch}-$i',
          foodId: food.id,
          organization: organizations[i],
          quantity: food.quantity < 8 + i * 2 ? food.quantity : 8 + i * 2,
          status: 'awaiting',
          time: ['19:00', '19:30', '20:00'][i],
          transport: i == 0 ? 'Tự đến lấy' : 'Nhờ giao hộ',
          note:
              'Yêu cầu mẫu để kiểm thử giao diện; chưa gửi tới tổ chức thật.'));
    }
    _dataChanged();
  }

  void selectOrder(String id) {
    if (id != selectedOrderId) {
      values.removeWhere((k, v) =>
          k.startsWith('handover.') ||
          k.startsWith('receipt.') ||
          k.startsWith('demo.handover.'));
    }
    orderStateUsed = true;
    selectedOrderId = id;
    selectedFoodId = selectedOrder.foodId;
    changed();
  }

  static String normalize(String value) {
    const originals = [
      'àáạảãâầấậẩẫăằắặẳẵ',
      'èéẹẻẽêềếệểễ',
      'ìíịỉĩ',
      'òóọỏõôồốộổỗơờớợởỡ',
      'ùúụủũưừứựửữ',
      'ỳýỵỷỹ',
      'đ'
    ];
    const replacements = ['a', 'e', 'i', 'o', 'u', 'y', 'd'];
    var result = value.toLowerCase().trim();
    for (var i = 0; i < originals.length; i++) {
      for (final char in originals[i].split('')) {
        result = result.replaceAll(char, replacements[i]);
      }
    }
    return result.replaceAll(RegExp(r'\s+'), ' ');
  }

  List<FoodListing> searchFoods(
      {String query = '',
      String category = 'Tất cả',
      bool mine = false,
      String status = 'all'}) {
    final terms = normalize(query).split(' ').where((x) => x.isNotEmpty);
    return foods.where((f) {
      if (mine && !f.mine) return false;
      if (!mine &&
          (!['open', 'assigned'].contains(f.status) || f.quantity < 1)) {
        return false;
      }
      if (category != 'Tất cả' &&
          normalize(f.category) != normalize(category)) {
        return false;
      }
      if (status != 'all' && f.status != status) return false;
      final text = normalize('${f.name} ${f.donor} ${f.category} ${f.storage}');
      return terms.every(text.contains);
    }).toList()
      ..sort((a, b) => a.distance.compareTo(b.distance));
  }

  void _dataChanged() {
    _dataDirty = true;
    changed();
  }

  FoodListing publishFood() {
    final name = get<String>('food.name', 'Cơm gà xối mỡ').trim();
    final quantity = get<int>('food.quantity', 20);
    if (name.isEmpty || quantity < 1) {
      throw StateError('Nhập tên món ăn và số lượng ít nhất 1.');
    }
    for (final key in [
      'food.safe.untouched',
      'food.safe.packed',
      'food.safe.fresh'
    ]) {
      if (!get<bool>(key, true)) {
        throw StateError(
            'Vui lòng xác nhận đủ các điều kiện an toàn thực phẩm.');
      }
    }
    final item = FoodListing(
        id: 'SM-${now().microsecondsSinceEpoch}',
        name: name,
        donor: get<String>('profile.donor.name', 'Bếp Nhà Lan'),
        category: get<String>('food.category', 'Cơm & món mặn'),
        quantity: quantity,
        storage: get<String>('food.storage', 'Còn nóng'),
        allergens: List<String>.from(values['food.allergens'] ?? ['Trứng']),
        address: get<String>('food.address', '45 Nguyễn Thị Minh Khai, Quận 1'),
        pickup: get<String>('food.pickup', '19:00–20:30'),
        photo: get<String>('food.photo', ''),
        latitude: (values['food.latitude'] as num?)?.toDouble(),
        longitude: (values['food.longitude'] as num?)?.toDouble(),
        mine: true,
        createdAt: now().toIso8601String());
    foods.insert(0, item);
    selectedFoodId = item.id;
    _dataChanged();
    return item;
  }

  void editFood() {
    final f = selectedFood;
    final name = get<String>('edit.name', f.name).trim();
    final quantity =
        int.tryParse(get<String>('edit.quantity', '${f.quantity}')) ?? 0;
    if (name.isEmpty || quantity < 1) {
      throw StateError('Tên món ăn và số lượng phải hợp lệ.');
    }
    f.name = name;
    f.quantity = quantity;
    f.note = get<String>('edit.note', f.note);
    f.pickup =
        '${get<String>('edit.from', '19:00')}–${get<String>('edit.to', '20:30')}';
    _dataChanged();
  }

  void closeFood() {
    selectedFood.status = 'closed';
    for (final order in orders
        .where((o) => o.foodId == selectedFood.id && o.status == 'awaiting')) {
      order.status = 'cancelled';
    }
    _dataChanged();
  }

  MealOrder requestFood() {
    orderStateUsed = true;
    final f = selectedFood;
    final qty = get<int>('request.quantity', f.quantity < 15 ? f.quantity : 15);
    if (qty < 1 || qty > f.quantity) {
      throw StateError('Số lượng nhận phải từ 1 đến ${f.quantity}.');
    }
    if (!get<bool>('request.commitment', true)) {
      throw StateError('Vui lòng xác nhận cam kết sử dụng thực phẩm.');
    }
    final order = MealOrder(
        id: 'DN-${now().microsecondsSinceEpoch}',
        foodId: f.id,
        organization:
            get<String>('profile.organization.name', 'Mái ấm Hoa Sen'),
        quantity: qty,
        status: 'awaiting',
        transport: get<String>('request.transport', 'Nhờ giao hộ'),
        time: get<String>('request.time', '19:30'),
        note: get<String>('request.purpose', 'Bữa tối cho 32 người'));
    orders.insert(0, order);
    selectedOrderId = order.id;
    _dataChanged();
    return order;
  }

  void transitionOrder(String status) {
    orderStateUsed = true;
    final order = selectedOrder;
    final food = foods.firstWhere((f) => f.id == order.foodId);
    const allowed = {
      'awaiting': ['accepted', 'rejected', 'cancelled'],
      'accepted': ['assigned', 'cancelled'],
      'assigned': ['pickedUp', 'cancelled'],
      'pickedUp': ['completed', 'cancelled'],
      'completed': [],
      'rejected': [],
      'cancelled': [],
    };
    if (order.status == status) return;
    if (!(allowed[order.status] ?? []).contains(status)) {
      throw StateError('Không thể chuyển từ ${order.status} sang $status.');
    }
    if (status == 'accepted') {
      if (food.quantity < order.quantity) {
        throw StateError('Không đủ thực phẩm cho yêu cầu này.');
      }
      food.quantity -= order.quantity;
    }
    if (status == 'completed') {
      order.received =
          get<int>('receipt.quantity', order.quantity).clamp(0, order.quantity);
      history.insert(0, {
        'name': food.name,
        'quantity': order.received,
        'kg': order.received * 0.5,
        'category': food.category,
        'daysAgo': 0
      });
    }
    if (status == 'cancelled' && order.status != 'awaiting') {
      food.quantity += order.quantity;
    }
    order.status = status;
    _dataChanged();
  }

  void addNeed() {
    final title = get<String>('need.title', 'Bữa tối cho 32 người').trim();
    final qty = int.tryParse(get<String>('need.quantity', '32')) ?? 0;
    if (title.isEmpty || qty < 1) {
      throw StateError('Nhập tiêu đề và số suất cần lớn hơn 0.');
    }
    needs.insert(0, {
      'id': 'NC-${now().microsecondsSinceEpoch}',
      'title': title,
      'quantity': qty,
      'matched': 0,
      'status': 'open',
      'category': values['need.category'] ?? ['Cơm & món mặn'],
      'priority': get<String>('need.priority', 'Cần gấp')
    });
    _dataChanged();
  }

  int get warehouseBalance =>
      get<int>('warehouse.received', 15) - get<int>('warehouse.distributed', 0);
  void distribute() {
    final children =
        int.tryParse(get<String>('distribution.children', '10')) ?? -1;
    final elderly =
        int.tryParse(get<String>('distribution.elderly', '5')) ?? -1;
    final total = children + elderly;
    if (children < 0 || elderly < 0 || total < 1 || total > warehouseBalance) {
      throw StateError('Tổng phân phát phải từ 1 đến $warehouseBalance suất.');
    }
    set('warehouse.distributed', get<int>('warehouse.distributed', 0) + total);
  }

  void sendMessage([String? message]) {
    final text = (message ?? get<String>('chat.message', '')).trim();
    if (text.isEmpty) throw StateError('Nhập nội dung tin nhắn trước khi gửi.');
    messages.add({'text': text, 'time': now().toIso8601String(), 'mine': true});
    values['chat.message'] = '';
    _dataChanged();
  }

  void submitTicket() {
    final detail = get<String>(
            'support.detail', 'Hai hộp bị đổ trong quá trình vận chuyển.')
        .trim();
    if (detail.isEmpty) throw StateError('Vui lòng mô tả vấn đề cần hỗ trợ.');
    tickets.add({
      'id': 'HT-${now().microsecondsSinceEpoch}',
      'detail': detail,
      'reason': get<String>('support.reason', 'Thiếu / hỏng hộp'),
      'status': 'open',
      'orderId': selectedOrderId
    });
    _dataChanged();
  }

  Iterable<Map<String, dynamic>> impactEntries(String period) {
    final now = DateTime.now();
    final today = DateTime(now.year, now.month, now.day);
    final start = period == 'Tuần'
        ? today.subtract(Duration(days: today.weekday - 1))
        : period == 'Tháng'
            ? DateTime(now.year, now.month)
            : DateTime(now.year);
    return history.where((e) {
      final timestamp =
          DateTime.tryParse('${e['completedAt'] ?? ''}')?.toLocal();
      final ago = e['daysAgo'] as num?;
      final date = timestamp ??
          (ago == null || ago < 0
              ? null
              : today.subtract(Duration(days: ago.toInt())));
      return date != null && !date.isBefore(start) && !date.isAfter(now);
    });
  }

  List<num> impactBars(String period) {
    final now = DateTime.now();
    final bars = List<num>.filled(4, 0);
    for (final e in impactEntries(period)) {
      final date = DateTime.tryParse('${e['completedAt'] ?? ''}')?.toLocal() ??
          DateTime(now.year, now.month, now.day)
              .subtract(Duration(days: (e['daysAgo'] as num).toInt()));
      final index = period == 'Năm'
          ? (date.month - 1) ~/ 3
          : period == 'Tháng'
              ? ((date.day - 1) ~/ 7).clamp(0, 3)
              : ((date.weekday - 1) ~/ 2).clamp(0, 3);
      bars[index] += e['quantity'] as num? ?? 0;
    }
    return bars;
  }

  List<String> impactLabels(String period) => period == 'Năm'
      ? ['Quý 1', 'Quý 2', 'Quý 3', 'Quý 4']
      : period == 'Tháng'
          ? ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4–5']
          : ['T2–T3', 'T4–T5', 'T6–T7', 'CN'];

  Map<String, num> impact(String period) {
    final entries = impactEntries(period).toList();
    return {
      'meals': entries.fold<num>(0, (n, e) => n + (e['quantity'] as num? ?? 0)),
      'kg': entries.fold<num>(0, (n, e) => n + (e['kg'] as num? ?? 0)),
      'orders': entries.length
    };
  }

  Future<void> load() async {
    try {
      final preferences = await SharedPreferences.getInstance();
      if (_disposed) return;
      _preferences = preferences;
      final raw = preferences.getString('sharemeal.frontend.v1');
      if (raw != null) {
        final j = jsonDecode(raw) as Map<String, dynamic>;
        if (!_dataDirty) {
          selectedFoodId = j['selectedFoodId'] ?? selectedFoodId;
          selectedOrderId = j['selectedOrderId'] ?? selectedOrderId;
        }
        final old = Map<String, dynamic>.from(j['values'] ?? {});
        for (final entry in old.entries) {
          if (!_dirty.contains(entry.key)) values[entry.key] = entry.value;
        }
        if (!_dataDirty) {
          if (j['foods'] is List) {
            foods = (j['foods'] as List)
                .map((f) => FoodListing.fromJson(Map<String, dynamic>.from(f)))
                .toList();
          }
          if (j['orders'] is List) {
            orders = (j['orders'] as List)
                .map((o) => MealOrder.fromJson(Map<String, dynamic>.from(o)))
                .toList();
            orderStateUsed = true;
          }
          for (final pair in [
            (needs, j['needs']),
            (messages, j['messages']),
            (tickets, j['tickets']),
            (history, j['history'])
          ]) {
            if (pair.$2 is List) {
              pair.$1
                ..clear()
                ..addAll(
                    (pair.$2 as List).map((m) => Map<String, dynamic>.from(m)));
            }
          }
        }
      }
      if (!_disposed) notifyListeners();
    } catch (_) {
      /* Memory repository remains usable when storage is unavailable. */
    }
  }

  Future<void> flush() => _pendingWrite;
  void changed() {
    if (_disposed) return;
    notifyListeners();
    final preferences = _preferences;
    if (preferences == null) return;
    final safe = Map<String, dynamic>.from(values)
      ..removeWhere((k, v) =>
          k.startsWith('auth.') ||
          k.contains('password') ||
          k.contains('pin') ||
          k.contains('otp'));
    final payload = jsonEncode({
      'values': safe,
      'foods': foods.map((f) => f.toJson()).toList(),
      'orders': orders.map((o) => o.toJson()).toList(),
      'needs': needs,
      'messages': messages,
      'tickets': tickets,
      'history': history,
      'selectedFoodId': selectedFoodId,
      'selectedOrderId': selectedOrderId
    });
    _pendingWrite = _pendingWrite.then((_) async {
      await preferences.setString('sharemeal.frontend.v1', payload);
    }).catchError((_) {});
  }

  @override
  void dispose() {
    _disposed = true;
    super.dispose();
  }
}
