const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'../..'),dir=path.join(root,'docs/figma-sync');
const screens=JSON.parse(fs.readFileSync(path.join(dir,'flutter_layers.json'),'utf8'));
const request=JSON.parse(fs.readFileSync(path.join(dir,'restore_request.json'),'utf8'));
const rows=[];
for(const row of request){const s=screens.find(s=>s.frameId===row.frameId);const ordinary=s.ordinary.filter(p=>row.missing.includes(p.nodeId));const inlineSVG={};function w(n){if(n.type==='svg')inlineSVG[n.asset]=fs.readFileSync(path.join(root,'frontend',n.asset),'utf8');(n.children||[]).forEach(w);}ordinary.forEach(p=>p.layers.forEach(w));const data={frameId:row.frameId,panels:ordinary,inlineSVG};fs.writeFileSync(path.join(dir,'restore-'+row.frameId.replace(':','_')+'.json'),JSON.stringify(data));rows.push({id:row.frameId,count:ordinary.length,missing:row.missing.length,bytes:JSON.stringify(data).length});}
console.log(JSON.stringify(rows));
