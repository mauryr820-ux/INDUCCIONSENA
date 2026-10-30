import React, { useState } from 'react';
import { Apprentice, InstructorSession, ModuleId } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Layers, 
  ShieldCheck, 
  Scale, 
  Compass, 
  Award, 
  GraduationCap, 
  UserCheck, 
  Building2, 
  Sparkles,
  ChevronDown,
  FileSpreadsheet,
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  currentModule: ModuleId;
  onSelectModule: (module: ModuleId) => void;
  activeRole: 'aprendiz' | 'instructor';
  onToggleRole: (role: 'aprendiz' | 'instructor') => void;
  currentApprentice: Apprentice;
  currentInstructor: InstructorSession;
  onOpenLoginModal: (role: 'aprendiz' | 'instructor') => void;
  onOpenProfile: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  isLandingPage?: boolean;
  onNavigateLandingPage: () => void;
  onOpenCharacterization?: () => void;
  onOpenGoogleSheets?: () => void;
  onOpenManual?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  onSelectModule,
  activeRole,
  onToggleRole,
  currentApprentice,
  currentInstructor,
  onOpenLoginModal,
  onOpenProfile,
  isDarkMode,
  onToggleTheme,
  isLandingPage = false,
  onNavigateLandingPage,
  onOpenCharacterization,
  onOpenGoogleSheets,
  onOpenManual
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ModuleId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'identidad', label: 'Identidad SENA', icon: Layers },
    { id: 'derechos-deberes', label: 'Derechos y Deberes', icon: ShieldCheck },
    { id: 'simulador', label: 'Casos y Dilemas', icon: Scale },
    { id: 'fpi', label: 'Ruta Formación (FPI)', icon: Compass },
    { id: 'evaluacion', label: 'Evaluación Interactiva', icon: Award },
  ];

  const handleSelectNav = (id: ModuleId) => {
    onSelectModule(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          
          {/* Zone 1: Wordmark with official SENA logo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLandingPage();
              }}
              className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-[#00324D] dark:text-white whitespace-nowrap shrink-0 group min-w-0"
              title="Ir al Portal / Landing Page Principal"
            >
              <SenaLogo className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-sm sm:text-base">
                SENA <span className="text-[#39A900]">Inducción</span>
              </span>
            </a>

            {/* Prominent Landing Page Button */}
            <button
              type="button"
              onClick={onNavigateLandingPage}
              className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                isLandingPage
                  ? 'bg-[#00324D] text-white ring-2 ring-emerald-500/30'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
              title="Ir a la Landing Page Principal con Selección de Roles (Aprendiz e Instructor)"
            >
              <Compass className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
              <span>Landing Page</span>
            </button>

            {/* Manual de Usuario Button */}
            {onOpenManual && (
              <button
                type="button"
                onClick={onOpenManual}
                className="hidden md:flex px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all items-center gap-1.5 cursor-pointer shadow-2xs bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                title="Consultar Manual de Usuario para Aprendices (manual.md)"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                <span>Manual</span>
              </button>
            )}
          </div>

          {/* Zone 2: Desktop navigation links (visible on xl screens to prevent header wrap/overflow) */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-6 text-xs 2xl:text-sm font-medium text-slate-600 dark:text-slate-300">
            {navItems.map((item) => {
              const isActive = !isLandingPage && activeRole === 'aprendiz' && currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors pb-1 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900] font-semibold'
                      : 'border-transparent hover:text-slate-900 dark:hover:text-white hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: DUAL LOGIN BUTTONS (Instructor & Aprendiz) + User Profile + Theme */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Dual Login Buttons for Quick Access */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              
              {/* Button: Ingreso Aprendiz */}
              <button
                type="button"
                onClick={() => onOpenLoginModal('aprendiz')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  !isLandingPage && activeRole === 'aprendiz'
                    ? 'bg-[#39A900] text-white hover:bg-[#329200] ring-2 ring-emerald-500/20'
                    : 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100'
                }`}
                title="Ingresar como Aprendiz SENA (Cédula/Tarjeta y Ficha)"
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Ingreso </span>
                <span>Aprendiz</span>
              </button>

              {/* Button: Ingreso Instructor */}
              <button
                type="button"
                onClick={() => onOpenLoginModal('instructor')}
                className={`px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs ${
                  !isLandingPage && activeRole === 'instructor'
                    ? 'bg-[#00324D] text-white hover:bg-slate-800 ring-2 ring-sky-500/20'
                    : 'bg-sky-50 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-300 dark:border-sky-800 hover:bg-sky-100'
                }`}
                title="Ingresar como Instructor o Coordinador (Gestión de Fichas)"
              >
                <UserCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Ingreso </span>
                <span>Instructor</span>
              </button>

              {/* Quick Caracterización Button for Aprendiz */}
              {onOpenCharacterization && (
                <button
                  type="button"
                  onClick={onOpenCharacterization}
                  className="hidden md:flex px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="Diligenciar o actualizar datos de caracterización del aprendiz"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                  <span>Caracterización</span>
                </button>
              )}

              {/* Button: Hoja Google Sheets & Drive (En Vivo) - Exclusivo para Instructor */}
              {onOpenGoogleSheets && activeRole === 'instructor' && (
                <button
                  type="button"
                  onClick={onOpenGoogleSheets}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-bold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
                  title="Ver Hoja de Cálculo en Google Drive sincronizada en tiempo real (Exclusivo Instructor)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden lg:inline">Hoja </span>
                  <span>Google Drive</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-ping shrink-0" />
                </button>
              )}

            </div>

            {/* Active User Badge / Context Switcher */}
            {activeRole === 'aprendiz' ? (
              <button
                onClick={onOpenProfile}
                className="hidden lg:flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                title="Ver datos del aprendiz y ficha matriculada"
              >
                <div className="w-6 h-6 rounded-full bg-[#39A900]/15 text-[#39A900] font-bold text-xs flex items-center justify-center shrink-0">
                  {currentApprentice.fullName.charAt(0)}
                </div>
                <div className="truncate max-w-[100px] xl:max-w-[130px]">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate leading-tight">
                    {currentApprentice.fullName.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono leading-tight">
                    Ficha {currentApprentice.ficha}
                  </p>
                </div>
              </button>
            ) : (
              <button
                onClick={() => onOpenLoginModal('instructor')}
                className="hidden lg:flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-sky-200 dark:border-sky-800 bg-sky-50/50 dark:bg-sky-950/30 hover:bg-sky-100 transition-colors text-left cursor-pointer"
                title="Instructor activo: Cambiar ficha o rol"
              >
                <div className="w-6 h-6 rounded-full bg-[#00324D] text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {currentInstructor.fullName.charAt(0)}
                </div>
                <div className="truncate max-w-[100px] xl:max-w-[130px]">
                  <p className="text-xs font-semibold text-slate-900 dark:text-white truncate leading-tight">
                    {currentInstructor.fullName.split(' ')[0]} {currentInstructor.fullName.split(' ')[1] || ''}
                  </p>
                  <p className="text-[10px] text-sky-700 dark:text-sky-300 font-mono leading-tight">
                    {currentInstructor.role.split(' ')[0]}
                  </p>
                </div>
              </button>
            )}

            {/* Light / Modo Blue theme toggle button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 shadow-2xs cursor-pointer ${
                isDarkMode
                  ? 'bg-[#0c2e4c] border-[#185382] text-sky-300 hover:bg-[#103a60]'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Blue (Oscuro)'}
              aria-label={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Blue (Oscuro)'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="hidden md:inline">Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#00324D] shrink-0" />
                  <span className="hidden md:inline">Modo Blue</span>
                </>
              )}
            </button>

            {/* Mobile / Tablet menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Abrir menú de módulos"
              title="Menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800 dark:text-white" /> : <Menu className="w-5 h-5 text-slate-800 dark:text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-900/98 shadow-lg transition-all animate-fadeIn px-4 py-3 space-y-3">
          
          {/* Mobile Login Buttons & Landing Page */}
          <div className="space-y-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => {
                onNavigateLandingPage();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-[#00324D] text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#39A900]" />
              <span>Ir a Landing Page (Selección de Roles)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onOpenLoginModal('aprendiz');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 text-xs font-bold rounded-lg bg-[#39A900] text-white flex items-center justify-center gap-1.5 shadow-xs"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Ingreso Aprendiz</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onOpenLoginModal('instructor');
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 text-xs font-bold rounded-lg bg-slate-800 text-white flex items-center justify-center gap-1.5 shadow-xs"
              >
                <UserCheck className="w-4 h-4 text-sky-300" />
                <span>Ingreso Instructor</span>
              </button>
            </div>

            {onOpenCharacterization && (
              <button
                type="button"
                onClick={() => {
                  onOpenCharacterization();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <span>Diligenciar Caracterización del Aprendiz</span>
              </button>
            )}

            {onOpenManual && (
              <button
                type="button"
                onClick={() => {
                  onOpenManual();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span>Manual de Uso para Aprendices (manual.md)</span>
              </button>
            )}

            {onOpenGoogleSheets && activeRole === 'instructor' && (
              <button
                type="button"
                onClick={() => {
                  onOpenGoogleSheets();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 px-3 text-xs font-bold rounded-lg bg-emerald-600 text-white flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Ver Hoja Google Sheets (Drive) en Vivo (Instructor)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1 pb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              Módulos de Inducción SENA
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRole === 'aprendiz' && currentModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#39A900]/10 text-[#00324D] dark:text-[#39A900] font-bold border-l-4 border-[#39A900]'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#39A900]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Profile Trigger bar */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left w-full cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#39A900]/15 text-[#39A900] font-bold text-xs flex items-center justify-center shrink-0">
                {currentApprentice.fullName.charAt(0)}
              </div>
              <div className="truncate flex-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentApprentice.fullName}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">Ficha {currentApprentice.ficha} • Editar datos</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
