'use strict';
// Run with Firebase emulators:exec --only auth,database --project demo-sharemeal-workflow.
const assert = require('node:assert/strict');
const {initializeApp} = require('firebase-admin/app');
const {getAuth} = require('firebase-admin/auth');
const {getDatabase} = require('firebase-admin/database');
assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST, '127.0.0.1:9099');
assert.equal(process.env.FIREBASE_DATABASE_EMULATOR_HOST, '127.0.0.1:9000');
const projectId = 'demo-sharemeal-workflow';
const app = initializeApp({projectId, databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`});
const db = getDatabase(app), auth = getAuth(app);
const stamp = new Date().toISOString();
async function main() {
  const users = {}, tokens = {};
  for (const [uid, role] of Object.entries({donor:'donor', org:'charity', driver:'volunteer', other:'volunteer'})) {
    const email = `${uid}@workflow.test`, password = 'Local-workflow-test-123!';
    try { await auth.deleteUser(uid); } catch {}
    await auth.createUser({uid, email, password, emailVerified:true});
    users[uid] = {uid, role, name:uid, email, verificationStatus:'approved', disabled:false};
    const response = await fetch('http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=emulator', {
      method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({email,password,returnSecureToken:true})});
    tokens[uid] = (await response.json()).idToken;
    assert.ok(tokens[uid]);
  }
  const food = {id:'food',donorId:'donor',donor:'donor',name:'Nine meals',quantity:9,reserved:7,
    category:'Cơm & món mặn',storage:'Còn nóng',address:'Demo',pickup:'19:30',safe:true,
    status:'open',expiresAt:new Date(Date.now()+3600000).toISOString(),expiresAtMs:Date.now()+3600000,
    createdAt:stamp,stockJournal:'|seven:H|'};
  const order = {id:'seven',foodId:'food',donorId:'donor',organizationId:'org',organization:'org',
    quantity:7,qtyRequested:7,status:'assigned',transport:'Nhờ giao hộ',driver:'driver',volunteerId:'driver',
    time:'19:30',received:0,createdAt:stamp};
  await db.ref().set({users,demo:{foods:{food},orders:{seven:order}}});
  let checks = 0;
  async function write(uid, path, data, allowed=true, method='PATCH') {
    const response = await fetch(`http://127.0.0.1:9000/${path}.json?ns=${projectId}-default-rtdb&auth=${tokens[uid]}`, {
      method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)});
    assert.equal(response.status, allowed ? 200 : 401, `${uid} ${path}: ${await response.text()}`);
    checks++;
  }
  const pickup = {status:'pickedUp',qtyRequested:7,qtyPickedUp:7,updatedAt:stamp};
  await write('other','demo/orders/seven',pickup,false);
  await write('driver','demo/orders/seven',{deliveryConfirmed:true},false);
  await write('driver','demo/orders/seven',{...pickup,qtyPickedUp:8},false);
  await write('driver','demo/orders/seven',pickup);
  await write('org','demo/orders/seven',{receiptState:'pending',inventoryAdded:false,qtyReceived:7,
    received:7,hasDiscrepancy:false,discrepancyNote:'',receiptRequestedAt:stamp,updatedAt:stamp},false);
  await write('driver','demo/orders/seven',{deliveryConfirmed:true,updatedAt:stamp});
  const additional = {...order,id:'two',quantity:2,qtyRequested:2,status:'awaiting',driver:'',volunteerId:null};
  await write('org','demo/orders/two',additional,true,'PUT');
  await write('org','demo/orders/three',{...additional,id:'three',quantity:3,qtyRequested:3},false,'PUT');
  await write('org','demo/orders/seven',{receiptState:'pending',inventoryAdded:false,qtyReceived:7,
    received:7,hasDiscrepancy:false,discrepancyNote:'',receiptRequestedAt:stamp,updatedAt:stamp});
  const inventory = {received:7,distributed:0,receiptJournal:'|seven:I|',lastReceivedOrderId:'seven'};
  await write('org','demo/inventory/org',inventory,true,'PUT');
  await write('org','demo/inventory/org',{...inventory,received:14},false,'PUT');
  await write('org','demo/orders/seven',{status:'completed',receiptState:'completed',inventoryAdded:true,completedAt:stamp,updatedAt:stamp});
  await write('driver','demo/orders/seven',{status:'assigned'},false);
  await db.ref('demo/foods/food/expiresAtMs').set(Date.now()-1000);
  await write('org','demo/orders/expired',{...additional,id:'expired'},false,'PUT');
  console.log(`Passed ${checks} Database Rules checks: demo handover, remaining two, optional photo and inventory idempotency.`);
}
main().then(() => process.exit(0)).catch(error => { console.error(error); process.exit(1); });
