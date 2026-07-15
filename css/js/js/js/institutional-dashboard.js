/* ============================================================
   INSTITUTIONAL-DASHBOARD.JS — Dashboard institucional con
   datos SIMULADOS de una cohorte (declarado explícitamente
   como demo, no datos reales de usuarios).
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
