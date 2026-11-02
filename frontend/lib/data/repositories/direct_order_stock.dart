part of '../firebase/direct_backend.dart';

extension _DirectOrderStock on BackendApi {
  Future<Map<String, dynamic>> _transaction(String path,
      Map<String, dynamic> Function(Map<String, dynamic>) change) async {
    final ref = db.ref(path);
    await ref.get();
    Object? failure;
    var unchanged = false;
    final result = await ref.runTransaction((current) {
      // A native transaction may first be called with an empty local cache.
      if (current == null) return Transaction.success(current);
      try {
        failure = null;
        unchanged = false;
        final before = map(current);
        final after = change(before);
        if (identical(before, after)) {
          unchanged = true;
          return Transaction.abort();
        }
        return Transaction.success(after);
      } catch (e) {
        failure = e;
        return Transaction.abort();
      }
    }, applyLocally: false);
    if (failure != null) throw failure!;
    require((result.committed || unchanged) && result.snapshot.exists,
        'Dữ liệu đã đổi. Hãy thử lại.');
    return map(result.snapshot.value);
  }

  Future<void> _changeStock(Map<String, dynamic> o,
      {required bool release}) async {
    // SDKs batch overlapping transactions at the same path into one server
    // write. Serialize this client's food operations so rules can validate one
    // journal append per write; other devices still compete through RTDB CAS.
    final queueKey = '${db.app.name}/${db.databaseURL}/${o['foodId']}';
    final previous = BackendApi._stockQueues[queueKey];
    final done = Completer<void>();
    BackendApi._stockQueues[queueKey] = done.future;
    try {
      if (previous != null) await previous;
      await _transaction(
          'demo/foods/${o['foodId']}',
          (food) => OrderStockProtocol.stock(food, o,
              release: release, nowMs: DateTime.now().millisecondsSinceEpoch));
    } finally {
      done.complete();
      if (identical(BackendApi._stockQueues[queueKey], done.future)) {
        BackendApi._stockQueues.remove(queueKey);
      }
    }
  }

  Future<Map<String, dynamic>> _acceptOrder(String key) async {
    await account('donor');
    final path = 'demo/orders/$key';
    final existing = await order(key);
    require(
        existing['donorId'] == uid, 'Chỉ người cho của đơn được chấp nhận.');
    if (['accepted', 'assigned', 'pickedUp', 'completed']
        .contains(existing['status'])) {
      return {'id': key};
    }
    // Validate stock/expiry before recording an intent. The transaction repeats
    // this check against the current server value, so this is not authority.
    OrderStockProtocol.stock(
        await read('demo/foods/${existing['foodId']}'), existing,
        release: false, nowMs: DateTime.now().millisecondsSinceEpoch);
    final o = await _transaction(
        path, (o) => OrderStockProtocol.beginAccept(o, uid, now));
    try {
      await _changeStock(o, release: false);
    } on StateError {
      // A definite stock rejection did not reserve anything. Remove the intent
      // only after checking the journal; an uncertain network failure keeps it
      // for retry/recovery instead of guessing whether the server committed.
      final food = await read('demo/foods/${o['foodId']}');
      if (!'${food['stockJournal'] ?? ''}'
          .contains(OrderStockProtocol.token(key, 'H'))) {
        await _transaction(
            path,
            (current) => current['status'] == 'awaiting' &&
                    current['stockState'] == 'reserving'
                ? {...current, 'stockState': 'idle', 'updatedAt': now}
                : current);
      }
      rethrow;
    }
    await _transaction(path, (current) {
      if (current['stockReserved'] == true && current['status'] == 'accepted') {
        return current;
      }
      require(
          current['status'] == 'awaiting' &&
              current['stockState'] == 'reserving',
          'Đơn đã đổi trạng thái; không thể chấp nhận.');
      return {
        ...current,
        'status': 'accepted',
        'stockState': 'held',
        'stockReserved': true,
        'updatedAt': now
      };
    });
    await notify(
        '${o['organizationId']}', 'Cập nhật đơn nhận', '$key: accepted');
    return {'id': key};
  }

  Future<void> _finishCancellation(Map<String, dynamic> o) async {
    if (o['stockReleased'] == true || o['stockState'] != 'releasePending') {
      return;
    }
    if (o['organizationId'] == uid) {
      // Older orders may predate foodAccess. The immutable order authorizes
      // this grant, allowing the food transaction even when its listing closed.
      await db.ref('foodAccess/${o['foodId']}/$uid').set({'orderId': o['id']});
    }
    await _changeStock(o, release: true);
    await _transaction('demo/orders/${o['id']}', (current) {
      require(
          current['status'] == 'cancelled', 'Đơn không ở trạng thái đã hủy.');
      return {
        ...current,
        'stockState': 'released',
        'stockReleased': true,
        'updatedAt': now
      };
    });
  }

  Future<Map<String, dynamic>> _cancelOrder(String key, String reason) async {
    final u = await account();
    final admin = u['role'] == 'admin';
    if (admin) await account('admin');
    final o = await _transaction(
        'demo/orders/$key',
        (current) =>
            OrderStockProtocol.cancel(current, uid, admin, reason, now));
    await _finishCancellation(o);
    if (o['stockState'] == 'releasePending' && o['stockReleased'] != true) {
      for (final target in <String>{
        '${o['donorId']}',
        '${o['organizationId']}',
        '${o['cancelledVolunteerId'] ?? ''}'
      }) {
        if (target.isNotEmpty) {
          await notify(target, 'Đơn đã hủy', '$key: ${o['cancelReason']}');
        }
      }
    }
    return {'id': key};
  }
}
