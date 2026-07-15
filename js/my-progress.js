/* ============================================================
   MY-PROGRESS.JS — Dashboard personal con datos REALES del
   usuario (leídos de storage.js). Racha de días, reflexiones
   guardadas, dimensiones exploradas, e historial reciente.
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

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
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

function openMyProgress() {
  renderMyProgress();
  document.getElementById('myProgress').classList.add('visible');
}

function closeMyProgress() {
  document.getElementById('myProgress').classList.remove('visible');
}
