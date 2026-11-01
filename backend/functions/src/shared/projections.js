'use strict';
const {isAdmin, participant} = require('./policy');
function project(root, uid, time = Date.now()) {
  const user = root.users?.[uid];
  if (!user || user.disabled) return {version: root.revision || 0, profile: user ? {uid, disabled: true} : null};
  const s = root.state || {}, all = name => Object.values(s[name] || {}), privileged = isAdmin(root, uid);
  const visibleOrders = all('orders').filter(o => privileged || participant(o, uid) ||
    user.role === 'volunteer' && user.verificationStatus === 'approved' && o.status === 'accepted' && o.transport === 'Nhờ giao hộ');
  const orderIds = new Set(visibleOrders.map(o => o.id));
  const foodIds = new Set(visibleOrders.map(o => o.foodId));
  const foods = all('foods').filter(f => privileged || f.donorId === uid || foodIds.has(f.id) || f.status === 'open' && f.quantity > 0 && Date.parse(f.expiresAt) > time);
  const history = visibleOrders.filter(o => o.status === 'completed' && participant(o, uid)).map(o => {
    const f = s.foods[o.foodId];
    return {orderId: o.id, name: f.name, quantity: o.received, kg: o.received * 0.5, category: f.category,
      daysAgo: Math.floor((time - Date.parse(o.completedAt)) / 86400000)};
  });
  // Volunteer job discovery exposes only the details needed to claim a job.
  const orders = visibleOrders.map(o => participant(o, uid) || privileged ? o :
    {id: o.id, foodId: o.foodId, quantity: o.quantity, organization: o.organization, status: o.status, transport: o.transport, time: o.time, driver: '', received: 0});
  return {version: root.revision || 0, profile: user, foods: foods.map(f => ({...f, mine: f.donorId === uid, distance: 0})), orders, history,
    needs: all('needs').filter(n => privileged || n.uid === uid || n.status === 'open'),
    applications: all('applications').filter(a => privileged || a.uid === uid),
    messages: all('messages').filter(m => orderIds.has(m.orderId) && (privileged || participant(s.orders[m.orderId], uid))).map(m => ({...m, mine: m.uid === uid})),
    tickets: all('tickets').filter(t => privileged || t.uid === uid),
    notifications: all('notifications').filter(n => n.uid === uid),
    shifts: all('shifts').filter(x => x.uid === uid),
    codes: all('codeDisplays').filter(c => c.uid === uid && c.expiresAt > time),
    inventory: s.inventory?.[uid] || {received: 0, distributed: 0},
    distributions: all('distributions').filter(d => privileged || d.uid === uid),
    reviews: all('reviews').filter(r => orderIds.has(r.orderId) && (privileged || participant(s.orders[r.orderId], uid))),
    accounts: privileged ? Object.values(root.users) : []};
}
function rebuildViews(root, time) {
  root.revision = (root.revision || 0) + 1;
  root.views = {};
  for (const uid of Object.keys(root.users || {})) root.views[uid] = project(root, uid, time);
}
module.exports = {project, rebuildViews};
