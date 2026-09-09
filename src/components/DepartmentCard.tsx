import { Link } from 'react-router-dom'
import type { Department } from '../types'

export function DepartmentCard({ dept }: { dept: Department }) {
  return (
    <Link
      to={`/sala/${dept.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 ${dept.color}`} />
      <div>
        <span className="text-4xl">{dept.emoji}</span>
        <h3 className="mt-4 text-lg font-bold text-slate-900">{dept.name}</h3>
        <p className={`mt-1 text-sm font-medium ${dept.accent}`}>{dept.tagline}</p>
        <p className="mt-3 text-sm text-slate-500">{dept.description}</p>
      </div>
      <span
        className={`mt-6 inline-flex w-fit items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-white transition group-hover:gap-2 ${dept.color}`}
      >
        Entrar a la sala →
      </span>
    </Link>
  )
}
