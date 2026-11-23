import { Arrow, FONT, Helix, arcPath, burstPoints, defineMotifs, n1, polar } from './helpers'

const GOLD = '#fbbf24'
const GOLD_D = '#b45309'
const RED = '#f87171'
const RED_D = '#b91c1c'
const BLUE = '#60a5fa'
const BLUE_D = '#1d4ed8'
const GREEN = '#4ade80'
const GREEN_D = '#15803d'

type P2 = [number, number]

export const cellMotifs = defineMotifs({
  // ───────── Biologia celular ─────────
  cell: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 5C45 4 59 14 59 31C59 48 47 59 32 59C16 59 5 48 5 32C5 16 18 6 32 5Z" fill={t.fill} stroke={t.stroke} strokeWidth={2.4} />
      <circle cx={29} cy={29} r={11} fill={t.mid} stroke={t.stroke} strokeWidth={2} />
      <circle cx={26} cy={26} r={3.6} fill={t.stroke} />
      <ellipse cx={47} cy={42} rx={6} ry={3.4} transform="rotate(-35 47 42)" fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      <ellipse cx={17} cy={46} rx={5} ry={3} transform="rotate(25 17 46)" fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      <path d="M43 15c4-2 8 0 9 4" fill="none" stroke={t.stroke} strokeWidth={1.8} />
      <path d="M41 20c3-1 6 0 7 3" fill="none" stroke={t.stroke} strokeWidth={1.8} />
    </g>
  ),

  plantcell: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <rect x={6} y={9} width={52} height={46} rx={11} fill={t.fill} stroke={t.stroke} strokeWidth={3.6} />
      <rect x={10.5} y={13.5} width={43} height={37} rx={8} fill="none" stroke={t.mid} strokeWidth={1.4} />
      <path d="M22 22c6-5 18-4 22 3 4 8-2 17-12 17s-13-12-10-20z" fill="#bfdbfe" stroke={BLUE_D} strokeWidth={1.8} />
      <circle cx={46} cy={20} r={4.5} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <ellipse cx={16} cy={43} rx={5} ry={3} fill={GREEN} stroke={GREEN_D} strokeWidth={1.6} />
      <ellipse cx={47} cy={46} rx={5} ry={3} fill={GREEN} stroke={GREEN_D} strokeWidth={1.6} />
      <ellipse cx={15} cy={25} rx={4} ry={2.6} fill={GREEN} stroke={GREEN_D} strokeWidth={1.6} />
    </g>
  ),

  bacteria: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round" fill="none">
      <rect x={12} y={20} width={40} height={22} rx={11} transform="rotate(-18 32 31)" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <rect x={16.5} y={24.5} width={31} height={13} rx={6.5} transform="rotate(-18 32 31)" stroke={t.mid} strokeWidth={1.4} />
      <path d="M23 35c3-6 6 2 9-3s5 1 8-4" stroke={t.stroke} strokeWidth={1.8} />
      <path d="M13 38C6 40 9 47 3 50" stroke={t.stroke} strokeWidth={2} />
      <path d="M52 24c3-3 7-3 10-6" stroke={t.stroke} strokeWidth={2} />
      <path d="M26 16l-2-5M34 14l-1-5M42 17l1-5" stroke={t.stroke} strokeWidth={1.6} />
    </g>
  ),

  nucleus: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={32} cy={32} r={25} fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <circle cx={32} cy={32} r={20.5} fill="none" stroke={t.mid} strokeWidth={1.8} strokeDasharray="1 5" />
      <circle cx={37} cy={29} r={7} fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
      <path d="M17 38c4 6 8-2 12 3M19 24c3-4 6 0 8-5M40 42c3 3 6 1 7-2" fill="none" stroke={t.stroke} strokeWidth={1.8} />
    </g>
  ),

  mitochondria: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={32} cy={32} rx={27} ry={17} transform="rotate(-20 32 32)" fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <path
        d="M12 38c4 0 4-8 8-8s4 10 8 10 4-12 8-12 4 12 8 12 4-8 8-8"
        transform="rotate(-20 32 32)"
        fill="none"
        stroke={t.mid}
        strokeWidth={3}
      />
    </g>
  ),

  chloroplast: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={32} cy={32} rx={27} ry={19} transform="rotate(-15 32 32)" fill="#dcfce7" stroke={GREEN_D} strokeWidth={2.6} />
      <g transform="rotate(-15 32 32)" stroke={GREEN_D} strokeWidth={1.5} fill={GREEN}>
        {[16, 32, 48].map((x) => (
          <g key={x}>
            <rect x={x - 6} y={22} width={12} height={4.4} rx={2.2} />
            <rect x={x - 6} y={28} width={12} height={4.4} rx={2.2} />
            <rect x={x - 6} y={34} width={12} height={4.4} rx={2.2} />
          </g>
        ))}
      </g>
    </g>
  ),

  membrane: (t) => (
    <g strokeLinecap="round">
      {[6, 14, 22, 42, 50, 58].map((x) => (
        <g key={x}>
          <path d={`M${x - 1.6} 18.5V29M${x + 1.6} 18.5V28`} stroke={t.stroke} strokeWidth={1.6} fill="none" />
          <path d={`M${x - 1.6} 45.5V35M${x + 1.6} 45.5V36`} stroke={t.stroke} strokeWidth={1.6} fill="none" />
          <circle cx={x} cy={14} r={4.4} fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
          <circle cx={x} cy={50} r={4.4} fill={t.mid} stroke={t.stroke} strokeWidth={1.8} />
        </g>
      ))}
      <rect x={26} y={7} width={12} height={50} rx={6} fill={GOLD} stroke={GOLD_D} strokeWidth={2} />
      <rect x={30} y={14} width={4} height={36} rx={2} fill="#fefefc" />
    </g>
  ),

  ribosome: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <ellipse cx={32} cy={40} rx={19} ry={11} fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <ellipse cx={32} cy={21} rx={13} ry={8} fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
      <path d="M2 30C14 26 20 33 32 30S50 26 62 30" fill="none" stroke={RED_D} strokeWidth={2.4} />
      <circle cx={37} cy={52} r={3} fill={RED} stroke={RED_D} strokeWidth={1.4} />
      <circle cx={42} cy={56} r={3} fill={GOLD} stroke={GOLD_D} strokeWidth={1.4} />
      <circle cx={48} cy={57} r={3} fill={BLUE} stroke={BLUE_D} strokeWidth={1.4} />
    </g>
  ),

  golgi: (t) => (
    <g fill="none" strokeLinecap="round">
      {[20, 29, 38, 47].map((y, i) => (
        <g key={y}>
          <path d={`M${12 - i} ${y}Q32 ${y - 9} ${52 + i} ${y}`} stroke={t.stroke} strokeWidth={7.4} />
          <path d={`M${12 - i} ${y}Q32 ${y - 9} ${52 + i} ${y}`} stroke={t.mid} strokeWidth={4} />
        </g>
      ))}
      <circle cx={57} cy={12} r={3.4} fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      <circle cx={61} cy={24} r={3} fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
      <circle cx={6} cy={54} r={3.4} fill={GOLD} stroke={GOLD_D} strokeWidth={1.6} />
    </g>
  ),

  lysosome: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <circle cx={32} cy={32} r={24} fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <circle cx={23} cy={25} r={4.2} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <circle cx={38} cy={22} r={3.6} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <circle cx={31} cy={37} r={4.6} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <circle cx={44} cy={36} r={3.4} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <circle cx={20} cy={40} r={3.2} fill={t.mid} stroke={t.stroke} strokeWidth={1.6} />
      <path d="M26 46c3 2 7 2 10 0" fill="none" stroke={t.stroke} strokeWidth={1.6} />
    </g>
  ),

  // ───────── Divisão celular ─────────
  mitosis: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path
        d="M32 6C46 6 56 14 56 24C56 28 52 30 48 32C52 34 56 36 56 40C56 50 46 58 32 58C18 58 8 50 8 40C8 36 12 34 16 32C12 30 8 28 8 24C8 14 18 6 32 6Z"
        fill={t.fill}
        stroke={t.stroke}
        strokeWidth={2.4}
      />
      <g stroke={t.stroke} strokeWidth={2.8} fill="none">
        <path d="M22 16l6 8M28 16l-6 8M34 16l6 8M40 16l-6 8" />
        <path d="M22 40l6 8M28 40l-6 8M34 40l6 8M40 40l-6 8" />
      </g>
    </g>
  ),

  meiosis: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      {([[19, 19], [45, 19], [19, 45], [45, 45]] as P2[]).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={12} fill={i % 2 ? t.mid : t.fill} stroke={t.stroke} strokeWidth={2.2} />
          <path d={`M${x - 4} ${y + 5}L${x + 4} ${y - 5}`} stroke={[RED, BLUE, GOLD, GREEN][i]} strokeWidth={3.6} fill="none" />
        </g>
      ))}
    </g>
  ),

  chromosome: (t) => (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M20 10L44 54" stroke={t.stroke} strokeWidth={15} />
      <path d="M44 10L20 54" stroke={t.stroke} strokeWidth={15} />
      <path d="M20 10L44 54" stroke={t.mid} strokeWidth={11} />
      <path d="M44 10L20 54" stroke={t.mid} strokeWidth={11} />
      <circle cx={32} cy={32} r={5.4} fill={t.fill} stroke={t.stroke} strokeWidth={2} />
      <path d="M17 18l5-3M47 18l-5-3M17 46l5 3M47 46l-5 3" stroke={t.fill} strokeWidth={1.8} />
    </g>
  ),

  cycle: (t) => {
    const head = (a: number, color: string) => {
      const [x, y] = polar(32, 32, 22, a)
      const rad = (a * Math.PI) / 180
      const tx = -Math.sin(rad)
      const ty = Math.cos(rad)
      const nx = Math.cos(rad)
      const ny = Math.sin(rad)
      const tip = [x + tx * 9, y + ty * 9]
      const p1 = [x + nx * 7, y + ny * 7]
      const p2 = [x - nx * 7, y - ny * 7]
      return <polygon points={`${n1(tip[0])},${n1(tip[1])} ${n1(p1[0])},${n1(p1[1])} ${n1(p2[0])},${n1(p2[1])}`} fill={color} />
    }
    const arcs: [number, number, string][] = [
      [-75, 15, t.stroke],
      [45, 135, t.mid],
      [165, 255, t.stroke],
    ]
    return (
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {arcs.map(([a0, a1, c]) => (
          <g key={a0}>
            <path d={arcPath(32, 32, 22, a0, a1)} stroke={c} strokeWidth={6} />
            {head(a1, c)}
          </g>
        ))}
        <circle cx={32} cy={32} r={6.5} fill={t.fill} stroke={t.stroke} strokeWidth={2} />
      </g>
    )
  },

  tumor: (t) => (
    <g strokeLinejoin="round" strokeLinecap="round">
      {([[24, 27, 12], [41, 24, 11], [32, 41, 13], [47, 43, 9], [17, 43, 8]] as [number, number, number][]).map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={i % 2 ? t.fill : t.mid} stroke={t.stroke} strokeWidth={2.2} />
          <circle cx={x + 1.5} cy={y - 1} r={r * 0.42} fill={t.stroke} />
        </g>
      ))}
      <path d="M52 12l5-5M55 18h6M48 8l1-6" stroke={RED_D} strokeWidth={2.2} fill="none" />
    </g>
  ),

  // ───────── Genética molecular ─────────
  dna: (t) => <Helix stroke={t.stroke} mid={t.mid} />,

  rna: (t) => {
    const pts: P2[] = []
    for (let i = 0; i <= 8; i++) pts.push([6 + i * 6.5, 32 + 9 * Math.sin(i * 1.1)])
    const colors = [GOLD, RED, BLUE, GREEN]
    return (
      <g strokeLinecap="round" strokeLinejoin="round">
        {pts.map(([x, y], i) => {
          const up = i % 2 === 0
          const y2 = up ? y - 13 : y + 13
          return (
            <g key={i}>
              <line x1={n1(x)} y1={n1(y)} x2={n1(x)} y2={n1(y2)} stroke={t.stroke} strokeWidth={1.6} />
              <circle cx={n1(x)} cy={n1(y2)} r={3.6} fill={colors[i % 4]} stroke={t.stroke} strokeWidth={1.4} />
            </g>
          )
        })}
        <path d={pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n1(x)} ${n1(y)}`).join('')} fill="none" stroke={t.mid} strokeWidth={5} />
        <path d={pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n1(x)} ${n1(y)}`).join('')} fill="none" stroke={t.stroke} strokeWidth={1.6} />
      </g>
    )
  },

  protein: (t) => {
    const path = 'M8 44C8 28 24 36 24 24C24 12 40 10 42 22C44 32 30 34 36 44C40 52 54 50 56 40'
    const beads: [number, number, string][] = [
      [8, 44, GOLD], [16, 32.5, RED], [24, 24, BLUE], [32, 14, GREEN], [42, 22, GOLD],
      [37.5, 33, RED], [36, 44, BLUE], [47, 49, GREEN], [56, 40, GOLD],
    ]
    return (
      <g strokeLinecap="round" strokeLinejoin="round">
        <path d={path} fill="none" stroke={t.stroke} strokeWidth={8} />
        <path d={path} fill="none" stroke={t.fill} strokeWidth={4.6} />
        {beads.map(([x, y, c], i) => (
          <circle key={i} cx={x} cy={y} r={3.4} fill={c} stroke={t.stroke} strokeWidth={1.3} />
        ))}
      </g>
    )
  },

  mutation: (t) => (
    <g>
      <g transform="translate(-9 3) scale(0.9)">
        <Helix stroke={t.stroke} mid={t.mid} />
      </g>
      <polygon points={burstPoints(48, 17, 13, 6, 8)} fill={GOLD} stroke={GOLD_D} strokeWidth={1.8} strokeLinejoin="round" />
      <path d="M48 12v10M43 17h10" stroke={RED_D} strokeWidth={2} strokeLinecap="round" />
    </g>
  ),

  switch: (t) => (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x={8} y={22} width={48} height={24} rx={12} fill={t.fill} stroke={t.stroke} strokeWidth={2.6} />
      <circle cx={44} cy={34} r={9} fill={t.mid} stroke={t.stroke} strokeWidth={2.2} />
      <path d="M32 6v7M20 9l3 6M44 9l-3 6" fill="none" stroke={GOLD_D} strokeWidth={2.2} />
      <rect x={10} y={52} width={44} height={6} rx={3} fill={GREEN} stroke={GREEN_D} strokeWidth={1.8} />
    </g>
  ),

  // ───────── Genética clássica ─────────
  punnett: (t) => (
    <g strokeLinejoin="round">
      {([[8, 8, 'AA', t.fill], [32, 8, 'Aa', t.fill], [8, 32, 'Aa', t.fill], [32, 32, 'aa', '#fde68a']] as [number, number, string, string][]).map(
        ([x, y, l, f]) => (
          <g key={`${x}${y}`}>
            <rect x={x} y={y} width={24} height={24} rx={4} fill={f} stroke={t.stroke} strokeWidth={2.2} />
            <text x={x + 12} y={y + 12.5} textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700} fill={t.text} fontFamily={FONT}>
              {l}
            </text>
          </g>
        )
      )}
    </g>
  ),

  pedigree: (t) => (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 13H43M32.5 13V30M18 30H46M18 30V37M46 30V37" fill="none" stroke={t.stroke} strokeWidth={2} />
      <rect x={8} y={6} width={14} height={14} fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
      <circle cx={50} cy={13} r={7.4} fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
      <circle cx={18} cy={45} r={8} fill={t.stroke} stroke={t.stroke} strokeWidth={2.2} />
      <rect x={39} y={38} width={14} height={14} fill={t.fill} stroke={t.stroke} strokeWidth={2.2} />
    </g>
  ),

  pea: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M6 40C6 18 30 8 58 14C54 40 30 54 6 40Z" fill="#bbf7d0" stroke={GREEN_D} strokeWidth={2.6} />
      <path d="M58 14C61 9 59 5 54 3" fill="none" stroke={GREEN_D} strokeWidth={2.6} />
      {([[18, 36], [29, 31], [40, 27], [50, 23]] as P2[]).map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={6.4} fill="#86efac" stroke={GREEN_D} strokeWidth={2} />
          <circle cx={x - 2} cy={y - 2} r={1.8} fill="#f0fdf4" />
        </g>
      ))}
    </g>
  ),

  xy: () => (
    <g strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M10 12L28 52" stroke="#9d4e28" strokeWidth={10} />
      <path d="M28 12L10 52" stroke="#9d4e28" strokeWidth={10} />
      <path d="M10 12L28 52" stroke="#d8965c" strokeWidth={6.5} />
      <path d="M28 12L10 52" stroke="#d8965c" strokeWidth={6.5} />
      <path d="M46 34L38 14M46 34L54 14M46 34V54" stroke={BLUE_D} strokeWidth={10} />
      <path d="M46 34L38 14M46 34L54 14M46 34V54" stroke={BLUE} strokeWidth={6.5} />
    </g>
  ),

  bloodtype: () => (
    <g strokeLinejoin="round" strokeLinecap="round">
      <path d="M32 5C32 5 12 28 12 40C12 52 21 59 32 59C43 59 52 52 52 40C52 28 32 5 32 5Z" fill="#fee2e2" stroke={RED_D} strokeWidth={2.6} />
      <path d="M22 42C22 36 25 31 29 27" fill="none" stroke="#ffffff" strokeWidth={2.6} opacity={0.8} />
      <text x={33} y={43} textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={800} fill="#7f1d1d" fontFamily={FONT}>
        ABO
      </text>
    </g>
  ),
})
