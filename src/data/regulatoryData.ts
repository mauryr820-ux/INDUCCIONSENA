import { FullRegulatoryArticle, KeyImprovementAspect, RegulatoryChapter } from '../types/induction';

export const KEY_IMPROVEMENT_ASPECTS: KeyImprovementAspect[] = [
  {
    id: 'aspect-justicia-restaurativa',
    title: 'Del Régimen Punitivo a la Justicia Restaurativa',
    subtitle: 'Prioridad al diálogo pedagógico y resolución formativa',
    tagline: 'Artículos 9, 43 y 44 · Acuerdo 009/2024 & Acuerdo 002/2026',
    description: 'Sustituye el enfoque netamente sancionatorio del derogado Acuerdo 007 de 2012 por una doctrina de mediación comunitaria. Ante faltas leves o conflictos de convivencia entre pares, es imperativo celebrar un pacto pedagógico restaurativo con el Vocero de Ficha y el Coordinador antes de acudir a comités disciplinarios.',
    agreementSource: 'Acuerdo 009 de 2024 (Art. 44) & Acuerdo 002 de 2026',
    impactMetrics: 'Disminución del 64% en remisiones innecesarias a comités disciplinarios y mayor retención escolar.',
    relatedArticleIds: ['mat-3', 'mat-8'],
    practicalExample: 'Si dos compañeros discuten por la asignación de un computador de laboratorio, ya no son enviados de inmediato a comité de sanción; suscriben un compromiso de convivencia y trabajo colaborativo sin mancha en su hoja de vida académica.',
    colorTheme: 'emerald'
  },
  {
    id: 'aspect-voz-voto',
    title: 'Democratización Institucional: Voz y Voto en Comité',
    subtitle: 'Incidencia decisoria vinculante del aprendiz en las decisiones',
    tagline: 'Artículos 11 y 48 · Hito Histórico Acuerdo 002 de 2026',
    description: 'Históricamente, en el Acuerdo 007 de 2012 el Representante de los Aprendices solo contaba con "voz", sin poder de decisión real. El Acuerdo 002 de 2026 reformó el Artículo 48 otorgándole VOZ Y VOTO formal e igualitario en las deliberaciones y votaciones de recomendaciones disciplinarias y académicas.',
    agreementSource: 'Acuerdo 002 de 2026 (Reforma al Art. 48)',
    impactMetrics: 'Poder de decisión real: 1 voto vinculante por parte del estamento estudiantil en todos los centros de formación del país.',
    relatedArticleIds: ['mat-9'],
    practicalExample: 'En un comité donde se debate la cancelación de matrícula de un aprendiz con dificultades socioeconómicas, el voto del representante estudiantil puede definir el otorgamiento de un plan de mejoramiento alternativo.',
    colorTheme: 'sky'
  },
  {
    id: 'aspect-etica-ia',
    title: 'Ética Digital e Inteligencia Artificial Responsable',
    subtitle: 'Regulación de vanguardia para la era de la IA generativa',
    tagline: 'Artículo 14 · Acuerdo 009 de 2024',
    description: 'El nuevo reglamento no prohíbe la tecnología, sino que la encauza formativamente: permite el uso de IA como herramienta de apoyo, investigación o ideación, pero prohíbe taxativamente la copia indiscriminada sin citación y la presentación de código o ensayos generados por IA como autoría propia sin análisis crítico.',
    agreementSource: 'Acuerdo 009 de 2024 (Art. 14)',
    impactMetrics: 'Fomento del pensamiento crítico y la ética profesional frente a herramientas como ChatGPT, Claude o Copilot.',
    relatedArticleIds: ['mat-5'],
    practicalExample: 'Puedes usar IA para depurar un algoritmo o entender un concepto contable, pero debes citar el prompt y explicar la lógica con tus propias palabras en el informe de evidencias.',
    colorTheme: 'indigo'
  },
  {
    id: 'aspect-economia-popular',
    title: 'Economía Popular, Comunitaria y Teletrabajo',
    subtitle: 'Inclusión territorial campesina y flexibilidad para carreras de software',
    tagline: 'Artículos 31 y 32 · Reforma Acuerdo 002 de 2026',
    description: 'El derogado Acuerdo 007 de 2012 privilegiaba casi exclusivamente los contratos de aprendizaje en empresas del sector formal. El Acuerdo 002 de 2026 formaliza como alternativas válidas de Etapa Productiva el trabajo en unidades de la Economía Popular y Comunitaria, cooperativas agropecuarias y modalidades de teletrabajo o esquema híbrido.',
    agreementSource: 'Acuerdo 002 de 2026 (Arts. 31 y 32)',
    impactMetrics: 'Acceso efectivo a la certificación para más de 120.000 aprendices de zonas rurales y de programas virtuales de tecnologías de la información.',
    relatedArticleIds: ['mat-7'],
    practicalExample: 'Un aprendiz de ADSO (Desarrollo de Software) puede realizar su etapa productiva desarrollando una plataforma para la cooperativa cafetera de su municipio trabajando en modalidad 100% remota.',
    colorTheme: 'amber'
  },
  {
    id: 'aspect-salud-mental',
    title: 'Protección Integral a la Salud Mental y Ruta Violeta',
    subtitle: 'Cero tolerancia al ciberacoso y violencias de género',
    tagline: 'Artículos 2, 10 y 15 · Acuerdo 009/2024 & Acuerdo 002/2026',
    description: 'El bienestar del aprendiz trasciende el deporte y la recreación: se consagra el derecho al acompañamiento psicológico continuo, alertas tempranas de deserción por crisis emocionales con suspensión de términos, y se tipifica el ciberacoso y cualquier manifestación de violencia de género como Falta Gravísima sancionable.',
    agreementSource: 'Acuerdo 009 de 2024 & Acuerdo 002 de 2026 (Protocolo Ruta Violeta)',
    impactMetrics: 'Espacios seguros y libres de discriminación: suspensión justificada de tiempos académicos ante crisis de salud mental médica.',
    relatedArticleIds: ['mat-1', 'mat-4', 'mat-6'],
    practicalExample: 'Si un aprendiz sufre ciberacoso en un grupo institucional de WhatsApp o vive un cuadro de depresión aguda diagnosticado, se activa de oficio la Ruta Violeta y el Centro le brinda protección y prórroga académica.',
    colorTheme: 'rose'
  },
  {
    id: 'aspect-debido-proceso',
    title: 'Garantía Perentoria de Tiempos y Notificación Digital',
    subtitle: 'Blindaje procesal, fin a la incertidumbre y plazos claros',
    tagline: 'Artículos 8, 13, 50 y 52 · Acuerdo 009/2024 & Acuerdo 002/2026',
    description: 'Se acaban los plazos indefinidos: los instructores tienen máximo ocho (8) días hábiles para retroalimentar y calificar evidencias; el aprendiz dispone de tres (3) días hábiles para justificar inasistencias; y en procesos de comité, la notificación electrónica por correo institucional es obligatoria con tres (3) días de antelación para radicar descargos.',
    agreementSource: 'Acuerdo 009 de 2024 & Acuerdo 002 de 2026',
    impactMetrics: 'Cumplimiento del Artículo 29 constitucional: 100% de trazabilidad auditable y derecho a réplica garantizado.',
    relatedArticleIds: ['mat-2', 'mat-10'],
    practicalExample: 'Si un aprendiz es citado a comité, no pueden fijar un aviso en cartelera de sorpresa; deben enviarle la citación con cargos detallados a su correo @misena.edu.co con 3 días hábiles para preparar su defensa.',
    colorTheme: 'purple'
  }
];

export const FULL_REGULATION_CHAPTERS: RegulatoryChapter[] = [
  {
    id: 'cap-1',
    numberRoman: 'I',
    title: 'Principios, Enfoque Diferencial y Campo de Aplicación',
    description: 'Establece los fundamentos filosóficos, valores institucionales, enfoque de género, campesino y ámbito legal para todos los aprendices del país.',
    articlesRange: 'Artículos 1 al 6',
    articles: [
      {
        number: 1,
        articleCode: 'Artículo 1',
        title: 'Principios de la Formación Profesional Integral',
        summary: 'La FPI se sustenta en el desarrollo armónico del ser humano, la dignidad y la solidaridad.',
        fullText: 'La Formación Profesional Integral del SENA propende por el desarrollo de conocimientos, destrezas, aptitudes y valores para el desempeño productivo en el mundo del trabajo, basada en el respeto a la vida, la equidad social y la ética ciudadana.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Dignidad Humana',
        scope: 'Principios'
      },
      {
        number: 2,
        articleCode: 'Artículo 2',
        title: 'Enfoque Diferencial, Étnico, Campesino y de Género (Ruta Violeta)',
        summary: 'Garantía de no discriminación y protección prioritaria a comunidades vulnerables y diversidad.',
        fullText: 'Todas las actuaciones, procesos pedagógicos y decisiones disciplinarias en el SENA deben incorporar de manera transversal el enfoque diferencial, reconociendo la identidad de género, la pertenencia étnica, el origen campesino y las condiciones de discapacidad. Se adopta la Ruta Violeta institucional para la prevención y atención inmediata de violencias basadas en género.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Ruta Violeta y Salud Mental',
        scope: 'Principios'
      },
      {
        number: 3,
        articleCode: 'Artículo 3',
        title: 'Campo y Ámbito de Aplicación',
        summary: 'Rige a todos los matriculados en cualquier modalidad formativa en el territorio nacional.',
        fullText: 'El presente reglamento es de obligatorio cumplimiento para toda persona con matrícula activa en programas de formación titulada o complementaria, en modalidades presencial, virtual, a distancia, combinada o híbrida, en cualquier Centro de Formación del SENA en Colombia o en convenios internacionales.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        scope: 'Principios'
      },
      {
        number: 4,
        articleCode: 'Artículo 4',
        title: 'Calidad y Condición de Aprendiz SENA',
        summary: 'Reconocimiento formal de los derechos y deberes desde el momento de la matrícula.',
        fullText: 'Se adquiere la calidad de Aprendiz SENA con la formalización del acto de matrícula en el sistema de gestión académica (Sofia Plus / Zajuna) y se conserva durante el desarrollo de las etapas lectiva y productiva hasta la certificación o retiro formal.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Principios'
      },
      {
        number: 5,
        articleCode: 'Artículo 5',
        title: 'Pérdida del Carácter de Aprendiz',
        summary: 'Causales legales: certificación, cancelación de matrícula o retiro voluntario.',
        fullText: 'El aprendiz pierde su condición institucional por: 1) Graduación y expedición del título o certificado; 2) Cancelación formal de la matrícula emanada por acto administrativo motivado; 3) Retiro voluntario aceptado; o 4) Deserción declarada en firme.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Administrativo'
      },
      {
        number: 6,
        articleCode: 'Artículo 6',
        title: 'Carné Institucional Físico o Digital',
        summary: 'Documento oficial único de acreditación y seguridad en sedes.',
        fullText: 'El Centro de Formación debe expedir oportunamente al aprendiz su carné institucional físico o su credencial digital homologada con código QR auditable. El aprendiz tiene el deber de portarlo visiblemente en las instalaciones y para el acceso a plataformas y beneficios de Bienestar.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isNewRight: true,
        scope: 'Administrativo'
      }
    ]
  },
  {
    id: 'cap-2',
    numberRoman: 'II',
    title: 'Derechos del Aprendiz SENA',
    description: 'Catálogo de garantías inalienables de formación, evaluación justa, salud mental y representación.',
    articlesRange: 'Artículos 7 al 12',
    articles: [
      {
        number: 7,
        articleCode: 'Artículo 7',
        title: 'Derecho a la Formación Profesional Integral de Calidad',
        summary: 'Acceso a programas actualizados, ambientes dotados, instructores competentes y TICs.',
        fullText: 'El aprendiz tiene derecho a recibir formación técnica y humana acorde con los perfiles curriculares, haciendo uso equitativo de los ambientes pedagógicos, laboratorios, bibliotecas, talleres, conectividad y materiales asignados para el desarrollo de competencias.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        scope: 'Académico'
      },
      {
        number: 8,
        articleCode: 'Artículo 8',
        title: 'Evaluación Oportuna y Retroalimentación Pedagógica (Plazo 8 Días Hábiles)',
        summary: 'Conocer valoraciones y observaciones en un término improrrogable de 8 días hábiles.',
        fullText: 'Es derecho fundamental del aprendiz conocer las evaluaciones y la retroalimentación cualitativa de sus evidencias de aprendizaje en la plataforma institucional Zajuna/Sofia Plus en un término perentorio no mayor a ocho (8) días hábiles siguientes a la entrega.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Garantía de Tiempos y Calificación',
        scope: 'Académico'
      },
      {
        number: 9,
        articleCode: 'Artículo 9',
        title: 'Concertación Previa de Planes de Mejoramiento Académico',
        summary: 'El plan de mejoramiento es un derecho formativo preventivo, no un castigo posterior.',
        fullText: 'Cuando un aprendiz presente dificultades en el alcance de un resultado de aprendizaje, tiene derecho a concertar con su instructor un Plan de Mejoramiento Académico preventivo, con actividades complementarias y plazos justos, antes de ser remitido al Comité de Evaluación y Seguimiento.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isNewRight: true,
        keyAspectTag: 'Justicia Restaurativa y Pedagogía',
        scope: 'Académico'
      },
      {
        number: 10,
        articleCode: 'Artículo 10',
        title: 'Salud Mental, Bienestar Integral y Apoyo Psicosocial',
        summary: 'Acceso a profesionales psicosociales, monitorías, deporte y suspensión justificada por crisis.',
        fullText: 'El aprendiz tiene derecho a acceder a los programas integrales de Bienestar al Aprendiz, incluyendo atención y orientación en salud mental, apoyo socioemocional, auxilios de sostenimiento según normatividad, y a la suspensión temporal y concertada de actividades académicas cuando medie prescripción médica o psicológica certificada.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Salud Mental y Bienestar',
        scope: 'Bienestar'
      },
      {
        number: 11,
        articleCode: 'Artículo 11',
        title: 'Participación Democrática y Representación Estudiantil',
        summary: 'Derecho a elegir y ser elegido vocero de ficha, líder y representante con incidencia vinculante.',
        fullText: 'Los aprendices tienen derecho a organizarse democráticamente, elegir a sus voceros de ficha, líderes de programa y representantes de centro, quienes actuarán como interlocutores formales y participarán con VOZ Y VOTO en los comités respectivos de conformidad con el Artículo 48.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Voz y Voto del Representante',
        scope: 'Participación'
      },
      {
        number: 12,
        articleCode: 'Artículo 12',
        title: 'Libertad de Expresión, Respeto y Debido Proceso',
        summary: 'Formular peticiones respetuosas, debatir con libertad y gozar de presunción de inocencia.',
        fullText: 'Gozar de la presunción de inocencia en toda instancia, presentar peticiones, quejas y reclamos con respuesta oportuna, expresar sus ideas con respeto y contar con asistencia en descargos disciplinarios.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Principios'
      }
    ]
  },
  {
    id: 'cap-3',
    numberRoman: 'III',
    title: 'Deberes del Aprendiz SENA',
    description: 'Responsabilidades académicas, presenciales, virtuales y de ética en el uso de tecnologías.',
    articlesRange: 'Artículos 13 y 14',
    articles: [
      {
        number: 13,
        articleCode: 'Artículo 13',
        title: 'Compromiso Formativo, Asistencia y Justificación de Novedades',
        summary: 'Asistir con puntualidad y justificar inasistencias en un plazo máximo de 3 días hábiles.',
        fullText: 'Cumplir con el cronograma y guías de aprendizaje. En caso de inasistencia o incumplimiento por fuerza mayor o incapacidad médica, el aprendiz debe radicar la justificación documental ante el instructor o coordinación en un plazo no mayor a tres (3) días hábiles.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Garantía de Tiempos y Calificación',
        scope: 'Académico'
      },
      {
        number: 14,
        articleCode: 'Artículo 14',
        title: 'Autoría Intelectual, Integridad Académica y Uso Ético de Inteligencia Artificial (IA)',
        summary: 'Deber de elaborar trabajos genuinos; la IA debe ser citada y no reemplaza la producción propia.',
        fullText: 'El aprendiz debe asegurar la autenticidad y autoría original de sus proyectos y evidencias. Se autoriza el uso de modelos de Inteligencia Artificial y herramientas digitales únicamente como soporte de indagación o consulta, siendo obligatorio citar las fuentes y herramientas utilizadas. La presentación íntegra de respuestas o códigos generados por IA simulando autoría personal constituye fraude académico.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Ética Digital e Inteligencia Artificial',
        scope: 'Académico'
      }
    ]
  },
  {
    id: 'cap-4',
    numberRoman: 'IV',
    title: 'Prohibiciones y Clasificación de las Faltas',
    description: 'Conductas prohibidas, tipificación jurídica de faltas leves, graves y gravísimas.',
    articlesRange: 'Artículos 15 al 19',
    articles: [
      {
        number: 15,
        articleCode: 'Artículo 15',
        title: 'Ciberacoso, Violencia Digital y Violencias Basadas en Género (Faltas Gravísimas)',
        summary: 'Tolerancia cero ante hostigamiento en redes, difamación íntima o discriminación sexista.',
        fullText: 'Constituye Falta Gravísima cometer cualquier acto de acoso escolar, ciberacoso en redes sociales, difusión no consentida de imágenes íntimas, hostigamiento sexual, transfobia, homofobia o cualquier forma de violencia basada en género dentro de los ambientes o plataformas del SENA.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Ruta Violeta y Salud Mental',
        scope: 'Disciplinario'
      },
      {
        number: 16,
        articleCode: 'Artículo 16',
        title: 'Sustancias Psicoactivas, Alcohol y Armas',
        summary: 'Prohibición estricta de ingreso, consumo o porte en cualquier sede o actividad SENA.',
        fullText: 'Está terminantemente prohibido ingresar a las sedes, ambientes o giras del SENA bajo el efecto de alcohol o sustancias psicoactivas, así como su porte, comercialización o suministro, y el ingreso de cualquier arma u objeto cortopunzante o peligroso.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 17,
        articleCode: 'Artículo 17',
        title: 'Fraude Académico y Suplantación de Identidad',
        summary: 'Suplantar a otro aprendiz o permitir que otro realice evaluaciones es causal de sanción grave.',
        fullText: 'Se prohíbe cometer plagio intencional, suplantar a compañeros en plataformas virtuales o permitir el acceso de terceros con credenciales institucionales personales para resolver exámenes o evidencias.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 18,
        articleCode: 'Artículo 18',
        title: 'Cuidado y Preservación de Bienes Institucionales',
        summary: 'Uso debido de máquinas, herramientas, software licenciado y laboratorios.',
        fullText: 'Prohibido deteriorar, hurtar, sabotear o usar indebidamente bienes, equipos, servidores, maquinaria o inventarios de la institución o de las empresas formadoras.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 19,
        articleCode: 'Artículo 19',
        title: 'Criterios para la Graduación de las Faltas (Leves, Graves y Gravísimas)',
        summary: 'Evaluación del dolo o culpa, reiteración, afectación a la comunidad y antecedentes.',
        fullText: 'Las faltas se clasificarán como Leves, Graves o Gravísimas atendiendo a: grado de culpabilidad, reiteración de la conducta, daño causado a la comunidad formativa, confesión oportuna y resarcimiento voluntario del daño.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      }
    ]
  },
  {
    id: 'cap-5',
    numberRoman: 'V',
    title: 'Etapa Productiva y Sus Alternativas Formativas',
    description: 'Regula las modalidades de práctica: contratos de aprendizaje, proyectos, economía popular y teletrabajo.',
    articlesRange: 'Artículos 20 al 32',
    articles: [
      {
        number: 20,
        articleCode: 'Artículo 20',
        title: 'Naturaleza Formativa de la Etapa Productiva',
        summary: 'Aplicación real de competencias en el entorno productivo con seguimiento concertado.',
        fullText: 'La etapa productiva permite al aprendiz consolidar y enriquecer las competencias adquiridas en la etapa lectiva mediante la ejecución de actividades productivas reales acordes a su perfil ocupacional.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Académico'
      },
      {
        number: 31,
        articleCode: 'Artículo 31',
        title: 'Alternativas de Etapa Productiva e Inclusión de la Economía Popular y Comunitaria',
        summary: 'Reconoce contratos, SENNOVA, pasantías y unidades asociativas comunitarias y campesinas.',
        fullText: 'Son alternativas válidas para la etapa productiva: 1) Contrato de Aprendizaje; 2) Pasantía en empresas o entidades públicas; 3) Apoyo a una unidad productiva familiar; 4) Participación en proyectos de investigación aplicada e innovación SENNOVA; y 5) Vinculación directa con organizaciones de la Economía Popular y Comunitaria, cooperativas agropecuarias y asociaciones comunales.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Economía Popular y Teletrabajo',
        scope: 'Académico'
      },
      {
        number: 32,
        articleCode: 'Artículo 32',
        title: 'Modalidad de Teletrabajo y Esquema Híbrido en la Etapa Productiva',
        summary: 'Validez jurídica para que aprendices laboren de manera remota con supervisión virtual.',
        fullText: 'En programas de formación del sector de tecnologías, software, servicios y afines, la etapa productiva podrá desarrollarse total o parcialmente bajo modalidad de teletrabajo o esquema híbrido, mediando concertación previa con la empresa y el instructor de seguimiento con bitácoras digitales periódicas.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Economía Popular y Teletrabajo',
        scope: 'Académico'
      }
    ]
  },
  {
    id: 'cap-6',
    numberRoman: 'VI',
    title: 'Trámites Administrativos del Registro Académico',
    description: 'Gestión de novedades: traslados, aplazamientos, reingresos, retiros y protocolo de deserción.',
    articlesRange: 'Artículos 33 al 42',
    articles: [
      {
        number: 33,
        articleCode: 'Artículo 33',
        title: 'Traslado de Centro o de Jornada',
        summary: 'Solicitud fundamentada sujeta a disponibilidad de cupo y avance de resultados.',
        fullText: 'El aprendiz podrá solicitar traslado de centro o de jornada ante el Subdirector de Centro, siempre que haya culminado al menos el primer periodo académico y exista cupo disponible.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Administrativo'
      },
      {
        number: 34,
        articleCode: 'Artículo 34',
        title: 'Aplazamiento y Reingreso al Programa',
        summary: 'Pausa motivada hasta por seis meses prorrogables ante causales debidamente acreditadas.',
        fullText: 'El aplazamiento es la solicitud justificada del aprendiz para suspender temporalmente su formación por un periodo de hasta seis (6) meses prorrogables por una sola vez en casos de salud, fuerza mayor o servicio militar.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Administrativo'
      },
      {
        number: 37,
        articleCode: 'Artículo 37',
        title: 'Protocolo de Deserción Escolar y Debido Proceso de Citación',
        summary: 'Tres días sin reporte motivan citación; 5 días para presentar descargos antes de declarar deserción.',
        fullText: 'Se configura deserción cuando el aprendiz acumule tres (3) días consecutivos de inasistencia no justificada en formación presencial o un mes sin ingresar a plataformas virtuales en etapa lectiva. El Centro debe expedir una citación por correo electrónico otorgando cinco (5) días hábiles para justificar antes de emitir acto de cancelación.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        isModified2024: true,
        keyAspectTag: 'Garantía de Tiempos y Calificación',
        scope: 'Administrativo'
      }
    ]
  },
  {
    id: 'cap-7',
    numberRoman: 'VII',
    title: 'Medidas Formativas y Justicia Restaurativa',
    description: 'Mecanismos pedagógicos, diálogo comunitario, planes de mejoramiento y llamados de atención.',
    articlesRange: 'Artículos 43 al 46',
    articles: [
      {
        number: 43,
        articleCode: 'Artículo 43',
        title: 'Finalidad Pedagógica y No Punitiva de las Medidas Formativas',
        summary: 'Las medidas buscan reorientar la conducta del aprendiz y asegurar la culminación exitosa.',
        fullText: 'Las medidas formativas tienen como propósito esencial el acompañamiento pedagógico, la reflexión ética y la modificación constructiva de actitudes del aprendiz, desestimando cualquier fin meramente sancionatorio.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 44,
        articleCode: 'Artículo 44',
        title: 'Justicia Restaurativa y Mediación Comunitaria Formativa',
        summary: 'Obligación de agotar acuerdos restaurativos ante faltas leves antes de cualquier trámite de comité.',
        fullText: 'Ante faltas leves o controversias interpersonales en el aula o plataforma, se priorizará la Justicia Restaurativa a través de un diálogo mediado por el Vocero de Ficha y el Coordinador Académico. Si se suscribe y cumple un Pacto de Reparación Pedagógica Comunitaria, el expediente se cerrará definitivamente sin registro sancionatorio alguno.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Justicia Restaurativa y Pedagogía',
        scope: 'Disciplinario'
      },
      {
        number: 45,
        articleCode: 'Artículo 45',
        title: 'Llamado de Atención por Escrito y Compromiso Formativo',
        summary: 'Medida académica o disciplinaria preventiva que suscribe compromisos específicos.',
        fullText: 'Consiste en una comunicación pedagógica motivada emitida por el instructor o coordinador, en la cual se detallan los incumplimientos y se pacta una ruta de compromisos formativos verificables.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 46,
        articleCode: 'Artículo 46',
        title: 'Plan de Mejoramiento Disciplinario',
        summary: 'Conjunto de actividades pedagógicas y comunitarias acordadas para superar conductas.',
        fullText: 'Documento concertado con el aprendiz para la ejecución de acciones formativas o de servicio comunitario en el Centro durante un plazo no mayor a quince (15) días calendario.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      }
    ]
  },
  {
    id: 'cap-8',
    numberRoman: 'VIII',
    title: 'Debido Proceso, Comité de Evaluación y Sanciones',
    description: 'Estructura procesal, voz y voto estudiantil, notificaciones electrónicas y recursos de ley.',
    articlesRange: 'Artículos 47 al 56',
    articles: [
      {
        number: 47,
        articleCode: 'Artículo 47',
        title: 'Principios Constitucionales del Debido Proceso',
        summary: 'Garantía del Artículo 29 de la Constitución Política: legalidad, defensa y contradicción.',
        fullText: 'Nadie podrá ser sancionado sino conforme a las normas preexistentes, ante la autoridad competente, garantizando la presunción de inocencia, el derecho de contradicción, el traslado de pruebas y la posibilidad de controvertir la decisión.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 48,
        articleCode: 'Artículo 48',
        title: 'Comité de Evaluación y Seguimiento: VOZ Y VOTO del Representante',
        summary: 'El representante estudiantil adquiere voto formal y vinculante en todas las decisiones.',
        fullText: 'El Comité de Evaluación y Seguimiento estará integrado por el Coordinador Misional o Académico, instructores del programa, el profesional de Bienestar y el Representante de los Aprendices del Centro, quien contará legalmente con VOZ Y VOTO decisorio en todas las deliberaciones y recomendaciones sancionatorias o pedagógicas.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Voz y Voto del Representante',
        scope: 'Participación'
      },
      {
        number: 50,
        articleCode: 'Artículo 50',
        title: 'Notificación Electrónica Obligatoria y Término para Descargos',
        summary: 'Citación formal por correo institucional con mínimo 3 días hábiles previos para presentar pruebas.',
        fullText: 'La citación a Comité de Evaluación y el traslado de cargos se notificará obligatoriamente a la cuenta de correo institucional del aprendiz (@misena.edu.co), con acuse de recibo y una antelación mínima de tres (3) días hábiles para que el aprendiz prepare y radique sus descargos y pruebas correspondientes.',
        sourceAgreement: 'Acuerdo 002 de 2026',
        isReformed2026: true,
        keyAspectTag: 'Garantía de Tiempos y Calificación',
        scope: 'Disciplinario'
      },
      {
        number: 51,
        articleCode: 'Artículo 51',
        title: 'Sanciones Disciplinarias: Condicionamiento y Cancelación de Matrícula',
        summary: 'Medidas extremas adoptadas únicamente por resolución motivada del Subdirector de Centro.',
        fullText: 'Las sanciones aplicables son: 1) Condicionamiento de matrícula con plan formativo estricto; y 2) Cancelación formal de la matrícula, la cual implica la pérdida definitiva del carácter de aprendiz y acarrea inhabilidad institucional.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 52,
        articleCode: 'Artículo 52',
        title: 'Recurso de Reposición',
        summary: 'El aprendiz tiene derecho a apelar la resolución sancionatoria en el término de 5 días hábiles.',
        fullText: 'Contra el acto administrativo expedido por el Subdirector de Centro procede el Recurso de Reposición, el cual deberá interponerse por escrito o correo institucional dentro de los cinco (5) días hábiles siguientes a la notificación.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Disciplinario'
      },
      {
        number: 56,
        articleCode: 'Artículo 56',
        title: 'Vigencia y Derogatorias',
        summary: 'Rige a partir de su publicación y deroga expresamente el Acuerdo 007 de 2012.',
        fullText: 'El presente reglamento rige a partir de su publicación oficial y deroga expresamente el Acuerdo 007 de 2012 y todas las disposiciones institucionales que le sean contrarias.',
        sourceAgreement: 'Acuerdo 009 de 2024',
        scope: 'Administrativo'
      }
    ]
  }
];

export interface ReformInteractiveSimulation {
  id: string;
  title: string;
  situation: string;
  options: {
    label: string;
    isCorrect: boolean;
    feedback: string;
    normativeBasis: string;
  }[];
}

export const REFORM_INTERACTIVE_SIMULATIONS: ReformInteractiveSimulation[] = [
  {
    id: 'sim-1',
    title: 'Situación 1: Plazo de Calificación del Instructor (Art. 8)',
    situation: 'Entregaste tu proyecto formativo hace 12 días hábiles y el instructor aún no te ha evaluado ni emitido observaciones en Zajuna. ¿Qué dice el nuevo reglamento?',
    options: [
      {
        label: 'Debes esperar indefinidamente hasta que termine el trimestre.',
        isCorrect: false,
        feedback: 'Incorrecto. El Acuerdo 007 de 2012 dejaba vacíos, pero el Acuerdo 009 de 2024 fijó límites estrictos.',
        normativeBasis: 'Art. 8 (Acuerdo 009 de 2024)'
      },
      {
        label: 'Tienes derecho legal a exigir retroalimentación porque el plazo máximo es de 8 días hábiles.',
        isCorrect: true,
        feedback: '¡Exacto! El Art. 8 consagra el derecho inalienable a recibir valoración y retroalimentación pedagógica en máximo 8 días hábiles.',
        normativeBasis: 'Art. 8 (Cap. II - Acuerdo 009 de 2024)'
      },
      {
        label: 'Quedas automáticamente aprobado sin revisión.',
        isCorrect: false,
        feedback: 'Incorrecto. La calificación automática no existe; lo que surge es tu derecho a requerir al instructor o coordinación.',
        normativeBasis: 'Art. 8 (Acuerdo 009 de 2024)'
      }
    ]
  },
  {
    id: 'sim-2',
    title: 'Situación 2: El Representante de Aprendices en el Comité (Art. 48)',
    situation: 'En una sesión del Comité de Evaluación y Seguimiento de tu Centro se vota si se cancela la matrícula a un aprendiz. El Coordinador afirma que el representante estudiantil solo puede hablar pero no votar. ¿Es correcto?',
    options: [
      {
        label: 'Es correcto, los estudiantes nunca pueden votar sanciones.',
        isCorrect: false,
        feedback: 'Así era en el viejo reglamento de 2012, pero eso cambió.',
        normativeBasis: 'Acuerdo 007 de 2012 (Derogado)'
      },
      {
        label: 'Es falso: el Acuerdo 002 de 2026 reformó el Art. 48 otorgándole VOZ Y VOTO formal al representante.',
        isCorrect: true,
        feedback: '¡Correcto! Es una de las reformas más trascendentales: el representante de los aprendices tiene voto vinculante en igualdad de condiciones.',
        normativeBasis: 'Art. 48 reformado por Acuerdo 002 de 2026'
      },
      {
        label: 'Solo vota si hay empate entre los instructores.',
        isCorrect: false,
        feedback: 'Falso. Su voto es parte de la votación regular desde el inicio de la deliberación.',
        normativeBasis: 'Art. 48 (Acuerdo 002 de 2026)'
      }
    ]
  },
  {
    id: 'sim-3',
    title: 'Situación 3: Alternativa en Economía Popular Campesina (Art. 31)',
    situation: 'Un aprendiz de Gestión Agroempresarial desea hacer su etapa productiva asesorando a una asociación comunitaria campesina de su vereda en lugar de una gran multinacional. ¿El Centro puede rechazarlo?',
    options: [
      {
        label: 'Sí, porque solo son válidas las empresas privadas con personería jurídica tradicional.',
        isCorrect: false,
        feedback: 'Esa era la limitación del acuerdo anterior.',
        normativeBasis: 'Acuerdo 007 de 2012'
      },
      {
        label: 'No puede rechazarlo: el Acuerdo 002 de 2026 (Art. 31) incluyó expresamente a la Economía Popular y Comunitaria.',
        isCorrect: true,
        feedback: '¡Excelente! El Acuerdo 002 de 2026 reconoció y democratizó la práctica formativa en unidades de economía comunitaria y popular.',
        normativeBasis: 'Art. 31 reformado por Acuerdo 002 de 2026'
      },
      {
        label: 'Solo si el aprendiz paga una póliza especial.',
        isCorrect: false,
        feedback: 'Falso. La normatividad no exige pólizas extraordinarias para economía popular.',
        normativeBasis: 'Art. 31 (Acuerdo 002 de 2026)'
      }
    ]
  }
];
