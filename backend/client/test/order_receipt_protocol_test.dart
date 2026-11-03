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
      'receipt evidence required for both modes; pending E receipt can attach only its missing photo',
      () {
    for (final mode in ['Tự đến lấy', 'Nhờ giao hộ']) {
      final o = {...order(), 'transport': mode, 'deliveryConfirmed': true};
      for (final invalid in [
        '',
        'https://example.com/a.png',
        'https://res.cloudinary.com/toanvip/raw/upload/a.pdf',
        'https://res.cloudinary.com/toanvip/image/upload/a.pdf'
      ]) {
        expect(
            () => OrderReceiptProtocol.begin(o, 'org', 10, '', invalid, 'now'),
            throwsStateError);
      }
      expect(
          OrderReceiptProtocol.begin(
              o, 'org', 10, '', photo, 'now')['receiptPhoto'],
          photo);
    }
    final pending = {
      ...order(),
      'receiptState': 'pending',
      'qtyReceived': 9,
      'received': 9,
      'qtyPickedUp': 10,
      'discrepancyNote': 'Thiếu một suất'
    };
    expect(() => OrderReceiptProtocol.begin(pending, 'org', 10, '', '', 'now'),
        throwsStateError);
    final fixed =
        OrderReceiptProtocol.begin(pending, 'org', 10, 'changed', photo, 'now');
    expect(fixed['qtyReceived'], 9);
    expect(fixed['discrepancyNote'], 'Thiếu một suất');
    expect(fixed['receiptPhoto'], photo);
    expect(OrderReceiptProtocol.begin(fixed, 'org', 10, '', '', 'later'),
        same(fixed));
  });
}
