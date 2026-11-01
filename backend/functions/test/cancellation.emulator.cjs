// Local demo namespace only. Never deploys rules or accesses production data.
const {test, before, after, beforeEach} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {initializeTestEnvironment, assertFails, assertSucceeds} = require('@firebase/rules-unit-testing');
let env;
const projectId = 'demo-sharemeal-b';
const food = () => ({id:'food', donorId:'donor', donor:'Donor', name:'Demo meal',
  quantity:20, reserved:0, category:'Cơm', storage:'Còn nóng', address:'Demo',
  pickup:'19:00', expiresAt:new Date(Date.now()+86400000).toISOString(),
  expiresAtMs:Date.now()+86400000, status:'open', createdAt:'2026-11-01', safe:true});
const order = (id='order', status='awaiting') => ({id, foodId:'food', donorId:'donor',
  organizationId:'charity', organization:'Charity', quantity:10, status,
  transport:'Nhờ giao hộ', driver:'', time:'19:00', received:0, createdAt:'2026-11-01'});
const db = uid => env.authenticatedContext(uid, {email_verified:true}).database();
const read = async (d,p) => (await d.ref(p).get()).val();
const tx = (d,p,fn) => d.ref(p).transaction(fn, undefined, false);
async function seed(o=order(), f=food()) {
  await env.withSecurityRulesDisabled(async c => {
    const users = {};
    for (const [uid,role] of Object.entries({donor:'donor',charity:'charity',volunteer:'volunteer',admin:'admin',stranger:'charity'})) {
      users[uid] = {uid, role, email:`${uid}@example.test`, name:uid,
        verificationStatus:'approved', disabled:false, createdAt:'2026-11-01'};
    }
    await c.database().ref().set({users, config:{adminUid:'admin'},
      demo:{foods:{food:f},orders:{[o.id]:o}},
      handover:{[o.id]:{pickup:{pin:'123456', creatorId:'donor', expiresAt:Date.now()+600000, attempts:0, used:false}}}});
  });
}
function cancelValue(o, uid) {
  if (!o) return o;
  if (o.status==='cancelled') return;
  const n={...o,status:'cancelled',cancelledBy:uid,cancelReason:'Demo cancellation',
    cancelledAt:'2026-11-01',cancelHadStock:['accepted','assigned'].includes(o.status),
    stockState:'releasePending',stockReleased:false,driver:''};
  if (o.volunteerId) n.cancelledVolunteerId=o.volunteerId;
  delete n.volunteerId;
  return n;
}
async function release(d,o) {
  await tx(d,'demo/foods/food',f=>{
    if (!f) return f;
    const j=f.stockJournal||'', r=`|${o.id}:R|`;
    if (j.includes(r)) return;
    const amount=j.includes(`|${o.id}:H|`)||o.cancelHadStock ? o.quantity : 0;
    return {...f,reserved:f.reserved-amount,stockJournal:j+r,lastStockOrderId:o.id};
  });
  await d.ref(`demo/orders/${o.id}`).update({stockState:'released',stockReleased:true});
}
async function cancel(d, uid, id='order') {
  await tx(d,`demo/orders/${id}`,o=>cancelValue(o,uid));
  await release(d,await read(d,`demo/orders/${id}`));
}
async function reserve(d, id='order') {
  await d.ref(`demo/orders/${id}`).update({stockState:'reserving'});
  await tx(d,'demo/foods/food',f=>{
    if (!f) return f;
    const j=f.stockJournal||'';
    if (j.includes(`|${id}:H|`)) return;
    return {...f,reserved:f.reserved+10,stockJournal:j+`|${id}:H|`,lastStockOrderId:id};
  });
  await d.ref(`demo/orders/${id}`).update({status:'accepted',stockState:'held',stockReserved:true});
}
before(async()=>{
  env=await initializeTestEnvironment({projectId,database:{host:'127.0.0.1',port:9000,
    rules:fs.readFileSync(path.join(__dirname,'../../firebase/database/database.rules.json'),'utf8')}});
});
after(async()=>{await env?.clearDatabase();await env?.cleanup();});
beforeEach(()=>seed());

test('reserve 10 of 20, cancel, retry: availability returns to 20 once',async()=>{
  const donor=db('donor'), charity=db('charity');
  await reserve(donor);
  assert.equal((await read(donor,'demo/foods/food')).reserved,10);
  await cancel(charity,'charity');
  await cancel(charity,'charity');
  const f=await read(donor,'demo/foods/food');
  assert.equal(f.reserved,0);
  assert.equal(f.stockJournal,'|order:H||order:R|');
  assert.equal((await read(charity,'demo/orders/order')).stockReleased,true);
});
test('parallel donor and charity cancellation releases legacy reservation once and detaches courier',async()=>{
  await seed({...order('order','assigned'),volunteerId:'volunteer',driver:'Courier'}, {...food(),reserved:10});
  await Promise.all([cancel(db('donor'),'donor'),cancel(db('charity'),'charity')]);
  const o=await read(db('admin'),'demo/orders/order');
  assert.equal(o.volunteerId,undefined);assert.equal(o.driver,'');
  assert.equal(o.cancelledVolunteerId,'volunteer');
  assert.equal((await read(db('donor'),'demo/foods/food')).reserved,0);
  await assertFails(db('volunteer').ref('demo/orders/order').get());
  await assertFails(db('volunteer').ref('handover/order/pickup').update({used:true}));
  await assertFails(db('donor').ref('handover/order/pickup').update({pin:'654321'}));
});
test('awaiting cancellation releases zero, with required author/reason/time',async()=>{
  await assertFails(db('charity').ref('demo/orders/order/status').set('cancelled'));
  await assertFails(db('stranger').ref('demo/orders/order').set(cancelValue(order(),'stranger')));
  await cancel(db('admin'),'admin');
  const o=await read(db('admin'),'demo/orders/order');
  assert.equal(o.cancelledBy,'admin');assert.ok(o.cancelReason);assert.ok(o.cancelledAt);
  assert.equal(o.cancelHadStock,false);
  assert.equal((await read(db('admin'),'demo/foods/food')).reserved,0);
});
test('all roles including admin cannot cancel pickedUp/completed; support remains possible',async()=>{
  for (const status of ['pickedUp','completed']) {
    const o={...order('order',status),volunteerId:'volunteer',driver:'Courier'};
    await seed(o,{...food(),reserved:10});
    for (const uid of ['donor','charity','volunteer','admin']) {
      await assertFails(db(uid).ref('demo/orders/order').set(cancelValue(o,uid)));
    }
  }
  await assertSucceeds(db('admin').ref('demo/tickets/support').set({id:'support',uid:'admin',
    orderId:'order', detail:'Investigate stuck handover; do not return food to public stock',
    status:'open',createdAt:'2026-11-01'}));
});
test('recovery after cancellation intent and after stock commit cannot double-release',async()=>{
  await seed(order('order','accepted'),{...food(),reserved:10});
  const d=db('charity');
  await tx(d,'demo/orders/order',o=>cancelValue(o,'charity'));
  const pending=await read(d,'demo/orders/order');
  await release(d,pending);
  // Recreate the exact crash window with local fixture authority only.
  await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/order').update({stockState:'releasePending',stockReleased:false}));
  await release(d,pending);
  assert.equal((await read(d,'demo/foods/food')).reserved,0);
  await assertFails(d.ref('demo/foods/food/stockJournal').remove());
  await assertFails(d.ref('demo/foods/food').update({reserved:10,stockJournal:''}));
  await assertFails(d.ref('demo/orders/order/stockReleased').set(false));
  await assertFails(d.ref('demo/orders/order/cancelReason').set('Changed history'));
});
test('reserve intent cancelled before/after stock commit is recovered without overselling',async()=>{
  const donor=db('donor'), charity=db('charity');
  await donor.ref('demo/orders/order/stockState').set('reserving');
  await cancel(charity,'charity');
  await assertFails(donor.ref('demo/foods/food').update({reserved:10,stockJournal:'|order:R||order:H|',lastStockOrderId:'order'}));
  await seed();
  await donor.ref('demo/orders/order/stockState').set('reserving');
  await donor.ref('demo/foods/food').update({reserved:10,stockJournal:'|order:H|',lastStockOrderId:'order'});
  await cancel(charity,'charity');
  await assertFails(donor.ref('demo/orders/order').update({status:'accepted',stockState:'held',stockReserved:true}));
  assert.equal((await read(donor,'demo/foods/food')).reserved,0);
});
test('only donor may start/rollback a stock intent; release flag needs a committed R',async()=>{
  const donor=db('donor'), charity=db('charity');
  await assertFails(charity.ref('demo/orders/order/stockState').set('reserving'));
  await donor.ref('demo/orders/order/stockState').set('reserving');
  await assertFails(charity.ref('demo/orders/order/stockState').set('idle'));
  await assertSucceeds(donor.ref('demo/orders/order/stockState').set('idle'));
  await tx(charity,'demo/orders/order',o=>cancelValue(o,'charity'));
  await assertFails(charity.ref('demo/orders/order').update({stockState:'released',stockReleased:true}));
  await release(charity,await read(charity,'demo/orders/order'));
});
test('simultaneous requests cannot reserve more than the total',async()=>{
  await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/other').set(order('other')));
  const d=db('donor');
  await Promise.all([reserve(d,'order'),reserve(db('donor'),'other')]);
  assert.equal((await read(d,'demo/foods/food')).reserved,20);
  await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/third').set(order('third')));
  await assert.rejects(reserve(d,'third'));
  assert.equal((await read(d,'demo/foods/food')).reserved,20);
});
