const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
const created=[],mutated=[],deleted=[],replacements=[];
await Promise.all(['Regular','Medium','Semi Bold','Bold'].map(style=>figma.loadFontAsync({family:'Inter',style})));
for(const row of DATA.panels){
 if(!row.replacement)continue;
 const old=await figma.getNodeByIdAsync(row.id),next=await figma.getNodeByIdAsync(row.replacement);if(!old||!next)continue;
 const parent=old.parent,index=parent.children.indexOf(old),x=old.x,y=old.y;
 parent.insertChild(index,next);if('layoutMode'in parent&&parent.layoutMode!=='NONE'){next.layoutSizingHorizontal='FIXED';next.layoutSizingVertical='FIXED';}else{next.x=x;next.y=y;}
 mutated.push(next.id);deleted.push(old.id);replacements.push({sourceId:old.id,nodeId:next.id});old.remove();
}
for(const row of DATA.reactions){const n=await figma.getNodeByIdAsync(row.nodeId);if(n){await n.setReactionsAsync(row.reactions);mutated.push(n.id);}}
const profile=await figma.getNodeByIdAsync('6:2504');
const roles=[['donor','VariableID:98:1173'],['charity','VariableID:98:1174'],['volunteer','VariableID:98:1175']];
const vars=await Promise.all(roles.map(r=>figma.variables.getVariableByIdAsync(r[1])));
for(const [oldLabel,volunteerLabel]of [['Báo cáo tác động','Huy hiệu & đóng góp'],['Suất ăn và đơn đã hoàn tất','Chuyến giao và dấu mốc của bạn']]){
 const t=profile.findAllWithCriteria({types:['TEXT']}).find(n=>n.characters===oldLabel);if(!t)continue;
 const parent=t.parent,index=parent.children.indexOf(t),holder=figma.createFrame();created.push(holder.id);holder.name='Profile contribution / current role';holder.resize(t.width,t.height);holder.fills=[];
 parent.insertChild(index,holder);holder.appendChild(t);t.x=0;t.y=0;t.setBoundVariable('visible',vars[0]);mutated.push(t.id);
 for(let i=1;i<3;i++){const clone=t.clone();created.push(clone.id);holder.appendChild(clone);clone.x=0;clone.y=0;clone.characters=i===2?volunteerLabel:oldLabel;clone.resize(Math.max(t.width,250),t.height);clone.setBoundVariable('visible',vars[i]);}
}
const paragraph=await figma.getNodeByIdAsync('6:1070');if(paragraph&&paragraph.type==='TEXT'){
 await Promise.all(paragraph.getStyledTextSegments(['fontName']).map(s=>figma.loadFontAsync(s.fontName)));
 paragraph.characters='Tin đã sẵn sàng. Xem các yêu cầu nhận và gợi ý ghép nối phù hợp.';paragraph.textAutoResize='HEIGHT';mutated.push(paragraph.id);
}
// The new screen has its own labeled section, not an overlapping duplicate flow.
const report=await figma.getNodeByIdAsync(DATA.impactId),donor=await figma.getNodeByIdAsync('79:1172');
let sec=page.children.find(n=>n.name==='04B · Tác động người cho');if(!sec){sec=figma.createSection();created.push(sec.id);sec.name='04B · Tác động người cho';sec.x=0;sec.y=10300;sec.fills=JSON.parse(JSON.stringify(donor.fills));sec.resizeWithoutConstraints(522,994);}
sec.appendChild(report);report.x=60;report.y=60;mutated.push(report.id,sec.id);
donor.resizeWithoutConstraints(donor.width,Math.max(2030,...donor.children.map(n=>n.y+n.height+54)));mutated.push(donor.id);
return {createdNodeIds:created,mutatedNodeIds:mutated,removedNodeIds:deleted,replacements,impactSectionId:sec.id};
