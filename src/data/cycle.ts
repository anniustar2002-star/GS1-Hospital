import type { CyclePhase } from '../types'

// Código real de la unidosis: GS1-128 con GTIN (01) + Caducidad (17) + Lote (10) + Serie (21).
// Es el mismo empaque físico, así que se escanea igual en Farmacia, Enfermería y Administración.
const UNIDOSIS_CODE = '(01)07501234567895(17)271231(10)L2A4098(21)88213'

// El ciclo principal del paciente: ingresa, se le atiende, se le administra
// tratamiento y se le da de alta.
export const mainPhases: CyclePhase[] = [
  {
    id: 'emergencia',
    order: 1,
    title: 'Sala de Emergencia',
    icon: '🚑',
    color: 'bg-rose-500',
    actor: 'Personal de urgencias',
    description:
      'El paciente ingresa al hospital. Se genera un identificador único de paciente (GSRN) que lo acompañará durante todo el episodio clínico.',
    standards: ['GSRN'],
    scanLabel: 'Registrar ingreso del paciente',
    capturedFields: [
      { label: 'Identificador de paciente', value: 'GSRN 8412039951002' },
      { label: 'Motivo de ingreso', value: 'Urgencia general' },
    ],
    heroImage: '/illustrations/emergencia.svg',
    expectedCodes: ['GSRN:8412039951002'],
  },
  {
    id: 'triaje',
    order: 2,
    title: 'Ingreso / Triaje',
    icon: '🩺',
    color: 'bg-amber-500',
    actor: 'Enfermería de triaje',
    description:
      'Se evalúan los signos vitales y se prioriza la atención. Todo queda vinculado al identificador del paciente, sin transcripción manual.',
    standards: ['GSRN'],
    scanLabel: 'Escanear pulsera en triaje',
    capturedFields: [
      { label: 'Constantes', value: 'PA 128/82 · FC 88 · Temp 37.1°C' },
      { label: 'Prioridad', value: 'Nivel 2 — atención prioritaria' },
    ],
    heroImage: '/illustrations/triaje.svg',
    expectedCodes: ['GSRN:8412039951002'],
  },
  {
    id: 'habitacion',
    order: 3,
    title: 'Habitación',
    icon: '🛏️',
    color: 'bg-sky-500',
    actor: 'Camillero / Enfermería',
    description:
      'El paciente es trasladado a una habitación y cama específica, identificada con su propio código de ubicación (GLN).',
    standards: ['GSRN', 'GLN'],
    scanLabel: 'Escanear cama asignada',
    capturedFields: [
      { label: 'Habitación', value: '302 · Cama B' },
      { label: 'Ubicación (GLN)', value: '7501234009981' },
    ],
    heroImage: '/illustrations/habitacion.png',
    expectedCodes: ['7501234009981'],
  },
  {
    id: 'enfermeria',
    order: 4,
    title: 'Enfermería',
    icon: '💉',
    color: 'bg-emerald-500',
    actor: 'Enfermería',
    description:
      'Enfermería recibe la unidosis ya preparada y escanea su código GS1-128, que trae junto el GTIN, la caducidad, el lote y el número de serie. Antes de llegar aquí, el medicamento recorrió su propia cadena de suministro (toca las cajas de abajo para verla).',
    standards: ['GTIN', 'CADUCIDAD', 'LOTE', 'SERIE'],
    scanLabel: 'Escanear unidosis recibida',
    capturedFields: [
      { label: 'Medicamento (GTIN)', value: '07501234567895' },
      { label: 'Caducidad', value: '31/12/2027' },
      { label: 'Lote', value: 'L2A4098' },
      { label: 'Serie', value: '88213' },
    ],
    heroImage: '/illustrations/enfermeria.png',
    expectedCodes: [UNIDOSIS_CODE],
  },
  {
    id: 'administracion',
    order: 5,
    title: 'Administración al paciente',
    icon: '✅',
    color: 'bg-emerald-600',
    actor: 'Enfermería',
    description:
      'Antes de administrar, se escanean la pulsera del paciente y el medicamento: el sistema verifica los 5 correctos (paciente, medicamento, dosis, vía y hora).',
    standards: ['GTIN', 'GSRN', 'LOTE'],
    scanLabel: 'Escanear pulsera + medicamento',
    capturedFields: [{ label: 'Verificación', value: '✔ Paciente, dosis, vía y hora correctos' }],
    alert: 'Si algo no coincide, el sistema bloquea la administración y alerta a enfermería antes de que ocurra el error.',
    heroImage: '/illustrations/administracion.png',
    expectedCodes: ['GSRN:8412039951002', UNIDOSIS_CODE],
    requireAll: true,
  },
  {
    id: 'alta',
    order: 6,
    title: 'Alta del paciente',
    icon: '🏠',
    color: 'bg-slate-500',
    actor: 'Sistema clínico',
    description:
      'Se cierra el episodio clínico. Todo el recorrido —desde el ingreso hasta el medicamento administrado— queda registrado para trazabilidad o auditoría.',
    standards: ['GSRN'],
    scanLabel: 'Cerrar episodio clínico',
    capturedFields: [{ label: 'Episodio', value: 'Cerrado — historial completo disponible' }],
    heroImage: '/illustrations/alta.png',
    expectedCodes: ['GSRN:8412039951002'],
  },
]

// Rama de suministro: cómo llega el medicamento hasta enfermería.
// Se une al ciclo principal justo antes de "Enfermería".
export const supplyBranch: CyclePhase[] = [
  {
    id: 'camion-deposito',
    order: 1,
    title: 'Llega el camión al depósito',
    icon: '🚚',
    color: 'bg-indigo-500',
    actor: 'Personal de depósito',
    description: 'El camión del proveedor llega al depósito y descarga los medicamentos e insumos solicitados.',
    standards: ['GTIN', 'SSCC', 'GLN'],
    scanLabel: 'Escanear pallet del camión',
    capturedFields: [
      { label: 'Proveedor (GLN)', value: '7501234000012' },
      { label: 'Unidad logística (SSCC)', value: '750123456000000012' },
    ],
    heroImage: '/illustrations/camion.png',
    expectedCodes: ['750123456000000012'],
  },
  {
    id: 'deposito-despacha',
    order: 2,
    title: 'Depósito despacha a Farmacia',
    icon: '📦',
    color: 'bg-indigo-500',
    actor: 'Personal de depósito',
    description:
      'El depósito registra la recepción de cada producto y despacha lo solicitado hacia la farmacia hospitalaria.',
    standards: ['GTIN', 'LOTE', 'GLN'],
    scanLabel: 'Escanear despacho a farmacia',
    capturedFields: [
      { label: 'Producto', value: 'Paracetamol 500mg (GTIN 07501234567895)' },
      { label: 'Destino (GLN)', value: 'Farmacia Hospitalaria' },
    ],
    heroImage: '/illustrations/almacen.png',
    expectedCodes: ['07501234567895'],
  },
  {
    id: 'farmacia-enfermeria',
    order: 3,
    title: 'Farmacia traslada a Enfermería',
    icon: '💊',
    color: 'bg-indigo-500',
    actor: 'Farmacia hospitalaria',
    description:
      'Farmacia reempaca el medicamento en dosis unitaria y genera un código GS1-128 que combina el GTIN, la fecha de caducidad, el lote y un número de serie propio de esa unidosis.',
    standards: ['GTIN', 'CADUCIDAD', 'LOTE', 'SERIE'],
    scanLabel: 'Escanear unidosis preparada',
    capturedFields: [
      { label: 'Medicamento (GTIN)', value: '07501234567895' },
      { label: 'Caducidad', value: '31/12/2027' },
      { label: 'Lote', value: 'L2A4098' },
      { label: 'Serie', value: '88213' },
    ],
    heroImage: '/illustrations/pharmacy.svg',
    expectedCodes: [UNIDOSIS_CODE],
  },
]
