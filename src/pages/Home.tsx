import { CycleFlow } from '../components/CycleFlow'

export function Home() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-10 py-12">
      <div className="mb-6 flex justify-start">
        <img src="/logos/gs1-logo-color.png" alt="GS1" className="h-24 w-auto object-contain sm:h-28" />
      </div>

      <header className="mb-8 text-center">
        <p className="mb-2 inline-block rounded-full bg-blue-50 px-5 py-1.5 text-lg font-bold uppercase tracking-wide text-blue-700">
          GS1 Health Center
        </p>
        <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Descubre cómo los estándares GS1 cuidan al paciente
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Sigue el recorrido de un paciente, desde que ingresa hasta que se le da de alta. Toca cualquier cuadro
          para ver qué estándar GS1 se usa en ese momento.
        </p>
      </header>

      <CycleFlow />

      <footer className="mt-16 text-center text-xs text-slate-400">
        Demostración educativa inspirada en los procesos hospitalarios de GS1 — pensada para presentarse en stand.
      </footer>
    </div>
  )
}
