'use strict';
// Local fixture authority for the native Android tests. No Cloudinary calls.
const http = require('node:http');
const sdk = require('node:module').createRequire(require('node:path').join(__dirname,'package.json'));
const {initializeApp} = sdk('firebase-admin/app');
const {getAuth} = sdk('firebase-admin/auth');
const {getDatabase} = sdk('firebase-admin/database');
if (process.env.FIREBASE_AUTH_EMULATOR_HOST !== '127.0.0.1:9099' ||
    process.env.FIREBASE_DATABASE_EMULATOR_HOST !== '127.0.0.1:9000') {
  throw new Error('Only local Firebase Emulators are allowed');
}
const projectId='demo-sharemeal-b';
const app=initializeApp({projectId,databaseURL:`https://${projectId}-default-rtdb.firebaseio.com`});
const auth=getAuth(app), db=getDatabase(app);
const server=http.createServer(async(req,res)=>{
  try {
    let body='';for await(const chunk of req)body+=chunk;
    const p=body?JSON.parse(body):{};
    let result={};
    if(req.method==='POST'&&req.url==='/seed') {
      const users={};
      for(const [uid,role] of Object.entries({donor:'donor',charity:'charity',volunteer:'volunteer',admin:'admin',other:'charity'})) {
        try {await auth.getUser(uid);} catch {await auth.createUser({uid,email:`${uid}@example.test`,password:'Local-demo-only-123!',emailVerified:true});}
        users[uid]={uid,role,email:`${uid}@example.test`,name:uid,verificationStatus:'approved',disabled:false,createdAt:'2026-11-01'};
      }
      const food={id:'food',donorId:'donor',donor:'donor',name:'Món kiểm thử',quantity:20,
        reserved:p.reserved??0,category:'Cơm',storage:'Còn nóng',address:'Địa chỉ demo',
        pickup:'19:00',expiresAt:new Date(Date.now()+86400000).toISOString(),expiresAtMs:Date.now()+86400000,
        status:'open',createdAt:'2026-11-01',safe:true,...p.food};
      await db.ref().set({users,config:{adminUid:'admin'},demo:{foods:{food},orders:p.orders||{},...p.demo}});
    } else if(req.method==='POST'&&req.url==='/patch') {
      await db.ref().update(p);
    } else if(req.method==='GET'&&req.url==='/state') {
      result=(await db.ref().get()).val()||{};
    } else if(req.method==='POST'&&req.url==='/cleanup') {
      await db.ref().set(null);
      await fetch(`http://127.0.0.1:9099/emulator/v1/projects/${projectId}/accounts`,{method:'DELETE'});
    } else {res.statusCode=404;result={error:'Not found'};}
    res.setHeader('Content-Type','application/json');res.end(JSON.stringify(result));
  }catch(e){res.statusCode=500;res.end(JSON.stringify({error:e.message}));}
});
server.listen(8766,'127.0.0.1',()=>console.log('Group B demo-only fixture bridge ready: 8766'));
