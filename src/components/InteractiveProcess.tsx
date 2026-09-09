import { useMemo, useState } from 'react'
import type { ProcessDef } from '../types'
import { StandardBadge } from './StandardBadge'

interface LogEntry {
  stepTitle: string
  time: string
}

export function InteractiveProcess({ process, accent }: { process: ProcessDef; accent: string }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [scanned, setScanned] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [log, setLog] = useState<LogEntry[]>([])

  const step = process.steps[stepIndex]
  const isLast = stepIndex === process.steps.length - 1
  const progress = useMemo(
    () => Math.round(((stepIndex + (scanned ? 1 : 0)) / process.steps.length) * 100),
    [stepIndex, scanned, process.steps.length],
  )

  const handleScan = () => {
    if (scanned || scanning) return
    setScanning(true)
    window.setTimeout(() => {
      setScanning(false)
      setScanned(true)
      setLog((prev) => [
        ...prev,
        { stepTitle: step.title, time: new Date().toLocaleTimeString('es-MX', { hour12: false }) },
      ])
    }, 650)
  }

  const goNext = () => {
    if (!scanned) return
    if (isLast) return
    setStepIndex((i) => i + 1)
    setScanned(false)
  }

  const goPrev = () => {
    if (stepIndex === 0) return
    setStepIndex((i) => i - 1)
    setScanned(true)
  }

  const restart = () => {
    setStepIndex(0)
    setScanned(false)
    setScanning(false)
    setLog([])
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
          <span>
            Paso {stepIndex + 1} de {process.steps.length}
          </span>
          <span>{progress}% completado</span>
        </div>
        <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${accent}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{step.actor}</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-900">{step.title}</h3>
        <p className="mt-3 text-slate-600">{step.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {step.standards.map((s) => (
            <StandardBadge key={s} code={s} />
          ))}
        </div>

        <div className="mt-6 rounded-xl border-2 border-dashed border-slate-200 p-5">
          {!scanned ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <button
                type="button"
                onClick={handleScan}
                disabled={scanning}
                className={`flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow transition active:scale-95 disabled:opacity-70 ${accent}`}
              >
                <span className="text-xl">📷</span>
                {scanning ? 'Escaneando…' : step.scanLabel}
              </button>
              <p className="text-xs text-slate-400">Toca el botón para simular el escaneo del código GS1</p>
            </div>
          ) : (
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-600">
                <span>✔</span> Escaneo capturado correctamente
              </p>
              <dl className="grid gap-2 sm:grid-cols-2">
                {step.capturedFields.map((f) => (
                  <div key={f.label} className="rounded-lg bg-slate-50 px-3 py-2">
                    <dt className="text-[11px] uppercase tracking-wide text-slate-400">{f.label}</dt>
                    <dd className="font-mono text-sm text-slate-800">{f.value}</dd>
                  </div>
                ))}
              </dl>
              {step.alert && (
                <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">⚠️ {step.alert}</p>
              )}
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={goPrev}
            disabled={stepIndex === 0}
            className="rounded-full px-4 py-2 text-sm font-medium text-slate-500 hover:bg-slate-100 disabled:opacity-40"
          >
            ← Anterior
          </button>
          {isLast && scanned ? (
            <button
              type="button"
              onClick={restart}
              className={`rounded-full px-6 py-2 text-sm font-semibold text-white ${accent}`}
            >
              Reiniciar demostración
            </button>
          ) : (
            <button
              type="button"
              onClick={goNext}
              disabled={!scanned}
              className={`rounded-full px-6 py-2 text-sm font-semibold text-white transition disabled:opacity-40 ${accent}`}
            >
              Siguiente paso →
            </button>
          )}
        </div>
      </div>

      <aside className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
        <h4 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-300">
          Registro de trazabilidad
        </h4>
        <p className="mb-4 text-xs text-slate-400">Qué · Dónde · Cuándo · Por qué (evento tipo EPCIS)</p>
        {log.length === 0 ? (
          <p className="text-sm text-slate-500">Aún no hay eventos. Escanea el primer paso para comenzar.</p>
        ) : (
          <ol className="space-y-3">
            {log.map((entry, i) => (
              <li key={`${entry.stepTitle}-${i}`} className="border-l-2 border-emerald-400 pl-3">
                <p className="text-xs text-slate-400">{entry.time}</p>
                <p className="text-sm font-medium">{entry.stepTitle}</p>
              </li>
            ))}
          </ol>
        )}
      </aside>
    </div>
  )
}
