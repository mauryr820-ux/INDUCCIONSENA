import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Compass, 
  Scale, 
  GraduationCap, 
  FileText,
  Search,
  ExternalLink,
  Download
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface UserManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserManualModal: React.FC<UserManualModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [filterQuery, setFilterQuery] = useState<string>('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-5xl h-[90vh] max-h-[850px] rounded-2xl shadow-2xl border border-slate-300 dark:border-slate-700 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="bg-[#00324D] text-white px-4 sm:px-6 py-4 flex items-center justify-between gap-4 shrink-0 border-b border-sky-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#39A900] border border-white/20 shrink-0">
              <BookOpen className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Guía Oficial de Inducción
                </span>
                <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700">
                  manual.md
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Manual de Uso de la Herramienta para Aprendices SENA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Cerrar manual de usuario"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container with Sidebar and Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Navigation Sidebar */}
          <aside className="w-full md:w-64 bg-slate-50 dark:bg-slate-800/60 border-r border-slate-200 dark:border-slate-700 p-3 space-y-1 shrink-0 overflow-y-auto">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1">
              Contenido del Manual
            </p>

            <button
              type="button"
              onClick={() => setActiveSection('intro')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'intro'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <SenaLogo className="w-4 h-4 shrink-0" />
              <span>1. Introducción & Propósito</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('acceso')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'acceso'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <GraduationCap className="w-4 h-4 shrink-0" />
              <span>2. Ingreso y Selección de Rol</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('caracterizacion')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'caracterizacion'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>3. Caracterización SofiaPlus</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('modulos')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'modulos'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>4. Los 5 Módulos de Formación</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('evaluacion')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'evaluacion'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>5. Evaluación y Certificado</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('faq')}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                activeSection === 'faq'
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>6. Preguntas Frecuentes (FAQ)</span>
            </button>
          </aside>

          {/* Main Manual Body */}
          <main className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
            
            {activeSection === 'intro' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
                    <SenaLogo className="w-5 h-5 shrink-0" />
                    Bienvenido a la Inducción Institucional SENA
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">
                    Normativa legal: Acuerdo 009 de 2024 y optimizado por el Acuerdo 002 de 2026.
                  </p>
                </div>

                <p>
                  Este aplicativo web ha sido diseñado como tu entorno interactivo oficial para que apropies la filosofía, deberes y derechos de nuestra comunidad formativa. La inducción es el primer paso obligatorio de tu formación profesional integral.
                </p>

                <h4 className="font-bold text-slate-900 dark:text-white text-base">¿Qué lograrás en esta plataforma?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <span className="font-bold text-[#00324D] dark:text-sky-300">1. Apropiar la Identidad</span>
                    <p className="text-slate-600 dark:text-slate-400">Historia, bandera, escudo, himno y los valores éticos que distinguen al aprendiz SENA.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <span className="font-bold text-[#00324D] dark:text-sky-300">2. Conocer tus Derechos y Deberes</span>
                    <p className="text-slate-600 dark:text-slate-400">Actualizado con las reformas 2024 y 2026 (salud mental, justicia restaurativa y debido proceso).</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <span className="font-bold text-[#00324D] dark:text-sky-300">3. Diligenciar tu Caracterización</span>
                    <p className="text-slate-600 dark:text-slate-400">Registrar tus datos sociodemográficos, de salud y contacto para recibir apoyos de bienestar.</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <span className="font-bold text-[#00324D] dark:text-sky-300">4. Certificarte Oficialmente</span>
                    <p className="text-slate-600 dark:text-slate-400">Superar la evaluación interactiva con mínimo 70% y descargar tu certificado con código de folio.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'acceso' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  2. Ingreso y Selección de Rol
                </h3>
                <p>
                  La plataforma cuenta con dos portales independientes: uno para **Aprendices** y otro para **Instructores**:
                </p>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/30 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
                      <GraduationCap className="w-5 h-5 text-emerald-600" />
                      <span>Rol Aprendiz (Tu Acceso)</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      En la Landing Page, haz clic en el botón verde <strong>"Ingresar y Diligenciar Mis Datos de Caracterización"</strong> o en <strong>"Ingreso Aprendiz"</strong> en el encabezado. Puedes ingresar con tu cédula o tarjeta de identidad y seleccionar tu ficha asignada.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-sky-300 bg-sky-50/50 dark:bg-sky-950/30 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-sky-900 dark:text-sky-200">
                      <ShieldCheck className="w-5 h-5 text-sky-600" />
                      <span>Rol Instructor (Supervisión Docente)</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      Este portal es exclusivo para el equipo de instructores y bienestar. En él supervisan las fichas matriculadas y la hoja de cálculo en Google Drive donde se reciben tus respuestas.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'caracterizacion' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#39A900]" />
                  3. Ficha de Caracterización Socioeconómica SofiaPlus
                </h3>
                <p>
                  Es indispensable que completes tu caracterización para que el SENA pueda brindarte beneficios de alimentación, transporte, conectividad y apoyos de sostenimiento.
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Pasos para diligenciarla:</p>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>Presiona el botón <strong>"Caracterización"</strong> en el encabezado o en la Landing Page.</li>
                    <li>Verifica o edita tus datos de documento, nombres y apellidos.</li>
                    <li>Ingresa tu correo institucional <code>@misena.edu.co</code> y teléfono de contacto.</li>
                    <li>Selecciona tu estrato socioeconómico (1 al 6) y grupo poblacional.</li>
                    <li>Registra tu EPS, grupo sanguíneo (RH) y la información de tu contacto de emergencia.</li>
                    <li>Haz clic en <strong>"Guardar y Confirmar Caracterización"</strong>.</li>
                  </ol>
                </div>
              </div>
            )}

            {activeSection === 'modulos' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  4. Los 5 Módulos de Formación de la Inducción
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <h4 className="font-bold text-[#00324D] dark:text-emerald-400 text-sm">
                      Módulo 01: Identidad y Símbolos Institucionales
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Estudia la misión y visión del SENA, el significado del escudo, la bandera, el logo y el himno oficial.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <h4 className="font-bold text-[#00324D] dark:text-emerald-400 text-sm">
                      Módulo 02: Derechos y Deberes (Acuerdo 009 de 2024 / Ac. 002 de 2026)
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Revisa en detalle tus derechos, obligaciones y prohibiciones, además de las garantías pedagógicas de salud mental y justicia restaurativa reformadas en 2026.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <h4 className="font-bold text-[#00324D] dark:text-emerald-400 text-sm">
                      Módulo 03: Simulador de Casos y Dilemas
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Resuelve situaciones reales sobre inasistencias justificadas, ética en el ambiente de formación y convivencia institucional.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 space-y-1">
                    <h4 className="font-bold text-[#00324D] dark:text-emerald-400 text-sm">
                      Módulo 04: Ruta de Formación Profesional Integral (FPI)
                    </h4>
                    <p className="text-slate-600 dark:text-slate-300">
                      Conoce las etapas lectiva y productiva, las alternativas de práctica (contrato de aprendizaje, pasantías, monitorías) y servicios de Bienestar.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'evaluacion' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  5. Evaluación Interactiva y Certificación Oficial
                </h3>
                
                <p>
                  Al culminar los módulos formativos, presentarás la **Evaluación de Apropiación**:
                </p>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                    <li>Consta de <strong>10 preguntas formativas</strong> de opción múltiple.</li>
                    <li>Para aprobar y habilitar tu certificado requieres un puntaje mínimo del <strong>70%</strong>.</li>
                    <li>Al confirmar cada respuesta, recibirás retroalimentación inmediata con el artículo del reglamento correspondiente.</li>
                    <li>Tu respuesta se sincroniza al instante en la hoja de cálculo del instructor en Google Drive.</li>
                    <li>Una vez aprobada, se generará tu <strong>Certificado Oficial con Folio Institucional</strong> que podrás imprimir o guardar en PDF.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'faq' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  6. Preguntas Frecuentes (FAQ)
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">¿Qué pasa si no alcanzo el 70% en la evaluación?</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Puedes reintentar la prueba haciendo clic en "Reintentar Evaluación". El objetivo es formativo y puedes presentarla las veces necesarias.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">¿Dónde se encuentra este documento en el proyecto?</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Este documento completo se encuentra en la raíz del proyecto bajo el nombre <code>manual.md</code> y <code>MANUAL.md</code>.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">¿Tiene algún costo el certificado?</p>
                    <p className="text-slate-600 dark:text-slate-300">
                      No. Todos los procesos, cursos y certificaciones del SENA son 100% gratuitos y públicos.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <span className="font-mono text-slate-500">
            Archivo oficial: /manual.md · SENA Dirección General
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#00324D] text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Entendido / Cerrar Manual
          </button>
        </div>

      </div>
    </div>
  );
};
