/// The form collects a clock time. Always show which calendar day it means.
abstract final class FoodExpiry {
  static String defaultTime(DateTime now) {
    final value = now.add(const Duration(hours: 2));
    return '${value.hour.toString().padLeft(2, '0')}:${value.minute.toString().padLeft(2, '0')}';
  }

  static DateTime resolve(String value, DateTime now) {
    final match = RegExp(r'^(\d{1,2}):(\d{2})$').firstMatch(value);
    if (match == null ||
        int.parse(match[1]!) > 23 ||
        int.parse(match[2]!) > 59) {
      throw StateError('Hạn sử dụng cần định dạng HH:mm.');
    }
    final today = DateTime(now.year, now.month, now.day, int.parse(match[1]!),
        int.parse(match[2]!));
    return today.isAfter(now)
        ? today
        : DateTime(now.year, now.month, now.day + 1, today.hour, today.minute);
  }

  static String label(String value, DateTime now) {
    final expiry = resolve(value, now);
    final day = expiry.day == now.day && expiry.month == now.month
        ? 'hôm nay'
        : 'ngày mai';
    return '$value $day';
  }
}
