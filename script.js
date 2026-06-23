// Legacy script copied for compatibility in React dev. You can later refactor into components.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'

window.confetti = confetti; // expose global
gsap.registerPlugin(ScrollTrigger)

// Wait for DOM ready then inject the original viral_birthday HTML
function fetchOriginal(){
  return fetch('/../index.html').then(r=>r.text()).catch(()=>Promise.resolve('<div style="padding:40px"><h2>Viral Birthday</h2><p>Original content not found.</p></div>'));
}

async function init(){
  const html = await fetchOriginal();
  const container = document.getElementById('app-root') || document.body;
  const tmp = document.createElement('div'); tmp.innerHTML = html;
  // move head-only elements like audio into body
  const bodyInner = tmp.querySelector('body') || tmp;
  while(bodyInner.firstChild) container.appendChild(bodyInner.firstChild);
  // now load the original script from parent folder if exists
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
