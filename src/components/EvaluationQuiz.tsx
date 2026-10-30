import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/senaData';
import { Apprentice, QuizQuestion } from '../types/induction';
import { AlertCircle, Award, CheckCircle2, ChevronRight, HelpCircle, RefreshCw, RotateCcw, ShieldCheck, Sparkles, XCircle, FileSpreadsheet, ExternalLink, CloudCheck } from 'lucide-react';

interface EvaluationQuizProps {
  apprentice: Apprentice;
  onQuizCompleted: (scorePercent: number) => void;
  onViewCertificate: () => void;
  onReviewModules: () => void;
  onAnswerQuestion?: (questionIndex: number, optionIndex: number, isCorrect: boolean, question: QuizQuestion) => void;
  onOpenGoogleSheets?: () => void;
}

export const EvaluationQuiz: React.FC<EvaluationQuizProps> = ({
  apprentice,
  onQuizCompleted,
  onViewCertificate,
  onReviewModules,
  onAnswerQuestion,
  onOpenGoogleSheets,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [confirmedAnswers, setConfirmedAnswers] = useState<Record<number, boolean>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showReviewList, setShowReviewList] = useState<boolean>(false);
  const [lastSyncedQuestionIndex, setLastSyncedQuestionIndex] = useState<number | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];
  const isConfirmed = !!confirmedAnswers[currentIndex];

  const handleSelect = (idx: number) => {
    if (isConfirmed) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: idx }));
  };

  const handleConfirmCurrent = () => {
    if (selectedOption === undefined) return;
    setConfirmedAnswers(prev => ({ ...prev, [currentIndex]: true }));
    const isCorrect = selectedOption === currentQ.correctIndex;
    
    // Trigger real-time sync with Google Drive / Google Sheets
    if (onAnswerQuestion) {
      onAnswerQuestion(currentIndex, selectedOption, isCorrect, currentQ);
      setLastSyncedQuestionIndex(currentIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percent = Math.round((correctCount / totalQuestions) * 100);
    setIsFinished(true);
    onQuizCompleted(percent);

    if (percent >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Fallback gracefully if confetti fails
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setConfirmedAnswers({});
    setIsFinished(false);
    setShowReviewList(false);
  };

  // Score calculation
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 70;

  // Finished Results Screen
  if (isFinished) {
    return (
      <div className="max-w-3xl mx-auto space-y-8 py-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 text-center space-y-6 shadow-sm">
          
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-xs">
            {isPassed ? (
              <div className="w-full h-full rounded-full bg-emerald-50 text-[#39A900] flex items-center justify-center border-2 border-emerald-200">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border-2 border-rose-200">
                <AlertCircle className="w-10 h-10" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-500">
              RESULTADO DE LA EVALUACIÓN DE APROPIACIÓN
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isPassed ? '¡Felicitaciones! Has Aprobado la Inducción SENA' : 'Aún no alcanzas el puntaje mínimo de aprobación'}
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              {isPassed
                ? `Has demostrado un alto nivel de apropiación sobre la identidad, derechos, deberes y normatividad del SENA con un resultado de ${scorePercent}%.`
                : `Obtuviste un ${scorePercent}%. Para aprobar y obtener tu certificado oficial se requiere un mínimo del 70%. Te recomendamos repasar los módulos y volver a presentar la prueba.`}
            </p>
          </div>

          {/* Metrics Box */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Aciertos</p>
              <p className="text-xl font-bold font-mono text-[#00324D]">{correctCount} / {totalQuestions}</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Porcentaje</p>
              <p className={`text-xl font-bold font-mono ${isPassed ? 'text-[#39A900]' : 'text-rose-600'}`}>
                {scorePercent}%
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-500 font-medium">Estado</p>
              <p className={`text-xs font-bold mt-1 ${isPassed ? 'text-[#39A900]' : 'text-rose-600'}`}>
                {isPassed ? 'APROBADO' : 'NO APROBADO'}
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {isPassed ? (
              <button
                type="button"
                onClick={onViewCertificate}
                className="px-6 py-3 rounded-lg bg-[#39A900] text-white text-sm font-bold hover:bg-[#329200] active:scale-95 transition-all shadow-sm flex items-center gap-2"
              >
                <Award className="w-5 h-5 text-amber-300" />
                Generar y Descargar Certificado Oficial
              </button>
            ) : (
              <button
                type="button"
                onClick={onReviewModules}
                className="px-6 py-3 rounded-lg bg-[#00324D] text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-sm"
              >
                Repasar Módulos de Formación
              </button>
            )}

            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-3 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-500" />
              Reintentar Evaluación
            </button>

            {onOpenGoogleSheets && (
              <button
                type="button"
                onClick={onOpenGoogleSheets}
                className="px-5 py-3 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm font-bold hover:bg-emerald-100 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                Ver Resultados en Google Sheets (Drive)
              </button>
            )}
          </div>

          {/* Toggle Detailed Review */}
          <div className="pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setShowReviewList(!showReviewList)}
              className="text-xs font-semibold text-[#00324D] hover:underline"
            >
              {showReviewList ? 'Ocultar desglose detallado de respuestas' : 'Ver desglose detallado de respuestas y citas del reglamento'}
            </button>
          </div>

        </div>

        {/* Detailed Review Section */}
        {showReviewList && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Revisión Pregunta por Pregunta</h3>
            <div className="space-y-4">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const selected = selectedAnswers[idx];
                const isCorrect = selected === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border bg-white space-y-3 ${
                      isCorrect ? 'border-emerald-200' : 'border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="font-bold text-slate-500">Pregunta {idx + 1} de {totalQuestions}</span>
                      <span className={`font-bold flex items-center gap-1 ${isCorrect ? 'text-[#39A900]' : 'text-rose-600'}`}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        {isCorrect ? 'Acierto (+10%)' : 'Errónea'}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{q.question}</h4>

                    <div className="text-xs space-y-1.5 pt-1">
                      <p className="text-slate-700">
                        <strong className="text-slate-900">Tu respuesta:</strong>{' '}
                        {selected !== undefined ? q.options[selected] : 'Sin responder'}
                      </p>
                      {!isCorrect && (
                        <p className="text-[#39A900]">
                          <strong className="text-slate-900">Respuesta correcta:</strong> {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200/80">
                      <p className="font-semibold text-[#00324D]">{q.regulationArticle}:</p>
                      <p>{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    );
  }

  // Active Quiz State
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header & Instructions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00324D]">
            <span className="text-[#39A900]">Evaluación de Apropiación</span>
            <span aria-hidden="true">·</span>
            <span>10 Preguntas Formativas</span>
            <span aria-hidden="true">·</span>
            <span>Mínimo 70% para Certificación</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Evaluación de Conocimientos del Proceso de Inducción
          </h2>
        </div>

        {/* PROMINENT LIVE SPREADSHEET BUTTON REQUESTED BY USER */}
        {onOpenGoogleSheets && (
          <button
            type="button"
            onClick={onOpenGoogleSheets}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border-2 border-emerald-500 shadow-sm text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:shadow-md shrink-0 group"
            title="Abrir hoja de cálculo de Google Drive con respuestas en vivo de los aprendices"
          >
            <div className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileSpreadsheet className="w-3.5 h-3.5" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 leading-tight">
                <span>Hoja Google Sheets (Drive)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <span className="text-[10px] text-emerald-600 font-normal">Sincronización en vivo</span>
            </div>
          </button>
        )}
      </div>

      <p className="text-slate-600 text-sm leading-relaxed">
        Lee atentamente cada caso y pregunta. Al seleccionar tu respuesta y confirmar, recibirás retroalimentación 
        pedagógica inmediata con la norma aplicable y <strong>tu respuesta se guardará automáticamente en la hoja de cálculo de Google Drive</strong>.
      </p>

      {/* Live sync pulse banner */}
      {lastSyncedQuestionIndex !== null && (
        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CloudCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Pregunta {lastSyncedQuestionIndex + 1}:</strong> Respuesta guardada y sincronizada en tiempo real con <em>Respuestas_Evaluacion_EnVivo</em> en Google Drive.
            </span>
          </div>
          {onOpenGoogleSheets && (
            <button
              type="button"
              onClick={onOpenGoogleSheets}
              className="text-[11px] font-bold text-emerald-700 underline hover:text-emerald-900 ml-2 whitespace-nowrap cursor-pointer"
            >
              Ver en la Hoja ↗
            </button>
          )}
        </div>
      )}

      {/* Quiz Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Progress header */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 font-mono">
              PREGUNTA {currentIndex + 1} DE {totalQuestions}
            </span>
            <span className="font-mono text-slate-500 font-semibold">{progressPercent}% Completado</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div
              className="h-full bg-[#39A900] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase text-[#00324D] tracking-wider">
              {currentQ.moduleCategory === 'identidad' && 'Identidad y Símbolos'}
              {currentQ.moduleCategory === 'derechos' && 'Derechos del Aprendiz'}
              {currentQ.moduleCategory === 'deberes' && 'Deberes y Conducta'}
              {currentQ.moduleCategory === 'fpi' && 'Ruta de Formación (FPI)'}
              {currentQ.moduleCategory === 'reglamento' && 'Régimen Disciplinario'}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedOption === optIdx;
              const isCorrectOpt = optIdx === currentQ.correctIndex;

              let style = 'border-slate-200 hover:border-slate-300 bg-white text-slate-800';

              if (isConfirmed) {
                if (isCorrectOpt) {
                  style = 'border-emerald-500 bg-emerald-50 text-emerald-950';
                } else if (isSelected && !isCorrectOpt) {
                  style = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  style = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                style = 'border-[#00324D] bg-slate-50 ring-1 ring-[#00324D] text-slate-900';
              }

              return (
                <div
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${style} flex items-start gap-3`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isConfirmed ? (
                      isCorrectOpt ? (
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
                  <p className="text-sm font-medium leading-relaxed flex-1">{opt}</p>
                </div>
              );
            })}
          </div>

          {/* Instant Formative Explanation */}
          {isConfirmed && (
            <div className={`p-4 rounded-xl text-xs space-y-1.5 ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center gap-2 font-bold">
                {selectedOption === currentQ.correctIndex ? (
                  <span className="text-[#39A900]">¡Respuesta Correcta!</span>
                ) : (
                  <span className="text-rose-700">Respuesta Errónea</span>
                )}
                <span className="font-mono text-slate-500 font-normal">· {currentQ.regulationArticle}</span>
              </div>
              <p className="leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                {currentIndex + 1} / {totalQuestions}
              </span>
              {onOpenGoogleSheets && (
                <button
                  type="button"
                  onClick={onOpenGoogleSheets}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold border border-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Ver en tiempo real la hoja de cálculo de Google Drive"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ver Hoja en Vivo</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {!isConfirmed ? (
                <button
                  type="button"
                  disabled={selectedOption === undefined}
                  onClick={handleConfirmCurrent}
                  className="px-5 py-2 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer"
                >
                  Confirmar Respuesta
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-lg bg-[#00324D] text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  {currentIndex < totalQuestions - 1 ? 'Siguiente Pregunta →' : 'Ver Resultado Final'}
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
