import { Arrow, Helix, arcPath, burstPoints, defineMotifs, n1, polar, spiralPath } from './helpers'

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

export const natureMotifs = defineMotifs({
  // ───────── Botânica ─────────
  leaf: () => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      <path d="M10 54C6 28 24 8 56 8C58 36 40 56 10 54Z" fill="#bbf7d0" stroke={GREEN_D} strokeWidth={2.6} />
      <path d="M10 54C24 38 36 26 52 12" stroke={GREEN_D} strokeWidth={2.4} />
      <path d="M18 46L28 45M18 46L19 36M28 36L38 35M28 36L29 26M38 26L48 25M38 26L39 16" stroke={GREEN_D} strokeWidth={1.8} />
      <path d="M10 54C8 58 6 60 3 61" stroke={GREEN_D} strokeWidth={2.6} />
    </g>
  ),

  root: () => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      <rect x={4} y={18} width={56} height={42} rx={8} fill="#f0e6db" stroke={BROWN_D} strokeWidth={2.4} />
      <path d="M32 18V6" stroke={GREEN_D} strokeWidth={3.4} />
      <ellipse cx={22} cy={8} rx={9} ry={4} transform="rotate(-20 22 8)" fill="#86efac" stroke={GREEN_D} strokeWidth={1.8} />
      <ellipse cx={42} cy={9} rx={9} ry={4} transform="rotate(20 42 9)" fill="#86efac" stroke={GREEN_D} strokeWidth={1.8} />
      <path d="M32 18V50M32 32Q20 33 14 44M32 38Q44 39 50 50M32 50L28 58M32 50L37 57" stroke={BROWN_D} strokeWidth={3} />
      <path d="M14 44l-3 4M14 44l-4 1M50 50l3 3M50 50l4-1" stroke={BROWN} strokeWidth={1.6} />
      {([[10, 30], [54, 34], [20, 54]] as P2[]).map(([x, y], i) => (
        <path key={i} d={`M${x} ${y - 4}C${x} ${y - 4} ${x - 3.2} ${y} ${x - 3.2} ${y + 1.6}A3.2 3.2 0 0 0 ${x + 3.2} ${y + 1.6}C${x + 3.2} ${y} ${x} ${y - 4} ${x} ${y - 4}Z`} fill={BLUE} stroke={BLUE_D} strokeWidth={1.4} />
      ))}
    </g>
  ),

  flower: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 36C32 46 30 52 30 60" fill="none" stroke={GREEN_D} strokeWidth={3.4} />
      <ellipse cx={40} cy={51} rx={9} ry={4} transform="rotate(-30 40 51)" fill="#86efac" stroke={GREEN_D} strokeWidth={1.8} />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx={32} cy={12} rx={7.6} ry={11} transform={`rotate(${a} 32 24)`} fill={t.fill} stroke={t.stroke} strokeWidth={2} />
      ))}
      <circle cx={32} cy={24} r={6.4} fill={GOLD} stroke={GOLD_D} strokeWidth={2} />
      <circle cx={30} cy={22} r={1.6} fill="#fef3c7" />
    </g>
  ),

  sprout: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 46C32 36 32 28 32 20" fill="none" stroke={GREEN_D} strokeWidth={3.6} />
      <ellipse cx={21} cy={19} rx={11} ry={5.4} transform="rotate(-28 21 19)" fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
      <ellipse cx={43} cy={19} rx={11} ry={5.4} transform="rotate(28 43 19)" fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
      <path d="M32 20C30 14 32 9 36 6" fill="none" stroke={GREEN_D} strokeWidth={2.4} />
      <path d="M3 46C20 36 44 36 61 46V60H3Z" fill="#dfcab5" stroke={BROWN_D} strokeWidth={2.4} />
      <ellipse cx={22} cy={54} rx={6} ry={3.6} fill="#f0e6db" stroke={BROWN_D} strokeWidth={1.6} />
      <path d="M32 46C32 52 30 56 26 58M32 46C35 52 40 54 44 56" fill="none" stroke={BROWN_D} strokeWidth={1.8} />
    </g>
  ),

  fruit: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 16C22 8 6 16 8 34C10 50 22 60 32 56C42 60 54 50 56 34C58 16 42 8 32 16Z" fill="#fecaca" stroke={RED_D} strokeWidth={2.6} />
      <path d="M32 16C32 10 34 6 38 4" fill="none" stroke={BROWN_D} strokeWidth={2.6} />
      <path d="M38 8C44 2 54 4 54 10C48 14 40 12 38 8Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
      <ellipse cx={32} cy={36} rx={9} ry={13} fill="#fefefc" stroke={RED_D} strokeWidth={1.8} />
      <ellipse cx={29} cy={33} rx={2} ry={3.2} fill={BROWN_D} />
      <ellipse cx={35} cy={33} rx={2} ry={3.2} fill={BROWN_D} />
      <ellipse cx={32} cy={42} rx={2} ry={3.2} fill={BROWN_D} />
      <path d="M14 24c0-4 3-7 7-8" fill="none" stroke="#ffffff" strokeWidth={2.4} opacity={0.8} />
    </g>
  ),

  stoma: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={32} cy={32} rx={6} ry={16} fill="#e8e5da" />
      <path d="M32 8C16 10 8 22 8 32C8 42 16 54 32 56C25 46 24 40 24 32C24 24 25 18 32 8Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2.4} />
      <path d="M32 8C48 10 56 22 56 32C56 42 48 54 32 56C39 46 40 40 40 32C40 24 39 18 32 8Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2.4} />
      {([[14, 32], [18, 22], [18, 42], [50, 32], [46, 22], [46, 42]] as P2[]).map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={3} ry={2.2} fill={GREEN} stroke={GREEN_D} strokeWidth={1.2} />
      ))}
    </g>
  ),

  // ───────── Zoologia ─────────
  butterfly: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={19} cy={22} rx={15} ry={11} transform="rotate(-25 19 22)" fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <ellipse cx={45} cy={22} rx={15} ry={11} transform="rotate(25 45 22)" fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <ellipse cx={22} cy={44} rx={10} ry={9} transform="rotate(20 22 44)" fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
      <ellipse cx={42} cy={44} rx={10} ry={9} transform="rotate(-20 42 44)" fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
      {([[14, 21, 3], [50, 21, 3], [22, 45, 2.6], [42, 45, 2.6]] as [number, number, number][]).map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={GOLD} stroke={GOLD_D} strokeWidth={1.2} />
      ))}
      <ellipse cx={32} cy={33} rx={2.9} ry={16} fill={t.stroke} />
      <path d="M31 18Q28 9 22 6M33 18Q36 9 42 6" fill="none" stroke={t.stroke} strokeWidth={1.8} />
      <circle cx={22} cy={6} r={1.8} fill={t.stroke} />
      <circle cx={42} cy={6} r={1.8} fill={t.stroke} />
    </g>
  ),

  coral: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      {['M32 58V34', 'M32 46L18 30L18 17', 'M32 40L46 26L50 13', 'M32 34L30 9'].map((d) => (
        <g key={d}>
          <path d={d} stroke={t.stroke} strokeWidth={11} />
        </g>
      ))}
      {['M32 58V34', 'M32 46L18 30L18 17', 'M32 40L46 26L50 13', 'M32 34L30 9'].map((d) => (
        <path key={d} d={d} stroke={t.mid} strokeWidth={7} />
      ))}
      {([[18, 17], [50, 13], [30, 9]] as P2[]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.4} fill="#fde68a" stroke={GOLD_D} strokeWidth={1.4} />
      ))}
      <path d="M10 60C20 56 44 56 54 60" stroke={BROWN_D} strokeWidth={3} />
      {([[40, 52], [24, 50], [46, 40]] as P2[]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.6} fill={GREEN} stroke={GREEN_D} strokeWidth={1} />
      ))}
    </g>
  ),

  snail: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M3 54C3 47 9 44 14 45L26 46L52 52C58 53 58 58 52 58H8C5 58 3 56 3 54Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <path d="M9 45L6 33M14 45L14 32" fill="none" stroke={t.stroke} strokeWidth={2.2} />
      <circle cx={6} cy={32} r={2.2} fill={t.stroke} />
      <circle cx={14} cy={31} r={2.2} fill={t.stroke} />
      <circle cx={38} cy={28} r={18} fill={t.mid} stroke={t.stroke} strokeWidth={2.6} />
      <path d={spiralPath(38, 28, 1, 1.4, 11)} fill="none" stroke={t.stroke} strokeWidth={2} />
    </g>
  ),

  fish: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M48 32L61 20V44Z" fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <path d="M26 20L34 9L40 21" fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <path d="M8 32C16 14 40 14 50 32C40 50 16 50 8 32Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path d="M24 23Q19 32 24 41" fill="none" stroke={t.stroke} strokeWidth={2} />
      <circle cx={16} cy={29} r={2.6} fill="#24221e" />
      <path d="M30 28q3 2 6 0M34 34q3 2 6 0M30 38q3 2 6 0" fill="none" stroke={t.mid} strokeWidth={1.6} />
    </g>
  ),

  worm: (t) => {
    const segs: [number, number, number][] = [
      [57, 21, 5], [53, 29, 5.4], [46, 34, 6], [38, 35, 6.4], [30, 34, 6.4], [22, 36, 6.2], [15, 40, 6], [8, 46, 5.6],
    ]
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        {segs.map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill={i === 3 ? '#f9a8d4' : i % 2 ? t.fill : t.mid} stroke={t.stroke} strokeWidth={2} />
        ))}
        <circle cx={59} cy={19} r={1.6} fill="#24221e" />
      </g>
    )
  },

  ant: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      <path d="M26 30L18 17L13 11M28 30L28 14M30 30L38 16M26 34L18 47L13 53M28 34L28 50M30 34L38 48" stroke={t.stroke} strokeWidth={2} />
      <path d="M11 27L6 17M16 26L21 14" stroke={t.stroke} strokeWidth={1.8} />
      <ellipse cx={46} cy={32} rx={13} ry={9} fill={t.mid} stroke={t.stroke} strokeWidth={2.4} />
      <ellipse cx={28} cy={32} rx={8} ry={6} fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <circle cx={14} cy={32} r={7} fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <circle cx={12} cy={30} r={1.6} fill={t.stroke} />
    </g>
  ),

  sponge: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M20 58C14 46 12 30 16 16H48C52 30 50 46 44 58Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <ellipse cx={32} cy={16} rx={16} ry={5.4} fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      {([[22, 30], [37, 28], [28, 40], [40, 42], [23, 48]] as P2[]).map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx={2.6} ry={2} fill={t.stroke} opacity={0.7} />
      ))}
      <Arrow x0={4} y0={36} x1={12} y1={36} color={BLUE_D} w={1.8} head={4} />
      <Arrow x0={56} y0={44} x1={48} y1={44} color={BLUE_D} w={1.8} head={4} />
      <Arrow x0={32} y0={11} x1={32} y1={3} color={BLUE_D} w={1.8} head={4} />
    </g>
  ),

  jellyfish: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      {[16, 24, 32, 40, 48].map((x, i) => (
        <path key={x} d={`M${x} 32q${i % 2 ? 4 : -4} 8 0 14t0 14`} stroke={t.mid} strokeWidth={2.4} />
      ))}
      <path d="M32 32q-5 9 0 16t0 11" stroke={t.stroke} strokeWidth={3.2} />
      <path d="M8 32C8 12 56 12 56 32Q50 27 44 32Q38 27 32 32Q26 27 20 32Q14 27 8 32Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      {([[24, 22], [38, 20], [46, 26]] as P2[]).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} fill={t.mid} stroke="none" />
      ))}
    </g>
  ),

  // ───────── Biotecnologia ─────────
  pcr: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={6} y={4} width={26} height={7} rx={2.5} fill={t.mid} stroke={t.stroke} strokeWidth={2} />
      <path d="M8 11H30L27 38Q19 58 11 38Z" fill="#f3f2eb" />
      <path d="M10.2 30H27.8L27 38Q19 58 11 38Z" fill="#bfdbfe" />
      <path d="M8 11H30L27 38Q19 58 11 38Z" fill="none" stroke={t.stroke} strokeWidth={2.2} />
      <path d="M38 54V10M38 54H60" fill="none" stroke={t.stroke} strokeWidth={2} />
      <path d="M40 46V16H46V38H52V28H58" fill="none" stroke={RED_D} strokeWidth={2.4} />
    </g>
  ),

  crispr: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      <g transform="translate(-14 3) scale(0.9)">
        <Helix stroke={t.stroke} mid={t.mid} />
      </g>
      <path d="M30 23L60 38M30 41L60 26" stroke={RED_D} strokeWidth={5} />
      <path d="M30 23L60 38M30 41L60 26" stroke={RED} strokeWidth={2.4} />
      <circle cx={60} cy={39} r={3.4} fill="#fefefc" stroke={RED_D} strokeWidth={2} />
      <circle cx={60} cy={25} r={3.4} fill="#fefefc" stroke={RED_D} strokeWidth={2} />
      <polygon points={burstPoints(28, 32, 4.5, 2, 6)} fill={GOLD} stroke={GOLD_D} strokeWidth={1} />
    </g>
  ),

  plasmid: (t) => {
    const [ax, ay] = polar(32, 32, 12, -75)
    const [bx, by] = polar(32, 32, 27, -75)
    const [cx, cy] = polar(32, 32, 12, 5)
    const [dx, dy] = polar(32, 32, 27, 5)
    const [ox, oy] = polar(32, 32, 19, 110)
    return (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <circle cx={32} cy={32} r={19} stroke={t.stroke} strokeWidth={8.4} />
        <circle cx={32} cy={32} r={19} stroke={t.fill} strokeWidth={4.8} />
        <path d={arcPath(32, 32, 19, -75, 5)} stroke={RED_D} strokeWidth={8.4} />
        <path d={arcPath(32, 32, 19, -75, 5)} stroke={RED} strokeWidth={4.8} />
        <path d={`M${ax} ${ay}L${bx} ${by}M${cx} ${cy}L${dx} ${dy}`} stroke="#24221e" strokeWidth={1.8} />
        <circle cx={ox} cy={oy} r={3.6} fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      </g>
    )
  },

  corn: () => {
    const th = (-20 * Math.PI) / 180
    const kernels: P2[] = []
    for (let r = -4; r <= 3; r++) {
      for (let c = -1; c <= 1; c++) {
        const dx = c * 6.4
        const dy = r * 6.2
        if ((dx / 9.4) ** 2 + (dy / 21) ** 2 > 1) continue
        kernels.push([n1(34 + dx * Math.cos(th) - dy * Math.sin(th)), n1(30 + dx * Math.sin(th) + dy * Math.cos(th))])
      }
    }
    return (
      <g strokeLinejoin="round" strokeLinecap="round">
        <ellipse cx={34} cy={30} rx={11} ry={24} transform="rotate(-20 34 30)" fill="#fde68a" stroke={GOLD_D} strokeWidth={2.4} />
        {kernels.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.7} fill={GOLD} stroke={GOLD_D} strokeWidth={1} />
        ))}
        <path d="M14 60C8 42 16 30 28 26C25 40 28 52 34 60Z" fill="#86efac" stroke={GREEN_D} strokeWidth={2.2} />
        <path d="M54 60C58 44 50 34 40 30C42 42 40 52 34 60Z" fill="#4ade80" stroke={GREEN_D} strokeWidth={2.2} />
      </g>
    )
  },

  stemcell: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <Arrow x0={26} y0={25} x1={18} y1={17} color={t.stroke} w={2} head={5} />
      <Arrow x0={38} y0={25} x1={46} y1={17} color={t.stroke} w={2} head={5} />
      <Arrow x0={32} y0={43} x1={32} y1={51} color={t.stroke} w={2} head={5} />
      <circle cx={32} cy={32} r={10.4} fill={t.mid} stroke={t.stroke} strokeWidth={2.4} />
      <circle cx={29.5} cy={29.5} r={3.2} fill={t.fill} />
      <polygon points={burstPoints(11, 11, 9.4, 4.4, 5)} fill={BLUE} stroke={BLUE_D} strokeWidth={1.8} />
      <circle cx={53} cy={11} r={8} fill={RED} stroke={RED_D} strokeWidth={2} />
      <ellipse cx={53} cy={11} rx={3.4} ry={2} fill="#fecaca" />
      <rect x={21} y={52} width={22} height={9} rx={4.5} fill="#f9a8d4" stroke="#be185d" strokeWidth={2} />
    </g>
  ),

  flask: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M26 6H38V22L54 52C56 56 54 58 50 58H14C10 58 8 56 10 52L26 22Z" fill="#f3f2eb" />
      <path d="M16.4 40H47.6L54 52C56 56 54 58 50 58H14C10 58 8 56 10 52Z" fill={t.mid} opacity={0.9} />
      <circle cx={28} cy={49} r={2.6} fill="#ffffff" opacity={0.75} />
      <circle cx={37} cy={45} r={2} fill="#ffffff" opacity={0.75} />
      <circle cx={41} cy={52} r={1.8} fill="#ffffff" opacity={0.75} />
      <path d="M26 6H38V22L54 52C56 56 54 58 50 58H14C10 58 8 56 10 52L26 22Z" fill="none" stroke={t.stroke} strokeWidth={2.4} />
      <rect x={23} y={3} width={18} height={5} rx={2} fill={t.mid} stroke={t.stroke} strokeWidth={2} />
    </g>
  ),
})
