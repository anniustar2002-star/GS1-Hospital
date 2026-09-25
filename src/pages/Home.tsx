import { CycleFlow } from '../components/CycleFlow'

export function Home() {
  return (
    <div className="mx-auto w-full max-w-[1800px] px-10 py-12">
      <div className="mb-6 flex justify-start">
        <img src="/logos/gs1-logo-color.png" alt="GS1" className="h-24 w-auto object-contain sm:h-28" />
      </div>

      <header className="mb-8 text-center">
        <p className="mb-2 inline-block rounded-full bg-[#00B6DE]/10 px-6 py-2 text-2xl font-extrabold uppercase tracking-wide text-[#00B6DE] sm:text-3xl">
          GS1 Health Center
        </p>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Descubre cómo los estándares GS1 cuidan al paciente
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          El recorrido de un paciente, desde que ingresa hasta que se le da de alta. Cada cuadro puede tocarse
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
