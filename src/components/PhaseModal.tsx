import { useEffect, useRef, useState } from 'react'
import type { CyclePhase } from '../types'
import { StandardBadge } from './StandardBadge'

export function PhaseModal({ phase, onClose }: { phase: CyclePhase; onClose: () => void }) {
  const [matched, setMatched] = useState<string[]>([])
  const [listening, setListening] = useState(false)
  const [lastCode, setLastCode] = useState<string | null>(null)
  const [scanError, setScanError] = useState<string | null>(null)
  const [liveValue, setLiveValue] = useState('')
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

  useEffect(() => {
    if (listening) inputRef.current?.focus()
  }, [listening])

  const startListening = () => {
    if (scanned) return
    setListening(true)
    setScanError(null)
  }

  const tryCode = (raw: string) => {
    const code = raw.trim()
    if (!code) return
    setLastCode(code)

    const normalized = code.toUpperCase()
    const hit = phase.expectedCodes.find(
      (c) => c.toUpperCase() === normalized && !matched.includes(c),
    )

    if (!hit) {
      setScanError('Ese código no corresponde a este paso. Intenta escanear el correcto.')
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

  const stillMissing = needsAll ? phase.expectedCodes.length - matched.length : scanned ? 0 : 1

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
              <div className="flex flex-col items-center gap-3 py-2 text-center">
                {listening && (
                  <input
                    ref={inputRef}
                    type="text"
                    value={liveValue}
                    onChange={(e) => setLiveValue(e.target.value)}
                    placeholder="Esperando el código…"
                    className="w-full max-w-xs rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-center font-mono text-sm tracking-wide text-slate-800 shadow-inner focus:border-slate-400 focus:outline-none"
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
                  />
                )}

                {!listening ? (
                  <button
                    type="button"
                    onClick={startListening}
                    className={`flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold text-white shadow transition active:scale-95 ${phase.color}`}
                  >
                    <span className="text-lg">🔫</span>
                    {phase.scanLabel}
                  </button>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-slate-100 text-2xl">
                      🔫
                    </span>
                    <p className="text-sm font-semibold text-slate-700">Apunta y dispara el lector…</p>
                    {needsAll && matched.length > 0 && (
                      <p className="text-xs font-medium text-emerald-600">
                        {matched.length} de {phase.expectedCodes.length} códigos escaneados — falta {stillMissing}
                      </p>
                    )}
                  </div>
                )}

                {scanError ? (
                  <p className="text-xs font-semibold text-red-600">
                    ✕ {scanError}
                    {lastCode && <span className="ml-1 font-mono text-red-400">({lastCode})</span>}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    {listening
                      ? 'Esperando la señal de la pistola de código de barras / QR'
                      : 'Toca el botón y luego escanea con la pistola lectora'}
                  </p>
                )}

                {listening && (
                  <button
                    type="button"
                    onClick={simulateWithoutScanner}
                    className="text-xs font-medium text-slate-400 underline"
                  >
                    ¿Sin lector a la mano? Simular escaneo correcto
                  </button>
                )}
              </div>
            ) : (
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                  <span>✔</span> Escaneo capturado correctamente
                </p>
                {lastCode && (
                  <p className="mb-2 break-all font-mono text-xs text-slate-400">{lastCode}</p>
                )}
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
