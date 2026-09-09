import { useState } from 'react'
import { mainPhases, supplyBranch } from '../data/cycle'
import type { CyclePhase } from '../types'
import { PhaseModal } from './PhaseModal'

function ArrowRight() {
  return (
    <span className="absolute -left-4 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-slate-100 text-slate-400">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function ArrowDown() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
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
        className="flex w-full flex-col items-center bg-transparent text-center transition hover:-translate-y-1"
      >
        {phase.heroImage ? (
          <img
            src={phase.heroImage}
            alt=""
            className={`w-full object-contain drop-shadow-md ${compact ? 'h-32' : 'h-44'}`}
          />
        ) : (
          <span
            className={`flex items-center justify-center rounded-2xl text-white shadow-md ${phase.color} ${
              compact ? 'h-32 w-32 text-5xl' : 'h-44 w-44 text-6xl'
            }`}
          >
            {phase.icon}
          </span>
        )}
        <p className={`mt-2 font-bold leading-tight text-slate-900 ${compact ? 'text-sm' : 'text-base'}`}>{phase.title}</p>
        {!compact && <p className="text-xs leading-tight text-slate-500">{phase.actor}</p>}
      </button>
    </div>
  )
}

export function CycleFlow() {
  const [active, setActive] = useState<CyclePhase | null>(null)

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* De dónde viene el medicamento — fuera del ciclo del paciente, centrado arriba */}
      <div className="w-full max-w-2xl rounded-2xl bg-indigo-50 p-5 ring-1 ring-indigo-100">
        <p className="mb-3 text-center text-sm font-bold uppercase tracking-wide text-indigo-500">
          🚚 De dónde viene el medicamento
        </p>
        <div className="grid grid-cols-3 gap-x-5">
          {supplyBranch.map((b, i) => (
            <PhaseCard key={b.id} phase={b} onClick={() => setActive(b)} compact showArrow={i > 0} />
          ))}
        </div>
      </div>

      <ArrowDown />

      {/* Ciclo principal del paciente, de izquierda a derecha */}
      <div className="grid w-full grid-cols-6 gap-x-5">
        {mainPhases.map((phase, i) => (
          <PhaseCard key={phase.id} phase={phase} onClick={() => setActive(phase)} showArrow={i > 0} />
        ))}
      </div>

      {active && <PhaseModal phase={active} onClose={() => setActive(null)} />}
    </div>
  )
}
