'use client'

import { tones, type Tone } from './palette'

export interface ChipItem {
  id: string
  label: string
  tone: Tone
}

interface PartChipsProps {
  items: ChipItem[]
  selectedId: string | null
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

// Legenda numerada e clicável (essencial no celular, onde o texto do SVG fica pequeno)
export function PartChips({ items, selectedId, onSelect, onHover }: PartChipsProps) {
  if (items.length === 0) return null
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Partes da ilustração">
      {items.map((item, i) => {
        const t = tones[item.tone]
        const selected = selectedId === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelect(item.id)
            }}
            onMouseEnter={() => onHover(item.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(item.id)}
            onBlur={() => onHover(null)}
            aria-pressed={selected}
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-2"
            style={{
              backgroundColor: selected ? t.stroke : t.fill,
              borderColor: t.stroke,
              color: selected ? '#ffffff' : t.text,
              boxShadow: selected ? '0 2px 8px rgba(0,0,0,0.18)' : 'none',
            }}
          >
            <span
              className="flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold"
              style={{ backgroundColor: selected ? '#ffffff' : t.stroke, color: selected ? t.stroke : '#ffffff' }}
            >
              {i + 1}
            </span>
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

interface InfoCardProps {
  title?: string
  description?: string
  detail?: string
  tone?: Tone
  hint: string
  onClose?: () => void
}

// Painel de explicação (fica ABAIXO do desenho, nunca cobre a ilustração)
export function InfoCard({ title, description, detail, tone = 'verde', hint, onClose }: InfoCardProps) {
  const t = tones[tone]
  return (
    <div
      aria-live="polite"
      className="mt-4 min-h-[112px] rounded-organic border bg-papel-50/95 p-4 text-left"
      style={{ borderColor: title ? t.stroke : '#e8e5da', borderLeftWidth: title ? 6 : 1 }}
    >
      {title ? (
        <>
          <div className="mb-1 flex items-start justify-between gap-3">
            <h3 className="font-display text-lg font-semibold text-tinta-900">{title}</h3>
            {onClose && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="shrink-0 rounded-full px-2 py-0.5 text-sm text-tinta-500 hover:bg-papel-200 hover:text-tinta-900"
                aria-label="Fechar explicação"
              >
                ✕
              </button>
            )}
          </div>
          {description && <p className="mb-2 text-body-sm font-medium text-tinta-600">{description}</p>}
          {detail && <p className="text-body-sm leading-relaxed text-tinta-700">{detail}</p>}
        </>
      ) : (
        <p className="flex h-full items-center justify-center py-6 text-center text-body-sm text-tinta-500">{hint}</p>
      )}
    </div>
  )
}

export function TipBox({ children }: { children: string }) {
  return (
    <div className="mt-3 rounded-organic border border-verde-200 bg-verde-50 p-3 text-left text-body-sm text-verde-900">
      <span className="font-semibold">🎯 Dica ENEM: </span>
      {children}
    </div>
  )
}
