/// Receipt intent is immutable once persisted. Inventory records its own
/// append-only marker, closing the gap before the order is marked completed.
abstract final class OrderReceiptProtocol {
  static bool validPhoto(String value) {
    final uri = Uri.tryParse(value);
    return uri?.scheme == 'https' &&
        uri?.host == 'res.cloudinary.com' &&
        uri!.path.startsWith('/toanvip/image/upload/') &&
        RegExp(r'\.(png|jpe?g)$').hasMatch(uri.path);
  }

  static int requested(Map o) =>
      ((o['qtyRequested'] ?? o['quantity']) as num).toInt();
  static int pickedUp(Map o) =>
      ((o['qtyPickedUp'] ?? o['quantity']) as num).toInt();
  static String marker(String id) => '|$id:I|';
  static String ticketId(String id) => 'receipt_$id';
  static void check(bool ok, String message) {
    if (!ok) throw StateError(message);
  }

  static Map<String, dynamic> begin(Map<String, dynamic> o, String uid,
      int received, String note, String photo, String now) {
    check(
        o['organizationId'] == uid, 'Chỉ tổ chức nhận được xác nhận nhập kho.');
    if (o['status'] == 'completed') return o;
    if (o['receiptState'] == 'pending') {
      if (validPhoto('${o['receiptPhoto'] ?? ''}')) return o;
      check(validPhoto(photo),
          'Hãy thêm ít nhất một ảnh nhận hàng JPG/PNG trước khi hoàn tất.');
      // An E/legacy pending receipt may already have its inventory marker.
      // Attach only missing evidence; keep all quantities and intent unchanged.
      return {...o, 'receiptPhoto': photo, 'updatedAt': now};
    }
    check(
        o['status'] == 'pickedUp' &&
            (o['transport'] == 'Tự đến lấy' || o['deliveryConfirmed'] == true),
        'Cần xác nhận mã bàn giao trước.');
    check(validPhoto(photo),
        'Hãy thêm ít nhất một ảnh nhận hàng JPG/PNG trước khi hoàn tất.');
    check(received >= 0 && received <= requested(o),
        'Số thực nhận không hợp lệ.');
    final discrepancy = received != requested(o) || received != pickedUp(o);
    check(
        note.trim().length <= 2000 && (!discrepancy || note.trim().isNotEmpty),
        'Số lượng có chênh lệch. Hãy nhập ghi chú (tối đa 2000 ký tự).');
    return {
      ...o,
      'qtyRequested': requested(o),
      'qtyPickedUp': pickedUp(o),
      'qtyReceived': received,
      'received': received,
      'hasDiscrepancy': discrepancy,
      'discrepancyNote': note.trim(),
      if (discrepancy) 'discrepancyTicketId': ticketId('${o['id']}'),
      if (photo.isNotEmpty) 'receiptPhoto': photo,
      'receiptState': 'pending',
      'inventoryAdded': false,
      'receiptRequestedAt': now,
      'updatedAt': now,
    };
  }

  static Map<String, dynamic> credit(Map<String, dynamic> inventory, Map o) {
    final journal = '${inventory['receiptJournal'] ?? ''}',
        token = marker('${o['id']}');
    if (journal.contains(token)) return inventory;
    check(o['receiptState'] == 'pending' && o['status'] == 'pickedUp',
        'Chưa có xác nhận nhận hàng để nhập kho.');
    final received = (inventory['received'] as num?)?.toInt() ?? 0;
    final distributed = (inventory['distributed'] as num?)?.toInt() ?? 0;
    check(received >= distributed && distributed >= 0,
        'Kho không khớp. Hãy liên hệ hỗ trợ.');
    return {
      ...inventory,
      'received': received + (o['qtyReceived'] as num).toInt(),
      'distributed': distributed,
      'receiptJournal': '$journal$token',
      'lastReceivedOrderId': o['id']
    };
  }
}
