<canvas id="threejs-canvas" aria-hidden="true"></canvas>

<main id="app-container" role="main" aria-label="Noble Productivity Application">

  <h1>
    <span id="chakra-symbol" aria-hidden="true"></span>
    Noble Productivity Suite
  </h1>

  <div id="tip" aria-live="polite" aria-atomic="true" aria-relevant="text">
    Click the 🧠 button to cycle moods and see mood-adapted tips.
  </div>

  <div id="controls" role="group" aria-label="Controls">
    <button id="moodButton" title="Cycle Mood" type="button" aria-live="polite" aria-atomic="true">🧠</button>
  </div>

  <div id="moodLabel" aria-live="polite" aria-atomic="true">
    Mood: Calm
  </div>

  <section id="bioFeedback" aria-label="Biofeedback Metrics" role="region" tabindex="0">
    <div>❤️ Heart Rate Variability: <span id="hrvValue">--</span> ms</div>
    <div>🧠 Cognitive Load: <span id="cogLoad">--</span> %</div>
    <div>⚡ Flow State: <span id="flowState">--</span> %</div>
  </section>

  <div id="consciousnessWrapper">
    <label for="consciousnessBar">Consciousness Synchronization</label>
    <progress id="consciousnessBar" value="0" max="100"></progress>
  </div>
</main>

<!-- Import three.js library -->
<script src="https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js"></script>