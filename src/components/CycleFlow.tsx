import { useState } from 'react'
import { mainPhases, supplyBranch } from '../data/cycle'
import type { CyclePhase } from '../types'
import { PhaseModal } from './PhaseModal'

function ArrowRight() {
  return (
    <span className="absolute -left-3 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function ArrowDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
      <path d="M12 4v16M12 20l-5-5M12 20l5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PhaseCard({
  phase,
  onClick,
  compact,
  showArrow,
}: {
  phase: CyclePhase
  onClick: () => void
  compact?: boolean
  showArrow?: boolean
}) {
  return (
    <div className="relative">
      {showArrow && <ArrowRight />}
      <button
        type="button"
        onClick={onClick}
        className={`w-full rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${
          compact ? 'p-2.5' : 'p-3'
        }`}
      >
        <span
          className={`mb-1.5 flex items-center justify-center rounded-xl text-white ${phase.color} ${
            compact ? 'h-8 w-8 text-base' : 'h-10 w-10 text-lg'
          }`}
        >
          {phase.icon}
        </span>
        <p className={`font-bold leading-tight text-slate-900 ${compact ? 'text-xs' : 'text-sm'}`}>{phase.title}</p>
        {!compact && <p className="text-[11px] leading-tight text-slate-500">{phase.actor}</p>}
      </button>
    </div>
  )
}

export function CycleFlow() {
  const [active, setActive] = useState<CyclePhase | null>(null)

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="mx-auto grid w-full grid-cols-6 gap-x-3 gap-y-3 lg:gap-x-5">
        {/* Fila 1: de dónde viene el medicamento — fuera del ciclo del paciente */}
        <div className="col-start-2 col-end-5 row-start-1 rounded-2xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
          <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-indigo-500">
            🚚 De dónde viene el medicamento
          </p>
          <div className="grid grid-cols-3 gap-x-4">
            {supplyBranch.map((b, i) => (
              <PhaseCard key={b.id} phase={b} onClick={() => setActive(b)} compact showArrow={i > 0} />
            ))}
          </div>
        </div>

        {/* Fila 2: flecha que conecta la rama de suministro con Enfermería */}
        <div className="col-start-4 col-end-5 row-start-2 flex justify-center">
          <ArrowDown />
        </div>

        {/* Fila 3: ciclo principal del paciente, de izquierda a derecha */}
        {mainPhases.map((phase, i) => (
          <div key={phase.id} className="row-start-3" style={{ gridColumnStart: i + 1 }}>
            <PhaseCard phase={phase} onClick={() => setActive(phase)} showArrow={i > 0} />
          </div>
        ))}
      </div>

      {active && <PhaseModal phase={active} onClose={() => setActive(null)} />}
    </div>
  )
}
