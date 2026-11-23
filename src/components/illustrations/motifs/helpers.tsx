import type { ReactElement, ReactNode } from 'react'

export interface ToneColors {
  fill: string
  mid: string
  stroke: string
  text: string
}

export type MotifFn = (t: ToneColors) => ReactNode

export const FONT = 'DM Sans, system-ui, sans-serif'

export function defineMotifs<K extends string>(m: Record<K, MotifFn>): Record<K, MotifFn> {
  return m
}

export const n1 = (v: number): number => Math.round(v * 10) / 10

export function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180
  return [n1(cx + r * Math.cos(a)), n1(cy + r * Math.sin(a))]
}

export function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(cx, cy, r, a0)
  const [x1, y1] = polar(cx, cy, r, a1)
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0
  return `M${x0} ${y0}A${r} ${r} 0 ${large} 1 ${x1} ${y1}`
}

export function burstPoints(cx: number, cy: number, ro: number, ri: number, n: number): string {
  const pts: string[] = []
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? ro : ri
    const [x, y] = polar(cx, cy, r, (i * 180) / n - 90)
    pts.push(`${x},${y}`)
  }
  return pts.join(' ')
}

export function spiralPath(cx: number, cy: number, a: number, b: number, maxTheta: number, rot = 0, step = 0.2): string {
  let d = ''
  for (let th = 0; th <= maxTheta; th += step) {
    const r = a + b * th
    const x = cx + r * Math.cos(th + rot)
    const y = cy + r * Math.sin(th + rot)
    d += `${d ? 'L' : 'M'}${n1(x)} ${n1(y)}`
  }
  return d
}

interface ArrowProps {
  x0: number
  y0: number
  x1: number
  y1: number
  color: string
  w?: number
  head?: number
}

export function Arrow({ x0, y0, x1, y1, color, w = 2, head = 5 }: ArrowProps): ReactElement {
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy) || 1
  const ux = dx / len
  const uy = dy / len
  const bx = x1 - ux * head
  const by = y1 - uy * head
  const px = -uy
  const py = ux
  return (
    <g>
      <line x1={x0} y1={y0} x2={n1(bx)} y2={n1(by)} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <polygon
        points={`${x1},${y1} ${n1(bx + px * head * 0.62)},${n1(by + py * head * 0.62)} ${n1(bx - px * head * 0.62)},${n1(by - py * head * 0.62)}`}
        fill={color}
      />
    </g>
  )
}

interface HelixProps {
  stroke: string
  mid: string
  cx?: number
  amp?: number
  y0?: number
  y1?: number
  turns?: number
  rungs?: number
  sw?: number
}

const BASE_COLORS = ['#fbbf24', '#f87171', '#60a5fa', '#4ade80']

// Dupla hélice desenhada por amostragem (sem cópia de ícones prontos)
export function Helix({ stroke, mid, cx = 32, amp = 13, y0 = 6, y1 = 58, turns = 1.5, rungs = 8, sw = 3.4 }: HelixProps): ReactElement {
  const N = 48
  const a: string[] = []
  const b: string[] = []
  for (let i = 0; i <= N; i++) {
    const y = y0 + ((y1 - y0) * i) / N
    const ph = ((y - y0) / (y1 - y0)) * Math.PI * 2 * turns
    a.push(`${i === 0 ? 'M' : 'L'}${n1(cx + amp * Math.sin(ph))} ${n1(y)}`)
    b.push(`${i === 0 ? 'M' : 'L'}${n1(cx - amp * Math.sin(ph))} ${n1(y)}`)
  }
  const rs: ReactElement[] = []
  for (let k = 0; k < rungs; k++) {
    const y = y0 + ((y1 - y0) * (k + 0.5)) / rungs
    const ph = ((y - y0) / (y1 - y0)) * Math.PI * 2 * turns
    const dx = amp * Math.sin(ph)
    if (Math.abs(dx) > 4) {
      rs.push(
        <line
          key={k}
          x1={n1(cx - dx)}
          y1={n1(y)}
          x2={n1(cx + dx)}
          y2={n1(y)}
          stroke={BASE_COLORS[k % 4]}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      )
    }
  }
  return (
    <g>
      <path d={b.join('')} fill="none" stroke={mid} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      {rs}
      <path d={a.join('')} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  )
}
