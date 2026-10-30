import React, { useState, useEffect } from 'react';
import { Apprentice, InstructorSession, ModuleId } from './types/induction';
import { INITIAL_APPRENTICES, SAMPLE_INSTRUCTORS } from './data/senaData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleIdentity } from './components/ModuleIdentity';
import { ModuleRightsDuties } from './components/ModuleRightsDuties';
import { ModuleSimulator } from './components/ModuleSimulator';
import { ModuleFPI } from './components/ModuleFPI';
import { EvaluationQuiz } from './components/EvaluationQuiz';
import { CertificateView } from './components/CertificateView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { ApprenticeSelectorModal } from './components/ApprenticeSelectorModal';
import { AuthLoginModal } from './components/AuthLoginModal';
import { ApprenticeCharacterizationModal } from './components/ApprenticeCharacterizationModal';
import { GoogleSheetsModalViewer } from './components/GoogleSheetsModalViewer';
import { UserManualModal } from './components/UserManualModal';
import { VideoTutorialModal } from './components/VideoTutorialModal';
import { LandingPage } from './components/LandingPage';
import { SenaLogo } from './components/SenaLogo';
import { Award, BookOpen, CheckCircle, FileText, HelpCircle, Layers, ShieldCheck, Sparkles, UserCheck, CloudCheck, FileSpreadsheet, ExternalLink, Play } from 'lucide-react';
import { 
  getAccessToken, 
  getSavedSpreadsheetInfo, 
  syncApprenticeRealtime,
  syncAllApprenticesToSheet,
  syncQuizAnswerRealtime,
  saveLocalLiveQuizAnswer,
  LiveQuizAnswer
} from './services/googleSheetsService';
import { QuizQuestion } from './types/induction';

export default function App() {
  const [activeRole, setActiveRole] = useState<'aprendiz' | 'instructor'>('aprendiz');
  const [currentModule, setCurrentModule] = useState<ModuleId>('identidad');
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);
  const [isCharacterizationModalOpen, setIsCharacterizationModalOpen] = useState<boolean>(false);
  
  // Load apprentices from localStorage or default
  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    try {
      const saved = localStorage.getItem('sena_induction_apprentices');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_APPRENTICES;
  });

  const [currentApprenticeId, setCurrentApprenticeId] = useState<string>(() => {
    return apprentices[1]?.id || apprentices[0]?.id || 'app-002';
  });

  // Active Instructor session
  const [instructorSession, setInstructorSession] = useState<InstructorSession>(() => {
    try {
      const saved = localStorage.getItem('sena_instructor_session');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SAMPLE_INSTRUCTORS[0];
  });

  // Auth & Profile Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'aprendiz' | 'instructor'>('aprendiz');
  const [isSelectorModalOpen, setIsSelectorModalOpen] = useState<boolean>(false);

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sena_dark_mode') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleTheme = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      try {
        localStorage.setItem('sena_dark_mode', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sena_induction_apprentices', JSON.stringify(apprentices));
    } catch (e) {
      // ignore
    }
  }, [apprentices]);

  // Google Sheets Modal State & Live Answers Log
  const [isGoogleSheetsModalOpen, setIsGoogleSheetsModalOpen] = useState<boolean>(false);
  const [latestLiveAnswer, setLatestLiveAnswer] = useState<LiveQuizAnswer | undefined>(undefined);
  const [isManualModalOpen, setIsManualModalOpen] = useState<boolean>(false);
  const [isVideoTutorialModalOpen, setIsVideoTutorialModalOpen] = useState<boolean>(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Background real-time sync with Google Drive spreadsheet
  const triggerRealtimeSync = async (app: Apprentice) => {
    try {
      const token = await getAccessToken();
      const info = getSavedSpreadsheetInfo();
      if (token && info?.spreadsheetId) {
        await syncApprenticeRealtime(token, info.spreadsheetId, app);
        setSyncToastMessage(`Sincronizado en Google Drive: ${app.fullName}`);
        setTimeout(() => setSyncToastMessage(null), 3500);
      }
    } catch (e) {
      console.warn('[Google Drive Sync] Sincronización en segundo plano:', e);
    }
  };

  const currentApprentice = apprentices.find(a => a.id === currentApprenticeId) || apprentices[0];

  // Real-time hook when apprentice answers a question in the evaluation
  const handleQuestionAnswered = async (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean,
    question: QuizQuestion
  ) => {
    const answerObj: LiveQuizAnswer = {
      id: `ans-${currentApprentice.id}-q${questionIndex + 1}-${Date.now()}`,
      apprenticeId: currentApprentice.id,
      documentNumber: currentApprentice.documentNumber,
      fullName: currentApprentice.fullName,
      ficha: currentApprentice.ficha,
      questionNumber: questionIndex + 1,
      questionText: question.question,
      selectedOption: question.options[optionIndex],
      isCorrect,
      regulationArticle: question.regulationArticle,
      timestamp: new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    // Save to local cache for instant spreadsheet viewer display
    saveLocalLiveQuizAnswer(answerObj);
    setLatestLiveAnswer(answerObj);

    // Update current apprentice object with quiz state
    setApprentices(prev => prev.map(a => {
      if (a.id !== currentApprentice.id) return a;
      const updatedAnswers = { ...(a.quizAnswers || {}), [questionIndex]: optionIndex };
      return {
        ...a,
        quizAnswers: updatedAnswers,
        latestAnswer: {
          questionIndex,
          questionText: question.question,
          selectedText: question.options[optionIndex],
          isCorrect,
          timestamp: answerObj.timestamp
        }
      };
    }));

    // Trigger immediate background sync with Google Sheets Respuestas_Evaluacion_EnVivo
    try {
      const token = await getAccessToken();
      const info = getSavedSpreadsheetInfo();
      if (token && info?.spreadsheetId) {
        await syncQuizAnswerRealtime(token, info.spreadsheetId, answerObj);
        setSyncToastMessage(`Pregunta ${questionIndex + 1} guardada en Google Drive (${isCorrect ? 'Acierto ✓' : 'Errónea'})`);
        setTimeout(() => setSyncToastMessage(null), 3500);
      } else {
        setSyncToastMessage(`Pregunta ${questionIndex + 1} registrada en la hoja de cálculo local`);
        setTimeout(() => setSyncToastMessage(null), 3000);
      }
    } catch (err) {
      console.warn('Error sincronizando respuesta con Google Drive:', err);
    }
  };

  // Mark module as completed and recalculate progress percentage
  const handleCompleteModule = (modId: ModuleId) => {
    let updatedApp: Apprentice | null = null;
    setApprentices(prev => prev.map(a => {
      if (a.id !== currentApprentice.id) return a;
      
      const currentMods = new Set(a.completedModules || []);
      currentMods.add(modId);
      const updatedMods = Array.from(currentMods);
      
      // Calculate progress based on 5 key modules
      const totalKeyModules = 5; // identidad, derechos-deberes, simulador, fpi, evaluacion
      const progress = Math.min(100, Math.round((updatedMods.length / totalKeyModules) * 100));

      const updated = {
        ...a,
        completedModules: updatedMods,
        progressPercent: progress
      };
      updatedApp = updated;
      return updated;
    }));

    if (updatedApp) {
      triggerRealtimeSync(updatedApp);
    }
  };

  // Called when apprentice finishes evaluation quiz
  const handleQuizCompleted = (scorePercent: number) => {
    let updatedApp: Apprentice | null = null;
    setApprentices(prev => prev.map(a => {
      if (a.id !== currentApprentice.id) return a;
      
      const currentMods = new Set(a.completedModules || []);
      currentMods.add('evaluacion');
      const updatedMods = Array.from(currentMods);
      const isPassed = scorePercent >= 70;
      const certId = a.certificateId || `SENA-IND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const updated = {
        ...a,
        completedModules: updatedMods,
        score: scorePercent,
        inductionCompleted: isPassed,
        progressPercent: isPassed ? 100 : Math.max(a.progressPercent, 80),
        completedAt: new Date().toLocaleDateString('es-CO', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        certificateId: isPassed ? certId : undefined
      };
      updatedApp = updated;
      return updated;
    }));

    if (updatedApp) {
      triggerRealtimeSync(updatedApp);
    }
  };

  const handleOpenLoginModal = (role: 'aprendiz' | 'instructor') => {
    setAuthModalInitialRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLoginApprentice = (app: Apprentice) => {
    setApprentices(prev => {
      const idx = prev.findIndex(a => a.id === app.id || a.documentNumber === app.documentNumber);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], ...app };
        return copy;
      }
      return [app, ...prev];
    });
    setCurrentApprenticeId(app.id);
    setActiveRole('aprendiz');
    setIsLandingPage(false);
    setCurrentModule('identidad');
    triggerRealtimeSync(app);
  };

  const handleLoginInstructor = (inst: InstructorSession) => {
    setInstructorSession(inst);
    try {
      localStorage.setItem('sena_instructor_session', JSON.stringify(inst));
    } catch {
      // ignore
    }
    setActiveRole('instructor');
    setIsLandingPage(false);
  };

  const handleSaveCharacterization = (updated: Apprentice) => {
    setApprentices(prev => {
      const idx = prev.findIndex(a => a.id === updated.id || a.documentNumber === updated.documentNumber);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updated;
        return copy;
      }
      return [updated, ...prev];
    });
    setCurrentApprenticeId(updated.id);
    setActiveRole('aprendiz');
    setIsLandingPage(false);
    setCurrentModule('identidad');
    triggerRealtimeSync(updated);
  };

  const handleUpdateCurrentApprentice = (updated: Apprentice) => {
    setApprentices(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  const handleAddApprentice = (newApp: Apprentice) => {
    setApprentices(prev => [newApp, ...prev]);
    setCurrentApprenticeId(newApp.id);
  };

  const handleSelectApprenticeFromInstructor = (app: Apprentice) => {
    setCurrentApprenticeId(app.id);
    setActiveRole('aprendiz');
    setIsLandingPage(false);
    setCurrentModule('identidad');
  };

  const handleViewApprenticeCertificateFromInstructor = (app: Apprentice) => {
    setCurrentApprenticeId(app.id);
    setActiveRole('aprendiz');
    setIsLandingPage(false);
    setCurrentModule('certificado');
  };

  return (
    <div className={`min-h-screen w-full overflow-x-hidden flex flex-col transition-colors duration-300 ${isDarkMode ? 'modo-blue bg-[#031424] text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Navbar with Landing Page Button, Dual Login Buttons & Role State */}
      <Navbar
        currentModule={currentModule}
        onSelectModule={(mod) => {
          setIsLandingPage(false);
          setActiveRole('aprendiz');
          setCurrentModule(mod);
        }}
        activeRole={activeRole}
        onToggleRole={(role) => {
          setIsLandingPage(false);
          setActiveRole(role);
        }}
        currentApprentice={currentApprentice}
        currentInstructor={instructorSession}
        onOpenLoginModal={handleOpenLoginModal}
        onOpenProfile={() => setIsSelectorModalOpen(true)}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        isLandingPage={isLandingPage}
        onNavigateLandingPage={() => setIsLandingPage(true)}
        onOpenCharacterization={() => setIsCharacterizationModalOpen(true)}
        onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
        onOpenManual={() => setIsManualModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        
        {isLandingPage ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <LandingPage
              onSelectRoleAprendiz={() => {
                setActiveRole('aprendiz');
                setIsLandingPage(false);
                setCurrentModule('identidad');
              }}
              onOpenCharacterization={() => {
                setActiveRole('aprendiz');
                setIsCharacterizationModalOpen(true);
              }}
              onSelectRoleInstructor={() => {
                setActiveRole('instructor');
                setIsLandingPage(false);
              }}
              currentApprentice={currentApprentice}
              currentInstructor={instructorSession}
              totalApprentices={apprentices.length}
              onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
              onOpenManual={() => setIsManualModalOpen(true)}
              onOpenVideoTutorial={() => setIsVideoTutorialModalOpen(true)}
            />
          </div>
        ) : activeRole === 'instructor' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <InstructorDashboard
              apprentices={apprentices}
              instructorSession={instructorSession}
              onSelectApprentice={handleSelectApprenticeFromInstructor}
              onAddApprentice={handleAddApprentice}
              onViewApprenticeCertificate={handleViewApprenticeCertificateFromInstructor}
              onOpenLoginModal={handleOpenLoginModal}
              onOpenGoogleSheets={() => setIsGoogleSheetsModalOpen(true)}
            />
          </div>
        ) : (
          <>
            {/* Hero Section shown on Apprentice Mode with Characterization Action and Dual Login Portal */}
            <div className="no-print">
              <HeroSection
                apprentice={currentApprentice}
                onNavigateModule={(mod) => setCurrentModule(mod)}
                onOpenApprenticeSelector={() => setIsSelectorModalOpen(true)}
                onOpenLoginModal={handleOpenLoginModal}
                onOpenCharacterization={() => setIsCharacterizationModalOpen(true)}
              />
            </div>

            {/* Quick Segmented Module Switcher Toolbar */}
            <div className="no-print border-b border-slate-200 bg-white shadow-2xs">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center justify-between gap-4 overflow-x-auto">
                  <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
                    <button
                      onClick={() => setCurrentModule('identidad')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        currentModule === 'identidad'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 text-[#39A900]" />
                      01. Identidad Institucional
                    </button>

                    <button
                      onClick={() => setCurrentModule('derechos-deberes')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        currentModule === 'derechos-deberes'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#00324D]" />
                      02. Derechos y Deberes
                    </button>

                    <button
                      onClick={() => setCurrentModule('simulador')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        currentModule === 'simulador'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-600" />
                      03. Casos Reglamentarios
                    </button>

                    <button
                      onClick={() => setCurrentModule('fpi')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        currentModule === 'fpi'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                      04. Ruta FPI & Bienestar
                    </button>

                    <button
                      onClick={() => setCurrentModule('evaluacion')}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                        currentModule === 'evaluacion'
                          ? 'bg-[#39A900] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      05. Evaluación de Conocimientos
                    </button>

                    {currentApprentice.inductionCompleted && (
                      <button
                        onClick={() => setCurrentModule('certificado')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                          currentModule === 'certificado'
                            ? 'bg-[#00324D] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        Certificado Oficial
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Render Active Module */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
              {currentModule === 'identidad' && (
                <ModuleIdentity
                  isCompleted={currentApprentice.completedModules?.includes('identidad')}
                  onCompleteModule={() => handleCompleteModule('identidad')}
                  onNextModule={() => setCurrentModule('derechos-deberes')}
                />
              )}

              {currentModule === 'derechos-deberes' && (
                <ModuleRightsDuties
                  isCompleted={currentApprentice.completedModules?.includes('derechos-deberes')}
                  onCompleteModule={() => handleCompleteModule('derechos-deberes')}
                  onNextModule={() => setCurrentModule('simulador')}
                />
              )}

              {currentModule === 'simulador' && (
                <ModuleSimulator
                  isCompleted={currentApprentice.completedModules?.includes('simulador')}
                  onCompleteModule={() => handleCompleteModule('simulador')}
                  onNextModule={() => setCurrentModule('fpi')}
                />
              )}

              {currentModule === 'fpi' && (
                <ModuleFPI
                  isCompleted={currentApprentice.completedModules?.includes('fpi')}
                  onCompleteModule={() => handleCompleteModule('fpi')}
                  onNextModule={() => setCurrentModule('evaluacion')}
                />
              )}

              {currentModule === 'evaluacion' && (
                <EvaluationQuiz
                  apprentice={currentApprentice}
                  onQuizCompleted={handleQuizCompleted}
                  onViewCertificate={() => setCurrentModule('certificado')}
                  onReviewModules={() => setCurrentModule('identidad')}
                  onAnswerQuestion={handleQuestionAnswered}
                />
              )}

              {currentModule === 'certificado' && (
                <CertificateView
                  apprentice={currentApprentice}
                  onBackToDashboard={() => setCurrentModule('identidad')}
                />
              )}
            </div>
          </>
        )}

      </main>

      {/* Institutional Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <SenaLogo className="w-6 h-6 shrink-0" />
            <span className="font-bold text-slate-800">Servicio Nacional de Aprendizaje SENA</span>
            <span aria-hidden="true">·</span>
            <span>Dirección General · República de Colombia</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={() => setIsVideoTutorialModalOpen(true)}
              className="text-[#39A900] hover:text-[#2d8500] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Abrir Video Tutorial interactivo con controles de reproducción"
            >
              <Play className="w-3.5 h-3.5 fill-[#39A900] text-[#39A900]" />
              <span>Video Tutorial</span>
            </button>
            <button
              type="button"
              onClick={() => setIsManualModalOpen(true)}
              className="text-[#00324D] dark:text-emerald-400 hover:text-[#39A900] font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Abrir Manual de Usuario para Aprendices (manual.md)"
            >
              <BookOpen className="w-4 h-4 text-[#39A900]" />
              <span>Manual de Uso (manual.md)</span>
            </button>
            <span className="font-mono">Acuerdo 009 de 2024 · Actualizado Ac. 002 de 2026</span>
            <span>Línea Gratuita Nacional: 01 8000 910270</span>
            <a
              href="https://www.sena.edu.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00324D] hover:text-[#39A900] font-semibold transition-colors"
            >
              Portal Institucional SENA ↗
            </a>
          </div>
        </div>
      </footer>

      {/* Apprentice Selector & Profile Modal */}
      <ApprenticeSelectorModal
        isOpen={isSelectorModalOpen}
        onClose={() => setIsSelectorModalOpen(false)}
        apprentices={apprentices}
        currentApprentice={currentApprentice}
        onSelectApprentice={(app) => {
          setCurrentApprenticeId(app.id);
          setIsSelectorModalOpen(false);
        }}
        onUpdateCurrentApprentice={handleUpdateCurrentApprentice}
      />

      {/* Dual Role Authentication Modal (Ingreso Aprendiz & Ingreso Instructor) */}
      <AuthLoginModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialRole={authModalInitialRole}
        apprentices={apprentices}
        currentApprentice={currentApprentice}
        currentInstructor={instructorSession}
        onLoginApprentice={handleLoginApprentice}
        onLoginInstructor={handleLoginInstructor}
      />

      {/* Apprentice Characterization Modal (SofiaPlus full characterization form) */}
      <ApprenticeCharacterizationModal
        isOpen={isCharacterizationModalOpen}
        onClose={() => setIsCharacterizationModalOpen(false)}
        currentApprentice={currentApprentice}
        onSaveCharacterization={handleSaveCharacterization}
      />

      {/* Google Sheets / Google Drive Real-Time Modal Viewer */}
      <GoogleSheetsModalViewer
        isOpen={isGoogleSheetsModalOpen}
        onClose={() => setIsGoogleSheetsModalOpen(false)}
        apprentices={apprentices}
        currentApprentice={currentApprentice}
        latestAnswer={latestLiveAnswer}
        onForcedSync={async () => {
          const token = await getAccessToken();
          const info = getSavedSpreadsheetInfo();
          if (token && info?.spreadsheetId) {
            await syncAllApprenticesToSheet(token, info.spreadsheetId, apprentices);
          }
        }}
      />

      {/* Interactive User Manual Modal (manual.md) */}
      <UserManualModal
        isOpen={isManualModalOpen}
        onClose={() => setIsManualModalOpen(false)}
      />

      {/* Floating Video Tutorial Modal with Full Playback Controls */}
      <VideoTutorialModal
        isOpen={isVideoTutorialModalOpen}
        onClose={() => setIsVideoTutorialModalOpen(false)}
      />

      {/* Floating Google Drive Live Sync Notification Toast */}
      {syncToastMessage && (
        <aside
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-fadeIn"
        >
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
            <CloudCheck className="w-4 h-4 text-[#39A900]" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-white flex items-center gap-1.5">
              <span>Google Sheets SENA</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </p>
            <p className="text-slate-300 text-[11px]">{syncToastMessage}</p>
          </div>
        </aside>
      )}

    </div>
  );
}
