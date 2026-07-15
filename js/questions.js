/* ============================================================
   QUESTIONS.JS — Banco de preguntas reflexivas y lógica de
   selección (evita repetir las últimas preguntas mostradas).
   Depende de storage.js (getHistory).
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

function pickQuestion() {
  const history = getHistory();
  const recent = history.slice(-3).map(h => h.question);
  const available = REFLECTION_QUESTIONS.filter(q => !recent.includes(q));
  const pool = available.length > 0 ? available : REFLECTION_QUESTIONS;
  return pool[Math.floor(Math.random() * pool.length)];
}
