part of '../firebase/direct_backend.dart';

const _foodCommands = {
  'publishFood',
  'editFood',
  'reviewFood',
  'closeFood',
  'addNeed',
  'reviewNeed',
  'editNeed',
  'closeNeed'
};

extension _DirectFoods on BackendApi {
  Future<Map<String, dynamic>> _foods(
      String command, Map<String, dynamic> p) async {
    if (command == 'publishFood' || command == 'editFood') {
      final user = await account('donor'), edit = command == 'editFood';
      final key = edit ? text(p['id'], 200) : id();
      final old = edit ? await read('demo/foods/$key') : <String, dynamic>{};
      require(!edit || old['donorId'] == uid && (old['reserved'] ?? 0) == 0,
          'Món đã có đơn nhận, không thể sửa.');
      final expiry = DateTime.tryParse('${p['expiresAt']}');
      require(expiry != null && expiry.isAfter(DateTime.now()),
          'Hạn dùng phải sau thời điểm hiện tại.');
      require(p['safe'] == true, 'Hãy xác nhận an toàn thực phẩm.');
      final photo = p['photo']?.toString() ?? '';
      require(photo.isEmpty || CloudinaryStorage.isRemote(photo),
          'Ảnh cần được tải lên Cloudinary.');
      final photos = List<String>.from(
          p['photos'] as List? ?? (photo.isEmpty ? [] : [photo]));
      require(photos.length <= 6 && photos.every(CloudinaryStorage.isRemote),
          'Tối đa 6 ảnh món ăn được tải lên Cloudinary.');
      final food = <String, dynamic>{
        ...old,
        'id': key,
        'donorId': uid,
        'donor': user['name'],
        'name': text(p['name'], 200),
        'quantity': quantity(p['quantity']),
        'reserved': 0,
        'category': text(p['category'], 200),
        'storage': text(p['storage'], 200),
        'address': text(p['address'], 500),
        'pickup': text(p['pickup'], 200),
        'allergens': p['allergens'] ?? <String>[],
        'note': p['note']?.toString() ?? '',
        'photo': photo,
        if (photos.isNotEmpty) 'photos': photos,
        'expiresAt': expiry!.toUtc().toIso8601String(),
        'expiresAtMs': expiry.millisecondsSinceEpoch,
        'status': 'pending',
        'reviewNote': '',
        'safe': true,
        'createdAt': old['createdAt'] ?? now,
        'updatedAt': now,
        if (p['latitude'] is num) 'latitude': p['latitude'],
        if (p['longitude'] is num) 'longitude': p['longitude'],
      };
      await db.ref('demo/foods/$key').set(food);
      return {'id': key};
    }
    if (command == 'reviewFood' || command == 'reviewNeed') {
      await account('admin');
      final table = command == 'reviewFood' ? 'foods' : 'needs';
      final item = await read('demo/$table/${p['id']}');
      require(
          item['status'] == 'pending' &&
              ['open', 'rejected'].contains(p['status']),
          'Tin không còn chờ duyệt.');
      await db.ref('demo/$table/${p['id']}').update({
        'status': p['status'],
        'reviewNote': text(p['note']),
        'reviewedBy': uid,
        'reviewedAt': now
      });
      await notify('${item['donorId'] ?? item['uid']}', 'Kết quả duyệt tin',
          '${p['status']}: ${p['note']}');
      return {};
    }
    if (command == 'closeFood') {
      await account('donor');
      final f = await read('demo/foods/${p['id']}');
      require(f['donorId'] == uid, 'Món không thuộc tài khoản này.');
      final pending = rows(await matching('orders', 'donorId', uid))
          .where((o) => o['foodId'] == p['id'] && o['status'] == 'awaiting');
      await db.ref('demo/foods/${p['id']}/status').set('closed');
      for (final o in pending) {
        await _cancelOrder('${o['id']}', 'Người cho đã đóng tin món ăn.');
      }
      return {};
    }
    await account('charity');
    if (command == 'closeNeed' || command == 'editNeed') {
      final old = await read('demo/needs/${p['id']}');
      require(old['uid'] == uid, 'Nhu cầu không thuộc tài khoản này.');
      await db.ref('demo/needs/${p['id']}').update(command == 'closeNeed'
          ? {'status': 'closed'}
          : {
              'title': text(p['title'], 200),
              'quantity': quantity(p['quantity']),
              'status': 'pending',
              'updatedAt': now,
            });
      return {'id': p['id']};
    }
    final key = id();
    await db.ref('demo/needs/$key').set({
      'id': key,
      'uid': uid,
      'title': text(p['title'], 200),
      'quantity': quantity(p['quantity']),
      'category': text(p['category'], 300),
      'priority': p['priority'] ?? 'Bình thường',
      'status': 'pending',
      'createdAt': now
    });
    return {'id': key};
  }
}
