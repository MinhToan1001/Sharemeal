'use strict';
class AppError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}
function requireThat(condition, message, status = 400) {
  if (!condition) throw new AppError(message, status);
}
function text(value, label, max = 2000) {
  requireThat(typeof value === 'string' && value.trim().length > 0 && value.length <= max,
    `${label} không hợp lệ.`);
  return value.trim();
}
function quantity(value, max = 10000) {
  requireThat(Number.isSafeInteger(value) && value > 0 && value <= max, 'Số lượng không hợp lệ.');
  return value;
}
function key(value) {
  requireThat(typeof value === 'string' && /^[\w-]{1,128}$/.test(value), 'Mã định danh không hợp lệ.');
  return value;
}
function isAdmin(root, uid) {
  return root.config?.adminUid === uid && root.users?.[uid]?.role === 'admin' && !root.users[uid].disabled;
}
function role(ctx, expected, approved = true) {
  requireThat(ctx.user.role === expected, 'Bạn không có quyền thực hiện thao tác này.', 403);
  if (approved) requireThat(ctx.user.verificationStatus === 'approved', 'Hồ sơ chưa được quản trị viên duyệt.', 403);
}
function admin(ctx) { requireThat(isAdmin(ctx.root, ctx.uid), 'Chỉ quản trị viên duy nhất có quyền này.', 403); }
function participant(order, uid) { return [order.donorId, order.organizationId, order.volunteerId].includes(uid); }
function orderFor(ctx, id) {
  const order = ctx.state.orders[key(id)];
  requireThat(order && (participant(order, ctx.uid) || isAdmin(ctx.root, ctx.uid)), 'Không tìm thấy đơn thuộc quyền truy cập.', 403);
  return order;
}
module.exports = { AppError, requireThat, text, quantity, key, isAdmin, role, admin, participant, orderFor };
