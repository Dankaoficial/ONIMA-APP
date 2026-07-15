/* ============================================================
   STORAGE.JS — Persistencia del perfil e historial del usuario
   (localStorage). Ninguna otra parte de la app debe leer o
   escribir localStorage directamente: todo pasa por aquí.
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

function clearAllData() {
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(HISTORY_KEY);
}
