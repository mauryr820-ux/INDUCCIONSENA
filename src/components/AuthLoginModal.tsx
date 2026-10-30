import React, { useState, useEffect } from 'react';
import { Apprentice, ApprenticeSubRole, DocumentType, FichaMatriculada, InstructorRole, InstructorSession } from '../types/induction';
import { ENROLLED_FICHAS, SAMPLE_INSTRUCTORS } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { 
  X, 
  GraduationCap, 
  UserCheck, 
  ShieldCheck, 
  Award, 
  Building2, 
  Search, 
  Check, 
  Users, 
  ArrowRight,
  BookOpen,
  Info,
  Sparkles
} from 'lucide-react';

interface AuthLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: 'aprendiz' | 'instructor';
  apprentices: Apprentice[];
  currentApprentice: Apprentice;
  currentInstructor: InstructorSession;
  onLoginApprentice: (apprentice: Apprentice) => void;
  onLoginInstructor: (instructor: InstructorSession) => void;
}

export const AuthLoginModal: React.FC<AuthLoginModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'aprendiz',
  apprentices,
  currentApprentice,
  currentInstructor,
  onLoginApprentice,
  onLoginInstructor
}) => {
  const [activeTab, setActiveTab] = useState<'aprendiz' | 'instructor'>(initialRole);

  // Sync tab when initialRole changes
  useEffect(() => {
    setActiveTab(initialRole);
  }, [initialRole, isOpen]);

  // --- Apprentice Form State ---
  const [appDocType, setAppDocType] = useState<DocumentType>(currentApprentice.documentType || 'CC');
  const [appDocNumber, setAppDocNumber] = useState<string>(currentApprentice.documentNumber || '');
  const [appFullName, setAppFullName] = useState<string>(currentApprentice.fullName || '');
  const [appSubRole, setAppSubRole] = useState<ApprenticeSubRole>(currentApprentice.apprenticeRole || 'Aprendiz en Formación');
  const [appFichaCode, setAppFichaCode] = useState<string>(currentApprentice.ficha || '2874102');
  const [isCustomFicha, setIsCustomFicha] = useState<boolean>(false);
  const [customFichaNumber, setCustomFichaNumber] = useState<string>('');
  const [customProgramName, setCustomProgramName] = useState<string>('');

  // --- Instructor Form State ---
  const [instDocType, setInstDocType] = useState<DocumentType>(currentInstructor?.documentType || 'CC');
  const [instDocNumber, setInstDocNumber] = useState<string>(currentInstructor?.documentNumber || '79841230');
  const [instFullName, setInstFullName] = useState<string>(currentInstructor?.fullName || 'Ing. Carlos Eduardo Méndez');
  const [instRole, setInstRole] = useState<InstructorRole>(currentInstructor?.role || 'Instructor Líder de Inducción');
  const [instActiveFicha, setInstActiveFicha] = useState<string>(currentInstructor?.activeFicha || '2874102');

  if (!isOpen) return null;

  // Selected Ficha object
  const selectedFichaObj = ENROLLED_FICHAS.find(f => f.codigo === appFichaCode) || ENROLLED_FICHAS[0];

  // When changing document number, auto-fill if apprentice already exists in system
  const handleAppDocChange = (docNum: string) => {
    setAppDocNumber(docNum);
    const found = apprentices.find(a => a.documentNumber === docNum.trim());
    if (found) {
      setAppFullName(found.fullName);
      setAppDocType(found.documentType);
      setAppFichaCode(found.ficha);
      if (found.apprenticeRole) setAppSubRole(found.apprenticeRole);
    }
  };

  // Quick load apprentice template
  const handleQuickLoadApprentice = (sample: Apprentice) => {
    setAppDocType(sample.documentType);
    setAppDocNumber(sample.documentNumber);
    setAppFullName(sample.fullName);
    setAppFichaCode(sample.ficha);
    setAppSubRole(sample.apprenticeRole || 'Aprendiz en Formación');
    setIsCustomFicha(false);
  };

  // Quick load instructor template
  const handleQuickLoadInstructor = (sample: InstructorSession) => {
    setInstDocType(sample.documentType);
    setInstDocNumber(sample.documentNumber);
    setInstFullName(sample.fullName);
    setInstRole(sample.role);
    setInstActiveFicha(sample.activeFicha);
  };

  const handleSubmitApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!appDocNumber.trim() || !appFullName.trim()) return;

    const finalFicha = isCustomFicha ? customFichaNumber.trim() : appFichaCode;
    const finalProgram = isCustomFicha ? customProgramName.trim() : (selectedFichaObj?.programa || 'Tecnólogo SENA');
    const finalCenter = isCustomFicha ? 'Centro de Formación SENA' : (selectedFichaObj?.centro || 'Centro SENA');
    const finalRegional = isCustomFicha ? 'Dirección General' : (selectedFichaObj?.regional || 'Distrito Capital');

    // Check if apprentice with this document exists
    const existing = apprentices.find(a => a.documentNumber === appDocNumber.trim());

    const apprenticeToLogin: Apprentice = existing ? {
      ...existing,
      fullName: appFullName.trim(),
      documentType: appDocType,
      ficha: finalFicha,
      programName: finalProgram,
      centerName: finalCenter,
      regional: finalRegional,
      apprenticeRole: appSubRole
    } : {
      id: `app-${Date.now()}`,
      fullName: appFullName.trim(),
      documentType: appDocType,
      documentNumber: appDocNumber.trim(),
      email: `${appDocNumber.trim()}@misena.edu.co`,
      ficha: finalFicha,
      programName: finalProgram,
      centerName: finalCenter,
      regional: finalRegional,
      apprenticeRole: appSubRole,
      progressPercent: 0,
      inductionCompleted: false,
      completedModules: []
    };

    onLoginApprentice(apprenticeToLogin);
    onClose();
  };

  const handleSubmitInstructor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instDocNumber.trim() || !instFullName.trim()) return;

    const selectedFichaData = ENROLLED_FICHAS.find(f => f.codigo === instActiveFicha);

    const instructorSession: InstructorSession = {
      id: `inst-${instDocNumber.trim()}`,
      fullName: instFullName.trim(),
      documentType: instDocType,
      documentNumber: instDocNumber.trim(),
      email: `${instFullName.toLowerCase().replace(/[^a-z]/g, '')}@sena.edu.co`,
      role: instRole,
      assignedFichas: instActiveFicha === 'todas' 
        ? ENROLLED_FICHAS.map(f => f.codigo) 
        : [instActiveFicha],
      activeFicha: instActiveFicha,
      centerName: selectedFichaData?.centro || 'Centro de Formación SENA',
      regional: selectedFichaData?.regional || 'Distrito Capital'
    };

    onLoginInstructor(instructorSession);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[92vh] overflow-y-auto">
        
        {/* Modal Top Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <SenaLogo className="w-9 h-9 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#39A900] uppercase tracking-wider">
                  Portal de Autenticación Institucional
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                  SENA Inducción
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Ingreso al Sistema de Inducción
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dual Role Selector Buttons */}
        <div className="grid grid-cols-2 gap-3 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setActiveTab('aprendiz')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'aprendiz'
                ? 'bg-[#39A900] text-white shadow-sm ring-2 ring-emerald-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span>Ingreso Aprendiz</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('instructor')}
            className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'instructor'
                ? 'bg-[#00324D] text-white shadow-sm ring-2 ring-sky-500/20'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCheck className="w-4 h-4 shrink-0" />
            <span>Ingreso Instructor</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: FORMULARIO DE INGRESO PARA EL APRENDIZ */}
        {/* ========================================================= */}
        {activeTab === 'aprendiz' && (
          <form onSubmit={handleSubmitApprentice} className="space-y-5 animate-fadeIn">
            
            <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/70 flex items-start gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
              <Info className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Ingresa con tu <strong>documento de identidad</strong>, define tu <strong>rol estudiantil</strong> y selecciona la <strong>ficha matriculada</strong> a la que perteneces para registrar o continuar tu proceso de inducción.
              </p>
            </div>

            {/* Quick Template Picker for Testing */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Carga rápida de aprendices matriculados:
              </label>
              <div className="flex flex-wrap gap-2">
                {apprentices.slice(0, 4).map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleQuickLoadApprentice(sample)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#39A900] hover:text-white transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                  >
                    <span>{sample.fullName.split(' ')[0]}</span>
                    <span className="text-[10px] font-mono opacity-75">Ficha {sample.ficha}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Identification Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tipo de Identificación:
                </label>
                <select
                  value={appDocType}
                  onChange={(e) => setAppDocType(e.target.value as DocumentType)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="TI">Tarjeta de Identidad (TI)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                  <option value="PEP">Permiso Especial (PEP)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Número de Identificación:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 1098471203"
                  value={appDocNumber}
                  onChange={(e) => handleAppDocChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nombres y Apellidos Completos del Aprendiz:
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Mateo Alejandro Ramírez Peña"
                value={appFullName}
                onChange={(e) => setAppFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              />
            </div>

            {/* Sub-Role Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Rol o Condición del Aprendiz:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {(['Aprendiz en Formación', 'Vocero de Ficha', 'Representante de Centro con Voz y Voto'] as ApprenticeSubRole[]).map((r) => {
                  const isSelected = appSubRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setAppSubRole(r)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#39A900] bg-emerald-50 dark:bg-emerald-950/50 text-[#00324D] dark:text-emerald-300 font-bold ring-1 ring-emerald-500'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <p className="truncate font-semibold">{r}</p>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                        {r === 'Representante de Centro con Voz y Voto' ? 'Reforma Art. 48' : r === 'Vocero de Ficha' ? 'Líder de ficha' : 'Aprendiz regular'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Enrolled Ficha Selection */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Ficha de Caracterización Matriculada:
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomFicha(!isCustomFicha)}
                  className="text-xs text-[#39A900] hover:underline font-semibold"
                >
                  {isCustomFicha ? 'Elegir de fichas institucionales' : '+ Digitar otra ficha'}
                </button>
              </div>

              {!isCustomFicha ? (
                <div className="space-y-2">
                  <select
                    value={appFichaCode}
                    onChange={(e) => setAppFichaCode(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {ENROLLED_FICHAS.map((ficha) => (
                      <option key={ficha.codigo} value={ficha.codigo}>
                        Ficha {ficha.codigo} - {ficha.programa} ({ficha.jornada})
                      </option>
                    ))}
                  </select>

                  {/* Ficha Card Preview */}
                  {selectedFichaObj && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#39A900]">
                          Ficha {selectedFichaObj.codigo} · {selectedFichaObj.nivel}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {selectedFichaObj.totalAprendices} aprendices matriculados
                        </span>
                      </div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {selectedFichaObj.programa}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {selectedFichaObj.centro} ({selectedFichaObj.regional})
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Número de Ficha:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: 2950182"
                      value={customFichaNumber}
                      onChange={(e) => setCustomFichaNumber(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      Nombre del Programa:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Tecnólogo en Gestión Empresarial"
                      value={customProgramName}
                      onChange={(e) => setCustomProgramName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Submit Apprentice Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#39A900] hover:bg-[#329200] text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Ingresar e Iniciar Inducción como Aprendiz</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FORMULARIO DE INGRESO PARA EL INSTRUCTOR */}
        {/* ========================================================= */}
        {activeTab === 'instructor' && (
          <form onSubmit={handleSubmitInstructor} className="space-y-5 animate-fadeIn">
            
            <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/70 flex items-start gap-2.5 text-xs text-sky-950 dark:text-sky-200">
              <ShieldCheck className="w-4 h-4 text-[#00324D] dark:text-sky-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Acceso para <strong>Instructores, Voceros de Inducción y Coordinadores</strong>. Podrás gestionar el avance de los aprendices, verificar evaluaciones de inducción y supervisar las fichas matriculadas.
              </p>
            </div>

            {/* Quick Template Picker for Instructors */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                Carga rápida de perfiles docentes:
              </label>
              <div className="flex flex-wrap gap-2">
                {SAMPLE_INSTRUCTORS.map((inst) => (
                  <button
                    key={inst.id}
                    type="button"
                    onClick={() => handleQuickLoadInstructor(inst)}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-[#00324D] hover:text-white transition-colors border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
                  >
                    <span>{inst.fullName.split(' ')[0]} {inst.fullName.split(' ')[1]}</span>
                    <span className="text-[10px] font-mono opacity-75">({inst.role.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Instructor Identification */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Tipo Doc:
                </label>
                <select
                  value={instDocType}
                  onChange={(e) => setInstDocType(e.target.value as DocumentType)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D]"
                >
                  <option value="CC">Cédula de Ciudadanía (CC)</option>
                  <option value="CE">Cédula de Extranjería (CE)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Número de Cédula / Documento:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 79841230"
                  value={instDocNumber}
                  onChange={(e) => setInstDocNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D]"
                />
              </div>
            </div>

            {/* Instructor Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Nombres y Apellidos del Instructor / Funcionario:
              </label>
              <input
                type="text"
                required
                placeholder="Ej: Ing. Carlos Eduardo Méndez"
                value={instFullName}
                onChange={(e) => setInstFullName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D]"
              />
            </div>

            {/* Instructor Role */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                Rol Funcional en la Inducción:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {([
                  'Instructor Técnico de Programa',
                  'Instructor Líder de Inducción',
                  'Coordinador Académico',
                  'Profesional de Bienestar al Aprendiz'
                ] as InstructorRole[]).map((r) => {
                  const isSelected = instRole === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setInstRole(r)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#00324D] bg-sky-50 dark:bg-sky-950/50 text-[#00324D] dark:text-sky-300 font-bold ring-1 ring-sky-500'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <p className="font-semibold truncate">{r}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Fichas Management Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Ficha Matriculada a Gestionar o Supervisar:
              </label>
              <select
                value={instActiveFicha}
                onChange={(e) => setInstActiveFicha(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#00324D]"
              >
                <option value="todas">Todas las Fichas Matriculadas (Vista Global de Centro)</option>
                {ENROLLED_FICHAS.map((f) => (
                  <option key={f.codigo} value={f.codigo}>
                    Ficha {f.codigo} - {f.programa} ({f.totalAprendices} aprendices)
                  </option>
                ))}
              </select>
            </div>

            {/* Submit Instructor Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#00324D] hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>Ingresar al Panel de Gestión del Instructor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
