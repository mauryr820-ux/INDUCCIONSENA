import React from 'react';
import { Apprentice } from '../types/induction';
import { 
  Award, 
  BookOpen, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  GraduationCap, 
  HeartHandshake, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Users, 
  X,
  AlertCircle
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentice: Apprentice | null;
  onSimulateApprenticeView: (apprentice: Apprentice) => void;
  onViewCertificate?: (apprentice: Apprentice) => void;
}

export const ApprenticeDetailModal: React.FC<ApprenticeDetailModalProps> = ({
  isOpen,
  onClose,
  apprentice,
  onSimulateApprenticeView,
  onViewCertificate
}) => {
  if (!isOpen || !apprentice) return null;

  const isApproved = apprentice.inductionCompleted && (apprentice.score ?? 0) >= 70;

  const modulesList = [
    { id: 'identidad', label: '01. Identidad y Símbolos Institucionales' },
    { id: 'derechos-deberes', label: '02. Derechos y Deberes (Ac. 009/2024 - Ac. 002/2026)' },
    { id: 'simulador', label: '03. Simulador de Casos y Dilemas Éticos' },
    { id: 'fpi', label: '04. Ruta Formación Integral (FPI) y Bienestar' },
    { id: 'evaluacion', label: '05. Evaluación de Conocimientos del Reglamento' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-3xl w-full shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden animate-fadeIn">
        
        {/* Header with Apprentice Identity Banner */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00324D] via-slate-900 to-[#002236] text-white flex items-start justify-between gap-4 border-b border-slate-700 shrink-0">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-xl border border-white/20 shrink-0">
              {apprentice.fullName.charAt(0)}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded border border-emerald-800">
                  Ficha {apprentice.ficha}
                </span>
                {apprentice.apprenticeRole && (
                  <span className="text-[10px] font-mono text-sky-200 bg-sky-950/70 px-2 py-0.5 rounded border border-sky-800">
                    {apprentice.apprenticeRole}
                  </span>
                )}
                {isApproved ? (
                  <span className="text-[10px] font-mono text-emerald-300 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#39A900]" /> Inducción Aprobada
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-amber-300">
                    {apprentice.progressPercent > 0 ? `En Progreso (${apprentice.progressPercent}%)` : 'Pendiente de Inicio'}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                {apprentice.fullName}
              </h2>
              <p className="text-xs text-slate-300 font-mono">
                {apprentice.documentType} {apprentice.documentNumber} · {apprentice.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Executive Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Progreso de Inducción</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  {apprentice.progressPercent}%
                </span>
                <span className="text-[10px] text-slate-500">
                  {apprentice.completedModules?.length || 0} de 5 módulos
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#39A900] rounded-full"
                  style={{ width: `${apprentice.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Calificación en Evaluación</span>
              <div className="flex items-baseline gap-2">
                {apprentice.score !== undefined ? (
                  <span className={`text-xl font-bold font-mono ${isApproved ? 'text-[#39A900]' : 'text-rose-600'}`}>
                    {apprentice.score}%
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-slate-400 font-mono">Sin presentar</span>
                )}
                {apprentice.score !== undefined && (
                  <span className="text-[10px] text-slate-500">
                    {apprentice.score >= 70 ? 'Competente (Aprobado)' : 'No Aprobado'}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">Mínimo para certificar: 70%</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Certificación Oficial</span>
              <div className="truncate">
                {apprentice.certificateId ? (
                  <span className="text-xs font-mono font-bold text-[#00324D] dark:text-emerald-400 truncate block">
                    {apprentice.certificateId}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400 italic">No emitido aún</span>
                )}
              </div>
              <p className="text-[10px] text-slate-500">
                {apprentice.completedAt ? `Emitido el ${apprentice.completedAt}` : 'Requiere aprobar la evaluación'}
              </p>
            </div>
          </div>

          {/* Section 1: Datos Personales y de Contacto */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <User className="w-4 h-4 text-[#39A900]" />
              <span>1. Identificación y Datos Personales</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Nombres y Apellidos</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{apprentice.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Documento de Identidad</span>
                <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                  {apprentice.documentType} {apprentice.documentNumber}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Correo MiSENA</span>
                <span className="font-mono text-slate-800 dark:text-slate-200 truncate block">{apprentice.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Teléfono / WhatsApp</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {apprentice.phone || 'No registrado'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Fecha de Nacimiento</span>
                <span className="text-slate-800 dark:text-slate-200">{apprentice.birthDate || '2004-05-18'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Identidad de Género</span>
                <span className="text-slate-800 dark:text-slate-200">{apprentice.gender || 'Reportado en ficha'}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Información Académica y Ficha Matriculada */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <GraduationCap className="w-4 h-4 text-[#00324D] dark:text-sky-400" />
              <span>2. Información Académica y Formación Profesional SENA</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Programa de Formación</span>
                <span className="font-bold text-slate-900 dark:text-white">{apprentice.programName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Ficha de Caracterización</span>
                <span className="font-mono font-bold text-[#00324D] dark:text-emerald-400">
                  Ficha {apprentice.ficha}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Nivel de Formación</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {apprentice.trainingLevel || 'Tecnólogo'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Jornada Formativa</span>
                <span className="text-slate-800 dark:text-slate-200">{apprentice.shift || 'Diurna'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Rol Institucional</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  {apprentice.apprenticeRole || 'Aprendiz en Formación'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Centro de Formación</span>
                <span className="text-slate-800 dark:text-slate-200">{apprentice.centerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Regional</span>
                <span className="text-slate-800 dark:text-slate-200">{apprentice.regional}</span>
              </div>
            </div>
          </div>

          {/* Section 3: Caracterización Sociodemográfica y Enfoque Diferencial */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <HeartHandshake className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>3. Caracterización Sociodemográfica y Enfoque Diferencial</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Estrato Socioeconómico</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Estrato {apprentice.socioeconomicStratum || '2'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Enfoque Diferencial / Grupo Poblacional</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                  {apprentice.populationGroup || 'General / Sin pertenencia étnica o condición priorizada'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Estado de Caracterización</span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#39A900]">
                  <CheckCircle className="w-3.5 h-3.5" /> Diligenciada y Verificada
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Fecha de Registro</span>
                <span className="text-slate-600 dark:text-slate-400 font-mono">
                  {apprentice.characterizationDate || 'Octubre 2026'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Salud y Contactos de Emergencia */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <ShieldCheck className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>4. Salud y Contactos de Emergencia</span>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">EPS / Régimen de Salud</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {apprentice.eps || 'Nueva EPS'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Grupo Sanguíneo y Factor RH</span>
                <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                  {apprentice.bloodType || 'O+'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Contacto de Emergencia</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {apprentice.emergencyContactName || 'Gloria Morales (Madre)'}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-mono">Teléfono del Contacto</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">
                  {apprentice.emergencyContactPhone || '310 892 4512'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 5: Avance por Módulos de Inducción */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-slate-800 dark:text-white">
              <FileText className="w-4 h-4 text-amber-500" />
              <span>5. Bitácora de Apropiación de Módulos Formativos</span>
            </div>
            <div className="p-4 space-y-2">
              {modulesList.map((mod) => {
                const isCompleted = apprentice.completedModules?.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    className={`p-2.5 rounded-lg border flex items-center justify-between ${
                      isCompleted
                        ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/30'
                    }`}
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">
                      {mod.label}
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 font-bold text-[#39A900] text-[11px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Aprobado / Visto
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px] font-mono">
                        Pendiente
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Vista docente autorizada · Cumplimiento de Tratamiento de Datos SENA
          </div>

          <div className="flex items-center gap-2">
            {isApproved && onViewCertificate && (
              <button
                type="button"
                onClick={() => onViewCertificate(apprentice)}
                className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Ver Certificado</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onSimulateApprenticeView(apprentice);
                onClose();
              }}
              className="px-3.5 py-2 rounded-lg bg-[#00324D] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Simular Vista de este Aprendiz</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
