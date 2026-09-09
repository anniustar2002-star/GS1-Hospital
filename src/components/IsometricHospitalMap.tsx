import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { allTiles, type MapTile } from '../data/mapLayout'

export function IsometricHospitalMap() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)

  const handleSelect = (tile: MapTile) => {
    if (!tile.active || !tile.to) return
    navigate(tile.to)
  }

  return (
    <div className="iso-wrap">
      <div className="iso-grid">
        {allTiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => handleSelect(tile)}
            onMouseEnter={() => setHovered(tile.id)}
            onMouseLeave={() => setHovered(null)}
            disabled={!tile.active}
            className="iso-tile"
            style={{ gridColumn: tile.col, gridRow: tile.row, zIndex: tile.row * 10 + tile.col }}
            aria-label={tile.active ? `Entrar a ${tile.label}` : `${tile.label} — próximamente`}
          >
            <div
              className={`iso-face ${tile.active ? tile.color : 'bg-slate-200'} ${
                tile.active ? '' : 'grayscale opacity-70'
              }`}
            >
              <span className="text-3xl leading-none">{tile.emoji}</span>
              <span
                className={`px-1 text-center text-[11px] font-bold leading-tight ${
                  tile.active ? 'text-white' : 'text-slate-500'
                }`}
              >
                {tile.label}
              </span>
              {!tile.active && hovered === tile.id && (
                <span className="absolute -bottom-6 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-white">
                  Próximamente
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
