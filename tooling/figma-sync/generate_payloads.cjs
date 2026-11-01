const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..'),dir=path.join(root,'docs/figma-sync');
const screens=JSON.parse(fs.readFileSync(path.join(dir,'prepared_layers.json'),'utf8'));
const kernel=fs.readFileSync(path.join(__dirname,'figma_kernel.js'),'utf8');
const svg=JSON.parse(fs.readFileSync(path.join(dir,'svg_assets.json'),'utf8'));
const icons=JSON.parse(fs.readFileSync(path.join(dir,'icon_outlines.json'),'utf8'));
const foundations=JSON.parse(fs.readFileSync(path.join(dir,'foundations.json'),'utf8'));
const templates={};
// Same canonical key contract as figma_kernel; no Figma API is invoked here.
const tplKey=new Function(kernel.slice(kernel.indexOf('function sourceText'),kernel.indexOf('function styleKey'))+'; return tplKey;')();
function walk(n){const k=tplKey(n);if(k&&!templates[k])templates[k]=n;(n.children||[]).forEach(walk);}
screens.forEach(s=>s.panels.forEach(p=>p.layers.forEach(walk)));
const payload={svg,icons,foundations,templates:Object.entries(templates).sort((a,b)=>{
 const order=k=>k.startsWith('FoodPhoto')?0:k.includes('Button')?1:k.startsWith('ChoiceChip')?2:k.startsWith('MealBottomBar')?3:4;
 return order(a[0])-order(b[0]);
})};
fs.writeFileSync(path.join(dir,'foundation_payload.json'),JSON.stringify(payload));
console.log(JSON.stringify({templates:payload.templates.length,bytes:JSON.stringify(payload).length}));
