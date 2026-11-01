'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const {execute} = require('../src/engine');
const {project, rebuildViews} = require('../src/shared/projections');
const {newChallenge, checkChallenge} = require('../src/modules/email_otp');
const now = Date.parse('2026-11-01T03:00:00Z');
function fixture() {
  let root = {config: {adminUid: 'admin'}, users: {
    admin: {uid: 'admin', name: 'Admin', email: 'admin@example.com', role: 'admin', verificationStatus: 'approved'},
    donor: {uid: 'donor', name: 'Bếp', email: 'donor@example.com', role: 'donor', verificationStatus: 'approved'},
    org: {uid: 'org', name: 'Tổ chức', email: 'org@example.com', role: 'charity', verificationStatus: 'approved'},
    org2: {uid: 'org2', name: 'Tổ chức 2', email: 'org2@example.com', role: 'charity', verificationStatus: 'approved'},
    volunteer: {uid: 'volunteer', name: 'Người giao', email: 'v@example.com', role: 'volunteer', verificationStatus: 'approved'},
    volunteer2: {uid: 'volunteer2', name: 'Người giao 2', email: 'v2@example.com', role: 'volunteer', verificationStatus: 'approved'},
  }};
  let next = 0;
  const act = (uid, command, payload = {}, id = `request-${++next}`, verified = true, time = now) => {
    // Firebase retries discard a callback's mutations when the callback throws.
    const copy = structuredClone(root);
    const result = execute(copy, {uid, email: `${uid}@example.com`, emailVerified: verified}, command, payload, id, time, '123789');
    root = result.root; return result.result;
  };
  const foodPayload = {name: 'Cơm rau', quantity: 10, category: 'Cơm', storage: 'Giữ nóng', address: 'Địa chỉ thật', pickup: '18:00–19:00', allergens: [], photo: '', expiresAt: '2026-11-01T16:00:00Z', safe: true};
  const food = () => act('donor', 'publishFood', foodPayload).id;
  const approvedFood = () => { const id = food(); act('admin', 'reviewFood', {id, status: 'open', note: 'Đã đối chiếu'}); return id; };
  const request = (foodId, uid = 'org', qty = 6, transport = 'Nhờ giao hộ') => act(uid, 'requestFood', {foodId, quantity: qty, transport, time: '18:30'}).id;
  return {act, food, approvedFood, request, foodPayload, get root() {return root;}};
}
test('pending food is private until singleton admin approves it', () => {
  const f = fixture(), id = f.food();
  assert.equal(project(f.root, 'org', now).foods.length, 0);
  assert.equal(project(f.root, 'donor', now).foods[0].status, 'pending');
  assert.throws(() => f.act('org', 'reviewFood', {id, status: 'open', note: 'hack'}), /quản trị/);
  f.act('admin', 'reviewFood', {id, status: 'open', note: 'Đủ điều kiện'});
  assert.equal(project(f.root, 'org', now).foods[0].status, 'open');
});
test('full donation, volunteer pickup, delivery code, receipt and inventory workflow', () => {
  const f = fixture(), foodId = f.approvedFood(), id = f.request(foodId);
  f.act('donor', 'transitionOrder', {id, status: 'accepted'});
  assert.equal(f.root.state.foods[foodId].quantity, 4);
  f.act('volunteer', 'transitionOrder', {id, status: 'assigned'});
  f.act('donor', 'renewHandover', {id, stage: 'pickup'});
  assert.equal(project(f.root, 'volunteer', now).codes.length, 0);
  assert.equal(project(f.root, 'donor', now).codes[0].pin, '123789');
  assert.throws(() => f.act('volunteer2', 'verifyHandover', {id, stage: 'pickup', pin: '123789'}), /quyền/);
  assert.equal(f.act('volunteer', 'verifyHandover', {id, stage: 'pickup', pin: '000000'}).error, 'Mã không đúng.');
  f.act('volunteer', 'verifyHandover', {id, stage: 'pickup', pin: '123789'});
  assert.equal(f.root.state.orders[id].status, 'pickedUp');
  f.act('volunteer', 'savePickupPhoto', {id, path:'documents/volunteer/pickup.jpg'});
  assert.equal(f.root.state.orders[id].proof, 'documents/volunteer/pickup.jpg');
  assert.throws(() => f.act('org', 'savePickupPhoto', {id, path:'documents/org/pickup.jpg'}), /quyền/);
  assert.throws(() => f.act('org', 'transitionOrder', {id, status: 'completed', received: 5}), /đối chiếu/);
  f.act('org', 'renewHandover', {id, stage: 'receipt'});
  f.act('volunteer', 'verifyHandover', {id, stage: 'receipt', pin: '123789'});
  f.act('org', 'transitionOrder', {id, status: 'completed', received: 5});
  assert.equal(f.root.state.inventory.org.received, 5);
  f.act('org', 'distribute', {quantity: 3});
  assert.equal(f.root.state.inventory.org.distributed, 3);
  assert.throws(() => f.act('org', 'distribute', {quantity: 3}), /tồn kho/);
  assert.equal(project(f.root, 'donor', now).history[0].quantity, 5);
  assert.throws(() => f.act('org', 'transitionOrder', {id, status: 'cancelled'}), /Không thể hủy/);
});
test('acceptance is serialized and cannot oversell shared food', () => {
  const f = fixture(), foodId = f.approvedFood(), a = f.request(foodId), b = f.request(foodId, 'org2');
  f.act('donor', 'transitionOrder', {id: a, status: 'accepted'});
  assert.throws(() => f.act('donor', 'transitionOrder', {id: b, status: 'accepted'}), /Không đủ/);
  assert.equal(f.root.state.foods[foodId].quantity, 4);
});
test('duplicate retries cannot double reserve stock and changed payload is rejected', () => {
  const f = fixture(), foodId = f.approvedFood(), id = f.request(foodId);
  f.act('donor', 'transitionOrder', {id, status: 'accepted'}, 'retry');
  f.act('donor', 'transitionOrder', {id, status: 'accepted'}, 'retry');
  assert.equal(f.root.state.foods[foodId].quantity, 4);
  assert.throws(() => f.act('donor', 'transitionOrder', {id, status: 'rejected'}, 'retry'), /đã dùng/);
});
test('only one volunteer can claim a job', () => {
  const f = fixture(), id = f.request(f.approvedFood());
  f.act('donor', 'transitionOrder', {id, status: 'accepted'});
  f.act('volunteer', 'transitionOrder', {id, status: 'assigned'});
  assert.throws(() => f.act('volunteer2', 'transitionOrder', {id, status: 'assigned'}), /đã có người nhận/);
});
test('cancellation restores reservation exactly once and cannot restore picked-up stock', () => {
  const f = fixture(), foodId = f.approvedFood(), id = f.request(foodId);
  f.act('donor', 'transitionOrder', {id, status: 'accepted'});
  f.act('org', 'transitionOrder', {id, status: 'cancelled'});
  assert.equal(f.root.state.foods[foodId].quantity, 10);
  assert.throws(() => f.act('org', 'transitionOrder', {id, status: 'cancelled'}), /Không thể hủy/);
});
test('self pickup requires donor code, not volunteer assignment', () => {
  const f = fixture(), id = f.request(f.approvedFood(), 'org', 3, 'Tự đến lấy');
  f.act('donor', 'transitionOrder', {id, status: 'accepted'});
  assert.throws(() => f.act('volunteer', 'transitionOrder', {id, status: 'assigned'}), /không cần giao hộ/);
  f.act('donor', 'renewHandover', {id, stage: 'pickup'});
  f.act('org', 'verifyHandover', {id, stage: 'pickup', pin: '123789'});
  f.act('org', 'transitionOrder', {id, status: 'completed', received: 3});
  assert.equal(f.root.state.inventory.org.received, 3);
});
test('unapproved and unverified users cannot publish or request', () => {
  const f = fixture();
  assert.throws(() => f.act('donor', 'publishFood', f.foodPayload, 'no-verify', false), /xác minh email/);
  f.root.users.donor.verificationStatus = 'pending';
  assert.throws(() => f.food(), /chưa.*duyệt/);
});
test('admin cannot be self registered or selected, second admin is denied', () => {
  const f = fixture();
  f.act('new', 'registerProfile', {name: 'User', role: 'admin'});
  assert.equal(f.root.users.new.role, '');
  assert.throws(() => f.act('new', 'selectRole', {role: 'admin'}), /ba vai trò/);
  f.root.users.donor.role = 'admin';
  assert.throws(() => f.act('donor', 'reviewFood', {}), /admin/);
  assert.throws(() => f.act('admin', 'setAccountDisabled', {uid: 'admin', disabled: true}), /Không thể khóa/);
});
test('application approval, supplement and resubmission update only applicant', () => {
  const f = fixture();
  f.act('new', 'registerProfile', {name: 'Người mới'});
  f.act('new', 'selectRole', {role: 'donor'});
  const payload = {role: 'donor', documents: ['documents/new/id.pdf'], details: 'Địa chỉ và hoạt động', consent: true};
  const first = f.act('new', 'submitApplication', payload).id;
  assert.throws(() => f.act('new', 'submitApplication', payload), /chờ duyệt/);
  f.act('admin', 'reviewApplication', {id: first, status: 'supplement', note: 'Ảnh chưa rõ'});
  const second = f.act('new', 'submitApplication', payload).id;
  f.act('admin', 'reviewApplication', {id: second, status: 'approved', note: 'Đã kiểm tra'});
  assert.equal(f.root.users.new.verificationStatus, 'approved');
  assert.equal(f.root.users.org.verificationStatus, 'approved');
  assert.equal(project(f.root, 'org', now).applications.length, 0);
});
test('private documents and fabricated evidence paths are rejected', () => {
  const f = fixture(); f.root.users.donor.verificationStatus = 'draft';
  assert.throws(() => f.act('donor', 'submitApplication', {role: 'donor', documents: ['documents/org/private.pdf'], details: 'test', consent: true}), /không thuộc/);
});
test('food edit requires fresh admin approval and cannot modify active reservations', () => {
  const f = fixture(), id = f.approvedFood();
  f.act('donor', 'editFood', {...f.foodPayload, id, name: 'Món đã sửa'});
  assert.equal(project(f.root, 'org', now).foods.length, 0);
  f.act('admin', 'reviewFood', {id, status: 'open', note: 'OK'});
  const order = f.request(id); f.act('donor', 'transitionOrder', {id: order, status: 'accepted'});
  assert.throws(() => f.act('donor', 'editFood', {...f.foodPayload, id}), /đang giao/);
});
test('expired foods are not discoverable or requestable', () => {
  const f = fixture(), id = f.approvedFood();
  assert.equal(project(f.root, 'org', now + 86400000).foods.length, 0);
  assert.throws(() => f.act('org', 'requestFood', {foodId: id, quantity: 1}, 'late', true, now + 86400000), /mở nhận/);
});
test('chat and tickets have participant and owner privacy', () => {
  const f = fixture(), id = f.request(f.approvedFood());
  f.act('org', 'sendMessage', {orderId: id, text: 'Xin chào'});
  assert.equal(project(f.root, 'donor', now).messages.length, 1);
  assert.equal(project(f.root, 'org2', now).messages.length, 0);
  assert.throws(() => f.act('org2', 'sendMessage', {orderId: id, text: 'hack'}), /quyền/);
  const ticket = f.act('org', 'submitTicket', {orderId: id, reason: 'Hỗ trợ', detail: 'Cần điều chỉnh giờ'}).id;
  f.act('admin', 'resolveTicket', {id: ticket, status: 'resolved', note: 'Đã xử lý'});
  assert.equal(project(f.root, 'org', now).tickets[0].status, 'resolved');
  assert.equal(project(f.root, 'org2', now).tickets.length, 0);
});
test('needs require admin approval; disabled users lose both commands and projections', () => {
  const f = fixture(), id = f.act('org', 'addNeed', {title: 'Bữa tối', quantity: 20, category: 'Cơm', priority: 'Cần gấp'}).id;
  assert.equal(project(f.root, 'donor', now).needs.length, 0);
  f.act('admin', 'reviewNeed', {id, status: 'open', note: 'OK'});
  assert.equal(project(f.root, 'donor', now).needs.length, 1);
  f.act('admin', 'setAccountDisabled', {uid: 'org', disabled: true});
  assert.throws(() => f.act('org', 'readAll'), /bị khóa/);
  assert.equal(project(f.root, 'org', now).foods, undefined);
});
test('PIN attempts persist; exhausted and expired codes cannot be used', () => {
  const f = fixture(), id = f.request(f.approvedFood());
  f.act('donor', 'transitionOrder', {id, status: 'accepted'}); f.act('volunteer', 'transitionOrder', {id, status: 'assigned'});
  f.act('donor', 'renewHandover', {id, stage: 'pickup'});
  for(let n=0;n<5;n++) assert.ok(f.act('volunteer', 'verifyHandover', {id, stage: 'pickup', pin: '0'}).error);
  assert.throws(() => f.act('volunteer', 'verifyHandover', {id, stage: 'pickup', pin: '123789'}), /bị khóa/);
  f.act('donor', 'renewHandover', {id, stage: 'pickup'});
  assert.throws(() => f.act('volunteer', 'verifyHandover', {id, stage: 'pickup', pin: '123789'}, 'expired-pin', true, now + 600001), /hết hạn/);
});
test('OTP has resend cooldown, daily quota, five attempts, expiry and single use', () => {
  const code = '735190'; let c = newChallenge('uid', null, now, code);
  assert.notEqual(c.hash, code); assert.ok(!JSON.stringify(c).includes(code));
  assert.throws(() => newChallenge('uid', c, now + 1000, code), /60 giây/);
  assert.equal(checkChallenge('uid', c, code, now + 100), true);
  assert.throws(() => checkChallenge('uid', c, code, now + 200), /đã dùng/);
  c = newChallenge('uid', null, now, code);
  for(let i=0;i<5;i++) assert.equal(checkChallenge('uid', c, '000000', now + 100), false);
  assert.throws(() => checkChallenge('uid', c, code, now + 200), /bị khóa/);
  c = newChallenge('uid', null, now, code);
  assert.throws(() => checkChallenge('uid', c, code, now + 600001), /hết hạn/);
  for(let i=1;i<10;i++) c = newChallenge('uid', c, now + i*60001, code);
  assert.throws(() => newChallenge('uid', c, now + 10*60001, code), /10 email/);
});
test('rebuilding snapshots removes stale data and increments version', () => {
  const f = fixture(); f.approvedFood(); const version = f.root.revision;
  f.root.users.org.disabled = true; rebuildViews(f.root, now);
  assert.ok(f.root.revision > version); assert.equal(f.root.views.org.foods, undefined);
});
