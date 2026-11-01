'use strict';
const {requireThat, text, quantity, key, role, admin} = require('../shared/policy');
const {ownedMedia} = require('../shared/media');
function foodData(p) {
  requireThat(p.safe === true, 'Cần xác nhận an toàn thực phẩm.');
  const expires = Date.parse(p.expiresAt);
  requireThat(Number.isFinite(expires), 'Hãy nhập hạn sử dụng.');
  requireThat(Array.isArray(p.allergens) && p.allergens.length <= 20 && p.allergens.every(x => typeof x === 'string' && x.length <= 100), 'Dị ứng không hợp lệ.');
  const coordinates = {};
  if(p.latitude != null || p.longitude != null) {
    requireThat(Number.isFinite(p.latitude) && Number.isFinite(p.longitude) && Math.abs(p.latitude) <= 90 && Math.abs(p.longitude) <= 180, 'Tọa độ không hợp lệ.');
    Object.assign(coordinates, {latitude:p.latitude, longitude:p.longitude});
  }
  return {...coordinates, name: text(p.name, 'Tên món', 200), quantity: quantity(p.quantity), category: text(p.category, 'Loại món', 100),
    storage: text(p.storage, 'Bảo quản', 200), address: text(p.address, 'Địa chỉ', 500), pickup: text(p.pickup, 'Giờ nhận', 200),
    photo: typeof p.photo === 'string' ? p.photo : '', note: typeof p.note === 'string' ? p.note.slice(0, 2000) : '',
    allergens: p.allergens, expiresAt: new Date(expires).toISOString()};
}
module.exports = {
  publishFood(ctx, p) {
    role(ctx, 'donor');
    const data = foodData(p);
    requireThat(Date.parse(data.expiresAt) > ctx.time, 'Hạn sử dụng phải ở tương lai.');
    if(data.photo) ownedMedia(ctx.root,ctx.uid,data.photo,'food');
    ctx.state.foods[ctx.id] = {...data, id: ctx.id, donorId: ctx.uid, donor: ctx.user.name, status: 'pending', createdAt: ctx.now};
    return {id: ctx.id};
  },
  editFood(ctx, p) {
    role(ctx, 'donor');
    const f = ctx.state.foods[key(p.id)];
    requireThat(f?.donorId === ctx.uid, 'Bạn không sở hữu tin này.', 403);
    requireThat(!Object.values(ctx.state.orders).some(o => o.foodId === f.id && ['accepted', 'assigned', 'pickedUp'].includes(o.status)), 'Tin có đơn đang giao, không thể sửa.');
    const data = foodData(p);
    requireThat(Date.parse(data.expiresAt) > ctx.time, 'Hạn sử dụng phải ở tương lai.');
    if(data.photo) ownedMedia(ctx.root,ctx.uid,data.photo,'food');
    Object.assign(f, data, {status: 'pending', updatedAt: ctx.now});
    return {id: f.id};
  },
  reviewFood(ctx, p) {
    admin(ctx);
    const f = ctx.state.foods[key(p.id)];
    requireThat(f?.status === 'pending', 'Tin không còn chờ duyệt.');
    requireThat(['open', 'rejected'].includes(p.status), 'Trạng thái không hợp lệ.');
    requireThat(p.status !== 'open' || Date.parse(f.expiresAt) > ctx.time, 'Món đã hết hạn.');
    Object.assign(f, {status: p.status, reviewNote: text(p.note, 'Phản hồi', 2000), reviewedBy: ctx.uid, reviewedAt: ctx.now});
    ctx.notify(f.donorId, 'Kết quả duyệt món', `${f.name}: ${p.status}. ${f.reviewNote}`);
    return {};
  },
  closeFood(ctx, p) {
    role(ctx, 'donor');
    const f = ctx.state.foods[key(p.id)];
    requireThat(f?.donorId === ctx.uid, 'Bạn không sở hữu tin này.', 403);
    f.status = 'closed';
    for (const o of Object.values(ctx.state.orders)) if (o.foodId === f.id && o.status === 'awaiting') {
      o.status = 'cancelled'; ctx.notify(o.organizationId, 'Tin đã đóng', f.name);
    }
    return {};
  },
  addNeed(ctx, p) {
    role(ctx, 'charity');
    ctx.state.needs[ctx.id] = {id: ctx.id, uid: ctx.uid, title: text(p.title, 'Tiêu đề', 200), quantity: quantity(p.quantity),
      matched: 0, status: 'pending', category: text(p.category, 'Loại món', 500), priority: text(p.priority, 'Ưu tiên', 100), createdAt: ctx.now};
    return {id: ctx.id};
  },
  reviewNeed(ctx, p) {
    admin(ctx);
    const n = ctx.state.needs[key(p.id)];
    requireThat(n?.status === 'pending' && ['open', 'rejected'].includes(p.status), 'Nhu cầu không còn chờ duyệt.');
    n.status = p.status; n.reviewNote = text(p.note, 'Phản hồi');
    ctx.notify(n.uid, 'Kết quả duyệt nhu cầu', `${n.title}: ${p.status}. ${n.reviewNote}`);
    return {};
  }
};
