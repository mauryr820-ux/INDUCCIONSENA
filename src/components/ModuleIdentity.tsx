import React, { useState } from 'react';
import { SENA_SYMBOLS, SENA_VALUES } from '../data/senaData';
import { Award, BookOpen, Check, Compass, Flag, HeartHandshake, History, Music, Pause, Play, Shield, Sparkles, Volume2 } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ModuleIdentityProps {
  isCompleted: boolean;
  onCompleteModule: () => void;
  onNextModule: () => void;
}

export const ModuleIdentity: React.FC<ModuleIdentityProps> = ({
  isCompleted,
  onCompleteModule,
  onNextModule
}) => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>('escudo');
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [activeAnthemVerse, setActiveAnthemVerse] = useState<number>(0);
  const [escudoError, setEscudoError] = useState<boolean>(false);

  const anthemVerses = [
    {
      label: 'Coro',
      lines: [
        'Estudiantes del SENA ¡adelante!',
        'por Colombia luchad con amor',
        'con el ánimo noble y radiante',
        'transformemos el mundo en mejor.'
      ]
    },
    {
      label: 'Primera Estrofa',
      lines: [
        'De la patria el futuro destino',
        'en las manos del joven está,',
        'el trabajo es seguro camino',
        'que la paz y el progreso nos da.'
      ]
    },
    {
      label: 'Segunda Estrofa',
      lines: [
        'En la forja del SENA se aprende',
        'con la ciencia y la técnica en flor,',
        'la grandeza del pueblo se enciende',
        'con virtudes de fe y de honor.'
      ]
    }
  ];

  const handleToggleAnthem = () => {
    setIsPlayingAnthem(!isPlayingAnthem);
  };

  const selectedSymbol = SENA_SYMBOLS.find(s => s.id === selectedSymbolId) || SENA_SYMBOLS[0];

  return (
    <div className="space-y-12">
      {/* Module Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D]">
          <span className="text-[#39A900]">Módulo 01</span>
          <span aria-hidden="true">·</span>
          <span>Identidad Institucional</span>
          <span aria-hidden="true">·</span>
          <span>Símbolos, Valores e Historia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          El Orgullo y la Identidad de ser Aprendiz SENA
        </h2>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-balance">
          El Servicio Nacional de Aprendizaje (SENA) es la institución insignia de la formación técnica y tecnológica de Colombia.
          Conoce los símbolos que nos representan, los valores que guían nuestra conducta y el sentido de pertenencia que acompaña tu formación.
        </p>
      </div>

      {/* Section 1: Símbolos Institucionales Interactivos */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Símbolos del SENA</h3>
            <p className="text-xs text-slate-500">Selecciona cada símbolo para explorar su significado patrimonial</p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg border border-slate-200 overflow-x-auto">
            {SENA_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                onClick={() => setSelectedSymbolId(sym.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedSymbolId === sym.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sym.name}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Selected Symbol Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white p-6 sm:p-8 rounded-2xl border border-slate-200">
          
          {/* Symbol Visual & Graphic Representation */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200/80 text-center">
            {selectedSymbol.id === 'escudo' && (
              <div className="space-y-4">
                <div className="w-52 sm:w-56 h-52 sm:h-56 mx-auto rounded-full bg-white border-4 border-[#00324D] shadow-md flex items-center justify-center p-4 relative overflow-hidden transition-all duration-300">
                  {!escudoError ? (
                    <img
                      src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                      alt="Escudo Oficial del SENA"
                      className="w-40 sm:w-44 h-40 sm:h-44 object-contain"
                      referrerPolicy="no-referrer"
                      onError={() => setEscudoError(true)}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full border border-slate-100 flex flex-col items-center justify-center">
                      <SenaLogo className="w-32 h-32" />
                    </div>
                  )}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Símbolo de los 3 Sectores Económicos
                </div>
              </div>
            )}

            {selectedSymbol.id === 'bandera' && (
              <div className="space-y-4">
                <div className="w-48 h-32 mx-auto bg-white border-2 border-slate-300 shadow-sm rounded flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-x-0 h-1 bg-[#39A900] top-0 opacity-20"></div>
                  <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-xs p-1">
                    {!escudoError ? (
                      <img
                        src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                        alt="Escudo Central en Bandera"
                        className="w-12 h-12 object-contain"
                        referrerPolicy="no-referrer"
                        onError={() => setEscudoError(true)}
                      />
                    ) : (
                      <SenaLogo className="w-10 h-10" />
                    )}
                  </div>
                  <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-400">Blanco de Paz</div>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Lienzo Blanco con Escudo Central
                </div>
              </div>
            )}

            {selectedSymbol.id === 'logosimbolo' && (
              <div className="space-y-4">
                <div className="w-36 h-36 mx-auto rounded-2xl bg-white border-2 border-slate-200 shadow-sm flex items-center justify-center p-3">
                  <SenaLogo className="w-28 h-28" />
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Logosímbolo Oficial del SENA
                </div>
              </div>
            )}

            {selectedSymbol.id === 'himno' && (
              <div className="space-y-4 w-full">
                <div className="w-24 h-24 mx-auto rounded-full bg-emerald-50 text-[#39A900] flex items-center justify-center">
                  <Music className="w-12 h-12" />
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-2">
                  <p className="text-xs font-semibold text-slate-800">Reproductor Didáctico del Himno</p>
                  <button
                    onClick={handleToggleAnthem}
                    className="w-full py-2 px-3 rounded-md bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200] transition-colors flex items-center justify-center gap-2"
                  >
                    {isPlayingAnthem ? (
                      <>
                        <Pause className="w-4 h-4" /> Pausar Reproducción
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-white" /> Escuchar Fragmento Himno
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-500">
                    {isPlayingAnthem ? 'Entonando con fervor patriótico...' : 'Haz clic para entonar'}
                  </p>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200/80 w-full text-left">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Identificador</span>
              <p className="text-sm font-bold text-slate-900">{selectedSymbol.name}</p>
            </div>
          </div>

          {/* Symbol Explanations & Elements Breakdown */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono font-semibold text-[#39A900]">{selectedSymbol.title}</span>
              <h4 className="text-xl font-bold text-slate-900 mt-1">{selectedSymbol.name}</h4>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {selectedSymbol.significance}
              </p>
            </div>

            {/* Elements list */}
            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Desglose de Componentes:</h5>
              <div className="space-y-2.5">
                {selectedSymbol.elements.map((elem, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <p className="text-xs font-bold text-[#00324D]">{elem.item}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{elem.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedSymbol.id === 'himno' && (
              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Letra del Himno SENA</span>
                  <div className="flex gap-1 text-xs">
                    {anthemVerses.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveAnthemVerse(i)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          activeAnthemVerse === i
                            ? 'bg-[#00324D] text-white font-semibold'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-1 text-center font-serif text-slate-800 text-sm italic">
                  {anthemVerses[activeAnthemVerse].lines.map((l, idx) => (
                    <p key={idx}>{l}</p>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Section 2: Misión y Visión SENA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#39A900] flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-[#39A900]">PROPÓSITO SUPERIOR</span>
          <h3 className="text-lg font-bold text-slate-900">Misión Institucional</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social 
            y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, 
            para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo 
            social, económico y tecnológico del país.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00324D] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-mono font-bold text-[#00324D]">PROYECCIÓN FUTURA</span>
          <h3 className="text-lg font-bold text-slate-900">Visión Institucional</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Consolidarse como una entidad referente de formación técnica y tecnológica con los más altos estándares 
            de calidad, inclusión social e innovación. Buscamos formar aprendices éticos, con pensamiento crítico y 
            habilidades de vanguardia, preparados para liderar las demandas de la economía digital y la sostenibilidad.
          </p>
        </div>
      </div>

      {/* Section 3: Valores Institucionales del Aprendiz */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-semibold text-[#39A900]">CÓDIGO DE INTEGRIDAD</span>
          <h3 className="text-xl font-bold text-slate-900">Valores Institucionales en la Vida del Aprendiz</h3>
          <p className="text-slate-600 text-sm max-w-2xl">
            Cada valor institucional tiene una traducción directa en tus acciones dentro de las aulas, laboratorios y centros de formación.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENA_VALUES.map((val) => (
            <div key={val.id} className="p-5 rounded-xl bg-white border border-slate-200 space-y-3 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-900">{val.name}</span>
                <HeartHandshake className="w-4 h-4 text-[#39A900]" />
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{val.definition}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-[#00324D] font-medium">
                <span className="font-bold text-slate-800">En la práctica: </span>
                {val.apprenticeAction}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Historia del SENA (1957 a la actualidad) */}
      <div className="p-6 sm:p-8 bg-slate-900 text-white rounded-2xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <History className="w-4 h-4" />
          <span>LÍNEA DE TIEMPO INSTITUCIONAL</span>
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold">Fundación e Impacto Nacional</h3>
          <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Nacido el 21 de junio de 1957 por iniciativa del economista cartagenero <strong className="text-white">Rodolfo Martínez Tono</strong>, 
            el SENA surgió gracias a un pacto social entre el Estado, los trabajadores organizados y los empresarios de Colombia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400">1957 · Nacimiento</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Expedición del Decreto Ley 118 de 1957. Inicia con programas de formación en oficios industriales para el progreso de la clase obrera.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400">1980 - 2000 · Expansión</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consolidación de las 33 Regionales y más de 117 Centros de Formación en todo el territorio nacional, cubriendo áreas agropecuarias e industriales.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <span className="text-xs font-mono font-bold text-sky-400">Presente · Era Digital & FPI</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              Liderazgo en inteligencia artificial, desarrollo de software, agroindustria sostenible, bilingüismo y conectividad nacional con Zajuna.
            </p>
          </div>
        </div>
      </div>

      {/* Module Completion Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-xl border border-slate-200">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {isCompleted ? 'Módulo 01 Apropiado' : 'Apropiar Módulo 01'}
            </p>
            <p className="text-xs text-slate-500">
              Marca este módulo para sumar a tu avance general de inducción.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onCompleteModule}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              isCompleted
                ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'bg-[#39A900] text-white hover:bg-[#329200]'
            }`}
          >
            {isCompleted ? 'Completado ✓' : 'Marcar como Leído'}
          </button>
          
          <button
            type="button"
            onClick={onNextModule}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#00324D] text-white hover:bg-slate-800 transition-colors"
          >
            Ir a Derechos y Deberes →
          </button>
        </div>
      </div>

    </div>
  );
};
