# Plan de Implementación: Sincronización en Tiempo Real con Google Sheets en Google Drive

## 1. Visión General del Proyecto
El objetivo es permitir que los datos registrados por los aprendices en el Sistema de Inducción SENA (caracterización sociodemográfica de SofiaPlus, progreso de módulos, respuestas de casos éticos, puntajes de evaluación y certificados) se guarden y sincronicen de manera automática y en tiempo real en una hoja de cálculo alojada en Google Drive.

De acuerdo con las preferencias seleccionadas:
- **Creación de la hoja**: Se creará automáticamente un nuevo libro de Google Sheets en Google Drive ("*SENA - Inducción y Caracterización de Aprendices*") con formato oficial institucional.
- **Sincronización en tiempo real**: Los registros se enviarán a Google Drive inmediatamente cuando el aprendiz guarde su caracterización, apruebe un módulo, responda dilemas del simulador ético o complete la evaluación final.

---

## 2. Configuración de Google Workspace OAuth
Para cumplir con los estándares de seguridad y mínimos privilegios (`workspace-integration`):
1. **Scopes de OAuth requeridos**:
   - `https://www.googleapis.com/auth/drive.file`: Permite crear y acceder únicamente a los archivos creados por la aplicación en Google Drive del usuario (principio de mínimo privilegio; no accede al resto del Drive).
   - `https://www.googleapis.com/auth/spreadsheets`: Permite crear hojas, actualizar celdas, agregar filas y dar formato a las tablas.
2. **Proceso de Aprobación**:
   - Iniciar flujo con la herramienta `set_up_oauth` solicitando confirmación al usuario en la interfaz.
   - Gestión de token Bearer en cliente con almacenamiento en sesión (`sessionStorage`) y detección automática de expiración.

---

## 3. Estructura de la Hoja de Cálculo en Google Drive
El libro contendrá dos pestañas estructuradas con encabezados visuales verdes SENA (#39A900), congelación de primera fila y filtros automáticos:

### Hoja 1: `Aprendices_Caracterizacion`
Diseñada según el estándar de caracterización de aprendices SENA (SofiaPlus):
| Columna | Campo | Descripción |
| :--- | :--- | :--- |
| **A** | `ID Registro` | Identificador único del sistema |
| **B** | `Tipo Documento` | CC, TI, CE, PEP |
| **C** | `Número Documento` | Número de identificación |
| **D** | `Nombres y Apellidos` | Nombre completo del aprendiz |
| **E** | `Correo Institucional` | Correo @soy.sena.edu.co / MiSENA |
| **F** | `Teléfono / Celular` | Contacto principal |
| **G** | `Ficha de Caracterización` | Código de ficha matriculada |
| **H** | `Programa de Formación` | Nombre del programa |
| **I** | `Nivel de Formación` | Tecnólogo, Técnico, Operario, etc. |
| **J** | `Jornada` | Diurna, Nocturna, Mixta, Virtual |
| **K** | `Rol en Ficha` | Aprendiz, Vocero de Ficha, Representante |
| **L** | `Centro de Formación` | Centro SENA asignado |
| **M** | `Regional` | Regional SENA |
| **N** | `Estrato Socioeconómico` | 1 a 6 |
| **O** | `Enfoque Poblacional` | Víctima conflicto, Afrocolombiano, Indígena, etc. |
| **P** | `Género` | Femenino, Masculino, No binario, etc. |
| **Q** | `Fecha de Nacimiento` | AAAA-MM-DD |
| **R** | `EPS / Aseguradora` | Entidad promotora de salud |
| **S** | `Grupo Sanguíneo y RH` | O+, A+, etc. |
| **T** | `Contacto de Emergencia` | Nombre de familiar/acudiente |
| **U** | `Teléfono Emergencia` | Teléfono de contacto de emergencia |
| **V** | `Fecha de Caracterización` | Fecha y hora del registro |
| **W** | `Estado Registro` | Completo / En proceso |

### Hoja 2: `Seguimiento_Induccion`
Monitoreo de avance académico y normativo:
| Columna | Campo | Descripción |
| :--- | :--- | :--- |
| **A** | `Número Documento` | Llave foránea de enlace |
| **B** | `Nombres y Apellidos` | Nombre del aprendiz |
| **C** | `Ficha` | Código de ficha |
| **D** | `Progreso General (%)` | Porcentaje de avance de 0% a 100% |
| **E** | `Módulos Completados` | Identidad, Derechos/Deberes, Casos, FPI, Quiz |
| **F** | `Calificación Evaluación` | Puntaje de la prueba final (0 a 100) |
| **G** | `Estado Inducción` | 'En Progreso' o 'Certificado Aprobado' |
| **H** | `Folio de Certificado` | ID único de certificación SENA |
| **I** | `Fecha de Certificación` | Fecha de expedición |
| **J** | `Última Actividad` | Timestamp de última interacción |

---

## 4. Arquitectura y Componentes a Desarrollar

```
src/
├── services/
│   └── googleSheetsService.ts       <-- Cliente REST para Google Drive v3 y Sheets v4
├── components/
│   ├── GoogleDriveSyncBadge.tsx     <-- Widget en barra superior/dashboard con enlace a Drive y estado
│   ├── ApprenticeCharacterizationModal.tsx <-- Disparador de sync al guardar datos
│   ├── EvaluationQuiz.tsx           <-- Disparador de sync al evaluar y certificar
│   └── InstructorDashboard.tsx      <-- Botón "Abrir Hoja en Drive", métricas de sync y resincronización
└── types/
    └── induction.ts                 <-- Tipos de estado de sincronización y metadatos de Drive
```

### Detalle de Implementación:
1. **`src/services/googleSheetsService.ts`**:
   - `initializeGoogleDriveSheet()`: Verifica si ya existe una hoja registrada en `localStorage`; si no, invoca la API `POST https://sheets.googleapis.com/v4/spreadsheets` creando las dos hojas con formato, encabezados en negrita y color institucional.
   - `syncApprenticeCharacterization(apprentice)`: Busca si el documento del aprendiz ya existe en la hoja (usando `spreadsheets.values.get`). Si existe, actualiza la fila (`spreadsheets.values.update`); si no existe, añade una nueva fila al final (`spreadsheets.values.append`).
   - `syncApprenticeProgress(apprentice)`: Actualiza o añade el registro en la pestaña `Seguimiento_Induccion`.
   - `batchSyncApprentices(apprentices)`: Sincroniza en lote todos los aprendices almacenados localmente.
   - Prevención de inyección de fórmulas: Sanitiza valores que comiencen con `=`, `+`, `-`, `@`.

2. **`src/components/GoogleDriveSyncBadge.tsx`**:
   - Muestra el estado de la hoja: "Sincronizado con Google Drive", "Sincronizando...", o "Desconectado".
   - Botón directo con ícono de Google Drive / Sheets: "*Abrir Hoja de Cálculo en Google Drive*".
   - Botón manual "*Sincronizar ahora*" para enviar cambios pendientes si hubo fallas temporales de red.

3. **Integración en Formularios y Módulos**:
   - En `ApprenticeCharacterizationModal`: al presionar "Guardar y Continuar", se ejecuta la sincronización en segundo plano con notificación toast no intrusiva.
   - En `EvaluationQuiz` y `CertificateView`: al aprobar el examen final o generar el certificado, se sincroniza el folio y la calificación en la hoja `Seguimiento_Induccion`.
   - En `InstructorDashboard`: vista de fichas y aprendices con indicador de estado de sincronización en cada fila y botón para abrir la hoja en Drive.

---

## 5. Plan de Pruebas y Verificación
1. **Verificación de OAuth**: Comprobar que el token se obtiene y autoriza correctamente con los alcances `drive.file` y `spreadsheets`.
2. **Creación Automática del Libro**: Verificar que se crea el archivo en Google Drive del usuario con el nombre institucional y las dos hojas con formato.
3. **Prueba de Caracterización**: Registrar un nuevo aprendiz con todos los datos y verificar que la fila aparezca inmediatamente en `Aprendices_Caracterizacion`.
4. **Prueba de Actualización de Progreso**: Responder y aprobar la evaluación final y verificar la actualización inmediata en `Seguimiento_Induccion`.
5. **Prueba de Idempotencia**: Guardar cambios repetidos en el mismo aprendiz y verificar que actualice la fila existente sin duplicar registros.
6. **Compilación y Linters**: Ejecutar `lint_applet` y `compile_applet` para garantizar cero errores de TypeScript y empaquetado.
