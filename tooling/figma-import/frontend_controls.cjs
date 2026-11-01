// Semantic, stateful controls layered onto the imported native design trees.
// No transparent prototype overlays are emitted by this pass.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..');
const clean=s=>s.replace(/\s+/g,' ').trim();
const slug=s=>clean(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().replace(/[^a-z0-9]+/g,'.').replace(/^\.|\.$/g,'');
const text=n=>clean([n.text||'',...(n.children||[]).map(text)].filter(Boolean).join(' '));
const transparent=n=>!n.style?.background||/rgba\([^)]*,\s*0\)/.test(n.style.background);
const reports=[];
function images(n){return [...(n.src?[path.basename(n.src)]:[]),...(n.children||[]).flatMap(images)];}
const donorBar=(()=>{const a=JSON.parse(fs.readFileSync(path.join(root,'docs/figma/layout/6_319.json'),'utf8'));let nav;function w(n){if(n.id==='66:1259')nav=n;(n.children||[]).forEach(w);}w(a);return nav.children.map(n=>images(n)[0]);})();
function enhance(screen,tree,behavior){
 const frame=screen.frameId,all=[];
 function walk(n,parent=null,p='r',x=0,y=0){
  n._uid=frame+'|'+p;
  const m=n.style?.transform?.match(/^matrix\(([^)]+)\)$/)?.[1].split(',').map(Number);
  const gx=x+(n.x||0)+(m?.[4]||0),gy=y+(n.y||0)+(m?.[5]||0);
  all.push({n,parent,x:gx,y:gy,text:text(n),depth:p.split('.').length});
  n.children?.forEach((c,i)=>walk(c,n,p+'.'+i,gx,gy));
 }
 walk(tree);
 const get=id=>all.find(a=>a.n.id===id);
 const bind=(a,spec)=>{if(!a)return;const n=a.n||a;n._control={label:text(n)||n.name||'',...spec};};
 const byId=(id,spec)=>bind(get(id),spec);
 const exact=(label)=>all.filter(a=>a.text===label&&!a.n._removed&&a.n!==tree&&a.n.width<395)
   .sort((a,b)=>(!transparent(b.n)*100+(b.n.children?.length?20:0)+b.n.width/100-b.depth/100)-(!transparent(a.n)*100+(a.n.children?.length?20:0)+a.n.width/100-a.depth/100))[0];
 const byText=(label,spec)=>bind(exact(label),spec);
 const descendants=(n,fn)=>{for(const c of n.children||[]){fn(c);descendants(c,fn);}};
 function action(a,kind,extra={}){if(extra.source){for(const x of all)if(x.n!==(a?.n||a)&&x.n._control?.source===extra.source)delete x.n._control;}bind(a,{kind:'action',action:kind,...extra});}
 function choice(a,key,value,initial,extra={}){
  if(!a)return;
  bind(a,{kind:'choice',key,value,initial,...extra});
  descendants(a.n||a,c=>{if(c.text!==undefined)bind(c,{kind:'choiceLabel',key,value,initial,...extra});});
  if(extra.radio){const icon=(a.n||a).children?.find(c=>c.width<=26&&c.height<=26&&!text(c));if(icon)bind(icon,{kind:'radioIndicator',key,value,initial});}
 }
 function input(a,key,initial,extra={}){
  if(!a)return;
  const n=a.n||a;const base=all.find(x=>x.n===n);
  const leaf=all.find(x=>x.n.text&&x.n!==n&&x.n._uid.startsWith(n._uid+'.'))||base;
  const inset=[Math.max(0,(leaf?.x||0)-(base?.x||0)),Math.max(0,(leaf?.y||0)-(base?.y||0))];
  bind(a,{kind:'input',key,initial:initial??leaf?.n.text??'',inset,...extra});
 }
 function checkbox(a,key,initial=true,extra={}){
  if(!a)return;const n=a.n||a;
  bind(a,{kind:'toggle',key,initial,...extra});
  const icon=n.children?.find(c=>!text(c)&&c.width<=36&&c.height<=36);
  if(icon)bind(icon,{kind:'checkbox',key,initial,...extra});
 }
 // Move prototype actions to their visible buttons, icons, rows and cards.
 for(const b of behavior.nodes.filter(b=>b.reactions.some(r=>r.trigger?.type==='ON_CLICK'))){
  const found=get(b.id);
  if(found&&(found.text||found.n.children?.length||found.n.src)&&found.n.tag!=='hotspot'){
   bind(found,{kind:'action',action:'navigate',source:b.id,label:found.text||b.name});continue;
  }
  const box=b.bounds;if(!box)continue;
  const isBack=/back|quay lại|đóng overlay/i.test(b.name);
  const desired=b.name.replace(/^Prototype\s*\/\s*/,'').trim();
  const named=exact(desired);
  if(!isBack&&named&&named.n.width<395){bind(named,{kind:'action',action:'navigate',source:b.id,label:desired});continue;}
  const candidates=all.filter(a=>a.n!==tree&&!a.n._removed&&a.n.tag!=='hotspot'&&
   (a.text||a.n.src||a.n.name==='Icon')&&a.n.width<395&&a.n.height<=250&&
   (isBack ? a.y<95&&a.x<65&&a.n.width<=50 :
     a.y>85&&(a.n.name==='Button'||a.n.name?.startsWith('go/')||
      ['a','button'].includes(a.n.tag)||(!transparent(a.n)&&a.n.children?.length>0))));
  function score(a){
   const nx=a.x+a.n.width/2,ny=a.y+a.n.height/2,bx=box.x+box.width/2,by=box.y+box.height/2;
   return Math.hypot(nx-bx,ny-by)+Math.abs(a.n.width-box.width)*0.3+
     (a.n._control?1000:0)+(a.n.name==='Button'?-15:0);
  }
  const target=candidates.sort((a,z)=>score(a)-score(z))[0];
  if(target&&score(target)<190)bind(target,{kind:'action',action:isBack?'back':'navigate',source:b.id,label:target.text||b.name});
 }
 // Remove invisible source hotspots, even if Figma happened to attach one to a title.
 for(const a of all){if(a.n.tag==='hotspot'||(['a','button'].includes(a.n.tag)&&!a.text&&!a.n.children?.length&&transparent(a.n)))a.n._removed=true;}
 // Real text fields, with distinct keys for repeated component instances.
 for(const a of all.filter(a=>a.n.name==='Input')){
  const label=a.parent?.children?.find(c=>c.text)?.text||a.text;
  let key=screen.group+'.'+screen.name+'.'+slug(label);
  const fieldNames={'Tên món ăn':'food.name','Tên hiển thị':'profile.donor.name','Người đại diện':'profile.donor.representative',
   'Tên tổ chức':'profile.organization.name','Địa chỉ nhận chính':'profile.organization.address',
   'Họ và tên':'profile.name','Phương tiện & biển số':'profile.vehicle','Lời nhắn tới người cho':'request.cancelNote'};
  key=fieldNames[label]||key;
  const auth=screen.group==='auth';
  if(auth)key='auth.'+screen.name+'.'+slug(label);
  input(a,key,a.text,{label,mode:/mật khẩu/i.test(label)?'password':/email/i.test(label)?'email':'text',required:!/(tùy chọn|nhận xét|lời nhắn)/i.test(label)});
 }
 // Role-specific bottom bars are one native navigation component, never mixed.
 const nav=all.find(a=>(a.n.name?.startsWith('Bottom navigation')||a.n.name==='SM/Admin navigation'||
   (a.n.width>=398&&a.n.height>=65&&a.n.height<=70&&a.text.includes('Trang chủ')&&a.text.includes('Tôi'))));
 if(nav){
  bind(nav,{kind:'bottomNav',role:screen.group==='user/donor'?'donor':screen.group==='user/volunteer'?'volunteer':screen.group==='admin'?'admin':screen.group==='shared'?'current':'charity',page:screen.name,icons:screen.group==='user/donor'?donorBar:nav.n.children.map(n=>images(n)[0]||null)});
  nav.n.children=[];
 }
 // Recognize controls by their semantic groups, not by a shared node ID.
 const peerOptions=new Set(['Tuần','Tháng','Năm','Tất cả','Chưa đọc','Chuyến giao','Đang mở - 2','Đã đủ - 6','Đã đóng - 3',
   'Còn nóng','Để lạnh','Khô ráo','Trứng','Đậu phộng','Hải sản','Cơm & món mặn','Rau củ','Bánh','Bánh & tráng miệng',
   'Cảm ơn rất nhiều','Món rất ngon','Mọi người rất vui','Thiếu / hỏng hộp','Giao trễ','Bình thường','Cần gấp',
   'Đến đúng giờ','Thân thiện','Liên lạc nhanh','Giữ vệ sinh hộp đựng','Có vấn đề','Tốt, dùng ngay','Thực phẩm khô / đồ hộp']);
 for(const a of all){
  const peers=(a.n.children||[]).filter(c=>peerOptions.has(text(c)));
  if(peers.length<2)continue;
  const key=screen.name+'.choice.'+slug(a.n.id||a.n._uid);
  const selected=peers.find(c=>/rgb\(0, 102, 66\)|rgb\(227, 242, 233\)|rgb\(255, 240, 215\)/.test(c.style.background))||peers[0];
  for(const p of peers)if(!p._control)choice(p,key,text(p),text(selected));
 }
 // Every standard Figma button becomes a native button with explicit behavior.
 const knownActions=[
  [/Xuất.*PDF|Lưu PDF|Tải.*PDF/,'exportPdf'],[/Gửi email/,'shareReport'],[/Tạo mã mới/,'renewCode'],
  [/Thêm vào lịch/,'addCalendar'],[/Chép T2/,'copyWeek'],[/Gửi đánh giá/,'saveReview'],
  [/Gọi hỗ trợ|Gọi điều phối|Gọi quản trị|Gọi người/,'call'],[/Đọc tất cả/,'readAll'],
  [/Đổi mật khẩu/,'changePassword'],[/Ngôn ngữ/,'language'],[/Chụp lại|Chụp ảnh/,'camera'],
  [/Thay ảnh|Thêm ảnh|Ảnh khác/,'pickImage'],[/Đổi email/,'editContact'],[/Gửi lại mã/,'resendCode'],
 ];
 for(const a of all.filter(a=>!a.n._removed&&a.n.name==='Button'&&!a.n._control)){
  const hit=knownActions.find(([re])=>re.test(a.text));
  if(hit)action(a,hit[1]);
 }
 // Screen-specific form semantics and values shared by subsequent screens.
 if(frame==='6:370'){
  ['74:1081','74:1083','74:1085'].forEach((id,i)=>choice(get(id),'food.category',['Cơm & món mặn','Rau củ','Bánh'][i],'Cơm & món mặn'));
  byId('74:1090',{kind:'step',key:'food.quantity',delta:-1,initial:20,min:1,max:10000});
  byId('74:1092',{kind:'step',key:'food.quantity',delta:1,initial:20,min:1,max:10000});
  byId('74:1091',{kind:'value',key:'food.quantity',initial:20});
  action(get('74:1072'),'pickImage',{key:'food.photo'});
 }
 if(frame==='6:416'){
  ['74:1177','74:1179','74:1181'].forEach((id,i)=>choice(get(id),'food.storage',['Còn nóng','Để lạnh','Khô ráo'][i],'Còn nóng'));
  ['74:1186','74:1188','74:1190'].forEach((id,i)=>choice(get(id),'food.allergens',['Trứng','Đậu phộng','Hải sản'][i],['Trứng'],{multiple:true,palette:'amber'}));
  ['74:1194','74:1198','74:1202'].forEach((id,i)=>checkbox(get(id),['food.safe.untouched','food.safe.packed','food.safe.fresh'][i],true));
  action(get('74:1171'),'pickTime',{key:'food.cooked',initial:'17:00'});
  action(get('74:1172'),'pickTime',{key:'food.expiry',initial:'23:00'});
 }
 if(frame==='6:473'){
  action(get('74:1295'),'editAddress',{key:'food.address',initial:'45 Nguyễn Thị Minh Khai, Quận 1'});
  action(get('74:1304'),'pickTime',{key:'food.pickup',initial:'19:00'});
  const row=get('74:1309');if(row)checkbox(row,'food.allowVolunteer',true);
 }
 if(frame==='6:3516'){
  ['6:3534','6:3536','6:3538','6:3540','6:3542','6:3544','6:3546','6:3548'].forEach((id,i)=>choice(get(id),'pickup.time',['19:00','19:15','19:30','19:45','20:00','20:15','20:45','21:00'][i],'19:30'));
  ['6:3552','6:3555','6:3558'].forEach((id,i)=>choice(get(id),'pickup.day',['Hôm nay','Ngày mai','Thứ 6'][i],'Hôm nay'));
  input(get('6:3563'),'pickup.note','Bên mình đến bằng xe bán tải màu trắng',{mode:'multiline'});
 }
 if(frame==='6:1333'){
  byId('6:1347',{kind:'step',key:'request.quantity',delta:-1,initial:15,min:1,maxKey:'selected.quantity'});
  byId('6:1348',{kind:'step',key:'request.quantity',delta:1,initial:15,min:1,maxKey:'selected.quantity'});
  byId('6:1346',{kind:'value',key:'request.quantity',initial:15});
  ['6:1355','6:1359'].forEach((id,i)=>choice(get(id),'request.transport',['Tự đến lấy','Nhờ giao hộ'][i],'Nhờ giao hộ'));
  input(get('6:1371'),'request.time','19:30',{mode:'time'});
  input(get('6:1373'),'request.receiver','Lê Minh Nhật');
  input(get('6:1375'),'request.purpose','Bữa tối cho 32 em nhỏ và người cao tuổi',{mode:'multiline'});
  const check=all.find(a=>a.n.width<=30&&a.n.height<=30&&a.y>530&&a.y<660&&!a.text);
  if(check)bind(check,{kind:'checkbox',key:'request.commitment',initial:true});
 }
 if(frame==='6:1380'){
  ['6:1391','6:1397','6:1393','6:1395'].forEach((id,i)=>choice(get(id),'need.category',['Cơm & món mặn','Rau củ','Bánh & tráng miệng','Đồ khô đóng gói'][i],['Cơm & món mặn','Rau củ'],{multiple:true}));
  choice(get('6:1404'),'need.priority','Bình thường','Cần gấp');choice(get('6:1408'),'need.priority','Cần gấp','Cần gấp',{palette:'amber'});
  input(get('6:1381'),'need.title','Bữa tối cho 32 người');
  input(get('6:1400'),'need.quantity','32',{mode:'number'});
  input(get('6:1402'),'need.before','20:30',{mode:'time'});
  input(get('6:1406'),'need.notes','Có 6 người cao tuổi cần món mềm, ít dầu mỡ. Không dùng được hải sản.',{mode:'multiline'});
 }
 if(frame==='6:1212'){
  input(get('6:1248'),'market.query','',{mode:'search',hint:'Tìm món ăn, nhà hàng',inset:[48,0]});
  ['6:1257','6:1259','6:1261','6:1263'].forEach((id,i)=>choice(get(id),'market.category',['Tất cả','Cơm & món mặn','Bánh','Rau củ'][i],'Tất cả'));
  choice(get('6:1253'),'market.view','Danh sách','Danh sách');choice(get('6:1255'),'market.view','Bản đồ','Danh sách');
  for(const id of ['6:1213','6:1222','6:1230','6:1239'])get(id).n._removed=true;
  const list={id:'frontend:market',name:'Food results',tag:'div',x:19,y:231,width:364,height:570,fixedHeight:true,style:{position:'absolute'},children:[],_uid:frame+'|market',_control:{kind:'collection',collection:'market'}};
  tree.children.push(list);
  byId('6:1238',{kind:'computed',value:'market.count'});
 }
 if(frame==='6:1087'){
  const cards=all.filter(a=>a.n.children?.length&&a.n.width>325&&a.n.width<380&&a.n.height>70&&a.n.height<180&&/Cơm gà|Bánh mì|Canh rau/.test(a.text));
  for(const card of cards)card.n._removed=true;
  tree.children.push({id:'frontend:myListings',tag:'div',x:22,y:142,width:358,height:655,fixedHeight:true,style:{position:'absolute'},children:[],_uid:frame+'|myListings',_control:{kind:'collection',collection:'myListings'}});
  for(const [id,value] of [['6:184','open'],['6:1094','assigned'],['6:1095','closed']])choice(get(id),'listings.status',value,'open');
 }
 if(frame==='6:1413'){
  for(const id of ['6:1414','6:1448','6:1460'])get(id).n._removed=true;
  tree.children.push({id:'frontend:needs',tag:'div',x:22,y:150,width:358,height:645,fixedHeight:true,style:{position:'absolute'},children:[],_uid:frame+'|needs',_control:{kind:'collection',collection:'needs'}});
  ['6:1437','6:1439','6:1441'].forEach((id,i)=>choice(get(id),'needs.status',['open','fulfilled','closed'][i],'open'));
 }
 if(frame==='6:1470'){
  const content=all.filter(a=>a.n.width>330&&a.n.width<390&&a.n.height>90&&a.y>130&&a.y<750&&/Cơm|Rau|Bánh/.test(a.text));
  for(const a of content)a.n._removed=true;
  tree.children.push({id:'frontend:orders',tag:'div',x:22,y:150,width:358,height:645,fixedHeight:true,style:{position:'absolute'},children:[],_uid:frame+'|orders',_control:{kind:'collection',collection:'orders'}});
  const labels=all.filter(a=>/^Sắp đến|^Đang xử lý|^Hoàn tất/.test(a.text)&&a.n.width<160&&a.n.height<45);
  for(const a of labels)choice(a,'orders.status',a.text.startsWith('Hoàn tất')?'completed':a.text.startsWith('Sắp')?'upcoming':'active','active');
 }
 if(frame==='6:3259'){
  const entries=[['6:3278','edit.name','Cơm gà xối mỡ'],['6:3282','edit.quantity','20'],['6:3271','edit.remaining','20'],['6:3286','edit.from','19:00'],['6:3274','edit.to','20:30'],['6:3290','edit.note','Có phần không hành. Mang theo túi giữ nhiệt nếu có']];
  for(const [id,key,value] of entries)input(get(id),key,value,{mode:key==='edit.note'?'multiline':key.includes('quantity')||key.includes('remaining')?'number':'text'});
 }
 if(frame==='6:3305'){
  for(const [i,id]of ['6:3322','6:3326','6:3329','6:3332','6:3335'].entries())choice(get(id),'close.reason',get(id)?.text,'Đã tìm được nơi nhận bên ngoài',{radio:true});
  input(get('6:3340'),'close.note','Xin lỗi vì sự bất tiện, mình sẽ đăng lại vào hôm sau',{mode:'multiline'});
 }
 if(frame==='65:1470')for(const id of ['65:1488','65:1492','65:1498'])choice(get(id),'cancel.reason',get(id)?.text,'Đã đủ thực phẩm từ nguồn khác',{radio:true});
 if(frame==='65:1385'){
  input(get('65:1404'),'distribution.children','10',{mode:'number',suffix:' suất'});
  input(get('65:1409'),'distribution.elderly','5',{mode:'number',suffix:' suất'});
  byId('65:1413',{kind:'computed',value:'distribution.total'});byId('65:1416',{kind:'computed',value:'distribution.balance'});
 }
 if(frame==='6:1702'){
  for(const id of ['6:1714','6:1716','6:1718'])action(get(id),'thankTemplate',{value:get(id).text});
  input(get('6:1720'),'thanks.message','Cảm ơn Bếp Nhà Lan rất nhiều. Các em nhỏ đã có bữa đầy đủ.',{mode:'multiline'});
  checkbox(get('6:1728'),'thanks.public',true);action(get('6:1722'),'pickImage',{key:'thanks.photo'});
 }
 if(frame==='6:2465'){
  const checks=all.filter(a=>!a.text&&a.n.width>=10&&a.n.width<=25&&a.n.height>=10&&a.n.height<=25&&a.x>320&&a.y>85);
  checks.sort((a,b)=>a.y-b.y).forEach((a,i)=>bind(a,{kind:'checkbox',key:['settings.requests','settings.delivery','settings.expiry','settings.anonymous'][i]||'settings.toggle.'+i,initial:i<2}));
  const slider=all.find(a=>a.n.width>=270&&a.n.width<=330&&a.n.height<=15&&a.y>340&&a.y<440);
  if(slider){bind(slider,{kind:'slider',key:'settings.radius',initial:5,min:1,max:10});slider.n.y-=12;slider.n.height=32;slider.n.fixedHeight=true;if(get('6:2477'))get('6:2477').n._removed=true;}
  byId('6:2476',{kind:'value',key:'settings.radius',initial:5,suffix:' km'});
  action(get('6:2491'),'language');action(get('6:2493'),'changePassword');
 }
 if(frame==='6:2835'){
  const cells=all.filter(a=>!a.text&&a.n.width>=40&&a.n.width<=75&&a.n.height>=20&&a.n.height<=38&&a.y>150&&a.y<570&&!transparent(a.n));
  cells.sort((a,b)=>a.y-b.y||a.x-b.x).forEach((a,i)=>bind(a,{kind:'toggleCell',key:'availability.'+i,initial:/0, 102, 66/.test(a.n.style.background)}));
  action(get('6:2901'),'copyWeek');byId('6:2900',{kind:'computed',value:'availability.total'});
 }
 if(frame==='6:795'){
  for(const id of ['6:816','6:818','6:820','6:822'])choice(get(id),'review.tags',get(id).text,['Đến đúng giờ','Thân thiện'],{multiple:true});
  input(get('6:825'),'review.note','Các bạn đến sớm hơn dự kiến, nhận hàng nhanh gọn.',{mode:'multiline'});
  const stars=all.filter(a=>!a.text&&a.n.width>=20&&a.n.width<=35&&a.n.height>=20&&a.n.height<=35&&a.y>150&&a.y<280);
  stars.sort((a,b)=>a.x-b.x).slice(0,5).forEach((a,i)=>bind(a,{kind:'star',key:'review.rating',value:i+1,initial:4}));
 }
 if(frame==='6:2352'){
  input(get('6:2362'),'chat.message','',{mode:'text',hint:'Nhập tin nhắn',inset:[16,0]});
  action(get('6:2358'),'sendMessage');action(get('6:2359'),'sendMessage');
  action(get('6:2374'),'call');action(get('6:2375'),'call');
  const suggestions=['Cảm ơn bạn','Bạn đến đâu rồi?','Gọi giúp mình'];
  for(const label of suggestions)action(exact(label),'quickMessage',{value:label});
  tree.children.push({id:'frontend:messages',tag:'div',x:18,y:156,width:366,height:590,fixedHeight:true,style:{position:'absolute'},children:[],_uid:frame+'|messages',_control:{kind:'messages'}});
  for(const a of all.filter(a=>a.y>155&&a.y<740&&a.n!==tree&&a.n.width>80))a.n._removed=true;
 }
 // Editable multiline boxes and upload rows found throughout the modern forms.
 for(const a of all){
  if(a.n._removed||a.n._control||a.n.width<100)continue;
  if(a.n.name==='Tài liệu đã đính kèm')action(a,/Ảnh/.test(a.text)?'pickImage':'pickDocument',{key:screen.name+'.file.'+slug(a.text.slice(0,30))});
  if(a.n.style?.display==='flex'&&a.n.style.direction==='row'&&a.n.width>200&&a.n.height<=70&&
     a.n.children?.[0]?.width<=28&&/^(Tôi đã|Tôi đồng|Có túi|Không mở|Giao trực|Chưa ăn|Đóng hộp|Không có dấu|Đủ 15|Đã quét)/.test(a.text)){
    checkbox(a,screen.name+'.check.'+slug(a.text.slice(0,40)),true);
  }
 }
 // Concrete behavior for the visible actions previously missing an interaction.
 for(const a of all){
  if(a.n._removed||!a.text||a.text.length>90)continue;
  if(a.n._control?.kind==='action'&&a.n._control.action==='navigate'){
   const actionMap={
    'Đăng tin ngay':'publish','Lưu và thông báo':'editListing','Đóng tin đăng':'closeListing',
    'Gửi yêu cầu nhận':'requestFood','Đăng nhu cầu':'addNeed','Xác nhận đã phân phát':'distribute',
    'Xác nhận hủy yêu cầu':'cancelOrder','Gửi lời cảm ơn':'sendThanks','Gửi yêu cầu hỗ trợ':'submitTicket',
    'Gửi đánh giá':'saveReview','Đăng xuất':'logout','Tạo mã mới':'renewCode',
   };
   if(actionMap[a.text]&&!['6:1155','6:1282','6:1525'].includes(frame))a.n._control.action=actionMap[a.text];
   const hit=knownActions.find(([re])=>re.test(a.text));if(hit)a.n._control.action=hit[1];
  }
  if(a.n.name==='Button'&&!a.n._control){
   const routes={'Hủy thay đổi':'/user/donor/listing-detail','Giữ tin':'/user/donor/listing-detail',
    'Chọn tổ chức này':'/user/donor/pickup-schedule','Dùng ảnh này':'/user/donor/facility-photos',
    'Đăng tin ngay':'/user/donor/publish-success','Gửi yêu cầu nhận':'/user/organization/request-pending',
    'Đăng nhu cầu':'/user/organization/needs','Gửi lời cảm ơn':'/user/organization/thank-you-sent'};
   if(routes[a.text])action(a,'route',{route:routes[a.text]});
  }
 }
 // Donor Impact is not donation history. Override both dashboard links.
 if(frame==='6:319')action(get('66:1257'),'route',{route:'/user/donor/impact-report'});
 if(frame==='6:517')for(const [id,value]of [['74:1388','draft.summary'],['74:1391','draft.storage'],['74:1394','draft.allergens'],['74:1397','draft.expiry'],['74:1400','draft.pickup'],['74:1403','draft.address']])byId(id,{kind:'computed',value});
 if(frame==='6:1282')for(const [id,value]of [['73:1136','selected.name'],['73:1137','selected.donor'],['73:1145','selected.remaining'],['73:1143','selected.storage'],['73:1158','selected.pickup'],['73:1159','selected.allergens']])byId(id,{kind:'computed',value});
 if(frame==='6:843'){byId('6:1016',{kind:'computed',value:'handover.pin'});byId('6:852',{kind:'qr'});}
 if(frame==='6:1971'){
  action(get('6:2031'),'directions');action(get('6:2032'),'route',{route:'/user/volunteer/pickup-photo'});
  checkbox(get('6:2023'),'pickup.countChecked',true);checkbox(get('6:2024'),'pickup.conditionChecked',true);
 }
 if(frame==='6:2041'){
  action(get('6:2049'),'cameraNext',{key:'pickup.photo',source:'84:1694'});
  action(get('6:2058'),'pickImage',{key:'pickup.photo'});action(get('6:2042'),'camera',{key:'pickup.photo'});
 }
 if(frame==='6:1944'){action(get('6:1955'),'acceptJob',{source:'84:1615'});action(get('6:1956'),'back');}
 if(frame==='65:1068'){byId('65:1078',{kind:'scanner'});action(get('65:1094'),'confirmPickup',{source:'65:1094'});}
 if(frame==='65:1260'){
  choice(get('65:1277'),'support.reason','Thiếu / hỏng hàng','Thiếu / hỏng hàng');choice(get('65:1279'),'support.reason','Giao trễ','Thiếu / hỏng hàng');
  input(get('65:1281'),'support.detail','Hai hộp bị đổ trong quá trình vận chuyển. Tổ chức nhận được 13 hộp nguyên vẹn.',{mode:'multiline'});
  action(get('65:1282'),'pickImage',{key:'support.photo'});action(get('65:1293'),'submitTicket');
 }
 if(frame==='6:2995'){
  for(const id of ['6:2998','6:3004','6:3010','6:3014'])choice(get(id),'support.reason',get(id)?.text,'Hỏng xe/ hết xăng');
  input(get('6:3018'),'support.detail','',{mode:'multiline',hint:'Mô tả sự cố của bạn'});action(get('6:3020'),'pickImage',{key:'support.photo'});action(get('6:3033'),'submitTicket');
  delete get('6:2999').n._control;
 }
 if(frame==='6:295'){
  input(get('98:1271'),'auth.otp','',{hint:'123456',mode:'number'});action(get('98:1296'),'resendCode');
 }
 if(frame==='6:3516')action(get('6:3566'),'confirmSchedule',{source:'84:1670'});
 if(frame==='6:723'){
  ['6:738','6:746','6:754','6:762','6:770'].forEach(id=>{if(get(id))get(id).n._removed=true;});
  tree.children.push({id:'frontend:history',tag:'div',x:16,y:175,width:370,height:615,fixedHeight:true,style:{position:'absolute'},children:[],_control:{kind:'collection',collection:'history'}});
  byId('6:733',{kind:'computed',value:'impact.meals'});byId('6:736',{kind:'computed',value:'impact.orders'});
 }
 if(frame==='6:319'){
  for(const [id,value]of [['I66:1229;60:567','donor.openCount'],['I66:1233;60:567','donor.pendingCount'],['66:1243','donor.pendingSummary'],['66:1244','donor.pendingFood']])byId(id,{kind:'computed',value});
 }
 if(frame==='6:1155')action(get('66:1412'),'openFood',{foodId:'SM-2039'});
 if(frame==='6:1737')action(get('66:1585'),'nearestJob');
 if(frame==='6:1801'){
  all.filter(a=>a.parent===tree&&a.y>170&&a.y<800&&a.n!==nav?.n).forEach(a=>a.n._removed=true);
  choice(get('6:1809'),'jobs.view','Danh sách','Danh sách');choice(get('6:1810'),'jobs.view','Bản đồ','Danh sách');
  ['6:1813','6:1816','6:1819','6:1825'].forEach((id,i)=>choice(get(id),'jobs.filter',['Gần nhất','Cần gấp','Dưới 3 km','Có tủ Lạnh'][i],'Gần nhất'));
  tree.children.push({id:'frontend:jobs',tag:'div',x:20,y:175,width:362,height:615,fixedHeight:true,style:{position:'absolute'},children:[],_control:{kind:'collection',collection:'jobs'}});
 }
 if(frame==='65:1427')for(const id of ['65:1438','65:1440','65:1442','65:1444'])choice(get(id),'shift.day',get(id)?.text,'T5 29');
 // Native header actions must survive flattened Figma component wrappers.
 for(const b of behavior.nodes.filter(b=>b.reactions.length&&/notifications/i.test(b.name))){
  const icon=all.filter(a=>a.x>310&&a.y<95&&a.n.width>=20&&a.n.width<=45&&a.n.height>=20&&a.n.height<=45&&(a.n.children?.length||a.n.src)).sort((a,b)=>a.depth-b.depth)[0];
  action(icon,'route',{route:screen.group==='admin'?'/admin/notifications':'/shared/notifications'});
 }
 if(frame==='6:2232'){
  for(const a of all.filter(a=>a.n.text==='Đăng ký'))action(a,'route',{route:'/user/volunteer/shift-registration'});
  action(get('6:2274'),'cancelShift');
  for(const id of ['6:2262','6:2263','6:2264','6:2265','6:2266'])choice(get(id),'calendar.day',get(id)?.text,'11');
  action(get('6:2275'),'route',{route:'/user/volunteer/delivery-tracking'});
 }
 if(frame==='65:1427')for(const a of all.filter(a=>a.n._control?.action==='navigate'&&a.text==='Đăng ký ca này'))a.n._control.action='registerShift';
 if(frame==='65:1470')action(get('65:1508'),'cancelOrder');
 if(frame==='6:609'){
  for(const id of ['6:619','6:640'])if(get(id))get(id).n._removed=true;
  tree.children.push({id:'frontend:requests',tag:'div',x:16,y:135,width:370,height:620,fixedHeight:true,style:{position:'absolute'},children:[],_control:{kind:'collection',collection:'requests'}});
 }
 if(frame==='6:1654'){
  for(const [id,value]of [['6:1657','Tháng'],['6:1659','Năm'],['6:1660','Tuần']])choice(get(id),'impact.period',value,'Tháng');
  for(const [id,value]of [['6:1663','impact.meals'],['6:1666','impact.kg'],['6:1669','impact.orders']])byId(id,{kind:'computed',value});
  byId('6:1670',{kind:'impactChart'});byId('6:1685',{kind:'impactCategories'});
 }
 if(frame==='6:3712'){
  ['62:830','62:832','62:834'].forEach((id,i)=>choice(get(id),'admin.queueFilter',['all','donor','charity'][i],'all'));
  byId('62:842',{kind:'conditional',key:'admin.queueFilter',allowed:['all','donor'],initial:'all'});
  byId('62:858',{kind:'conditional',key:'admin.queueFilter',allowed:['all','charity'],initial:'all'});
  byId('62:869',{kind:'conditional',key:'admin.queueFilter',allowed:['all','volunteer'],initial:'all'});
 }
 for(const a of all.filter(a=>/eye|visibility/i.test(a.n.name)&&a.n.width<=30&&a.n.height<=30)){
  const field=all.filter(f=>f.n._control?.kind==='input'&&f.n._control.mode==='password').sort((a,b)=>Math.abs(a.y-a.y)-Math.abs(b.y-a.y))[0];
  if(field)action(a,'togglePassword',{key:field.n._control.key});
 }
 if(frame==='6:1573'){
  choice(get('6:1578'),'receipt.condition','Tốt, đúng mô tả','Tốt, đúng mô tả');
  choice(get('6:1574'),'receipt.condition','Có vấn đề','Tốt, đúng mô tả',{palette:'amber'});
  input(get('6:1576'),'receipt.note','',{hint:'Ví dụ: hộp còn ấm, đủ số lượng...',mode:'multiline'});
  byId('6:1608',{kind:'value',key:'receipt.quantity',initial:15});
  byId('6:1609',{kind:'step',key:'receipt.quantity',delta:-1,initial:15,min:0,maxKey:'order.quantity'});
  byId('6:1610',{kind:'step',key:'receipt.quantity',delta:1,initial:15,min:0,maxKey:'order.quantity'});
  action(get('6:1599'),'pickImage',{key:'receipt.photo'});action(get('6:1581'),'inspectFood');
  action(get('6:1611'),'confirmReceipt',{source:'84:1602'});
 }
 if(frame==='6:2904')for(const [id,v]of [['6:2909','Món nóng'],['6:2910','Đồ lạnh'],['6:2911','Khô/ bánh']])choice(get(id),'packaging.type',v,'Món nóng');
 if(frame==='6:3039')for(const id of ['6:3050','6:3051','6:3052'])choice(get(id),'transfer.reason',get(id)?.text,'Có việc đột xuất');
 if(frame==='6:2937'){
  for(const a of all.filter(a=>/^\d$/.test(a.text)&&a.n.width>80&&a.n.height>40))action(a,'pinDigit',{value:a.text});
  const digits=all.filter(a=>a.parent===tree&&a.n.id&&a.n.width===52&&a.n.height===65).sort((a,b)=>a.x-b.x);
  digits.forEach((a,i)=>bind(a,{kind:'pinCell',index:i}));
  action(get('6:2992'),'pinErase');
  action(get('6:2939'),'verifyPin',{source:'84:1652'});
 }
 // Bind labels and quantities that continue across the listing wizard/details.
 if(['6:517','6:1064','6:560','6:1282','6:1333','6:3305'].includes(frame)){
  const draft=['6:517'].includes(frame);
  for(const a of all){if(a.n.text==='Cơm gà xối mỡ')bind(a,{kind:'computed',value:draft?'draft.name':'selected.name'});}
  if(frame==='6:517')for(const a of all){if(a.n.text==='20 suất')bind(a,{kind:'computed',value:'draft.quantity'});if(a.n.text==='Còn nóng')bind(a,{kind:'computed',value:'draft.storage'});}
 }
 if(frame==='6:517')byId('74:1386',{kind:'photo',key:'food.photo'});
 if(frame==='6:1282')byId('73:1141',{kind:'photo',key:'selected.photo'});
 if(frame==='65:1098'){
  byId('65:1111',{kind:'computed',value:'receipt.pin'});
  byId('88:1334',{kind:'qr',purpose:'receipt'});
  const image=all.find(a=>a.n.width>150&&a.n.width<260&&a.n.height>150&&a.n.height<260&&!a.text);if(image)bind(image,{kind:'qr',purpose:'receipt'});
 }
 if(frame==='6:3039'){
  ['6:3053','6:3061','6:3067'].forEach((id,i)=>choice(get(id),'transfer.recipient',['Minh Toàn','Minh Nhật','Mọi tình nguyện viên'][i],'Minh Toàn',{radio:true}));
  action(get('6:3075'),'transferJob');
 }
 if(['6:3798','77:1321','77:1384'].includes(frame)){
  const section=all.find(a=>a.text.startsWith('Điều kiện phê duyệt')&&a.n.width>300&&a.n.height>70&&a.n.height<220);
  if(section){section.n.children.filter(n=>n.width>200&&n.height<40&&text(n)&&!text(n).startsWith('Điều kiện')).forEach((n,i)=>checkbox(n,'admin.audit.'+frame+'.'+i,false));}
 }
 for(const [pattern,kind]of knownActions){
  const labels=[...new Set(all.filter(a=>a.text&&a.text.length<90&&pattern.test(a.text)).map(a=>a.text))];
  for(const label of labels){const a=exact(label);if(a&&!a.n._control)action(a,kind);}
 }
 if(frame==='6:3076'){
  for(const [id,value]of [['6:3097','receipt.donor'],['6:3098','receipt.organization'],['6:3099','receipt.driver'],['6:3100','receipt.quantity'],['6:3101','empty'],['6:3102','empty'],['6:3103','notEstimated'],['6:3104','notEstimated'],['6:3107','selected.name'],['6:3108','empty'],['6:3109','empty'],['6:3135','receipt.id']])byId(id,{kind:'computed',value});
 }
 if(frame==='6:1614')byId('6:1649',{kind:'computed',value:'warehouse.summary'});
 if(frame==='6:2904'){
  ['6:2913','6:2918','6:2923','6:2928'].forEach((id,i)=>byId(id,{kind:'computed',value:'guide.title.'+i}));
  ['6:2914','6:2919','6:2924','6:2929'].forEach((id,i)=>byId(id,{kind:'computed',value:'guide.body.'+i}));
  byId('6:2933',{kind:'computed',value:'guide.warning'});
 }
 if(frame==='65:1332')for(const [id,value]of [['I65:1343;60:567','warehouse.balance'],['I65:1347;60:567','warehouse.distributed'],['65:1361','warehouse.ratio']])byId(id,{kind:'computed',value});
 // Native onboarding and calendar panels replace static samples, not whole routes.
 function nativePanel(id,kind){const a=get(id);if(!a)return;bind(a,{kind});a.n.children=[];a.n.style={position:a.n.style?.position||'relative'};return a.n;}
 function nativeAction(id,command,enabledWhen){const a=get(id);action(a,command,{...(enabledWhen?{enabledWhen,enabledBackground:'rgb(0,102,66)',disabledBackground:'rgb(192,207,198)'}:{})});if(enabledWhen&&a)descendants(a.n,n=>{if(n.text)bind(n,{kind:'enabledLabel',enabledWhen});});}
 function requireChecks(a,keys){if(!a)return;Object.assign(a.n._control,{requiredChecks:keys,enabledWhen:'requiredChecks',enabledBackground:'rgb(0,102,66)',disabledBackground:'rgb(192,207,198)'});descendants(a.n,n=>{if(n.text)bind(n,{kind:'enabledLabel',requiredChecks:keys,enabledWhen:'requiredChecks'});});}
 if(frame==='6:2711'){
  nativePanel('6:2736','licenseFields');
  const photo=nativePanel('6:2723','licensePhoto');photo.style.radius=[20,20,20,20];
  Object.assign(photo._control,{action:'pickImage',key:'license.photo',label:'Chọn ảnh giấy phép'});
  action(get('6:2720'),'camera',{key:'license.photo'});
  nativeAction('6:2717','licenseContinue','licensePhoto');
  // This old button stores its rounded fill in a child rectangle, not the wrapper.
  Object.assign(get('6:2717').n._control,{enabledBackground:'transparent',disabledBackground:'transparent'});
  byId('6:2718',{kind:'enabledPaint',enabledWhen:'licensePhoto',enabledBackground:'rgb(0,102,66)',disabledBackground:'rgb(192,207,198)'});
  // The sample scanner rectangle is not evidence of a successful OCR operation.
 }
 if(frame==='6:2754'){
  const panel=nativePanel('6:2761','facilityPhotos');panel.height=656;
  nativeAction('6:2760','facilityContinue','facilityComplete');
 }
 if(frame==='6:2805'){
  const panel=nativePanel('6:2811','safetyCommitments');panel.x=20;panel.width=362;panel.height=666;
  nativeAction('6:2810','submitCommitment','commitmentComplete');
 }
 if(frame==='6:2232'){
  for(const a of all)if(a.parent===tree&&a.n!==nav?.n)a.n._removed=true;
  tree.children.push({id:'frontend:calendar',name:'Interactive volunteer calendar',tag:'div',x:0,y:0,width:402,height:807,fixedHeight:true,style:{position:'absolute'},children:[],_control:{kind:'volunteerCalendar'}});
 }
 if(frame==='65:1427')nativePanel('65:1436','shiftRegistration');
 if(frame==='6:2504'){nativePanel('66:1711','profileSummary');get('66:1710').n.height=722;}
 if(frame==='6:4055')nativePanel('64:1033','verificationHero');
 if(frame==='6:2904')for(const [i,id] of ['6:2912','6:2917','6:2922','6:2927'].entries()){nativePanel(id,'packagingStep');get(id).n._control.index=i;}
 if(frame==='64:1314'){
  checkbox(get('64:1344'),'verification.individual.consent',false);
  requireChecks(exact('Gửi hồ sơ cá nhân'),['verification.individual.consent']);
 }
 if(frame==='64:880'){
  checkbox(get('64:925'),'verification.organization.consent',false);
  requireChecks(exact('Gửi hồ sơ tổ chức'),['verification.organization.consent']);
  get('64:916').n.text='Chưa tải giấy tờ lên';
 }
 if(frame==='64:933'){
  const checks=['bag','sealed','recipient'].map(key=>'verification.volunteer.'+key);
  ['64:971','64:975','64:979'].forEach((id,i)=>checkbox(get(id),checks[i],false));
  requireChecks(exact('Gửi hồ sơ tình nguyện viên'),checks);
 }
 if(['6:3798','77:1321','77:1384'].includes(frame))requireChecks(exact('Phê duyệt hồ sơ'),[0,1,2].map(i=>'admin.audit.'+frame+'.'+i));
 // Replace entire overlapping regions, including zero-size wrappers whose
 // children paint outside their bounds. Never layer a live list over sample cards.
 function insertNative(id,kind,x,y,width,height,extra={}){tree.children.push({id,tag:'div',x,y,width,height,fixedHeight:true,style:{position:'absolute'},children:[],_control:{kind,...extra}});}
 if(frame==='6:2504'){tree.children=[];tree._control={kind:'profilePage'};}
 if(frame==='6:1801'){tree.children=[];tree._control={kind:'deliveryJobsPage'};tree.style.background='rgb(245,248,245)';tree.style.backgroundImage='none';}
 if(frame==='6:609'){
  tree.children=tree.children.filter(n=>n.id==='6:616');
  insertNative('frontend:requests-header','pageHeader',0,0,402,76,{title:'Yêu cầu nhận',subtitle:'Đối chiếu và chọn tổ chức nhận phù hợp'});
  insertNative('frontend:requests-panel','requestMatchingPanel',16,88,370,664);
 }
 if(frame==='6:1023'){
  tree.children=[];
  insertNative('frontend:matching-header','pageHeader',0,0,402,76,{title:'Gợi ý ghép nối',subtitle:'Ưu tiên phù hợp về số suất và khoảng cách'});
  insertNative('frontend:matching-panel','requestMatchingPanel',16,90,370,760,{matching:true});
 }
 if(frame==='6:560'){const panel=nativePanel('6:571','listingSummary');panel.height=344;panel.y=80;nativePanel('6:584','listingRequestsPrompt');}
 if(frame==='6:1064'){
  nativePanel('6:1071','publishSummary');
  const label=get('6:1070');label.n.text='Tin đã sẵn sàng. Xem các yêu cầu nhận và gợi ý ghép nối phù hợp.';label.n.children=[];
 }
 if(frame==='6:416'){
  const hero=all.find(a=>a.n.width>330&&a.n.height>160&&a.n.height<210&&a.text.includes('Mới nấu'));
  if(hero)nativePanel(hero.n.id,'foodSafetyHero');
 }
 if(frame==='6:473'){const panel=nativePanel('74:1266','mealMap');panel._control.editable=true;nativePanel('74:1293','pickupDetails');}
 if(frame==='6:370')byId('74:1071',{kind:'photo',key:'food.photo'});
 if(frame==='62:994')nativePanel('62:1029','mealMap');
 if(frame==='6:1525')nativePanel('110:1166','mealMap');
 if(frame==='6:1890'){
  tree.children=tree.children.filter(n=>n.id==='6:1911');
  insertNative('frontend:job-header','pageHeader',0,0,402,76,{title:'Chi tiết chuyến giao',subtitle:'Kiểm tra món và điểm nhận trước khi nhận chuyến'});
  insertNative('frontend:job-details','deliveryJobDetails',16,88,370,700);
 }
 if(frame==='6:661'){
  const map=nativePanel('6:671','mealMap');map.height=127;
  nativePanel('6:680','handoverTimeline');
  const contact=nativePanel('6:711','courierContact');contact.height=94;
 }
 if(frame==='6:1971'){
  nativePanel('6:1984','mealMap').x=22;
  nativePanel('6:2004','pickupContact');
  for(const id of ['6:2005','6:2006','6:2007','6:2008','6:2009','6:2010','6:2011','6:2012','6:2015','6:2016'])get(id).n._removed=true;
 }
 if(frame==='6:1944'){
  nativePanel('6:1954','deliveryAcceptanceSummary');
  for(const id of ['6:1964','6:1965','6:1966','6:1967','6:1968','6:1969'])get(id).n._removed=true;
 }
 if(frame==='6:2064'){
  for(const id of ['6:2066','6:2067','6:2068','6:2069','6:2071','6:2072','6:2073','6:2074','6:2075','6:2076','6:2077','6:2079','6:2083','6:2094'])if(get(id))get(id).n._removed=true;
  insertNative('frontend:delivery-header','pageHeader',0,0,402,76,{title:'Lộ trình giao hàng',subtitle:'Điểm lấy và thông tin chuyến đang chọn'});
  insertNative('frontend:delivery-map','mealMap',16,92,370,527);
  byId('6:2088',{kind:'computed',value:'delivery.status'});get('6:2088').n.width=340;
  byId('6:2089',{kind:'computed',value:'delivery.note'});get('6:2089').n.width=340;
 }
 // Keep the selected/unselected paints from Figma instead of imposing a new palette.
 const choiceGroups=new Map();
 for(const a of all.filter(a=>a.n._control?.kind==='choice')){const key=a.n._control.key;if(!choiceGroups.has(key))choiceGroups.set(key,[]);choiceGroups.get(key).push(a);}
 const paint=n=>n.style?.backgroundImage?.match(/rgba?\([^)]+\)/)?.[0]||n.style?.background||'transparent';
 const ink=n=>n.text!==undefined?n.style.color:(n.children||[]).map(ink).find(Boolean);
 for(const [key,items]of choiceGroups){
  const selected=items.find(a=>{const c=a.n._control;return Array.isArray(c.initial)?c.initial.includes(c.value):c.initial===c.value;})||items[0];
  const other=items.find(a=>a!==selected)||selected;
  const colors={selectedBackground:paint(selected.n),unselectedBackground:paint(other.n),selectedColor:ink(selected.n)||'rgb(0,102,66)',unselectedColor:ink(other.n)||'rgb(124,144,135)'};
  if(transparent(selected.n)&&transparent(other.n)&&selected.n.style.backgroundImage==='none'){colors.selectedBackground='rgb(227,242,233)';colors.selectedColor='rgb(0,102,66)';}
  for(const a of all.filter(a=>a.n._control?.key===key&&['choice','choiceLabel'].includes(a.n._control.kind)))Object.assign(a.n._control,colors);
 }
 function prune(n){n.children=(n.children||[]).filter(c=>!c._removed);n.children.forEach(prune);}
 prune(tree);
 const live=[],unhandled=[];function collect(n){if(n._control)live.push({uid:n._uid,nodeId:n.id,...n._control});if(n.name==='Button'&&!n._control)unhandled.push({id:n.id,label:text(n)});n.children.forEach(collect);}collect(tree);
 reports.push({frameId:frame,name:screen.group+'/'+screen.name,controls:live,unhandled});
 return tree;
}
module.exports={enhance,reports,text,slug};
