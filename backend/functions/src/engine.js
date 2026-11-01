'use strict';
const {requireThat, key, isAdmin} = require('./shared/policy');
const {rebuildViews} = require('./shared/projections');
const handlers = {...require('./modules/accounts'), ...require('./modules/foods'), ...require('./modules/orders'), ...require('./modules/community')};
const tables = ['applications', 'foods', 'orders', 'needs', 'messages', 'tickets', 'notifications', 'shifts', 'codes', 'codeDisplays', 'inventory', 'distributions', 'reviews', 'receipts'];
function execute(root, identity, command, payload, requestId, time, pin) {
  root ||= {}; root.users ||= {}; root.state ||= {};
  for (const table of tables) root.state[table] ||= {};
  requireThat(Object.hasOwn(handlers, command), 'Thao tác không tồn tại.', 404);
  key(requestId);
  const uid = identity.uid, user = root.users[uid];
  requireThat(!user?.disabled, 'Tài khoản đã bị khóa.', 403);
  requireThat(command === 'registerProfile' || user, 'Cần tạo hồ sơ trước.', 403);
  requireThat(user?.role !== 'admin' || isAdmin(root, uid), 'Tài khoản không phải admin được chỉ định.', 403);
  requireThat(['registerProfile', 'updateProfile', 'readAll'].includes(command) || identity.emailVerified, 'Hãy xác minh email trước.', 403);
  const receiptKey = `${uid}_${requestId}`;
  const previous = root.state.receipts[receiptKey];
  if (previous) {
    requireThat(previous.command === command && previous.payload === JSON.stringify(payload), 'Mã yêu cầu đã dùng cho thao tác khác.');
    rebuildViews(root, time);
    return {root, result: previous.result || {}};
  }
  const now = new Date(time).toISOString();
  const ctx = {root, state: root.state, uid, user, email: identity.email, now, time, pin, id: `${uid}_${requestId}`,
    today: new Date(time + 7 * 3600000).toISOString().slice(0, 10),
    maxShiftDate: new Date(time + 90 * 86400000 + 7 * 3600000).toISOString().slice(0, 10),
    notify(target, title, body) {
      const id = `${requestId}_${Object.keys(root.state.notifications).length}`;
      root.state.notifications[id] = {id, uid: target, title, body, read: false, createdAt: now};
    }};
  const result = handlers[command](ctx, payload);
  root.state.receipts[receiptKey] = {command, payload: JSON.stringify(payload), result, time};
  // Keep a bounded retry window per account.
  const receipts = Object.entries(root.state.receipts).filter(([k]) => k.startsWith(`${uid}_`)).sort((a,b) => b[1].time - a[1].time);
  for (const [id] of receipts.slice(100)) delete root.state.receipts[id];
  rebuildViews(root, time);
  return {root, result};
}
module.exports = {execute};
