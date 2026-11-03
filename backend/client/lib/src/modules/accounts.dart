part of '../firebase/sharemeal_client.dart';

const _accountCommands = {
  'registerProfile',
  'selectRole',
  'updateProfile',
  'submitApplication',
  'reviewApplication',
  'setAccountDisabled',
  'registerShift'
};

extension _DirectAccounts on ShareMealClient {
  Future<Map<String, dynamic>> _accounts(
      String command, Map<String, dynamic> p) async {
    final user = await read('users/$uid');
    final roles = ['donor', 'charity', 'volunteer'];
    switch (command) {
      case 'registerProfile':
        if (user.isEmpty) {
          await db.ref('users/$uid').set({
            'uid': uid,
            'name': text(p['name'], 100),
            'email': auth.currentUser!.email ?? '',
            'role': '',
            'verificationStatus': 'draft',
            'disabled': false,
            'createdAt': now
          });
        }
      case 'selectRole':
        require(
            roles.contains(p['role']) &&
                (user['role'] == '' || user['role'] == p['role']),
            'Vai trò đã đăng ký. Đổi vai trò cần gửi hồ sơ mới.');
        await db.ref('users/$uid/role').set(p['role']);
      case 'updateProfile':
        final changes = <String, Object?>{};
        for (final key in ['name', 'phone', 'address']) {
          if (p.containsKey(key)) {
            changes[key] = text(p[key], key == 'address' ? 500 : 100);
          }
        }
        await db.ref('users/$uid').update(changes);
      case 'submitApplication':
        require(roles.contains(p['role']) && p['consent'] == true,
            'Hãy chọn vai trò và đồng ý cam kết.');
        require(
            user['role'] != 'admin' && user['verificationStatus'] != 'pending',
            'Hồ sơ đang chờ duyệt.');
        final docs = List<String>.from(p['documents'] as List? ?? []);
        require(
            docs.isNotEmpty &&
                docs.length <= 10 &&
                docs.every(CloudinaryStorage.isRemote),
            'Hãy tải giấy tờ lên Cloudinary.');
        final key = id();
        await db.ref().update({
          'demo/applications/$key': {
            'id': key,
            'uid': uid,
            'name': user['name'],
            'role': p['role'],
            'documents': docs,
            'details': text(p['details'], 8000),
            'status': 'pending',
            'createdAt': now
          },
          'users/$uid/verificationStatus': 'pending',
          'users/$uid/applicationId': key,
        });
        return {'id': key};
      case 'reviewApplication':
        await account('admin');
        final a = await read('demo/applications/${p['id']}');
        require(
            a['status'] == 'pending' &&
                ['approved', 'rejected', 'supplement'].contains(p['status']),
            'Hồ sơ không còn chờ duyệt.');
        final note = text(p['note']);
        final target = a['uid'];
        await db.ref().update({
          'demo/applications/${p['id']}/status': p['status'],
          'demo/applications/${p['id']}/note': note,
          'demo/applications/${p['id']}/reviewedBy': uid,
          'demo/applications/${p['id']}/reviewedAt': now,
          'users/$target/verificationStatus': p['status'],
          if (p['status'] == 'approved') 'users/$target/role': a['role'],
        });
        await notify('$target', 'Kết quả xác minh', '${p['status']}: $note');
      case 'setAccountDisabled':
        await account('admin');
        final target = text(p['uid'], 200),
            other = await read('users/${p['uid']}');
        require(
            target != uid && other['role'] != 'admin' && p['disabled'] is bool,
            'Không thể khóa tài khoản admin.');
        await db.ref('users/$target/disabled').set(p['disabled']);
      case 'registerShift':
        await account('volunteer');
        final date = DateTime.tryParse('${p['date']}');
        final today = DateTime.now();
        final start = DateTime(today.year, today.month, today.day);
        require(
            date != null &&
                !date.isBefore(start) &&
                date.isBefore(start.add(const Duration(days: 91))),
            'Chọn ngày trong 90 ngày tới.');
        final key = '${uid}_${p['date']}';
        if (p['cancel'] == true) {
          await db.ref('demo/shifts/$key').remove();
        } else {
          await db
              .ref('demo/shifts/$key')
              .set({'id': key, 'uid': uid, 'date': p['date']});
        }
    }
    return {};
  }
}
