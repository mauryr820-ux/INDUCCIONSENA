import React, { useState } from 'react';
import { Award, BookOpen, Briefcase, Check, Compass, Cpu, ExternalLink, GraduationCap, Heart, HelpCircle, Laptop, Users } from 'lucide-react';

interface ModuleFPIProps {
  isCompleted: boolean;
  onCompleteModule: () => void;
  onNextModule: () => void;
}

export const ModuleFPI: React.FC<ModuleFPIProps> = ({
  isCompleted,
  onCompleteModule,
  onNextModule
}) => {
  const [activeFpiTab, setActiveFpiTab] = useState<'etapas' | 'modalidades' | 'plataformas' | 'bienestar'>('etapas');

  const modalities = [
    {
      title: 'Contrato de Aprendizaje',
      desc: 'Vinculación formativa con una empresa patrocinadora que otorga apoyo de sostenimiento económico y afiliación a EPS y ARL.',
      highlight: 'Modalidad principal con inmersión directa en el sector productivo.'
    },
    {
      title: 'Proyecto Productivo',
      desc: 'Formulación y ejecución de un emprendimiento o solución técnica que resuelve una necesidad real con asesoría de instructores SENA.',
      highlight: 'Articulado con el Fondo Emprender y unidades de investigación.'
    },
    {
      title: 'Pasantía Empresarial',
      desc: 'Práctica concertada con entidades públicas, ONG o empresas para la aplicación directa de competencias técnicas específicas.',
      highlight: 'Requiere convenio y plan de concertación de actividades avalado.'
    },
    {
      title: 'Vinculación Laboral Previa',
      desc: 'Si ya laboras en un cargo cuyas funciones se relacionan directamente con el programa de formación, puedes homologar tu etapa práctica.',
      highlight: 'Sujeto a certificación laboral y validación del coordinador de centro.'
    },
    {
      title: 'Monitoría Institucional',
      desc: 'Apoyo técnico y pedagógico en ambientes de aprendizaje, laboratorios o dependencias del SENA con reconocimiento de estímulo.',
      highlight: 'Convocatorias internas semestrales para aprendices destacados.'
    },
    {
      title: 'Economía Popular y Comunitaria (Reforma 2026 - Art. 31)',
      desc: 'Desarrollo de la etapa práctica brindando asesoría y transferencia tecnológica en asociaciones campesinas, cooperativas de base o unidades productivas familiares.',
      highlight: 'Novedad Acuerdo 002 de 2026 para fortalecer el tejido productivo territorial.'
    },
    {
      title: 'Teletrabajo y Modalidad Híbrida (Reforma 2026)',
      desc: 'Ejecución del contrato de aprendizaje o pasantía en modalidad remota o híbrida para programas de base digital (software, analítica, diseño) con seguimiento virtual.',
      highlight: 'Facilidad de inserción laboral sin desplazamientos obligatorios.'
    }
  ];

  const platforms = [
    {
      name: 'SofiaPlus / Zajuna',
      purpose: 'Plataforma oficial de gestión académica, matrícula, registro de juicios evaluativos y campus virtual LMS con guías y foros.',
      tag: 'Campus Virtual & Notas'
    },
    {
      name: 'Agencia Pública de Empleo (APE)',
      purpose: 'Bolsa de empleo pública y gratuita que conecta a los aprendices y egresados con vacantes laborales verificadas en todo el país.',
      tag: 'Inserción Laboral'
    },
    {
      name: 'Correo @misena.edu.co',
      purpose: 'Cuenta de correo institucional con suite completa de Microsoft 365, Teams, almacenamiento OneDrive y licencias educativas.',
      tag: 'Comunicación Oficial'
    },
    {
      name: 'Sistema de Bibliotecas SENA',
      purpose: 'Acceso ilimitado a miles de libros técnicos, bases de datos científicas internacionales, revistas indexadas y repositorios.',
      tag: 'Investigación & Recursos'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D]">
          <span className="text-[#39A900]">Módulo 04</span>
          <span aria-hidden="true">·</span>
          <span>Formación Profesional Integral</span>
          <span aria-hidden="true">·</span>
          <span>Ruta Formativa y Bienestar</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          La Ruta de Formación Profesional Integral (FPI)
        </h2>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-balance">
          Comprende la estructura de tu programa formativo, las fases lectiva y productiva, las herramientas digitales 
          institucionales y los servicios integrales de Bienestar al Aprendiz.
        </p>
      </div>

      {/* Hero card with Classroom Image */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <img
          src="/src/assets/images/sena_learning_hub_1793115133013.jpg"
          alt="Ambiente colaborativo de aprendizaje SENA"
          className="w-full h-56 sm:h-64 object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent flex flex-col justify-center p-6 sm:p-10 text-white max-w-2xl">
          <span className="text-xs font-mono font-bold text-emerald-400">APRENDER HACIENDO</span>
          <h3 className="text-xl sm:text-2xl font-bold mt-1">Metodología Formativa Basada en Competencias</h3>
          <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
            En el SENA no solo adquieres conocimientos teóricos; desarrollas habilidades prácticas reales para 
            resolver problemas productivos con criterio ético y de calidad.
          </p>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveFpiTab('etapas')}
          className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeFpiTab === 'etapas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Etapas Lectiva y Productiva
        </button>
        <button
          onClick={() => setActiveFpiTab('modalidades')}
          className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeFpiTab === 'modalidades' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Alternativas de Etapa Productiva
        </button>
        <button
          onClick={() => setActiveFpiTab('plataformas')}
          className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeFpiTab === 'plataformas' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Ecosistema Digital (SofiaPlus & Zajuna)
        </button>
        <button
          onClick={() => setActiveFpiTab('bienestar')}
          className={`px-4 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
            activeFpiTab === 'bienestar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Bienestar al Aprendiz
        </button>
      </div>

      {/* Tab 1: Etapas */}
      {activeFpiTab === 'etapas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#39A900] flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#39A900]">FASE 01</span>
              <h3 className="text-lg font-bold text-slate-900">Etapa Lectiva</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Es el periodo de apropiación de conocimientos, ciencia y técnica en los ambientes de aprendizaje del SENA (talleres, laboratorios y aulas virtuales).
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <p>• <strong className="text-slate-900">Guías de Aprendizaje:</strong> Documentos orientadores con actividades y evidencias.</p>
              <p>• <strong className="text-slate-900">Proyecto Formativo:</strong> Columna vertebral donde aplicas lo aprendido a un caso real.</p>
              <p>• <strong className="text-slate-900">Evaluación:</strong> Juicios evaluativos de <em>Aprobado (A)</em> o <em>No Aprobado (D)</em>.</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00324D] flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-bold text-[#00324D]">FASE 02</span>
              <h3 className="text-lg font-bold text-slate-900">Etapa Productiva</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Es la aplicación directa y fortalecimiento de tus competencias en un entorno laboral real empresarial o mediante proyecto productivo.
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <p>• <strong className="text-slate-900">Duración:</strong> Equivale generalmente a 6 meses de inmersión práctica continua.</p>
              <p>• <strong className="text-slate-900">Seguimiento:</strong> Un instructor asignado realiza visitas y bitácoras periódicas.</p>
              <p>• <strong className="text-slate-900">Certificación:</strong> Requisito obligatorio e insustituible para obtener tu título.</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Modalidades */}
      {activeFpiTab === 'modalidades' && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500">
            El SENA brinda múltiples opciones para que elijas la que mejor se adapte a tu perfil y proyecto de vida:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {modalities.map((m, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-[#39A900]">OPCIÓN 0{idx + 1}</span>
                  <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-medium text-[#00324D]">
                    {m.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Plataformas */}
      {activeFpiTab === 'plataformas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platforms.map((p, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#39A900]">{p.tag}</span>
                <Laptop className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{p.purpose}</p>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Bienestar al Aprendiz */}
      {activeFpiTab === 'bienestar' && (
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-[#39A900]">APOYO INTEGRAL</span>
            <h3 className="text-xl font-bold text-slate-900">Programas de Bienestar al Aprendiz</h3>
            <p className="text-slate-600 text-sm max-w-3xl leading-relaxed">
              El área de Bienestar acompaña tu permanencia con servicios gratuitos enfocados en tu salud mental, 
              física, estímulos socioeconómicos y formación ciudadana.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <h5 className="text-xs font-bold text-slate-900">Salud y Prevención</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Primeros auxilios, campañas de salud preventiva y orientación psicológica individual.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h5 className="text-xs font-bold text-slate-900">Apoyos de Sostenimiento</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convocatorias de apoyo económico mensual (FIC y Regular) para aprendices en condiciones socioeconómicas vulnerables.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Users className="w-5 h-5 text-[#39A900]" />
              <h5 className="text-xs font-bold text-slate-900">Deporte y Cultura</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Grupos representativos de música, danza, teatro, fútbol, voleibol y juegos zonales nacionales SENA.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <Compass className="w-5 h-5 text-[#00324D]" />
              <h5 className="text-xs font-bold text-slate-900">Liderazgo y Vocería</h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Escuela de líderes, elección de voceros de ficha y representación estudiantil activa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Module Completion Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isCompleted ? 'Módulo 04 Apropiado' : 'Apropiar Módulo 04'}
            </p>
            <p className="text-xs text-slate-500">
              Ruta formativa comprendida: etapas lectiva/productiva y plataformas oficiales.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCompleteModule}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isCompleted
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#39A900] text-white hover:bg-[#329200]'
            }`}
          >
            {isCompleted ? 'Completado ✓' : 'Marcar como Leído'}
          </button>
          
          <button
            type="button"
            onClick={onNextModule}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#39A900] text-white hover:bg-[#329200] transition-colors flex items-center gap-1.5"
          >
            Ir a la Evaluación Interactiva →
          </button>
        </div>
      </div>

    </div>
  );
};
