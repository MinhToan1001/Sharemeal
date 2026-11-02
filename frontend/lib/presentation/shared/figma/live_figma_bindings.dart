import 'dart:convert';
import '../../../data/repositories/firebase_app_state.dart';
import '../interaction/live_screen_data.dart';
import 'figma_primitives.dart';
import 'live_detail_bindings.dart';

/// Binds records to the existing Figma nodes. No layout or style is generated here.
/// Original pages remain unchanged; repeated records reuse their original card.
FigmaBox bindLiveScreen(FigmaBox root, String frame, FirebaseAppState s) {
  final text = LiveDetailBindings.nodes(s, frame);
  final controls = <String, Map<String, dynamic>>{};
  final hidden = <String>{};
  final queue = LiveScreenData.queue(s), selected = LiveScreenData.selected(s);
  final food = s.selectedFood, order = s.selectedOrder;
  final roleName = LiveScreenData.roleName;
  final status = LiveScreenData.status;
  Map<String, dynamic> details = {};
  try {
    details =
        Map<String, dynamic>.from(jsonDecode('${selected['details']}') as Map);
  } catch (_) {}
  String detail(String key) => '${details[key] ?? ''}';
  final name = '${selected['name'] ?? selected['title'] ?? ''}';
  final selectedUser = s
          .rows('accounts')
          .where((u) => u['uid'] == (selected['uid'] ?? selected['donorId']))
          .firstOrNull ??
      {};
  final applications = s.rows('applications');
  final application = applications
          .where((a) => a['id'] == s.profile['applicationId'])
          .firstOrNull ??
      {};
  final activeOrders = s.orders
      .where((o) => !['completed', 'cancelled', 'rejected'].contains(o.status))
      .toList();
  final ownNeed = s.needs
          .where((n) =>
              n['uid'] == s.user?.uid &&
              ['open', 'pending'].contains(n['status']))
          .firstOrNull ??
      {};
  final ownCompleted = s.history;
  final sharedMeals =
      ownCompleted.fold<num>(0, (n, r) => n + (r['quantity'] as num? ?? 0));
  final account = s
          .rows('accounts')
          .where((u) =>
              u['uid'] == s.get('admin.account.uid', selectedUser['uid'] ?? ''))
          .firstOrNull ??
      s.rows('accounts').where((u) => u['role'] != 'admin').firstOrNull ??
      {};
  final ticket = s.tickets
          .where((t) =>
              t['id'] ==
              s.get('support.ticketId', s.get('admin.ticket.id', '')))
          .firstOrNull ??
      s.tickets.lastOrNull ??
      {};
  String timestamp(dynamic value) =>
      DateTime.tryParse('$value')?.toLocal().toString().split('.').first ?? '—';
  void action(String id, String name, [Map<String, dynamic> data = const {}]) {
    controls[id] = {'kind': 'action', 'action': name, ...data};
  }

  switch (frame) {
    case '64:1116':
      action('64:1139', 'pickDocument',
          {'key': 'supplement.file', 'label': 'Chọn tài liệu bổ sung'});
    case '6:319':
      final assigned = activeOrders
          .where((o) => ['assigned', 'pickedUp'].contains(o.status))
          .firstOrNull;
      text.addAll({
        '66:1218': s.get('profile.name', ''),
        '66:1219': 'Người cho · ${status(s.profile['verificationStatus'])}',
        'I66:1229;60:568':
            '${s.foods.where((f) => f.mine && f.status == 'open').length} tin đang mở',
        '66:1251': assigned == null
            ? 'Chưa có chuyến đang giao'
            : '${s.foods.where((f) => f.id == assigned.foodId).firstOrNull?.name ?? ''} · ${assigned.driver}',
        '66:1252':
            assigned == null ? 'Chuyến mới sẽ hiển thị tại đây' : assigned.time
      });
    case '6:1155':
      final quantity = ownNeed['quantity'] as num? ?? 0;
      final matched = activeOrders.fold<num>(
          0, (n, o) => n + (o.status == 'awaiting' ? 0 : o.quantity));
      final first = activeOrders.firstOrNull;
      final available = s.searchFoods().firstOrNull;
      text.addAll({
        '66:1382': s.get('profile.name', ''),
        '66:1383':
            'Tổ chức từ thiện · ${status(s.profile['verificationStatus'])}',
        '66:1388': '${ownNeed['title'] ?? 'Chưa đăng nhu cầu'}',
        '66:1390': '$matched',
        '66:1391': '/ $quantity suất đã được ghép',
        'I66:1394;6:171':
            'Tìm thêm ${(quantity - matched).clamp(0, 100000)} suất còn thiếu',
        '66:1402': first == null
            ? 'Chưa có đơn đang xử lý'
            : '${first.quantity} suất · ${first.id}',
        '66:1419': available == null
            ? 'Chưa có món phù hợp'
            : '${available.name} · ${available.quantity} suất',
        '66:1420': available == null
            ? 'Món được duyệt sẽ hiển thị tại đây'
            : '${available.storage} · ${available.pickup}'
      });
      if (first != null) {
        action('66:1398', 'openOrder',
            {'id': first.id, 'route': '/user/organization/order-tracking'});
      }
    case '6:1282':
      final row =
          s.rows('foods').where((r) => r['id'] == food.id).firstOrNull ?? {};
      text.addAll({
        '73:1144': food.storage,
        '73:1146': '${food.quantity} suất còn lại',
        '73:1148': food.name,
        '73:1149': food.note,
        '73:1151': 'Ngày đăng',
        '73:1152': timestamp(row['createdAt']),
        '73:1155': timestamp(row['expiresAt']),
        '73:1164': food.allergens.isEmpty
            ? 'Không có thành phần dị ứng đã khai báo.'
            : 'Có thể chứa ${food.allergens.join(', ')}.'
      });
    case '6:1525':
      text['110:1164'] = '${order.id} · ${food.donor} → ${order.organization}';
    case '65:1332':
      final recent = s.orders.where((o) => o.status == 'completed').firstOrNull;
      final recentFood =
          s.foods.where((f) => f.id == recent?.foodId).firstOrNull;
      text.addAll({
        '65:1338': s.get('profile.name', ''),
        'I65:1347;60:568': 'Từ ${ownCompleted.length} đơn đã hoàn tất',
        '65:1354':
            recentFood == null ? 'Chưa có lô thực phẩm' : recentFood.pickup,
        '65:1355': recentFood == null
            ? 'Chưa có dữ liệu'
            : '${recentFood.name} · ${recent?.received ?? 0} suất',
        '65:1358': recentFood == null
            ? '—'
            : '${recentFood.donor} · ${recent?.id ?? ''}',
        '65:1373': '${s.warehouseBalance} suất còn trong kho',
        '65:1374': 'Số lượng được cập nhật từ các đơn hoàn tất',
        '65:1383': s.get('profile.address', 'Chưa cập nhật địa chỉ')
      });
    case '65:1385':
      text.addAll({
        '65:1391': '${s.get('profile.name', '')} · Kho thực phẩm',
        '65:1399': '${s.warehouseBalance} suất'
      });
    case '6:1737':
      final job = s.orders
          .where((o) => o.status == 'accepted' && o.transport == 'Nhờ giao hộ')
          .firstOrNull;
      final jobFood = s.foods.where((f) => f.id == job?.foodId).firstOrNull;
      text.addAll({
        '66:1537': '${s.get('profile.name', '')} · Tình nguyện viên',
        '66:1546': status(s.profile['verificationStatus']),
        '66:1577': job?.time ?? 'Chưa có chuyến chờ nhận',
        '66:1578': job == null
            ? 'Chuyến được duyệt sẽ hiển thị tại đây'
            : '${jobFood?.donor ?? ''} → ${job.organization}',
        '66:1581': job == null ? '0 suất' : '${job.quantity} suất',
        '66:1584': jobFood?.pickup ?? '—',
        '66:1572': jobFood?.address ?? '',
        '66:1573': job?.organization ?? ''
      });
    case '6:2142':
      final trips = s.orders.where((o) => o.status == 'completed').toList();
      final meals = trips.fold<int>(0, (n, o) => n + o.received);
      text.addAll({
        '6:2150': 'Huy hiệu đã đạt     ${trips.isEmpty ? 0 : 1}/8',
        '6:2154': '${trips.length} chuyến hoàn tất',
        '6:2185': '${trips.length * 30} điểm',
        '6:2186': '$meals suất ăn đã trao',
        '6:2190': '${trips.length}',
        '6:2224': trips.isEmpty
            ? 'Chưa có chuyến hoàn tất'
            : trips.first.organization,
        '6:2225': trips.isEmpty
            ? '—'
            : '${trips.first.received} suất · ${trips.first.id}',
        '6:2226': trips.isEmpty ? '0' : '+30',
        '6:2229': trips.length < 2 ? '—' : trips[1].organization,
        '6:2230': trips.length < 2
            ? '—'
            : '${trips[1].received} suất · ${trips[1].id}',
        '6:2231': trips.length < 2 ? '0' : '+30'
      });
    case '6:3641':
      final completed =
          s.rows('orders').where((o) => o['status'] == 'completed');
      final total =
          completed.fold<num>(0, (n, o) => n + (o['received'] as num? ?? 0));
      final active =
          s.orders.where((o) => ['assigned', 'pickedUp'].contains(o.status));
      text.addAll({
        '62:622': timestamp(DateTime.now()),
        '62:653': '$total suất đã trao',
        '62:654': '${completed.length} đơn đã bàn giao thành công',
        'I62:656;60:567': '${queue.length}',
        'I62:656;60:568': 'Hồ sơ và tin đang chờ duyệt',
        'I62:660;60:567': '${active.length}',
        'I62:660;60:568':
            '${s.tickets.where((t) => t['status'] == 'open').length} yêu cầu hỗ trợ',
        '62:672': queue.isEmpty
            ? 'Chưa có hồ sơ chờ duyệt'
            : 'Duyệt ${queue.first['name']}',
        '62:673': '${queue.length} mục cần xét duyệt',
        '62:680': '${active.length} chuyến đang thực hiện',
        '62:681': 'Xem điều phối giao nhận',
        '62:689': '${s.tickets.length} yêu cầu hỗ trợ'
      });
      action('62:666', 'route', {'route': '/admin/approval-queue'});
      action('62:676', 'route', {'route': '/admin/dispatch-map'});
      action('62:684', 'route', {'route': '/admin/complaint-review'});
    case '62:1152':
      text.addAll({
        '62:1188': '${account['name'] ?? 'Chưa có tài khoản'}',
        '62:1189': '${account['email'] ?? ''} · ${account['phone'] ?? ''}',
        '62:1191': account['disabled'] == true ? 'Đã khóa' : 'Đang hoạt động',
        '62:1198': roleName(account['role']),
        '62:1199': status(account['verificationStatus']),
        '62:1205': account['role'] == 'donor' &&
                account['verificationStatus'] == 'approved'
            ? 'Được phép'
            : 'Chưa có quyền',
        '62:1209': account['role'] == 'donor' &&
                account['verificationStatus'] == 'approved'
            ? 'Được phép'
            : 'Chưa có quyền',
        '62:1213': account['verificationStatus'] == 'approved'
            ? 'Theo đơn được phân công'
            : 'Chưa có quyền',
        '62:1217': account['role'] == 'charity' &&
                account['verificationStatus'] == 'approved'
            ? 'Được phép'
            : 'Chưa có quyền',
        '62:1221': account['role'] == 'volunteer' &&
                account['verificationStatus'] == 'approved'
            ? 'Được phép'
            : 'Chưa có quyền',
        '62:1229': timestamp(account['createdAt']),
        '62:1230': '${account['uid'] ?? ''}',
        '62:1235': timestamp(account['createdAt']),
        '62:1236': status(account['verificationStatus'])
      });
      action('62:1187', 'selectAccount');
      action('62:1191', 'toggleAccount',
          {'uid': account['uid'], 'disabled': account['disabled'] != true});
    case '62:1239':
      final all = s.rows('orders'), foods = s.rows('foods');
      final completed = all.where((o) => o['status'] == 'completed').toList();
      final meals =
          completed.fold<num>(0, (n, o) => n + (o['received'] as num? ?? 0));
      String ratio(int count, int total) =>
          total == 0 ? '0%' : '${(100 * count / total).round()}%';
      text.addAll({
        '62:1245': timestamp(DateTime.now()),
        '62:1282': '$meals suất ăn đã đến nơi',
        '62:1283': '${completed.length} đơn đã hoàn tất',
        '62:1303': ratio(
            foods.where((f) => all.any((o) => o['foodId'] == f['id'])).length,
            foods.length),
        '62:1308': ratio(
            all
                .where((o) => !['awaiting', 'rejected', 'cancelled']
                    .contains(o['status']))
                .length,
            all.length),
        '62:1313': ratio(completed.length, all.length),
        '62:1320':
            '${all.where((o) => o['status'] == 'accepted' && o['transport'] == 'Nhờ giao hộ').length} đơn',
        '62:1323':
            '${foods.where((f) => (DateTime.tryParse('${f['expiresAt']}') ?? DateTime.now()).isBefore(DateTime.now())).length} tin'
      });
    case '62:1079':
      text.addAll({
        '62:1085': '${ticket['id'] ?? ''} · ${ticket['orderId'] ?? ''}',
        '62:1117': '${ticket['detail'] ?? 'Chưa có yêu cầu hỗ trợ'}',
        'I62:1119;60:567': '${order.quantity} suất',
        'I62:1119;60:568': food.donor,
        'I62:1123;60:567': '${order.received} suất',
        'I62:1123;60:568': order.organization,
        '62:1133': timestamp(ticket['createdAt']),
        '62:1134': '${ticket['reason'] ?? ''}',
        '62:1139': status(ticket['status'] ?? 'open'),
        '62:1140': '${ticket['detail'] ?? ''}',
        '62:1145': '${ticket['name'] ?? ''}',
        '62:1146': '${ticket['photo'] ?? ''}',
        '62:1149':
            '${ticket['resolution'] ?? 'Kiểm tra nội dung và bằng chứng trước khi chốt kết quả.'}'
      });
      action('62:1150', 'resolveTicket', {'id': ticket['id']});
    case '65:1213':
      text.addAll({
        '65:1219': '${ticket['id'] ?? ''} · ${ticket['orderId'] ?? ''}',
        '65:1224': status(ticket['status'] ?? 'open'),
        '65:1226': '${ticket['reason'] ?? 'Chưa có yêu cầu'}',
        '65:1231': timestamp(ticket['createdAt']),
        '65:1237': status(ticket['status'] ?? 'open'),
        '65:1238': '${ticket['detail'] ?? ''}',
        '65:1244':
            '${ticket['resolution'] ?? 'Kết quả sẽ cập nhật khi admin xử lý.'}',
        '65:1249': '${order.quantity} suất',
        '65:1252': '${order.received} suất',
        '65:1255': '${(order.quantity - order.received).clamp(0, 100000)} suất'
      });
    case '64:1264':
      text.addAll({
        '64:1307':
            '${ticket['id'] ?? 'Chưa có yêu cầu'} · ${status(ticket['status'] ?? 'open')}',
        '64:1308': '${ticket['detail'] ?? ''}'
      });
    case '62:1471':
      text.addAll({
        '62:1477': '${ticket['id'] ?? ''} · Kết quả đã lưu',
        '62:1510':
            '${ticket['resolution'] ?? s.get('admin.decision.note', '')}',
        '62:1515': '${s.profile['name'] ?? ''}',
        '62:1518': status(ticket['status'] ?? 'resolved')
      });
    case '6:3712':
      text.addAll({
        '62:800': '${queue.length} mục · Ưu tiên thời gian chờ lâu nhất',
        '62:831': 'Tất cả ${queue.length}',
        '62:833':
            'Người cho ${queue.where((r) => r['role'] == 'donor').length}',
        '62:835':
            'Tổ chức ${queue.where((r) => r['role'] == 'charity').length}',
        '62:841': queue.isEmpty
            ? 'Chưa có mục nào chờ duyệt.'
            : 'Kiểm tra tài liệu và nội dung trước khi ra quyết định.'
      });
    case '6:295':
      text.addAll({
        '98:1269': 'Xác minh email',
        '98:1270': 'Hãy mở liên kết đã gửi đến ${s.user?.email ?? ''}.',
        '98:1296': 'Chưa nhận được email? Gửi lại liên kết'
      });
    case '64:1230':
      text.addAll({
        '64:1242': s.get('profile.name', ''),
        '64:1244': s.role == 'donor'
            ? status(s.profile['verificationStatus'])
            : 'Chưa có quyền',
        '64:1251': s.role == 'charity'
            ? status(s.profile['verificationStatus'])
            : 'Chưa có hồ sơ'
      });
    case '62:994':
      final jobs = s.orders
          .where((o) => ['accepted', 'assigned', 'pickedUp'].contains(o.status))
          .toList();
      final job = jobs.where((o) => o.id == s.selectedOrderId).firstOrNull ??
          jobs.firstOrNull;
      final f = s.foods.where((f) => f.id == job?.foodId).firstOrNull;
      final courier = s
              .rows('accounts')
              .where((u) => u['uid'] == s.get('admin.volunteer.uid', ''))
              .firstOrNull ??
          s
              .rows('accounts')
              .where((u) =>
                  u['role'] == 'volunteer' &&
                  u['verificationStatus'] == 'approved' &&
                  u['disabled'] != true)
              .firstOrNull ??
          {};
      text.addAll({
        '62:1000': '${jobs.length} chuyến đang thực hiện',
        '62:1057': job?.id ?? 'Chưa có chuyến',
        '62:1059': job?.status ?? '',
        '62:1060':
            job == null ? '—' : '${f?.donor ?? ''} → ${job.organization}',
        '62:1063':
            job == null ? '0 suất' : '${job.quantity} suất ${f?.name ?? ''}',
        '62:1066': job?.time ?? '—',
        '62:1074': '${courier['name'] ?? 'Chưa có người giao phù hợp'}',
        '62:1075': status(courier['verificationStatus'] ?? 'draft'),
        'I62:1077;6:171': 'Phân công ${courier['name'] ?? ''}'
      });
      action('62:1056', 'selectDispatchOrder');
      action('62:1068', 'selectVolunteer');
      action(
          '62:1077', 'assignVolunteer', {'id': job?.id, 'uid': courier['uid']});
    case '6:3798':
      final isFood = s.get('admin.selection.kind', '') == 'foods';
      text.addAll({
        '62:939': name,
        '62:940':
            '${selected['id'] ?? ''} · ${isFood ? 'Món ăn' : roleName(selected['role'])}',
        '62:948': isFood
            ? '${selected['donor'] ?? ''}'
            : '${selectedUser['name'] ?? name}',
        '62:951':
            '${selected['address'] ?? selectedUser['address'] ?? detail('profile.address')}',
        '62:953': isFood ? 'Số lượng / Hạn dùng' : 'Thông tin kê khai',
        '62:954': isFood
            ? '${selected['quantity']} suất · ${timestamp(selected['expiresAt'])}'
            : detail('license.tax'),
        '73:1036': isFood ? 'Ảnh món ăn' : 'Tài liệu đã tải lên',
        '62:966': isFood
            ? '${selected['storage'] ?? ''} · ${selected['note'] ?? ''}'
            : '${(selected['documents'] as List? ?? []).length} tài liệu',
        '62:986': isFood
            ? 'Duyệt sẽ hiển thị món ăn cho người nhận.'
            : 'Duyệt sẽ mở quyền theo vai trò đã đăng ký.'
      });
    case '77:1321':
      final isNeed = s.get('admin.selection.kind', '') == 'needs';
      text.addAll({
        '77:1326': name,
        '77:1327':
            '${selected['id'] ?? ''} · ${isNeed ? 'Nhu cầu' : roleName(selected['role'])}',
        '77:1334': '${selectedUser['name'] ?? name}',
        '77:1337':
            '${selectedUser['address'] ?? detail('profile.organization.address')}',
        '77:1340': isNeed
            ? '${selected['quantity']} suất'
            : '${selected['uid'] ?? ''}',
        '77:1343': 'Tài liệu đã tải lên',
        '77:1351': isNeed
            ? '${selected['category']} · ${selected['priority']}'
            : '${(selected['documents'] as List? ?? []).length} tài liệu'
      });
    case '77:1384':
      text.addAll({
        '77:1389': name,
        '77:1390': '${selected['id'] ?? ''} · Tình nguyện viên',
        '77:1397': '${selectedUser['name'] ?? name}',
        '77:1400': '${selectedUser['address'] ?? ''}',
        '77:1403': detail('profile.vehicle'),
        '77:1406': 'Tài liệu đã tải lên',
        '77:1414': '${(selected['documents'] as List? ?? []).length} tài liệu'
      });
    case '6:4055':
      text.addAll({
        '64:1028': status(s.profile['verificationStatus']),
        '64:1029':
            '${application['id'] ?? ''} · ${timestamp(application['createdAt'])}',
        '64:1052': status(s.profile['verificationStatus']),
        '64:1053': '${application['note'] ?? 'Quản trị viên đối chiếu hồ sơ'}'
      });
    case '62:1405':
      text.addAll({
        '62:1411': '${selected['id'] ?? ''} · Quyết định đã lưu',
        '62:1454': '${s.profile['name']} · ${timestamp(selected['reviewedAt'])}'
      });
    case '77:1141':
      text.addAll({
        '77:1147': '${selected['id'] ?? ''} · Quyết định đã lưu',
        '77:1179': '${selected['reviewNote'] ?? selected['note'] ?? ''}',
        '77:1180': s.get('admin.decision.note', ''),
        '77:1183': s.get('admin.decision.note', '')
      });
    case '77:1090':
      text.addAll({
        '77:1096': '${selected['id'] ?? ''} · Thông báo đã gửi',
        '77:1128': '${selected['note'] ?? ''}',
        '77:1132': s.get('admin.decision.note', '')
      });
    case '6:843':
      final expires = DateTime.tryParse(s.get('handover.expires', ''));
      final seconds = expires?.difference(DateTime.now()).inSeconds ?? 0;
      text.addAll({
        '6:1019': seconds > 0
            ? 'Mã còn hiệu lực ${seconds ~/ 60}:${(seconds % 60).toString().padLeft(2, '0')}'
            : 'Chưa có mã còn hiệu lực',
        '6:1022': order.driver.isEmpty ? order.organization : order.driver
      });
    case '65:1098':
      text.addAll({
        '65:1104': '${order.id} · Chỉ đưa mã khi đã kiểm tra hàng',
        '65:1112':
            'Mã chỉ dùng cho đơn ${order.id} và hết hiệu lực sau khi xác nhận.',
        '65:1117': '${order.quantity} suất ${food.name}',
        '65:1120': order.driver
      });
    case '65:1068':
      text.addAll({
        '65:1087': order.id,
        '65:1090': '${food.name} · ${order.quantity} suất',
        '65:1093': food.donor
      });
    case '64:1314':
      text.addAll({
        '64:1337': s.get('profile.name', ''),
        '64:1340': s.get('profile.address', '')
      });
      action('64:1337', 'editField',
          {'key': 'profile.name', 'label': 'Họ và tên'});
      action('64:1340', 'editField',
          {'key': 'profile.address', 'label': 'Địa chỉ lấy thực phẩm'});
    case '64:1199':
      text.addAll({
        '64:1215': 'Liên kết đặt lại mật khẩu được gửi đến email đã đăng ký.',
        'I64:1228;6:171': 'Gửi liên kết khôi phục'
      });
  }

  FigmaBox clone(FigmaBox box,
      {Map<String, String> values = const {},
      Map<String, Map<String, dynamic>> commands = const {},
      bool clearCondition = false}) {
    var kids = <FigmaBox>[];
    if (frame == '6:3712' && box.nodeId == '62:803') {
      final templates = {for (final b in box.children) b.nodeId: b};
      kids.addAll(box.children
          .where((b) => !['62:842', '62:858', '62:869'].contains(b.nodeId))
          .map((b) => clone(b)));
      for (final row in queue.where((r) =>
          s.get('admin.queueFilter', 'all') == 'all' ||
          r['role'] == s.get('admin.queueFilter', 'all'))) {
        final role = row['role'];
        final template = templates[role == 'charity'
            ? '62:858'
            : role == 'volunteer'
                ? '62:869'
                : '62:842']!;
        final id = '${row['id']}', kind = '${row['kind']}';
        final titles = role == 'charity'
            ? ['62:859', '62:860', '62:863', '62:866']
            : role == 'volunteer'
                ? ['62:870', '62:871', '62:878', '62:879']
                : ['62:843', '62:844', '62:852', '62:855'];
        final open = {
          'kind': 'action',
          'action': 'openAdminRecord',
          'id': id,
          'table': kind,
          'role': role
        };
        kids.add(clone(template, clearCondition: true, values: {
          titles[0]: '${row['name']}',
          titles[1]:
              '$id · ${kind == 'foods' ? 'Món ăn' : kind == 'needs' ? 'Nhu cầu' : roleName(role)}',
          titles[2]: kind == 'applications'
              ? '${(row['documents'] as List? ?? []).length} tài liệu'
              : '${row['quantity']} suất',
          titles[3]: timestamp(row['createdAt']),
          '62:849': 'Chờ duyệt',
        }, commands: {
          '62:856': open,
          '62:867': open,
          '62:872': open
        }));
      }
    } else if (frame == '77:1018' && box.nodeId == '77:1053') {
      final template = box.children.firstWhere((b) => b.nodeId == '77:1055');
      kids = box.children
          .where((b) => b.nodeId == '77:1054')
          .map((b) => clone(b))
          .toList();
      for (final row in queue) {
        kids.add(clone(template, values: {
          '77:1061': '${row['name']} · Chờ duyệt',
          '77:1062': '${row['id']}'
        }, commands: {
          '77:1055': {
            'kind': 'action',
            'action': 'openAdminRecord',
            'id': row['id'],
            'table': row['kind'],
            'role': row['role']
          }
        }));
      }
      for (final t in s.tickets) {
        kids.add(clone(template, values: {
          '77:1061': '${t['reason']} · ${status(t['status'])}',
          '77:1062': '${t['detail']}'
        }, commands: {
          '77:1055': {
            'kind': 'action',
            'action': 'openTicket',
            'id': t['id'],
            'orderId': t['orderId']
          }
        }));
      }
    } else if (frame == '6:2298' && box.nodeId == root.nodeId) {
      final template = box.children.firstWhere((b) => b.nodeId == '6:2316');
      final notices = s.rows('notifications');
      final rows = <FigmaBox>[];
      for (final n in notices) {
        rows.add(clone(template, values: {
          '6:2317': '${n['title']}',
          '6:2318': '${n['body']} · ${timestamp(n['createdAt'])}'
        }, commands: {
          '6:2316': {
            'kind': 'action',
            'action': 'openNotification',
            'id': n['id']
          }
        }));
      }
      kids = box.children
          .where((b) => !(b.y >= 115 && b.y < 712))
          .map((b) => clone(b))
          .toList();
      kids.add(FigmaBox(
          nodeId: 'live-notifications',
          width: template.width,
          height: 597,
          x: template.x,
          y: template.y,
          fixedHeight: true,
          style: template.style,
          control: {'kind': 'boundRecords', 'rows': rows}));
    } else {
      kids = box.children
          .map((b) => clone(b, values: values, commands: commands))
          .toList();
    }
    var control = commands[box.nodeId] ?? controls[box.nodeId] ?? box.control;
    if (frame == '6:1573' && control['action'] == 'camera') {
      control = {...control, 'label': 'Ảnh nhận hàng bắt buộc (JPG/PNG)'};
    }
    if (box.nodeId == '6:140' && box.width <= 32 && control.isEmpty) {
      control = {'kind': 'action', 'action': 'back', 'label': 'Quay lại'};
    }
    if (box.tag == 'img' &&
        box.width == 326 &&
        box.height == 124 &&
        ['6:3798', '77:1321', '77:1384'].contains(frame)) {
      final urls = s.get('admin.selection.kind', '') == 'foods'
          ? ['${selected['photo'] ?? ''}']
          : List<String>.from(selected['documents'] as List? ?? []);
      control = {
        'kind': 'liveDocument',
        'urls': urls.where((u) => u.isNotEmpty).toList()
      };
    }
    if (clearCondition) control = {};
    final replacements = <String, String>{
      'Bếp Nhà Lan': food.donor,
      'Mái ấm Hoa Sen': order.organization,
      'Trần Quốc Bảo': order.driver,
      'Cơm gà xối mỡ · 15 suất': '${food.name} · ${order.quantity} suất',
      if (frame == '6:723') ...{
        '1.248': '$sharedMeals',
        '73': '${ownCompleted.length}',
        'Tháng 10, 2026': '${DateTime.now().month}/${DateTime.now().year}'
      },
      if (['6:3798', '77:1321', '77:1384'].contains(frame)) ...{
        'Số: 0312 458 971': '${selected['id'] ?? ''}',
        'Số xác nhận: TC-00518': '${selected['id'] ?? ''}',
        'CCCD: 0790 •••• 4821': detail('profile.vehicle'),
        'HỘ KINH DOANH BẾP NHÀ LAN': name,
        'TỔ CHỨC TỪ THIỆN HOA SEN': name,
        'TÌNH NGUYỆN VIÊN QUỐC BẢO': name,
        'Địa chỉ và đại diện khớp thông tin khai báo.':
            'Đối chiếu thông tin với các tài liệu đã tải lên.',
        'Địa điểm nhận và người phụ trách đã đối chiếu.':
            'Kiểm tra giấy tờ tổ chức và ảnh địa điểm nhận.',
        'Chân dung và phương tiện đã đối chiếu.': detail('profile.vehicle'),
        'Biển số 59-A1 123.45 · Cam kết giao nhận': detail('profile.vehicle'),
      },
    };
    final newText = values[box.nodeId] ??
        text[box.nodeId] ??
        replacements[box.text] ??
        LiveDetailBindings.text(s, frame, box.text) ??
        box.text;
    return FigmaBox(
        key: box.key,
        nodeId: box.nodeId,
        name: box.name,
        tag: box.tag,
        width: box.width,
        height: box.height,
        x: box.x,
        y: box.y,
        text: newText,
        asset: box.asset,
        formLabel: box.formLabel,
        fixedHeight: box.fixedHeight,
        initiallyVisible: box.initiallyVisible && !hidden.contains(box.nodeId),
        style: box.style,
        control: control,
        children: kids);
  }

  return clone(root);
}
