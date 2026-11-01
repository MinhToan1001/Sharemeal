/// Pure transforms used inside single-node RTDB transactions. The append-only
/// food journal closes the crash window between a counter write and order flag.
abstract final class OrderStockProtocol {
  static const cancellable = ['awaiting', 'accepted', 'assigned'];
  static String token(String id, String operation) => '|$id:$operation|';
  static void check(bool condition, String message) {
    if (!condition) throw StateError(message);
  }

  static Map<String, dynamic> beginAccept(
      Map<String, dynamic> order, String uid, String timestamp) {
    check(order['donorId'] == uid, 'Chỉ người cho của đơn được chấp nhận.');
    check(order['status'] == 'awaiting', 'Yêu cầu không còn chờ chấp nhận.');
    return {...order, 'stockState': 'reserving', 'updatedAt': timestamp};
  }

  static Map<String, dynamic> cancel(Map<String, dynamic> order, String uid,
      bool admin, String reason, String timestamp) {
    check(admin || [order['donorId'], order['organizationId']].contains(uid),
        'Bạn không có quyền hủy đơn này.');
    if (order['status'] == 'cancelled') return order;
    check(cancellable.contains(order['status']),
        'Không thể hủy đơn đã lấy hàng. Hãy báo sai lệch hoặc yêu cầu hỗ trợ.');
    check(reason.trim().isNotEmpty && reason.length <= 2000,
        'Hãy nhập lý do hủy (tối đa 2000 ký tự).');
    final result = <String, dynamic>{
      ...order,
      'status': 'cancelled',
      'cancelledBy': uid,
      'cancelReason': reason.trim(),
      'cancelledAt': timestamp,
      'cancelHadStock': ['accepted', 'assigned'].contains(order['status']),
      if (order['volunteerId'] != null)
        'cancelledVolunteerId': order['volunteerId'],
      'driver': '',
      'stockState': 'releasePending',
      'stockReleased': false,
      'updatedAt': timestamp,
    };
    result.remove('volunteerId');
    return result;
  }

  static Map<String, dynamic> stock(
      Map<String, dynamic> food, Map<String, dynamic> order,
      {required bool release, required int nowMs}) {
    final id = '${order['id']}';
    final journal = '${food['stockJournal'] ?? ''}';
    final hold = token(id, 'H'), released = token(id, 'R');
    if (release && journal.contains(released)) return food;
    check(release || !journal.contains(released),
        'Đơn đã hủy, không thể giữ suất.');
    if (!release && journal.contains(hold)) return food;
    final quantity = (order['quantity'] as num).toInt();
    final reserved = (food['reserved'] as num?)?.toInt() ?? 0;
    final held = journal.contains(hold) || order['cancelHadStock'] == true;
    final next = reserved + (release ? (held ? -quantity : 0) : quantity);
    if (!release) {
      check(
          food['status'] == 'open' &&
              (food['expiresAtMs'] as num? ?? 0) > nowMs,
          'Món đã đóng hoặc hết hạn.');
    }
    check(
        next >= 0 && next <= (food['quantity'] as num),
        release
            ? 'Số suất giữ không khớp. Cần admin kiểm tra qua hỗ trợ.'
            : 'Không đủ số lượng.');
    return {
      ...food,
      'reserved': next,
      'stockJournal': '$journal${release ? released : hold}',
      'lastStockOrderId': id,
    };
  }
}
