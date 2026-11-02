import 'package:flutter/material.dart';
import '../../../data/repositories/firebase_app_state.dart';
import 'frontend_actions.dart';

/// Shared by QR and PIN paths so both record the actual pickup quantity.
Future<bool> verifyWithPickupQuantity(BuildContext context, FirebaseAppState s,
    String id, String stage, String pin) async {
  int? picked;
  if (stage == 'pickup') {
    final o = s.rows('orders').where((o) => o['id'] == id).first;
    if (!['pickedUp', 'completed'].contains(o['status'])) {
      final value = await FrontendActions.edit(
          context, 'Số suất thực lấy', '${o['qtyRequested'] ?? o['quantity']}',
          keyboard: TextInputType.number);
      if (value == null) return false;
      picked = int.tryParse(value);
      if (picked == null || picked <= 0 || picked > (o['quantity'] as num)) {
        throw StateError('Số thực lấy phải từ 1 đến ${o['quantity']} suất.');
      }
    }
  }
  await s.command('verifyHandover', {
    'id': id,
    'stage': stage,
    'pin': pin,
    if (picked != null) 'pickedUp': picked
  });
  return true;
}
