# ONIMA — Your Higher Digital-Self

> Un avatar digital que acompaña al estudiante universitario en su búsqueda de autoconocimiento, propósito y dirección, a través de preguntas reflexivas (mayéutica socrática) en lugar de respuestas o consejos directos.

**Demo en vivo:** [onima-app.vercel.app](https://onima-app.vercel.app)

---

## El problema

Muchos estudiantes universitarios avanzan por su carrera sin un espacio real de introspección. Esto se relaciona con altas tasas de deserción (30–40% en México, según la OCDE) y altos niveles de ansiedad educativa. ONIMA parte de la idea de que el problema no es académico — es de identidad.

## Qué hace la app (versión actual — MVP / prototipo conceptual)

- Presenta al usuario con la interfaz de ONIMA y un botón **"Begin"**
- Al presionarlo, revela una **pregunta reflexiva al azar** (el "espejo" pregunta, nunca aconseja)
- Incluye un **dashboard institucional de demostración** con un Índice de Riesgo de Deserción, calculado a partir de datos simulados de una cohorte (declarado explícitamente como datos de ejemplo, no reales)
- Accesible: navegación por teclado, `aria-live` para lectores de pantalla, cierre con tecla Escape, respeta `prefers-reduced-motion`

**Nota de honestidad:** esta es una versión de demostración/prototipo. Todavía no guarda las respuestas del usuario entre sesiones (no hay onboarding ni persistencia de datos). El documento de planeación del proyecto detalla la visión completa y el roadmap hacia una versión con memoria real del usuario.

---

## Stack técnico

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura de la página |
| **CSS3** (variables CSS, flexbox, animaciones) | Diseño visual, tema oscuro/dorado, transiciones |
| **JavaScript (vanilla, sin frameworks)** | Lógica de interacción, cálculo de KPIs, manejo del dashboard |
| **Google Fonts** (Cormorant, DM Sans) | Tipografía |
| **GitHub** | Control de versiones |
| **Vercel** | Hosting y despliegue continuo (cada push a `main` se publica automáticamente) |
| **Claude (Anthropic)** | Copiloto de desarrollo — generación y depuración de código |

Se eligió un stack sin frameworks (HTML/CSS/JS vanilla) para mantener el proyecto simple y dentro del alcance de un desarrollador principiante, priorizando entender cada línea de código sobre usar herramientas más complejas.

---

## Prompts principales utilizados con la IA (Claude)

Estos son los prompts representativos usados durante el desarrollo, según el historial de commits del repositorio:

1. **Estructura inicial:**
   > "Ayúdame a crear el index.html inicial para ONIMA, un avatar digital tipo espejo para estudiantes universitarios. Quiero un diseño oscuro y elegante, con el nombre 'ONIMA' y el tagline 'Your Higher Digital-Self', y un botón que muestre una pregunta reflexiva al azar."

2. **Dashboard KPI:**
   > "Agrega un dashboard institucional que se abra al hacer clic en un botón, mostrando un Índice de Riesgo de Deserción calculado a partir de datos simulados de una cohorte de estudiantes, antes y después de usar ONIMA. Que se vea con barras animadas y dejar claro que son datos de ejemplo."

3. **Accesibilidad:**
   > "Revisa el código y agrega buenas prácticas de accesibilidad: que se pueda navegar con teclado, que el lector de pantalla anuncie cuando aparece la pregunta, y que el dashboard se pueda cerrar con la tecla Escape."

4. **Corrección de errores de build:**
   > "El deploy en Vercel está fallando, ayúdame a encontrar y arreglar el error."

*(Nota: estos prompts son una reconstrucción a partir de los mensajes de los commits. Si recuerdas la redacción exacta que usaste, reemplaza estos textos por los reales.)*

---

## Autoevaluación

**Qué funcionó bien:**
- Logré tener una demo pública, desplegada y funcional, que comunica claramente el concepto central de ONIMA (el espejo que pregunta, no aconseja)
- El dashboard institucional ayuda a visualizar la propuesta de valor para universidades, aunque sea con datos simulados
- Presté atención a la accesibilidad desde etapas tempranas, no como último paso

**Qué falta / qué haría diferente:**
- La app todavía no guarda las respuestas del usuario — es una demo conceptual, no una app con memoria real. El siguiente paso sería implementar un onboarding real y guardar el historial en `localStorage`
- Al ser mi primer proyecto programando, dependí bastante de la IA como copiloto; el reto ahora es entender cada vez más el código que genero en lugar de solo copiarlo
- La visión completa de ONIMA (voz, rostro generado por IA, biometría, integración institucional real) queda documentada como visión a futuro, no como parte de este entregable — fue una decisión consciente de alcance, no una limitación técnica que no supe resolver

---

## Documento de planeación

El documento completo de definición del proyecto (problema, alcance, descomposición en etapas, pseudocódigo, stack, criterios de éxito) se encuentra en `ONIMA_Documento_Planeacion.pdf`, entregado por separado según las instrucciones del curso.
