import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { Award, Check, CheckCircle2, Copy, Download, ExternalLink, Printer, QrCode, ShieldCheck } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface CertificateViewProps {
  apprentice: Apprentice;
  onBackToDashboard: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  apprentice,
  onBackToDashboard
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const certNumber = apprentice.certificateId || `SENA-IND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const certDate = apprentice.completedAt || new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(certNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Top action bar (hidden in print) */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-[#00324D] hover:underline"
          >
            ← Volver al Portal de Inducción
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-mono">Folio: {certNumber}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#39A900]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copiado' : 'Copiar Código'}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-1.5 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#329200] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / Guardar en PDF
          </button>
        </div>
      </div>

      {/* Official Certificate Container (Target for Print) */}
      <div className="print-certificate-container bg-white rounded-2xl border-4 border-[#00324D] p-8 sm:p-14 shadow-lg relative overflow-hidden text-slate-900">
        
        {/* Subtle Watermark Decorative Border */}
        <div className="absolute inset-2 border-2 border-[#39A900]/40 rounded-xl pointer-events-none" />

        {/* Subtle Background Watermark of Official SenaLogo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.035]">
          <SenaLogo className="w-96 h-96" />
        </div>

        {/* Certificate Header */}
        <div className="relative text-center space-y-4 pt-2">
          
          <div className="flex items-center justify-center gap-4">
            <SenaLogo className="w-14 h-14 shrink-0" />
            <div className="text-left">
              <p className="text-xs font-bold tracking-widest uppercase text-slate-500">República de Colombia</p>
              <p className="text-sm font-extrabold tracking-tight text-[#00324D]">
                SERVICIO NACIONAL DE APRENDIZAJE · SENA
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#39A900]">
              CONSTANCIA DE APROPIACIÓN INSTITUCIONAL
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight">
              Certificado de Inducción de Aprendiz
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              En cumplimiento del Reglamento del Aprendiz (Acuerdo 009 de 2024) y del Sistema Nacional de Formación para el Trabajo
            </p>
          </div>

        </div>

        {/* Main Certificate Statement */}
        <div className="relative my-8 sm:my-10 text-center space-y-6 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-600">
            La Subdirección de Centro y la Coordinación de Formación Profesional Integral hacen constar que:
          </p>

          <div className="py-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00324D] tracking-tight border-b-2 border-slate-200 pb-2 inline-block">
              {apprentice.fullName}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-slate-700 mt-2">
              Identificado con {apprentice.documentType} No. <strong className="text-slate-900">{apprentice.documentNumber}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-balance">
            Ha participado con dedicación, ética y compromiso en las jornadas del <strong className="text-slate-900">Proceso de Inducción Institucional</strong>,
            apropiando satisfactoriamente los principios, valores, símbolos, derechos, deberes y la ruta formativa del programa:
          </p>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <p className="text-sm font-bold text-[#00324D]">{apprentice.programName}</p>
            <p className="text-xs text-slate-600 mt-0.5">
              Ficha de Caracterización No. <strong className="font-mono text-slate-800">{apprentice.ficha}</strong>
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {apprentice.centerName} · {apprentice.regional}
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs text-slate-700 font-medium">
            <span>Intensidad: <strong className="font-mono">40 Horas</strong></span>
            <span>·</span>
            <span>Calificación: <strong className="font-mono text-[#39A900]">{apprentice.score || 95}% (Aprobado)</strong></span>
            <span>·</span>
            <span>Fecha: <strong className="font-mono">{certDate}</strong></span>
          </div>
        </div>

        {/* Signatures & Security Insignia */}
        <div className="relative pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
          
          {/* Subdirector signature */}
          <div className="text-center space-y-1">
            <div className="h-10 flex items-end justify-center">
              <span className="font-serif italic text-base text-slate-600 border-b border-slate-400 px-6">
                Dr. J. Camilo Morales
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-800">Subdirector de Centro</p>
            <p className="text-[10px] text-slate-500">SENA · Formación Profesional</p>
          </div>

          {/* Golden Badge Emblem */}
          <div className="flex flex-col items-center justify-center">
            <img
              src="/src/assets/images/sena_badge_insignia_1793115131378.jpg"
              alt="Insignia oficial de honor SENA"
              className="w-20 h-20 object-contain rounded-full shadow-xs"
              referrerPolicy="no-referrer"
            />
            <span className="text-[9px] font-mono font-bold tracking-widest text-[#39A900] mt-1">SELLO INSTITUCIONAL</span>
          </div>

          {/* Academic Coordinator signature & QR */}
          <div className="text-center space-y-1">
            <div className="h-10 flex items-end justify-center">
              <span className="font-serif italic text-base text-slate-600 border-b border-slate-400 px-6">
                Dra. Patricia Arango V.
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-800">Coordinadora Académica</p>
            <p className="text-[10px] text-slate-500">Gestión de la Formación</p>
          </div>

        </div>

        {/* Footer verification strip */}
        <div className="relative mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Código Verificación: {certNumber}</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39A900]" />
            Documento Institucional Válido para Expediente Académico
          </span>
        </div>

      </div>

    </div>
  );
};
