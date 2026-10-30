import React, { useState, useEffect } from 'react';
import { Apprentice, ApprenticeSubRole, DocumentType } from '../types/induction';
import { ENROLLED_FICHAS } from '../data/senaData';
import { 
  Building2, 
  CheckCircle, 
  FileText, 
  GraduationCap, 
  HeartHandshake, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Users, 
  X,
  AlertCircle,
  CloudCheck,
  FileSpreadsheet
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ApprenticeCharacterizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentApprentice: Apprentice;
  onSaveCharacterization: (updatedApprentice: Apprentice) => void;
}

export const ApprenticeCharacterizationModal: React.FC<ApprenticeCharacterizationModalProps> = ({
  isOpen,
  onClose,
  currentApprentice,
  onSaveCharacterization
}) => {
  // Form fields initialized with current apprentice values
  const [fullName, setFullName] = useState<string>(currentApprentice.fullName || '');
  const [docType, setDocType] = useState<DocumentType>(currentApprentice.documentType || 'CC');
  const [docNumber, setDocNumber] = useState<string>(currentApprentice.documentNumber || '');
  const [email, setEmail] = useState<string>(currentApprentice.email || '');
  const [phone, setPhone] = useState<string>(currentApprentice.phone || '');
  const [birthDate, setBirthDate] = useState<string>(currentApprentice.birthDate || '2004-06-15');
  const [gender, setGender] = useState<Apprentice['gender']>(currentApprentice.gender || 'Prefiero no reportar');

  // Academic and Ficha data
  const [selectedFicha, setSelectedFicha] = useState<string>(currentApprentice.ficha || '2874102');
  const [programName, setProgramName] = useState<string>(currentApprentice.programName || '');
  const [trainingLevel, setTrainingLevel] = useState<Apprentice['trainingLevel']>(currentApprentice.trainingLevel || 'Tecnólogo');
  const [shift, setShift] = useState<Apprentice['shift']>(currentApprentice.shift || 'Diurna');
  const [centerName, setCenterName] = useState<string>(currentApprentice.centerName || 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)');
  const [regional, setRegional] = useState<string>(currentApprentice.regional || 'Distrito Capital');
  const [apprenticeRole, setApprenticeRole] = useState<ApprenticeSubRole>(currentApprentice.apprenticeRole || 'Aprendiz en Formación');

  // Sociodemographic & Population group
  const [socioeconomicStratum, setSocioeconomicStratum] = useState<Apprentice['socioeconomicStratum']>(
    currentApprentice.socioeconomicStratum || '2'
  );
  const [populationGroup, setPopulationGroup] = useState<string>(
    currentApprentice.populationGroup || 'General / Sin enfoque diferencial'
  );

  // Health and Emergency Contact
  const [eps, setEps] = useState<string>(currentApprentice.eps || 'Nueva EPS');
  const [bloodType, setBloodType] = useState<Apprentice['bloodType']>(currentApprentice.bloodType || 'O+');
  const [emergencyContactName, setEmergencyContactName] = useState<string>(
    currentApprentice.emergencyContactName || ''
  );
  const [emergencyContactPhone, setEmergencyContactPhone] = useState<string>(
    currentApprentice.emergencyContactPhone || ''
  );

  // Tab navigation inside characterization modal
  const [activeTab, setActiveTab] = useState<'personales' | 'academicos' | 'sociodemograficos' | 'salud'>('personales');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  // Synchronize when currentApprentice changes
  useEffect(() => {
    if (currentApprentice) {
      setFullName(currentApprentice.fullName || '');
      setDocType(currentApprentice.documentType || 'CC');
      setDocNumber(currentApprentice.documentNumber || '');
      setEmail(currentApprentice.email || '');
      setPhone(currentApprentice.phone || '');
      setBirthDate(currentApprentice.birthDate || '2004-06-15');
      setGender(currentApprentice.gender || 'Prefiero no reportar');
      setSelectedFicha(currentApprentice.ficha || '2874102');
      setProgramName(currentApprentice.programName || '');
      setTrainingLevel(currentApprentice.trainingLevel || 'Tecnólogo');
      setShift(currentApprentice.shift || 'Diurna');
      setCenterName(currentApprentice.centerName || 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)');
      setRegional(currentApprentice.regional || 'Distrito Capital');
      setApprenticeRole(currentApprentice.apprenticeRole || 'Aprendiz en Formación');
      setSocioeconomicStratum(currentApprentice.socioeconomicStratum || '2');
      setPopulationGroup(currentApprentice.populationGroup || 'General / Sin enfoque diferencial');
      setEps(currentApprentice.eps || 'Nueva EPS');
      setBloodType(currentApprentice.bloodType || 'O+');
      setEmergencyContactName(currentApprentice.emergencyContactName || '');
      setEmergencyContactPhone(currentApprentice.emergencyContactPhone || '');
    }
  }, [currentApprentice]);

  if (!isOpen) return null;

  // Auto-fill program and center when picking from enrolled fichas list
  const handleFichaSelectChange = (fichaCode: string) => {
    setSelectedFicha(fichaCode);
    const foundFicha = ENROLLED_FICHAS.find(f => f.codigo === fichaCode);
    if (foundFicha) {
      setProgramName(foundFicha.programa);
      setTrainingLevel(foundFicha.nivel);
      setShift(foundFicha.jornada);
      setCenterName(foundFicha.centro);
      setRegional(foundFicha.regional);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated: Apprentice = {
      ...currentApprentice,
      fullName: fullName.trim(),
      documentType: docType,
      documentNumber: docNumber.trim(),
      email: email.trim() || `${docNumber.trim()}@misena.edu.co`,
      phone: phone.trim(),
      birthDate,
      gender,
      ficha: selectedFicha.trim(),
      programName: programName.trim(),
      trainingLevel,
      shift,
      centerName,
      regional,
      apprenticeRole,
      socioeconomicStratum,
      populationGroup,
      eps: eps.trim(),
      bloodType,
      emergencyContactName: emergencyContactName.trim(),
      emergencyContactPhone: emergencyContactPhone.trim(),
      characterizationCompleted: true,
      characterizationDate: new Date().toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    onSaveCharacterization(updated);
    setFeedbackSuccess(true);
    setTimeout(() => {
      setFeedbackSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full shadow-2xl my-6 flex flex-col max-h-[92vh] overflow-hidden animate-fadeIn">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#00324D] via-slate-900 to-[#002236] text-white flex items-start justify-between gap-4 border-b border-slate-700 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SenaLogo className="w-5 h-5 shrink-0" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Caracterización del Aprendiz SENA · SofiaPlus
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
              Formulario de Caracterización Integral
            </h2>
            <p className="text-xs text-slate-300">
              Registra o actualiza tus datos personales, ficha formativa, estrato y enfoque diferencial para tu proceso de inducción.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 sm:px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex gap-2 overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('personales')}
            className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'personales'
                ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            1. Datos Personales
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('academicos')}
            className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'academicos'
                ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            2. Ficha y Academia
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sociodemograficos')}
            className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sociodemograficos'
                ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            3. Enfoque Diferencial
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('salud')}
            className={`pb-2.5 px-3 text-xs font-bold whitespace-nowrap transition-colors border-b-2 flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'salud'
                ? 'border-[#39A900] text-[#00324D] dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            4. Salud y Emergencia
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {feedbackSuccess && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-3 animate-fadeIn">
              <CheckCircle className="w-5 h-5 text-[#39A900] shrink-0" />
              <span>¡Datos de caracterización guardados exitosamente en el sistema de inducción SENA!</span>
            </div>
          )}

          {/* TAB 1: DATOS PERSONALES */}
          {activeTab === 'personales' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                <p>
                  Estos datos coinciden con tu registro oficial de matrícula y aparecerán en tu certificado de inducción y constancia de notas.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombres y Apellidos Completos: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Daniel Esteban Rojas Morales"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Tipo de Documento: *
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value as DocumentType)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PEP">Permiso Especial (PEP)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Número de Documento de Identidad: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 1020495821"
                    value={docNumber}
                    onChange={(e) => setDocNumber(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Correo Institucional (@misena.edu.co):
                  </label>
                  <input
                    type="email"
                    placeholder="usuario@misena.edu.co"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Teléfono Celular / WhatsApp: *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: 312 458 9231"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fecha de Nacimiento:
                  </label>
                  <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Identidad de Género:
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                    <option value="No binario">No binario</option>
                    <option value="Prefiero no reportar">Prefiero no reportar</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('academicos')}
                  className="px-4 py-2 rounded-lg bg-[#00324D] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Siguiente: Datos de Ficha →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: FICHA Y ACADEMIA */}
          {activeTab === 'academicos' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Seleccionar Ficha Matriculada (Oferta Vigente):
                </label>
                <select
                  value={selectedFicha}
                  onChange={(e) => handleFichaSelectChange(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  {ENROLLED_FICHAS.map((f) => (
                    <option key={f.codigo} value={f.codigo}>
                      Ficha {f.codigo} · {f.programa} ({f.nivel} - {f.jornada})
                    </option>
                  ))}
                  <option value="custom">Otra Ficha (Ingreso Manual)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Código de Ficha: *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2874102"
                    value={selectedFicha}
                    onChange={(e) => setSelectedFicha(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Rol Institucional en la Ficha:
                  </label>
                  <select
                    value={apprenticeRole}
                    onChange={(e) => setApprenticeRole(e.target.value as ApprenticeSubRole)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Aprendiz en Formación">Aprendiz en Formación (Regular)</option>
                    <option value="Vocero de Ficha">Vocero de Ficha (Elegido democráticamente)</option>
                    <option value="Representante de Centro con Voz y Voto">Representante de Centro (Comité & Consejo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Nombre del Programa de Formación: *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Tecnólogo en Análisis y Desarrollo de Software"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nivel de Formación:
                  </label>
                  <select
                    value={trainingLevel}
                    onChange={(e) => setTrainingLevel(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Tecnólogo">Tecnólogo</option>
                    <option value="Técnico">Técnico</option>
                    <option value="Operario">Operario</option>
                    <option value="Especialización Tecnológica">Especialización Tecnológica</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Jornada Formativa:
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="Diurna">Diurna (6:00 a.m. a 12:00 m.)</option>
                    <option value="Mixta">Mixta (12:00 m. a 6:00 p.m.)</option>
                    <option value="Nocturna">Nocturna (6:00 p.m. a 10:00 p.m.)</option>
                    <option value="Virtual">Virtual / Distancia</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Centro de Formación Profesional:
                  </label>
                  <input
                    type="text"
                    value={centerName}
                    onChange={(e) => setCenterName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Regional SENA:
                  </label>
                  <input
                    type="text"
                    value={regional}
                    onChange={(e) => setRegional(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('personales')}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('sociodemograficos')}
                  className="px-4 py-2 rounded-lg bg-[#00324D] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Siguiente: Enfoque Diferencial →
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SOCIODEMOGRAFICOS Y ENFOQUE DIFERENCIAL */}
          {activeTab === 'sociodemograficos' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 rounded-xl text-xs text-sky-900 dark:text-sky-200 flex items-start gap-2">
                <HeartHandshake className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <p>
                  El SENA aplica políticas de inclusión social y permanencia educativa (Acuerdo 009 de 2024 / Ac. 002 de 2026). Tu información orienta apoyos de sostenimiento, alimentación y bienestar.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Estrato Socioeconómico de Residencia: *
                </label>
                <select
                  value={socioeconomicStratum}
                  onChange={(e) => setSocioeconomicStratum(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="1">Estrato 1 (Bajo - Bajo)</option>
                  <option value="2">Estrato 2 (Bajo)</option>
                  <option value="3">Estrato 3 (Medio - Bajo)</option>
                  <option value="4">Estrato 4 (Medio)</option>
                  <option value="5">Estrato 5 (Medio - Alto)</option>
                  <option value="6">Estrato 6 (Alto)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Caracterización Poblacional / Enfoque Diferencial: *
                </label>
                <select
                  value={populationGroup}
                  onChange={(e) => setPopulationGroup(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="General / Sin enfoque diferencial">General / Sin enfoque diferencial</option>
                  <option value="Víctima del conflicto armado / Desplazamiento">Víctima del conflicto armado / Desplazamiento forzado (RUV)</option>
                  <option value="Comunidades Negras / Afrocolombianas / Palenqueras">Comunidades Negras, Afrocolombianas, Raizales y Palenqueras (NARP)</option>
                  <option value="Pueblos Indígenas">Pueblos y Comunidades Indígenas</option>
                  <option value="Persona con Discapacidad">Persona con Discapacidad (Física, Sensorial o Cognitiva)</option>
                  <option value="Madre / Padre cabeza de familia">Madre o Padre cabeza de familia</option>
                  <option value="Jóvenes en Paz / Situación de vulnerabilidad">Jóvenes en Paz / Situación de vulnerabilidad manifiesta</option>
                  <option value="Campesinos y Población Rural">Campesinos y Trabajadores Rurales (SENA Emprende Rural)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('academicos')}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  ← Anterior
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('salud')}
                  className="px-4 py-2 rounded-lg bg-[#00324D] text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  Siguiente: Salud y Contacto →
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: SALUD Y EMERGENCIA */}
          {activeTab === 'salud' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Entidad Promotora de Salud (EPS): *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Nueva EPS, Sanitas, SURA, Sisbén"
                    value={eps}
                    onChange={(e) => setEps(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Grupo Sanguíneo y Factor RH: *
                  </label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value as any)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                  >
                    <option value="O+">O Positivo (O+)</option>
                    <option value="O-">O Negativo (O-)</option>
                    <option value="A+">A Positivo (A+)</option>
                    <option value="A-">A Negativo (A-)</option>
                    <option value="B+">B Positivo (B+)</option>
                    <option value="B-">B Negativo (B-)</option>
                    <option value="AB+">AB Positivo (AB+)</option>
                    <option value="AB-">AB Negativo (AB-)</option>
                  </select>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#39A900]" />
                  Contacto de Emergencia en Sede / Centro
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Nombre y Parentesco del Contacto: *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Gloria Morales (Madre)"
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Teléfono del Contacto de Emergencia: *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 310 892 4512"
                      value={emergencyContactPhone}
                      onChange={(e) => setEmergencyContactPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('sociodemograficos')}
                  className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  ← Anterior
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#39A900] hover:bg-[#329200] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-4 h-4" />
                  Guardar y Finalizar Caracterización
                </button>
              </div>
            </div>
          )}

        </form>

        {/* Modal Footer Bar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            <CloudCheck className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Sincronización en vivo con Google Drive</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              Cerrar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-lg bg-[#39A900] text-white text-xs font-bold hover:bg-[#329200] shadow-xs cursor-pointer"
            >
              Guardar Caracterización
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
