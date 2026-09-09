import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { findDepartment } from '../data/departments'

interface Hotspot {
  deptId: string
  left: string
  top: string
  width: string
  height: string
}

// Coordenadas calibradas a mano contra public/illustrations/hospital-full.svg (viewBox 0 0 450 450)
const hotspots: Hotspot[] = [
  { deptId: 'quirofano', left: '50%', top: '0%', width: '50%', height: '29%' },
  { deptId: 'urgencias-admision', left: '25%', top: '58%', width: '50%', height: '37%' },
]

export function HospitalSceneMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)

  const farmacia = findDepartment('farmacia-hospitalaria')!
  const banco = findDepartment('banco-sangre')!

  return (
    <div className="relative mx-auto w-full max-w-3xl pt-8">
      <div className="relative overflow-visible rounded-3xl bg-white shadow-lg ring-1 ring-slate-200">
        <img src="/illustrations/hospital-full.svg" alt="El hospital" className="block w-full rounded-3xl" />

        {hotspots.map((h) => {
          const dept = findDepartment(h.deptId)!
          const isHovered = hovered === dept.id
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => navigate(`/sala/${dept.id}`)}
              onMouseEnter={() => setHovered(dept.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(dept.id)}
              onBlur={() => setHovered(null)}
              className="absolute cursor-pointer rounded-2xl border-2 border-transparent transition focus:outline-none"
              style={{ left: h.left, top: h.top, width: h.width, height: h.height }}
              aria-label={`Entrar a ${dept.name}`}
            >
              <span
                className={`absolute inset-0 rounded-2xl transition ${isHovered ? dept.color : ''}`}
                style={{ opacity: isHovered ? 0.22 : 0 }}
              />
              <span
                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold text-white shadow-lg transition ${dept.color}`}
                style={{ opacity: isHovered ? 1 : 0, transform: `translate(-50%, -50%) scale(${isHovered ? 1 : 0.85})` }}
              >
                {dept.emoji} {dept.name} →
              </span>
            </button>
          )
        })}
      </div>

      {/* Farmacia — burbuja flotante, igual que "Farmacia comunitaria" en el sitio original */}
      <button
        type="button"
        onClick={() => navigate(`/sala/${farmacia.id}`)}
        className="group absolute -right-4 -top-8 hidden w-44 -rotate-2 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:rotate-0 sm:block"
        aria-label={`Entrar a ${farmacia.name}`}
      >
        <img src={farmacia.heroImage} alt={farmacia.name} className="h-24 w-full rounded-xl object-cover" />
        <p className="mt-1 pb-1 text-center text-xs font-bold text-slate-700">{farmacia.emoji} {farmacia.name}</p>
      </button>

      {/* Banco de Sangre — misma idea, burbuja flotante */}
      <button
        type="button"
        onClick={() => navigate(`/sala/${banco.id}`)}
        className="group absolute -left-4 top-16 hidden w-40 rotate-2 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-slate-200 transition hover:-translate-y-1 hover:rotate-0 md:block"
        aria-label={`Entrar a ${banco.name}`}
      >
        <div className={`flex h-20 w-full items-center justify-center rounded-xl ${banco.color}`}>
          <span className="text-4xl">{banco.emoji}</span>
        </div>
        <p className="mt-1 pb-1 text-center text-xs font-bold text-slate-700">{banco.name}</p>
      </button>

      {/* En pantallas chicas las burbujas flotantes se esconden (se saldrían del recuadro) */}
      <div className="mt-5 flex justify-center gap-3 sm:hidden">
        {[farmacia, banco].map((dept) => (
          <button
            key={dept.id}
            type="button"
            onClick={() => navigate(`/sala/${dept.id}`)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow ${dept.color}`}
          >
            {dept.emoji} {dept.name}
          </button>
        ))}
      </div>
    </div>
  )
}
