import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal_client/order_receipt_protocol.dart';

void main() {
  const photo =
      'https://res.cloudinary.com/toanvip/image/upload/v1/receipt.png';
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
    expect(
        () => OrderReceiptProtocol.begin(order(), 'org', 9, '', photo, 'now'),
        throwsStateError);
    final o = OrderReceiptProtocol.begin(
        order(), 'org', 9, 'Một hộp hỏng', photo, 'now');
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
    final o = OrderReceiptProtocol.begin({...order(), 'qtyPickedUp': 8}, 'org',
        0, 'Không nhận được', photo, 'now');
    expect(OrderReceiptProtocol.begin(o, 'org', 10, '', '', 'later'), same(o));
    expect(OrderReceiptProtocol.credit({}, o)['received'], 0);
    final completed = {...order(), 'status': 'completed'};
    expect(OrderReceiptProtocol.begin(completed, 'org', 9, '', '', 'now'),
        same(completed));
    expect(
        () =>
            OrderReceiptProtocol.begin(order(), 'other', 10, '', photo, 'now'),
        throwsStateError);
    expect(
        () => OrderReceiptProtocol.begin(order(), 'org', 11, '', photo, 'now'),
        throwsStateError);
  });
  test(
      'demo receipt accepts optional photo but validates supplied media and freezes intent',
      () {
    for (final mode in ['Tự đến lấy', 'Nhờ giao hộ']) {
      final o = {...order(), 'transport': mode, 'deliveryConfirmed': true};
      final receipt = OrderReceiptProtocol.begin(o, 'org', 10, '', '', 'now');
      expect(receipt['receiptState'], 'pending');
      expect(OrderReceiptProtocol.credit({}, receipt)['received'], 10);
      expect(
          () => OrderReceiptProtocol.begin(
              o, 'org', 10, '', 'https://example.com/a.png', 'now'),
          throwsStateError);
      expect(
          OrderReceiptProtocol.begin(
              o, 'org', 10, '', photo, 'now')['receiptPhoto'],
          photo);
      expect(
          OrderReceiptProtocol.begin(
              receipt, 'org', 1, 'changed', photo, 'later'),
          same(receipt));
    }
    expect(
        () => OrderReceiptProtocol.begin(
            {...order(), 'transport': 'Nhờ giao hộ'}, 'org', 10, '', '', 'now'),
        throwsStateError);
  });
}
