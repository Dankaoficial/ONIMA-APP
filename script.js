/* ============================================================
       ESTADO Y PERSISTENCIA (localStorage)
       ============================================================ */
    const PROFILE_KEY = 'onima_profile';
    const HISTORY_KEY = 'onima_history';

    function getProfile() {
      try {
        const raw = localStorage.getItem(PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    }

    function saveProfile(profile) {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }

    function getHistory() {
      try {
        const raw = localStorage.getItem(HISTORY_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    }

    function saveHistory(history) {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }

    function addHistoryEntry(question, answer) {
      const history = getHistory();
      history.push({
        question,
        answer,
        date: new Date().toISOString()
      });
      saveHistory(history);
    }

    /* ============================================================
       NAVEGACIÓN ENTRE PANTALLAS
       ============================================================ */
    function showScreen(id) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    /* ============================================================
       PANTALLA DE BIENVENIDA
       ============================================================ */
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

    /* ============================================================
       ONBOARDING
       ============================================================ */
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

    /* ============================================================
       SESIÓN DE REFLEXIÓN
       ============================================================ */
    const REFLECTION_QUESTIONS = [
      "¿Quién eres cuando nadie te está viendo?",
      "¿Qué parte de ti dejaste de escuchar?",
      "¿Estás avanzando, o solo te estás moviendo?",
      "¿Qué decisión has estado posponiendo?",
      "¿A quién le tienes que dejar de rendir cuentas para ser tú mismo?",
      "¿Qué harías si supieras que no vas a fallar?",
      "¿Qué te dio energía esta semana, aunque fuera un momento pequeño?",
      "¿De qué te arrepentirías si tu semestre terminara hoy?"
    ];

    let currentQuestion = '';

    function pickQuestion() {
      const history = getHistory();
      const recent = history.slice(-3).map(h => h.question);
      const available = REFLECTION_QUESTIONS.filter(q => !recent.includes(q));
      const pool = available.length > 0 ? available : REFLECTION_QUESTIONS;
      return pool[Math.floor(Math.random() * pool.length)];
    }

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

    /* ============================================================
       DASHBOARD INSTITUCIONAL (datos simulados — igual que antes)
       ============================================================ */
    const cohortBefore = [
      { ansiedad: 78, desconexionVocacional: 64, aislamiento: 55 },
      { ansiedad: 82, desconexionVocacional: 70, aislamiento: 60 },
      { ansiedad: 65, desconexionVocacional: 58, aislamiento: 48 },
      { ansiedad: 90, desconexionVocacional: 75, aislamiento: 68 },
      { ansiedad: 71, desconexionVocacional: 60, aislamiento: 50 },
      { ansiedad: 85, desconexionVocacional: 68, aislamiento: 62 },
      { ansiedad: 60, desconexionVocacional: 55, aislamiento: 45 },
      { ansiedad: 88, desconexionVocacional: 72, aislamiento: 65 }
    ];

    const cohortAfter = [
      { ansiedad: 45, desconexionVocacional: 30, aislamiento: 25 },
      { ansiedad: 50, desconexionVocacional: 35, aislamiento: 28 },
      { ansiedad: 38, desconexionVocacional: 25, aislamiento: 20 },
      { ansiedad: 55, desconexionVocacional: 40, aislamiento: 32 },
      { ansiedad: 42, desconexionVocacional: 28, aislamiento: 22 },
      { ansiedad: 48, desconexionVocacional: 33, aislamiento: 27 },
      { ansiedad: 35, desconexionVocacional: 22, aislamiento: 18 },
      { ansiedad: 52, desconexionVocacional: 38, aislamiento: 30 }
    ];

    const WEIGHTS = { ansiedad: 0.5, desconexionVocacional: 0.3, aislamiento: 0.2 };

    function riskIndex(student) {
      return (
        student.ansiedad * WEIGHTS.ansiedad +
        student.desconexionVocacional * WEIGHTS.desconexionVocacional +
        student.aislamiento * WEIGHTS.aislamiento
      );
    }

    function cohortAverage(cohort) {
      const total = cohort.reduce((sum, s) => sum + riskIndex(s), 0);
      return Math.round(total / cohort.length);
    }

    function metricAverage(cohort, key) {
      const total = cohort.reduce((sum, s) => sum + s[key], 0);
      return Math.round(total / cohort.length);
    }

    const beforeScore = cohortAverage(cohortBefore);
    const afterScore = cohortAverage(cohortAfter);
    const delta = beforeScore - afterScore;

    const metrics = [
      { key: 'ansiedad', label: 'Ansiedad educativa' },
      { key: 'desconexionVocacional', label: 'Desconexión vocacional' },
      { key: 'aislamiento', label: 'Aislamiento social' }
    ];

    function renderBars() {
      const container = document.getElementById('bars');
      container.innerHTML = '';
      metrics.forEach(m => {
        const before = metricAverage(cohortBefore, m.key);
        const after = metricAverage(cohortAfter, m.key);

        const rowBefore = document.createElement('div');
        rowBefore.className = 'bar-row';
        rowBefore.innerHTML = `
          <div class="bar-label">${m.label} (antes)</div>
          <div class="bar-track"><div class="bar-fill risk-before" style="width:${before}%"></div></div>
          <div class="bar-value">${before}</div>
        `;

        const rowAfter = document.createElement('div');
        rowAfter.className = 'bar-row';
        rowAfter.innerHTML = `
          <div class="bar-label">${m.label} (después)</div>
          <div class="bar-track"><div class="bar-fill" style="width:${after}%"></div></div>
          <div class="bar-value">${after}</div>
        `;

        container.appendChild(rowBefore);
        container.appendChild(rowAfter);
      });
    }

    function openDashboard() {
      document.getElementById('dashboard').classList.add('visible');
      document.getElementById('kpiBefore').textContent = beforeScore;
      document.getElementById('kpiAfter').textContent = afterScore;
      document.getElementById('kpiDelta').textContent = `−${delta} puntos de riesgo tras 12 semanas con ONIMA`;
      renderBars();
      requestAnimationFrame(() => {
        document.querySelectorAll('#dashboard .bar-fill').forEach(el => {
          const w = el.style.width;
          el.style.width = '0%';
          requestAnimationFrame(() => { el.style.width = w; });
        });
      });
    }

    function closeDashboard() {
      document.getElementById('dashboard').classList.remove('visible');
    }

    document.getElementById('openDashboard').addEventListener('click', openDashboard);
    document.getElementById('closeDashboard').addEventListener('click', closeDashboard);

    /* ============================================================
       MI PROGRESO (datos REALES del usuario)
       ============================================================ */
    function calcStreak(history) {
      if (history.length === 0) return 0;
      const days = [...new Set(history.map(h => h.date.slice(0, 10)))].sort().reverse();
      let streak = 0;
      let cursor = new Date();
      for (const day of days) {
        const cursorStr = cursor.toISOString().slice(0, 10);
        if (day === cursorStr) {
          streak++;
          cursor.setDate(cursor.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
    }

    function dimensionsExplored(profile) {
      if (!profile) return 0;
      const dims = ['identidad', 'motivacion', 'miedos', 'fortalezas', 'estado'];
      return dims.filter(d => profile[d] && profile[d].length > 0).length;
    }

    function formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function renderMyProgress() {
      const profile = getProfile();
      const history = getHistory();

      document.getElementById('progressHeadline').textContent =
        profile && profile.nombre ? `El progreso de ${profile.nombre}` : 'Tu progreso con ONIMA';

      const streak = calcStreak(history);
      const dims = dimensionsExplored(profile);

      const cards = [
        { num: history.length, label: 'Reflexiones guardadas' },
        { num: streak, label: 'Racha de días activos' },
        { num: `${dims}/5`, label: 'Dimensiones exploradas' }
      ];

      document.getElementById('statCards').innerHTML = cards.map(c => `
        <div class="stat-card">
          <div class="num">${c.num}</div>
          <div class="label">${c.label}</div>
        </div>
      `).join('');

      const historyList = document.getElementById('historyList');
      if (history.length === 0) {
        historyList.innerHTML = '';
        document.getElementById('historySection').innerHTML =
          '<p class="empty-state">Todavía no tienes reflexiones guardadas. Dale a "Begin" en la pantalla principal para empezar tu primera sesión.</p>';
      } else {
        const recent = [...history].reverse().slice(0, 8);
        historyList.innerHTML = recent.map(h => `
          <div class="history-item">
            <div class="h-question">${escapeHtml(h.question)}</div>
            <div class="h-answer">${escapeHtml(h.answer)}</div>
            <div class="h-date">${formatDate(h.date)}</div>
          </div>
        `).join('');
      }
    }

    function escapeHtml(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
    }

    function openMyProgress() {
      renderMyProgress();
      document.getElementById('myProgress').classList.add('visible');
    }

    function closeMyProgress() {
      document.getElementById('myProgress').classList.remove('visible');
    }

    document.getElementById('openMyProgress').addEventListener('click', openMyProgress);
    document.getElementById('closeMyProgress').addEventListener('click', closeMyProgress);

    document.getElementById('resetDataBtn').addEventListener('click', () => {
      const confirmed = confirm('¿Seguro que quieres borrar tu perfil e historial? Esta acción no se puede deshacer.');
      if (confirmed) {
        localStorage.removeItem(PROFILE_KEY);
        localStorage.removeItem(HISTORY_KEY);
        closeMyProgress();
        renderWelcome();
        showScreen('screen-welcome');
      }
    });

    /* ============================================================
       ACCESIBILIDAD GLOBAL
       ============================================================ */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDashboard();
        closeMyProgress();
      }
    });

    /* ============================================================
       INICIO
       ============================================================ */
    renderWelcome();
