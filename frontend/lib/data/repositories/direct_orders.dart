part of '../firebase/direct_backend.dart';

const _orderCommands = {
  'requestFood',
  'transitionOrder',
  'confirmSchedule',
  'renewHandover',
  'loadHandover',
  'verifyHandover',
  'savePickupPhoto',
  'assignVolunteer',
  'transferJob',
  'distribute'
};

extension _DirectOrders on BackendApi {
  Future<Map<String, dynamic>> _orders(
      String command, Map<String, dynamic> p) async {
    if (command == 'requestFood') {
      final u = await account('charity');
      final f = await read('demo/foods/${p['foodId']}');
      require(
          f['status'] == 'open' &&
              (f['expiresAtMs'] as num) > DateTime.now().millisecondsSinceEpoch,
          'Món không còn mở nhận.');
      final qty = quantity(
          p['quantity'],
          (f['quantity'] as num).toInt() -
              ((f['reserved'] as num?)?.toInt() ?? 0));
      final existing = rows(await matching('orders', 'organizationId', uid));
      require(
          !existing.any((o) =>
              o['foodId'] == f['id'] &&
              o['organizationId'] == uid &&
              !['cancelled', 'rejected', 'completed'].contains(o['status'])),
          'Bạn đã có yêu cầu đang xử lý cho món này.');
      require(['Nhờ giao hộ', 'Tự đến lấy'].contains(p['transport']),
          'Chọn phương thức nhận.');
      final key = id();
      await db.ref().update({
        'demo/orders/$key': {
          'id': key,
          'foodId': f['id'],
          'donorId': f['donorId'],
          'organizationId': uid,
          'organization': u['name'],
          'quantity': qty,
          'status': 'awaiting',
          'transport': p['transport'],
          'driver': '',
          'time': text(p['time'], 200),
          if (p['receiver'] != null) 'receiver': text(p['receiver'], 100),
          'note': p['note'] ?? '',
          'received': 0,
          'createdAt': now
        },
        'foodAccess/${f['id']}/$uid': {'orderId': key},
      });
      await notify('${f['donorId']}', 'Yêu cầu nhận món mới',
          '${u['name']} xin $qty suất ${f['name']}');
      return {'id': key};
    }
    if (command == 'distribute') {
      await account('charity');
      final inv = await read('demo/inventory/$uid'), key = id();
      final qty = quantity(
          p['quantity'],
          ((inv['received'] as num?)?.toInt() ?? 0) -
              ((inv['distributed'] as num?)?.toInt() ?? 0));
      await db.ref().update({
        'demo/distributions/$key': {
          'id': key,
          'uid': uid,
          'quantity': qty,
          'createdAt': now
        },
        'demo/inventory/$uid/distributed':
            ((inv['distributed'] as num?)?.toInt() ?? 0) + qty,
        'demo/inventory/$uid/lastDistributionId': key
      });
      return {'id': key};
    }
    final o = await order(p['id'],
        member: command != 'transitionOrder' || p['status'] != 'assigned');
    final key = o['id'];
    final path = 'demo/orders/$key';
    if (command == 'transitionOrder') {
      final status = p['status'];
      final previous = o['status'];
      final update = <String, Object?>{
        '$path/status': status,
        '$path/updatedAt': now
      };
      if (status == 'accepted' || status == 'rejected') {
        await account('donor');
        require(o['donorId'] == uid && previous == 'awaiting',
            'Chỉ xử lý yêu cầu đang chờ của bạn.');
        if (status == 'accepted') {
          final f = await read('demo/foods/${o['foodId']}');
          require(
              f['status'] == 'open' &&
                  (f['expiresAtMs'] as num) >
                      DateTime.now().millisecondsSinceEpoch,
              'Món đã đóng hoặc hết hạn.');
          final next = ((f['reserved'] as num?)?.toInt() ?? 0) +
              (o['quantity'] as num).toInt();
          require(next <= (f['quantity'] as num), 'Không đủ số lượng.');
          update['demo/foods/${o['foodId']}/reserved'] = next;
          update['demo/foods/${o['foodId']}/lastStockOrderId'] = key;
        }
      } else if (status == 'cancelled') {
        require(
            [o['donorId'], o['organizationId']].contains(uid) &&
                ['awaiting', 'accepted', 'assigned'].contains(previous),
            'Không thể hủy đơn này.');
        if (previous != 'awaiting') {
          final f = await read('demo/foods/${o['foodId']}');
          update['demo/foods/${o['foodId']}/reserved'] =
              (f['reserved'] as num).toInt() - (o['quantity'] as num).toInt();
          update['demo/foods/${o['foodId']}/lastStockOrderId'] = key;
        }
      } else if (status == 'assigned') {
        final u = await account('volunteer');
        require(
            o['status'] == 'accepted' &&
                o['volunteerId'] == null &&
                o['transport'] == 'Nhờ giao hộ',
            'Chuyến đã có người nhận.');
        // Rules compare the current server status and empty volunteer field;
        // a competing second claimant cannot overwrite the first assignment.
        await db.ref().update({
          '$path/status': 'assigned',
          '$path/volunteerId': uid,
          '$path/driver': u['name'],
          '$path/updatedAt': now,
          'foodAccess/${o['foodId']}/$uid': {'orderId': key},
        });
        return {'id': key};
      } else if (status == 'completed') {
        await account('charity');
        require(
            o['organizationId'] == uid &&
                previous == 'pickedUp' &&
                (o['transport'] == 'Tự đến lấy' ||
                    o['deliveryConfirmed'] == true),
            'Cần xác nhận mã bàn giao trước.');
        final received =
            quantity(p['received'], (o['quantity'] as num).toInt());
        final inv = await read('demo/inventory/$uid');
        final photo = '${p['photo'] ?? ''}';
        require(photo.isEmpty || CloudinaryStorage.isRemote(photo),
            'Ảnh nhận hàng không hợp lệ.');
        update.addAll({
          if (photo.isNotEmpty) '$path/receiptPhoto': photo,
          '$path/received': received,
          '$path/completedAt': now,
          'demo/inventory/$uid/received':
              ((inv['received'] as num?)?.toInt() ?? 0) + received,
          'demo/inventory/$uid/distributed':
              (inv['distributed'] as num?)?.toInt() ?? 0,
          'demo/inventory/$uid/lastReceivedOrderId': key
        });
      } else {
        throw StateError('Bước chuyển trạng thái không hợp lệ.');
      }
      await db.ref().update(update);
      for (final target in [o['donorId'], o['organizationId'], o['volunteerId']]
          .whereType<String>()) {
        await notify(target, 'Cập nhật đơn', '$key: $status');
      }
    } else if (command == 'confirmSchedule') {
      await account('donor');
      require(
          o['donorId'] == uid && ['accepted', 'assigned'].contains(o['status']),
          'Không thể sửa lịch.');
      await db.ref(path).update({
        'time': text(p['time'], 200),
        'note': p['note'] ?? '',
        'updatedAt': now
      });
    } else if (command == 'renewHandover' || command == 'loadHandover') {
      final stage = p['stage'];
      require(['pickup', 'receipt'].contains(stage), 'Loại mã không hợp lệ.');
      require(
          stage == 'pickup'
              ? o['donorId'] == uid &&
                  ['accepted', 'assigned'].contains(o['status'])
              : o['organizationId'] == uid && o['status'] == 'pickedUp',
          'Bạn không thể tạo mã bước này.');
      if (command == 'loadHandover') {
        final existing = await read('handover/$key/$stage');
        if (existing['used'] == false &&
            (existing['expiresAt'] as num? ?? 0) >
                DateTime.now().millisecondsSinceEpoch &&
            (existing['attempts'] as num? ?? 0) < 5) {
          return {'pin': existing['pin'], 'expiresAt': existing['expiresAt']};
        }
      }
      final pin = (100000 + Random.secure().nextInt(900000)).toString();
      final expires = DateTime.now().millisecondsSinceEpoch + 600000;
      await db.ref('handover/$key/$stage').set({
        'pin': pin,
        'creatorId': uid,
        'expiresAt': expires,
        'attempts': 0,
        'used': false
      });
      return {'pin': pin, 'expiresAt': expires};
    } else if (command == 'verifyHandover') {
      final stage = p['stage'];
      require(['pickup', 'receipt'].contains(stage), 'Loại mã không hợp lệ.');
      require(
          stage == 'pickup'
              ? (o['volunteerId'] == uid && o['status'] == 'assigned' ||
                  o['organizationId'] == uid &&
                      o['transport'] == 'Tự đến lấy' &&
                      o['status'] == 'accepted')
              : o['volunteerId'] == uid && o['status'] == 'pickedUp',
          'Bạn không phải người bàn giao.');
      final ref = db.ref('handover/$key/$stage');
      final saved = map((await ref.get()).value);
      final resume = saved['used'] == true &&
          saved['verifierId'] == uid &&
          saved['enteredPin'] == '${p['pin']}';
      if (!resume) {
        require(
            saved.isNotEmpty &&
                saved['used'] != true &&
                (saved['expiresAt'] as num) >
                    DateTime.now().millisecondsSinceEpoch &&
                (saved['attempts'] as num) < 5,
            'Mã đã dùng, hết hạn hoặc đã khóa. Hãy tạo mã mới.');
        final correct = '${saved['pin']}' == '${p['pin']}';
        // Rules verify both the PIN and attempts against the current record.
        // Commit a failed attempt before reporting the error to the UI.
        await ref.update({
          'attempts': (saved['attempts'] as num).toInt() + 1,
          'enteredPin': '${p['pin']}',
          'used': correct,
          'verifierId': uid,
        });
        require(correct, 'Mã không đúng.');
      }
      await db.ref(path).update({
        if (stage == 'pickup')
          'status': 'pickedUp'
        else
          'deliveryConfirmed': true,
        'updatedAt': now
      });
    } else if (command == 'savePickupPhoto') {
      await account('volunteer');
      require(
          o['volunteerId'] == uid &&
              o['status'] == 'pickedUp' &&
              CloudinaryStorage.isRemote('${p['path']}'),
          'Không thể gửi ảnh bàn giao.');
      await db.ref(path).update({'proof': p['path'], 'proofAt': now});
    } else if (command == 'assignVolunteer') {
      await account('admin');
      final volunteer = await read('users/${p['uid']}');
      require(
          ['accepted', 'assigned', 'pickedUp'].contains(o['status']) &&
              o['transport'] == 'Nhờ giao hộ' &&
              volunteer['role'] == 'volunteer' &&
              volunteer['verificationStatus'] == 'approved' &&
              volunteer['disabled'] != true,
          'Tình nguyện viên hoặc chuyến chưa hợp lệ.');
      await db.ref(path).update({
        'volunteerId': p['uid'],
        'driver': volunteer['name'],
        if (o['status'] == 'accepted') 'status': 'assigned',
        'updatedAt': now
      });
      await db
          .ref('foodAccess/${o['foodId']}/${p['uid']}')
          .set({'orderId': key});
      await notify('${p['uid']}', 'Chuyến được phân công', '$key');
    } else if (command == 'transferJob') {
      await account('volunteer');
      require(
          o['volunteerId'] == uid &&
              ['assigned', 'pickedUp'].contains(o['status']),
          'Chuyến không thuộc bạn.');
      final ticketId = id();
      await db.ref('demo/tickets/$ticketId').set({
        'id': ticketId,
        'uid': uid,
        'orderId': key,
        'detail': text(p['reason']),
        'status': 'open',
        'type': 'transfer',
        'createdAt': now
      });
      return {'id': ticketId};
    }
    return {'id': key};
  }
}
