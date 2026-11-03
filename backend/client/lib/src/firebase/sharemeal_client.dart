import 'dart:async';
import 'dart:math';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';
import 'firebase_services.dart';
import '../media/cloudinary_storage.dart';
import '../protocols/order_stock_protocol.dart';
import '../protocols/order_receipt_protocol.dart';

part '../modules/accounts.dart';
part '../modules/foods.dart';
part '../modules/orders.dart';
part '../modules/order_stock.dart';
part '../modules/order_receipt.dart';
part '../modules/community.dart';

/// Direct Firebase adapter. Database Rules authorize every write.
class ShareMealClient {
  static final Map<String, Future<void>> _stockQueues = {};
  ShareMealClient(FirebaseServices services)
      : auth = services.auth,
        db = services.database;
  final FirebaseAuth auth;
  final FirebaseDatabase db;
  final CloudinaryStorage _storage = CloudinaryStorage();
  static const emulatorHost = String.fromEnvironment('FIREBASE_EMULATOR_HOST');
  int _version = 0;
  String get uid => auth.currentUser!.uid;
  String get now => DateTime.now().toUtc().toIso8601String();
  String id() => db.ref('demo').push().key!;
  Map<String, dynamic> map(dynamic value) =>
      value is Map ? Map<String, dynamic>.from(value) : {};
  List<Map<String, dynamic>> rows(dynamic value) => map(value)
      .entries
      .map((e) => <String, dynamic>{...map(e.value), 'id': e.key})
      .toList();
  Future<Map<String, dynamic>> read(String path) async =>
      map((await db.ref(path).get()).value);
  Query query(String table, String key, String value) =>
      db.ref('demo/$table').orderByChild(key).equalTo(value);
  Future<Map<String, dynamic>> matching(
          String table, String key, String value) async =>
      map((await query(table, key, value).get()).value);

  Map<String, Query> queries(Map<String, dynamic> user, bool admin) {
    final result = <String, Query>{};
    void add(String table, String key, String value) {
      result['$table/$key/$value'] = query(table, key, value);
    }

    for (final table in [
      'foods',
      'orders',
      'applications',
      'needs',
      'tickets',
      'notifications',
      'shifts',
      'distributions'
    ]) {
      if (admin) {
        result[table] = db.ref('demo/$table');
        continue;
      }
      if (table == 'foods' || table == 'needs') add(table, 'status', 'open');
      if (table == 'orders') {
        for (final key in ['donorId', 'organizationId', 'volunteerId']) {
          add(table, key, uid);
        }
        if (user['role'] == 'volunteer' &&
            user['verificationStatus'] == 'approved') {
          add(table, 'status', 'accepted');
        }
      } else {
        add(table, table == 'foods' ? 'donorId' : 'uid', uid);
      }
    }
    if (admin) {
      result['messages'] = db.ref('demo/messages');
      result['reviews'] = db.ref('demo/reviews');
    }
    result['inventory/$uid'] = db.ref('demo/inventory/$uid');
    return result;
  }

  Future<Map<String, dynamic>> loadData(
      Map<String, dynamic> user, bool admin) async {
    final data = <String, dynamic>{};
    await Future.wait(queries(user, admin).entries.map((entry) async {
      final value = map((await entry.value.get()).value),
          table = entry.key.split('/').first;
      if (table == 'inventory') {
        data[table] = {uid: value};
      } else {
        data[table] = {...map(data[table]), ...value};
      }
    }));
    final ownOrders =
        rows(data['orders']).where((o) => participant(o)).toList();
    if (!admin) {
      await Future.wait(ownOrders.map((o) async {
        for (final table in ['messages', 'reviews']) {
          final value = await matching(table, 'orderId', '${o['id']}');
          data[table] = {...map(data[table]), ...value};
        }
      }));
    }
    await Future.wait(
        ownOrders.map((o) => '${o['foodId']}').toSet().map((key) async {
      // Closed/rejected food remains visible to its order participants.
      if (!map(data['foods']).containsKey(key)) {
        final value = await read('demo/foods/$key');
        data['foods'] = {
          ...map(data['foods']),
          if (value.isNotEmpty) key: value
        };
      }
    }));
    return data;
  }

  void require(bool ok, String message) {
    if (!ok) throw StateError(message);
  }

  String text(dynamic value, [int max = 2000]) {
    final result = value?.toString().trim() ?? '';
    require(result.isNotEmpty && result.length <= max,
        'Thông tin còn trống hoặc quá dài.');
    return result;
  }

  int quantity(dynamic value, [int max = 100000]) {
    final n = int.tryParse('$value') ?? 0;
    require(n > 0 && n <= max, 'Số lượng không hợp lệ.');
    return n;
  }

  bool participant(Map o) =>
      [o['donorId'], o['organizationId'], o['volunteerId']].contains(uid);
  Future<Map<String, dynamic>> account([String? role]) async {
    require(auth.currentUser != null, 'Hãy đăng nhập trước.');
    final u = await read('users/$uid');
    require(u.isNotEmpty && u['disabled'] != true,
        'Tài khoản bị khóa hoặc chưa tạo hồ sơ.');
    if (role != null) {
      require(auth.currentUser!.emailVerified, 'Hãy xác minh email trước.');
      require(
          u['role'] == role &&
              (role == 'admin' || u['verificationStatus'] == 'approved'),
          'Vai trò chưa được admin duyệt.');
      if (role == 'admin') {
        require((await db.ref('config/adminUid').get()).value == uid,
            'Chỉ tài khoản admin được chỉ định được thao tác.');
      }
    }
    return u;
  }

  Future<Map<String, dynamic>> order(dynamic key, {bool member = true}) async {
    final o = await read('demo/orders/${text(key, 200)}');
    require(
        o.isNotEmpty &&
            (!member || participant(o) || (await account())['role'] == 'admin'),
        'Không tìm thấy đơn của bạn.');
    return o;
  }

  Future<void> notify(String target, String title, String body) async {
    try {
      await db.ref('demo/notifications/${id()}').set({
        'uid': target,
        'senderId': uid,
        'title': title,
        'body': body,
        'read': false,
        'createdAt': now
      });
    } catch (_) {
      /* Notifications must not cause committed business writes to repeat. */
    }
  }

  Future<Map<String, dynamic>> call(String command,
      [Map<String, dynamic> p = const {}]) async {
    require(auth.currentUser != null, 'Hãy đăng nhập trước.');
    Map<String, dynamic> result = {};
    if (command != 'refresh' && command != 'registerProfile') await account();
    if (command == 'refresh') {
      final u = await read('users/$uid');
      if (u['role'] == 'admin' &&
          auth.currentUser!.emailVerified &&
          u['disabled'] != true) {
        final ref = db.ref('config/adminUid');
        if (!(await ref.get()).exists) {
          await ref.runTransaction((current) =>
              current == null ? Transaction.success(uid) : Transaction.abort());
        }
      }
    } else if (command == 'fileUrl') {
      final path = text(p['path']);
      require(CloudinaryStorage.isRemote(path), 'Đường dẫn ảnh không hợp lệ.');
      result = {'url': path};
      return {'result': result};
    } else if (_accountCommands.contains(command)) {
      result = await _accounts(command, p);
    } else if (_foodCommands.contains(command)) {
      result = await _foods(command, p);
    } else if (_orderCommands.contains(command)) {
      result = await _orders(command, p);
    } else {
      result = await _community(command, p);
    }
    return {'result': result, 'view': await snapshot()};
  }

  Future<Map<String, dynamic>> snapshot() async {
    // Order overlapping reads by when they begin. A slow pre-write read must
    // not replace a newer command response just because it finishes later.
    final version = ++_version;
    final u = await read('users/$uid');
    final adminUid = (await db.ref('config/adminUid').get()).value;
    final admin = u['role'] == 'admin' && adminUid == uid;
    require(u['role'] != 'admin' || admin || !auth.currentUser!.emailVerified,
        'Tài khoản này chưa phải admin duy nhất. Kiểm tra config/adminUid trên Firebase rồi đăng nhập lại.');
    final available = auth.currentUser!.emailVerified &&
        u.isNotEmpty &&
        u['disabled'] != true;
    var data = available ? await loadData(u, admin) : <String, dynamic>{};
    // Resume a committed cancellation after a lost connection/app restart.
    // Only participants with cancellation authority (or admin) finish it.
    var recovered = false;
    for (final o in rows(data['orders'])) {
      if (o['status'] == 'pickedUp' &&
          o['receiptState'] == 'pending' &&
          o['organizationId'] == uid) {
        try {
          await _finishReceipt(o);
          recovered = true;
        } catch (_) {
          // Keep the immutable intent; retry on refresh/reopening the app.
        }
      }
      if (o['status'] == 'awaiting' &&
          o['stockState'] == 'reserving' &&
          o['donorId'] == uid) {
        try {
          await _acceptOrder('${o['id']}');
          recovered = true;
        } catch (_) {
          // Insufficient stock restores awaiting/idle; transport errors retry.
        }
      }
      if (o['status'] == 'cancelled' &&
          o['stockState'] == 'releasePending' &&
          (admin || [o['donorId'], o['organizationId']].contains(uid))) {
        try {
          await _finishCancellation(o);
          recovered = true;
        } catch (_) {
          // Keep the visible pending flag; a later refresh/manual retry resumes.
        }
      }
    }
    if (recovered) data = await loadData(u, admin);
    List<Map<String, dynamic>> all(String key) => rows(data[key]);
    final orders = all('orders')
        .where((o) =>
            admin ||
            participant(o) ||
            u['role'] == 'volunteer' &&
                u['verificationStatus'] == 'approved' &&
                o['status'] == 'accepted' &&
                o['transport'] == 'Nhờ giao hộ')
        .toList();
    final orderIds = orders.map((o) => o['id']).toSet();
    final foods = all('foods')
        .where((f) =>
            admin ||
            f['donorId'] == uid ||
            orders.any((o) => o['foodId'] == f['id']) ||
            f['status'] == 'open' &&
                ((f['quantity'] as num?) ?? 0) >
                    ((f['reserved'] as num?) ?? 0) &&
                (DateTime.tryParse('${f['expiresAt']}')
                        ?.isAfter(DateTime.now()) ??
                    false))
        .map((f) => <String, dynamic>{
              ...f,
              'quantity': ((f['quantity'] as num).toInt() -
                  ((f['reserved'] as num?)?.toInt() ?? 0)),
              'mine': f['donorId'] == uid,
              'distance': 0.0
            })
        .toList();
    return {
      'version': version,
      'profile': u,
      'foods': foods.reversed.toList(),
      'orders': orders.reversed.toList(),
      'applications':
          all('applications').where((a) => admin || a['uid'] == uid).toList(),
      'needs': all('needs')
          .where((n) => admin || n['uid'] == uid || n['status'] == 'open')
          .toList(),
      'messages': all('messages')
          .where((m) => orderIds.contains(m['orderId']))
          .map((m) => {...m, 'mine': m['uid'] == uid})
          .toList(),
      'tickets': all('tickets').where((t) => admin || t['uid'] == uid).toList(),
      'notifications': all('notifications')
          .where((n) => n['uid'] == uid)
          .toList()
          .reversed
          .toList(),
      'shifts': all('shifts').where((s) => s['uid'] == uid).toList(),
      'codes': <Map<String, dynamic>>[],
      'inventory': map(map(data['inventory'])[uid]),
      'distributions':
          all('distributions').where((d) => admin || d['uid'] == uid).toList(),
      'reviews':
          all('reviews').where((r) => orderIds.contains(r['orderId'])).toList(),
      'accounts': admin
          ? rows((await db.ref('users').get()).value)
              .map((a) => {...a, 'uid': a['id']})
              .toList()
          : <Map<String, dynamic>>[],
      'history': orders
          .where((o) => o['status'] == 'completed' && participant(o))
          .map((o) {
        final f = map(map(data['foods'])[o['foodId']]);
        final received =
            ((o['qtyReceived'] ?? o['received']) as num?)?.toInt() ?? 0;
        return {
          'orderId': o['id'],
          'name': f['name'] ?? '',
          'quantity': received,
          'kg': received * 0.5,
          'category': f['category'] ?? '',
          'completedAt': o['completedAt'] ?? o['updatedAt'] ?? '',
          'daysAgo': DateTime.tryParse(
                      '${o['completedAt'] ?? o['updatedAt']}') ==
                  null
              ? -1
              : DateTime.now()
                  .difference(
                      DateTime.parse('${o['completedAt'] ?? o['updatedAt']}'))
                  .inDays
        };
      }).toList(),
    };
  }

  Stream<Map<String, dynamic>> watch(String userId) {
    late StreamController<Map<String, dynamic>> controller;
    final subscriptions = <String, StreamSubscription<DatabaseEvent>>{};
    var active = true, running = false, pending = false;
    Future<void> emit() async {
      if (!active || auth.currentUser?.uid != userId) return;
      if (running) {
        pending = true;
        return;
      }
      running = true;
      do {
        pending = false;
        try {
          final view = await snapshot();
          if (!active || auth.currentUser?.uid != userId) break;
          controller.add(view);
          final u = map(view['profile']);
          final adminUid = (await db.ref('config/adminUid').get()).value;
          final admin = u['role'] == 'admin' && adminUid == userId;
          final wanted = <String, Query>{
            'profile': db.ref('users/$userId'),
            'adminUid': db.ref('config/adminUid')
          };
          if (u['disabled'] != true &&
              u.isNotEmpty &&
              auth.currentUser?.emailVerified == true) {
            wanted.addAll(queries(u, admin));
            if (admin) wanted['accounts'] = db.ref('users');
            for (final o in (view['orders'] as List).cast<Map>()) {
              if (!participant(o)) continue;
              wanted['food/${o['foodId']}'] =
                  db.ref('demo/foods/${o['foodId']}');
              if (!admin) {
                for (final table in ['messages', 'reviews']) {
                  wanted['$table/${o['id']}'] =
                      query(table, 'orderId', '${o['id']}');
                }
              }
            }
          }
          for (final key in subscriptions.keys
              .where((k) => !wanted.containsKey(k))
              .toList()) {
            await subscriptions.remove(key)?.cancel();
          }
          for (final entry in wanted.entries) {
            if (!active) break;
            subscriptions.putIfAbsent(
                entry.key,
                () => entry.value.onValue
                    .listen((_) => emit(), onError: (Object e) => emit()));
          }
        } catch (e, stack) {
          if (active) controller.addError(e, stack);
        }
      } while (active && pending);
      running = false;
    }

    controller = StreamController<Map<String, dynamic>>(
        onListen: emit,
        onCancel: () async {
          active = false;
          for (final s in subscriptions.values) {
            await s.cancel();
          }
          subscriptions.clear();
        });
    return controller.stream;
  }

  Future<String> upload(String path, String folder) async {
    await account();
    require(auth.currentUser!.emailVerified,
        'Hãy xác minh email trước khi tải ảnh.');
    return _storage.upload(
        path, folder, await read('config/public/cloudinary'));
  }

  void close() => _storage.close();
}
