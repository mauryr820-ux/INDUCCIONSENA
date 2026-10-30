export type DocumentType = 'CC' | 'TI' | 'CE' | 'PEP';

export type ApprenticeSubRole = 
  | 'Aprendiz en Formación'
  | 'Vocero de Ficha'
  | 'Representante de Centro con Voz y Voto';

export type InstructorRole = 
  | 'Instructor Técnico de Programa'
  | 'Instructor Líder de Inducción'
  | 'Coordinador Académico'
  | 'Profesional de Bienestar al Aprendiz';

export interface FichaMatriculada {
  codigo: string;
  programa: string;
  nivel: 'Tecnólogo' | 'Técnico' | 'Operario' | 'Especialización Tecnológica';
  centro: string;
  regional: string;
  jornada: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual';
  totalAprendices: number;
  instructorLider?: string;
}

export interface InstructorSession {
  id: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  email: string;
  role: InstructorRole;
  assignedFichas: string[];
  activeFicha: string;
  centerName: string;
  regional: string;
}

export interface Apprentice {
  id: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  email: string;
  ficha: string;
  programName: string;
  centerName: string;
  regional: string;
  apprenticeRole?: ApprenticeSubRole;
  progressPercent: number;
  inductionCompleted: boolean;
  score?: number;
  completedAt?: string;
  certificateId?: string;
  completedModules: string[];
  
  // Datos completos de caracterización SENA (SofiaPlus)
  phone?: string;
  socioeconomicStratum?: '1' | '2' | '3' | '4' | '5' | '6';
  populationGroup?: string;
  trainingLevel?: 'Tecnólogo' | 'Técnico' | 'Operario' | 'Especialización Tecnológica';
  shift?: 'Diurna' | 'Nocturna' | 'Mixta' | 'Virtual';
  gender?: 'Femenino' | 'Masculino' | 'No binario' | 'Prefiero no reportar';
  birthDate?: string;
  eps?: string;
  bloodType?: 'O+' | 'O-' | 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-';
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  characterizationCompleted?: boolean;
  characterizationDate?: string;

  // Seguimiento de respuestas en tiempo real para Google Sheets
  quizAnswers?: Record<number, number>;
  latestAnswer?: {
    questionIndex: number;
    questionText: string;
    selectedText: string;
    isCorrect: boolean;
    timestamp: string;
  };
}

export type ModuleId = 'identidad' | 'derechos-deberes' | 'simulador' | 'fpi' | 'evaluacion' | 'certificado';

export interface SenaSymbol {
  id: string;
  name: string;
  title: string;
  significance: string;
  elements: { item: string; meaning: string }[];
}

export interface SenaValue {
  id: string;
  name: string;
  definition: string;
  apprenticeAction: string;
}

export interface RightOrDuty {
  id: string;
  type: 'derecho' | 'deber' | 'prohibicion';
  article: string;
  title: string;
  description: string;
  category: 'Academico' | 'Disciplinario' | 'Bienestar' | 'Representacion' | 'General';
  keyTakeaway: string;
}

export interface CaseDilemma {
  id: string;
  title: string;
  context: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  regulatoryReference: string;
}

export interface QuizQuestion {
  id: string;
  moduleCategory: 'identidad' | 'derechos' | 'deberes' | 'fpi' | 'reglamento';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  regulationArticle: string;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  passed: boolean;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  completedDate: string;
}

export interface RegulatoryArticleComparison {
  id: string;
  article: string;
  topic: string;
  previousRule: string;
  currentRule2024: string;
  update2026?: string;
  keyImprovement: string;
  chapter: string;
  status: 'modificado_2024' | 'reformado_2026' | 'nuevo_derecho';
  aspectId?: string;
  practicalExample?: string;
  legalCitation?: string;
}

export interface KeyImprovementAspect {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  agreementSource: string;
  impactMetrics: string;
  relatedArticleIds: string[];
  practicalExample: string;
  colorTheme: 'emerald' | 'sky' | 'purple' | 'amber' | 'rose' | 'indigo';
}

export interface FullRegulatoryArticle {
  number: number;
  articleCode: string;
  title: string;
  summary: string;
  fullText: string;
  sourceAgreement: 'Acuerdo 009 de 2024' | 'Acuerdo 002 de 2026';
  isReformed2026?: boolean;
  isModified2024?: boolean;
  isNewRight?: boolean;
  keyAspectTag?: string;
  scope: 'Académico' | 'Disciplinario' | 'Bienestar' | 'Participación' | 'Administrativo' | 'Principios';
}

export interface RegulatoryChapter {
  id: string;
  numberRoman: string;
  title: string;
  description: string;
  articlesRange: string;
  articles: FullRegulatoryArticle[];
}
