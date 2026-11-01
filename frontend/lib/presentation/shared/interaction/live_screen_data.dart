import '../../../data/repositories/firebase_app_state.dart';

/// Record selection shared by the original list and detail screens.
abstract final class LiveScreenData {
  static List<Map<String, dynamic>> queue(FirebaseAppState s) => [
        for (final table in ['applications', 'foods', 'needs'])
          for (final row
              in s.rows(table).where((r) => r['status'] == 'pending'))
            {
              ...row,
              'kind': table,
              'name': row['name'] ?? row['title'] ?? '',
              'role': row['role'] ?? (table == 'foods' ? 'donor' : 'charity'),
              'uid': row['uid'] ?? row['donorId']
            },
      ]..sort((a, b) => '${a['createdAt']}'.compareTo('${b['createdAt']}'));

  static Map<String, dynamic> selected(FirebaseAppState s) {
    final table = s.get('admin.selection.kind', 'applications');
    final id = s.get('admin.selection.id', '');
    return s.rows(table).where((r) => r['id'] == id).firstOrNull ?? {};
  }

  static String roleName(dynamic role) => switch (role) {
        'donor' => 'Người cho',
        'charity' => 'Tổ chức từ thiện',
        'volunteer' => 'Tình nguyện viên',
        'admin' => 'Quản trị viên',
        _ => 'Chưa chọn vai trò',
      };
  static String status(dynamic value) => switch (value) {
        'draft' => 'Chưa gửi hồ sơ',
        'pending' => 'Chờ duyệt',
        'approved' || 'open' => 'Đã duyệt',
        'rejected' => 'Từ chối',
        'supplement' => 'Cần bổ sung',
        'resolved' => 'Đã xử lý',
        'investigating' => 'Đang xử lý',
        'closed' => 'Đã đóng',
        _ => '$value',
      };
}
