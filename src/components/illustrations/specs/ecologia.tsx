import type { DiagramSpec } from '../InteractiveDiagram'

const FONT = 'DM Sans, system-ui, sans-serif'

export const foodWeb: DiagramSpec = {
  id: 'teia-alimentar',
  title: 'Teia alimentar do Cerrado',
  caption: 'Clique em cada ser vivo. As setas mostram o caminho da energia: de quem é comido para quem come.',
  enemTip: 'A seta aponta PARA QUEM COME. A energia diminui ~90% a cada nível trófico (só ~10% passa ao próximo), por isso há poucos predadores de topo. Bioacumulação: venenos se concentram no topo.',
  viewBox: [800, 490],
  nodes: [
    { id: 'capim', label: 'Capim\n(produtor)', x: 170, y: 420, w: 150, h: 56, fs: 13, tone: 'verde', description: 'Produtor: faz fotossíntese', detail: 'Base da cadeia. Converte energia luminosa em energia química (matéria orgânica). Seu nível trófico é o primeiro.' },
    { id: 'frutos', label: 'Frutos do cerrado\n(produtor)', x: 430, y: 420, w: 150, h: 56, fs: 13, tone: 'verde', description: 'Produtor: parte das plantas', detail: 'Pequi, cagaita e outros frutos alimentam muitos animais e ajudam na dispersão de sementes.' },
    { id: 'gafanhoto', label: 'Gafanhoto\n(consumidor 1º)', x: 110, y: 290, w: 150, h: 56, fs: 13, tone: 'sol', description: 'Consumidor primário (herbívoro)', detail: 'Come o capim. Segundo nível trófico. Parte da energia é perdida como calor e nas fezes.' },
    { id: 'rato', label: 'Rato-do-mato\n(consumidor 1º)', x: 370, y: 290, w: 150, h: 56, fs: 13, tone: 'terra', description: 'Consumidor primário (herbívoro/onívoro)', detail: 'Come capim e frutos. Serve de alimento para a cobra e a seriema.' },
    { id: 'sapo', label: 'Sapo\n(consumidor 2º)', x: 110, y: 160, w: 150, h: 56, fs: 13, tone: 'ceu', description: 'Consumidor secundário (carnívoro)', detail: 'Come insetos como o gafanhoto. Terceiro nível trófico.' },
    { id: 'cobra', label: 'Cobra\n(consumidor 3º)', x: 330, y: 160, w: 150, h: 56, fs: 13, tone: 'argila', description: 'Consumidor terciário', detail: 'Come sapos e roedores. Controla essas populações (controle biológico).' },
    { id: 'seriema', label: 'Seriema\n(predador de topo)', x: 560, y: 160, w: 150, h: 56, fs: 13, tone: 'flor', description: 'Predador de topo desta teia', detail: 'Come gafanhotos e cobras. Ocupa mais de um nível trófico, típico de uma teia (e não de uma cadeia simples).' },
    { id: 'decomp', label: 'Fungos e bactérias\n(decompositores)', x: 640, y: 300, w: 150, h: 56, fs: 13, tone: 'tinta', description: 'Decompositores', detail: 'Degradam restos e cadáveres de TODOS os níveis, devolvendo nutrientes minerais ao solo. Fecham o ciclo da matéria.' },
  ],
  edges: [
    { from: 'capim', to: 'gafanhoto' },
    { from: 'capim', to: 'rato' },
    { from: 'frutos', to: 'rato' },
    { from: 'gafanhoto', to: 'sapo' },
    { from: 'gafanhoto', to: 'seriema' },
    { from: 'sapo', to: 'cobra' },
    { from: 'rato', to: 'cobra' },
    { from: 'cobra', to: 'seriema' },
    { from: 'seriema', to: 'decomp', dashed: true },
  ],
  foreground: (
    <text x={790} y={476} textAnchor="end" fontSize={12} fontStyle="italic" fill="#4e4b42" fontFamily={FONT}>
      Seta = fluxo de energia e matéria (do comido para quem come)
    </text>
  ),
}

export const biogeochemicalCycles: DiagramSpec = {
  id: 'ciclo-carbono',
  title: 'Ciclo do carbono',
  caption: 'Clique nos reservatórios. As setas mostram os processos que movem o carbono.',
  enemTip: 'Fotossíntese RETIRA CO₂ da atmosfera; respiração, decomposição e queima DEVOLVEM. Queimar combustíveis fósseis libera carbono armazenado há milhões de anos → intensifica o efeito estufa. Já o ciclo do N depende de bactérias fixadoras (Rhizobium) e o da água, de evaporação e precipitação.',
  viewBox: [800, 470],
  nodes: [
    { id: 'atm', label: 'Atmosfera\n(CO₂)', x: 400, y: 70, w: 200, h: 60, tone: 'ceu', description: 'Principal reservatório de carbono para os seres vivos', detail: 'O CO₂ atmosférico é a fonte de carbono dos produtores. O excesso de CO₂ e metano intensifica o efeito estufa e o aquecimento global.' },
    { id: 'prod', label: 'Produtores\n(plantas e algas)', x: 140, y: 220, w: 170, h: 58, tone: 'verde', description: 'Fixam o carbono pela fotossíntese', detail: 'Transformam CO₂ em matéria orgânica (glicose). Também respiram, devolvendo parte do CO₂.' },
    { id: 'cons', label: 'Consumidores\n(animais)', x: 400, y: 230, w: 170, h: 58, tone: 'argila', description: 'Obtêm carbono ao comer', detail: 'O carbono passa pela cadeia alimentar. Os animais devolvem CO₂ pela respiração.' },
    { id: 'queima', label: 'Queima de combustíveis\ne queimadas', x: 670, y: 220, w: 190, h: 60, tone: 'rubi', description: 'Atividade humana que emite CO₂', detail: 'Carros, indústrias e queimadas liberam rapidamente o carbono estocado em combustíveis fósseis e florestas.' },
    { id: 'dec', label: 'Decompositores\n(fungos e bactérias)', x: 400, y: 390, w: 190, h: 60, tone: 'musgo', description: 'Reciclam o carbono dos restos', detail: 'Decompõem cadáveres, fezes e folhas, liberando CO₂ (respiração aeróbia) ou metano (decomposição sem oxigênio).' },
    { id: 'fosseis', label: 'Combustíveis fósseis\n(petróleo e carvão)', x: 670, y: 390, w: 190, h: 60, tone: 'tinta', description: 'Carbono preso por milhões de anos', detail: 'Formados da matéria orgânica que não foi decomposta e ficou soterrada. Não são renováveis na escala humana de tempo.' },
  ],
  edges: [
    { from: 'atm', to: 'prod', curve: 30, label: 'fotossíntese' },
    { from: 'prod', to: 'atm', curve: 30, label: 'respiração' },
    { from: 'cons', to: 'atm', label: 'respiração', labelPos: [400, 150] },
    { from: 'prod', to: 'cons', label: 'alimentação', labelPos: [270, 214] },
    { from: 'prod', to: 'dec', label: 'restos', labelPos: [250, 330] },
    { from: 'cons', to: 'dec', label: 'restos e excretas', labelPos: [400, 312] },
    { from: 'dec', to: 'atm', curve: 240, label: 'decomposição', labelPos: [535, 230], fs: 11 },
    { from: 'dec', to: 'fosseis', label: 'fossiliza', fs: 11 },
    { from: 'fosseis', to: 'queima', label: 'extração', labelPos: [718, 305] },
    { from: 'queima', to: 'atm', label: 'emissão de CO₂', labelPos: [560, 128] },
  ],
}

export const brazilianBiomes: DiagramSpec = {
  id: 'biomas-brasileiros',
  title: 'Biomas brasileiros',
  caption: 'Clique em um bioma para ver clima, vegetação e ameaças. Mapa esquemático: posições aproximadas.',
  enemTip: 'Associe: Cerrado = savana, queimadas naturais, "berço das águas". Caatinga = só no Brasil, xerófita. Mata Atlântica = mais devastada. Pantanal = planície alagável. Pampa = campos do Sul.',
  viewBox: [800, 490],
  background: (
    <path
      d="M170 160 L215 110 L260 80 L300 50 L360 45 L420 70 L500 100 L580 120 L640 150 L650 200 L620 270 L580 340 L540 390 L490 430 L450 460 L420 480 L380 450 L350 400 L320 360 L270 340 L220 310 L180 260 L150 210 Z"
      fill="#f3f2eb"
      stroke="#c8c3b0"
      strokeWidth={3}
      strokeLinejoin="round"
    />
  ),
  nodes: [
    { id: 'amazonia', label: '🌳 Amazônia', x: 290, y: 150, w: 130, h: 44, tone: 'verde', description: 'Maior bioma brasileiro (cerca de metade do território)', detail: 'Floresta equatorial densa, quente e muito úmida, com enorme biodiversidade. O solo é pobre: os nutrientes ficam na biomassa e são reciclados rapidamente da serapilheira. Ameaçada por desmatamento e queimadas.' },
    { id: 'caatinga', label: '🌵 Caatinga', x: 540, y: 190, w: 130, h: 44, tone: 'argila', description: 'Único bioma exclusivamente brasileiro', detail: 'Clima semiárido, chuvas irregulares, rios intermitentes. Plantas xerófitas: cactos, folhas reduzidas ou caducas, raízes profundas e armazenamento de água.' },
    { id: 'cerrado', label: '🌾 Cerrado', x: 430, y: 255, w: 130, h: 44, tone: 'sol', description: 'Savana brasileira, o "berço das águas"', detail: 'Árvores de troncos tortuosos e casca grossa (adaptações ao fogo), raízes profundas e solo ácido. Nascentes de grandes bacias. Hotspot de biodiversidade ameaçado pela agropecuária.' },
    { id: 'pantanal', label: '🐊 Pantanal', x: 300, y: 320, w: 130, h: 44, tone: 'ceu', description: 'Maior planície alagável do mundo', detail: 'Alagamentos sazonais controlam o ciclo da vida. Grande concentração de fauna (jacaré, onça-pintada, tuiuiú, capivara). Ameaçado por queimadas e pecuária.' },
    { id: 'mataatlantica', label: '🌲 Mata Atlântica', x: 540, y: 340, w: 140, h: 44, tone: 'musgo', description: 'Floresta tropical da costa, muito devastada', detail: 'Restam cerca de 12% da cobertura original. Muita biodiversidade e muitas espécies endêmicas (hotspot). Concentra a maior parte da população e das cidades do país.' },
    { id: 'pampa', label: '🐄 Pampa', x: 400, y: 440, w: 120, h: 44, tone: 'flor', description: 'Campos do Rio Grande do Sul', detail: 'Predomínio de gramíneas, poucas árvores, clima subtropical com invernos frios. Usado para pecuária; sofre com a substituição por lavouras e silvicultura.' },
  ],
  foreground: (
    <text x={20} y={476} fontSize={12} fontStyle="italic" fill="#4e4b42" fontFamily={FONT}>
      Mapa esquemático (posições aproximadas)
    </text>
  ),
}

export const ecologicalSuccession: DiagramSpec = {
  id: 'sucessao-ecologica',
  title: 'Sucessão ecológica',
  caption: 'Clique em cada estágio da sucessão.',
  enemTip: 'Ao longo da sucessão aumentam biomassa, biodiversidade e complexidade. Na comunidade clímax, a produção (P) tende a igualar a respiração (R): P/R ≈ 1.',
  viewBox: [800, 490],
  nodes: [
    { id: 'rocha', label: 'Rocha nua\n(ecese)', x: 80, y: 380, w: 128, h: 84, fs: 12, icon: '🪨', tone: 'tinta', description: 'Substrato sem solo', detail: 'Início da sucessão primária. Só organismos muito resistentes conseguem se instalar.' },
    { id: 'liquens', label: 'Líquens e musgos\n(pioneiros)', x: 235, y: 320, w: 128, h: 84, fs: 12, icon: '🌿', tone: 'musgo', description: 'Comunidade pioneira', detail: 'Líquens (alga + fungo) produzem ácidos que desgastam a rocha e, ao morrer, formam o primeiro solo. Preparam o ambiente para as próximas espécies.' },
    { id: 'gramineas', label: 'Gramíneas\ne ervas', x: 390, y: 260, w: 128, h: 84, fs: 12, icon: '🌾', tone: 'sol', description: 'Comunidades intermediárias (séries)', detail: 'O solo mais profundo e rico em matéria orgânica permite plantas pequenas, que aumentam a retenção de água.' },
    { id: 'arbustos', label: 'Arbustos e\nárvores pioneiras', x: 545, y: 200, w: 128, h: 84, fs: 12, icon: '🌳', tone: 'verde', description: 'Maior sombreamento e competição', detail: 'A luz diminui no chão, favorecendo espécies que toleram sombra e substituem as pioneiras.' },
    { id: 'floresta', label: 'Floresta\n(clímax)', x: 700, y: 140, w: 128, h: 84, fs: 12, icon: '🌲', tone: 'verde', description: 'Comunidade clímax: estável e diversa', detail: 'Alta biodiversidade, teias alimentares complexas e ciclagem eficiente de nutrientes. Mantém-se estável enquanto o clima permitir.' },
  ],
  edges: [
    { from: 'rocha', to: 'liquens', dashed: true },
    { from: 'liquens', to: 'gramineas', dashed: true },
    { from: 'gramineas', to: 'arbustos', dashed: true },
    { from: 'arbustos', to: 'floresta', dashed: true },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={13} fill="#4e4b42">
      <text x={20} y={44} fontWeight={700}>Sucessão primária: começa em rocha nua, sem solo.</text>
      <text x={20} y={66}>Sucessão secundária: começa onde já havia solo (após queimada, por exemplo) e é mais rápida.</text>
      <text x={400} y={470} textAnchor="middle" fontStyle="italic">aumentam biomassa, biodiversidade e complexidade das teias alimentares</text>
    </g>
  ),
}
