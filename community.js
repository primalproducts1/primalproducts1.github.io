/* PRIMAL community invitation — shown only on the first visit in this browser. */
(()=>{
 'use strict';

 const SEEN='primal-community-first-visit-v1';
 const t=(es,en)=>window.PrimalI18n?.lang==='en'?en:es;
 const style=document.createElement('style');
 style.id='primal-community-first-visit-style';
 style.textContent="\n/* PRIMAL first-visit WhatsApp community popup */\n.community-dialog{width:min(440px,calc(100% - 24px));max-height:calc(100dvh - 32px);padding:0;margin:auto;background:#111216;color:#f5f3ef;border:1px solid #3b3c41;border-radius:23px;overflow:auto;box-shadow:0 24px 100px #0009}\n.community-dialog::backdrop{background:#050609d9;backdrop-filter:blur(5px)}\n.community-art{position:relative;height:230px;background:#090a0c;overflow:hidden}\n.community-art img{width:100%;height:100%;object-fit:cover;object-position:center 42%;filter:contrast(1.05) saturate(.9)}\n.community-art::before{content:'';position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,#0002 0%,#0000 42%,#111216 100%)}\n.community-art::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,#0006 0%,transparent 60%)}\n.community-art-label{position:absolute;z-index:2;left:18px;bottom:23px;padding:7px 10px;border:1px solid #ffffff45;background:#090a0c99;color:#fff;font-size:9px;font-weight:900;letter-spacing:1.8px;backdrop-filter:blur(5px)}\n.community-close{position:absolute;z-index:3;right:12px;top:12px;width:44px;height:44px;border-radius:50%;border:1px solid #ffffff55;background:#101215d9;color:white;display:grid;place-items:center;cursor:pointer}\n.community-close svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:2}\n.community-copy{padding:4px 24px 22px;position:relative}\n.community-kicker{margin:7px 0 10px;color:#f05a4f;font-size:9px;font-weight:900;letter-spacing:2px}\n.community-copy h2{margin:0 0 12px;font:900 34px/.96 Impact,'Arial Narrow',Arial,sans-serif;text-transform:uppercase;letter-spacing:-.5px}\n.community-copy h2 span{color:#ef4237}\n.community-copy>p:not(.community-note){margin:0 0 15px;color:#c4c6cd;font-size:13px;line-height:1.55}\n.community-perks{display:flex;flex-wrap:wrap;gap:7px;margin:0 0 15px}\n.community-perks span{display:inline-flex;align-items:center;min-height:30px;padding:7px 10px;border:1px solid #34363c;border-radius:999px;background:#191a1f;color:#e2e3e7;font-size:10px;font-weight:700;line-height:1.2}\n.community-perks span::before{content:'';width:6px;height:6px;margin-right:7px;border-radius:50%;background:#ef4237;box-shadow:0 0 0 3px #ef423722}\n\n.community-cta{position:relative;isolation:isolate;display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px 22px;min-height:70px;border:0;background:transparent;color:#fff!important;font-size:13px;font-weight:800;text-align:center;text-decoration:none;line-height:1.3;cursor:pointer;text-shadow:0 1px 1px #0003}\n.community-cta::before{content:'';position:absolute;z-index:-1;inset:0;background:#25d366;mask:url('./brush-stroke.png') center/100% 100% no-repeat;-webkit-mask:url('./brush-stroke.png') center/100% 100% no-repeat}\n.community-cta svg{width:24px;height:24px;flex-shrink:0;fill:#fff;color:#fff;stroke:none}\n.community-cta[hidden]{display:none}\n.community-cta:disabled{color:#fff!important;opacity:.6;cursor:default}\n\n.community-later{display:block;width:100%;border:0;background:none;color:#c8cbd1;padding:14px 8px;font-size:12px;font-weight:700;min-height:44px;cursor:pointer}\n.community-note{font-size:11px!important;line-height:1.4!important;margin:0!important;text-align:center;color:#858993!important}\n\n@media(max-width:360px){\n .community-art{height:195px}\n .community-copy{padding-left:18px;padding-right:18px}\n .community-copy h2{font-size:30px}\n .community-perks{gap:5px}\n .community-perks span{font-size:9px;padding:6px 8px}\n}\n";
 document.head.append(style);
 const dialog=document.createElement('dialog');

 dialog.id='communityWelcome';
 dialog.className='community-dialog community-first-visit';
 dialog.setAttribute('aria-labelledby','communityTitle');
 dialog.setAttribute('aria-describedby','communityDescription');
 document.body.append(dialog);

 let lastFocus=null;
 let opened=false;

 function hasSeen(){
  try{return localStorage.getItem(SEEN)==='seen';}
  catch{return opened;}
 }

 function remember(){
  opened=true;
  try{localStorage.setItem(SEEN,'seen');}catch{}
 }

 function communityLink(){
  try{
   const raw=(window.PRIMAL_COMMUNITY?.whatsappUrl||'').trim();
   if(!raw)return '';
   const u=new URL(raw);
   if(u.protocol!=='https:'||u.username||u.password||u.port)return '';
   return ['chat.whatsapp.com','wa.me','www.whatsapp.com','whatsapp.com'].includes(u.hostname)?u.href:'';
  }catch{return '';}
 }

 const whatsapp='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.48 0 .14 5.34.13 11.91c0 2.1.55 4.15 1.6 5.96L.04 24l6.28-1.65a11.9 11.9 0 0 0 5.72 1.46h.01c6.57 0 11.91-5.34 11.92-11.91a11.83 11.83 0 0 0-3.45-8.42ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.04-1.38l-.36-.22-3.73.98.99-3.64-.24-.37a9.84 9.84 0 0 1-1.52-5.26c0-5.46 4.45-9.9 9.92-9.9a9.84 9.84 0 0 1 7.01 2.91 9.84 9.84 0 0 1 2.9 7.01c0 5.46-4.45 9.9-9.92 9.9Zm5.44-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/></svg>';

 function render(){
  dialog.innerHTML=`
   <div class="community-art">
    <img src="./community.jpg" alt="${t('Entrenamiento y comunidad PRIMAL Boxing','PRIMAL Boxing training community')}" width="1200" height="800">
    <div class="community-art-label">PRIMAL COMMUNITY</div>
    <button class="community-close" type="button" aria-label="${t('Cerrar invitación','Close invitation')}">
     <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>
    </button>
   </div>
   <div class="community-copy">
    <div class="community-kicker">${t('NO ENTRENAS SOLO','YOU DON’T TRAIN ALONE')}</div>
    <h2 id="communityTitle">${t('Entra a la<br><span>Comunidad PRIMAL.</span>','Join the<br><span>PRIMAL Community.</span>')}</h2>
    <p id="communityDescription">${t(
     'Recibe actualizaciones, nuevos entrenamientos, retos, lanzamientos y contenido premium directamente en WhatsApp.',
     'Get updates, new workouts, challenges, launches and premium content directly on WhatsApp.'
    )}</p>
    <div class="community-perks" aria-label="${t('Beneficios de la comunidad','Community benefits')}">
     <span>${t('Nuevos entrenamientos','New workouts')}</span>
     <span>${t('Retos y novedades','Challenges & updates')}</span>
     <span>${t('Contenido premium','Premium content')}</span>
    </div>
    <a class="community-cta" id="communityJoin" target="_blank" rel="noopener noreferrer" hidden>
     ${whatsapp}<span>${t('Unirme por WhatsApp','Join on WhatsApp')}</span>
    </a>
    <button class="community-cta" id="communitySoon" type="button" disabled>
     ${whatsapp}<span>${t('Comunidad próximamente','Community coming soon')}</span>
    </button>
    <button class="community-later" type="button">${t('Seguir entrenando','Keep training')}</button>
    <p class="community-note">${t('Unirte es opcional. Puedes salir de la comunidad cuando quieras.','Joining is optional. You can leave the community whenever you want.')}</p>
   </div>`;

  const url=communityLink();
  const join=dialog.querySelector('#communityJoin');
  const soon=dialog.querySelector('#communitySoon');
  if(url){
   join.href=url;
   join.hidden=false;
   soon.hidden=true;
  }

  dialog.querySelector('.community-close').onclick=()=>dialog.close();
  dialog.querySelector('.community-later').onclick=()=>dialog.close();
 }

 function canOpen(){
  if(dialog.open||window.PrimalRecorder?.active)return false;
  if(document.querySelector('dialog[open]'))return false;
  if(['prepare','work','rest','paused'].includes(document.body.dataset.state))return false;
  return true;
 }

 function open({force=false}={}){
  if(!force&&hasSeen())return false;
  if(!canOpen())return false;

  lastFocus=document.activeElement;
  render();
  dialog.showModal();
  dialog.scrollTop=0;
  dialog.querySelector('.community-close')?.focus({preventScroll:true});
  if(!force)remember();
  return true;
 }

 function tryFirstVisit(){
  if(hasSeen())return;
  if(open())return;
  const observer=new MutationObserver(()=>{
   if(hasSeen()){observer.disconnect();return;}
   if(open())observer.disconnect();
  });
  observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','data-state','hidden']});
  window.setTimeout(()=>observer.disconnect(),15000);
 }

 dialog.addEventListener('close',()=>lastFocus?.isConnected&&lastFocus.focus({preventScroll:true}));
 dialog.addEventListener('keydown',e=>e.stopPropagation());
 dialog.addEventListener('click',e=>{
  if(e.target!==dialog)return;
  const r=dialog.getBoundingClientRect();
  if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
 });
 document.addEventListener('primal-language-change',()=>{if(dialog.open)render();});

 if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>window.setTimeout(tryFirstVisit,650),{once:true});
 }else{
  window.setTimeout(tryFirstVisit,650);
 }

 window.PrimalCommunity={
  open:()=>open({force:true}),
  reset(){
   try{localStorage.removeItem(SEEN);}catch{}
   opened=false;
  }
 };
})();