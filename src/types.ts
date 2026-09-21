export type GS1Standard = 'GTIN' | 'SSCC' | 'GLN' | 'LOTE' | 'SERIE' | 'GSRN' | 'CADUCIDAD'

export interface CapturedField {
  label: string
  value: string
}

export interface CyclePhase {
  id: string
  order: number
  title: string
  icon: string
  color: string
  actor: string
  description: string
  standards: GS1Standard[]
  scanLabel: string
  capturedFields: CapturedField[]
  alert?: string
  heroImage?: string
  /** Códigos válidos para este paso (los que se imprimieron para el evento). */
  expectedCodes: string[]
  /** Si es true, hay que escanear TODOS los códigos de expectedCodes (en cualquier orden). */
  requireAll?: boolean
}
