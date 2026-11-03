import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/presentation/shared/interaction/food_expiry.dart';

void main() {
  test('late-night default and selected time use the next day explicitly', () {
    final now = DateTime(2026, 11, 3, 23, 34);
    expect(FoodExpiry.defaultTime(now), '01:34');
    expect(FoodExpiry.resolve('23:00', now), DateTime(2026, 11, 4, 23));
    expect(FoodExpiry.label('01:34', now), '01:34 ngày mai');
    expect(FoodExpiry.resolve('01:34', now).isAfter(now), true);
  });
  test('future same-day time stays today; malformed times are rejected', () {
    final now = DateTime(2026, 12, 31, 19);
    expect(FoodExpiry.label('23:00', now), '23:00 hôm nay');
    expect(FoodExpiry.resolve('18:00', now), DateTime(2027, 1, 1, 18));
    for (final invalid in ['25:00', '12:60', 'oops']) {
      expect(() => FoodExpiry.resolve(invalid, now), throwsStateError);
    }
  });
}
