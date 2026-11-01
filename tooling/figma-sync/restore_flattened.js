const p=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(p);await init(STATE);
const restored=[];
for(const row of DATA){
 const root=await figma.getNodeByIdAsync(row.frameId);
 for(const panel of row.panels){
  const name='Flutter · retained control · '+panel.nodeId;
  let f=root.children.find(n=>n.name===name);
  if(!f){f=add(figma.createFrame());root.appendChild(f);f.name=name;f.resize(panel.rect[2],panel.rect[3]);f.x=panel.rect[0];f.y=panel.rect[1];f.fills=[];f.clipsContent=false;
   for(const n of panel.layers)buildNode(n,f,panel.rect,{frameId:row.frameId,inlineSVG:row.inlineSVG});
  }
  restored.push({frameId:row.frameId,sourceId:panel.nodeId,nodeId:f.id});
 }
}
return {restored,createdNodeIds:[...new Set(made)]};
