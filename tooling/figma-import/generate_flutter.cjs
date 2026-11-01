// Mechanical build-time translation from measured Figma reference to Dart.
const fs=require('fs'),path=require('path');
const controls=require('./frontend_controls.cjs');
const root=path.resolve(__dirname,'../..');
const base=path.join(root,'docs/figma');
const screens=JSON.parse(fs.readFileSync(path.join(base,'screen_map.json'),'utf8'));
const layoutsDir=path.join(base,'layout');
const variables=JSON.parse(fs.readFileSync(path.join(base,'prototype_variables.json'),'utf8'));
const conditionalLayout=JSON.parse(fs.readFileSync(path.join(base,'conditional_layout.json'),'utf8'));
const frames={},actions=[],actionKeys=new Map();
for(const file of fs.readdirSync(path.join(base,'behavior')).filter(f=>f.startsWith('group_')&&f.endsWith('.json')).sort()){
 const group=JSON.parse(fs.readFileSync(path.join(base,'behavior',file),'utf8'));
 const remap=group.actions.map(a=>{const key=JSON.stringify(a);if(!actionKeys.has(key)){actionKeys.set(key,actions.length);actions.push(a);}return actionKeys.get(key);});
 for(const frame of group.frames){
  frames[frame.id]={...frame,nodes:frame.nodes.map(n=>({...n,reactions:n.reactions.map(r=>({...r,action:remap[r.action]}))}))};
 }
}
if(Object.keys(frames).length!==104)throw Error('Expected behavior for 104 screens');
const defaults=Object.fromEntries(variables.map(v=>[v.id,Object.values(v.values)[0]]));
const routes=Object.fromEntries(screens.map(s=>[s.frameId,s.route]));
const actionTypes=new Set(),navigationTypes=new Set(),expressionTypes=new Set(),missing=new Set();
function audit(v){
 if(!v||typeof v!=='object')return;
 if(v.type&&['NODE','BACK','SET_VARIABLE','CONDITIONAL','URL','CLOSE'].includes(v.type))actionTypes.add(v.type);
 if(v.navigation)navigationTypes.add(v.navigation);
 if(v.expressionFunction)expressionTypes.add(v.expressionFunction);
 if(v.destinationId&&!routes[v.destinationId])missing.add(v.destinationId);
 Object.values(v).forEach(x=>Array.isArray(x)?x.forEach(audit):audit(x));
}
actions.forEach(audit);
if(missing.size)throw Error('Unmapped destinations: '+[...missing]);
function dart(v){
 if(typeof v==='string')return JSON.stringify(v).replace(/\$/g,'\\$');
 if(Array.isArray(v))return '['+v.map(dart).join(',')+']';
 if(v&&typeof v==='object')return '{'+Object.entries(v).map(([k,x])=>dart(k)+':'+dart(x)).join(',')+'}';
 if(typeof v==='number')return String(Math.round(v*10000)/10000);
 return JSON.stringify(v);
}
const write=(p,c)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,c,'utf8');};
const shared=path.join(root,'frontend/lib/presentation/shared/figma');
write(path.join(shared,'figma_prototype_data.dart'),
 '// GENERATED from the existing Figma prototype. No server authorization is implied.\n'+
 'const Map<String,dynamic> figmaPrototypeDefaults = '+dart(defaults)+';\n'+
 'const Map<String,dynamic> figmaPrototypeFrames = '+dart(frames)+';\n'+
 'const List<dynamic> figmaPrototypeActions = '+dart(actions)+';\n'+
 'const Map<String,String> figmaFrameRoutes = '+dart(routes)+';\n');
const pascal=s=>s.split(/[_/]/).map(p=>p[0].toUpperCase()+p.slice(1)).join('');
const auditAssets=[];
function flatten(node){
 node.children=(node.children||[]).flatMap(c=>{
  flatten(c);return c.style.display==='contents'?c.children:[c];
 });
 return node;
}
function visit(node,fn,x=0,y=0,parent=null){
 const gx=x+node.x,gy=y+node.y;
 fn(node,gx,gy,parent);
 for(const c of node.children||[])visit(c,fn,gx,gy,node);
}
function mergeBehavior(frameId,rootNode){
 const behavior=frames[frameId].nodes;
 const all=[];
 visit(rootNode,(n,x,y,parent)=>all.push({n,x,y,parent}));
 for(const b of behavior.filter(b=>b.bindings&&Object.keys(b.bindings).length)){
  if(all.some(a=>a.n.id===b.id))continue;
  const suffix=b.id.split(';').pop();
  const matches=all.filter(a=>a.n.id===suffix).sort((a,z)=>
   Math.hypot(a.x-b.bounds.x,a.y-b.bounds.y)-Math.hypot(z.x-b.bounds.x,z.y-b.bounds.y));
  if(matches.length&&Math.hypot(matches[0].x-b.bounds.x,matches[0].y-b.bounds.y)<25)matches[0].n.id=b.id;
 }
 // Hidden conditional layers have their own high-fidelity reference, too.
 for(const b of behavior.filter(b=>b.visible===false&&b.bindings?.visible).sort((a,z)=>a.order-z.order)){
  if(all.some(a=>a.n.id===b.id))continue;
  const filename=path.join(layoutsDir,b.id.replace(':','_')+'.json');
  if(!fs.existsSync(filename))throw Error('Missing hidden reference '+b.id);
  const n=flatten(JSON.parse(fs.readFileSync(filename,'utf8')));
  const parent=all.find(a=>a.n.id===b.parentId);
  if(!parent)throw Error('Missing conditional parent '+b.parentId);
  n.id=b.id;n.initiallyVisible=false;
  const sizing=conditionalLayout[b.id];
  if(sizing?.positioning==='ABSOLUTE')n.style.position='absolute';
  if(Math.abs(n.width-b.bounds.width)>0.01||
    (sizing?.vertical!=='HUG'&&Math.abs(n.height-b.bounds.height)>0.01))
   throw Error('Conditional layer dimensions differ from Figma: '+b.id);
  n.x=b.bounds.x-parent.x;n.y=b.bounds.y-parent.y;
  parent.n.children.splice(Math.min(b.order,parent.n.children.length),0,n);
  all.push({n,x:b.bounds.x,y:b.bounds.y,parent:parent.n});
 }
 const ids=new Set(all.map(a=>a.n.id));
 for(const b of behavior.filter(b=>b.reactions.some(r=>r.trigger?.type==='ON_CLICK'))){
  if(ids.has(b.id)||b.id===frameId||!b.bounds)continue;
  const parent=all.find(a=>a.n.id===b.parentId)||all[0];
  const n={id:b.id,name:b.name,tag:'hotspot',x:b.bounds.x-parent.x,y:b.bounds.y-parent.y,
   width:b.bounds.width,height:b.bounds.height,fixedHeight:true,initiallyVisible:b.visible,
   style:{position:'absolute',display:'block',opacity:1,background:'rgba(0,0,0,0)'},children:[]};
  parent.n.children.push(n);ids.add(b.id);
 }
}
function widget(n,label,frameId){
 const style=n.style||{};
 const formLabel=n.name==='Input'?label:null;
 let nextLabel=label;
 if(n.name==='Form field / Default'||n.id==='46:522'){
  nextLabel=n.children?.find(c=>c.text)?.text||label;
 }
 const args=[];
 if(n.id)args.push('nodeId:'+dart(n.id));
 if(n._control)args.push('control:'+dart(n._control));
 if(n.name)args.push('name:'+dart(n.name));
 if(n.tag!=='div')args.push('tag:'+dart(n.tag));
 args.push('width:'+dart(n.width),'height:'+dart(n.height));
 if(n.x)args.push('x:'+dart(n.x));if(n.y)args.push('y:'+dart(n.y));
 if(n.fixedHeight)args.push('fixedHeight:true');
 if(n.initiallyVisible===false)args.push('initiallyVisible:false');
 if(n.text!==undefined)args.push('text:'+dart(n.text));
 if(formLabel)args.push('formLabel:'+dart(formLabel));
 if(n.src){
  const name=path.basename(new URL(n.src).pathname),asset='assets/figma/'+name;
  const p=path.join(root,'frontend',asset);
  if(!fs.existsSync(p)||fs.statSync(p).size===0)throw Error('Missing visible asset '+asset);
  args.push('asset:'+dart(asset));
  auditAssets.push({frameId,nodeId:n.id,asset,width:n.width,height:n.height});
 }
 args.push('style:'+dart(style));
 if(n.children?.length)args.push('children:['+n.children.map(c=>widget(c,nextLabel,frameId)).join(',\n')+']');
 return 'FigmaBox('+args.join(',')+')';
}
const groups={};
for(const screen of screens){
 const layout=flatten(JSON.parse(fs.readFileSync(path.join(layoutsDir,screen.frameId.replace(':','_')+'.json'),'utf8')));
 if(layout.width!==402||layout.height!==874)throw Error('Invalid root geometry '+screen.frameId);
 mergeBehavior(screen.frameId,layout);
 controls.enhance(screen,layout,frames[screen.frameId]);
 const file=path.join(root,screen.file);
 const previous=fs.existsSync(file)?fs.readFileSync(file,'utf8'):'';
 const className=previous.match(/class\s+(\w+)\s+extends/)?.[1]||pascal(screen.group+'_'+screen.name)+'Page';
 screen.className=className;
 const source='// GENERATED from Figma '+screen.frameId+'. Edit source/reference or regenerate this screen.\n'+
  '// https://www.figma.com/design/0S8fvpt4DT4noT5gzCYnDk?node-id='+screen.frameId.replace(':','-')+'\n'+
  "import 'package:flutter/material.dart';\n"+
  "import 'package:sharemeal/presentation/shared/figma/figma_primitives.dart';\n\n"+
  'class '+className+' extends StatelessWidget {\n'+
  ' const '+className+'({super.key});\n'+
  ' static const routeName = '+dart(screen.route)+';\n'+
  ' @override Widget build(BuildContext context) => FigmaScreen(frameId:'+dart(screen.frameId)+',child:\n'+
  widget(layout,null,screen.frameId)+');\n}\n';
 write(file,source);
 (groups[screen.group]??=[]).push(screen);
}
for(const [group,items] of Object.entries(groups)){
 const name=group.split('/').pop(),cls=pascal(name)+'Routes';
 const imports=items.map(s=>"import '../../"+s.file.replace('frontend/lib/','')+"';").join('\n');
 const body=items.map(s=>s.className+'.routeName: (_) => const '+s.className+'(),').join('\n');
 write(path.join(root,'frontend/lib/app/routing',name+'_routes.dart'),
  "import 'package:flutter/widgets.dart';\n"+imports+'\nabstract final class '+cls+
  ' { static final Map<String,WidgetBuilder> pages = {\n'+body+'\n}; }\n');
}
write(path.join(base,'native_asset_callsites.json'),JSON.stringify(auditAssets,null,2));
write(path.join(base,'native_screen_manifest.json'),JSON.stringify(screens,null,2));
write(path.join(root,'docs/frontend/control_audit.json'),JSON.stringify(controls.reports,null,2));
write(path.join(root,'docs/screen_manifest.json'),JSON.stringify(screens,null,2));
console.log(JSON.stringify({screens:screens.length,assetCallsites:auditAssets.length,actions:actions.length,
 actionTypes:[...actionTypes],navigation:[...navigationTypes],expressions:[...expressionTypes]}));
