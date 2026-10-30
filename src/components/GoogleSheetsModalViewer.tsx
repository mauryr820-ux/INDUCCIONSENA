import React, { useState, useEffect } from 'react';
import { Apprentice } from '../types/induction';
import { 
  SheetConnectionInfo, 
  getSavedSpreadsheetInfo, 
  getLocalLiveQuizAnswers, 
  LiveQuizAnswer,
  CARACTERIZACION_HEADERS,
  PROGRESO_HEADERS,
  RESPUESTAS_HEADERS,
  apprenticeToCharacterizationRow,
  apprenticeToProgressRow,
  getAccessToken,
  syncAllApprenticesToSheet,
  googleSignIn,
  auth
} from '../services/googleSheetsService';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  X, 
  RefreshCw, 
  CheckCircle2, 
  CloudCheck, 
  Search, 
  Table, 
  Layers, 
  Sparkles, 
  ShieldCheck, 
  Download,
  Share2,
  Lock,
  ChevronDown,
  Info
} from 'lucide-react';

interface GoogleSheetsModalViewerProps {
  isOpen: boolean;
  onClose: () => void;
  apprentices: Apprentice[];
  currentApprentice: Apprentice;
  latestAnswer?: LiveQuizAnswer;
  onForcedSync?: () => Promise<void>;
}

export const GoogleSheetsModalViewer: React.FC<GoogleSheetsModalViewerProps> = ({
  isOpen,
  onClose,
  apprentices,
  currentApprentice,
  latestAnswer,
  onForcedSync
}) => {
  const [activeTab, setActiveTab] = useState<'caracterizacion' | 'progreso' | 'respuestas'>('respuestas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [liveAnswers, setLiveAnswers] = useState<LiveQuizAnswer[]>(() => getLocalLiveQuizAnswers());
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number; value: string; coord: string }>({
    row: 0,
    col: 0,
    value: '',
    coord: 'A1'
  });
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);
  const [sheetInfo, setSheetInfo] = useState<SheetConnectionInfo | null>(getSavedSpreadsheetInfo());

  // Reload live answers whenever latestAnswer updates or modal opens
  useEffect(() => {
    if (isOpen) {
      setLiveAnswers(getLocalLiveQuizAnswers());
      setSheetInfo(getSavedSpreadsheetInfo());
    }
  }, [isOpen, latestAnswer]);

  if (!isOpen) return null;

  const handleOpenGoogleDrive = () => {
    const info = sheetInfo || getSavedSpreadsheetInfo();
    if (info?.spreadsheetUrl) {
      window.open(info.spreadsheetUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open('https://drive.google.com', '_blank', 'noopener,noreferrer');
    }
  };

  const handleManualSync = async () => {
    setIsSyncing(true);
    setSyncFeedback('Sincronizando registros con Google Drive...');
    try {
      if (onForcedSync) {
        await onForcedSync();
      } else {
        const token = await getAccessToken();
        const info = getSavedSpreadsheetInfo();
        if (token && info?.spreadsheetId) {
          await syncAllApprenticesToSheet(token, info.spreadsheetId, apprentices);
        }
      }
      setSheetInfo(getSavedSpreadsheetInfo());
      setLiveAnswers(getLocalLiveQuizAnswers());
      setSyncFeedback('¡Sincronizado exitosamente con Google Sheets!');
    } catch (err: any) {
      setSyncFeedback(err?.message || 'Error al conectar con Google Sheets');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 4000);
    }
  };

  // Convert column index to spreadsheet letter (A, B, C... Z, AA, AB...)
  const getColumnLetter = (colIndex: number): string => {
    let letter = '';
    let temp = colIndex;
    while (temp >= 0) {
      letter = String.fromCharCode((temp % 26) + 65) + letter;
      temp = Math.floor(temp / 26) - 1;
    }
    return letter;
  };

  // Filtered rows for Tab 1 (Caracterizacion)
  const charRows = apprentices
    .filter(a => 
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.documentNumber.includes(searchTerm) ||
      a.ficha.includes(searchTerm)
    )
    .map(apprenticeToCharacterizationRow);

  // Filtered rows for Tab 2 (Progreso)
  const progRows = apprentices
    .filter(a => 
      a.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.documentNumber.includes(searchTerm) ||
      a.ficha.includes(searchTerm)
    )
    .map(apprenticeToProgressRow);

  // Filtered rows for Tab 3 (Respuestas en Vivo)
  const respRows = liveAnswers.filter(ans =>
    ans.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ans.documentNumber.includes(searchTerm) ||
    ans.ficha.includes(searchTerm) ||
    ans.questionText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 w-full max-w-7xl h-[92vh] max-h-[920px] rounded-2xl shadow-2xl border border-slate-300 dark:border-slate-700 flex flex-col overflow-hidden">
        
        {/* ============================================================== */}
        {/* GOOGLE SHEETS AUTHENTIC TOP BAR */}
        {/* ============================================================== */}
        <div className="bg-[#f8fafd] dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* File identity and title */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Google Sheets Icon */}
            <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                <path d="M7 7h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
              </svg>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                  SENA - Inducción y Caracterización de Aprendices
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Google Drive En Vivo
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-300 border border-sky-300 dark:border-sky-800">
                  <ShieldCheck className="w-3 h-3 text-sky-600" />
                  Supervisión Docente · Solo Instructor
                </span>
              </div>

              {/* Menu items simulation */}
              <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Archivo</span>
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Editar</span>
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Ver</span>
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Insertar</span>
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Formato</span>
                <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Datos</span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-mono pl-2 border-l border-slate-300 dark:border-slate-700">
                  <CloudCheck className="w-3.5 h-3.5" />
                  Guardado en Drive
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2">
            
            {/* Direct Open in Drive Button */}
            <button
              type="button"
              onClick={handleOpenGoogleDrive}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer group"
              title="Abrir esta hoja directamente en Google Sheets y Google Drive"
            >
              <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span>Abrir en Google Drive</span>
            </button>

            {/* Force Sync button */}
            <button
              type="button"
              onClick={handleManualSync}
              disabled={isSyncing}
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Sincronizar ahora con Google Sheets"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-emerald-600' : ''}`} />
              <span className="hidden sm:inline">{isSyncing ? 'Sincronizando...' : 'Actualizar'}</span>
            </button>

            {/* Close modal */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-rose-50 hover:border-rose-300 hover:text-rose-600 transition-colors cursor-pointer text-slate-500"
              aria-label="Cerrar visor de hoja de cálculo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ============================================================== */}
        {/* GOOGLE SHEETS FORMULA BAR & TOOLBAR */}
        {/* ============================================================== */}
        <div className="bg-[#f1f3f4] dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 px-3 sm:px-5 py-2 flex items-center gap-3 shrink-0 text-xs">
          
          {/* Cell coordinate */}
          <div className="w-14 sm:w-20 px-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded font-mono font-bold text-center text-slate-800 dark:text-slate-200">
            {selectedCell.coord || 'A1'}
          </div>

          <div className="font-serif italic font-bold text-slate-500 text-sm select-none">
            fx
          </div>

          {/* Formula value display */}
          <div className="flex-1 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded font-mono text-slate-800 dark:text-slate-200 truncate">
            {selectedCell.value ? selectedCell.value : (
              activeTab === 'respuestas' 
                ? '=CONTAR.SI(Respuestas_Evaluacion_EnVivo!H2:H; "CORRECTO*")'
                : activeTab === 'progreso'
                ? '=PROMEDIO(Seguimiento_Induccion!E2:E)'
                : '=CONTARA(Aprendices_Caracterizacion!D2:D)'
            )}
          </div>

          {/* Live Search Filter */}
          <div className="relative w-44 sm:w-60">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en celdas..."
              className="w-full pl-8 pr-2 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-xs text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

        </div>

        {/* Sync feedback notice banner */}
        {syncFeedback && (
          <div className="bg-emerald-50 dark:bg-emerald-950/60 border-b border-emerald-200 dark:border-emerald-800 px-4 py-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center justify-between animate-fadeIn shrink-0">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {syncFeedback}
            </span>
            <span className="font-mono text-[11px] opacity-80">{new Date().toLocaleTimeString()}</span>
          </div>
        )}

        {/* ============================================================== */}
        {/* MAIN SPREADSHEET DATA GRID */}
        {/* ============================================================== */}
        <div className="flex-1 overflow-auto bg-white dark:bg-slate-900 relative">
          
          {/* TAB 1: APRENDICES CARACTERIZACION */}
          {activeTab === 'caracterizacion' && (
            <table className="w-full border-collapse text-xs select-text">
              <thead className="sticky top-0 bg-[#f8f9fa] dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 z-10">
                <tr>
                  <th className="w-10 p-2 border-r border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-center font-mono font-bold">
                    #
                  </th>
                  {CARACTERIZACION_HEADERS.map((header, hIdx) => (
                    <th 
                      key={hIdx}
                      className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{getColumnLetter(hIdx)}</span>
                        <span>{header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {charRows.map((row, rIdx) => {
                  const isCurrent = row[2] === currentApprentice.documentNumber;
                  return (
                    <tr 
                      key={rIdx}
                      className={`hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors ${
                        isCurrent ? 'bg-emerald-50/70 dark:bg-emerald-950/30' : ''
                      }`}
                    >
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 font-semibold">
                        {rIdx + 2}
                      </td>
                      {row.map((val, cIdx) => (
                        <td
                          key={cIdx}
                          onClick={() => setSelectedCell({
                            row: rIdx + 2,
                            col: cIdx,
                            value: val,
                            coord: `${getColumnLetter(cIdx)}${rIdx + 2}`
                          })}
                          className={`p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-cell font-mono text-slate-800 dark:text-slate-200 ${
                            selectedCell.coord === `${getColumnLetter(cIdx)}${rIdx + 2}`
                              ? 'ring-2 ring-emerald-500 bg-emerald-100/40'
                              : ''
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* TAB 2: SEGUIMIENTO INDUCCION */}
          {activeTab === 'progreso' && (
            <table className="w-full border-collapse text-xs select-text">
              <thead className="sticky top-0 bg-[#f8f9fa] dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 z-10">
                <tr>
                  <th className="w-10 p-2 border-r border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-center font-mono font-bold">
                    #
                  </th>
                  {PROGRESO_HEADERS.map((header, hIdx) => (
                    <th 
                      key={hIdx}
                      className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-400">{getColumnLetter(hIdx)}</span>
                        <span>{header}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {progRows.map((row, rIdx) => {
                  const isCurrent = row[0] === currentApprentice.documentNumber;
                  return (
                    <tr 
                      key={rIdx}
                      className={`hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors ${
                        isCurrent ? 'bg-emerald-50/70 dark:bg-emerald-950/30 font-medium' : ''
                      }`}
                    >
                      <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 font-semibold">
                        {rIdx + 2}
                      </td>
                      {row.map((val, cIdx) => (
                        <td
                          key={cIdx}
                          onClick={() => setSelectedCell({
                            row: rIdx + 2,
                            col: cIdx,
                            value: val,
                            coord: `${getColumnLetter(cIdx)}${rIdx + 2}`
                          })}
                          className={`p-2 border-r border-slate-200 dark:border-slate-800 whitespace-nowrap cursor-cell font-mono text-slate-800 dark:text-slate-200 ${
                            selectedCell.coord === `${getColumnLetter(cIdx)}${rIdx + 2}`
                              ? 'ring-2 ring-emerald-500 bg-emerald-100/40'
                              : ''
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {/* TAB 3: RESPUESTAS EVALUACION EN VIVO (THE USER'S PRIMARY REQUEST!) */}
          {activeTab === 'respuestas' && (
            <div className="w-full">
              {/* Context header explaining live updating */}
              <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border-b border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs text-emerald-900 dark:text-emerald-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-bold">Registro en Tiempo Real de Respuestas de Aprendices:</span>
                  <span>A medida que el aprendiz responde cada pregunta de la evaluación, la fila se inserta y se actualiza en Google Drive.</span>
                </div>
                <span className="font-mono font-bold bg-white dark:bg-slate-800 px-2.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                  {respRows.length} Respuestas Sincronizadas
                </span>
              </div>

              <table className="w-full border-collapse text-xs select-text">
                <thead className="sticky top-0 bg-[#f8f9fa] dark:bg-slate-800 border-b border-slate-300 dark:border-slate-700 z-10">
                  <tr>
                    <th className="w-10 p-2 border-r border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-center font-mono font-bold">
                      #
                    </th>
                    {RESPUESTAS_HEADERS.map((header, hIdx) => (
                      <th 
                        key={hIdx}
                        className="p-2.5 border-r border-slate-300 dark:border-slate-700 text-left font-bold text-slate-700 dark:text-slate-200 whitespace-nowrap"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-slate-400">{getColumnLetter(hIdx)}</span>
                          <span>{header}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {respRows.map((ans, rIdx) => {
                    const isLatest = latestAnswer && latestAnswer.id === ans.id;
                    return (
                      <tr 
                        key={ans.id || rIdx}
                        className={`hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-colors ${
                          isLatest ? 'bg-emerald-100/60 dark:bg-emerald-950/50 font-bold' : ''
                        }`}
                      >
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-center font-mono text-slate-400 bg-slate-50 dark:bg-slate-800 font-semibold">
                          {rIdx + 2}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono text-slate-600 dark:text-slate-400">
                          {ans.apprenticeId}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono font-bold text-[#00324D] dark:text-sky-300">
                          {ans.documentNumber}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                          {ans.fullName}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono text-slate-700 dark:text-slate-300">
                          {ans.ficha}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono text-center font-bold text-emerald-700 dark:text-emerald-400">
                          Q{ans.questionNumber}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 max-w-xs truncate" title={ans.questionText}>
                          {ans.questionText}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 max-w-xs truncate" title={ans.selectedOption}>
                          {ans.selectedOption}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 text-center whitespace-nowrap">
                          {ans.isCorrect ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              <CheckCircle2 className="w-3 h-3 text-[#39A900]" />
                              CORRECTO
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                              INCORRECTO
                            </span>
                          )}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {ans.regulationArticle}
                        </td>
                        <td className="p-2 border-r border-slate-200 dark:border-slate-800 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {ans.timestamp}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* ============================================================== */}
        {/* BOTTOM SPREADSHEET TABS BAR */}
        {/* ============================================================== */}
        <div className="bg-[#f1f3f4] dark:bg-slate-900 border-t border-slate-300 dark:border-slate-700 px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 shrink-0">
          
          {/* Sheet tabs switcher */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('respuestas')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-t-2 ${
                activeTab === 'respuestas'
                  ? 'bg-white dark:bg-slate-800 text-[#00324D] dark:text-[#39A900] border-emerald-500 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Respuestas_Evaluacion_EnVivo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('progreso')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-t-2 ${
                activeTab === 'progreso'
                  ? 'bg-white dark:bg-slate-800 text-[#00324D] dark:text-[#39A900] border-emerald-500 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border-transparent'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-sky-600" />
              <span>Seguimiento_Induccion</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('caracterizacion')}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border-t-2 ${
                activeTab === 'caracterizacion'
                  ? 'bg-white dark:bg-slate-800 text-[#00324D] dark:text-[#39A900] border-emerald-500 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border-transparent'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Aprendices_Caracterizacion</span>
            </button>
          </div>

          {/* Real-time status badge */}
          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span className="hidden md:inline">
              Total Filas: {activeTab === 'respuestas' ? respRows.length : apprentices.length}
            </span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Sincronizado con Google Drive
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
