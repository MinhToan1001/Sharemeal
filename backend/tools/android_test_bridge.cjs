'use strict';
// Test-only local control plane. Refuses to run against production services.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const mediaManifest = require('node:path').join(__dirname,'../.private/android-created-media.json');
const createdMedia = require('node:fs').existsSync(mediaManifest) ? JSON.parse(require('node:fs').readFileSync(mediaManifest,'utf8')) : [];
const sdk = require('node:module').createRequire(require('node:path').join(__dirname,'../functions/package.json'));
const {initializeApp} = sdk('firebase-admin/app');
const {getAuth} = sdk('firebase-admin/auth');
const {getDatabase} = sdk('firebase-admin/database');
if (process.env.FIREBASE_AUTH_EMULATOR_HOST !== '127.0.0.1:9099' || process.env.FIREBASE_DATABASE_EMULATOR_HOST !== '127.0.0.1:9000') throw new Error('Local Firebase Emulators required');
const projectId = 'sharemeal-e17c9';
const app = initializeApp({projectId, databaseURL:`https://${projectId}-default-rtdb.firebaseio.com`});
const db = getDatabase(app), auth = getAuth(app);
const server = http.createServer(async (req,res) => {
  res.setHeader('Content-Type','application/json');
  try {
    let body=''; for await (const chunk of req) body+=chunk;
    const p=body ? JSON.parse(body) : {};
    const url=new URL(req.url,'http://localhost'); let result={};
    if (req.method==='GET' && url.pathname==='/health') result={mode:'emulator',projectId};
    else if(req.method==='POST' && url.pathname==='/reset') {
      await db.ref().set({config:{public:{cloudinary:{cloudName:'toanvip',uploadPreset:'sharemeal_demo_unsigned'}}}});
      await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${projectId}/accounts`,{method:'DELETE'});
    } else if(req.method==='POST' && url.pathname==='/console-admin') {
      await auth.getUser(p.uid); await db.ref(`users/${p.uid}/role`).set('admin');
    } else if(req.method==='GET' && url.pathname==='/oob') {
      const data=await (await fetch(`http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}/emulator/v1/projects/${projectId}/oobCodes`)).json();
      result={codes:(data.oobCodes||[]).filter(c=>c.email===url.searchParams.get('email')).map(c=>({code:c.oobCode,type:c.requestType}))};
    } else if(req.method==='POST' && url.pathname==='/expire-code') {
      if(!['pickup','receipt'].includes(p.stage)) throw new Error('Invalid stage');
      await db.ref(`handover/${p.id}/${p.stage}/expiresAt`).set(Date.now()-1000);
    } else if(req.method==='POST' && url.pathname==='/stage') {
      console.log('ANDROID STAGE:',p.name); result={ok:true};
    } else if(req.method==='POST' && url.pathname==='/record-media') {
      if(!String(p.url).startsWith('https://res.cloudinary.com/toanvip/')) throw new Error('Invalid media');
      createdMedia.push(p.url);
      fs.writeFileSync(path.join(__dirname,'../.private/android-created-media.json'),JSON.stringify(createdMedia));
    } else {res.statusCode=404; result={error:'Not found'};}
    res.end(JSON.stringify(result));
  } catch(e) {res.statusCode=500;res.end(JSON.stringify({error:e.message}));}
});
server.listen(8765,'127.0.0.1',()=>console.log('Android local test bridge ready on 8765'));
