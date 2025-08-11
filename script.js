// ==== Data Structures ====
const tipsByMood = {
  Calm: [
    "Take deep breaths to centre yourself.",
    "Focus on one task in a peaceful setting.",
    "Use gentle music to stay relaxed."
  ],
  Energetic: [
    "Channel energy into bursts of work.",
    "Try high-intensity sprints.",
    "Keep pace and take active breaks."
  ],
  Focused: [
    "Remove distractions and set a timer.",
    "Batch tasks to maintain focus.",
    "Review goals before starting."
  ],
  Stressed: [
    "Take 5-minute mindfulness breaks.",
    "Write worries down to clear your head.",
    "Practice grounding exercises."
  ],
  Happy: [
    "Celebrate small wins often.",
    "Share tips with friends.",
    "Repeat positive affirmations."
  ],
  Thoughtful: [
    "Journal before complex tasks.",
    "Plan your day intentionally.",
    "Use pauses to reflect and adjust."
  ],
  Anxious: [
    "Break work into tiny steps.",
    "Use calming visualisations.",
    "Breathe slowly and deeply."
  ],
  Relaxed: [
    "Work with your natural rhythm.",
    "Take gentle breaks often.",
    "Focus on flow rather than time limits."
  ]
};

const moods = [
  { name: "Calm", color: "var(--burnished-gold)" },
  { name: "Energetic", color: "orange" },
  { name: "Focused", color: "deepskyblue" },
  { name: "Stressed", color: "tomato" },
  { name: "Happy", color: "gold" },
  { name: "Thoughtful", color: "plum" },
  { name: "Anxious", color: "hotpink" },
  { name: "Relaxed", color: "mediumturquoise" }
];

let currentMoodIndex = 0;
let consciousnessLevel = 0;

// ==== DOM Elements ====
const tipEl = document.getElementById('tip');
const moodLabel = document.getElementById('moodLabel');
const hrvSpan = document.getElementById('hrvValue');
const cogLoadSpan = document.getElementById('cogLoad');
const flowStateSpan = document.getElementById('flowState');
const consciousnessBar = document.getElementById('consciousnessBar');
const appContainer = document.getElementById('app-container');

// ==== Functions ====

function updateMoodUI() {
  const mood = moods[currentMoodIndex];
  moodLabel.textContent = `Mood: ${mood.name}`;
  moodLabel.style.color = mood.color;
  appContainer.style.borderColor = mood.color;
}

function showMoodTip() {
  const moodName = moods[currentMoodIndex].name;
  const tips = tipsByMood[moodName];
  tipEl.textContent = tips[Math.floor(Math.random() * tips.length)];
  increaseConsciousness(5);
}

function increaseConsciousness(amount) {
  consciousnessLevel = Math.min(100, consciousnessLevel + amount);
  consciousnessBar.value = consciousnessLevel;
  consciousnessBar.setAttribute('aria-valuenow', consciousnessLevel.toFixed(0));
  // Glow effect linked to consciousness level
  const glow = Math.min(0.6, consciousnessLevel / 180);
  appContainer.style.boxShadow = `0 0 20px rgba(212,175,55,${glow})`;
}

function getRandomInRange(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

function updateBioFeedback() {
  hrvSpan.textContent = getRandomInRange(50, 120);
  cogLoadSpan.textContent = getRandomInRange(20, 70);
  flowStateSpan.textContent = getRandomInRange(30, 90);
  increaseConsciousness(parseFloat(flowStateSpan.textContent) * 0.05);
}

// ==== Event Listeners ====

document.getElementById('moodButton').addEventListener('click', () => {
  currentMoodIndex = (currentMoodIndex + 1) % moods.length;
  updateMoodUI();
  showMoodTip();
});

// ==== Periodic Updates ====

setInterval(() => {
  consciousnessLevel = Math.max(0, consciousnessLevel - 0.5);
  consciousnessBar.value = consciousnessLevel;
  consciousnessBar.setAttribute('aria-valuenow', consciousnessLevel.toFixed(0));
  appContainer.style.boxShadow = `0 0 20px rgba(212,175,55,${Math.min(0.6, consciousnessLevel / 180)})`;
}, 10000);

setInterval(updateBioFeedback, 5000);

// Initialize UI on load
updateMoodUI();
updateBioFeedback();

// ==== Three.js 3D Molecular Visualization ====

const canvas = document.getElementById('threejs-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const ambientLight = new THREE.AmbientLight(0x9e8d00, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffd966, 1.0);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

const molecule = new THREE.Group();

const atomGeo = new THREE.SphereGeometry(1, 32, 32);
const atomMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  roughness: 0.3,
  metalness: 1,
  emissive: 0xc29929,
  emissiveIntensity: 0.3,
  clearcoat: 1,
  clearcoatRoughness: 0.2
});

const atomPositions = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(3, 3, 0),
  new THREE.Vector3(-3, -3, 0),
  new THREE.Vector3(-3, 3, 0),
  new THREE.Vector3(3, -3, 0)
];

atomPositions.forEach(pos => {
  const atom = new THREE.Mesh(atomGeo, atomMat);
  atom.position.copy(pos);
  molecule.add(atom);
});

const bondMat = new THREE.MeshStandardMaterial({
  color: 0xd4af37,
  roughness: 0.1,
  metalness: 0.9,
  emissive: 0xc29929,
  emissiveIntensity: 0.2
});

function createBond(p1, p2) {
  const length = p1.distanceTo(p2);
  const cylinderGeo = new THREE.CylinderGeometry(0.15, 0.15, length, 20);
  const bond = new THREE.Mesh(cylinderGeo, bondMat);

  bond.position.copy(p1).lerp(p2, 0.5);

  const axis = new THREE.Vector3(0, 1, 0);
  const dir = new THREE.Vector3().subVectors(p2, p1).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(axis, dir);
  bond.setRotationFromQuaternion(quaternion);

  return bond;
}

for (let i = 1; i < atomPositions.length; i++) {
  molecule.add(createBond(atomPositions[0], atomPositions[i]));
}

scene.add(molecule);

function animate() {
  requestAnimationFrame(animate);

  molecule.rotation.y += 0.008;
  molecule.rotation.x += 0.004;

  const emissivePulse = 0.25 + 0.15 * Math.sin(performance.now() / 400);
  atomMat.emissiveIntensity = emissivePulse;
  bondMat.emissiveIntensity = emissivePulse * 0.7;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
