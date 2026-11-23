'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import {
  ANATOMY_BY_KEY,
  ANATOMY_STRUCTURES,
  structuresFor,
  type AnatomySex,
  type AnatomyStructure,
} from 'open-anatomy-3d'
import type { LayerVisibility } from 'open-anatomy-3d-react'
import { systems, type Organ } from './HumanSystems'

const AnatomyViewer = dynamic(
  () => import('open-anatomy-3d-react').then(mod => mod.AnatomyViewer),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[560px] flex-col items-center justify-center gap-4 rounded-2xl bg-[#e9e5dc] text-[#59665d]">
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#c8c0b2] border-t-[#426d59]" />
        <span className="text-sm font-medium">Preparando modelo anatômico 3D…</span>
        <span className="text-xs text-[#7b8178]">A primeira abertura pode levar alguns segundos.</span>
      </div>
    ),
  }
)

const LAYER_PRESETS: Record<string, LayerVisibility> = {
  nervoso: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: false, nerves: true },
  endocrino: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: false, nerves: false },
  circulatorio: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: true, nerves: false },
  respiratorio: { skin: false, skeleton: false, joints: false, muscles: true, organs: true, vessels: false, nerves: false },
  digestorio: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: false, nerves: false },
  urinario: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: false, nerves: false },
  imunologico: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: true, nerves: false },
  linfatico: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: true, nerves: false },
  reprodutor: { skin: false, skeleton: false, joints: false, muscles: false, organs: true, vessels: false, nerves: false },
  locomotor: { skin: false, skeleton: true, joints: true, muscles: true, organs: false, vessels: false, nerves: false },
  tegumentar: { skin: true, skeleton: false, joints: false, muscles: false, organs: false, vessels: false, nerves: false },
}

const CATEGORY_FILTERS: Record<string, string[]> = {
  nervoso: ['Neurological'],
  endocrino: ['Endocrine'],
  circulatorio: ['Cardiovascular'],
  respiratorio: ['Respiratory'],
  digestorio: ['Digestive', 'Oral / ENT'],
  urinario: ['Renal / Urinary'],
  imunologico: ['Immune / Lymphatic'],
  linfatico: ['Immune / Lymphatic'],
  reprodutor: ['Reproductive'],
  locomotor: ['Musculoskeletal'],
  tegumentar: [],
}

const DEFAULT_KEYS: Record<string, string> = {
  nervoso: 'brain',
  endocrino: 'pituitary',
  circulatorio: 'heart',
  respiratorio: 'lung_l',
  digestorio: 'stomach',
  urinario: 'kidney_l',
  imunologico: 'thymus',
  linfatico: 'spleen',
  reprodutor: 'uterus',
  locomotor: 'femur_l',
  tegumentar: 'skin',
}

const ALIASES: Record<string, string> = {
  brain: 'cerebro',
  cerebellum: 'cerebelo',
  spinal_cord: 'medula',
  cranial_nerves: 'nervos',
  pituitary: 'hipofise',
  thyroid: 'tireoide',
  adrenal_l: 'suprarrenais',
  adrenal_r: 'suprarrenais',
  pancreas: 'pancreas',
  heart: 'coracao',
  lung_l: 'pulmao',
  lung_r: 'pulmao',
  trachea: 'traqueia',
  diaphragm: 'diafragma',
  liver: 'figado',
  stomach: 'estomago',
  small_intestine: 'intestino',
  colon: 'intestino-grosso',
  kidney_l: 'rins',
  kidney_r: 'rins',
  ureter_l: 'ureteres',
  ureter_r: 'ureteres',
  bladder: 'bexiga',
  thymus: 'timo',
  spleen: 'baco',
  ovary_l: 'ovarios',
  ovary_r: 'ovarios',
  uterus: 'utero',
  prostate: 'prostata',
  reproductive: 'testiculos',
  abdominal_muscles: 'musculos',
  chest_muscles_l: 'musculos',
  chest_muscles_r: 'musculos',
}

const ORGAN_BY_ID = new Map<string, Organ>(
  systems.flatMap(system => system.organs).map(organ => [organ.id, organ])
)

const LABELS: Record<string, string> = {
  brain: 'Cérebro',
  brainstem: 'Tronco encefálico',
  cerebellum: 'Cerebelo',
  cranial_nerves: 'Nervos cranianos',
  spinal_cord: 'Medula espinal',
  pituitary: 'Hipófise',
  adrenal_l: 'Glândula suprarrenal esquerda',
  adrenal_r: 'Glândula suprarrenal direita',
  heart: 'Coração',
  lung_l: 'Pulmão esquerdo',
  lung_r: 'Pulmão direito',
  kidney_l: 'Rim esquerdo',
  kidney_r: 'Rim direito',
  ureter_l: 'Ureter esquerdo',
  ureter_r: 'Ureter direito',
  bladder: 'Bexiga urinária',
  liver: 'Fígado',
  stomach: 'Estômago',
  small_intestine: 'Intestino delgado',
  colon: 'Intestino grosso',
  pancreas: 'Pâncreas',
  spleen: 'Baço',
  thymus: 'Timo',
  uterus: 'Útero',
  ovary_l: 'Ovário esquerdo',
  ovary_r: 'Ovário direito',
  prostate: 'Próstata',
  trachea: 'Traqueia',
  bronchi: 'Brônquios',
  diaphragm: 'Diafragma',
  esophagus: 'Esôfago',
  salivary_glands: 'Glândulas salivares',
  appendix: 'Apêndice',
  gallbladder: 'Vesícula biliar e ductos',
  fallopian_tubes: 'Tubas uterinas',
  vagina: 'Vagina',
  reproductive: 'Órgãos reprodutores masculinos',
  skin: 'Pele',
  femur_l: 'Fêmur esquerdo',
  femur_r: 'Fêmur direito',
  skull: 'Crânio',
  spine_cervical: 'Coluna cervical',
  spine_thoracic: 'Coluna torácica',
  spine_lumbar: 'Coluna lombar',
  sternum: 'Esterno',
  rib_cage: 'Caixa torácica',
  humerus_l: 'Úmero esquerdo',
  humerus_r: 'Úmero direito',
}

const CATEGORY_INFO: Record<string, { purpose: string; function: string }> = {
  Neurological: {
    purpose: 'Receber, integrar e transmitir informações, coordenando respostas do organismo.',
    function: 'Neurônios comunicam-se por sinais elétricos e químicos. A estrutura destacada participa de circuitos que conectam o sistema nervoso central ao restante do corpo.',
  },
  Endocrine: {
    purpose: 'Participar da regulação do organismo por meio da produção e liberação de hormônios.',
    function: 'Hormônios são mensageiros químicos que alcançam células-alvo com receptores específicos e ajudam a regular metabolismo, crescimento, reprodução e homeostase.',
  },
  Cardiovascular: {
    purpose: 'Manter o transporte de sangue, gases, nutrientes, hormônios e resíduos.',
    function: 'O sistema cardiovascular integra coração e vasos. O fluxo permite trocas com os tecidos e mantém a distribuição de substâncias pelo organismo.',
  },
  Respiratory: {
    purpose: 'Conduzir o ar e possibilitar as trocas de oxigênio e gás carbônico.',
    function: 'A ventilação renova o ar nos pulmões. Nos alvéolos, a difusão permite que o oxigênio entre no sangue e que o gás carbônico seja eliminado.',
  },
  Digestive: {
    purpose: 'Participar da digestão, absorção de nutrientes ou processamento dos alimentos.',
    function: 'O tubo digestório realiza movimentos e secreções que fragmentam os alimentos e os transformam em moléculas absorvíveis. Órgãos acessórios contribuem com enzimas e bile.',
  },
  'Oral / ENT': {
    purpose: 'Participar da entrada do alimento, da deglutição, da fala ou do início da digestão.',
    function: 'Estruturas da região oral e da faringe colaboram com mastigação, lubrificação, paladar, deglutição e condução de ar ou alimento.',
  },
  'Renal / Urinary': {
    purpose: 'Filtrar o sangue, produzir ou conduzir urina e regular água, sais e resíduos.',
    function: 'Os rins ajustam a composição do plasma por filtração, reabsorção e secreção. A urina segue pelos ureteres, fica armazenada na bexiga e é eliminada pela uretra.',
  },
  'Immune / Lymphatic': {
    purpose: 'Participar da defesa do organismo e do equilíbrio dos líquidos corporais.',
    function: 'Órgãos linfoides e vasos linfáticos ajudam a filtrar a linfa, transportar células de defesa e organizar respostas contra agentes estranhos.',
  },
  Reproductive: {
    purpose: 'Participar da produção de gametas, da reprodução e da regulação por hormônios sexuais.',
    function: 'As estruturas reprodutoras atuam em conjunto na produção de gametas, transporte, fecundação e, no sistema feminino, no desenvolvimento gestacional.',
  },
  Musculoskeletal: {
    purpose: 'Sustentar e proteger o corpo e permitir movimentos e manutenção da postura.',
    function: 'Ossos, articulações e músculos atuam em conjunto. A contração muscular gera força, enquanto tendões e articulações transmitem e orientam o movimento.',
  },
  'Eye / Sensory': {
    purpose: 'Captar estímulos do ambiente e convertê-los em informações para o sistema nervoso.',
    function: 'Receptores sensoriais transformam estímulos físicos ou químicos em sinais nervosos que seguem para regiões de processamento no sistema nervoso.',
  },
}

const CATEGORY_LABELS: Record<string, string> = {
  Neurological: 'Sistema nervoso',
  Endocrine: 'Sistema endócrino',
  Cardiovascular: 'Sistema cardiovascular',
  Respiratory: 'Sistema respiratório',
  Digestive: 'Sistema digestório',
  'Oral / ENT': 'Sistema digestório e vias aéreas superiores',
  'Renal / Urinary': 'Sistema urinário',
  'Immune / Lymphatic': 'Sistemas imunológico e linfático',
  Reproductive: 'Sistema reprodutor',
  Musculoskeletal: 'Sistema locomotor',
  'Eye / Sensory': 'Sistema sensorial',
}

const TERM_TRANSLATIONS: [string, string][] = [
  ['Abdominal Wall Muscles', 'Músculos da parede abdominal'],
  ['Back Muscles', 'Músculos das costas'],
  ['Calf Muscles', 'Músculos da panturrilha'],
  ['Chest (Pectoral) Muscle', 'Músculo peitoral'],
  ['Deltoid (Shoulder)', 'Deltoide'],
  ['Foot Muscles', 'Músculos do pé'],
  ['Forearm Muscles', 'Músculos do antebraço'],
  ['Gluteal', 'Glúteos'],
  ['Hamstrings (Back Thigh)', 'Isquiotibiais'],
  ['Hand Muscles', 'Músculos da mão'],
  ['Hip Flexor (Iliopsoas)', 'Flexor do quadril (iliopsoas)'],
  ['Inner Thigh (Adductors)', 'Adutores da coxa'],
  ['Intercostal Muscles', 'Músculos intercostais'],
  ['Neck Muscles', 'Músculos do pescoço'],
  ['Pelvic Floor', 'Assoalho pélvico'],
  ['Quadriceps (Front Thigh)', 'Quadríceps'],
  ['Rotator Cuff', 'Manguito rotador'],
  ['Shin Muscles', 'Músculos da perna'],
  ['Shoulder Girdle Muscles', 'Músculos da cintura escapular'],
  ['Trapezius', 'Trapézio'],
  ['Upper Arm Muscles', 'Músculos do braço'],
  ['Ankle Joint', 'Articulação do tornozelo'],
  ['Elbow Joint', 'Articulação do cotovelo'],
  ['Hip Joint', 'Articulação do quadril'],
  ['Knee Joint', 'Articulação do joelho'],
  ['Shoulder Joint', 'Articulação do ombro'],
  ['Wrist Joint', 'Articulação do punho'],
  ['Collarbone', 'Clavícula'],
  ['Femur', 'Fêmur'],
  ['Humerus', 'Úmero'],
  ['Tibia', 'Tíbia'],
  ['Fibula', 'Fíbula'],
  ['Rib', 'Costela'],
  ['Vertebra', 'Vértebra'],
  ['Foot', 'Pé'],
  ['Forearm', 'Antebraço'],
  ['Hand', 'Mão'],
  ['Pelvis', 'Pelve'],
]

function getStructureLabel(structure?: AnatomyStructure | null) {
  if (!structure) return 'Estrutura anatômica'
  if (LABELS[structure.key]) return LABELS[structure.key]
  let label = structure.label
  for (const [english, portuguese] of TERM_TRANSLATIONS) {
    if (label.includes(english)) {
      label = label.replace(english, portuguese)
      break
    }
  }
  return label.replace(/\s+\(L\)/g, ' (esquerdo)').replace(/\s+\(R\)/g, ' (direito)')
}

function getDetails(structure?: AnatomyStructure | null) {
  if (!structure) return null
  const alias = ALIASES[structure.key]
  const organ = alias ? ORGAN_BY_ID.get(alias) : undefined
  if (organ) {
    return {
      name: organ.name,
      location: organ.location,
      purpose: organ.purpose,
      function: organ.function,
      system: organ.system,
    }
  }
  const category = CATEGORY_INFO[structure.category] || {
    purpose: 'Contribuir para a organização e o funcionamento integrado do corpo humano.',
    function: 'A estrutura participa de atividades próprias do seu tecido e do sistema indicado. No modelo, observe sua posição e relação espacial com os órgãos próximos.',
  }
  return {
    name: getStructureLabel(structure),
    location: 'A posição está indicada diretamente no modelo anatômico 3D. Gire o corpo para observar a relação dessa estrutura com as regiões vizinhas.',
    purpose: category.purpose,
    function: category.function,
    system: CATEGORY_LABELS[structure.category] || structure.category,
  }
}

const SYSTEM_ACCENTS: Record<string, string> = {
  nervoso: '#d6a83f',
  endocrino: '#9874b9',
  circulatorio: '#d65b56',
  respiratorio: '#4d9da6',
  digestorio: '#d28b48',
  urinario: '#5e91b7',
  imunologico: '#729d78',
  linfatico: '#5f9eaa',
  reprodutor: '#bd7c9b',
  locomotor: '#9b896d',
  tegumentar: '#c58b69',
}

export function HumanSystems3D() {
  const [activeSystem, setActiveSystem] = useState('nervoso')
  const [layers, setLayers] = useState<LayerVisibility>(LAYER_PRESETS.nervoso)
  const [sex, setSex] = useState<AnatomySex>('male')
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [selectedKey, setSelectedKey] = useState<string>('brain')

  const currentSystem = systems.find(system => system.id === activeSystem) || systems[0]
  const activeKey = hoveredKey || selectedKey
  const activeStructure = activeKey ? ANATOMY_BY_KEY[activeKey] : undefined
  const details = getDetails(activeStructure)

  const availableStructures = useMemo(() => structuresFor(sex), [sex])
  const highlightedKeys = useMemo(() => {
    const categories = CATEGORY_FILTERS[activeSystem] || []
    return availableStructures
      .filter(item => {
        if (activeSystem === 'tegumentar') return item.system === 'skin'
        if (activeSystem === 'locomotor') return item.category === 'Musculoskeletal'
        return categories.includes(item.category)
      })
      .map(item => item.key)
  }, [activeSystem, availableStructures])

  const visibleStructureList = useMemo(() => {
    const keys = new Set(highlightedKeys)
    return ANATOMY_STRUCTURES
      .filter(item => keys.has(item.key) && (!item.sex || item.sex === sex))
      .slice(0, 14)
  }, [highlightedKeys, sex])

  useEffect(() => {
    setHoveredKey(null)
    const preferred = activeSystem === 'reprodutor'
      ? (sex === 'female' ? 'uterus' : 'prostate')
      : (DEFAULT_KEYS[activeSystem] || 'brain')
    const candidate = ANATOMY_BY_KEY[preferred]
    if (candidate && (!candidate.sex || candidate.sex === sex)) setSelectedKey(preferred)
    else setSelectedKey(highlightedKeys[0] || 'brain')
  }, [activeSystem, highlightedKeys, sex])

  const chooseSystem = (id: string) => {
    setActiveSystem(id)
    setLayers(LAYER_PRESETS[id] || LAYER_PRESETS.nervoso)
    setHoveredKey(null)
  }

  const chooseStructure = (key: string) => {
    setSelectedKey(key)
    setHoveredKey(null)
  }

  const accent = SYSTEM_ACCENTS[activeSystem] || '#527b65'

  return (
    <section className="human-atlas-3d mb-14" aria-label="Atlas anatômico humano interativo">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.22em] text-[#66816d]">
            <span className="h-px w-7 bg-[#66816d]" />
            Laboratório de anatomia · experiência 3D
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#242c29] sm:text-4xl">Explore o corpo humano</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736d]">
            Gire o modelo, aproxime e selecione uma estrutura para descobrir onde fica, o que faz e como funciona.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#78817a]">
          <span className="h-2 w-2 rounded-full bg-[#6f9b78]" />
          Modelo anatômico interativo
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Sistemas do corpo humano">
        {systems.map(system => (
          <button
            key={system.id}
            type="button"
            role="tab"
            aria-selected={activeSystem === system.id}
            onClick={() => chooseSystem(system.id)}
            className={activeSystem === system.id
              ? 'rounded-full border px-4 py-2.5 text-xs font-semibold shadow-sm transition-all'
              : 'rounded-full border border-[#dedbd2] bg-[#f7f5ef] px-4 py-2.5 text-xs font-medium text-[#67716a] transition-all hover:border-[#aab5a9] hover:bg-white'}
            style={activeSystem === system.id ? { backgroundColor: accent, borderColor: accent, color: '#fff' } : undefined}
          >
            {system.short}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[26px] border border-[#dedbd2] bg-[#f8f6f0] shadow-[0_18px_60px_-36px_rgba(44,55,47,.4)]">
        <div className="grid lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,.85fr)]">
          <div className="relative min-w-0 border-b border-[#dedbd2] bg-[radial-gradient(ellipse_at_50%_42%,#fffdf7_0%,#eeece4_75%,#e6e4dc_100%)] p-3 sm:p-5 lg:border-b-0 lg:border-r">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#7b857c]">Vista anatômica</p>
                <p className="mt-1 text-sm font-semibold text-[#34433a]">{currentSystem.name}</p>
              </div>
              <span className="rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-[10px] font-medium text-[#6c786f] shadow-sm">Arraste para girar · zoom nos controles</span>
            </div>
            <div className="anatomy-viewer-shell">
              <AnatomyViewer
                sex={sex}
                onSexChange={setSex}
                layers={layers}
                onLayersChange={setLayers}
                highlightedKeys={highlightedKeys}
                onStructureHover={setHoveredKey}
                onStructureClick={key => chooseStructure(key)}
                hoverHint="Clique para fixar os detalhes"
                hoverColor={accent}
                highlightColor={accent}
                showSexToggle
                showLayerToggles
                showZoomControls
                showRotateControl
                className="atlas-viewer"
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-[#7a837b]">
              <span><b className="text-[#48574d]">Girar:</b> arraste o modelo</span>
              <span><b className="text-[#48574d]">Selecionar:</b> passe o mouse ou clique</span>
              <span><b className="text-[#48574d]">Zoom:</b> use + e −</span>
            </div>
          </div>

          <aside className="flex min-h-[560px] flex-col bg-[#fbfaf6] p-5 sm:p-7" aria-live="polite">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#778279]">Ficha anatômica</span>
              <span className="rounded-full px-3 py-1 text-[10px] font-semibold text-white" style={{ backgroundColor: accent }}>{hoveredKey ? 'Em foco' : 'Selecionado'}</span>
            </div>
            {details ? (
              <>
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#849087]">{details.system}</p>
                <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#27332c]">{details.name}</h3>
                <div className="my-5 h-px bg-[#e4e1d8]" />
                <div className="space-y-5">
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#8b938b]">Localização</p>
                    <p className="text-sm leading-6 text-[#505d54]">{details.location}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#8b938b]">Para que serve</p>
                    <p className="text-sm leading-6 text-[#505d54]">{details.purpose}</p>
                  </div>
                  <div>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#8b938b]">Como funciona</p>
                    <p className="text-sm leading-6 text-[#505d54]">{details.function}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-4 grid h-16 w-16 place-items-center rounded-full bg-[#edf0e9] text-2xl text-[#6c8b70]">✳</div>
                <h3 className="font-display text-xl font-semibold text-[#34433a]">Explore uma estrutura</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#788178]">Passe o cursor sobre o cérebro, coração, órgãos ou músculos no modelo 3D.</p>
              </div>
            )}
            <div className="mt-auto border-t border-[#e4e1d8] pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#899188]">Sistema em estudo</p>
              <p className="mt-1 text-sm font-semibold text-[#3e5144]">{currentSystem.name}</p>
              <p className="mt-2 text-xs leading-5 text-[#737e75]">{currentSystem.note}</p>
            </div>
          </aside>
        </div>

        <div className="border-t border-[#dedbd2] bg-[#f3f1e9] px-4 py-5 sm:px-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#818b81]">Estruturas deste sistema</p>
              <p className="mt-1 text-xs text-[#707b72]">Selecione um nome para destacar no modelo.</p>
            </div>
            <span className="text-[10px] text-[#899188]">{visibleStructureList.length} estruturas em destaque</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {visibleStructureList.map(item => (
              <button
                key={item.key}
                type="button"
                onClick={() => chooseStructure(item.key)}
                className={selectedKey === item.key
                  ? 'rounded-full border px-3 py-2 text-xs font-semibold text-white transition-colors'
                  : 'rounded-full border border-[#d9d6cc] bg-[#fbfaf6] px-3 py-2 text-xs text-[#5c695f] transition-colors hover:border-[#9da99d]'}
                style={selectedKey === item.key ? { backgroundColor: accent, borderColor: accent } : undefined}
              >
                {getStructureLabel(item)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-6 grid gap-4 rounded-2xl border border-[#dedbd2] bg-[#fbfaf6] p-5 md:grid-cols-[.75fr_1.25fr] sm:p-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#66816d]">Conceito importante para o ENEM</p>
          <h3 className="mt-2 font-display text-2xl font-semibold text-[#2d3a31]">Glândulas endócrinas e exócrinas</h3>
          <p className="mt-2 text-xs leading-5 text-[#707b72]">Exócrino não é um sistema do corpo: é uma classificação de glândulas, de acordo com a forma como liberam suas secreções.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border-l-2 border-[#9874b9] pl-4">
            <h4 className="text-sm font-semibold text-[#3d4a40]">Endócrinas</h4>
            <p className="mt-1 text-xs leading-5 text-[#68746b]">Não possuem ductos. Liberam hormônios no líquido intersticial e, em seguida, no sangue. Exemplos: hipófise, tireoide e suprarrenais.</p>
          </div>
          <div className="border-l-2 border-[#d28b48] pl-4">
            <h4 className="text-sm font-semibold text-[#3d4a40]">Exócrinas</h4>
            <p className="mt-1 text-xs leading-5 text-[#68746b]">Possuem ductos que conduzem secreções até uma superfície ou cavidade. Exemplos: salivares, sudoríparas e sebáceas. O pâncreas tem funções endócrina e exócrina.</p>
          </div>
        </div>
      </section>

      <div className="mt-4 flex flex-wrap items-start justify-between gap-3 text-[10px] leading-5 text-[#899188]">
        <p className="max-w-3xl">Modelo 3D educacional. As estruturas são representações anatômicas para estudo, não imagens clínicas nem instrumentos de diagnóstico.</p>
        <p className="shrink-0">Anatomia: BodyParts3D © DBCLS · HuBMAP · MakeHuman · CC BY 4.0 / CC0</p>
      </div>
    </section>
  )
}
