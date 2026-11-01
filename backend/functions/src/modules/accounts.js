'use strict';
const {requireThat, text, role, admin, key} = require('../shared/policy');
const {ownedMedia} = require('../shared/media');
const roles = ['donor', 'charity', 'volunteer'];
module.exports = {
  registerProfile(ctx, p) {
    if (ctx.root.users[ctx.uid]) return {};
    const name = text(p.name, 'Họ tên', 100);
    ctx.root.users[ctx.uid] = {uid: ctx.uid, name, email: ctx.email, role: '', verificationStatus: 'draft', createdAt: ctx.now};
    return {};
  },
  selectRole(ctx, p) {
    requireThat(roles.includes(p.role), 'Chỉ được đăng ký một trong ba vai trò người dùng.');
    requireThat(!ctx.user.role || ctx.user.role === p.role, 'Vai trò đã đăng ký. Đổi vai trò cần gửi hồ sơ mới cho admin.');
    ctx.user.role = p.role;
    return {};
  },
  updateProfile(ctx, p) {
    if (p.name !== undefined) ctx.user.name = text(p.name, 'Họ tên', 100);
    if (p.phone !== undefined) ctx.user.phone = text(p.phone, 'Điện thoại', 30);
    if (p.address !== undefined) ctx.user.address = text(p.address, 'Địa chỉ', 500);
    return {};
  },
  submitApplication(ctx, p) {
    requireThat(roles.includes(p.role), 'Vai trò không hợp lệ.');
    requireThat(ctx.user.verificationStatus !== 'pending', 'Hồ sơ đang chờ duyệt.');
    requireThat(p.consent === true, 'Cần đồng ý cam kết.');
    requireThat(Array.isArray(p.documents) && p.documents.length > 0 && p.documents.length <= 10, 'Hãy đính kèm giấy tờ xác minh.');
    for (const document of p.documents) {
      requireThat(typeof document === 'string' && document.startsWith(`documents/${ctx.uid}/`) && !document.includes('..'), 'Giấy tờ không thuộc tài khoản.');
      ownedMedia(ctx.root,ctx.uid,document,'documents');
    }
    requireThat(ctx.user.verificationStatus !== 'approved' || ctx.user.role !== p.role, 'Hồ sơ đã được duyệt.');
    const application = {id: ctx.id, uid: ctx.uid, name: ctx.user.name, role: p.role,
      documents: p.documents, details: text(p.details, 'Thông tin hồ sơ', 8000), status: 'pending', createdAt: ctx.now};
    ctx.state.applications[ctx.id] = application;
    ctx.user.verificationStatus = 'pending';
    return {id: ctx.id};
  },
  reviewApplication(ctx, p) {
    admin(ctx);
    const a = ctx.state.applications[key(p.id)];
    requireThat(a?.status === 'pending', 'Hồ sơ không còn chờ duyệt.');
    requireThat(['approved', 'rejected', 'supplement'].includes(p.status), 'Trạng thái không hợp lệ.');
    const note = text(p.note, 'Nội dung phản hồi', 2000);
    Object.assign(a, {status: p.status, note, reviewedBy: ctx.uid, reviewedAt: ctx.now});
    const user = ctx.root.users[a.uid];
    requireThat(user && user.role !== 'admin', 'Không thể sửa tài khoản admin.');
    user.verificationStatus = p.status;
    if (p.status === 'approved') user.role = a.role;
    ctx.notify(a.uid, 'Kết quả xác minh', `${p.status}: ${note}`);
    return {};
  },
  setAccountDisabled(ctx, p) {
    admin(ctx);
    const user = ctx.root.users[key(p.uid)];
    requireThat(user && user.role !== 'admin' && p.uid !== ctx.uid, 'Không thể khóa tài khoản này.');
    requireThat(typeof p.disabled === 'boolean', 'Trạng thái không hợp lệ.');
    user.disabled = p.disabled;
    return {};
  },
  registerShift(ctx, p) {
    role(ctx, 'volunteer');
    requireThat(/^\d{4}-\d{2}-\d{2}$/.test(p.date), 'Ngày không hợp lệ.');
    requireThat(p.date >= ctx.today && p.date <= ctx.maxShiftDate, 'Chỉ đăng ký ca từ hôm nay đến 90 ngày tới.');
    const id = `${ctx.uid}_${p.date}`;
    if (p.cancel) delete ctx.state.shifts[id];
    else ctx.state.shifts[id] = {id, uid: ctx.uid, date: p.date};
    return {};
  }
};
