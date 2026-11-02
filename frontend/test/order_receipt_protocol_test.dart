import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/data/repositories/order_receipt_protocol.dart';

void main() {
  Map<String, dynamic> order() => {
        'id': 'one',
        'quantity': 10,
        'organizationId': 'org',
        'status': 'pickedUp',
        'transport': 'Tự đến lấy'
      };
  test(
      'legacy pickup fallback, 10/10/9 discrepancy needs note; only nine enter stock',
      () {
    expect(() => OrderReceiptProtocol.begin(order(), 'org', 9, '', '', 'now'),
        throwsStateError);
    final o = OrderReceiptProtocol.begin(
        order(), 'org', 9, 'Một hộp hỏng', '', 'now');
    expect(o['qtyRequested'], 10);
    expect(o['qtyPickedUp'], 10);
    expect(o['hasDiscrepancy'], true);
    expect(o['discrepancyTicketId'], 'receipt_one');
    final inv = OrderReceiptProtocol.credit({}, o);
    expect(inv['received'], 9);
    expect(OrderReceiptProtocol.credit(inv, o), same(inv));
    expect(
        (OrderReceiptProtocol.credit({...inv, 'distributed': 6}, o)['received']
                as int) -
            6,
        3);
  });
  test(
      'intent freezes quantities, zero receipt is recorded, completed legacy is never credited again',
      () {
    final o = OrderReceiptProtocol.begin(
        {...order(), 'qtyPickedUp': 8}, 'org', 0, 'Không nhận được', '', 'now');
    expect(OrderReceiptProtocol.begin(o, 'org', 10, '', '', 'later'), same(o));
    expect(OrderReceiptProtocol.credit({}, o)['received'], 0);
    final completed = {...order(), 'status': 'completed'};
    expect(OrderReceiptProtocol.begin(completed, 'org', 9, '', '', 'now'),
        same(completed));
    expect(
        () => OrderReceiptProtocol.begin(order(), 'other', 10, '', '', 'now'),
        throwsStateError);
    expect(() => OrderReceiptProtocol.begin(order(), 'org', 11, '', '', 'now'),
        throwsStateError);
  });
}
