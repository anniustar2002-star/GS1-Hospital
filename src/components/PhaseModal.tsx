import { useEffect, useState } from 'react'
import type { CyclePhase } from '../types'
import { StandardBadge } from './StandardBadge'

export function PhaseModal({ phase, onClose }: { phase: CyclePhase; onClose: () => void }) {
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleScan = () => {
    if (scanned || scanning) return
    setScanning(true)
    window.setTimeout(() => {
      setScanning(false)
      setScanned(true)
    }, 600)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={phase.title}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {phase.heroImage && (
          <div className="flex h-48 w-full items-center justify-center rounded-t-2xl bg-slate-50 p-3">
            <img src={phase.heroImage} alt={phase.title} className="h-full w-full object-contain" />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl text-2xl text-white ${phase.color}`}>
                {phase.icon}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{phase.actor}</p>
                <h2 className="text-xl font-extrabold text-slate-900">{phase.title}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-600">{phase.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {phase.standards.map((s) => (
              <StandardBadge key={s} code={s} />
            ))}
          </div>

          <div className="mt-5 rounded-xl border-2 border-dashed border-slate-200 p-4">
            {!scanned ? (
              <div className="flex flex-col items-center gap-2 py-2 text-center">
                <button
                  type="button"
                  onClick={handleScan}
                  disabled={scanning}
                  className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white shadow transition active:scale-95 disabled:opacity-70 ${phase.color}`}
                >
                  <span className="text-lg">📷</span>
                  {scanning ? 'Escaneando…' : phase.scanLabel}
                </button>
                <p className="text-xs text-slate-400">Toca para simular el escaneo del código GS1</p>
              </div>
            ) : (
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span>✔</span> Escaneo capturado correctamente
                </p>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {phase.capturedFields.map((f) => (
                    <div key={f.label} className="rounded-lg bg-slate-50 px-3 py-2">
                      <dt className="text-[11px] uppercase tracking-wide text-slate-400">{f.label}</dt>
                      <dd className="font-mono text-sm text-slate-800">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {phase.alert && (
                  <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">⚠️ {phase.alert}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
