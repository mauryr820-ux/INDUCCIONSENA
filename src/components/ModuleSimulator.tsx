import React, { useState } from 'react';
import { CASE_DILEMMAS } from '../data/senaData';
import { AlertTriangle, Check, CheckCircle2, HelpCircle, RefreshCw, ShieldAlert, Sparkles, XCircle } from 'lucide-react';

interface ModuleSimulatorProps {
  isCompleted: boolean;
  onCompleteModule: () => void;
  onNextModule: () => void;
}

export const ModuleSimulator: React.FC<ModuleSimulatorProps> = ({
  isCompleted,
  onCompleteModule,
  onNextModule
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});

  const currentCase = CASE_DILEMMAS[activeCaseIndex];
  const selectedOptId = selectedOptions[currentCase.id];
  const isAnswered = !!selectedOptId;
  const isSubmitted = showFeedback[currentCase.id];

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedOptions(prev => ({ ...prev, [currentCase.id]: optId }));
  };

  const handleConfirmAnswer = () => {
    if (!selectedOptId) return;
    setShowFeedback(prev => ({ ...prev, [currentCase.id]: true }));
  };

  const handleResetCase = () => {
    setSelectedOptions(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
    setShowFeedback(prev => {
      const copy = { ...prev };
      delete copy[currentCase.id];
      return copy;
    });
  };

  const totalCases = CASE_DILEMMAS.length;
  const solvedCount = Object.keys(showFeedback).filter(k => showFeedback[k]).length;
  const correctCount = Object.keys(showFeedback).filter(caseId => {
    const d = CASE_DILEMMAS.find(c => c.id === caseId);
    const chosen = selectedOptions[caseId];
    return d?.options.find(o => o.id === chosen)?.isCorrect;
  }).length;

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D]">
          <span className="text-[#39A900]">Módulo 03</span>
          <span aria-hidden="true">·</span>
          <span>Laboratorio de Apropiación</span>
          <span aria-hidden="true">·</span>
          <span>Casos Prácticos de Convivencia</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Simulador de Dilemas y Aplicación Reglamentaria
        </h2>
        <p className="text-slate-600 max-w-3xl leading-relaxed text-balance">
          Enfrenta situaciones reales que ocurren durante la vida formativa en los Centros del SENA. 
          Aplica el Reglamento del Aprendiz y reflexiona sobre la mejor decisión formativa y ética.
        </p>
      </div>

      {/* Simulator Sandbox Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Navigation / Progress Bar between cases */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Dilemas Resueltos:</span>
            <span className="font-mono text-xs font-bold text-[#00324D]">
              {solvedCount} de {totalCases} ({Math.round((solvedCount / totalCases) * 100)}%)
            </span>
            {solvedCount > 0 && (
              <span className="text-xs text-emerald-700 font-semibold font-mono">
                · {correctCount} correctos
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {CASE_DILEMMAS.map((c, idx) => {
              const answered = showFeedback[c.id];
              const isCurrent = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCaseIndex(idx)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold font-mono transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-[#00324D] text-white shadow-sm ring-2 ring-[#00324D]/30'
                      : answered
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Case Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#39A900] font-bold">
              <span>CASO {activeCaseIndex + 1} DE {totalCases}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500">{currentCase.regulatoryReference}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{currentCase.title}</h3>
          </div>

          {/* Scenario Callout */}
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              <strong className="text-slate-900">Contexto formativo:</strong> {currentCase.context}
            </p>
            <p className="text-sm font-semibold text-[#00324D] pt-2 border-t border-slate-200">
              {currentCase.scenario}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              Selecciona la alternativa que cumple cabalmente el Reglamento SENA:
            </label>

            <div className="space-y-3">
              {currentCase.options.map((option) => {
                const isSelected = selectedOptId === option.id;
                let optionStyle = 'bg-white border-slate-200 hover:border-slate-300 text-slate-800';

                if (isSubmitted) {
                  if (option.isCorrect) {
                    optionStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-900';
                  } else if (isSelected && !option.isCorrect) {
                    optionStyle = 'bg-rose-50/70 border-rose-400 text-rose-900';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle = 'bg-slate-50 border-[#00324D] ring-1 ring-[#00324D] text-slate-900';
                }

                return (
                  <div
                    key={option.id}
                    onClick={() => handleSelectOption(option.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${optionStyle} space-y-2`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {isSubmitted ? (
                          option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-300" />
                          )
                        ) : (
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#00324D] bg-[#00324D]' : 'border-slate-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <p className="text-sm font-medium leading-relaxed">{option.text}</p>
                      </div>
                    </div>

                    {/* Instant Regulatory Feedback */}
                    {isSubmitted && (isSelected || option.isCorrect) && (
                      <div className={`p-3 rounded-lg text-xs mt-2 ${
                        option.isCorrect ? 'bg-emerald-100/70 text-emerald-950 font-medium' : 'bg-rose-100/70 text-rose-950'
                      }`}>
                        <p>{option.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div>
              {isSubmitted && (
                <button
                  type="button"
                  onClick={handleResetCase}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reintentar este caso
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isSubmitted ? (
                <button
                  type="button"
                  disabled={!isAnswered}
                  onClick={handleConfirmAnswer}
                  className="px-5 py-2 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs"
                >
                  Verificar Solución
                </button>
              ) : (
                activeCaseIndex < totalCases - 1 && (
                  <button
                    type="button"
                    onClick={() => setActiveCaseIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-lg bg-[#00324D] text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs"
                  >
                    Siguiente Caso →
                  </button>
                )
              )}
            </div>
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
              {isCompleted ? 'Módulo 03 Apropiado' : 'Apropiar Módulo 03'}
            </p>
            <p className="text-xs text-slate-500">
              Casos resueltos: has aplicado el reglamento en situaciones verídicas de formación.
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
            {isCompleted ? 'Completado ✓' : 'Marcar como Completado'}
          </button>
          
          <button
            type="button"
            onClick={onNextModule}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#00324D] text-white hover:bg-slate-800 transition-colors"
          >
            Ir a Ruta de Formación (FPI) →
          </button>
        </div>
      </div>

    </div>
  );
};
