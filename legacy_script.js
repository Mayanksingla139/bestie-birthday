// Legacy viral_birthday script (copied)
// Requires: GSAP (gsap, ScrollTrigger), confetti, Howler (optional)

gsap.registerPlugin(ScrollTrigger);

// Elements
const site = document.getElementById('site');
const toRoast = document.getElementById('toRoast');
const toCake = document.getElementById('toCake');
const sparklesCanvas = document.getElementById('sparkles');
const balloonsEl = document.getElementById('balloons');
const roastCards = document.querySelectorAll('.roast .card');
const timelineItems = document.querySelectorAll('.timeline-item');
const candlesContainer = document.getElementById('candles');
const micBtn = document.getElementById('micBtn');
const resetBtn = document.getElementById('resetCandles');
const smokeEl = document.getElementById('smoke');
const bgMusic = document.getElementById('bgMusic');
const secretBtn = document.getElementById('secretBtn');

// Candle state (declare early so initAnimations can use it)
let candleCount = 25;
let litCandles = [];

console.log('[legacy_script] element presence:', {
  site: !!site, toRoast: !!toRoast, toCake: !!toCake, sparkles: !!sparklesCanvas, balloons: !!balloonsEl,
  candles: !!candlesContainer, micBtn: !!micBtn, resetBtn: !!resetBtn, secretBtn: !!secretBtn
});

// Start site animations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Hero sparkles
function initSparkles(){
  const canvas = sparklesCanvas; if(!canvas) return; const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  resize(); window.addEventListener('resize', resize);
  const particles=[];
  function spawn(){ particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height, r: Math.random()*2+0.8, a:Math.random()*0.8+0.2, vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2}); }
  for(let i=0;i<60;i++)spawn();
  function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{ p.x += p.vx; p.y += p.vy; p.a += (Math.random()-0.5)*0.02; ctx.beginPath(); ctx.fillStyle = `rgba(255,255,255,${p.a})`; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); if(p.x<0||p.x>canvas.width||p.y<0||p.y>canvas.height){ p.x=Math.random()*canvas.width;p.y=Math.random()*canvas.height; } }); requestAnimationFrame(draw); }
  draw();
}

// AI Bestie Report animation
function runAIReport(){
  const bars = document.querySelectorAll('.ai-report .bar');
  bars.forEach(b=>{
    const raw = b.getAttribute('data-target')||'';
    if(b.classList.contains('error')) return; // leave error
    if(raw === 'infinite') return; // leave infinite as-is
    const target = parseInt(raw||'0',10);
    const fill = b.querySelector('.fill');
    const pct = b.querySelector('.percent');
    gsap.to(fill,{width: (target>100?100:target)+'%',duration:1.6, ease:'power2.out'});
    let obj={val:0}; gsap.to(obj,{val:target,duration:1.6,roundProps:'val',onUpdate:()=>{ if(pct) pct.textContent = obj.val + '%'; }});
  });
}

// Balloons - simple floating emojis
function initBalloons(){
  if(!balloonsEl) return; const icons=['🎈','🎈','🎉','🎈'];
  for(let i=0;i<10;i++){ const el=document.createElement('div'); el.className='balloon'; el.style.position='absolute'; el.style.left = (Math.random()*80+5)+'%'; el.style.top = (60+Math.random()*30)+'%'; el.style.fontSize = (20+Math.random()*28)+'px'; el.innerText = icons[Math.floor(Math.random()*icons.length)]; balloonsEl.appendChild(el); gsap.to(el,{y:'-80vh',duration:8+Math.random()*6,repeat:-1,ease:'sine.inOut',delay:Math.random()*3}); }
}

// Roast cards ScrollTrigger flip (guarded)
if (roastCards && roastCards.length) {
  roastCards.forEach((card,i)=>{
    try{
      gsap.set(card,{transformStyle:'preserve-3d'});
      ScrollTrigger.create({
        trigger:card,
        start:'top 80%',
        onEnter:()=> gsap.fromTo(card,{rotationX:90,opacity:0},{rotationX:0,opacity:1,duration:0.8,ease:'back.out(1.7)'}),
        onEnterBack:()=> gsap.fromTo(card,{rotationX:90,opacity:0},{rotationX:0,opacity:1,duration:0.8,ease:'back.out(1.7)'})
      });
    }catch(e){console.warn('roast card init failed',e)}
  });
}

// Timeline animation
timelineItems.forEach((it,idx)=>{
  gsap.from(it,{x:-60,opacity:0,duration:0.6,scrollTrigger:{trigger:it,start:'top 85%'}})
});

// Contract signing
const acceptContract = document.getElementById('acceptContract');
const signatureEl = document.getElementById('signature');
acceptContract && acceptContract.addEventListener('click', ()=>{
  signatureEl.innerHTML = '';
  const s = document.createElement('div'); s.textContent = 'Signed digitally by Your Favorite Human'; s.style.fontWeight='800'; s.style.color='#ffd9f0'; signatureEl.appendChild(s);
  gsap.fromTo(s,{x:-40,opacity:0},{x:0,opacity:1,duration:0.8});
  SwalToast('Contract signed ✔');
});

// Fake warning popup randomly after scrolling 30% down
const fakeWarning = document.getElementById('fakeWarning');
const warnClose = document.getElementById('warnClose');
let warned=false;
window.addEventListener('scroll', ()=>{
  if(warned) return; const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  if(pct>0.25 && Math.random()<0.25){ warned=true; fakeWarning.classList.remove('hidden'); gsap.fromTo(fakeWarning,{autoAlpha:0},{autoAlpha:1,duration:0.4}); }
});
warnClose && warnClose.addEventListener('click', ()=>{ gsap.to(fakeWarning,{autoAlpha:0,duration:0.4,onComplete:()=>fakeWarning.classList.add('hidden')}); });

// Quiz logic
document.querySelectorAll('.quiz-opt').forEach(opt=>opt.addEventListener('click', ()=>{
  document.getElementById('quizResult').classList.remove('hidden');
  gsap.fromTo('#quizResult',{y:20,opacity:0},{y:0,opacity:1,duration:0.6});
}));

// Stats counters
document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
  const target = parseInt(el.getAttribute('data-target'),10);
  const obj = {val:0};
  gsap.to(obj,{val:target,duration:2.2,ease:'power2.out',onUpdate:()=>{ el.textContent = Math.floor(obj.val); }});
});

// Emergency button
const emBtn = document.getElementById('emBtn');
emBtn && emBtn.addEventListener('click', ()=>{
  for(let i=0;i<20;i++){ setTimeout(()=>{ confetti({particleCount:20,spread:120,origin:{x:Math.random(),y:Math.random()*0.6}}); }, i*120); }
  SwalToast('Reminder:\nYou are loved.\nYou are appreciated.\nYou are stronger than you think.');
});

// Achievements simple animation (guarded)
const achs = document.querySelectorAll('.ach');
if(achs && achs.length){ achs.forEach((a,i)=>{ try{ gsap.from(a,{y:20,opacity:0,duration:0.6,delay:0.2+i*0.1,scrollTrigger:{trigger:a,start:'top 90%'}}); }catch(e){console.warn('ach anim error',e)} }); }

// Easter eggs clicks
document.body.addEventListener('click', (e)=>{
  const target = e.target;
  if(target.classList.contains('balloon')){ SwalToast('Pop!'); }
  if(target.closest('#cake3d')){ SwalToast('Stop stealing cake before cutting it.'); }
  if(target.id==='eggMoon'){ SwalToast('Still awake at 2AM?'); }
  if(target.id==='eggHeart'){ SwalToast('Bestie Detected ❤️'); }
});

// Fake system update
const sysUpdate = document.getElementById('sysUpdate');
const updateClose = document.getElementById('updateClose');
const updateProgress = document.getElementById('updateProgress');
function runFakeUpdate(){ sysUpdate.classList.remove('hidden'); gsap.fromTo(sysUpdate,{autoAlpha:0},{autoAlpha:1,duration:0.4}); let pct=0; const fill = updateProgress.querySelector('.fill'); const percent = updateProgress.querySelector('.percent'); const iv = setInterval(()=>{ pct+=8; if(pct>100) pct=100; if(fill) fill.style.width = pct+'%'; if(percent) percent.textContent = pct+'%'; if(pct>=100){ clearInterval(iv); } },300); }
updateClose && updateClose.addEventListener('click', ()=>{ gsap.to(sysUpdate,{autoAlpha:0,duration:0.3,onComplete:()=>sysUpdate.classList.add('hidden')}); });

// Final surprise sequence
const finalSurprise = document.getElementById('finalSurprise');
const specialText = document.getElementById('specialText');
function triggerFinal(){ finalSurprise.classList.remove('hidden'); gsap.fromTo(finalSurprise,{autoAlpha:0},{autoAlpha:1,duration:0.6}); setTimeout(()=>{ specialText.classList.remove('hidden'); gsap.fromTo(specialText,{autoAlpha:0,y:20},{autoAlpha:1,y:0,duration:1.2}); for(let i=0;i<8;i++) setTimeout(()=>confetti({particleCount:80,spread:200,origin:{x:Math.random(),y:Math.random()*0.3}}), i*300);},1200); }

// Trigger AI report when section visible
ScrollTrigger.create({trigger:'#aiReport',start:'top 80%',onEnter:runAIReport,once:true});

// Trigger final when user reaches the finale section
ScrollTrigger.create({trigger:'.finale',start:'top 60%',onEnter:()=>{ triggerFinal(); if(bgMusic){ try{ bgMusic.play(); }catch(e){} } },once:true});

// Create 25 candles
function buildCandles(){ if(!candlesContainer) return; candlesContainer.innerHTML=''; litCandles = [];
  for(let i=0;i<candleCount;i++){
    const c = document.createElement('div'); c.className='candle';
    const flame = document.createElement('div'); flame.className='flame';
    // small inline style to ensure visibility in debugging
    flame.style.transition = 'opacity 0.3s';
    flame.style.boxShadow = '0 6px 12px rgba(255,150,60,0.6)';
    c.appendChild(flame); candlesContainer.appendChild(c); litCandles.push({el:c,flame});
  }
}

// Flame flicker animation using GSAP
function animateFlames(){ litCandles.forEach((c,idx)=>{ gsap.fromTo(c.flame,{scale:0.9,rotation:0},{scale:1.12,rotation: (Math.random()-0.5)*6,repeat:-1,yoyo:true,duration:0.12+Math.random()*0.2}); }); }
animateFlames();

// Microphone blow detection (simple RMS-based)
let audioCtx, analyser, micStream, dataArray, rafId;
let blowing = false; let blowCount = 0;
function enableMic(){
  console.log('[legacy_script] enableMic called');
  const status = ensureMicStatus();
  if (audioCtx){ console.log('[legacy_script] audioCtx already exists'); if(status) status.textContent='Mic: Enabled'; return; }
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){ console.error('[legacy_script] getUserMedia not supported'); if(status) status.textContent='Mic: Unsupported'; alert('Microphone not supported in this browser.'); return; }
  navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
    console.log('[legacy_script] getUserMedia success', stream);
    audioCtx = new (window.AudioContext||window.webkitAudioContext)();
    micStream = audioCtx.createMediaStreamSource(stream);
    analyser = audioCtx.createAnalyser(); analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount; dataArray = new Uint8Array(bufferLength);
    micStream.connect(analyser);
    monitorMic();
    if(micBtn){ micBtn.textContent = 'Mic Enabled'; micBtn.disabled = true; }
    if(status) status.textContent = 'Mic: Enabled';
  }).catch(err=>{ console.error('[legacy_script] getUserMedia error', err); if(micBtn){ micBtn.textContent='Mic blocked'; micBtn.disabled=false; } if(status) status.textContent='Mic: Blocked'; alert('Microphone access is required for the blowing feature.'); });
}

function monitorMic(){ if(!analyser) return; analyser.getByteTimeDomainData(dataArray); let sum=0; for(let i=0;i<dataArray.length;i++){ const v=(dataArray[i]-128)/128; sum+=v*v; } const rms = Math.sqrt(sum/dataArray.length); if(rms>0.09){ if(!blowing){ blowing=true; handleBlow(); } } else { blowing=false; } rafId = requestAnimationFrame(monitorMic);
}

function handleBlow(){ const toBlow = Math.min(litCandles.length, 1 + Math.floor(Math.random()*3)); for(let i=0;i<toBlow;i++){ const last = litCandles.pop(); if(!last) break; gsap.to(last.flame,{opacity:0,scale:0.4,duration:0.6,ease:'power2.out'}); last.el.classList.add('out'); } blowCount += toBlow; if(litCandles.length===0){ onAllCandlesOut(); } }

function onAllCandlesOut(){ if(smokeEl) { smokeEl.classList.remove('hidden'); gsap.fromTo(smokeEl,{opacity:0,scale:0.6},{opacity:1,scale:1,duration:1}); }
  confetti({particleCount:200,spread:160,origin:{y:0.6}});
  confetti({particleCount:120,spread:260,origin:{y:0.35}});
  for(let i=0;i<6;i++) setTimeout(()=>confetti({particleCount:40,spread:360,origin:{x:Math.random(),y:Math.random()*0.5}}), i*300);
  try{ bgMusic && bgMusic.play(); }catch(e){}
  gsap.to(window, {duration:1, onComplete:()=>{ alert('Wish Granted 🎉'); }});
}

resetBtn && resetBtn.addEventListener('click', ()=>{ if(rafId) cancelAnimationFrame(rafId); audioCtx && audioCtx.close(); audioCtx=null; buildCandles(); animateFlames(); if(smokeEl) smokeEl.classList.add('hidden'); if(micBtn){ micBtn.disabled=false; micBtn.textContent='Enable Mic'; } if(bgMusic) { bgMusic.pause(); bgMusic.currentTime=0; } });
micBtn && micBtn.addEventListener('click', ()=>{ console.log('[legacy_script] micBtn clicked'); enableMic(); });

// create a small mic status element next to the button for visibility
function ensureMicStatus(){
  if(!micBtn) return null;
  let s = document.getElementById('micStatus');
  if(!s){ s = document.createElement('span'); s.id='micStatus'; s.style.marginLeft='10px'; s.style.padding='6px 8px'; s.style.background='rgba(255,255,255,0.06)'; s.style.borderRadius='8px'; s.style.fontWeight='700'; s.style.color='#ffd9f0'; micBtn.parentNode && micBtn.parentNode.insertBefore(s, micBtn.nextSibling); }
  return s;
}

// Debug logs for main CTA buttons
toRoast && toRoast.addEventListener('click', ()=>{ console.log('[legacy_script] toRoast clicked'); document.getElementById('roast').scrollIntoView({behavior:'smooth'}) });
toCake && toCake.addEventListener('click', ()=>{ console.log('[legacy_script] toCake clicked'); document.getElementById('cake').scrollIntoView({behavior:'smooth'}) });

// Secret gift
secretBtn && secretBtn.addEventListener('click', ()=>{ SwalToast('Congratulations.\nYou ignored instructions perfectly.\nFree Lifetime Friendship Subscription Activated ❤️'); });

// Simple toast (no external library) – reuse for secret
function SwalToast(txt){ const d=document.createElement('div'); d.className='toast'; d.innerHTML = '<div>'+txt.replace(/\n/g,'<br>')+'</div>'; document.body.appendChild(d); gsap.fromTo(d,{y:50,opacity:0},{y:0,opacity:1,duration:0.6}); setTimeout(()=>gsap.to(d,{y:50,opacity:0,duration:0.6,onComplete:()=>d.remove()}),3500); }

// Gallery polaroids swing
document.querySelectorAll('.polaroid').forEach((p,i)=>{ gsap.to(p,{rotation:(Math.random()-0.5)*6, y: -6, duration:1.2+Math.random(), repeat:-1, yoyo:true, ease:'sine.inOut', delay:i*0.2}); });

// Final typewriter
const typeTexts = ['Behind all the jokes...','Thank you for being my best friend.','For every laugh.','For every rant.','For every memory.','Happy 25th Birthday ❤️'];
function runTypewriter(){ const el = document.getElementById('typewriter'); if(!el) return; let idx=0; function show(){ if(idx>=typeTexts.length) return; el.innerHTML=''; const txt=typeTexts[idx++]; let i=0; const t=setInterval(()=>{ el.innerHTML = txt.slice(0,i++); if(i>txt.length){ clearInterval(t); setTimeout(show,900); } },30); } show(); }

// Small helper: hero to sections
// Attach CTA handlers during init to ensure elements exist and are not covered
function attachCTAs(){
  const r = document.getElementById('toRoast') || toRoast;
  const c = document.getElementById('toCake') || toCake;
  if(r){ r.addEventListener('click', ()=>{ console.log('[legacy_script] toRoast clicked'); const el=document.getElementById('roast'); el && el.scrollIntoView({behavior:'smooth'}); }); }
  if(c){ c.addEventListener('click', ()=>{ console.log('[legacy_script] toCake clicked'); const el=document.getElementById('cake'); el && el.scrollIntoView({behavior:'smooth'}); }); }
}

// Initial animations once site visible
function initAnimations(){ initSparkles(); initBalloons(); gsap.from('.hero-title',{y:30,opacity:0,duration:1,delay:0.2}); gsap.from('.attention',{scale:0.8,opacity:0,duration:0.6}); gsap.from('.roast .card',{y:30,opacity:0,duration:0.8,stagger:0.12,delay:0.4}); gsap.from('.award',{y:20,opacity:0,duration:0.8,stagger:0.15,scrollTrigger:{trigger:'#awards',start:'top 80%'}}); buildCandles(); animateFlames(); ScrollTrigger.create({trigger:'#final',start:'top 60%',onEnter:()=>{ triggerFinal(); if(bgMusic){ try{ bgMusic.play(); }catch(e){} } }, once:true}); }
// ensure CTAs attached after animations init
function initAndAttach(){ initAnimations(); attachCTAs(); }

// call initAndAttach when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAndAttach);
} else {
  initAndAttach();
}

// Confetti on share (demo)
document.querySelector('.site-footer') && document.querySelector('.site-footer').addEventListener('click', ()=>{ confetti({particleCount:120,spread:200}); });

// End of file
