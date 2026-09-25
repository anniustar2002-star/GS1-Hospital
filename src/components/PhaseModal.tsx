import { useEffect, useRef, useState } from 'react'
import type { CyclePhase } from '../types'
import { StandardBadge } from './StandardBadge'

export function PhaseModal({ phase, onClose }: { phase: CyclePhase; onClose: () => void }) {
  const [matched, setMatched] = useState<string[]>([])
  const [liveValue, setLiveValue] = useState('')
  const [lastCode, setLastCode] = useState<string | null>(null)
  const [scanError, setScanError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const needsAll = Boolean(phase.requireAll)
  const scanned = needsAll ? matched.length >= phase.expectedCodes.length : matched.length > 0

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Escucha de inmediato al abrir la ventana — no hace falta tocar un botón antes.
  useEffect(() => {
    if (!scanned) inputRef.current?.focus()
  }, [scanned])

  const tryCode = (raw: string) => {
    const code = raw.trim()
    if (!code) return
    setLastCode(code)

    const normalized = code.toUpperCase()
    const hit = phase.expectedCodes.find(
      (c) => c.toUpperCase() === normalized && !matched.includes(c),
    )

    if (!hit) {
      setScanError('Ese código no corresponde a este paso. Debe escanearse el código correcto.')
      window.setTimeout(() => setScanError(null), 2200)
      return
    }

    setScanError(null)
    setMatched((prev) => [...prev, hit])
  }

  const handleGunInput = () => {
    tryCode(liveValue)
    setLiveValue('')
  }

  const simulateWithoutScanner = () => {
    const missing = phase.expectedCodes.find((c) => !matched.includes(c))
    if (missing) tryCode(missing)
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
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-10">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className={`flex h-14 w-14 items-center justify-center rounded-xl text-3xl text-white ${phase.color}`}>
                {phase.icon}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-400">{phase.actor}</p>
                <h2 className="text-2xl font-extrabold text-slate-900">{phase.title}</h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              aria-label="Cerrar"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          <p className="mt-4 text-base text-slate-600">{phase.description}</p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            {phase.standards.map((s) => (
              <StandardBadge key={s} code={s} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl border-2 border-dashed border-slate-200 p-7">
            {!scanned ? (
              <div className="flex flex-col items-center gap-5 py-2 text-center">
                <div className={`w-full rounded-xl px-5 py-4 text-white ${phase.color}`}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Qué escanear aquí</p>
                  <p className="text-lg font-extrabold">{phase.scanLabel}</p>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={liveValue}
                  onChange={(e) => setLiveValue(e.target.value)}
                  placeholder="Esperando el código…"
                  className="w-full max-w-md rounded-xl border-2 border-slate-300 bg-white px-5 py-4 text-center font-mono text-lg tracking-wide text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleGunInput()
                    }
                  }}
                  onBlur={() => {
                    window.setTimeout(() => inputRef.current?.focus(), 50)
                  }}
                  autoComplete="off"
                  autoFocus
                />

                {needsAll && phase.expectedCodes.length > 1 && (
                  <ul className="flex flex-col gap-2">
                    {phase.expectedCodes.map((code, i) => {
                      const done = matched.includes(code)
                      const label = phase.codeLabels?.[i] ?? `Código ${i + 1}`
                      return (
                        <li
                          key={code}
                          className={`flex items-center gap-2.5 text-base font-semibold ${
                            done ? 'text-emerald-600' : 'text-slate-400'
                          }`}
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-sm text-white ${
                              done ? 'bg-emerald-500' : 'bg-slate-300'
                            }`}
                          >
                            {done ? '✔' : i + 1}
                          </span>
                          {label}
                        </li>
                      )
                    })}
                  </ul>
                )}

                {scanError ? (
                  <p className="text-base font-semibold text-red-600">
                    ✕ {scanError}
                    {lastCode && <span className="ml-1 block break-all font-mono text-sm text-red-400">({lastCode})</span>}
                  </p>
                ) : (
                  <p className="text-base text-slate-400">
                    Esperando la señal de la pistola de código de barras / QR
                  </p>
                )}

                <button
                  type="button"
                  onClick={simulateWithoutScanner}
                  className="text-base font-medium text-slate-400 underline"
                >
                  ¿Sin lector a la mano? Simular escaneo correcto
                </button>
              </div>
            ) : (
              <div>
                <p className="mb-2 flex items-center gap-2 text-base font-semibold text-emerald-600">
                  <span>✔</span> Escaneo capturado correctamente
                </p>
                {lastCode && <p className="mb-3 break-all font-mono text-xs text-slate-400">{lastCode}</p>}
                <dl className="grid gap-3 sm:grid-cols-2">
                  {phase.capturedFields.map((f) => (
                    <div key={f.label} className="rounded-lg bg-slate-50 px-4 py-3">
                      <dt className="text-xs uppercase tracking-wide text-slate-400">{f.label}</dt>
                      <dd className="font-mono text-base text-slate-800">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                {phase.alert && (
                  <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">⚠️ {phase.alert}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
