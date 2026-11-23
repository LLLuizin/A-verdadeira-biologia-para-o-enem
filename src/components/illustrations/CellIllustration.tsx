'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { tones, type Tone } from './palette'
import { InfoCard, PartChips, TipBox } from './DiagramUI'

interface CellIllustrationProps {
  type: 'animal' | 'vegetal' | 'bacteria'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

interface Part {
  id: string
  label: string
  tone: Tone
  badge: [number, number]
  description: string
  function: string
}

const widthClasses = { sm: 'max-w-md', md: 'max-w-2xl', lg: 'max-w-3xl' }

const MITO_FUNCTION =
  'Realiza a respiração celular aeróbica: glicose + O₂ → ATP + CO₂ + H₂O. Tem DNA próprio, ribossomos próprios e se divide por conta própria (teoria da endossimbiose). As dobras internas (cristas) aumentam a área para produzir ATP.'

const parts: Record<CellIllustrationProps['type'], Part[]> = {
  animal: [
    { id: 'nucleus', label: 'Núcleo', tone: 'argila', badge: [388, 182], description: 'O "centro de comando" da célula', function: 'Guarda o DNA (cromatina) e controla o metabolismo, o crescimento e a divisão. É envolvido pela carioteca (dupla membrana com poros). O nucléolo produz os ribossomos.' },
    { id: 'rer', label: 'Retículo endoplasmático', tone: 'ceu', badge: [238, 160], description: 'Rede de canais e fábrica de moléculas', function: 'RE rugoso (com ribossomos): produz proteínas para exportação e para a membrana. RE liso (sem ribossomos): produz lipídios, desintoxica e estoca Ca²⁺.' },
    { id: 'golgi', label: 'Complexo de Golgi', tone: 'flor', badge: [536, 108], description: 'O "correio" da célula', function: 'Recebe proteínas do RE, modifica, empacota em vesículas e distribui: para a membrana, para secreção (exocitose) ou para formar lisossomos.' },
    { id: 'mitochondria', label: 'Mitocôndrias', tone: 'terra', badge: [100, 148], description: 'A "usina de energia"', function: MITO_FUNCTION },
    { id: 'lysosome', label: 'Lisossomos', tone: 'argila', badge: [462, 382], description: 'O "sistema digestivo" da célula', function: 'Vesículas com enzimas hidrolíticas (pH ácido ~5) que digerem partículas fagocitadas e organelas velhas (autofagia). Originam-se do Golgi.' },
    { id: 'centrioles', label: 'Centríolos', tone: 'musgo', badge: [448, 326], description: 'Organizam o fuso de divisão', function: 'Par de cilindros perpendiculares (9 trios de microtúbulos). Formam o centrossomo e organizam o fuso mitótico e os cílios/flagelos. Ausentes em plantas.' },
    { id: 'ribosomes', label: 'Ribossomos', tone: 'tinta', badge: [316, 318], description: 'Fábricas de proteínas', function: 'Leem o mRNA e ligam aminoácidos (tradução). Livres no citosol: proteínas de uso interno. Presos ao RE: proteínas de exportação. Não têm membrana.' },
    { id: 'cytoplasm', label: 'Citoplasma', tone: 'verde', badge: [92, 330], description: 'Meio gelatinoso onde ficam as organelas', function: 'Citosol (água, íons, enzimas) + organelas + citoesqueleto. Sede da glicólise e de grande parte do metabolismo celular.' },
    { id: 'membrane', label: 'Membrana plasmática', tone: 'verde', badge: [583, 112], description: 'A barreira seletiva da célula', function: 'Bicamada de fosfolipídios com proteínas (modelo mosaico fluido). Controla o que entra e sai (transporte passivo e ativo), reconhece sinais e permite a adesão entre células.' },
  ],
  vegetal: [
    { id: 'cellWall', label: 'Parede celular', tone: 'musgo', badge: [622, 40], description: 'Armadura externa rígida (só em plantas)', function: 'Feita de celulose, hemicelulose e pectina. Dá forma e proteção, evita o estouro por osmose e é permeável (deixa passar água e solutos). Não é membrana!' },
    { id: 'membrane', label: 'Membrana plasmática', tone: 'verde', badge: [588, 160], description: 'Barreira seletiva logo abaixo da parede', function: 'Bicamada lipídica que controla a entrada e a saída de substâncias. Em plantas, fica encostada na parede celular.' },
    { id: 'vacuole', label: 'Vacúolo central', tone: 'ceu', badge: [290, 160], description: 'Grande reservatório de água e solutos', function: 'Ocupa até 90% do volume da célula adulta. Armazena água, sais, açúcares e pigmentos (antocianinas). Mantém o turgor, que dá firmeza à planta.' },
    { id: 'chloroplast', label: 'Cloroplastos', tone: 'verde', badge: [258, 68], description: 'Onde ocorre a fotossíntese', function: 'Luz + CO₂ + H₂O → glicose + O₂. Possuem clorofila nos tilacoides (grana), estroma (ciclo de Calvin) e DNA próprio (endossimbiose). Só em células fotossintetizantes.' },
    { id: 'nucleus', label: 'Núcleo', tone: 'argila', badge: [158, 134], description: 'O "centro de comando" da célula', function: 'Guarda o DNA e controla as atividades celulares. Envolvido pela carioteca. Em células vegetais maduras costuma ficar empurrado para a periferia pelo vacúolo.' },
    { id: 'mitochondria', label: 'Mitocôndrias', tone: 'terra', badge: [56, 296], description: 'A "usina de energia"', function: MITO_FUNCTION + ' Plantas também respiram: precisam de ATP no escuro e em raízes.' },
    { id: 'rer', label: 'Retículo endoplasmático', tone: 'ceu', badge: [58, 236], description: 'Rede de canais e fábrica de moléculas', function: 'Produz proteínas (RE rugoso) e lipídios (RE liso). Conectado à carioteca, transporta substâncias pela célula.' },
    { id: 'golgi', label: 'Complexo de Golgi', tone: 'flor', badge: [206, 372], description: 'O "correio" da célula', function: 'Empacota e distribui proteínas e lipídios. Em plantas, também produz polissacarídeos (pectina, hemicelulose) usados na parede celular.' },
    { id: 'ribosomes', label: 'Ribossomos', tone: 'tinta', badge: [205, 193], description: 'Fábricas de proteínas', function: 'Leem o mRNA e montam as proteínas. Podem estar livres no citosol ou presos ao RE rugoso.' },
    { id: 'cytoplasm', label: 'Citoplasma', tone: 'verde', badge: [268, 346], description: 'Meio onde ficam as organelas', function: 'Citosol, organelas e citoesqueleto. Em células vegetais, é uma camada fina espremida entre a membrana e o vacúolo.' },
  ],
  bacteria: [
    { id: 'capsule', label: 'Cápsula', tone: 'sol', badge: [106, 112], description: 'Camada viscosa protetora (nem todas têm)', function: 'Polissacarídeos que protegem contra fagocitose e ressecamento e ajudam na aderência. Aumenta a virulência de várias bactérias patogênicas.' },
    { id: 'cellWall', label: 'Parede celular', tone: 'musgo', badge: [124, 138], description: 'Parede de peptidoglicano', function: 'Rede de peptidoglicano (açúcares + peptídeos). Dá forma e protege contra o estouro osmótico. Alvo da penicilina, que impede sua formação — por isso não afeta nossas células.' },
    { id: 'membrane', label: 'Membrana plasmática', tone: 'verde', badge: [140, 160], description: 'Barreira e sede de reações vitais', function: 'Bicamada lipídica. Como a bactéria não tem mitocôndrias, a respiração celular (cadeia respiratória) e a produção de ATP ocorrem na membrana. Em cianobactérias, a fotossíntese também.' },
    { id: 'nucleoid', label: 'Nucleoide (DNA)', tone: 'argila', badge: [262, 168], description: 'Região do cromossomo bacteriano', function: 'DNA circular único, sem histonas e SEM carioteca (por isso é procarionte: não tem núcleo verdadeiro). Duplica-se antes da divisão binária.' },
    { id: 'plasmid', label: 'Plasmídeos', tone: 'flor', badge: [492, 158], description: 'Pequenos DNAs circulares extras', function: 'Replicam-se independentemente do cromossomo. Carregam genes de resistência a antibióticos e podem ser transferidos na conjugação. Muito usados como vetores na engenharia genética.' },
    { id: 'ribosomes', label: 'Ribossomos 70S', tone: 'tinta', badge: [195, 256], description: 'Fábricas de proteínas (menores)', function: 'São 70S (30S + 50S), menores que os 80S dos eucariontes. Antibióticos como tetraciclina e estreptomicina bloqueiam o ribossomo 70S sem atingir o nosso.' },
    { id: 'cytoplasm', label: 'Citoplasma', tone: 'verde', badge: [560, 270], description: 'Meio interno da bactéria', function: 'Contém citosol, ribossomos, nucleoide e plasmídeos. Não há organelas membranosas (sem mitocôndria, RE ou Golgi).' },
    { id: 'flagellum', label: 'Flagelo', tone: 'ceu', badge: [650, 198], description: 'Motor de locomoção', function: 'Filamento de flagelina movido por um motor rotatório na base. Permite a quimiotaxia (nadar em direção a nutrientes). É diferente do flagelo eucarionte (9+2 microtúbulos).' },
    { id: 'pili', label: 'Fímbrias e pili', tone: 'argila', badge: [130, 86], description: 'Pelos de adesão e conjugação', function: 'Fímbrias: fixam a bactéria em superfícies e tecidos. Pilus sexual: tubo que une duas bactérias para transferir DNA (conjugação).' },
  ],
}

const subtitles = {
  animal: 'Célula animal (eucarionte)',
  vegetal: 'Célula vegetal (eucarionte)',
  bacteria: 'Bactéria (procarionte)',
}

const tips = {
  animal: 'Célula animal NÃO tem parede celular, cloroplastos nem vacúolo central grande. Só ela (e fungos/protistas) tem centríolos.',
  vegetal: 'Célula vegetal tem parede celular, cloroplastos e vacúolo grande. Não tem centríolos nem lisossomos típicos.',
  bacteria: 'Procarionte: sem núcleo definido e sem organelas membranosas. Tem parede de peptidoglicano, ribossomo 70S e DNA circular.',
}

interface HotProps {
  id: string
  label: string
  focusId: string | null
  selectedId: string | null
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
  children: ReactNode
}

function Hot({ id, label, focusId, selectedId, onHover, onSelect, children }: HotProps) {
  const dim = focusId !== null && focusId !== id
  const active = focusId === id || selectedId === id
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={selectedId === id}
      onClick={(e) => {
        e.stopPropagation()
        onSelect(id)
      }}
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(id)}
      onBlur={() => onHover(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(id)
        }
      }}
      style={{
        cursor: 'pointer',
        opacity: dim ? 0.35 : 1,
        transition: 'opacity 0.2s, filter 0.2s',
        outline: 'none',
        filter: active ? 'drop-shadow(0 0 7px rgba(21,128,61,0.65))' : undefined,
      }}
    >
      {children}
    </g>
  )
}

// ---------- Desenhos reutilizáveis ----------

function Nucleus({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const pores = [20, 80, 150, 210, 280, 330].map((deg) => {
    const a = (deg * Math.PI) / 180
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const
  })
  const s = r / 64
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="url(#grad-nucleus)" stroke="#bf6230" strokeWidth={4} />
      <circle cx={cx} cy={cy} r={r - 6 * s} fill="none" stroke="#e6ba8c" strokeWidth={1.5} />
      {pores.map(([px, py], i) => (
        <circle key={i} cx={px} cy={py} r={3.6 * s + 0.6} fill="#fefefc" stroke="#bf6230" strokeWidth={1.5} />
      ))}
      <g fill="none" stroke="#bf6230" strokeWidth={2} opacity={0.55} strokeLinecap="round">
        <path d={`M${cx - 38 * s} ${cy - 22 * s} q${10 * s} ${-12 * s} ${20 * s} 0 t${20 * s} 0 t${20 * s} 0`} />
        <path d={`M${cx - 38 * s} ${cy + 28 * s} q${10 * s} ${12 * s} ${20 * s} 0 t${20 * s} 0 t${20 * s} 0`} />
        <path d={`M${cx - 30 * s} ${cy + 4 * s} q${8 * s} ${-10 * s} ${16 * s} 0 t${16 * s} 0`} />
      </g>
      <circle cx={cx + 3 * s} cy={cy + 3 * s} r={19 * s} fill="#9d4e28" />
      <circle cx={cx - 3 * s} cy={cy - 4 * s} r={6 * s} fill="#d8965c" opacity={0.85} />
    </g>
  )
}

function Mito({ x, y, rot, s = 1 }: { x: number; y: number; rot: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse rx={40} ry={21} fill="url(#grad-mito)" stroke="#8d3d1e" strokeWidth={3} />
      <ellipse rx={34} ry={15} fill="none" stroke="#fcd9c5" strokeWidth={1.5} />
      <path d="M-28 -2 l6 -13 l6 26 l6 -26 l6 26 l6 -26 l6 26 l6 -26 l6 26" fill="none" stroke="#7c2d12" strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  )
}

function Chloroplast({ x, y, rot }: { x: number; y: number; rot: number }) {
  const stacks = [-20, 0, 20]
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse rx={42} ry={23} fill="#4ade80" stroke="#15803d" strokeWidth={3} />
      <ellipse rx={36} ry={17} fill="none" stroke="#bbf7d0" strokeWidth={1.5} />
      <path d="M-30 0 H30" stroke="#86efac" strokeWidth={3} />
      {stacks.map((sx) => (
        <g key={sx}>
          {[-9, -2, 5].map((sy) => (
            <rect key={sy} x={sx - 8} y={sy} width={16} height={5.5} rx={2.5} fill="#166534" stroke="#bbf7d0" strokeWidth={0.8} />
          ))}
        </g>
      ))}
    </g>
  )
}

function Lysosome({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={15} fill="#e6ba8c" stroke="#9d4e28" strokeWidth={3} />
      <circle cx={x - 4} cy={y - 3} r={2.5} fill="#9d4e28" />
      <circle cx={x + 4} cy={y - 1} r={2.5} fill="#9d4e28" />
      <circle cx={x} cy={y + 5} r={2.5} fill="#9d4e28" />
    </g>
  )
}

function GolgiStack({ x, y, w }: { x: number; y: number; w: number }) {
  const rows = [0, 15, 30, 45]
  return (
    <g fill="none" strokeLinecap="round">
      {rows.map((dy, i) => {
        const shrink = i === 0 || i === 3 ? 8 : 0
        const d = `M${x + shrink} ${y + dy} q${(w - shrink * 2) / 2} -22 ${w - shrink * 2} 0`
        return (
          <g key={dy}>
            <path d={d} stroke="#be185d" strokeWidth={11} />
            <path d={d} stroke="#f9a8d4" strokeWidth={6} />
          </g>
        )
      })}
      {[
        [x - 12, y + 66, 6],
        [x + 10, y + 78, 5],
        [x + w + 12, y - 6, 6],
        [x + w + 24, y + 16, 5],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#fbcfe8" stroke="#be185d" strokeWidth={2} />
      ))}
    </g>
  )
}

function RibosomeDots({ pts }: { pts: [number, number][] }) {
  return (
    <g>
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={10} fill="transparent" />
          <circle cx={x} cy={y} r={3.8} fill="#4e4b42" />
        </g>
      ))}
    </g>
  )
}

function Badges({ list, onSelect }: { list: Part[]; onSelect: (id: string) => void }) {
  return (
    <g>
      {list.map((p, i) => (
        <g
          key={p.id}
          style={{ cursor: 'pointer' }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(p.id)
          }}
        >
          <circle cx={p.badge[0]} cy={p.badge[1]} r={11} fill="#423f38" stroke="#fefefc" strokeWidth={2} />
          <text x={p.badge[0]} y={p.badge[1]} fontSize={12} fontWeight={700} fill="#ffffff" textAnchor="middle" dominantBaseline="central" fontFamily="DM Sans, system-ui, sans-serif" style={{ pointerEvents: 'none' }}>
            {i + 1}
          </text>
        </g>
      ))}
    </g>
  )
}

function Gradients() {
  return (
    <defs>
      <radialGradient id="grad-cyto" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stopColor="#fffef5" />
        <stop offset="100%" stopColor="#ecf6df" />
      </radialGradient>
      <radialGradient id="grad-nucleus" cx="40%" cy="35%" r="70%">
        <stop offset="0%" stopColor="#fdf0dc" />
        <stop offset="100%" stopColor="#e9b27d" />
      </radialGradient>
      <linearGradient id="grad-mito" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbc4a8" />
        <stop offset="100%" stopColor="#e58559" />
      </linearGradient>
    </defs>
  )
}

// ---------- Componente principal ----------

export function CellIllustration({ type, size = 'lg', className }: CellIllustrationProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoverId, setHoverId] = useState<string | null>(null)

  const list = parts[type]
  const focusId = hoverId ?? selectedId
  const selected = list.find((p) => p.id === selectedId) ?? null
  const toggle = (id: string) => setSelectedId((cur) => (cur === id ? null : id))

  const hot = (id: string, children: ReactNode) => {
    const p = list.find((x) => x.id === id)
    return (
      <Hot id={id} label={p ? `${p.label}: ${p.description}` : id} focusId={focusId} selectedId={selectedId} onHover={setHoverId} onSelect={toggle}>
        {children}
      </Hot>
    )
  }

  const viewBox = type === 'bacteria' ? '0 0 700 440' : '0 0 640 480'

  return (
    <div className={cn('mx-auto w-full', widthClasses[size], className)}>
      <p className="mb-2 text-center text-sm font-medium text-tinta-600">{subtitles[type]} — clique nas partes numeradas</p>

      <div className="overflow-x-auto">
        <svg viewBox={viewBox} className="mx-auto h-auto w-full" style={{ minWidth: 520 }} role="group" aria-label={subtitles[type]} onClick={() => setSelectedId(null)}>
          <Gradients />

          {type === 'animal' && (
            <>
              {hot('cytoplasm', <ellipse cx={320} cy={240} rx={290} ry={210} fill="url(#grad-cyto)" />)}

              {hot(
                'rer',
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {[225, 198].map((x) => (
                    <g key={x}>
                      <path d={`M${x} 172 q-34 22 0 44 q34 22 0 44 q-34 22 0 44`} stroke="#1d4ed8" strokeWidth={14} />
                      <path d={`M${x} 172 q-34 22 0 44 q34 22 0 44 q-34 22 0 44`} stroke="#93c5fd" strokeWidth={9} />
                    </g>
                  ))}
                  {[[212, 194], [239, 238], [212, 282], [186, 196], [213, 238]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={3.2} fill="#1e3a8a" />
                  ))}
                </g>
              )}

              {hot('nucleus', <Nucleus cx={320} cy={235} r={64} />)}
              {hot('golgi', <GolgiStack x={420} y={125} w={100} />)}
              {hot(
                'mitochondria',
                <g>
                  <Mito x={135} y={178} rot={-30} />
                  <Mito x={505} y={318} rot={28} />
                  <Mito x={190} y={350} rot={12} />
                </g>
              )}
              {hot(
                'lysosome',
                <g>
                  <Lysosome x={440} y={402} />
                  <Lysosome x={255} y={408} />
                  <Lysosome x={262} y={108} />
                </g>
              )}
              {hot(
                'centrioles',
                <g fill="#a3bc9b" stroke="#3f5138" strokeWidth={2.5}>
                  <rect x={375} y={322} width={46} height={17} rx={7} />
                  <rect x={405} y={339} width={17} height={46} rx={7} />
                  <g stroke="#3f5138" strokeWidth={1.5}>
                    <line x1={388} y1={322} x2={388} y2={339} />
                    <line x1={400} y1={322} x2={400} y2={339} />
                    <line x1={413} y1={352} x2={422} y2={352} />
                    <line x1={413} y1={364} x2={422} y2={364} />
                  </g>
                </g>
              )}
              {hot('ribosomes', <RibosomeDots pts={[[120, 262], [150, 300], [300, 330], [350, 352], [130, 108], [215, 128], [330, 62], [400, 92], [560, 232], [572, 170], [480, 252], [300, 398], [520, 382], [345, 140]]} />)}

              {hot('membrane', (
                <g fill="none">
                  <ellipse cx={320} cy={240} rx={290} ry={210} stroke="#15803d" strokeWidth={9} />
                  <ellipse cx={320} cy={240} rx={283} ry={203} stroke="#bbf7d0" strokeWidth={2.5} />
                </g>
              ))}
            </>
          )}

          {type === 'vegetal' && (
            <>
              {hot('cellWall', <rect x={22} y={22} width={596} height={436} rx={46} fill="#d7e4cf" stroke="#4e6644" strokeWidth={14} />)}
              {hot('cytoplasm', <rect x={42} y={42} width={556} height={396} rx={34} fill="url(#grad-cyto)" />)}

              {hot('vacuole', (
                <g>
                  <ellipse cx={370} cy={250} rx={160} ry={135} fill="#bfdbfe" fillOpacity={0.8} stroke="#3b82f6" strokeWidth={3.5} />
                  <ellipse cx={370} cy={250} rx={148} ry={123} fill="none" stroke="#eff6ff" strokeWidth={2} />
                  <text x={370} y={252} textAnchor="middle" fontSize={15} fill="#1e40af" opacity={0.75} fontFamily="DM Sans, system-ui, sans-serif" style={{ pointerEvents: 'none' }}>
                    água, sais e pigmentos
                  </text>
                </g>
              ))}

              {hot(
                'rer',
                <g fill="none" strokeLinecap="round" strokeLinejoin="round">
                  {[255, 275].map((y) => (
                    <g key={y}>
                      <path d={`M70 ${y} q18 -26 36 0 q18 26 36 0 q18 -26 36 0`} stroke="#1d4ed8" strokeWidth={13} />
                      <path d={`M70 ${y} q18 -26 36 0 q18 26 36 0 q18 -26 36 0`} stroke="#93c5fd" strokeWidth={8} />
                    </g>
                  ))}
                  {[[88, 247], [124, 262], [160, 247], [100, 268]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={3} fill="#1e3a8a" />
                  ))}
                </g>
              )}

              {hot('nucleus', <Nucleus cx={115} cy={175} r={44} />)}
              {hot('golgi', <GolgiStack x={115} y={368} w={80} />)}
              {hot(
                'mitochondria',
                <g>
                  <Mito x={95} y={322} rot={20} s={0.85} />
                  <Mito x={480} y={410} rot={-15} s={0.85} />
                </g>
              )}
              {hot(
                'chloroplast',
                <g>
                  <Chloroplast x={210} y={85} rot={-5} />
                  <Chloroplast x={370} y={78} rot={0} />
                  <Chloroplast x={545} y={118} rot={30} />
                  <Chloroplast x={572} y={322} rot={-70} />
                  <Chloroplast x={370} y={414} rot={0} />
                </g>
              )}
              {hot('ribosomes', <RibosomeDots pts={[[62, 215], [188, 205], [70, 385], [215, 300], [250, 400], [450, 62], [560, 200], [575, 255], [425, 386], [280, 425], [545, 420]]} />)}

              {hot('membrane', <rect x={42} y={42} width={556} height={396} rx={34} fill="none" stroke="#16a34a" strokeWidth={4.5} />)}
            </>
          )}

          {type === 'bacteria' && (
            <>
              {hot('capsule', <rect x={92} y={92} width={526} height={256} rx={128} fill="#fef3c7" fillOpacity={0.7} stroke="#fbbf24" strokeWidth={3.5} strokeDasharray="10 6" />)}

              {hot(
                'pili',
                <g stroke="#cc7a3d" strokeWidth={3} strokeLinecap="round" fill="none">
                  {[170, 210, 250, 290, 330, 370, 410, 450, 490, 530].map((x) => (
                    <line key={`t${x}`} x1={x} y1={98} x2={x + (x % 40 === 10 ? -6 : 6)} y2={68} />
                  ))}
                  {[200, 270, 340, 410, 480].map((x) => (
                    <line key={`b${x}`} x1={x} y1={342} x2={x + 5} y2={372} />
                  ))}
                  <path d="M345 338 q12 44 58 66" stroke="#9d4e28" strokeWidth={7} />
                  <circle cx={407} cy={407} r={6} fill="#9d4e28" stroke="none" />
                </g>
              )}

              {hot('cellWall', <rect x={110} y={110} width={490} height={220} rx={110} fill="#e3ebe0" stroke="#3f5138" strokeWidth={9} />)}
              {hot('cytoplasm', <rect x={124} y={124} width={462} height={192} rx={96} fill="url(#grad-cyto)" />)}

              {hot(
                'nucleoid',
                <g>
                  <ellipse cx={330} cy={222} rx={78} ry={52} fill="#fde9cf" fillOpacity={0.75} stroke="#d8965c" strokeWidth={2} strokeDasharray="6 4" />
                  <path
                    d="M290 192 q30 -40 60 -10 q40 30 10 60 q-40 30 -70 0 q-30 -30 0 -50 q40 -30 70 10 q20 30 -20 50 q-40 10 -50 -20 q-10 -30 20 -35 q30 -8 40 20"
                    fill="none"
                    stroke="#bf6230"
                    strokeWidth={4.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              )}
              {hot(
                'plasmid',
                <g fill="none" stroke="#db2777" strokeWidth={4.5}>
                  <circle cx={470} cy={185} r={15} />
                  <circle cx={492} cy={252} r={12} />
                </g>
              )}
              {hot('ribosomes', <RibosomeDots pts={[[190, 190], [215, 262], [260, 160], [262, 284], [400, 158], [422, 286], [524, 205], [545, 262], [445, 138], [180, 228], [560, 226], [332, 296], [305, 146], [385, 268]]} />)}

              {hot('membrane', <rect x={124} y={124} width={462} height={192} rx={96} fill="none" stroke="#16a34a" strokeWidth={4.5} />)}

              {hot(
                'flagellum',
                <g fill="none" strokeLinecap="round">
                  <path d="M606 220 q22 -28 44 0 t44 0" stroke="#1d4ed8" strokeWidth={6} />
                  <path d="M606 220 q22 -28 44 0 t44 0" stroke="#93c5fd" strokeWidth={2.5} />
                  <circle cx={606} cy={220} r={9} fill="#1d4ed8" stroke="#dbeafe" strokeWidth={2} />
                </g>
              )}
            </>
          )}

          <Badges list={list} onSelect={toggle} />
        </svg>
      </div>

      <PartChips items={list.map((p) => ({ id: p.id, label: p.label, tone: p.tone }))} selectedId={selectedId} onSelect={toggle} onHover={setHoverId} />

      <InfoCard
        title={selected?.label}
        description={selected?.description}
        detail={selected?.function}
        tone={selected?.tone}
        hint="Clique em uma organela (ou em um botão numerado) para ver o que ela faz."
        onClose={() => setSelectedId(null)}
      />

      <TipBox>{tips[type]}</TipBox>
    </div>
  )
}
