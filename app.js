/* =========================================================================
   Agente de estudio — Ingeniería Comercial UC
   Lógica de la aplicación (análisis local, planificador y evaluaciones)
   ========================================================================= */

/* -------------------------------------------------------------------------
   1. DATOS DE LOS RAMOS
   ------------------------------------------------------------------------- */
const DATA = {
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

const EXAM_TYPES = {
  control: { label:"Control", weightNote:"5–10% de la nota", hoursBase:1,    idealDays:4  },
  prueba:  { label:"Prueba",  weightNote:"10–20% de la nota", hoursBase:1.75, idealDays:9  },
  examen:  { label:"Examen",  weightNote:"~30% de la nota, casi siempre acumulativo", hoursBase:2.75, idealDays:16 }
};

/* -------------------------------------------------------------------------
   2. REFERENCIAS AL DOM
   ------------------------------------------------------------------------- */
const drawersEl = document.getElementById('drawers');
const pickerEl = document.getElementById('course-picker');
const cardEl = document.getElementById('index-card');
const tabMetodoBtn = document.getElementById('tab-metodo');
const tabPlannerBtn = document.getElementById('tab-planner');
const panelMetodo = document.getElementById('panel-metodo');
const panelPlanner = document.getElementById('panel-planner');
const examPillsEl = document.getElementById('exam-pills');
const daysInput = document.getElementById('days-input');
const hoursAvailInput = document.getElementById('hours-avail-input');
const planOutputEl = document.getElementById('plan-output');
const evalTextarea = document.getElementById('eval-textarea');
const evalFileInput = document.getElementById('eval-file-input');
const analyzeBtn = document.getElementById('analyze-btn');
const clearEvalsBtn = document.getElementById('clear-evals-btn');
const toggleEvalsBtn = document.getElementById('toggle-evals-btn');
const evalBody = document.getElementById('eval-body');
const evalCourseLabel = document.getElementById('eval-course-label');
const evalOutputEl = document.getElementById('eval-analysis-output');
const fileListEl = document.getElementById('file-list');
const fileStatusEl = document.getElementById('file-status');
const recalcActions = document.getElementById('recalc-actions');
const recalcBtn = document.getElementById('recalc-btn');

/* -------------------------------------------------------------------------
   3. ESTADO
   ------------------------------------------------------------------------- */
let activeCat = 'cuant';
let activeCourse = DATA.cuant.courses[0];
let activeTab = 'metodo';
let activeExam = 'prueba';
let evalsVisible = true;
// El plan solo incorpora los temas/conceptos de las evaluaciones cuando el usuario
// presiona "Recalcular plan de estudio". Se reinicia al cambiar de ramo.
let planUsesEvals = false;

// Originales de archivos de la sesión (conservan su formato; no se convierten a .txt).
// { [course]: { [sourceId]: File } }
const sessionFiles = {};

let pastEvalsData = {};
try{ pastEvalsData = JSON.parse(localStorage.getItem('pastEvalsData') || '{}'); }catch(e){ pastEvalsData = {}; }

// Migración desde el formato antiguo { questions: [...] } al nuevo basado en "sources".
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

function savePastEvals(){
  try{ localStorage.setItem('pastEvalsData', JSON.stringify(pastEvalsData)); }
  catch(e){ /* almacenamiento no disponible */ }
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
const GLOSSARY_NORM = GLOSSARY.map(g => ({ raw:g, norm: normalizeTxt(g) }));

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
      renderAll();
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
    pill.onclick = () => { activeCourse = course; planUsesEvals = false; renderAll(); };
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

function renderExamPills(){
  examPillsEl.innerHTML = '';
  Object.keys(EXAM_TYPES).forEach(key => {
    const et = EXAM_TYPES[key];
    const pill = document.createElement('button');
    pill.className = 'exam-pill' + (key===activeExam ? ' active' : '');
    pill.innerHTML = `${et.label}<small>${et.weightNote}</small>`;
    pill.onclick = () => { activeExam = key; renderPlanner(); };
    examPillsEl.appendChild(pill);
  });
}

/* -------------------------------------------------------------------------
   7. PLANIFICADOR
   ------------------------------------------------------------------------- */
function distributeDays(daysLeft){
  if(daysLeft <= 1){
    return [{ title:"Repaso final del día", days:1, focusKey:'sprint' }];
  }
  if(daysLeft <= 3){
    return [
      { title:"Estudio enfocado", days:daysLeft-1, focusKey:'core' },
      { title:"Repaso final y descanso", days:1, focusKey:'final' }
    ];
  }
  if(daysLeft <= 6){
    return [
      { title:"Diagnóstico y organización", days:1, focusKey:'diag' },
      { title:"Estudio profundo por tema", days:daysLeft-2, focusKey:'core' },
      { title:"Repaso final y descanso", days:1, focusKey:'final' }
    ];
  }
  let diag = Math.max(1, Math.round(daysLeft*0.15));
  let final = Math.max(1, Math.round(daysLeft*0.12));
  let remaining = daysLeft - diag - final;
  let practice = Math.max(1, Math.round(remaining*0.4));
  let core = remaining - practice;
  if(core < 1){ core = 1; practice = Math.max(1, remaining - core); }
  return [
    { title:"Diagnóstico y organización", days:diag, focusKey:'diag' },
    { title:"Estudio profundo por tema", days:core, focusKey:'core' },
    { title:"Práctica intensiva", days:practice, focusKey:'practice' },
    { title:"Repaso final y descanso", days:final, focusKey:'final' }
  ];
}

const FOCUS_TEXT = {
  diag: "Revisa el temario completo, identifica qué dominas y qué no, y arma tu material de estudio (resúmenes, guías, fórmulas).",
  core: "Trabaja tema por tema en orden de prioridad, empezando por lo más débil, aplicando el método propio de este ramo.",
  practice: "Resuelve controles, pruebas o exámenes de semestres anteriores simulando condiciones reales, contra el tiempo.",
  final: "Repasa solo tus resúmenes y errores frecuentes, haz un simulacro corto cronometrado, y duerme bien la noche anterior.",
  sprint: "Relee tus resúmenes o fórmulas clave y resuelve 2 o 3 ejercicios representativos. No metas contenido nuevo el mismo día."
};

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

function renderBarList(items, keyName){
  if(items.length === 0) return '';
  const max = Math.max(...items.map(i => i.count));
  return `<div class="bar-list">${items.map(i => `
    <div class="bar-row">
      <span class="bar-label">${escapeHtml(i[keyName])}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.max(6, (i.count/max)*100)}%"></div></div>
      <span class="bar-count">${Number.isInteger(i.count) ? i.count : i.count.toFixed(1)}</span>
    </div>
  `).join('')}</div>`;
}

function renderPlanner(){
  renderExamPills();
  const cat = DATA[activeCat];
  const et = EXAM_TYPES[activeExam];
  const daysLeft = Math.max(1, parseInt(daysInput.value, 10) || 1);
  const availableHours = Math.max(0.25, parseFloat(hoursAvailInput.value) || 0.25);

  const questions = getAllQuestions(activeCourse);
  const hasEvalData = questions.length >= 3;
  const applied = hasEvalData && planUsesEvals;   // solo ajusta tras "Recalcular plan de estudio"
  const analysis = applied ? getAnalysis(activeCourse) : null;

  // El plan se ajusta a los temas + conceptos más importantes detectados.
  const priorityTerms = analysis
    ? [...analysis.concepts.map(c => c.term), ...analysis.topics.map(t => t.term)]
        .filter((v,i,a) => a.indexOf(v) === i).slice(0,5).join(', ')
    : '';

  const phases = distributeDays(daysLeft);
  let hoursTotal = 0;
  let cursor = daysLeft;
  let wasCapped = false;

  const phaseHtml = phases.map((p, i) => {
    const idealHours =
      p.focusKey==='diag' ? et.hoursBase-0.5 :
      p.focusKey==='practice' ? et.hoursBase+0.5 :
      p.focusKey==='final' || p.focusKey==='sprint' ? Math.max(et.hoursBase-0.75,0.5) :
      et.hoursBase;
    const hoursPerDay = Math.max(0.25, Math.min(idealHours, availableHours));
    if(idealHours > availableHours) wasCapped = true;
    hoursTotal += hoursPerDay * p.days;
    const rangeEnd = cursor - p.days + 1;
    const whenLabel = p.days<=1
      ? (rangeEnd<=1 ? "El día de la evaluación −1" : `Faltando ${rangeEnd} día${rangeEnd===1?'':'s'}`)
      : `Faltando ${cursor} a ${rangeEnd} días`;
    cursor -= p.days;
    const method = cat.techniques[i % cat.techniques.length];

    let focusText = FOCUS_TEXT[p.focusKey];
    if(applied && priorityTerms){
      if(p.focusKey==='core' || p.focusKey==='diag'){
        focusText += ` Según tus evaluaciones pasadas, prioriza: ${priorityTerms}.`;
      } else if(p.focusKey==='practice' || p.focusKey==='final' || p.focusKey==='sprint'){
        focusText += ` Enfoca la práctica en los temas y conceptos más repetidos en tu historial: ${priorityTerms}.`;
      }
    }

    return `
      <div class="phase">
        <div class="phase-when">${whenLabel}<span class="hrs">≈ ${formatHoursLabel(hoursPerDay)} / día</span></div>
        <div>
          <p class="phase-title">${p.title}</p>
          <p class="phase-focus">${focusText}</p>
          <span class="phase-method">${method}</span>
        </div>
      </div>
    `;
  }).join('');

  planOutputEl.innerHTML = `
    <p class="plan-summary">
      Plan para <b>${activeCourse}</b> · ${et.label} (${et.weightNote}) · faltan <b>${daysLeft} día${daysLeft===1?'':'s'}</b> con <b>${formatHoursLabel(availableHours)}/día</b> disponibles.
      Inversión estimada: <b>${Math.round(hoursTotal*10)/10} horas</b> en total.
      ${applied
        ? `Ajustado con <b>${questions.length} preguntas</b> de evaluaciones pasadas de este ramo.`
        : hasEvalData
          ? `Tienes <b>${questions.length} preguntas</b> cargadas de este ramo — presiona <b>“Recalcular plan de estudio”</b> más abajo para ajustar el plan a tus temas y conceptos.`
          : `Sube evaluaciones pasadas más abajo y presiona “Recalcular plan de estudio” para ajustar el plan a los temas y conceptos que de verdad se repiten.`}
      ${wasCapped ? ` Con ${formatHoursLabel(availableHours)}/día no alcanzas la intensidad ideal para un ${et.label.toLowerCase()}; si puedes, suma más días o más horas, o prioriza la fase de práctica intensiva por sobre el resto.` : ''}
      ${!wasCapped && daysLeft < et.idealDays*0.5 && daysLeft>3 ? ` Idealmente para un ${et.label.toLowerCase()} conviene partir ~${et.idealDays} días antes; con menos tiempo, el plan se comprime.` : ''}
    </p>
    <div class="timeline">${phaseHtml}</div>
  `;
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

function renderEvalAnalysis(){
  const analysis = getAnalysis(activeCourse);
  if(!analysis){
    evalOutputEl.innerHTML = `<p class="empty-note">Aún no has subido evaluaciones para este ramo.</p>`;
    return;
  }

  const conceptsHtml = analysis.concepts.length
    ? `<div class="concept-tags">${analysis.concepts.map(c =>
        `<span class="concept-tag">${escapeHtml(c.term)}<b>×${c.count}</b></span>`).join('')}</div>`
    : `<p class="empty-note">No se reconocieron conceptos del glosario todavía; sube más evaluaciones.</p>`;

  evalOutputEl.innerHTML = `
    <div class="analysis-block">
      <p class="analysis-title">Temas más frecuentes (${analysis.total} preguntas analizadas)</p>
      ${renderBarList(analysis.topics, 'term') || '<p class="empty-note">No se detectaron temas claros todavía; sube más preguntas.</p>'}

      <p class="analysis-title">Conceptos clave detectados</p>
      ${conceptsHtml}
    </div>
  `;
}

function renderEvalSection(){
  evalCourseLabel.textContent = activeCourse;
  renderFileList();
  renderEvalAnalysis();
  // El botón para recalcular aparece solo cuando hay suficientes datos cargados.
  const enough = getAllQuestions(activeCourse).length >= 3;
  recalcActions.style.display = enough ? '' : 'none';
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

  const msgs = [];
  if(added) msgs.push(`${added} archivo${added===1?'':'s'} analizado${added===1?'':'s'} — presiona “Recalcular plan de estudio” para ajustar el plan`);
  if(failed) msgs.push(`${failed} sin texto útil o formato no soportado`);
  fileStatusEl.textContent = msgs.join(' · ') || 'No se pudo procesar ningún archivo.';
}

/* -------------------------------------------------------------------------
   9. RENDER GLOBAL Y EVENTOS
   ------------------------------------------------------------------------- */
function renderAll(){
  renderDrawers();
  renderPicker();
  renderCard();
  renderTabs();
  renderPlanner();
  renderEvalSection();
}

tabMetodoBtn.onclick = () => { activeTab='metodo'; renderTabs(); };
tabPlannerBtn.onclick = () => { activeTab='planner'; renderTabs(); renderPlanner(); renderEvalSection(); };
daysInput.addEventListener('input', renderPlanner);
hoursAvailInput.addEventListener('input', renderPlanner);

toggleEvalsBtn.onclick = () => {
  evalsVisible = !evalsVisible;
  evalBody.style.display = evalsVisible ? '' : 'none';
  toggleEvalsBtn.textContent = evalsVisible ? 'Ocultar' : 'Mostrar';
};

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
    evalOutputEl.innerHTML = `<p class="empty-note">No se detectaron preguntas. Pega una pregunta por línea e inténtalo de nuevo.</p>`;
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
  fileStatusEl.textContent = `${questions.length} preguntas agregadas desde el texto pegado — presiona “Recalcular plan de estudio” para ajustar el plan.`;
  renderEvalSection();
  renderPlanner();
});

recalcBtn.addEventListener('click', () => {
  planUsesEvals = true;
  renderPlanner();
  renderEvalSection();
  planOutputEl.scrollIntoView({ behavior:'smooth', block:'start' });
});

clearEvalsBtn.addEventListener('click', () => {
  delete pastEvalsData[activeCourse];
  delete sessionFiles[activeCourse];
  planUsesEvals = false;
  savePastEvals();
  fileStatusEl.textContent = '';
  renderEvalSection();
  renderPlanner();
});

/* -------------------------------------------------------------------------
   10. ARRANQUE
   ------------------------------------------------------------------------- */
renderAll();
