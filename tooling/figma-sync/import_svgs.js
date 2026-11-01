const page=await figma.getNodeByIdAsync('103:1195');await figma.setCurrentPageAsync(page);
await init(STATE);
const existing=new Map(page.findAllWithCriteria({types:['COMPONENT']}).map(n=>[n.name,n]));
for(const [asset,raw]of DATA){
 const name='SM/Flutter/SourceSVG/'+asset.split('/').pop();let c=existing.get(name);
 if(!c){
  const svg=raw.replace(/var\(--[^,]+,\s*([^)]+)\)/g,'$1');
  const f=figma.createNodeFromSvg(svg);made.push(f.id,...f.findAll(()=>true).map(n=>n.id));
  c=figma.createComponentFromNode(f);made.push(c.id);c.name=name;
  c.description='Vector icon reused from the original ShareMeal Figma assets bundled in Flutter.';
  const i=Object.keys(STATE.svgs).length;c.x=3000+(i%10)*80;c.y=500+Math.floor(i/10)*80;
 }
 STATE.svgs[asset]=c.id;
}
return {state:STATE,createdNodeIds:[...new Set(made)],count:Object.keys(STATE.svgs).length};
