/**
 * createVariableCollection
 *
 * Creates a new Figma variable collection with the specified name and modes.
 * If `modeNames` has more than one entry, the first mode is renamed from
 * Figma's default "Mode 1" to the first name, and additional modes are added.
 *
 * @param {string} name - The display name of the collection (e.g. "Color", "Spacing").
 * @param {string[]} modeNames - Ordered list of mode names (e.g. ["Light", "Dark"] or ["Value"]).
 * @returns {Promise<{
 *   collection: VariableCollection,
 *   modeIds: Record<string, string>
 * }>}
 *   `modeIds` maps each mode name to its modeId string.
 */
async function createVariableCollection(name, modeNames) {
  if (!modeNames || modeNames.length === 0) {
    throw new Error('createVariableCollection: modeNames must have at least one entry.')
  }

  // Create the collection — Figma always creates it with one mode named "Mode 1".
  const collection = figma.variables.createVariableCollection(name)

  // modeIds accumulator
  const modeIds = {}

  // Rename the default first mode
  const defaultMode = collection.modes[0]
  collection.renameMode(defaultMode.modeId, modeNames[0])
  modeIds[modeNames[0]] = defaultMode.modeId

  // Add additional modes
  for (let i = 1; i < modeNames.length; i++) {
    const newModeId = collection.addMode(modeNames[i])
    modeIds[modeNames[i]] = newModeId
  }

  return { collection, modeIds }
}
/**
 * createSemanticTokens
 *
 * Creates a batch of Figma variables in the given collection, one per entry in
 * `tokenMap`. Supports raw values, variable alias references, code syntax, and
 * scopes. Returns a map of token name → Variable for use in subsequent steps.
 *
 * @param {VariableCollection} collection - The target variable collection.
 * @param {Record<string, string>} modeIds - Map of {modeName: modeId} from createVariableCollection.
 * @param {Array<{
 *   name: string,
 *   type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN' | 'TIMING' | 'EASING',
 *   values: Record<string, string | number | boolean | MotionEasing | {type: 'VARIABLE_ALIAS', id: string}>,
 *   scopes?: VariableScope[],
 *   codeSyntax?: {WEB?: string, ANDROID?: string, iOS?: string}
 * }>} tokenMap - Ordered list of token definitions.
 *   - `name`: Variable name using slash hierarchy (e.g. "color/bg/primary").
 *   - `type`: Figma variable type.
 *   - `values`: Map of {modeName: value}. Values can be raw (hex string for COLOR,
 *     number for FLOAT) or alias objects {type: 'VARIABLE_ALIAS', id: variableId}.
 *     For COLOR, raw values are accepted as hex strings ("#rrggbb" or "#rrggbbaa")
 *     and converted to {r, g, b, a} automatically.
 *   - `scopes`: Array of VariableScope strings. Omit to use [] (hidden/primitive).
 *   - `codeSyntax`: Platform code syntax strings. Omit to skip.
 * @returns {Promise<{variables: Record<string, Variable>}>}
 *   `variables` maps each token name to its created Variable object.
 */
async function createSemanticTokens(collection, modeIds, tokenMap) {
  const variables = {}

  for (const token of tokenMap) {
    // Create the variable
    const variable = figma.variables.createVariable(token.name, collection, token.type)

    // Set values for each mode
    for (const [modeName, rawValue] of Object.entries(token.values)) {
      const modeId = modeIds[modeName]
      if (!modeId) {
        throw new Error(
          `createSemanticTokens: mode "${modeName}" not found in modeIds for token "${token.name}". ` +
            `Available modes: ${Object.keys(modeIds).join(', ')}`,
        )
      }

      let value = rawValue

      // Convert hex strings to Figma RGBA for COLOR type
      if (token.type === 'COLOR' && typeof rawValue === 'string' && rawValue.startsWith('#')) {
        value = hexToFigmaColor(rawValue)
      }

      variable.setValueForMode(modeId, value)
    }

    // Set scopes (default: empty array = hidden from property pickers / primitives)
    variable.scopes = token.scopes || []

    // Set code syntax per platform
    if (token.codeSyntax) {
      if (token.codeSyntax.WEB) {
        variable.setVariableCodeSyntax('WEB', token.codeSyntax.WEB)
      }
      if (token.codeSyntax.ANDROID) {
        variable.setVariableCodeSyntax('ANDROID', token.codeSyntax.ANDROID)
      }
      if (token.codeSyntax.iOS) {
        variable.setVariableCodeSyntax('iOS', token.codeSyntax.iOS)
      }
    }

    variables[token.name] = variable
  }

  return { variables }
}

/**
 * Converts a hex color string to a Figma RGBA object.
 * Supports "#rgb", "#rrggbb", and "#rrggbbaa".
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function hexToFigmaColor(hex) {
  let h = hex.replace('#', '')

  // Expand shorthand #rgb → #rrggbb
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1

  return { r, g, b, a }
}
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
function sourceText(n,out=[]){if(n.type==='text')out.push(n);for(const c of n.children||[])sourceText(c,out);return out;}
function sourceImages(n,out=[]){if(n.type==='image')out.push(n);for(const c of n.children||[])sourceImages(c,out);return out;}
function tplKey(n){
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
 n.textAutoResize='NONE';n.resize(Math.max(.1,s.rect[2]+.6),Math.max(.1,s.rect[3]));
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
 for(const q of qs){if('fills'in q&&Array.isArray(q.fills)&&q.fills.some(p=>p.type==='SOLID'))q.fills=paint(h);if('strokes'in q&&Array.isArray(q.strokes)&&q.strokes.some(p=>p.type==='SOLID'))q.strokes=paint(h);}
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
  if(!src)throw new Error('Missing source vector '+(s.asset||s.text.codePointAt(0)));
  n=add(src.createInstance());parent.appendChild(n);n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));
  n.name=s.type==='icon'?'icon/'+s.text.codePointAt(0):'icon/'+s.asset.split('/').pop();
  const color=s.type==='icon'?s.color:svgColor(s.filter);if(color)recolorIcon(n,color);
 }else if(s.type==='image'){
  if(!imageHashes[s.asset])throw new Error('Missing source photo '+s.asset);
  n=add(figma.createRectangle());parent.appendChild(n);n.resize(Math.max(.1,s.rect[2]),Math.max(.1,s.rect[3]));n.fills=[{type:'IMAGE',imageHash:imageHashes[s.asset],scaleMode:'FILL'}];n.name='Photo / '+s.asset.split('/').pop();
 }else if(s.type==='map'){
  if(!ctx.mapSource)throw new Error('Map illustration source required for '+ctx.frameId);
  n=ctx.mapSource.clone();parent.appendChild(n);made.push(n.id,...n.findAll(()=>true).map(x=>x.id));
  const ratio=s.rect[2]/n.width;n.rescale(ratio);n.resize(s.rect[2],s.rect[3]);n.name='Bản đồ minh họa · giữ từ thiết kế gốc';n.clipsContent=true;
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
 if(parent.layoutMode!=='HORIZONTAL'&&parent.layoutMode!=='VERTICAL'){n.x=s.rect[0]-origin[0];n.y=s.rect[1]-origin[1];}
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

const DATA={"existingColors":{"ff006642":"VariableID:60:534","ff173a30":"VariableID:60:535","ff687c74":"VariableID:60:536","fff5f8f5":"VariableID:60:537","ffffffff":"VariableID:60:538","ffdce7df":"VariableID:60:539","ffe3f2e9":"VariableID:60:540","ffa35a09":"VariableID:60:541","fffff0d7":"VariableID:60:542","ffb34343":"VariableID:60:543","fffce9e7":"VariableID:60:544","ff2c6580":"VariableID:60:545","ffe9f3f8":"VariableID:60:546","ff103e31":"VariableID:60:547"},"foundations":{"colors":[["ff006642",281],["ffffffff",162],["ff193e34",147],["ff717171",107],["00000000",106],["ff687c74",102],["ffdce7df",45],["ffe3f2e9",36],["fff0f6f2",28],["ff171d19",27],["8a000000",22],["ff404943",14],["ff70847b",12],["ff789087",10],["ffe0e9e4",9],["fff5f8f5",6],["ff9fcbb8",6],["ffdfe9e3",5],["fff5fbf4",4],["ffaa5b00",3],["ffbfcbc5",3],["ff83948c",3],["ff1f7054",3],["ffc0c9c1",3],["b3ffffff",2],["fffff0d7",2],["ff000000",2],["1f171d19",2],["61171d19",2],["ff7f938a",2],["ff172713",1],["00f5fbf4",1],["de171d19",1],["ff364b3f",1],["ff123f32",1],["ffb8ddca",1],["ffd8eae0",1],["ffe7efeb",1]],"fonts":[{"size":12,"weight":600,"lineHeight":17},{"size":12,"weight":400,"lineHeight":17},{"size":17,"weight":600,"lineHeight":24},{"size":15,"weight":600,"lineHeight":21},{"size":13,"weight":400,"lineHeight":19},{"size":14,"weight":600,"lineHeight":20},{"size":13,"weight":600,"lineHeight":19},{"size":11,"weight":400,"lineHeight":16},{"size":12,"weight":400,"lineHeight":18},{"size":14,"weight":600,"lineHeight":21},{"size":8,"weight":400,"lineHeight":11},{"size":16,"weight":600,"lineHeight":23},{"size":17,"weight":700,"lineHeight":24},{"size":20,"weight":700,"lineHeight":29},{"size":21,"weight":700,"lineHeight":30},{"size":16,"weight":700,"lineHeight":23},{"size":14,"weight":500,"lineHeight":20},{"size":10,"weight":400,"lineHeight":15},{"size":14,"weight":400,"lineHeight":20},{"size":13,"weight":600,"lineHeight":16},{"size":10,"weight":400,"lineHeight":12},{"size":9,"weight":400,"lineHeight":11},{"size":23,"weight":700,"lineHeight":33},{"size":12,"weight":500,"lineHeight":17},{"size":24,"weight":700,"lineHeight":34},{"size":11,"weight":600,"lineHeight":16},{"size":11,"weight":400,"lineHeight":17},{"size":18,"weight":600,"lineHeight":26},{"size":14,"weight":400,"lineHeight":21},{"size":13,"weight":400,"lineHeight":21},{"size":24,"weight":500,"lineHeight":36},{"size":24,"weight":700,"lineHeight":29},{"size":10,"weight":600,"lineHeight":14},{"size":12,"weight":400,"lineHeight":16},{"size":22,"weight":600,"lineHeight":31},{"size":28,"weight":700,"lineHeight":40},{"size":10,"weight":400,"lineHeight":14}]},"icons":{"57415":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M405 235H277V107H235V235H107V277H235V405H277V277H405V235Z\" fill=\"currentColor\"/></svg>","57492":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M379 432 341 469 128 256 341 43 379 80 204 256 379 432Z\" fill=\"currentColor\"/></svg>","57689":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 469C138 469 43 374 43 256C43 138 138 43 256 43C374 43 469 138 469 256C469 374 374 469 256 469ZM213 149 107 256 137 286 213 210 375 372 405 341 213 149Z\" fill=\"currentColor\"/></svg>","57690":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M354 350 213 210 137 286 107 256 213 149 384 320 354 350ZM256 469C138 469 43 374 43 256C43 138 138 43 256 43C374 43 469 138 469 256C469 374 374 469 256 469ZM256 85C162 85 85 162 85 256C85 350 162 427 256 427C350 427 427 350 427 256C427 162 350 85 256 85Z\" fill=\"currentColor\"/></svg>","57694":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M329 354 299 384 171 256 299 128 329 158 231 256 329 354Z\" fill=\"currentColor\"/></svg>","57695":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M213 384 183 354 281 256 183 158 213 128 341 256 213 384Z\" fill=\"currentColor\"/></svg>","57801":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M320 235V405C320 441 291 469 256 469C221 469 192 441 192 405V235C166 215 149 184 149 149C149 90 197 43 256 43C315 43 363 90 363 149C363 184 346 215 320 235ZM235 405C235 417 244 427 256 427C268 427 277 417 277 405H256V384H277V341H256V320H277V277H235V405Z\" fill=\"currentColor\"/></svg>","57926":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M354 329 256 231 158 329 128 299 256 171 384 299 354 329Z\" fill=\"currentColor\"/></svg>","57948":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M352 448C315 448 279 431 256 403C233 431 197 448 160 448C94 448 43 396 43 331C43 250 115 184 225 84L256 57L287 85C397 184 469 250 469 331C469 396 418 448 352 448ZM258 116 256 114 254 116C152 208 85 269 85 331C85 373 117 405 160 405C193 405 225 384 236 355H276C287 384 319 405 352 405C395 405 427 373 427 331C427 269 360 208 258 116Z\" fill=\"currentColor\"/></svg>","58173":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M235 363H277V320H235V363ZM235 277H277V149H235V277ZM256 469C138 469 43 374 43 256C43 138 138 43 256 43C374 43 469 138 469 256C469 374 374 469 256 469ZM256 85C162 85 85 162 85 256C85 350 162 427 256 427C350 427 427 350 427 256C427 162 350 85 256 85Z\" fill=\"currentColor\"/></svg>","58291":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M363 363 333 333 388 277H171V235H388L333 180L363 149L469 256L363 363ZM85 405H256V448H85C62 448 43 429 43 405V107C43 83 62 64 85 64H256V107H85V405Z\" fill=\"currentColor\"/></svg>","58628":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 469C138 469 43 374 43 256C43 138 138 43 256 43C374 43 469 138 469 256C469 374 374 469 256 469ZM256 85C162 85 85 162 85 256C85 350 162 427 256 427C350 427 427 350 427 256C427 162 350 85 256 85Z\" fill=\"currentColor\"/></svg>","58710":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 469C138 469 43 374 43 256C43 138 138 43 256 43C374 43 469 138 469 256C469 374 374 469 256 469ZM256 85C162 85 85 162 85 256C85 350 162 427 256 427C350 427 427 350 427 256C427 162 350 85 256 85ZM267 363H235V235L347 167L363 194L267 251V363Z\" fill=\"currentColor\"/></svg>","58826":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M427 469H85C62 469 43 450 43 427V43L128 128H427C450 128 469 147 469 171V427C469 450 450 469 427 469ZM277 213H235V256H277V213ZM277 299H235V384H277V299Z\" fill=\"currentColor\"/></svg>","60985":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M448 384H380L341 427H213V384H323L362 341H448V85H107V277H64V85C64 62 83 43 107 43H448C471 43 491 62 491 85V341C491 365 471 384 448 384ZM171 213C171 154 218 107 277 107C336 107 384 154 384 213C384 272 336 320 277 320C218 320 171 272 171 213ZM277 277C313 277 341 249 341 213C341 178 313 149 277 149C242 149 213 178 213 213C213 249 242 277 277 277ZM107 384H171V427H107V491H64V427H0V384H64V320H107V384Z\" fill=\"currentColor\"/></svg>","61000":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M384 85H85V384H277V427H85C62 427 43 407 43 384V85C43 62 62 43 85 43H384C407 43 427 62 427 85V277H384V85ZM218 153 176 203 117 128H352L276 228L218 153ZM427 427V491H384V427H320C320 426 320 384 320 384H384V320H427V384H491V427H427Z\" fill=\"currentColor\"/></svg>","61116":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M85 320H171V85H85V320ZM341 235H427V85H341V235ZM213 427H299V85H213V427Z\" fill=\"currentColor\"/></svg>","61210":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M140 405C141 386 144 368 149 350L124 324C115 350 109 377 107 405H140ZM350 149C368 144 387 141 405 139V108C377 109 350 115 324 124L350 149ZM160 448H85C74 448 64 438 64 427C64 226 226 64 427 64C438 64 448 74 448 85V160C448 172 438 181 427 181C400 181 374 185 351 193C348 194 346 194 344 194C338 194 333 192 329 188L282 141C221 172 172 221 141 282L188 329C194 335 196 343 193 351C186 374 181 400 181 427C181 438 172 448 160 448Z\" fill=\"currentColor\"/></svg>","61358":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M171 171H341V128H171V171ZM171 256H341V213H171V256ZM299 469H128C105 469 85 450 85 427V85C85 62 104 43 128 43H384C407 43 427 62 427 85V341L299 469ZM384 85H128V427H277V320H384V85Z\" fill=\"currentColor\"/></svg>","61453":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M300 320 320 300 126 107H107V126L300 320ZM377 448C371 448 366 446 362 442L323 403L403 323L442 362C450 370 450 384 442 392L392 442C388 446 382 448 377 448ZM300 380 64 144V64H144L380 300L300 380Z\" fill=\"currentColor\"/></svg>","61484":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M405 448H384V491H341V448H171V491H128V448H107C83 448 64 429 64 405V107C64 83 83 64 107 64H405C429 64 448 83 448 107V405C448 429 429 448 405 448ZM405 107H107V320H405V107ZM107 363V405H405V363H107ZM225 140 352 266 329 289 225 185 180 230 158 207 225 140Z\" fill=\"currentColor\"/></svg>","61509":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M427 448H85C62 448 43 429 43 405V107C43 83 62 64 85 64H427C450 64 469 83 469 107V405C469 429 450 448 427 448ZM427 107H85V405H427V107ZM414 290 384 320 316 252 286 283 256 253 316 192 414 290ZM107 363H213V320H107V363ZM107 277H213V235H107V277ZM107 192H213V149H107V192Z\" fill=\"currentColor\"/></svg>","61682":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M224 235H171V299H224V352H288V299H341V235H288V181H224V235ZM256 469 85 405V275C85 168 158 67 256 43C354 67 427 168 427 275V405L256 469ZM384 275C384 190 330 111 256 87C182 111 128 190 128 275V376L256 424L384 376V275Z\" fill=\"currentColor\"/></svg>","61748":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M427 469H85C64 469 43 450 43 427V362C43 347 52 334 64 326V85C64 62 87 43 107 43H405C425 43 448 62 448 85V326C460 334 469 347 469 362V427C469 450 448 469 427 469ZM405 85H107V320H405V85ZM427 363H85V427H427V363ZM192 256H320V213H192V256Z\" fill=\"currentColor\"/></svg>","61769":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M171 405H213V341H171V405ZM171 256H213V149H171V256ZM384 469H128C105 469 85 450 85 427V85C85 62 105 43 128 43H384C407 43 427 62 427 85V427C427 450 407 469 384 469ZM384 85H128V278H384V85ZM384 320H128V427H384V320Z\" fill=\"currentColor\"/></svg>","61838":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M427 341H363V427H64C41 427 21 407 21 384V149H64C64 114 93 85 128 85C163 85 192 114 192 149H320C320 114 349 85 384 85C419 85 448 114 448 149H491V256L427 341ZM416 309 458 256H363V309H416ZM128 128C116 128 107 138 107 149C107 161 116 171 128 171C140 171 149 161 149 149C149 138 140 128 128 128ZM175 192C164 205 147 213 128 213C109 213 92 205 81 192H64V384H320V192H175ZM384 128C372 128 363 138 363 149C363 161 372 171 384 171C396 171 405 161 405 149C405 138 396 128 384 128Z\" fill=\"currentColor\"/></svg>","61843":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 469C173 469 107 403 107 320C107 208 256 43 256 43C256 43 405 208 405 320C405 403 339 469 256 469ZM149 320C149 379 197 427 256 427C315 427 363 379 363 320C363 259 301 167 256 109C212 166 149 259 149 320ZM203 320C203 349 227 373 256 373C285 373 309 349 309 320C309 291 285 267 256 267C227 267 203 291 203 320Z\" fill=\"currentColor\"/></svg>","61870":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M437 448 434 447 320 403 192 448 72 407C67 406 64 402 64 397V75C64 69 69 64 75 64L78 65L192 109L320 64L440 105C445 106 448 110 448 115V437C448 443 443 448 437 448ZM213 395 299 365V117L213 147V395ZM107 374 171 396V146L107 121V374ZM405 138 341 116V366L405 390V138Z\" fill=\"currentColor\"/></svg>","61878":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M469 320V128C469 105 450 85 427 85H85C62 85 43 105 43 128V384C43 407 62 427 85 427H301C300 420 299 413 299 405C299 398 300 391 301 384H85L256 277L334 326C344 317 356 310 369 305L256 235L85 341V128H427V301C442 304 457 311 469 320ZM341 405C341 370 370 341 405 341C441 341 469 370 469 405C469 441 441 469 405 469C370 469 341 441 341 405Z\" fill=\"currentColor\"/></svg>","61958":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M368 368 278 152 250 225 243 243 225 250 152 278 368 368ZM448 448 64 287V266L210 210L266 64H287L448 448Z\" fill=\"currentColor\"/></svg>","61972":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M299 427C306 427 313 426 320 425C279 379 256 319 256 256C256 193 279 133 320 87C313 86 306 85 299 85C205 85 128 162 128 256C128 350 205 427 299 427ZM299 469C181 469 85 374 85 256C85 138 181 43 299 43C337 43 374 53 405 71C342 108 299 177 299 256C299 335 342 404 405 441C374 459 337 469 299 469Z\" fill=\"currentColor\"/></svg>","62007":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 43C279 43 299 62 299 85H213C213 62 233 43 256 43ZM384 171V277C384 343 349 398 288 412V427C288 444 274 459 256 459C238 459 224 444 224 427V412C163 398 128 343 128 277V171L85 128V107H427V128L384 171ZM341 149H171V277C171 330 203 373 256 373C309 373 341 330 341 277V149Z\" fill=\"currentColor\"/></svg>","62124":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 256C233 256 213 275 213 299C213 322 233 341 256 341C279 341 299 322 299 299C299 275 279 256 256 256ZM384 294C384 372 327 427 256 427C185 427 128 372 128 294C128 244 170 178 256 99C342 178 384 244 384 294ZM256 469C346 469 427 401 427 294C427 224 370 140 256 43C142 140 85 224 85 294C85 401 166 469 256 469Z\" fill=\"currentColor\"/></svg>","62140":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 491 64 405V277C64 159 146 48 256 21C366 48 448 159 448 277V405L256 491ZM405 277C405 238 394 199 376 166L345 197C372 239 368 295 331 331C290 373 222 373 180 331C139 290 139 222 180 180C217 144 273 140 315 167L351 130C326 100 293 77 256 65C170 92 107 181 107 277V378L256 444L405 378V277ZM256 192C221 192 192 221 192 256C192 291 221 320 256 320C291 320 320 291 320 256C320 221 291 192 256 192Z\" fill=\"currentColor\"/></svg>","62291":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M457 269 268 457C260 465 250 469 238 469H85C62 469 43 450 43 427V274C43 262 47 252 55 244L244 55C260 39 287 39 304 55L457 208C474 225 474 252 457 269ZM274 85 85 274V427H238L427 238L274 85ZM107 373C107 391 121 405 139 405C156 405 171 391 171 373C171 356 156 341 139 341C121 341 107 356 107 373Z\" fill=\"currentColor\"/></svg>","62447":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M467 322 445 416C440 435 423 448 404 448H108C89 448 72 435 67 416L45 322C40 301 44 278 58 261C60 259 62 257 64 255V107C64 83 83 64 107 64H405C429 64 448 83 448 107V255C450 257 452 259 454 261C468 278 473 301 467 322ZM403 406 426 312C428 303 426 294 420 287C417 284 411 277 400 277C387 277 376 288 375 302L362 405L403 406ZM277 405H319L331 309C332 301 329 292 324 286C319 281 312 277 303 277C289 277 277 290 277 305V405ZM181 309 193 405H235V305C235 290 223 277 207 277C200 277 193 281 188 286C183 292 180 301 181 309ZM86 312 108 405H150L137 302C136 288 125 277 112 277C101 277 95 284 92 287C86 294 84 303 86 312ZM107 107V235C108 235 110 235 112 235C130 235 147 242 159 255C172 242 189 235 209 235C227 235 244 242 256 255C269 242 286 235 305 235C323 235 340 242 353 255C365 242 382 235 401 235C402 235 404 235 406 235V107H107Z\" fill=\"currentColor\"/></svg>","62467":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M448 251C448 368 357 448 256 448C156 448 64 370 64 250C51 243 43 229 43 213V171C43 147 62 128 85 128H107V258C107 341 173 407 256 407C339 407 405 341 405 258V107H235V64H405C429 64 448 83 448 107V133C461 139 469 152 469 168V217C469 232 461 245 448 251ZM171 235C171 246 180 256 192 256C204 256 213 246 213 235C213 223 204 213 192 213C180 213 171 223 171 235ZM299 235C299 246 308 256 320 256C332 256 341 246 341 235C341 223 332 213 320 213C308 213 299 223 299 235ZM384 277C374 337 321 384 257 384C192 384 123 330 128 246C181 268 221 315 232 372C260 316 317 277 384 277Z\" fill=\"currentColor\"/></svg>","62501":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M166 128 155 277H357L346 128H166ZM210 405H302L362 347L360 320H152L150 347L210 405ZM469 353 439 383 405 349 406 361 320 448H192L106 361L107 351L73 384L43 353L112 287L127 85H385L400 287L469 353Z\" fill=\"currentColor\"/></svg>","62572":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M89 277C88 277 87 277 85 277H89ZM286 405H192V363H269L311 320H235L149 277L107 320H0V277H85C38 277 0 239 0 192C0 145 38 107 85 107C132 107 171 145 171 192L213 149H277L352 279L373 258C354 242 341 219 341 192C341 145 380 107 427 107C474 107 512 145 512 192C512 239 474 277 427 277C423 277 419 277 415 276L371 320H427V384L347 344L286 405ZM427 149C403 149 384 169 384 192C384 215 403 235 427 235C450 235 469 215 469 192C469 169 450 149 427 149ZM85 149C62 149 43 169 43 192C43 215 62 235 85 235C109 235 128 215 128 192C128 169 109 149 85 149Z\" fill=\"currentColor\"/></svg>","62588":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M491 256 439 316 446 394 369 412 329 480 256 449 183 480 143 412 66 395 73 316 21 256 73 197 66 118 143 100 183 32 256 63 329 32 369 100 446 118 439 196 491 256ZM406 225 394 211 396 193 400 151 359 142 342 138 332 122 311 86 273 103 256 110 239 103 201 86 180 122 171 138 153 142 112 151 116 193 118 211 106 225 78 256 106 288 118 301 116 320 112 361 153 370 170 374 180 390 201 426 239 410 256 402 273 410 311 426 332 390 341 374 359 370 400 361 396 320 394 301 406 288 434 256 406 225ZM215 219 166 268 134 237 215 155 372 312 340 344 215 219Z\" fill=\"currentColor\"/></svg>","62589":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M256 491 64 405V277C64 159 146 48 256 21C366 48 448 159 448 277V405L256 491ZM405 277C405 181 342 92 256 65C170 92 107 181 107 277V378L256 444L405 378V277ZM158 265 128 235 213 149 384 320 354 350 213 210 158 265Z\" fill=\"currentColor\"/></svg>","62616":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M64 405V107H448V405H64ZM149 363V320H107V363H149ZM107 235V277H149V235H107ZM107 192H149V149H107V192ZM405 149H192V192H405V149ZM405 235H192V277H405V235ZM405 320H192V363H405V320Z\" fill=\"currentColor\"/></svg>","62633":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M341 235C407 295 469 351 469 399C469 438 438 469 399 469C377 469 355 459 341 443C327 459 306 469 284 469C244 469 213 438 213 399C213 351 275 295 341 235ZM284 427C293 427 303 422 309 415L341 377L374 415C380 422 390 427 399 427C415 427 427 415 427 399C427 375 383 331 341 292C300 331 256 375 256 399C256 415 268 427 284 427ZM405 171H363C363 196 347 219 323 228L191 277H21V43H149V73L299 32L469 85V107C469 142 441 171 405 171ZM64 85V235H107V85H64ZM298 77 149 118V235H184L308 188C315 186 320 179 320 171C320 171 278 172 271 174L220 191L207 150L257 133C268 130 280 128 291 128H405C414 128 421 123 425 116L298 77Z\" fill=\"currentColor\"/></svg>","62640":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M443 171C457 171 469 183 469 197C469 212 457 224 443 224H256V245H400C415 245 427 257 427 272C427 286 415 298 401 298L189 299L221 354C223 358 224 361 224 366C224 371 222 376 218 381L195 405L41 260C29 248 21 231 21 214V85C21 50 50 21 85 21H379C393 21 405 33 405 48C405 63 393 75 379 75H256V96H421C436 96 448 108 448 123C448 137 436 149 421 149H256V171H443ZM213 64H85C74 64 64 74 64 85V213C64 222 69 227 72 229L149 301V256H213V64ZM288 320C306 320 320 334 320 352C320 370 288 405 288 405C288 405 256 370 256 352C256 334 270 320 288 320ZM395 491C395 491 341 430 341 395C341 365 365 341 395 341C424 341 448 365 448 395C448 430 395 491 395 491ZM395 373C383 373 373 383 373 395C373 403 383 421 395 438C407 421 416 403 416 395C416 383 406 373 395 373Z\" fill=\"currentColor\"/></svg>","62652":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M144 409 106 447 76 417 114 379 144 409ZM21 288H85V245H21V288ZM235 500H277V437H235V500ZM406 447 436 417 398 379 368 409 406 447ZM368 125 406 86 436 116 398 154 368 125ZM427 288H491V245H427V288ZM256 395C185 395 128 337 128 267C128 196 185 139 256 139C327 139 384 196 384 267C384 337 327 395 256 395ZM256 181C209 181 171 220 171 267C171 314 209 352 256 352C303 352 341 314 341 267C341 220 303 181 256 181ZM235 96H277V33H235V96ZM76 116 106 86 144 125 114 155 76 116Z\" fill=\"currentColor\"/></svg>","984351":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M405 427H384V469H341V427H171V469H128V427H107C83 427 64 407 64 384V85C64 62 83 43 107 43H405C429 43 448 62 448 85V384C448 407 429 427 405 427ZM405 85H107V299H405V85ZM405 341H107V384H405V341ZM192 213H149V256H192V213ZM277 213H235V256H277V213ZM363 213H320V256H363V213ZM192 128H149V171H192V128ZM277 128H235V171H277V128ZM363 128H320V171H363V128Z\" fill=\"currentColor\"/></svg>","984559":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M107 299H405V256H448V384C448 407 429 427 405 427H384V469H341V427H171V469H128V427H107C83 427 64 407 64 384V85C64 62 83 43 107 43H256V85H107V299ZM107 384H405V341H107V384ZM487 165 472 150 427 195 442 210C450 218 464 218 472 210L487 195C496 186 496 173 487 165ZM412 180 457 134 344 21H299V67L412 180Z\" fill=\"currentColor\"/></svg>","984674":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M137 363C129 351 128 342 128 333C128 317 149 277 149 256C149 236 141 224 141 224H109C109 224 117 236 117 256C117 277 96 317 96 333C96 342 97 351 105 363H137ZM243 363C236 351 235 342 235 333C235 317 256 277 256 256C256 236 247 224 247 224H279C279 224 288 236 288 256C288 277 267 317 267 333C267 342 268 351 275 363H243ZM174 363C167 351 165 342 165 333C165 317 187 277 187 256C187 236 178 224 178 224H210C210 224 219 236 219 256C219 277 197 317 197 333C197 342 199 351 206 363H174ZM397 469C364 469 337 445 333 413L310 192H86C73 192 62 181 64 168C75 97 136 43 208 43C282 43 343 101 351 176L376 407C377 418 386 427 397 427C409 427 418 417 418 405C418 399 416 379 416 379L458 373C458 373 461 396 461 405C461 441 432 469 397 469ZM208 85C167 85 130 112 113 149H301C286 111 249 85 208 85Z\" fill=\"currentColor\"/></svg>","984740":"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 512 512\"><path transform=\"translate(0,512) scale(1,-1)\" d=\"M261 89C257 85 250 84 246 89C242 92 241 99 246 104L318 176L288 206L215 134C211 129 205 130 200 134C196 138 196 145 200 149L273 221L243 251L170 179C166 175 160 175 155 179C151 183 151 190 155 194L227 266L197 297L125 224C121 220 114 220 110 224C106 228 106 235 110 239L203 333L243 293C263 273 298 273 319 293C339 314 339 348 319 369L279 408L285 414C301 431 329 431 345 414L436 324C452 307 452 280 436 263L261 89ZM466 233C499 266 499 320 466 354L375 444C342 478 288 478 255 444L249 438L243 444C209 478 155 478 122 444L46 369C16 339 13 291 38 258L69 289C60 305 63 325 77 339L152 414C169 431 196 431 212 414L288 338C292 335 293 328 288 323C284 319 277 319 273 323L203 393L79 270C58 249 58 215 79 194C88 186 98 181 110 179C111 168 116 157 125 149C133 140 144 135 155 134C156 123 161 112 170 104C178 95 189 90 200 89C202 77 207 67 215 58C225 48 239 43 253 43C267 43 281 48 291 58L466 233Z\" fill=\"currentColor\"/></svg>"},"templates":[["radii",{"radius":[14,5,0,12,9,16,8,18,31]}]]};
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
