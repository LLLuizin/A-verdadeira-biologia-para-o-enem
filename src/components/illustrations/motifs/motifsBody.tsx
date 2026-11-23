import { Arrow, FONT, defineMotifs, n1, polar } from './helpers'

const GOLD = '#fbbf24'
const GOLD_D = '#b45309'
const RED = '#f87171'
const RED_D = '#b91c1c'
const BLUE = '#60a5fa'
const BLUE_D = '#1d4ed8'
const GREEN = '#4ade80'
const GREEN_D = '#15803d'
const BROWN = '#a16d42'
const BROWN_D = '#734630'

type P2 = [number, number]

export const bodyMotifs = defineMotifs({
  // ───────── Evolução ─────────
  tree: (t) => (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M32 59V46M14 46H50M14 46V32M6 32H22M6 32V19M22 32V19M50 46V26M38 26H58M38 26V13M58 26V13" stroke={t.stroke} strokeWidth={3.2} />
      {([[6, 15, GOLD], [22, 15, RED], [38, 9, BLUE], [58, 9, GREEN]] as [number, number, string][]).map(([x, y, c]) => (
        <circle key={x} cx={x} cy={y} r={4.6} fill={c} stroke={t.stroke} strokeWidth={1.8} />
      ))}
      <circle cx={32} cy={46} r={3} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
    </g>
  ),

  finch: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M2 54H62" stroke={BROWN} strokeWidth={4} />
      <path d="M28 44V53M34 44V53" stroke={t.stroke} strokeWidth={2} fill="none" />
      <path d="M17 37L2 47L6 36L15 31Z" fill={t.mid} stroke={t.stroke} strokeWidth={2} />
      <ellipse cx={30} cy={34} rx={16} ry={11} transform="rotate(-10 30 34)" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <path d="M21 31Q31 23 41 36Q30 43 20 38Z" fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
      <circle cx={45} cy={24} r={9} fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <path d="M53 22L63 25L53 28Z" fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      <circle cx={48} cy={22} r={1.9} fill="#24221e" />
    </g>
  ),

  fossil: (t) => {
    let d = ''
    for (let th = 0; th <= 10.6; th += 0.2) {
      const r = 1.2 + 1.8 * th
      d += `${d ? 'L' : 'M'}${n1(32 + r * Math.cos(th))} ${n1(32 + r * Math.sin(th))}`
    }
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <rect x={4} y={6} width={56} height={52} rx={14} fill="#f0e6db" stroke={BROWN_D} strokeWidth={2.4} />
        <circle cx={32} cy={32} r={21} fill={t.fill} opacity={0.85} />
        <path d={d} fill="none" stroke={t.stroke} strokeWidth={4.6} />
        <path d={d} fill="none" stroke={t.mid} strokeWidth={2} />
        <path d="M10 14l4 2M52 48l-4-3M12 50l3-2" stroke={BROWN} strokeWidth={1.6} fill="none" />
      </g>
    )
  },

  skull: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 6C18 6 10 16 10 28c0 8 3 13 8 16v8h28v-8c5-3 8-8 8-16C54 16 46 6 32 6Z" fill="#f3f2eb" stroke={t.stroke} strokeWidth={2.6} />
      <ellipse cx={23} cy={29} rx={5.4} ry={6.4} fill={t.stroke} />
      <ellipse cx={41} cy={29} rx={5.4} ry={6.4} fill={t.stroke} />
      <path d="M32 35L28 43H36Z" fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
      <path d="M22 48H42M26 48V53M32 48V53M38 48V53" stroke={t.stroke} strokeWidth={1.8} fill="none" />
    </g>
  ),

  globe: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={32} cy={32} r={25} fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path d="M16 22c5-6 12-4 14 1s-4 6-2 11-8 4-10-1-5-6-2-11z" fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <path d="M38 34c5-2 10 0 10 6s-5 9-9 7-6-8-1-13z" fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <path d="M36 14c4-2 9 0 9 4s-5 4-8 3-3-5-1-7z" fill={t.mid} stroke={t.stroke} strokeWidth={1.4} />
      <ellipse cx={32} cy={32} rx={10} ry={25} fill="none" stroke={t.stroke} strokeWidth={1.2} opacity={0.5} />
      <path d="M7 32H57" stroke={t.stroke} strokeWidth={1.2} opacity={0.5} />
    </g>
  ),

  // ───────── Ecologia ─────────
  foodweb: (t) => {
    const nodes: [number, number, string][] = [
      [12, 52, GREEN], [26, 36, GOLD], [44, 46, '#86efac'], [50, 16, BLUE], [20, 14, RED],
    ]
    return (
      <g strokeLinecap="round" strokeLinejoin="round">
        <Arrow x0={15} y0={47} x1={23} y1={40} color={t.stroke} w={1.8} head={5} />
        <Arrow x0={31} y0={39} x1={39} y1={43} color={t.stroke} w={1.8} head={5} />
        <Arrow x0={45} y0={40} x1={49} y1={23} color={t.stroke} w={1.8} head={5} />
        <Arrow x0={30} y0={32} x1={46} y1={21} color={t.stroke} w={1.8} head={5} />
        <Arrow x0={24} y0={30} x1={21} y1={21} color={t.stroke} w={1.8} head={5} />
        {nodes.map(([x, y, c], i) => (
          <circle key={i} cx={x} cy={y} r={6.4} fill={c} stroke={t.stroke} strokeWidth={2} />
        ))}
      </g>
    )
  },

  cloud: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M18 38C8 38 6 26 15 24C14 14 28 8 35 16C42 10 54 16 51 26C60 27 58 38 48 38Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <text x={32} y={27} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={800} fill={t.text} fontFamily={FONT}>
        CO₂
      </text>
      <Arrow x0={28} y0={42} x1={28} y1={52} color={t.stroke} w={2} head={5} />
      <path d="M38 60C36 52 42 48 52 48C52 56 46 61 38 60Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
    </g>
  ),

  sun: () => {
    const rays: ReturnType<typeof polar>[][] = []
    for (let i = 0; i < 8; i++) rays.push([polar(32, 32, 17, i * 45), polar(32, 32, 26, i * 45)])
    return (
      <g strokeLinecap="round">
        {rays.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={GOLD_D} strokeWidth={3.4} />
        ))}
        <circle cx={32} cy={32} r={12} fill={GOLD} stroke={GOLD_D} strokeWidth={2.6} />
        <circle cx={28} cy={28} r={3} fill="#fef3c7" />
      </g>
    )
  },

  drop: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 6C32 6 14 28 14 40C14 51 22 58 32 58C42 58 50 51 50 40C50 28 32 6 32 6Z" fill="#dbeafe" stroke={BLUE_D} strokeWidth={2.6} />
      <path d="M23 42C23 36 26 31 30 27" fill="none" stroke="#ffffff" strokeWidth={2.8} opacity={0.85} />
      <path d="M26 48c4 3 9 3 13-1" fill="none" stroke={BLUE} strokeWidth={2} />
    </g>
  ),

  landscape: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={50} cy={13} r={7} fill="#fde68a" stroke={GOLD_D} strokeWidth={1.8} />
      <rect x={14} y={30} width={4} height={18} fill={BROWN} stroke={BROWN_D} strokeWidth={1.4} />
      <circle cx={16} cy={24} r={10} fill={GREEN} stroke={GREEN_D} strokeWidth={2.2} />
      <path d="M46 52V34a3 3 0 0 1 6 0V52Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
      <path d="M46 46H42V40a2.4 2.4 0 0 1 4.8 0M52 42H56V37a2.4 2.4 0 0 0-4.8 0" fill="none" stroke={GREEN_D} strokeWidth={2} />
      <path d="M3 46C16 36 30 38 42 44C50 40 56 40 61 42V58H3Z" fill="#bbf7d0" stroke={GREEN_D} strokeWidth={2.2} />
      <path d="M12 52c6-2 10-2 16 0M36 54c6-2 10-2 16 0" fill="none" stroke={GREEN_D} strokeWidth={1.4} />
    </g>
  ),

  // ───────── Fisiologia humana ─────────
  neuron: (t) => (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M10 27L5 20L2 21M5 20L6 14M10 37L4 44L2 43M4 44L6 50M12 24L13 14L17 10M13 14L9 11" stroke={t.stroke} strokeWidth={2} />
      <path d="M23 32H52M52 32L58 25M52 32L58 39M52 32H59" stroke={t.stroke} strokeWidth={2.2} />
      {[30, 39, 48].map((x) => (
        <ellipse key={x} cx={x} cy={32} rx={4.2} ry={4.6} fill="#fde68a" stroke={GOLD_D} strokeWidth={1.6} />
      ))}
      <circle cx={15} cy={32} r={8.6} fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <circle cx={15} cy={32} r={3} fill={t.fill} stroke={t.stroke} strokeWidth={1.4} />
      {([[58.4, 24.6], [58.4, 39.4], [60.4, 32]] as P2[]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.6} fill={t.mid} stroke={t.stroke} strokeWidth={1.4} />
      ))}
    </g>
  ),

  heart: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M30 14C30 3 45 2 45 12" fill="none" stroke={RED_D} strokeWidth={6} />
      <path d="M30 14C30 3 45 2 45 12" fill="none" stroke={RED} strokeWidth={3} />
      <path d="M23 13C22 4 11 5 11 12" fill="none" stroke={BLUE_D} strokeWidth={6} />
      <path d="M23 13C22 4 11 5 11 12" fill="none" stroke={BLUE} strokeWidth={3} />
      <path d="M32 57C14 45 6 34 6 23C6 14 13 9 20 9C25 9 29 12 32 16C35 12 39 9 44 9C51 9 58 14 58 23C58 34 50 45 32 57Z" fill="#fecaca" stroke={RED_D} strokeWidth={2.6} />
      <path d="M32 18V50" stroke={RED_D} strokeWidth={1.6} strokeDasharray="1 4" fill="none" />
      <path d="M14 22c0-4 3-7 7-7" fill="none" stroke="#ffffff" strokeWidth={2.4} opacity={0.8} />
    </g>
  ),

  kidney: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M40 8C22 6 10 18 10 32C10 48 22 58 36 56C42 55 42 48 38 44C34 40 36 34 42 30C48 26 52 20 50 14C48 9 44 8 40 8Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path d="M22 22c4-4 10-4 14-2M18 34c3 6 8 9 14 10" fill="none" stroke={t.mid} strokeWidth={2.4} />
      <path d="M41 38C49 40 51 48 51 58" fill="none" stroke={t.stroke} strokeWidth={4.6} />
      <path d="M41 38C49 40 51 48 51 58" fill="none" stroke={t.mid} strokeWidth={2.2} />
      <circle cx={26} cy={30} r={2} fill={t.stroke} />
      <circle cx={30} cy={38} r={1.6} fill={t.stroke} />
    </g>
  ),

  lungs: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M26 16C12 16 6 34 8 48C9 56 20 56 26 50C28 40 28 28 26 16Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <path d="M38 16C52 16 58 34 56 48C55 56 44 56 38 50C36 40 36 28 38 16Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <rect x={29.6} y={4} width={4.8} height={22} rx={2.4} fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
      <path d="M32 24L20 34M32 24L44 34M20 34L14 44M20 34L22 46M44 34L50 44M44 34L42 46" fill="none" stroke={t.stroke} strokeWidth={2} />
    </g>
  ),

  stomach: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M20 3V16" stroke={t.stroke} strokeWidth={7} />
      <path d="M20 3V16" stroke={t.mid} strokeWidth={3.6} />
      <path d="M18 14C10 22 8 40 18 50C28 60 48 58 54 44C58 34 50 28 42 28C36 28 34 22 34 14Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path d="M54 44C61 44 63 36 59 30" fill="none" stroke={t.stroke} strokeWidth={6} />
      <path d="M54 44C61 44 63 36 59 30" fill="none" stroke={t.mid} strokeWidth={3} />
      <path d="M20 32c4 3 7-3 11 0s7-2 10 1M22 42c4 3 8-2 12 0s7-1 9 1" fill="none" stroke={t.mid} strokeWidth={2} />
    </g>
  ),

  immune: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 5L54 13V32C54 46 44 54 32 59C20 54 10 46 10 32V13Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path d="M32 47V33M32 33L23 21M32 33L41 21" fill="none" stroke={t.stroke} strokeWidth={4.6} />
      <path d="M32 47V33M32 33L23 21M32 33L41 21" fill="none" stroke={t.mid} strokeWidth={2.2} />
      <circle cx={22.4} cy={19.6} r={3.2} fill={RED} stroke={RED_D} strokeWidth={1.4} />
      <circle cx={41.6} cy={19.6} r={3.2} fill={RED} stroke={RED_D} strokeWidth={1.4} />
    </g>
  ),

  hormone: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={14} cy={15} rx={10} ry={7.4} transform="rotate(-20 14 15)" fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      {([[27, 22], [35, 29], [42, 36]] as P2[]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.8} fill={RED} stroke={RED_D} strokeWidth={1.3} />
      ))}
      <circle cx={48} cy={47} r={12} fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <path d="M40 40a4.5 4.5 0 0 1 7 -3.2M37 49a4.5 4.5 0 0 1 3 -6.5" fill="none" stroke={t.stroke} strokeWidth={2.2} />
      <circle cx={49} cy={48} r={4} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
    </g>
  ),

  muscle: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={4} y={18} width={56} height={28} rx={14} fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      {[16, 24, 32, 40, 48].map((x, i) => (
        <path key={x} d={`M${x} 21.5V42.5`} stroke={i % 2 ? t.mid : t.stroke} strokeWidth={i % 2 ? 4 : 1.8} />
      ))}
      <path d="M10 28H54M10 36H54" stroke={t.mid} strokeWidth={1.6} fill="none" />
    </g>
  ),

  skin: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={4} y={14} width={56} height={9} rx={2} fill={t.fill} stroke={t.stroke} strokeWidth={2} />
      <rect x={4} y={23} width={56} height={20} fill={t.mid} stroke={t.stroke} strokeWidth={2} opacity={0.75} />
      <rect x={4} y={43} width={56} height={15} rx={2} fill="#fde68a" stroke={t.stroke} strokeWidth={2} />
      <path d="M22 3V36" stroke={t.stroke} strokeWidth={2.4} fill="none" />
      <circle cx={22} cy={38} r={4.2} fill={t.fill} stroke={t.stroke} strokeWidth={1.8} />
      <path d="M44 14V30C40 31 40 34 44 35C48 36 48 39 44 40" fill="none" stroke={BLUE_D} strokeWidth={2} />
      <circle cx={44} cy={42} r={3} fill={BLUE} stroke={BLUE_D} strokeWidth={1.4} />
    </g>
  ),
})
