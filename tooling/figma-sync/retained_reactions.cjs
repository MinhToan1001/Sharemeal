const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'../..'),dir=path.join(root,'docs/figma-sync');
const kept=JSON.parse(fs.readFileSync(path.join(dir,'retained_control_ids.json'),'utf8'));
const audit=JSON.parse(fs.readFileSync(path.join(root,'docs/frontend/control_audit.json'),'utf8'));
const groups=fs.readdirSync(path.join(root,'docs/figma/behavior')).filter(x=>x.startsWith('group_')&&x.endsWith('.json')).map(x=>JSON.parse(fs.readFileSync(path.join(root,'docs/figma/behavior',x),'utf8')));
const out=[];
for(const row of kept){
 const c=audit.find(x=>x.frameId===row.frameId)?.controls.find(c=>c.nodeId===row.sourceId&&c.source);
 if(!c)continue;
 const group=groups.find(g=>g.frames.some(f=>f.id===row.frameId));const frame=group?.frames.find(f=>f.id===row.frameId),node=frame?.nodes.find(n=>n.id===c.source);
 if(node?.reactions.length)out.push({...row,reactions:node.reactions.map(r=>({trigger:r.trigger,actions:group.actions[r.action]}))});
}
fs.writeFileSync(path.join(dir,'retained_reactions.json'),JSON.stringify(out));console.log(JSON.stringify(out));
