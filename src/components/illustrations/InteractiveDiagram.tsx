'use client'

import { useMemo, useState } from 'react'
import type { ReactNode, SVGProps } from 'react'
import { tones, type Tone } from './palette'
import { InfoCard, PartChips, TipBox } from './DiagramUI'

type Pt = [number, number]

export interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  shape?: 'rect' | 'circle' | 'square'
  w?: number
  h?: number
  r?: number
  tone: Tone
  icon?: string
  fs?: number
  filled?: boolean // preenchido (ex.: afetado no heredograma)
  bare?: boolean // só um ponto clicável, sem texto dentro
  hideBadge?: boolean // não numerar nem listar na legenda
  description: string
  detail?: string
}

export interface DiagramEdge {
  from?: string
  to?: string
  fromPoint?: Pt
  toPoint?: Pt
  d?: string // caminho SVG manual
  curve?: number // curvatura (positivo/negativo muda o lado)
  arrow?: boolean // padrão: true
  dashed?: boolean
  dot?: boolean // bolinha na ponta (ponteiros)
  label?: string
  labelPos?: Pt
  fs?: number
}

export interface DiagramSpec {
  id: string
  title: string
  caption?: string
  enemTip?: string
  viewBox: [number, number]
  nodes: DiagramNode[]
  edges?: DiagramEdge[]
  background?: ReactNode
  foreground?: ReactNode
}

const FONT = 'DM Sans, system-ui, sans-serif'

function halfSize(n: DiagramNode): [number, number] {
  if (n.shape === 'circle' || n.shape === 'square') {
    const r = n.r ?? 30
    return [r, r]
  }
  return [(n.w ?? 130) / 2, (n.h ?? 54) / 2]
}

// Ponto na borda do nó, na direção de "toward"
function edgePoint(n: DiagramNode, toward: Pt, gap: number): Pt {
  const dx = toward[0] - n.x
  const dy = toward[1] - n.y
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  let t: number
  if (n.shape === 'circle') {
    t = n.r ?? 30
  } else {
    const [hw, hh] = halfSize(n)
    const tx = Math.abs(ux) < 1e-6 ? Infinity : hw / Math.abs(ux)
    const ty = Math.abs(uy) < 1e-6 ? Infinity : hh / Math.abs(uy)
    t = Math.min(tx, ty)
  }
  return [n.x + ux * (t + gap), n.y + uy * (t + gap)]
}

interface ResolvedEdge {
  d: string
  label?: string
  labelAt: Pt | null
  end: Pt | null
}

function resolveEdge(e: DiagramEdge, byId: Map<string, DiagramNode>): ResolvedEdge | null {
  if (e.d) return { d: e.d, label: e.label, labelAt: e.labelPos ?? null, end: null }
  const a = e.from ? byId.get(e.from) : undefined
  const b = e.to ? byId.get(e.to) : undefined
  const pa: Pt | null = a ? [a.x, a.y] : e.fromPoint ?? null
  const pb: Pt | null = b ? [b.x, b.y] : e.toPoint ?? null
  if (!pa || !pb) return null

  const mx = (pa[0] + pb[0]) / 2
  const my = (pa[1] + pb[1]) / 2
  let ctrl: Pt | null = null
  if (e.curve) {
    const dx = pb[0] - pa[0]
    const dy = pb[1] - pa[1]
    const len = Math.hypot(dx, dy) || 1
    ctrl = [mx + (-dy / len) * e.curve, my + (dx / len) * e.curve]
  }
  const p0 = a ? edgePoint(a, ctrl ?? pb, 4) : pa
  const p1 = b ? edgePoint(b, ctrl ?? pa, e.arrow === false ? 4 : 6) : pb
  const d = ctrl
    ? `M${p0[0]} ${p0[1]} Q${ctrl[0]} ${ctrl[1]} ${p1[0]} ${p1[1]}`
    : `M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]}`
  const labelAt: Pt = e.labelPos
    ? e.labelPos
    : ctrl
      ? [0.25 * p0[0] + 0.5 * ctrl[0] + 0.25 * p1[0], 0.25 * p0[1] + 0.5 * ctrl[1] + 0.25 * p1[1]]
      : [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2]
  return { d, label: e.label, labelAt, end: p1 }
}

type MultiTextProps = {
  text: string
  x: number
  y: number
  fs: number
  lh?: number
} & Omit<SVGProps<SVGTextElement>, 'x' | 'y' | 'ref' | 'fontSize'>

function MultiText({ text, x, y, fs, lh, ...rest }: MultiTextProps) {
  const lines = text.split('\n')
  const step = lh ?? fs + 3
  const start = y - ((lines.length - 1) * step) / 2
  return (
    <text x={x} y={start} fontSize={fs} fontFamily={FONT} textAnchor="middle" dominantBaseline="middle" {...rest}>
      {lines.map((l, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : step}>
          {l}
        </tspan>
      ))}
    </text>
  )
}

function NodeShape({ n, active }: { n: DiagramNode; active: boolean }) {
  const t = tones[n.tone]
  const fill = n.filled ? t.stroke : t.fill
  const sw = active ? 4 : 2.2
  if (n.bare) {
    return <circle cx={n.x} cy={n.y} r={n.r ?? 10} fill={t.mid} stroke={t.stroke} strokeWidth={active ? 4 : 2.5} />
  }
  if (n.shape === 'circle') {
    return <circle cx={n.x} cy={n.y} r={n.r ?? 30} fill={fill} stroke={t.stroke} strokeWidth={sw} />
  }
  if (n.shape === 'square') {
    const r = n.r ?? 30
    return <rect x={n.x - r} y={n.y - r} width={r * 2} height={r * 2} rx={5} fill={fill} stroke={t.stroke} strokeWidth={sw} />
  }
  const w = n.w ?? 130
  const h = n.h ?? 54
  return <rect x={n.x - w / 2} y={n.y - h / 2} width={w} height={h} rx={14} fill={fill} stroke={t.stroke} strokeWidth={sw} />
}

function NodeText({ n }: { n: DiagramNode }) {
  if (n.bare) return null
  const t = tones[n.tone]
  const fs = n.fs ?? 14
  const color = n.filled ? '#ffffff' : t.text
  if (n.icon) {
    const lines = n.label.split('\n').length
    const iconSize = Math.round(fs * 1.7)
    const total = iconSize + 4 + lines * (fs + 3)
    const top = n.y - total / 2
    return (
      <>
        <text x={n.x} y={top + iconSize / 2} fontSize={iconSize} textAnchor="middle" dominantBaseline="middle">
          {n.icon}
        </text>
        <MultiText
          text={n.label}
          x={n.x}
          y={top + iconSize + 4 + ((lines - 1) * (fs + 3)) / 2 + (fs + 3) / 2}
          fs={fs}
          fontWeight={600}
          fill={color}
        />
      </>
    )
  }
  return <MultiText text={n.label} x={n.x} y={n.y} fs={fs} fontWeight={600} fill={color} />
}

export function InteractiveDiagram({ spec }: { spec: DiagramSpec }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const byId = useMemo(() => new Map(spec.nodes.map((n) => [n.id, n])), [spec])
  const numbered = useMemo(() => spec.nodes.filter((n) => !n.hideBadge && !n.bare), [spec])
  const edges = useMemo(
    () => (spec.edges ?? []).map((e) => ({ edge: e, res: resolveEdge(e, byId) })).filter((x) => x.res !== null),
    [spec, byId]
  )

  const focusId = hoverId ?? selectedId
  const selected = selectedId ? byId.get(selectedId) ?? null : null
  const markerId = `arrow-${spec.id}`

  const toggle = (id: string) => setSelectedId((cur) => (cur === id ? null : id))

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${spec.viewBox[0]} ${spec.viewBox[1]}`}
          className="mx-auto h-auto w-full"
          style={{ minWidth: 560 }}
          role="group"
          aria-label={spec.title}
          onClick={() => setSelectedId(null)}
        >
          <defs>
            <marker id={markerId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
              <path d="M0 0 L10 5 L0 10 z" fill="#5e5b50" />
            </marker>
          </defs>

          {spec.background}

          {edges.map(({ edge, res }, i) => {
            if (!res) return null
            return (
              <g key={`e${i}`} style={{ pointerEvents: 'none' }}>
                <path
                  d={res.d}
                  fill="none"
                  stroke="#5e5b50"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray={edge.dashed ? '6 5' : undefined}
                  markerEnd={edge.arrow === false ? undefined : `url(#${markerId})`}
                />
                {edge.dot && res.end && <circle cx={res.end[0]} cy={res.end[1]} r={3.5} fill="#5e5b50" />}
                {res.label && res.labelAt && (
                  <MultiText
                    text={res.label}
                    x={res.labelAt[0]}
                    y={res.labelAt[1]}
                    fs={edge.fs ?? 12}
                    fill="#4e4b42"
                    fontStyle="italic"
                    stroke="#fefefc"
                    strokeWidth={4}
                    paintOrder="stroke"
                  />
                )}
              </g>
            )
          })}

          {spec.nodes.map((n) => {
            const active = focusId === n.id || selectedId === n.id
            const dim = focusId !== null && focusId !== n.id
            const idx = numbered.findIndex((m) => m.id === n.id)
            const [hw, hh] = halfSize(n)
            const bx = n.shape === 'rect' || !n.shape ? n.x - hw + 4 : n.x - hw * 0.75
            const by = n.shape === 'rect' || !n.shape ? n.y - hh + 4 : n.y - hh * 0.75
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-label={`${n.label.replace(/\n/g, ' ')}: ${n.description}`}
                aria-pressed={selectedId === n.id}
                onClick={(e) => {
                  e.stopPropagation()
                  toggle(n.id)
                }}
                onMouseEnter={() => setHoverId(n.id)}
                onMouseLeave={() => setHoverId(null)}
                onFocus={() => setHoverId(n.id)}
                onBlur={() => setHoverId(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle(n.id)
                  }
                }}
                style={{
                  cursor: 'pointer',
                  opacity: dim ? 0.45 : 1,
                  transition: 'opacity 0.2s',
                  outline: 'none',
                  filter: active ? 'drop-shadow(0 3px 6px rgba(21,128,61,0.35))' : undefined,
                }}
              >
                <NodeShape n={n} active={active} />
                <NodeText n={n} />
                {idx >= 0 && !n.hideBadge && (
                  <g style={{ pointerEvents: 'none' }}>
                    <circle cx={bx} cy={by} r={9} fill="#423f38" stroke="#fefefc" strokeWidth={1.5} />
                    <text x={bx} y={by} fontSize={10.5} fontWeight={700} fill="#ffffff" textAnchor="middle" dominantBaseline="central" fontFamily={FONT}>
                      {idx + 1}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {spec.foreground}
        </svg>
      </div>

      <PartChips
        items={numbered.map((n) => ({ id: n.id, label: n.label.replace(/\n/g, ' '), tone: n.tone }))}
        selectedId={selectedId}
        onSelect={toggle}
        onHover={setHoverId}
      />

      <InfoCard
        title={selected ? selected.label.replace(/\n/g, ' ') : undefined}
        description={selected?.description}
        detail={selected?.detail}
        tone={selected?.tone}
        hint={spec.caption ?? 'Clique em uma parte do esquema para ver a explicação.'}
        onClose={() => setSelectedId(null)}
      />

      {spec.enemTip && <TipBox>{spec.enemTip}</TipBox>}
    </div>
  )
}
