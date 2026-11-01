'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const net = require('node:net');
const {randomUUID} = require('node:crypto');
const {initializeApp, deleteApp} = require('firebase-admin/app');
const {getDatabase} = require('firebase-admin/database');
const {getAuth} = require('firebase-admin/auth');
test('HTTP + Auth + RTDB: email OTP, admin approval, competing reservations and delivery workflow', {timeout:120000}, async () => {
  assert.ok(process.env.FIREBASE_DATABASE_EMULATOR_HOST && process.env.FIREBASE_AUTH_EMULATOR_HOST, 'Run through firebase emulators:exec only.');
  const messages = [];
  // Local SMTP test sink; never used by production functions.
  const smtp = net.createServer(socket => {
    socket.setEncoding('utf8'); socket.write('220 localhost ESMTP\r\n');
    let buffer = '', data = false;
    socket.on('data', chunk => {
      buffer += chunk;
      while(buffer.includes('\r\n')) {
        const end = buffer.indexOf('\r\n'), line = buffer.slice(0,end); buffer = buffer.slice(end+2);
        if(data) { if(line === '.') { data = false; socket.write('250 queued\r\n'); } else messages.push(line); }
        else if(/^EHLO|HELO/.test(line)) socket.write('250-localhost\r\n250 8BITMIME\r\n');
        else if(/^DATA/.test(line)) { data = true; socket.write('354 End with dot\r\n'); }
        else if(/^QUIT/.test(line)) { socket.end('221 bye\r\n'); }
        else socket.write('250 OK\r\n');
      }
    });
  });
  await new Promise(resolve => smtp.listen(2525,'127.0.0.1',resolve));
  const app = initializeApp({projectId:'demo-sharemeal', databaseURL:'https://demo-sharemeal-default-rtdb.firebaseio.com'});
  const db = getDatabase(app), adminAuth = getAuth(app);
  const call = async (token, command, payload = {}, requestId = randomUUID()) => {
    const response = await fetch('http://127.0.0.1:5001/demo-sharemeal/us-central1/api', {method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},body:JSON.stringify({command,payload,requestId})});
    return {status:response.status, ...await response.json()};
  };
  const signup = async (email, verified = true) => {
    const response = await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-key`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:'Password123!',returnSecureToken:true})});
    const account = await response.json(); assert.ok(account.idToken, JSON.stringify(account));
    if(verified) await adminAuth.updateUser(account.localId, {emailVerified:true});
    return {uid:account.localId, token:account.idToken};
  };
  try {
    await db.ref().set(null);
    const accounts = {};
    for(const role of ['admin','donor','org','org2','volunteer']) {
      const a = accounts[role] = await signup(`${role}@sharemeal.test`, role !== 'donor');
      const registered = await call(a.token,'registerProfile',{name:role});
      assert.equal(registered.status,200,JSON.stringify(registered));
      assert.equal(registered.view.profile?.uid,a.uid,'registration returns the persisted profile');
    }
    const persisted = (await db.ref('users').get()).val() || {};
    assert.equal(Object.keys(persisted).length,5,`All registered profiles survive subsequent transactions: ${JSON.stringify(persisted)}`);
    // OTP is delivered through the SMTP sink, then consumed by Firebase Auth.
    let otpResponse = await call(accounts.donor.token,'sendOtp');
    assert.equal(otpResponse.status,200,JSON.stringify(otpResponse));
    assert.equal((await call(accounts.donor.token,'sendOtp')).status,429);
    const wire = messages.join('\n').replace(/=\n/g,'');
    const otp = /(?:l=C3=A0|là) (\d{6})/.exec(wire)?.[1] || /\b(\d{6})\b/.exec(wire)?.[1];
    assert.ok(otp,'SMTP message contains a numeric OTP');
    assert.equal((await call(accounts.donor.token,'verifyOtp',{code:'000000'})).status,400);
    assert.equal((await db.ref(`otp/${accounts.donor.uid}/attempts`).get()).val(),1);
    assert.equal((await call(accounts.donor.token,'verifyOtp',{code:otp})).status,200);
    assert.equal((await adminAuth.getUser(accounts.donor.uid)).emailVerified,true);
    const signedIn = await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=fake-key`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'donor@sharemeal.test',password:'Password123!',returnSecureToken:true})});
    accounts.donor.token = (await signedIn.json()).idToken;
    const imagePath = `food/${accounts.donor.uid}/integration.jpg`;
    const boundary = 'sharemeal-integration-boundary';
    const uploadBody = Buffer.concat([Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=utf-8\r\n\r\n${JSON.stringify({name:imagePath,contentType:'image/jpeg'})}\r\n--${boundary}\r\nContent-Type: image/jpeg\r\n\r\n`),Buffer.from([255,216,255,217]),Buffer.from(`\r\n--${boundary}--`)]);
    const upload = await fetch(`http://127.0.0.1:9199/v0/b/demo-sharemeal.firebasestorage.app/o?name=${encodeURIComponent(imagePath)}`, {method:'POST',headers:{Authorization:`Firebase ${accounts.donor.token}`,'X-Goog-Upload-Protocol':'multipart','Content-Type':`multipart/related; boundary=${boundary}`},body:uploadBody});
    assert.equal(upload.status,200,await upload.text());
    assert.equal((await call(accounts.donor.token,'verifyOtp',{code:otp})).status,400);
    await db.ref('config/adminUid').set(accounts.admin.uid);
    await db.ref(`users/${accounts.admin.uid}`).update({role:'admin',verificationStatus:'approved'});
    for(const role of ['donor','org','org2','volunteer']) {
      const a = accounts[role], actualRole = role.startsWith('org') ? 'charity' : role;
      const selected = await call(a.token,'selectRole',{role:actualRole});
      assert.equal(selected.status,200,`${role}: ${JSON.stringify(selected)}`);
      const submitted = await call(a.token,'submitApplication',{role:actualRole,details:'Giấy tờ kiểm thử emulator',documents:[`documents/${a.uid}/identity.pdf`],consent:true});
      assert.equal(submitted.status,200,JSON.stringify(submitted));
      const approved = await call(accounts.admin.token,'reviewApplication',{id:submitted.result.id,status:'approved',note:'Đã kiểm tra'});
      assert.equal(approved.status,200,JSON.stringify(approved));
    }
    const food = await call(accounts.donor.token,'publishFood',{name:'Cơm gà',quantity:10,category:'Cơm',storage:'Giữ nóng',address:'Địa chỉ emulator',pickup:'18:00',allergens:[],expiresAt:new Date(Date.now()+3600000).toISOString(),safe:true});
    assert.equal(food.status,200,JSON.stringify(food)); const foodId = food.result.id;
    assert.ok(!(await call(accounts.org.token,'refresh')).view.foods);
    assert.equal((await call(accounts.admin.token,'reviewFood',{id:foodId,status:'open',note:'Đã kiểm tra'})).status,200);
    const orderIds = [];
    for(const org of ['org','org2']) {
      const order = await call(accounts[org].token,'requestFood',{foodId,quantity:6,transport:'Nhờ giao hộ',time:'18:30'});
      assert.equal(order.status,200,JSON.stringify(order)); orderIds.push(order.result.id);
    }
    // Two actual simultaneous HTTP transactions; exactly one reservation wins.
    const results = await Promise.all(orderIds.map(id => call(accounts.donor.token,'transitionOrder',{id,status:'accepted'})));
    assert.deepEqual(results.map(r=>r.status).sort(),[200,400]);
    const winner = results.findIndex(r=>r.status===200), orderId = orderIds[winner], org = accounts[winner===0?'org':'org2'];
    assert.equal((await db.ref(`state/foods/${foodId}/quantity`).get()).val(),4);
    const claimed = await call(accounts.volunteer.token,'transitionOrder',{id:orderId,status:'assigned'}); assert.equal(claimed.status,200,JSON.stringify(claimed));
    const pickup = await call(accounts.donor.token,'renewHandover',{id:orderId,stage:'pickup'});
    assert.equal((await call(accounts.volunteer.token,'verifyHandover',{id:orderId,stage:'pickup',pin:pickup.result.pin})).status,200);
    assert.equal((await call(accounts.volunteer.token,'savePickupPhoto',{id:orderId,path:`documents/${accounts.volunteer.uid}/pickup.jpg`})).status,200);
    const receipt = await call(org.token,'renewHandover',{id:orderId,stage:'receipt'});
    assert.equal((await call(accounts.volunteer.token,'verifyHandover',{id:orderId,stage:'receipt',pin:receipt.result.pin})).status,200);
    assert.equal((await call(org.token,'transitionOrder',{id:orderId,status:'completed',received:6})).status,200);
    assert.equal((await db.ref(`state/inventory/${org.uid}/received`).get()).val(),6);
    assert.equal((await call(org.token,'distribute',{quantity:4})).status,200);
    assert.equal((await call(org.token,'distribute',{quantity:3})).status,400);
    assert.equal((await call(org.token,'readAll',{},'repeat-empty-result')).status,200);
    assert.equal((await call(org.token,'readAll',{},'repeat-empty-result')).status,200);
    assert.equal((await call(accounts.volunteer.token,'reviewFood',{id:foodId,status:'open',note:'hack'})).status,403);
  } finally { smtp.close(); await deleteApp(app); }
});
