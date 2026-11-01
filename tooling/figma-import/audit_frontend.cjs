// Read-only inspection of the imported design trees; no runtime screenshots.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..');
const screens=JSON.parse(fs.readFileSync(path.join(root,'docs/figma/screen_map.json'),'utf8'));
function texts(n){return [n.text||'',...(n.children||[]).map(texts)].filter(Boolean).join(' ').replace(/\s+/g,' ').trim();}
function flatten(n){n.children=(n.children||[]).flatMap(c=>{flatten(c);return c.style?.display==='contents'?c.children:[c]});return n;}
const all=[];
for(const screen of screens){
 const tree=flatten(JSON.parse(fs.readFileSync(path.join(root,'docs/figma/layout',screen.frameId.replace(':','_')+'.json'),'utf8')));
 const nodes=[];
 function walk(n,parent,p='r',x=0,y=0){
  const text=texts(n);nodes.push({id:n.id||'@'+p,path:p,parent:parent?.id||null,name:n.name||'',tag:n.tag,
   text,width:n.width,height:n.height,x:x+n.x,y:y+n.y,children:n.children.map(c=>c.id),style:n.style});
  n.children.forEach((c,i)=>walk(c,n,p+'.'+i,x+n.x,y+n.y));
 }
 walk(tree,null);
 all.push({...screen,nodes});
}
const dir=path.join(root,'docs/frontend');fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'design_nodes.json'),JSON.stringify(all,null,2));
const group=process.argv[2],name=process.argv[3];
for(const s of all.filter(s=>(!group||s.group===group)&&(!name||s.name===name))){
 console.log('\n'+s.frameId+' '+s.group+'/'+s.name);
 for(const n of s.nodes){
  if(n.id.startsWith('@')||!n.text||n.text.length>125)continue;
  if(n.tag==='p'&&s.nodes.some(p=>p.id===n.parent&&p.text===n.text))continue;
  console.log([n.id,n.parent,n.name||n.tag,Math.round(n.width)+'x'+Math.round(n.height),n.text].join(' | '));
 }
}
