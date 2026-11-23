import type { DiagramSpec } from '../InteractiveDiagram'

const FONT = 'DM Sans, system-ui, sans-serif'
const MONO = 'JetBrains Mono, monospace'

export const punnettSquare: DiagramSpec = {
  id: 'punnett',
  title: 'Quadrado de Punnett: cruzamento Aa × Aa',
  caption: 'Clique em um quadrado para ver o genótipo e o fenótipo do descendente.',
  enemTip: 'Aa × Aa sempre dá 3 dominantes : 1 recessivo (75% / 25%) e genótipos 1 AA : 2 Aa : 1 aa. Cada quadrado = 25% de chance.',
  viewBox: [800, 440],
  nodes: [
    { id: 'pA', label: 'A', x: 330, y: 100, shape: 'circle', r: 28, fs: 22, tone: 'verde', hideBadge: true, description: 'Gameta paterno com o alelo dominante (A)', detail: 'Um pai Aa produz 50% de gametas A e 50% de gametas a, porque os alelos se separam na meiose (1ª Lei de Mendel).' },
    { id: 'pa', label: 'a', x: 490, y: 100, shape: 'circle', r: 28, fs: 22, tone: 'argila', hideBadge: true, description: 'Gameta paterno com o alelo recessivo (a)', detail: 'Metade dos gametas do pai Aa carrega o alelo recessivo.' },
    { id: 'mA', label: 'A', x: 190, y: 190, shape: 'circle', r: 28, fs: 22, tone: 'verde', hideBadge: true, description: 'Gameta materno com o alelo dominante (A)', detail: 'Uma mãe Aa também produz 50% de gametas A e 50% de gametas a.' },
    { id: 'ma', label: 'a', x: 190, y: 320, shape: 'circle', r: 28, fs: 22, tone: 'argila', hideBadge: true, description: 'Gameta materno com o alelo recessivo (a)', detail: 'Metade dos gametas da mãe Aa carrega o alelo recessivo.' },
    { id: 'c1', label: 'AA', x: 330, y: 190, w: 150, h: 110, fs: 28, tone: 'verde', hideBadge: true, description: 'Homozigoto dominante (25%)', detail: 'Recebeu A do pai e A da mãe. Fenótipo dominante. Genótipo puro (homozigoto).' },
    { id: 'c2', label: 'Aa', x: 490, y: 190, w: 150, h: 110, fs: 28, tone: 'musgo', hideBadge: true, description: 'Heterozigoto (50% junto com o outro Aa)', detail: 'Recebeu A de um e a do outro. Fenótipo dominante, mas carrega o alelo recessivo (portador).' },
    { id: 'c3', label: 'Aa', x: 330, y: 320, w: 150, h: 110, fs: 28, tone: 'musgo', hideBadge: true, description: 'Heterozigoto', detail: 'Mesmo genótipo do quadrado de cima à direita. Juntos, os dois Aa somam 50% dos descendentes.' },
    { id: 'c4', label: 'aa', x: 490, y: 320, w: 150, h: 110, fs: 28, tone: 'argila', hideBadge: true, description: 'Homozigoto recessivo (25%)', detail: 'Recebeu a de ambos os pais. É o único que manifesta o fenótipo recessivo, mesmo com pais de fenótipo dominante.' },
  ],
  foreground: (
    <g fontFamily={FONT}>
      <text x={410} y={48} textAnchor="middle" fontSize={14} fontWeight={700} fill="#4e4b42">Gametas do pai (Aa)</text>
      <text x={78} y={255} textAnchor="middle" fontSize={14} fontWeight={700} fill="#4e4b42" transform="rotate(-90 78 255)">Gametas da mãe (Aa)</text>
      <text x={600} y={170} fontSize={14} fontWeight={700} fill="#14532d">Genótipos</text>
      <text x={600} y={192} fontSize={14} fill="#4e4b42">1 AA : 2 Aa : 1 aa</text>
      <text x={600} y={240} fontSize={14} fontWeight={700} fill="#14532d">Fenótipos</text>
      <text x={600} y={262} fontSize={14} fill="#4e4b42">3 dominante</text>
      <text x={600} y={282} fontSize={14} fill="#4e4b42">1 recessivo</text>
    </g>
  ),
}

export const pedigree: DiagramSpec = {
  id: 'pedigree',
  title: 'Heredograma de uma característica recessiva',
  caption: 'Clique em um indivíduo para ver o raciocínio que revela seu genótipo.',
  enemTip: 'Pais iguais (sem a característica) com filho diferente (com a característica) → a característica é RECESSIVA e os pais são heterozigotos.',
  viewBox: [800, 430],
  nodes: [
    { id: 'i1', label: 'Aa', x: 240, y: 80, shape: 'square', r: 30, tone: 'musgo', hideBadge: true, description: 'I-1: homem sem a característica', detail: 'Tem dois filhos sem e um filho com a característica. Para gerar um aa, precisa ter o alelo a: logo é heterozigoto (Aa).' },
    { id: 'i2', label: 'Aa', x: 440, y: 80, shape: 'circle', r: 30, tone: 'musgo', hideBadge: true, description: 'I-2: mulher sem a característica', detail: 'Também heterozigota (Aa), pois o filho II-2 é aa e recebeu um alelo a de cada pai.' },
    { id: 'ii1', label: 'A_', x: 180, y: 230, shape: 'circle', r: 30, tone: 'musgo', hideBadge: true, description: 'II-1: mulher sem a característica', detail: 'Pode ser AA ou Aa (por isso A_). Só os dados do heredograma não permitem decidir: a probabilidade de ser Aa é 2/3.' },
    { id: 'ii2', label: 'aa', x: 340, y: 230, shape: 'square', r: 30, tone: 'argila', filled: true, hideBadge: true, description: 'II-2: homem COM a característica (aa)', detail: 'Símbolo preenchido = afetado. Manifesta o fenótipo recessivo, então é aa. Foi ele quem revelou que os pais são Aa.' },
    { id: 'ii3', label: 'Aa', x: 500, y: 230, shape: 'circle', r: 30, tone: 'musgo', hideBadge: true, description: 'II-3: mulher sem a característica', detail: 'Tem uma filha aa, então precisa ter o alelo a: é Aa.' },
    { id: 'ii4', label: 'Aa', x: 660, y: 230, shape: 'square', r: 30, tone: 'musgo', hideBadge: true, description: 'II-4: marido de II-3', detail: 'Não é afetado, mas sua filha é aa. Logo, também é heterozigoto.' },
    { id: 'iii1', label: 'aa', x: 580, y: 350, shape: 'circle', r: 30, tone: 'argila', filled: true, hideBadge: true, description: 'III-1: mulher COM a característica (aa)', detail: 'Filha de dois heterozigotos (Aa × Aa): chance de 25% de ser aa. Caso clássico de herança autossômica recessiva.' },
  ],
  edges: [
    { d: 'M270 80 H410', arrow: false },
    { d: 'M340 80 V150 M180 150 H500 M180 150 V200 M340 150 V200 M500 150 V200', arrow: false },
    { d: 'M530 230 H630', arrow: false },
    { d: 'M580 230 V320', arrow: false },
  ],
  foreground: (
    <g fontFamily={FONT} fill="#5e5b50">
      <text x={60} y={86} fontSize={20} fontWeight={700} fontFamily="Fraunces, Georgia, serif">I</text>
      <text x={60} y={236} fontSize={20} fontWeight={700} fontFamily="Fraunces, Georgia, serif">II</text>
      <text x={60} y={356} fontSize={20} fontWeight={700} fontFamily="Fraunces, Georgia, serif">III</text>
      <g fontSize={12}>
        <text x={240} y={124} textAnchor="middle">I-1</text>
        <text x={440} y={124} textAnchor="middle">I-2</text>
        <text x={180} y={274} textAnchor="middle">II-1</text>
        <text x={340} y={274} textAnchor="middle">II-2</text>
        <text x={500} y={274} textAnchor="middle">II-3</text>
        <text x={660} y={274} textAnchor="middle">II-4</text>
        <text x={580} y={394} textAnchor="middle">III-1</text>
      </g>
      <g fontSize={13}>
        <rect x={612} y={44} width={18} height={18} rx={2} fill="#e3ebe0" stroke="#3f5138" strokeWidth={2} />
        <text x={640} y={58}>homem</text>
        <circle cx={621} cy={86} r={9} fill="#e3ebe0" stroke="#3f5138" strokeWidth={2} />
        <text x={640} y={91}>mulher</text>
        <rect x={612} y={108} width={18} height={18} rx={2} fill="#9d4e28" stroke="#9d4e28" strokeWidth={2} />
        <text x={640} y={122}>afetado (aa)</text>
      </g>
    </g>
  ),
}

export const replication: DiagramSpec = {
  id: 'replication',
  title: 'Replicação do DNA',
  caption: 'Clique em cada enzima para ver sua função na replicação.',
  enemTip: 'A replicação é SEMICONSERVATIVA: cada DNA novo tem uma fita antiga (molde) e uma fita nova. Ocorre na fase S da interfase.',
  viewBox: [800, 470],
  nodes: [
    { id: 'helicase', label: '1. Helicase\nabre a dupla-hélice', x: 130, y: 130, w: 220, h: 90, tone: 'ceu', description: 'Separa as duas fitas do DNA', detail: 'Rompe as pontes de hidrogênio entre as bases nitrogenadas e forma a forquilha de replicação. Cada fita vira molde para uma fita nova.' },
    { id: 'primase', label: '2. Primase\nfaz o primer de RNA', x: 400, y: 130, w: 220, h: 90, tone: 'flor', description: 'Sintetiza um pequeno iniciador de RNA (primer)', detail: 'A DNA polimerase não começa do zero: precisa de uma extremidade 3′ livre. O primer de RNA fornece esse ponto de partida.' },
    { id: 'polimerase', label: '3. DNA polimerase\nadiciona nucleotídeos', x: 670, y: 130, w: 220, h: 90, tone: 'verde', description: 'Constrói a nova fita sempre no sentido 5′ → 3′', detail: 'Na fita contínua (líder), a síntese é ininterrupta. Na fita descontínua (tardia), forma fragmentos de Okazaki. Também revisa erros (correção de leitura).' },
    { id: 'ligase', label: '4. DNA ligase\nune os fragmentos', x: 670, y: 330, w: 220, h: 90, tone: 'sol', description: 'Costura os fragmentos de Okazaki', detail: 'Une os fragmentos da fita descontínua, formando uma fita contínua e sem falhas.' },
    { id: 'resultado', label: 'Duas moléculas de DNA\nidênticas', x: 400, y: 330, w: 220, h: 90, tone: 'argila', description: 'Resultado: replicação semiconservativa', detail: 'Cada DNA-filho tem 1 fita original e 1 fita nova (experimento de Meselson e Stahl). Os dois são iguais ao DNA de origem, salvo mutações.' },
    { id: 'topo', label: 'Topoisomerase\nalivia a tensão', x: 130, y: 330, w: 220, h: 90, tone: 'tinta', description: 'Corta e religa o DNA à frente da forquilha', detail: 'Ao abrir a hélice, o DNA à frente fica superenrolado e tenso. A topoisomerase desfaz essa tensão para a helicase continuar.' },
  ],
  edges: [
    { from: 'helicase', to: 'primase' },
    { from: 'primase', to: 'polimerase' },
    { from: 'polimerase', to: 'ligase' },
    { from: 'ligase', to: 'resultado' },
    { from: 'topo', to: 'helicase', dashed: true, label: 'apoia', labelPos: [130, 232] },
  ],
}

export const transcription: DiagramSpec = {
  id: 'transcription',
  title: 'Transcrição: do DNA ao mRNA',
  caption: 'Clique em cada etapa. Na transcrição, a informação do DNA é copiada para o RNA.',
  enemTip: 'No RNA não existe timina: o par do A é o U (uracila). Transcrição ocorre no núcleo (eucariontes) e a tradução no citoplasma.',
  viewBox: [800, 440],
  nodes: [
    { id: 'dna', label: '1. DNA (fita molde)\ncontém o gene', x: 130, y: 130, w: 220, h: 90, tone: 'ceu', description: 'O gene a ser lido', detail: 'Apenas uma das fitas (a molde) é lida. A outra, não molde, tem sequência igual à do mRNA, trocando T por U.' },
    { id: 'rnapol', label: '2. RNA polimerase\nliga-se ao promotor', x: 400, y: 130, w: 220, h: 90, tone: 'verde', description: 'Reconhece o início do gene', detail: 'Liga-se ao promotor (sequência de início), abre a hélice e começa a transcrição. Não precisa de primer.' },
    { id: 'sintese', label: '3. Síntese do mRNA\nno sentido 5′ → 3′', x: 670, y: 130, w: 220, h: 90, tone: 'flor', description: 'Pareamento: A–U, T–A, G–C, C–G', detail: 'A RNA polimerase encaixa ribonucleotídeos complementares à fita molde. Ao chegar ao terminador, o mRNA se solta.' },
    { id: 'process', label: '4. Processamento\ncapa 5′, cauda poli-A, splicing', x: 670, y: 320, w: 220, h: 90, tone: 'sol', description: 'Só em eucariontes', detail: 'O splicing remove os íntrons (trechos não codificantes) e une os éxons. Resultado: mRNA maduro, menor que o gene original.' },
    { id: 'maduro', label: '5. mRNA maduro\nsai pelo poro nuclear', x: 400, y: 320, w: 220, h: 90, tone: 'argila', description: 'Vai para o ribossomo, no citoplasma', detail: 'O mRNA maduro atravessa os poros da carioteca e será traduzido em proteína.' },
  ],
  edges: [
    { from: 'dna', to: 'rnapol' },
    { from: 'rnapol', to: 'sintese' },
    { from: 'sintese', to: 'process' },
    { from: 'process', to: 'maduro' },
  ],
  foreground: (
    <g fontFamily={MONO} fontSize={13} fill="#4e4b42">
      <text x={30} y={290} fontFamily={FONT} fontWeight={700} fontSize={14}>Exemplo</text>
      <text x={30} y={314}>DNA molde: 3′-TAC GGA-5′</text>
      <text x={30} y={336}>mRNA:      5′-AUG CCU-3′</text>
    </g>
  ),
}

export const translation: DiagramSpec = {
  id: 'translation',
  title: 'Tradução: do mRNA à proteína',
  caption: 'Clique em cada etapa. Na tradução, o ribossomo lê o mRNA de 3 em 3 bases (códons).',
  enemTip: 'O código genético é UNIVERSAL e DEGENERADO: vários códons diferentes podem codificar o mesmo aminoácido, mas cada códon codifica apenas um. AUG = início (Met).',
  viewBox: [800, 480],
  nodes: [
    { id: 'chegada', label: '1. mRNA chega\nao ribossomo', x: 130, y: 120, w: 220, h: 90, tone: 'ceu', description: 'No citoplasma', detail: 'As subunidades do ribossomo (60S e 40S em eucariontes) se encaixam no mRNA.' },
    { id: 'inicio', label: '2. Iniciação\ncódon AUG + tRNA-Met', x: 400, y: 120, w: 220, h: 90, tone: 'verde', description: 'Começa no códon de iniciação', detail: 'O tRNA com anticódon UAC, carregando metionina, pareia com o AUG. É sempre o primeiro aminoácido.' },
    { id: 'elongacao', label: '3. Elongação\ntRNAs trazem aminoácidos', x: 670, y: 120, w: 220, h: 90, tone: 'flor', description: 'Anticódon pareia com o códon', detail: 'Cada tRNA leva o aminoácido certo para o seu códon. Forma-se uma ligação peptídica entre os aminoácidos vizinhos.' },
    { id: 'translocacao', label: '4. Translocação\nribossomo avança 1 códon', x: 670, y: 320, w: 220, h: 90, tone: 'sol', description: 'O ribossomo anda 3 nucleotídeos', detail: 'O tRNA vazio sai e o próximo códon entra no sítio de leitura. O ciclo se repete até o códon de parada.' },
    { id: 'termino', label: '5. Término\ncódon de parada', x: 400, y: 320, w: 220, h: 90, tone: 'rubi', description: 'UAA, UAG ou UGA', detail: 'Os códons de parada não têm tRNA. Fatores de liberação soltam a cadeia e o ribossomo se separa do mRNA.' },
    { id: 'proteina', label: '6. Polipeptídeo\ndobra-se em proteína', x: 130, y: 320, w: 220, h: 90, tone: 'argila', description: 'Estrutura 3D funcional', detail: 'A sequência de aminoácidos determina a forma da proteína, e a forma determina a função (enzima, anticorpo, hormônio...).' },
  ],
  edges: [
    { from: 'chegada', to: 'inicio' },
    { from: 'inicio', to: 'elongacao' },
    { from: 'elongacao', to: 'translocacao' },
    { from: 'translocacao', to: 'termino' },
    { from: 'termino', to: 'proteina' },
    { from: 'translocacao', to: 'elongacao', curve: 45, dashed: true, label: 'repete', labelPos: [742, 222] },
  ],
  foreground: (
    <g fontFamily={MONO} fontSize={14} textAnchor="middle" fill="#4e4b42">
      <text x={400} y={438}>mRNA: AUG GCU UUC UAA</text>
      <text x={400} y={460}>Met – Ala – Phe – (parada)</text>
    </g>
  ),
}

export const meiosisComparison: DiagramSpec = {
  id: 'meiose-mitose',
  title: 'Mitose × Meiose',
  caption: 'Clique em uma célula da tabela para ler a explicação.',
  enemTip: 'Mitose: 2n → 2n (iguais). Meiose: 2n → n (4 haploides diferentes). A variabilidade vem do crossing-over (prófase I) e da segregação independente dos homólogos.',
  viewBox: [800, 520],
  nodes: [
    { id: 'h-mitose', label: 'MITOSE', x: 330, y: 55, w: 250, h: 50, fs: 18, tone: 'verde', hideBadge: true, description: 'Divisão para crescimento e reparo', detail: 'Uma célula 2n origina duas células 2n geneticamente idênticas, em uma divisão (prófase, metáfase, anáfase e telófase).' },
    { id: 'h-meiose', label: 'MEIOSE', x: 620, y: 55, w: 250, h: 50, fs: 18, tone: 'flor', hideBadge: true, description: 'Divisão para formar gametas', detail: 'Uma célula 2n origina quatro células n (haploides), em duas divisões seguidas (meiose I reducional, meiose II equacional).' },
    { id: 'm-div', label: '1 divisão', x: 330, y: 135, w: 250, h: 56, tone: 'verde', hideBadge: true, description: 'Uma única divisão nuclear', detail: 'Os cromossomos duplicam na interfase (fase S) e as cromátides-irmãs se separam na anáfase.' },
    { id: 'e-div', label: '2 divisões\n(meiose I e meiose II)', x: 620, y: 135, w: 250, h: 56, tone: 'flor', hideBadge: true, description: 'Duas divisões, apenas uma duplicação do DNA', detail: 'Meiose I separa os cromossomos homólogos (reducional). Meiose II separa as cromátides-irmãs (como uma mitose).' },
    { id: 'm-cel', label: '2 células-filhas', x: 330, y: 205, w: 250, h: 56, tone: 'verde', hideBadge: true, description: 'Duas células', detail: 'Ambas com o mesmo número de cromossomos da célula-mãe.' },
    { id: 'e-cel', label: '4 células-filhas', x: 620, y: 205, w: 250, h: 56, tone: 'flor', hideBadge: true, description: 'Quatro células', detail: 'Nos animais machos, as 4 viram espermatozoides. Nas fêmeas, só 1 vira óvulo (as outras são corpúsculos polares).' },
    { id: 'm-ploid', label: '2n → 2n\ngeneticamente idênticas', x: 330, y: 280, w: 250, h: 60, tone: 'verde', hideBadge: true, description: 'Mantém o número de cromossomos', detail: 'Células-filhas são clones da célula-mãe (salvo mutações).' },
    { id: 'e-ploid', label: '2n → n (haploides)\ngeneticamente diferentes', x: 620, y: 280, w: 250, h: 60, tone: 'flor', hideBadge: true, description: 'Reduz o número de cromossomos à metade', detail: 'Essencial para que a fecundação (n + n) restabeleça o número 2n da espécie, sem dobrar a cada geração.' },
    { id: 'm-cross', label: 'Não ocorre\n(em geral)', x: 330, y: 355, w: 250, h: 60, tone: 'verde', hideBadge: true, description: 'Sem troca de pedaços entre homólogos', detail: 'Na mitose os homólogos não se emparelham, então não há permutação.' },
    { id: 'e-cross', label: 'Ocorre na prófase I', x: 620, y: 355, w: 250, h: 60, tone: 'flor', hideBadge: true, description: 'Crossing-over (permutação)', detail: 'Cromátides de cromossomos homólogos trocam segmentos nos quiasmas, gerando novas combinações de alelos (variabilidade).' },
    { id: 'm-func', label: 'Crescimento, regeneração\ne reprodução assexuada', x: 330, y: 435, w: 250, h: 66, tone: 'verde', hideBadge: true, description: 'Função da mitose', detail: 'Cicatrização, renovação da pele, crescimento do embrião e reprodução assexuada. Quando descontrolada, gera tumores.' },
    { id: 'e-func', label: 'Formação de gametas\n(animais) ou esporos (plantas)', x: 620, y: 435, w: 250, h: 66, tone: 'flor', hideBadge: true, description: 'Função da meiose', detail: 'Origina gametas nos animais (meiose gamética) e esporos nas plantas (meiose espórica). Garante variabilidade genética.' },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={14} fontWeight={700} fill="#4e4b42">
      <text x={20} y={140}>Divisões</text>
      <text x={20} y={210}>Células</text>
      <text x={20} y={285}>Material genético</text>
      <text x={20} y={360}>Crossing-over</text>
      <text x={20} y={440}>Função</text>
    </g>
  ),
}
