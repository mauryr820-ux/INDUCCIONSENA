import React, { useState, useEffect } from 'react';
import {
  googleSignIn,
  logoutGoogle,
  ensureSpreadsheet,
  syncAllApprenticesToSheet,
  getSavedSpreadsheetInfo,
  SheetConnectionInfo,
  auth
} from '../services/googleSheetsService';
import { Apprentice } from '../types/induction';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  CloudCheck,
  LogOut,
  ShieldCheck,
  Database
} from 'lucide-react';

interface GoogleDriveSyncBadgeProps {
  apprentices: Apprentice[];
  onSyncComplete?: (message: string) => void;
  compact?: boolean;
  onOpenSheetsModal?: () => void;
}

export const GoogleDriveSyncBadge: React.FC<GoogleDriveSyncBadgeProps> = ({
  apprentices,
  onSyncComplete,
  compact = false,
  onOpenSheetsModal
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [cachedToken, setCachedToken] = useState<string | null>(null);
  const [sheetInfo, setSheetInfo] = useState<SheetConnectionInfo | null>(getSavedSpreadsheetInfo());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setCachedToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await googleSignIn();
      if (res?.accessToken) {
        setCachedToken(res.accessToken);
        setCurrentUser(res.user);
        // Automatically check or create spreadsheet
        setSyncStatus('Verificando libro en Google Drive...');
        const info = await ensureSpreadsheet(res.accessToken);
        setSheetInfo(info);
        setSyncStatus('¡Conectado exitosamente con Google Sheets!');
        if (onSyncComplete) onSyncComplete('Conectado a Google Drive');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error al conectar con Google Workspace');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSyncStatus(''), 4000);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutGoogle();
      setCurrentUser(null);
      setCachedToken(null);
      setSyncStatus('');
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleOpenSheet = () => {
    if (sheetInfo?.spreadsheetUrl) {
      window.open(sheetInfo.spreadsheetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Explicit confirmation dialog for mutating data in user's Google Drive
  const handleConfirmSyncAll = async () => {
    setIsConfirmModalOpen(false);
    if (!cachedToken) {
      // Re-authenticate if token was cleared from memory
      try {
        const res = await googleSignIn();
        if (res?.accessToken) {
          setCachedToken(res.accessToken);
          await executeSync(res.accessToken);
        }
      } catch (err: any) {
        setErrorMessage('Se requiere autorizar Google Drive para sincronizar');
      }
      return;
    }
    await executeSync(cachedToken);
  };

  const executeSync = async (token: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSyncStatus('Sincronizando con Google Sheets...');
    try {
      const info = await ensureSpreadsheet(token);
      setSheetInfo(info);
      const res = await syncAllApprenticesToSheet(token, info.spreadsheetId, apprentices);
      setSheetInfo(getSavedSpreadsheetInfo());
      const msg = `Se sincronizaron ${res.total} aprendices en Google Drive.`;
      setSyncStatus(msg);
      if (onSyncComplete) onSyncComplete(msg);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Error al sincronizar datos');
    } finally {
      setIsLoading(false);
      setTimeout(() => setSyncStatus(''), 5000);
    }
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        {currentUser && sheetInfo ? (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleOpenSheet}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              title="Abrir hoja de cálculo de aprendices en Google Drive"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Sheets SENA</span>
              <ExternalLink className="w-3 h-3 text-emerald-500" />
            </button>
            <button
              type="button"
              onClick={() => setIsConfirmModalOpen(true)}
              disabled={isLoading}
              className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs transition-colors cursor-pointer"
              title="Sincronizar cambios ahora"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleSignIn}
            disabled={isLoading}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
            <span>{isLoading ? 'Conectando...' : 'Vincular Drive'}</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-white p-4 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-emerald-700 shadow-xs shrink-0">
              <FileSpreadsheet className="w-6 h-6 text-[#39A900]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
                  Sincronización Google Workspace
                </span>
                {currentUser && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    En tiempo real activo
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Hoja de Cálculo en Google Drive
              </h3>
              <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                Los registros de caracterización de los aprendices y sus resultados de inducción se actualizan de forma continua en tu cuenta institucional de Google.
              </p>
              {sheetInfo?.lastSyncDate && (
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <CloudCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Última sincronización: {new Date(sheetInfo.lastSyncDate).toLocaleTimeString('es-CO')} - {new Date(sheetInfo.lastSyncDate).toLocaleDateString('es-CO')}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-xs transition-all flex items-center gap-2.5 cursor-pointer hover:border-slate-400"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>{isLoading ? 'Conectando...' : 'Conectar con Google Drive'}</span>
              </button>
            ) : (
              <>
                {onOpenSheetsModal && (
                  <button
                    type="button"
                    onClick={onOpenSheetsModal}
                    className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Ver Hoja en Prototipo</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping" />
                  </button>
                )}

                {sheetInfo?.spreadsheetUrl && (
                  <button
                    type="button"
                    onClick={handleOpenSheet}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-bold transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>Abrir en Google Drive</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  disabled={isLoading}
                  className="px-3 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
                  <span>Sincronizar Todo</span>
                </button>

                <div className="flex items-center gap-2 border-l border-emerald-200 pl-2">
                  <span className="text-[11px] font-medium text-slate-600 hidden sm:inline" title={currentUser.email || ''}>
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-emerald-100/50 transition-colors cursor-pointer"
                    title="Desconectar cuenta de Google"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Feedback messages */}
        {syncStatus && (
          <div className="mt-3 p-2 rounded-lg bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}

        {errorMessage && (
          <div className="mt-3 p-2 rounded-lg bg-rose-50 border border-rose-300 text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Mandatory User Confirmation Dialog before mutating Workspace data */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3 text-emerald-700">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Confirmar Sincronización en Google Drive
                </h4>
                <p className="text-xs text-slate-500">
                  Libro: SENA - Inducción y Caracterización de Aprendices
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              ¿Deseas sincronizar y actualizar los datos de <strong>{apprentices.length} aprendices</strong> en las pestañas <em>Aprendices_Caracterizacion</em> y <em>Seguimiento_Induccion</em> de tu Google Sheets?
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Alcance de la operación:</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                <li>Actualización de datos sociodemográficos SofiaPlus</li>
                <li>Puntajes de evaluación final y estado de aprobación</li>
                <li>Folios de certificados emitidos</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmSyncAll}
                className="px-4 py-2 rounded-xl bg-[#39A900] hover:bg-[#329200] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmar y Sincronizar</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
