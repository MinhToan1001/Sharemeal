'use strict';
// Temporary synthetic fixtures only. Existing admin/config/users are untouched.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {randomBytes}=require('node:crypto');
const sdk=require('node:module').createRequire(path.join(__dirname,'../functions/package.json'));
const cli=path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib');
const cliAuth=require(path.join(cli,'auth.js'));
const {initializeApp}=sdk('firebase-admin/app');
const {getAuth}=sdk('firebase-admin/auth');
const {getDatabase}=sdk('firebase-admin/database');
if(process.env.FIREBASE_AUTH_EMULATOR_HOST||process.env.FIREBASE_DATABASE_EMULATOR_HOST) throw Error('Run separately from emulator bridge');
const manifestPath=path.join(__dirname,'../.private/production-android-fixtures.json');
const projectId='sharemeal-e17c9';
const account=cliAuth.getProjectDefaultAccount(path.resolve(__dirname,'..'));
if(!account?.tokens?.refresh_token) throw Error('Firebase CLI login required');
const credential={getAccessToken:async()=>{
  const token=await cliAuth.getAccessToken(account.tokens.refresh_token,['https://www.googleapis.com/auth/cloud-platform','https://www.googleapis.com/auth/firebase','https://www.googleapis.com/auth/userinfo.email']);
  return {access_token:token.access_token,expires_in:Math.max(60,Math.floor((token.expires_at-Date.now())/1000))};
}};
const app=initializeApp({projectId,databaseURL:`https://${projectId}-default-rtdb.firebaseio.com`,credential});
const auth=getAuth(app),db=getDatabase(app);
let manifest;
const save=()=>fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2));
async function cleanup(){
  if(!manifest&&fs.existsSync(manifestPath)) manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  if(!manifest)return;
  if(!/^sm-e2e-\d+$/.test(manifest.prefix))throw Error('Unexpected fixture prefix');
  const ids=new Set(manifest.users.map(u=>u.uid));
  for(const uid of ids)if(!uid.startsWith(manifest.prefix+'-'))throw Error('Unexpected fixture UID');
  const changes={};const orders=new Set();
  for(const uid of ids){
    const foods=(await db.ref('demo/foods').orderByChild('donorId').equalTo(uid).get()).val()||{};
    for(const id of Object.keys(foods)){changes[`demo/foods/${id}`]=null;changes[`foodAccess/${id}`]=null;}
    const ownOrders=(await db.ref('demo/orders').orderByChild('donorId').equalTo(uid).get()).val()||{};
    Object.keys(ownOrders).forEach(id=>orders.add(id));
    for(const table of ['applications','needs','notifications','shifts','distributions','tickets']){
      const values=(await db.ref(`demo/${table}`).orderByChild('uid').equalTo(uid).get()).val()||{};
      for(const id of Object.keys(values)) changes[`demo/${table}/${id}`]=null;
    }
    changes[`demo/inventory/${uid}`]=null;changes[`users/${uid}`]=null;
  }
  for(const orderId of orders){
    changes[`demo/orders/${orderId}`]=null;changes[`handover/${orderId}`]=null;
    for(const table of ['messages','reviews']){
      const values=(await db.ref(`demo/${table}`).orderByChild('orderId').equalTo(orderId).get()).val()||{};
      for(const id of Object.keys(values))changes[`demo/${table}/${id}`]=null;
    }
  }
  if(Object.keys(changes).length)await db.ref().update(changes);
  for(const uid of ids){try{await auth.deleteUser(uid);}catch(e){if(e.code!=='auth/user-not-found')throw e;}}
  for(const uid of ids){
    if((await db.ref(`users/${uid}`).get()).exists())throw Error('Fixture profile cleanup incomplete');
    if((await db.ref('demo/foods').orderByChild('donorId').equalTo(uid).get()).exists())throw Error('Fixture food cleanup incomplete');
    try{await auth.getUser(uid);throw Error('Fixture auth cleanup incomplete');}catch(e){if(e.code!=='auth/user-not-found')throw e;}
  }
  manifest.cleaned=true;
  manifest.users=manifest.users.map(({uid,role})=>({uid,role}));
  save();
  console.log(JSON.stringify({cleaned:true,testUsers:ids.size,removedPaths:Object.keys(changes).length}));
}
async function start(){
  if(process.argv.includes('--cleanup')){await cleanup();await app.delete();return;}
  if(fs.existsSync(manifestPath)){
    const old=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
    if(!old.cleaned && !process.argv.includes('--resume'))throw Error('Previous fixtures require --cleanup first');
    if(!old.cleaned) manifest=old;
  }
  if(!manifest) {
  const run=Date.now();manifest={prefix:`sm-e2e-${run}`,users:[],foods:[],cleaned:false};save();
  for(const role of ['donor','charity']){
    const user={uid:`${manifest.prefix}-${role}`,email:`${manifest.prefix}-${role}@example.invalid`,password:randomBytes(18).toString('base64url'),role};
    manifest.users.push(user);save();
    await auth.createUser({uid:user.uid,email:user.email,password:user.password,emailVerified:true,displayName:`DEMO ${role}`});
    await db.ref(`users/${user.uid}`).set({uid:user.uid,email:user.email,name:`DEMO Android ${role}`,role,verificationStatus:'approved',disabled:false,createdAt:new Date().toISOString()});
  }
  }
  const server=http.createServer(async(req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
      let raw='';for await(const chunk of req)raw+=chunk;const p=raw?JSON.parse(raw):{};
      const url=new URL(req.url,'http://localhost');let result={};
      if(req.method==='GET'&&url.pathname==='/fixtures'){
        const media=JSON.parse(fs.readFileSync(path.join(__dirname,'../.private/android-created-media.json'),'utf8'));
        result={mode:'production-synthetic-only',users:manifest.users,photo:media[media.length-1],run:manifest.prefix};
      }else if(req.method==='POST'&&url.pathname==='/approve-test-food'){
        const food=(await db.ref(`demo/foods/${p.id}`).get()).val();
        if(!food||food.donorId!==manifest.users.find(u=>u.role==='donor').uid||!food.name.startsWith('DEMO'))throw Error('Only owned synthetic foods allowed');
        if(!manifest.foods.includes(p.id)){manifest.foods.push(p.id);save();}
        await db.ref(`demo/foods/${p.id}`).update({status:'open',reviewNote:'DEMO Android live-data check'});
      }else if(req.method==='GET'&&url.pathname==='/audit'){
        result={foods:[]};
        for(const id of manifest.foods){const value=(await db.ref(`demo/foods/${id}`).get()).val();if(value)result.foods.push({id,name:value.name,status:value.status,reserved:value.reserved,quantity:value.quantity});}
      }else if(req.method==='POST'&&url.pathname==='/stage'){console.log('PRODUCTION ANDROID STAGE:',p.name);}
      else{res.statusCode=404;result={error:'Not found'};}
      res.end(JSON.stringify(result));
    }catch(e){res.statusCode=500;res.end(JSON.stringify({error:e.message}));}
  });
  server.listen(8766,'127.0.0.1',()=>console.log('Production synthetic-only Android bridge ready on 8766'));
}
start().catch(async e=>{console.error(e.code||'',e.message);process.exitCode=1;try{await app.delete();}catch{}});
