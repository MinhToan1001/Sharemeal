import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/data/repositories/order_stock_protocol.dart';

void main() {
  final order = <String, dynamic>{
    'id': 'o',
    'donorId': 'd',
    'organizationId': 'c',
    'quantity': 10,
    'status': 'awaiting'
  };
  final food = <String, dynamic>{
    'quantity': 20,
    'reserved': 0,
    'status': 'open',
    'expiresAtMs': 1000
  };
  test('stock reserve/release idempotency and crash recovery', () {
    final intent = OrderStockProtocol.beginAccept(order, 'd', 'now');
    final held =
        OrderStockProtocol.stock(food, intent, release: false, nowMs: 1);
    expect(held['reserved'], 10);
    expect(OrderStockProtocol.stock(held, intent, release: false, nowMs: 1),
        same(held));
    final cancelled =
        OrderStockProtocol.cancel(intent, 'c', false, 'Lý do', 'now');
    final released =
        OrderStockProtocol.stock(held, cancelled, release: true, nowMs: 1);
    expect(released['reserved'], 0);
    expect(
        OrderStockProtocol.stock(released, cancelled, release: true, nowMs: 1),
        same(released));
    expect(
        () => OrderStockProtocol.stock(released, intent,
            release: false, nowMs: 1),
        throwsStateError);
  });
  test('legacy accepted cancellation releases its stock and removes courier',
      () {
    final cancelled = OrderStockProtocol.cancel({
      ...order,
      'status': 'assigned',
      'volunteerId': 'v',
      'driver': 'Volunteer'
    }, 'd', false, 'Lý do', 'now');
    expect(cancelled.containsKey('volunteerId'), false);
    expect(cancelled['cancelledVolunteerId'], 'v');
    expect(
        OrderStockProtocol.stock({...food, 'reserved': 10}, cancelled,
            release: true, nowMs: 1)['reserved'],
        0);
  });
  test('awaiting cancellation does not release stock owned by other orders',
      () {
    final cancelled =
        OrderStockProtocol.cancel(order, 'c', false, 'Lý do', 'now');
    expect(
        OrderStockProtocol.stock({...food, 'reserved': 10}, cancelled,
            release: true, nowMs: 1)['reserved'],
        10);
  });
  test('all actors including admin cannot cancel after pickup', () {
    for (final status in ['pickedUp', 'completed', 'rejected']) {
      for (final actor in ['d', 'c', 'v', 'admin']) {
        expect(
            () => OrderStockProtocol.cancel({...order, 'status': status}, actor,
                actor == 'admin', 'Lý do', 'now'),
            throwsStateError);
      }
    }
    expect(() => OrderStockProtocol.cancel(order, 'v', false, 'Lý do', 'now'),
        throwsStateError);
    expect(() => OrderStockProtocol.cancel(order, 'd', false, ' ', 'now'),
        throwsStateError);
  });
  test('insufficient stock aborts; corruption is not hidden by clamping', () {
    expect(
        () => OrderStockProtocol.stock({...food, 'reserved': 15}, order,
            release: false, nowMs: 1),
        throwsStateError);
    expect(
        () => OrderStockProtocol.stock(food, {...order, 'cancelHadStock': true},
            release: true, nowMs: 1),
        throwsStateError);
  });
}
