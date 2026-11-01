const p=await figma.getNodeByIdAsync('103:1195');await figma.setCurrentPageAsync(p);
const touched=[],created=[],deleted=[];
function plain(x){return JSON.parse(JSON.stringify(x));}
function copyPaints(a,b){
 if('fills'in a){a.fills=['FRAME','COMPONENT','INSTANCE'].includes(a.type)?[]:plain(b.fills||[]);touched.push(a.id);}
 if('strokes'in a&&'strokes'in b){a.strokes=plain(b.strokes);if('strokeWeight'in a&&typeof b.strokeWeight==='number')a.strokeWeight=b.strokeWeight;}
 if('children'in a&&'children'in b){for(let i=0;i<Math.min(a.children.length,b.children.length);i++)copyPaints(a.children[i],b.children[i]);}
}
for(const [cp,id]of Object.entries(DATA.icons)){
 const main=await figma.getNodeByIdAsync(id);const ref=figma.createNodeFromSvg(DATA.outlines[cp].replaceAll('currentColor','#006642'));
 created.push(ref.id,...ref.findAll(()=>true).map(n=>n.id));copyPaints(main,ref);deleted.push(ref.id);ref.remove();
}
const templates=await Promise.all(DATA.templates.map(id=>figma.getNodeByIdAsync(id)));
for(const t of templates){
 for(const inst of t.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.name.startsWith('icon/'))){
  const desired=inst.fills.find(p=>p.type==='SOLID'&&p.visible!==false);
  const main=await inst.getMainComponentAsync();if(!main)continue;
  copyPaints(inst,main);
  if(desired){for(const n of inst.findAll(()=>true)){
   if(['FRAME','COMPONENT','INSTANCE','GROUP'].includes(n.type))continue;
   if('fills'in n&&Array.isArray(n.fills)&&n.fills.some(p=>p.type==='SOLID'&&p.visible!==false))n.fills=[plain(desired)];
   if('strokes'in n&&Array.isArray(n.strokes)&&n.strokes.some(p=>p.type==='SOLID'&&p.visible!==false))n.strokes=[plain(desired)];
  }}
 }
}
return {createdNodeIds:created,mutatedNodeIds:[...new Set(touched)],removedNodeIds:deleted,templates:templates.length};
