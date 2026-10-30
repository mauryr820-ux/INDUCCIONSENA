import React from 'react';
import { Award, BookOpen, CheckCircle, Clock, GraduationCap, ShieldCheck, Sparkles, UserCheck, Users } from 'lucide-react';
import { Apprentice, ModuleId } from '../types/induction';
import { SenaLogo } from './SenaLogo';

interface HeroSectionProps {
  apprentice: Apprentice;
  onNavigateModule: (mod: ModuleId) => void;
  onOpenApprenticeSelector: () => void;
  onOpenLoginModal: (role: 'aprendiz' | 'instructor') => void;
  onOpenCharacterization?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  apprentice,
  onNavigateModule,
  onOpenApprenticeSelector,
  onOpenLoginModal,
  onOpenCharacterization,
}) => {
  const isApproved = apprentice.inductionCompleted && (apprentice.score ?? 0) >= 70;

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Induction Welcome and Context */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#00324D] dark:text-slate-300">
                <SenaLogo className="w-5 h-5 shrink-0" />
                <span className="text-[#39A900] font-bold">Servicio Nacional de Aprendizaje</span>
                <span aria-hidden="true">·</span>
                <span>Centro de Formación Profesional</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  Acuerdo 009 de 2024 · Actualizado 2026 (Ac. 002)
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight text-balance">
                Proceso de Inducción para Aprendices SENA
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl text-pretty leading-relaxed">
                Apropia la identidad, valores y símbolos institucionales. Conoce en profundidad tus derechos, 
                deberes y reglamento ético, y valida tus conocimientos para certificar tu ingreso oficial.
              </p>
            </div>

            {/* Prominent Dual Login Buttons Section */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-[#00324D] to-slate-950 text-white shadow-md border border-slate-700/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#39A900] animate-pulse"></span>
                  <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                    Acceso Oficial por Rol
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-300">
                  Fichas Matriculadas Activas
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                Ingresa con tu documento de identidad para personalizar tu ficha formativa o acceder al panel docente de seguimiento:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenLoginModal('aprendiz')}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs bg-[#39A900] hover:bg-[#329200] text-white shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <GraduationCap className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="leading-tight">Ingreso Aprendiz</p>
                    <p className="text-[10px] font-normal text-emerald-100 opacity-90 font-mono">Doc. Identidad & Ficha</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenLoginModal('instructor')}
                  className="py-2.5 px-4 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <UserCheck className="w-4 h-4 shrink-0 text-sky-300 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <p className="leading-tight">Ingreso Instructor</p>
                    <p className="text-[10px] font-normal text-slate-300 opacity-90 font-mono">Gestión de Fichas</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Apprentice Profile Card Banner */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39A900] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {apprentice.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900 dark:text-white">{apprentice.fullName}</h2>
                      {apprentice.apprenticeRole && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                          {apprentice.apprenticeRole}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {apprentice.documentType} {apprentice.documentNumber} · Ficha {apprentice.ficha}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  {onOpenCharacterization && (
                    <button
                      type="button"
                      onClick={onOpenCharacterization}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                      title="Editar o completar mis datos de caracterización institucional"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
                      <span>Mis Datos de Caracterización</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenLoginModal('aprendiz')}
                    className="text-xs font-semibold text-[#00324D] dark:text-sky-300 hover:text-[#39A900] transition-colors underline cursor-pointer"
                  >
                    Cambiar ficha o aprendiz
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 border-t border-slate-200/80 dark:border-slate-700">
                <p className="truncate sm:col-span-2">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Programa:</span> {apprentice.programName}
                </p>
                <p className="truncate">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Estrato:</span> {apprentice.socioeconomicStratum ? `Estrato ${apprentice.socioeconomicStratum}` : 'Estrato 2'}
                </p>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <p className="truncate">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Centro:</span> {apprentice.centerName}
                </p>
                <p className="truncate">
                  <span className="font-medium text-slate-700 dark:text-slate-200">Enfoque:</span> {apprentice.populationGroup || 'General / Inclusión'}
                </p>
              </div>

              {/* Progress bar */}
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Progreso de Apropiación:</span>
                  <span className="font-mono font-bold text-[#00324D] dark:text-emerald-400">{apprentice.progressPercent}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#39A900] to-emerald-500 transition-all duration-500 rounded-full"
                    style={{ width: `${apprentice.progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigateModule('evaluacion')}
                className="px-5 py-2.5 rounded-lg bg-[#39A900] text-white text-sm font-semibold hover:bg-[#329200] active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                {apprentice.inductionCompleted ? 'Repetir Evaluación' : 'Realizar Evaluación Interactiva'}
              </button>

              {isApproved && (
                <button
                  type="button"
                  onClick={() => onNavigateModule('certificado')}
                  className="px-5 py-2.5 rounded-lg bg-[#00324D] dark:bg-slate-800 text-white text-sm font-semibold hover:bg-slate-800 dark:hover:bg-slate-700 active:scale-95 transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400" />
                  Ver Certificado Oficial
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigateModule('derechos-deberes')}
                className="px-4 py-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                Explorar Reglamento
              </button>
            </div>

          </div>

          {/* Right Column: Visual Anchor with SENA Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md group">
              <img
                src="/src/assets/images/sena_induction_hero_1793115131226.jpg"
                alt="Ambiente moderno de formación profesional SENA con aprendices colombianos"
                className="w-full h-72 sm:h-84 object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider font-mono text-emerald-400 font-bold">
                  Formación Profesional Integral
                </span>
                <p className="text-base font-bold mt-1 text-balance">
                  "El SENA es el lugar donde el talento de Colombia se convierte en progreso real."
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-slate-300 font-mono">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                    33 Regionales
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-300" />
                    Etapa Lectiva & Productiva
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
