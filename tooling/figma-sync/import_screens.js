const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
await init(STATE);
const frames=[],oldLinks=[],retargeted=[];
const nav=(id)=>({type:'NODE',destinationId:id,navigation:'NAVIGATE',transition:null,preserveScrollPosition:false});
const set=(id,type,value)=>({type:'SET_VARIABLE',variableId:id,variableValue:{type,resolvedType:type,value}});
const click=async(n,actions)=>{await n.setReactionsAsync([{trigger:{type:'ON_CLICK'},actions}]);changed.push(n.id);};
const allText=n=>n.type==='TEXT'?[n]:('findAllWithCriteria'in n?n.findAllWithCriteria({types:['TEXT']}):[]);
function norm(s){return s.replace(/\s+/g,' ').trim();}
function boxInRoot(n,root){const a=n.absoluteTransform,b=root.absoluteTransform;return [a[0][2]-b[0][2],a[1][2]-b[1][2],n.width,n.height];}
function overlap(a,b){return a[0]<b[0]+b[2]&&a[0]+a[2]>b[0]&&a[1]<b[1]+b[3]&&a[1]+a[3]>b[1];}
function nearestAction(t,stop){let result=t;for(let p=t.parent;p&&p.id!==stop.id;p=p.parent){if(p.type==='INSTANCE'&&p.name.includes('Button'))return p;if('name'in p&&p.name.includes('ListTile'))return p;if(p.width>300&&p.height<75)result=p;}return result;}
function nearestCard(t,stop){for(let p=t.parent;p&&p.id!==stop.id;p=p.parent)if('fills'in p&&p.width>300&&p.height>70&&p.height<460&&Array.isArray(p.fills)&&p.fills.some(f=>f.type==='SOLID'&&f.visible!==false&&f.color.r>.99&&f.color.g>.99&&f.color.b>.99))return p;return nearestAction(t,stop);}
async function wire(container,screen,labelLinks){
 const bars=container.findAllWithCriteria({types:['INSTANCE']}).filter(n=>n.name==='SM/Flutter/MealBottomBar');
 for(const bar of bars){
  const ts=allText(bar),labels=ts.map(n=>n.characters),role=labels.includes('Tin đăng')?'donor':labels.includes('Việc giao')?'volunteer':labels.includes('Tổng quan')?'admin':'charity';
  const dst=role==='donor'?['6:319','6:1087',STATE.impactId,'6:2504']:role==='volunteer'?['6:1737','6:1801','6:2232','6:2142','6:2504']:role==='admin'?['6:3641','6:3712','62:994','62:1331','62:1152']:['6:1155','6:1212','6:1413','6:1470','6:2504'];
  for(let i=0;i<ts.length;i++){
   let item=ts[i];for(let p=ts[i].parent;p&&p.id!==bar.id;p=p.parent){if(p.parent&&'layoutMode'in p.parent&&p.parent.layoutMode==='HORIZONTAL'&&p.width>60&&p.height>45){item=p;break;}}
   if(dst[i]&&dst[i]!==screen.root.id){const actions=[];if(dst[i]==='6:2504')actions.push(set('VariableID:80:1172','STRING',role),set('VariableID:98:1173','BOOLEAN',role==='donor'),set('VariableID:98:1174','BOOLEAN',role==='charity'),set('VariableID:98:1175','BOOLEAN',role==='volunteer'));actions.push(nav(dst[i]));await click(item,actions);}
  }
 }
 for(const t of allText(container)){
  const label=norm(t.characters);if(!label)continue;
  let p=t.parent,inBar=false;while(p&&p.id!==container.id){if(p.type==='INSTANCE'&&p.name==='SM/Flutter/MealBottomBar'){inBar=true;break;}p=p.parent;}if(inBar)continue;
  const fill=t.fills.find?.(p=>p.type==='SOLID');if(fill?.opacity<.5)continue;
  const n=nearestAction(t,container);
  if(['Chấp nhận','Ghép tổ chức này'].includes(label)){await click(n,[set('VariableID:80:1176','STRING','accepted'),nav('6:3516')]);continue;}
  if(label==='Xem chuyến'){await click(nearestCard(t,container),[nav('6:1890')]);continue;}
  if(screen.frameId==='6:1087'&&t.fontSize>=15){await click(nearestCard(t,container),[nav('6:560')]);continue;}
  if(screen.frameId==='6:1212'&&t.fontSize>=15){await click(nearestCard(t,container),[nav('6:1282')]);continue;}
  if(screen.frameId==='6:560'&&label.includes('yêu cầu cho tin này')){await click(n,[nav('6:609')]);continue;}
  if(label.startsWith('Theo dõi đơn')){await click(n,[nav(screen.route.includes('/donor/')?'6:661':'6:1525')]);continue;}
  const routes={'Vai trò của tôi':'64:1230','Giấy tờ & xác minh':'6:4055','Trung tâm hỗ trợ':'64:1264','Cài đặt thông báo':'6:2465','Đăng xuất':'6:246','Đăng ký ca này':'65:1542','Xem gợi ý ghép cặp tự động':'6:1023','Nhắn tin':'6:2352','Tạo nhu cầu':'6:1380','Xem biên lai':'6:3076'};
  if(routes[label]){await click(n,[nav(routes[label])]);continue;}
  if(screen.frameId==='6:2504'&&(label==='Báo cáo tác động'||label==='Huy hiệu & đóng góp')){
   const conditional={type:'CONDITIONAL',conditionalBlocks:[
    {condition:{type:'EXPRESSION',resolvedType:'BOOLEAN',value:{expressionFunction:'EQUALS',expressionArguments:[{type:'VARIABLE_ALIAS',resolvedType:'STRING',value:{type:'VARIABLE_ALIAS',id:'VariableID:80:1172'}},{type:'STRING',resolvedType:'STRING',value:'volunteer'}]}},actions:[nav('6:2142')]},
    {condition:{type:'EXPRESSION',resolvedType:'BOOLEAN',value:{expressionFunction:'EQUALS',expressionArguments:[{type:'VARIABLE_ALIAS',resolvedType:'STRING',value:{type:'VARIABLE_ALIAS',id:'VariableID:80:1172'}},{type:'STRING',resolvedType:'STRING',value:'donor'}]}},actions:[nav(STATE.impactId)]},
    {actions:[nav('6:1654')]}
   ]};await click(n,[conditional]);continue;
  }
  if(labelLinks[label]&&label!=='Minh họa')await n.setReactionsAsync(labelLinks[label]);
 }
 // The imported back vector is an actual control, not an invisible page hotspot.
 for(const icon of container.findAllWithCriteria({types:['INSTANCE']})){
  const b=boxInRoot(icon,screen.root);if(b[0]>=0&&b[0]<65&&b[1]>=10&&b[1]<95&&icon.width<=30&&icon.height<=30){
   await click(icon,[{type:'BACK'}]);break;
  }
 }
}
for(const screen of DATA){
 let root=screen.frameId==='donor-impact'?(STATE.impactId?await figma.getNodeByIdAsync(STATE.impactId):null):await figma.getNodeByIdAsync(screen.frameId);
 if(!root){
  if(screen.frameId!=='donor-impact')throw new Error('Missing existing screen '+screen.frameId);
  const section=await figma.getNodeByIdAsync('79:1172');root=add(figma.createFrame());section.appendChild(root);root.name='D06 · Báo cáo tác động';root.resize(402,874);root.fills=paint('fff5f8f5');
  root.x=60;root.y=Math.max(...section.children.filter(n=>n.id!==root.id).map(n=>n.y+n.height))+160;
  section.resizeWithoutConstraints(Math.max(section.width,522),Math.max(section.height,root.y+934));changed.push(section.id);STATE.impactId=root.id;
 }
 screen.root=root;const oldChildren=[...root.children];
 const fonts=new Map();for(const t of root.findAllWithCriteria({types:['TEXT']}))for(const s of t.getStyledTextSegments(['fontName']))fonts.set(JSON.stringify(s.fontName),s.fontName);
 await Promise.all([...fonts.values()].map(f=>figma.loadFontAsync(f)));
 const reactionNodes=root.findAll(n=>'reactions'in n&&n.reactions.length>0);
 const byId=new Map(reactionNodes.map(n=>[n.id,n.reactions])),labelLinks={};
 for(const n of reactionNodes)if(n.name.startsWith('Prototype / '))labelLinks[norm(n.name.slice(12))]=n.reactions;
 for(const a of screen.actions||[]){const n=await figma.getNodeByIdAsync(a.nodeId);if(n&&byId.has(a.source)&&'setReactionsAsync'in n){await n.setReactionsAsync(byId.get(a.source));changed.push(n.id);retargeted.push({from:a.source,to:n.id});}}
 const wrappers=[];const mapSource=screen.frameId==='6:1890'?await figma.getNodeByIdAsync('6:1891'):null;
 for(const panel of screen.panels){
  const whole=panel.nodeId===screen.frameId||panel.kind==='impactPage';
  let target=!whole&&panel.nodeId&&!panel.nodeId.startsWith('frontend:')?await figma.getNodeByIdAsync(panel.nodeId):null;
  const name=`Flutter · ${panel.kind} · ${panel.nodeId||screen.frameId}`;
  if(!target)target=root.children.find(n=>n.name===name&&n.type==='FRAME');
  let original=[];
  if(target&&target.type==='FRAME'){
   original=[...target.children];target.layoutMode='NONE';target.fills=[];target.strokes=[];target.effects=[];target.resize(panel.rect[2],panel.rect[3]);
   if(target.parent.type==='FRAME'&&target.parent.layoutMode==='NONE'||target.parent.type==='SECTION'){
    const pb=boxInRoot(target.parent,root);target.x=panel.rect[0]-pb[0];target.y=panel.rect[1]-pb[1];
   }
   changed.push(target.id);
  }else{
   target=add(figma.createFrame());root.appendChild(target);target.name=name;target.resize(panel.rect[2],panel.rect[3]);target.x=panel.rect[0];target.y=panel.rect[1];target.fills=[];target.clipsContent=false;
  }
  target.name=name;wrappers.push(target);
  for(const s of panel.layers)buildNode(s,target,panel.rect,{frameId:screen.frameId,kind:panel.kind,mapSource});
  for(const old of original){removed.push(old.id);old.remove();}
  await wire(target,screen,labelLinks);
 }
 // Role-specific navigation shares the same profile frame and its existing entry points.
 if(screen.profileFooters){
  const bar=root.findAllWithCriteria({types:['INSTANCE']}).find(n=>n.name==='SM/Flutter/MealBottomBar');
  if(bar){
   const par=bar.parent,index=par.children.indexOf(bar);const holder=add(figma.createFrame());holder.name='Profile navigation / current role';holder.resize(402,67);holder.fills=[];
   par.insertChild(index,holder);holder.appendChild(bar);bar.x=0;bar.y=0;bar.setBoundVariable('visible',await figma.variables.getVariableByIdAsync('VariableID:98:1173'));changed.push(bar.id);
   for(const f of screen.profileFooters){const b=buildNode(f.node,holder,f.node.rect,{frameId:screen.frameId,kind:'bottomNav'});b.setBoundVariable('visible',await figma.variables.getVariableByIdAsync(f.role==='charity'?'VariableID:98:1174':'VariableID:98:1175'));}
   await wire(holder,screen,labelLinks);
  }
 }
 const keep=new Set([...(screen.rootChildIds||[]),...wrappers.map(n=>n.id)]);
 for(const old of oldChildren){
  if(keep.has(old.id)||old.removed)continue;
  // Leave the original back target when its original header has not changed.
  if(old.name==='Prototype / Quay lại'&&!screen.panels.some(p=>p.kind==='pageHeader'||p.nodeId===screen.frameId))continue;
  removed.push(old.id);old.remove();
 }
 frames.push({id:root.id,source:screen.frameId,name:root.name,panels:wrappers.map(n=>({id:n.id,name:n.name,width:n.width,height:n.height})),textCount:root.findAllWithCriteria({types:['TEXT']}).length});
 changed.push(root.id);
}
return {state:STATE,frames,retargeted,createdNodeIds:[...new Set(made)],mutatedNodeIds:[...new Set(changed)],removedNodeIds:[...new Set(removed)]};
