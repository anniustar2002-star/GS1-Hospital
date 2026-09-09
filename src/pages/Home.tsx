import { HospitalSceneMap } from '../components/HospitalSceneMap'

export function Home() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6 text-center">
        <p className="mb-2 inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
          GS1 Hospital · Tour interactivo
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Descubre cómo los estándares GS1 cuidan al paciente
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Toca una sala del hospital y vive, paso a paso, cómo un simple código de barras conecta cada producto,
          cada dosis y cada paciente con seguridad.
        </p>
      </header>

      <HospitalSceneMap />

      <p className="mt-8 text-center text-xs text-slate-400">
        Toca el quirófano o la recepción en el mapa, o las salas de farmacia y banco de sangre a los costados.
      </p>

      <footer className="mt-16 text-center text-xs text-slate-400">
        Demostración educativa inspirada en los procesos hospitalarios de GS1 — pensada para presentarse en stand.
      </footer>
    </div>
  )
}
