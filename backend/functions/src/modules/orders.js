'use strict';
const {requireThat, text, quantity, role, admin, key, orderFor} = require('../shared/policy');
const {createHash, timingSafeEqual} = require('node:crypto');
const {ownedMedia} = require('../shared/media');
const digest = (code, orderId, stage) => createHash('sha256').update(`${orderId}:${stage}:${code}`).digest('hex');
module.exports = {
  savePickupPhoto(ctx, p) {
    role(ctx, 'volunteer'); const o = orderFor(ctx, p.id);
    requireThat(o.volunteerId === ctx.uid && o.status === 'pickedUp', 'Chỉ người giao đã lấy hàng được gửi ảnh bàn giao.', 403);
    requireThat(typeof p.path === 'string' && p.path.startsWith(`documents/${ctx.uid}/`) && !p.path.includes('..') && /\.(jpg|jpeg|png)$/.test(p.path), 'Ảnh không hợp lệ.');
    ownedMedia(ctx.root,ctx.uid,p.path,'documents');
    o.proof = p.path; o.proofAt = ctx.now;
    return {};
  },
  requestFood(ctx, p) {
    role(ctx, 'charity');
    const f = ctx.state.foods[key(p.foodId)];
    requireThat(f?.status === 'open' && Date.parse(f.expiresAt) > ctx.time, 'Món không còn được mở nhận.');
    requireThat(f.donorId !== ctx.uid, 'Không thể xin nhận món của chính mình.');
    const qty = quantity(p.quantity, f.quantity);
    requireThat(!Object.values(ctx.state.orders).some(o => o.foodId === f.id && o.organizationId === ctx.uid && !['cancelled', 'rejected', 'completed'].includes(o.status)), 'Bạn đã có yêu cầu đang xử lý cho món này.');
    requireThat(['Nhờ giao hộ', 'Tự đến lấy'].includes(p.transport), 'Phương thức nhận không hợp lệ.');
    ctx.state.orders[ctx.id] = {id: ctx.id, foodId: f.id, donorId: f.donorId, organizationId: ctx.uid,
      organization: ctx.user.name, quantity: qty, status: 'awaiting', transport: p.transport, driver: '',
      time: text(p.time, 'Giờ nhận', 200), note: typeof p.note === 'string' ? p.note.slice(0, 2000) : '', received: 0, createdAt: ctx.now};
    ctx.notify(f.donorId, 'Yêu cầu nhận món mới', `${ctx.user.name} xin ${qty} suất ${f.name}`);
    return {id: ctx.id};
  },
  transitionOrder(ctx, p) {
    const o = p.status === 'assigned' ? ctx.state.orders[key(p.id)] : orderFor(ctx, p.id);
    requireThat(o, 'Không tìm thấy chuyến.');
    const f = ctx.state.foods[o.foodId];
    if (p.status === 'accepted' || p.status === 'rejected') {
      role(ctx, 'donor');
      requireThat(o.donorId === ctx.uid && o.status === 'awaiting', 'Chỉ người cho được xử lý yêu cầu đang chờ.', 403);
      if (p.status === 'accepted') {
        requireThat(f.status === 'open' && Date.parse(f.expiresAt) > ctx.time, 'Món không còn mở nhận.');
        requireThat(f.quantity >= o.quantity, 'Không đủ số lượng.');
        f.quantity -= o.quantity;
      }
    } else if (p.status === 'assigned') {
      role(ctx, 'volunteer');
      requireThat(o.status === 'accepted' && o.transport === 'Nhờ giao hộ' && !o.volunteerId, 'Chuyến đã có người nhận hoặc không cần giao hộ.');
      o.volunteerId = ctx.uid; o.driver = ctx.user.name;
    } else if (p.status === 'cancelled') {
      requireThat([o.donorId, o.organizationId].includes(ctx.uid), 'Bạn không thể hủy đơn này.', 403);
      requireThat(['awaiting', 'accepted', 'assigned'].includes(o.status), 'Không thể hủy đơn đã lấy hàng hoặc đã kết thúc.');
      if (o.status !== 'awaiting') f.quantity += o.quantity;
    } else if (p.status === 'completed') {
      role(ctx, 'charity');
      requireThat(o.organizationId === ctx.uid && o.status === 'pickedUp', 'Chỉ tổ chức nhận được xác nhận hoàn tất.', 403);
      requireThat(o.transport === 'Tự đến lấy' || o.deliveryConfirmed === true, 'Cần đối chiếu mã nhận hàng với người giao.');
      o.received = quantity(p.received, o.quantity); o.completedAt = ctx.now;
      const inventory = ctx.state.inventory[ctx.uid] ??= {received: 0, distributed: 0};
      inventory.received += o.received;
    } else requireThat(false, 'Bước chuyển trạng thái không hợp lệ.');
    o.status = p.status; o.updatedAt = ctx.now;
    for (const uid of [o.donorId, o.organizationId, o.volunteerId].filter(Boolean)) ctx.notify(uid, 'Cập nhật đơn', `${o.id}: ${o.status}`);
    return {id: o.id};
  },
  confirmSchedule(ctx, p) {
    role(ctx, 'donor'); const o = orderFor(ctx, p.id);
    requireThat(o.donorId === ctx.uid && ['accepted', 'assigned'].includes(o.status), 'Không thể sửa lịch của đơn này.');
    o.time = text(p.time, 'Giờ nhận', 200); o.note = typeof p.note === 'string' ? p.note.slice(0, 2000) : '';
    ctx.notify(o.organizationId, 'Lịch lấy món', o.time); return {};
  },
  renewHandover(ctx, p) {
    const o = orderFor(ctx, p.id), stage = p.stage;
    requireThat(['pickup', 'receipt'].includes(stage), 'Loại mã không hợp lệ.');
    requireThat(stage === 'pickup' ? o.donorId === ctx.uid && ['accepted', 'assigned'].includes(o.status)
      : o.organizationId === ctx.uid && o.status === 'pickedUp', 'Bạn không thể tạo mã cho bước này.', 403);
    const codeKey = `${o.id}_${stage}`;
    ctx.state.codes[codeKey] = {hash: digest(ctx.pin, o.id, stage), expiresAt: ctx.time + 600000, attempts: 0};
    ctx.state.codeDisplays[codeKey] = {uid: ctx.uid, orderId: o.id, stage, pin: ctx.pin, expiresAt: ctx.time + 600000};
    return {pin: ctx.pin, expiresAt: ctx.time + 600000};
  },
  verifyHandover(ctx, p) {
    const o = orderFor(ctx, p.id), stage = p.stage;
    requireThat(['pickup', 'receipt'].includes(stage), 'Loại mã không hợp lệ.');
    if (stage === 'pickup') {
      requireThat(o.volunteerId === ctx.uid && o.status === 'assigned' || o.organizationId === ctx.uid && o.transport === 'Tự đến lấy' && o.status === 'accepted', 'Bạn không phải người lấy hàng.', 403);
    } else requireThat(o.volunteerId === ctx.uid && o.status === 'pickedUp', 'Bạn không phải người giao hàng.', 403);
    const codeKey = `${o.id}_${stage}`, code = ctx.state.codes[codeKey];
    requireThat(code && code.expiresAt > ctx.time && code.attempts < 5, 'Mã hết hạn hoặc bị khóa. Hãy tạo mã mới.');
    code.attempts++;
    const entered = digest(String(p.pin), o.id, stage);
    // Return an error value so the transaction commits the failed-attempt counter.
    if (!timingSafeEqual(Buffer.from(code.hash), Buffer.from(entered))) return {error: 'Mã không đúng.'};
    delete ctx.state.codes[codeKey]; delete ctx.state.codeDisplays[codeKey];
    if (stage === 'pickup') o.status = 'pickedUp'; else o.deliveryConfirmed = true;
    o.updatedAt = ctx.now;
    return {id: o.id};
  },
  transferJob(ctx, p) {
    role(ctx, 'volunteer'); const o = orderFor(ctx, p.id);
    requireThat(o.volunteerId === ctx.uid && ['assigned', 'pickedUp'].includes(o.status), 'Chuyến không thuộc bạn.');
    ctx.state.tickets[ctx.id] = {id: ctx.id, uid: ctx.uid, orderId: o.id, detail: text(p.reason, 'Lý do'), status: 'open', type: 'transfer', createdAt: ctx.now};
    return {id: ctx.id};
  },
  assignVolunteer(ctx, p) {
    admin(ctx); const o = orderFor(ctx, p.id), user = ctx.root.users[key(p.uid)];
    requireThat(['accepted', 'assigned', 'pickedUp'].includes(o.status) && o.transport === 'Nhờ giao hộ', 'Không thể điều phối đơn này.');
    requireThat(user?.role === 'volunteer' && user.verificationStatus === 'approved' && !user.disabled, 'Tình nguyện viên chưa được duyệt.');
    o.volunteerId = p.uid; o.driver = user.name;
    if (o.status === 'accepted') o.status = 'assigned';
    delete ctx.state.codes[`${o.id}_pickup`]; delete ctx.state.codeDisplays[`${o.id}_pickup`];
    ctx.notify(p.uid, 'Chuyến được phân công', o.id); return {};
  },
  distribute(ctx, p) {
    role(ctx, 'charity'); const qty = quantity(p.quantity), inv = ctx.state.inventory[ctx.uid];
    requireThat(inv && inv.received - inv.distributed >= qty, 'Số phân phát vượt tồn kho.');
    inv.distributed += qty;
    ctx.state.distributions[ctx.id] = {id: ctx.id, uid: ctx.uid, quantity: qty, createdAt: ctx.now};
    return {};
  }
};
