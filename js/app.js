/* ============================================================
   APP.JS — Orquestador principal.
   Conecta storage.js, questions.js, institutional-dashboard.js
   y my-progress.js con la interfaz: navegación entre pantallas,
   onboarding, sesión de reflexión, y arranque de la app.
   ============================================================ */

/* ---- Navegación entre pantallas ---- */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ---- Pantalla de bienvenida ---- */
function renderWelcome() {
  const profile = getProfile();
  const welcomeBack = document.getElementById('welcomeBack');
  if (profile && profile.nombre) {
    const history = getHistory();
    welcomeBack.textContent = `Bienvenido de vuelta, ${profile.nombre}. Llevas ${history.length} reflexión(es) guardadas.`;
  } else {
    welcomeBack.textContent = '';
  }
}

document.getElementById('beginBtn').addEventListener('click', () => {
  const profile = getProfile();
  if (!profile) {
    showScreen('screen-onboarding');
  } else {
    startSession();
  }
});

/* ---- Onboarding ---- */
document.getElementById('onboardingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const profile = {
    nombre: document.getElementById('ob-nombre').value.trim(),
    identidad: document.getElementById('ob-identidad').value.trim(),
    motivacion: document.getElementById('ob-motivacion').value.trim(),
    miedos: document.getElementById('ob-miedos').value.trim(),
    fortalezas: document.getElementById('ob-fortalezas').value.trim(),
    estado: document.getElementById('ob-estado').value.trim(),
    createdAt: new Date().toISOString()
  };
  saveProfile(profile);
  startSession();
});

/* ---- Sesión de reflexión ---- */
let currentQuestion = '';

function startSession() {
  currentQuestion = pickQuestion();
  document.getElementById('sessionQuestion').textContent = currentQuestion;
  document.getElementById('sessionAnswer').value = '';
  showScreen('screen-session');
  document.getElementById('sessionAnswer').focus();
}

document.getElementById('saveAnswerBtn').addEventListener('click', () => {
  const answer = document.getElementById('sessionAnswer').value.trim();
  if (answer.length > 0) {
    addHistoryEntry(currentQuestion, answer);
  }
  startSession();
});

document.getElementById('finishSessionBtn').addEventListener('click', () => {
  const answer = document.getElementById('sessionAnswer').value.trim();
  if (answer.length > 0) {
    addHistoryEntry(currentQuestion, answer);
  }
  renderWelcome();
  showScreen('screen-welcome');
});

/* ---- Conectar botones de los dashboards con su lógica ---- */
document.getElementById('openDashboard').addEventListener('click', openDashboard);
document.getElementById('closeDashboard').addEventListener('click', closeDashboard);

document.getElementById('openMyProgress').addEventListener('click', openMyProgress);
document.getElementById('closeMyProgress').addEventListener('click', closeMyProgress);

document.getElementById('resetDataBtn').addEventListener('click', () => {
  const confirmed = confirm('¿Seguro que quieres borrar tu perfil e historial? Esta acción no se puede deshacer.');
  if (confirmed) {
    clearAllData();
    closeMyProgress();
    renderWelcome();
    showScreen('screen-welcome');
  }
});

/* ---- Accesibilidad global ---- */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDashboard();
    closeMyProgress();
  }
});

/* ---- Arranque de la app ---- */
renderWelcome();
