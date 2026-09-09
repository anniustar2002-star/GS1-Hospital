import { useState } from 'react'
import type { GS1Standard } from '../types'

const EXPLANATIONS: Record<GS1Standard, string> = {
  GTIN: 'GTIN — Número Global de Artículo Comercial. Identifica de forma única el producto (qué es).',
  SSCC: 'SSCC — Código Seriado de Contenedor de Envío. Identifica una unidad logística, como una caja o pallet.',
  GLN: 'GLN — Número Global de Localización. Identifica un lugar físico o entidad, como el proveedor o una sala.',
  LOTE: 'Número de lote — Identifica el grupo de producción del artículo, clave para caducidad y recall.',
  SERIE: 'Número de serie — Identifica una unidad individual específica del producto.',
  GSRN: 'GSRN — Número Global de Relación de Servicio. Identifica de forma única a una persona, como un paciente.',
}

export function StandardBadge({ code }: { code: GS1Standard }) {
  const [open, setOpen] = useState(false)

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-amber-800 hover:bg-amber-100"
      >
        {code}
      </button>
      {open && (
        <div className="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg bg-slate-900 p-2.5 text-xs text-white shadow-lg">
          {EXPLANATIONS[code]}
          <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-slate-900" />
        </div>
      )}
    </span>
  )
}
