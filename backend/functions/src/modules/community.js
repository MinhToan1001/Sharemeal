'use strict';
const {requireThat, text, key, admin, orderFor} = require('../shared/policy');
const {ownedMedia} = require('../shared/media');
module.exports = {
  sendMessage(ctx, p) {
    const o = orderFor(ctx, p.orderId);
    ctx.state.messages[ctx.id] = {id: ctx.id, orderId: o.id, uid: ctx.uid, name: ctx.user.name, text: text(p.text, 'Tin nhắn'), time: ctx.now};
    for (const uid of [o.donorId, o.organizationId, o.volunteerId].filter(uid => uid && uid !== ctx.uid)) ctx.notify(uid, `Tin nhắn từ ${ctx.user.name}`, o.id);
    return {};
  },
  submitTicket(ctx, p) {
    if (p.orderId) orderFor(ctx, p.orderId);
    requireThat(!p.photo || typeof p.photo === 'string' && p.photo.startsWith(`documents/${ctx.uid}/`) && !p.photo.includes('..'), 'Ảnh không thuộc tài khoản.');
    if(p.photo) ownedMedia(ctx.root,ctx.uid,p.photo,'documents');
    ctx.state.tickets[ctx.id] = {id: ctx.id, uid: ctx.uid, name: ctx.user.name, orderId: p.orderId || '',
      reason: text(p.reason, 'Lý do', 200), detail: text(p.detail, 'Nội dung'), status: 'open', photo: typeof p.photo === 'string' ? p.photo : '', createdAt: ctx.now};
    return {id: ctx.id};
  },
  resolveTicket(ctx, p) {
    admin(ctx); const ticket = ctx.state.tickets[key(p.id)];
    requireThat(ticket && ['open', 'investigating'].includes(ticket.status), 'Vụ việc đã kết thúc hoặc không tồn tại.');
    requireThat(['investigating', 'resolved', 'rejected'].includes(p.status), 'Trạng thái không hợp lệ.');
    ticket.status = p.status; ticket.resolution = text(p.note, 'Phản hồi'); ticket.resolvedBy = ctx.uid;
    ctx.notify(ticket.uid, 'Cập nhật hỗ trợ', ticket.resolution); return {};
  },
  saveReview(ctx, p) {
    const o = orderFor(ctx, p.orderId);
    requireThat(o.status === 'completed' && [o.donorId, o.organizationId].includes(ctx.uid), 'Chỉ đánh giá sau khi hoàn tất.');
    requireThat(Number.isInteger(p.rating) && p.rating >= 1 && p.rating <= 5, 'Số sao không hợp lệ.');
    ctx.state.reviews[`${o.id}_${ctx.uid}`] = {orderId: o.id, uid: ctx.uid, rating: p.rating, note: text(p.note || 'Cảm ơn', 'Đánh giá'), createdAt: ctx.now}; return {};
  },
  sendThanks(ctx, p) {
    const o = orderFor(ctx, p.orderId);
    requireThat(o.organizationId === ctx.uid && o.status === 'completed', 'Chỉ tổ chức đã nhận món được gửi cảm ơn.');
    o.thanks = text(p.text, 'Lời cảm ơn'); ctx.notify(o.donorId, 'Lời cảm ơn', o.thanks); return {};
  },
  readAll(ctx) {
    for (const n of Object.values(ctx.state.notifications)) if (n.uid === ctx.uid) n.read = true;
    return {};
  }
};
