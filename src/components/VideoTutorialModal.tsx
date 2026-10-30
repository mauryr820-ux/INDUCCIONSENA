import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  X, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  Sparkles, 
  Layers,
  GraduationCap,
  ExternalLink,
  Scale,
  Compass,
  FileCheck,
  Headphones
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Chapter {
  id: string;
  timeSeconds: number;
  timeFormatted: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'ch-1',
    timeSeconds: 0,
    timeFormatted: '00:00',
    title: '1. Bienvenida & Guía Oficial SENA',
    description: 'Apropiación institucional y reglamentaria según Acuerdos 009 de 2024 y 002 de 2026.',
    icon: GraduationCap
  },
  {
    id: 'ch-2',
    timeSeconds: 10,
    timeFormatted: '00:10',
    title: '2. Ecosistema Verde de Aprendizaje',
    description: 'Caracterización integral, ruta pedagógica, simulador ético y sincronización en la nube.',
    icon: Compass
  },
  {
    id: 'ch-3',
    timeSeconds: 24,
    timeFormatted: '00:24',
    title: '3. Acceso a la Plataforma y Selección de Rol',
    description: 'Ingreso diferenciado: Rol Aprendiz SENA y Rol Instructor / Coordinador.',
    icon: GraduationCap
  },
  {
    id: 'ch-4',
    timeSeconds: 36,
    timeFormatted: '00:36',
    title: '4. Caracterización Socioeconómica Integral',
    description: 'Formulario SofiaPlus: Identificación, formación, estrato, EPS y contactos de emergencia.',
    icon: Sparkles
  },
  {
    id: 'ch-5',
    timeSeconds: 51,
    timeFormatted: '00:51',
    title: '5. La Ruta Pedagógica de Inducción',
    description: 'Camino paso a paso hacia la certificación oficial de formación integral.',
    icon: Layers
  },
  {
    id: 'ch-6',
    timeSeconds: 62,
    timeFormatted: '01:02',
    title: '6. Módulo 1: Identidad & Símbolos SENA',
    description: 'Fundación 1957 por Rodolfo Martínez Tono, valores de justicia, respeto y escudo.',
    icon: BookOpen
  },
  {
    id: 'ch-7',
    timeSeconds: 75,
    timeFormatted: '01:15',
    title: '7. Módulo 2: Evolución Normativa 2024/2026',
    description: 'Reformas: Salud mental, justicia restaurativa, debido proceso y vocerías con voto.',
    icon: Scale
  },
  {
    id: 'ch-8',
    timeSeconds: 90,
    timeFormatted: '01:30',
    title: '8. Módulo 3: Simulador Ético-Reglamentario',
    description: 'Casos reales con retroalimentación inmediata y sincronización automática para docentes.',
    icon: CheckCircle2
  },
  {
    id: 'ch-9',
    timeSeconds: 104,
    timeFormatted: '01:44',
    title: '9. Módulo 4: Ruta FPI (Lectiva & Productiva)',
    description: 'Competencias laborales y 5 alternativas legales para la etapa práctica empresarial.',
    icon: Layers
  },
  {
    id: 'ch-10',
    timeSeconds: 117,
    timeFormatted: '01:57',
    title: '10. Módulo 5: Evaluación Formativa (70%)',
    description: '10 preguntas pedagógicas con reintentos y justificación en Google Drive.',
    icon: FileCheck
  },
  {
    id: 'ch-11',
    timeSeconds: 130,
    timeFormatted: '02:10',
    title: '11. Módulo 6: Certificado Oficial SENA',
    description: 'Descarga de certificado con folio único verificable en formato PDF para impresión.',
    icon: Award
  },
  {
    id: 'ch-12',
    timeSeconds: 143,
    timeFormatted: '02:23',
    title: '12. Interfaz, Soporte & Canales Oficiales',
    description: 'Modo Blue, navegación móvil, preguntas frecuentes y líneas de atención SENA.',
    icon: Headphones
  }
];

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({
  isOpen,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(155); // 2 minutes 35 seconds total video duration
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [activeChapterId, setActiveChapterId] = useState<string>('ch-1');
  const [showControls, setShowControls] = useState<boolean>(true);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Local uploaded official SENA induction tutorial video
  const videoUrl = '/assets/aistudio/2026__11_59_a.m._1b721ecc.mp4';
  const posterUrl = '/src/assets/images/sena_induction_hero_1793115131226.jpg';

  // Keyboard navigation & playback control
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skip(10);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skip(-10);
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, isMuted]);

  // Reset or play state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setVideoError(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        // Attempt clean play
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay policy prevented; user can click play
          setIsPlaying(false);
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    setCurrentTime(current);

    // Determine current active chapter
    let currentCh = CHAPTERS[0];
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (current >= CHAPTERS[i].timeSeconds) {
        currentCh = CHAPTERS[i];
        break;
      }
    }
    setActiveChapterId(currentCh.id);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
    }
  };

  const skip = (deltaSeconds: number) => {
    if (!videoRef.current) return;
    const newTime = Math.min(Math.max(0, videoRef.current.currentTime + deltaSeconds), duration);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const jumpToChapter = (ch: Chapter) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = ch.timeSeconds;
    setCurrentTime(ch.timeSeconds);
    setActiveChapterId(ch.id);
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setIsMuted(val === 0);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    videoRef.current.muted = nextMuted;
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={containerRef}
        className="bg-slate-900 text-white w-full max-w-5xl rounded-3xl shadow-2xl border border-slate-700 flex flex-col overflow-hidden max-h-[95vh]"
      >
        
        {/* ========================================================== */}
        {/* MODAL HEADER */}
        {/* ========================================================== */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#39A900] text-white flex items-center justify-center shadow-xs shrink-0">
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Video Tutorial Oficial
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Guía de Inducción SENA
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                Cómo Navegar y Utilizar la Plataforma de Inducción SENA
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar video tutorial"
              title="Cerrar ventana flotante (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================== */}
        {/* VIDEO PLAYER AREA */}
        {/* ========================================================== */}
        <div 
          className="relative bg-black flex items-center justify-center aspect-video max-h-[58vh] overflow-hidden group select-none"
          onMouseEnter={() => setShowControls(true)}
          onMouseMove={() => setShowControls(true)}
        >
          {/* HTML5 Video Element with Official SENA Induction Video */}
          <video
            ref={videoRef}
            poster={posterUrl}
            playsInline
            preload="metadata"
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            onError={() => setVideoError(true)}
          >
            <source src="/assets/aistudio/2026__11_59_a.m._1b721ecc.mp4" type="video/mp4" />
            <source src={encodeURI('/assets/aistudio/2026__11_59_a.m._1b721ecc.mp4')} type="video/mp4" />
            Tu navegador no soporta la reproducción de video HTML5.
          </video>

          {/* Big Center Play/Pause Indicator Overlay when clicked */}
          {!isPlaying && (
            <div 
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer transition-all hover:bg-black/30"
            >
              <div className="w-20 h-20 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                <Play className="w-9 h-9 fill-current ml-1" />
              </div>
            </div>
          )}

          {/* Fallback Animated Educational Overlay if video stream fails to load */}
          {videoError && (
            <div className="absolute inset-0 bg-slate-900/95 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <SenaLogo className="w-16 h-16 animate-pulse" />
              <div className="max-w-md space-y-1">
                <h4 className="text-base font-bold text-white">Reproductor Institucional SENA</h4>
                <p className="text-xs text-slate-300">
                  Explora las secciones del video utilizando la barra de capítulos inferior para aprender paso a paso cómo completar tu inducción.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setVideoError(false);
                  if (videoRef.current) videoRef.current.load();
                }}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md"
              >
                Reintentar Carga del Video
              </button>
            </div>
          )}

          {/* ========================================================== */}
          {/* PLAYBACK CONTROLS OVERLAY BAR */}
          {/* ========================================================== */}
          <div className={`absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 via-black/70 to-transparent transition-opacity duration-300 ${
            showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            
            {/* Timeline Progress Scrubber */}
            <div className="space-y-1.5 mb-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                <span>{formatTime(currentTime)}</span>
                <span className="text-emerald-400 font-bold">
                  {CHAPTERS.find(c => c.id === activeChapterId)?.title || 'Video Tutorial'}
                </span>
                <span>{formatTime(duration)}</span>
              </div>
              
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#39A900] hover:h-2 transition-all"
                aria-label="Línea de tiempo del video"
              />
            </div>

            {/* Buttons and Settings Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              
              {/* Left Zone: Play/Pause, Rewind, Forward, Volume */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-2 rounded-lg hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title={isPlaying ? 'Pausar (Espacio)' : 'Reproducir (Espacio)'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  type="button"
                  onClick={() => skip(-10)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Retroceder 10 segundos (←)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => skip(10)}
                  className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Avanzar 10 segundos (→)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? 'Activar Sonido (M)' : 'Silenciar (M)'}
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#39A900]"
                    aria-label="Control de volumen"
                  />
                </div>
              </div>

              {/* Right Zone: Playback Speed Selector & Fullscreen */}
              <div className="flex items-center gap-2 sm:gap-3">
                
                {/* Playback speed buttons */}
                <div className="flex items-center gap-1 text-[11px] font-mono bg-white/10 p-0.5 rounded-lg">
                  {[0.75, 1, 1.25, 1.5].map((speed) => (
                    <button
                      key={speed}
                      type="button"
                      onClick={() => handleSpeedChange(speed)}
                      className={`px-1.5 py-0.5 rounded transition-colors cursor-pointer ${
                        playbackRate === speed
                          ? 'bg-[#39A900] text-white font-bold'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Pantalla Completa (F)"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* ========================================================== */}
        {/* INTERACTIVE CHAPTERS & QUICK GUIDE BAR */}
        {/* ========================================================== */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 space-y-3 shrink-0 overflow-y-auto max-h-[25vh]">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Capítulos y Guía Rápida de la Inducción
            </span>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              Haz clic en cualquier capítulo para saltar en el video
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {CHAPTERS.map((ch) => {
              const Icon = ch.icon;
              const isActive = activeChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => jumpToChapter(ch)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/80 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-900/60 px-1.5 py-0.5 rounded">
                      {ch.timeFormatted}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-xs font-bold text-white leading-snug line-clamp-1">{ch.title}</p>
                  <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{ch.description}</p>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
