import { Link } from 'react-router-dom'
import { departments } from '../data/departments'

export function IllustratedRoomGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {departments.map((dept) => (
        <Link
          key={dept.id}
          to={`/sala/${dept.id}`}
          className="group relative block overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
        >
          <img
            src={dept.heroImage}
            alt={dept.name}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
          <span className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${dept.color}`} />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center gap-2">
              <span className="text-2xl drop-shadow">{dept.emoji}</span>
              <h3 className="text-xl font-extrabold text-white drop-shadow">{dept.name}</h3>
            </div>
            <p className="mt-1 text-sm font-medium text-white/90 drop-shadow">{dept.tagline}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-white opacity-90 transition group-hover:gap-2">
              Entrar a la sala →
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
