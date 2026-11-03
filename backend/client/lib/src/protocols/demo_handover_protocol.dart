/// Demo progression uses the Figma shutter button, with participant and state
/// checks repeated by Database Rules. No PIN or second device is required.
abstract final class DemoHandoverProtocol {
  static Map<String, dynamic> confirm(
      Map<String, dynamic> order, String uid, String stage, String now) {
    final volunteer = order['volunteerId'] == uid;
    final selfPickup =
        order['organizationId'] == uid && order['transport'] == 'Tự đến lấy';
    if (stage == 'pickup') {
      if ((volunteer || selfPickup) &&
          ['pickedUp', 'completed'].contains(order['status'])) {
        return order;
      }
      if (!(volunteer && order['status'] == 'assigned' ||
          selfPickup && order['status'] == 'accepted')) {
        throw StateError('Bạn không thể xác nhận lấy hàng cho chuyến này.');
      }
      return {
        ...order,
        'status': 'pickedUp',
        'qtyRequested': order['quantity'],
        'qtyPickedUp': order['quantity'],
        'updatedAt': now
      };
    }
    if (stage == 'receipt' && volunteer && order['status'] == 'pickedUp') {
      if (order['deliveryConfirmed'] == true) return order;
      return {...order, 'deliveryConfirmed': true, 'updatedAt': now};
    }
    throw StateError('Bạn không thể xác nhận giao hàng cho chuyến này.');
  }
}
