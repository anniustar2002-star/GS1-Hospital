import { useState } from 'react'
import { mainPhases, supplyBranch } from '../data/cycle'
import type { CyclePhase } from '../types'
import { PhaseModal } from './PhaseModal'

function Arrow() {
  return (
    <div className="flex justify-center py-1 text-slate-300">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v16M12 19l-6-6M12 19l6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function PhaseCard({ phase, onClick, compact }: { phase: CyclePhase; onClick: () => void; compact?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-xl text-white ${phase.color} ${
            compact ? 'h-9 w-9 text-lg' : 'h-11 w-11 text-xl'
          }`}
        >
          {phase.icon}
        </span>
        <div>
          <p className={`font-bold text-slate-900 ${compact ? 'text-sm' : 'text-base'}`}>{phase.title}</p>
          {!compact && <p className="text-xs text-slate-500">{phase.actor}</p>}
        </div>
      </div>
    </button>
  )
}

export function CycleFlow() {
  const [active, setActive] = useState<CyclePhase | null>(null)
  const [step1, step2, step3, step4, step5, step6] = mainPhases

  return (
    <div className="mx-auto max-w-md">
      <PhaseCard phase={step1} onClick={() => setActive(step1)} />
      <Arrow />
      <PhaseCard phase={step2} onClick={() => setActive(step2)} />
      <Arrow />
      <PhaseCard phase={step3} onClick={() => setActive(step3)} />
      <Arrow />

      <div className="my-1 rounded-2xl bg-indigo-50 p-3 ring-1 ring-indigo-100">
        <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-indigo-500">
          🚚 De dónde viene el medicamento
        </p>
        <div>
          {supplyBranch.map((b, i) => (
            <div key={b.id}>
              <PhaseCard phase={b} onClick={() => setActive(b)} compact />
              {i < supplyBranch.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>
      <Arrow />

      <PhaseCard phase={step4} onClick={() => setActive(step4)} />
      <Arrow />
      <PhaseCard phase={step5} onClick={() => setActive(step5)} />
      <Arrow />
      <PhaseCard phase={step6} onClick={() => setActive(step6)} />

      {active && <PhaseModal phase={active} onClose={() => setActive(null)} />}
    </div>
  )
}
