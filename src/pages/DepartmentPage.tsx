import { Link, useParams } from 'react-router-dom'
import { findDepartment } from '../data/departments'
import { InteractiveProcess } from '../components/InteractiveProcess'

export function DepartmentPage() {
  const { id } = useParams<{ id: string }>()
  const dept = id ? findDepartment(id) : undefined

  if (!dept) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <p className="text-slate-600">No se encontró esta sala.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          ← Volver al mapa del hospital
        </Link>
      </div>
    )
  }

  const process = dept.processes[0]

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800">
        ← Volver al mapa del hospital
      </Link>

      {dept.heroImage ? (
        <div className="mb-6 overflow-hidden rounded-2xl shadow-sm">
          <div className="relative">
            <img src={dept.heroImage} alt={dept.name} className="h-56 w-full object-cover sm:h-72" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
            <div className="absolute bottom-0 left-0 flex items-end gap-3 p-5">
              <span className="text-4xl drop-shadow">{dept.emoji}</span>
              <div>
                <h1 className="text-2xl font-extrabold text-white drop-shadow sm:text-3xl">{dept.name}</h1>
                <p className="mt-1 font-medium text-white/90 drop-shadow">{dept.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8 flex items-start gap-4">
          <span className="text-5xl">{dept.emoji}</span>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{dept.name}</h1>
            <p className={`mt-1 font-medium ${dept.accent}`}>{dept.tagline}</p>
          </div>
        </div>
      )}

      <div className="mb-8 rounded-2xl bg-white p-5 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">{process.title}</h2>
        <p className="mt-1 text-slate-600">{process.summary}</p>
      </div>

      <InteractiveProcess process={process} accent={dept.color} />
    </div>
  )
}
