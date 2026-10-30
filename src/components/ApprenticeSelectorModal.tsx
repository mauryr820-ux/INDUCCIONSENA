import React, { useState } from 'react';
import { Apprentice } from '../types/induction';
import { Check, Edit2, User, Users, X } from 'lucide-react';

interface ApprenticeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprentices: Apprentice[];
  currentApprentice: Apprentice;
  onSelectApprentice: (apprentice: Apprentice) => void;
  onUpdateCurrentApprentice: (updated: Apprentice) => void;
}

export const ApprenticeSelectorModal: React.FC<ApprenticeSelectorModalProps> = ({
  isOpen,
  onClose,
  apprentices,
  currentApprentice,
  onSelectApprentice,
  onUpdateCurrentApprentice
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>(currentApprentice.fullName);
  const [editDocType, setEditDocType] = useState<Apprentice['documentType']>(currentApprentice.documentType);
  const [editDocNumber, setEditDocNumber] = useState<string>(currentApprentice.documentNumber);
  const [editFicha, setEditFicha] = useState<string>(currentApprentice.ficha);
  const [editProgram, setEditProgram] = useState<string>(currentApprentice.programName);

  if (!isOpen) return null;

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Apprentice = {
      ...currentApprentice,
      fullName: editName.trim(),
      documentType: editDocType,
      documentNumber: editDocNumber.trim(),
      ficha: editFicha.trim(),
      programName: editProgram.trim()
    };
    onUpdateCurrentApprentice(updated);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5 shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">Perfil y Selección de Aprendiz</h3>
            <p className="text-xs text-slate-500">Personaliza tus datos para la evaluación y certificado</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Apprentice Box */}
        {!isEditing ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#39A900]">APRENDIZ ACTIVO</span>
              <button
                type="button"
                onClick={() => {
                  setEditName(currentApprentice.fullName);
                  setEditDocNumber(currentApprentice.documentNumber);
                  setEditDocType(currentApprentice.documentType);
                  setEditFicha(currentApprentice.ficha);
                  setEditProgram(currentApprentice.programName);
                  setIsEditing(true);
                }}
                className="text-xs font-semibold text-[#00324D] hover:underline flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" /> Editar mis datos
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">{currentApprentice.fullName}</p>
              <p className="text-xs text-slate-600 font-mono">
                {currentApprentice.documentType} {currentApprentice.documentNumber} · Ficha {currentApprentice.ficha}
              </p>
              <p className="text-xs text-slate-500 truncate">{currentApprentice.programName}</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveEdit} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <span className="text-xs font-mono font-bold text-[#00324D]">EDITAR DATOS DEL APRENDIZ</span>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Nombre y Apellidos:</label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#39A900]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Tipo:</label>
                <select
                  value={editDocType}
                  onChange={(e) => setEditDocType(e.target.value as any)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#39A900]"
                >
                  <option value="CC">C.C.</option>
                  <option value="TI">T.I.</option>
                  <option value="CE">C.E.</option>
                  <option value="PEP">PEP</option>
                </select>
              </div>
              <div className="col-span-2">
                <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Número Documento:</label>
                <input
                  type="text"
                  required
                  value={editDocNumber}
                  onChange={(e) => setEditDocNumber(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#39A900]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Ficha:</label>
                <input
                  type="text"
                  required
                  value={editFicha}
                  onChange={(e) => setEditFicha(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#39A900]"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">Programa:</label>
                <input
                  type="text"
                  required
                  value={editProgram}
                  onChange={(e) => setEditProgram(e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-[#39A900]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 text-xs text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-[#39A900] text-white text-xs font-semibold rounded-md hover:bg-[#329200]"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        )}

        {/* Switch Between Sample Apprentices */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
            O selecciona otro aprendiz de muestra:
          </span>

          <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
            {apprentices.map((app) => {
              const isSelected = app.id === currentApprentice.id;
              return (
                <div
                  key={app.id}
                  onClick={() => {
                    onSelectApprentice(app);
                    setIsEditing(false);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-[#00324D] bg-slate-50 ring-1 ring-[#00324D]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="space-y-0.5 truncate pr-2">
                    <p className="font-bold text-slate-900 truncate">{app.fullName}</p>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {app.documentType} {app.documentNumber} · Ficha {app.ficha}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-[10px] text-slate-400">{app.progressPercent}%</span>
                    {isSelected && <Check className="w-4 h-4 text-[#39A900]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-[#00324D] text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Listo
          </button>
        </div>

      </div>
    </div>
  );
};
