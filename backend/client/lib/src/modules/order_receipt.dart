part of '../firebase/sharemeal_client.dart';

extension _DirectOrderReceipt on ShareMealClient {
  Future<void> _finishReceipt(Map<String, dynamic> o) async {
    if (o['status'] == 'completed' || o['receiptState'] != 'pending') return;
    await account('charity');
    require(o['organizationId'] == uid, 'Đơn không thuộc tổ chức của bạn.');
    if (o['hasDiscrepancy'] == true) {
      final ticket = OrderReceiptProtocol.ticketId('${o['id']}');
      final ref = db.ref('demo/tickets/$ticket');
      // The deterministic ID survives retry even if admin already handled it.
      await ref.get();
      final result = await ref.runTransaction((current) {
        if (current != null) return Transaction.abort();
        return Transaction.success({
          'id': ticket,
          'uid': uid,
          'name': o['organization'],
          'orderId': o['id'],
          'type': 'quantityDiscrepancy',
          'reason': 'Chênh lệch số lượng giao nhận',
          'detail': o['discrepancyNote'],
          'status': 'open',
          'createdAt': o['receiptRequestedAt'],
        });
      }, applyLocally: false);
      require(result.committed || result.snapshot.exists,
          'Vụ hỗ trợ chưa được ghi. Hãy thử lại.');
    }
    final queueKey = '${db.app.name}/${db.databaseURL}/inventory/$uid';
    final previous = ShareMealClient._stockQueues[queueKey],
        done = Completer<void>();
    ShareMealClient._stockQueues[queueKey] = done.future;
    try {
      if (previous != null) await previous;
      final ref = db.ref('demo/inventory/$uid');
      await ref.get();
      Object? failure;
      var unchanged = false;
      final result = await ref.runTransaction((current) {
        try {
          failure = null;
          final before = map(current),
              after = OrderReceiptProtocol.credit(map(current), o);
          unchanged = '${before['receiptJournal'] ?? ''}' ==
              '${after['receiptJournal'] ?? ''}';
          return unchanged ? Transaction.abort() : Transaction.success(after);
        } catch (e) {
          failure = e;
          return Transaction.abort();
        }
      }, applyLocally: false);
      if (failure != null) throw failure!;
      require(result.committed || unchanged,
          'Nhập kho chưa hoàn tất. Hãy thử lại.');
    } finally {
      done.complete();
      if (identical(ShareMealClient._stockQueues[queueKey], done.future)) {
        ShareMealClient._stockQueues.remove(queueKey);
      }
    }
    await _transaction('demo/orders/${o['id']}', (current) {
      if (current['status'] == 'completed') return current;
      require(
          current['receiptState'] == 'pending', 'Xác nhận nhận hàng đã đổi.');
      return {
        ...current,
        'status': 'completed',
        'receiptState': 'completed',
        'inventoryAdded': true,
        'completedAt': now,
        'updatedAt': now
      };
    });
  }

  Future<Map<String, dynamic>> _completeOrder(
      String key, Map<String, dynamic> p) async {
    await account('charity');
    final photo = '${p['photo'] ?? ''}';
    require(photo.isEmpty || CloudinaryStorage.isRemote(photo),
        'Ảnh nhận hàng không hợp lệ.');
    final received = int.tryParse('${p['received']}') ?? -1;
    final o = await _transaction(
        'demo/orders/$key',
        (current) => OrderReceiptProtocol.begin(
            current, uid, received, '${p['note'] ?? ''}', photo, now));
    await _finishReceipt(o);
    return {'id': key};
  }
}
