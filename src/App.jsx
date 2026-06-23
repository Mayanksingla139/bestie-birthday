import React, { useEffect } from 'react'
import initLegacy from './legacy/legacy'

export default function App(){
  useEffect(() => {
    initLegacy()
  }, [])

  return (
    <>
      <div id="netflixIntro" className="opening">
        <div className="loading-box">
          <h2 className="netflix-text">NETFLIX PRESENTS</h2>
          <h1 className="netflix-title">The Birthday Girl: <span className="season">Season 25</span></h1>
          <p className="netflix-episode">Episode 1: The Quarter-Life Crisis</p>
        </div>
      </div>

      <div id="opening" className="opening hidden">
        <div className="loading-box">
          <pre id="fake-log"></pre>
          <button id="enterBtn" className="enter-btn">ENTER</button>
        </div>
      </div>

      <div id="site" className="site hidden">
        <section id="hero" className="section hero">
          <div className="hero-inner">
            <h2 className="attention">🚨 Attention Everyone 🚨</h2>
            <h1 className="hero-title">A Human Has Successfully Survived <span className="age">25 Years</span></h1>
            <div className="hero-sub">Happy 25th Birthday, <span className="name">Harshika</span> 🎉</div>
            <div className="hero-effects">
              <canvas id="sparkles"></canvas>
              <div id="balloons" className="balloons"></div>
            </div>
            <div className="hero-cta">
              <button className="btn" id="toRoast">Roast Time 🔥</button>
              <button className="btn ghost" id="toCake">Blow Candles 🎂</button>
            </div>
          </div>
        </section>

        <section id="roast" className="section roast">
          <h3 className="section-title">Funny Roast</h3>
          <div className="cards">
            <div className="card">25 years old but still acts like she's 16</div>
            <div className="card">Professional overthinker since birth</div>
            <div className="card">Can spend 3 hours choosing a dress and still say 'I have nothing to wear'</div>
            <div className="card">CEO of mood swings</div>
            <div className="card">Still waiting for her main character moment</div>
          </div>
        </section>

        <section id="timeline" className="section timeline">
          <h3 className="section-title">Milestones</h3>
          <div className="timeline-wrap">
            <div className="timeline-item"> <span className="age-dot">1</span> <div className="tl-text">Discovered chaos</div></div>
            <div className="timeline-item"> <span className="age-dot">2</span> <div className="tl-text">Became dramatic</div></div>
            <div className="timeline-item"> <span className="age-dot">3</span> <div className="tl-text">Unlocked overthinking premium</div></div>
            <div className="timeline-item"> <span className="age-dot">4</span> <div className="tl-text">Mastered the Art of Dry Replies</div></div>
            <div className="timeline-item"> <span className="age-dot">5</span> <div className="tl-text">Legendary Bestie Edition</div></div>
          </div>
        </section>

        <section id="cake" className="section cake-section">
          <h3 className="section-title">Make a Wish</h3>
          <div className="cake-stage">
            <div id="cake3d" className="cake3d">
              <div className="cake-top"></div>
              <div className="cake-body"></div>
              <div className="candles" id="candles"></div>
              <div id="smoke" className="smoke hidden"></div>
            </div>
            <div className="cake-instructions">Allow microphone and blow to extinguish candles!</div>
            <div className="cake-controls">
              <button className="btn" id="micBtn">Enable Mic</button>
              <button className="btn ghost" id="resetCandles">Reset</button>
            </div>
          </div>
        </section>

        <section id="aiReport" className="section ai-report">
          <h3 className="section-title">AI Bestie Report</h3>
          <div className="report-cards">
            <div className="report-row">Drama Level <div className="bar" data-value="0" data-target="100"><div className="fill"></div><span className="percent">0%</span></div></div>
            <div className="report-row">Food Cravings <div className="bar" data-value="0" data-target="100"><div className="fill"></div><span className="percent">0%</span></div></div>
            <div className="report-row">Shopping Addiction <div className="bar" data-value="0" data-target="100"><div className="fill"></div><span className="percent">0%</span></div></div>
            <div className="report-row">Overthinking Capacity <div className="bar" data-value="0" data-target="100"><div className="fill"></div><span className="percent">0%</span></div></div>
            <div className="report-row">Cute Level <div className="bar" data-value="0" data-target="100"><div className="fill"></div><span className="percent">0%</span></div></div>
          </div>
          <div className="report-final">Final Result:<br/><strong>One of a kind.<br/>Cannot be replaced.</strong></div>
        </section>

        <section id="contract" className="section contract">
          <h3 className="section-title">Friendship Contract</h3>
          <div className="contract-card">
            <p className="contract-text">Terms and Conditions:</p>
            <ul>
              <li>✔ Must remain best friends</li>
              <li>✔ Must share gossip immediately</li>
              <li>✔ Must reply to memes within 24 hours</li>
              <li>✔ Must never disappear without explanation</li>
              <li>✔ Must celebrate future birthdays</li>
            </ul>
            <button id="acceptContract" className="btn">I Accept</button>
            <div id="signature" className="signature"></div>
          </div>
        </section>

        <div id="fakeWarning" className="fake-warning hidden">
          <div className="warning-box">
            <h3>⚠ Warning</h3>
            <p>This website contains excessive amounts of:</p>
            <ul>
              <li>Cuteness</li>
              <li>Chaos</li>
              <li>Drama</li>
              <li>Bad decisions</li>
              <li>Good memories</li>
            </ul>
            <button id="warnClose" className="btn ghost">Continue at your own risk</button>
          </div>
        </div>

        <section id="quiz" className="section quiz">
          <h3 className="section-title">Personality Quiz</h3>
          <div className="quiz-card">
            <p className="question">What is her natural habitat?</p>
            <div className="options">
              <button className="quiz-opt">A. Food Court</button>
              <button className="quiz-opt">B. Shopping Mall</button>
              <button className="quiz-opt">C. Bed</button>
              <button className="quiz-opt">D. Group Chat</button>
            </div>
            <div id="quizResult" className="quiz-result hidden">Correct Answer: All of the Above</div>
          </div>
        </section>

        <section id="stats" className="section stats">
          <h3 className="section-title">Friendship Statistics</h3>
          <div className="stats-grid">
            <div className="stat">Laughs Shared:<div className="stat-num">In progress</div></div>
            <div className="stat">Memes Sent:<div className="stat-num">In progress</div></div>
            <div className="stat">Random Rants:<div className="stat-num">In progress</div></div>
            <div className="stat">Embarrassing Moments:<div className="stat-num">Classified</div></div>
            <div className="stat">Friendship Level:<div className="stat-num">MAXED OUT ❤️</div></div>
          </div>
        </section>

        <div id="emergency" className="emergency">
          <button id="emBtn" className="btn danger">🚨 In Case Of Bad Day</button>
        </div>

        <section id="achievements" className="section achievements">
          <h3 className="section-title">Achievement Unlocked</h3>
          <div className="ach-grid">
            <div className="ach">🏆 Survived School</div>
            <div className="ach">🏆 Survived College</div>
            <div className="ach">🏆 Survived Family Questions</div>
            <div className="ach">🏆 Mastered Overthinking</div>
            <div className="ach">🏆 Reached Level 25</div>
          </div>
        </section>

        <div id="easterHints" className="hidden">
          <div id="eggBalloon">balloon</div>
          <div id="eggCake">cake</div>
          <div id="eggMoon">moon</div>
          <div id="eggHeart">heart</div>
        </div>

        <div id="sysUpdate" className="fake-warning hidden">
          <div className="warning-box">
            <h3>Installing Birthday Update v25.0...</h3>
            <p>New Features:</p>
            <ul>
              <li>✔ More wisdom</li>
              <li>✔ More confidence</li>
              <li>✔ More memories</li>
              <li>✔ Same old craziness</li>
            </ul>
            <div id="updateProgress" className="bar"><div className="fill"></div><span className="percent">0%</span></div>
            <button id="updateClose" className="btn">Finish</button>
          </div>
        </div>

        <div id="finalSurprise" className="fake-warning hidden">
          <div className="final-box">
            <button id="closeFinal" className="close-final-btn" aria-label="Close">×</button>
            <h2>Loading Special Message...</h2>
            <div id="specialText" className="special-text hidden">Out of 8 billion people,<br/>I'm really glad I got you as my best friend.<br/>Happy 25th Birthday ❤️</div>
          </div>
        </div>

        <section className="section secret">
          <button id="secretBtn" className="btn danger">Do Not Click</button>
        </section>

        <section id="awards" className="section awards">
          <h3 className="section-title">Bestie Awards</h3>
          <div className="awards-grid">
            <div className="award">🏆 Best Drama Queen</div>
            <div className="award">🏆 Certified Momos Lover</div>
            <div className="award">🏆 Professional Lip-Sync Artist</div>
            <div className="award">🏆 Future Muscle Loading... 1% Complete</div>
            <div className="award">🏆 World's Best Bestie</div>
          </div>
        </section>

        <section id="gallery" className="section gallery">
          <h3 className="section-title">Memory Gallery</h3>
          <div className="polaroids">
            <div className="polaroid"><img src="/images/gallery/child.jpeg" alt="photo"/><p>Evidence that she existed before Instagram</p></div>
            <div className="polaroid"><img src="/images/gallery/mirror-selfie.jpeg" alt="photo"/><p>That one iconic selfie</p></div>
            <div className="polaroid"><img src="/images/gallery/eyes.jpg" alt="photo"/><p>Proof that beautiful eyes exist</p></div>
            <div className="polaroid"><img src="/images/gallery/smile.jpeg" alt="photo"/><p>Proof that selfies were invented for her</p></div>
            <div className="polaroid"><img src="/images/gallery/cutie.jpeg" alt="photo"/><p>Proof of cuteness overload</p></div>
            <div className="polaroid"><img src="/images/gallery/model.jpeg" alt="photo"/><p>Future model in the making</p></div>
          </div>
        </section>

        <section id="final" className="section final dark">
          <div className="final-inner">
            <canvas id="stars"></canvas>
            <div className="typewriter" id="typewriter"></div>
          </div>
        </section>

        <section className="section finale">
          <div className="finale-inner">
            <h2>Made with ❤️ by your favorite human</h2>
          </div>
        </section>

        <footer className="site-footer">Share this with Harshika ✨</footer>
      </div>
      <audio id="bgMusic" src="https://cdn.pixabay.com/download/audio/2021/10/18/audio_1b3f0e9e4c.mp3?filename=happy-hip-hop-116076.mp3" preload="none" />
    </>
  )
}
