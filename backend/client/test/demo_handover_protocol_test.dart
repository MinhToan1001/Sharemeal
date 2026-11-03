import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal_client/src/protocols/demo_handover_protocol.dart';

void main() {
  final order = <String, dynamic>{
    'status': 'assigned',
    'volunteerId': 'driver',
    'organizationId': 'org',
    'quantity': 7,
    'transport': 'Nhờ giao hộ'
  };
  test('demo pickup then delivery needs no PIN; repeat presses are idempotent',
      () {
    final picked =
        DemoHandoverProtocol.confirm(order, 'driver', 'pickup', 'now');
    expect(picked['status'], 'pickedUp');
    expect(picked['qtyPickedUp'], 7);
    expect(DemoHandoverProtocol.confirm(picked, 'driver', 'pickup', 'later'),
        same(picked));
    final delivered =
        DemoHandoverProtocol.confirm(picked, 'driver', 'receipt', 'now');
    expect(delivered['deliveryConfirmed'], true);
    expect(
        DemoHandoverProtocol.confirm(delivered, 'driver', 'receipt', 'later'),
        same(delivered));
  });
  test(
      'wrong participant, out-of-order delivery and cancelled pickup are rejected',
      () {
    expect(() => DemoHandoverProtocol.confirm(order, 'other', 'pickup', 'now'),
        throwsStateError);
    expect(() => DemoHandoverProtocol.confirm(order, 'org', 'pickup', 'now'),
        throwsStateError);
    expect(
        () => DemoHandoverProtocol.confirm(order, 'driver', 'receipt', 'now'),
        throwsStateError);
    expect(
        () => DemoHandoverProtocol.confirm(
            {...order, 'status': 'cancelled'}, 'driver', 'pickup', 'now'),
        throwsStateError);
  });
  test('organization self pickup is supported without a volunteer', () {
    final result = DemoHandoverProtocol.confirm({
      ...order,
      'status': 'accepted',
      'transport': 'Tự đến lấy',
      'volunteerId': null
    }, 'org', 'pickup', 'now');
    expect(result['status'], 'pickedUp');
  });
}
