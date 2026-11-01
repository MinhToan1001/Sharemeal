const page=await figma.getNodeByIdAsync('103:1195');await figma.setCurrentPageAsync(page);
await init(STATE);
const existing=new Map(page.findAllWithCriteria({types:['COMPONENT']}).map(n=>[n.name,n]));
for(const [key,s]of DATA){
 const name='SM/Flutter/'+key;let c=existing.get(name);
 if(!c){
  const root=buildNode(s,page,s.rect,{templateKey:key});
  c=figma.createComponentFromNode(root);made.push(c.id);c.name=name;
  c.description='Editable '+s.name+' from the current ShareMeal Flutter frontend. Native layout, text and photo fills.';
  const texts=c.findAllWithCriteria({types:['TEXT']}).filter(t=>{for(let p=t.parent;p&&p.id!==c.id;p=p.parent)if(p.type==='INSTANCE')return false;return true;});
  texts.forEach((t,i)=>{const prop=c.addComponentProperty(i===0?'Label':'Text '+(i+1),'TEXT',t.characters);t.componentPropertyReferences={characters:prop};});
  const i=Object.keys(STATE.templates).length;c.x=4500+(i%5)*480;c.y=Math.floor(i/5)*500;
 }
 STATE.templates[key]=c.id;TM[key]=c;
}
return {state:STATE,createdNodeIds:[...new Set(made)],count:Object.keys(STATE.templates).length,components:DATA.map(([key])=>({key,id:STATE.templates[key]}))};
