import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { Apprentice } from '../types/induction';

// Initialize Firebase App singleton safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Google Workspace Scopes
export const WORKSPACE_SCOPES = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets'
];

const provider = new GoogleAuthProvider();
WORKSPACE_SCOPES.forEach(scope => provider.addScope(scope));

// Memory-only access token caching (per security specifications)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

// Interactive sign-in with Google to obtain OAuth Bearer token
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se obtuvo el token de acceso de Google');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const SPREADSHEET_TITLE = 'SENA - Inducción y Caracterización de Aprendices';
export const SHEET_CARACTERIZACION = 'Aprendices_Caracterizacion';
export const SHEET_PROGRESO = 'Seguimiento_Induccion';
export const SHEET_RESPUESTAS = 'Respuestas_Evaluacion_EnVivo';

export const CARACTERIZACION_HEADERS = [
  'ID Registro',
  'Tipo Documento',
  'Número Documento',
  'Nombres y Apellidos',
  'Correo Institucional (MiSENA)',
  'Teléfono / Celular',
  'Ficha de Caracterización',
  'Programa de Formación',
  'Nivel de Formación',
  'Jornada',
  'Rol en Ficha',
  'Centro de Formación',
  'Regional SENA',
  'Estrato Socioeconómico',
  'Enfoque Poblacional',
  'Género',
  'Fecha de Nacimiento',
  'EPS / Aseguradora',
  'Grupo Sanguíneo y RH',
  'Contacto de Emergencia',
  'Teléfono Emergencia',
  'Fecha de Caracterización',
  'Estado Registro'
];

export const PROGRESO_HEADERS = [
  'Número Documento',
  'Nombres y Apellidos',
  'Ficha',
  'Programa de Formación',
  'Progreso General (%)',
  'Módulos Completados',
  'Calificación Evaluación (0-100)',
  'Estado Inducción',
  'Folio Certificado SENA',
  'Fecha Certificación',
  'Última Actividad'
];

export const RESPUESTAS_HEADERS = [
  'ID Aprendiz',
  'Número Documento',
  'Nombres y Apellidos',
  'Ficha',
  'No. Pregunta',
  'Pregunta Formativa',
  'Respuesta Seleccionada',
  'Resultado',
  'Artículo Reglamento',
  'Fecha y Hora Sincronización'
];

// Helper to escape formula injection risk in spreadsheet cells
export const sanitizeCell = (value: string | number | undefined | null): string => {
  if (value === undefined || value === null) return '';
  const str = String(value);
  if (/^[=+\-@]/.test(str)) {
    return `'${str}`;
  }
  return str;
};

export interface SheetConnectionInfo {
  spreadsheetId: string;
  spreadsheetUrl: string;
  createdDate: string;
  lastSyncDate?: string;
  syncedCount: number;
}

// Retrieve saved spreadsheet ID from storage if exists
export const getSavedSpreadsheetInfo = (): SheetConnectionInfo | null => {
  try {
    const raw = localStorage.getItem('sena_google_sheet_info');
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error leyendo info de hoja:', e);
  }
  return null;
};

export const saveSpreadsheetInfo = (info: SheetConnectionInfo) => {
  try {
    localStorage.setItem('sena_google_sheet_info', JSON.stringify(info));
  } catch (e) {
    console.error('Error guardando info de hoja:', e);
  }
};

/**
 * Creates or retrieves the official SENA Google Spreadsheet in the user's Drive.
 */
export const ensureSpreadsheet = async (accessToken: string): Promise<SheetConnectionInfo> => {
  const existing = getSavedSpreadsheetInfo();
  if (existing?.spreadsheetId) {
    // Verify that the sheet still exists and is accessible
    try {
      const checkRes = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${existing.spreadsheetId}?fields=spreadsheetId`,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );
      if (checkRes.ok) {
        return existing;
      }
    } catch {
      // Re-create or continue
    }
  }

  // Create new spreadsheet via Google Sheets v4 API
  const createPayload = {
    properties: {
      title: `${SPREADSHEET_TITLE} (${new Date().toLocaleDateString('es-CO')})`
    },
    sheets: [
      {
        properties: {
          title: SHEET_CARACTERIZACION,
          gridProperties: {
            frozenRowCount: 1
          }
        }
      },
      {
        properties: {
          title: SHEET_PROGRESO,
          gridProperties: {
            frozenRowCount: 1
          }
        }
      },
      {
        properties: {
          title: SHEET_RESPUESTAS,
          gridProperties: {
            frozenRowCount: 1
          }
        }
      }
    ]
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createPayload)
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error creando hoja en Google Drive: ${errText}`);
  }

  const createdData = await createRes.json();
  const spreadsheetId = createdData.spreadsheetId;
  const spreadsheetUrl = createdData.spreadsheetUrl || `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // Write headers to all three sheets
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_CARACTERIZACION}!A1:W1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_CARACTERIZACION}!A1:W1`,
        majorDimension: 'ROWS',
        values: [CARACTERIZACION_HEADERS]
      })
    }
  );

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_PROGRESO}!A1:K1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_PROGRESO}!A1:K1`,
        majorDimension: 'ROWS',
        values: [PROGRESO_HEADERS]
      })
    }
  );

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RESPUESTAS}!A1:J1?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_RESPUESTAS}!A1:J1`,
        majorDimension: 'ROWS',
        values: [RESPUESTAS_HEADERS]
      })
    }
  );

  const info: SheetConnectionInfo = {
    spreadsheetId,
    spreadsheetUrl,
    createdDate: new Date().toISOString(),
    syncedCount: 0
  };

  saveSpreadsheetInfo(info);
  return info;
};

// Convert Apprentice to Characterization Row
export const apprenticeToCharacterizationRow = (a: Apprentice): string[] => {
  return [
    sanitizeCell(a.id),
    sanitizeCell(a.documentType),
    sanitizeCell(a.documentNumber),
    sanitizeCell(a.fullName),
    sanitizeCell(a.email),
    sanitizeCell(a.phone || 'No registrado'),
    sanitizeCell(a.ficha),
    sanitizeCell(a.programName),
    sanitizeCell(a.trainingLevel || 'Tecnólogo'),
    sanitizeCell(a.shift || 'Diurna'),
    sanitizeCell(a.apprenticeRole || 'Aprendiz en Formación'),
    sanitizeCell(a.centerName),
    sanitizeCell(a.regional),
    sanitizeCell(a.socioeconomicStratum ? `Estrato ${a.socioeconomicStratum}` : 'Sin registrar'),
    sanitizeCell(a.populationGroup || 'General'),
    sanitizeCell(a.gender || 'No reportado'),
    sanitizeCell(a.birthDate || 'N/A'),
    sanitizeCell(a.eps || 'N/A'),
    sanitizeCell(a.bloodType || 'N/A'),
    sanitizeCell(a.emergencyContactName || 'N/A'),
    sanitizeCell(a.emergencyContactPhone || 'N/A'),
    sanitizeCell(a.characterizationDate || new Date().toISOString().split('T')[0]),
    sanitizeCell(a.characterizationCompleted ? 'Caracterizado (Completo)' : 'Pendiente')
  ];
};

// Convert Apprentice to Induction Progress Row
export const apprenticeToProgressRow = (a: Apprentice): string[] => {
  return [
    sanitizeCell(a.documentNumber),
    sanitizeCell(a.fullName),
    sanitizeCell(a.ficha),
    sanitizeCell(a.programName),
    sanitizeCell(`${a.progressPercent}%`),
    sanitizeCell((a.completedModules || []).join(', ') || 'Ninguno'),
    sanitizeCell(a.score !== undefined ? `${a.score}/100` : 'Pendiente'),
    sanitizeCell(a.inductionCompleted ? 'Aprobado y Certificado' : (a.progressPercent > 0 ? 'En Progreso' : 'No Iniciado')),
    sanitizeCell(a.certificateId || 'Sin certificado'),
    sanitizeCell(a.completedAt || 'N/A'),
    sanitizeCell(new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('es-CO'))
  ];
};

/**
 * Synchronizes an individual apprentice's characterization and induction data in real time.
 * If the apprentice already exists (matched by documentNumber), updates the existing row;
 * otherwise appends a new row.
 */
export const syncApprenticeRealtime = async (
  accessToken: string,
  spreadsheetId: string,
  apprentice: Apprentice
): Promise<{ success: boolean; action: 'updated' | 'appended' }> => {
  try {
    // 1. Sync to Aprendices_Caracterizacion
    // Read column C (document numbers) to find row index
    const colRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_CARACTERIZACION}!C:C`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    let charAction: 'updated' | 'appended' = 'appended';

    if (colRes.ok) {
      const colData = await colRes.json();
      const rows: string[][] = colData.values || [];
      // Row 1 is header (index 0). Data starts at row 2 (index 1).
      let targetRowIndex = -1;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i] && rows[i][0] === apprentice.documentNumber) {
          targetRowIndex = i + 1; // 1-based index in Sheets
          break;
        }
      }

      const rowValues = apprenticeToCharacterizationRow(apprentice);

      if (targetRowIndex > 1) {
        // Update existing row
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_CARACTERIZACION}!A${targetRowIndex}:W${targetRowIndex}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              range: `${SHEET_CARACTERIZACION}!A${targetRowIndex}:W${targetRowIndex}`,
              majorDimension: 'ROWS',
              values: [rowValues]
            })
          }
        );
        charAction = 'updated';
      } else {
        // Append new row
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_CARACTERIZACION}!A:W:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              range: `${SHEET_CARACTERIZACION}!A:W`,
              majorDimension: 'ROWS',
              values: [rowValues]
            })
          }
        );
      }
    }

    // 2. Sync to Seguimiento_Induccion
    const progColRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_PROGRESO}!A:A`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    if (progColRes.ok) {
      const progData = await progColRes.json();
      const pRows: string[][] = progData.values || [];
      let progRowIndex = -1;
      for (let i = 1; i < pRows.length; i++) {
        if (pRows[i] && pRows[i][0] === apprentice.documentNumber) {
          progRowIndex = i + 1;
          break;
        }
      }

      const pValues = apprenticeToProgressRow(apprentice);

      if (progRowIndex > 1) {
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_PROGRESO}!A${progRowIndex}:K${progRowIndex}?valueInputOption=USER_ENTERED`,
          {
            method: 'PUT',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              range: `${SHEET_PROGRESO}!A${progRowIndex}:K${progRowIndex}`,
              majorDimension: 'ROWS',
              values: [pValues]
            })
          }
        );
      } else {
        await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_PROGRESO}!A:K:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              range: `${SHEET_PROGRESO}!A:K`,
              majorDimension: 'ROWS',
              values: [pValues]
            })
          }
        );
      }
    }

    // Update sync info
    const info = getSavedSpreadsheetInfo();
    if (info) {
      info.lastSyncDate = new Date().toISOString();
      saveSpreadsheetInfo(info);
    }

    return { success: true, action: charAction };
  } catch (error) {
    console.error('Error sincronizando con Google Sheets:', error);
    throw error;
  }
};

/**
 * Bulk sync of all apprentices into Google Sheets
 */
export const syncAllApprenticesToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  apprentices: Apprentice[]
): Promise<{ total: number }> => {
  // Clear and rewrite with all rows
  const charRows = apprentices.map(apprenticeToCharacterizationRow);
  const progRows = apprentices.map(apprenticeToProgressRow);

  // Overwrite Caracterizacion
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_CARACTERIZACION}!A2:W?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_CARACTERIZACION}!A2:W`,
        majorDimension: 'ROWS',
        values: charRows
      })
    }
  );

  // Overwrite Progreso
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_PROGRESO}!A2:K?valueInputOption=USER_ENTERED`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        range: `${SHEET_PROGRESO}!A2:K`,
        majorDimension: 'ROWS',
        values: progRows
      })
    }
  );

  const info = getSavedSpreadsheetInfo();
  if (info) {
    info.lastSyncDate = new Date().toISOString();
    info.syncedCount = apprentices.length;
    saveSpreadsheetInfo(info);
  }

  return { total: apprentices.length };
};

export interface LiveQuizAnswer {
  id: string;
  apprenticeId: string;
  documentNumber: string;
  fullName: string;
  ficha: string;
  questionNumber: number;
  questionText: string;
  selectedOption: string;
  isCorrect: boolean;
  regulationArticle: string;
  timestamp: string;
}

// Local cache for live answers to enable instantaneous UI updates in the spreadsheet viewer
export const getLocalLiveQuizAnswers = (): LiveQuizAnswer[] => {
  try {
    const raw = localStorage.getItem('sena_quiz_live_answers');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return [
    {
      id: 'ans-init-1',
      apprenticeId: 'app-001',
      documentNumber: '1023456789',
      fullName: 'Carlos Eduardo Mendoza Silva',
      ficha: '2874102',
      questionNumber: 1,
      questionText: '¿Cuáles son los colores oficiales del SENA y qué representan?',
      selectedOption: 'Verde (esperanza y naturaleza) y Blanco (paz y transparencia)',
      isCorrect: true,
      regulationArticle: 'Identidad Institucional · Símbolos',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toLocaleTimeString('es-CO')
    },
    {
      id: 'ans-init-2',
      apprenticeId: 'app-001',
      documentNumber: '1023456789',
      fullName: 'Carlos Eduardo Mendoza Silva',
      ficha: '2874102',
      questionNumber: 2,
      questionText: '¿Cuál es el plazo reglamentario para justificar una inasistencia?',
      selectedOption: 'Máximo 3 días hábiles siguientes al hecho',
      isCorrect: true,
      regulationArticle: 'Capítulo IV · Deberes (Acuerdo 009 de 2024)',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleTimeString('es-CO')
    },
    {
      id: 'ans-init-3',
      apprenticeId: 'app-002',
      documentNumber: '1098765432',
      fullName: 'Laura Marcela Gómez Restrepo',
      ficha: '2874102',
      questionNumber: 1,
      questionText: '¿Cuáles son los colores oficiales del SENA y qué representan?',
      selectedOption: 'Verde (esperanza y naturaleza) y Blanco (paz y transparencia)',
      isCorrect: true,
      regulationArticle: 'Identidad Institucional · Símbolos',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toLocaleTimeString('es-CO')
    }
  ];
};

export const saveLocalLiveQuizAnswer = (answer: LiveQuizAnswer) => {
  try {
    const existing = getLocalLiveQuizAnswers();
    // Add to top of list
    const updated = [answer, ...existing.filter(a => !(a.apprenticeId === answer.apprenticeId && a.questionNumber === answer.questionNumber))];
    localStorage.setItem('sena_quiz_live_answers', JSON.stringify(updated.slice(0, 100)));
  } catch {
    // fallback
  }
};

/**
 * Real-time question response sync directly to Google Sheets tab 'Respuestas_Evaluacion_EnVivo'
 */
export const syncQuizAnswerRealtime = async (
  accessToken: string,
  spreadsheetId: string,
  answer: LiveQuizAnswer
): Promise<boolean> => {
  try {
    const row = [
      sanitizeCell(answer.apprenticeId),
      sanitizeCell(answer.documentNumber),
      sanitizeCell(answer.fullName),
      sanitizeCell(answer.ficha),
      sanitizeCell(`Pregunta ${answer.questionNumber}`),
      sanitizeCell(answer.questionText),
      sanitizeCell(answer.selectedOption),
      sanitizeCell(answer.isCorrect ? 'CORRECTO (Acierto)' : 'INCORRECTO'),
      sanitizeCell(answer.regulationArticle),
      sanitizeCell(answer.timestamp)
    ];

    // Append to Respuestas_Evaluacion_EnVivo
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${SHEET_RESPUESTAS}!A:J:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          range: `${SHEET_RESPUESTAS}!A:J`,
          majorDimension: 'ROWS',
          values: [row]
        })
      }
    );

    const info = getSavedSpreadsheetInfo();
    if (info) {
      info.lastSyncDate = new Date().toISOString();
      saveSpreadsheetInfo(info);
    }
    return true;
  } catch (err) {
    console.warn('[syncQuizAnswerRealtime] Error escribiendo respuesta en Google Sheets:', err);
    return false;
  }
};
