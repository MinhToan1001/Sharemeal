import '../../../data/repositories/firebase_app_state.dart';
import '../interaction/live_screen_data.dart';

/// Data for the original confirmation, tracking and result text slots.
abstract final class LiveDetailBindings {
  static String date(dynamic value) =>
      DateTime.tryParse('$value')?.toLocal().toString().split('.').first ?? '—';
  static Map<String, String> nodes(FirebaseAppState s, String frame) {
    final f = s.selectedFood, o = s.selectedOrder;
    final row =
        s.rows('orders').where((r) => r['id'] == o.id).firstOrNull ?? {};
    final food =
        s.rows('foods').where((r) => r['id'] == f.id).firstOrNull ?? {};
    final application = s
            .rows('applications')
            .where((a) => a['id'] == s.profile['applicationId'])
            .firstOrNull ??
        {};
    final ticket = s.tickets
            .where((t) =>
                t['id'] ==
                s.get('admin.ticket.id', s.get('support.ticketId', '')))
            .firstOrNull ??
        s.tickets.lastOrNull ??
        {};
    final quantity = s.get('receipt.quantity', o.quantity);
    return switch (frame) {
      '6:3259' => {
          '6:3269':
              '${s.orders.where((r) => r.foodId == f.id).length} yêu cầu liên quan. Nội dung sửa sẽ chờ admin duyệt.',
          '6:3297': date(food['createdAt']),
          '6:3299': 'Nội dung cập nhật gần nhất',
          '6:3300': date(food['updatedAt'])
        },
      '62:1331' => {
          '62:1337': '${ticket['id'] ?? ''} · ${f.id}',
          '62:1367': '${f.name} · ${o.quantity} suất',
          '62:1369': LiveScreenData.status(ticket['status'] ?? 'open'),
          '62:1370': '${ticket['detail'] ?? 'Chưa có phản ánh'}',
          '62:1373': f.donor,
          '62:1376': '${o.id} · ${o.organization}',
          '62:1383': f.donor,
          '62:1384': '${o.quantity} suất',
          '62:1389': o.driver,
          '62:1390': '${ticket['reason'] ?? ''}',
          '62:1395': o.organization,
          '62:1396': '${o.received} suất đã xác nhận'
        },
      '77:1186' => {
          '77:1192': '${o.id} · Đã thông báo tới các bên',
          '77:1249': '${o.driver} đã được phân công',
          '77:1252': 'Chưa có dữ liệu định vị trực tiếp',
          '77:1255': '${o.quantity} suất ${f.name}',
          '77:1261': '${ticket['detail'] ?? ''}',
          '77:1267': '${o.driver} nhận thông tin chuyến'
        },
      '64:1356' => {
          '64:1400': s.searchFoods().isEmpty
              ? 'Chưa có món được duyệt'
              : '${s.searchFoods().first.name} · ${s.searchFoods().first.quantity} suất',
          '64:1401': s.searchFoods().firstOrNull?.donor ?? '',
          '64:1404': s.searchFoods().firstOrNull?.pickup ?? ''
        },
      '6:2352' => {
          '6:2372': o.driver.isEmpty ? o.organization : o.driver,
          '6:2379': 'Đơn ${o.id}',
          '6:2387': '· ${f.name} · ${o.quantity} suất'
        },
      '65:1172' => {
          '65:1178': '${o.id} · Ghi nhận số lượng thực tế',
          'I65:1183;60:567': '${o.quantity} suất',
          'I65:1187;60:567': '$quantity suất',
          'I65:1187;60:568': s.get('receipt.note', ''),
          'I65:1209;6:171': 'Gửi yêu cầu đối soát'
        },
      '65:1512' => {
          '65:1518':
              '${ticket['id'] ?? ''} · ${LiveScreenData.status(ticket['status'] ?? 'resolved')}',
          '65:1525': '${ticket['resolution'] ?? ''}',
          '65:1537': '${o.received} suất'
        },
      '64:1160' => {
          '64:1166': '${application['id'] ?? ''} · Bạn có thể sửa và gửi lại'
        },
      '64:1116' => {
          '64:1122': '${application['id'] ?? ''} · Phản hồi từ admin',
          '64:1131': '${application['note'] ?? ''}',
          '64:1138': '${application['note'] ?? ''}',
          '64:1145':
              '${(s.values['supplement.file'] as Map?)?['name'] ?? 'Chưa chọn tài liệu'}',
          '64:1146': 'Tài liệu do bạn cung cấp'
        },
      '6:517' => {'74:1382': 'Bản nháp · Kiểm tra thông tin lần cuối'},
      '6:3567' => {
          '6:3583':
              '${f.donor} sẽ trao ${o.quantity} suất ${f.name} cho ${o.organization}.',
          '6:3587': o.time,
          '6:3590': f.address,
          '6:3596': o.id
        },
      '65:1000' => {
          '65:1006': '${o.id} · ${f.donor} → ${o.organization}',
          '65:1038': '${o.quantity} suất ${f.name}',
          '65:1050': 'Đang chờ tình nguyện viên nhận chuyến',
          '65:1055': f.pickup
        },
      '65:1470' => {'65:1476': '${o.id} · ${f.name} · ${o.quantity} suất'},
      '65:965' => {
          '65:971': '${o.id} · ${f.name} · ${o.quantity} suất',
          '65:981': '${f.donor} sẽ kiểm tra yêu cầu trước khi chấp nhận.',
          '65:986': o.organization,
          '65:989': '${o.quantity} / ${f.quantity} suất',
          '65:995': o.time
        },
      '6:1702' => {
          '6:1710': 'Gửi tới ${f.donor}',
          '6:1711':
              '${o.received} suất ${f.name} đã được trao tới ${o.organization}.'
        },
      '65:1295' => {
          '65:1301': '${o.id} · Gửi tới ${f.donor}',
          '65:1309': '${row['thanks'] ?? ''}'
        },
      '6:1944' => {
          '6:1950': 'Nhận chuyến ${o.id}?',
          '6:1952': 'Lấy ${o.quantity} suất ${f.name} tại ${f.donor}. ',
          '6:1953': '${f.pickup} · Giao tới ${o.organization}'
        },
      '65:1126' => {
          '65:1132': '${o.id} · ${o.organization}',
          '65:1154': '${o.quantity} suất · Đối chiếu đúng đơn'
        },
      '6:2105' => {
          '6:2131':
              '${o.organization} xác nhận ${o.received} suất · ${date(row['completedAt'])}.'
        },
      '6:1971' => {'6:1975': '${o.id} · Bước lấy hàng'},
      '65:1542' => {
          '65:1548':
              '${s.get('shift.date', s.calendarDate.toIso8601String().split('T').first)} · Ca đã đăng ký'
        },
      '64:880' => {'I64:899;60:567': '—', 'I64:903;60:567': '—'},
      '6:2404' => {
          '6:2443': s.get('profile.name', ''),
          '6:2444': '${s.impact('Năm')['meals']} suất',
          '6:2445': '—',
          '6:2446': '—'
        },
      _ => <String, String>{},
    };
  }

  static String? text(FirebaseAppState s, String frame, String? original) {
    if (original == null) return null;
    final f = s.selectedFood, o = s.selectedOrder;
    final row =
        s.rows('orders').where((r) => r['id'] == o.id).firstOrNull ?? {};
    final exact = <String, String>{
      '#SM-2041': f.id,
      ' SM-RC-2026-088213': o.id,
      'Xác nhận quyên tặng GC-88213': 'Xác nhận quyên tặng ${o.id}',
      '14/10/2026 - 19:38': date(row['completedAt']),
      'Chuyến GC-88213 - đang giao': 'Đơn ${o.id} · ${o.status}',
      'Hôm nay 19:30 - 2,4 km - điểm thưởng 40 xu': o.time,
      'Ba Miền → Hoa Sen - 20 suất cơm gà':
          '${f.donor} → ${o.organization} · ${o.quantity} suất ${f.name}',
      'Cơm gà xối mỡ  ': f.name,
      'Cơm gà xối mỡ - 15 suất': '${f.name} · ${o.quantity} suất',
      'Bên đăng cho phép lấy 19:00 – 20:30': 'Khung giờ lấy ${f.pickup}',
      'Bàn giao hoàn tất lúc 19:12': date(row['completedAt']),
      'Bánh mì ngọt các loại · 15 phần': '${f.name} · ${o.quantity} suất',
      'Mái ấm Hoa Sen nhận hàng thế nào?':
          '${o.organization} nhận hàng thế nào?',
      'Dự kiến 15 suất - từ Bếp Nhà Lan':
          'Dự kiến ${o.quantity} suất · ${f.donor}',
      'SM2041-7K3Q · Quốc Bảo': '${o.id} · ${o.driver}',
      'Bếp Nhà Lan - còn 20 suất, lấy 19:00 - 20:30':
          '${f.donor} · Còn ${f.quantity} suất · ${f.pickup}',
      'Tối đa 20 suất': 'Tối đa ${f.quantity} suất',
      'Dự kiến đến 19:40 - bước 2/3': 'Giờ hẹn ${o.time} · ${o.status}',
      'Đủ 15 hộp cơm gà': '${o.quantity} suất ${f.name}',
      'Cảm ơn bạn đã mang 15 suất cơm đến ':
          'Cảm ơn bạn đã mang ${o.received} suất ${f.name} đến ',
      'với Mái ấm Hoa Sen đúng giờ.': 'với ${o.organization}.',
      if (frame == '6:1614') ...{
        '80 suất / ngày': 'Chưa cập nhật',
        '40 suất / ngày': 'Chưa cập nhật',
        '16:00 - 21:00': 'Chưa cập nhật',
        '17:00 - 20:00': 'Chưa cập nhật'
      },
      if (frame == '6:2937')
        'Mã có hiệu lực thêm 09:42 - còn 3 lần thử':
            'Mã có hiệu lực 10 phút · tối đa 5 lần thử',
      if (frame == '6:1573')
        'Chụp ảnh hàng nhận được để lưu lại minh chứng':
            'Ảnh nhận hàng bắt buộc (JPG/PNG)',
      if (frame == '6:1212')
        '6 kết quả trong bán kính 5 km - Gần nhất trước':
            '${s.searchFoods().length} món phù hợp',
    };
    return exact[original];
  }
}
