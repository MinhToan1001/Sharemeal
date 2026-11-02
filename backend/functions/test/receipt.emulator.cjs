// Only localhost demo namespace. Never production.
const {test,before,after,beforeEach}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {initializeTestEnvironment,assertFails}=require('@firebase/rules-unit-testing');
let env;
const stamp='2026-11-02T00:00:00.000Z';
const photo='https://res.cloudinary.com/toanvip/image/upload/demo-fixture.png';
const db=uid=>env.authenticatedContext(uid,{email_verified:true}).database();
const read=async(d,p)=>(await d.ref(p).get()).val();
const order=(id='o')=>({id,foodId:'f',donorId:'donor',organizationId:'org',organization:'DEMO',quantity:10,status:'pickedUp',transport:'Tự đến lấy',received:0,driver:'',time:'19:00',createdAt:stamp});
async function seed(){await env.withSecurityRulesDisabled(async c=>{
 const users={};for(const [uid,role]of Object.entries({donor:'donor',org:'charity',courier:'volunteer',admin:'admin',other:'charity'}))users[uid]={uid,role,email:uid+'@example.invalid',name:uid,verificationStatus:'approved',disabled:false,createdAt:stamp};
 await c.database().ref().set({users,config:{adminUid:'admin'},demo:{orders:{o:order()},foods:{f:{id:'f',donorId:'donor',donor:'DEMO',name:'DEMO',quantity:20,reserved:10,category:'Rau',storage:'Mát',address:'DEMO',pickup:'Trong 2 giờ',expiresAt:new Date(Date.now()+86400000).toISOString(),expiresAtMs:Date.now()+86400000,status:'open',createdAt:stamp,safe:true}}}});
});}
function intent(o,qty=9,note='Thiếu một suất',extra={}){const picked=o.qtyPickedUp??o.quantity,mismatch=qty!==o.quantity||qty!==picked;
 return {...o,qtyRequested:o.quantity,qtyPickedUp:picked,qtyReceived:qty,received:qty,hasDiscrepancy:mismatch,discrepancyNote:note,...(mismatch?{discrepancyTicketId:'receipt_'+o.id}:{}),receiptState:'pending',inventoryAdded:false,receiptRequestedAt:stamp,receiptPhoto:photo,...extra};}
async function begin(d,id='o',qty=9,note='Thiếu một suất'){const o=await read(d,'demo/orders/'+id);await d.ref('demo/orders/'+id).set(intent(o,qty,note));return read(d,'demo/orders/'+id);}
async function ticket(d,o){if(!o.hasDiscrepancy)return;const id='receipt_'+o.id;await d.ref('demo/tickets/'+id).transaction(v=>v?undefined:({id,uid:'org',orderId:o.id,type:'quantityDiscrepancy',reason:'Chênh lệch',detail:o.discrepancyNote,status:'open',createdAt:stamp}),undefined,false);}
async function credit(d,o){await d.ref('demo/inventory/org').transaction(v=>{v=v||{};const j=v.receiptJournal||'',m='|'+o.id+':I|';if(j.includes(m))return;return {...v,received:(v.received||0)+o.qtyReceived,distributed:v.distributed||0,receiptJournal:j+m,lastReceivedOrderId:o.id};},undefined,false);}
async function finish(d,o){await d.ref('demo/orders/'+o.id).update({status:'completed',receiptState:'completed',inventoryAdded:true,completedAt:stamp});}
before(async()=>{env=await initializeTestEnvironment({projectId:'demo-sharemeal-b',database:{host:'127.0.0.1',port:9000,rules:fs.readFileSync(path.join(__dirname,'../../firebase/database/database.rules.json'),'utf8')}});});
after(async()=>{await env?.clearDatabase();await env?.cleanup();});beforeEach(seed);
test('legacy 10 pickup, receive 9: note and deterministic ticket required; inventory +9 once',async()=>{
 const d=db('org'),o=await read(d,'demo/orders/o');
 await assertFails(d.ref('demo/orders/o').set(intent(o,9,'')));
 await assertFails(d.ref('demo/orders/o').set(intent(o,9,'   ')));
 const pending=await begin(d);await assertFails(credit(d,pending));await assertFails(finish(d,pending));
 await ticket(d,pending);await credit(d,pending);await credit(d,pending);await finish(d,pending);
 assert.equal((await read(d,'demo/inventory/org')).received,9);assert.equal((await read(d,'demo/foods/f')).reserved,10);
 await assertFails(d.ref('demo/inventory/org/received').set(18));
 await assertFails(d.ref('demo/orders/o').update({qtyReceived:10,received:10}));
});
test('intent and credit crash gaps recover once; journal cannot be deleted or forged',async()=>{
 const d=db('org'),o=await begin(d,'o',10,'');await credit(d,o);
 await assertFails(d.ref('demo/inventory/org/receiptJournal').remove());
 await assertFails(d.ref('demo/inventory/org').update({received:20,receiptJournal:'|o:I||fake:I|',lastReceivedOrderId:'fake'}));
 await credit(db('org'),o);await finish(d,o);assert.equal((await read(d,'demo/inventory/org')).received,10);
});
test('two devices completing distinct orders preserve both receipt credits',async()=>{
 await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/two').set(order('two')));
 const a=db('org'),b=db('org'),o=await begin(a,'o',10,''),p=await begin(b,'two',10,'');
 await Promise.all([credit(a,o),credit(b,p)]);await Promise.all([finish(a,o),finish(b,p)]);
 assert.equal((await read(a,'demo/inventory/org')).received,20);
});
test('pickup actual quantity is locked to successful PIN for self and courier',async()=>{
 for(const self of [true,false]){
  await seed();const o={...order(),status:self?'accepted':'assigned',...(self?{}:{transport:'Nhờ giao hộ',volunteerId:'courier',driver:'DEMO'})};
  await env.withSecurityRulesDisabled(async c=>{await c.database().ref('demo/orders/o').set(o);await c.database().ref('handover/o/pickup').set({pin:'123456',creatorId:'donor',expiresAt:Date.now()+600000,attempts:0,used:false});});
  const uid=self?'org':'courier',d=db(uid);
  await d.ref('handover/o/pickup').update({enteredPin:'123456',attempts:1,used:true,verifierId:uid,qtyPickedUp:8});
  await assertFails(d.ref('demo/orders/o').update({status:'pickedUp',qtyRequested:10,qtyPickedUp:10}));
  await d.ref('demo/orders/o').update({status:'pickedUp',qtyRequested:10,qtyPickedUp:8});
  assert.equal((await read(d,'handover/o/pickup')).qtyPickedUp,8);
  await assertFails(d.ref('demo/orders/o/qtyPickedUp').set(9));
 }
});
test('zero actual receipt opens support and credits zero; no public stock return',async()=>{
 const d=db('org'),o=await begin(d,'o',0,'Không nhận được thực phẩm');await ticket(d,o);await credit(d,o);await finish(d,o);
 assert.equal((await read(d,'demo/inventory/org')).received,0);assert.equal((await read(db('donor'),'demo/foods/f')).reserved,10);
});
test('non recipient and raw completion bypass are denied',async()=>{
 for(const uid of ['donor','courier','admin','other'])await assertFails(db(uid).ref('demo/orders/o').set(intent(order(),10,'')));
 await assertFails(db('org').ref('demo/orders/o').update({status:'completed',received:10}));
 const d=db('org'),o=await begin(d,'o',10,'');await assertFails(d.ref('demo/orders/o').update({qtyReceived:9,received:9,discrepancyNote:'changed'}));
 await credit(d,o);await finish(d,o);
});
test('delivery requires verified receipt PIN before intent',async()=>{
 await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/o').update({transport:'Nhờ giao hộ',volunteerId:'courier'}));
 const d=db('org'),o=await read(d,'demo/orders/o');await assertFails(d.ref('demo/orders/o').set(intent(o,10,'')));
 await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/o').update({deliveryConfirmed:true}));
 const p=await begin(d,'o',10,'');await credit(d,p);await finish(d,p);
});
test('F: missing/non-image evidence rejected in both branches, cannot erase saved receipt image',async()=>{
 const d=db('org');
 for(const transport of ['Tự đến lấy','Nhờ giao hộ']){
  await seed();await env.withSecurityRulesDisabled(c=>c.database().ref('demo/orders/o').update({transport,deliveryConfirmed:true}));
  const o=await read(d,'demo/orders/o');
  for(const bad of [null,'','https://example.com/a.png','https://res.cloudinary.com/toanvip/image/upload/a.pdf']){
   await assertFails(d.ref('demo/orders/o').set(intent(o,10,'',{receiptPhoto:bad})));
  }
 }
 const o=await begin(d,'o',10,'');await credit(d,o);await finish(d,o);
 await assertFails(d.ref('demo/orders/o/receiptPhoto').remove());
});
test('F: legacy pending E receipt can attach evidence without changing quantities or crediting twice',async()=>{
 const pending=intent(order(),9,'Thiếu một suất');delete pending.receiptPhoto;
 await env.withSecurityRulesDisabled(async c=>{
  await c.database().ref('demo/orders/o').set(pending);
  await c.database().ref('demo/inventory/org').set({received:9,distributed:0,receiptJournal:'|o:I|',lastReceivedOrderId:'o'});
 });
 const d=db('org');await assertFails(finish(d,pending));
 await assertFails(d.ref('demo/orders/o').update({receiptPhoto:photo,received:10,qtyReceived:10}));
 await d.ref('demo/orders/o/receiptPhoto').set(photo);
 const fixed=await read(d,'demo/orders/o');await ticket(d,fixed);await credit(d,fixed);await finish(d,fixed);
 assert.equal((await read(d,'demo/inventory/org')).received,9);
});
