'use strict';
// Explicitly approved production smoke test. Every write is fixture-scoped.
// Never creates an admin account, changes adminUid or edits existing profiles.
const fs=require('node:fs'), path=require('node:path'), http=require('node:http');
const {randomBytes}=require('node:crypto');
const {isDeepStrictEqual}=require('node:util');
const sdk=require('node:module').createRequire(path.join(__dirname,'../functions/package.json'));
const {initializeApp,deleteApp}=sdk('firebase-admin/app');
const {getDatabase}=sdk('firebase-admin/database');
const {getAuth}=sdk('firebase-admin/auth');
const projectId='sharemeal-e17c9';
if(process.env.SHAREMEAL_ALLOW_GROUP_EF_LIVE_TEST!==projectId ||
   process.env.FIREBASE_AUTH_EMULATOR_HOST || process.env.FIREBASE_DATABASE_EMULATOR_HOST) {
  throw Error('Explicit production-test opt-in required; emulator variables must be absent');
}
const cliAuth=require(path.join(process.env.APPDATA,'npm/node_modules/firebase-tools/lib/auth.js'));
const account=cliAuth.getProjectDefaultAccount(path.resolve(__dirname,'..'));
if(!account?.tokens?.refresh_token)throw Error('Firebase CLI login required');
async function token(){return cliAuth.getAccessToken(account.tokens.refresh_token,[
  'https://www.googleapis.com/auth/cloud-platform','https://www.googleapis.com/auth/firebase','https://www.googleapis.com/auth/userinfo.email']);}
const credential={getAccessToken:async()=>{const t=await token();return {
  access_token:t.access_token,expires_in:Math.max(60,Math.floor((t.expires_at-Date.now())/1000))};}};
const options={projectId,databaseURL:`https://${projectId}-default-rtdb.firebaseio.com`,credential};
const owner=initializeApp(options,'group-ef-live-owner'), db=getDatabase(owner), auth=getAuth(owner);
const manifestPath=path.join(__dirname,'../.private/group-ef-live-fixtures.json');
let manifest, limitedApp, adminDb;
const save=()=>fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2));
const now=()=>new Date().toISOString();
async function authIds(){const ids=[];let page;do{const r=await auth.listUsers(1000,page);ids.push(...r.users.map(u=>u.uid));page=r.pageToken;}while(page);return ids.sort();}
function ownIds(){return new Set(manifest.users.map(u=>u.uid));}
async function ownFood(id){
  if(typeof id!=='string'||!/^[A-Za-z0-9_-]+$/.test(id))throw Error('Invalid fixture ID');
  const f=(await db.ref(`demo/foods/${id}`).get()).val();
  if(!f||f.donorId!==manifest.users.find(u=>u.label==='donor').uid||!f.name.startsWith('DEMO'))throw Error('Only fixture food allowed');
  return f;
}
async function ownOrder(id){
  if(typeof id!=='string'||!/^[A-Za-z0-9_-]+$/.test(id))throw Error('Invalid fixture ID');
  const o=(await db.ref(`demo/orders/${id}`).get()).val(), ids=ownIds();
  if(!o||!ids.has(o.donorId)||!ids.has(o.organizationId)||(o.volunteerId&&!ids.has(o.volunteerId)))throw Error('Only fixture orders allowed');
  await ownFood(o.foodId);return o;
}
function cancelled(o){
  if(!o)return o;
  if(o.status==='cancelled')return;
  const n={...o,status:'cancelled',cancelledBy:manifest.adminUid,cancelReason:'DEMO Group E/F admin cancellation',
    cancelledAt:now(),cancelHadStock:['accepted','assigned'].includes(o.status),driver:'',stockState:'releasePending',stockReleased:false,updatedAt:now()};
  if(o.volunteerId)n.cancelledVolunteerId=o.volunteerId;
  delete n.volunteerId;return n;
}
async function adminCancel(id,expectDenied=false){
  const old=await ownOrder(id);
  if(expectDenied){
    try{await adminDb.ref(`demo/orders/${id}`).set(cancelled(old));}
    catch(e){if(/permission.?denied/i.test(e.code||e.message))return {denied:true};throw e;}
    throw Error('Rules unexpectedly allowed cancellation after pickup');
  }
  if(!['awaiting','accepted','assigned','cancelled'].includes(old.status))throw Error('Use support after pickup');
  await adminDb.ref(`demo/orders/${id}`).transaction(cancelled,undefined,false);
  const o=await ownOrder(id);
  await adminDb.ref(`demo/foods/${o.foodId}`).transaction(f=>{
    if(!f)return f;
    const j=f.stockJournal||'',r=`|${id}:R|`;
    if(j.includes(r))return;
    const held=j.includes(`|${id}:H|`)||o.cancelHadStock;
    return {...f,reserved:f.reserved-(held?o.quantity:0),stockJournal:j+r,lastStockOrderId:id};
  },undefined,false);
  await adminDb.ref(`demo/orders/${id}`).update({stockState:'released',stockReleased:true,updatedAt:now()});
  return {cancelled:true};
}
async function cleanup(){
  if(!manifest&&fs.existsSync(manifestPath))manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
  if(!manifest)return {cleaned:true,createdUsers:0};
  if(!/^sm-ef-live-\d+$/.test(manifest.prefix))throw Error('Unexpected fixture prefix');
  const ids=ownIds();for(const id of ids)if(!id.startsWith(manifest.prefix+'-')||id===manifest.adminUid)throw Error('Refusing non-fixture cleanup');
  const updates={},orders=new Set(),foods=new Set();
  for(const uid of ids){
    for(const [id,f]of Object.entries((await db.ref('demo/foods').orderByChild('donorId').equalTo(uid).get()).val()||{})){
      if(!f.name.startsWith('DEMO'))throw Error('Unexpected fixture food');foods.add(id);
    }
    for(const [id,o]of Object.entries((await db.ref('demo/orders').orderByChild('donorId').equalTo(uid).get()).val()||{})){
      if(!ids.has(o.organizationId))throw Error('External order references DEMO food; manual review required');orders.add(id);
    }
    for(const table of ['applications','needs','notifications','shifts','distributions','tickets']){
      for(const id of Object.keys((await db.ref(`demo/${table}`).orderByChild('uid').equalTo(uid).get()).val()||{}))updates[`demo/${table}/${id}`]=null;
    }
    updates[`users/${uid}`]=null;updates[`demo/inventory/${uid}`]=null;
  }
  for(const id of foods){updates[`demo/foods/${id}`]=null;updates[`foodAccess/${id}`]=null;}
  for(const id of orders){
    updates[`demo/orders/${id}`]=null;updates[`handover/${id}`]=null;
    for(const table of ['messages','reviews'])for(const k of Object.keys((await db.ref(`demo/${table}`).orderByChild('orderId').equalTo(id).get()).val()||{}))updates[`demo/${table}/${k}`]=null;
  }
  const notifications=(await db.ref('demo/notifications').get()).val()||{};
  for(const [id,n]of Object.entries(notifications))if(ids.has(n.senderId))updates[`demo/notifications/${id}`]=null;
  if(Object.keys(updates).length)await db.ref().update(updates);
  for(const id of ids)try{await auth.deleteUser(id);}catch(e){if(e.code!=='auth/user-not-found')throw e;}
  let removedImages=0;
  if(manifest.media?.length){
    const cloud=sdk('cloudinary').v2;
    cloud.config({cloud_name:'toanvip',api_key:'919634828858254',api_secret:fs.readFileSync(path.join(__dirname,'../.private/cloudinary-api-secret'),'utf8').trim(),secure:true});
    for(const url of new Set(manifest.media)){
      const m=/^https:\/\/res\.cloudinary\.com\/toanvip\/image\/upload\/v\d+\/(sharemeal_demo\/[A-Za-z0-9_-]+)\.(png|jpe?g)$/.exec(url);
      if(!m)throw Error('Refusing non-fixture media cleanup');
      const response=await cloud.uploader.destroy(m[1],{resource_type:'image',invalidate:true});
      if(!['ok','not found'].includes(response.result))throw Error('Fixture image cleanup failed');removedImages++;
    }
  }
  const after=(await db.ref().get()).val()||{}, authAfter=await authIds();
  const before=JSON.parse(fs.readFileSync(manifest.beforeDataPath,'utf8'));
  const identicalData=isDeepStrictEqual(before,after), identicalAuth=isDeepStrictEqual(manifest.beforeAuthIds,authAfter);
  const report={cleaned:true,createdUsers:ids.size,removedPaths:Object.keys(updates).length,removedImages,existingDataUnchanged:identicalData,existingAuthIdsUnchanged:identicalAuth,adminUidUnchanged:after.config?.adminUid===manifest.adminUid};
  manifest.cleaned=true;manifest.users=manifest.users.map(({uid,role,label})=>({uid,role,label}));manifest.cleanup=report;save();
  if(!identicalData||!identicalAuth)console.log('Existing data/auth changed concurrently; preserved current values, no root restoration.');
  return report;
}
async function start(){
  if(process.argv.includes('--preflight')){
    const response=await fetch(`${options.databaseURL}/.settings/rules.json`,{headers:{Authorization:`Bearer ${(await token()).access_token}`}});
    if(!response.ok)throw Error('Cannot back up live rules');
    const live=await response.json();
    const baseline=JSON.parse(require('node:child_process').execFileSync('git',['-c','safe.directory='+path.resolve(__dirname,'../..'),'show','HEAD:backend/firebase/database/database.rules.json'],{encoding:'utf8',cwd:path.resolve(__dirname,'../..')}));
    if(!isDeepStrictEqual(live,baseline))throw Error('Live rules differ from current committed baseline; refusing overwrite');
    const name='group-ef-before-'+Date.now();
    fs.writeFileSync(path.join(__dirname,'../.private/'+name+'.rules.json'),JSON.stringify(live));
    fs.writeFileSync(path.join(__dirname,'../.private/'+name+'.data.json'),JSON.stringify((await db.ref().get()).val()));
    console.log(JSON.stringify({preflight:true,baselineMatches:true,backup:name}));return;
  }

  if(process.argv.includes('--cleanup')){console.log(JSON.stringify(await cleanup()));return;}
  if(fs.existsSync(manifestPath)&&!JSON.parse(fs.readFileSync(manifestPath,'utf8')).cleaned)throw Error('Previous live fixtures require --cleanup first');
  const response=await fetch(`${options.databaseURL}/.settings/rules.json`,{headers:{Authorization:`Bearer ${(await token()).access_token}`}});
  if(!response.ok)throw Error('Cannot verify deployed rules');
  const prepared=JSON.parse(fs.readFileSync(path.join(__dirname,'../firebase/database/database.rules.json'),'utf8'));
  if(!isDeepStrictEqual(await response.json(),prepared))throw Error('Deployed rules differ from prepared group B');
  const before=(await db.ref().get()).val()||{}, adminUid=before.config?.adminUid;
  if(before.users?.[adminUid]?.role!=='admin'||before.users[adminUid].disabled===true)throw Error('Existing singleton admin unavailable');
  const adminAuth=await auth.getUser(adminUid);
  if(!adminAuth.emailVerified||adminAuth.disabled)throw Error('Existing admin Authentication is not active/verified');
  limitedApp=initializeApp({...options,databaseAuthVariableOverride:{uid:adminUid,token:{email_verified:true}}},'group-ef-live-admin-rules');
  adminDb=getDatabase(limitedApp);
  if((await adminDb.ref(`users/${adminUid}/role`).get()).val()!=='admin')throw Error('Admin rule context unavailable');
  const prefix=`sm-ef-live-${Date.now()}`, beforeDataPath=path.join(__dirname,`../.private/${prefix}-before.json`);
  fs.writeFileSync(beforeDataPath,JSON.stringify(before));
  manifest={prefix,adminUid,users:[],cleaned:false,beforeDataPath,beforeAuthIds:await authIds()};save();
  for(const label of ['donor','charity','volunteer','other']){
    const role=label==='other'?'charity':label;
    const user={uid:`${prefix}-${label}`,role,label,email:`${prefix}-${label}@example.invalid`,password:randomBytes(18).toString('base64url')};
    manifest.users.push(user);save();
    await auth.createUser({uid:user.uid,email:user.email,password:user.password,emailVerified:true,displayName:`DEMO Group E/F ${label}`});
    await db.ref(`users/${user.uid}`).set({uid:user.uid,role,email:user.email,name:`DEMO Group E/F ${label}`,verificationStatus:'approved',disabled:false,createdAt:now()});
  }
  const server=http.createServer(async(req,res)=>{
    res.setHeader('Content-Type','application/json');
    try{
      let raw='';for await(const chunk of req)raw+=chunk;const p=raw?JSON.parse(raw):{};
      const u=new URL(req.url,'http://localhost');let result={};
      if(req.method==='GET'&&u.pathname==='/fixtures')result={mode:'production-group-ef-fixtures-only',projectId,prefix,users:manifest.users};
      else if(req.method==='POST'&&u.pathname==='/approve-food'){
        const f=await ownFood(p.id);if(f.status!=='pending')throw Error('Expected pending fixture food');
        await adminDb.ref(`demo/foods/${p.id}`).update({status:'open',reviewNote:'DEMO Group E/F reviewed',reviewedBy:adminUid,reviewedAt:now()});
      }else if(req.method==='GET'&&u.pathname==='/audit'){
        const id=u.searchParams.get('food');result={food:await ownFood(id)};
        if(u.searchParams.has('order')){
          result.order=await ownOrder(u.searchParams.get('order'));
          result.inventory=(await db.ref('demo/inventory/'+result.order.organizationId).get()).val()||{};
          result.ticket=(await db.ref('demo/tickets/receipt_'+result.order.id).get()).val()||null;
        }
      }else if(req.method==='POST'&&u.pathname==='/admin-cancel')result=await adminCancel(p.id);
      else if(req.method==='POST'&&u.pathname==='/admin-deny-cancel')result=await adminCancel(p.id,true);
      else if(req.method==='POST'&&u.pathname==='/simulate-finalization-gap'){
        const o=await ownOrder(p.id),f=await ownFood(o.foodId);
        if(o.status!=='cancelled'||!o.stockReleased||!(f.stockJournal||'').includes(`|${p.id}:R|`))throw Error('Expected committed fixture cancellation');
        await db.ref(`demo/orders/${p.id}`).update({stockState:'releasePending',stockReleased:false});
      }else if(req.method==='POST'&&u.pathname==='/receipt-gap'){
        const o=await ownOrder(p.id), inv=(await db.ref('demo/inventory/'+o.organizationId).get()).val();
        if(o.status!=='completed'||!inv?.receiptJournal?.includes('|'+o.id+':I|'))throw Error('Expected credited fixture receipt');
        await db.ref('demo/orders/'+p.id).update({status:'pickedUp',receiptState:'pending',inventoryAdded:false,completedAt:null});
      }else if(req.method==='POST'&&u.pathname==='/media'){
        if(!/^https:\/\/res\.cloudinary\.com\/toanvip\/image\/upload\/v\d+\/(sharemeal_demo\/[A-Za-z0-9_-]+)\.(png|jpe?g)$/.test(p.url))throw Error('Invalid fixture media');
        manifest.media??=[];manifest.media.push(p.url);save();
      }else if(req.method==='POST'&&u.pathname==='/stage')console.log('LIVE GROUP E/F:',p.name);
      else{res.statusCode=404;result={error:'Not found'};}
      res.end(JSON.stringify(result));
    }catch(e){res.statusCode=500;res.end(JSON.stringify({error:e.message}));}
  });
  server.listen(8766,'127.0.0.1',()=>console.log('Group E/F production fixture bridge ready on localhost:8766'));
}
start().catch(e=>{console.error(e.code||'',e.message);process.exitCode=1}).finally(async()=>{
  if(process.argv.includes('--cleanup')||process.argv.includes('--preflight')||process.exitCode){if(limitedApp)await deleteApp(limitedApp);await deleteApp(owner);}
});
