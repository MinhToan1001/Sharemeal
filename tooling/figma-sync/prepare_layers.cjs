const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..'),dir=path.join(root,'docs/figma-sync');
const screens=JSON.parse(fs.readFileSync(path.join(dir,'flutter_layers.json'),'utf8'));
const assets={},colors=new Map(),fonts=new Map();
function clean(n) {
  if(n.asset?.endsWith('.svg')) assets[n.asset]=fs.readFileSync(path.join(root,'frontend',n.asset),'utf8');
  if(n.color)colors.set(n.color,(colors.get(n.color)||0)+1);
  if(n.fill)colors.set(n.fill,(colors.get(n.fill)||0)+1);
  if(n.border?.color)colors.set(n.border.color,(colors.get(n.border.color)||0)+1);
  if(n.type==='text')fonts.set(`${n.size}/${n.weight}/${n.lineHeight||n.size*1.2}`,{size:n.size,weight:n.weight,lineHeight:n.lineHeight||n.size*1.2});
  n.children=(n.children||[]).map(clean);
  const meaningful=n.name&&!/^(Render|Flex item)/.test(n.name);
  if(n.type==='frame'&&!n.fill&&!n.border&&!n.clip&&(!n.radius||n.radius.every(r=>r===0))&&!meaningful&&n.children.length===1) {
    const c=n.children[0]; if(n.control&&!c.control)c.control=n.control;return c;
  }
  if(n.type==='slot'&&n.children.length===1) {
    const c=n.children[0];if(c.rect.every((v,i)=>Math.abs(v-n.rect[i])<.01))return c;
  }
  return n;
}
for(const s of screens)for(const p of s.panels){
  p.layers=p.layers.map(clean);
  if(p.kind==='bottomNav'){
    function find(n){if(n.name==='MealBottomBar')return n;for(const c of n.children||[]){const r=find(c);if(r)return r;}}
    const bar=p.layers.map(find).find(Boolean);if(bar){p.layers=[bar];p.rect=bar.rect;}
  }
}
fs.writeFileSync(path.join(dir,'prepared_layers.json'),JSON.stringify(screens));
fs.writeFileSync(path.join(dir,'svg_assets.json'),JSON.stringify(assets));
fs.writeFileSync(path.join(dir,'foundations.json'),JSON.stringify({colors:[...colors].sort((a,b)=>b[1]-a[1]),fonts:[...fonts.values()]}));
console.log(JSON.stringify({screens:screens.length,svgAssets:Object.keys(assets).length,colors:colors.size,fonts:fonts.size}));
