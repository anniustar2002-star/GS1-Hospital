export type GS1Standard = 'GTIN' | 'SSCC' | 'GLN' | 'LOTE' | 'SERIE' | 'GSRN'

export interface CapturedField {
  label: string
  value: string
}

export interface ProcessStep {
  id: string
  title: string
  actor: string
  description: string
  scanLabel: string
  standards: GS1Standard[]
  capturedFields: CapturedField[]
  alert?: string
}

export interface ProcessDef {
  id: string
  title: string
  summary: string
  steps: ProcessStep[]
}

export interface Department {
  id: string
  name: string
  shortName: string
  emoji: string
  color: string
  accent: string
  tagline: string
  description: string
  gridArea: string
  processes: ProcessDef[]
}
