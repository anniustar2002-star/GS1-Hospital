export interface MapTile {
  id: string
  label: string
  emoji: string
  col: number
  row: number
  active: boolean
  color?: string
  to?: string
}

// Salas con simulación interactiva completa — coinciden con src/data/departments.ts
export const activeTiles: MapTile[] = [
  { id: 'quirofano', label: 'Quirófano', emoji: '🩺', col: 3, row: 1, active: true, color: 'bg-sky-500', to: '/sala/quirofano' },
  {
    id: 'urgencias-admision',
    label: 'Urgencias y Admisión',
    emoji: '🚑',
    col: 4,
    row: 1,
    active: true,
    color: 'bg-rose-500',
    to: '/sala/urgencias-admision',
  },
  {
    id: 'farmacia-hospitalaria',
    label: 'Farmacia Hospitalaria',
    emoji: '💊',
    col: 3,
    row: 2,
    active: true,
    color: 'bg-emerald-500',
    to: '/sala/farmacia-hospitalaria',
  },
  { id: 'banco-sangre', label: 'Banco de Sangre', emoji: '🩸', col: 4, row: 2, active: true, color: 'bg-red-500', to: '/sala/banco-sangre' },
]

// Salas decorativas: dan contexto de "hospital completo", pero aún no tienen simulación
export const lockedTiles: MapTile[] = [
  { id: 'deposito', label: 'Depósito', emoji: '📦', col: 1, row: 2, active: false },
  { id: 'esterilizacion', label: 'Central de Esterilización', emoji: '🧼', col: 2, row: 1, active: false },
  { id: 'radiologia', label: 'Radiología', emoji: '📡', col: 2, row: 2, active: false },
  { id: 'laboratorio', label: 'Laboratorio', emoji: '🧪', col: 2, row: 3, active: false },
  { id: 'instalaciones', label: 'Propiedades e Instalaciones', emoji: '🛠️', col: 3, row: 3, active: false },
  { id: 'mortuorio', label: 'Mortuorio', emoji: '⚰️', col: 4, row: 3, active: false },
]

export const allTiles: MapTile[] = [...lockedTiles, ...activeTiles]
