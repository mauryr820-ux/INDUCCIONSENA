import React from 'react';
import { Apprentice, InstructorSession } from '../types/induction';
import { 
  Award, 
  BookOpen, 
  Building2, 
  CheckCircle, 
  ChevronRight, 
  Compass, 
  FileSpreadsheet, 
  GraduationCap, 
  HeartHandshake, 
  Layers, 
  Scale, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users, 
  ArrowRight,
  Eye,
  FileCheck,
  Play
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface LandingPageProps {
  onSelectRoleAprendiz: () => void;
  onOpenCharacterization: () => void;
  onSelectRoleInstructor: () => void;
  currentApprentice: Apprentice;
  currentInstructor: InstructorSession;
  totalApprentices: number;
  onOpenGoogleSheets?: () => void;
  onOpenManual?: () => void;
  onOpenVideoTutorial?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectRoleAprendiz,
  onOpenCharacterization,
  onSelectRoleInstructor,
  currentApprentice,
  currentInstructor,
  totalApprentices,
  onOpenGoogleSheets,
  onOpenManual,
  onOpenVideoTutorial
}) => {
  return (
    <div className="space-y-12 sm:space-y-16 animate-fadeIn pb-12">
      
      {/* Institutional Top Banner & Hero Headline */}
      <section className="relative overflow-hidden pt-6 sm:pt-10 pb-12 rounded-3xl bg-gradient-to-b from-white via-slate-50 to-emerald-50/30 dark:from-slate-900 dark:via-[#041a2e] dark:to-[#031424] border border-slate-200 dark:border-slate-800 transition-colors">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-1/4 -mt-16 w-96 h-96 bg-[#39A900]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#00324D]/10 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs text-xs font-semibold text-slate-800 dark:text-slate-200">
            <SenaLogo className="w-4 h-4 shrink-0" />
            <span>Servicio Nacional de Aprendizaje SENA</span>
            <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-[#39A900] font-bold">Portal Oficial de Inducción</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight text-balance leading-tight">
              Bienvenido al Portal de Inducción Institucional <span className="text-[#39A900]">SENA</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-balance">
              Selecciona tu rol para ingresar al ecosistema de inducción. Los aprendices pueden diligenciar su caracterización integral y apropian el reglamento vigente (Acuerdo 009 de 2024 / Ac. 002 de 2026), mientras que los instructores gestionan y supervisan todos los datos de sus fichas matriculadas.
            </p>
          </div>

          {/* Institutional Regulations Badge Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono">
            <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-800">
              Acuerdo 009 de 2024 (Reglamento Vigente)
            </span>
            <span className="px-3 py-1 rounded-lg bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-300 font-bold border border-sky-300 dark:border-sky-800">
              Actualizado Acuerdo 002 de 2026
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 font-bold">
              33 Regionales · Cobertura Nacional
            </span>
          </div>

          {/* HERO QUICK ACTION BAR: VIDEO TUTORIAL & MANUAL */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            {onOpenVideoTutorial && (
              <button
                type="button"
                onClick={onOpenVideoTutorial}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#39A900] to-[#2e8800] hover:from-[#339700] hover:to-[#287800] text-white font-extrabold text-sm shadow-lg shadow-[#39A900]/25 hover:shadow-xl hover:shadow-[#39A900]/30 transition-all transform hover:-translate-y-0.5 cursor-pointer ring-2 ring-emerald-400/40"
                title="Abrir ventana flotante con el video tutorial y controles interactivos"
              >
                <div className="w-6 h-6 rounded-full bg-white/25 flex items-center justify-center shadow-inner">
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                </div>
                <span>Video Tutorial</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/25 font-mono tracking-wide uppercase">
                  Reproducir Video
                </span>
              </button>
            )}

            {onOpenManual && (
              <button
                type="button"
                onClick={onOpenManual}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-sm transition-all cursor-pointer"
                title="Abrir y consultar el manual de uso de la herramienta"
              >
                <BookOpen className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
                <span>Manual de Uso (manual.md)</span>
              </button>
            )}
          </div>

        </div>

      </section>

      {/* CORE FEATURE: DUAL ROLE SELECTION PORTAL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-2 mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#39A900]">
            Paso 1: Identificación y Acceso por Rol
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            ¿Cómo deseas ingresar al prototipo hoy?
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Elige el rol correspondiente para acceder a las herramientas personalizadas de formación o de supervisión docente:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* ROLE CARD 1: ROL APRENDIZ SENA */}
          <div className="relative rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-emerald-500/40 dark:border-emerald-500/30 hover:border-emerald-500 shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group">
            
            <div className="space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <GraduationCap className="w-3.5 h-3.5 text-[#39A900]" />
                  Para Nuevos Aprendices Matriculados
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Ficha activa: {currentApprentice.ficha}
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#39A900]/15 dark:bg-[#39A900]/25 text-[#39A900] flex items-center justify-center font-bold text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Soy Aprendiz SENA
                  </h3>
                  <p className="text-xs text-[#00324D] dark:text-emerald-400 font-semibold font-mono">
                    Ingreso a Inducción & Registro de Caracterización
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Ingresa a tu ruta de inducción institucional. Podrás <strong>agregar y actualizar tus datos de caracterización integral</strong> (identificación, contacto, ficha, estrato y enfoque diferencial), estudiar el reglamento y obtener tu certificación oficial de ingreso.
              </p>

              {/* Value Proposition List */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/60 text-xs">
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Formulario de Caracterización:</strong> Ingresa tus datos sociodemográficos, EPS y contactos de emergencia.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Ruta de Aprendizaje:</strong> 5 módulos con símbolos, derechos 2024/2026, simulador y ruta FPI.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span><strong>Evaluación y Certificado:</strong> Evaluación interactiva con folio institucional verificable.</span>
                </div>
              </div>

            </div>

            {/* Actions for Aprendiz */}
            <div className="pt-6 space-y-3">
              <button
                type="button"
                onClick={onOpenCharacterization}
                className="w-full py-3 px-5 rounded-xl bg-[#39A900] hover:bg-[#329200] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ingresar y Diligenciar Mis Datos de Caracterización</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onSelectRoleAprendiz}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar Directo a los Módulos de Inducción</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {onOpenVideoTutorial && (
                <button
                  type="button"
                  onClick={onOpenVideoTutorial}
                  className="w-full py-2.5 px-4 rounded-xl border-2 border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/40 hover:bg-emerald-100/80 dark:hover:bg-emerald-950/70 text-emerald-950 dark:text-emerald-200 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs group/vid"
                  title="Abrir ventana flotante con el video tutorial y controles interactivos"
                >
                  <Play className="w-3.5 h-3.5 fill-[#39A900] text-[#39A900] group-hover/vid:scale-110 transition-transform" />
                  <span>Video Tutorial</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#39A900]/15 text-[#39A900] font-mono font-bold">Interactivo</span>
                </button>
              )}

              {onOpenManual && (
                <button
                  type="button"
                  onClick={onOpenManual}
                  className="w-full py-2 px-4 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  title="Abrir y consultar el manual de uso interactivo para aprendices"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Consultar Manual de Usuario (manual.md)</span>
                </button>
              )}
            </div>

          </div>

          {/* ROLE CARD 2: ROL INSTRUCTOR SENA */}
          <div className="relative rounded-3xl bg-white dark:bg-slate-800/90 border-2 border-sky-500/40 dark:border-sky-500/30 hover:border-sky-500 shadow-xl transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group">
            
            <div className="space-y-6">
              
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                  <UserCheck className="w-3.5 h-3.5 text-sky-600" />
                  Para Docentes y Equipo de Bienestar
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {totalApprentices} aprendices en sistema
                </span>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#00324D]/10 dark:bg-sky-500/20 text-[#00324D] dark:text-sky-300 flex items-center justify-center font-bold text-2xl shrink-0 group-hover:scale-105 transition-transform">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Soy Instructor / Coordinador
                  </h3>
                  <p className="text-xs text-sky-700 dark:text-sky-400 font-semibold font-mono">
                    Supervisión Docente & Sincronización Google Drive
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Accede al panel de seguimiento docente y a la <strong>hoja de cálculo en Google Drive y Google Sheets</strong> sincronizada en tiempo real. Podrás supervisar <strong>lo que los aprendices van respondiendo pregunta por pregunta</strong>, consultar sus datos de caracterización completa (SofiaPlus) y evaluar el avance de tus fichas matriculadas.
              </p>

              {/* Value Proposition List */}
              <div className="space-y-2.5 p-4 rounded-2xl bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/60 text-xs">
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Google Drive & Sheets en Vivo:</strong> Supervisa en tiempo real las respuestas de los aprendices y la actualización de caracterización en Google Drive.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <Eye className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Visualización Total de Datos:</strong> Inspecciona la ficha integral de cada aprendiz con datos sociodemográficos y de salud.</span>
                </div>
                <div className="flex items-start gap-2.5 text-slate-800 dark:text-slate-200 font-medium">
                  <CheckCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <span><strong>Filtros por Ficha Matriculada:</strong> Monitorea ADSO, Asistencia Administrativa, Redes y progreso individual.</span>
                </div>
              </div>

            </div>

            {/* Actions for Instructor - Exclusivo para Instructor */}
            <div className="pt-6 space-y-3">
              {/* BOTÓN SOLICITADO: HOJA DE CÁLCULO EN GOOGLE DRIVE Y GOOGLE SHEETS EN VIVO */}
              {onOpenGoogleSheets && (
                <button
                  type="button"
                  onClick={onOpenGoogleSheets}
                  className="w-full py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer group/btn"
                  title="Acceso exclusivo Instructor: Ver hoja de cálculo en Google Drive con lo que van respondiendo los aprendices"
                >
                  <FileSpreadsheet className="w-4 h-4 shrink-0" />
                  <span>Ver Hoja Google Sheets en Google Drive (Respuestas en Vivo)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping shrink-0" />
                </button>
              )}

              <button
                type="button"
                onClick={onSelectRoleInstructor}
                className="w-full py-2.5 px-4 rounded-xl bg-[#00324D] hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
              >
                <Eye className="w-4 h-4 text-sky-300" />
                <span>Ingresar al Panel del Instructor (Ver Datos de Aprendices)</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400 font-mono text-center truncate">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instructor Activo: {currentInstructor.fullName} · {currentInstructor.role.split(' ')[0]} (Vista Exclusiva)</span>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* Highlights of the Induction Regulation Reforms (Acuerdo 009 de 2024 / Ac. 002 de 2026) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#39A900]">
              Marco Jurídico e Innovaciones Pedagógicas
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Aspectos Clave del Nuevo Reglamento del Aprendiz
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transformaciones sustantivas consagradas en el Acuerdo 009 de 2024 y optimizadas por el Acuerdo 002 de 2026:
            </p>
          </div>

          <button
            type="button"
            onClick={onSelectRoleAprendiz}
            className="text-xs font-bold text-[#00324D] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Ver artículos en detalle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-[#39A900] flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Debido Proceso Digital</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Notificación previa obligatoria con mínimo 3 días hábiles para radicar descargos ante comités disciplinarios con trazabilidad completa.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600 flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Salud Mental & Bienestar</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ruta integral prioritaria de acompañamiento psicosocial sin estigmatización ni sanciones ante crisis emocionales demostradas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Justicia Restaurativa</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Prioridad a la mediación pedagógica y reparación formativa antes de aplicar cancelaciones de matrícula o sanciones punitivas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Vocería con Voz y Voto</h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Fortalecimiento del liderazgo de los voceros de ficha y representantes de centro con incidencia real en comités y proyectos.
            </p>
          </div>

        </div>

      </section>

      {/* Visual Banner Preview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#00324D] via-slate-900 to-[#002236] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-700">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
              Formación Profesional Integral y Gratuita
            </span>
            <h3 className="text-xl sm:text-2xl font-bold">
              "El conocimiento transforma vidas y construye un país con justicia social."
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Completa todos los módulos de inducción, supera la evaluación con al menos el 70% y descarga tu certificado oficial expedido por la Dirección General del SENA.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onOpenGoogleSheets && (
              <button
                type="button"
                onClick={onOpenGoogleSheets}
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
                title="Ver hoja de cálculo sincronizada en Google Drive"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Hoja Google Sheets (Drive)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
              </button>
            )}

            {onOpenVideoTutorial && (
              <button
                type="button"
                onClick={onOpenVideoTutorial}
                className="py-3 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs border border-white/30 shadow-md transition-all flex items-center gap-2 cursor-pointer"
                title="Abrir ventana flotante con el video tutorial y controles interactivos"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Video Tutorial</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCharacterization}
              className="py-3 px-5 rounded-xl bg-[#39A900] hover:bg-[#329200] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Diligenciar Caracterización</span>
            </button>

            <button
              type="button"
              onClick={onSelectRoleInstructor}
              className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-sky-300" />
              <span>Ver Datos de Aprendices (Instructor)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
