// Converts high-fidelity Figma reference JSX into measured native layout data.
// This tool is build-time only. No HTML, React, or screenshots ship in the app.
const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm');
const {spawnSync}=require('child_process');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const babel=require('@babel/core'),{chromium}=require('playwright');
const root=path.resolve(__dirname,'../..'), refs=path.join(root,'docs/figma/reference');
const assets=path.join(root,'frontend/assets/figma');
fs.mkdirSync(assets,{recursive:true});
const unknown=new Set();
const textMetrics=JSON.parse(fs.readFileSync(path.join(root,'docs/figma/text_metrics.json'),'utf8'));
const conditionalLayout=JSON.parse(fs.readFileSync(path.join(root,'docs/figma/conditional_layout.json'),'utf8'));
const canvasSizes={};
for(const file of fs.readdirSync(path.join(root,'docs/figma/behavior')).filter(f=>f.startsWith('group_')&&f.endsWith('.json'))){
 const group=JSON.parse(fs.readFileSync(path.join(root,'docs/figma/behavior',file),'utf8'));
 for(const frame of group.frames)for(const n of frame.nodes){
  if(n.visible===false&&n.bindings?.visible)canvasSizes[n.id.replace(':','_')]=n.bounds;
 }
}
const px=x=>/^-?\d+(\.\d+)?$/.test(x)?x+'px':x;
function val(t){return t.replace(/_/g,' ').replace(/([\d%])([+-])(?=[\d.])/g,'$1 $2 ');}
function composeTransforms(css){
 const expression='transform:translate(var(--tx,0px),var(--ty,0px)) rotate(var(--rot,0deg)) scale(var(--sx,1),var(--sy,1))';
 return css.replace(/transform:(translateX|translateY|rotate|scaleX|scaleY)\(([^)]+)\)/g,
  (_,fn,value)=>({'translateX':'--tx','translateY':'--ty','rotate':'--rot','scaleX':'--sx','scaleY':'--sy'}[fn])+':'+value+';'+expression);
}
function declaration(token){
 const exact={
 'absolute':'position:absolute','relative':'position:relative','fixed':'position:fixed',
 'flex':'display:flex','inline-flex':'display:inline-flex','block':'display:block','inline':'display:inline',
 'hidden':'display:none','contents':'display:contents','grid':'display:grid','inline-grid':'display:inline-grid',
 'place-items-start':'place-items:start','justify-self-stretch':'justify-self:stretch',
 'flex-col':'flex-direction:column','flex-row':'flex-direction:row',
 'flex-wrap':'flex-wrap:wrap','flex-nowrap':'flex-wrap:nowrap',
 'items-start':'align-items:flex-start','items-center':'align-items:center','items-end':'align-items:flex-end',
 'items-stretch':'align-items:stretch','items-baseline':'align-items:baseline',
 'justify-start':'justify-content:flex-start','justify-center':'justify-content:center',
 'justify-end':'justify-content:flex-end','justify-between':'justify-content:space-between',
 'justify-around':'justify-content:space-around','justify-evenly':'justify-content:space-evenly',
 'self-start':'align-self:flex-start','self-center':'align-self:center','self-end':'align-self:flex-end',
 'self-stretch':'align-self:stretch','shrink-0':'flex-shrink:0','shrink':'flex-shrink:1','grow':'flex-grow:1',
 'flex-1':'flex:1 1 0%','flex-auto':'flex:1 1 auto','flex-none':'flex:none',
 'overflow-clip':'overflow:clip','overflow-hidden':'overflow:hidden','overflow-auto':'overflow:auto',
 'overflow-x-clip':'overflow-x:clip','overflow-y-auto':'overflow-y:auto',
 'overflow-x-auto':'overflow-x:auto','overflow-y-scroll':'overflow-y:scroll',
 'overflow-visible':'overflow:visible','object-cover':'object-fit:cover','object-contain':'object-fit:contain',
 'object-fill':'object-fit:fill','object-center':'object-position:center',
 'size-full':'width:100%;height:100%','w-full':'width:100%','h-full':'height:100%',
 'w-screen':'width:100vw','h-screen':'height:100vh','w-fit':'width:fit-content','h-fit':'height:fit-content',
 'w-auto':'width:auto','h-auto':'height:auto','min-w-px':'min-width:1px','min-h-px':'min-height:1px',
 'min-w-0':'min-width:0','min-h-0':'min-height:0','max-w-none':'max-width:none','max-w-full':'max-width:100%',
 'min-w-full':'min-width:100%','h-px':'height:1px','left-px':'left:1px','top-px':'top:1px','bottom-px':'bottom:1px',
 'border-black':'border-color:#000','border-white':'border-color:#fff','border-3':'border-width:3px','border-5':'border-width:5px',
 'font-light':'font-weight:300','top-1/4':'top:25%',
 'translate-x-full':'transform:translateX(100%)','-translate-x-full':'transform:translateX(-100%)',
 '-scale-x-100':'transform:scaleX(-1)','-scale-y-100':'transform:scaleY(-1)',
 'bg-gradient-to-r':'background-image:linear-gradient(to right,var(--gradient-from),var(--gradient-to))',
 'inset-0':'inset:0','left-0':'left:0','top-0':'top:0','right-0':'right:0','bottom-0':'bottom:0',
 'whitespace-nowrap':'white-space:nowrap','whitespace-pre':'white-space:pre','whitespace-pre-wrap':'white-space:pre-wrap',
 'whitespace-normal':'white-space:normal','whitespace-break-spaces':'white-space:break-spaces',
 'text-left':'text-align:left','text-center':'text-align:center','text-right':'text-align:right',
 'text-justify':'text-align:justify','text-black':'color:#000','text-white':'color:#fff',
 'bg-white':'background-color:#fff','bg-black':'background-color:#000','bg-transparent':'background-color:transparent',
 'border':'border-width:1px','border-0':'border-width:0','border-2':'border-width:2px',
 'border-solid':'border-style:solid','border-dashed':'border-style:dashed','border-none':'border-style:none',
 'rounded-full':'border-radius:9999px','rounded-none':'border-radius:0',
 'font-normal':'font-weight:400','font-medium':'font-weight:500','font-semibold':'font-weight:600',
 'font-bold':'font-weight:700','font-extrabold':'font-weight:800','font-black':'font-weight:900',
 'not-italic':'font-style:normal','italic':'font-style:italic','underline':'text-decoration:underline',
 'uppercase':'text-transform:uppercase','lowercase':'text-transform:lowercase',
 'cursor-pointer':'cursor:pointer','pointer-events-none':'pointer-events:none',
 'content-stretch':'align-content:stretch','content-start':'align-content:flex-start',
 'outline-none':'outline:none','isolate':'isolation:isolate',
 'translate-x-1/2':'transform:translateX(50%)','-translate-x-1/2':'transform:translateX(-50%)',
 'translate-y-1/2':'transform:translateY(50%)','-translate-y-1/2':'transform:translateY(-50%)',
 'left-1/2':'left:50%','top-1/2':'top:50%',
 };
 if(exact[token])return exact[token];
 if(/^\[(.+):(.+)\]$/.test(token)){const m=token.match(/^\[(.+?):(.+)\]$/);return m[1]+':'+val(m[2]);}
 let m=token.match(/^(-?)([a-z-]+)-\[(.*)\]$/);
 if(m){
  let [,neg,key,v]=m;v=val(v);if(neg)v='-'+v;
  const props={w:'width',h:'height','min-w':'min-width','max-w':'max-width','min-h':'min-height','max-h':'max-height',
   left:'left',right:'right',top:'top',bottom:'bottom',gap:'gap','gap-x':'column-gap','gap-y':'row-gap',
   leading:'line-height',tracking:'letter-spacing',opacity:'opacity',z:'z-index',flex:'flex',shrink:'flex-shrink',
   grow:'flex-grow',basis:'flex-basis',inset:'inset','inset-x':null,'inset-y':null,
   rounded:'border-radius','rounded-tl':'border-top-left-radius','rounded-tr':'border-top-right-radius',
   'rounded-bl':'border-bottom-left-radius','rounded-br':'border-bottom-right-radius',shadow:'box-shadow'};
  if(key==='size')return 'width:'+v+';height:'+v;
  if(key==='font')return 'font-family:Inter';
  if(key==='text')return (/^(?:-?\d|calc\(|var\(--.*(?:size|font))/.test(v)&&!v.startsWith('color:'))?'font-size:'+v:'color:'+v.replace(/^color:/,'');
  if(key==='bg')return 'background-color:'+v;
  if(key==='from')return '--gradient-from:'+v;
  if(key==='to')return '--gradient-to:'+v;
  if(key==='grid-cols')return 'grid-template-columns:'+v;
  if(key==='grid-rows')return 'grid-template-rows:'+v;
  if(key==='skew-x')return 'transform:skewX('+v+')';
  if(key==='border-t')return 'border-top-width:'+v;
  if(key==='border')return (/^\d.*(?:px|rem|em)$/.test(v)?'border-width:':'border-color:')+v;
  if(key==='rotate')return 'transform:rotate('+v+')';
  if(key==='translate-x')return 'transform:translateX('+v+')';
  if(key==='translate-y')return 'transform:translateY('+v+')';
  if(key==='inset-x')return 'left:'+v+';right:'+v;
  if(key==='inset-y')return 'top:'+v+';bottom:'+v;
  const space=key.match(/^([pm])([xytrbl]?)$/);
  if(space){
   const p=space[1]==='p'?'padding':'margin',axis=space[2];
   const sides={x:['left','right'],y:['top','bottom'],t:['top'],r:['right'],b:['bottom'],l:['left']};
   return axis?sides[axis].map(s=>p+'-'+s+':'+v).join(';'):p+':'+v;
  }
  if(props[key])return props[key]+':'+(key==='leading'&&v==='normal'?'1.21':v);
 }
 m=token.match(/^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|w|h|size|left|top|right|bottom)-(\d+(?:\.\d+)?)$/);
 if(m)return declaration(m[1]+'-['+(Number(m[2])*4)+'px]');
 m=token.match(/^opacity-(\d+)$/);if(m)return 'opacity:'+Number(m[1])/100;
 m=token.match(/^(-?)rotate-(\d+)$/);if(m)return 'transform:rotate('+m[1]+m[2]+'deg)';
 m=token.match(/^(col|row)-(\d+)$/);if(m)return 'grid-'+(m[1]==='col'?'column':'row')+'-start:'+m[2];
 m=token.match(/^rounded-(sm|md|lg|xl|2xl|3xl)$/);if(m)return 'border-radius:'+({sm:4,md:6,lg:8,xl:12,'2xl':16,'3xl':24}[m[1]])+'px';
 // Node-ID prefixes, focus variants and accessibility utility classes have no visible geometry.
 if(token==='select-none'||token==='box-border'||token==='antialiased')return '';
 unknown.add(token);return '';
}
const decode=s=>s.replace(/&quot;/g,'"').replace(/&#x27;/g,"'").replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function toHtml(code){
 const match=code.match(/export default function\s+([A-Za-z0-9_$]+)/);
 if(!match)throw Error('Missing root function');
 code=code.replace('export default function','function');
 const js=babel.transformSync(code,{filename:'reference.tsx',configFile:false,babelrc:false,
  plugins:[[require('@babel/plugin-transform-typescript'),{isTSX:true,allExtensions:true}],
   [require('@babel/plugin-transform-react-jsx'),{runtime:'classic'}]]}).code;
 const scope=vm.createContext({React});
 const component=new vm.Script(js+'\n;'+match[1]).runInContext(scope);
 return renderToStaticMarkup(React.createElement(component));
}
async function download(url){
 const ext=new URL(url).pathname.split('.').pop(),name=new URL(url).pathname.split('/').pop();
 const file=path.join(assets,name);
 if(!fs.existsSync(file)||fs.statSync(file).size===0){
  const p=spawnSync('C:\\Windows\\System32\\curl.exe',['--fail','--silent','--show-error','-L',url,'-o',file],{encoding:'utf8'});
  if(p.status!==0)throw Error('Asset download failed '+url+': '+p.stderr);
 }
 return {url,file,asset:'assets/figma/'+name,format:ext,size:fs.statSync(file).size};
}
(async()=>{
 const selected=process.argv.slice(2).filter(x=>!x.startsWith('--'));
 const sources=fs.readdirSync(refs).filter(f=>f.endsWith('.tsx')&&(!selected.length||selected.includes(f.replace('.tsx',''))));
 const rendered=[], allUrls=new Set();
 for(const f of sources){
  const source=fs.readFileSync(path.join(refs,f),'utf8'),html=toHtml(source);
  const urls=[...source.matchAll(/https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"'\s)]+/g)].map(m=>m[0]);
  for(const url of urls)allUrls.add(url);
  const id=f.replace('.tsx','');
  rendered.push({id,html,width:canvasSizes[id]?.width||402,height:canvasSizes[id]?.height||874});
 }
 const assetMap={};
 // Keep the asset manifest complete even when remeasuring one conditional layer.
 for(const file of fs.readdirSync(refs).filter(f=>f.endsWith('.tsx'))){
  const source=fs.readFileSync(path.join(refs,file),'utf8');
  for(const match of source.matchAll(/https:\/\/www\.figma\.com\/api\/mcp\/asset\/[^"'\s)]+/g))allUrls.add(match[0]);
 }
 // Assets are downloaded only from the exact URLs supplied by get_design_context.
 for(const url of allUrls){assetMap[url]=await download(url);}
 const htmlDir=path.join(root,'docs/figma/measured-html'),layoutDir=path.join(root,'docs/figma/layout');
 fs.mkdirSync(htmlDir,{recursive:true});fs.mkdirSync(layoutDir,{recursive:true});
 const browser=await chromium.launch({executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',headless:true,args:['--allow-file-access-from-files']});
 const page=await browser.newPage({viewport:{width:402,height:874},deviceScaleFactor:1});
 for(const item of rendered){
  await page.setViewportSize({width:Math.ceil(item.width),height:Math.ceil(item.height)});
  let html=item.html;
  const tokens=new Set([...html.matchAll(/class="([^"]+)"/g)].flatMap(m=>decode(m[1]).split(/\s+/)));
  const css=[...tokens].map(t=>'[class~='+JSON.stringify(t)+']{'+composeTransforms(declaration(t))+'}').join('\n');
  for(const [url,a] of Object.entries(assetMap))html=html.split(url).join('file:///'+a.file.replaceAll('\\','/'));
  const font='file:///'+path.join(root,'frontend/assets/fonts/Inter-Variable.ttf').replaceAll('\\','/');
  const full='<!doctype html><html><head><meta charset="utf-8"><style>'+
   '@font-face{font-family:Inter;src:url("'+font+'");font-weight:100 900;font-style:normal;}'+
   '*{--tx:0px;--ty:0px;--rot:0deg;--sx:1;--sy:1;box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor;font-optical-sizing:none}*::-webkit-scrollbar{display:none}html,body{margin:0;width:'+item.width+'px;height:'+item.height+'px;font-family:Inter;font-size:16px;line-height:1.5}p,h1,h2,h3{margin:0}button,a,input{font:inherit;color:inherit;text-decoration:inherit}button{padding:0;background:transparent;text-align:inherit}img{display:block;max-width:100%}#root{width:'+item.width+'px;height:'+item.height+'px}'+css+
   '</style></head><body><div id="root">'+html+'</div></body></html>';
  const htmlFile=path.join(htmlDir,item.id+'.html');fs.writeFileSync(htmlFile,full);
  await page.goto('file:///'+htmlFile.replaceAll('\\','/'));await page.evaluate(()=>document.fonts.ready);
  const sizing=conditionalLayout[item.id.replace('_',':')];
  if(sizing?.vertical==='HUG'){
   await page.locator('#root > [data-node-id]').evaluate(el=>el.style.height='auto');
  }
  // The reference exporter sometimes reflows a one-line Figma text layer.
  // Retain the original text-layer bounds instead of changing its typography.
  await page.evaluate(metrics=>{
   for(const [id,width,height,size,autoResize] of metrics){
    const el=[...document.querySelectorAll('[data-node-id]')].find(n=>n.dataset.nodeId===id);
    if(!el)continue;
    el.style.width=width+'px';el.style.height=height+'px';
    if(autoResize==='WIDTH_AND_HEIGHT'){
     el.style.whiteSpace='nowrap';
     for(const p of el.querySelectorAll('p'))p.style.whiteSpace='nowrap';
    }else if(autoResize==='HEIGHT'&&height<=size*1.4){
     el.style.whiteSpace='normal';
     for(const p of el.querySelectorAll('p'))p.style.whiteSpace='normal';
    }
   }
  },textMetrics[item.id.replace('_',':')]||[]);
  await page.locator('img').evaluateAll(imgs=>Promise.all(imgs.map(im=>im.decode().catch(()=>{}))));
  const data=await page.evaluate(()=>{
   const num=(s,d=0)=>Number.isFinite(parseFloat(s))?parseFloat(s):d;
   function node(el){
    const cs=getComputedStyle(el),r=el.getBoundingClientRect();
    let parent=el.parentElement;
    while(parent && getComputedStyle(parent).display==='contents') parent=parent.parentElement;
    const pr=parent.getBoundingClientRect();
    const style={display:cs.display,position:cs.position,direction:cs.flexDirection,
     align:cs.alignItems,justify:cs.justifyContent,gap:num(cs.gap),rowGap:num(cs.rowGap),columnGap:num(cs.columnGap),
     overflowX:cs.overflowX,overflowY:cs.overflowY,background:cs.backgroundColor,backgroundImage:cs.backgroundImage,
     radius:[cs.borderTopLeftRadius,cs.borderTopRightRadius,cs.borderBottomRightRadius,cs.borderBottomLeftRadius].map(x=>num(x)),
     borderWidths:[cs.borderTopWidth,cs.borderRightWidth,cs.borderBottomWidth,cs.borderLeftWidth].map(x=>num(x)),
     borderColors:[cs.borderTopColor,cs.borderRightColor,cs.borderBottomColor,cs.borderLeftColor],
     padding:[cs.paddingTop,cs.paddingRight,cs.paddingBottom,cs.paddingLeft].map(x=>num(x)),
     opacity:num(cs.opacity,1),shadow:cs.boxShadow,color:cs.color,fontSize:num(cs.fontSize),
     fontFamily:cs.fontFamily,fontWeight:num(cs.fontWeight,400),lineHeight:cs.lineHeight,
     textAlign:cs.textAlign,whiteSpace:cs.whiteSpace,letterSpacing:num(cs.letterSpacing),
     transform:originalTransforms.get(el)||'none',decoration:cs.textDecorationLine,objectFit:cs.objectFit};
    const result={id:el.dataset.nodeId||el.id?.replace(/^node-/,'').replaceAll('_',':')||null,
     name:el.dataset.name||'',tag:el.tagName.toLowerCase(),
     fixedHeight: /(?:^|\s)(?:h|size)-/.test(el.getAttribute('class')||'') || !!el.style.height,
     x:r.x-pr.x+el.parentElement.scrollLeft,y:r.y-pr.y+el.parentElement.scrollTop,
     width:r.width,height:r.height,style};
    if(el.tagName==='IMG'){result.src=el.getAttribute('src');return result;}
    const children=[...el.children];
    if(!children.length||children.every(c=>c.tagName==='BR')){
     result.text=el.textContent;result.children=[];
    }else{
     result.children=[];
     for(const child of el.childNodes){
      if(child.nodeType===Node.ELEMENT_NODE)result.children.push(node(child));
      else if(child.nodeType===Node.TEXT_NODE&&child.textContent.trim()){
       const range=document.createRange();range.selectNode(child);const tr=range.getBoundingClientRect();
       result.children.push({id:null,name:'text',tag:'text',x:tr.x-r.x,y:tr.y-r.y,width:tr.width,height:tr.height,style:{...style,background:'rgba(0, 0, 0, 0)',shadow:'none',borderWidths:[0,0,0,0]},text:child.textContent,children:[]});
      }
     }
    }
    return result;
   }
   const originalTransforms=new Map([...document.querySelectorAll('*')].map(el=>[el,getComputedStyle(el).transform]));
   const noTransforms=document.createElement('style');
   noTransforms.textContent='*{transform:none!important}';
   document.head.appendChild(noTransforms);
   const result=node(document.querySelector('#root > [data-node-id]') ||
       [...document.querySelector('#root').children].find(el => el.tagName !== 'LINK'));
   noTransforms.remove();
   return result;
  });
  if(sizing?.vertical==='HUG')data.fixedHeight=false;
  fs.writeFileSync(path.join(layoutDir,item.id+'.json'),JSON.stringify(data,null,2));
  await page.screenshot({path:path.join(layoutDir,item.id+'.reference-code.png')});
  console.log(JSON.stringify({id:item.id,measured:true}));
 }
 fs.writeFileSync(path.join(root,'docs/figma/asset_manifest.json'),JSON.stringify(Object.values(assetMap),null,2));
 fs.writeFileSync(path.join(root,'docs/figma/unknown_classes.json'),JSON.stringify([...unknown],null,2));
 await browser.close();
 console.log(JSON.stringify({screens:rendered.length,assets:Object.keys(assetMap).length,unknown:[...unknown]}));
})().catch(e=>{console.error(e.stack);process.exit(1);});
