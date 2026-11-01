const page=await figma.getNodeByIdAsync('103:1195');
await figma.setCurrentPageAsync(page);
const state={colors:DATA.existingColors,floats:{'radius/12':'VariableID:60:555','radius/16':'VariableID:60:556','radius/24':'VariableID:60:557'},styles:{},icons:{},svgs:{},templates:{}};
const createdVariables=[],createdStyles=[];
const vs=await figma.variables.getLocalVariablesAsync();
await init(state);
let collection=(await figma.variables.getLocalVariableCollectionsAsync()).find(c=>c.name==='ShareMeal / Flutter additions');
if(!collection)collection=(await createVariableCollection('ShareMeal / Flutter additions',['Default'])).collection;
const mode=collection.modes[0].modeId;
for(const [raw]of DATA.foundations.colors){
 const h='ff'+raw.slice(2);if(raw.slice(0,2)==='00'||state.colors[h])continue;
 let v=vs.find(v=>v.name==='flutter/color/'+h.slice(2));
 if(!v){
  const defs=[{name:'flutter/primitive/'+h.slice(2),type:'COLOR',values:{Default:{...argb(h),a:1}},scopes:[],codeSyntax:{ANDROID:'Color(0x'+h+')'}}];
  const prim=(await createSemanticTokens(collection,{Default:mode},defs)).variables[defs[0].name];
  const alias={name:'flutter/color/'+h.slice(2),type:'COLOR',values:{Default:{type:'VARIABLE_ALIAS',id:prim.id}},scopes:['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'],codeSyntax:{ANDROID:'Color(0x'+h+')'}};
  v=(await createSemanticTokens(collection,{Default:mode},[alias])).variables[alias.name];createdVariables.push(prim.id,v.id);
 }
 state.colors[h]=v.id;V[h]=v;
}
const rad=new Set();for(const [,n]of DATA.templates){function w(n){for(const r of n.radius||[])if(r>0)rad.add(r);(n.children||[]).forEach(w);}w(n);}
for(const r of rad){const k='radius/'+r;if(state.floats[k])continue;let v=vs.find(v=>v.name==='flutter/'+k);if(!v){v=figma.variables.createVariable('flutter/'+k,collection,'FLOAT');v.scopes=['CORNER_RADIUS'];v.setValueForMode(mode,r);v.setVariableCodeSyntax('ANDROID',`Radius.circular(${r})`);createdVariables.push(v.id);}state.floats[k]=v.id;V[k]=v;}
await Promise.all(Object.values(weightStyle).map(style=>figma.loadFontAsync({family:'Inter',style})));
const styles=await figma.getLocalTextStylesAsync();
for(const s of DATA.foundations.fonts){
 const key=styleKey(s),name='ShareMeal/Flutter/'+key;
 let st=styles.find(x=>x.name===name)||styles.find(x=>x.fontName.family==='Inter'&&x.fontName.style===weightStyle[s.weight]&&x.fontSize===s.size&&x.lineHeight.unit==='PIXELS'&&Math.abs(x.lineHeight.value-s.lineHeight)<.01);
 if(!st){st=figma.createTextStyle();st.name=name;st.fontName={family:'Inter',style:weightStyle[s.weight]||'Regular'};st.fontSize=s.size;st.lineHeight={unit:'PIXELS',value:s.lineHeight};createdStyles.push(st.id);}
 state.styles[key]=st.id;ST[key]=st;
}
for(const [cp,svg]of Object.entries(DATA.icons)){
 const name='SM/Flutter/Icon/'+cp;
 let c=page.findAllWithCriteria({types:['COMPONENT']}).find(n=>n.name===name);
 if(!c){const f=figma.createNodeFromSvg(svg.replaceAll('currentColor','#006642'));made.push(f.id,...f.findAll(()=>true).map(n=>n.id));c=figma.createComponentFromNode(f);made.push(c.id);c.name=name;c.description='Editable vector from the Material Icons font bundled with the Flutter app.';const i=Object.keys(state.icons).length;c.x=3000+(i%10)*80;c.y=Math.floor(i/10)*80;recolorIcon(c,'ff006642');}
 state.icons[cp]=c.id;
}
return {state,createdNodeIds:[...new Set(made)],createdVariableIds:createdVariables,createdStyleIds:createdStyles,collectionId:collection.id,counts:{colors:Object.keys(state.colors).length,styles:Object.keys(state.styles).length,icons:Object.keys(state.icons).length}};
