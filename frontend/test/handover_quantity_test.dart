import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:sharemeal/data/repositories/firebase_app_state.dart';
import 'package:sharemeal/presentation/shared/interaction/handover_confirmation.dart';
import 'package:sharemeal/presentation/shared/interaction/interaction_values.dart';
import 'backend_state_test.dart' show TestServices, TestUser, view;

class QuantityState extends FirebaseAppState {
  QuantityState() : super(TestServices()..auth.account = TestUser());
  final writes = <Map<String, dynamic>>[];
  @override
  Future<Map<String, dynamic>> command(String command,
      [Map<String, dynamic> payload = const {}]) async {
    writes.add({'command': command, ...payload});
    return {};
  }
}

void main() {
  testWidgets(
      'pickup confirmation records actual count; cancelling consumes no PIN',
      (t) async {
    final s = QuantityState();
    s.applyView({
      ...view(),
      'orders': [
        {
          'id': 'order',
          'foodId': 'real-food',
          'organization': 'DEMO',
          'quantity': 10,
          'qtyRequested': 10,
          'status': 'assigned',
          'driver': 'DEMO courier',
          'time': '19:00',
          'transport': 'Nhờ giao hộ',
          'received': 0
        }
      ]
    });
    bool? result;
    await t.pumpWidget(MaterialApp(
        home: Builder(
            builder: (context) => Scaffold(
                body: FilledButton(
                    onPressed: () async {
                      result = await verifyWithPickupQuantity(
                          context, s, 'order', 'pickup', '123456');
                    },
                    child: const Text('Verify'))))));
    await t.tap(find.text('Verify'));
    await t.pumpAndSettle();
    expect(find.widgetWithText(TextField, '10'), findsOneWidget);
    await t.tap(find.text('Hủy'));
    await t.pumpAndSettle();
    expect(result, false);
    expect(s.writes, isEmpty);
    await t.tap(find.text('Verify'));
    await t.pumpAndSettle();
    await t.enterText(find.byType(TextField), '8');
    await t.tap(find.text('Lưu'));
    await t.pumpAndSettle();
    expect(result, true);
    expect(s.writes.single['pickedUp'], 8);
    expect(s.writes.single['pin'], '123456');
    s.selectedOrder.status = 'completed';
    s.selectedOrder.received = 0;
    expect(computedText(s, 'receipt.quantity'), '0 suất');
    s.set('receipt.photo', '/tmp/chosen.jpg');
    final pending = Map<String, dynamic>.from(s.rows('orders').single)
      ..addAll({
        'status': 'pickedUp',
        'receiptState': 'pending',
        'qtyReceived': 9,
        'received': 9,
        'discrepancyNote': 'Đã ghi nhận thiếu một suất'
      });
    s.applyView({
      ...s.snapshot,
      'version': 2,
      'orders': [pending]
    });
    expect(s.get('receipt.quantity', 10), 9);
    expect(s.get('receipt.note', ''), 'Đã ghi nhận thiếu một suất');
    expect(s.get('receipt.photo', ''), '/tmp/chosen.jpg');
    await t.pumpWidget(const SizedBox());
    s.dispose();
  });
}
