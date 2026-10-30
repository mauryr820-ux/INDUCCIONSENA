import React, { useState, useMemo } from 'react';
import { REGULATORY_ARTICLE_COMPARISONS, RIGHTS_AND_DUTIES } from '../data/senaData';
import { 
  FULL_REGULATION_CHAPTERS, 
  KEY_IMPROVEMENT_ASPECTS, 
  REFORM_INTERACTIVE_SIMULATIONS 
} from '../data/regulatoryData';
import { 
  AlertCircle, 
  AlertTriangle, 
  BookOpen, 
  Check, 
  FileText, 
  Gavel, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Scale, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  Users, 
  Brain, 
  HeartHandshake, 
  Compass,
  X,
  ChevronRight,
  ChevronDown,
  Filter,
  Eye,
  CheckSquare,
  Award,
  Layers,
  Flame
} from 'lucide-react';
import { FullRegulatoryArticle, KeyImprovementAspect, RegulatoryArticleComparison, RightOrDuty } from '../types/induction';

interface ModuleRightsDutiesProps {
  isCompleted: boolean;
  onCompleteModule: () => void;
  onNextModule: () => void;
}

export const ModuleRightsDuties: React.FC<ModuleRightsDutiesProps> = ({
  isCompleted,
  onCompleteModule,
  onNextModule
}) => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'matriz_reformas' | 'aspectos_clave' | 'reglamento_completo' | 'catalogo' | 'simulador'>('matriz_reformas');
  
  // Interactive aspect filter state
  const [selectedAspectId, setSelectedAspectId] = useState<string | null>(null);
  
  // State for active article modal
  const [selectedArticleModal, setSelectedArticleModal] = useState<RegulatoryArticleComparison | null>(null);
  
  // State for full article expanded detail
  const [expandedFullArticle, setExpandedFullArticle] = useState<number | null>(null);

  // States for Matriz Comparativa
  const [matrixFilter, setMatrixFilter] = useState<'all' | 'reformado_2026' | 'modificado_2024' | 'nuevo_derecho'>('all');
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  // States for Catalogo
  const [filterType, setFilterType] = useState<'all' | 'derecho' | 'deber' | 'prohibicion'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // States for Full Regulation
  const [selectedChapterId, setSelectedChapterId] = useState<string>('cap-1');
  const [fullRegSearch, setFullRegSearch] = useState<string>('');
  const [fullRegFilter, setFullRegFilter] = useState<'all' | 'reformed2026' | 'modified2024' | 'newRight'>('all');

  // Interactive Simulator state
  const [simulationAnswers, setSimulationAnswers] = useState<Record<string, number>>({});
  const [simulationRevealed, setSimulationRevealed] = useState<Record<string, boolean>>({});

  // Memoized filtered matrix items
  const filteredMatrix = useMemo(() => {
    return REGULATORY_ARTICLE_COMPARISONS.filter((item) => {
      const matchesFilter = matrixFilter === 'all' || item.status === matrixFilter;
      const matchesAspect = !selectedAspectId || item.aspectId === selectedAspectId;
      const matchesSearch =
        item.topic.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        item.article.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        item.previousRule.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        item.currentRule2024.toLowerCase().includes(matrixSearch.toLowerCase()) ||
        (item.update2026 && item.update2026.toLowerCase().includes(matrixSearch.toLowerCase())) ||
        item.keyImprovement.toLowerCase().includes(matrixSearch.toLowerCase());
      return matchesFilter && matchesAspect && matchesSearch;
    });
  }, [matrixFilter, selectedAspectId, matrixSearch]);

  // Active aspect object if one is selected
  const activeAspect = useMemo(() => {
    if (!selectedAspectId) return null;
    return KEY_IMPROVEMENT_ASPECTS.find((a) => a.id === selectedAspectId) || null;
  }, [selectedAspectId]);

  // Catalog filtered items
  const filteredCatalogItems = useMemo(() => {
    return RIGHTS_AND_DUTIES.filter((item) => {
      const matchesType = filterType === 'all' || item.type === filterType;
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.article.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keyTakeaway.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    });
  }, [filterType, selectedCategory, searchQuery]);

  // Full regulation active chapter & filtered articles
  const currentChapter = useMemo(() => {
    return FULL_REGULATION_CHAPTERS.find((c) => c.id === selectedChapterId) || FULL_REGULATION_CHAPTERS[0];
  }, [selectedChapterId]);

  const filteredFullArticles = useMemo(() => {
    // If user searches globally across all chapters
    if (fullRegSearch.trim().length > 1) {
      const allArticles = FULL_REGULATION_CHAPTERS.flatMap((c) => 
        c.articles.map(a => ({ ...a, chapterNumber: c.numberRoman, chapterTitle: c.title }))
      );
      return allArticles.filter((a) => {
        const matchesQuery = 
          a.title.toLowerCase().includes(fullRegSearch.toLowerCase()) ||
          a.articleCode.toLowerCase().includes(fullRegSearch.toLowerCase()) ||
          a.summary.toLowerCase().includes(fullRegSearch.toLowerCase()) ||
          a.fullText.toLowerCase().includes(fullRegSearch.toLowerCase());
        
        const matchesTag = 
          fullRegFilter === 'all' ? true :
          fullRegFilter === 'reformed2026' ? !!a.isReformed2026 :
          fullRegFilter === 'modified2024' ? !!a.isModified2024 :
          fullRegFilter === 'newRight' ? !!a.isNewRight : true;

        return matchesQuery && matchesTag;
      });
    }

    // Default: current chapter articles
    return currentChapter.articles.filter((a) => {
      if (fullRegFilter === 'all') return true;
      if (fullRegFilter === 'reformed2026') return !!a.isReformed2026;
      if (fullRegFilter === 'modified2024') return !!a.isModified2024;
      if (fullRegFilter === 'newRight') return !!a.isNewRight;
      return true;
    }).map(a => ({ ...a, chapterNumber: currentChapter.numberRoman, chapterTitle: currentChapter.title }));
  }, [currentChapter, fullRegSearch, fullRegFilter]);

  const getBadgeStyle = (type: RightOrDuty['type']) => {
    switch (type) {
      case 'derecho':
        return 'text-[#39A900] bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case 'deber':
        return 'text-[#00324D] bg-sky-50 dark:bg-sky-950/40 dark:text-sky-300 border border-sky-200 dark:border-sky-800';
      case 'prohibicion':
        return 'text-rose-700 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
    }
  };

  const getStatusBadge = (status: RegulatoryArticleComparison['status']) => {
    switch (status) {
      case 'reformado_2026':
        return {
          label: 'Reforma 2026 (Acuerdo 002)',
          classes: 'bg-emerald-600 text-white border-emerald-700 shadow-2xs'
        };
      case 'modificado_2024':
        return {
          label: 'Acuerdo 009 de 2024',
          classes: 'bg-[#00324D] text-white border-slate-700'
        };
      case 'nuevo_derecho':
        return {
          label: 'Nuevo Derecho Adquirido',
          classes: 'bg-amber-600 text-white border-amber-700'
        };
    }
  };

  const getAspectColorClasses = (theme: KeyImprovementAspect['colorTheme']) => {
    switch (theme) {
      case 'emerald':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/30',
          border: 'border-emerald-200 dark:border-emerald-800',
          text: 'text-emerald-800 dark:text-emerald-300',
          badge: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200',
          activeRing: 'ring-2 ring-emerald-500'
        };
      case 'sky':
        return {
          bg: 'bg-sky-50 dark:bg-sky-950/30',
          border: 'border-sky-200 dark:border-sky-800',
          text: 'text-sky-800 dark:text-sky-300',
          badge: 'bg-sky-100 text-sky-900 dark:bg-sky-900/60 dark:text-sky-200',
          activeRing: 'ring-2 ring-sky-500'
        };
      case 'indigo':
        return {
          bg: 'bg-indigo-50 dark:bg-indigo-950/30',
          border: 'border-indigo-200 dark:border-indigo-800',
          text: 'text-indigo-800 dark:text-indigo-300',
          badge: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-900/60 dark:text-indigo-200',
          activeRing: 'ring-2 ring-indigo-500'
        };
      case 'amber':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/30',
          border: 'border-amber-200 dark:border-amber-800',
          text: 'text-amber-800 dark:text-amber-300',
          badge: 'bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200',
          activeRing: 'ring-2 ring-amber-500'
        };
      case 'rose':
        return {
          bg: 'bg-rose-50 dark:bg-rose-950/30',
          border: 'border-rose-200 dark:border-rose-800',
          text: 'text-rose-800 dark:text-rose-300',
          badge: 'bg-rose-100 text-rose-900 dark:bg-rose-900/60 dark:text-rose-200',
          activeRing: 'ring-2 ring-rose-500'
        };
      case 'purple':
        return {
          bg: 'bg-purple-50 dark:bg-purple-950/30',
          border: 'border-purple-200 dark:border-purple-800',
          text: 'text-purple-800 dark:text-purple-300',
          badge: 'bg-purple-100 text-purple-900 dark:bg-purple-900/60 dark:text-purple-200',
          activeRing: 'ring-2 ring-purple-500'
        };
    }
  };

  const handleSelectSimOption = (simId: string, optionIndex: number) => {
    setSimulationAnswers((prev) => ({ ...prev, [simId]: optionIndex }));
    setSimulationRevealed((prev) => ({ ...prev, [simId]: true }));
  };

  return (
    <div className="space-y-10">
      
      {/* Module Heading */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#00324D] dark:text-slate-300">
          <span className="text-[#39A900] font-bold">MÓDULO 02</span>
          <span aria-hidden="true">·</span>
          <span>Reglamento del Aprendiz SENA</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
            Acuerdo 009 de 2024 · Reformado por Acuerdo 002 de 2026
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Derechos, Deberes y Reformas Normativas del Aprendiz
        </h2>
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          Explora de manera <strong>100% interactiva</strong> los artículos modificados por el <strong>Acuerdo 009 de 2024</strong> (que derogó en su totalidad el viejo Acuerdo 007 de 2012) y la actualización de vanguardia del <strong>Acuerdo 002 de 2026</strong>. Consulta los 6 aspectos clave que mejoran el reglamento, navega por todos los capítulos vigentes y pon a prueba tus conocimientos en situaciones reales.
        </p>
      </div>

      {/* 2026 Legislative Update Spotlight Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-[#00324D] to-slate-900 text-white shadow-md space-y-4 border border-emerald-500/40">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#39A900] text-white uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3" /> Hito Histórico 2026
            </span>
            <span className="text-xs font-mono text-emerald-300 font-bold">Acuerdo 002 de 2026 · Reforma al Art. 48, Art. 31 y Art. 44</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono bg-white/10 px-2.5 py-0.5 rounded-full">
            Consejo Directivo Nacional SENA
          </span>
        </div>

        <div className="space-y-1.5">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Voz y Voto del Representante en Comité, Economía Popular y Mediación Comunitaria
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-3xl">
            La actualización legislativa más reciente garantiza que en el Comité de Evaluación y Seguimiento, el <strong>Representante de los Aprendices del Centro cuente formalmente con VOZ Y VOTO</strong> vinculante en todas las decisiones (Art. 48). Se valida la <strong>Economía Popular y Comunitaria</strong> como modalidad de etapa práctica (Art. 31) y se instaura la <strong>Justicia Restaurativa</strong> como etapa previa obligatoria (Art. 44).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('matriz_reformas');
              setSelectedAspectId('aspect-voz-voto');
            }}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-left space-y-1.5 cursor-pointer group"
          >
            <p className="font-bold text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> 1. Voz y Voto (Art. 48)</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Voto estudiantil vinculante en igualdad de condiciones en el Comité Disciplinario.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('matriz_reformas');
              setSelectedAspectId('aspect-economia-popular');
            }}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-left space-y-1.5 cursor-pointer group"
          >
            <p className="font-bold text-sky-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><Compass className="w-4 h-4" /> 2. Economía Popular (Art. 31)</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Práctica en cooperativas campesinas, microempresas comunitarias y teletrabajo.
            </p>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('matriz_reformas');
              setSelectedAspectId('aspect-justicia-restaurativa');
            }}
            className="p-3.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 text-left space-y-1.5 cursor-pointer group"
          >
            <p className="font-bold text-amber-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4" /> 3. Justicia Restaurativa (Art. 44)</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Pactos pedagógicos y diálogo comunitario que priman sobre sanciones punitivas.
            </p>
          </button>
        </div>
      </div>

      {/* Main Interactive Tab Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto scrollbar-none gap-2">
        
        <button
          onClick={() => setActiveTab('matriz_reformas')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'matriz_reformas'
              ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900]'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Scale className="w-4 h-4 text-[#39A900]" />
          <span>Matriz de Artículos Modificados</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
            {REGULATORY_ARTICLE_COMPARISONS.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('aspectos_clave')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'aspectos_clave'
              ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900]'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>6 Aspectos Clave de Mejora</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono">
            6
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reglamento_completo')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'reglamento_completo'
              ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900]'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Reglamento Completo Vigente (Cap. I - VIII)</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 font-mono">
            8 Capítulos
          </span>
        </button>

        <button
          onClick={() => setActiveTab('catalogo')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'catalogo'
              ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900]'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-slate-500" />
          <span>Catálogo de Derechos y Deberes</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-mono">
            {RIGHTS_AND_DUTIES.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('simulador')}
          className={`pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'simulador'
              ? 'border-[#39A900] text-[#00324D] dark:text-[#39A900]'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-500" />
          <span>Simulador de Reformas 2026</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-mono">
            Interactivo
          </span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: MATRIZ DE ARTÍCULOS MODIFICADOS (INTERACTIVA) */}
      {/* ======================================================== */}
      {activeTab === 'matriz_reformas' && (
        <div className="space-y-6">
          
          {/* Active Aspect Filter Notification Bar */}
          {activeAspect && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex flex-wrap items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#39A900]" />
                <span className="text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                  Filtrando artículos por aspecto clave: <strong>{activeAspect.title}</strong>
                </span>
                <span className="text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded-full font-mono font-bold">
                  {filteredMatrix.length} artículo(s)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAspectId(null)}
                className="text-xs text-emerald-800 dark:text-emerald-300 hover:text-emerald-950 dark:hover:text-white font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" /> Quitar filtro de aspecto
              </button>
            </div>
          )}

          {/* Quick-Click Interactive Aspects Selector Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Filter className="w-3.5 h-3.5 text-[#39A900]" /> Filtrar por Aspecto Clave de Mejora:
              </span>
              <button
                type="button"
                onClick={() => setActiveTab('aspectos_clave')}
                className="text-xs font-semibold text-[#39A900] hover:underline flex items-center gap-1"
              >
                Ver tablero completo de aspectos →
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedAspectId(null)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedAspectId === null
                    ? 'bg-[#00324D] text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Todos los Artículos ({REGULATORY_ARTICLE_COMPARISONS.length})
              </button>
              {KEY_IMPROVEMENT_ASPECTS.map((aspect) => (
                <button
                  key={aspect.id}
                  type="button"
                  onClick={() => setSelectedAspectId(selectedAspectId === aspect.id ? null : aspect.id)}
                  className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedAspectId === aspect.id
                      ? 'bg-[#39A900] text-white font-bold shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{aspect.title.split(':')[0]}</span>
                  <span className="text-[10px] opacity-75 font-mono">({aspect.relatedArticleIds.length})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Search and Status Filters */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <button
                  onClick={() => setMatrixFilter('all')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    matrixFilter === 'all' 
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Todas las Reformas ({REGULATORY_ARTICLE_COMPARISONS.length})
                </button>
                <button
                  onClick={() => setMatrixFilter('reformado_2026')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    matrixFilter === 'reformado_2026' 
                      ? 'bg-emerald-600 text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Reformados por Acuerdo 002 de 2026
                </button>
                <button
                  onClick={() => setMatrixFilter('modificado_2024')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    matrixFilter === 'modificado_2024' 
                      ? 'bg-[#00324D] text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Acuerdo 009 de 2024
                </button>
                <button
                  onClick={() => setMatrixFilter('nuevo_derecho')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    matrixFilter === 'nuevo_derecho' 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Nuevos Derechos Adquiridos
                </button>
              </div>

              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en artículos modificados o impacto..."
                  value={matrixSearch}
                  onChange={(e) => setMatrixSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100"
                />
              </div>

            </div>
          </div>

          {/* Interactive Articles Comparison List */}
          <div className="space-y-6">
            {filteredMatrix.map((item) => {
              const statusBadge = getStatusBadge(item.status);
              return (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all shadow-xs space-y-4"
                >
                  {/* Article Title & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${statusBadge.classes}`}>
                        {statusBadge.label}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
                        {item.chapter}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded">
                        {item.article}
                      </span>
                      <button
                        type="button"
                        onClick={() => setSelectedArticleModal(item)}
                        className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] dark:text-emerald-400 hover:bg-[#39A900] hover:text-white rounded border border-emerald-300 dark:border-emerald-800 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Ver comparativa profunda y caso práctico"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Ver Detalle</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {item.topic}
                    </h4>
                  </div>

                  {/* 3-Way Comparative Evolution */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">
                    
                    {/* Before: Acuerdo 007 de 2012 */}
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                        Antes: Acuerdo 007 de 2012 (Derogado)
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px] sm:text-xs">
                        {item.previousRule}
                      </p>
                    </div>

                    {/* Current: Acuerdo 009 de 2024 */}
                    <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-[#00324D] dark:text-sky-300 font-bold uppercase tracking-wider text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-[#00324D] dark:bg-sky-400"></span>
                        Vigente: Acuerdo 009 de 2024
                      </div>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed text-[11px] sm:text-xs font-medium">
                        {item.currentRule2024}
                      </p>
                    </div>

                    {/* Update: Acuerdo 002 de 2026 */}
                    <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
                        <span className="w-2 h-2 rounded-full bg-[#39A900]"></span>
                        Actualización 2026 / Mejora Vinculante
                      </div>
                      <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed text-[11px] sm:text-xs font-medium">
                        {item.update2026 || 'Consagrado y ratificado en el marco general de garantías vigentes.'}
                      </p>
                    </div>

                  </div>

                  {/* Why it improves the regulation */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                          <strong className="text-emerald-900 dark:text-emerald-300">¿Por qué mejora el reglamento?:</strong> {item.keyImprovement}
                        </p>
                        {item.practicalExample && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 italic">
                            <strong>Ejemplo práctico:</strong> {item.practicalExample}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedArticleModal(item)}
                      className="px-3 py-1.5 text-xs font-bold text-white bg-[#00324D] dark:bg-slate-800 hover:bg-[#39A900] dark:hover:bg-[#39A900] rounded-lg transition-colors whitespace-nowrap self-end sm:self-center cursor-pointer"
                    >
                      Explorar Comparativa →
                    </button>
                  </div>

                </div>
              );
            })}

            {filteredMatrix.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No se encontraron artículos con ese criterio</p>
                <button
                  onClick={() => {
                    setMatrixFilter('all');
                    setSelectedAspectId(null);
                    setMatrixSearch('');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#39A900] hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2: LOS 6 ASPECTOS CLAVE DE MEJORA (INTERACTIVO) */}
      {/* ======================================================== */}
      {activeTab === 'aspectos_clave' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Tablero Interactivo: ¿Qué aspectos transforman positivamente el Reglamento?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Haz clic en cualquiera de los 6 pilares de mejora para ver su impacto institucional, fundamentación jurídica y <strong>filtrar automáticamente los artículos modificados</strong> relacionados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {KEY_IMPROVEMENT_ASPECTS.map((aspect) => {
              const colors = getAspectColorClasses(aspect.colorTheme);
              const isSelected = selectedAspectId === aspect.id;
              return (
                <div
                  key={aspect.id}
                  className={`p-6 rounded-2xl border transition-all shadow-xs flex flex-col justify-between space-y-4 ${colors.bg} ${colors.border} ${
                    isSelected ? `${colors.activeRing} shadow-md` : 'hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${colors.badge}`}>
                        {aspect.tagline}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                        {aspect.agreementSource}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {aspect.title}
                      </h4>
                      <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5">
                        {aspect.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {aspect.description}
                    </p>

                    <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800/70 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-[#39A900]" /> Impacto formativo y medible:
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {aspect.impactMetrics}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 space-y-1">
                      <p className="text-[11px] font-bold text-[#00324D] dark:text-sky-300">
                        Caso Práctico en la Vida del Aprendiz:
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed italic">
                        "{aspect.practicalExample}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200/60 dark:border-slate-800/60">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {aspect.relatedArticleIds.length} artículos modificados
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAspectId(aspect.id);
                        setActiveTab('matriz_reformas');
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#00324D] dark:bg-slate-800 hover:bg-[#39A900] text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Ver Artículos Modificados</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: REGLAMENTO COMPLETO VIGENTE (CAPÍTULOS I AL VIII) */}
      {/* ======================================================== */}
      {activeTab === 'reglamento_completo' && (
        <div className="space-y-6">
          
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#39A900]" />
                Reglamento del Aprendiz SENA Oficial y Completo Actualmente Vigente
              </h3>
              <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded font-bold">
                Estructura Normativa Integral
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Consulta artículo por artículo el texto vigente del <strong>Acuerdo 009 de 2024</strong> incorporando las modificaciones del <strong>Acuerdo 002 de 2026</strong>. Selecciona un capítulo o utiliza el buscador para localizar cualquier norma.
            </p>
          </div>

          {/* Chapter Selector Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {FULL_REGULATION_CHAPTERS.map((cap) => {
              const isSelected = selectedChapterId === cap.id && fullRegSearch.trim().length <= 1;
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => {
                    setSelectedChapterId(cap.id);
                    setFullRegSearch('');
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00324D] text-white border-[#00324D] shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <p className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`}>
                    Capítulo {cap.numberRoman}
                  </p>
                  <p className="text-xs font-bold truncate mt-0.5" title={cap.title}>
                    {cap.title.split(',')[0]}
                  </p>
                  <p className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {cap.articles.length} arts.
                  </p>
                </button>
              );
            })}
          </div>

          {/* Full Regulation Search and Tag Filter Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <button
                  onClick={() => setFullRegFilter('all')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    fullRegFilter === 'all' 
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Todos los Artículos
                </button>
                <button
                  onClick={() => setFullRegFilter('reformed2026')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    fullRegFilter === 'reformed2026' 
                      ? 'bg-emerald-600 text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Reforma 2026 (Ac. 002)
                </button>
                <button
                  onClick={() => setFullRegFilter('modified2024')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    fullRegFilter === 'modified2024' 
                      ? 'bg-[#00324D] text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Modificados 2024 (Ac. 009)
                </button>
                <button
                  onClick={() => setFullRegFilter('newRight')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    fullRegFilter === 'newRight' 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Nuevos Derechos
                </button>
              </div>

              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar en todos los capítulos por palabra..."
                  value={fullRegSearch}
                  onChange={(e) => setFullRegSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100"
                />
              </div>

            </div>

            {/* Chapter Header Overview */}
            {fullRegSearch.trim().length <= 1 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-mono font-bold text-[#39A900]">
                    Capítulo {currentChapter.numberRoman} · {currentChapter.articlesRange}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {currentChapter.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {currentChapter.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Full Regulation Articles List */}
          <div className="space-y-4">
            {filteredFullArticles.map((art) => {
              const isExpanded = expandedFullArticle === art.number;
              return (
                <div
                  key={art.number}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white">
                        {art.articleCode}
                      </span>
                      {art.isReformed2026 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-600 text-white">
                          Reforma 2026 (Acuerdo 002)
                        </span>
                      )}
                      {art.isModified2024 && !art.isReformed2026 && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00324D] text-white">
                          Acuerdo 009 de 2024
                        </span>
                      )}
                      {art.isNewRight && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-600 text-white">
                          Nuevo Derecho
                        </span>
                      )}
                      {art.keyAspectTag && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {art.keyAspectTag}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono text-slate-400">
                      Ámbito: {art.scope}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>

                  {/* Expandable Official Legal Text */}
                  {isExpanded && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00324D] dark:text-emerald-400">
                          Texto Normativo Oficial Vigente ({art.sourceAgreement})
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Reglamento del Aprendiz SENA</span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans border-l-2 border-[#39A900] pl-3">
                        "{art.fullText}"
                      </p>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Fuente: {art.sourceAgreement}
                    </span>
                    <button
                      type="button"
                      onClick={() => setExpandedFullArticle(isExpanded ? null : art.number)}
                      className="font-bold text-[#39A900] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Contraer texto legal' : 'Ver texto legal completo'}</span>
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}

            {filteredFullArticles.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No se encontraron artículos en este capítulo o búsqueda</p>
                <button
                  onClick={() => {
                    setFullRegSearch('');
                    setFullRegFilter('all');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#39A900] hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 4: CATÁLOGO DE DERECHOS, DEBERES Y PROHIBICIONES */}
      {/* ======================================================== */}
      {activeTab === 'catalogo' && (
        <div className="space-y-6">
          
          {/* Filter and Search Bar */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Segmented Type Controls */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto text-xs">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterType === 'all' 
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Todos los Artículos ({RIGHTS_AND_DUTIES.length})
                </button>
                <button
                  onClick={() => setFilterType('derecho')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterType === 'derecho' 
                      ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Derechos ({RIGHTS_AND_DUTIES.filter(i => i.type === 'derecho').length})
                </button>
                <button
                  onClick={() => setFilterType('deber')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterType === 'deber' 
                      ? 'bg-white dark:bg-slate-900 text-sky-800 dark:text-sky-300 shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Deberes ({RIGHTS_AND_DUTIES.filter(i => i.type === 'deber').length})
                </button>
                <button
                  onClick={() => setFilterType('prohibicion')}
                  className={`px-3 py-1.5 font-medium rounded-md whitespace-nowrap transition-colors ${
                    filterType === 'prohibicion' 
                      ? 'bg-white dark:bg-slate-900 text-rose-800 dark:text-rose-400 shadow-xs font-bold' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Prohibiciones ({RIGHTS_AND_DUTIES.filter(i => i.type === 'prohibicion').length})
                </button>
              </div>

              {/* Search box */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por palabra o artículo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#39A900] text-slate-800 dark:text-slate-100"
                />
              </div>

            </div>

            {/* Category Secondary Filter */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 overflow-x-auto">
              <span className="font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Ámbito:</span>
              {['all', 'Academico', 'Disciplinario', 'Bienestar', 'Representacion', 'General'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#00324D] dark:bg-slate-700 text-white font-medium'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat === 'all' ? 'Todas las áreas' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCatalogItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${getBadgeStyle(item.type)}`}>
                        {item.type} · {item.article}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700">
                      <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        <strong className="text-[#00324D] dark:text-[#39A900]">Apropiación práctica:</strong> {item.keyTakeaway}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredCatalogItems.length === 0 && (
              <div className="col-span-full p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No se encontraron artículos con ese criterio</p>
                <button
                  onClick={() => {
                    setFilterType('all');
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-[#39A900] hover:underline"
                >
                  Restablecer filtros
                </button>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 5: SIMULADOR INTERACTIVO DE REFORMAS (SITUACIONES 2026) */}
      {/* ======================================================== */}
      {activeTab === 'simulador' && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-500" />
              Simulador Práctico: Pon a prueba lo aprendido de las reformas 2024 y 2026
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Resuelve estas situaciones reales que ocurren en los centros de formación y comprueba si conoces tus derechos y deberes bajo el nuevo marco normativo.
            </p>
          </div>

          <div className="space-y-6">
            {REFORM_INTERACTIVE_SIMULATIONS.map((sim, simIdx) => {
              const selectedOpt = simulationAnswers[sim.id];
              const isRevealed = simulationRevealed[sim.id];
              return (
                <div
                  key={sim.id}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-xs font-mono font-bold text-[#39A900] uppercase tracking-wider">
                      Caso de Simulación {simIdx + 1} de {REFORM_INTERACTIVE_SIMULATIONS.length}
                    </span>
                    {isRevealed && (
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        sim.options[selectedOpt]?.isCorrect
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        {sim.options[selectedOpt]?.isCorrect ? '¡Respuesta Correcta! ✓' : 'Respuesta Incorrecta'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {sim.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                      {sim.situation}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5 pt-2">
                    {sim.options.map((opt, optIdx) => {
                      const isThisSelected = selectedOpt === optIdx;
                      let optionClasses = 'bg-slate-50 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600';

                      if (isRevealed) {
                        if (opt.isCorrect) {
                          optionClasses = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200';
                        } else if (isThisSelected && !opt.isCorrect) {
                          optionClasses = 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-200';
                        }
                      } else if (isThisSelected) {
                        optionClasses = 'bg-sky-50 dark:bg-sky-950/40 border-[#00324D] dark:border-sky-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectSimOption(sim.id, optIdx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-3 cursor-pointer ${optionClasses}`}
                        >
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 ${
                            isRevealed && opt.isCorrect
                              ? 'bg-[#39A900] text-white'
                              : isRevealed && isThisSelected && !opt.isCorrect
                              ? 'bg-rose-600 text-white'
                              : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed flex-1 font-medium">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Box */}
                  {isRevealed && selectedOpt !== undefined && (
                    <div className={`p-4 rounded-xl border space-y-2 animate-fadeIn ${
                      sim.options[selectedOpt].isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200'
                        : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200'
                    }`}>
                      <p className="text-xs font-semibold leading-relaxed">
                        {sim.options[selectedOpt].feedback}
                      </p>
                      <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                        <strong>Fundamento Jurídico:</strong> {sim.options[selectedOpt].normativeBasis}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Due Process & Disciplinary Architecture Infographic */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Gavel className="w-4 h-4" />
            <span>ESTRUCTURA DISCIPLINARIA, DEBIDO PROCESO Y MEDIACIÓN</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">¿Cómo opera el Régimen Formativo y el Comité en 2026?</h3>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            En el SENA prima el carácter pedagógico y formativo sobre el sancionatorio. 
            Conoce cómo se clasifican las faltas, los acuerdos restaurativos y las garantías procesales.
          </p>
        </div>

        {/* 3 Pillars: Faltas, Medidas, Debido Proceso */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>Clasificación de Faltas</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li><strong className="text-white">Académicas:</strong> Incumplimiento no justificado de evidencias de aprendizaje, inasistencias o bajo logro en competencias formativas.</li>
              <li><strong className="text-white">Disciplinarias:</strong> Conductas contrarias a la convivencia, respeto mutuo, instalaciones públicas o imagen del SENA.</li>
              <li><strong className="text-white">Graduación:</strong> Leves, Graves o Gravísimas (ciberacoso, fraude con IA, suplantación y violencias de género son gravísimas).</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <FileText className="w-4 h-4" />
              <span>Medidas Formativas y Acuerdos</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li><strong className="text-white">Justicia Restaurativa (Art. 44):</strong> Mediación comunitaria y pacto pedagógico entre las partes para subsanar faltas leves sin mancha disciplinaria.</li>
              <li><strong className="text-white">Plan de Mejoramiento (Art. 9):</strong> Derecho pedagógico previo para nivelar competencias antes de remisión a comité.</li>
              <li><strong className="text-white">Sanciones Formales:</strong> Condicionamiento o Cancelación definitiva de matrícula (con inhabilidad de 6 meses hasta 1 o 2 años).</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>El Comité y el Debido Proceso</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <li><strong className="text-white">Voz y Voto del Representante (Art. 48 - Reforma 2026):</strong> El Representante de los Aprendices del Centro vota formalmente las recomendaciones.</li>
              <li><strong className="text-white">Derecho a Descargos (Art. 50):</strong> Notificación electrónica formal con mínimo 3 días hábiles previos para radicar descargos y pruebas.</li>
              <li><strong className="text-white">Recurso de Reposición (Art. 52):</strong> Derecho legal a controvertir la resolución del Subdirector de Centro ante la misma autoridad.</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Module Completion Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {isCompleted ? 'Módulo 02 Apropiado' : 'Apropiar Módulo 02'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reglamento revisado: conoce las reformas del Acuerdo 009 de 2024 y Acuerdo 002 de 2026.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCompleteModule}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              isCompleted
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                : 'bg-[#39A900] text-white hover:bg-[#329200]'
            }`}
          >
            {isCompleted ? 'Completado ✓' : 'Marcar como Leído'}
          </button>
          
          <button
            type="button"
            onClick={onNextModule}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#00324D] dark:bg-slate-800 text-white hover:bg-[#39A900] transition-colors cursor-pointer"
          >
            Ir a Casos Reglamentarios →
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE MODAL: ARTICLE COMPARATIVE DEEP DIVE */}
      {/* ======================================================== */}
      {selectedArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#39A900] text-white">
                    {selectedArticleModal.article}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {selectedArticleModal.chapter}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                  {selectedArticleModal.topic}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticleModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Evolution 3-Column Box */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Línea de Evolución Normativa
              </h4>
              
              <div className="space-y-3 text-xs">
                {/* 2012 */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-600 dark:text-slate-400 text-[11px] block">
                    1. Antes (Acuerdo 007 de 2012 - Derogado):
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selectedArticleModal.previousRule}
                  </p>
                </div>

                {/* 2024 */}
                <div className="p-3.5 rounded-xl bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 space-y-1">
                  <span className="font-bold text-[#00324D] dark:text-sky-300 text-[11px] block">
                    2. Vigente (Acuerdo 009 de 2024):
                  </span>
                  <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {selectedArticleModal.currentRule2024}
                  </p>
                </div>

                {/* 2026 */}
                <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-1">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 text-[11px] block">
                    3. Actualización 2026 (Acuerdo 002 de 2026):
                  </span>
                  <p className="text-emerald-950 dark:text-emerald-200 leading-relaxed font-medium">
                    {selectedArticleModal.update2026 || 'Consagrado y ratificado en el marco general de garantías vigentes.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Why it improves & Practical scenario */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1">
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" /> ¿Cómo beneficia directamente al aprendiz?
                </p>
                <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed">
                  {selectedArticleModal.keyImprovement}
                </p>
              </div>

              {selectedArticleModal.practicalExample && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="text-xs font-bold text-[#00324D] dark:text-sky-300">
                    Caso Real de Aplicación en Formación:
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    "{selectedArticleModal.practicalExample}"
                  </p>
                </div>
              )}

              {selectedArticleModal.legalCitation && (
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  <strong>Cita Jurídica Oficial:</strong> {selectedArticleModal.legalCitation}
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedArticleModal(null)}
                className="px-4 py-2 text-xs font-bold rounded-lg bg-[#00324D] dark:bg-slate-800 text-white hover:bg-[#39A900] transition-colors"
              >
                Entendido y Apropiado ✓
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
