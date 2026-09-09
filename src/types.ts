export type GS1Standard = 'GTIN' | 'SSCC' | 'GLN' | 'LOTE' | 'SERIE' | 'GSRN'

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
}
