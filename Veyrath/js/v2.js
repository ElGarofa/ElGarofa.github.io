(() => {
  'use strict';
  const $ = (sel, root=document) => root.querySelector(sel);
  const pretty = s => s.replace(/\b\w/g, c => c.toUpperCase());
  const models = window.VEYRATH_BESTIARY || [];

  /* Atlas — marcadores descriptivos, no nombres oficiales */
  const regions = [
    {id:'north',name:'Norte nevado',tag:'NIEVES Y MONTAÑAS',x:48,y:17,detail:'Isla septentrional con relieve abrupto y superficies nevadas, visible en la imagen original.'},
    {id:'west',name:'Bosques del oeste',tag:'BOSQUES',x:24,y:52,detail:'Gran extensión occidental de vegetación densa, atravesada por elevaciones y cursos de agua.'},
    {id:'center',name:'Tierras centrales',tag:'CORDILLERAS Y VALLES',x:48,y:42,detail:'Relieve central con cadenas rocosas, zonas abiertas, lagos y pasos entre territorios.'},
    {id:'east',name:'Región oriental',tag:'PRADERAS Y BOSQUES',x:76,y:45,detail:'Amplia región oriental de distintos tonos de vegetación, claros y colinas.'},
    {id:'south',name:'Bosques meridionales',tag:'COSTAS Y VEGETACIÓN',x:46,y:78,detail:'Franjas de bosque en el sur, con costas accidentadas y una zona clara cerca de la orilla.'}
  ];
  const viewport = $('#atlas-viewport');
  const stage = $('#atlas-stage');
  const markers = $('#atlas-hotspots');
  const regionList = $('#atlas-region-list');
  if(viewport && stage && markers && regionList){
    let zoom=1, panX=0, panY=0, selected=null, pointer=null, moved=false;
    const clamp = (n, low, high) => Math.min(high,Math.max(low,n));
    const setTransform = () => {stage.style.transform=`translate(${panX}px,${panY}px) scale(${zoom})`;};
    const fitStage = () => {
      const size=Math.min(viewport.clientWidth,viewport.clientHeight);
      stage.style.width=size+'px';stage.style.height=size+'px';
      stage.style.left=(viewport.clientWidth-size)/2+'px';stage.style.top=(viewport.clientHeight-size)/2+'px';
    };
    function activate(id){
      selected=id;
      document.querySelectorAll('.atlas-pin,.atlas-region').forEach(e=>e.classList.toggle('active',e.dataset.region===id));
      const r=regions.find(x=>x.id===id);
      if(r){
        const desc=$('.atlas-sidebar-head p');
        if(desc)desc.textContent=r.detail+' Nombre descriptivo provisional.';
      }
    }
    regions.forEach((r,i)=>{
      const btn=document.createElement('button');btn.type='button';btn.className='atlas-pin';btn.dataset.region=r.id;
      btn.setAttribute('aria-label',r.name);btn.title=r.name;btn.style.left=r.x+'%';btn.style.top=r.y+'%';
      btn.innerHTML='<span aria-hidden="true"></span>';btn.addEventListener('click',()=>activate(r.id));markers.append(btn);
      const row=document.createElement('button');row.type='button';row.className='atlas-region';row.dataset.region=r.id;
      const label=document.createElement('strong');label.textContent=String(i+1).padStart(2,'0')+' / '+r.name;
      const tag=document.createElement('small');tag.textContent='↗';row.append(label,tag);
      row.addEventListener('click',()=>{activate(r.id);zoom=1.45;panX=(50-r.x)/100*Math.min(viewport.clientWidth,viewport.clientHeight)*zoom;panY=(50-r.y)/100*Math.min(viewport.clientWidth,viewport.clientHeight)*zoom;setTransform();});regionList.append(row);
    });
    const changeZoom=d=>{zoom=clamp(zoom+d,1,3.3);setTransform()};
    $('#atlas-plus').addEventListener('click',()=>changeZoom(.3));
    $('#atlas-minus').addEventListener('click',()=>changeZoom(-.3));
    $('#atlas-reset').addEventListener('click',()=>{zoom=1;panX=panY=0;setTransform();activate(null)});
    viewport.addEventListener('wheel',e=>{e.preventDefault();changeZoom(e.deltaY<0?.16:-.16)},{passive:false});
    viewport.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};moved=false;viewport.setPointerCapture(e.pointerId);viewport.classList.add('is-dragging')});
    viewport.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;const dx=e.clientX-pointer.x,dy=e.clientY-pointer.y;if(Math.abs(dx)+Math.abs(dy)>1)moved=true;panX+=dx;panY+=dy;pointer.x=e.clientX;pointer.y=e.clientY;setTransform()});
    const endDrag=()=>{pointer=null;viewport.classList.remove('is-dragging')};
    viewport.addEventListener('pointerup',endDrag);viewport.addEventListener('pointercancel',endDrag);
    window.addEventListener('resize',fitStage);fitStage();
  }

  /* Catálogo 3D: las 183 criaturas están integradas en el juego según confirma su creador. */
  const grid=$('#bestiary-grid'), search=$('#beast-search'), select=$('#beast-group'), more=$('#beast-more'), count=$('#beast-count'), detail=$('#beast-detail');
  if(grid&&search&&select&&more&&count&&detail){
    let showing=16,shown=[];
    [...new Set(models.map(m=>m.group))].sort((a,b)=>a.localeCompare(b,'es')).forEach(group=>{const option=document.createElement('option');option.value=group;option.textContent=group.toUpperCase();select.append(option)});
    function openDetail(item){
      detail.replaceChildren();
      const info=document.createElement('div');
      const kicker=document.createElement('div');kicker.className='detail-kicker';kicker.textContent=item.group.toUpperCase()+'  /  MODELO 3D DEL JUEGO';
      const title=document.createElement('h3');title.textContent=item.name;
      const p=document.createElement('p');p.textContent='Criatura incluida en Veyrath, según su desarrollador. Modelo tridimensional real extraído del FBX aportado ('+item.triangles.toLocaleString('es-AR')+' triángulos). '+(item.texture?'Textura original integrada disponible.':'El FBX no contiene una textura de imagen embebida; la vista web usa un material neutro.')+' La vista es estática, sin animaciones.';
      info.append(kicker,title,p);
      const actions=document.createElement('div');actions.className='beast-detail-actions';
      const btn=document.createElement('button');btn.type='button';btn.textContent='EXPLORAR EN 3D ↗';btn.addEventListener('click',()=>openModel(item));actions.append(btn);
      const close=document.createElement('button');close.type='button';close.className='detail-close';close.textContent='CERRAR';close.addEventListener('click',()=>{detail.hidden=true});actions.append(close);
      detail.append(info,actions);detail.hidden=false;
      const y=detail.getBoundingClientRect().top+window.scrollY-110;
      window.scrollTo({top:y,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    }
    function render(){
      const term=search.value.trim().toLocaleLowerCase('es');const group=select.value;
      shown=models.filter(m=>(group==='Todos'||m.group===group)&&m.name.toLocaleLowerCase('es').includes(term));
      count.textContent=shown.length+' MODELOS';grid.replaceChildren();detail.hidden=true;
      shown.slice(0,showing).forEach((m,i)=>{
        const btn=document.createElement('button');btn.type='button';btn.className='beast-card';btn.setAttribute('aria-label','Abrir ficha de '+m.name);
        const top=document.createElement('div');top.className='beast-number';top.textContent='REGISTRO / '+String(models.indexOf(m)+1).padStart(3,'0');
        const imageWrap=document.createElement('div');imageWrap.className='beast-card-image';
        const img=document.createElement('img');img.loading='lazy';img.decoding='async';img.src=m.thumb;img.alt='Modelo 3D de '+m.name+' de Veyrath';imageWrap.append(img);
        const mid=document.createElement('div');mid.className='beast-card-main';
        const title=document.createElement('h3');title.textContent=m.name;
        const cat=document.createElement('small');cat.textContent=m.group;
        mid.append(title,cat);
        const foot=document.createElement('div');foot.className='beast-card-bottom';
        const state=document.createElement('span');state.textContent='VER MODELO 3D';
        const arr=document.createElement('span');arr.textContent='↗';foot.append(state,arr);
        btn.append(top,imageWrap,mid,foot);btn.addEventListener('click',()=>openDetail(m));grid.append(btn);
      });
      more.hidden=showing>=shown.length;
    }
    search.addEventListener('input',()=>{showing=16;render()});select.addEventListener('change',()=>{showing=16;render()});
    more.addEventListener('click',()=>{showing+=24;render()});render();
  }

  /* Visor WebGL de los 183 FBX, descargados de manera individual al abrir una ficha. Sin CDNs. */
  const modal=$('#model-modal'), canvas=$('#model-canvas'), loading=$('#model-loading');
  let current=null, raf=null, lastFocus=null, drag=null, lastModelId=null, resources=null;
  function showState(message){loading.hidden=false;loading.textContent=message}
  function closeModel(){if(!modal||modal.hidden)return;modal.hidden=true;document.body.classList.remove('modal-open');if(raf)cancelAnimationFrame(raf);raf=null;current=null;if(resources){resources.buffers.forEach(b=>resources.gl.deleteBuffer(b));resources.gl.deleteTexture(resources.texture);resources.gl.deleteProgram(resources.program);resources=null;}if(lastModelId&&window.VEY_MODELS)delete window.VEY_MODELS[lastModelId];lastModelId=null;if(lastFocus&&lastFocus.isConnected)lastFocus.focus()}
  if(modal){$('#model-close').addEventListener('click',closeModel);modal.addEventListener('click',e=>{if(e.target===modal)closeModel()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModel()})}
  const unpack=(base64,ctor)=>{
    const raw=atob(base64),data=new Uint8Array(raw.length);
    for(let i=0;i<raw.length;i++)data[i]=raw.charCodeAt(i);
    return new ctor(data.buffer);
  };
  function loadScript(src){return new Promise((resolve,reject)=>{const tag=document.createElement('script');tag.src=src;tag.onload=resolve;tag.onerror=reject;document.head.append(tag)})}
  async function openModel(item){
    if(!modal||!canvas)return;
    lastFocus=document.activeElement;modal.hidden=false;document.body.classList.add('modal-open');$('#model-title').textContent=item.name;
    $('#model-close').focus();showState('Preparando modelo 3D...');
    try{
      window.VEY_MODELS=window.VEY_MODELS||{};
      if(!window.VEY_MODELS[item.id])await loadScript('assets/models/'+item.id+'.js');
      if(modal.hidden)return;
      lastModelId=item.id;setupViewer(window.VEY_MODELS[item.id],item.id);
    }catch(e){showState('No se pudo abrir el visor 3D. Verificá que WebGL esté activado en Chrome o Edge.');console.error('Veyrath 3D viewer:',e)}
  }
  function shader(gl,type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
  function setupViewer(d,name){
    if(raf)cancelAnimationFrame(raf);
    const gl=canvas.getContext('webgl',{alpha:false,antialias:true});
    if(!gl)throw Error('WebGL no disponible');
    const vertSrc=`attribute vec3 aPos;attribute vec3 aNor;attribute vec2 aUV;uniform float uRot;uniform float uPitch;uniform float uZoom;uniform float uAspect;varying vec3 vNor;varying vec2 vUV;void main(){float c=cos(uRot),s=sin(uRot),cp=cos(uPitch),sp=sin(uPitch);vec3 p=vec3(aPos.x*c-aPos.z*s,aPos.y,aPos.x*s+aPos.z*c);vec3 n=vec3(aNor.x*c-aNor.z*s,aNor.y,aNor.x*s+aNor.z*c);p=vec3(p.x,p.y*cp-p.z*sp,p.y*sp+p.z*cp);n=vec3(n.x,n.y*cp-n.z*sp,n.y*sp+n.z*cp);vNor=n;vUV=aUV;gl_Position=vec4(p.x*uZoom/uAspect,p.y*uZoom,-p.z*.16,1.);}`;
    const fragSrc=`precision mediump float;uniform sampler2D uTexture;uniform float uHasTex;uniform vec3 uColor;varying vec3 vNor;varying vec2 vUV;void main(){vec3 base=mix(uColor,texture2D(uTexture,vUV).rgb,uHasTex);vec3 light=normalize(vec3(.35,.8,1.));float diffuse=max(dot(normalize(vNor),light),.05);gl_FragColor=vec4(base*(.56+.65*diffuse),1.0);}`;
    const prog=gl.createProgram();gl.attachShader(prog,shader(gl,gl.VERTEX_SHADER,vertSrc));gl.attachShader(prog,shader(gl,gl.FRAGMENT_SHADER,fragSrc));gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(prog));gl.useProgram(prog);
    const allBuffers=[];const attrib=(key,buf,n)=>{const loc=gl.getAttribLocation(prog,key);const b=gl.createBuffer();allBuffers.push(b);gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,buf,gl.STATIC_DRAW);gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,n,gl.FLOAT,false,0,0)};
    const pos=unpack(d.v,Float32Array),norm=unpack(d.norm,Float32Array),uv=unpack(d.uv,Float32Array),idx=unpack(d.idx,d.bytes===16?Uint16Array:Uint32Array);
    attrib('aPos',pos,3);attrib('aNor',norm,3);attrib('aUV',uv,2);
    const ind=gl.createBuffer();allBuffers.push(ind);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ind);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,idx,gl.STATIC_DRAW);
    if(d.bytes===32&&!gl.getExtension('OES_element_index_uint'))throw Error('Extensión WEBGL_index_uint no disponible');
    const uniform=(k)=>gl.getUniformLocation(prog,k);
    const ur=uniform('uRot'),up=uniform('uPitch'),uz=uniform('uZoom'),ua=uniform('uAspect'),ut=uniform('uTexture'),uh=uniform('uHasTex'),uc=uniform('uColor');
    let angle=.35,pitch=.03,zoom=.87,hasTex=false,last=performance.now();
    const tex=gl.createTexture();resources={gl,program:prog,buffers:allBuffers,texture:tex};gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,tex);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array([172,151,109,255]));
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    if(d.texture){const im=new Image();im.onload=()=>{if(modal.hidden||lastModelId!==name)return;gl.bindTexture(gl.TEXTURE_2D,tex);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,im);gl.generateMipmap(gl.TEXTURE_2D);hasTex=true};im.src=d.texture}
    gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);gl.clearColor(.074,.11,.082,1);
    current={rotate:delta=>{angle+=delta},pitch:delta=>{pitch=Math.max(-1.25,Math.min(1.25,pitch+delta))},zoom:delta=>{zoom=Math.max(.35,Math.min(2.5,zoom+delta))}};
    loading.hidden=true;
    function render(now){if(modal.hidden)return;const elapsed=Math.min(now-last,100);last=now;if(!drag)angle+=elapsed*.00015;
      const dpr=Math.min(window.devicePixelRatio||1,1.7),w=Math.floor(canvas.clientWidth*dpr),h=Math.floor(canvas.clientHeight*dpr);
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h)}
      gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(prog);gl.uniform1f(ur,angle);gl.uniform1f(up,pitch);gl.uniform1f(uz,zoom);gl.uniform1f(ua,w/h);gl.uniform1f(uh,hasTex?1:0);gl.uniform3f(uc,...(d.color||[.69,.58,.41]));gl.uniform1i(ut,0);gl.drawElements(gl.TRIANGLES,idx.length,d.bytes===16?gl.UNSIGNED_SHORT:gl.UNSIGNED_INT,0);raf=requestAnimationFrame(render)}
    raf=requestAnimationFrame(render);
  }
  if(canvas){
    canvas.addEventListener('pointerdown',e=>{drag={x:e.clientX,y:e.clientY,id:e.pointerId};canvas.setPointerCapture(e.pointerId)});
    canvas.addEventListener('pointermove',e=>{if(!drag||!current)return;current.rotate((e.clientX-drag.x)*.012);current.pitch((e.clientY-drag.y)*.009);drag.x=e.clientX;drag.y=e.clientY});
    const end=()=>drag=null;canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
    canvas.addEventListener('wheel',e=>{if(current){e.preventDefault();current.zoom(e.deltaY<0?.12:-.12)}},{passive:false});
  }
})();
