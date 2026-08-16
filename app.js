/* =========================================================================
   Agente de estudio — plataforma multi-carrera (UC)
   Lógica de la aplicación (análisis local, planificador y evaluaciones)
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. DATOS DE LOS RAMOS

   Cada carrera trae su propio fichero de áreas (el "cajón" de la izquierda) y
   sus ramos. `COMERCIAL_DATA` es la malla que la app tenía cuando era de una
   sola carrera: se conserva tal cual para no romper los planes ya guardados.
   ------------------------------------------------------------------------- */
const COMERCIAL_DATA = {
  cuant: {
    label: "Cuantitativo y matemático",
    color: "#0b4f9e",
    courses: ["Cálculo I","Cálculo II","Introducción al Álgebra Lineal","Aplicaciones Mat. para Economía y Negocios","Probabilidad y Estadística","Inferencia Estadística","Econometría"],
    method: "Práctica masiva y resolución progresiva de problemas",
    techniques: [
      "Resuelve problemas todos los días, no solo antes de la prueba: la matemática se aprende haciendo, no leyendo.",
      "Rehaz los ejercicios de clase sin mirar la solución, luego compara.",
      "Arma un banco de errores: cada vez que te equivoques, anota por qué y vuelve a intentarlo en 3 días.",
      "Estudia en bloques cortos y frecuentes (45/10) en vez de sesiones maratón.",
      "Explica la demostración o el paso a paso en voz alta como si le enseñaras a otra persona."
    ],
    tools: "Guías de ejercicios anteriores, ayudantías, Wolfram Alpha o Python para verificar cálculos."
  },
  econ: {
    label: "Teoría económica",
    color: "#b7852f",
    courses: ["Introducción a la Microeconomía","Introducción a la Macroeconomía","Microeconomía I","Microeconomía II","Macroeconomía I","Macroeconomía II","Análisis Económico y Experiencia Chilena"],
    method: "Modelos gráficos aplicados a casos reales",
    techniques: [
      "Domina cada gráfico paso a paso: qué mueve la curva, qué la desplaza, y por qué.",
      "Conecta cada modelo con una noticia o dato económico real de Chile o el mundo.",
      "Crea fichas de supuestos de cada modelo, y de qué se relaja en cada extensión.",
      "Practica preguntas de 'qué pasa si', cambiando un parámetro y prediciendo el resultado antes de resolver.",
      "Repaso espaciado: vuelve a los modelos de la primera unidad cuando ya vayas en la tercera."
    ],
    tools: "Bancos de gráficos propios, resúmenes de supuestos por modelo, prensa económica leída con la teoría en mente."
  },
  finanzas: {
    label: "Contabilidad y finanzas",
    color: "#8a3b2b",
    courses: ["Contabilidad","Contabilidad de Costos","Contabilidad Gerencial","Fundamentos de Finanzas","Teoría Financiera"],
    method: "Repetición de ejercicios tipo y lógica de flujo",
    techniques: [
      "Aprende la lógica detrás de cada cuenta o fórmula, no la memorices de forma aislada.",
      "Resuelve el mismo tipo de ejercicio con distintos números hasta que el procedimiento sea automático.",
      "Arma una plantilla propia con las fórmulas clave y sus supuestos.",
      "Simula casos completos de principio a fin, de los datos crudos al resultado final, en vez de fragmentos.",
      "Revisa tus errores de cuadratura o de signo con un checklist: son el error más común y el más fácil de prevenir."
    ],
    tools: "Excel para simular estados financieros, guías de ejercicios resueltos, calculadora financiera."
  },
  gestion: {
    label: "Gestión, personas y estrategia",
    color: "#3f6b3a",
    courses: ["Estrategia de la Organización","Comportamiento Organizacional","Dirección de Personas","Estrategia Competitiva","Competencia y Mercado"],
    method: "Casos, frameworks y discusión",
    techniques: [
      "Domina el framework (Porter, cadena de valor, etc.) y practica aplicarlo a una empresa distinta cada vez.",
      "Lee el caso dos veces: primero para el contexto, segundo para identificar el problema central.",
      "Arma tu propia opinión antes de la clase y contrástala con lo discutido.",
      "Resume cada caso en media página: problema, alternativas, tu recomendación y por qué.",
      "Estudia en grupo para debatir interpretaciones distintas de un mismo caso."
    ],
    tools: "Casos tipo HBS, resúmenes de frameworks propios, grupos de discusión."
  },
  marketing: {
    label: "Marketing",
    color: "#a4315a",
    courses: ["Fundamentos de Marketing","Marketing Analytics"],
    method: "Frameworks aplicados y análisis de datos",
    techniques: [
      "Aplica cada concepto (segmentación, posicionamiento, mix) a una marca real que conozcas.",
      "En Analytics, practica con datasets reales hasta que el cálculo o modelo sea fluido, no solo teórico.",
      "Crea mini casos propios: elige una marca y responde qué harías tú con cada herramienta vista.",
      "Repasa métricas clave (CAC, LTV, elasticidad) con ejemplos numéricos, no solo definiciones."
    ],
    tools: "Excel o Python para Analytics, casos de marca, ejemplos publicitarios reales."
  },
  prog: {
    label: "Programación",
    color: "#4a3f8a",
    courses: ["Introducción a la Programación"],
    method: "Código en las manos, todos los días",
    techniques: [
      "No leas código pasivamente: escríbelo y ejecútalo tú mismo desde el primer día.",
      "Depura tus propios errores antes de buscar la solución en internet.",
      "Reconstruye ejercicios de clase desde cero, sin copiar y pegar.",
      "Practica problemas cortos a diario en vez de programar largas horas una vez por semana.",
      "Explica tu lógica línea por línea antes de correr el código."
    ],
    tools: "Entorno de práctica (Python/R según el curso), ejercicios cortos diarios, foros de la ayudantía."
  },
  human: {
    label: "Humanidades y formación general",
    color: "#5c5548",
    courses: ["Ética, Economía y Empresa","Filosofía: ¿Para qué?","Empresa y Legislación","Electivo Formación Teológica","Electivo Formación General"],
    method: "Lectura activa y argumentación propia",
    techniques: [
      "Lee con lápiz en mano: subraya la tesis del autor y anota tu propia postura al margen.",
      "Resume cada lectura en 3-4 líneas antes de la clase, en tus propias palabras.",
      "Prepara argumentos y contraargumentos, no solo la posición que te parece correcta.",
      "Participa activamente en la discusión: ahí se fija el contenido mejor que leyendo solo."
    ],
    tools: "Fichas de lectura, guías de discusión, participación activa en clases."
  },
  practica: {
    label: "Prácticas",
    color: "#2c6e6b",
    courses: ["Práctica Social","Práctica Profesional"],
    method: "Aprendizaje experiencial reflexivo",
    techniques: [
      "Lleva una bitácora semanal: qué hiciste, qué aprendiste, qué harías distinto.",
      "Conecta explícitamente lo vivido en la práctica con conceptos vistos en cursos anteriores.",
      "Pide feedback activo a tu jefatura o tutor, no esperes a la evaluación final.",
      "Prepara con anticipación el informe final usando tu bitácora como base."
    ],
    tools: "Bitácora semanal, pauta de la práctica, reuniones de seguimiento."
  }
};

/* Malla oficial de Agronomía UC (Diagrama Curricular, Resolución VRA N°032/2021).
   Los nombres de los ramos son los del diagrama, tal cual. Las áreas no agrupan
   por semestre sino por *cómo se estudia* el ramo, que es lo que decide el
   método, las técnicas y las herramientas de la ficha.

   Los cursos Major, Minor y los optativos aparecen en la malla como cupos sin
   nombre propio —la especialidad se elige después—, así que se conservan con su
   nombre oficial de cupo: ahí es donde caen Suelos, Fitopatología, Riego y el
   resto de los ramos de especialidad. */
const AGRONOMIA_DATA = {
  cuant: {
    label: "Cuantitativo y estadística",
    color: "#0b4f9e",
    courses: ["Precálculo","Cálculo I","Cálculo II","Estadística"],
    method: "Práctica masiva y resolución progresiva de problemas",
    techniques: [
      "Resuelve problemas todos los días, no solo antes de la prueba: la matemática se aprende haciendo, no leyendo.",
      "Rehaz los ejercicios de clase y de ayudantía sin mirar la solución, y recién después compara.",
      "Arma un banco de errores: cada vez que te equivoques, anota por qué y vuelve a intentarlo en 3 días.",
      "En Estadística, interpreta siempre el resultado en el contexto del ensayo: un p-valor sin conclusión agronómica no vale puntaje.",
      "Explica la demostración o el paso a paso en voz alta como si le enseñaras a otra persona."
    ],
    tools: "Guías de ejercicios anteriores, ayudantías, R o Excel para los análisis de Estadística, Wolfram Alpha para verificar cálculos."
  },
  quimica: {
    label: "Química y bioquímica",
    color: "#8a5a2b",
    courses: ["Química","Bioquímica General"],
    method: "Lógica de la reacción y repetición de ejercicios tipo",
    techniques: [
      "Aprende la lógica de cada reacción o ruta antes de memorizarla: qué entra, qué sale y qué la regula.",
      "Resuelve el mismo tipo de ejercicio (estequiometría, pH, equilibrio) con distintos números hasta que salga automático.",
      "Escribe siempre las unidades y verifícalas al final: ahí se pierde la mitad del puntaje.",
      "Estudia las rutas metabólicas por bloques —sustrato, enzima, producto— en vez de memorizar la cadena entera de una vez.",
      "Repasa la nomenclatura y los grupos funcionales con tarjetas cortas y frecuentes."
    ],
    tools: "Tabla periódica anotada, guías de ejercicios resueltos, esquemas propios de rutas metabólicas, informes de laboratorio."
  },
  biologia: {
    label: "Biología vegetal y ecología",
    color: "#3f6b3a",
    courses: ["Botánica","Fisiología Vegetal","Genética y Biotecnología","Fundamentos de Ecología y Evolución"],
    method: "Estructura → función → proceso, con dibujos propios",
    techniques: [
      "Dibuja de memoria el esquema (la flor, el corte del tallo, el ciclo) y recién después compara con el apunte: lo que no te salió es lo que hay que estudiar.",
      "Para cada estructura pregúntate qué función cumple y qué pasaría si fallara: las pruebas preguntan por la función, no por el nombre.",
      "Arma tablas comparativas (monocotiledónea vs. dicotiledónea, C3 vs. C4, mitosis vs. meiosis): el examen vive de esas diferencias.",
      "Resuelve los problemas de genética con el cuadro completo escrito, no de cabeza: los cruzamientos se equivocan por saltarse pasos.",
      "Repaso espaciado con la terminología: los nombres científicos y los tejidos se olvidan rápido si no vuelves a ellos cada semana."
    ],
    tools: "Láminas y esquemas propios, atlas botánico, flashcards de terminología, fotos del microscopio y del herbario."
  },
  economia: {
    label: "Economía y gestión",
    color: "#b7852f",
    courses: ["Introducción a la Economía"],
    method: "Modelos gráficos aplicados a casos reales",
    techniques: [
      "Domina cada gráfico paso a paso: qué mueve la curva, qué la desplaza y por qué.",
      "Conecta cada modelo con un dato real del agro chileno: precios de temporada, exportaciones, costos de insumos.",
      "Practica preguntas de \"qué pasa si\": cambia un parámetro y predice el resultado antes de resolver.",
      "Crea fichas con los supuestos de cada modelo y con lo que se relaja en cada extensión.",
      "Repaso espaciado: vuelve a los modelos de la primera unidad cuando ya vayas en la tercera."
    ],
    tools: "Excel para los ejercicios, series de precios de ODEPA, prensa económica leída con la teoría en mente."
  },
  talleres: {
    label: "Talleres de sistemas agrícolas",
    color: "#2c6e6b",
    courses: ["Taller de Sistemas Agrícolas y Forestales I","Taller de Sistemas Agrícolas y Forestales II",
              "Taller 3","Taller 4","Taller 5"],
    method: "Trabajo en terreno y entrega por hitos",
    techniques: [
      "Lleva una bitácora de terreno desde la primera salida: los datos y las fotos del día son la materia prima del informe.",
      "Lee la pauta de evaluación antes de empezar, no al final: en los talleres el puntaje está en los criterios, no en la extensión.",
      "Reparte el trabajo grupal por hitos con fecha propia; dejar el informe para la última semana es el error clásico.",
      "Conecta explícitamente lo observado con los ramos teóricos: suelo, planta, clima y costos aparecen todos juntos en el sistema real.",
      "Ensaya la presentación en voz alta y cronometrada: en los talleres la defensa pesa tanto como el documento."
    ],
    tools: "Bitácora de terreno, cámara y libreta de mediciones, pauta de evaluación, planillas de datos, plantillas de informe."
  },
  especialidad: {
    label: "Major, minor y profundización",
    color: "#8a3b2b",
    courses: ["Major en Agronomía","Curso Major en Agronomía","Curso Major",
              "Curso Minor Nivel 1","Optativo de Profundización"],
    method: "Teoría de la especialidad aplicada a la decisión de manejo",
    techniques: [
      "Estudia por caso, no por lista: para cada plaga, enfermedad, suelo o cultivo fija la causa, el síntoma o la propiedad, la condición que lo favorece y el manejo.",
      "Practica los cálculos típicos de la especialidad hasta que salgan solos: dosis de fertilizante, lámina de riego, densidad de siembra, umbral de daño.",
      "Entrena el ojo con fotos y muestras reales, y confunde a propósito los parecidos (hongo vs. bacteria, daño de insecto vs. deficiencia nutricional).",
      "Toda decisión de manejo se justifica: acostúmbrate a responder \"¿aplicarías o no?\" con datos y no con la receta.",
      "Aprovecha las salidas a terreno como material de estudio: fotografía, anota y contrástalo con el apunte esa misma semana."
    ],
    tools: "Fichas por tema de la especialidad, guías fotográficas, planillas de cálculo de dosis y riego, fichas técnicas por cultivo, apuntes de terreno."
  },
  general: {
    label: "Formación general",
    color: "#5c5548",
    courses: ["Filosofía: ¿Para Qué?","Electivo Formación General"],
    method: "Lectura activa y argumentación propia",
    techniques: [
      "Lee con lápiz en mano: subraya la tesis del autor y anota tu propia postura al margen.",
      "Resume cada lectura en 3-4 líneas antes de la clase, en tus propias palabras.",
      "Prepara argumentos y contraargumentos, no solo la posición que te parece correcta.",
      "Participa activamente en la discusión: ahí se fija el contenido mejor que leyendo solo."
    ],
    tools: "Fichas de lectura, guías de discusión, participación activa en clases."
  },
  titulacion: {
    label: "Prácticas y titulación",
    color: "#4a3f8a",
    courses: ["Práctica de Verano 1","Práctica de Verano 2","Examen de Certificación de Licenciatura"],
    method: "Aprendizaje experiencial reflexivo y repaso integrador",
    techniques: [
      "Lleva una bitácora semanal de la práctica: qué hiciste, qué observaste, qué harías distinto.",
      "Conecta lo vivido con los ramos ya cursados: la práctica es donde la teoría se vuelve decisión.",
      "Pide feedback a tu supervisor durante la práctica, no al final.",
      "Para el examen de certificación conviene repasar a lo ancho antes que a lo hondo: es integrador, así que una pasada por todos los ramos del ciclo rinde más que dominar uno solo.",
      "Prepara el informe con la bitácora como base, en vez de reconstruirlo de memoria al cierre."
    ],
    tools: "Bitácora de terreno, pauta de la práctica, apuntes y fichas de los ramos del ciclo, reuniones de seguimiento."
  }
};

/* -------------------------------------------------------------------------
   1B. CARRERAS

   Una carrera es su fichero de ramos (`data`) más los textos con los que la app
   se presenta (cabecera, pie, tarjeta del selector). Todo lo que el alumno
   guarda —evaluaciones, temas analizados, notas meta, ponderaciones, sesión—
   vive bajo la carrera activa y no se mezcla entre carreras (ver
   `careerStoreKey`).
   ------------------------------------------------------------------------- */
const CAREERS = {
  comercial: {
    id: 'comercial',
    label: 'Ingeniería Comercial',
    icon: '📊',
    accent: '#0b4f9e',
    faculty: 'Facultad de Economía y Administración — UC',
    title: 'Agente de estudio para Ingeniería Comercial',
    intro: 'Cada ramo de la malla se estudia distinto. Elige el tuyo en el fichero y te muestro el método, las técnicas y las herramientas que mejor le calzan.',
    pitch: 'Cálculo, microeconomía, contabilidad, estrategia y marketing: el fichero completo de la malla, con el método que le calza a cada ramo.',
    footer: 'Agente de estudio · Ingeniería Comercial UC — herramienta de planificación para el curso. Tus archivos se leen en tu propio navegador; solo el texto de las preguntas se envía para el análisis del temario con Claude IA.',
    data: COMERCIAL_DATA
  },
  agronomia: {
    id: 'agronomia',
    label: 'Agronomía',
    icon: '🌾',
    accent: '#3f6b3a',
    faculty: 'Facultad de Agronomía y Sistemas Naturales — UC',
    title: 'Agente de estudio para Agronomía',
    intro: 'De la célula al predio: cada ramo de la malla se estudia distinto. Elige el tuyo en el fichero y te muestro el método, las técnicas y las herramientas que mejor le calzan.',
    pitch: 'Precálculo, química, botánica, fisiología vegetal y los talleres de sistemas agrícolas: la malla oficial de la licenciatura, con el método que le calza a cada ramo.',
    footer: 'Agente de estudio · Agronomía UC — herramienta de planificación para el curso. Tus archivos se leen en tu propio navegador; solo el texto de las preguntas se envía para el análisis del temario con Claude IA.',
    data: AGRONOMIA_DATA
  }
};

// Orden en que se muestran las carreras (en el selector y en el desplegable).
const CAREER_ORDER = ['comercial', 'agronomia'];

// Carrera por defecto. Es también la que conserva las claves de localStorage
// "sin sufijo": la app nació con una sola carrera, y los planes guardados de
// esa época son de Ingeniería Comercial (ver `careerStoreKey`).
const DEFAULT_CAREER = 'comercial';
const CAREER_KEY = 'activeCareer';

let activeCareer = DEFAULT_CAREER;
// ¿El alumno ya eligió carrera en este navegador? Si no, el arranque abre la
// pantalla de selección en vez de asumir una.
let careerChosen = false;

try{
  const savedCareer = localStorage.getItem(CAREER_KEY);
  if(savedCareer && CAREERS[savedCareer]){
    activeCareer = savedCareer;
    careerChosen = true;
  } else if(localStorage.getItem('pastEvalsData') || localStorage.getItem('studyPlanSession')){
    // Equipos que ya usaban la app cuando era de una sola carrera: tienen plan
    // guardado de Ingeniería Comercial, así que no se les pregunta de nuevo.
    activeCareer = DEFAULT_CAREER;
    careerChosen = true;
  }
}catch(e){ /* almacenamiento no disponible */ }

// El fichero de ramos de la carrera activa. Todo el resto de la app lee `DATA`
// sin saber de carreras; cambiar de carrera es reapuntar esta referencia.
let DATA = CAREERS[activeCareer].data;

function careerInfo(id){ return CAREERS[id || activeCareer]; }

// Clave de localStorage de la carrera indicada. La carrera por defecto usa la
// clave "pelada" para no perder lo guardado antes de que existieran carreras;
// las demás llevan sufijo.
function storeKeyFor(base, careerId){
  return careerId === DEFAULT_CAREER ? base : `${base}::${careerId}`;
}
function careerStoreKey(base){ return storeKeyFor(base, activeCareer); }

// Primera área y primer ramo del fichero de la carrera activa: lo que se abre
// cuando no hay nada guardado.
function firstCatKey(){ return Object.keys(DATA)[0]; }
function firstCourse(){ return DATA[firstCatKey()].courses[0]; }

// Cuántas áreas y ramos tiene una carrera (para la tarjeta del selector).
function careerCounts(id){
  const data = CAREERS[id].data;
  const cats = Object.keys(data);
  return { cats: cats.length, courses: cats.reduce((n, k) => n + data[k].courses.length, 0) };
}

// ¿Esta carrera tiene evaluaciones guardadas en este navegador? Se lee directo
// del almacenamiento porque en memoria solo vive la carrera activa.
function careerHasStoredData(id){
  try{
    const raw = localStorage.getItem(storeKeyFor('pastEvalsData', id));
    if(!raw) return false;
    const parsed = JSON.parse(raw);
    return !!parsed && Object.keys(parsed).length > 0;
  }catch(e){ return false; }
}

// El tipo de evaluación ya no es una categoría cerrada: lo que pondera el
// presupuesto de horas es el porcentaje que la evaluación pesa en la nota final
// del ramo (ver `weightFactor` y computeEffortPlan). Control / Prueba / Examen
// quedan como presets —los valores que se repiten en la mayoría de los ramos—,
// pero el alumno puede escribir cualquier ponderación entre 1% y 100%.
//
// `presetPct` es lo que rellena la píldora al hacer clic; `maxPct` es el techo
// del tramo, y sirve para saber cómo llamar a una ponderación escrita a mano
// (un 40% es un examen aunque se haya escrito en el campo, no un control).
const EXAM_TYPES = {
  control: { label:"Control", presetPct:10, maxPct:15 },
  prueba:  { label:"Prueba",  presetPct:25, maxPct:30 },
  examen:  { label:"Examen",  presetPct:35, maxPct:100, cumulative:true }
};
const EXAM_ORDER = ['control','prueba','examen'];

/* -------------------------------------------------------------------------
   2. REFERENCIAS AL DOM
   ------------------------------------------------------------------------- */
// Cabecera y selector de carrera
const headerEyebrowEl = document.getElementById('header-eyebrow');
const appTitleEl = document.getElementById('app-title');
const appIntroEl = document.getElementById('app-intro');
const appFooterEl = document.getElementById('app-footer');
const careerSwitchEl = document.getElementById('career-switch');
const careerBadgeEl = document.getElementById('career-badge');
const careerBadgeIconEl = document.getElementById('career-badge-icon');
const careerBadgeNameEl = document.getElementById('career-badge-name');
const careerMenuEl = document.getElementById('career-menu');
const careerModalEl = document.getElementById('career-selector-modal');
const careerCardsEl = document.getElementById('career-cards');
const careerModalCloseEl = document.getElementById('career-modal-close');
const careerModalNoteEl = document.getElementById('career-modal-note');

const drawersEl = document.getElementById('drawers');
const pickerEl = document.getElementById('course-picker');
const cardEl = document.getElementById('index-card');
const tabMetodoBtn = document.getElementById('tab-metodo');
const tabPlannerBtn = document.getElementById('tab-planner');
const panelMetodo = document.getElementById('panel-metodo');
const panelPlanner = document.getElementById('panel-planner');
const examPillsEl = document.getElementById('exam-pills');
const examWeightInput = document.getElementById('exam-weight-input');
const examWeightTag = document.getElementById('exam-weight-tag');
const targetGradeBox = document.getElementById('target-grade-box');
const targetGradeInput = document.getElementById('target-grade-input');
const targetGradeRange = document.getElementById('target-grade-range');
const targetHoursBadge = document.getElementById('target-hours-badge');
const targetExBadge = document.getElementById('target-ex-badge');
const targetSessionsBadge = document.getElementById('target-sessions-badge');
const targetGradeNote = document.getElementById('target-grade-note');
const planOutputEl = document.getElementById('plan-output');
const evalTextarea = document.getElementById('eval-textarea');
const evalFileInput = document.getElementById('eval-file-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearEvalsBtn = document.getElementById('clear-evals-btn');
const toggleEvalsBtn = document.getElementById('toggle-evals-btn');
const evalBody = document.getElementById('eval-body');
const evalCourseLabel = document.getElementById('eval-course-label');
const fileListEl = document.getElementById('file-list');
const fileStatusEl = document.getElementById('file-status');
const analyzeActions = document.getElementById('analyze-actions');
const aiAnalyzeBtn = document.getElementById('ai-analyze-btn');
const aiLoadingEl = document.getElementById('ai-loading');
const aiErrorEl = document.getElementById('ai-error');
const diagnosticOutputEl = document.getElementById('diagnostic-output');
const planStateEl = document.getElementById('plan-state');
const planStateTextEl = document.getElementById('plan-state-text');
const resetPlanBtn = document.getElementById('reset-plan-btn');
const testOverlayEl = document.getElementById('test-overlay');
const testDialogEl = document.getElementById('test-dialog');
const practiceOverlayEl = document.getElementById('practice-overlay');
const practiceModalEl = document.getElementById('practice-modal');
const practiceTitleEl = document.getElementById('practice-title');
const practiceSubtitleEl = document.getElementById('practice-subtitle');
const practiceBodyEl = document.getElementById('practice-body');
const practiceFootEl = document.getElementById('practice-foot');
const flashcardsOverlayEl = document.getElementById('flashcards-overlay');
const flashcardsModalEl = document.getElementById('flashcards-modal');
const flashcardsTitleEl = document.getElementById('flashcards-title');
const flashcardsSubtitleEl = document.getElementById('flashcards-subtitle');
const flashcardsLoadingEl = document.getElementById('flashcards-loading');
const flashcardsErrorEl = document.getElementById('flashcards-error');
const flashcardsErrorTextEl = document.getElementById('flashcards-error-text');
const flashcardsFootEl = document.getElementById('flashcards-foot');
const flashcardsCounterEl = document.getElementById('flashcards-counter');
const flashcardContainerEl = document.getElementById('flashcard-container');
const flashcardEl = document.getElementById('flashcard');
const flashcardFrontEl = document.getElementById('flashcard-front-text');
const flashcardBackEl = document.getElementById('flashcard-back-text');
// Un badge por cara: las dos muestran la misma relevancia del tema.
const flashcardLevelEls = document.querySelectorAll('[data-flashcard-level]');
const flashcardsProgressEl = document.getElementById('flashcards-progress-fill');
const feynmanOverlayEl = document.getElementById('feynman-overlay');
const feynmanModalEl = document.getElementById('feynman-modal');
const feynmanTitleEl = document.getElementById('feynman-title');
const feynmanSubtitleEl = document.getElementById('feynman-subtitle');
const feynmanBodyEl = document.getElementById('feynman-body');
const feynmanLoadingEl = document.getElementById('feynman-loading');
const feynmanErrorEl = document.getElementById('feynman-error');
const feynmanErrorTextEl = document.getElementById('feynman-error-text');
const feynmanContentEl = document.getElementById('feynman-content');
const feynmanAnalogyTitleEl = document.getElementById('feynman-analogy-title');
const feynmanAnalogyEl = document.getElementById('feynman-analogy');
const feynmanTakeawaysEl = document.getElementById('feynman-takeaways');
const feynmanSummaryEl = document.getElementById('feynman-summary');
const feynmanFootEl = document.getElementById('feynman-foot');
const chatOverlayEl = document.getElementById('topic-chat-overlay');
const chatModalEl = document.getElementById('topic-chat-modal');
const chatTitleEl = document.getElementById('topic-chat-title');
const chatSubtitleEl = document.getElementById('topic-chat-subtitle');
const chatMessagesEl = document.getElementById('topic-chat-messages');
const chatChipsEl = document.getElementById('topic-chat-chips');
const chatFormEl = document.getElementById('topic-chat-form');
const chatInputEl = document.getElementById('topic-chat-input');
const chatSendBtn = document.getElementById('topic-chat-send');
const chatScopeEl = document.getElementById('topic-chat-scope');
const sessionOverlayEl = document.getElementById('study-session-overlay');
const sessionModalEl = document.getElementById('study-session-modal');
const sessionTitleEl = document.getElementById('study-session-title');
const sessionSubtitleEl = document.getElementById('study-session-subtitle');
const sessionPhasesEl = document.getElementById('study-session-phases');
const sessionProgramEl = document.getElementById('study-session-program');
const sessionTimerEl = document.getElementById('study-session-timer');
const sessionTimerBtn = document.getElementById('study-session-timer-btn');
const sessionBodyEl = document.getElementById('study-session-body');
const sessionFormEl = document.getElementById('study-session-form');
const sessionInputEl = document.getElementById('study-session-input');
const sessionSendBtn = document.getElementById('study-session-send');
const sessionSkipBtn = document.getElementById('study-session-skip');
const sessionPassLessonBtn = document.getElementById('study-session-pass-lesson');
const sessionPassTopicBtn = document.getElementById('study-session-pass-topic');
const examLaunchEl = document.getElementById('exam-launch');
const examLaunchNoteEl = document.getElementById('exam-launch-note');
const startExamBtn = document.getElementById('btn-start-exam');
const examOverlayEl = document.getElementById('exam-overlay');
const examModalEl = document.getElementById('exam-modal');
const examTitleEl = document.getElementById('exam-title');
const examTimerEl = document.getElementById('exam-timer');
const examProgressEl = document.getElementById('exam-progress');
const examProgressFillEl = document.getElementById('exam-progress-fill');
const examCounterEl = document.getElementById('exam-counter');
const examBodyEl = document.getElementById('exam-body');
const examFootEl = document.getElementById('exam-foot');
const exportPdfBtn = document.getElementById('btn-export-pdf');
const sheetOverlayEl = document.getElementById('cheat-sheet-overlay');
const sheetModalEl = document.getElementById('cheat-sheet-modal');
const sheetSubtitleEl = document.getElementById('cheat-sheet-subtitle');
const sheetContentEl = document.getElementById('cheat-sheet-content');
const guideOverlayEl = document.getElementById('study-guide-overlay');
const guideModalEl = document.getElementById('study-guide-modal');
const guideTitleEl = document.getElementById('study-guide-title');
const guideSubtitleEl = document.getElementById('study-guide-subtitle');
const guideLoadingEl = document.getElementById('study-guide-loading');
const guideLoadingTextEl = document.getElementById('study-guide-loading-text');
const guideStepsEl = document.getElementById('study-guide-steps');
const guideErrorEl = document.getElementById('study-guide-error');
const guideErrorTextEl = document.getElementById('study-guide-error-text');
const guideDocEl = document.getElementById('study-guide-doc');
const guideFootEl = document.getElementById('study-guide-foot');
const guidePautaBtn = document.getElementById('study-guide-pauta-btn');
const toastStackEl = document.getElementById('toast-stack');

/* -------------------------------------------------------------------------
   3. ESTADO
   ------------------------------------------------------------------------- */
let activeCat = firstCatKey();
let activeCourse = firstCourse();
// El planificador es la vista por defecto: es a lo que viene el alumno. El
// método de estudio queda como pestaña secundaria. Una sesión guardada puede
// sobrescribir esto en restoreSession() si el alumno dejó abierto el método.
let activeTab = 'planner';
let activeExam = 'prueba';
let evalsVisible = true;
// El alumno ya pasó por "Generar el Plan de Estudio" en este ramo: lo usa el
// aviso de plan guardado. Se reinicia al cambiar de ramo.
let planUsesEvals = false;

// Originales de archivos de la sesión (conservan su formato; no se convierten a .txt).
// { [course]: { [sourceId]: File } }
const sessionFiles = {};

// Evaluaciones, temario analizado y diagnóstico del alumno. En memoria vive
// SOLO lo de la carrera activa: `loadCareerStores()` lo relee desde la clave de
// la carrera cada vez que se cambia (ver `careerStoreKey`).
let pastEvalsData = {};

// Migraciones de formato del registro guardado. Corren sobre lo que se acaba de
// leer del almacenamiento, así que se aplican también al cambiar de carrera.
function migratePastEvals(){
  // Del formato antiguo { questions: [...] } al nuevo basado en "sources".
  Object.keys(pastEvalsData).forEach(course => {
    const rec = pastEvalsData[course];
    if(rec && Array.isArray(rec.questions) && !rec.sources){
      pastEvalsData[course] = {
        sources: [{ id: 'legacy', name: 'Datos anteriores', ext: 'txt', kind: 'manual',
                    size: 0, questions: rec.questions, addedAt: rec.updatedAt || 0 }],
        updatedAt: rec.updatedAt || 0
      };
    }
  });

  // Migración del análisis de Claude: antes era una lista de nombres (`temas_clave`);
  // ahora cada tema trae relevancia, tipo, pregunta de diagnóstico y pasos de estudio.
  // Los análisis viejos se conservan como temas sin mini test: el plan sigue
  // funcionando y el alumno puede reanalizar cuando quiera para obtener el test.
  Object.keys(pastEvalsData).forEach(course => {
    const rec = pastEvalsData[course];
    if(!rec || !rec.ai || Array.isArray(rec.ai.topics)) return;
    const names = Array.isArray(rec.ai.temas_clave) ? rec.ai.temas_clave : [];
    if(names.length === 0){ delete rec.ai; return; }
    rec.ai.topics = names.map((name, i) => ({
      id: `tema_${i + 1}`,
      name: String(name),
      relevance: 'Media',
      type: 'Teórico',
      diagnosticQuestion: null,
      studySteps: []
    }));
  });
}

// Limpieza de la versión anterior: la API key ya no se guarda en el navegador,
// así que se borra cualquier resto en equipos que usaron esa versión.
try{ localStorage.removeItem('anthropicApiKey'); }catch(e){ /* almacenamiento no disponible */ }

// Devuelve si de verdad quedó guardado. Casi ningún llamador lo mira —para el
// resto de los datos, no persistir es una molestia menor—, pero las guías de
// estudio son grandes y caras de regenerar, así que ahí sí importa distinguir
// "guardado" de "el almacenamiento está lleno" (ver `saveStoredGuide`).
function savePastEvals(){
  try{
    localStorage.setItem(careerStoreKey('pastEvalsData'), JSON.stringify(pastEvalsData));
    return true;
  }
  catch(e){ return false; }
}

/* --- Nota meta por ramo (localStorage) -------------------------------------
   La meta se guarda por ramo, junto al resto de los datos del ramo: apuntar a
   un 4,0 en un control y a un 6,0 en el examen del mismo semestre es lo normal,
   así que una sola meta global sería inútil. Vive en su propia clave para que
   borrar las evaluaciones de un ramo no arrastre la meta de los demás.
   --------------------------------------------------------------------------- */
const TARGET_GRADE_KEY = 'targetGradeByCourse';
const TARGET_GRADE_MIN = 1;
const TARGET_GRADE_MAX = 7;
const TARGET_GRADE_DEFAULT = 5.5;

let targetGrades = {};

// Las notas chilenas se escriben con un decimal: 5,49 no existe.
function roundGrade(n){ return Math.round(n * 10) / 10; }

function saveTargetGrades(){
  try{ localStorage.setItem(careerStoreKey(TARGET_GRADE_KEY), JSON.stringify(targetGrades)); }
  catch(e){ /* almacenamiento no disponible */ }
}

function getTargetGrade(course){
  return roundGrade(clampNumber(targetGrades[course], TARGET_GRADE_MIN, TARGET_GRADE_MAX, TARGET_GRADE_DEFAULT));
}

function setTargetGrade(course, value){
  // Borrar el campo para escribir otra nota deja un string vacío, que `Number`
  // convierte en 0 (o sea, un 1,0 tras el clamp). Se trata como "todavía no hay
  // valor" y se conserva la meta anterior hasta que se escriba una nueva.
  const raw = (typeof value === 'string' && value.trim() === '') ? NaN : value;
  targetGrades[course] = roundGrade(
    clampNumber(raw, TARGET_GRADE_MIN, TARGET_GRADE_MAX, getTargetGrade(course)));
  saveTargetGrades();
  return targetGrades[course];
}

/* --- Ponderación de la evaluación por ramo (localStorage) -------------------
   Cuánto pesa esta evaluación en la nota final del ramo, en porcentaje. Se
   guarda por ramo y junto a la nota meta —son los dos datos que el alumno
   ajusta a mano para el ramo activo—, en su propia clave para que borrar las
   evaluaciones de un ramo no arrastre la ponderación de los demás.

   Es el único dato del tipo de evaluación que entra en el cálculo: el nombre
   (Control / Prueba / Examen) se deduce del porcentaje, no al revés.
   --------------------------------------------------------------------------- */
const EVAL_WEIGHT_KEY = 'evalWeightByCourse';
const EVAL_WEIGHT_MIN = 1;
const EVAL_WEIGHT_MAX = 100;
const EVAL_WEIGHT_DEFAULT = EXAM_TYPES.prueba.presetPct;   // la prueba típica

let evalWeights = {};

/* --- Carga de los datos de la carrera activa --------------------------------
   Los tres almacenes (evaluaciones, notas meta y ponderaciones) se leen juntos
   porque juntos forman "lo guardado de esta carrera": al cambiar de carrera se
   vuelven a leer desde sus claves y la memoria queda con los datos de la nueva
   sin arrastrar nada de la anterior.
   --------------------------------------------------------------------------- */
function readStore(base){
  try{
    const parsed = JSON.parse(localStorage.getItem(careerStoreKey(base)) || '{}');
    return (parsed && typeof parsed === 'object') ? parsed : {};
  }catch(e){ return {}; }
}

function loadCareerStores(){
  pastEvalsData = readStore('pastEvalsData');
  migratePastEvals();
  targetGrades = readStore(TARGET_GRADE_KEY);
  evalWeights = readStore(EVAL_WEIGHT_KEY);
}

loadCareerStores();

// Las ponderaciones reales suelen ser enteras (20%, 35%), pero existen los
// 12,5%: se admite un decimal y nada más.
function roundPct(n){ return Math.round(n * 10) / 10; }

// Para los textos: 25 → "25", 12,5 → "12,5" (coma, como se escribe en Chile).
function formatPct(n){
  return (Number.isInteger(n) ? String(n) : String(roundPct(n))).replace('.', ',');
}

function saveEvalWeights(){
  try{ localStorage.setItem(EVAL_WEIGHT_KEY, JSON.stringify(evalWeights)); }
  catch(e){ /* almacenamiento no disponible */ }
}

function getEvalWeight(course){
  return roundPct(clampNumber(evalWeights[course], EVAL_WEIGHT_MIN, EVAL_WEIGHT_MAX, EVAL_WEIGHT_DEFAULT));
}

function setEvalWeight(course, value){
  // Igual que la nota meta: borrar el campo para escribir otro número deja un
  // string vacío, que `Number` convierte en 0. Se trata como "todavía no hay
  // valor" y se conserva la ponderación anterior hasta que se escriba una nueva.
  const raw = (typeof value === 'string' && value.trim() === '') ? NaN : value;
  evalWeights[course] = roundPct(
    clampNumber(raw, EVAL_WEIGHT_MIN, EVAL_WEIGHT_MAX, getEvalWeight(course)));
  saveEvalWeights();
  syncActiveExam(course);
  return evalWeights[course];
}

// ¿Cómo se llama una evaluación que pesa `pct`? Los presets marcan los tramos:
// hasta 15% es un control, hasta 30% una prueba, de ahí para arriba un examen.
function examKeyForWeight(pct){
  return EXAM_ORDER.find(key => pct <= EXAM_TYPES[key].maxPct) || 'examen';
}

// `activeExam` es el nombre que le ponemos a la ponderación del ramo activo:
// se deriva del porcentaje para que la etiqueta y el número nunca se
// contradigan (un "Control" del 40% no existe).
function syncActiveExam(course){
  activeExam = examKeyForWeight(getEvalWeight(course || activeCourse));
  return activeExam;
}

// ¿El porcentaje es exactamente el de su preset, o lo escribió el alumno?
function weightIsPreset(course){
  const pct = getEvalWeight(course);
  return EXAM_ORDER.some(key => EXAM_TYPES[key].presetPct === pct);
}

// Texto de la ponderación para los párrafos: "25% de la nota".
function examWeightNote(course){
  const pct = getEvalWeight(course || activeCourse);
  const et = EXAM_TYPES[examKeyForWeight(pct)];
  return `${formatPct(pct)}% de la nota${et.cumulative ? ', normalmente acumulativo' : ''}`;
}

// El ramo tal como se le nombra a Claude: con la carrera entre paréntesis, para
// que el contexto no se pierda. "Estadística Aplicada" no se estudia igual en
// Agronomía que en Ingeniería Comercial, y el nombre solo no lo dice.
function courseForAi(course){
  return `${course || activeCourse} (${careerInfo().label})`;
}

// Lo que se le manda a Claude como tipo de evaluación: el nombre y el peso
// real, que es lo que de verdad cambia la dificultad esperada.
function examTypeForAi(course){
  const pct = getEvalWeight(course || activeCourse);
  const et = EXAM_TYPES[examKeyForWeight(pct)];
  return `${et.label} (${formatPct(pct)}% de la nota)`;
}

/* -------------------------------------------------------------------------
   3B. SESIÓN GUARDADA (localStorage)

   `pastEvalsData` ya guardaba el temario analizado, el semáforo de cada tema y
   los pasos marcados. Lo que faltaba era recordar *dónde estaba* el alumno: qué
   ramo, qué pestaña, qué tipo de evaluación y si el plan ya estaba ajustado.
   Sin eso, al recargar la página el plan seguía en el navegador pero la app
   volvía al primer ramo del fichero y había que analizar el temario de nuevo.
   ------------------------------------------------------------------------- */
const SESSION_KEY = 'studyPlanSession';
const SESSION_VERSION = 1;

// Mientras se restaura no se guarda: los primeros render dispararían escrituras
// con el estado a medio aplicar.
let sessionReady = false;
// true cuando el arranque encontró y restauró un plan (solo para el aviso).
let sessionRestored = false;

function saveSession(){
  if(!sessionReady) return;
  try{
    localStorage.setItem(careerStoreKey(SESSION_KEY), JSON.stringify({
      v: SESSION_VERSION,
      career: activeCareer,
      cat: activeCat,
      course: activeCourse,
      tab: activeTab,
      exam: activeExam,
      // La ponderación vive por ramo en su propia clave; se duplica aquí para
      // el ramo activo por si esa clave se pierde (o viene de una sesión
      // anterior que todavía guardaba solo el tipo de evaluación).
      weightPct: getEvalWeight(activeCourse),
      planUsesEvals,
      evalsVisible,
      openTopics: [...openTopics],
      savedAt: Date.now()
    }));
  }catch(e){ /* almacenamiento no disponible o lleno */ }
}

function clearStoredSession(){
  try{ localStorage.removeItem(careerStoreKey(SESSION_KEY)); }
  catch(e){ /* almacenamiento no disponible */ }
}

function categoryOfCourse(course){
  return Object.keys(DATA).find(key => DATA[key].courses.includes(course)) || null;
}

function clampNumber(value, min, max, fallback){
  const n = Number(value);
  if(!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

// Aplica el estado guardado sobre las variables y los inputs. Todo se valida:
// un ramo que ya no está en la malla o un tipo de evaluación desconocido se
// descartan en vez de dejar la app en un estado imposible.
function restoreSession(){
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem(careerStoreKey(SESSION_KEY)) || 'null'); }
  catch(e){ saved = null; }
  if(!saved || saved.v !== SESSION_VERSION) return;
  // Sesión de otra carrera (por ejemplo, guardada antes de que existieran): no
  // se aplica, porque sus ramos no están en este fichero.
  if(saved.career && saved.career !== activeCareer) return;

  const cat = categoryOfCourse(saved.course);
  if(cat){
    activeCat = cat;
    activeCourse = saved.course;
  } else if(DATA[saved.cat]){
    activeCat = saved.cat;
    activeCourse = DATA[saved.cat].courses[0];
  }

  // La pestaña NO se restaura: el arranque siempre abre el planificador
  // (ver boot()). Se sigue guardando en la sesión por compatibilidad.
  // `saved.days` y `saved.hours` de sesiones anteriores se ignoran: el
  // presupuesto ya no depende de un calendario configurado a mano.
  // La ponderación del ramo activo: primero la clave por ramo (la fuente de
  // verdad), después lo que dejó la sesión y, en último término, el preset del
  // tipo de evaluación que guardaban las sesiones antiguas.
  if(evalWeights[activeCourse] === undefined){
    const fallback = Number.isFinite(Number(saved.weightPct))
      ? saved.weightPct
      : (EXAM_TYPES[saved.exam] ? EXAM_TYPES[saved.exam].presetPct : EVAL_WEIGHT_DEFAULT);
    evalWeights[activeCourse] = roundPct(
      clampNumber(fallback, EVAL_WEIGHT_MIN, EVAL_WEIGHT_MAX, EVAL_WEIGHT_DEFAULT));
    saveEvalWeights();
  }
  syncActiveExam(activeCourse);
  evalsVisible = saved.evalsVisible !== false;

  // El plan ajustado solo se restaura si el ramo todavía tiene datos cargados:
  // si se borraron las evaluaciones, no hay nada que ajustar.
  planUsesEvals = !!saved.planUsesEvals && getAllQuestions(activeCourse).length >= 3;

  openTopics.clear();
  if(Array.isArray(saved.openTopics)){
    saved.openTopics.forEach(id => openTopics.add(String(id)));
  }

  sessionRestored = !!getAiAnalysis(activeCourse) || planUsesEvals;
}

// ¿Queda algo guardado de este navegador? Decide si se muestra la barra con el
// botón "Iniciar nuevo plan".
function hasSavedProgress(){
  return Object.keys(pastEvalsData).length > 0;
}

// Borra todo lo que la app guarda en el navegador y vuelve al estado inicial.
function resetAllProgress(){
  // Los modales guardan su avance al cerrarse: se cierran antes de vaciar.
  if(testState) closeDiagnosticTest();
  if(practiceState) closePractice();
  if(flashcardsState) closeFlashcards();
  if(feynmanState) closeFeynman();
  if(topicChatState) closeTopicChat();
  if(studySessionState) closeStudySession({ force: true });
  if(examState) closeExamSimulation({ force: true });
  if(sheetState) closeCheatSheet();
  if(guideState) closeStudyGuide();

  practiceCache.clear();
  topicChatThreads.clear();
  openTopics.clear();
  Object.keys(pastEvalsData).forEach(k => delete pastEvalsData[k]);
  Object.keys(sessionFiles).forEach(k => delete sessionFiles[k]);
  Object.keys(targetGrades).forEach(k => delete targetGrades[k]);
  Object.keys(evalWeights).forEach(k => delete evalWeights[k]);
  // Solo se borra lo de la carrera activa: los planes de la otra carrera viven
  // en sus propias claves y no se tocan.
  try{ localStorage.removeItem(careerStoreKey('pastEvalsData')); }
  catch(e){ /* almacenamiento no disponible */ }
  try{ localStorage.removeItem(careerStoreKey(TARGET_GRADE_KEY)); }
  catch(e){ /* almacenamiento no disponible */ }
  try{ localStorage.removeItem(careerStoreKey(EVAL_WEIGHT_KEY)); }
  catch(e){ /* almacenamiento no disponible */ }
  clearStoredSession();

  activeCat = firstCatKey();
  activeCourse = firstCourse();
  syncActiveExam(activeCourse);   // sin ponderación guardada vuelve al preset de prueba
  planUsesEvals = false;
  evalsVisible = true;
  sessionRestored = false;
  evalTextarea.value = '';
  fileStatusEl.textContent = '';
  showAiError('');

  renderAll();
  saveSession();
}

function newId(){
  return 's' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function getRecord(course){
  if(!pastEvalsData[course]) pastEvalsData[course] = { sources: [], updatedAt: 0 };
  if(!pastEvalsData[course].sources) pastEvalsData[course].sources = [];
  return pastEvalsData[course];
}

// Todas las preguntas del ramo (sin duplicados), reunidas desde todas las fuentes.
function getAllQuestions(course){
  const rec = pastEvalsData[course];
  if(!rec || !rec.sources) return [];
  const seen = new Set(), out = [];
  rec.sources.forEach(s => (s.questions || []).forEach(q => {
    if(!seen.has(q)){ seen.add(q); out.push(q); }
  }));
  return out;
}

if(typeof pdfjsLib !== 'undefined'){
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
}

/* -------------------------------------------------------------------------
   4. EXTRACCIÓN DE TEXTO (.pdf con texto, .pdf escaneado y .jpg/.png por OCR)
   Se conserva un marcador de salto de página (\f) para poder descartar
   páginas "extra" (portadas, etc.) más adelante.
   ------------------------------------------------------------------------- */
async function extractPdfText(file){
  if(typeof pdfjsLib === 'undefined') throw new Error('No se pudo cargar el lector de PDF (revisa tu conexión a internet).');
  const buffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  let text = '';
  let hasText = false;
  for(let i = 1; i <= pdf.numPages; i++){
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(it => it.str).join(' ').trim();
    if(pageText) hasText = true;
    text += pageText + '\f';           // \f = separador de página
  }
  if(!hasText){
    text = await extractPdfTextByOcr(pdf);
  }
  return text;
}

async function extractPdfTextByOcr(pdf){
  let text = '';
  const maxPages = Math.min(pdf.numPages, 8); // límite razonable para no colgar el navegador
  for(let i = 1; i <= maxPages; i++){
    fileStatusEl.textContent = `Aplicando OCR a la página ${i} de ${maxPages}...`;
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
    const { data:{ text: pageText } } = await Tesseract.recognize(canvas, 'spa');
    text += pageText + '\f';
  }
  return text;
}

async function extractImageText(file){
  if(typeof Tesseract === 'undefined') throw new Error('No se pudo cargar el motor de OCR (revisa tu conexión a internet).');
  fileStatusEl.textContent = `Aplicando OCR a "${file.name}" (puede tardar unos segundos)...`;
  const { data:{ text } } = await Tesseract.recognize(file, 'spa');
  return text;
}

/* -------------------------------------------------------------------------
   5. MOTOR DE ANÁLISIS (heurístico, corre en el navegador)
   ------------------------------------------------------------------------- */

const STOPWORDS = new Set(["de","la","el","en","y","a","los","las","del","un","una","unos","unas","que","es","con","para","por",
  "se","su","sus","al","lo","como","mas","más","o","pero","este","esta","estos","estas","ese","esa","esos","esas","cual","cuales",
  "cuando","donde","entre","sobre","sin","hasta","desde","cada","tanto","tambien","también","ya","muy","solo","sólo",
  "si","no","sea","son","fue","ser","estar","hay","han","ha","he","has","habra","será","siguiente","siguientes","segun","según",
  "cuyo","cuya","cuyos","cuyas","mediante","dado","dada","dados","dadas","mismo","misma","mismos","mismas","otro","otra","otros",
  "otras","todo","toda","todos","todas","uno","les","le","nos","yo","tu","ella","ellos","ellas","usted","ustedes",
  "esto","eso","aquello","porque","pues","aunque","mientras","luego","ademas","además","varios",
  "varias","algun","algún","alguna","algunos","algunas","ningun","ningún","ninguna","tras","ante","bajo","cabe","contra","hacia",
  "durante","respecto","punto","puntos","pregunta","preguntas","item","ítem","parte","cabo","siendo","puede","debe","cuenta",
  "acuerdo","respuesta","respuestas","valor","siguientes","caso","casos","cada","hacer","tener","forma"]);

const INSTRUCTION_VERBS = new Set(["calcule","resuelva","resolver","determine","determinar","obtenga","obtener","encuentre",
  "encontrar","halle","hallar","calcular","demuestre","demostrar","derive","deduzca","deducir","grafique","graficar","dibuje",
  "trace","esquematice","analice","analizar","comente","comentar","evalue","evalúe","evaluar","explique","explicar","describa",
  "describir","fundamente","fundamentar","justifique","justificar","defina","definir","conceptualice","compare","comparar",
  "distinga","distinguir","senale","señale","señalar","marque","marcar","seleccione","seleccionar","indique","indicar","plantee",
  "plantear","desarrolle","desarrollar","mencione","mencionar","enumere","enumerar","discuta","discutir","presente","presentar",
  "identifique","identificar","proponga","proponer","interprete","interpretar","suponga","considere","complete"]);

// Glosario de conceptos del área para reconocer "conceptos clave" (no solo palabras frecuentes).
const GLOSSARY = [
  "elasticidad","excedente del consumidor","excedente del productor","oferta","demanda","equilibrio de mercado",
  "costo marginal","ingreso marginal","utilidad marginal","monopolio","oligopolio","competencia perfecta",
  "competencia monopolistica","externalidad","bien publico","fallas de mercado","impuesto","subsidio","iva",
  "curva de indiferencia","restriccion presupuestaria","funcion de produccion","rendimientos a escala",
  "producto interno bruto","pib","inflacion","desempleo","politica monetaria","politica fiscal","tipo de cambio",
  "tasa de interes","modelo is-lm","oferta agregada","demanda agregada","multiplicador","balanza de pagos",
  "valor presente","valor actual neto","van","tir","flujo de caja","costo de capital","wacc","capm","beta",
  "apalancamiento","riesgo","rentabilidad","dividendos","estructura de capital","depreciacion","amortizacion",
  "activo","pasivo","patrimonio","balance general","estado de resultados","asiento contable","costos fijos",
  "costos variables","punto de equilibrio","margen de contribucion","segmentacion","posicionamiento",
  "marketing mix","ciclo de vida","cuota de mercado","fidelizacion","regresion lineal","correlacion",
  "probabilidad","variable aleatoria","distribucion normal","varianza","desviacion estandar","intervalo de confianza",
  "prueba de hipotesis","valor esperado","derivada","integral","limite","matriz","vector","determinante",
  "cadena de valor","cinco fuerzas","ventaja competitiva","foda","estrategia competitiva","cultura organizacional",
  "liderazgo","motivacion","clima organizacional"
];
// El mismo glosario, pero del agro: sin él, el motor local de Agronomía sacaría
// solo palabras frecuentes y ningún concepto del ramo.
const AGRO_GLOSSARY = [
  "fotosintesis","respiracion celular","transpiracion","estoma","xilema","floema","meristema","parenquima",
  "raiz","tallo","hoja","flor","fruto","semilla","germinacion","fenologia","dormancia","fitohormona",
  "auxina","giberelina","citoquinina","acido abscisico","etileno","clorofila","ciclo de calvin",
  // Los términos de tres letras o menos se evitan a propósito: el glosario se
  // busca por subcadena, y "gen" aparecería dentro de "nitrógeno".
  "mitosis","meiosis","adn","alelo","genotipo","fenotipo","herencia mendeliana","mejoramiento genetico",
  "enzima","sustrato","atp","metabolismo","aminoacido","proteina","lipido","carbohidrato","ph",
  "horizonte del suelo","perfil de suelo","textura del suelo","estructura del suelo","materia organica",
  "capacidad de intercambio cationico","cic","salinidad","conductividad electrica","porosidad","densidad aparente",
  "capacidad de campo","punto de marchitez permanente","agua aprovechable","infiltracion","escorrentia","erosion",
  "lixiviacion","fertilizante","fertilizacion","nitrogeno","fosforo","potasio","macronutriente","micronutriente",
  "deficiencia nutricional","enmienda","encalado","compost","balance hidrico","evapotranspiracion",
  "coeficiente de cultivo","lamina de riego","frecuencia de riego","riego por goteo","riego por aspersion",
  "drenaje","eficiencia de riego","agroclimatologia","grados dia","heladas","radiacion solar",
  "plaga","enfermedad","patogeno","hongo","bacteria","virus","nematodo","insecto","larva","metamorfosis",
  "umbral de dano economico","manejo integrado de plagas","control biologico","control quimico","plaguicida",
  "resistencia","malezas","herbicida","periodo de carencia","sintoma","signo","inoculo","ciclo de la enfermedad",
  "rotacion de cultivos","densidad de siembra","siembra","cosecha","poscosecha","rendimiento","poda","injerto",
  "portainjerto","polinizacion","raleo","vendimia","fermentacion","carga animal","praderas","forraje",
  "produccion animal","mecanizacion","labranza","maquinaria agricola",
  "costo de produccion","margen bruto","valor actual neto","tasa interna de retorno","flujo de caja","precio de mercado",
  "oferta","demanda","elasticidad","comercializacion","cadena de valor","exportacion","agricultura sustentable",
  "ecosistema","biodiversidad","recursos naturales","legislacion agraria","desarrollo rural","trazabilidad"
];

const CAREER_GLOSSARIES = { comercial: GLOSSARY, agronomia: AGRO_GLOSSARY };

// El glosario en uso depende de la carrera activa: "elasticidad" es un concepto
// clave en Ingeniería Comercial y "capacidad de campo" lo es en Agronomía.
let GLOSSARY_NORM = [];
function refreshGlossary(){
  const list = CAREER_GLOSSARIES[activeCareer] || GLOSSARY;
  GLOSSARY_NORM = list.map(g => ({ raw:g, norm: normalizeTxt(g) }));
}
refreshGlossary();

/* --- Filtrado de páginas y líneas "extra" (portadas, títulos, datos personales) --- */

const PERSONAL_DATA_KW = ["nombre","apellido","rut","run","cedula","matricula","seccion","paralelo","profesor","profesora",
  "ayudante","fecha","puntaje","puntos totales","puntaje total","nota","firma","carrera","universidad","facultad","pontificia",
  "instrucciones","instruccion","duracion","tiempo disponible","no de vuelta","no de la vuelta","celular","telefono","correo",
  "email","semestre","codigo","codigo del curso","sigla","numero de lista","numero de alumno","apellidos y nombres"];

// Línea que es solo un título/encabezado (p. ej. "Tema 1", "Parte II", "Pregunta 3", "Sección A").
const TITLE_LINE_RE = /^\s*(tema|parte|secci[oó]n|pregunta|[ií]tem|unidad|cap[ií]tulo|ejercicio|problema|grupo|bloque|n[°º.])\s*(n[°º.]?\s*)?([ivxlcdm]+|\d+|[a-e])?\s*[:.\-)]*\s*$/i;

// ¿La página completa parece una portada o página de instrucciones (sin preguntas reales)?
function looksLikeCoverPage(pageText){
  const norm = normalizeTxt(pageText);
  const words = norm.split(/\s+/).filter(Boolean);
  if(words.length === 0) return true;                       // página en blanco
  let pdHits = 0;
  PERSONAL_DATA_KW.forEach(k => { if(norm.includes(normalizeTxt(k))) pdHits++; });
  const hasQuestionCue = norm.includes('?') ||
    [...INSTRUCTION_VERBS].some(v => new RegExp('\\b' + v + '\\b').test(norm));
  // Portada: muchos campos de datos personales / instrucciones y ninguna señal de pregunta,
  // o bien un bloque corto dominado por esos campos.
  if(pdHits >= 3 && !hasQuestionCue) return true;
  if(pdHits >= 4 && words.length < 140) return true;
  return false;
}

// Línea de "ruido" a descartar (título suelto, campo de datos personales, número de página).
function isNoiseLine(line){
  const raw = line.trim();
  if(!raw) return true;
  if(TITLE_LINE_RE.test(raw)) return true;
  if(/^p[aá]gina\s+\d+/i.test(raw)) return true;            // "Página 2 de 6"
  if(/^\d+\s*\/\s*\d+\s*$/.test(raw)) return true;          // "2 / 6"
  if(/^[-_.\s]+$/.test(raw)) return true;                   // líneas de guiones/subrayado
  const norm = normalizeTxt(raw);
  const words = norm.split(/\s+/).filter(Boolean);
  const pdHits = PERSONAL_DATA_KW.filter(k => norm.includes(normalizeTxt(k))).length;
  // Línea corta tipo "Nombre: ______  Sección: ___" → campo de datos, no pregunta.
  if(pdHits >= 1 && words.length <= 9 && !norm.includes('?')) return true;
  return false;
}

function normalizeTxt(s){
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
}

// Descarta páginas extra y limpia el texto antes de partirlo en preguntas.
// Devuelve { text, skipped } donde skipped = nº de páginas descartadas.
function cleanExamText(rawText){
  const pages = rawText.split('\f');
  let skipped = 0;
  const keptPages = pages.filter(pg => {
    if(pages.length > 1 && looksLikeCoverPage(pg)){ skipped++; return false; }
    return true;
  });
  const cleanedLines = keptPages.join('\n')
    .split(/\n+/)
    .filter(line => !isNoiseLine(line));
  return { text: cleanedLines.join('\n'), skipped };
}

function splitQuestions(text){
  return text
    .split(/\n+/)
    .flatMap(line => line.split(/(?<=\?)\s+(?=[A-ZÁÉÍÓÚ¿])/))
    // separa enunciados numerados en la misma línea: "1) ...  2) ..."
    .flatMap(line => line.split(/\s+(?=\d{1,2}\s*[).\-]\s+[A-ZÁÉÍÓÚ¿])/))
    .map(s => s.replace(/^\s*\d{1,2}\s*[).\-]\s*/, '').trim())  // quita numeración inicial
    .filter(s => s.length > 8 && !isNoiseLine(s));
}

// Convierte texto crudo (de archivo o pegado) en preguntas limpias, sin páginas extra.
function textToQuestions(rawText){
  const { text, skipped } = cleanExamText(rawText);
  return { questions: splitQuestions(text), skipped };
}

function analyzeQuestions(questions){
  const wordCounts = {};
  const bigramCounts = {};
  const trigramCounts = {};

  questions.forEach(q => {
    const norm = normalizeTxt(q).replace(/[¿?¡!.,;:()"'%=+\-\/]/g, ' ');
    const words = norm.split(/\s+/).filter(w =>
      w.length > 3 && !STOPWORDS.has(w) && !INSTRUCTION_VERBS.has(w) && isNaN(w)
    );
    words.forEach(w => { wordCounts[w] = (wordCounts[w] || 0) + 1; });
    for(let i = 0; i < words.length - 1; i++){
      const bg = words[i] + ' ' + words[i+1];
      bigramCounts[bg] = (bigramCounts[bg] || 0) + 1;
    }
    for(let i = 0; i < words.length - 2; i++){
      const tg = words[i] + ' ' + words[i+1] + ' ' + words[i+2];
      trigramCounts[tg] = (trigramCounts[tg] || 0) + 1;
    }
  });

  // --- Temas: combina trigramas, bigramas y palabras frecuentes evitando redundancia ---
  let topics = [];
  Object.entries(trigramCounts).filter(([,c]) => c >= 2).forEach(([term,count]) => {
    topics.push({ term, count: count + 1 });
  });
  Object.entries(bigramCounts).filter(([,c]) => c >= 2).forEach(([term,count]) => {
    const insideTrigram = topics.some(t => t.term.includes(term));
    if(!insideTrigram) topics.push({ term, count: count + 0.5 });
  });
  Object.entries(wordCounts).forEach(([term,count]) => {
    const insideBigger = topics.some(t => t.term.split(' ').includes(term) && t.count >= count);
    if(!insideBigger) topics.push({ term, count });
  });
  topics.sort((a,b) => b.count - a.count);
  topics = topics.slice(0, 8);

  // --- Conceptos clave: términos del glosario que aparecen en las preguntas ---
  const conceptCounts = {};
  const joined = questions.map(q => normalizeTxt(q)).join('  ||  ');
  GLOSSARY_NORM.forEach(({ raw, norm }) => {
    let idx = 0, count = 0;
    while((idx = joined.indexOf(norm, idx)) !== -1){ count++; idx += norm.length; }
    if(count > 0) conceptCounts[raw] = count;
  });
  const concepts = Object.entries(conceptCounts)
    .map(([term,count]) => ({ term, count }))
    .sort((a,b) => b.count - a.count)
    .slice(0, 10);

  return { topics, concepts, total: questions.length };
}

// Caché del análisis por ramo: evita recalcular en cada render o al escribir en los
// campos del planificador. Se invalida sola cuando cambian los datos del ramo (updatedAt).
const analysisCache = new Map();
function getAnalysis(course){
  const rec = pastEvalsData[course];
  if(!rec) return null;
  const questions = getAllQuestions(course);
  if(questions.length === 0) return null;
  const key = (rec.updatedAt || 0) + '|' + questions.length;
  const cached = analysisCache.get(course);
  if(cached && cached.key === key) return cached.result;
  const result = analyzeQuestions(questions);
  analysisCache.set(course, { key, result });
  return result;
}

/* -------------------------------------------------------------------------
   5B. ANÁLISIS CON CLAUDE IA (a través del proxy en Cloudflare Workers)

   El navegador nunca ve la API key: envía el texto de las preguntas al Worker
   (ver carpeta worker/) y este responde con el JSON de temas. El motor local de
   frecuencia (sección 5) queda como respaldo cuando el Worker no responde.
   ------------------------------------------------------------------------- */

// URL del Worker desplegado (wrangler deploy la imprime al publicar).
const WORKER_URL = 'https://agentedestudio.granizovicente6.workers.dev';

// Topes espejo de los del Worker: evitan enviar cuerpos que el proxy rechazaría.
const AI_MAX_QUESTIONS = 120;
const AI_MAX_CHARS     = 18000;
const AI_TIMEOUT_MS    = 45000;

// Sello de los datos analizados: permite detectar cuando el análisis quedó obsoleto
// porque se agregaron o quitaron evaluaciones del ramo.
function evalStamp(course){
  const rec = pastEvalsData[course];
  return (rec && rec.updatedAt ? rec.updatedAt : 0) + '|' + getAllQuestions(course).length;
}

function getAiAnalysis(course){
  const rec = pastEvalsData[course];
  return (rec && rec.ai) ? rec.ai : null;
}

function aiIsStale(course){
  const ai = getAiAnalysis(course);
  return !!ai && ai.stamp !== evalStamp(course);
}

// Cuerpo que recibe el Worker. Se recortan las preguntas aquí también para no
// enviar más de lo que el proxy va a aceptar.
function buildAiPayload(course, questions){
  const preguntas = [];
  let chars = 0;
  for(const q of questions.slice(0, AI_MAX_QUESTIONS)){
    if(chars + q.length > AI_MAX_CHARS) break;
    chars += q.length;
    preguntas.push(q);
  }
  return { curso: courseForAi(course), tipoEvaluacion: examTypeForAi(course), preguntas };
}

// Valores cerrados que devuelve el Worker; cualquier otra cosa cae al valor por defecto.
const RELEVANCE_VALUES = ['Alta', 'Media', 'Baja'];
const TYPE_VALUES = ['Cuantitativo', 'Teórico', 'Aplicación'];
const MAX_AI_TOPICS = 12;

// Matriz de dominio: relevancia × resultado del diagnóstico.
const LEVELS = {
  alto:  { dot: '🔴', label: 'Urgencia crítica' },
  medio: { dot: '🟡', label: 'Refuerzo' },
  bajo:  { dot: '🟢', label: 'Dominado' }
};

// Peso de cada tema en el porcentaje de preparación: un tema de relevancia alta
// pesa el triple que uno de relevancia baja.
const RELEVANCE_WEIGHT = { Alta: 3, Media: 2, Baja: 1 };
const LEVEL_SCORE = { alto: 0, medio: 0.5, bajo: 1 };

function normalizeTopic(raw, index){
  if(!raw || typeof raw !== 'object') return null;
  const name = String(raw.name || '').trim();
  if(!name) return null;

  const dq = (raw.diagnosticQuestion && typeof raw.diagnosticQuestion === 'object')
    ? raw.diagnosticQuestion : {};
  const question = String(dq.question || '').trim();
  const options = Array.isArray(dq.options)
    ? dq.options.map(o => String(o).trim()).filter(Boolean)
    : [];
  const correctIndex = Number(dq.correctIndex);
  // Sin enunciado, sin alternativas o con un índice fuera de rango no hay
  // diagnóstico posible: el tema se muestra igual, pero sin pregunta.
  const usable = question && options.length >= 2 &&
    Number.isInteger(correctIndex) && correctIndex >= 0 && correctIndex < options.length;

  return {
    id: String(raw.id || '').trim() || `tema_${index + 1}`,
    name,
    relevance: RELEVANCE_VALUES.includes(raw.relevance) ? raw.relevance : 'Media',
    type: TYPE_VALUES.includes(raw.type) ? raw.type : 'Teórico',
    diagnosticQuestion: usable ? { question, options, correctIndex } : null,
    studySteps: Array.isArray(raw.studySteps)
      ? raw.studySteps.map(s => String(s).trim()).filter(Boolean).slice(0, 6)
      : []
  };
}

function normalizeAiResult(raw){
  let topics = Array.isArray(raw.topics)
    ? raw.topics.map(normalizeTopic).filter(Boolean).slice(0, MAX_AI_TOPICS)
    : [];

  // Respaldo para un Worker que todavía no está actualizado: sin `topics` se
  // usan los nombres de `temas_clave`, sin mini test.
  if(topics.length === 0 && Array.isArray(raw.temas_clave)){
    topics = raw.temas_clave
      .map((name, i) => normalizeTopic({ name }, i))
      .filter(Boolean)
      .slice(0, MAX_AI_TOPICS);
  }

  if(topics.length === 0) throw new Error('No se identificaron temas en este material. Sube más evaluaciones.');

  // Los ids llegan del modelo y se usan como clave del diagnóstico: si vienen
  // repetidos, las respuestas de un tema pisarían las de otro.
  const seen = new Set();
  topics.forEach((t, i) => {
    if(seen.has(t.id)) t.id = `tema_${i + 1}`;
    seen.add(t.id);
  });

  return { topics };
}

/* --- Mini test de diagnóstico: estado y matriz de dominio ----------------- */

// El diagnóstico vive dentro de `rec.ai`, así que un análisis nuevo lo reinicia
// solo: los temas (y sus ids) cambian con cada análisis.
function getDiagnostic(course){
  const ai = getAiAnalysis(course);
  if(!ai) return null;
  if(!ai.diagnostic || typeof ai.diagnostic !== 'object'){
    ai.diagnostic = { answers: {}, levels: {}, steps: {}, practiced: {}, completedAt: 0 };
  }
  const d = ai.diagnostic;
  if(!d.answers)   d.answers   = {};
  if(!d.levels)    d.levels    = {};
  if(!d.steps)     d.steps     = {};
  // `practiced` llegó después: los diagnósticos guardados antes no lo traen.
  if(!d.practiced) d.practiced = {};
  // `flashcards` llegó después: los diagnósticos guardados antes no lo traen.
  if(!d.flashcards) d.flashcards = {};
  // `feynman` llegó después: los diagnósticos guardados antes no lo traen.
  if(!d.feynman) d.feynman = {};
  // `sessions` llegó con el programa de clases guiadas: los diagnósticos
  // guardados antes no lo traen. Cada entrada es
  // { total, minutes, done, spentMin, startedAt, updatedAt }.
  if(!d.sessions) d.sessions = {};
  // `guides` llegó con las guías imprimibles: los diagnósticos guardados antes
  // no lo traen. Cada entrada es { guia, pauta, at }.
  if(!d.guides) d.guides = {};
  return d;
}

function hasDiagnosticQuestions(ai){
  return !!ai && Array.isArray(ai.topics) && ai.topics.some(t => t.diagnosticQuestion);
}

function diagnosticIsDone(course){
  const ai = getAiAnalysis(course);
  return !!(ai && ai.diagnostic && ai.diagnostic.completedAt);
}

// Matriz de dominio pedida:
//   Alta        + correcta        -> 🟡 medio  (refuerzo / mantenimiento)
//   Alta        + incorrecta/duda -> 🔴 alto   (urgencia crítica)
//   Media/Baja  + correcta        -> 🟢 bajo   (dominado)
//   Media/Baja  + incorrecta/duda -> 🟡 medio  (repaso conceptual)
function levelFromMatrix(relevance, isCorrect){
  if(relevance === 'Alta') return isCorrect ? 'medio' : 'alto';
  return isCorrect ? 'bajo' : 'medio';
}

// El amarillo significa cosas distintas según la relevancia del tema.
function levelLabel(level, relevance){
  if(level === 'alto') return 'Urgencia crítica';
  if(level === 'bajo') return 'Dominado';
  return relevance === 'Alta' ? 'Refuerzo / mantenimiento' : 'Repaso conceptual';
}

function isAnswerCorrect(topic, answerIndex){
  return !!topic.diagnosticQuestion && answerIndex === topic.diagnosticQuestion.correctIndex;
}

// Recalcula el nivel de todos los temas a partir de las respuestas guardadas.
// Un tema sin responder cuenta como duda: es el supuesto conservador.
function applyDiagnosticLevels(course){
  const ai = getAiAnalysis(course);
  const d = getDiagnostic(course);
  if(!ai || !d) return;
  ai.topics.forEach(t => {
    d.levels[t.id] = levelFromMatrix(t.relevance, isAnswerCorrect(t, d.answers[t.id]));
  });
  d.completedAt = Date.now();
}

function topicLevel(course, topic){
  const d = getDiagnostic(course);
  const level = d && d.levels[topic.id];
  return LEVELS[level] ? level : 'medio';
}

/* --- Avance del alumno: pasos marcados y temas practicados ---------------- */

// Cuánto puede subir el trabajo hecho sobre lo que le falta a un tema. Nunca
// llega a 1: cerrar la brecha del todo exige volver a medirse (repetir el mini
// test o ajustar el nivel a mano), no solo marcar casillas.
const STEP_LIFT     = 0.40;   // completar los pasos sugeridos del tema
const PRACTICE_LIFT = 0.20;   // resolver la práctica del tema

function topicSteps(course, topic){
  const d = getDiagnostic(course);
  const checked = (d && Array.isArray(d.steps[topic.id])) ? d.steps[topic.id] : [];
  const total = topic.studySteps.length;
  const done = total ? topic.studySteps.filter((s, i) => !!checked[i]).length : 0;
  return { done, total, frac: total ? done / total : 0 };
}

function isPracticed(course, topicId){
  const d = getDiagnostic(course);
  return !!(d && d.practiced && d.practiced[topicId]);
}

// Resultado del último quiz practicado ("2/3"), para el detalle de la insignia.
function practicedScore(course, topicId){
  const d = getDiagnostic(course);
  const p = (d && d.practiced) ? d.practiced[topicId] : null;
  return (p && p.total) ? `${p.hits} de ${p.total}` : '';
}

// Marca el tema como practicado. Guarda el mejor resultado: repetir la práctica
// y equivocarse más no borra lo ya logrado. Devuelve true si algo cambió.
function markPracticed(course, topicId, { hits = 0, total = 0 } = {}){
  const d = getDiagnostic(course);
  if(!d) return false;
  const prev = d.practiced[topicId];
  if(prev && prev.total === total && prev.hits >= hits) return false;
  d.practiced[topicId] = { at: Date.now(), hits, total };
  savePastEvals();
  return true;
}

// Resumen del avance del ramo, para la barra y el aviso de plan guardado.
function planProgress(course){
  const ai = getAiAnalysis(course);
  if(!ai) return { topics: 0, stepsDone: 0, stepsTotal: 0, practiced: 0 };
  let stepsDone = 0, stepsTotal = 0, practiced = 0;
  ai.topics.forEach(t => {
    const s = topicSteps(course, t);
    stepsDone += s.done;
    stepsTotal += s.total;
    if(isPracticed(course, t.id)) practiced++;
  });
  return { topics: ai.topics.length, stepsDone, stepsTotal, practiced };
}

// Dominio de un tema: el nivel del semáforo como base, más lo que el alumno
// haya avanzado sobre la brecha que le quedaba.
function topicScore(course, topic){
  const base = LEVEL_SCORE[topicLevel(course, topic)];
  const lift = STEP_LIFT * topicSteps(course, topic).frac +
               PRACTICE_LIFT * (isPracticed(course, topic.id) ? 1 : 0);
  return base + (1 - base) * lift;
}

// Porcentaje de preparación: promedio de dominio ponderado por relevancia.
function readinessPct(course){
  const ai = getAiAnalysis(course);
  if(!ai || !ai.topics.length) return 0;
  let total = 0, score = 0;
  ai.topics.forEach(t => {
    const weight = RELEVANCE_WEIGHT[t.relevance] || 1;
    total += weight;
    score += weight * topicScore(course, t);
  });
  return total ? Math.round((score / total) * 100) : 0;
}

// Temas ordenados por urgencia (🔴 primero) para el plan y las tarjetas.
const LEVEL_RANK = { alto: 0, medio: 1, bajo: 2 };
function topicsByUrgency(course){
  const ai = getAiAnalysis(course);
  if(!ai) return [];
  return ai.topics
    .map((t, i) => ({ t, i }))
    .sort((a, b) => (LEVEL_RANK[topicLevel(course, a.t)] - LEVEL_RANK[topicLevel(course, b.t)]) || (a.i - b.i))
    .map(x => x.t);
}

// Mensaje de respaldo cuando el Worker no entrega uno propio en `error`.
function workerErrorMessage(status){
  if(status === 403) return 'Este sitio no está autorizado para usar el servicio de análisis. Avisa a quien administra el sitio.';
  if(status === 413) return 'El texto enviado es demasiado grande. Quita algún archivo e inténtalo de nuevo.';
  if(status === 429) return 'Demasiadas solicitudes en poco tiempo. Espera un minuto y vuelve a intentarlo.';
  if(status >= 500)  return 'El servicio de análisis no está disponible en este momento. Reintenta en unos minutos.';
  return `El servicio de análisis respondió con un error ${status}.`;
}

// Envía las preguntas al Worker y devuelve el resultado ya normalizado.
async function requestClaudeAnalysis(payload){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El servicio de análisis todavía no está configurado en este sitio.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

  let response;
  try{
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    throw new Error(err && err.name === 'AbortError'
      ? 'El análisis tardó demasiado. Reintenta con menos evaluaciones.'
      : 'No se pudo conectar con el servicio de análisis. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok){
    throw new Error((data && data.error) || workerErrorMessage(response.status));
  }
  if(!data){
    throw new Error('El servicio de análisis devolvió una respuesta vacía. Inténtalo de nuevo.');
  }
  return normalizeAiResult(data);
}

let aiRequestInFlight = false;

function setAiLoading(on){
  aiLoadingEl.style.display = on ? '' : 'none';
  aiAnalyzeBtn.disabled = on;
}

function showAiError(message){
  if(!message){ aiErrorEl.style.display = 'none'; aiErrorEl.textContent = ''; return; }
  aiErrorEl.textContent = message;
  aiErrorEl.style.display = '';
}

// Ejecuta el análisis del ramo con Claude y lo guarda en el registro del ramo.
// Devuelve true si el análisis quedó disponible.
async function runAiAnalysis(course){
  if(aiRequestInFlight) return false;

  const questions = getAllQuestions(course);
  if(questions.length < 3){
    showAiError('Necesitas al menos 3 preguntas cargadas para analizar el temario.');
    return false;
  }

  aiRequestInFlight = true;
  showAiError('');
  setAiLoading(true);
  try{
    const result = await requestClaudeAnalysis(buildAiPayload(course, questions));
    // Los ids ("tema_1", "tema_2"...) se reutilizan entre análisis: sin limpiar,
    // un tema nuevo heredaría la práctica —y la conversación— del tema viejo que
    // ocupaba ese id.
    clearPracticeCache(course);
    clearTopicChatThreads(course);
    // Una clase abierta sobre un tema que dejó de existir no tiene dónde volver:
    // se cierra sin preguntar.
    if(studySessionState && studySessionState.course === course) closeStudySession({ force: true });
    const rec = getRecord(course);
    rec.ai = {
      ...result,
      stamp: evalStamp(course),
      analyzedAt: Date.now(),
      questionCount: questions.length
    };
    savePastEvals();
    return true;
  }catch(err){
    showAiError(err.message || 'No se pudo completar el análisis con Claude IA.');
    return false;
  }finally{
    aiRequestInFlight = false;
    setAiLoading(false);
  }
}

/* -------------------------------------------------------------------------
   5B. CARRERA ACTIVA: CABECERA, DESPLEGABLE Y PANTALLA DE SELECCIÓN

   La carrera no es un filtro más del planificador: cambia el fichero de ramos,
   los textos con los que la app se presenta y —sobre todo— el cajón de
   localStorage donde vive lo estudiado. Por eso cambiarla equivale a rearrancar
   la app: se cierran los modales, se sueltan las cachés de memoria y se releen
   los datos guardados de la carrera elegida.
   ------------------------------------------------------------------------- */

// ¿Está abierta la pantalla de selección? Comparte el bloqueo de scroll del
// fondo con los otros modales (ver releaseModalLock).
let careerSelectorOpen = false;

// Textos y color de la carrera activa en la cabecera, el pie y la pestaña.
function applyCareerChrome(){
  const info = careerInfo();
  document.title = `${info.title} — UC`;
  document.body.style.setProperty('--career-accent', info.accent);
  if(headerEyebrowEl) headerEyebrowEl.textContent = info.faculty;
  if(appTitleEl)      appTitleEl.textContent = info.title;
  if(appIntroEl)      appIntroEl.textContent = info.intro;
  if(appFooterEl)     appFooterEl.textContent = info.footer;
  if(careerBadgeIconEl) careerBadgeIconEl.textContent = info.icon;
  if(careerBadgeNameEl) careerBadgeNameEl.textContent = info.label;
  if(careerBadgeEl) careerBadgeEl.title = `Carrera activa: ${info.label}. Haz clic para cambiarla.`;
  renderCareerMenu();
}

/* --- Desplegable de la cabecera ------------------------------------------- */

function renderCareerMenu(){
  if(!careerMenuEl) return;
  careerMenuEl.innerHTML = '';
  CAREER_ORDER.forEach(id => {
    const info = CAREERS[id];
    const { courses } = careerCounts(id);
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'career-menu-item' + (id === activeCareer ? ' active' : '');
    item.setAttribute('role', 'menuitemradio');
    item.setAttribute('aria-checked', id === activeCareer ? 'true' : 'false');
    item.innerHTML = `
      <span class="career-menu-icon" aria-hidden="true">${info.icon}</span>
      <span class="career-menu-text">
        <span class="career-menu-name">${escapeHtml(info.label)}</span>
        <span class="career-menu-meta">${courses} ramos${
          careerHasStoredData(id) ? ' · con plan guardado' : ''}</span>
      </span>
      <span class="career-menu-check" aria-hidden="true">${id === activeCareer ? '✓' : ''}</span>`;
    item.onclick = () => {
      closeCareerMenu();
      switchCareer(id);
    };
    careerMenuEl.appendChild(item);
  });

  const all = document.createElement('button');
  all.type = 'button';
  all.className = 'career-menu-all';
  all.setAttribute('role', 'menuitem');
  all.textContent = 'Ver la pantalla de carreras';
  all.onclick = () => {
    closeCareerMenu();
    openCareerSelector();
  };
  careerMenuEl.appendChild(all);
}

function openCareerMenu(){
  if(!careerMenuEl || !careerBadgeEl) return;
  renderCareerMenu();
  careerMenuEl.hidden = false;
  careerBadgeEl.setAttribute('aria-expanded', 'true');
  document.addEventListener('keydown', onCareerMenuKeydown);
  // En el mismo clic que abre el menú no se puede escuchar el clic de fuera, o
  // se cerraría al instante: se engancha en el siguiente ciclo.
  setTimeout(() => document.addEventListener('click', onCareerMenuOutsideClick), 0);
}

function closeCareerMenu(){
  if(!careerMenuEl || careerMenuEl.hidden) return;
  careerMenuEl.hidden = true;
  if(careerBadgeEl) careerBadgeEl.setAttribute('aria-expanded', 'false');
  document.removeEventListener('keydown', onCareerMenuKeydown);
  document.removeEventListener('click', onCareerMenuOutsideClick);
}

function onCareerMenuKeydown(ev){
  if(ev.key === 'Escape'){ ev.preventDefault(); closeCareerMenu(); }
}

function onCareerMenuOutsideClick(ev){
  if(careerSwitchEl && careerSwitchEl.contains(ev.target)) return;
  closeCareerMenu();
}

/* --- Pantalla de selección de carrera -------------------------------------- */

function renderCareerCards(){
  if(!careerCardsEl) return;
  careerCardsEl.innerHTML = '';
  CAREER_ORDER.forEach(id => {
    const info = CAREERS[id];
    const { cats, courses } = careerCounts(id);
    const saved = careerHasStoredData(id);
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'career-card' + (id === activeCareer && careerChosen ? ' is-active' : '');
    card.style.setProperty('--career-card-accent', info.accent);
    card.innerHTML = `
      <span class="career-card-icon" aria-hidden="true">${info.icon}</span>
      <span class="career-card-name">${escapeHtml(info.label)}</span>
      <span class="career-card-faculty">${escapeHtml(info.faculty)}</span>
      <span class="career-card-pitch">${escapeHtml(info.pitch)}</span>
      <span class="career-card-stats">
        <span class="career-card-stat">${cats} áreas</span>
        <span class="career-card-stat">${courses} ramos</span>
        ${saved ? '<span class="career-card-stat is-saved">plan guardado</span>' : ''}
      </span>
      <span class="career-card-go">${id === activeCareer && careerChosen
        ? 'Seguir en esta carrera →' : 'Entrar →'}</span>`;
    card.onclick = () => switchCareer(id);
    careerCardsEl.appendChild(card);
  });
}

function openCareerSelector(){
  if(!careerModalEl) return;
  careerSelectorOpen = true;
  renderCareerCards();
  // La primera visita no tiene a dónde volver: el botón de cerrar solo aparece
  // cuando ya hay una carrera elegida.
  if(careerModalCloseEl) careerModalCloseEl.hidden = !careerChosen;
  if(careerModalNoteEl){
    careerModalNoteEl.textContent = careerChosen
      ? 'Puedes cambiar de carrera cuando quieras desde la insignia de arriba. Lo estudiado en cada una se guarda por separado en este navegador.'
      : 'Elige tu carrera para empezar. Lo que estudies se guarda por carrera en este navegador, así que puedes cambiarte más adelante sin perder nada.';
  }
  careerModalEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onCareerSelectorKeydown);
}

function closeCareerSelector(){
  if(!careerModalEl || !careerSelectorOpen) return;
  // Sin carrera elegida no hay app detrás que mostrar: la pantalla no se cierra.
  if(!careerChosen) return;
  careerSelectorOpen = false;
  careerModalEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onCareerSelectorKeydown);
}

function onCareerSelectorKeydown(ev){
  if(ev.key === 'Escape'){ ev.preventDefault(); closeCareerSelector(); }
}

/* --- Cambio de carrera ------------------------------------------------------ */

// Cierra todo lo que esté abierto y suelta lo que vive solo en memoria: las
// cachés de práctica, flashcards y chat son por tema, y los temas de la carrera
// que se abandona no existen en la nueva.
function releaseCareerState(){
  if(testState) closeDiagnosticTest();
  if(practiceState) closePractice();
  if(flashcardsState) closeFlashcards();
  if(feynmanState) closeFeynman();
  if(topicChatState) closeTopicChat();
  if(studySessionState) closeStudySession({ force: true });
  if(examState) closeExamSimulation({ force: true });
  if(sheetState) closeCheatSheet();
  if(guideState) closeStudyGuide();

  practiceCache.clear();
  topicChatThreads.clear();
  openTopics.clear();
  Object.keys(sessionFiles).forEach(k => delete sessionFiles[k]);
}

function switchCareer(careerId){
  if(!CAREERS[careerId]) return;

  // Volver a elegir la carrera en la que ya estás no reinicia nada: solo cierra
  // la pantalla de selección (o la abre por primera vez y la confirma).
  if(careerId === activeCareer && careerChosen){
    closeCareerSelector();
    return;
  }

  const isFirstChoice = !careerChosen;
  if(!isFirstChoice) releaseCareerState();

  // Mientras se recarga el estado no se guarda sesión: los render intermedios
  // escribirían la carrera nueva con el ramo de la anterior.
  sessionReady = false;

  activeCareer = careerId;
  careerChosen = true;
  try{ localStorage.setItem(CAREER_KEY, activeCareer); }
  catch(e){ /* almacenamiento no disponible */ }

  DATA = CAREERS[activeCareer].data;
  refreshGlossary();
  loadCareerStores();

  activeCat = firstCatKey();
  activeCourse = firstCourse();
  activeTab = 'planner';
  planUsesEvals = false;
  sessionRestored = false;
  evalsVisible = true;
  if(evalTextarea) evalTextarea.value = '';
  if(fileStatusEl) fileStatusEl.textContent = '';
  showAiError('');

  // Cada carrera recuerda dónde quedó el alumno: al volver a ella se retoma su
  // último ramo, no el primero del fichero.
  restoreSession();
  activeTab = 'planner';
  syncActiveExam(activeCourse);

  applyCareerChrome();
  renderAll();
  sessionReady = true;
  saveSession();

  if(careerSelectorOpen) closeCareerSelector();
}

/* -------------------------------------------------------------------------
   6. RENDER: fichero, ramos, método
   ------------------------------------------------------------------------- */
function renderDrawers(){
  drawersEl.innerHTML = '';
  Object.keys(DATA).forEach(key => {
    const cat = DATA[key];
    const btn = document.createElement('button');
    btn.className = 'drawer' + (key === activeCat ? ' active' : '');
    btn.style.setProperty('--drawer-color', cat.color);
    btn.innerHTML = `<span>${cat.label}</span><span class="tag">${cat.courses.length}</span>`;
    btn.onclick = () => {
      activeCat = key;
      activeCourse = cat.courses[0];
      planUsesEvals = false;
      sessionRestored = false;
      renderAll();
      saveSession();
    };
    drawersEl.appendChild(btn);
  });
}

function renderPicker(){
  pickerEl.innerHTML = '';
  DATA[activeCat].courses.forEach(course => {
    const pill = document.createElement('button');
    pill.className = 'course-pill' + (course === activeCourse ? ' active' : '');
    pill.textContent = course;
    pill.onclick = () => {
      activeCourse = course;
      planUsesEvals = false;
      sessionRestored = false;
      renderAll();
      saveSession();
    };
    pickerEl.appendChild(pill);
  });
}

function renderCard(){
  const cat = DATA[activeCat];
  cardEl.innerHTML = `
    <div class="card-head">
      <span class="card-cat" style="color:${cat.color}">${cat.label} · ${activeCourse}</span>
    </div>
    <p class="card-method">${cat.method}</p>
    <ul class="card-list">
      ${cat.techniques.map(t => `<li>${t}</li>`).join('')}
    </ul>
    <div class="card-foot"><b>Herramientas sugeridas:</b> ${cat.tools}</div>
  `;
}

function renderTabs(){
  tabMetodoBtn.className = 'tab-btn' + (activeTab==='metodo' ? ' active' : '');
  tabPlannerBtn.className = 'tab-btn' + (activeTab==='planner' ? ' active' : '');
  panelMetodo.style.display = activeTab==='metodo' ? '' : 'none';
  panelPlanner.style.display = activeTab==='planner' ? '' : 'none';
}

// Presets del tipo de evaluación: son atajos para rellenar la ponderación, no
// una elección aparte. La píldora se marca cuando el porcentaje es exactamente
// el suyo; si el alumno escribió otro número, la del tramo que le corresponde
// queda solo insinuada (`is-near`) y el campo muestra "Personalizado".
function renderExamPills(){
  if(!examPillsEl) return;
  const pct = getEvalWeight(activeCourse);
  const nearKey = examKeyForWeight(pct);
  examPillsEl.innerHTML = '';
  EXAM_ORDER.forEach(key => {
    const et = EXAM_TYPES[key];
    const exact = et.presetPct === pct;
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'exam-pill' + (exact ? ' active' : (key === nearKey ? ' is-near' : ''));
    pill.title = `${et.label}: rellena la ponderación con ${formatPct(et.presetPct)}%`;
    pill.innerHTML = `${et.label}<small>${escapeHtml(formatPct(et.presetPct))}%</small>`;
    // La ponderación pondera el presupuesto completo: además del resumen hay
    // que repintar los chips de cada tarjeta, o la caja y los temas dirían
    // números distintos.
    pill.onclick = () => {
      setEvalWeight(activeCourse, et.presetPct);
      renderPlanner();
      refreshEffortUI();
      saveSession();
    };
    examPillsEl.appendChild(pill);
  });
}

// Campo de la ponderación: se sincroniza con el estado igual que la nota meta,
// sin pisar el control que el alumno está escribiendo en ese momento.
function renderExamWeight(){
  const pct = getEvalWeight(activeCourse);
  if(examWeightInput && document.activeElement !== examWeightInput){
    examWeightInput.value = String(pct);
  }
  if(examWeightTag){
    const custom = !weightIsPreset(activeCourse);
    examWeightTag.textContent = custom ? 'Personalizado' : EXAM_TYPES[examKeyForWeight(pct)].label;
    examWeightTag.classList.toggle('is-custom', custom);
    examWeightTag.title = custom
      ? `Ponderación escrita a mano: ${formatPct(pct)}% de la nota final del ramo.`
      : `Preset ${EXAM_TYPES[examKeyForWeight(pct)].label.toLowerCase()}: ${formatPct(pct)}% de la nota final del ramo.`;
  }
}

/* -------------------------------------------------------------------------
   7. PLANIFICADOR

   El planificador ya no arma un cronograma genérico por días: el único plan que
   existe es el que sale del análisis del temario con Claude IA (los temas, su
   relevancia y la brecha de cada uno). Mientras no haya análisis, el panel
   muestra un estado limpio que invita a generarlo.
   ------------------------------------------------------------------------- */

// Plural con la forma escrita entera: "sesión"/"sesiones" no se resuelve pegando
// una "s" al final, y la app está llena de estos casos.
function plural(n, singular, plural_){ return n === 1 ? singular : plural_; }

// Tiempo que queda por delante. formatHoursLabel nunca baja de "5 min" (redondea
// al cuarto de hora y pone un piso), y para un saldo eso es mentira: cuando no
// queda nada hay que decir que no queda nada.
function formatHoursLeft(h){
  return h <= 0 ? '0 min' : formatHoursLabel(h);
}

function formatHoursLabel(h){
  const rounded = Math.round(h*4)/4; // al cuarto de hora más cercano
  if(rounded < 1){
    const minutes = Math.max(5, Math.round(rounded*60/5)*5);
    return `${minutes} min`;
  }
  const hourStr = Number.isInteger(rounded) ? String(rounded) : rounded.toString().replace('.', ',');
  return `${hourStr} h`;
}

// Escapa texto dinámico (nombres de archivo, términos extraídos) antes de inyectarlo en el DOM.
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c =>
    ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}

/* --- Avisos breves ----------------------------------------------------------
   Para lo que pasó y ya no se ve: dar una lección por pasada cierra el modal, y
   sin este aviso el alumno se quedaría mirando el tablero sin saber si quedó
   registrado. No reemplaza a lo que la interfaz muestra por su cuenta (el tema
   verde, la barra más alta): lo nombra mientras se ve el cambio.

   `html` va sin escapar a propósito —los llamadores arman el mensaje con <b> y
   escapan lo suyo con escapeHtml—, igual que el resto de los render de la app.

   `action` es opcional: { label, run }. Con él el aviso deja de ser solo un
   aviso y pasa a ser la forma de deshacer lo que acaba de pasar, así que dura
   bastante más: cinco segundos alcanzan para leer "listo", no para darse cuenta
   de que uno le apuntó al botón equivocado.
   --------------------------------------------------------------------------- */
const TOAST_MS = 5200;
const TOAST_ACTION_MS = 11000;

function showToast(html, tone = 'ok', action = null){
  if(!toastStackEl) return null;

  const withAction = !!(action && action.label && typeof action.run === 'function');

  const el = document.createElement('div');
  el.className = `toast is-${tone}${withAction ? ' has-action' : ''}`;
  el.innerHTML = `<span class="toast-text">${html}</span>`;

  // Se puede sacar de encima con un clic: el aviso llega abajo al centro y en
  // pantallas chicas queda sobre el contenido.
  let timer = 0;
  const dismiss = () => {
    if(!el.isConnected) return;
    clearTimeout(timer);
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 200);
  };
  el.addEventListener('click', dismiss);

  if(withAction){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'toast-action';
    btn.textContent = action.label;
    // El clic en el botón no puede quedarse también con el del aviso: se cierra
    // aquí y a mano, y el de arriba no llega a correr dos veces.
    btn.addEventListener('click', ev => {
      ev.stopPropagation();
      dismiss();
      action.run();
    });
    el.appendChild(btn);
  }

  timer = setTimeout(dismiss, withAction ? TOAST_ACTION_MS : TOAST_MS);

  toastStackEl.appendChild(el);
  // Tres avisos apilados ya tapan media pantalla: se van los más viejos.
  while(toastStackEl.children.length > 3) toastStackEl.firstElementChild.remove();
  return el;
}

// Estado limpio mientras el ramo no tiene temario analizado: en vez de un plan
// inventado, la invitación a generarlo. El botón cambia según lo que falte:
// subir material o lanzar el análisis con lo que ya está cargado.
function renderPlanEmptyState(){
  const questions = getAllQuestions(activeCourse);
  const enough = questions.length >= 3;
  return `
    <div class="plan-empty">
      <p class="plan-empty-eyebrow">Paso 1 · Generar el plan</p>
      <h3 class="plan-empty-title">Todavía no hay un plan para ${escapeHtml(activeCourse)}</h3>
      <p class="plan-empty-text">${enough
        ? `Ya tienes <b>${questions.length} pregunta${questions.length === 1 ? '' : 's'}</b> cargada${
            questions.length === 1 ? '' : 's'} de este ramo. Presiona
           <b>“Generar el Plan de Estudio”</b> y Claude IA identifica los temas del temario, su
           relevancia y el orden en que conviene atacarlos.`
        : `Sube controles, pruebas o exámenes pasados —o pega las preguntas a mano, más abajo— y
           presiona <b>“Generar el Plan de Estudio”</b>. Con el temario analizado por Claude IA
           aparecen aquí los temas priorizados y el presupuesto de horas y ejercicios para tu
           nota meta.`}</p>
      <div class="eval-actions">
        <button type="button" class="primary-btn" data-action="${enough ? 'run-analysis' : 'go-upload'}">
          ${enough ? 'Generar el Plan de Estudio' : 'Subir archivos o pegar preguntas'}
        </button>
      </div>
      <p class="plan-empty-note">El tipo de evaluación y la nota meta de arriba definen el peso del
      temario y cuánta brecha hay que cerrar; los temas los pone el análisis de Claude IA.</p>
    </div>`;
}

function renderPlanner(){
  // La etiqueta del tipo de evaluación sale de la ponderación del ramo activo:
  // al cambiar de ramo cambia la ponderación y, con ella, el nombre.
  syncActiveExam(activeCourse);
  renderExamPills();
  renderExamWeight();
  const et = EXAM_TYPES[activeExam];
  const ai = getAiAnalysis(activeCourse);

  // Presupuesto de la nota meta: sale de la meta, de la ponderación del tipo de
  // evaluación y de la brecha de los temas que identificó Claude IA.
  const effort = computeEffortPlan(activeCourse);

  if(!ai || !ai.topics || !ai.topics.length){
    planOutputEl.innerHTML = renderPlanEmptyState();
    renderTargetGrade(effort);
    return;
  }

  // Los temas van ordenados por urgencia (🔴 primero) cuando ya se hizo el mini
  // test; si no, en el orden en que los devolvió el análisis.
  const topics = topicsByUrgency(activeCourse);
  const priorityTerms = topics.slice(0, 5).map(t => t.name).join(', ');
  const measured = diagnosticIsDone(activeCourse);
  const analyzed = ai.questionCount || getAllQuestions(activeCourse).length;

  planOutputEl.innerHTML = `
    <p class="plan-summary">
      Plan de <b>${escapeHtml(activeCourse)}</b> · ${et.label} (${escapeHtml(examWeightNote(activeCourse))}), armado sobre los
      <b>${topics.length} tema${topics.length === 1 ? '' : 's'}</b> que <b>Claude IA</b> identificó en
      ${analyzed} pregunta${analyzed === 1 ? '' : 's'} de tus evaluaciones pasadas.
      Para tu meta de <b>${formatGrade(effort.target)}</b> el presupuesto es de
      <b>${formatHoursLabel(effort.hoursTotal)}</b> de estudio efectivo y
      <b>${effort.exercisesTotal} ejercicios</b>, repartidos tema por tema según su brecha y su peso
      en la evaluación.
      ${measured
        ? `Empieza por donde el mini test detectó más brecha: <b>${escapeHtml(priorityTerms)}</b>.`
        : `Haz el mini test de diagnóstico de más arriba y el reparto se ajusta a lo que de verdad
           te falta. Mientras tanto, parte por: <b>${escapeHtml(priorityTerms)}</b>.`}
      ${aiIsStale(activeCourse)
        ? ` Cambiaron las evaluaciones de este ramo desde el último análisis: presiona
            “${escapeHtml(aiAnalyzeLabel(activeCourse))}” más abajo para actualizar el plan.`
        : ''}
    </p>`;

  // La caja de la nota meta y este resumen hablan del mismo cálculo: se repintan
  // juntas para que nunca se contradigan.
  renderTargetGrade(effort);
}

// Atajos del estado limpio: llevan al material o lanzan el análisis, que es lo
// mismo que hace el botón de la sección de evaluaciones.
if(planOutputEl) planOutputEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn) return;
  const action = btn.getAttribute('data-action');
  if(action === 'run-analysis'){ aiAnalyzeBtn.click(); return; }
  if(action === 'go-upload'){
    if(!evalsVisible){ evalsVisible = true; renderEvalToggle(); saveSession(); }
    evalBody.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* -------------------------------------------------------------------------
   7B. CALCULADORA DE NOTA META Y ASIGNADOR DE ESFUERZO

   La pregunta que resuelve este bloque es "¿cuánto tengo que estudiar para
   sacarme la nota que quiero?". La respuesta sale de tres datos: a dónde quiere
   llegar (la nota meta), cuánto pesa la evaluación (Control / Prueba / Examen) y
   qué tan lejos está de cada tema que identificó Claude IA (la brecha, medida
   con el mini test y el avance marcado). Ya no interviene ningún calendario:
   no hay días ni horas/día que el alumno tenga que declarar.

   La brecha se traduce a horas y esas horas se reparten entre los temas según
   su urgencia: un 🔴 de relevancia alta se lleva varias veces lo de un 🟢 de
   relevancia baja, que igual recibe una cuota mínima de mantención para no
   perderlo antes de la prueba.
   ------------------------------------------------------------------------- */

// Cuota de mantención: aunque un tema esté dominado y la brecha sea 0, sigue
// pidiendo un repaso. Sin esto las tarjetas verdes mostrarían "0 h".
const MAINTENANCE_LOAD = 0.12;
// Multiplicador por color del semáforo: los rojos se llevan la mayor carga.
const URGENCY_MULT = { alto: 1.35, medio: 1.0, bajo: 0.75 };
// Horas de estudio efectivo por unidad de esfuerzo. Calibrado sobre el caso que
// más se repite: un tema 🔴 de relevancia alta, partiendo de cero hacia un 5,5,
// pide del orden de 3,5 h. De ahí sale todo lo demás por proporción.
const HOURS_PER_EFFORT_UNIT = 0.9;
// Cuántos ejercicios rinde una hora según el tipo de tema: un tema cuantitativo
// se estudia resolviendo, uno teórico leyendo y explicando.
const EXERCISES_PER_HOUR = { 'Cuantitativo': 4, 'Aplicación': 3, 'Teórico': 2 };
const MIN_TOPIC_HOURS = 0.25;
const MIN_TOPIC_EXERCISES = 2;

/* Ponderación → multiplicador del presupuesto.

   La referencia es la prueba típica del 25%: ahí el multiplicador vale 1 y el
   presupuesto es el que calibra HOURS_PER_EFFORT_UNIT. De ahí para arriba y
   para abajo crece en línea recta con el porcentaje, pero sobre un piso: una
   evaluación del 5% igual exige estudiar (no se llega a cero), y una del 100%
   pide del orden del triple que una prueba normal, no cuatro veces más.

     5%  → 0,48    10% → 0,61    18% → 0,82
     25% → 1,00    35% → 1,26    50% → 1,65    100% → 2,95

   Los ejercicios salen de las horas (EXERCISES_PER_HOUR), así que suben con la
   ponderación por el mismo factor: más peso en la nota, más horas de repaso y
   más ejercicios sugeridos por tema. */
const WEIGHT_REF_PCT = 25;      // la prueba típica: multiplicador 1
const WEIGHT_FLOOR = 0.35;      // piso: ni la evaluación más liviana se salta el repaso

function weightFactor(pct){
  const p = clampNumber(pct, EVAL_WEIGHT_MIN, EVAL_WEIGHT_MAX, EVAL_WEIGHT_DEFAULT);
  return WEIGHT_FLOOR + (1 - WEIGHT_FLOOR) * (p / WEIGHT_REF_PCT);
}

// Misma escala lineal 1,0–7,0 que usa el simulacro (`examGrade`): 0% de dominio
// es un 1,0 y 100% un 7,0. Es una referencia de estudio, no la escala real del
// ramo, pero mantenerla consistente evita que la app se contradiga a sí misma.
function gradeToMastery(grade){ return clampNumber((grade - 1) / 6, 0, 1, 0); }
function masteryToGrade(mastery){ return roundGrade(1 + clampNumber(mastery, 0, 1, 0) * 6); }

function formatGrade(grade){ return grade.toFixed(1).replace('.', ','); }

/* --- Programa de sesiones por tema -----------------------------------------
   Las horas de un tema no se estudian de una sentada: se reparten en clases
   guiadas de 30 a 45 minutos, que es lo que aguanta un bloque de estudio real.
   El programa dice cuántas clases son, cuánto dura cada una y cuántas van
   hechas; el tiempo de las que ya se hicieron se descuenta del presupuesto.

   El programa se congela cuando arranca la primera clase (ensureSessionProgram).
   Si se recalculara en cada render, completar la sesión 1 bajaría la brecha del
   tema y el alumno vería "sesión 2 de 3" transformarse en "sesión 2 de 2". */

const SESSION_BLOCK_MIN_MINUTES = 30;
const SESSION_BLOCK_MAX_MINUTES = 45;
const MAX_TOPIC_SESSIONS = 12;          // espejo del tope del Worker

// Reparte las horas del tema en bloques: tantos como haga falta para que ninguno
// pase de 45 min, todos del mismo largo. Un tema de 2 h son 3 sesiones de 40; uno
// de 45 min, una sola. Bajo los 30 min igual queda una sesión de 30: una clase de
// tres fases no cabe en menos.
function splitHoursIntoSessions(hours){
  const minutes = Math.max(0, Math.round((Number(hours) || 0) * 60));
  const total = clampNumber(Math.ceil(minutes / SESSION_BLOCK_MAX_MINUTES), 1, MAX_TOPIC_SESSIONS, 1);
  const per = clampNumber(Math.round((minutes / total) / 5) * 5,
                          SESSION_BLOCK_MIN_MINUTES, SESSION_BLOCK_MAX_MINUTES, SESSION_BLOCK_MIN_MINUTES);
  return { total: Math.round(total), minutes: per };
}

// Programa guardado del tema, o null si todavía no ha empezado ninguna clase.
function getSessionProgram(course, topicId){
  const d = getDiagnostic(course);
  const p = (d && d.sessions) ? d.sessions[topicId] : null;
  return (p && p.total > 0) ? p : null;
}

// Programa tal como lo muestra la interfaz: sale del presupuesto ya calculado,
// así que no recalcula nada. Devuelve null si el tema no está en el plan.
function topicProgram(course, topicId, plan){
  const e = topicEffort(plan || computeEffortPlan(course), topicId);
  if(!e) return null;
  const done = e.sessionsDone;
  const total = e.sessionsTotal;
  return {
    total, done, minutes: e.sessionMinutes,
    pending: Math.max(0, total - done),
    complete: done >= total,
    // La que toca ahora. Con el programa terminado sigue apuntando a la última:
    // volver a entrar es un repaso extra, no una sesión nueva del plan.
    nextIndex: Math.min(done + 1, total),
    hours: e.hours, remainingHours: e.remainingHours, spentHours: e.spentHours
  };
}

// Fija el programa del tema la primera vez que se entra a una clase. Desde ahí
// el total y el largo de los bloques ya no se mueven.
function ensureSessionProgram(course, topicId){
  const d = getDiagnostic(course);
  if(!d) return null;
  const stored = getSessionProgram(course, topicId);
  if(stored) return stored;

  const effort = topicEffort(computeEffortPlan(course), topicId);
  const split = splitHoursIntoSessions(effort ? effort.hours : 0);
  d.sessions[topicId] = {
    total: split.total, minutes: split.minutes,
    done: 0, spentMin: 0,
    startedAt: Date.now(), updatedAt: Date.now()
  };
  savePastEvals();
  return d.sessions[topicId];
}

// Presupuesto completo de esfuerzo del ramo activo. Devuelve tanto el total
// como el reparto por tema, para que la caja de la meta y las tarjetas hablen
// siempre del mismo cálculo.
function computeEffortPlan(course){
  const weightPct = getEvalWeight(course);

  const target = getTargetGrade(course);
  const required = gradeToMastery(target);          // dominio que exige la meta
  const currentPct = readinessPct(course);
  const currentMastery = currentPct / 100;
  const currentGrade = masteryToGrade(currentMastery);
  const globalGap = clampNumber(required - currentMastery, 0, 1, 0);

  const ai = getAiAnalysis(course);
  const topics = ai ? topicsByUrgency(course) : [];
  const measured = diagnosticIsDone(course);

  // Un control del 5% no se estudia como un examen del 40%: la ponderación en
  // la nota final es el único factor externo a la meta y a la brecha.
  const examFactor = weightFactor(weightPct);

  const units = topics.map(t => {
    // Sin mini test hecho no se supone dominio medio: el resto de la app trata
    // el tema sin responder como duda, y suponer que el alumno ya sabe la mitad
    // le entregaría un plan demasiado liviano justo cuando menos sabe de sí mismo.
    const level = measured ? topicLevel(course, t) : levelFromMatrix(t.relevance, false);
    const base = LEVEL_SCORE[level];
    const lift = STEP_LIFT * topicSteps(course, t).frac +
                 PRACTICE_LIFT * (isPracticed(course, t.id) ? 1 : 0);
    const gap = clampNumber(required - (base + (1 - base) * lift), 0, 1, 0);
    const weight = RELEVANCE_WEIGHT[t.relevance] || 1;
    return { topic: t, level, gap, raw: (gap + MAINTENANCE_LOAD) * weight * (URGENCY_MULT[level] || 1) };
  });

  // Sin temas analizados no hay brecha que medir y por lo tanto no hay
  // presupuesto: la caja de la meta muestra "—" e invita a generar el plan.
  const totalRaw = units.reduce((sum, u) => sum + u.raw, 0);
  const budget = totalRaw > 0
    ? Math.max(0.5, Math.round(totalRaw * HOURS_PER_EFFORT_UNIT * examFactor * 4) / 4)
    : 0;

  const byTopic = {};
  let hoursTotal = 0;
  let exercisesTotal = 0;
  let hoursRemaining = 0;
  let exercisesRemaining = 0;
  let sessionsTotal = 0;
  let sessionsDone = 0;
  units.forEach(u => {
    const share = totalRaw ? u.raw / totalRaw : 0;
    // Lo que pide la brecha de hoy. Es el presupuesto mientras el tema no tenga
    // programa: en cuanto empieza, el programa pasa a mandar (ver abajo).
    const gapHours = Math.max(MIN_TOPIC_HOURS, Math.round(budget * share * 4) / 4);

    // El programa de clases del tema. Si ya empezó, manda el guardado: el total
    // de sesiones y el largo de los bloques quedaron fijos ahí, y el presupuesto
    // del tema pasa a ser el programa mismo (sesiones × minutos).
    //
    // Esto NO es un detalle de presentación. Si el presupuesto siguiera saliendo
    // de la brecha, completar una sesión lo hundiría —baja el nivel y suma como
    // práctica— y encima se le restaría el tiempo de la clase: el tema quedaría
    // con "5 min por estudiar" y cuatro sesiones de 40 min por delante. Con el
    // programa como unidad, lo que queda es siempre lo que falta por hacer.
    const program = getSessionProgram(course, u.topic.id);
    const split = program ? { total: program.total, minutes: program.minutes }
                          : splitHoursIntoSessions(gapHours);
    const hours = program ? (split.total * split.minutes) / 60 : gapHours;
    const done = program ? Math.min(program.done, program.total) : 0;

    const rate = EXERCISES_PER_HOUR[u.topic.type] || 3;
    const exercises = Math.max(MIN_TOPIC_EXERCISES, Math.round(hours * rate));

    // Lo ya invertido en clases hechas se descuenta: con `spentMin` sumando
    // exactamente los minutos de cada sesión cumplida, lo que queda equivale a
    // las sesiones pendientes por el largo del bloque.
    const spentHours = program ? Math.min(hours, (program.spentMin || 0) / 60) : 0;
    const remainingHours = Math.max(0, hours - spentHours);
    const remainingExercises = hours > 0
      ? Math.max(0, Math.round(exercises * (remainingHours / hours)))
      : 0;

    byTopic[u.topic.id] = {
      hours, exercises, share, level: u.level, gap: u.gap,
      spentHours, remainingHours, remainingExercises,
      sessionsTotal: split.total, sessionMinutes: split.minutes, sessionsDone: done
    };
    hoursTotal += hours;
    exercisesTotal += exercises;
    hoursRemaining += remainingHours;
    exercisesRemaining += remainingExercises;
    sessionsTotal += split.total;
    sessionsDone += done;
  });
  // El total es la suma de lo repartido, no el presupuesto antes de repartirlo:
  // los redondeos al cuarto de hora y los mínimos por tema harían que la caja
  // prometiera un número y las tarjetas sumaran otro.
  return {
    target, required, currentPct, currentGrade, globalGap, measured,
    weightPct, examFactor,
    hasTopics: units.length > 0, topicCount: units.length,
    hoursTotal, exercisesTotal, byTopic,
    // Lo que queda por delante después de descontar las clases ya hechas, y el
    // programa completo del ramo: es lo que ve el alumno en los badges.
    hoursRemaining, exercisesRemaining,
    hoursSpent: Math.max(0, Math.round((hoursTotal - hoursRemaining) * 4) / 4),
    sessionsTotal, sessionsDone,
    alreadyThere: globalGap <= 0 && measured
  };
}

// Presupuesto de un tema: lo usan la tarjeta y el parche en caliente.
function topicEffort(plan, topicId){
  return (plan && plan.byTopic[topicId]) || null;
}

// Resumen del reparto, sobre las tarjetas de temas.
function effortSummaryHtml(plan){
  const s = plan.sessionsTotal;
  const programa = s
    ? ` Eso son <b>${s} clase${s === 1 ? '' : 's'} guiada${s === 1 ? '' : 's'}</b> de 30 a 45 minutos${
        plan.sessionsDone ? `, de las que llevas <b>${plan.sessionsDone}</b> hecha${plan.sessionsDone === 1 ? '' : 's'}` : ''}.`
    : '';
  const hecho = plan.hoursSpent > 0
    ? ` Descontando lo ya trabajado, quedan <b>${formatHoursLeft(plan.hoursRemaining)}</b> y
        <b>${plan.exercisesRemaining} ejercicios</b>.`
    : '';
  return `Para tu meta de <b>${formatGrade(plan.target)}</b> hay que repartir
    <b>${formatHoursLabel(plan.hoursTotal)}</b> y <b>${plan.exercisesTotal} ejercicios</b>
    entre estos ${plan.topicCount} tema${plan.topicCount === 1 ? '' : 's'}:
    los 🔴 se llevan la mayor carga, los 🟡 el refuerzo y los 🟢 solo la mantención.${programa}${hecho}
    Cambia la nota meta arriba y el reparto se recalcula.`;
}

// Caja de la nota meta: sincroniza los dos controles y escribe los badges.
function renderTargetGrade(plan){
  if(!targetGradeBox) return;
  const p = plan || computeEffortPlan(activeCourse);

  // No se pisa el control que el alumno está manipulando: se actualiza el otro.
  if(targetGradeInput && document.activeElement !== targetGradeInput){
    targetGradeInput.value = p.target.toFixed(1);
  }
  if(targetGradeRange && document.activeElement !== targetGradeRange){
    targetGradeRange.value = String(p.target);
  }

  const et = EXAM_TYPES[examKeyForWeight(p.weightPct)];
  const weightNote = examWeightNote(activeCourse);

  // El campo de la ponderación es parte de esta caja: se refresca con ella para
  // que las píldoras, el número y los badges nunca cuenten cosas distintas.
  renderExamWeight();

  // Con clases hechas los badges pasan a hablar de lo que queda: es el número
  // que el alumno necesita para decidir cuánto le falta, no el bruto inicial.
  const usado = p.hasTopics && p.hoursSpent > 0;

  if(targetHoursBadge){
    targetHoursBadge.textContent = usado
      ? `⏱️ Horas restantes: ${formatHoursLeft(p.hoursRemaining)} de ${formatHoursLabel(p.hoursTotal)}`
      : `⏱️ Horas totales sugeridas: ${p.hasTopics ? formatHoursLabel(p.hoursTotal) : '—'}`;
    targetHoursBadge.title = p.hasTopics
      ? `Lo que pide llegar a un ${formatGrade(p.target)} en una evaluación que pesa ${
          formatPct(p.weightPct)}% de la nota, repartido entre ${
          p.topicCount} tema${p.topicCount === 1 ? '' : 's'} según su brecha y su relevancia` +
        (usado ? `. Ya descontaste ${formatHoursLabel(p.hoursSpent)} en clases guiadas completadas.` : '.')
      : 'Genera el plan con Claude IA para calcular el presupuesto de horas de este ramo.';
  }
  if(targetExBadge){
    targetExBadge.textContent = usado
      ? `📝 Ejercicios restantes: ${p.exercisesRemaining} de ${p.exercisesTotal}`
      : `📝 Ejercicios meta: ${p.hasTopics ? `${p.exercisesTotal} ejercicios` : '—'}`;
    targetExBadge.title = p.hasTopics
      ? 'Repartidos entre los temas según su urgencia y su tipo (los cuantitativos piden más ejercicios por hora).'
      : 'Genera el plan con Claude IA para repartir los ejercicios tema por tema.';
  }
  if(targetSessionsBadge){
    targetSessionsBadge.hidden = !p.hasTopics;
    if(p.hasTopics){
      targetSessionsBadge.textContent = `🎓 Programa: ${p.sessionsDone} de ${p.sessionsTotal} clase${
        p.sessionsTotal === 1 ? '' : 's'} guiada${p.sessionsTotal === 1 ? '' : 's'}`;
      targetSessionsBadge.title = `Las horas del plan repartidas en bloques de ${
        SESSION_BLOCK_MIN_MINUTES} a ${SESSION_BLOCK_MAX_MINUTES} minutos, tema por tema. ` +
        'Cada clase guiada que completas descuenta su tiempo del presupuesto.';
    }
  }

  if(!targetGradeNote) return;
  const bits = [];

  // Sin temario analizado no hay brecha ni presupuesto que explicar: la nota
  // solo dice de qué depende el cálculo y cómo desbloquearlo.
  if(!p.hasTopics){
    targetGradeNote.innerHTML = `El presupuesto de estudio se calcula con tres cosas: tu
      <b>nota meta</b>, la <b>ponderación de la evaluación</b> (${escapeHtml(et.label.toLowerCase())},
      ${escapeHtml(weightNote)}) y la <b>brecha de cada tema</b> que Claude IA detecte en tu temario.
      Genera el plan más abajo y estas horas y ejercicios aparecen repartidos tema por tema.`;
    return;
  }

  if(p.measured){
    bits.push(p.alreadyThere
      ? `Con un <b>${p.currentPct}%</b> de preparación ya estás en torno a un <b>${formatGrade(p.currentGrade)}</b>,
         o sea sobre tu meta: lo que queda es mantención para no perder terreno.`
      : `Vas en <b>${p.currentPct}%</b> de preparación (≈ <b>${formatGrade(p.currentGrade)}</b>) y apuntas a un
         <b>${formatGrade(p.target)}</b>: la brecha es de <b>${Math.round(p.globalGap * 100)} puntos</b>.`);
  } else {
    bits.push(`Todavía no haces el mini test, así que cada tema cuenta como duda: es el supuesto conservador
      (los de relevancia alta entran como urgentes y el resto como refuerzo). Hazlo y este presupuesto se
      ajusta a lo que de verdad te falta, que casi siempre es menos.`);
  }

  bits.push(`Cerrar esa brecha en ${escapeHtml(et.label.toLowerCase())} (${escapeHtml(weightNote)}) pide
    <b>${formatHoursLabel(p.hoursTotal)}</b> de estudio efectivo y <b>${p.exercisesTotal} ejercicios</b>,
    repartidos entre ${p.topicCount} tema${p.topicCount === 1 ? '' : 's'} según su urgencia.
    Sube o baja la nota meta —o la ponderación— y el presupuesto se recalcula al instante.`);

  bits.push(`Esas horas se estudian en <b>${p.sessionsTotal} clase${p.sessionsTotal === 1 ? '' : 's'}
    guiada${p.sessionsTotal === 1 ? '' : 's'}</b> de ${SESSION_BLOCK_MIN_MINUTES} a ${SESSION_BLOCK_MAX_MINUTES}
    minutos —cada tema trae su propio programa, con los ejercicios subiendo de nivel sesión a sesión—.` +
    (p.hoursSpent > 0
      ? ` Llevas <b>${p.sessionsDone}</b> completada${p.sessionsDone === 1 ? '' : 's'}, o sea
          <b>${formatHoursLabel(p.hoursSpent)}</b> ya descontadas: quedan
          <b>${formatHoursLeft(p.hoursRemaining)}</b>.`
      : ' Cada clase que completas descuenta su tiempo del presupuesto.'));

  targetGradeNote.innerHTML = bits.join(' ');
}

/* -------------------------------------------------------------------------
   8. EVALUACIONES PASADAS: archivos, análisis y controles
   ------------------------------------------------------------------------- */
function extToKind(ext){
  if(ext === 'pdf') return 'pdf';
  if(['jpg','jpeg','png'].includes(ext)) return 'img';
  return 'txt';
}

function humanSize(bytes){
  if(!bytes) return '';
  if(bytes < 1024) return bytes + ' B';
  if(bytes < 1024*1024) return Math.round(bytes/1024) + ' KB';
  return (bytes/(1024*1024)).toFixed(1) + ' MB';
}

function renderFileList(){
  const rec = pastEvalsData[activeCourse];
  const fileSources = (rec && rec.sources) ? rec.sources.filter(s => s.kind === 'file') : [];
  fileListEl.innerHTML = fileSources.map(s => {
    const kind = extToKind(s.ext);
    const sizeStr = humanSize(s.size);
    const parts = [`${(s.questions||[]).length} preguntas`];
    if(sizeStr) parts.push(sizeStr);
    if(s.skipped) parts.push(`${s.skipped} pág. extra descartada${s.skipped===1?'':'s'}`);
    return `
      <div class="file-chip ${kind}">
        <span class="file-icon">${escapeHtml(s.ext)}</span>
        <div class="file-meta">
          <div class="file-name">${escapeHtml(s.name)}</div>
          <div class="file-sub">${parts.join(' · ')}</div>
        </div>
        <button class="file-remove" data-id="${s.id}" title="Quitar este archivo">×</button>
      </div>
    `;
  }).join('');

  fileListEl.querySelectorAll('.file-remove').forEach(btn => {
    btn.onclick = () => removeSource(btn.getAttribute('data-id'));
  });
}

function removeSource(sourceId){
  const rec = getRecord(activeCourse);
  rec.sources = rec.sources.filter(s => s.id !== sourceId);
  rec.updatedAt = Date.now();
  if(sessionFiles[activeCourse]) delete sessionFiles[activeCourse][sourceId];
  savePastEvals();
  renderEvalSection();
  renderPlanner();
}

// Etiqueta del único botón de análisis. Cambia según si el ramo ya tiene un
// análisis de Claude y si quedó obsoleto tras subir archivos nuevos.
function aiAnalyzeLabel(course){
  const ai = getAiAnalysis(course);
  if(!ai) return 'Generar el Plan de Estudio';
  return aiIsStale(course) ? 'Actualizar el Plan de Estudio' : 'Regenerar el Plan de Estudio';
}

// Texto que acompaña a los archivos recién cargados: siempre apunta al mismo
// botón, con el verbo que corresponde según haya o no un análisis previo.
function filesLoadedHint(course){
  const verb = getAiAnalysis(course) ? 'actualizar' : 'generar';
  return `Archivos cargados — presiona “${aiAnalyzeLabel(course)}” para ${verb} tu plan`;
}

function renderEvalSection(){
  evalCourseLabel.textContent = activeCourse;
  renderFileList();
  // El botón de análisis aparece solo cuando hay suficientes datos cargados.
  const enough = getAllQuestions(activeCourse).length >= 3;
  analyzeActions.style.display = enough ? '' : 'none';

  aiAnalyzeBtn.textContent = aiAnalyzeLabel(activeCourse);
}

// Procesa varios archivos subidos a la vez.
async function handleFiles(fileList){
  const files = Array.from(fileList);
  if(files.length === 0) return;
  const rec = getRecord(activeCourse);
  if(!sessionFiles[activeCourse]) sessionFiles[activeCourse] = {};

  let added = 0, failed = 0;
  for(let idx = 0; idx < files.length; idx++){
    const file = files[idx];
    const ext = file.name.split('.').pop().toLowerCase();
    fileStatusEl.textContent = `Procesando ${idx+1} de ${files.length}: "${file.name}"...`;
    try{
      let rawText = '';
      if(ext === 'txt'){
        rawText = await file.text();
      } else if(ext === 'pdf'){
        rawText = await extractPdfText(file);
      } else if(['jpg','jpeg','png'].includes(ext)){
        rawText = await extractImageText(file);
      } else {
        failed++; continue;
      }

      const { questions, skipped } = textToQuestions(rawText);
      if(questions.length === 0){ failed++; continue; }

      const id = newId();
      rec.sources.push({
        id, name: file.name, ext, size: file.size, kind: 'file',
        questions, skipped, addedAt: Date.now()
      });
      sessionFiles[activeCourse][id] = file;   // conserva el archivo original (su formato)
      added++;
    }catch(err){
      failed++;
    }
  }

  rec.updatedAt = Date.now();
  savePastEvals();
  renderEvalSection();
  renderPlanner();
  renderPlanState();

  const msgs = [];
  if(added) msgs.push(filesLoadedHint(activeCourse));
  if(failed) msgs.push(`${failed} sin texto útil o formato no soportado`);
  fileStatusEl.textContent = msgs.join(' · ') || 'No se pudo procesar ningún archivo.';
}

/* -------------------------------------------------------------------------
   8B. MINI TEST DE DIAGNÓSTICO EXPRÉS

   Se responde en un modal, una pregunta a la vez, antes de mostrar el plan por
   temas. Al terminar, la matriz de dominio (relevancia × resultado) asigna el
   nivel inicial de cada tema, que el alumno puede ajustar después a mano.
   ------------------------------------------------------------------------- */

// Tarjetas desplegadas (por id de tema). Vive en memoria: al re-renderizar el
// panel, las tarjetas abiertas siguen abiertas.
const openTopics = new Set();

// { course, list, index, answers } mientras el modal está abierto.
let testState = null;

function answeredCount(course){
  const ai = getAiAnalysis(course);
  const d = getDiagnostic(course);
  if(!ai || !d) return 0;
  return ai.topics.filter(t => t.diagnosticQuestion && Number.isInteger(d.answers[t.id])).length;
}

function questionCount(course){
  const ai = getAiAnalysis(course);
  return ai ? ai.topics.filter(t => t.diagnosticQuestion).length : 0;
}

/* --- Modal del test -------------------------------------------------------- */

// Diez modales comparten el bloqueo del scroll del fondo (selección de carrera,
// test, práctica, flashcards, peras y manzanas, chat de dudas, clase guiada,
// simulacro, ficha imprimible y guía de estudio). Cerrar uno solo lo suelta si
// no queda ningún otro abierto.
function releaseModalLock(){
  if(testState || practiceState || flashcardsState || feynmanState ||
     topicChatState || studySessionState || examState || sheetState ||
     guideState || careerSelectorOpen) return;
  document.body.classList.remove('modal-open');
}

function openDiagnosticTest(course){
  const ai = getAiAnalysis(course);
  if(!ai || !hasDiagnosticQuestions(ai)) return;
  const d = getDiagnostic(course);
  testState = {
    course,
    list: ai.topics.filter(t => t.diagnosticQuestion),
    index: 0,
    // Se parte desde lo ya respondido: así "retomar" y "repetir" reutilizan el
    // mismo flujo sin perder lo anterior.
    answers: { ...d.answers }
  };
  // Arranca en la primera pregunta sin responder.
  const firstPending = testState.list.findIndex(t => !Number.isInteger(testState.answers[t.id]));
  testState.index = firstPending === -1 ? 0 : firstPending;

  testOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onTestKeydown);
  renderTest();
}

function closeDiagnosticTest(){
  if(!testState) return;
  // Se guarda lo respondido hasta aquí, pero el diagnóstico no se marca como
  // completado: los niveles solo se calculan al presionar "Ver mi plan".
  const d = getDiagnostic(testState.course);
  if(d){
    d.answers = { ...d.answers, ...testState.answers };
    savePastEvals();
  }
  testState = null;
  testOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onTestKeydown);
  renderDiagnostic();
}

function onTestKeydown(ev){
  if(!testState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeDiagnosticTest(); return; }
  // Atajos 1..9 para responder sin soltar el teclado.
  const n = Number(ev.key);
  if(!Number.isInteger(n) || n < 1) return;
  const topic = testState.list[testState.index];
  if(!topic) return;
  const option = testDialogEl.querySelector(`.test-option[data-index="${n - 1}"]`);
  if(option){ ev.preventDefault(); option.click(); }
}

function renderTest(){
  if(!testState) return;
  const total = testState.list.length;
  const done = testState.index >= total;
  const answered = testState.list.filter(t => Number.isInteger(testState.answers[t.id])).length;
  const pct = Math.round((done ? total : testState.index) / total * 100);

  const head = `
    <div class="test-head">
      <div class="test-head-row">
        <p class="test-eyebrow">Mini test de diagnóstico exprés</p>
        <button type="button" class="test-close" data-action="close"
                aria-label="Cerrar el test y volver">×</button>
      </div>
      <div class="test-progress"><div class="test-progress-fill" style="width:${pct}%"></div></div>
      <p class="test-counter">${done ? `${total} de ${total} preguntas` : `Pregunta ${testState.index + 1} de ${total}`}</p>
    </div>
  `;

  if(done){
    testDialogEl.innerHTML = `
      ${head}
      <div class="test-body">
        <h2 class="test-question" id="test-title">Listo</h2>
        <p class="test-hint">
          Respondiste ${answered} de ${total} preguntas. Con eso calculo el nivel inicial de cada
          tema${answered < total ? ' (las que dejaste sin responder cuentan como duda)' : ''} y armo tu plan.
        </p>
      </div>
      <div class="test-foot">
        <button type="button" class="ghost-btn" data-action="review">Revisar respuestas</button>
        <button type="button" class="primary-btn" data-action="finish">Ver mi plan de estudio</button>
      </div>
    `;
    const finishBtn = testDialogEl.querySelector('[data-action="finish"]');
    if(finishBtn) finishBtn.focus();
    return;
  }

  const topic = testState.list[testState.index];
  const q = topic.diagnosticQuestion;
  const selected = testState.answers[topic.id];

  testDialogEl.innerHTML = `
    ${head}
    <div class="test-body">
      <p class="test-topic">${escapeHtml(topic.name)} · ${escapeHtml(topic.type)}</p>
      <h2 class="test-question" id="test-title">${escapeHtml(q.question)}</h2>
      <div class="test-options">
        ${q.options.map((opt, i) => `
          <button type="button" class="test-option${selected === i ? ' selected' : ''}"
                  data-action="answer" data-index="${i}">
            <span class="test-key">${i + 1}</span>
            <span class="test-option-text">${escapeHtml(opt)}</span>
          </button>
        `).join('')}
      </div>
      <p class="test-hint">Responde de memoria y sin pensarlo mucho: si dudas, marca la última opción — es
      información útil, no un error.</p>
    </div>
    <div class="test-foot">
      ${testState.index > 0
        ? '<button type="button" class="ghost-btn" data-action="prev">← Anterior</button>'
        : '<span></span>'}
      ${Number.isInteger(selected)
        ? '<button type="button" class="ghost-btn" data-action="next">Siguiente →</button>'
        : ''}
    </div>
  `;

  const first = testDialogEl.querySelector('.test-option');
  if(first) first.focus();
}

function finishDiagnosticTest(){
  if(!testState) return;
  const course = testState.course;
  const d = getDiagnostic(course);
  d.answers = { ...d.answers, ...testState.answers };
  applyDiagnosticLevels(course);
  savePastEvals();

  testState = null;
  testOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onTestKeydown);

  planUsesEvals = true;
  saveSession();
  renderDiagnostic();
  renderPlanner();
  renderEvalSection();
  renderPlanState();
  if(diagnosticOutputEl) diagnosticOutputEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Los guardas cubren el caso de un index.html cacheado sin el modal: sin ellos
// un error aquí tumbaría la app entera durante el despliegue.
if(testDialogEl) testDialogEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn || !testState) return;
  switch(btn.getAttribute('data-action')){
    case 'close':  closeDiagnosticTest(); break;
    case 'prev':   testState.index = Math.max(0, testState.index - 1); renderTest(); break;
    case 'next':   testState.index += 1; renderTest(); break;
    case 'review': testState.index = 0; renderTest(); break;
    case 'finish': finishDiagnosticTest(); break;
    case 'answer': {
      const topic = testState.list[testState.index];
      testState.answers[topic.id] = Number(btn.getAttribute('data-index'));
      testState.index += 1;      // avanza sola; "← Anterior" permite corregir
      renderTest();
      break;
    }
  }
});

/* --- Panel de temas con semáforo ------------------------------------------- */

// Línea de píldoras del programa: una por sesión (🟢 completada, 🔵 la que toca,
// ⚪ pendiente). Con programas largos se muestran las primeras y el resto se
// resume en un "+n": una fila de quince círculos no dice más que una de diez.
const MAX_SESSION_PILLS = 10;

function sessionPillsHtml(total, done, currentIndex, currentLabel){
  const shown = Math.min(total, MAX_SESSION_PILLS);
  const pills = [];
  for(let i = 1; i <= shown; i++){
    const state = i <= done ? 'done' : (i === currentIndex ? 'current' : 'pending');
    const icon  = state === 'done' ? '🟢' : state === 'current' ? '🔵' : '⚪';
    const label = state === 'done' ? 'completada'
                : state === 'current' ? (currentLabel || 'en curso')
                : 'pendiente';
    pills.push(`<span class="session-pill is-${state}" title="Sesión ${i}: ${label}">
      <span class="session-pill-dot" aria-hidden="true">${icon}</span>
      <span class="session-pill-num">${i}</span></span>`);
  }
  if(total > shown) pills.push(`<span class="session-pill is-more" title="${
    total - shown} sesiones más">+${total - shown}</span>`);
  return `<span class="session-pills" role="img"
    aria-label="Programa de estudio: ${done} de ${total} sesiones completadas">${pills.join('')}</span>`;
}

// Texto y píldoras del programa de un tema, para la tarjeta del planificador.
function topicProgramHtml(program){
  if(!program) return '';
  const label = program.complete
    ? `🎓 Programa completo: ${program.total} ${plural(program.total, 'sesión', 'sesiones')} de ${program.minutes} min`
    : `🎓 Programa: sesión ${program.nextIndex} de ${program.total} · bloques de ${program.minutes} min`;
  return `<span class="topic-program">
      <span class="topic-program-label">${label}</span>
      ${sessionPillsHtml(program.total, program.done, program.complete ? 0 : program.nextIndex, 'la que sigue')}
    </span>`;
}

function renderTopicCard(course, topic, plan){
  const level = topicLevel(course, topic);
  const d = getDiagnostic(course);
  const answer = d ? d.answers[topic.id] : undefined;
  const q = topic.diagnosticQuestion;
  const isOpen = openTopics.has(topic.id);
  const checked = (d && Array.isArray(d.steps[topic.id])) ? d.steps[topic.id] : [];
  const steps = topicSteps(course, topic);
  const practiced = isPracticed(course, topic.id);
  const score = practiced ? practicedScore(course, topic.id) : '';

  let answerHtml = '';
  if(q && Number.isInteger(answer)){
    const ok = isAnswerCorrect(topic, answer);
    answerHtml = `
      <p class="topic-answer ${ok ? 'ok' : 'ko'}">
        <b>${escapeHtml(q.question)}</b><br>
        Respondiste “${escapeHtml(q.options[answer] || '—')}”${
          ok ? ' — correcto.' : `. La respuesta correcta era “${escapeHtml(q.options[q.correctIndex])}”.`}
      </p>`;
  } else if(q){
    answerHtml = `<p class="topic-answer ko"><b>${escapeHtml(q.question)}</b><br>
      No respondiste esta pregunta, así que el tema cuenta como duda.</p>`;
  }

  // Presupuesto de esfuerzo del tema: se muestra con la tarjeta cerrada, porque
  // es lo que el alumno necesita para decidir por dónde partir hoy.
  const effortPlan = plan || computeEffortPlan(course);
  const effort = topicEffort(effortPlan, topic.id);
  const program = topicProgram(course, topic.id, effortPlan);
  const effortHtml = effort ? `
    <span class="topic-effort">
      <span class="effort-chip is-hours" title="${effort.spentHours > 0
        ? `Te quedan ${formatHoursLeft(effort.remainingHours)} de las ${formatHoursLabel(effort.hours)} que te asigna tu nota meta: ya trabajaste ${formatHoursLabel(effort.spentHours)} en clases guiadas.`
        : 'Horas de estudio que te asigna tu nota meta para este tema.'}">⏱️ ${
        effort.spentHours > 0
          ? `${formatHoursLeft(effort.remainingHours)} restantes de ${formatHoursLabel(effort.hours)}`
          : `${formatHoursLabel(effort.hours)} de repaso`}</span>
      <span class="effort-chip is-ex" title="Ejercicios o preguntas de práctica sugeridos para este tema (${
        escapeHtml(topic.type.toLowerCase())}).">📝 ${
        effort.spentHours > 0
          ? `${effort.remainingExercises} ejercicios restantes`
          : `${effort.exercises} ejercicios meta`}</span>
    </span>
    ${topicProgramHtml(program)}` : '';

  const stepsHtml = topic.studySteps.length
    ? `<ul class="step-list">${topic.studySteps.map((step, i) => `
        <li>
          <label class="step-item${checked[i] ? ' done' : ''}">
            <input type="checkbox" data-step-topic="${escapeHtml(topic.id)}" data-step-index="${i}"
                   ${checked[i] ? 'checked' : ''}>
            <span>${escapeHtml(step)}</span>
          </label>
        </li>`).join('')}</ul>`
    : '<p class="empty-note">Este tema no trae pasos sugeridos.</p>';

  return `
    <article class="topic-card lvl-${level}" data-topic="${escapeHtml(topic.id)}">
      <button type="button" class="topic-head" data-toggle="${escapeHtml(topic.id)}"
              aria-expanded="${isOpen}">
        <span class="topic-dot" aria-hidden="true">${LEVELS[level].dot}</span>
        <span class="topic-main">
          <span class="topic-name">${escapeHtml(topic.name)}${practiced
            ? ` <span class="topic-badge" title="Resolviste la práctica de este tema${
                score ? ` — ${escapeHtml(score)} correctas en el mini quiz` : ''}">Practicado ✓</span>`
            : ''}</span>
          <span class="topic-meta">
            <span class="topic-level">${escapeHtml(levelLabel(level, topic.relevance))}</span>
            <span class="topic-sep">·</span>
            <span class="topic-type">${escapeHtml(topic.type)}</span>
            <span class="topic-sep">·</span>
            <span>Relevancia ${escapeHtml(topic.relevance.toLowerCase())}</span>
            ${steps.total ? `
              <span class="topic-sep">·</span>
              <span class="topic-steps-count${steps.done === steps.total ? ' full' : ''}">${
                steps.done}/${steps.total} pasos</span>` : ''}
          </span>
          ${effortHtml}
        </span>
        <span class="topic-caret" aria-hidden="true">${isOpen ? '▴' : '▾'}</span>
      </button>
      <div class="topic-body"${isOpen ? '' : ' hidden'}>
        <div class="topic-actions">
          <!-- La clase guiada es la acción más completa de la tarjeta (explica,
               hace practicar y evalúa), así que va primera y con el peso visual
               más alto. -->
          <button type="button" class="btn-session"
                  data-session="${escapeHtml(topic.id)}">▶️ Iniciar Clase Guiada${program
                    ? (program.complete
                        ? ' (repaso extra)'
                        : ` (sesión ${program.nextIndex} de ${program.total})`)
                    : ''}</button>
          <button type="button" class="btn-practice${level === 'bajo' ? ' soft' : ''}"
                  data-practice="${escapeHtml(topic.id)}">⚡ Practicar tema</button>
          <button type="button" class="btn-flashcards"
                  data-flashcards="${escapeHtml(topic.id)}">🎴 Flashcards</button>
          <button type="button" class="btn-feynman"
                  data-feynman="${escapeHtml(topic.id)}">💡 Peras y manzanas</button>
          <button type="button" class="btn-guide${hasStoredGuide(course, topic.id) ? ' has-guide' : ''}"
                  data-guide="${escapeHtml(topic.id)}"
                  title="${hasStoredGuide(course, topic.id)
                    ? 'Abre la guía que ya generaste para este tema, lista para imprimir o guardar como PDF.'
                    : 'Genera una guía imprimible con marco teórico, 10 ejercicios de nivel certamen y su pauta de solución.'}">${
                    hasStoredGuide(course, topic.id)
                      ? '📄 Ver mi guía (10 ejercicios)'
                      : '📄 Generar Guía (10 Ejercicios)'}</button>
          <button type="button" class="btn-topic-chat"
                  data-topic-chat="${escapeHtml(topic.id)}">💬 Preguntar sobre este tema</button>
          <span class="topic-actions-note">${level === 'bajo'
            ? 'La clase guiada es la sesión completa (teoría, ejercicio y cierre) y aquí te sirve de mantención. Si prefieres algo corto: un ejercicio, un repaso con flashcards, o la analogía para refrescar de qué se trataba. Y si te queda una duda suelta, pregúntala.'
            : 'La clase guiada es lo más parecido a sentarte con un profesor: te explica el tema, te hace resolver un ejercicio paso a paso y te evalúa al final —si respondes bien, el tema queda en verde. Si tienes menos tiempo: la práctica es el ejercicio solo, las flashcards el repaso corto, y “peras y manzanas” la analogía para partir de cero. Para una duda puntual, pregúntale directo.'}</span>
        </div>
        ${answerHtml}
        <div class="topic-level-row">
          <label class="topic-level-picker">
            <span>Ajustar nivel</span>
            <select data-level-topic="${escapeHtml(topic.id)}">
              <option value="alto"  ${level === 'alto'  ? 'selected' : ''}>🔴 Urgencia crítica</option>
              <option value="medio" ${level === 'medio' ? 'selected' : ''}>🟡 ${escapeHtml(levelLabel('medio', topic.relevance))}</option>
              <option value="bajo"  ${level === 'bajo'  ? 'selected' : ''}>🟢 Dominado</option>
            </select>
          </label>
          <!-- La salida del que dio una clase por pasada sin querer, o del que
               simplemente quiere cursar el tema de nuevo. Solo aparece cuando
               hay algo que reiniciar: con el programa en 0 no haría nada. -->
          ${program && program.done > 0 ? `
            <button type="button" class="topic-reset" data-reset="${escapeHtml(topic.id)}"
                    title="Devuelve el programa a la sesión 1 de ${program.total} y el tema al nivel que dijo el mini test.">
              ↺ Volver a cursar desde 0</button>` : ''}
        </div>
        <p class="topic-steps-title">Pasos sugeridos</p>
        ${stepsHtml}
      </div>
    </article>`;
}

// Segunda línea bajo la barra: lo que suma el trabajo hecho (pasos y práctica).
function readinessProgressText(course){
  const p = planProgress(course);
  const steps = p.stepsTotal
    ? `${p.stepsDone} de ${p.stepsTotal} paso${p.stepsTotal === 1 ? '' : 's'} marcado${p.stepsDone === 1 ? '' : 's'}`
    : 'este temario no trae pasos que marcar';
  // El adjetivo concuerda con "temas", no con la cuenta: "1 de 3 temas practicados".
  const practice = `${p.practiced} de ${p.topics} tema${p.topics === 1 ? '' : 's'} practicado${
    p.topics === 1 ? '' : 's'}`;
  return `Tu avance también cuenta: ${steps} · ${practice}. Cada casilla que marcas y cada práctica que
    resuelves suben la barra; para cerrarla del todo, repite el mini test o ajusta el nivel del tema.`;
}

// Marcar un paso no cambia el nivel ni el orden de las tarjetas, así que se
// repinta solo la barra: re-renderizar el panel entero perdería el foco de la
// casilla recién marcada y la posición del scroll.
function updateReadinessBar(){
  if(!diagnosticOutputEl) return;
  const fill  = diagnosticOutputEl.querySelector('.readiness-fill');
  const label = diagnosticOutputEl.querySelector('.readiness-pct');
  if(!fill || !label) return;
  const pct = readinessPct(activeCourse);
  fill.style.width = pct + '%';
  label.textContent = pct + '%';
  const track = diagnosticOutputEl.querySelector('.readiness-track');
  if(track) track.setAttribute('aria-label', `Preparación estimada: ${pct} por ciento`);
  const note = diagnosticOutputEl.querySelector('.readiness-progress');
  if(note) note.textContent = readinessProgressText(activeCourse);
  // Avanzar sobre un tema achica su brecha con la nota meta: su presupuesto de
  // horas y ejercicios baja, y el de los temas que siguen rojos sube.
  refreshEffortUI();
}

function renderDiagnostic(){
  // La barra del simulacro depende de los mismos temas que el panel, así que se
  // repintan juntas: separarlas dejaría el botón ofreciendo un plan que ya no está.
  renderExamLaunch();
  if(!diagnosticOutputEl) return;
  const ai = getAiAnalysis(activeCourse);

  if(!ai || !hasDiagnosticQuestions(ai)){
    diagnosticOutputEl.innerHTML = '';
    return;
  }

  const total = questionCount(activeCourse);

  // Todavía sin diagnóstico: se invita a hacer el test antes de mostrar el plan.
  if(!diagnosticIsDone(activeCourse)){
    const partial = answeredCount(activeCourse);
    diagnosticOutputEl.innerHTML = `
      <div class="diag-invite">
        <p class="diag-eyebrow">Paso previo al plan</p>
        <h3 class="diag-invite-title">Mini test de diagnóstico exprés</h3>
        <p class="diag-invite-text">
          ${total} pregunta${total === 1 ? '' : 's'} conceptual${total === 1 ? '' : 'es'} sobre los temas que
          Claude IA detectó en tus evaluaciones — unos ${Math.max(1, Math.round(total * 15 / 60))} minuto${
            Math.max(1, Math.round(total * 15 / 60)) === 1 ? '' : 's'}. Con tus respuestas priorizo los temas
          y armo el plan sobre lo que de verdad te falta.
        </p>
        <div class="eval-actions">
          <button type="button" class="primary-btn" data-action="start-test">
            ${partial > 0 ? `Retomar el mini test (${partial} de ${total} respondidas)` : 'Hacer el mini test'}
          </button>
        </div>
      </div>`;
    return;
  }

  const pct = readinessPct(activeCourse);
  const counts = { alto: 0, medio: 0, bajo: 0 };
  ai.topics.forEach(t => { counts[topicLevel(activeCourse, t)]++; });
  // Un solo cálculo del presupuesto para todas las tarjetas del panel.
  const effortPlan = computeEffortPlan(activeCourse);

  diagnosticOutputEl.innerHTML = `
    <div class="diag-block">
      <div class="readiness">
        <div class="readiness-head">
          <span class="readiness-label">Preparación estimada</span>
          <span class="readiness-pct">${pct}%</span>
        </div>
        <div class="readiness-track" role="img"
             aria-label="Preparación estimada: ${pct} por ciento">
          <div class="readiness-fill" style="width:${pct}%"></div>
        </div>
        <p class="readiness-note">
          Según el mini test, ponderando cada tema por su relevancia en la evaluación.
          ${counts.alto} urgente${counts.alto === 1 ? '' : 's'} ·
          ${counts.medio} en refuerzo ·
          ${counts.bajo} dominado${counts.bajo === 1 ? '' : 's'}.
          Si ajustas el nivel de un tema, el porcentaje se recalcula.
        </p>
        <p class="readiness-progress">${readinessProgressText(activeCourse)}</p>
        <div class="eval-actions">
          <button type="button" class="ghost-btn small" data-action="start-test">Repetir el mini test</button>
        </div>
      </div>

      <p class="analysis-title">Temas por prioridad</p>
      <p class="effort-summary">${effortSummaryHtml(effortPlan)}</p>
      <div class="topic-cards">
        ${topicsByUrgency(activeCourse).map(t => renderTopicCard(activeCourse, t, effortPlan)).join('')}
      </div>
    </div>`;
}

// Repinta en caliente los badges de la caja y los chips de cada tarjeta. Se usa
// cuando el presupuesto cambia pero el panel no debería re-renderizarse entero
// (marcar un paso, mover la nota meta): un re-render perdería el foco del
// control que el alumno está usando y la posición del scroll.
function refreshEffortUI(){
  const plan = computeEffortPlan(activeCourse);
  renderTargetGrade(plan);
  if(!diagnosticOutputEl) return;
  const summary = diagnosticOutputEl.querySelector('.effort-summary');
  if(summary) summary.innerHTML = effortSummaryHtml(plan);
  diagnosticOutputEl.querySelectorAll('.topic-card[data-topic]').forEach(card => {
    const id = card.getAttribute('data-topic');
    const e = topicEffort(plan, id);
    if(!e) return;
    const hoursChip = card.querySelector('.effort-chip.is-hours');
    const exChip = card.querySelector('.effort-chip.is-ex');
    if(hoursChip) hoursChip.textContent = `⏱️ ${e.spentHours > 0
      ? `${formatHoursLeft(e.remainingHours)} restantes de ${formatHoursLabel(e.hours)}`
      : `${formatHoursLabel(e.hours)} de repaso`}`;
    if(exChip) exChip.textContent = `📝 ${e.spentHours > 0
      ? `${e.remainingExercises} ejercicios restantes`
      : `${e.exercises} ejercicios meta`}`;
    // El programa se mueve con las horas mientras no haya empezado (mover la nota
    // meta puede cambiar cuántas sesiones son), así que se repinta con los chips.
    const programEl = card.querySelector('.topic-program');
    if(programEl){
      // Se reemplaza el nodo entero por uno con la misma clase: la próxima
      // pasada lo vuelve a encontrar igual.
      programEl.outerHTML = topicProgramHtml(topicProgram(activeCourse, id, plan));
    }
  });
}

// Un solo listener para todo el panel: se re-renderiza entero cada vez que
// cambia un nivel, así que enganchar los controles uno a uno se perdería.
if(diagnosticOutputEl) diagnosticOutputEl.addEventListener('click', ev => {
  const start = ev.target.closest('[data-action="start-test"]');
  if(start){ openDiagnosticTest(activeCourse); return; }

  // Van antes del toggle: los botones viven dentro de la tarjeta, y desplegarla
  // además de abrir el modal dejaría la tarjeta cerrada al volver.
  const session = ev.target.closest('[data-session]');
  if(session){ openStudySession(activeCourse, session.getAttribute('data-session')); return; }

  const practice = ev.target.closest('[data-practice]');
  if(practice){ openPractice(activeCourse, practice.getAttribute('data-practice')); return; }

  const flashcards = ev.target.closest('[data-flashcards]');
  if(flashcards){ openFlashcards(activeCourse, flashcards.getAttribute('data-flashcards')); return; }

  const feynman = ev.target.closest('[data-feynman]');
  if(feynman){ openFeynman(activeCourse, feynman.getAttribute('data-feynman')); return; }

  const guide = ev.target.closest('[data-guide]');
  if(guide){ openStudyGuide(activeCourse, guide.getAttribute('data-guide')); return; }

  const chat = ev.target.closest('[data-topic-chat]');
  if(chat){ openTopicChat(activeCourse, chat.getAttribute('data-topic-chat')); return; }

  const reset = ev.target.closest('[data-reset]');
  if(reset){ resetTopicFromCard(reset.getAttribute('data-reset')); return; }

  const head = ev.target.closest('[data-toggle]');
  if(head){
    const id = head.getAttribute('data-toggle');
    if(openTopics.has(id)) openTopics.delete(id); else openTopics.add(id);
    const card = head.closest('.topic-card');
    const body = card && card.querySelector('.topic-body');
    const caret = head.querySelector('.topic-caret');
    const isOpen = openTopics.has(id);
    if(body) body.hidden = !isOpen;
    if(caret) caret.textContent = isOpen ? '▴' : '▾';
    head.setAttribute('aria-expanded', String(isOpen));
    saveSession();   // al recargar, las tarjetas abiertas siguen abiertas
  }
});

if(diagnosticOutputEl) diagnosticOutputEl.addEventListener('change', ev => {
  const select = ev.target.closest('[data-level-topic]');
  if(select){
    const d = getDiagnostic(activeCourse);
    if(!d) return;
    d.levels[select.getAttribute('data-level-topic')] = select.value;
    savePastEvals();
    renderDiagnostic();   // el % y el orden de las tarjetas dependen del nivel
    renderPlanner();
    return;
  }

  const check = ev.target.closest('[data-step-topic]');
  if(check){
    const d = getDiagnostic(activeCourse);
    if(!d) return;
    const id = check.getAttribute('data-step-topic');
    const i = Number(check.getAttribute('data-step-index'));
    if(!Array.isArray(d.steps[id])) d.steps[id] = [];
    d.steps[id][i] = check.checked;
    savePastEvals();

    const label = check.closest('.step-item');
    if(label) label.classList.toggle('done', check.checked);

    // El avance del checklist pondera en la preparación estimada: se repinta la
    // barra y el contador de pasos de la tarjeta, sin rehacer el panel entero.
    updateReadinessBar();
    const ai = getAiAnalysis(activeCourse);
    const topic = ai ? ai.topics.find(t => t.id === id) : null;
    const card = check.closest('.topic-card');
    const counter = card ? card.querySelector('.topic-steps-count') : null;
    if(topic && counter){
      const s = topicSteps(activeCourse, topic);
      counter.textContent = `${s.done}/${s.total} pasos`;
      counter.classList.toggle('full', s.done === s.total);
    }
    renderPlanState();
  }
});

/* -------------------------------------------------------------------------
   8B. PRÁCTICA POR TEMA (caso práctico + mini quiz)

   Desde cada tarjeta semaforizada se pide al Worker material de práctica de UN
   solo tema (`specificTopic` + `topicRelevance`). El resultado se muestra en un
   modal: el caso práctico con su solución desplegable y un mini quiz que se
   corrige alternativa por alternativa.
   ------------------------------------------------------------------------- */

const PRACTICE_TIMEOUT_MS = 60000;   // más que el análisis: el caso es más largo
const MAX_PRACTICE_QUIZ = 3;

// { course, topicId, name, relevance, status, data, answers, solutionOpen, error, controller }
let practiceState = null;

// Material ya generado en esta sesión, por ramo+tema: reabrir la tarjeta no
// vuelve a gastar una llamada. Vive en memoria a propósito (no en localStorage):
// son textos largos y se regeneran a voluntad con "Generar otro ejercicio".
const practiceCache = new Map();
const practiceKey = (course, topicId) => `${course}::${topicId}`;

function clearPracticeCache(course){
  [...practiceCache.keys()].forEach(k => {
    if(k.startsWith(`${course}::`)) practiceCache.delete(k);
  });
}

// Espejo del saneado del Worker: si algún día responde algo raro, la interfaz
// descarta lo inservible en vez de romperse.
function normalizePracticeQuizItem(raw){
  if(!raw || typeof raw !== 'object') return null;
  const pregunta = String(raw.pregunta || '').trim();
  const alternativas = Array.isArray(raw.alternativas)
    ? raw.alternativas.map(a => String(a).trim()).filter(Boolean)
    : [];
  const correctIndex = Number(raw.correctIndex);
  if(!pregunta || alternativas.length < 2) return null;
  if(!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= alternativas.length) return null;
  return { pregunta, alternativas, correctIndex, explicacion: String(raw.explicacion || '').trim() };
}

function normalizePracticeResult(raw){
  const root = raw && typeof raw.practicaCompleta === 'object' ? raw.practicaCompleta : null;
  const caso = root && typeof root.casoPractico === 'object' ? root.casoPractico : null;
  const enunciado = String((caso && caso.enunciado) || '').trim();
  const solucionPasoAPaso = String((caso && caso.solucionPasoAPaso) || '').trim();
  if(!enunciado){
    throw new Error('El ejercicio llegó incompleto. Inténtalo de nuevo.');
  }
  return {
    casoPractico: {
      titulo: String((caso && caso.titulo) || '').trim() || 'Caso práctico',
      enunciado,
      solucionPasoAPaso
    },
    miniQuiz: (Array.isArray(root.miniQuiz) ? root.miniQuiz : [])
      .map(normalizePracticeQuizItem)
      .filter(Boolean)
      .slice(0, MAX_PRACTICE_QUIZ)
  };
}

// Pide el material al Worker. `signal` permite cancelar si se cierra el modal.
async function requestPractice(course, topic, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El servicio de práctica todavía no está configurado en este sitio.');
  }

  const payload = {
    specificTopic: topic.name,
    topicRelevance: topic.relevance,
    // Contexto opcional: el Worker lo usa para ajustar el tono del ejercicio.
    curso: courseForAi(course),
    tipoEvaluacion: examTypeForAi(course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PRACTICE_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'El ejercicio tardó demasiado en generarse. Inténtalo de nuevo.'
      : 'No se pudo conectar con el servicio de práctica. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));
  if(!data) throw new Error('El servicio de práctica devolvió una respuesta vacía. Inténtalo de nuevo.');
  return normalizePracticeResult(data);
}

/* --- Modal de práctica ----------------------------------------------------- */

function openPractice(course, topicId, { regenerate = false } = {}){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !practiceOverlayEl) return;

  if(practiceState && practiceState.controller) practiceState.controller.abort();

  const cached = regenerate ? null : practiceCache.get(practiceKey(course, topicId));
  practiceState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    level: topicLevel(course, topic),
    status: cached ? 'ready' : 'loading',
    data: cached || null,
    answers: {},
    solutionOpen: false,
    error: '',
    controller: cached ? null : new AbortController()
  };

  practiceOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPracticeKeydown);
  renderPractice();

  if(cached) return;

  const state = practiceState;
  requestPractice(course, topic, state.controller.signal)
    .then(data => {
      if(practiceState !== state) return;               // se cerró o se pidió otro tema
      practiceCache.set(practiceKey(course, topicId), data);
      state.status = 'ready';
      state.data = data;
      state.controller = null;
      renderPractice();
    })
    .catch(err => {
      if(practiceState !== state || state.controller.signal.aborted) return;
      state.status = 'error';
      state.error = err.message || 'No se pudo generar la práctica de este tema.';
      state.controller = null;
      renderPractice();
    });
}

function closePractice(){
  if(!practiceState) return;
  if(practiceState.controller) practiceState.controller.abort();
  practiceState = null;
  practiceOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onPracticeKeydown);
}

function onPracticeKeydown(ev){
  if(!practiceState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closePractice(); }
}

function renderPracticeQuizItem(item, qi, answer){
  const answered = Number.isInteger(answer);
  const ok = answered && answer === item.correctIndex;
  return `
    <li class="quiz-item" data-quiz-item="${qi}">
      <p class="quiz-question"><span class="quiz-num">${qi + 1}</span>${escapeHtml(item.pregunta)}</p>
      <div class="quiz-options">
        ${item.alternativas.map((alt, i) => {
          const classes = ['quiz-option'];
          if(answered && i === item.correctIndex) classes.push('correct');
          if(answered && i === answer && !ok) classes.push('wrong');
          if(answered && i !== item.correctIndex && i !== answer) classes.push('muted');
          return `
            <button type="button" class="${classes.join(' ')}" data-quiz="${qi}" data-option="${i}"
                    ${answered ? 'disabled' : ''}>
              <span class="quiz-mark" aria-hidden="true">${
                answered && i === item.correctIndex ? '✓' : (answered && i === answer ? '✕' : '')}</span>
              <span class="quiz-option-text">${escapeHtml(alt)}</span>
            </button>`;
        }).join('')}
      </div>
      <div class="quiz-explain ${ok ? 'ok' : 'ko'}"${answered ? '' : ' hidden'}>
        <p class="quiz-verdict">${answered && ok ? 'Correcto' : 'Incorrecto'}${
          answered && !ok ? ` — la respuesta es “${escapeHtml(item.alternativas[item.correctIndex])}”.` : '.'}</p>
        ${item.explicacion ? `<p class="quiz-why">${escapeHtml(item.explicacion)}</p>` : ''}
      </div>
    </li>`;
}

function renderPractice(){
  if(!practiceState || !practiceBodyEl) return;
  const s = practiceState;

  practiceTitleEl.textContent = s.name;
  practiceSubtitleEl.textContent =
    `Relevancia ${s.relevance.toLowerCase()} · ${levelLabel(s.level, s.relevance)}`;
  practiceModalEl.classList.remove('lvl-alto', 'lvl-medio', 'lvl-bajo');
  practiceModalEl.classList.add(`lvl-${s.level}`);

  if(s.status === 'loading'){
    practiceBodyEl.innerHTML = `
      <div class="practice-loading">
        <span class="ai-spinner" aria-hidden="true"></span>
        <p class="practice-loading-text">Generando ejercicio y quiz...</p>
        <p class="test-hint">Claude está armando un caso del nivel que exige un tema de relevancia
        ${escapeHtml(s.relevance.toLowerCase())}. Suele tardar entre 10 y 30 segundos.</p>
      </div>`;
    practiceFootEl.innerHTML =
      '<span></span><button type="button" class="ghost-btn" data-action="close-practice">Cancelar</button>';
    return;
  }

  if(s.status === 'error'){
    practiceBodyEl.innerHTML = `
      <div class="practice-error">
        <p class="ai-error">${escapeHtml(s.error)}</p>
      </div>`;
    practiceFootEl.innerHTML = `
      <button type="button" class="ghost-btn" data-action="close-practice">Cerrar</button>
      <button type="button" class="primary-btn" data-action="retry-practice">Reintentar</button>`;
    return;
  }

  const { casoPractico, miniQuiz } = s.data;
  const quizHtml = miniQuiz.length
    ? `<ol class="quiz-list">${miniQuiz.map((item, i) =>
        renderPracticeQuizItem(item, i, s.answers[i])).join('')}</ol>`
    : '<p class="empty-note">Este ejercicio no trae mini quiz. Trabaja el caso de arriba.</p>';

  practiceBodyEl.innerHTML = `
    <article class="practice-case">
      <p class="practice-eyebrow">Caso práctico</p>
      <h3 class="practice-case-title">${escapeHtml(casoPractico.titulo)}</h3>
      <div class="practice-text">${escapeHtml(casoPractico.enunciado)}</div>
      ${casoPractico.solucionPasoAPaso ? `
        <button type="button" class="solution-toggle" data-action="toggle-solution"
                aria-expanded="${s.solutionOpen}" aria-controls="practice-solution">
          <span class="solution-caret" aria-hidden="true">${s.solutionOpen ? '▴' : '▾'}</span>
          <span class="solution-toggle-text">${
            s.solutionOpen ? 'Ocultar la solución' : 'Ver solución paso a paso'}</span>
        </button>
        <div class="practice-solution" id="practice-solution"${s.solutionOpen ? '' : ' hidden'}>
          <div class="practice-text">${escapeHtml(casoPractico.solucionPasoAPaso)}</div>
        </div>
        <p class="test-hint">Resuélvelo en papel antes de abrir la solución: leerla resuelta se siente
        fácil y no deja aprendizaje.</p>` : ''}
    </article>

    <section class="practice-quiz">
      <p class="practice-eyebrow">Mini quiz${miniQuiz.length ? ` · ${miniQuiz.length} pregunta${
        miniQuiz.length === 1 ? '' : 's'}` : ''}</p>
      ${quizHtml}
    </section>`;

  renderPracticeFoot();
}

// Pie: resumen del quiz cuando ya se respondió algo, más las acciones.
function renderPracticeFoot(){
  const s = practiceState;
  if(!s || s.status !== 'ready') return;
  const total = s.data.miniQuiz.length;
  const answered = Object.keys(s.answers).length;
  const hits = s.data.miniQuiz.filter((item, i) => s.answers[i] === item.correctIndex).length;

  practiceFootEl.innerHTML = `
    <span class="practice-score">${
      total === 0 ? '' :
      answered === 0 ? 'Responde el mini quiz para ver cómo vas.' :
      `${hits} de ${answered} correcta${answered === 1 ? '' : 's'}${
        answered < total ? ` · te falta${total - answered === 1 ? '' : 'n'} ${total - answered}` : ''}`}</span>
    <span class="practice-foot-actions">
      <button type="button" class="ghost-btn" data-action="regenerate-practice">Generar otro ejercicio</button>
      <button type="button" class="primary-btn" data-action="close-practice">Listo</button>
    </span>`;
}

// Responder no re-renderiza el modal entero: se actualiza solo la pregunta para
// no perder la posición del scroll ni cerrar la solución abierta.
function answerPracticeQuiz(qi, oi){
  const s = practiceState;
  if(!s || s.status !== 'ready') return;
  if(Number.isInteger(s.answers[qi])) return;          // ya respondida: no se reescribe
  const item = s.data.miniQuiz[qi];
  if(!item || !item.alternativas[oi]) return;

  s.answers[qi] = oi;
  const li = practiceBodyEl.querySelector(`[data-quiz-item="${qi}"]`);
  if(li) li.outerHTML = renderPracticeQuizItem(item, qi, oi);
  renderPracticeFoot();

  // Con el mini quiz completo, el tema queda marcado como practicado.
  const total = s.data.miniQuiz.length;
  if(Object.keys(s.answers).length === total){
    const hits = s.data.miniQuiz.filter((it, i) => s.answers[i] === it.correctIndex).length;
    notePracticed(s.course, s.topicId, { hits, total });
  }
}

// Guarda la insignia y refresca lo que hay detrás del modal (la insignia de la
// tarjeta y la barra, que sube con la práctica). El modal no se toca.
function notePracticed(course, topicId, score){
  if(!markPracticed(course, topicId, score)) return;
  if(course !== activeCourse) return;
  renderDiagnostic();
  renderPlanState();
}

if(practiceModalEl) practiceModalEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action], [data-quiz]');
  if(!btn || !practiceState) return;

  if(btn.hasAttribute('data-quiz')){
    answerPracticeQuiz(Number(btn.getAttribute('data-quiz')), Number(btn.getAttribute('data-option')));
    return;
  }

  switch(btn.getAttribute('data-action')){
    case 'close-practice': closePractice(); break;
    case 'retry-practice':
    case 'regenerate-practice':
      openPractice(practiceState.course, practiceState.topicId, { regenerate: true });
      break;
    case 'toggle-solution': {
      practiceState.solutionOpen = !practiceState.solutionOpen;
      const panel = practiceBodyEl.querySelector('#practice-solution');
      const caret = btn.querySelector('.solution-caret');
      const label = btn.querySelector('.solution-toggle-text');
      if(panel) panel.hidden = !practiceState.solutionOpen;
      if(caret) caret.textContent = practiceState.solutionOpen ? '▴' : '▾';
      if(label) label.textContent = practiceState.solutionOpen
        ? 'Ocultar la solución' : 'Ver solución paso a paso';
      btn.setAttribute('aria-expanded', String(practiceState.solutionOpen));
      // Sin mini quiz no hay nada que responder: trabajar el caso y revisar la
      // solución es toda la práctica que ofrece el tema.
      if(practiceState.solutionOpen && practiceState.data.miniQuiz.length === 0){
        notePracticed(practiceState.course, practiceState.topicId, { hits: 0, total: 0 });
      }
      break;
    }
  }
});

/* -------------------------------------------------------------------------
   8C. FLASHCARDS POR TEMA (conceptos clave en tarjetas que giran)

   Desde la misma tarjeta semaforizada se le pide al Worker un mazo corto de
   conceptos, términos o fórmulas del tema (`action: "generateFlashcards"`). El
   mazo se guarda en el registro del ramo: reabrirlo no gasta otra llamada.
   ------------------------------------------------------------------------- */

const FLASHCARDS_TIMEOUT_MS = 45000;
const MAX_FLASHCARDS = 8;
const MAX_FLASHCARD_FRONT = 160;    // topes espejo de los del Worker
const MAX_FLASHCARD_BACK  = 600;

// { course, topicId, name, relevance, level, status, cards, index, flipped, error, controller }
let flashcardsState = null;

/* --- Mazo guardado (vive en el registro del ramo, no solo en memoria) ------
   A diferencia de la práctica, un mazo es corto y no se regenera a voluntad:
   guardarlo con el resto del diagnóstico evita pedirlo de nuevo al recargar.
   Un análisis nuevo reemplaza `rec.ai` entero, así que los mazos viejos se van
   con él y ningún tema hereda el mazo del tema que ocupaba antes su id. */

function getCachedFlashcards(course, topicId){
  const d = getDiagnostic(course);
  const entry = d && d.flashcards ? d.flashcards[topicId] : null;
  const cards = entry ? normalizeFlashcards(entry.cards) : [];
  return cards.length ? cards : null;
}

function saveCachedFlashcards(course, topicId, cards){
  const d = getDiagnostic(course);
  if(!d) return;
  d.flashcards[topicId] = { cards, at: Date.now() };
  savePastEvals();
}

// Espejo del saneado del Worker: si algún día responde algo raro, la interfaz
// descarta lo inservible en vez de romperse.
function normalizeFlashcards(raw){
  if(!Array.isArray(raw)) return [];
  const seen = new Set();
  const cards = [];
  for(const item of raw){
    if(cards.length >= MAX_FLASHCARDS) break;
    if(!item || typeof item !== 'object') continue;
    const front = String(item.front || '').trim().slice(0, MAX_FLASHCARD_FRONT);
    const back  = String(item.back  || '').trim().slice(0, MAX_FLASHCARD_BACK);
    if(!front || !back) continue;                 // una tarjeta a medias no sirve
    const key = normalizeTxt(front);
    if(seen.has(key)) continue;                   // tarjeta repetida
    seen.add(key);
    cards.push({ front, back });
  }
  return cards;
}

// Pide el mazo al Worker. `signal` permite cancelar si se cierra el modal.
async function requestFlashcards(course, topic, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El servicio de flashcards todavía no está configurado en este sitio.');
  }

  const payload = {
    action: 'generateFlashcards',
    specificTopic: topic.name,
    // Contexto opcional: el Worker lo usa para afinar el nivel de los conceptos.
    curso: courseForAi(course),
    tipoEvaluacion: examTypeForAi(course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FLASHCARDS_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'Las flashcards tardaron demasiado en generarse. Inténtalo de nuevo.'
      : 'No se pudo conectar con el servicio de flashcards. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));
  const cards = normalizeFlashcards(data && data.flashcards);
  if(!cards.length) throw new Error('El mazo llegó vacío. Inténtalo de nuevo.');
  return cards;
}

/* --- Modal de flashcards --------------------------------------------------- */

function openFlashcards(course, topicId, { regenerate = false } = {}){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !flashcardsOverlayEl) return;

  if(flashcardsState && flashcardsState.controller) flashcardsState.controller.abort();

  const cached = regenerate ? null : getCachedFlashcards(course, topicId);
  flashcardsState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    level: topicLevel(course, topic),
    status: cached ? 'ready' : 'loading',
    cards: cached || [],
    index: 0,
    flipped: false,
    error: '',
    controller: cached ? null : new AbortController()
  };

  flashcardsOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFlashcardsKeydown);
  renderFlashcards();

  if(cached) return;

  const state = flashcardsState;
  requestFlashcards(course, topic, state.controller.signal)
    .then(cards => {
      if(flashcardsState !== state) return;             // se cerró o se pidió otro tema
      saveCachedFlashcards(course, topicId, cards);
      state.status = 'ready';
      state.cards = cards;
      state.controller = null;
      renderFlashcards();
    })
    .catch(err => {
      if(flashcardsState !== state || state.controller.signal.aborted) return;
      state.status = 'error';
      state.error = err.message || 'No se pudieron generar las flashcards de este tema.';
      state.controller = null;
      renderFlashcards();
    });
}

function closeFlashcards(){
  if(!flashcardsState) return;
  if(flashcardsState.controller) flashcardsState.controller.abort();
  flashcardsState = null;
  flashcardsOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onFlashcardsKeydown);
}

function onFlashcardsKeydown(ev){
  if(!flashcardsState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeFlashcards(); return; }
  if(flashcardsState.status !== 'ready') return;

  if(ev.key === 'ArrowLeft'){  ev.preventDefault(); showFlashcard(flashcardsState.index - 1); return; }
  if(ev.key === 'ArrowRight'){ ev.preventDefault(); showFlashcard(flashcardsState.index + 1); return; }

  // Enter gira solo con la tarjeta enfocada; Espacio también desde cualquier
  // parte del modal, salvo que haya un botón con el foco (ahí le pertenece a él).
  const onCard = ev.target === flashcardEl;
  if(ev.key === 'Enter' && onCard){ ev.preventDefault(); flipFlashcard(); return; }
  if(ev.key === ' ' || ev.key === 'Spacebar'){
    if(!onCard && ev.target.closest('button')) return;
    ev.preventDefault();
    flipFlashcard();
  }
}

function renderFlashcards(){
  if(!flashcardsState || !flashcardsModalEl) return;
  const s = flashcardsState;

  flashcardsTitleEl.textContent = s.name;
  flashcardsModalEl.classList.remove('lvl-alto', 'lvl-medio', 'lvl-bajo');
  flashcardsModalEl.classList.add(`lvl-${s.level}`);

  const ready = s.status === 'ready';
  flashcardsLoadingEl.hidden   = s.status !== 'loading';
  flashcardsErrorEl.hidden     = s.status !== 'error';
  flashcardContainerEl.hidden  = !ready;
  flashcardsFootEl.hidden      = !ready;

  if(s.status === 'loading'){
    flashcardsSubtitleEl.textContent = 'Extrayendo conceptos clave...';
    return;
  }
  if(s.status === 'error'){
    flashcardsSubtitleEl.textContent = '';
    flashcardsErrorTextEl.textContent = s.error;
    return;
  }

  flashcardsSubtitleEl.textContent =
    `${s.cards.length} concepto${s.cards.length === 1 ? '' : 's'} clave · relevancia ${s.relevance.toLowerCase()}`;
  // El color del badge lo pone el CSS a partir del .lvl-* del modal; aquí solo
  // va el texto, que es el mismo en las dos caras.
  flashcardLevelEls.forEach(el => { el.textContent = `Relevancia ${s.relevance.toLowerCase()}`; });
  showFlashcard(s.index);
  flashcardEl.focus();
}

// Muestra la tarjeta `index` siempre por el frente.
function showFlashcard(index){
  const s = flashcardsState;
  if(!s || s.status !== 'ready' || !s.cards.length) return;

  const total = s.cards.length;
  s.index = Math.min(Math.max(0, index), total - 1);
  const card = s.cards[s.index];

  // El giro se deshace sin animar: animarlo mostraría el reverso anterior
  // dando la vuelta con el texto de la tarjeta nueva ya puesto.
  if(flashcardEl.classList.contains('is-flipped')){
    flashcardEl.classList.add('no-anim');
    flashcardEl.classList.remove('is-flipped');
    void flashcardEl.offsetWidth;          // fuerza el reflow antes de reanimar
    flashcardEl.classList.remove('no-anim');
  }
  s.flipped = false;

  flashcardFrontEl.textContent = card.front;
  flashcardBackEl.textContent = card.back;
  flashcardsCounterEl.textContent = `Tarjeta ${s.index + 1} de ${total}`;
  if(flashcardsProgressEl){
    flashcardsProgressEl.style.setProperty('--fc-progress', `${((s.index + 1) / total) * 100}%`);
  }
  updateFlashcardState();

  const prev = flashcardsFootEl.querySelector('[data-action="prev-flashcard"]');
  const next = flashcardsFootEl.querySelector('[data-action="next-flashcard"]');
  if(prev) prev.disabled = s.index === 0;
  if(next) next.disabled = s.index >= total - 1;
}

function flipFlashcard(){
  const s = flashcardsState;
  if(!s || s.status !== 'ready') return;
  s.flipped = !s.flipped;
  flashcardEl.classList.toggle('is-flipped', s.flipped);
  updateFlashcardState();
}

// La cara que no se ve sigue en el DOM: se oculta al lector de pantalla para
// que no lea la definición cuando en pantalla está el concepto (y al revés).
function updateFlashcardState(){
  const s = flashcardsState;
  if(!s || !flashcardEl) return;
  flashcardEl.setAttribute('aria-label', s.flipped
    ? `Definición de la tarjeta ${s.index + 1}. Pulsa para volver al concepto.`
    : `Concepto de la tarjeta ${s.index + 1}. Pulsa para ver la definición.`);
  const front = flashcardEl.querySelector('.flashcard-front');
  const back  = flashcardEl.querySelector('.flashcard-back');
  if(front) front.setAttribute('aria-hidden', String(s.flipped));
  if(back)  back.setAttribute('aria-hidden', String(!s.flipped));
}

if(flashcardsModalEl) flashcardsModalEl.addEventListener('click', ev => {
  if(!flashcardsState) return;

  const btn = ev.target.closest('[data-action]');
  if(btn){
    switch(btn.getAttribute('data-action')){
      case 'close-flashcards': closeFlashcards(); break;
      case 'retry-flashcards':
        openFlashcards(flashcardsState.course, flashcardsState.topicId, { regenerate: true });
        break;
      case 'prev-flashcard': showFlashcard(flashcardsState.index - 1); break;
      case 'next-flashcard': showFlashcard(flashcardsState.index + 1); break;
    }
    return;
  }

  if(ev.target.closest('.flashcard')) flipFlashcard();
});

/* -------------------------------------------------------------------------
   8D. EXPLICADOR FEYNMAN («peras y manzanas»)

   Cuando el tema no se entiende todavía —antes de practicarlo o de memorizar
   conceptos— se le pide al Worker una analogía cotidiana (`action:
   "explainFeynman"`): la escena de todos los días, las equivalencias con los
   términos reales del ramo y el resumen en una frase. Igual que el mazo de
   flashcards, la explicación se guarda en el registro del ramo: reabrirla es
   instantáneo y no gasta otra llamada.
   ------------------------------------------------------------------------- */

const FEYNMAN_TIMEOUT_MS = 45000;
// Topes espejo de los del Worker: si algún día responde de más, la interfaz recorta.
const MAX_FEYNMAN_TAKEAWAYS     = 4;
const MAX_FEYNMAN_TITLE_CHARS    = 160;
const MAX_FEYNMAN_ANALOGY_CHARS  = 3000;
const MAX_FEYNMAN_TAKEAWAY_CHARS = 400;
const MAX_FEYNMAN_SUMMARY_CHARS  = 400;

// { course, topicId, name, relevance, status, data, error, controller }
let feynmanState = null;

/* --- Explicación guardada (vive en el registro del ramo, no solo en memoria) ---
   La analogía de un tema no cambia de un día para otro, así que se guarda con el
   resto del diagnóstico y reabrirla es gratis. Un análisis nuevo reemplaza
   `rec.ai` entero, así que las explicaciones viejas se van con él y ningún tema
   hereda la analogía del tema que ocupaba antes su id. */

function getCachedFeynman(course, topicId){
  const d = getDiagnostic(course);
  const entry = d && d.feynman ? d.feynman[topicId] : null;
  return entry ? normalizeFeynman(entry.data) : null;
}

function saveCachedFeynman(course, topicId, data){
  const d = getDiagnostic(course);
  if(!d) return;
  d.feynman[topicId] = { data, at: Date.now() };
  savePastEvals();
}

// Espejo del saneado del Worker: si algún día responde algo raro, la interfaz
// descarta lo inservible en vez de romperse. Sin analogía o sin resumen no hay
// nada que mostrar; los puntos clave vacíos o repetidos simplemente se caen.
function normalizeFeynman(raw){
  if(!raw || typeof raw !== 'object') return null;

  const analogy = String(raw.analogy || '').trim().slice(0, MAX_FEYNMAN_ANALOGY_CHARS);
  const summary = String(raw.summary || '').trim().slice(0, MAX_FEYNMAN_SUMMARY_CHARS);
  if(!analogy || !summary) return null;

  const seen = new Set();
  const keyTakeaways = [];
  for(const item of (Array.isArray(raw.keyTakeaways) ? raw.keyTakeaways : [])){
    if(keyTakeaways.length >= MAX_FEYNMAN_TAKEAWAYS) break;
    const text = String(item || '').trim().slice(0, MAX_FEYNMAN_TAKEAWAY_CHARS);
    if(!text) continue;
    const key = normalizeTxt(text);
    if(seen.has(key)) continue;                   // punto clave repetido
    seen.add(key);
    keyTakeaways.push(text);
  }
  // El Worker garantiza al menos dos, pero sin ninguno la analogía queda sin
  // aterrizar en el ramo: eso no se publica.
  if(!keyTakeaways.length) return null;

  return {
    title: String(raw.title || '').trim().slice(0, MAX_FEYNMAN_TITLE_CHARS) || 'Peras y manzanas',
    analogy,
    keyTakeaways,
    summary
  };
}

// Pide la explicación al Worker. `signal` permite cancelar si se cierra el modal.
async function requestFeynman(course, topic, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El servicio de explicaciones todavía no está configurado en este sitio.');
  }

  const payload = {
    action: 'explainFeynman',
    specificTopic: topic.name,
    // Contexto opcional: el Worker lo usa para situar el tema en el ramo.
    curso: courseForAi(course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FEYNMAN_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'La explicación tardó demasiado en generarse. Inténtalo de nuevo.'
      : 'No se pudo conectar con el servicio de explicaciones. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));
  const feynman = normalizeFeynman(data && data.feynman);
  if(!feynman) throw new Error('La explicación llegó incompleta. Inténtalo de nuevo.');
  return feynman;
}

/* --- Modal de peras y manzanas --------------------------------------------- */

function openFeynman(course, topicId, { regenerate = false } = {}){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !feynmanOverlayEl) return;

  if(feynmanState && feynmanState.controller) feynmanState.controller.abort();

  const cached = regenerate ? null : getCachedFeynman(course, topicId);
  feynmanState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    status: cached ? 'ready' : 'loading',
    data: cached,
    error: '',
    controller: cached ? null : new AbortController()
  };

  feynmanOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onFeynmanKeydown);
  renderFeynman();

  if(cached) return;

  const state = feynmanState;
  requestFeynman(course, topic, state.controller.signal)
    .then(data => {
      if(feynmanState !== state) return;             // se cerró o se pidió otro tema
      saveCachedFeynman(course, topicId, data);
      state.status = 'ready';
      state.data = data;
      state.controller = null;
      renderFeynman();
    })
    .catch(err => {
      if(feynmanState !== state || state.controller.signal.aborted) return;
      state.status = 'error';
      state.error = err.message || 'No se pudo explicar este tema con peras y manzanas.';
      state.controller = null;
      renderFeynman();
    });
}

function closeFeynman(){
  if(!feynmanState) return;
  if(feynmanState.controller) feynmanState.controller.abort();
  feynmanState = null;
  feynmanOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onFeynmanKeydown);
}

function onFeynmanKeydown(ev){
  if(!feynmanState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeFeynman(); }
}

function renderFeynman(){
  if(!feynmanState || !feynmanModalEl) return;
  const s = feynmanState;

  feynmanTitleEl.textContent = s.name;

  const ready = s.status === 'ready';
  feynmanLoadingEl.hidden = s.status !== 'loading';
  feynmanErrorEl.hidden   = s.status !== 'error';
  feynmanContentEl.hidden = !ready;
  feynmanFootEl.hidden    = !ready;

  if(s.status === 'loading'){
    feynmanSubtitleEl.textContent = 'Buscando una analogía de la vida diaria...';
    return;
  }
  if(s.status === 'error'){
    feynmanSubtitleEl.textContent = '';
    feynmanErrorTextEl.textContent = s.error;
    return;
  }

  feynmanSubtitleEl.textContent =
    `Explicado sin jerga técnica · relevancia ${s.relevance.toLowerCase()}`;

  feynmanAnalogyTitleEl.textContent = s.data.title;

  // La analogía viene con saltos de línea del modelo: cada bloque es un párrafo.
  // Se arma con nodos de texto en vez de innerHTML, así nada de lo que devuelva
  // el modelo puede interpretarse como HTML.
  feynmanAnalogyEl.textContent = '';
  for(const chunk of s.data.analogy.split('\n').map(t => t.trim()).filter(Boolean)){
    const p = document.createElement('p');
    p.textContent = chunk;
    feynmanAnalogyEl.appendChild(p);
  }

  feynmanTakeawaysEl.textContent = '';
  for(const takeaway of s.data.keyTakeaways){
    const li = document.createElement('li');
    li.textContent = takeaway;
    feynmanTakeawaysEl.appendChild(li);
  }

  feynmanSummaryEl.textContent = s.data.summary;

  // El cuerpo se reusa entre temas: si el anterior quedó a media lectura, el
  // nuevo tiene que empezar arriba.
  if(feynmanBodyEl) feynmanBodyEl.scrollTop = 0;

  const done = feynmanFootEl.querySelector('[data-action="close-feynman"]');
  if(done) done.focus();
}

if(feynmanModalEl) feynmanModalEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn || !feynmanState) return;

  switch(btn.getAttribute('data-action')){
    case 'close-feynman': closeFeynman(); break;
    case 'retry-feynman':
      openFeynman(feynmanState.course, feynmanState.topicId, { regenerate: true });
      break;
  }
});

/* -------------------------------------------------------------------------
   8E. SIMULACRO DE EXAMEN GLOBAL

   A diferencia de la práctica y las flashcards (un tema a la vez), aquí se le
   piden al Worker preguntas que mezclan TODOS los temas del plan, ponderadas por
   el nivel del semáforo: los 🔴 concentran la mitad de la prueba. Se rinde a
   reloj, se corrige al entregar y se guarda la nota en el registro del ramo.
   ------------------------------------------------------------------------- */

const EXAM_TIMEOUT_MS  = 90000;   // la llamada más larga del Worker: hasta 8 preguntas
const MIN_EXAM_ITEMS   = 4;       // piso del Worker; menos que esto no es un simulacro
const MAX_EXAM_ITEMS   = 8;
const MAX_EXAM_OPTIONS = 4;
const MAX_EXAM_ATTEMPTS = 5;      // intentos guardados por ramo

// Umbrales de alerta del cronómetro, en segundos restantes.
const EXAM_WARNING_SEC = 300;
const EXAM_DANGER_SEC  = 120;

const EXAM_TIME_CHOICES = [
  { id: '15',   label: '15 min',               minutes: 15 },
  { id: '30',   label: '30 min',               minutes: 30 },
  { id: 'free', label: 'Sin tiempo limitante', minutes: 0  }
];

const EXAM_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// { course, view, timeChoice, title, questions, answers, index, durationSec,
//   startedAt, endedAt, tickId, controller, error, result, saved }
let examState = null;

/* --- Nota, tiempo y formato ------------------------------------------------ */

// Escala chilena 1.0–7.0 lineal: sin respuestas correctas es un 1.0, todas un 7.0.
// Es una referencia de estudio, no la escala real del ramo (que suele exigir 60%).
function examGrade(hits, total){
  if(!total) return 1;
  return Math.round((1 + (hits / total) * 6) * 10) / 10;
}

function examGradeClass(grade){
  if(grade < 4) return 'is-fail';
  return grade < 5.5 ? 'is-mid' : 'is-pass';
}

function examVerdict(grade){
  if(grade >= 6.0) return 'Excelente: llegas al examen con el contenido controlado.';
  if(grade >= 5.0) return 'Buen resultado. Afina los temas que fallaste y quedas listo.';
  if(grade >= 4.0) return 'Vas encaminado, pero todavía se te escapan cosas importantes.';
  return 'Todavía no. Estos temas necesitan otra pasada antes de la evaluación.';
}

// mm:ss, o h:mm:ss cuando el simulacro es sin límite y se pasa de la hora.
function formatClock(totalSeconds){
  const s = Math.max(0, Math.round(totalSeconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = n => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

// El tiempo se calcula contra el reloj, no restando de a un segundo: así una
// pestaña en segundo plano (donde setInterval se ralentiza) no regala minutos.
function examElapsedSec(s){
  if(!s || !s.startedAt) return 0;
  return Math.max(0, Math.round(((s.endedAt || Date.now()) - s.startedAt) / 1000));
}

function examRemainingSec(s){
  if(!s || !s.durationSec) return null;          // modo sin límite
  return Math.max(0, s.durationSec - examElapsedSec(s));
}

/* --- Intentos guardados (viven en el registro del ramo) --------------------
   A propósito NO viven dentro de `rec.ai.diagnostic`: un análisis nuevo
   reemplaza `rec.ai` entero, y la nota que sacaste en este ramo sigue siendo
   información válida aunque cambien los temas detectados. */

function getExamAttempts(course){
  const rec = pastEvalsData[course];
  return (rec && Array.isArray(rec.exams)) ? rec.exams : [];
}

function getLastExamAttempt(course){
  const list = getExamAttempts(course);
  return list.length ? list[list.length - 1] : null;
}

function saveExamAttempt(course, attempt){
  const rec = getRecord(course);
  if(!Array.isArray(rec.exams)) rec.exams = [];
  rec.exams.push(attempt);
  // Solo interesan los últimos intentos: guardar todos infla el localStorage.
  if(rec.exams.length > MAX_EXAM_ATTEMPTS) rec.exams = rec.exams.slice(-MAX_EXAM_ATTEMPTS);
  savePastEvals();
}

/* --- Temas que se envían al Worker ----------------------------------------- */

// El Worker espera { title, level, relevance }. `level` va en minúscula tal como
// lo guarda el semáforo ('alto'); el Worker lo normaliza a 'Alto'.
function examTopicsPayload(course){
  const ai = getAiAnalysis(course);
  if(!ai || !Array.isArray(ai.topics)) return [];
  return ai.topics.map(t => ({
    title: t.name,
    level: topicLevel(course, t),
    relevance: t.relevance
  }));
}

// Cuántas preguntas va a traer el simulacro (espejo del cálculo del Worker).
function examEstimatedCount(topicCount){
  return Math.min(MAX_EXAM_ITEMS, Math.max(MIN_EXAM_ITEMS + 1, topicCount));
}

function canRunExam(course){
  return examTopicsPayload(course).length > 0;
}

// El tema del plan al que pertenece una pregunta. El Worker devuelve el título
// exacto que le enviamos, pero si inventó uno, esto devuelve null y la pregunta
// se muestra igual, solo que sin color de semáforo.
function examTopicOf(course, topicTitle){
  const ai = getAiAnalysis(course);
  if(!ai || !topicTitle) return null;
  const key = normalizeTxt(topicTitle);
  return ai.topics.find(t => normalizeTxt(t.name) === key) || null;
}

/* --- Llamada al Worker ------------------------------------------------------ */

// Espejo del saneado del Worker: si algún día responde algo raro, la interfaz
// descarta lo inservible en vez de romperse.
function normalizeExamQuestions(raw){
  if(!Array.isArray(raw)) return [];
  const out = [];
  for(const item of raw){
    if(out.length >= MAX_EXAM_ITEMS) break;
    if(!item || typeof item !== 'object') continue;

    const question = String(item.question || '').trim();
    if(!question) continue;

    const options = Array.isArray(item.options)
      ? item.options.map(o => String(o).trim()).filter(Boolean).slice(0, MAX_EXAM_OPTIONS)
      : [];
    const correctIndex = Number(item.correctIndex);
    // Sin alternativas suficientes o con el índice fuera de rango no hay pregunta
    // corregible: se descarta en vez de dar por buena una alternativa cualquiera.
    if(options.length < 2) continue;
    if(!Number.isInteger(correctIndex) || correctIndex < 0 || correctIndex >= options.length) continue;

    out.push({
      topicTitle: String(item.topicTitle || '').trim(),
      question,
      options,
      correctIndex,
      explanation: String(item.explanation || '').trim()
    });
  }
  return out;
}

async function requestExamSimulation(course, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El servicio de simulacros todavía no está configurado en este sitio.');
  }

  const topics = examTopicsPayload(course);
  if(!topics.length) throw new Error('Analiza el temario del ramo antes de generar un simulacro.');

  const payload = {
    action: 'generateExamSimulation',
    topics,
    curso: courseForAi(course),
    tipoEvaluacion: examTypeForAi(course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EXAM_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo canceló el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'El simulacro tardó demasiado en generarse. Inténtalo de nuevo.'
      : 'No se pudo conectar con el servicio de simulacros. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));

  const exam = (data && data.exam) ? data.exam : null;
  const questions = normalizeExamQuestions(exam && exam.questions);
  if(questions.length < MIN_EXAM_ITEMS){
    throw new Error('El simulacro llegó incompleto. Inténtalo de nuevo.');
  }
  return {
    title: String((exam && exam.title) || '').trim() || `Simulacro de Examen - ${course}`,
    questions
  };
}

/* --- Apertura, cierre y cronómetro ----------------------------------------- */

function openExamSimulation(course){
  if(!examOverlayEl || !canRunExam(course)) return;
  if(examState) closeExamSimulation({ force: true });

  const last = getLastExamAttempt(course);
  examState = {
    course,
    view: 'setup',
    // Se ofrece de nuevo el tiempo que eligió la última vez.
    timeChoice: (last && EXAM_TIME_CHOICES.some(c => c.id === last.timeChoice)) ? last.timeChoice : '30',
    title: '',
    questions: [],
    answers: {},
    index: 0,
    durationSec: 0,
    startedAt: 0,
    endedAt: 0,
    tickId: 0,
    controller: null,
    error: '',
    result: null,
    saved: false
  };

  examOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onExamKeydown);
  renderExam();
}

// `force` salta la confirmación: lo usan el cambio de ramo y el reinicio total,
// donde preguntar no tendría sentido porque el examen ya perdió su contexto.
function closeExamSimulation({ force = false } = {}){
  if(!examState) return;
  if(!force && examState.view === 'quiz'){
    const answered = Object.keys(examState.answers).length;
    const ok = confirm(answered
      ? `Vas ${answered} de ${examState.questions.length} preguntas. Si sales ahora se pierde el simulacro.\n\n¿Salir igual?`
      : '¿Salir del simulacro? Se pierde la prueba generada.');
    if(!ok) return;
  }

  stopExamTimer();
  if(examState.controller) examState.controller.abort();
  examState = null;
  examOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onExamKeydown);
  renderExamLaunch();
}

function stopExamTimer(){
  if(examState && examState.tickId){
    clearInterval(examState.tickId);
    examState.tickId = 0;
  }
}

function startExamTimer(){
  stopExamTimer();
  if(!examState) return;
  examState.tickId = setInterval(examTick, 1000);
  updateExamTimer();
}

// Solo toca el nodo del reloj: re-renderizar el modal entero cada segundo
// perdería el foco de la alternativa y la posición del scroll.
function examTick(){
  if(!examState || examState.view !== 'quiz'){ stopExamTimer(); return; }
  updateExamTimer();
  if(examState.durationSec && examRemainingSec(examState) <= 0){
    stopExamTimer();
    submitExam({ timeUp: true });
  }
}

function updateExamTimer(){
  if(!examTimerEl || !examState) return;
  const s = examState;
  const showTimer = s.view === 'quiz';
  examTimerEl.hidden = !showTimer;
  if(!showTimer) return;

  const remaining = examRemainingSec(s);
  if(remaining === null){
    // Sin límite el reloj cuenta hacia arriba: sirve igual como referencia.
    examTimerEl.textContent = `⏱ ${formatClock(examElapsedSec(s))}`;
    examTimerEl.classList.remove('is-warning', 'is-danger');
    examTimerEl.setAttribute('aria-label', `Tiempo transcurrido: ${formatClock(examElapsedSec(s))}`);
    return;
  }

  examTimerEl.textContent = `⏱ ${formatClock(remaining)}`;
  examTimerEl.classList.toggle('is-warning', remaining <= EXAM_WARNING_SEC && remaining > EXAM_DANGER_SEC);
  examTimerEl.classList.toggle('is-danger', remaining <= EXAM_DANGER_SEC);
  examTimerEl.setAttribute('aria-label', `Tiempo restante: ${formatClock(remaining)}`);
}

/* --- Generar y rendir ------------------------------------------------------- */

function startExamSimulation(){
  const s = examState;
  if(!s || s.view === 'loading') return;

  s.view = 'loading';
  s.error = '';
  s.controller = new AbortController();
  renderExam();

  const state = s;
  requestExamSimulation(s.course, s.controller.signal)
    .then(exam => {
      if(examState !== state) return;                    // se cerró o se reabrió
      const choice = EXAM_TIME_CHOICES.find(c => c.id === state.timeChoice);
      state.title = exam.title;
      state.questions = exam.questions;
      state.answers = {};
      state.index = 0;
      state.durationSec = choice ? choice.minutes * 60 : 0;
      state.startedAt = Date.now();
      state.endedAt = 0;
      state.controller = null;
      state.view = 'quiz';
      renderExam();
      startExamTimer();
    })
    .catch(err => {
      if(examState !== state || (state.controller && state.controller.signal.aborted)) return;
      state.view = 'error';
      state.error = err.message || 'No se pudo generar el simulacro.';
      state.controller = null;
      renderExam();
    });
}

function answerExam(optionIndex){
  const s = examState;
  if(!s || s.view !== 'quiz') return;
  const q = s.questions[s.index];
  if(!q || !q.options[optionIndex]) return;
  // A diferencia del mini test, aquí se puede cambiar la respuesta: es una prueba,
  // y en una prueba uno vuelve sobre lo que dejó marcado.
  s.answers[s.index] = optionIndex;
  renderExam();
}

function goToExamQuestion(index){
  const s = examState;
  if(!s || s.view !== 'quiz') return;
  s.index = Math.min(Math.max(0, index), s.questions.length - 1);
  renderExam();
}

// Corrige, detiene el reloj y pasa a resultados. `timeUp` distingue la entrega
// por tiempo agotado de la que hace el alumno a mano.
function submitExam({ timeUp = false } = {}){
  const s = examState;
  if(!s || s.view !== 'quiz') return;

  const answered = Object.keys(s.answers).length;
  if(!timeUp && answered < s.questions.length){
    const faltan = s.questions.length - answered;
    const ok = confirm(`Te falta${faltan === 1 ? '' : 'n'} ${faltan} pregunta${faltan === 1 ? '' : 's'} sin responder. ` +
      `Las no respondidas cuentan como incorrectas.\n\n¿Entregar igual?`);
    if(!ok) return;
  }

  stopExamTimer();
  s.endedAt = Date.now();

  const total = s.questions.length;
  const hits = s.questions.filter((q, i) => s.answers[i] === q.correctIndex).length;

  // Desglose por tema: un mismo tema puede aparecer en varias preguntas.
  const byTopic = [];
  const seen = new Map();
  s.questions.forEach((q, i) => {
    const topic = examTopicOf(s.course, q.topicTitle);
    const name = topic ? topic.name : (q.topicTitle || 'Sin tema');
    const key = normalizeTxt(name);
    if(!seen.has(key)){
      seen.set(key, byTopic.length);
      byTopic.push({
        name,
        topicId: topic ? topic.id : null,
        level: topic ? topicLevel(s.course, topic) : null,
        hits: 0,
        total: 0
      });
    }
    const row = byTopic[seen.get(key)];
    row.total++;
    if(s.answers[i] === q.correctIndex) row.hits++;
  });

  s.result = {
    hits,
    total,
    pct: total ? Math.round((hits / total) * 100) : 0,
    grade: examGrade(hits, total),
    seconds: examElapsedSec(s),
    timeUp,
    byTopic
  };
  s.saved = false;
  s.view = 'results';
  renderExam();
}

// "Guardar Resultado": el intento queda en el registro del ramo para recordar la
// última nota. No toca el semáforo — el nivel de cada tema es del mini test y de
// lo que el alumno ajuste a mano, no de una prueba de práctica.
function saveExamResult(){
  const s = examState;
  if(!s || s.view !== 'results' || !s.result || s.saved) return;
  const r = s.result;
  saveExamAttempt(s.course, {
    at: Date.now(),
    title: s.title,
    timeChoice: s.timeChoice,
    hits: r.hits,
    total: r.total,
    grade: r.grade,
    pct: r.pct,
    seconds: r.seconds,
    byTopic: r.byTopic.map(t => ({ name: t.name, hits: t.hits, total: t.total }))
  });
  s.saved = true;
  renderExamFoot();
  renderExamLaunch();
  renderPlanState();
}

/* --- Render ----------------------------------------------------------------- */

function renderExam(){
  if(!examState || !examBodyEl) return;
  const s = examState;

  const inQuiz = s.view === 'quiz';
  examProgressEl.hidden = !inQuiz;
  if(inQuiz){
    const answered = Object.keys(s.answers).length;
    examProgressFillEl.style.width = `${Math.round(answered / s.questions.length * 100)}%`;
  }

  switch(s.view){
    case 'setup':   renderExamSetup();   break;
    case 'loading': renderExamLoading(); break;
    case 'error':   renderExamError();   break;
    case 'quiz':    renderExamQuiz();    break;
    case 'results': renderExamResults(); break;
  }
  updateExamTimer();
}

function renderExamSetup(){
  const s = examState;
  const topics = examTopicsPayload(s.course);
  const estimate = examEstimatedCount(topics.length);
  const counts = { alto: 0, medio: 0, bajo: 0 };
  topics.forEach(t => { counts[t.level] = (counts[t.level] || 0) + 1; });
  const last = getLastExamAttempt(s.course);

  examTitleEl.textContent = `Simulacro de Examen - ${s.course}`;
  examCounterEl.textContent = 'Configura la prueba antes de empezar';

  examBodyEl.innerHTML = `
    <p class="exam-setup-lead">
      Una prueba corta de alternativas que mezcla los temas de tu plan, con
      <b>más preguntas de los temas 🔴 y 🟡</b> — los que peor dominas según el mini test.
      ${diagnosticIsDone(s.course) ? '' :
        'Todavía no has hecho el mini test, así que todos los temas entran con el mismo peso.'}
    </p>

    <div class="exam-facts">
      <div class="exam-fact">
        <p class="exam-fact-value">${topics.length}</p>
        <p class="exam-fact-label">Tema${topics.length === 1 ? '' : 's'} a evaluar</p>
      </div>
      <div class="exam-fact">
        <p class="exam-fact-value">~${estimate}</p>
        <p class="exam-fact-label">Preguntas estimadas</p>
      </div>
    </div>

    <p class="exam-field-label">Tiempo de la prueba</p>
    <div class="exam-time-options" role="group" aria-label="Tiempo de la prueba">
      ${EXAM_TIME_CHOICES.map(c => `
        <button type="button" class="exam-time-option" data-time="${c.id}"
                aria-pressed="${s.timeChoice === c.id}">${escapeHtml(c.label)}</button>
      `).join('')}
    </div>

    <div class="exam-topic-preview">
      <p class="exam-field-label">Entran a la prueba</p>
      <div class="exam-topic-chips">
        ${topics.map(t => `
          <span class="exam-chip lvl-${t.level}">
            <span aria-hidden="true">${LEVELS[t.level] ? LEVELS[t.level].dot : ''}</span>
            ${escapeHtml(t.title)}
          </span>`).join('')}
      </div>
      <p class="test-hint">
        ${counts.alto} urgente${counts.alto === 1 ? '' : 's'} ·
        ${counts.medio} en refuerzo ·
        ${counts.bajo} dominado${counts.bajo === 1 ? '' : 's'}.
        ${last ? `Tu último simulacro de este ramo fue un <b>${last.grade.toFixed(1)}</b>
          (${last.hits} de ${last.total}).` : ''}
      </p>
    </div>`;

  examFootEl.innerHTML = `
    <button type="button" class="ghost-btn" data-action="close-exam">Cancelar</button>
    <button type="button" class="primary-btn" data-action="start-exam">Comenzar Simulacro</button>`;

  const go = examFootEl.querySelector('[data-action="start-exam"]');
  if(go) go.focus();
}

function renderExamLoading(){
  const s = examState;
  examTitleEl.textContent = `Simulacro de Examen - ${s.course}`;
  examCounterEl.textContent = '';
  examBodyEl.innerHTML = `
    <div class="practice-loading">
      <span class="ai-spinner" aria-hidden="true"></span>
      <p class="practice-loading-text">Generando simulacro personalizado según tu temario...</p>
      <p class="test-hint">Claude está redactando las preguntas y sus explicaciones, cargando la prueba
      hacia los temas que peor dominas. Suele tardar entre 20 y 40 segundos.</p>
    </div>`;
  examFootEl.innerHTML =
    '<span></span><button type="button" class="ghost-btn" data-action="close-exam">Cancelar</button>';
}

function renderExamError(){
  const s = examState;
  examTitleEl.textContent = `Simulacro de Examen - ${s.course}`;
  examCounterEl.textContent = '';
  examBodyEl.innerHTML = `<div class="practice-error"><p class="ai-error">${escapeHtml(s.error)}</p></div>`;
  examFootEl.innerHTML = `
    <button type="button" class="ghost-btn" data-action="close-exam">Cerrar</button>
    <button type="button" class="primary-btn" data-action="start-exam">Reintentar</button>`;
}

function renderExamQuiz(){
  const s = examState;
  const total = s.questions.length;
  const q = s.questions[s.index];
  const selected = s.answers[s.index];
  const answered = Object.keys(s.answers).length;
  const topic = examTopicOf(s.course, q.topicTitle);

  examTitleEl.textContent = s.title;
  examCounterEl.textContent = `Pregunta ${s.index + 1} de ${total} · ${answered} respondida${
    answered === 1 ? '' : 's'}`;

  examBodyEl.innerHTML = `
    <p class="exam-question-topic">${escapeHtml(q.topicTitle || 'Tema general')}${
      topic ? ` · relevancia ${escapeHtml(topic.relevance.toLowerCase())}` : ''}</p>
    <h3 class="exam-question">${escapeHtml(q.question)}</h3>
    <div class="exam-options" role="group" aria-label="Alternativas">
      ${q.options.map((opt, i) => `
        <button type="button" class="exam-option${selected === i ? ' selected' : ''}"
                data-option="${i}" aria-pressed="${selected === i}">
          <span class="exam-letter" aria-hidden="true">${EXAM_LETTERS[i] || i + 1}</span>
          <span class="exam-option-text">${escapeHtml(opt)}</span>
        </button>`).join('')}
    </div>

    <div class="exam-map" role="group" aria-label="Ir a una pregunta">
      ${s.questions.map((item, i) => {
        const classes = ['exam-map-btn'];
        if(Number.isInteger(s.answers[i])) classes.push('answered');
        if(i === s.index) classes.push('current');
        return `<button type="button" class="${classes.join(' ')}" data-goto="${i}"
                        aria-label="Pregunta ${i + 1}${Number.isInteger(s.answers[i]) ? ', respondida' : ', sin responder'}"
                        ${i === s.index ? 'aria-current="true"' : ''}>${i + 1}</button>`;
      }).join('')}
    </div>

    <p class="test-hint">Puedes cambiar tus respuestas hasta que entregues. Con las teclas
    <kbd>1</kbd>–<kbd>${Math.min(total, 9)}</kbd> marcas alternativa y con <kbd>←</kbd> <kbd>→</kbd> cambias de pregunta.</p>`;

  examFootEl.innerHTML = `
    <span class="exam-nav">
      <button type="button" class="ghost-btn" data-action="prev-question"
              ${s.index === 0 ? 'disabled' : ''}>← Anterior</button>
      <button type="button" class="ghost-btn" data-action="next-question"
              ${s.index >= total - 1 ? 'disabled' : ''}>Siguiente →</button>
    </span>
    <button type="button" class="primary-btn" data-action="submit-exam">Entregar Examen</button>`;
}

function renderExamResults(){
  const s = examState;
  const r = s.result;

  examTitleEl.textContent = s.title;
  examCounterEl.textContent = `Corregido · ${r.total} pregunta${r.total === 1 ? '' : 's'}`;

  // Temas a repasar: los que tuvieron algún error, primero los más urgentes.
  const failed = r.byTopic
    .filter(t => t.hits < t.total)
    .sort((a, b) => (LEVEL_RANK[a.level] ?? 3) - (LEVEL_RANK[b.level] ?? 3) ||
                    (b.total - b.hits) - (a.total - a.hits));

  const adviceHtml = failed.length ? `
    <div class="exam-advice">
      <p class="exam-advice-title">Vuelve sobre estos temas</p>
      <p class="exam-advice-text">Fallaste al menos una pregunta en ${failed.length} tema${
        failed.length === 1 ? '' : 's'}. Empieza por los de arriba: son los que más pesan en tu evaluación.</p>
      <ul class="exam-advice-list">
        ${failed.map(t => `
          <li>
            <span aria-hidden="true">${t.level && LEVELS[t.level] ? LEVELS[t.level].dot : '•'}</span>
            <b>${escapeHtml(t.name)}</b> — ${t.total - t.hits} error${t.total - t.hits === 1 ? '' : 'es'}
            de ${t.total} pregunta${t.total === 1 ? '' : 's'}${
              t.level === 'bajo' ? '. Lo tenías como dominado: conviene revisarlo de nuevo.' : '.'}
          </li>`).join('')}
      </ul>
      <p class="exam-advice-text">Cierra el simulacro y abre la <b>práctica</b> o las <b>flashcards</b>
      de cada uno desde su tarjeta.</p>
    </div>` : `
    <div class="exam-advice all-clear">
      <p class="exam-advice-title">Sin temas pendientes en esta prueba</p>
      <p class="exam-advice-text">Respondiste bien en todos los temas evaluados. Repite el simulacro más
      cerca de la evaluación para confirmar que se mantiene.</p>
    </div>`;

  examBodyEl.innerHTML = `
    <div class="exam-score-card">
      <div class="exam-grade ${examGradeClass(r.grade)}">
        <span class="exam-grade-value">${r.grade.toFixed(1)}</span>
        <span class="exam-grade-scale">/ 7.0</span>
      </div>
      <div class="exam-score-meta">
        <p class="exam-score-verdict">${escapeHtml(examVerdict(r.grade))}</p>
        <p class="exam-score-line">
          <b>${r.hits} de ${r.total}</b> correctas · ${r.pct}% de logro<br>
          Tiempo empleado: <b>${formatClock(r.seconds)}</b>${
            r.timeUp ? ' · se acabó el tiempo' : ''}
        </p>
      </div>
    </div>

    <p class="exam-section-title">Desglose por tema</p>
    <div class="exam-breakdown">
      ${r.byTopic.map(t => `
        <div class="exam-break-row${t.level ? ` lvl-${t.level}` : ''}">
          <span class="exam-break-name">${
            t.level && LEVELS[t.level] ? `<span aria-hidden="true">${LEVELS[t.level].dot}</span> ` : ''
          }${escapeHtml(t.name)}</span>
          <span class="exam-break-score">${t.hits}/${t.total}</span>
          <span class="exam-break-badge ${t.hits === t.total ? 'ok' : 'ko'}">${
            t.hits === t.total ? 'Logrado' : 'A repasar'}</span>
        </div>`).join('')}
    </div>

    ${adviceHtml}

    <p class="exam-section-title">Revisión pregunta por pregunta</p>
    <ol class="exam-review">
      ${s.questions.map((q, i) => renderExamReviewItem(q, i, s.answers[i])).join('')}
    </ol>`;

  renderExamFoot();
  examBodyEl.scrollTop = 0;
}

function renderExamReviewItem(q, i, answer){
  const answered = Number.isInteger(answer);
  const ok = answered && answer === q.correctIndex;
  return `
    <li class="exam-review-item">
      <div class="exam-review-head">
        <p class="exam-review-topic">${escapeHtml(q.topicTitle || 'Tema general')}</p>
        <span class="exam-review-verdict ${ok ? 'ok' : (answered ? 'ko' : 'skip')}">${
          ok ? 'Correcta' : (answered ? 'Incorrecta' : 'Sin responder')}</span>
      </div>
      <p class="exam-review-question">
        <span class="exam-review-num">${i + 1}</span>${escapeHtml(q.question)}
      </p>
      <div class="exam-review-options">
        ${q.options.map((opt, oi) => {
          const classes = ['exam-review-option'];
          if(oi === q.correctIndex) classes.push('correct');
          if(answered && oi === answer && !ok) classes.push('wrong');
          if(oi !== q.correctIndex && oi !== answer) classes.push('muted');
          const tag = oi === q.correctIndex
            ? 'Correcta'
            : (answered && oi === answer ? 'Tu respuesta' : '');
          return `
            <div class="${classes.join(' ')}">
              <span class="exam-review-mark" aria-hidden="true">${
                oi === q.correctIndex ? '✓' : (answered && oi === answer ? '✕' : '')}</span>
              <span class="exam-option-text">${escapeHtml(opt)}</span>
              ${tag ? `<span class="exam-review-tag">${tag}</span>` : ''}
            </div>`;
        }).join('')}
      </div>
      ${q.explanation ? `<div class="exam-review-why">${escapeHtml(q.explanation)}</div>` : ''}
    </li>`;
}

// El pie de resultados se repinta solo al guardar: rehacer el cuerpo entero
// mandaría el scroll de vuelta arriba justo después de leer la revisión.
function renderExamFoot(){
  const s = examState;
  if(!s || s.view !== 'results') return;
  examFootEl.innerHTML = `
    <span class="exam-foot-note${s.saved ? ' exam-saved-note' : ''}">${
      s.saved ? '✓ Resultado guardado en este navegador' : 'Guarda el resultado para recordar tu nota'}</span>
    <span class="exam-foot-actions">
      <button type="button" class="ghost-btn" data-action="close-exam">Cerrar</button>
      <button type="button" class="primary-btn" data-action="save-exam"${
        s.saved ? ' disabled' : ''}>${s.saved ? 'Guardado' : 'Guardar Resultado'}</button>
    </span>`;
}

/* --- Barra de lanzamiento --------------------------------------------------- */

function renderExamLaunch(){
  if(!examLaunchEl || !examLaunchNoteEl) return;
  if(!canRunExam(activeCourse)){
    examLaunchEl.hidden = true;
    return;
  }
  examLaunchEl.hidden = false;

  const topics = examTopicsPayload(activeCourse);
  const last = getLastExamAttempt(activeCourse);
  const base = `Rinde una prueba cronometrada sobre los <b>${topics.length} tema${
    topics.length === 1 ? '' : 's'}</b> de tu plan, cargada hacia los que peor dominas.`;

  examLaunchNoteEl.innerHTML = last
    ? `${base} Tu última nota en ${escapeHtml(activeCourse)}: <b>${last.grade.toFixed(1)}</b>
       (${last.hits} de ${last.total}).`
    : base;
}

/* --- Eventos ---------------------------------------------------------------- */

function onExamKeydown(ev){
  if(!examState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeExamSimulation(); return; }
  if(examState.view !== 'quiz') return;
  if(ev.target.closest('button') && (ev.key === ' ' || ev.key === 'Enter')) return;

  if(ev.key === 'ArrowLeft'){  ev.preventDefault(); goToExamQuestion(examState.index - 1); return; }
  if(ev.key === 'ArrowRight'){ ev.preventDefault(); goToExamQuestion(examState.index + 1); return; }

  // Atajos 1..9 para marcar alternativa sin soltar el teclado.
  const n = Number(ev.key);
  if(!Number.isInteger(n) || n < 1) return;
  const option = examBodyEl.querySelector(`.exam-option[data-option="${n - 1}"]`);
  if(option){ ev.preventDefault(); option.click(); }
}

if(examModalEl) examModalEl.addEventListener('click', ev => {
  if(!examState) return;

  const option = ev.target.closest('.exam-option[data-option]');
  if(option){ answerExam(Number(option.getAttribute('data-option'))); return; }

  const goto = ev.target.closest('[data-goto]');
  if(goto){ goToExamQuestion(Number(goto.getAttribute('data-goto'))); return; }

  const time = ev.target.closest('[data-time]');
  if(time){
    examState.timeChoice = time.getAttribute('data-time');
    renderExam();
    return;
  }

  const btn = ev.target.closest('[data-action]');
  if(!btn) return;
  switch(btn.getAttribute('data-action')){
    case 'close-exam':    closeExamSimulation(); break;
    case 'start-exam':    startExamSimulation(); break;
    case 'prev-question': goToExamQuestion(examState.index - 1); break;
    case 'next-question': goToExamQuestion(examState.index + 1); break;
    case 'submit-exam':   submitExam(); break;
    case 'save-exam':     saveExamResult(); break;
  }
});

if(startExamBtn) startExamBtn.addEventListener('click', () => openExamSimulation(activeCourse));

/* -------------------------------------------------------------------------
   8F. FICHA DE ESTUDIO IMPRIMIBLE (PDF)

   Todo lo que la app fue construyendo del ramo —el semáforo de temas, los pasos
   marcados, las prácticas resueltas y los mazos de flashcards— vive repartido en
   pantallas y modales distintos. La ficha lo junta en un solo documento pensado
   para leerse en papel: se arma con lo que YA está guardado, sin pedirle nada al
   Worker, así que se genera al instante y funciona sin conexión.

   El "PDF" lo produce el propio navegador: el botón de imprimir llama a
   `window.print()` y el bloque `@media print` de styles.css deja en la hoja solo
   `#cheat-sheet-content`. Por eso el encabezado del documento se arma aquí dentro
   y no en la barra del modal.
   ------------------------------------------------------------------------- */

// { course } mientras la ficha está abierta. No guarda el HTML: se rearma al
// abrir, para que refleje el último paso marcado.
let sheetState = null;

// La ficha se construye sobre los temas analizados: sin ellos no hay
// priorización, ni checklist, ni glosario que imprimir.
function canBuildCheatSheet(course){
  const ai = getAiAnalysis(course);
  return !!(ai && ai.topics && ai.topics.length);
}

function sheetDateLabel(){
  try{
    return new Date().toLocaleDateString('es-CL', { day:'numeric', month:'long', year:'numeric' });
  }catch(e){
    return new Date().toLocaleDateString();   // locale no disponible en el equipo
  }
}

/* --- Encabezado: ramo, evaluación, fecha y nivel de preparación ------------ */

function renderSheetHeader(course){
  const et = EXAM_TYPES[examKeyForWeight(getEvalWeight(course))];
  const effort = computeEffortPlan(course);
  const pct = readinessPct(course);
  const p = planProgress(course);
  const last = getLastExamAttempt(course);
  const done = diagnosticIsDone(course);

  const facts = [
    ['Emitida', sheetDateLabel()],
    ['Temas del plan', String(p.topics)],
    ['Nota meta', formatGrade(effort.target)],
    ['Presupuesto', `${formatHoursLabel(effort.hoursTotal)} · ${effort.exercisesTotal} ejercicios`],
    ['Checklist', p.stepsTotal ? `${p.stepsDone} de ${p.stepsTotal} pasos` : 'sin pasos'],
    ['Temas practicados', `${p.practiced} de ${p.topics}`],
    ['Último simulacro', last ? `${last.grade.toFixed(1)} (${last.hits} de ${last.total})` : 'sin rendir']
  ];

  return `
    <header class="sheet-header">
      <p class="sheet-eyebrow">Ficha de repaso · Agente de estudio UC</p>
      <h1 class="sheet-title">${escapeHtml(course)}</h1>
      <p class="sheet-sub">
        ${escapeHtml(et.label)} · ${escapeHtml(examWeightNote(course))} — plan generado con
        <b>Claude IA</b> sobre el temario de este ramo, apuntando a un
        <b>${formatGrade(effort.target)}</b>.
      </p>
      <div class="sheet-facts">
        ${facts.map(([k, v]) => `
          <p class="sheet-fact">
            <span class="sheet-fact-k">${escapeHtml(k)}</span>
            <span class="sheet-fact-v">${escapeHtml(v)}</span>
          </p>`).join('')}
      </div>
      <div class="sheet-readiness">
        <p class="sheet-readiness-head">
          <span class="sheet-readiness-label">Nivel de preparación</span>
          <span class="sheet-readiness-pct">${pct}%</span>
        </p>
        <span class="sheet-readiness-track">
          <span class="sheet-readiness-fill" style="width:${pct}%"></span>
        </span>
        <p class="sheet-readiness-note">${done
          ? 'Estimado con el mini test de diagnóstico, ponderando cada tema por su relevancia, más los pasos marcados y las prácticas resueltas.'
          : 'Todavía no rindes el mini test de diagnóstico: mientras no lo hagas, todos los temas cuentan como “por reforzar” y este porcentaje es solo un piso.'}</p>
      </div>
    </header>`;
}

/* --- Sección 1: priorización de contenidos -------------------------------- */

function renderSheetPriorities(course){
  const topics = topicsByUrgency(course);
  const counts = { alto: 0, medio: 0, bajo: 0 };
  topics.forEach(t => { counts[topicLevel(course, t)]++; });

  const rows = topics.map((t, i) => {
    const level = topicLevel(course, t);
    const steps = topicSteps(course, t);
    return `
      <tr class="sheet-row lvl-${level}">
        <td class="sheet-cell-num">${i + 1}</td>
        <td class="sheet-cell-name">${escapeHtml(t.name)}</td>
        <td class="sheet-cell-flag">
          <span class="sheet-flag lvl-${level}">${LEVELS[level].dot} ${
            escapeHtml(levelLabel(level, t.relevance))}</span>
        </td>
        <td>${escapeHtml(t.type)}</td>
        <td>${escapeHtml(t.relevance)}</td>
        <td class="sheet-cell-num">${steps.total ? `${steps.done}/${steps.total}` : '—'}${
          isPracticed(course, t.id) ? ' <span class="sheet-check">✓</span>' : ''}</td>
      </tr>`;
  }).join('');

  return `
    <section class="sheet-section">
      <h2 class="sheet-h2"><span class="sheet-h2-num">1</span> Priorización de contenidos</h2>
      <p class="sheet-lead">
        ${counts.alto
          ? 'Orden de ataque: primero lo rojo.'
          : 'Ningún tema está en urgencia crítica: el orden de abajo sigue igual de bien para repasar.'}
        ${counts.alto} tema${counts.alto === 1 ? '' : 's'} en urgencia crítica,
        ${counts.medio} en refuerzo y ${counts.bajo} dominado${counts.bajo === 1 ? '' : 's'}.
        La última columna resume los pasos marcados; el ✓ indica que ya resolviste la práctica del tema.
      </p>
      <table class="sheet-table">
        <thead>
          <tr>
            <th class="sheet-cell-num">#</th>
            <th>Tema</th>
            <th>Prioridad</th>
            <th>Tipo</th>
            <th>Relevancia</th>
            <th class="sheet-cell-num">Avance</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`;
}

/* --- Sección 2: plan de trabajo y checklist ------------------------------- */

function renderSheetPlan(course){
  const et = EXAM_TYPES[examKeyForWeight(getEvalWeight(course))];
  const cat = DATA[categoryOfCourse(course) || activeCat];
  const effort = computeEffortPlan(course);

  // Mismo presupuesto que muestra la app: las horas y los ejercicios que pide la
  // nota meta, repartidos entre los temas que identificó Claude IA. El método del
  // ramo acompaña a cada tema, en el orden de urgencia de la sección 1.
  const budgetRows = topicsByUrgency(course).map((t, i) => {
    const e = topicEffort(effort, t.id) || { hours: 0, exercises: 0 };
    const level = topicLevel(course, t);
    return `
      <tr class="sheet-row lvl-${level}">
        <td class="sheet-cell-when">${LEVELS[level].dot} ${escapeHtml(levelLabel(level, t.relevance))}</td>
        <td>
          <b>${escapeHtml(t.name)}</b>
          <span class="sheet-phase-focus">${escapeHtml(t.type)} · relevancia ${escapeHtml(t.relevance)}</span>
          <span class="sheet-phase-method">${escapeHtml(cat.techniques[i % cat.techniques.length])}</span>
        </td>
        <td class="sheet-cell-num">${escapeHtml(formatHoursLabel(e.hours))}<br>${e.exercises} ejercicios</td>
      </tr>`;
  }).join('');

  // Checklist por tema, en el mismo orden de urgencia de la sección 1. Las
  // casillas van como texto (☑ / ☐) y no como <input>: en papel se marcan a mano,
  // y un control de formulario no imprime de forma fiable en todos los navegadores.
  const d = getDiagnostic(course);
  const topics = topicsByUrgency(course);
  const checklist = topics.map(t => {
    const level = topicLevel(course, t);
    const checked = (d && Array.isArray(d.steps[t.id])) ? d.steps[t.id] : [];
    const steps = topicSteps(course, t);
    const items = t.studySteps.length
      ? t.studySteps.map((step, i) => `
          <li class="sheet-task${checked[i] ? ' done' : ''}">
            <span class="sheet-box" aria-hidden="true">${checked[i] ? '☑' : '☐'}</span>
            <span class="sheet-task-text">${escapeHtml(step)}</span>
          </li>`).join('')
      : `<li class="sheet-task"><span class="sheet-box" aria-hidden="true">☐</span>
           <span class="sheet-task-text">Este tema no trae pasos sugeridos: define tú el primero
           (releer la materia, rehacer un ejercicio tipo, resumir el modelo).</span></li>`;

    return `
      <article class="sheet-task-group lvl-${level}">
        <h3 class="sheet-h3">
          <span class="sheet-dot" aria-hidden="true">${LEVELS[level].dot}</span>
          <span class="sheet-h3-name">${escapeHtml(t.name)}</span>
          <span class="sheet-h3-meta">${steps.total ? `${steps.done}/${steps.total} pasos` : 'sin pasos'}${
            isPracticed(course, t.id) ? ` · práctica resuelta ${escapeHtml(practicedScore(course, t.id))}` : ''}</span>
        </h3>
        <ul class="sheet-tasks">${items}</ul>
      </article>`;
  }).join('');

  return `
    <section class="sheet-section">
      <h2 class="sheet-h2"><span class="sheet-h2-num">2</span> Plan de trabajo y checklist</h2>
      <p class="sheet-lead">
        Presupuesto para ${escapeHtml(et.label.toLowerCase())} (${escapeHtml(examWeightNote(course))}) apuntando a un
        <b>${formatGrade(effort.target)}</b>: <b>${formatHoursLabel(effort.hoursTotal)}</b> y
        <b>${effort.exercisesTotal} ejercicios</b> repartidos según la brecha de cada tema, más las tareas
        pendientes. Lo que ya marcaste en la app aparece con ☑; lo demás queda con casilla en blanco para
        tacharlo a mano.
      </p>
      <table class="sheet-table sheet-plan-table">
        <thead><tr><th>Prioridad</th><th>Tema y método</th><th class="sheet-cell-num">Carga</th></tr></thead>
        <tbody>${budgetRows}</tbody>
      </table>
      <div class="sheet-tasks-wrap">${checklist}</div>
    </section>`;
}

/* --- Sección 3: glosario, fórmulas y conceptos clave ---------------------- */

function renderSheetGlossary(course){
  const topics = topicsByUrgency(course);
  const groups = topics
    .map(t => ({ topic: t, cards: getCachedFlashcards(course, t.id) || [] }))
    .filter(g => g.cards.length);

  const totalCards = groups.reduce((n, g) => n + g.cards.length, 0);

  const body = groups.length
    ? groups.map(g => `
        <div class="sheet-gloss-group">
          <h3 class="sheet-h3 sheet-gloss-topic">
            <span class="sheet-dot" aria-hidden="true">${LEVELS[topicLevel(course, g.topic)].dot}</span>
            <span class="sheet-h3-name">${escapeHtml(g.topic.name)}</span>
            <span class="sheet-h3-meta">${g.cards.length} concepto${g.cards.length === 1 ? '' : 's'}</span>
          </h3>
          ${g.cards.map(c => `
            <div class="sheet-gloss-item">
              <p class="sheet-gloss-term">${escapeHtml(c.front)}</p>
              <p class="sheet-gloss-def">${escapeHtml(c.back)}</p>
            </div>`).join('')}
        </div>`).join('')
    : `<p class="sheet-empty">
         Todavía no generaste flashcards. Abre un tema en el planificador y presiona
         <b>🎴 Flashcards</b>: los conceptos, definiciones y fórmulas que arme Claude quedan
         guardados y aparecerán aquí la próxima vez que emitas la ficha.
       </p>`;

  return `
    <section class="sheet-section sheet-break">
      <h2 class="sheet-h2"><span class="sheet-h2-num">3</span> Glosario, fórmulas y conceptos clave</h2>
      <p class="sheet-lead">${groups.length
        ? `${totalCards} concepto${totalCards === 1 ? '' : 's'} recopilado${totalCards === 1 ? '' : 's'} de
           ${groups.length} tema${groups.length === 1 ? '' : 's'}, en el mismo orden de prioridad.
           Tapa la columna derecha para usarlo como autoevaluación.`
        : 'Aquí se recopilan las flashcards que hayas generado por tema.'}</p>
      ${body}
    </section>`;
}

/* --- Documento completo ---------------------------------------------------- */

function renderCheatSheet(course){
  if(!sheetContentEl) return;
  sheetContentEl.innerHTML = `
    ${renderSheetHeader(course)}
    ${renderSheetPriorities(course)}
    ${renderSheetPlan(course)}
    ${renderSheetGlossary(course)}
    <footer class="sheet-footer">
      Agente de estudio · ${escapeHtml(careerInfo().label)} UC — ficha emitida el ${escapeHtml(sheetDateLabel())}
      a partir de tu propio avance guardado en este navegador.
    </footer>`;

  if(sheetSubtitleEl){
    const p = planProgress(course);
    sheetSubtitleEl.textContent = `${course} · ${p.topics} tema${p.topics === 1 ? '' : 's'} · ` +
      `${readinessPct(course)}% de preparación · ${sheetDateLabel()}`;
  }
}

/* --- Modal ----------------------------------------------------------------- */

function openCheatSheet(course){
  if(!sheetOverlayEl || !canBuildCheatSheet(course)) return;
  sheetState = { course };
  renderCheatSheet(course);
  sheetOverlayEl.hidden = false;
  // `sheet-open` es además lo que activa el bloque @media print: sin la ficha
  // abierta, imprimir la página sigue funcionando como en cualquier sitio.
  document.body.classList.add('modal-open', 'sheet-open');
  document.addEventListener('keydown', onCheatSheetKeydown);
  if(sheetModalEl) sheetModalEl.scrollTop = 0;
}

function closeCheatSheet(){
  if(!sheetState) return;
  sheetState = null;
  sheetOverlayEl.hidden = true;
  document.body.classList.remove('sheet-open');
  releaseModalLock();
  document.removeEventListener('keydown', onCheatSheetKeydown);
}

function onCheatSheetKeydown(ev){
  if(!sheetState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeCheatSheet(); }
}

if(sheetModalEl) sheetModalEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn) return;
  switch(btn.getAttribute('data-action')){
    case 'close-sheet': closeCheatSheet(); break;
    // El navegador es quien genera el PDF: en el diálogo de impresión el alumno
    // elige "Guardar como PDF" como destino.
    case 'print-sheet': window.print(); break;
  }
});

if(exportPdfBtn) exportPdfBtn.addEventListener('click', () => openCheatSheet(activeCourse));

// El botón vive en la barra de "plan guardado", que puede estar visible por otro
// ramo: si el ramo activo no tiene temas analizados, se deja a la vista pero
// desactivado, explicando qué falta.
function renderExportButton(){
  if(!exportPdfBtn) return;
  const ready = canBuildCheatSheet(activeCourse);
  exportPdfBtn.disabled = !ready;
  exportPdfBtn.title = ready
    ? 'Arma una ficha con la priorización, el checklist y el glosario de este ramo, lista para imprimir o guardar como PDF.'
    : 'Analiza el temario de este ramo con Claude IA para poder generar su ficha de estudio.';
}

/* -------------------------------------------------------------------------
   8F-bis. GUÍA DE ESTUDIO POR TEMA (10 ejercicios de certamen + pauta)

   La ficha de estudio (8F) resume el plan del ramo completo; esta es lo
   contrario: un solo tema, en profundidad y con trabajo que hacer. Es el
   documento que el alumno imprime para sentarse a resolver.

   La generación son DOS llamadas encadenadas al mismo endpoint del Worker
   (`/api/generate-study-guide`, con `stage`): primero el marco teórico y los 10
   enunciados, después la pauta de esos mismos enunciados. Partirlo evita que la
   respuesta se corte por el tope de tokens y deja mostrar avance real en vez de
   un spinner de dos minutos.

   El resultado se guarda en el registro del ramo (y por tanto en localStorage):
   son dos llamadas largas, así que volver a abrir la guía no gasta ninguna. Solo
   "Generar otra guía" pide una nueva.

   El "PDF" lo produce el navegador, igual que en la ficha: `window.print()` más
   el bloque `@media print` de styles.css, que deja en la hoja solo
   `#study-guide-doc`. Por eso el encabezado institucional del documento se arma
   aquí dentro y no en la barra del modal. Y como la pauta se imprime tal como se
   ve, ocultarla antes de imprimir entrega la guía en limpio para trabajarla.
   ------------------------------------------------------------------------- */

const GUIDE_ENDPOINT = `${String(WORKER_URL).replace(/\/+$/, '')}/api/generate-study-guide`;

// Cada etapa es una generación larga (miles de tokens), bastante más que
// cualquier otro modo: medidas contra el Worker desplegado, la de enunciados
// ronda los 35 s y la de la pauta entre 70 s y 2 min. El tope va sobre eso con
// margen, porque agotarlo bota una guía que ya costó dos generaciones.
const GUIDE_TIMEOUT_MS = 240000;
const GUIDE_EXERCISES = 10;         // lo que se le pide al Worker
const GUIDE_MAX_EXERCISES = 14;     // topes espejo de los del Worker
const MAX_GUIDE_PARTS = 5;
const MAX_GUIDE_PAST_QUESTIONS = 12;

// { course, topicId, name, relevance, type, level, status, stage, guia, pauta,
//   pautaOpen, error, controller }
let guideState = null;

/* --- Guía guardada (vive en el registro del ramo) ------------------------- */

function getStoredGuide(course, topicId){
  const d = getDiagnostic(course);
  const entry = d && d.guides ? d.guides[topicId] : null;
  if(!entry) return null;
  const guia = normalizeGuideDoc(entry.guia);
  if(!guia) return null;
  // La pauta puede faltar si se guardó una guía a medias (la segunda llamada
  // falló): la guía sirve igual, y el modal ofrece completarla.
  return { guia, pauta: normalizeGuidePauta(entry.pauta, guia.ejercicios), at: entry.at || 0 };
}

function hasStoredGuide(course, topicId){
  const d = getDiagnostic(course);
  const entry = d && d.guides ? d.guides[topicId] : null;
  return !!(entry && entry.guia && Array.isArray(entry.guia.ejercicios) && entry.guia.ejercicios.length);
}

// Guarda la guía del tema. Una guía completa son decenas de KB, así que aquí sí
// se puede llenar el almacenamiento: si eso pasa, se botan las guías más viejas
// del ramo (una a una, de la más antigua a la más nueva) y se reintenta. La
// última que queda es siempre la recién generada, que es la que el alumno tiene
// abierta.
function saveStoredGuide(course, topicId, guia, pauta){
  const d = getDiagnostic(course);
  if(!d) return false;
  d.guides[topicId] = { guia, pauta: pauta || null, at: Date.now() };

  while(!savePastEvals()){
    const older = Object.keys(d.guides)
      .filter(id => id !== topicId)
      .sort((a, b) => (d.guides[a].at || 0) - (d.guides[b].at || 0));
    if(!older.length){
      // Ni sola cabe: se deja en memoria para esta sesión y se avisa en consola.
      console.warn('No hay espacio en localStorage para guardar la guía de estudio.');
      return false;
    }
    delete d.guides[older[0]];
  }
  return true;
}

/* --- Saneado espejo del Worker --------------------------------------------
   Lo que llega del Worker ya viene acotado, pero lo que sale de localStorage
   puede ser de una versión anterior de la app o estar a medias. Se valida en los
   dos casos por la misma puerta, así el render nunca tiene que defenderse. */

function normalizeGuideExercises(raw){
  if(!Array.isArray(raw)) return [];
  const out = [];
  for(const item of raw){
    if(out.length >= GUIDE_MAX_EXERCISES) break;
    if(!item || typeof item !== 'object') continue;

    const contexto = String(item.contexto || '').trim();
    if(!contexto) continue;

    const partes = [];
    for(const p of (Array.isArray(item.partes) ? item.partes : [])){
      if(partes.length >= MAX_GUIDE_PARTS) break;
      if(!p || typeof p !== 'object') continue;
      const enunciado = String(p.enunciado || '').trim();
      if(!enunciado) continue;
      partes.push({
        letra: String(p.letra || String.fromCharCode(97 + partes.length)).trim().slice(0, 1),
        enunciado,
        puntaje: Number.isFinite(Number(p.puntaje)) ? Math.round(Number(p.puntaje)) : 0
      });
    }
    if(!partes.length) continue;

    out.push({
      numero: out.length + 1,
      titulo: String(item.titulo || `Ejercicio ${out.length + 1}`).trim(),
      origen: item.origen === 'pasada' ? 'pasada' : 'original',
      contexto,
      partes,
      puntaje: partes.reduce((n, p) => n + p.puntaje, 0)
    });
  }
  return out;
}

function normalizeGuideDoc(raw){
  if(!raw || typeof raw !== 'object') return null;
  const ejercicios = normalizeGuideExercises(raw.ejercicios);
  if(!ejercicios.length) return null;

  const marco = (raw.marcoTeorico && typeof raw.marcoTeorico === 'object') ? raw.marcoTeorico : {};
  const conceptos = (Array.isArray(marco.conceptos) ? marco.conceptos : [])
    .filter(c => c && c.nombre && c.explicacion)
    .map(c => ({ nombre: String(c.nombre).trim(), explicacion: String(c.explicacion).trim() }));
  const formulas = (Array.isArray(marco.formulas) ? marco.formulas : [])
    .filter(f => f && f.nombre && f.expresion)
    .map(f => ({
      nombre: String(f.nombre).trim(),
      expresion: String(f.expresion).trim(),
      cuandoUsar: String(f.cuandoUsar || '').trim()
    }));

  return {
    titulo: String(raw.titulo || 'Guía de estudio').trim(),
    resumen: String(raw.resumen || '').trim(),
    marcoTeorico: { conceptos, formulas },
    ejercicios
  };
}

// La pauta se ancla a los ejercicios: se recorre la guía, no la respuesta. Una
// pauta que no cubra ningún ejercicio se descarta entera.
function normalizeGuidePauta(raw, ejercicios){
  if(!Array.isArray(raw) || !Array.isArray(ejercicios) || !ejercicios.length) return null;

  const byNumber = new Map();
  raw.forEach((item, i) => {
    if(!item || typeof item !== 'object') return;
    const n = Number.isFinite(Number(item.numero)) ? Math.round(Number(item.numero)) : i + 1;
    if(!byNumber.has(n)) byNumber.set(n, item);
  });

  let conDesarrollo = 0;
  const pauta = ejercicios.map(ej => {
    const item = byNumber.get(ej.numero);
    const partesRaw = (item && Array.isArray(item.partes)) ? item.partes : [];
    const porLetra = new Map();
    partesRaw.forEach((p, i) => {
      if(!p || typeof p !== 'object') return;
      const letra = String(p.letra || String.fromCharCode(97 + i)).trim().slice(0, 1);
      if(!porLetra.has(letra)) porLetra.set(letra, p);
    });

    const partes = ej.partes.map((parte, i) => {
      const p = porLetra.get(parte.letra) || partesRaw[i];
      const desarrollo = p ? String(p.desarrollo || '').trim() : '';
      if(desarrollo) conDesarrollo++;
      return {
        letra: parte.letra,
        desarrollo,
        respuesta: p ? String(p.respuesta || '').trim() : ''
      };
    });

    const criterios = ((item && Array.isArray(item.criterios)) ? item.criterios : [])
      .map(c => String(c || '').trim())
      .filter(Boolean);

    return { numero: ej.numero, partes, criterios };
  });

  return conDesarrollo ? pauta : null;
}

/* --- Llamada al Worker ----------------------------------------------------- */

// Una etapa de la generación. `stage` es "ejercicios" o "pauta"; `extra` lleva
// lo que solo necesita esa etapa (los enunciados ya generados, en la segunda).
async function requestGuideStage(course, topic, stage, extra, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El generador de guías todavía no está configurado en este sitio.');
  }

  const payload = Object.assign({
    action: 'generateStudyGuide',
    stage,
    topicTitle: topic.name,
    courseName: courseForAi(course),
    career: careerInfo().label,
    topicRelevance: topic.relevance,
    topicType: topic.type,
    tipoEvaluacion: examTypeForAi(course)
  }, extra || {});

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), GUIDE_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(GUIDE_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'La guía tardó demasiado en generarse. Inténtalo de nuevo.'
      : 'No se pudo conectar con el generador de guías. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  let bodyFailed = false;
  try{ data = await response.json(); }catch(e){ bodyFailed = true; }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));

  // Una guía son decenas de KB: si la conexión se corta mientras llega el cuerpo,
  // `.json()` falla con la respuesta ya en 200. Eso es un problema de red, no una
  // guía vacía, y decírselo así al alumno le ahorra reintentos que no van a
  // funcionar hasta que la conexión mejore.
  if(bodyFailed){
    throw new Error('La respuesta llegó incompleta. Revisa tu conexión y vuelve a intentarlo.');
  }
  return data || {};
}

/* --- Modal ---------------------------------------------------------------- */

function openStudyGuide(course, topicId, { regenerate = false } = {}){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !guideOverlayEl) return;

  if(guideState && guideState.controller) guideState.controller.abort();

  const stored = regenerate ? null : getStoredGuide(course, topicId);
  guideState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    type: topic.type,
    level: topicLevel(course, topic),
    status: stored ? 'ready' : 'loading',
    stage: stored ? 'listo' : 'ejercicios',
    guia: stored ? stored.guia : null,
    pauta: stored ? stored.pauta : null,
    // La pauta arranca oculta siempre: la guía es para intentarla primero.
    pautaOpen: false,
    error: '',
    controller: stored ? null : new AbortController()
  };

  guideOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onStudyGuideKeydown);
  renderStudyGuide();

  if(stored) return;
  generateStudyGuide(course, topic, guideState);
}

// Las dos etapas encadenadas. Se le pasa el estado con el que arrancó para poder
// abandonar en silencio si el alumno cerró el modal o pidió otro tema.
function generateStudyGuide(course, topic, state){
  const alive = () => guideState === state && !state.controller.signal.aborted;

  requestGuideStage(course, topic, 'ejercicios', {
    numQuestions: GUIDE_EXERCISES,
    // Los ejercicios reales del ramo que hablan de este tema: son la fuente
    // prioritaria de la guía.
    pastQuestions: pastQuestionsForTopic(course, topic.name, MAX_GUIDE_PAST_QUESTIONS)
  }, state.controller.signal)
    .then(data => {
      if(!alive()) return null;
      const guia = normalizeGuideDoc(data && data.guia);
      if(!guia) throw new Error('Los ejercicios llegaron vacíos. Inténtalo de nuevo.');

      // La mitad cara ya está: se guarda antes de pedir la pauta, para que
      // cerrar la pestaña (o un fallo en la segunda llamada) no obligue a
      // volver a generar los enunciados. En pantalla todavía no se muestra —el
      // documento se pinta una sola vez, al final— pero el paso sí avanza.
      state.guia = guia;
      state.stage = 'pauta';
      saveStoredGuide(course, state.topicId, guia, null);
      renderStudyGuide();

      return requestGuideStage(course, topic, 'pauta', {
        ejercicios: guia.ejercicios
      }, state.controller.signal);
    })
    .then(data => {
      if(!data || !alive()) return;
      state.pauta = normalizeGuidePauta(data && data.pauta, state.guia.ejercicios);
      state.status = 'ready';
      state.stage = 'listo';
      state.controller = null;
      saveStoredGuide(course, state.topicId, state.guia, state.pauta);
      renderStudyGuide();
      renderDiagnostic();   // el botón de la tarjeta pasa a "Ver mi guía"
    })
    .catch(err => {
      if(guideState !== state || state.controller.signal.aborted) return;
      // Si la primera etapa sí llegó, la guía se publica sin pauta en vez de
      // perderse: los enunciados son la mitad que cuesta más generar.
      if(state.guia){
        state.status = 'ready';
        state.stage = 'sin-pauta';
        state.pauta = null;
        state.controller = null;
        renderStudyGuide();
        renderDiagnostic();
        return;
      }
      state.status = 'error';
      state.error = err.message || 'No se pudo generar la guía de este tema.';
      state.controller = null;
      renderStudyGuide();
    });
}

function closeStudyGuide(){
  if(!guideState) return;
  if(guideState.controller) guideState.controller.abort();
  guideState = null;
  guideOverlayEl.hidden = true;
  document.body.classList.remove('guide-open', 'guide-pauta-open');
  releaseModalLock();
  document.removeEventListener('keydown', onStudyGuideKeydown);
}

function onStudyGuideKeydown(ev){
  if(!guideState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeStudyGuide(); }
}

/* --- Render ---------------------------------------------------------------- */

function guideDateLabel(at){
  const d = at ? new Date(at) : new Date();
  try{
    return d.toLocaleDateString('es-CL', { day:'numeric', month:'long', year:'numeric' });
  }catch(e){
    return d.toLocaleDateString();   // locale no disponible en el equipo
  }
}

// Texto del modelo con saltos de línea → párrafos, ya escapado. Los desarrollos
// de la pauta vienen con un paso por línea, así que el salto es información.
function guideParagraphs(text, cls){
  return String(text || '').split('\n')
    .map(t => t.trim())
    .filter(Boolean)
    .map(t => `<p class="${cls}">${escapeHtml(t)}</p>`)
    .join('');
}

function renderStudyGuide(){
  if(!guideState || !guideModalEl) return;
  const s = guideState;

  guideTitleEl.textContent = s.name;
  guideModalEl.classList.remove('lvl-alto', 'lvl-medio', 'lvl-bajo');
  guideModalEl.classList.add(`lvl-${s.level}`);

  const ready = s.status === 'ready' && !!s.guia;
  guideErrorEl.hidden = s.status !== 'error';
  guideDocEl.hidden   = !ready;
  guideFootEl.hidden  = !ready;
  guideLoadingEl.hidden = ready || s.status !== 'loading';

  // `guide-open` es lo que activa el bloque @media print de esta guía: sin ella
  // abierta, imprimir la página sigue funcionando como en cualquier sitio.
  document.body.classList.toggle('guide-open', ready);

  if(s.status === 'error'){
    guideSubtitleEl.textContent = '';
    guideErrorTextEl.textContent = s.error;
    return;
  }

  if(!ready){
    const enPauta = s.stage === 'pauta';
    guideSubtitleEl.textContent = enPauta
      ? 'Paso 2 de 2 · escribiendo la pauta de solución...'
      : 'Paso 1 de 2 · redactando los ejercicios...';
    guideLoadingTextEl.textContent = enPauta
      ? 'Escribiendo la pauta de solución...'
      : 'Redactando los 10 ejercicios...';
    if(guideStepsEl){
      // Los dos primeros hitos salen de la misma llamada, así que avanzan juntos.
      guideStepsEl.querySelectorAll('.guide-step').forEach(li => {
        const step = Number(li.getAttribute('data-step'));
        li.classList.toggle('done', enPauta && step <= 2);
        li.classList.toggle('active', enPauta ? step === 3 : step <= 2);
      });
    }
    return;
  }

  const total = s.guia.ejercicios.length;
  const pasadas = s.guia.ejercicios.filter(e => e.origen === 'pasada').length;
  const nuevos = total - pasadas;
  guideSubtitleEl.textContent =
    `${total} ejercicio${total === 1 ? '' : 's'} de nivel certamen · ` +
    `${pasadas} de tus evaluaciones pasadas · ${nuevos} original${nuevos === 1 ? '' : 'es'}` +
    (s.pauta ? ' · con pauta de solución' : ' · sin pauta (falló el segundo paso)');

  renderGuideDoc(s);
  renderGuidePautaToggle(s);

  if(guideModalEl) guideModalEl.scrollTop = 0;
}

// El botón de la pauta y la visibilidad de su sección. Se llama también al
// alternarla, así que no rearma el documento entero.
function renderGuidePautaToggle(s){
  const section = guideDocEl.querySelector('#study-guide-pauta');
  if(section) section.hidden = !s.pautaOpen;
  // Con la pauta a la vista, al imprimir no se deja espacio para desarrollar a
  // mano: esa copia es para estudiar, no para resolver (ver @media print).
  document.body.classList.toggle('guide-pauta-open', !!s.pautaOpen);

  if(!guidePautaBtn) return;
  const has = !!s.pauta;
  guidePautaBtn.disabled = !has;
  guidePautaBtn.setAttribute('aria-expanded', String(has && s.pautaOpen));
  guidePautaBtn.textContent = !has
    ? '👁️ Pauta no disponible'
    : (s.pautaOpen ? '🙈 Ocultar pauta de solución' : '👁️ Mostrar pauta de solución');
  guidePautaBtn.title = !has
    ? 'La pauta no se generó. Usa "Generar otra guía" para volver a intentarlo.'
    : (s.pautaOpen
        ? 'Oculta la pauta. Lo que se imprime es lo que ves: sin ella, sale la guía en limpio.'
        : 'Muestra la solución paso a paso y los criterios de corrección de los 10 ejercicios.');
}

function renderGuideDoc(s){
  const g = s.guia;
  const info = careerInfo();
  const et = EXAM_TYPES[examKeyForWeight(getEvalWeight(s.course))];
  const pasadas = g.ejercicios.filter(e => e.origen === 'pasada').length;
  const puntaje = g.ejercicios.reduce((n, e) => n + e.puntaje, 0);

  const facts = [
    ['Ejercicios', String(g.ejercicios.length)],
    ['De evaluaciones pasadas', String(pasadas)],
    ['Originales', String(g.ejercicios.length - pasadas)],
    ['Puntaje total', `${puntaje} pts`],
    ['Emitida', guideDateLabel()]
  ];

  guideDocEl.innerHTML = `
    <header class="guide-header">
      <p class="guide-inst">${escapeHtml(info.faculty)}</p>
      <p class="guide-eyebrow">${escapeHtml(s.course)} · ${escapeHtml(et.label)} · Guía de ejercicios</p>
      <h1 class="guide-doc-title">${escapeHtml(g.titulo)}</h1>
      ${g.resumen ? `<p class="guide-lead">${escapeHtml(g.resumen)}</p>` : ''}
      <div class="guide-facts">
        ${facts.map(([k, v]) => `
          <p class="guide-fact">
            <span class="guide-fact-k">${escapeHtml(k)}</span>
            <span class="guide-fact-v">${escapeHtml(v)}</span>
          </p>`).join('')}
      </div>
    </header>

    ${renderGuideMarco(g.marcoTeorico)}
    ${renderGuideEjercicios(g.ejercicios)}
    ${renderGuidePauta(s)}

    <footer class="guide-footer">
      Agente de estudio · ${escapeHtml(info.label)} UC — guía generada con <b>Claude IA</b>
      el ${escapeHtml(guideDateLabel())} a partir de las evaluaciones pasadas de
      ${escapeHtml(s.course)} guardadas en este navegador. Los ejercicios marcados como
      originales son simulaciones del nivel del certamen, no preguntas oficiales del curso.
    </footer>`;
}

function renderGuideMarco(marco){
  const hasContent = marco.conceptos.length || marco.formulas.length;
  if(!hasContent) return '';

  return `
    <section class="guide-section">
      <h2 class="guide-h2"><span class="guide-h2-num">I</span>Formulario y marco teórico clave</h2>
      <p class="guide-section-note">Lo que necesitas tener a mano para resolver la guía. No trae
      la solución de ningún ejercicio: es la caja de herramientas, no la pauta.</p>

      ${marco.formulas.length ? `
        <div class="guide-formulas">
          ${marco.formulas.map(f => `
            <div class="guide-formula">
              <p class="guide-formula-name">${escapeHtml(f.nombre)}</p>
              <p class="guide-formula-expr">${escapeHtml(f.expresion)}</p>
              ${f.cuandoUsar ? `<p class="guide-formula-when">${escapeHtml(f.cuandoUsar)}</p>` : ''}
            </div>`).join('')}
        </div>` : ''}

      ${marco.conceptos.length ? `
        <div class="guide-concepts">
          ${marco.conceptos.map(c => `
            <div class="guide-concept">
              <p class="guide-concept-name">${escapeHtml(c.nombre)}</p>
              ${guideParagraphs(c.explicacion, 'guide-concept-text')}
            </div>`).join('')}
        </div>` : ''}
    </section>`;
}

function renderGuideEjercicios(ejercicios){
  return `
    <section class="guide-section guide-break">
      <h2 class="guide-h2"><span class="guide-h2-num">II</span>Ejercicios</h2>
      <p class="guide-section-note">Resuélvelos con lápiz y papel antes de mirar la pauta.
      Los marcados como <b>de evaluación pasada</b> salen del material que subiste a este ramo;
      los <b>originales</b> están escritos con el mismo formato y nivel de exigencia.</p>

      ${ejercicios.map(ej => `
        <article class="guide-ex">
          <div class="guide-ex-head">
            <span class="guide-ex-num">${ej.numero}</span>
            <span class="guide-ex-title">${escapeHtml(ej.titulo)}</span>
            <span class="guide-ex-tags">
              <span class="guide-tag ${ej.origen === 'pasada' ? 'is-past' : 'is-new'}">${
                ej.origen === 'pasada' ? 'De evaluación pasada' : 'Original'}</span>
              ${ej.puntaje ? `<span class="guide-tag is-pts">${ej.puntaje} pts</span>` : ''}
            </span>
          </div>
          <div class="guide-ex-context">${guideParagraphs(ej.contexto, 'guide-ex-text')}</div>
          <ol class="guide-parts">
            ${ej.partes.map(p => `
              <li class="guide-part">
                <span class="guide-part-letter">${escapeHtml(p.letra)})</span>
                <span class="guide-part-text">${escapeHtml(p.enunciado)}${
                  p.puntaje ? ` <span class="guide-part-pts">(${p.puntaje} pts)</span>` : ''}</span>
              </li>`).join('')}
          </ol>
          <div class="guide-work" aria-hidden="true"></div>
        </article>`).join('')}
    </section>`;
}

// La pauta va siempre en el documento (para que imprimirla no exija rearmarlo),
// pero nace con `hidden`: la muestra el botón del pie, y al imprimir sale solo si
// está a la vista.
function renderGuidePauta(s){
  if(!s.pauta){
    return `
      <section class="guide-section guide-break guide-pauta" id="study-guide-pauta" hidden>
        <h2 class="guide-h2"><span class="guide-h2-num">III</span>Pauta de solución paso a paso</h2>
        <p class="guide-section-note">La pauta de esta guía no alcanzó a generarse.
        Usa “Generar otra guía” para volver a intentarlo.</p>
      </section>`;
  }

  const porNumero = new Map(s.guia.ejercicios.map(e => [e.numero, e]));

  return `
    <section class="guide-section guide-break guide-pauta" id="study-guide-pauta" hidden>
      <h2 class="guide-h2"><span class="guide-h2-num">III</span>Pauta de solución paso a paso</h2>
      <p class="guide-section-note">Desarrollo completo de cada parte y criterios de corrección.
      Compárala con tu desarrollo, no solo con tu resultado: en el certamen el puntaje está en el
      procedimiento.</p>

      ${s.pauta.map(p => {
        const ej = porNumero.get(p.numero);
        return `
        <article class="guide-sol">
          <div class="guide-ex-head">
            <span class="guide-ex-num">${p.numero}</span>
            <span class="guide-ex-title">${escapeHtml(ej ? ej.titulo : `Ejercicio ${p.numero}`)}</span>
          </div>
          ${p.partes.map(parte => `
            <div class="guide-sol-part">
              <p class="guide-sol-letter">Parte ${escapeHtml(parte.letra)})</p>
              ${parte.desarrollo
                ? guideParagraphs(parte.desarrollo, 'guide-sol-step')
                : '<p class="guide-sol-step guide-sol-missing">Esta parte no quedó desarrollada en la pauta.</p>'}
              ${parte.respuesta ? `
                <p class="guide-sol-answer"><span class="guide-sol-answer-k">Respuesta</span>
                <span class="guide-sol-answer-v">${escapeHtml(parte.respuesta)}</span></p>` : ''}
            </div>`).join('')}
          ${p.criterios.length ? `
            <div class="guide-criteria">
              <p class="guide-criteria-title">Criterios de corrección</p>
              <ul class="guide-criteria-list">
                ${p.criterios.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
              </ul>
            </div>` : ''}
        </article>`;
      }).join('')}
    </section>`;
}

/* --- Acciones -------------------------------------------------------------- */

if(guideModalEl) guideModalEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn || !guideState) return;

  switch(btn.getAttribute('data-action')){
    case 'close-guide':
      closeStudyGuide();
      break;

    case 'retry-guide':
    case 'regenerate-guide':
      openStudyGuide(guideState.course, guideState.topicId, { regenerate: true });
      break;

    case 'toggle-pauta':
      if(!guideState.pauta) break;
      guideState.pautaOpen = !guideState.pautaOpen;
      renderGuidePautaToggle(guideState);
      break;

    // El PDF lo genera el navegador: en el diálogo de impresión el alumno elige
    // "Guardar como PDF" como destino.
    case 'print-guide':
      window.print();
      break;
  }
});

/* -------------------------------------------------------------------------
   8G. MICRO-CHAT DE CONTEXTO (dudas sueltas por tema)

   El resto de las herramientas del tema entregan material armado de una vez
   (una práctica, un mazo, una analogía). Esta es la que falta cuando la duda es
   chica y concreta: "¿y por qué acá se descuenta?". Se abre desde la tarjeta del
   tema y el Worker recibe siempre el ramo, el tema y su ficha, así que el alumno
   no tiene que explicar de qué está hablando.

   El hilo vive SOLO en memoria (`topicChatThreads`), a diferencia de las
   flashcards o la analogía, que se guardan en el registro del ramo: una
   conversación es del momento en que se está estudiando, y guardarla haría que
   al volver semanas después la IA retomara un hilo que el alumno ya no recuerda.
   Cambiar de tema y volver dentro de la misma sesión sí conserva lo conversado.
   ------------------------------------------------------------------------- */

const CHAT_TIMEOUT_MS = 45000;
// Topes espejo de los del Worker.
const MAX_CHAT_MESSAGE_CHARS = 1200;
const MAX_CHAT_HISTORY_TURNS = 12;
const MAX_CHAT_REPLY_CHARS   = 4000;

// { course, topicId, name, relevance, type, level, studySteps, pending, controller }
let topicChatState = null;

/* --- Hilos en memoria ------------------------------------------------------
   Cada mensaje es { role: 'user' | 'assistant', content, local?, error? }.
   `local` marca los globos que escribe la interfaz (la bienvenida) y `error` los
   avisos de fallo: ninguno de los dos viaja al Worker como historial, porque no
   son parte de la conversación con la IA. */

const topicChatThreads = new Map();
const topicChatKey = (course, topicId) => `${course}::${topicId}`;

function getTopicChatThread(course, topicId){
  const key = topicChatKey(course, topicId);
  if(!topicChatThreads.has(key)) topicChatThreads.set(key, []);
  return topicChatThreads.get(key);
}

// Los ids de tema ("tema_1", "tema_2"...) se reutilizan entre análisis: sin
// limpiar, un tema nuevo heredaría la conversación del que ocupaba ese id.
function clearTopicChatThreads(course){
  [...topicChatThreads.keys()].forEach(k => {
    if(k.startsWith(`${course}::`)) topicChatThreads.delete(k);
  });
}

/* --- Markdown simple ------------------------------------------------------
   La respuesta del chat es texto, no JSON: es el único lugar de la app donde el
   modelo escribe formato. Se soporta lo que se le pidió en el prompt (negritas,
   cursivas, listas, código en línea) y nada más. Todo pasa primero por
   escapeHtml, así que ni el modelo ni un mensaje pegado por el alumno pueden
   inyectar HTML: las etiquetas se agregan recién después, sobre texto ya
   neutralizado. */

function chatInline(text){
  let html = escapeHtml(text);
  html = html.replace(/`([^`\n]+)`/g, '<code>$1</code>');
  html = html.replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>');
  // Cursivas: se exige un borde de palabra a cada lado para no morder los
  // asteriscos y guiones bajos que aparecen dentro de una fórmula (r_t, 2*3).
  html = html.replace(/(^|[\s(¿¡"])\*([^*\n]+)\*(?=[\s.,;:)!?"]|$)/g, '$1<em>$2</em>');
  html = html.replace(/(^|[\s(¿¡"])_([^_\n]+)_(?=[\s.,;:)!?"]|$)/g, '$1<em>$2</em>');
  return html;
}

function chatMarkdownToHtml(text){
  const lines = String(text || '').replace(/\r\n?/g, '\n').split('\n');
  const out = [];
  let list = '';                                   // '', 'ul' u 'ol'
  const closeList = () => { if(list){ out.push(`</${list}>`); list = ''; } };

  for(const raw of lines){
    const line = raw.trim();
    if(!line){ closeList(); continue; }

    const bullet = line.match(/^[-*•]\s+(.+)$/);
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);

    if(bullet || numbered){
      const tag = bullet ? 'ul' : 'ol';
      if(list !== tag){ closeList(); out.push(`<${tag} class="chat-list">`); list = tag; }
      out.push(`<li>${chatInline((bullet || numbered)[1])}</li>`);
      continue;
    }

    closeList();
    // Los encabezados no se piden en el prompt, pero si aparece uno se muestra
    // como línea destacada en vez de dejar los almohadillados a la vista.
    const heading = line.match(/^#{1,6}\s+(.+)$/);
    out.push(heading
      ? `<p class="chat-lead">${chatInline(heading[1])}</p>`
      : `<p>${chatInline(line)}</p>`);
  }

  closeList();
  return out.join('');
}

/* --- Llamada al Worker ----------------------------------------------------- */

// Ruta propia del chat (el Worker también acepta `action: 'topicChat'` en la
// raíz, que es lo que usa el resto de la app).
const TOPIC_CHAT_ENDPOINT = `${String(WORKER_URL).replace(/\/+$/, '')}/api/topic-chat`;

async function requestTopicChat(state, userMessage, history, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('El chat de dudas todavía no está configurado en este sitio.');
  }

  const payload = {
    action: 'topicChat',
    course: courseForAi(state.course),
    topicTitle: state.name,
    // La ficha del tema tal como la muestra el planificador: con esto el tutor
    // sabe si el tema es cuantitativo y cuánto le está costando al alumno.
    topicData: {
      relevance: state.relevance,
      type: state.type,
      level: state.level,
      studySteps: state.studySteps
    },
    userMessage,
    history,
    tipoEvaluacion: examTypeForAi(state.course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(TOPIC_CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'La respuesta tardó demasiado. Vuelve a preguntar.'
      : 'No se pudo conectar con el servicio de dudas. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));

  const reply = String((data && data.reply) || '').trim().slice(0, MAX_CHAT_REPLY_CHARS);
  if(!reply) throw new Error('La respuesta llegó vacía. Vuelve a preguntar.');
  return reply;
}

/* --- Modal del chat -------------------------------------------------------- */

// Primer globo de un tema sin conversación: dice de qué se puede preguntar en
// vez de dejar el panel en blanco. Es local, no cuenta como turno de la IA.
function topicChatWelcome(topic){
  const quant = topic.type === 'Cuantitativo';
  return `Estás en **${topic.name}**. Pregúntame lo que se te haya quedado dando vueltas: ` +
    (quant
      ? 'cuándo se usa cada fórmula, por qué un paso va antes que otro, o pásame un caso y lo desarrollamos con números.'
      : 'una definición que se confunde con otra, el porqué de un supuesto, o cómo se responde esto en una prueba.') +
    '\n\nSi prefieres partir rápido, usa una de las tres preguntas de abajo.';
}

function openTopicChat(course, topicId){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !chatOverlayEl) return;

  // Cambiar de tema con el chat abierto cancela la respuesta en vuelo: pertenece
  // a la conversación anterior.
  if(topicChatState && topicChatState.controller) topicChatState.controller.abort();

  topicChatState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    type: topic.type,
    level: topicLevel(course, topic),
    studySteps: topic.studySteps,
    pending: false,
    controller: null
  };

  const thread = getTopicChatThread(course, topicId);
  if(thread.length === 0){
    thread.push({ role: 'assistant', content: topicChatWelcome(topic), local: true });
  }

  chatOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onTopicChatKeydown);
  renderTopicChat();

  // En escritorio el foco va al campo: se abre y se escribe. En móvil no, o el
  // teclado del sistema tapa la conversación apenas se abre el modal.
  if(chatInputEl && window.matchMedia('(min-width: 561px)').matches) chatInputEl.focus();
}

function closeTopicChat(){
  if(!topicChatState) return;
  const s = topicChatState;
  if(s.controller) s.controller.abort();

  // Si se cierra con una respuesta en vuelo, la pregunta queda sin contestar: se
  // saca del hilo para no mandarla como historial de algo que nunca se respondió.
  if(s.pending){
    const thread = getTopicChatThread(s.course, s.topicId);
    const last = thread[thread.length - 1];
    if(last && last.role === 'user') thread.pop();
  }

  topicChatState = null;
  chatOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onTopicChatKeydown);
}

function onTopicChatKeydown(ev){
  if(!topicChatState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeTopicChat(); }
}

function renderTopicChat(){
  if(!topicChatState || !chatMessagesEl) return;
  const s = topicChatState;

  chatTitleEl.textContent = s.name;
  if(chatScopeEl) chatScopeEl.textContent = s.name;
  chatSubtitleEl.textContent =
    `${s.type} · relevancia ${s.relevance.toLowerCase()} · ${LEVELS[s.level].label.toLowerCase()}`;
  chatModalEl.classList.remove('lvl-alto', 'lvl-medio', 'lvl-bajo');
  chatModalEl.classList.add(`lvl-${s.level}`);

  const thread = getTopicChatThread(s.course, s.topicId);
  chatMessagesEl.innerHTML = thread.map(m => `
    <div class="chat-msg is-${m.role === 'user' ? 'user' : 'ia'}${m.error ? ' is-error' : ''}">
      <span class="chat-who">${m.role === 'user' ? 'Tú' : 'Claude'}</span>
      <div class="chat-bubble">${m.role === 'user'
        ? `<p>${escapeHtml(m.content)}</p>`
        : chatMarkdownToHtml(m.content)}</div>
    </div>`).join('') + (s.pending ? `
    <div class="chat-msg is-ia is-pending">
      <span class="chat-who">Claude</span>
      <div class="chat-bubble">
        <span class="chat-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="chat-thinking">Pensando la respuesta...</span>
      </div>
    </div>` : '');

  // La conversación crece hacia abajo: lo último dicho es lo que hay que ver.
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;

  if(chatInputEl) chatInputEl.disabled = s.pending;
  if(chatSendBtn){
    chatSendBtn.disabled = s.pending;
    chatSendBtn.textContent = s.pending ? 'Enviando...' : 'Enviar';
  }
  if(chatChipsEl){
    chatChipsEl.querySelectorAll('.chat-chip').forEach(b => { b.disabled = s.pending; });
  }
}

async function sendTopicChatMessage(text){
  const s = topicChatState;
  if(!s || s.pending) return;

  const message = String(text || '').trim().slice(0, MAX_CHAT_MESSAGE_CHARS);
  if(!message) return;

  const thread = getTopicChatThread(s.course, s.topicId);
  // El historial es lo conversado ANTES de esta pregunta, sin los globos locales
  // ni los avisos de error. Se recorta a los últimos turnos: el Worker recorta
  // igual, y así no se manda de más.
  const history = thread
    .filter(m => !m.local && !m.error)
    .slice(-MAX_CHAT_HISTORY_TURNS)
    .map(m => ({ role: m.role, content: m.content }));

  thread.push({ role: 'user', content: message });
  s.pending = true;
  s.controller = new AbortController();
  renderTopicChat();

  try{
    const reply = await requestTopicChat(s, message, history, s.controller.signal);
    if(topicChatState !== s) return;                     // se cerró o se cambió de tema
    thread.push({ role: 'assistant', content: reply });
  }catch(err){
    if(topicChatState !== s || (s.controller && s.controller.signal.aborted)) return;
    thread.push({
      role: 'assistant',
      error: true,
      content: err.message || 'No se pudo responder tu duda. Inténtalo de nuevo.'
    });
  }finally{
    if(topicChatState === s){
      s.pending = false;
      s.controller = null;
      renderTopicChat();
      if(chatInputEl && window.matchMedia('(min-width: 561px)').matches) chatInputEl.focus();
    }
  }
}

if(chatModalEl) chatModalEl.addEventListener('click', ev => {
  if(!topicChatState) return;

  const close = ev.target.closest('[data-action="close-topic-chat"]');
  if(close){ closeTopicChat(); return; }

  // Los chips son atajos: mandan la pregunta completa que llevan escrita en el
  // atributo, no la etiqueta corta que se lee en el botón.
  const chip = ev.target.closest('[data-chat-quick]');
  if(chip && !chip.disabled) sendTopicChatMessage(chip.getAttribute('data-chat-quick'));
});

if(chatFormEl) chatFormEl.addEventListener('submit', ev => {
  ev.preventDefault();
  if(!topicChatState || !chatInputEl) return;
  const text = chatInputEl.value;
  if(!text.trim()) return;
  chatInputEl.value = '';
  sendTopicChatMessage(text);
});

/* -------------------------------------------------------------------------
   8H. CLASE GUIADA (sesión de estudio con el profesor IA)

   El chat de dudas lo lleva el alumno; esta es la vuelta contraria: una clase
   particular donde el que pregunta es el profesor y la sesión avanza por tres
   fases fijas —teoría, ejercicio guiado y pregunta de cierre— con un reloj
   corriendo, como un bloque de estudio de verdad.

   La fase en curso vive acá, en `studySessionState.phase`, y es lo que le dice
   al Worker qué pedirle al profesor en cada turno. Quién la mueve: el alumno con
   el botón del pie, o el propio profesor cuando da la fase por terminada. Lo
   segundo necesita una señal explícita —el Worker separa su línea de control y
   la devuelve como `nextPhase`—, porque el profesor anunciando el cambio en su
   texto no mueve nada: la clase se quedaría en la fase 1 dando vueltas y no
   llegaría nunca a la fase 3, que es donde se emite el veredicto y termina.

   La clase NO se guarda: vive en el estado del modal y se pierde al cerrarlo. Es
   a propósito y es distinto del chat (que sí sobrevive dentro de la sesión del
   navegador): una clase es una sentada completa, retomarla a medias tres días
   después no es retomar nada.

   Una clase NO es el tema completo: es un bloque del programa del tema (ver
   "Programa de sesiones por tema", en 7B). Un tema de 2 h son tres clases de 40
   minutos, y cada una sube el nivel de los ejercicios: fundamentos, intermedio,
   nivel examen.

   Lo único que queda es el resultado. Si el alumno responde bien la pregunta de
   cierre, el Worker devuelve `verdict: "logrado"` y aquí se traduce a lo que el
   planificador entiende: se anota la sesión como cumplida, su tiempo se descuenta
   del presupuesto del tema y el tema queda practicado. Si todavía quedan sesiones
   pendientes, el tema pasa (o se queda) en 🟡 en proceso; recién con la última
   sesión del programa pasa a 🟢 dominado y se marcan sus pasos.
   ------------------------------------------------------------------------- */

const SESSION_TIMEOUT_MS = 60000;      // un turno de clase es más largo que una duda suelta
// Topes espejo de los del Worker.
const MAX_SESSION_MESSAGE_CHARS = 1500;
const MAX_SESSION_HISTORY_TURNS = 16;
const MAX_SESSION_REPLY_CHARS   = 4500;

// La duración de cada clase la fija el programa del tema (bloques de 30 a 45
// min, ver splitHoursIntoSessions): aquí solo se avisa cuando se está acabando.
const SESSION_WARNING_SEC = 300;       // últimos 5 minutos
const SESSION_DANGER_SEC  = 60;

// Las tres fases, en orden. `key` es lo que viaja al Worker.
const SESSION_PHASES = [
  { key: 'teoria',   label: 'Teoría',   title: 'Fase 1 · El concepto',
    hint: 'Claude te explica el tema y cierra con una pregunta de comprensión.' },
  { key: 'practica', label: 'Práctica', title: 'Fase 2 · Ejercicio guiado',
    hint: 'Un ejercicio del nivel de la evaluación, resuelto por ti paso a paso.' },
  { key: 'cierre',   label: 'Cierre',   title: 'Fase 3 · Pregunta de cierre',
    hint: 'Una pregunta de síntesis. Si la respondes bien, el tema queda en verde.' }
];

// { course, topicId, name, relevance, type, level, studySteps, phase, thread,
//   pending, controller, durationSec, startedAt, accumulatedMs, paused, tickId,
//   timeUp, completed, sessionIndex, totalSessions, isExtra, pastQuestions }
let studySessionState = null;

/* --- Reloj de la clase -----------------------------------------------------
   Igual que el simulacro, el tiempo se mide contra el reloj y no restando de a
   un segundo: una pestaña en segundo plano ralentiza setInterval y regalaría
   minutos. La pausa se lleva acumulando lo corrido hasta ahí. */

function sessionElapsedSec(s){
  if(!s) return 0;
  const running = s.paused ? 0 : Date.now() - s.startedAt;
  return Math.max(0, Math.round((s.accumulatedMs + running) / 1000));
}

function sessionRemainingSec(s){
  if(!s || !s.durationSec) return 0;
  return Math.max(0, s.durationSec - sessionElapsedSec(s));
}

function stopSessionTimer(){
  if(studySessionState && studySessionState.tickId){
    clearInterval(studySessionState.tickId);
    studySessionState.tickId = 0;
  }
}

function startSessionTimer(){
  stopSessionTimer();
  if(!studySessionState) return;
  studySessionState.tickId = setInterval(sessionTick, 1000);
  updateSessionTimer();
}

// Solo toca el nodo del reloj: re-renderizar el modal entero cada segundo
// perdería lo que el alumno lleva escrito en el campo de respuesta.
function sessionTick(){
  const s = studySessionState;
  if(!s){ stopSessionTimer(); return; }
  updateSessionTimer();
  if(sessionRemainingSec(s) <= 0 && !s.timeUp){
    s.timeUp = true;
    stopSessionTimer();
    // El tiempo se acabó, pero la clase no se corta a la mitad de una explicación:
    // el bloque era una referencia, no un examen cronometrado.
    pushSessionNote(s, `⏱️ Se acabaron los ${Math.round(s.durationSec / 60)} minutos de la sesión. ` +
      'Puedes seguir hasta cerrar la fase en la que vas, o concluir aquí.');
    renderStudySession();
  }
}

function updateSessionTimer(){
  const s = studySessionState;
  if(!s || !sessionTimerEl) return;

  const remaining = sessionRemainingSec(s);
  sessionTimerEl.textContent = formatClock(remaining);
  sessionTimerEl.classList.toggle('is-paused', s.paused);
  sessionTimerEl.classList.toggle('is-warning', !s.paused && remaining <= SESSION_WARNING_SEC && remaining > SESSION_DANGER_SEC);
  sessionTimerEl.classList.toggle('is-danger', !s.paused && remaining <= SESSION_DANGER_SEC);
  sessionTimerEl.setAttribute('aria-label', s.paused
    ? `Clase en pausa. Tiempo restante: ${formatClock(remaining)}`
    : `Tiempo restante de la clase: ${formatClock(remaining)}`);

  if(sessionTimerBtn){
    sessionTimerBtn.textContent = s.paused ? '▶ Reanudar' : '⏸ Pausar';
    sessionTimerBtn.setAttribute('aria-label', s.paused
      ? 'Reanudar el temporizador de la clase'
      : 'Pausar el temporizador de la clase');
    // Sin tiempo por delante no hay nada que reanudar.
    sessionTimerBtn.disabled = s.timeUp;
  }
}

function toggleSessionTimer(){
  const s = studySessionState;
  if(!s || s.timeUp) return;
  if(s.paused){
    s.paused = false;
    s.startedAt = Date.now();
    startSessionTimer();
  } else {
    s.accumulatedMs += Date.now() - s.startedAt;
    s.paused = true;
    stopSessionTimer();
    updateSessionTimer();
  }
}

/* --- Material real del ramo para los ejercicios ----------------------------
   La regla dura de la clase es que los ejercicios de las fases 2 y 3 sean de
   prueba universitaria. La mejor forma de conseguirlo no es pedírselo al modelo,
   es darle los enunciados: las preguntas que el alumno subió de sus controles y
   pruebas pasadas. Se le mandan las que hablan del tema (por palabras del título)
   y, si ninguna calza, igual van algunas como muestra del formato y del nivel que
   se usa en el ramo. */

const MAX_SESSION_PAST_QUESTIONS = 12;   // espejo del tope del Worker
const MIN_PAST_QUESTION_CHARS = 15;

function pastQuestionsForTopic(course, topicName, limit){
  const max = limit || MAX_SESSION_PAST_QUESTIONS;
  const all = getAllQuestions(course)
    .map(q => String(q == null ? '' : q).replace(/\s+/g, ' ').trim())
    .filter(q => q.length >= MIN_PAST_QUESTION_CHARS);
  if(!all.length) return [];

  // Palabras con contenido del título del tema: las cortas y las de relleno no
  // sirven para reconocer de qué habla una pregunta.
  const words = normalizeTxt(String(topicName || ''))
    .split(/[^a-z0-9]+/)
    .filter(w => w.length > 4 && !STOPWORDS.has(w));

  const scored = all.map((q, i) => {
    const norm = normalizeTxt(q);
    return { q, i, score: words.reduce((acc, w) => acc + (norm.includes(w) ? 1 : 0), 0) };
  });
  // Primero las que mencionan el tema; entre iguales, se respeta el orden original.
  scored.sort((a, b) => (b.score - a.score) || (a.i - b.i));
  return scored.slice(0, max).map(x => x.q);
}

/* --- Llamada al Worker ----------------------------------------------------- */

const STUDY_SESSION_ENDPOINT = `${String(WORKER_URL).replace(/\/+$/, '')}/api/study-session`;

async function requestStudySession(state, userResponse, history, signal){
  if(!WORKER_URL || WORKER_URL.includes('tu-worker')){
    throw new Error('La clase guiada todavía no está configurada en este sitio.');
  }

  const payload = {
    action: 'studySession',
    course: courseForAi(state.course),
    topicTitle: state.name,
    // La ficha del tema tal como la muestra el planificador: con esto el profesor
    // sabe si el tema es cuantitativo y desde dónde tiene que partir.
    topicData: {
      relevance: state.relevance,
      type: state.type,
      level: state.level,
      studySteps: state.studySteps
    },
    currentPhase: SESSION_PHASES[state.phase].key,
    userResponse,
    history,
    sessionMinutes: Math.round(state.durationSec / 60),
    // Posición en el programa del tema: de aquí sale la profundidad de la clase
    // (sesión 1 = fundamentos, última = nivel examen).
    sessionIndex: state.sessionIndex,
    totalSessions: state.totalSessions,
    // Enunciados reales del ramo para que los ejercicios salgan de ahí y no de
    // la imaginación del modelo.
    pastQuestions: state.pastQuestions,
    tipoEvaluacion: examTypeForAi(state.course)
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), SESSION_TIMEOUT_MS);
  if(signal) signal.addEventListener('abort', () => controller.abort(), { once: true });

  let response;
  try{
    response = await fetch(STUDY_SESSION_ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  }catch(err){
    if(signal && signal.aborted) throw err;              // lo cerró el usuario
    throw new Error(err && err.name === 'AbortError'
      ? 'El profesor tardó demasiado en responder. Reintenta.'
      : 'No se pudo conectar con la clase guiada. Revisa tu conexión a internet.');
  }finally{
    clearTimeout(timer);
  }

  let data = null;
  try{ data = await response.json(); }catch(e){ /* cuerpo no JSON */ }

  if(!response.ok) throw new Error((data && data.error) || workerErrorMessage(response.status));

  const reply = String((data && data.reply) || '').trim().slice(0, MAX_SESSION_REPLY_CHARS);
  if(!reply) throw new Error('El profesor no respondió. Reintenta.');
  const verdict = (data && (data.verdict === 'logrado' || data.verdict === 'repasar')) ? data.verdict : null;

  // Señal de cambio de fase: el Worker la separa del texto del profesor y la
  // manda como número de fase (2 o 3). Es lo único que mueve `state.phase` sin
  // que el alumno apriete el botón, así que se valida contra las fases que
  // existen antes de creerle.
  const raw = Number(data && data.nextPhase);
  const nextPhase = Number.isInteger(raw) && raw >= 2 && raw <= SESSION_PHASES.length ? raw : null;

  return { reply, verdict, nextPhase };
}

/* --- El hilo de la clase ---------------------------------------------------
   Cada entrada es { role, content, kind }. `kind` distingue lo que dice la
   clase de lo que dice la aplicación: 'msg' son los turnos que viajan al Worker
   como historial, 'divider' los cambios de fase, 'note' los avisos (tiempo,
   errores) y 'done' la tarjeta de cierre. Solo 'msg' es conversación. */

function pushSessionNote(s, text, tone){
  s.thread.push({ kind: 'note', tone: tone || '', content: text });
}

function sessionHistory(s){
  return s.thread
    .filter(m => m.kind === 'msg')
    .slice(-MAX_SESSION_HISTORY_TURNS)
    .map(m => ({ role: m.role, content: m.content }));
}

/* --- Apertura y cierre ------------------------------------------------------ */

function openStudySession(course, topicId){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic || !sessionOverlayEl) return;

  // Empezar otra clase con una abierta cancela la anterior: el reloj y el hilo
  // eran de esa sesión.
  if(studySessionState) closeStudySession({ force: true });

  // El programa queda fijo al entrar a la primera clase del tema.
  const program = ensureSessionProgram(course, topicId);
  const minutes = program ? program.minutes : SESSION_BLOCK_MIN_MINUTES;
  const total = program ? program.total : 1;
  const done = program ? Math.min(program.done, total) : 0;
  // Con el programa terminado, volver a entrar es un repaso extra: se hace al
  // nivel de la última sesión (el más alto) y no suma al contador.
  const isExtra = done >= total;

  studySessionState = {
    course,
    topicId,
    name: topic.name,
    relevance: topic.relevance,
    type: topic.type,
    level: topicLevel(course, topic),
    studySteps: topic.studySteps,
    sessionIndex: Math.min(done + 1, total),
    totalSessions: total,
    isExtra,
    // Preguntas reales de las evaluaciones del ramo: son la primera fuente de los
    // ejercicios de las fases 2 y 3.
    pastQuestions: pastQuestionsForTopic(course, topic.name),
    phase: 0,
    thread: [],
    pending: false,
    controller: null,
    durationSec: minutes * 60,
    startedAt: Date.now(),
    accumulatedMs: 0,
    paused: false,
    tickId: 0,
    timeUp: false,
    completed: false
  };

  sessionOverlayEl.hidden = false;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onStudySessionKeydown);
  startSessionTimer();
  renderStudySession();

  // Fase 1: la abre el profesor, no el alumno.
  runSessionTurn('');
}

// `force` salta la confirmación: lo usan el cambio de ramo, el reinicio total y
// el arranque de otra clase, donde preguntar no tendría sentido.
function closeStudySession({ force = false } = {}){
  const s = studySessionState;
  if(!s) return;

  // Una clase a medias se pierde entera: vale la pena avisar. Si ya se completó
  // (o no ha empezado a hablar), no hay nada que perder.
  if(!force && !s.completed && s.thread.some(m => m.kind === 'msg' && m.role === 'user')){
    const ok = confirm(`Vas en la ${SESSION_PHASES[s.phase].title.toLowerCase()} de la clase de “${s.name}”.\n\n` +
      'Si sales ahora se pierde la conversación de la clase. ¿Salir igual?');
    if(!ok) return;
  }

  stopSessionTimer();
  if(s.controller) s.controller.abort();
  studySessionState = null;
  sessionOverlayEl.hidden = true;
  releaseModalLock();
  document.removeEventListener('keydown', onStudySessionKeydown);
}

function onStudySessionKeydown(ev){
  if(!studySessionState) return;
  if(ev.key === 'Escape'){ ev.preventDefault(); closeStudySession(); }
}

/* --- El flujo de la clase --------------------------------------------------- */

// Un turno: manda lo que escribió el alumno (o nada, si es la apertura de una
// fase) y publica la respuesta del profesor.
async function runSessionTurn(userResponse){
  const s = studySessionState;
  if(!s || s.pending) return;

  const text = String(userResponse || '').trim().slice(0, MAX_SESSION_MESSAGE_CHARS);
  // El historial es lo conversado ANTES de este turno.
  const history = sessionHistory(s);
  // La fase queda anotada en el turno del alumno igual que en el del profesor:
  // con eso se sabe si la fase en curso alcanzó a tener conversación.
  if(text) s.thread.push({ kind: 'msg', role: 'user', content: text, phase: s.phase });

  s.pending = true;
  s.controller = new AbortController();
  renderStudySession();

  // El cambio de fase no se puede hacer acá dentro: `s.pending` todavía está en
  // true y el turno con que se abre la fase siguiente se descartaría solo. Se
  // anota y se dispara al final, con el turno ya cerrado.
  let advanceTo = null;

  try{
    const { reply, verdict, nextPhase } = await requestStudySession(s, text, history, s.controller.signal);
    if(studySessionState !== s) return;                  // se cerró o se cambió de clase
    s.thread.push({ kind: 'msg', role: 'assistant', content: reply, phase: s.phase });
    if(verdict) applySessionVerdict(s, verdict);
    // Una fase se cierra recién cuando el alumno participó en ella: si el
    // profesor pide avanzar en el mismo turno con que se abre la fase, es un
    // error suyo y saltaría la clase entera sin que el alumno haga nada.
    else if(nextPhase && sessionUserTurns(s, s.phase) > 0) advanceTo = nextPhase - 1;
  }catch(err){
    if(studySessionState !== s || (s.controller && s.controller.signal.aborted)) return;
    pushSessionNote(s, err.message || 'No se pudo continuar la clase. Reintenta.', 'error');
  }finally{
    if(studySessionState === s){
      s.pending = false;
      s.controller = null;
      renderStudySession();
      focusSessionInput();
    }
  }

  if(advanceTo !== null && studySessionState === s) advanceSessionPhase({ to: advanceTo });
}

// Cuántas veces respondió el alumno dentro de una fase. Los turnos de apertura
// no cuentan: los pide la aplicación, no el alumno, y no dejan mensaje suyo.
function sessionUserTurns(s, phase){
  return s.thread.filter(m => m.kind === 'msg' && m.role === 'user' && m.phase === phase).length;
}

// Cambio de fase. Hay dos formas de llegar acá y las dos terminan igual: el
// alumno que aprieta el botón del pie, y el profesor que cerró la fase y lo
// avisó con su línea de control (`nextPhase`, ver requestStudySession). La fase
// nueva la abre siempre un turno del profesor, como la primera.
//
// `to` es el índice de la fase de destino. Nunca se salta más de una fase por
// vez, aunque la pidan: cada fase necesita su propio turno de apertura para que
// el profesor sepa desde dónde parte.
function advanceSessionPhase({ to } = {}){
  const s = studySessionState;
  if(!s || s.pending || s.completed) return;

  const last = SESSION_PHASES.length - 1;
  const wanted = Number.isInteger(to) ? to : s.phase + 1;
  const target = Math.min(wanted, s.phase + 1, last);
  if(target <= s.phase) return;

  s.phase = target;
  s.thread.push({ kind: 'divider', phase: s.phase });
  renderStudySession();
  runSessionTurn('');
}

/* --- El resultado: lo único que sobrevive a la clase ------------------------
   El veredicto de la fase 3 lo emite el profesor y lo separa el Worker. Aquí se
   traduce al estado que el planificador ya sabe leer, y de ahí el presupuesto de
   horas y ejercicios del ramo se recalcula solo. */

function applySessionVerdict(s, verdict){
  if(verdict !== 'logrado'){
    s.completed = true;
    pushSessionNote(s, `La sesión ${s.sessionIndex} de ${s.totalSessions} no se da por cumplida: el profesor ` +
      'vio que el tema todavía no está afirmado, así que no se descuenta tiempo del programa. ' +
      'Repite esta misma sesión cuando lo hayas repasado.', 'warn');
    return;
  }

  const ai = getAiAnalysis(s.course);
  const topic = ai && ai.topics.find(t => t.id === s.topicId);
  const d = getDiagnostic(s.course);
  if(!topic || !d){ s.completed = true; return; }

  // El "antes" se calcula con el estado todavía sin tocar: es lo que permite
  // decirle al alumno cuánto le bajó el presupuesto por hacer la clase.
  const before = computeEffortPlan(s.course);
  const beforeTopic = topicEffort(before, s.topicId);

  // Se anota la sesión y se descuenta su tiempo del programa del tema. Un repaso
  // extra (programa ya terminado) suma el tiempo trabajado, pero no inventa una
  // sesión que no estaba en el plan.
  const program = ensureSessionProgram(s.course, s.topicId);
  const minutes = Math.round(s.durationSec / 60);
  if(program){
    if(!s.isExtra) program.done = Math.min(program.total, program.done + 1);
    program.spentMin = (program.spentMin || 0) + minutes;
    program.updatedAt = Date.now();
  }
  const lastOne = !program || s.isExtra || program.done >= program.total;

  // Resolver ejercicios de nivel de prueba es práctica, valga la sesión que
  // valga: cuenta desde la primera.
  markPracticed(s.course, s.topicId, { hits: 1, total: 1 });

  if(lastOne){
    d.levels[s.topicId] = 'bajo';                     // 🟢 dominado
    // El programa completo cubrió los pasos sugeridos del tema: quedan marcados.
    if(Array.isArray(topic.studySteps) && topic.studySteps.length){
      d.steps[s.topicId] = topic.studySteps.map(() => true);
    }
  } else if(d.levels[s.topicId] === 'alto'){
    // Quedan sesiones: el tema avanza a 🟡 en proceso, pero no se cierra.
    d.levels[s.topicId] = 'medio';
  }
  savePastEvals();

  const after = computeEffortPlan(s.course);
  const afterTopic = topicEffort(after, s.topicId);

  s.completed = true;
  s.level = topicLevel(s.course, topic);
  s.sessionsDone = program ? program.done : s.totalSessions;
  s.thread.push({
    kind: 'done',
    last: lastOne,
    extra: s.isExtra,
    sessionIndex: s.sessionIndex, totalSessions: s.totalSessions,
    sessionsDone: program ? program.done : s.totalSessions,
    minutes,
    // Los totales del ramo se comparan por lo que QUEDA: al completar una sesión
    // intermedia el bruto casi no se mueve, lo que baja es el saldo.
    hoursBefore: before.hoursRemaining, hoursAfter: after.hoursRemaining,
    exBefore: before.exercisesRemaining, exAfter: after.exercisesRemaining,
    topicHoursBefore: beforeTopic ? beforeTopic.remainingHours : 0,
    topicHoursAfter:  afterTopic ? afterTopic.remainingHours : 0,
    readiness: readinessPct(s.course)
  });

  // Lo que hay detrás del modal ya no dice la verdad: el tema cambió de color,
  // la barra subió y el presupuesto del ramo bajó.
  if(s.course === activeCourse){
    renderDiagnostic();
    renderPlanner();
    renderPlanState();
  }
}

/* --- Dar por pasada la clase: una sesión, o el tema entero -------------------
   Dos atajos para el que ya sabe la materia, y la diferencia entre los dos es
   toda la unidad que aprueban:

     · aprobar esta lección  → suma 1 al programa (sesión 2 de 4). El tema queda
                               🟡 en proceso mientras le falten sesiones.
     · dar el tema por pasado → cierra el programa completo de una (🟢 dominado).

   El semáforo sigue siendo del alumno en los dos casos: la tarjeta del tema
   tiene el selector de nivel para volver atrás.

   Se separan del modal a propósito: lo único que necesitan es el ramo y el
   tema, así que sirven igual si algún día se agregan a la tarjeta. */

/* Todo lo que una clase —o un atajo— le cambia a un tema cabe en cuatro
   casillas del diagnóstico. Copiarlas antes de tocarlas es lo que permite
   ofrecer "Deshacer": no se recalcula nada al revés, se vuelve a escribir lo
   que había. `undefined` es un estado posible y distinto de cualquier valor
   (el tema todavía no tenía pasos marcados, o ni siquiera programa), así que se
   guarda como tal y al restaurar se borra la clave en vez de escribirla. */
function snapshotTopicProgress(course, topicId){
  const d = getDiagnostic(course);
  if(!d) return null;
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  const clone = v => (v === undefined ? undefined : JSON.parse(JSON.stringify(v)));
  return {
    course, topicId,
    name: topic ? topic.name : topicId,
    level:     d.levels[topicId],
    steps:     clone(d.steps[topicId]),
    practiced: clone(d.practiced[topicId]),
    program:   clone(d.sessions[topicId])
  };
}

function restoreTopicProgress(snap){
  const d = snap && getDiagnostic(snap.course);
  if(!d) return false;
  const put = (bag, key, value) => { if(value === undefined) delete bag[key]; else bag[key] = value; };
  put(d.levels,    snap.topicId, snap.level);
  put(d.steps,     snap.topicId, snap.steps);
  put(d.practiced, snap.topicId, snap.practiced);
  put(d.sessions,  snap.topicId, snap.program);
  savePastEvals();
  return true;
}

// El "Deshacer" del aviso. Vuelve a dejar el tema como estaba y lo cuenta, para
// que el alumno vea que la vuelta atrás sí ocurrió.
function undoTopicProgress(snap){
  if(!restoreTopicProgress(snap)){
    showToast('No se pudo restaurar el progreso: este tema ya no está en el plan del ramo.', 'error');
    return;
  }
  if(snap.course === activeCourse){
    renderDiagnostic();
    renderPlanner();
    renderPlanState();
  }
  const p = snap.program;
  showToast(`↩️ <b>Progreso restaurado.</b> “${escapeHtml(snap.name)}” volvió a ${p
    ? `${p.done} de ${p.total} ${plural(p.total, 'sesión', 'sesiones')}`
    : 'como estaba'} y a ${LEVELS[snap.level] ? LEVELS[snap.level].dot : ''} ${
    escapeHtml(LEVELS[snap.level] ? LEVELS[snap.level].label.toLowerCase() : 'su nivel anterior')}.`);
}

/* Volver a cursar el tema desde cero, desde la tarjeta del plan. A diferencia
   del "Deshacer" del aviso —que revierte UNA acción y sabe exactamente a qué
   estado volver—, este no tiene historia que consultar: deja el tema donde
   estaba antes de cualquier clase, que es lo que dijo el mini test. Por eso
   también suelta los pasos marcados y la práctica: son parte de lo que dio por
   cumplido el programa, y dejarlos puestos sobre un contador en 0 mentiría en
   la barra de preparación. */
function resetTopicProgram(course, topicId){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  const d = getDiagnostic(course);
  if(!topic || !d) return null;

  // El programa se conserva (mismo total, mismos bloques) y solo se pone en
  // cero: el alumno pidió volver a cursarlo, no que se lo vuelvan a dimensionar.
  const program = getSessionProgram(course, topicId);
  if(program){
    program.done = 0;
    program.spentMin = 0;
    program.updatedAt = Date.now();
  }

  // Un tema sin responder cuenta como duda, igual que en el diagnóstico.
  d.levels[topicId] = levelFromMatrix(topic.relevance, isAnswerCorrect(topic, d.answers[topicId]));
  delete d.steps[topicId];
  delete d.practiced[topicId];
  savePastEvals();

  return { total: program ? program.total : 0, level: d.levels[topicId] };
}

// El botón de la tarjeta. Es la única de las tres acciones que se pregunta
// antes: el "Deshacer" del aviso repara un clic que acaba de ocurrir, pero acá
// el alumno puede estar soltando pasos y prácticas de hace semanas.
function resetTopicFromCard(topicId){
  const ai = getAiAnalysis(activeCourse);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  if(!topic) return;

  const program = getSessionProgram(activeCourse, topicId);
  const total = program ? program.total : 1;
  const done = program ? Math.min(program.done, program.total) : 0;
  const marked = topicSteps(activeCourse, topic).done;

  const ok = confirm(`Vas a volver a cursar “${topic.name}” desde cero.\n\n` +
    `El programa vuelve a la sesión 1 de ${total}${done ? ` (ahora va en ${done})` : ''} y el tema ` +
    `vuelve al nivel que dijo el mini test${marked
      ? `. También se sueltan sus ${marked} ${plural(marked, 'paso marcado', 'pasos marcados')}` : ''}` +
    `${isPracticed(activeCourse, topicId) ? ' y la práctica que tenía registrada' : ''}.\n\n` +
    '¿Reiniciarlo?');
  if(!ok) return;

  const snap = snapshotTopicProgress(activeCourse, topicId);
  const res = resetTopicProgram(activeCourse, topicId);
  if(!res){
    showToast('No se pudo reiniciar el tema: ya no está en el plan del ramo.', 'error');
    return;
  }

  renderDiagnostic();
  renderPlanner();
  renderPlanState();

  const lvl = LEVELS[res.level] || LEVELS.alto;
  showToast(`↺ <b>Tema reiniciado.</b> “${escapeHtml(topic.name)}” vuelve a la <b>sesión 1 de ` +
    `${res.total || total}</b> y a ${lvl.dot} ${escapeHtml(lvl.label.toLowerCase())}.`,
    'ok', { label: '↩️ Deshacer', run: () => undoTopicProgress(snap) });
}

// Los minutos con que una sesión "salta" el presupuesto. El bloque entero, no
// el reloj de la clase: `spentMin` es lo que hace que las horas restantes del
// tema equivalgan a las sesiones pendientes por el largo del bloque (ver
// computeEffortPlan). Si una sesión sumara al contador sin sumar sus minutos,
// la tarjeta diría "2 de 4 sesiones" y "8 h por estudiar" a la vez.
function sessionSpentFor(program, sessions){
  return Math.max(0, sessions) * (program.minutes || SESSION_BLOCK_MIN_MINUTES);
}

// Aprueba la sesión en curso: +1 al programa. Devuelve el estado nuevo, o null
// si no quedaba ninguna sesión por sumar (programa ya completo).
function markLessonPassed(course, topicId){
  const d = getDiagnostic(course);
  if(!d) return null;

  // Se pide ANTES de tocar el nivel: el programa se dimensiona con el esfuerzo
  // del tema, y ese cálculo depende del nivel actual.
  const program = ensureSessionProgram(course, topicId);
  if(!program || program.done >= program.total) return null;

  program.done += 1;
  program.spentMin = (program.spentMin || 0) + sessionSpentFor(program, 1);
  program.updatedAt = Date.now();

  const last = program.done >= program.total;
  if(last){
    // La última sesión cierra el tema, igual que el veredicto logrado del
    // profesor en la última clase del programa.
    markTopicMastered(course, topicId);
  } else if(d.levels[topicId] === 'alto'){
    // Quedan sesiones: el tema avanza a 🟡 en proceso, pero no se cierra. Es
    // exactamente lo que hace una sesión intermedia cumplida en clase.
    d.levels[topicId] = 'medio';
    savePastEvals();
  } else {
    savePastEvals();
  }
  return { done: program.done, total: program.total, last };
}

// Cierra el programa completo del tema de una sola vez.
function markTopicMastered(course, topicId){
  const ai = getAiAnalysis(course);
  const topic = ai && ai.topics.find(t => t.id === topicId);
  const d = getDiagnostic(course);
  if(!topic || !d) return false;

  const program = ensureSessionProgram(course, topicId);
  if(program){
    // Las sesiones que quedaban ya no hacen falta: se dan por cubiertas, y con
    // ellas sus minutos, para que al tema no le queden horas por estudiar.
    program.spentMin = Math.max(program.spentMin || 0,
                                sessionSpentFor(program, program.total));
    program.done = program.total;
    program.updatedAt = Date.now();
  }

  d.levels[topicId] = 'bajo';                       // 🟢 dominado
  if(Array.isArray(topic.studySteps) && topic.studySteps.length){
    d.steps[topicId] = topic.studySteps.map(() => true);
  }
  savePastEvals();

  // Mismo cierre que el veredicto logrado del profesor: el tema cuenta como
  // practicado. (markPracticed guarda por su cuenta.)
  markPracticed(course, topicId, { hits: 1, total: 1 });
  return true;
}

/* Los dos botones del pie de la clase guiada. Comparten todo menos qué marcan y
   qué dicen después, así que el cierre del modal y el repintado van juntos. */
function passStudySession(scope){
  const s = studySessionState;
  if(!s || s.pending) return;

  const before = readinessPct(s.course);
  // Antes de tocar nada: es a esto que vuelve el "Deshacer" del aviso.
  const snap = snapshotTopicProgress(s.course, s.topicId);
  const result = scope === 'topic'
    ? (markTopicMastered(s.course, s.topicId) ? { last: true } : null)
    : markLessonPassed(s.course, s.topicId);

  if(!result){
    showToast(scope === 'topic'
      ? 'No se pudo marcar el tema: ya no está en el plan del ramo.'
      : 'El programa de este tema ya está completo: no queda sesión que sumar.', 'error');
    return;
  }
  const after = readinessPct(s.course);

  // Se leen antes de cerrar: `closeStudySession` borra el estado de la clase.
  const { course, name } = s;

  // Sin preguntar: lo aprobado ya quedó guardado, así que no hay conversación
  // que "perder" en el sentido que le da la confirmación de salida.
  s.completed = true;
  closeStudySession({ force: true });

  // Lo que hay detrás del modal ya no dice la verdad: cambiaron las píldoras del
  // programa, y con la última sesión también el color del tema y la barra.
  if(course === activeCourse){
    renderDiagnostic();
    renderPlanner();
    renderPlanState();
  }

  const lift = after > before
    ? ` La preparación de ${escapeHtml(course)} subió de ${before}% a ${after}%.` : '';
  const title = escapeHtml(name);

  const msg = scope === 'topic'
    ? `✅ <b>¡Tema dado por pasado!</b> “${title}” quedó 🟢 dominado con su programa completo.${lift}`
    : result.last
      ? `✅ <b>¡Programa terminado!</b> Era la última sesión de “${title}”, así que el tema quedó ` +
        `🟢 dominado (${result.done} de ${result.total}).${lift}`
      : `✅ <b>¡Sesión completada!</b> Avanzaste en el programa de “${title}”: ` +
        `<b>${result.done} de ${result.total}</b> ${plural(result.total, 'sesión', 'sesiones')}. ` +
        `El tema sigue abierto hasta la última.${lift}`;

  // El botón que hace que apretar el verde equivocado no cueste nada.
  showToast(msg, 'ok', { label: '↩️ Deshacer', run: () => undoTopicProgress(snap) });
}

/* --- Render ----------------------------------------------------------------- */

function focusSessionInput(){
  // En escritorio el foco vuelve al campo: se responde y se sigue. En móvil no,
  // o el teclado del sistema tapa la clase apenas responde el profesor.
  if(sessionInputEl && !sessionInputEl.disabled && window.matchMedia('(min-width: 561px)').matches){
    sessionInputEl.focus();
  }
}

function renderSessionEntry(m){
  if(m.kind === 'divider'){
    const phase = SESSION_PHASES[m.phase];
    return `<p class="session-divider"><span>${escapeHtml(phase.title)}</span></p>`;
  }

  if(m.kind === 'note'){
    return `<p class="session-note-card${m.tone ? ` is-${m.tone}` : ''}">${escapeHtml(m.content)}</p>`;
  }

  if(m.kind === 'done'){
    const savedHours = Math.max(0, m.hoursBefore - m.hoursAfter);
    const savedEx = Math.max(0, m.exBefore - m.exAfter);
    const pendientes = Math.max(0, m.totalSessions - m.sessionsDone);
    return `
      <div class="session-done${m.last ? '' : ' is-partial'}">
        <p class="session-done-title">${m.last
          ? (m.extra ? '✅ Repaso extra cumplido' : '✅ Programa terminado: tema dominado')
          : `✅ Sesión ${m.sessionIndex} de ${m.totalSessions} cumplida`}</p>
        <p class="session-done-text">${m.last
          ? (m.extra
              ? `Este tema ya tenía su programa completo, así que sigue en <b>🟢 dominado</b>. Los
                 ${m.minutes} minutos igual se suman a lo trabajado.`
              : `Cerraste la última sesión del programa, así que el tema pasa a <b>🟢 dominado</b>,
                 sus pasos quedan marcados y cuenta como practicado.`)
          : `Se descuentan los <b>${m.minutes} minutos</b> de esta clase del programa del tema. Te
             queda${pendientes === 1 ? '' : 'n'} <b>${pendientes} ${plural(pendientes, 'sesión', 'sesiones')}</b>
             por delante, así que el tema sigue <b>🟡 en proceso</b>: recién con la última pasa a verde.`}</p>
        <ul class="session-done-list">
          <li>Programa del tema: <b>${m.sessionsDone} de ${m.totalSessions}</b> ${
            plural(m.totalSessions, 'sesión completada', 'sesiones completadas')}.</li>
          <li>Este tema baja de <b>${escapeHtml(formatHoursLeft(m.topicHoursBefore))}</b> a
            <b>${escapeHtml(formatHoursLeft(m.topicHoursAfter))}</b> por estudiar.</li>
          <li>Horas restantes del ramo: <b>${escapeHtml(formatHoursLeft(m.hoursBefore))}</b> →
            <b>${escapeHtml(formatHoursLeft(m.hoursAfter))}</b>${savedHours > 0
              ? ` (${escapeHtml(formatHoursLabel(savedHours))} menos)` : ''}</li>
          <li>Ejercicios restantes: <b>${m.exBefore}</b> → <b>${m.exAfter}</b>${savedEx > 0
              ? ` (${savedEx} menos)` : ''}</li>
          <li>Preparación estimada del ramo: <b>${m.readiness}%</b>.</li>
        </ul>
      </div>`;
  }

  return `
    <div class="session-msg is-${m.role === 'user' ? 'user' : 'ia'}">
      <span class="session-who">${m.role === 'user' ? 'Tú' : 'Profesor'}</span>
      <div class="session-bubble">${m.role === 'user'
        ? `<p>${escapeHtml(m.content)}</p>`
        : chatMarkdownToHtml(m.content)}</div>
    </div>`;
}

function renderStudySession(){
  const s = studySessionState;
  if(!s || !sessionBodyEl) return;
  const phase = SESSION_PHASES[s.phase];

  if(sessionTitleEl) sessionTitleEl.textContent = s.name;
  if(sessionSubtitleEl){
    sessionSubtitleEl.textContent = `${s.course} · ${s.type} · relevancia ${s.relevance.toLowerCase()} · ` +
      `${phase.hint}`;
  }

  // El programa del tema: en qué clase de cuántas va y con qué nivel de
  // ejercicios. Es lo que explica por qué la sesión 3 es más dura que la 1.
  if(sessionProgramEl){
    const done = Number.isInteger(s.sessionsDone) ? s.sessionsDone : s.sessionIndex - 1;
    const nivel = s.totalSessions <= 1 ? 'sesión única, nivel de examen'
                : s.sessionIndex <= 1 ? 'fundamentos y ejercicios de prueba de nivel base'
                : s.sessionIndex >= s.totalSessions ? 'ejercicios avanzados, nivel examen'
                : 'ejercicios intermedios de certamen';
    sessionProgramEl.innerHTML = `
      <span class="session-program-label">🎓 ${s.isExtra
        ? `Repaso extra · programa completo (${s.totalSessions} ${plural(s.totalSessions, 'sesión', 'sesiones')})`
        : `Programa: sesión ${s.sessionIndex} de ${s.totalSessions}`} ·
        ${Math.round(s.durationSec / 60)} min · ${nivel}</span>
      ${sessionPillsHtml(s.totalSessions, done, s.sessionIndex, 'en curso')}`;
  }
  if(sessionModalEl){
    sessionModalEl.classList.remove('lvl-alto', 'lvl-medio', 'lvl-bajo');
    sessionModalEl.classList.add(`lvl-${s.level}`);
  }

  // Los pasos de la cabecera: el actual encendido, los anteriores cerrados.
  if(sessionPhasesEl){
    sessionPhasesEl.querySelectorAll('.session-phase').forEach(li => {
      const i = Number(li.getAttribute('data-phase')) - 1;
      li.classList.toggle('is-current', i === s.phase);
      li.classList.toggle('is-done', i < s.phase || (s.completed && i === s.phase));
      if(i === s.phase) li.setAttribute('aria-current', 'step');
      else li.removeAttribute('aria-current');
    });
  }

  sessionBodyEl.innerHTML = s.thread.map(renderSessionEntry).join('') + (s.pending ? `
    <div class="session-msg is-ia is-pending">
      <span class="session-who">Profesor</span>
      <div class="session-bubble">
        <span class="chat-dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="chat-thinking">${s.thread.length ? 'Preparando lo que sigue...' : 'Preparando la clase...'}</span>
      </div>
    </div>` : '');

  // La clase crece hacia abajo: lo último dicho es lo que hay que ver.
  sessionBodyEl.scrollTop = sessionBodyEl.scrollHeight;

  if(sessionInputEl){
    sessionInputEl.disabled = s.pending;
    sessionInputEl.placeholder = s.phase === 1
      ? 'Escribe tu desarrollo del paso...'
      : 'Escribe tu respuesta al profesor...';
  }
  if(sessionSendBtn){
    sessionSendBtn.disabled = s.pending;
    sessionSendBtn.textContent = s.pending ? 'Enviando...' : 'Responder';
  }
  if(sessionSkipBtn){
    const last = s.phase >= SESSION_PHASES.length - 1;
    sessionSkipBtn.disabled = s.pending || last;
    sessionSkipBtn.textContent = last
      ? 'Última fase de la clase'
      : `Saltar a la ${SESSION_PHASES[s.phase + 1].title.toLowerCase()} →`;
  }
  // Los dos atajos, solo mientras el profesor no esté escribiendo: marcar en
  // medio de un turno cerraría el modal con una respuesta en camino.
  //
  // El de la sesión dice cuál está aprobando, que es lo que lo distingue del
  // otro. En un repaso extra no tiene nada que sumar (el programa ya está
  // completo), así que ahí queda apagado y solo sobrevive el del tema.
  if(sessionPassLessonBtn){
    sessionPassLessonBtn.disabled = s.pending || s.isExtra;
    sessionPassLessonBtn.textContent = s.isExtra
      ? '✅ Programa del tema ya completo'
      : `✅ Aprobar esta lección (sesión ${s.sessionIndex} de ${s.totalSessions})`;
  }
  if(sessionPassTopicBtn){
    sessionPassTopicBtn.disabled = s.pending;
    // Con una sola sesión los dos botones harían lo mismo; el del tema sobra.
    sessionPassTopicBtn.hidden = s.totalSessions <= 1 && !s.isExtra;
  }
}

/* --- Eventos ---------------------------------------------------------------- */

if(sessionModalEl) sessionModalEl.addEventListener('click', ev => {
  const btn = ev.target.closest('[data-action]');
  if(!btn || !studySessionState) return;

  switch(btn.getAttribute('data-action')){
    case 'close-session':
    case 'finish-session': closeStudySession(); break;
    case 'toggle-session-timer': toggleSessionTimer(); break;
    case 'next-session-phase': advanceSessionPhase(); break;
    case 'pass-lesson': passStudySession('lesson'); break;
    case 'pass-topic':  passStudySession('topic');  break;
  }
});

if(sessionFormEl) sessionFormEl.addEventListener('submit', ev => {
  ev.preventDefault();
  if(!studySessionState || !sessionInputEl) return;
  const text = sessionInputEl.value;
  if(!text.trim()) return;
  sessionInputEl.value = '';
  runSessionTurn(text);
});

// El campo es un textarea (las respuestas de un ejercicio son de varias líneas),
// así que Enter tiene que enviar a mano: sin esto habría que ir al botón cada vez.
if(sessionInputEl) sessionInputEl.addEventListener('keydown', ev => {
  if(ev.key === 'Enter' && !ev.shiftKey){
    ev.preventDefault();
    if(sessionFormEl) sessionFormEl.requestSubmit();
  }
});

/* -------------------------------------------------------------------------
   9. RENDER GLOBAL Y EVENTOS
   ------------------------------------------------------------------------- */
// Aviso de que el trabajo vive en este navegador, con la salida para empezar de
// cero con otro temario. Solo aparece cuando hay algo guardado que borrar.
function renderPlanState(){
  if(!planStateEl || !planStateTextEl) return;
  renderExportButton();
  if(!hasSavedProgress()){
    planStateEl.hidden = true;
    return;
  }
  planStateEl.hidden = false;

  const ai = getAiAnalysis(activeCourse);
  const bits = [];
  if(ai){
    bits.push(`<b>${escapeHtml(activeCourse)}</b> · ${ai.topics.length} tema${ai.topics.length === 1 ? '' : 's'}`);
    const p = planProgress(activeCourse);
    if(p.stepsTotal) bits.push(`${p.stepsDone}/${p.stepsTotal} pasos`);
    if(p.practiced)  bits.push(`${p.practiced} practicado${p.practiced === 1 ? '' : 's'}`);
    if(diagnosticIsDone(activeCourse)) bits.push(`${readinessPct(activeCourse)}% de preparación`);
    const lastExam = getLastExamAttempt(activeCourse);
    if(lastExam) bits.push(`último simulacro ${lastExam.grade.toFixed(1)}`);
  } else {
    const n = getAllQuestions(activeCourse).length;
    bits.push(n
      ? `<b>${escapeHtml(activeCourse)}</b> · ${n} pregunta${n === 1 ? '' : 's'} cargada${n === 1 ? '' : 's'}`
      : 'tienes planes guardados de otros ramos');
  }

  planStateTextEl.innerHTML = `${sessionRestored && ai
    ? 'Plan restaurado desde este navegador'
    : 'Guardado en este navegador'}: ${bits.join(' · ')}. Se guarda solo, aquí mismo — nada sale de tu equipo.`;
}

function renderAll(){
  showAiError('');   // los errores de la API son por ramo, no globales
  // El test es de un ramo concreto: si se cambia de ramo con el modal abierto,
  // se cierra guardando lo respondido hasta ahí.
  if(testState && testState.course !== activeCourse) closeDiagnosticTest();
  // La práctica también es de un ramo concreto: cambiar de ramo la cierra.
  if(practiceState && practiceState.course !== activeCourse) closePractice();
  if(flashcardsState && flashcardsState.course !== activeCourse) closeFlashcards();
  // El chat también: sus dudas son sobre un tema de este ramo.
  if(topicChatState && topicChatState.course !== activeCourse) closeTopicChat();
  // La clase guiada es de un tema de este ramo, y su reloj corre mientras está
  // abierta: cambiar de ramo la termina sin preguntar.
  if(studySessionState && studySessionState.course !== activeCourse) closeStudySession({ force: true });
  // El simulacro es de un ramo concreto. `force` salta la confirmación de salida:
  // el alumno ya cambió de ramo, preguntarle por un examen de otro no tiene sentido.
  if(examState && examState.course !== activeCourse) closeExamSimulation({ force: true });
  // La ficha es una foto de un ramo: al cambiar de ramo deja de corresponder.
  if(sheetState && sheetState.course !== activeCourse) closeCheatSheet();
  // La guía es de un tema de este ramo, y generarla puede seguir en curso:
  // cambiar de ramo la cierra y aborta lo que esté pidiendo.
  if(guideState && guideState.course !== activeCourse) closeStudyGuide();
  renderDrawers();
  renderPicker();
  renderCard();
  renderTabs();
  renderPlanner();
  renderDiagnostic();
  renderEvalSection();
  renderEvalToggle();
  renderPlanState();
}

// Refleja `evalsVisible` en la sección de evaluaciones (se restaura al recargar).
function renderEvalToggle(){
  evalBody.style.display = evalsVisible ? '' : 'none';
  toggleEvalsBtn.textContent = evalsVisible ? 'Ocultar' : 'Mostrar';
}

/* --- Selector de carrera: insignia de la cabecera y pantalla de selección --- */
if(careerBadgeEl){
  careerBadgeEl.addEventListener('click', ev => {
    ev.stopPropagation();   // el clic que abre el menú no debe cerrarlo enseguida
    if(careerMenuEl && careerMenuEl.hidden) openCareerMenu();
    else closeCareerMenu();
  });
}
if(careerModalCloseEl){
  careerModalCloseEl.addEventListener('click', () => closeCareerSelector());
}
if(careerModalEl){
  // Clic en el fondo oscuro: cierra, igual que los otros modales (salvo en la
  // primera visita, donde closeCareerSelector no hace nada).
  careerModalEl.addEventListener('click', ev => {
    if(ev.target === careerModalEl) closeCareerSelector();
  });
}

tabMetodoBtn.onclick = () => { activeTab='metodo'; renderTabs(); saveSession(); };
tabPlannerBtn.onclick = () => {
  activeTab='planner';
  renderTabs(); renderPlanner(); renderEvalSection(); renderPlanState();
  saveSession();
};
/* --- Nota meta: los dos controles escriben el mismo valor por ramo --- */
function onTargetGradeInput(value){
  setTargetGrade(activeCourse, value);
  renderPlanner();      // el resumen del plan nombra la meta y las horas
  refreshEffortUI();    // badges de la caja + chips de cada tarjeta, sin re-render
}

if(targetGradeInput){
  targetGradeInput.addEventListener('input', () => onTargetGradeInput(targetGradeInput.value));
  // Al salir del campo se normaliza lo escrito ("8", "abc" o vacío → valor válido).
  targetGradeInput.addEventListener('change', () => {
    targetGradeInput.value = getTargetGrade(activeCourse).toFixed(1);
    refreshEffortUI();
  });
}
if(targetGradeRange){
  targetGradeRange.addEventListener('input', () => onTargetGradeInput(targetGradeRange.value));
}

/* --- Ponderación de la evaluación: el campo manda, los presets solo lo rellenan --- */
if(examWeightInput){
  examWeightInput.addEventListener('input', () => {
    setEvalWeight(activeCourse, examWeightInput.value);
    renderPlanner();      // el resumen del plan nombra el tipo y la ponderación
    refreshEffortUI();    // badges de la caja + chips de cada tarjeta, sin re-render
    saveSession();
  });
  // Al salir del campo se normaliza lo escrito ("0", "150", "abc" o vacío → 1–100).
  examWeightInput.addEventListener('change', () => {
    examWeightInput.value = String(getEvalWeight(activeCourse));
    renderPlanner();
    refreshEffortUI();
    saveSession();
  });
}

toggleEvalsBtn.onclick = () => {
  evalsVisible = !evalsVisible;
  renderEvalToggle();
  saveSession();
};

resetPlanBtn.addEventListener('click', () => {
  const ok = confirm(
    `Se borrará todo lo guardado de ${careerInfo().label} en este navegador: las evaluaciones ` +
    'subidas, los temas analizados, el mini test, los pasos marcados y las prácticas de todos ' +
    'sus ramos. Lo estudiado en las otras carreras no se toca.\n\n' +
    '¿Quieres empezar un plan nuevo?'
  );
  if(!ok) return;
  resetAllProgress();
  fileStatusEl.textContent = 'Listo: se borró el progreso guardado. Elige un ramo y sube su temario para empezar de nuevo.';
});

evalFileInput.addEventListener('change', async () => {
  if(!evalFileInput.files || evalFileInput.files.length === 0) return;
  try{
    await handleFiles(evalFileInput.files);
  }catch(err){
    fileStatusEl.textContent = 'Ocurrió un error leyendo los archivos: ' + err.message;
  }
  evalFileInput.value = '';   // permite volver a subir el mismo archivo si hace falta
});

analyzeBtn.addEventListener('click', () => {
  const text = evalTextarea.value.trim();
  if(!text){
    fileStatusEl.textContent = 'Pega algún texto antes de analizar.';
    return;
  }
  const { questions, skipped } = textToQuestions(text);
  if(questions.length === 0){
    fileStatusEl.textContent = 'No se detectaron preguntas. Pega una pregunta por línea e inténtalo de nuevo.';
    return;
  }
  const rec = getRecord(activeCourse);
  rec.sources.push({
    id: newId(), name: 'Pegado manual', ext: 'txt', size: 0, kind: 'manual',
    questions, skipped, addedAt: Date.now()
  });
  rec.updatedAt = Date.now();
  savePastEvals();
  evalTextarea.value = '';
  fileStatusEl.textContent = `${questions.length} preguntas agregadas desde el texto pegado — presiona “${aiAnalyzeLabel(activeCourse)}” para ajustar el plan.`;
  renderEvalSection();
  renderPlanner();
  renderPlanState();
});

/* --- Análisis con Claude IA (vía el Worker): único botón de la sección --- */
// Analizar el temario *es* generar el plan: sin los temas de Claude no hay plan
// que mostrar, así que este botón (y su gemelo del estado limpio) es la única
// puerta de entrada al planificador. Si el Worker falla, el panel se queda en el
// estado limpio y el error se muestra aquí abajo.
aiAnalyzeBtn.addEventListener('click', async () => {
  await runAiAnalysis(activeCourse);
  planUsesEvals = true;
  saveSession();
  renderPlanner();
  renderDiagnostic();
  renderEvalSection();
  renderPlanState();

  // El test va antes del plan: si hay temas con pregunta y todavía no se
  // responde, se abre el modal en vez de saltar al panel de temas.
  if(hasDiagnosticQuestions(getAiAnalysis(activeCourse)) && !diagnosticIsDone(activeCourse)){
    openDiagnosticTest(activeCourse);
    return;
  }
  const target = diagnosticOutputEl && diagnosticOutputEl.innerHTML ? diagnosticOutputEl : planOutputEl;
  target.scrollIntoView({ behavior:'smooth', block:'start' });
});

clearEvalsBtn.addEventListener('click', () => {
  if(testState && testState.course === activeCourse) closeDiagnosticTest();
  if(practiceState && practiceState.course === activeCourse) closePractice();
  if(flashcardsState && flashcardsState.course === activeCourse) closeFlashcards();
  if(topicChatState && topicChatState.course === activeCourse) closeTopicChat();
  if(studySessionState && studySessionState.course === activeCourse) closeStudySession({ force: true });
  if(examState && examState.course === activeCourse) closeExamSimulation({ force: true });
  if(sheetState && sheetState.course === activeCourse) closeCheatSheet();
  if(guideState && guideState.course === activeCourse) closeStudyGuide();
  // Los temas de este ramo dejan de existir: su práctica cacheada y las dudas
  // conversadas sobre ellos también.
  // Los mazos de flashcards y las guías de estudio viven dentro del registro,
  // así que se van con él.
  clearPracticeCache(activeCourse);
  clearTopicChatThreads(activeCourse);
  delete pastEvalsData[activeCourse];
  delete sessionFiles[activeCourse];
  // La nota meta y la ponderación son parte de los datos de este ramo: se van
  // con ellos y el ramo vuelve a los valores por defecto.
  delete targetGrades[activeCourse];
  saveTargetGrades();
  delete evalWeights[activeCourse];
  saveEvalWeights();
  syncActiveExam(activeCourse);
  planUsesEvals = false;
  openTopics.clear();
  savePastEvals();
  saveSession();
  fileStatusEl.textContent = '';
  showAiError('');
  renderEvalSection();
  renderPlanner();
  renderDiagnostic();
  renderPlanState();
});

/* -------------------------------------------------------------------------
   10. ARRANQUE

   Se restaura la sesión ANTES del primer render: así la página se dibuja de una
   sola vez en el ramo, la pestaña y el plan donde quedó el alumno, sin parpadeo.
   Recién después se habilita el guardado, para que los render de arranque no
   escriban estado a medio aplicar.
   ------------------------------------------------------------------------- */
function boot(){
  // La cabecera se escribe antes que nada: aunque la primera visita se quede en
  // la pantalla de selección, detrás ya se ve la app de una carrera concreta.
  applyCareerChrome();
  restoreSession();
  // La app siempre abre en el planificador, aunque la sesión anterior se haya
  // quedado en "Método de estudio". Se fija después de restaurar para que gane
  // sobre cualquier estado guardado, y antes del primer render para que la
  // página se dibuje ya en la pestaña correcta (sin parpadeo).
  activeTab = 'planner';
  renderAll();
  sessionReady = true;

  // Primera visita en este navegador: no se asume carrera, se pregunta. La
  // sesión no se guarda todavía —hacerlo escribiría una carrera que el alumno
  // no ha elegido—; se guarda cuando elija en la pantalla de selección.
  if(!careerChosen){
    openCareerSelector();
    return;
  }
  saveSession();
}

if(document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();   // el <script> va al final del <body>: normalmente se entra por aquí
}
