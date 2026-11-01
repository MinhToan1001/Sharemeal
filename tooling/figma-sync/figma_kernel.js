// Semantic Flutter layer adapter. Executed only via use_figma, not in the app.
const made=[],changed=[],removed=[],pendingReactions=[];
const weightStyle={100:'Thin',200:'Extra Light',300:'Light',400:'Regular',500:'Medium',600:'Semi Bold',700:'Bold',800:'Extra Bold',900:'Black'};
const imageHashes={
 'assets/figma/b06546c1-6369-4414-803f-e9faf884379d.png':'786c3aebf5311c24ff619f3bc6108239dd22e717',
 'assets/figma/3239506a-0015-4c3d-8dbd-3453e66091cf.png':'b5548091082a5356b6362e2f89ca3f0aebae26d1',
 'assets/images/food/bread.png':'2140b9104075cc63bfaae70260fd626481c98133',
 'assets/images/food/vegetables.png':'0e387eb326e94557b294d8da102c350c32495803',
 'assets/images/food/soup.png':'5bda3ad3b5a8b6718fc06269418723c57f164fe5'
};
const V={},ST={},IC={},SV={},TM={};
function add(n){made.push(n.id);return n;}
function argb(h){return {r:parseInt(h.slice(2,4),16)/255,g:parseInt(h.slice(4,6),16)/255,b:parseInt(h.slice(6,8),16)/255};}
function paint(h){
 if(!h||h.slice(0,2)==='00')return [];
 let p={type:'SOLID',color:argb(h),opacity:parseInt(h.slice(0,2),16)/255};
 const v=V[h]||V['ff'+h.slice(2)];if(v)p=figma.variables.setBoundVariableForPaint(p,'color',v);
 return [p];
}
function sourceText(n,out=[]){if(n.texts){out.push(...n.texts);return out;}if(n.type==='text')out.push(n);for(const c of n.children||[])sourceText(c,out);return out;}
function sourceImages(n,out=[]){if(n.images){out.push(...n.images);return out;}if(n.type==='image')out.push(n);for(const c of n.children||[])sourceImages(c,out);return out;}
function tplKey(n){
 if(n.templateKey)return n.templateKey;
 if(['FoodPhoto','_RequestCard','MealBottomBar','FilledButton','OutlinedButton','TextButton','ChoiceChip'].includes(n.name)){
  const texts=sourceText(n);
  let k=n.name+'/'+n.rect.slice(2).map(x=>Math.round(x*10)/10).join('x');
  if(n.name==='MealBottomBar')k+='/'+texts.map(x=>x.text+':'+x.color).join('|');
  if(n.name.includes('Button')||n.name==='ChoiceChip'){
   function fills(q,a=[]){if(q.fill)a.push(q.fill);for(const c of q.children||[])fills(c,a);return a;}
   k+='/'+fills(n).join('|')+'/'+texts.map(x=>`${x.size}:${x.weight}:${x.color}`).join('|');
  }
  return k;
 }
 return null;
}
function styleKey(n){return `${n.size}/${n.weight}/${n.lineHeight||n.size*1.2}`;}
function textProps(n,s){
 n.fontName={family:'Inter',style:weightStyle[s.weight]||'Regular'};
 n.fontSize=s.size;n.lineHeight={unit:'PIXELS',value:s.lineHeight||s.size*1.2};
 if(ST[styleKey(s)])n.textStyleId=ST[styleKey(s)].id;
 n.characters=s.text;n.fills=paint(s.color);n.letterSpacing={unit:'PIXELS',value:s.letterSpacing||0};
 let width=s.rect[2]+.6;
 if(!s.text.includes('\n')&&s.rect[3]<=(s.lineHeight||s.size*1.2)+1){n.textAutoResize='WIDTH_AND_HEIGHT';width=Math.max(width,n.width+.6);}
 n.textAutoResize='NONE';n.resize(Math.max(.1,width),Math.max(.1,s.rect[3]));
 n.textAlignHorizontal=s.align==='center'?'CENTER':s.align==='right'||s.align==='end'?'RIGHT':'LEFT';
}
function overrideInstance(n,s){
 const texts=n.findAllWithCriteria({types:['TEXT']}),ss=sourceText(s);
 if(texts.length!==ss.length)throw new Error(`Template text count differs: ${s.name}: ${texts.length}/${ss.length}`);
 texts.forEach((t,i)=>textProps(t,ss[i]));
 const imgs=n.findAll(q=>'fills'in q&&Array.isArray(q.fills)&&q.fills.some(p=>p.type==='IMAGE'));
 const si=sourceImages(s);if(imgs.length===si.length)imgs.forEach((im,i)=>{im.fills=[{type:'IMAGE',scaleMode:'FILL',imageHash:imageHashes[si[i].asset]}];});
}
function recolorIcon(n,h){
 const qs=[n,...('findAll'in n?n.findAll(()=>true):[])];
 for(const q of qs){if(['FRAME','INSTANCE','COMPONENT','GROUP'].includes(q.type)){if('fills'in q)q.fills=[];continue;}if('fills'in q&&Array.isArray(q.fills)&&q.fills.some(p=>p.type==='SOLID'&&p.visible!==false))q.fills=paint(h);if('strokes'in q&&Array.isArray(q.strokes)&&q.strokes.some(p=>p.type==='SOLID'&&p.visible!==false))q.strokes=paint(h);}
}
function svgColor(filter){
 if(!filter)return null;
 const m=filter.match(/alpha: ([\d.]+), red: ([\d.]+), green: ([\d.]+), blue: ([\d.]+)/);
 return m?m.slice(1).map(v=>Math.round(Number(v)*255).toString(16).padStart(2,'0')).join(''):null;
}
function configureFrame(n,s){
 n.fills=paint(s.fill);n.strokes=s.border?.width>0?paint(s.border.color):[];
 if(s.border?.width>0){n.strokeWeight=s.border.width;n.strokeAlign='INSIDE';}
 if(s.radius){['topLeftRadius','topRightRadius','bottomRightRadius','bottomLeftRadius'].forEach((k,i)=>{n[k]=s.radius[i];if(V['radius/'+s.radius[i]])n.setBoundVariable(k,V['radius/'+s.radius[i]]);});}
 n.clipsContent=!!s.clip;
}
function queue(n,s,ctx){if(s.name==='MealBottomBar'||s.name.includes('Button')||s.name==='ListTile'||s.control||s.name==='ChoiceChip')pendingReactions.push({node:n,spec:s,frameId:ctx.frameId,kind:ctx.kind});}
function buildNode(s,parent,origin,ctx={}){
 let n;
 const key=tplKey(s);
 if(key&&TM[key]&&ctx.templateKey!==key){
  n=add(TM[key].createInstance());parent.appendChild(n);n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));
  n.name='SM/Flutter/'+s.name;overrideInstance(n,s);queue(n,s,ctx);
 }else if(s.type==='text'){
  n=add(figma.createText());parent.appendChild(n);textProps(n,s);n.name=s.text.slice(0,70);
 }else if(s.type==='icon'||s.type==='svg'){
  const src=s.type==='icon'?IC[s.text.codePointAt(0)]:SV[s.asset];
  if(!src&&s.type==='svg'&&ctx.inlineSVG?.[s.asset]){n=figma.createNodeFromSvg(ctx.inlineSVG[s.asset].replace(/var\(--[^,]+,\s*([^)]+)\)/g,'$1'));made.push(n.id,...n.findAll(()=>true).map(x=>x.id));}
  else {if(!src)throw new Error('Missing source vector '+(s.asset||s.text.codePointAt(0)));n=add(src.createInstance());}
  parent.appendChild(n);n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));
  n.name=s.type==='icon'?'icon/'+s.text.codePointAt(0):'icon/'+s.asset.split('/').pop();
  const color=s.type==='icon'?s.color:svgColor(s.filter);if(color)recolorIcon(n,color);
 }else if(s.type==='image'){
  if(!imageHashes[s.asset])throw new Error('Missing source photo '+s.asset);
  n=add(figma.createRectangle());parent.appendChild(n);n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));n.fills=[{type:'IMAGE',imageHash:imageHashes[s.asset],scaleMode:'FILL'}];n.name='Photo / '+s.asset.split('/').pop();
 }else if(s.type==='map'){
  if(!ctx.mapSource)throw new Error('Map illustration source required for '+ctx.frameId);
  n=ctx.mapSource.clone();parent.appendChild(n);made.push(n.id,...n.findAll(()=>true).map(x=>x.id));
  const sourceControls=ctx.mapSource.children.map((c,i)=>['6:1908','6:1909'].includes(c.id)?i:-1).filter(i=>i>=0).sort((a,b)=>b-a);
  for(const i of sourceControls){removed.push(n.children[i].id);n.children[i].remove();}
  const ratio=s.rect[2]/n.width;n.rescale(ratio);n.resize(s.rect[2],s.rect[3]);n.name='Bản đồ minh họa · giữ từ thiết kế gốc';n.clipsContent=true;
 }else if(s.type==='progress'){
  n=add(figma.createFrame());parent.appendChild(n);n.resize(s.rect[2],Math.max(1,s.rect[3]));n.name='Progress / '+Math.round(s.value*100)+'%';n.fills=paint(s.track);n.cornerRadius=n.height/2;n.clipsContent=true;
  if(s.value>0){const bar=add(figma.createRectangle());n.appendChild(bar);bar.resize(Math.max(.1,n.width*s.value),n.height);bar.x=0;bar.y=0;bar.cornerRadius=n.height/2;bar.fills=paint(s.color);}
 }else if(s.type==='checkbox'){
  n=add(figma.createFrame());parent.appendChild(n);n.resize(s.rect[2],s.rect[3]);n.fills=[];n.name='Checkbox / '+(s.checked?'Đã chọn':'Chưa chọn');
  const box=add(figma.createRectangle());n.appendChild(box);box.resize(18,18);box.x=(n.width-18)/2;box.y=(n.height-18)/2;box.cornerRadius=2;box.fills=s.checked?paint('ff006642'):paint('ffffffff');box.strokes=paint(s.checked?'ff006642':'ff83948c');box.strokeWeight=1.5;
  if(s.checked){const check=add(IC[0xE5CA].createInstance());n.appendChild(check);check.resize(16,16);check.x=(n.width-16)/2;check.y=(n.height-16)/2;recolorIcon(check,'ffffffff');}
 }else{
  n=add(s.type==='flex'?figma.createAutoLayout(s.axis==='horizontal'?'HORIZONTAL':'VERTICAL'):figma.createFrame());parent.appendChild(n);
  n.name=s.name==='Flex item'?'Layout slot':s.name.replace(/^Render/,'Layout / ');
  n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));configureFrame(n,s);
  if(s.type==='flex'){
   n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.itemSpacing=0;
   n.primaryAxisAlignItems=({start:'MIN',end:'MAX',center:'CENTER',spaceBetween:'SPACE_BETWEEN'})[s.main]||'MIN';
   n.counterAxisAlignItems=({start:'MIN',end:'MAX',center:'CENTER',baseline:'BASELINE',stretch:'MIN'})[s.cross]||'MIN';
  }
  for(const c of s.children||[]){const ch=buildNode(c,n,s.rect,ctx);if(s.type==='flex'){ch.layoutSizingHorizontal='FIXED';ch.layoutSizingVertical='FIXED';}}
  if(n.clipsContent&&(s.children||[]).some(c=>c.rect[1]+c.rect[3]>s.rect[1]+s.rect[3]+2))n.overflowDirection='VERTICAL';
  queue(n,s,ctx);
 }
 if(!('layoutMode'in parent)||(parent.layoutMode!=='HORIZONTAL'&&parent.layoutMode!=='VERTICAL')){n.x=s.rect[0]-origin[0];n.y=s.rect[1]-origin[1];}
 return n;
}
async function init(state){
 await Promise.all(Object.values(weightStyle).map(style=>figma.loadFontAsync({family:'Inter',style})));
 const ids=[...new Set([...Object.values(state.colors||{}),...Object.values(state.floats||{})])];
 const vs=await Promise.all(ids.map(id=>figma.variables.getVariableByIdAsync(id)));
 const vm=Object.fromEntries(vs.filter(Boolean).map(v=>[v.id,v]));
 for(const [k,id]of Object.entries({...state.colors,...state.floats}))V[k]=vm[id];
 const styles=await Promise.all(Object.values(state.styles||{}).map(id=>figma.getStyleByIdAsync(id)));
 const sm=Object.fromEntries(styles.filter(Boolean).map(s=>[s.id,s]));for(const[k,id]of Object.entries(state.styles||{}))ST[k]=sm[id];
 for(const [bundle,target]of [[state.icons,IC],[state.svgs,SV],[state.templates,TM]]){
  const es=Object.entries(bundle||{}),ns=await Promise.all(es.map(e=>figma.getNodeByIdAsync(e[1])));es.forEach(([k],i)=>target[k]=ns[i]);
 }
}
