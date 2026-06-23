import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import confetti from 'canvas-confetti'

gsap.registerPlugin(ScrollTrigger)

export default function initLegacy(){
  const site = document.getElementById('site')
  const netflixIntro = document.getElementById('netflixIntro')
  const opening = document.getElementById('opening')
  const fakeLog = document.getElementById('fake-log')
  const enterBtn = document.getElementById('enterBtn')
  const toRoast = document.getElementById('toRoast')
  const toCake = document.getElementById('toCake')
  const sparklesCanvas = document.getElementById('sparkles')
  const balloonsEl = document.getElementById('balloons')
  const roastCards = document.querySelectorAll('.roast .card')
  const timelineItems = document.querySelectorAll('.timeline-item')
  const candlesContainer = document.getElementById('candles')
  const micBtn = document.getElementById('micBtn')
  const resetBtn = document.getElementById('resetCandles')
  const smokeEl = document.getElementById('smoke')
  const bgMusic = document.getElementById('bgMusic')
  const secretBtn = document.getElementById('secretBtn')
  const fakeWarning = document.getElementById('fakeWarning')
  const warnClose = document.getElementById('warnClose')
  const acceptContract = document.getElementById('acceptContract')
  const signatureEl = document.getElementById('signature')
  const sysUpdate = document.getElementById('sysUpdate')
  const updateClose = document.getElementById('updateClose')
  const updateProgress = document.getElementById('updateProgress')
  const finalSurprise = document.getElementById('finalSurprise')
  const closeFinal = document.getElementById('closeFinal')
  const specialText = document.getElementById('specialText')
  const emBtn = document.getElementById('emBtn')

  let candleCount = 25
  let litCandles = []
  let audioCtx = null
  let analyser = null
  let micStream = null
  let dataArray = null
  let rafId = null
  let blowing = false

  function clamp(value, min, max){ return Math.min(Math.max(value, min), max) }

  function showSite(){
    netflixIntro?.classList.add('hidden')
    opening?.classList.add('hidden')
    site?.classList.remove('hidden')
    window.requestAnimationFrame(() => {
      try { ScrollTrigger.refresh() } catch (e) { console.warn('ScrollTrigger refresh failed', e) }
    })
  }

  function startIntroSequence(){
    if(!netflixIntro || !opening || !site) {
      site?.classList.remove('hidden')
      return
    }

    const lines = [
      'SYSTEM: Birthday protocol online...',
      'LOADING: surprise sequence',
      'COMPLETE: ready to celebrate'
    ]

    function typeLine(text, callback){
      if(!fakeLog) { callback(); return }
      let i = 0
      const lines = fakeLog.textContent.split('\n')
      const prefix = lines.slice(0, -1).join('\n')
      const base = prefix ? `${prefix}\n` : ''
      const interval = window.setInterval(() => {
        fakeLog.textContent = base + text.slice(0, i + 1)
        i += 1
        if(i > text.length){
          window.clearInterval(interval)
          fakeLog.textContent += '\n'
          window.setTimeout(callback, 350)
        }
      }, 30)
    }

    function nextLine(index){
      if(index >= lines.length){
        enterBtn?.classList.remove('hidden')
        enterBtn?.focus()
        return
      }
      typeLine(lines[index], () => nextLine(index + 1))
    }

    window.setTimeout(() => {
      netflixIntro.classList.add('hidden')
      opening.classList.remove('hidden')
      nextLine(0)
    }, 1800)

    enterBtn?.addEventListener('click', showSite)
  }

  function initSparkles(){
    const canvas = sparklesCanvas
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    if(!ctx) return

    function resize(){
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []
    function spawn(){
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.8,
        a: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2
      })
    }
    for(let i = 0; i < 60; i += 1) spawn()

    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.a += (Math.random() - 0.5) * 0.02
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
        if(p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height){
          p.x = Math.random() * canvas.width
          p.y = Math.random() * canvas.height
        }
      })
      requestAnimationFrame(draw)
    }
    draw()
  }

  function runAIReport(){
    const bars = document.querySelectorAll('.ai-report .bar')
    bars.forEach(b => {
      const raw = b.getAttribute('data-target') || ''
      let target = 100
      if(raw !== 'infinite'){
        const parsed = parseInt(raw || '0', 10)
        target = Number.isNaN(parsed) ? 100 : clamp(parsed, 0, 100)
      }
      const fill = b.querySelector('.fill')
      const pct = b.querySelector('.percent')
      if(fill) gsap.to(fill, { width: `${target}%`, duration: 1.6, ease: 'power2.out' })
      if(pct){
        const obj = { val: 0 }
        gsap.to(obj, { val: target, duration: 1.6, roundProps: 'val', onUpdate: () => { pct.textContent = `${Math.floor(obj.val)}%` } })
      }
    })
  }

  function initBalloons(){
    if(!balloonsEl) return
    const icons = ['🎈', '🎈', '🎉', '🎈']
    for(let i = 0; i < 10; i += 1){
      const el = document.createElement('div')
      el.className = 'balloon'
      el.style.position = 'absolute'
      el.style.left = `${Math.random() * 80 + 5}%`
      el.style.top = `${60 + Math.random() * 30}%`
      el.style.fontSize = `${20 + Math.random() * 28}px`
      el.innerText = icons[Math.floor(Math.random() * icons.length)]
      balloonsEl.appendChild(el)
      gsap.to(el, { y: '-80vh', duration: 8 + Math.random() * 6, repeat: -1, ease: 'sine.inOut', delay: Math.random() * 3 })
    }
  }

  if(roastCards && roastCards.length){
    roastCards.forEach(card => {
      try{
        gsap.set(card, { transformStyle: 'preserve-3d' })
        ScrollTrigger.create({
          trigger: card,
          start: 'top 80%',
          onEnter: () => gsap.fromTo(card,{ rotationX: 90, opacity: 0 },{ rotationX: 0, opacity: 1, duration: 0.8, ease:'back.out(1.7)' }),
          onEnterBack: () => gsap.fromTo(card,{ rotationX: 90, opacity: 0 },{ rotationX: 0, opacity: 1, duration: 0.8, ease:'back.out(1.7)' })
        })
      } catch (error) {
        console.warn('roast card init failed', error)
      }
    })
  }

  timelineItems.forEach((item) => {
    gsap.fromTo(item,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    )
  })

  if(acceptContract){
    acceptContract.addEventListener('click', () => {
      if(signatureEl){
        signatureEl.innerHTML = ''
        const s = document.createElement('div')
        s.textContent = 'Signed digitally by my bandri 🐒'
        s.style.fontWeight = '800'
        s.style.color = '#ffd9f0'
        signatureEl.appendChild(s)
        gsap.fromTo(s, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
      }
      SwalToast('Contract signed ✔')
    })
  }

  if(warnClose && fakeWarning){
    window.addEventListener('scroll', () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if(pct > 0.25 && Math.random() < 0.25 && fakeWarning.classList.contains('hidden')){
        fakeWarning.classList.remove('hidden')
        gsap.fromTo(fakeWarning, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 })
      }
    })
    warnClose.addEventListener('click', () => {
      gsap.to(fakeWarning, { autoAlpha: 0, duration: 0.4, onComplete: () => fakeWarning.classList.add('hidden') })
    })
  }

  document.querySelectorAll('.quiz-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      const quizResult = document.getElementById('quizResult')
      if(quizResult){
        quizResult.classList.remove('hidden')
        gsap.fromTo(quizResult, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
      }
    })
  })

  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10)
    const obj = { val: 0 }
    gsap.to(obj, { duration: 2.2, ease: 'power2.out', val: target, roundProps: 'val', onUpdate: () => { el.textContent = String(Math.floor(obj.val)) } })
  })

  if(emBtn){
    emBtn.addEventListener('click', () => {
      for(let i = 0; i < 20; i += 1){
        setTimeout(() => {
          confetti({ particleCount: 20, spread: 120, origin: { x: Math.random(), y: Math.random() * 0.6 } })
        }, i * 120)
      }
      SwalToast('Reminder:\nYou are loved.\nYou are appreciated.\nYou are stronger than you think.')
    })
  }

  const achs = document.querySelectorAll('.ach')
  if(achs && achs.length){
    achs.forEach((a, index) => {
      try{
        gsap.fromTo(a,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.2 + index * 0.1,
            ease: 'power2.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: a,
              start: 'top 90%',
              toggleActions: 'play none none none',
              once: true
            }
          }
        )
      } catch(error){ console.warn('ach anim error', error) }
    })
  }

  document.body.addEventListener('click', (event) => {
    const target = event.target
    if(target.classList.contains('balloon')){ SwalToast('Pop!') }
    if(target.closest('#cake3d')){ SwalToast('Stop stealing cake before cutting it.') }
    if(target.id === 'eggMoon'){ SwalToast('Still awake at 2AM?') }
    if(target.id === 'eggHeart'){ SwalToast('Bestie Detected ❤️') }
  })

  if(updateClose && sysUpdate){
    updateClose.addEventListener('click', () => {
      gsap.to(sysUpdate, { autoAlpha: 0, duration: 0.3, onComplete: () => sysUpdate.classList.add('hidden') })
    })
  }

  if(closeFinal && finalSurprise){
    closeFinal.addEventListener('click', () => {
      gsap.to(finalSurprise, { autoAlpha: 0, duration: 0.3, onComplete: () => finalSurprise.classList.add('hidden') })
    })
  }

  function onAllCandlesOut(){
    if(smokeEl){
      smokeEl.classList.remove('hidden')
      gsap.fromTo(smokeEl, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 1 })
    }
    confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 } })
    confetti({ particleCount: 120, spread: 260, origin: { y: 0.35 } })
    for(let i = 0; i < 6; i += 1){
      setTimeout(() => { confetti({ particleCount: 40, spread: 360, origin: { x: Math.random(), y: Math.random() * 0.5 } }) }, i * 300)
    }
    try{ bgMusic?.play() } catch(e){}
    gsap.to(window, { duration: 1, onComplete: () => { SwalToast('Wish Granted 🎉') } })
  }

  function buildCandles(){
    if(!candlesContainer) return
    candlesContainer.innerHTML = ''
    litCandles = []
    for(let i = 0; i < candleCount; i += 1){
      const c = document.createElement('div')
      c.className = 'candle'
      const flame = document.createElement('div')
      flame.className = 'flame'
      flame.style.transition = 'opacity 0.3s'
      flame.style.boxShadow = '0 6px 12px rgba(255,150,60,0.6)'
      c.appendChild(flame)
      candlesContainer.appendChild(c)
      litCandles.push({ el: c, flame })
    }
  }

  function animateFlames(){
    litCandles.forEach((item) => {
      gsap.fromTo(item.flame, { scale: 0.9, rotation: 0 }, { scale: 1.12, rotation: (Math.random() - 0.5) * 6, repeat: -1, yoyo: true, duration: 0.12 + Math.random() * 0.2 })
    })
  }

  function ensureMicStatus(){
    if(!micBtn) return null
    let status = document.getElementById('micStatus')
    if(!status){
      status = document.createElement('span')
      status.id = 'micStatus'
      status.style.marginLeft = '10px'
      status.style.padding = '6px 8px'
      status.style.background = 'rgba(255,255,255,0.06)'
      status.style.borderRadius = '8px'
      status.style.fontWeight = '700'
      status.style.color = '#ffd9f0'
      micBtn.parentNode?.insertBefore(status, micBtn.nextSibling)
    }
    return status
  }

  function handleBlow(){
    const toBlow = Math.min(litCandles.length, 1 + Math.floor(Math.random() * 3))
    for(let i = 0; i < toBlow; i += 1){
      const last = litCandles.pop()
      if(!last) break
      gsap.to(last.flame, { opacity: 0, scale: 0.4, duration: 0.6, ease: 'power2.out' })
      last.el.classList.add('out')
    }
    if(litCandles.length === 0) onAllCandlesOut()
  }

  function monitorMic(){
    if(!analyser) return
    analyser.getByteTimeDomainData(dataArray)
    let sum = 0
    for(let i = 0; i < dataArray.length; i += 1){
      const v = (dataArray[i] - 128) / 128
      sum += v * v
    }
    const rms = Math.sqrt(sum / dataArray.length)
    if(rms > 0.09){
      if(!blowing){ blowing = true; handleBlow() }
    } else {
      blowing = false
    }
    rafId = requestAnimationFrame(monitorMic)
  }

  function enableMic(){
    const status = ensureMicStatus()
    if(audioCtx){
      if(status) status.textContent = 'Mic: Enabled'
      return
    }
    if(!navigator.mediaDevices?.getUserMedia){
      if(status) status.textContent = 'Mic: Unsupported'
      alert('Microphone not supported in this browser.')
      return
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)()
      micStream = audioCtx.createMediaStreamSource(stream)
      analyser = audioCtx.createAnalyser()
      analyser.fftSize = 512
      const bufferLength = analyser.frequencyBinCount
      dataArray = new Uint8Array(bufferLength)
      micStream.connect(analyser)
      monitorMic()
      if(micBtn){ micBtn.textContent = 'Mic Enabled'; micBtn.disabled = true }
      if(status) status.textContent = 'Mic: Enabled'
      SwalToast('Make a wish Bandri!<br/>Now blow the candles 🎂')
    }).catch((err) => {
      console.error('getUserMedia error', err)
      if(micBtn){ micBtn.textContent = 'Mic blocked'; micBtn.disabled = false }
      if(status) status.textContent = 'Mic: Blocked'
      SwalToast('Microphone access is required for the blowing feature.')
    })
  }

  resetBtn?.addEventListener('click', () => {
    if(rafId) cancelAnimationFrame(rafId)
    if(audioCtx){ audioCtx.close(); audioCtx = null }
    buildCandles()
    animateFlames()
    if(smokeEl) smokeEl.classList.add('hidden')
    if(micBtn){ micBtn.disabled = false; micBtn.textContent = 'Enable Mic' }
    if(bgMusic){ bgMusic.pause(); bgMusic.currentTime = 0 }
  })

  micBtn?.addEventListener('click', () => { enableMic() })

  function attachCTAs(){
    const roast = document.getElementById('toRoast') || toRoast
    const cake = document.getElementById('toCake') || toCake
    roast?.addEventListener('click', () => { document.getElementById('roast')?.scrollIntoView({ behavior: 'smooth' }) })
    cake?.addEventListener('click', () => { document.getElementById('cake')?.scrollIntoView({ behavior: 'smooth' }) })
  }

  function SwalToast(txt){
    const d = document.createElement('div')
    d.className = 'toast'
    d.innerHTML = `<div>${txt.replace(/\n/g, '<br>')}</div>`
    document.body.appendChild(d)
    gsap.fromTo(d, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
    setTimeout(() => { gsap.to(d, { y: 50, opacity: 0, duration: 0.6, onComplete: () => d.remove() }) }, 3500)
  }

  function runTypewriter(){
    const el = document.getElementById('typewriter')
    if(!el) return
    const typeTexts = [
      'Behind all the jokes...',
      'Thank you for being my best friend.',
      'For every laugh.',
      'For every rant.',
      'For every memory.',
      'Happy 25th Birthday ❤️'
    ]
    let idx = 0
    function show(){
      if(idx >= typeTexts.length) return
      el.innerHTML = ''
      const txt = typeTexts[idx++]
      let i = 0
      const interval = setInterval(() => {
        el.innerHTML = txt.slice(0, i + 1)
        i += 1
        if(i > txt.length){ clearInterval(interval); setTimeout(show, 900) }
      }, 30)
    }
    show()
  }

  document.querySelectorAll('.polaroid').forEach((p, i) => {
    gsap.to(p, { rotation: (Math.random() - 0.5) * 6, y: -6, duration: 1.2 + Math.random(), repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.2 })
  })

  function triggerFinal(){
    finalSurprise?.classList.remove('hidden')
    if(finalSurprise){ gsap.fromTo(finalSurprise, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }) }
    setTimeout(() => {
      specialText?.classList.remove('hidden')
      if(specialText){ gsap.fromTo(specialText, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1.2 }) }
      for(let i = 0; i < 8; i += 1){
        setTimeout(() => { confetti({ particleCount: 80, spread: 200, origin: { x: Math.random(), y: Math.random() * 0.3 } }) }, i * 300)
      }
    }, 1200)
  }

  ScrollTrigger.create({ trigger: '#aiReport', start: 'top 80%', onEnter: runAIReport, once: true })
  ScrollTrigger.create({ trigger: '.finale', start: 'top 60%', onEnter: () => { triggerFinal(); if(bgMusic){ try{ bgMusic.play() }catch(e){} } }, once: true })

  if(secretBtn){
    secretBtn.addEventListener('click', () => {
      SwalToast('Congratulations.\nYou ignored instructions perfectly.\nFree Lifetime Friendship Subscription Activated ❤️')
    })
  }

  function initAnimations(){
    initSparkles()
    initBalloons()
    gsap.from('.hero-title', { y: 30, opacity: 0, duration: 1, delay: 0.2 })
    gsap.from('.attention', { scale: 0.8, opacity: 0, duration: 0.6 })
    gsap.from('.roast .card', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.4 })
    buildCandles()
    animateFlames()
    attachCTAs()
    runTypewriter()
  }

  function initAndAttach(){
    initAnimations()
    attachCTAs()
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
      startIntroSequence()
      initAndAttach()
    })
  } else {
    startIntroSequence()
    initAndAttach()
  }
}
