const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'../..'),dir=path.join(root,'docs/figma-sync');
const source=JSON.parse(fs.readFileSync(path.join(dir,'prepared_layers.json'),'utf8'));
const raw=JSON.parse(fs.readFileSync(path.join(dir,'flutter_layers.json'),'utf8'));
const audit=JSON.parse(fs.readFileSync(path.join(root,'docs/frontend/control_audit.json'),'utf8'));
const kernel=fs.readFileSync(path.join(__dirname,'figma_kernel.js'),'utf8');
const tplKey=new Function(kernel.slice(kernel.indexOf('function sourceText'),kernel.indexOf('function styleKey'))+'; return tplKey;')();
function texts(n,a=[]){if(n.type==='text')a.push(n);for(const c of n.children||[])texts(c,a);return a;}
function images(n,a=[]){if(n.type==='image')a.push(n);for(const c of n.children||[])images(c,a);return a;}
function compact(n){
 const key=tplKey(n);
 if(key)return {type:'template',templateKey:key,name:n.name,rect:n.rect,texts:texts(n).map(({type,name,text,size,weight,color,lineHeight,letterSpacing,align,rect})=>({text,size,weight,color,lineHeight,letterSpacing,align,rect})),images:images(n).map(({asset})=>({asset}))};
 const x={...n};if(x.control)x.control={kind:x.control.kind,action:x.control.action,key:x.control.key,source:x.control.source};
 x.children=(x.children||[]).map(compact);return x;
}
const screens=source.map(s=>({...s,rootChildIds:raw.find(x=>x.frameId===s.frameId).rootChildIds,
 actions:(audit.find(x=>x.frameId===s.frameId)?.controls||[]).filter(c=>c.kind==='action'&&c.source&&c.nodeId),
 panels:s.panels.map(p=>({...p,layers:p.layers.map(compact)}))}));
// Compose the shared profile once; use only role-specific navigation from these snapshots.
const profileFooters=[];
for(const id of ['profile-charity','profile-volunteer']){
 const s=source.find(x=>x.frameId===id);let found;
 function w(n){if(n.name==='MealBottomBar')found=n;for(const c of n.children||[])w(c);}
 s.panels.forEach(p=>p.layers.forEach(w));profileFooters.push({role:id.slice(8),node:compact(found)});
}
screens.find(s=>s.frameId==='6:2504').profileFooters=profileFooters;
const active=screens.filter(s=>!s.frameId.startsWith('profile-'));
active.sort((a,b)=>a.frameId==='donor-impact'?-1:b.frameId==='donor-impact'?1:0);
fs.writeFileSync(path.join(dir,'compact_screens.json'),JSON.stringify(active));
console.log(JSON.stringify(active.map(s=>({id:s.frameId,bytes:JSON.stringify(s).length}))));
