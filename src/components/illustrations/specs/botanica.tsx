import type { DiagramSpec } from '../InteractiveDiagram'

const FONT = 'DM Sans, system-ui, sans-serif'
const MONO = 'JetBrains Mono, monospace'

export const photosynthesis: DiagramSpec = {
  id: 'fotossintese',
  title: 'Fotossíntese dentro do cloroplasto',
  caption: 'Clique em cada etapa e em cada substância para ver o papel dela na fotossíntese.',
  enemTip: 'O O₂ liberado vem da ÁGUA (fotólise), não do CO₂. A fase clara precisa de luz e acontece nos tilacoides; o ciclo de Calvin não usa luz diretamente e acontece no estroma, mas depende do ATP e do NADPH da fase clara.',
  viewBox: [800, 490],
  background: (
    <g>
      <ellipse cx={400} cy={245} rx={250} ry={215} fill="#ecfdf3" stroke="#15803d" strokeWidth={3.5} />
      <ellipse cx={400} cy={245} rx={238} ry={203} fill="none" stroke="#86efac" strokeWidth={2} strokeDasharray="4 6" />
      <text x={400} y={52} textAnchor="middle" fontSize={14} fontWeight={700} letterSpacing={3} fill="#166534" fontFamily={FONT}>CLOROPLASTO</text>
    </g>
  ),
  nodes: [
    { id: 'luz', label: 'Luz solar', x: 80, y: 100, w: 120, h: 76, icon: '☀️', tone: 'sol', description: 'Fonte de energia da fotossíntese', detail: 'A clorofila absorve principalmente luz vermelha e azul-violeta e reflete a verde, por isso as folhas parecem verdes.' },
    { id: 'agua', label: 'Água\n(H₂O)', x: 80, y: 245, w: 120, h: 86, icon: '💧', fs: 13, tone: 'ceu', description: 'Fornece elétrons e libera oxigênio', detail: 'Absorvida pelas raízes e transportada pelo xilema. Na fase clara é quebrada (fotólise): libera O₂, H⁺ e elétrons.' },
    { id: 'co2', label: 'Gás carbônico\n(CO₂)', x: 80, y: 390, w: 120, h: 86, icon: '💨', fs: 12, tone: 'tinta', description: 'Fonte do carbono da glicose', detail: 'Entra pelos estômatos. É fixado no ciclo de Calvin e incorporado a moléculas orgânicas.' },
    { id: 'clara', label: 'Fase clara\n(tilacoides)', x: 330, y: 160, w: 190, h: 84, tone: 'verde', description: 'Etapa fotoquímica: depende de luz', detail: 'Clorofila nos fotossistemas capta a luz, quebra a água e produz ATP e NADPH. Libera O₂ como subproduto.' },
    { id: 'atp', label: 'ATP + NADPH', x: 565, y: 245, w: 150, h: 64, tone: 'sol', description: 'Energia e poder redutor', detail: 'Moedas de energia produzidas na fase clara e gastas no ciclo de Calvin para fabricar glicose.' },
    { id: 'calvin', label: 'Ciclo de Calvin\n(estroma)', x: 330, y: 340, w: 190, h: 84, tone: 'musgo', description: 'Etapa química: fixação do carbono', detail: 'A enzima rubisco fixa o CO₂; com ATP e NADPH, o carbono é reduzido a açúcar (G3P → glicose).' },
    { id: 'o2', label: 'Oxigênio\n(O₂)', x: 700, y: 100, w: 120, h: 86, icon: '🫧', fs: 13, tone: 'ceu', description: 'Liberado para a atmosfera', detail: 'Todo o oxigênio que respiramos teve origem na fotossíntese (de plantas, algas e cianobactérias).' },
    { id: 'glicose', label: 'Glicose\n(C₆H₁₂O₆)', x: 700, y: 390, w: 130, h: 86, icon: '🍬', fs: 13, tone: 'flor', description: 'Alimento produzido pela planta', detail: 'Usada na respiração, convertida em amido (reserva) ou celulose (parede celular).' },
  ],
  edges: [
    { from: 'luz', to: 'clara' },
    { from: 'agua', to: 'clara' },
    { from: 'clara', to: 'o2', label: 'fotólise da água' },
    { from: 'clara', to: 'atp' },
    { from: 'atp', to: 'calvin' },
    { from: 'co2', to: 'calvin' },
    { from: 'calvin', to: 'glicose' },
  ],
  foreground: (
    <text x={400} y={478} textAnchor="middle" fontSize={14} fontFamily={MONO} fill="#14532d">
      6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂
    </text>
  ),
}

export const plantHormones: DiagramSpec = {
  id: 'hormonios-vegetais',
  title: 'Hormônios vegetais (fitormônios)',
  caption: 'Clique em um hormônio para ver onde ele atua e o que provoca.',
  enemTip: 'Auxina: crescimento do caule e fototropismo (curva em direção à luz). Etileno: amadurece frutos, uma banana madura acelera as vizinhas. Giberelina: germinação e crescimento do caule. Citocinina: divisão celular e retarda o envelhecimento.',
  viewBox: [800, 490],
  background: (
    <g>
      <rect x={250} y={400} width={300} height={74} rx={14} fill="#f0e6db" stroke="#b3855a" strokeWidth={2} />
      <g fill="none" stroke="#8d5837" strokeWidth={4} strokeLinecap="round">
        <path d="M400 400 Q385 440 345 462" />
        <path d="M400 400 Q420 440 465 464" />
        <path d="M400 405 V468" />
        <path d="M372 432 Q348 432 330 444" />
      </g>
      <path d="M400 400 V130" stroke="#4e6644" strokeWidth={10} strokeLinecap="round" fill="none" />
      <path d="M400 215 Q445 195 480 190" stroke="#4e6644" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={345} cy={200} rx={50} ry={22} transform="rotate(-30 345 200)" fill="#4ade80" stroke="#15803d" strokeWidth={2.5} />
      <ellipse cx={455} cy={285} rx={52} ry={22} transform="rotate(28 455 285)" fill="#4ade80" stroke="#15803d" strokeWidth={2.5} />
      <ellipse cx={345} cy={335} rx={50} ry={22} transform="rotate(-25 345 335)" fill="#4ade80" stroke="#15803d" strokeWidth={2.5} />
      <circle cx={492} cy={190} r={22} fill="#f87171" stroke="#b91c1c" strokeWidth={3} />
      <circle cx={400} cy={118} r={14} fill="#86efac" stroke="#15803d" strokeWidth={3} />
    </g>
  ),
  nodes: [
    { id: 'auxina', label: 'Auxina', x: 150, y: 70, w: 170, h: 46, tone: 'sol', description: 'Produzida no ápice do caule', detail: 'Promove o alongamento celular no caule. Causa o fototropismo positivo (a luz faz a auxina migrar para o lado sombreado, que cresce mais) e a dominância apical (a gema do topo inibe as gemas laterais).' },
    { id: 'giberelina', label: 'Giberelina', x: 150, y: 190, w: 170, h: 46, tone: 'verde', description: 'Alongamento do caule e germinação', detail: 'Faz as sementes saírem da dormência (ativa a digestão do endosperma), alonga o caule e pode gerar frutos sem sementes (partenocarpia).' },
    { id: 'citocinina', label: 'Citocininas', x: 150, y: 415, w: 170, h: 46, tone: 'musgo', description: 'Produzidas nas raízes', detail: 'Estimulam a divisão celular (citocinese) e o desenvolvimento de gemas laterais. Retardam o envelhecimento (senescência) das folhas.' },
    { id: 'etileno', label: 'Etileno', x: 650, y: 120, w: 170, h: 46, tone: 'rubi', description: 'Hormônio gasoso do amadurecimento', detail: 'Faz frutos amadurecerem e as folhas caírem (abscisão). Por ser gás, uma fruta madura acelera o amadurecimento das vizinhas. Usado na indústria para amadurecer bananas.' },
    { id: 'aba', label: 'Ácido abscísico', x: 650, y: 310, w: 170, h: 46, tone: 'ceu', description: 'Hormônio do estresse e da dormência', detail: 'Fecha os estômatos na seca (reduz a perda de água) e mantém as sementes e gemas em dormência. Atua em oposição à giberelina.' },
  ],
  edges: [
    { from: 'auxina', toPoint: [388, 112], arrow: false, dot: true },
    { from: 'giberelina', toPoint: [394, 232], arrow: false, dot: true },
    { from: 'citocinina', toPoint: [372, 432], arrow: false, dot: true },
    { from: 'etileno', toPoint: [508, 180], arrow: false, dot: true },
    { from: 'aba', toPoint: [485, 288], arrow: false, dot: true },
  ],
}

export const flowerStructure: DiagramSpec = {
  id: 'flor',
  title: 'Estrutura da flor (corte longitudinal)',
  caption: 'Clique em cada parte da flor. Cores: rosa = verticilos protetores, amarelo = parte masculina, vermelho = parte feminina.',
  enemTip: 'Androceu (masculino) = estames (antera + filete). Gineceu (feminino) = pistilo/carpelo (estigma + estilo + ovário). Após a fecundação, o ovário vira fruto e o óvulo vira semente.',
  viewBox: [800, 490],
  background: (
    <g strokeLinejoin="round">
      <path d="M400 482 V392" stroke="#4e6644" strokeWidth={12} strokeLinecap="round" fill="none" />
      <ellipse cx={320} cy={250} rx={38} ry={120} transform="rotate(-28 320 250)" fill="#fbcfe8" stroke="#db2777" strokeWidth={3} />
      <ellipse cx={480} cy={250} rx={38} ry={120} transform="rotate(28 480 250)" fill="#fbcfe8" stroke="#db2777" strokeWidth={3} />
      <ellipse cx={400} cy={376} rx={38} ry={14} fill="#bbf7d0" stroke="#15803d" strokeWidth={2.5} />
      <ellipse cx={350} cy={392} rx={46} ry={14} transform="rotate(18 350 392)" fill="#86efac" stroke="#15803d" strokeWidth={2} />
      <ellipse cx={450} cy={392} rx={46} ry={14} transform="rotate(-18 450 392)" fill="#86efac" stroke="#15803d" strokeWidth={2} />
      <path d="M368 360 Q352 300 350 238" stroke="#a16d42" strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M432 360 Q448 300 450 238" stroke="#a16d42" strokeWidth={4} fill="none" strokeLinecap="round" />
      <ellipse cx={350} cy={226} rx={12} ry={20} fill="#fbbf24" stroke="#b45309" strokeWidth={2.5} />
      <ellipse cx={450} cy={226} rx={12} ry={20} fill="#fbbf24" stroke="#b45309" strokeWidth={2.5} />
      <ellipse cx={400} cy={335} rx={30} ry={38} fill="#bbf7d0" stroke="#15803d" strokeWidth={3} />
      <circle cx={390} cy={330} r={6} fill="#fde68a" stroke="#b45309" strokeWidth={1.5} />
      <circle cx={410} cy={330} r={6} fill="#fde68a" stroke="#b45309" strokeWidth={1.5} />
      <circle cx={400} cy={348} r={6} fill="#fde68a" stroke="#b45309" strokeWidth={1.5} />
      <path d="M400 298 V200" stroke="#65a30d" strokeWidth={8} strokeLinecap="round" fill="none" />
      <ellipse cx={400} cy={190} rx={22} ry={13} fill="#f472b6" stroke="#be185d" strokeWidth={2.5} />
    </g>
  ),
  nodes: [
    { id: 'petalas', label: 'Pétalas\n(corola)', x: 130, y: 90, w: 170, h: 52, tone: 'flor', description: 'Atraem os polinizadores', detail: 'Cores e formas vistosas atraem insetos, aves e morcegos. O conjunto de pétalas é a corola. Em flores polinizadas pelo vento, costumam ser reduzidas.' },
    { id: 'antera', label: 'Antera', x: 130, y: 195, w: 170, h: 46, tone: 'sol', description: 'Parte masculina: produz o pólen', detail: 'Dentro dela, a meiose forma os grãos de pólen, que contêm os gametas masculinos (núcleos espermáticos).' },
    { id: 'filete', label: 'Filete', x: 130, y: 300, w: 170, h: 46, tone: 'sol', description: 'Sustenta a antera', detail: 'Filete + antera = estame. O conjunto de estames é o androceu.' },
    { id: 'sepalas', label: 'Sépalas\n(cálice)', x: 130, y: 410, w: 170, h: 52, tone: 'verde', description: 'Protegem o botão floral', detail: 'Geralmente verdes. O conjunto de sépalas é o cálice. Cálice + corola formam o perianto.' },
    { id: 'estigma', label: 'Estigma', x: 670, y: 100, w: 170, h: 46, tone: 'rubi', description: 'Recebe o grão de pólen', detail: 'Superfície pegajosa onde o pólen é depositado na polinização. O pólen germina e forma o tubo polínico.' },
    { id: 'estilo', label: 'Estilo', x: 670, y: 200, w: 170, h: 46, tone: 'rubi', description: 'Canal de ligação', detail: 'O tubo polínico cresce pelo estilo até chegar ao ovário.' },
    { id: 'ovario', label: 'Ovário\n(com óvulos)', x: 670, y: 305, w: 170, h: 52, tone: 'rubi', description: 'Parte feminina: abriga os óvulos', detail: 'Estigma + estilo + ovário = pistilo (carpelo), o gineceu. Após a fecundação, o ovário vira fruto e cada óvulo vira uma semente.' },
    { id: 'receptaculo', label: 'Receptáculo', x: 670, y: 415, w: 170, h: 46, tone: 'musgo', description: 'Ponta do pedúnculo onde a flor se insere', detail: 'Sustenta todos os verticilos florais. Em alguns frutos (maçã, morango), ele se desenvolve e forma a parte comestível (pseudofruto).' },
  ],
  edges: [
    { from: 'petalas', toPoint: [292, 180], arrow: false, dot: true },
    { from: 'antera', toPoint: [339, 226], arrow: false, dot: true },
    { from: 'filete', toPoint: [356, 290], arrow: false, dot: true },
    { from: 'sepalas', toPoint: [327, 395], arrow: false, dot: true },
    { from: 'estigma', toPoint: [421, 187], arrow: false, dot: true },
    { from: 'estilo', toPoint: [407, 245], arrow: false, dot: true },
    { from: 'ovario', toPoint: [429, 332], arrow: false, dot: true },
    { from: 'receptaculo', toPoint: [433, 378], arrow: false, dot: true },
  ],
}

export const seedDispersal: DiagramSpec = {
  id: 'dispersao',
  title: 'Dispersão de sementes',
  caption: 'Clique em cada tipo de dispersão para ver exemplos e adaptações dos frutos e sementes.',
  enemTip: 'Frutos coloridos, cheirosos e carnosos = zoocoria. Sementes leves, com asas ou plumas = anemocoria. Frutos que boiam (coco) = hidrocoria. Frutos secos que estouram = autocoria.',
  viewBox: [800, 480],
  nodes: [
    { id: 'centro', label: 'Fruto e\nsemente', x: 400, y: 240, shape: 'circle', r: 64, fs: 15, tone: 'verde', hideBadge: true, description: 'A semente precisa se afastar da planta-mãe', detail: 'A dispersão reduz a competição por luz, água e nutrientes e permite colonizar novas áreas.' },
    { id: 'anemocoria', label: 'Anemocoria\ndispersão pelo vento', x: 170, y: 115, w: 260, h: 140, fs: 13, icon: '🌬️', tone: 'ceu', description: 'Sementes leves, com pelos ou asas', detail: 'Exemplos: dente-de-leão (plumas), paineira (painas), ipê (sementes aladas). Produzem muitas sementes pequenas.' },
    { id: 'zoocoria', label: 'Zoocoria\ndispersão por animais', x: 630, y: 115, w: 260, h: 140, fs: 13, icon: '🦜', tone: 'flor', description: 'Frutos atraentes ou com ganchos', detail: 'Frutos carnosos e coloridos são comidos, e as sementes saem nas fezes (aves, morcegos). Frutos com espinhos (carrapicho) grudam no pelo.' },
    { id: 'hidrocoria', label: 'Hidrocoria\ndispersão pela água', x: 170, y: 365, w: 260, h: 140, fs: 13, icon: '🌊', tone: 'musgo', description: 'Frutos que flutuam', detail: 'O coco possui casca fibrosa e cheia de ar, flutua por meses e coloniza praias distantes. Comum em manguezais e plantas aquáticas.' },
    { id: 'autocoria', label: 'Autocoria\ndispersão por explosão', x: 630, y: 365, w: 260, h: 140, fs: 13, icon: '💥', tone: 'sol', description: 'A própria planta lança as sementes', detail: 'Frutos secos que se abrem de repente ao secar, como o da mamona e das leguminosas (feijão, ervilha). Alcance curto, sem agente externo.' },
  ],
  edges: [
    { from: 'centro', to: 'anemocoria' },
    { from: 'centro', to: 'zoocoria' },
    { from: 'centro', to: 'hidrocoria' },
    { from: 'centro', to: 'autocoria' },
  ],
}
