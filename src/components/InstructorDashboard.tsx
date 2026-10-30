import React, { useState } from 'react';
import { Apprentice, InstructorSession } from '../types/induction';
import { ENROLLED_FICHAS } from '../data/senaData';
import { Award, CheckCircle, Download, FileSpreadsheet, Filter, GraduationCap, Plus, Search, ShieldCheck, TrendingUp, UserCheck, Users, X, Layers, Building2, Eye, HeartHandshake } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeDetailModal } from './ApprenticeDetailModal';
import { GoogleDriveSyncBadge } from './GoogleDriveSyncBadge';

interface InstructorDashboardProps {
  apprentices: Apprentice[];
  instructorSession?: InstructorSession;
  onSelectApprentice: (apprentice: Apprentice) => void;
  onAddApprentice: (newApprentice: Apprentice) => void;
  onViewApprenticeCertificate: (apprentice: Apprentice) => void;
  onOpenLoginModal?: (role: 'aprendiz' | 'instructor') => void;
  onOpenGoogleSheets?: () => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  instructorSession,
  onSelectApprentice,
  onAddApprentice,
  onViewApprenticeCertificate,
  onOpenLoginModal,
  onOpenGoogleSheets
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aprobados' | 'progreso' | 'pendiente'>('all');
  const [selectedFicha, setSelectedFicha] = useState<string>(instructorSession?.activeFicha || 'todas');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedApprenticeForDetail, setSelectedApprenticeForDetail] = useState<Apprentice | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // Form state for adding an apprentice
  const [newName, setNewName] = useState<string>('');
  const [newDocType, setNewDocType] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [newDocNumber, setNewDocNumber] = useState<string>('');
  const [newEmail, setNewEmail] = useState<string>('');
  const [newFicha, setNewFicha] = useState<string>(selectedFicha !== 'todas' ? selectedFicha : '2874102');
  const [newProgram, setNewProgram] = useState<string>('Tecnólogo en Análisis y Desarrollo de Software (ADSO)');

  // Filtered apprentices by search, status, and enrolled ficha
  const filteredApprentices = apprentices.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.documentNumber.includes(searchTerm) ||
      app.ficha.includes(searchTerm);

    const matchesFicha = selectedFicha === 'todas' || app.ficha === selectedFicha;

    let matchesStatus = true;
    if (statusFilter === 'aprobados') {
      matchesStatus = app.inductionCompleted && (app.score ?? 0) >= 70;
    } else if (statusFilter === 'progreso') {
      matchesStatus = !app.inductionCompleted && app.progressPercent > 0;
    } else if (statusFilter === 'pendiente') {
      matchesStatus = app.progressPercent === 0;
    }

    return matchesSearch && matchesFicha && matchesStatus;
  });

  // Analytics for the selected ficha or all fichas
  const total = filteredApprentices.length;
  const approvedCount = filteredApprentices.filter(a => a.inductionCompleted && (a.score ?? 0) >= 70).length;
  const inProgressCount = filteredApprentices.filter(a => !a.inductionCompleted && a.progressPercent > 0).length;
  const approvalRate = total > 0 ? Math.round((approvedCount / total) * 100) : 0;
  
  const scoresWithEvaluations = filteredApprentices.filter(a => a.score !== undefined);
  const avgScore = scoresWithEvaluations.length > 0
    ? Math.round(scoresWithEvaluations.reduce((sum, a) => sum + (a.score || 0), 0) / scoresWithEvaluations.length)
    : 0;

  // CSV Export with full characterization details
  const handleExportCSV = () => {
    const headers = [
      'Nombre Completo', 
      'Tipo Doc', 
      'Numero Documento', 
      'Ficha', 
      'Programa', 
      'Telefono', 
      'Estrato', 
      'Enfoque Poblacional', 
      'EPS', 
      'RH', 
      'Contacto Emergencia', 
      'Tel Emergencia', 
      'Progreso %', 
      'Estado Induccion', 
      'Puntaje', 
      'Folio Certificado'
    ];
    const rows = apprentices.map(a => [
      `"${a.fullName}"`,
      a.documentType,
      a.documentNumber,
      a.ficha,
      `"${a.programName}"`,
      `"${a.phone || 'N/A'}"`,
      a.socioeconomicStratum ? `Estrato ${a.socioeconomicStratum}` : 'N/A',
      `"${a.populationGroup || 'General'}"`,
      `"${a.eps || 'N/A'}"`,
      a.bloodType || 'N/A',
      `"${a.emergencyContactName || 'N/A'}"`,
      `"${a.emergencyContactPhone || 'N/A'}"`,
      `${a.progressPercent}%`,
      a.inductionCompleted ? 'Aprobado' : 'En Progreso',
      a.score !== undefined ? `${a.score}%` : 'N/A',
      a.certificateId || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Caracterizacion_e_Induccion_Ficha_${newFicha || 'General'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDocNumber.trim()) return;

    const created: Apprentice = {
      id: `app-${Date.now()}`,
      fullName: newName.trim(),
      documentType: newDocType,
      documentNumber: newDocNumber.trim(),
      email: newEmail.trim() || `${newDocNumber}@misena.edu.co`,
      ficha: newFicha.trim() || '2874102',
      programName: newProgram.trim(),
      centerName: 'Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)',
      regional: 'Distrito Capital',
      progressPercent: 0,
      inductionCompleted: false,
      completedModules: []
    };

    onAddApprentice(created);
    setIsAddModalOpen(false);
    setNewName('');
    setNewDocNumber('');
    setNewEmail('');
  };

  return (
    <div className="space-y-8">
      
      {/* Instructor Active Profile Banner */}
      {instructorSession && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#00324D] via-slate-900 to-[#002236] text-white shadow-md border border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-lg border border-white/20 shrink-0">
              {instructorSession.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-sky-300">
                  SESIÓN DOCENTE ACTIVA
                </span>
                <span className="text-[10px] font-mono bg-sky-900/60 text-sky-200 px-2 py-0.5 rounded font-bold border border-sky-700/60">
                  {instructorSession.role}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {instructorSession.fullName}
              </h3>
              <p className="text-xs text-slate-300 font-mono">
                {instructorSession.documentType} {instructorSession.documentNumber} · {instructorSession.centerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenLoginModal && (
              <button
                type="button"
                onClick={() => onOpenLoginModal('instructor')}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/15 hover:bg-white/25 text-white border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-sky-300" />
                <span>Cambiar Instructor / Rol</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D]">
            <SenaLogo className="w-5 h-5 shrink-0" />
            <span className="text-[#39A900]">Gestión de Inducción</span>
            <span aria-hidden="true">·</span>
            <span>Coordinación Académica & Instructores</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Panel de Seguimiento y Apropiación
          </h2>
          <p className="text-slate-600 text-sm">
            Monitorea el avance de los aprendices de tus fichas matriculadas, verifica evaluaciones y exporta informes oficiales.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {onOpenGoogleSheets && (
            <button
              type="button"
              onClick={onOpenGoogleSheets}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer group"
              title="Abrir hoja de cálculo de Google Drive con seguimiento en vivo"
            >
              <FileSpreadsheet className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Ver Hoja Google Sheets en Vivo</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            </button>
          )}

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            Descargar Planilla CSV
          </button>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Inscribir Aprendiz
          </button>
        </div>
      </div>

      {/* Google Drive & Google Sheets Real-Time Sync Section */}
      <GoogleDriveSyncBadge apprentices={apprentices} onOpenSheetsModal={onOpenGoogleSheets} />

      {/* Ficha Matriculada Selector Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Layers className="w-4 h-4 text-[#39A900]" />
          <span>Filtrar por Ficha Matriculada:</span>
        </div>

        <div className="flex-1 max-w-xl">
          <select
            value={selectedFicha}
            onChange={(e) => {
              setSelectedFicha(e.target.value);
              if (e.target.value !== 'todas') {
                setNewFicha(e.target.value);
                const found = ENROLLED_FICHAS.find(f => f.codigo === e.target.value);
                if (found) setNewProgram(found.programa);
              }
            }}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#39A900]"
          >
            <option value="todas">Todas las Fichas Matriculadas ({apprentices.length} aprendices en total)</option>
            {ENROLLED_FICHAS.map((f) => {
              const countInFicha = apprentices.filter(a => a.ficha === f.codigo).length;
              return (
                <option key={f.codigo} value={f.codigo}>
                  Ficha {f.codigo} - {f.programa} ({countInFicha} aprendices en sistema)
                </option>
              );
            })}
          </select>
        </div>

        {selectedFicha !== 'todas' && (
          <button
            type="button"
            onClick={() => setSelectedFicha('todas')}
            className="text-xs text-[#00324D] hover:underline font-semibold cursor-pointer"
          >
            Ver todas las fichas
          </button>
        )}
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Total Aprendices</span>
            <Users className="w-4 h-4 text-[#00324D]" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900">{total}</p>
          <p className="text-[11px] text-slate-500">Inscritos en la inducción</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Tasa de Aprobación</span>
            <TrendingUp className="w-4 h-4 text-[#39A900]" />
          </div>
          <p className="text-2xl font-bold font-mono text-[#39A900]">{approvalRate}%</p>
          <p className="text-[11px] text-slate-500">{approvedCount} de {total} aprendices aprobados</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Certificados Emitidos</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900">{approvedCount}</p>
          <p className="text-[11px] text-slate-500">Con folio institucional único</p>
        </div>

        <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-medium">Promedio de Apropiación</span>
            <CheckCircle className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-bold font-mono text-slate-900">{avgScore}%</p>
          <p className="text-[11px] text-slate-500">Promedio general en evaluaciones</p>
        </div>

      </div>

      {/* Pedagogical Diagnosis Widget */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900">Diagnóstico Pedagógico de Apropiación</h3>
          <p className="text-xs text-slate-500">
            Porcentaje de comprensión promedio por componente formativo para retroalimentación docente:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Identidad y Símbolos</span>
              <span className="font-mono text-[#39A900]">94%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#39A900] rounded-full" style={{ width: '94%' }} />
            </div>
            <p className="text-[10px] text-slate-500">Alta apropiación de historia y escudo</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Derechos del Aprendiz</span>
              <span className="font-mono text-[#39A900]">88%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#39A900] rounded-full" style={{ width: '88%' }} />
            </div>
            <p className="text-[10px] text-slate-500">Claridad en tiempos de evaluación y bienestar</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Deberes e Inasistencias</span>
              <span className="font-mono text-amber-600">76%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: '76%' }} />
            </div>
            <p className="text-[10px] text-slate-500">Reforzar plazo de 3 días para justificar</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-700">Ruta FPI & Etapa Práctica</span>
              <span className="font-mono text-[#39A900]">82%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#39A900] rounded-full" style={{ width: '82%' }} />
            </div>
            <p className="text-[10px] text-slate-500">Comprensión de contrato y proyectos</p>
          </div>
        </div>
      </div>

      {/* Apprentices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5">
        
        {/* Table Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center p-1 bg-slate-100 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos ({apprentices.length})
            </button>
            <button
              onClick={() => setStatusFilter('aprobados')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'aprobados' ? 'bg-white text-[#39A900] shadow-sm font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Aprobados ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('progreso')}
              className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                statusFilter === 'progreso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              En Progreso ({inProgressCount})
            </button>
          </div>

          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento o ficha..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800"
            />
          </div>
        </div>

        {/* Real Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Ficha & Programa</th>
                <th className="py-3 px-4">Caracterización & Enfoque</th>
                <th className="py-3 px-4">Progreso</th>
                <th className="py-3 px-4">Puntaje</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones de Instructor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApprentices.map((app) => {
                const isPassed = app.inductionCompleted && (app.score ?? 0) >= 70;
                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#39A900]/15 text-[#39A900] flex items-center justify-center font-bold text-xs">
                          {app.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{app.fullName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{app.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                      {app.documentType} {app.documentNumber}
                    </td>

                    <td className="py-3.5 px-4 max-w-[200px]">
                      <p className="font-semibold text-slate-800 truncate">{app.programName}</p>
                      <p className="text-[10px] text-slate-500 font-mono">Ficha {app.ficha}</p>
                    </td>

                    <td className="py-3.5 px-4 max-w-[180px]">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-800 text-[11px]">
                            {app.socioeconomicStratum ? `Estrato ${app.socioeconomicStratum}` : 'Estrato 2'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">· {app.phone || 'Celular OK'}</span>
                        </div>
                        <p className="text-[10px] text-emerald-700 truncate font-medium">
                          {app.populationGroup || 'General / Inclusión'}
                        </p>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="w-20 space-y-1">
                        <div className="flex justify-between text-[10px] font-mono">
                          <span>{app.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#39A900] rounded-full"
                            style={{ width: `${app.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      {app.score !== undefined ? (
                        <span className={isPassed ? 'text-[#39A900]' : 'text-rose-600'}>
                          {app.score}%
                        </span>
                      ) : (
                        <span className="text-slate-400 font-normal">Sin presentar</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {isPassed ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#39A900]">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Aprobado
                        </span>
                      ) : app.progressPercent > 0 ? (
                        <span className="text-[11px] font-semibold text-slate-600">
                          En Progreso
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">
                          Pendiente
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {/* Prominent button to view ALL apprentice characterization & induction data */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedApprenticeForDetail(app);
                          setIsDetailModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-xs font-bold text-white bg-[#00324D] hover:bg-slate-800 rounded-lg transition-colors inline-flex items-center gap-1.5 shadow-2xs cursor-pointer"
                        title="Ver todos los datos de caracterización completa del aprendiz (contacto, sociodemografía, salud, notas)"
                      >
                        <Eye className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                        <span>Ver Todos los Datos</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onSelectApprentice(app)}
                        className="px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                        title="Simular vista como este aprendiz"
                      >
                        Simular
                      </button>

                      {isPassed && (
                        <button
                          type="button"
                          onClick={() => onViewApprenticeCertificate(app)}
                          className="px-2 py-1 text-xs font-semibold text-[#39A900] hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                          title="Ver Certificado Oficial"
                        >
                          Certificado
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}

              {filteredApprentices.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal: Inscribir Aprendiz */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Inscribir Nuevo Aprendiz a Inducción</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApprentice} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Nombre Completo:</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Andrés Felipe Vargas Ospina"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Tipo Doc:</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  >
                    <option value="CC">C.C.</option>
                    <option value="TI">T.I.</option>
                    <option value="CE">C.E.</option>
                    <option value="PEP">PEP</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Número Documento:</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: 1018274921"
                    value={newDocNumber}
                    onChange={(e) => setNewDocNumber(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Ficha de Caracterización:</label>
                  <input
                    type="text"
                    required
                    placeholder="2874102"
                    value={newFicha}
                    onChange={(e) => setNewFicha(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Correo MiSENA:</label>
                  <input
                    type="email"
                    placeholder="ejemplo@misena.edu.co"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Programa de Formación:</label>
                <input
                  type="text"
                  required
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200]"
                >
                  Registrar Aprendiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Apprentice Full Detail Modal (Displays all apprentice characterization and academic data to the instructor) */}
      <ApprenticeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedApprenticeForDetail(null);
        }}
        apprentice={selectedApprenticeForDetail}
        onSimulateApprenticeView={(app) => {
          onSelectApprentice(app);
          setIsDetailModalOpen(false);
        }}
        onViewCertificate={(app) => {
          onViewApprenticeCertificate(app);
          setIsDetailModalOpen(false);
        }}
      />

    </div>
  );
};
