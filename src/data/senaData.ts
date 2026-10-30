import { Apprentice, CaseDilemma, FichaMatriculada, InstructorSession, QuizQuestion, RegulatoryArticleComparison, RightOrDuty, SenaSymbol, SenaValue } from '../types/induction';

export const SENA_SYMBOLS: SenaSymbol[] = [
  {
    id: 'escudo',
    name: 'El Escudo del SENA',
    title: 'Representación de los tres sectores de la economía',
    significance: 'Creado a comienzos de la institución, plasma los tres pilares de la actividad productiva nacional en los que el SENA forma a sus aprendices.',
    elements: [
      {
        item: 'La Rueda Dentada',
        meaning: 'Simboliza el sector de la industria, la manufactura y la construcción en permanente avance y tecnificación.'
      },
      {
        item: 'El Caduceo',
        meaning: 'Asociado al comercio y a los servicios, resalta la ética mercantil y el dinamismo económico.'
      },
      {
        item: 'El Café y la Espiga',
        meaning: 'Representa el sector primario y agropecuario, corazón del campo colombiano y la soberanía alimentaria.'
      }
    ]
  },
  {
    id: 'bandera',
    name: 'La Bandera del SENA',
    title: 'Paz, transparencia y compromiso formativo',
    significance: 'De fondo blanco impecable, lleva en su centro el Escudo oficial del SENA, ondeando en todas las sedes y ceremonias institucionales del país.',
    elements: [
      {
        item: 'Fondo Blanco',
        meaning: 'Simboliza la paz, la transparencia, la tranquilidad y la apertura a todos los colombianos sin distinción social o económica.'
      },
      {
        item: 'Escudo Centrado',
        meaning: 'Representa la presencia unificada de la formación para el trabajo en los 32 departamentos de Colombia.'
      }
    ]
  },
  {
    id: 'logotipo',
    name: 'El Logosímbolo SENA',
    title: 'El ser humano que camina hacia su porvenir',
    significance: 'Diseñado a finales de los años 70, sintetiza la filosofía humanista del SENA: el aprendiz como protagonista de su propio proyecto de vida.',
    elements: [
      {
        item: 'Círculo Superior',
        meaning: 'Representa la cabeza, el intelecto, la creatividad y las ideas de los colombianos.'
      },
      {
        item: 'Líneas y Sendero',
        meaning: 'Configuran un individuo en movimiento que avanza con firmeza hacia adelante por los caminos del conocimiento y el progreso.'
      },
      {
        item: 'Color Verde Institucional',
        meaning: 'Verde esperanza (#39A900), simboliza la juventud, el crecimiento laboral y la sostenibilidad del país.'
      }
    ]
  },
  {
    id: 'himno',
    name: 'Himno Institucional del SENA',
    title: 'Canto al trabajo creador y la fraternidad',
    significance: 'Con letra del poeta Luis Alfredo Osorio y música del maestro Daniel Camacho, inspira el amor por Colombia y la dignidad del trabajo bien hecho.',
    elements: [
      {
        item: 'Coro',
        meaning: 'Estudiantes del SENA ¡adelante! / Por Colombia luchad con amor / Con el ánimo noble y radiante / Transformemos el mundo en mejor.'
      },
      {
        item: 'Estrofas Clave',
        meaning: 'Ensalzan el taller como templo del deber, la ciencia al servicio de la patria y la forja de ciudadanos libres y solidarios.'
      }
    ]
  }
];

export const SENA_VALUES: SenaValue[] = [
  {
    id: 'respeto',
    name: 'Respeto',
    definition: 'Reconocer, apreciar y valorar a mi persona, a los demás y al entorno ambiental y social.',
    apprenticeAction: 'Escuchar activamente a instructores y compañeros, valorando la diversidad y las opiniones divergentes.'
  },
  {
    id: 'honestidad',
    name: 'Honestidad',
    definition: 'Actuar con coherencia, rectitud y transparencia en todas las acciones académicas y personales.',
    apprenticeAction: 'Elaborar evidencias con autoría genuina, sin recurrir al plagio, a la copia o a la suplantación.'
  },
  {
    id: 'compromiso',
    name: 'Compromiso',
    definition: 'Asumir con responsabilidad los objetivos de la formación y la contribución al progreso del país.',
    apprenticeAction: 'Puntualidad en la entrega de guías de aprendizaje y asistencia puntual a ambientes y plataformas virtuales.'
  },
  {
    id: 'solidaridad',
    name: 'Solidaridad',
    definition: 'Apoyar desinteresadamente a quienes lo necesitan para alcanzar metas colectivas de aprendizaje.',
    apprenticeAction: 'Compartir conocimientos en trabajos de equipo y apoyar a compañeros con dificultades de conectividad o aprendizaje.'
  },
  {
    id: 'justicia',
    name: 'Justicia',
    definition: 'Dar a cada quien lo que le corresponde con equidad e imparcialidad.',
    apprenticeAction: 'Reconocer el trabajo en equipo de manera justa y seguir los conductos regulares ante cualquier desacuerdo.'
  },
  {
    id: 'diligencia',
    name: 'Diligencia',
    definition: 'Esmero, cuidado y prontitud en la ejecución de las funciones encomendadas.',
    apprenticeAction: 'Cuidado riguroso de máquinas, herramientas de laboratorio y ambientes de aprendizaje asignados.'
  }
];

// MATRIZ COMPARATIVA DE REFORMAS: ACUERDO 007 DE 2012 vs ACUERDO 009 DE 2024 vs ACUERDO 002 DE 2026
export const REGULATORY_ARTICLE_COMPARISONS: RegulatoryArticleComparison[] = [
  {
    id: 'mat-1',
    article: 'Art. 1 y 2 (Cap. I)',
    topic: 'Principios Rectores y Enfoque Diferencial y de Género',
    previousRule: 'En el Acuerdo 007 de 2012 la formación se definía bajo parámetros técnicos tradicionales, sin consagración expresa de enfoque de género ni justicia territorial.',
    currentRule2024: 'El Acuerdo 009 de 2024 consagra el principio de Dignidad Humana, No Discriminación, Igualdad Material, Enfoque Diferencial, Étnico, Campesino y de Género como base transversal de la Formación Profesional Integral (FPI).',
    update2026: 'Se ratifica la obligatoriedad de aplicar la "Ruta Violeta" institucional para prevenir y erradicar cualquier manifestación de violencia de género.',
    keyImprovement: 'Humanización y blindaje de derechos para comunidades diversas, campesinas y minorías.',
    chapter: 'Capítulo I: Principios y Campo de Aplicación',
    status: 'modificado_2024',
    aspectId: 'aspect-salud-mental',
    practicalExample: 'Un aprendiz de origen indígena o con identidad diversa tiene garantizado el acompañamiento de Bienestar y la protección frente a cualquier discriminación en aula presencial o virtual.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 2 & Circular de Dirección General (Ruta Violeta SENA)'
  },
  {
    id: 'mat-2',
    article: 'Art. 7 y 8 (Cap. II)',
    topic: 'Derecho a la Evaluación Oportuna y Retroalimentación Pedagógica',
    previousRule: 'El Acuerdo 007 de 2012 no fijaba un plazo perentorio en días hábiles para calificar; las valoraciones podían demorarse semanas sin sanción procesal para el instructor.',
    currentRule2024: 'Establece como derecho inalienable del aprendiz recibir retroalimentación pedagógica y valoración de sus evidencias en un plazo máximo de ocho (8) días hábiles en la plataforma Zajuna/Sofia Plus.',
    keyImprovement: 'Certeza académica, fin a la incertidumbre evaluativa y derecho a retroalimentación cualitativa constructiva.',
    chapter: 'Capítulo II: Derechos del Aprendiz',
    status: 'modificado_2024',
    aspectId: 'aspect-debido-proceso',
    practicalExample: 'Si subes tu guía de algoritmos el lunes, el instructor tiene hasta el viernes de la siguiente semana hábil para calificarla con comentarios de mejora pedagógica.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 8'
  },
  {
    id: 'mat-3',
    article: 'Art. 9 (Cap. II)',
    topic: 'Planes de Mejoramiento Académico Preventivos',
    previousRule: 'Bajo el Acuerdo 007 de 2012, el plan de mejoramiento se aplicaba frecuentemente como sanción disciplinaria posterior al paso por el Comité de Evaluación.',
    currentRule2024: 'Pasa a ser un DERECHO previo del aprendiz. Todo instructor debe concertar un plan pedagógico de mejoramiento preventivo antes de remitir a cualquier instancia disciplinaria sancionatoria.',
    keyImprovement: 'Prioridad absoluta de la pedagogía y la nivelación de competencias sobre el castigo.',
    chapter: 'Capítulo II: Derechos del Aprendiz',
    status: 'nuevo_derecho',
    aspectId: 'aspect-justicia-restaurativa',
    practicalExample: 'Si no alcanzaste el resultado de aprendizaje en la fase de análisis, el instructor debe sentarse contigo a acordar una guía complementaria antes de enviar reporte a comité.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 9'
  },
  {
    id: 'mat-4',
    article: 'Art. 10 (Cap. II)',
    topic: 'Salud Mental y Bienestar Integral al Aprendiz',
    previousRule: 'El reglamento anterior limitaba Bienestar principalmente a eventos deportivos, recreativos y auxilios económicos tradicionales de transporte.',
    currentRule2024: 'Amplía el derecho a la atención de salud mental, apoyo psicosocial permanente, prevención del riesgo de suicidio y becas de monitoría integral.',
    update2026: 'Protocolo de alerta temprana en salud mental que suspende plazos académicos cuando media prescripción médica o psicológica certificada.',
    keyImprovement: 'Protección integral de la salud mental del aprendiz como factor clave contra la deserción.',
    chapter: 'Capítulo II: Derechos del Aprendiz',
    status: 'reformado_2026',
    aspectId: 'aspect-salud-mental',
    practicalExample: 'Si un aprendiz atraviesa un episodio de ansiedad severa con certificación de EPS o psicología, sus entregas se congelan temporalmente sin riesgo de cancelación de matrícula.',
    legalCitation: 'Acuerdo 002 de 2026 reforma Art. 10 & Plan Nacional de Salud Mental SENA'
  },
  {
    id: 'mat-5',
    article: 'Art. 14 (Cap. III)',
    topic: 'Uso Ético de Inteligencia Artificial (IA) y Autoría Propia',
    previousRule: 'El Acuerdo 007 de 2012 no contemplaba la existencia de modelos de IA generativa, algoritmos de lenguaje ni entornos virtuales modernos.',
    currentRule2024: 'Regula expresamente el deber de autoría genuina. Permite el uso de herramientas de IA únicamente como apoyo investigativo o metodológico, exigiendo citación transparente y prohibiendo la entrega de contenidos generados por IA como autoría propia sin análisis crítico.',
    keyImprovement: 'Regulación ética y de vanguardia tecnológica adaptada al desarrollo de software y la era de la IA.',
    chapter: 'Capítulo III: Deberes y Prohibiciones',
    status: 'modificado_2024',
    aspectId: 'aspect-etica-ia',
    practicalExample: 'Un aprendiz de programación puede consultar a Gemini para optimizar una consulta SQL, pero debe referenciar la herramienta en su informe y explicar el plan de ejecución.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 14'
  },
  {
    id: 'mat-6',
    article: 'Art. 15 (Cap. III)',
    topic: 'Cero Tolerancia a Ciberacoso, Violencia Digital y de Género',
    previousRule: 'Se manejaban fórmulas generales de "faltas a la moral" o "irrespeto verbal" que dejaban vacíos ante agresiones en WhatsApp, redes o foros virtuales.',
    currentRule2024: 'Tipifica como Faltas Gravísimas específicas: el ciberacoso escolar, la divulgación no consentida de material íntimo, el acoso por motivos de identidad u orientación sexual, y la discriminación en ambientes presenciales o digitales.',
    keyImprovement: 'Tolerancia cero con tipificación jurídica precisa para proteger la dignidad y seguridad de las y los aprendices.',
    chapter: 'Capítulo III: Deberes y Prohibiciones',
    status: 'modificado_2024',
    aspectId: 'aspect-salud-mental',
    practicalExample: 'Crear stickers ofensivos, difundir fotos privadas o acosar a un compañero en grupos de WhatsApp del grupo formativo acarrea apertura inmediata de investigación por Falta Gravísima.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 15'
  },
  {
    id: 'mat-7',
    article: 'Art. 31 y 32 (Cap. V)',
    topic: 'Etapa Productiva: Inclusión de Economía Popular y Modalidad Remota',
    previousRule: 'Centrado casi exclusivamente en contrato de aprendizaje empresarial privado formal o pasantía en empresas constituidas.',
    currentRule2024: 'Abrió paso a proyectos productivos I+D+i y apoyo a microempresas familiares.',
    update2026: 'Reforma integral mediante el Acuerdo 002 de 2026: incluye formalmente a la "Economía Popular y Comunitaria", cooperativas campesinas, y valida expresamente el teletrabajo y modalidad híbrida en contratos de aprendizaje.',
    keyImprovement: 'Flexibilidad para que aprendices rurales y de tecnología accedan a la etapa práctica sin barreras geográficas.',
    chapter: 'Capítulo V: Alternativas de Etapa Productiva',
    status: 'reformado_2026',
    aspectId: 'aspect-economia-popular',
    practicalExample: 'Un aprendiz de desarrollo web puede realizar su práctica en teletrabajo creando la tienda virtual para una asociación de mujeres artesanas o campesinas de su región.',
    legalCitation: 'Acuerdo 002 de 2026 Arts. 31 y 32'
  },
  {
    id: 'mat-8',
    article: 'Art. 44 (Cap. VII)',
    topic: 'Justicia Restaurativa y Mediación Pedagógica Comunitaria',
    previousRule: 'Régimen netamente punitivo y acusatorio: ante cualquier desacuerdo se abría proceso sancionatorio formal.',
    currentRule2024: 'Consagra la Justicia Restaurativa: ante faltas leves o conflictos de convivencia entre pares, es obligatorio agotar etapas previas de mediación formativa y acuerdos de reparación comunitaria.',
    update2026: 'Validación de pactos pedagógicos suscritos ante el Vocero de Ficha y el Coordinador como cierre definitivo de la falta leve sin mancha en el historial del aprendiz.',
    keyImprovement: 'Resolución pacífica de conflictos basada en el diálogo restaurativo, la reparación y el aprendizaje socioemocional.',
    chapter: 'Capítulo VII: Medidas Formativas',
    status: 'reformado_2026',
    aspectId: 'aspect-justicia-restaurativa',
    practicalExample: 'Un desacuerdo verbal en un trabajo colaborativo se resuelve en una mesa de diálogo con el Vocero de Ficha pactando actividades de integración comunitaria.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 44 & Acuerdo 002 de 2026'
  },
  {
    id: 'mat-9',
    article: 'Art. 48 (Cap. VIII)',
    topic: 'Comité de Evaluación y Seguimiento: VOZ Y VOTO del Representante',
    previousRule: 'En el Acuerdo 007 de 2012, el representante de los aprendices solo tenía derecho a "Voz", actuando prácticamente como un testigo sin incidencia vinculante.',
    currentRule2024: 'Fortaleció la presencia del estamento estudiantil en el comité.',
    update2026: 'MODIFICACIÓN HISTÓRICA VINCULANTE: El Acuerdo 002 de 2026 reforma el Artículo 48 otorgando al Representante de los Aprendices del Centro VOZ Y VOTO en las deliberaciones y recomendaciones sancionatorias o formativas.',
    keyImprovement: 'Democratización real y equilibrio de poder: los aprendices tienen poder decisorio formal en el máximo órgano de seguimiento.',
    chapter: 'Capítulo VIII: Debido Proceso y Comité',
    status: 'reformado_2026',
    aspectId: 'aspect-voz-voto',
    practicalExample: 'En la votación de una recomendación de cancelación de matrícula, el representante estudiantil emite un voto que pesa igual que el de cualquier coordinador o instructor.',
    legalCitation: 'Acuerdo 002 de 2026 (Reforma expresa al Art. 48)'
  },
  {
    id: 'mat-10',
    article: 'Art. 50 y 52 (Cap. VIII)',
    topic: 'Notificación Electrónica Obligatoria y Términos de Descargos',
    previousRule: 'Notificaciones fijadas en carteleras de sede física que a menudo el aprendiz no alcanzaba a ver, vulnerando su defensa.',
    currentRule2024: 'Obligatoriedad de notificación por correo institucional (@misena.edu.co) y trazabilidad digital, garantizando mínimo tres (3) días hábiles para aportar pruebas y descargos antes de la sesión del comité.',
    update2026: 'Implementación del acuse de recibo electrónico auditable y reposición digital ante el Subdirector de Centro.',
    keyImprovement: 'Blindaje total al Debido Proceso (Art. 29 de la Constitución Política de Colombia).',
    chapter: 'Capítulo VIII: Debido Proceso y Comité',
    status: 'reformado_2026',
    aspectId: 'aspect-debido-proceso',
    practicalExample: 'Cualquier citación a comité remitida por canales no institucionales o sin los 3 días hábiles previos de antelación es nula por vulneración al debido proceso.',
    legalCitation: 'Acuerdo 009 de 2024 Art. 50 & Acuerdo 002 de 2026 Art. 52'
  }
];

export const RIGHTS_AND_DUTIES: RightOrDuty[] = [
  // DERECHOS (CAPÍTULO II - ACUERDO 009 DE 2024 / ACUERDO 002 DE 2026)
  {
    id: 'der-1',
    type: 'derecho',
    article: 'Cap. I, Art. 2',
    title: 'Dignidad Humana y Enfoque Diferencial y de Género',
    category: 'General',
    description: 'Ser tratado con dignidad, respeto absoluto a la identidad de género, diversidad cultural, étnica y territorial, sin ningún tipo de discriminación en los ambientes de formación y plataformas digitales.',
    keyTakeaway: 'Consagrado como principio rector transversal del Acuerdo 009 de 2024 y reforzado en 2026.'
  },
  {
    id: 'der-2',
    type: 'derecho',
    article: 'Cap. II, Art. 7',
    title: 'Recibir Formación Profesional Integral de Calidad',
    category: 'Academico',
    description: 'Recibir formación técnica, tecnológica y humana acorde al diseño curricular del programa, con recursos pedagógicos, ambientes dotados y tecnología idóneos tanto en modalidad presencial como virtual.',
    keyTakeaway: 'Exige ambientes equipados y cumplimiento de las guías de aprendizaje bajo el nuevo reglamento.'
  },
  {
    id: 'der-3',
    type: 'derecho',
    article: 'Cap. II, Art. 7',
    title: 'Portar el Carné Institucional Físico o Digital',
    category: 'General',
    description: 'Obtener oportunamente el carné institucional físico o digital del SENA que lo acredita formalmente como aprendiz en cualquier sede y ante el sector productivo.',
    keyTakeaway: 'El carné debe expedirse oportunamente durante la inducción institucional.'
  },
  {
    id: 'der-4',
    type: 'derecho',
    article: 'Cap. II, Art. 8',
    title: 'Retroalimentación y Evaluación en Máximo 8 Días Hábiles',
    category: 'Academico',
    description: 'Conocer oportunamente las valoraciones emitidas por los instructores sobre sus evidencias de aprendizaje (plazo máximo fijado de 8 días hábiles) con su correspondiente retroalimentación pedagógica y cualitativa.',
    keyTakeaway: 'Plazo perentorio garantizado por el Acuerdo 009 de 2024 para conocer valoraciones y oportunidades de mejora.'
  },
  {
    id: 'der-5',
    type: 'derecho',
    article: 'Cap. II, Art. 9',
    title: 'Planes de Mejoramiento Académico Preventivos',
    category: 'Academico',
    description: 'Solicitar y recibir actividades pedagógicas complementarias para superar dificultades en el logro de los resultados de aprendizaje como derecho formativo previo antes de cualquier remisión a comité.',
    keyTakeaway: 'El SENA prioriza la pedagogía y el acompañamiento formativo preventivo sobre cualquier sanción.'
  },
  {
    id: 'der-6',
    type: 'derecho',
    article: 'Cap. II, Art. 10',
    title: 'Bienestar Integral, Salud Mental y Apoyo Psicosocial',
    category: 'Bienestar',
    description: 'Disfrutar de los programas integrales de salud mental, acompañamiento psicosocial, ruta violeta, deporte, arte, cultura, liderazgo, monitorías y apoyos de sostenimiento según convocatorias vigentes.',
    keyTakeaway: 'La salud mental y el bienestar socioemocional son derechos priorizados en el reglamento actualizado.'
  },
  {
    id: 'der-7',
    type: 'derecho',
    article: 'Cap. II, Art. 11 & Cap. VIII, Art. 48',
    title: 'Representación Democrática con Voz y Voto en Comité (Reforma 2026)',
    category: 'Representacion',
    description: 'Postularse y votar democráticamente para la elección de voceros de ficha, líderes de centro y representantes de aprendices, quienes cuentan formalmente con VOZ Y VOTO en el Comité de Evaluación y Seguimiento (Acuerdo 002 de 2026).',
    keyTakeaway: 'Participación política y decisión democrática vinculante en los órganos institucionales.'
  },
  {
    id: 'der-8',
    type: 'derecho',
    article: 'Cap. V, Art. 31',
    title: 'Acceso a Diversas Alternativas de Etapa Productiva (Economía Popular y Remoto)',
    category: 'Academico',
    description: 'Elegir y postularse a modalidades de etapa práctica reconocidas: contrato de aprendizaje (presencial o híbrido/remoto), proyectos de innovación SENNOVA, pasantías y apoyo a unidades de la Economía Popular y Comunitaria.',
    keyTakeaway: 'Reforma 2026: Inclusión de la economía popular campesina y validación del teletrabajo formativo.'
  },
  {
    id: 'der-9',
    type: 'derecho',
    article: 'Cap. VIII, Art. 48 y 50',
    title: 'Debido Proceso, Notificación Digital y Presunción de Inocencia',
    category: 'Disciplinario',
    description: 'Garantía del debido proceso en todas las actuaciones formativas y disciplinarias: ser notificado formalmente por canales electrónicos institucionales con mínimo 3 días hábiles de anticipación, aportar pruebas y presentar recurso de reposición.',
    keyTakeaway: 'Ningún aprendiz puede ser sancionado sin ser previamente escuchado y garantizado su debido proceso.'
  },

  // DEBERES (CAPÍTULO III - ACUERDO 009 DE 2024 / ACUERDO 002 DE 2026)
  {
    id: 'deb-1',
    type: 'deber',
    article: 'Cap. III, Art. 11',
    title: 'Conocer y Acatar el Reglamento del Aprendiz Vigente',
    category: 'General',
    description: 'Cumplir cabalmente el Reglamento del Aprendiz SENA (Acuerdo 009 de 2024 con reformas de 2026), las normas de convivencia armónica, inclusión y las directrices particulares del Centro de Formación.',
    keyTakeaway: 'El desconocimiento del reglamento vigente no exime de su cumplimiento ético y disciplinario.'
  },
  {
    id: 'deb-2',
    type: 'deber',
    article: 'Cap. III, Art. 12',
    title: 'Portar el Carné Institucional y Uniforme Reglamentario',
    category: 'General',
    description: 'Llevar visiblemente el carné institucional durante la permanencia en las sedes del SENA y portar el uniforme o indumentaria técnica exigida para cada taller, laboratorio y empresa patrocinadora.',
    keyTakeaway: 'El carné es personal e intransferible y asegura la convivencia segura de la comunidad.'
  },
  {
    id: 'deb-3',
    type: 'deber',
    article: 'Cap. III, Art. 12',
    title: 'Puntualidad y Asistencia a la Formación Presencial y Virtual',
    category: 'Academico',
    description: 'Asistir con puntualidad y compromiso a las actividades curriculares presenciales y virtuales programadas para el desarrollo del plan formativo integral.',
    keyTakeaway: 'La inasistencia acumulada injustificada de 3 días consecutivos da lugar al inicio del proceso de deserción.'
  },
  {
    id: 'deb-4',
    type: 'deber',
    article: 'Cap. III, Art. 13',
    title: 'Justificación Oportuna de Inasistencias en 3 Días Hábiles',
    category: 'Academico',
    description: 'Presentar dentro de los tres (3) días hábiles siguientes al hecho la justificación con incapacidad médica convalidada de EPS o soporte formal de caso fortuito o fuerza mayor debidamente acreditado.',
    keyTakeaway: 'Dispones de máximo 3 días hábiles para radicar formalmente tu justificación médica en la coordinación.'
  },
  {
    id: 'deb-5',
    type: 'deber',
    article: 'Cap. III, Art. 13',
    title: 'Cuidado y Custodia de Bienes e Instalaciones Públicas',
    category: 'General',
    description: 'Cuidar con esmero los equipos de cómputo, maquinaria, herramientas, mobiliario y recursos digitales puestos a disposición de la formación, respondiendo por deterioros culposos.',
    keyTakeaway: 'Los recursos del SENA son patrimonio público sagrado para el aprendizaje de Colombia.'
  },
  {
    id: 'deb-6',
    type: 'deber',
    article: 'Cap. III, Art. 14',
    title: 'Uso Ético de Inteligencia Artificial (IA) y Propiedad Intelectual',
    category: 'Academico',
    description: 'Elaborar de manera directa, genuina y ética las actividades y proyectos. Cuando se empleen herramientas de Inteligencia Artificial, deben citarse como apoyo metodológico; no se permite suplantar el raciocinio propio ni entregar código generado por IA sin compresión ni autoría declarada.',
    keyTakeaway: 'Novedad Acuerdo 009 de 2024: Uso ético de IA con citación de prompts y transparencia académica.'
  },
  {
    id: 'deb-7',
    type: 'deber',
    article: 'Cap. III, Art. 16',
    title: 'Acatamiento de Normas de Seguridad y Salud en el Trabajo (SST)',
    category: 'General',
    description: 'Cumplir rigurosamente los protocolos de bioseguridad, uso obligatorio de Elementos de Protección Personal (EPP) y medidas de prevención de riesgos en talleres, laboratorios y centros de simulación.',
    keyTakeaway: 'La protección de la vida y la integridad física prima sobre cualquier actividad práctica.'
  },

  // PROHIBICIONES EXPRESAS (CAPÍTULO III, ART. 15 - ACUERDO 009 DE 2024)
  {
    id: 'pro-1',
    type: 'prohibicion',
    article: 'Cap. III, Art. 15',
    title: 'Consumo y Porte de Alcohol y Sustancias Psicoactivas',
    category: 'Disciplinario',
    description: 'Ingresar, comercializar, portar o consumir bebidas embriagantes o sustancias psicoactivas dentro de los Centros de Formación, plataformas virtuales o actividades institucionales del SENA.',
    keyTakeaway: 'Falta disciplinaria gravísima que acarrea sanción formal y posible cancelación de matrícula.'
  },
  {
    id: 'pro-2',
    type: 'prohibicion',
    article: 'Cap. III, Art. 15',
    title: 'Porte de Armas o Elementos Lesivos',
    category: 'Disciplinario',
    description: 'Ingresar armas de fuego, armas blancas, elementos cortopunzantes o sustancias químicas peligrosas a los centros y ambientes de formación bajo cualquier pretexto.',
    keyTakeaway: 'Prohibición absoluta para salvaguardar la vida y la seguridad de la comunidad educativa.'
  },
  {
    id: 'pro-3',
    type: 'prohibicion',
    article: 'Cap. III, Art. 15',
    title: 'Fraude, Plagio, Suplantación de Identidad Digital y Abuso de IA',
    category: 'Academico',
    description: 'Cometer fraude en evaluaciones, plagiar código o proyectos ajenos, presentar trabajos hechos íntegramente por IA ocultando su origen, o suplantar a compañeros en asistencias o plataformas del campus virtual.',
    keyTakeaway: 'El fraude académico anula la evidencia y genera apertura a proceso disciplinario sancionatorio.'
  },
  {
    id: 'pro-4',
    type: 'prohibicion',
    article: 'Cap. III, Art. 15',
    title: 'Ciberacoso, Acoso Escolar y Violencias Basadas en Género',
    category: 'Disciplinario',
    description: 'Incurrir en conductas de ciberacoso en grupos de WhatsApp o redes, hostigamiento, amenazas, discriminación racial, sexual o de cualquier índole, o divulgación no consentida de fotos o datos personales de miembros de la comunidad.',
    keyTakeaway: 'Falta Gravísima de sanción inmediata bajo el protocolo de Ruta Violeta institucional.'
  }
];

export const CASE_DILEMMAS: CaseDilemma[] = [
  {
    id: 'caso-1',
    title: 'Inasistencia por Salud Repentina',
    context: 'Carlos es aprendiz de Análisis y Desarrollo de Software. El martes sufrió un cuadro viral y el médico le ordenó 2 días de reposo en casa con incapacidad médica formal de su EPS.',
    scenario: '¿Cuál es el procedimiento reglamentario correcto que Carlos debe seguir según el Acuerdo 009 de 2024?',
    regulatoryReference: 'Capítulo III (Art. 13) y Capítulo IV (Permanencia y Deserción) del Acuerdo 009 de 2024',
    options: [
      {
        id: 'opt-1a',
        text: 'Avisar por WhatsApp a un compañero el viernes siguiente para que le comente al instructor cuando se acuerde.',
        isCorrect: false,
        explanation: 'Incorrecto. Las justificaciones no se gestionan mediante mensajes informales a compañeros y deben cumplir el plazo legal.'
      },
      {
        id: 'opt-1b',
        text: 'Radicar la incapacidad médica ante su instructor y coordinación dentro de los tres (3) días hábiles siguientes al hecho por los canales oficiales institucionales.',
        isCorrect: true,
        explanation: '¡Correcto! El reglamento vigente estipula que el aprendiz dispone de máximo 3 días hábiles para justificar formalmente su inasistencia con soporte de EPS o calamidad demostrable.'
      },
      {
        id: 'opt-1c',
        text: 'Esperar a final de trimestre y entregar todas las inasistencias juntas cuando entregue el proyecto formativo.',
        isCorrect: false,
        explanation: 'Incorrecto. Si no presenta la justificación en 3 días hábiles, el sistema reportará inasistencia injustificada y podría iniciarse proceso de deserción.'
      }
    ]
  },
  {
    id: 'caso-2',
    title: 'Uso de Inteligencia Artificial (IA) en Proyecto de Código',
    context: 'En el módulo de programación, Sofía debe diseñar una API REST con base de datos. Utilizó un asistente de IA para consultar dudas sobre la sintaxis de una consulta SQL compleja.',
    scenario: '¿Cómo debe presentar Sofía su evidencia para cumplir cabalmente con el Artículo 14 del Reglamento del Aprendiz?',
    regulatoryReference: 'Capítulo III, Art. 14 (Uso Ético de Inteligencia Artificial y Autoría Propia) - Acuerdo 009 de 2024',
    options: [
      {
        id: 'opt-2a',
        text: 'Copiar todo el código generado por la IA en su repositorio sin probarlo ni declarar su uso, asegurando que ella lo programó línea a línea.',
        isCorrect: false,
        explanation: 'Incorrecto. Suplantar el propio criterio técnico o atribuirse la autoría exclusiva de código generado automáticamente constituye fraude académico bajo el Art. 14 y 15.'
      },
      {
        id: 'opt-2b',
        text: 'Declarar en el informe técnico el uso de la IA como apoyo metodológico, citando la consulta realizada, comprendiendo a cabalidad la lógica del código y sustentando personalmente la arquitectura implementada.',
        isCorrect: true,
        explanation: '¡Excelente! El Acuerdo 009 de 2024 no prohíbe la IA, sino que exige transparencia ética: debe usarse como herramienta de soporte, citarse honestamente y el aprendiz debe demostrar dominio y autoría intelectual real.'
      },
      {
        id: 'opt-2c',
        text: 'Borrar todo el código y no utilizar ningún computador ni documentación digital.',
        isCorrect: false,
        explanation: 'Incorrecto. El SENA fomenta la innovación y las competencias digitales contemporáneas cuando se aplican con ética y criterio.'
      }
    ]
  },
  {
    id: 'caso-3',
    title: 'Comité de Evaluación y Voto del Representante (Acuerdo 002 de 2026)',
    context: 'Un aprendiz enfrenta un proceso disciplinario por daño culposo a una herramienta de laboratorio. Durante la sesión del Comité de Evaluación y Seguimiento, se debate si se aplica un Plan de Mejoramiento formativo o un Condicionamiento de Matrícula.',
    scenario: '¿Qué papel legal tiene el Representante de los Aprendices en dicha votación tras la reforma del Acuerdo 002 de 2026 al Artículo 48?',
    regulatoryReference: 'Capítulo VIII, Art. 48 (Comité de Evaluación y Seguimiento con Voz y Voto) - Acuerdo 002 de 2026',
    options: [
      {
        id: 'opt-3a',
        text: 'El Representante de los Aprendices solo puede quedarse en silencio escuchando y firmar la lista de asistencia sin opinar ni votar.',
        isCorrect: false,
        explanation: 'Incorrecto. En el pasado (Acuerdo 007 de 2012) el representante solo tenía voz consultiva, pero eso fue superado.'
      },
      {
        id: 'opt-3b',
        text: 'El Representante de los Aprendices cuenta con VOZ Y VOTO formal, participando en el análisis de las pruebas y votando en la decisión de la recomendación al Subdirector de Centro.',
        isCorrect: true,
        explanation: '¡Correcto! El Acuerdo 002 de 2026 modificó expresamente el Art. 48 para otorgar Voz y Voto pleno al Representante de los Aprendices, garantizando la democracia y la perspectiva estudiantil en las decisiones disciplinarias.'
      },
      {
        id: 'opt-3c',
        text: 'El Representante decide de forma unilateral sin consultar a los instructores ni al coordinador.',
        isCorrect: false,
        explanation: 'Incorrecto. El Comité es un cuerpo colegiado donde participan instructores, bienestar, coordinación y la representación de aprendices con voto igualitario.'
      }
    ]
  },
  {
    id: 'caso-4',
    title: 'Justicia Restaurativa y Mediación ante Conflicto de Convivencia',
    context: 'Dos aprendices tuvieron una discusión acalorada en un canal de chat por la distribución de tareas de un trabajo en equipo, causándose ofensas mutuas sin llegar a agresiones físicas.',
    scenario: '¿Cuál es la ruta que prioriza el reglamento vigente (Art. 44) antes de iniciar un proceso sancionatorio?',
    regulatoryReference: 'Capítulo VII, Art. 44 (Justicia Restaurativa y Mediación Pedagógica) - Acuerdo 009 de 2024 y Ac. 002 de 2026',
    options: [
      {
        id: 'opt-4a',
        text: 'Expulsión y cancelación inmediata de matrícula de ambos aprendices sin derecho a diálogo.',
        isCorrect: false,
        explanation: 'Incorrecto. Viola el debido proceso y la gradualidad de las medidas pedagógicas institucionales.'
      },
      {
        id: 'opt-4b',
        text: 'Activar un proceso de Mediación Pedagógica Comunitaria con acompañamiento del Vocero o Bienestar, acordando compromisos restaurativos de disculpa y trabajo en equipo para reparar la convivencia.',
        isCorrect: true,
        explanation: '¡Muy bien! El nuevo marco del reglamento prioriza la justicia restaurativa y la mediación pacífica para faltas leves, construyendo cultura de paz y diálogo antes de recurrir al Comité de Evaluación.'
      },
      {
        id: 'opt-4c',
        text: 'Ignorar la situación y dejar que el conflicto escale a agresiones físicas.',
        isCorrect: false,
        explanation: 'Incorrecto. La omisión puede derivar en faltas más graves; la mediación oportuna previene incidentes mayores.'
      }
    ]
  },
  {
    id: 'caso-5',
    title: 'Etapa Productiva en Emprendimiento de Economía Popular',
    context: 'Un aprendiz de Gestión Agropecuaria desea realizar su etapa productiva apoyando la tecnificación de la cooperativa campesina y panelera de su vereda natal, bajo modalidad híbrida.',
    scenario: '¿Es viable esta alternativa según las modificaciones del Acuerdo 002 de 2026 al Artículo 31?',
    regulatoryReference: 'Capítulo V, Art. 31 (Alternativas de Etapa Productiva y Economía Popular) - Acuerdo 002 de 2026',
    options: [
      {
        id: 'opt-5a',
        text: 'No es viable, porque la etapa productiva solo es válida si se firma un contrato de aprendizaje tradicional con una gran corporación de una ciudad capital.',
        isCorrect: false,
        explanation: 'Incorrecto. El reglamento modernizado rompe el esquema tradicional para dar cabida a iniciativas territoriales.'
      },
      {
        id: 'opt-5b',
        text: 'Sí es plenamente viable, ya que el Acuerdo 002 de 2026 incluyó la Economía Popular y Comunitaria y el teletrabajo/híbrido como modalidades reconocidas de etapa productiva con aval del Centro.',
        isCorrect: true,
        explanation: '¡Totalmente correcto! La reforma de 2026 valida unidades de economía popular, asociaciones comunitarias y proyectos productivos territoriales como escenarios formativos oficiales con seguimiento de instructor asignado.'
      },
      {
        id: 'opt-5c',
        text: 'Solo si el aprendiz renuncia a sus derechos como estudiante del SENA.',
        isCorrect: false,
        explanation: 'Incorrecto. El aprendiz conserva todos sus derechos y el acompañamiento formativo de la institución.'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-1',
    moduleCategory: 'identidad',
    question: '¿Qué representan los tres elementos gráficos presentes en el Escudo oficial del SENA?',
    options: [
      'Los tres colores de la bandera de Colombia: amarillo, azul y rojo.',
      'Los tres sectores de la economía nacional: primario/agropecuario, industria/construcción y comercio/servicios.',
      'Las tres sedes principales fundadas en Bogotá, Medellín y Cali.',
      'Los tres niveles de titulación: operario, técnico y tecnólogo.'
    ],
    correctIndex: 1,
    explanation: 'El Escudo del SENA integra la rueda dentada (industria), el caduceo (comercio/servicios) y el café con la espiga (sector agropecuario).',
    regulationArticle: 'Identidad Institucional - Símbolos SENA'
  },
  {
    id: 'q-2',
    moduleCategory: 'identidad',
    question: '¿Quién fue el visionario fundador del SENA en el año 1957 junto al respaldo de organizaciones sindicales y empresariales?',
    options: [
      'Gabriel García Márquez',
      'Rodolfo Martínez Tono',
      'Alberto Lleras Camargo',
      'José Celestino Mutis'
    ],
    correctIndex: 1,
    explanation: 'El economista cartagenero Rodolfo Martínez Tono concibió la idea y redactó el proyecto que dio origen al SENA mediante el Decreto Ley 118 de 1957.',
    regulationArticle: 'Historia Institucional SENA (1957)'
  },
  {
    id: 'q-3',
    moduleCategory: 'derechos',
    question: '¿Cuál es el plazo máximo que tiene un instructor para emitir la valoración y retroalimentación de una evidencia entregada por el aprendiz según el Acuerdo 009 de 2024?',
    options: [
      'Quince (15) días calendario.',
      'Ocho (8) días hábiles siguientes a la entrega de la evidencia.',
      'Hasta el último día del trimestre lectivo sin excepción.',
      'Veinticuatro (24) horas exactas.'
    ],
    correctIndex: 1,
    explanation: 'Según el Reglamento del Aprendiz vigente (Acuerdo 009 de 2024, Art. 8), el instructor dispone de un plazo perentorio de hasta ocho (8) días hábiles para valorar cualitativamente y retroalimentar en la plataforma oficial.',
    regulationArticle: 'Capítulo II, Art. 8 - Reglamento del Aprendiz (Acuerdo 009 de 2024)'
  },
  {
    id: 'q-4',
    moduleCategory: 'deberes',
    question: 'Si un aprendiz presenta un problema de salud o fuerza mayor que le impide asistir, ¿cuántos días hábiles tiene para radicar la respectiva justificación médica convalidada?',
    options: [
      'Un (1) día calendario.',
      'Hasta tres (3) días hábiles siguientes a la ocurrencia del hecho.',
      'Diez (10) días hábiles después de culminar la incapacidad.',
      'No es necesario justificar si el aprendiz avisa verbalmente a un compañero.'
    ],
    correctIndex: 1,
    explanation: 'El aprendiz debe presentar la justificación debidamente soportada ante el instructor y coordinación en un plazo máximo de tres (3) días hábiles (Art. 13).',
    regulationArticle: 'Capítulo III, Art. 13 - Justificación de Inasistencias (Acuerdo 009 de 2024)'
  },
  {
    id: 'q-5',
    moduleCategory: 'reglamento',
    question: '¿Qué modificación fundamental introdujo el Acuerdo 002 de 2026 al Artículo 48 del Reglamento sobre el Comité de Evaluación y Seguimiento?',
    options: [
      'Eliminó la participación de los aprendices en el Comité disciplinario.',
      'Otorgó VOZ Y VOTO formal al Representante de los Aprendices en las deliberaciones y recomendaciones del Comité.',
      'Hizo que el comité sesionara únicamente una vez cada dos años.',
      'Prohibió la presentación de pruebas y descargos por parte de los aprendices.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 002 de 2026 reformó el Art. 48 otorgando al Representante de los Aprendices del Centro pleno derecho a Voz y Voto en las decisiones del Comité, equiparando su peso participativo con los demás estamentos.',
    regulationArticle: 'Capítulo VIII, Art. 48 - Acuerdo 002 de 2026'
  },
  {
    id: 'q-6',
    moduleCategory: 'deberes',
    question: 'Respecto al uso de Inteligencia Artificial (IA) en evidencias de aprendizaje, el Artículo 14 del Acuerdo 009 de 2024 establece que:',
    options: [
      'La IA está completamente prohibida en el SENA bajo sanción de expulsión.',
      'Se puede usar como apoyo investigativo y formativo siempre que se declare su uso, se citen las fuentes y el aprendiz demuestre autoría y comprensión real.',
      'El aprendiz puede entregar código generado por IA haciéndolo pasar como propio sin declarar nada.',
      'La IA solo la pueden utilizar los instructores pero no los aprendices.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 009 de 2024 promueve la ética digital: la IA es válida como herramienta de apoyo, pero exige citación honesta, transparencia y que el aprendiz sea el autor intelectual de su análisis y aprendizaje.',
    regulationArticle: 'Capítulo III, Art. 14 - Uso Ético de Tecnologías e IA (Acuerdo 009 de 2024)'
  },
  {
    id: 'q-7',
    moduleCategory: 'reglamento',
    question: '¿Cuál es una de las grandes mejoras del nuevo reglamento respecto al antiguo Acuerdo 007 de 2012 en materia disciplinaria (Art. 44)?',
    options: [
      'Aumentar el monto de multas en dinero a los aprendices.',
      'Priorizar la Justicia Restaurativa y la Mediación Pedagógica comunitaria para resolver faltas leves antes de acudir a sanciones punitivas.',
      'Permitir que las quejas se resuelvan en redes sociales públicas.',
      'Eliminar el derecho a interponer recursos de reposición.'
    ],
    correctIndex: 1,
    explanation: 'El nuevo reglamento sustituye el modelo netamente punitivo por un modelo formativo-restaurativo de convivencia y mediación comunitaria para fortalecer la permanencia del aprendiz.',
    regulationArticle: 'Capítulo VII, Art. 44 - Justicia Restaurativa y Mediación (Acuerdo 009 de 2024 / Ac. 002 de 2026)'
  },
  {
    id: 'q-8',
    moduleCategory: 'fpi',
    question: '¿Qué nuevas alternativas de Etapa Productiva fueron formalizadas con las actualizaciones del Acuerdo 002 de 2026 en el Artículo 31?',
    options: [
      'Economía Popular y Comunitaria, proyectos de innovación SENNOVA y teletrabajo / modalidad híbrida.',
      'Únicamente empleo en el sector financiero tradicional.',
      'Trabajo no remunerado sin acompañamiento de ningún instructor.',
      'Ninguna, solo es válido el contrato de aprendizaje presencial.'
    ],
    correctIndex: 0,
    explanation: 'La reforma de 2026 integró la Economía Popular y Comunitaria, emprendimientos de base campesina y modalidades de teletrabajo/híbridas con total validez formativa.',
    regulationArticle: 'Capítulo V, Art. 31 - Alternativas de Etapa Productiva (Acuerdo 002 de 2026)'
  },
  {
    id: 'q-9',
    moduleCategory: 'deberes',
    question: 'El ciberacoso en grupos de WhatsApp, el hostigamiento digital y la violencia de género son clasificados en el Acuerdo 009 de 2024 como:',
    options: [
      'Faltas Leves que se solucionan con una llamada de atención no oficial.',
      'Faltas Gravísimas que activan la Ruta Violeta y pueden conllevar a la cancelación inmediata de matrícula e inhabilidad.',
      'Bromas estudiantiles sin repercusión en la formación.',
      'Asuntos que solo competen a la vida privada fuera del reglamento.'
    ],
    correctIndex: 1,
    explanation: 'El Acuerdo 009 de 2024 tipifica el ciberacoso y las violencias de género como faltas gravísimas bajo el principio de cero tolerancia y espacios seguros de aprendizaje.',
    regulationArticle: 'Capítulo III, Art. 15 - Prohibiciones y Faltas Gravísimas (Acuerdo 009 de 2024)'
  },
  {
    id: 'q-10',
    moduleCategory: 'derechos',
    question: 'En caso de una notificación de cargos o citación a Comité, ¿qué garantía mínima otorga el Artículo 50 del reglamento?',
    options: [
      'Notificación verbal 10 minutos antes de la sesión del comité.',
      'Notificación electrónica formal por correo institucional con un mínimo de tres (3) días hábiles para preparar descargos y aportar pruebas.',
      'Ninguna, el aprendiz es sancionado sin ser convocado.',
      'Pagar una fianza económica para suspender el comité disciplinario.'
    ],
    correctIndex: 1,
    explanation: 'El Art. 50 asegura la garantía constitucional del Debido Proceso: notificación digital formal con mínimo 3 días hábiles previos para radicar descargos y pruebas con trazabilidad completa.',
    regulationArticle: 'Capítulo VIII, Art. 50 - Debido Proceso y Notificaciones (Acuerdo 009 de 2024 / Ac. 002 de 2026)'
  }
];

export const INITIAL_APPRENTICES: Apprentice[] = [
  {
    id: 'app-001',
    fullName: 'Laura Sofía Gómez Morales',
    documentType: 'CC',
    documentNumber: '1020495821',
    email: 'lsgomez@misena.edu.co',
    ficha: '2874102',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    apprenticeRole: 'Vocero de Ficha',
    progressPercent: 100,
    inductionCompleted: true,
    score: 95,
    completedAt: '2026-10-24 14:30',
    certificateId: 'SENA-IND-2026-7842',
    completedModules: ['identidad', 'derechos-deberes', 'simulador', 'fpi', 'evaluacion'],
    phone: '312 458 9231',
    socioeconomicStratum: '2',
    populationGroup: 'General / Sin enfoque diferencial',
    trainingLevel: 'Tecnólogo',
    shift: 'Diurna',
    gender: 'Femenino',
    birthDate: '2004-05-18',
    eps: 'Nueva EPS',
    bloodType: 'O+',
    emergencyContactName: 'Gloria Morales (Madre)',
    emergencyContactPhone: '310 892 4512',
    characterizationCompleted: true,
    characterizationDate: '2026-10-20'
  },
  {
    id: 'app-002',
    fullName: 'Mateo Alejandro Ramírez Peña',
    documentType: 'TI',
    documentNumber: '1098471203',
    email: 'maramirez@misena.edu.co',
    ficha: '2874102',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    apprenticeRole: 'Aprendiz en Formación',
    progressPercent: 75,
    inductionCompleted: false,
    completedModules: ['identidad', 'derechos-deberes', 'simulador'],
    phone: '315 782 1904',
    socioeconomicStratum: '2',
    populationGroup: 'Jóvenes en Paz / Situación de vulnerabilidad',
    trainingLevel: 'Tecnólogo',
    shift: 'Diurna',
    gender: 'Masculino',
    birthDate: '2007-02-14',
    eps: 'Famisanar EPS',
    bloodType: 'A+',
    emergencyContactName: 'Carlos Ramírez (Padre)',
    emergencyContactPhone: '320 671 2893',
    characterizationCompleted: true,
    characterizationDate: '2026-10-22'
  },
  {
    id: 'app-003',
    fullName: 'Valentina Duque Jaramillo',
    documentType: 'CC',
    documentNumber: '1017234891',
    email: 'vduque@misena.edu.co',
    ficha: '2901543',
    programName: 'Técnico en Asistencia Administrativa',
    centerName: 'Centro de Gestión de Mercados, Logística y TIC',
    regional: 'Regional Antioquia',
    apprenticeRole: 'Representante de Centro con Voz y Voto',
    progressPercent: 100,
    inductionCompleted: true,
    score: 100,
    completedAt: '2026-10-25 10:15',
    certificateId: 'SENA-IND-2026-7890',
    completedModules: ['identidad', 'derechos-deberes', 'simulador', 'fpi', 'evaluacion'],
    phone: '300 481 9023',
    socioeconomicStratum: '3',
    populationGroup: 'Madre / Padre cabeza de familia',
    trainingLevel: 'Técnico',
    shift: 'Mixta',
    gender: 'Femenino',
    birthDate: '2001-11-09',
    eps: 'SURA EPS',
    bloodType: 'O-',
    emergencyContactName: 'Luz Marina Jaramillo (Madre)',
    emergencyContactPhone: '311 945 2810',
    characterizationCompleted: true,
    characterizationDate: '2026-10-21'
  },
  {
    id: 'app-004',
    fullName: 'Brayan Alexis Martínez Cárdenas',
    documentType: 'CC',
    documentNumber: '1032890123',
    email: 'bamartinez@misena.edu.co',
    ficha: '2874102',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    apprenticeRole: 'Aprendiz en Formación',
    progressPercent: 40,
    inductionCompleted: false,
    completedModules: ['identidad'],
    phone: '318 902 3415',
    socioeconomicStratum: '1',
    populationGroup: 'Víctima del conflicto armado / Desplazamiento',
    trainingLevel: 'Tecnólogo',
    shift: 'Diurna',
    gender: 'Masculino',
    birthDate: '2003-08-25',
    eps: 'Capital Salud EPS-S',
    bloodType: 'O+',
    emergencyContactName: 'Martha Cárdenas (Tía)',
    emergencyContactPhone: '314 209 8834',
    characterizationCompleted: true,
    characterizationDate: '2026-10-23'
  },
  {
    id: 'app-005',
    fullName: 'Daniela Fernanda Castro Ortiz',
    documentType: 'CC',
    documentNumber: '1005829143',
    email: 'dfcastro@misena.edu.co',
    ficha: '2893012',
    programName: 'Tecnólogo en Gestión del Talento Humano',
    centerName: 'Centro de Servicios Financieros',
    regional: 'Distrito Capital',
    apprenticeRole: 'Vocero de Ficha',
    progressPercent: 100,
    inductionCompleted: true,
    score: 90,
    completedAt: '2026-10-26 16:45',
    certificateId: 'SENA-IND-2026-7911',
    completedModules: ['identidad', 'derechos-deberes', 'simulador', 'fpi', 'evaluacion'],
    phone: '316 348 7619',
    socioeconomicStratum: '3',
    populationGroup: 'Comunidades Negras / Afrocolombianas / Palenqueras',
    trainingLevel: 'Tecnólogo',
    shift: 'Nocturna',
    gender: 'Femenino',
    birthDate: '2002-04-12',
    eps: 'Sanitas EPS',
    bloodType: 'B+',
    emergencyContactName: 'Jorge Castro (Hermano)',
    emergencyContactPhone: '317 650 9182',
    characterizationCompleted: true,
    characterizationDate: '2026-10-24'
  }
];

export const ENROLLED_FICHAS: FichaMatriculada[] = [
  {
    codigo: '2874102',
    programa: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    nivel: 'Tecnólogo',
    centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    jornada: 'Diurna',
    totalAprendices: 32,
    instructorLider: 'Ing. Carlos Eduardo Méndez'
  },
  {
    codigo: '2901543',
    programa: 'Técnico en Asistencia Administrativa',
    nivel: 'Técnico',
    centro: 'Centro de Gestión de Mercados, Logística y Tecnologías de la Información',
    regional: 'Regional Antioquia',
    jornada: 'Mixta',
    totalAprendices: 28,
    instructorLider: 'Dra. Martha Lucía Beltrán'
  },
  {
    codigo: '2893012',
    programa: 'Tecnólogo en Gestión del Talento Humano',
    nivel: 'Tecnólogo',
    centro: 'Centro de Servicios Financieros (CSF)',
    regional: 'Distrito Capital',
    jornada: 'Nocturna',
    totalAprendices: 30,
    instructorLider: 'Lic. Claudia Patricia Gómez'
  },
  {
    codigo: '2918230',
    programa: 'Tecnólogo en Gestión de Redes de Datos y Ciberseguridad',
    nivel: 'Tecnólogo',
    centro: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital',
    jornada: 'Diurna',
    totalAprendices: 25,
    instructorLider: 'Ing. Roberto Carlos Silva'
  },
  {
    codigo: '2945671',
    programa: 'Tecnólogo en Animación Digital y 3D',
    nivel: 'Tecnólogo',
    centro: 'Centro para la Industria de la Comunicación Gráfica (CENIGRAF)',
    regional: 'Distrito Capital',
    jornada: 'Virtual',
    totalAprendices: 35,
    instructorLider: 'Dis. Andrés Felipe Vega'
  },
  {
    codigo: '3012890',
    programa: 'Técnico en Mecatrónica y Automatización Industrial',
    nivel: 'Técnico',
    centro: 'Centro Industrial de Mantenimiento y Manufactura (CIMM)',
    regional: 'Regional Boyacá',
    jornada: 'Diurna',
    totalAprendices: 22,
    instructorLider: 'Ing. Jairo Alexander Torres'
  }
];

export const SAMPLE_INSTRUCTORS: InstructorSession[] = [
  {
    id: 'inst-001',
    fullName: 'Ing. Carlos Eduardo Méndez',
    documentType: 'CC',
    documentNumber: '79841230',
    email: 'cmendez@sena.edu.co',
    role: 'Instructor Líder de Inducción',
    assignedFichas: ['2874102', '2918230'],
    activeFicha: '2874102',
    centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
    regional: 'Distrito Capital'
  },
  {
    id: 'inst-002',
    fullName: 'Dra. Martha Lucía Beltrán',
    documentType: 'CC',
    documentNumber: '52389140',
    email: 'mbeltran@sena.edu.co',
    role: 'Coordinador Académico',
    assignedFichas: ['2901543', '2893012'],
    activeFicha: '2901543',
    centerName: 'Centro de Gestión de Mercados, Logística y TIC',
    regional: 'Regional Antioquia'
  },
  {
    id: 'inst-003',
    fullName: 'Lic. Claudia Patricia Gómez',
    documentType: 'CC',
    documentNumber: '51928430',
    email: 'cpgomez@sena.edu.co',
    role: 'Instructor Técnico de Programa',
    assignedFichas: ['2893012'],
    activeFicha: '2893012',
    centerName: 'Centro de Servicios Financieros (CSF)',
    regional: 'Distrito Capital'
  },
  {
    id: 'inst-004',
    fullName: 'Psic. Andrés Felipe Vega',
    documentType: 'CC',
    documentNumber: '80194852',
    email: 'afvega@sena.edu.co',
    role: 'Profesional de Bienestar al Aprendiz',
    assignedFichas: ['2874102', '2901543', '2893012', '2918230', '2945671', '3012890'],
    activeFicha: '2874102',
    centerName: 'Dirección de Bienestar Integral',
    regional: 'Distrito Capital'
  }
];
