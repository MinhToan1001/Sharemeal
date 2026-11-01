part of '../firebase/direct_backend.dart';

extension _DirectCommunity on BackendApi {
  Future<Map<String, dynamic>> _community(
      String command, Map<String, dynamic> p) async {
    final u = await account();
    switch (command) {
      case 'sendMessage':
        final o = await order(p['orderId']);
        final key = id();
        await db.ref('demo/messages/$key').set({
          'id': key,
          'orderId': o['id'],
          'uid': uid,
          'name': u['name'],
          'text': text(p['text']),
          'time': now
        });
        for (final target in [
          o['donorId'],
          o['organizationId'],
          o['volunteerId']
        ].whereType<String>().where((v) => v != uid)) {
          await notify(target, 'Tin nhắn từ ${u['name']}', '${o['id']}');
        }
      case 'submitTicket':
        if ('${p['orderId'] ?? ''}'.isNotEmpty) await order(p['orderId']);
        final photo = p['photo']?.toString() ?? '';
        require(photo.isEmpty || CloudinaryStorage.isRemote(photo),
            'Ảnh không hợp lệ.');
        final key = id();
        await db.ref('demo/tickets/$key').set({
          'id': key,
          'uid': uid,
          'name': u['name'],
          'orderId': p['orderId'] ?? '',
          'reason': text(p['reason'], 200),
          'detail': text(p['detail']),
          'photo': photo,
          'status': 'open',
          'createdAt': now
        });
        return {'id': key};
      case 'resolveTicket':
        await account('admin');
        final ticket = await read('demo/tickets/${p['id']}');
        require(
            ['open', 'investigating'].contains(ticket['status']) &&
                ['investigating', 'resolved', 'rejected'].contains(p['status']),
            'Vụ việc đã kết thúc.');
        await db.ref('demo/tickets/${p['id']}').update({
          'status': p['status'],
          'resolution': text(p['note']),
          'resolvedBy': uid
        });
        await notify('${ticket['uid']}', 'Cập nhật hỗ trợ', '${p['note']}');
      case 'saveReview':
        final o = await order(p['orderId']);
        require(
            o['status'] == 'completed' &&
                [o['donorId'], o['organizationId']].contains(uid),
            'Chỉ đánh giá đơn đã hoàn tất.');
        final rating = quantity(p['rating'], 5);
        await db.ref('demo/reviews/${o['id']}_$uid').set({
          'orderId': o['id'],
          'uid': uid,
          'rating': rating,
          'note': text(p['note'] ?? 'Cảm ơn'),
          'createdAt': now
        });
      case 'sendThanks':
        final o = await order(p['orderId']);
        require(o['organizationId'] == uid && o['status'] == 'completed',
            'Chỉ gửi cảm ơn sau khi hoàn tất.');
        final thanks = text(p['text']);
        final photo = '${p['photo'] ?? ''}';
        require(photo.isEmpty || CloudinaryStorage.isRemote(photo),
            'Ảnh cảm ơn không hợp lệ.');
        await db.ref('demo/orders/${o['id']}').update(
            {'thanks': thanks, if (photo.isNotEmpty) 'thanksPhoto': photo});
        await notify('${o['donorId']}', 'Lời cảm ơn', thanks);
      case 'readAll':
        final notices = await matching('notifications', 'uid', uid);
        final changes = <String, Object?>{};
        for (final row in notices.entries) {
          if (map(row.value)['uid'] == uid) changes['${row.key}/read'] = true;
        }
        if (changes.isNotEmpty) {
          await db.ref('demo/notifications').update(changes);
        }
      case 'readNotification':
        final notice = await read('demo/notifications/${p['id']}');
        require(notice['uid'] == uid, 'Thông báo không thuộc tài khoản này.');
        await db.ref('demo/notifications/${p['id']}/read').set(true);
      default:
        throw StateError('Chức năng chưa được hỗ trợ: $command');
    }
    return {};
  }
}
