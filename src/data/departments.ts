import type { Department } from '../types'

export const departments: Department[] = [
  {
    id: 'farmacia-hospitalaria',
    name: 'Farmacia Hospitalaria',
    shortName: 'Farmacia',
    emoji: '💊',
    color: 'bg-emerald-500',
    accent: 'text-emerald-600',
    tagline: 'Del pedido al paciente, sin errores',
    description:
      'La farmacia hospitalaria recibe, almacena, prepara en unidosis y dispensa cada medicamento verificando siempre que llegue el producto correcto al paciente correcto.',
    gridArea: 'farmacia',
    processes: [
      {
        id: 'dispensacion-segura',
        title: 'Dispensación segura de medicamentos',
        summary:
          'Sigue un medicamento desde que entra al hospital hasta que se administra al paciente, verificando en cada paso con estándares GS1.',
        steps: [
          {
            id: 'recepcion',
            title: 'Recepción del pedido',
            actor: 'Auxiliar de farmacia',
            description:
              'Al llegar el pedido del proveedor, se escanea la caja para confirmar que el contenido coincide con lo solicitado antes de aceptarlo en el inventario.',
            scanLabel: 'Escanear caja del proveedor',
            standards: ['GTIN', 'SSCC', 'GLN'],
            capturedFields: [
              { label: 'Producto (GTIN)', value: '07501234567895' },
              { label: 'Lote', value: 'L2A4098' },
              { label: 'Caducidad', value: '2027-03-31' },
              { label: 'Proveedor (GLN)', value: '7501234000012' },
            ],
          },
          {
            id: 'almacenamiento',
            title: 'Almacenamiento con rotación FEFO',
            actor: 'Sistema de gestión de inventario',
            description:
              'El sistema ubica el producto y prioriza automáticamente los lotes que caducan primero (FEFO) para la próxima dispensación.',
            scanLabel: 'Confirmar ubicación en anaquel',
            standards: ['GTIN', 'LOTE'],
            capturedFields: [
              { label: 'Ubicación', value: 'Anaquel B-12' },
              { label: 'Regla aplicada', value: 'FEFO (primero en caducar, primero en salir)' },
            ],
          },
          {
            id: 'validacion-receta',
            title: 'Validación contra la prescripción',
            actor: 'Farmacéutico clínico',
            description:
              'Antes de preparar la dosis, se escanea el medicamento y se coteja automáticamente contra la orden médica electrónica del paciente.',
            scanLabel: 'Escanear medicamento vs. receta',
            standards: ['GTIN', 'GLN'],
            capturedFields: [
              { label: 'Paciente', value: 'Hab. 302 · Cama B' },
              { label: 'Prescripción', value: 'Coincide ✔ — dosis, vía y horario correctos' },
            ],
          },
          {
            id: 'unidosis',
            title: 'Preparación en unidosis',
            actor: 'Técnico de farmacia',
            description:
              'El medicamento se reempaca en una dosis individual con un nuevo código que conserva el enlace al lote y caducidad de origen.',
            scanLabel: 'Generar código de unidosis',
            standards: ['GTIN', 'LOTE', 'SERIE'],
            capturedFields: [
              { label: 'Nuevo identificador', value: 'UD-88213 (enlazado a L2A4098)' },
              { label: 'Trazabilidad', value: 'Se conserva el lote y caducidad originales' },
            ],
          },
          {
            id: 'administracion',
            title: 'Administración: los 5 correctos',
            actor: 'Enfermería',
            description:
              'Antes de administrar, se escanea la pulsera del paciente y la unidosis. El sistema verifica paciente, medicamento, dosis, vía y horario correctos.',
            scanLabel: 'Escanear pulsera + unidosis',
            standards: ['GTIN', 'GLN'],
            capturedFields: [
              { label: 'Verificación', value: '✔ Paciente correcto' },
              { label: 'Verificación', value: '✔ Medicamento, dosis, vía y hora correctos' },
            ],
            alert:
              'Si algo no coincide, el sistema bloquea la administración y alerta a enfermería antes de que ocurra el error.',
          },
        ],
      },
    ],
  },
  {
    id: 'quirofano',
    name: 'Quirófano',
    shortName: 'Quirófano',
    emoji: '🩺',
    color: 'bg-sky-500',
    accent: 'text-sky-600',
    tagline: 'Cada implante, vinculado a un paciente',
    description:
      'En el quirófano, cada instrumento e implante se verifica por escaneo para garantizar que el material correcto llegue al paciente correcto, con trazabilidad total ante una alerta de seguridad.',
    gridArea: 'quirofano',
    processes: [
      {
        id: 'trazabilidad-implantes',
        title: 'Trazabilidad de implantes y material quirúrgico',
        summary:
          'Desde la verificación del set quirúrgico hasta la trazabilidad post-operatoria del implante utilizado.',
        steps: [
          {
            id: 'verificacion-set',
            title: 'Verificación del set quirúrgico',
            actor: 'Enfermería instrumentista',
            description:
              'Se escanean las cajas de instrumental esterilizado para confirmar que el lote de esterilización está vigente antes de abrir el set.',
            scanLabel: 'Escanear set esterilizado',
            standards: ['GTIN', 'LOTE'],
            capturedFields: [
              { label: 'Set', value: 'Set de cadera primaria' },
              { label: 'Lote de esterilización', value: 'EST-0921' },
              { label: 'Vigencia', value: 'Válido hasta 2026-10-02' },
            ],
          },
          {
            id: 'seleccion-implante',
            title: 'Selección del implante',
            actor: 'Cirujano',
            description:
              'Se escanea el implante (talla y lado) antes de abrir el empaque estéril, evitando errores de talla en pleno procedimiento.',
            scanLabel: 'Escanear implante',
            standards: ['GTIN', 'LOTE', 'SERIE'],
            capturedFields: [
              { label: 'Implante', value: 'Vástago femoral, talla 12, lado derecho' },
              { label: 'Número de serie', value: 'SN-774120' },
            ],
          },
          {
            id: 'vinculacion-paciente',
            title: 'Vinculación al paciente',
            actor: 'Sistema de registro quirúrgico',
            description:
              'El implante escaneado queda vinculado automáticamente al expediente quirúrgico: paciente, cirujano y procedimiento.',
            scanLabel: 'Vincular al expediente',
            standards: ['GTIN', 'GLN'],
            capturedFields: [
              { label: 'Paciente', value: 'Expediente #48213' },
              { label: 'Procedimiento', value: 'Artroplastia total de cadera' },
            ],
          },
          {
            id: 'reposicion',
            title: 'Reposición automática de stock',
            actor: 'Sistema de gestión de inventario',
            description:
              'El consumo del implante descuenta el stock del almacén y, si baja del nivel mínimo, dispara automáticamente un pedido al proveedor.',
            scanLabel: 'Confirmar consumo',
            standards: ['GTIN'],
            capturedFields: [{ label: 'Stock restante', value: '2 unidades — se activó reposición' }],
          },
          {
            id: 'recall',
            title: 'Trazabilidad ante una alerta de seguridad',
            actor: 'Calidad y seguridad del paciente',
            description:
              'Si el fabricante emite una alerta sobre un lote específico, el hospital identifica en segundos qué pacientes lo recibieron.',
            scanLabel: 'Simular búsqueda por lote',
            standards: ['LOTE', 'SERIE'],
            capturedFields: [
              { label: 'Lote consultado', value: 'EST-0921' },
              { label: 'Pacientes afectados', value: '1 identificado en menos de 5 segundos' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'urgencias-admision',
    name: 'Urgencias y Admisión',
    shortName: 'Urgencias',
    emoji: '🚑',
    color: 'bg-rose-500',
    accent: 'text-rose-600',
    tagline: 'Un paciente, un identificador, una historia',
    description:
      'Desde que el paciente llega, se le asigna un identificador único que conecta cada prueba, medicamento y traslado a su expediente clínico.',
    gridArea: 'urgencias',
    processes: [
      {
        id: 'ruta-clinica',
        title: 'Identificación del paciente y ruta clínica',
        summary:
          'Cómo un identificador único de paciente conecta cada paso del episodio de urgencias, del triage al alta.',
        steps: [
          {
            id: 'admision',
            title: 'Admisión del paciente',
            actor: 'Personal de admisión',
            description:
              'Se genera una pulsera con un identificador único de paciente (GSRN) vinculado al episodio clínico que acaba de abrirse.',
            scanLabel: 'Generar pulsera de identificación',
            standards: ['GSRN'],
            capturedFields: [
              { label: 'Identificador de paciente', value: 'GSRN 8412039951002' },
              { label: 'Episodio', value: 'Urgencias · Triage pendiente' },
            ],
          },
          {
            id: 'triage',
            title: 'Triage',
            actor: 'Enfermería de triage',
            description:
              'Se escanea la pulsera en la estación de constantes vitales y los datos se asocian automáticamente al expediente, sin transcripción manual.',
            scanLabel: 'Escanear pulsera en estación',
            standards: ['GSRN'],
            capturedFields: [
              { label: 'Constantes', value: 'PA 128/82 · FC 88 · Temp 37.1°C' },
              { label: 'Prioridad asignada', value: 'Nivel 2 — atención prioritaria' },
            ],
          },
          {
            id: 'muestra',
            title: 'Solicitud de pruebas de laboratorio',
            actor: 'Enfermería',
            description:
              'Cada tubo de muestra recibe un código único que se vincula al paciente y a la orden de laboratorio correspondiente.',
            scanLabel: 'Etiquetar y escanear tubo de muestra',
            standards: ['GSRN', 'SERIE'],
            capturedFields: [
              { label: 'Muestra', value: 'Tubo #TQ-55210' },
              { label: 'Vinculada a', value: 'Expediente del paciente en triage' },
            ],
          },
          {
            id: 'medicacion-urgencia',
            title: 'Medicación de urgencia',
            actor: 'Enfermería',
            description:
              'Antes de administrar cualquier medicamento, se escanean la pulsera del paciente y el medicamento para una verificación cruzada.',
            scanLabel: 'Escanear paciente + medicamento',
            standards: ['GTIN', 'GSRN'],
            capturedFields: [{ label: 'Verificación', value: '✔ Coincide con la indicación médica' }],
          },
          {
            id: 'alta-traslado',
            title: 'Traslado o alta',
            actor: 'Sistema clínico',
            description:
              'El episodio completo queda registrado con cada evento con fecha, hora y responsable, disponible para auditoría o continuidad de cuidado.',
            scanLabel: 'Cerrar episodio',
            standards: ['GSRN'],
            capturedFields: [{ label: 'Episodio', value: 'Cerrado — historial completo disponible' }],
          },
        ],
      },
    ],
  },
  {
    id: 'banco-sangre',
    name: 'Banco de Sangre',
    shortName: 'Banco de Sangre',
    emoji: '🩸',
    color: 'bg-red-500',
    accent: 'text-red-600',
    tagline: 'Trazabilidad "vena a vena"',
    description:
      'Cada unidad de sangre se identifica de forma única desde la donación hasta la transfusión, con doble verificación antes de conectarla al paciente.',
    gridArea: 'banco',
    processes: [
      {
        id: 'vena-a-vena',
        title: 'Del donante al paciente',
        summary:
          'Sigue una unidad de sangre a través de cada control de calidad hasta la transfusión segura, con trazabilidad completa en ambos sentidos.',
        steps: [
          {
            id: 'donacion',
            title: 'Registro de la donación',
            actor: 'Personal de banco de sangre',
            description:
              'Cada unidad donada recibe un identificador único que la acompañará en todo su recorrido, vinculado al donante.',
            scanLabel: 'Registrar unidad donada',
            standards: ['SERIE'],
            capturedFields: [
              { label: 'Unidad', value: 'ISBT 128 · W123424609825' },
              { label: 'Tipo', value: 'Concentrado de glóbulos rojos' },
            ],
          },
          {
            id: 'procesamiento',
            title: 'Procesamiento y análisis',
            actor: 'Laboratorio de banco de sangre',
            description:
              'En cada etapa de análisis y fraccionamiento se escanea la unidad, actualizando su estado en tiempo real.',
            scanLabel: 'Escanear en cada etapa de análisis',
            standards: ['SERIE'],
            capturedFields: [
              { label: 'Estado', value: 'Analizada — apta para uso' },
              { label: 'Grupo sanguíneo', value: 'O positivo' },
            ],
          },
          {
            id: 'almacenamiento-sangre',
            title: 'Almacenamiento controlado',
            actor: 'Sistema de banco de sangre',
            description:
              'La unidad se ubica y su temperatura se monitorea de forma continua, vinculada siempre a su código único.',
            scanLabel: 'Confirmar ubicación y temperatura',
            standards: ['SERIE'],
            capturedFields: [
              { label: 'Ubicación', value: 'Refrigerador 2 · Rack C' },
              { label: 'Temperatura', value: '4.2°C — dentro de rango' },
            ],
          },
          {
            id: 'compatibilidad',
            title: 'Solicitud de compatibilidad',
            actor: 'Laboratorio de banco de sangre',
            description:
              'Se realiza la prueba cruzada entre la unidad y el paciente receptor antes de liberar la unidad para transfusión.',
            scanLabel: 'Escanear unidad + paciente receptor',
            standards: ['SERIE', 'GSRN'],
            capturedFields: [{ label: 'Prueba cruzada', value: '✔ Compatible — unidad liberada' }],
          },
          {
            id: 'transfusion',
            title: 'Transfusión segura',
            actor: 'Enfermería',
            description:
              'Doble verificación por escaneo de la unidad y la pulsera del paciente inmediatamente antes de conectar la transfusión.',
            scanLabel: 'Verificación final antes de transfundir',
            standards: ['SERIE', 'GSRN'],
            capturedFields: [{ label: 'Verificación final', value: '✔ Unidad y paciente coinciden' }],
            alert:
              'Si la unidad no corresponde al paciente, el sistema detiene la transfusión antes de que ocurra el error.',
          },
        ],
      },
    ],
  },
]

export const findDepartment = (id: string) => departments.find((d) => d.id === id)
