import type { DiagramSpec } from '../InteractiveDiagram'

const FONT = 'DM Sans, system-ui, sans-serif'

export const phylogeneticTree: DiagramSpec = {
  id: 'filogenia',
  title: 'Árvore filogenética (cladograma) de vertebrados',
  caption: 'Clique nas caixas (grupos) ou nos pontos (ancestrais comuns) para entender como ler a árvore.',
  enemTip: 'Leia a árvore pelos ancestrais comuns: quanto mais recente o ancestral compartilhado, mais próximos são os grupos. Aves são mais próximas de répteis do que de mamíferos.',
  viewBox: [800, 500],
  nodes: [
    { id: 'n0', label: 'Ancestral comum', x: 100, y: 70, r: 10, bare: true, tone: 'tinta', description: 'Ancestral comum a todos os vertebrados do esquema', detail: 'Cada ponto de ramificação (nó) representa um ancestral comum exclusivo dos grupos que saem dele. Peixes são o grupo mais antigo a se separar.' },
    { id: 'n1', label: 'Ancestral dos tetrápodes', x: 240, y: 160, r: 10, bare: true, tone: 'tinta', description: 'Inovação: quatro membros (tetrápodes)', detail: 'Anfíbios, mamíferos, répteis e aves descendem de um ancestral que desenvolveu membros locomotores. Eles formam um grupo monofilético.' },
    { id: 'n2', label: 'Ancestral dos amniotas', x: 380, y: 250, r: 10, bare: true, tone: 'tinta', description: 'Inovação: ovo com âmnio (amniotas)', detail: 'O âmnio e outras membranas permitiram a reprodução longe da água. Mamíferos, répteis e aves são amniotas; anfíbios não são.' },
    { id: 'n3', label: 'Ancestral de répteis e aves', x: 520, y: 340, r: 10, bare: true, tone: 'tinta', description: 'Répteis e aves compartilham um ancestral exclusivo', detail: 'Por isso, na filogenia moderna, as aves são consideradas um grupo de répteis (descendentes de dinossauros).' },
    { id: 'peixes', label: '🐟 Peixes', x: 680, y: 70, w: 140, h: 44, tone: 'ceu', hideBadge: true, description: 'Vertebrados aquáticos com brânquias', detail: 'Não têm membros com dedos. Coração com 2 cavidades, respiração branquial.' },
    { id: 'anfibios', label: '🐸 Anfíbios', x: 680, y: 160, w: 140, h: 44, tone: 'verde', hideBadge: true, description: 'Metamorfose e respiração cutânea', detail: 'Ovos sem âmnio e dependentes de água. Fase larval aquática, adulto em geral terrestre.' },
    { id: 'mamiferos', label: '🐕 Mamíferos', x: 680, y: 250, w: 140, h: 44, tone: 'argila', hideBadge: true, description: 'Glândulas mamárias e pelos', detail: 'Endotérmicos, coração com 4 cavidades. Quase todos são vivíparos.' },
    { id: 'repteis', label: '🦎 Répteis', x: 680, y: 340, w: 140, h: 44, tone: 'musgo', hideBadge: true, description: 'Pele com escamas, ovo com casca', detail: 'Ectotérmicos, fecundação interna, adaptados à vida terrestre.' },
    { id: 'aves', label: '🐦 Aves', x: 680, y: 430, w: 140, h: 44, tone: 'flor', hideBadge: true, description: 'Penas, bico e asas', detail: 'Endotérmicas, coração com 4 cavidades, ovo com casca calcária. Descendem de dinossauros terópodes.' },
  ],
  edges: [
    { d: 'M100 70 H610', arrow: false },
    { d: 'M100 70 V160 H240', arrow: false },
    { d: 'M240 160 H610', arrow: false },
    { d: 'M240 160 V250 H380', arrow: false },
    { d: 'M380 250 H610', arrow: false },
    { d: 'M380 250 V340 H520', arrow: false },
    { d: 'M520 340 H610', arrow: false },
    { d: 'M520 340 V430 H610', arrow: false },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={12} fontStyle="italic" fill="#4e4b42">
      <text x={110} y={54}>ancestral comum</text>
      <text x={252} y={146}>4 membros (tetrápodes)</text>
      <text x={392} y={236}>ovo com âmnio</text>
      <text x={532} y={326}>diápsidos</text>
    </g>
  ),
}

export const naturalSelection: DiagramSpec = {
  id: 'selecao-natural',
  title: 'Seleção natural (Darwin)',
  caption: 'Clique em cada etapa. A seleção natural atua sobre variações que já existem.',
  enemTip: 'Lamarck: uso e desuso + herança de caracteres adquiridos (ideia superada). Darwin/Wallace: seleção natural sobre variação hereditária pré-existente. Hoje: teoria sintética (inclui genética e mutação).',
  viewBox: [800, 490],
  nodes: [
    { id: 'variacao', label: 'Variação\nentre indivíduos', x: 150, y: 120, w: 220, h: 100, icon: '🧬', tone: 'verde', description: 'Os indivíduos de uma população são diferentes', detail: 'A variação surge por mutação e por recombinação gênica (crossing-over e fecundação). Ocorre ao acaso, antes da seleção.' },
    { id: 'ambiente', label: 'Pressão\ndo ambiente', x: 400, y: 120, w: 220, h: 100, icon: '🌍', tone: 'ceu', description: 'Recursos limitados, predadores, clima, doenças', detail: 'O ambiente "seleciona" quem tem características mais vantajosas ali. O que é vantajoso depende do local e do momento.' },
    { id: 'sobrevivencia', label: 'Sobrevivência\ndiferencial', x: 650, y: 120, w: 220, h: 100, icon: '⚖️', tone: 'sol', description: 'Os mais adaptados sobrevivem mais', detail: 'Aptidão (fitness) = capacidade de sobreviver E deixar descendentes. Não é "o mais forte", e sim o mais adaptado ao ambiente.' },
    { id: 'reproducao', label: 'Reprodução\ndiferencial', x: 650, y: 340, w: 220, h: 100, icon: '👶', tone: 'flor', description: 'Os mais aptos deixam mais descendentes', detail: 'Quem sobrevive e se reproduz mais transmite mais cópias de seus genes à geração seguinte.' },
    { id: 'heranca', label: 'Herança dos\ncaracteres', x: 400, y: 340, w: 220, h: 100, icon: '🔁', tone: 'argila', description: 'Só características hereditárias são selecionadas', detail: 'Características adquiridas durante a vida (como músculos) não passam aos filhos.' },
    { id: 'mudanca', label: 'População\nmuda ao longo do tempo', x: 150, y: 340, w: 220, h: 100, icon: '📈', tone: 'musgo', description: 'Aumenta a frequência dos alelos favoráveis', detail: 'Em longos períodos, o acúmulo dessas mudanças, somado ao isolamento reprodutivo, pode levar à formação de novas espécies.' },
  ],
  edges: [
    { from: 'variacao', to: 'ambiente' },
    { from: 'ambiente', to: 'sobrevivencia' },
    { from: 'sobrevivencia', to: 'reproducao' },
    { from: 'reproducao', to: 'heranca' },
    { from: 'heranca', to: 'mudanca' },
  ],
  foreground: (
    <text x={400} y={462} textAnchor="middle" fontSize={13} fontStyle="italic" fill="#4e4b42" fontFamily={FONT}>
      Exemplo: bactérias resistentes sobrevivem ao antibiótico e passam o gene de resistência aos descendentes.
    </text>
  ),
}

export const humanEvolution: DiagramSpec = {
  id: 'evolucao-humana',
  title: 'Evolução humana: principais hominídeos',
  caption: 'Clique em cada espécie para ver suas características.',
  enemTip: 'A evolução humana NÃO é uma linha reta: várias espécies viveram ao mesmo tempo. Bipedismo veio ANTES do aumento do cérebro. Ma = milhões de anos atrás.',
  viewBox: [800, 490],
  nodes: [
    { id: 'austral', label: 'Australopithecus\n4 a 2 Ma', x: 80, y: 380, w: 128, h: 76, fs: 12, tone: 'terra', description: 'Já andava sobre duas pernas (bípede)', detail: 'Africanos, cérebro pequeno (~450 cm³). "Lucy" é um A. afarensis (cerca de 3,2 Ma). Mostra que o bipedismo precedeu o grande cérebro.' },
    { id: 'habilis', label: 'Homo habilis\n2,4 a 1,4 Ma', x: 235, y: 320, w: 128, h: 76, fs: 12, tone: 'argila', description: 'Primeiras ferramentas de pedra', detail: 'Cérebro ~600 cm³. O nome significa "homem hábil". Associado a instrumentos líticos simples.' },
    { id: 'erectus', label: 'Homo erectus\n1,9 Ma a ~110 mil', x: 390, y: 260, w: 128, h: 76, fs: 12, tone: 'sol', description: 'Domínio do fogo e saída da África', detail: 'Cérebro ~900 a 1.000 cm³. Postura ereta, ferramentas mais elaboradas, primeiro a se espalhar pela Ásia e Europa.' },
    { id: 'neander', label: 'H. neanderthalensis\n400 a 40 mil anos', x: 545, y: 200, w: 128, h: 76, fs: 11, tone: 'ceu', description: 'Adaptado ao frio da Eurásia', detail: 'Cérebro ~1.500 cm³, enterrava mortos, usava fogo. Conviveu e se cruzou com o sapiens: pessoas fora da África têm 1 a 2% de DNA neandertal.' },
    { id: 'sapiens', label: 'Homo sapiens\n~300 mil anos', x: 700, y: 140, w: 128, h: 76, fs: 12, tone: 'verde', description: 'Nossa espécie, surgida na África', detail: 'Cérebro ~1.350 cm³, linguagem simbólica, arte, agricultura e cultura complexa. Única espécie humana atual.' },
  ],
  edges: [
    { from: 'austral', to: 'habilis', dashed: true },
    { from: 'habilis', to: 'erectus', dashed: true },
    { from: 'erectus', to: 'neander', dashed: true },
    { from: 'neander', to: 'sapiens', dashed: true },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={13} fontStyle="italic" fill="#4e4b42" textAnchor="middle">
      <text x={400} y={455}>Não é uma escada: várias espécies coexistiram. As setas mostram apenas a ordem de aparecimento.</text>
      <text x={400} y={475}>Ma = milhões de anos atrás</text>
    </g>
  ),
}

export const animalPhylogeny: DiagramSpec = {
  id: 'filogenia-animal',
  title: 'Filogenia dos principais filos animais',
  caption: 'Clique nos filos (caixas) ou nos pontos (inovações evolutivas) para ver as características.',
  enemTip: 'Decore as inovações em ordem: tecidos → simetria bilateral → celoma → segmentação → exoesqueleto. Cada nova característica define um grande grupo.',
  viewBox: [800, 500],
  nodes: [
    { id: 's0', label: 'Reino Animalia', x: 80, y: 36, r: 9, bare: true, tone: 'tinta', description: 'Multicelulares, heterótrofos, sem parede celular', detail: 'Todos os animais descendem de um ancestral comum multicelular e heterótrofo.' },
    { id: 's1', label: 'Tecidos verdadeiros', x: 170, y: 88, r: 9, bare: true, tone: 'tinta', description: 'Inovação: tecidos verdadeiros (eumetazoários)', detail: 'Poríferos não têm tecidos verdadeiros; todos os grupos seguintes têm.' },
    { id: 's2', label: 'Simetria bilateral e triblásticos', x: 260, y: 140, r: 9, bare: true, tone: 'tinta', description: 'Inovação: simetria bilateral e 3 folhetos embrionários', detail: 'Cefalização e movimento direcional. Cnidários têm simetria radial e 2 folhetos (diblásticos).' },
    { id: 's3', label: 'Pseudoceloma', x: 350, y: 192, r: 9, bare: true, tone: 'tinta', description: 'Cavidade corporal parcialmente revestida', detail: 'O pseudoceloma não é totalmente revestido por mesoderme. Platelmintos são acelomados (sem cavidade).' },
    { id: 's4', label: 'Celoma verdadeiro', x: 440, y: 244, r: 9, bare: true, tone: 'tinta', description: 'Inovação: celoma revestido por mesoderme', detail: 'Permite órgãos mais independentes e complexos. Moluscos, anelídeos, artrópodes, equinodermos e cordados são celomados.' },
    { id: 's5', label: 'Segmentação', x: 490, y: 296, r: 9, bare: true, tone: 'tinta', description: 'Inovação: corpo dividido em segmentos (metameria)', detail: 'Presente em anelídeos, artrópodes e (de forma diferente) em cordados.' },
    { id: 's6', label: 'Exoesqueleto de quitina', x: 530, y: 348, r: 9, bare: true, tone: 'tinta', description: 'Inovação: exoesqueleto e apêndices articulados', detail: 'Exige mudas (ecdise) para crescer. É a característica que define os artrópodes.' },
    { id: 's7', label: 'Deuterostômios', x: 570, y: 400, r: 9, bare: true, tone: 'tinta', description: 'O ânus se forma antes da boca no embrião', detail: 'Equinodermos e cordados são deuterostômios, o que os aproxima evolutivamente. Nos demais celomados, a boca se forma primeiro (protostômios).' },
    { id: 'poriferos', label: 'Poríferos', x: 700, y: 36, w: 170, h: 40, tone: 'sol', hideBadge: true, description: 'Esponjas: sem tecidos verdadeiros', detail: 'Corpo com poros e coanócitos. Filtradores, aquáticos e sésseis.' },
    { id: 'cnidarios', label: 'Cnidários', x: 700, y: 88, w: 170, h: 40, tone: 'ceu', hideBadge: true, description: 'Águas-vivas, corais, anêmonas', detail: 'Simetria radial, diblásticos, cnidócitos (células urticantes), cavidade gastrovascular com um só orifício.' },
    { id: 'platelmintos', label: 'Platelmintos', x: 700, y: 140, w: 170, h: 40, tone: 'musgo', hideBadge: true, description: 'Planárias, tênias, esquistossomos', detail: 'Corpo achatado, triblásticos, acelomados. Muitos são parasitas (Taenia, Schistosoma).' },
    { id: 'nematodeos', label: 'Nematódeos', x: 700, y: 192, w: 170, h: 40, tone: 'terra', hideBadge: true, description: 'Lombrigas, oxiúros, ancilóstomos', detail: 'Pseudocelomados, tubo digestório completo (boca e ânus), corpo cilíndrico. Várias verminoses.' },
    { id: 'moluscos', label: 'Moluscos', x: 700, y: 244, w: 170, h: 40, tone: 'flor', hideBadge: true, description: 'Caracóis, mexilhões, lulas, polvos', detail: 'Corpo mole, manto, pé muscular e, em muitos, concha calcária.' },
    { id: 'aneliedeos', label: 'Anelídeos', x: 700, y: 296, w: 170, h: 40, tone: 'argila', hideBadge: true, description: 'Minhocas, sanguessugas', detail: 'Corpo segmentado em anéis, celomados, sistema circulatório fechado.' },
    { id: 'artropodes', label: 'Artrópodes', x: 700, y: 348, w: 170, h: 40, tone: 'rubi', hideBadge: true, description: 'Insetos, aracnídeos, crustáceos, miriápodes', detail: 'Maior filo em número de espécies. Exoesqueleto de quitina, apêndices articulados, circulação aberta.' },
    { id: 'equinodermos', label: 'Equinodermos', x: 700, y: 400, w: 170, h: 40, tone: 'verde', hideBadge: true, description: 'Estrelas-do-mar, ouriços, pepinos-do-mar', detail: 'Exclusivamente marinhos, simetria radial no adulto (bilateral na larva), sistema ambulacral hidrovascular.' },
    { id: 'cordados', label: 'Cordados', x: 700, y: 452, w: 170, h: 40, tone: 'ceu', hideBadge: true, description: 'Inclui os vertebrados (peixes até mamíferos)', detail: 'Notocorda, tubo nervoso dorsal e fendas faríngeas em alguma fase da vida.' },
  ],
  edges: [
    { d: 'M80 36 H615', arrow: false },
    { d: 'M80 36 V88 H170', arrow: false },
    { d: 'M170 88 H615', arrow: false },
    { d: 'M170 88 V140 H260', arrow: false },
    { d: 'M260 140 H615', arrow: false },
    { d: 'M260 140 V192 H350', arrow: false },
    { d: 'M350 192 H615', arrow: false },
    { d: 'M350 192 V244 H440', arrow: false },
    { d: 'M440 244 H615', arrow: false },
    { d: 'M440 244 V296 H490', arrow: false },
    { d: 'M490 296 H615', arrow: false },
    { d: 'M490 296 V348 H530', arrow: false },
    { d: 'M530 348 H615', arrow: false },
    { d: 'M530 348 V400 H570', arrow: false },
    { d: 'M570 400 H615', arrow: false },
    { d: 'M570 400 V452 H615', arrow: false },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={11} fontStyle="italic" fill="#4e4b42">
      <text x={92} y={56}>multicelulares</text>
      <text x={182} y={110}>tecidos</text>
      <text x={182} y={123}>verdadeiros</text>
      <text x={272} y={162}>simetria bilateral</text>
      <text x={272} y={175}>3 folhetos</text>
      <text x={362} y={214}>pseudoceloma</text>
      <text x={452} y={266}>celoma</text>
      <text x={500} y={318}>segmentação</text>
      <text x={540} y={368}>quitina</text>
      <text x={560} y={426} textAnchor="end">deuterostômios</text>
    </g>
  ),
}

export const adaptations: DiagramSpec = {
  id: 'adaptacoes',
  title: 'Adaptações e evolução biológica',
  caption: 'Clique em cada conceito para ver exemplos e como o ENEM costuma cobrar.',
  enemTip: 'Homologia = mesma origem embrionária (podem ter funções diferentes). Analogia = mesma função, origens diferentes. Analogia indica convergência adaptativa, NÃO parentesco próximo.',
  viewBox: [800, 470],
  nodes: [
    { id: 'camuflagem', label: 'Camuflagem\nconfunde-se com o ambiente', x: 140, y: 130, w: 230, h: 150, fs: 13, icon: '🦎', tone: 'verde', description: 'Cor e forma semelhantes ao ambiente', detail: 'Exemplos: bicho-pau (parece um galho), mariposa-do-vidoeiro, lagarto-folha. Dificulta a detecção por predadores ou presas.' },
    { id: 'mimetismo', label: 'Mimetismo\nimita outra espécie', x: 400, y: 130, w: 230, h: 150, fs: 13, icon: '🐍', tone: 'sol', description: 'Uma espécie imita outra perigosa ou tóxica', detail: 'A falsa-coral (inofensiva) imita as cores da coral-verdadeira (venenosa) e afasta predadores. Quem imita se beneficia sem pagar o custo do veneno.' },
    { id: 'aposematismo', label: 'Aposematismo\ncores de advertência', x: 660, y: 130, w: 230, h: 150, fs: 13, icon: '🐸', tone: 'rubi', description: 'Cores vivas avisam que o animal é tóxico', detail: 'Sapo-dardo, vespas e joaninhas têm cores fortes que predadores aprendem a evitar.' },
    { id: 'convergencia', label: 'Convergência\nestruturas análogas', x: 140, y: 320, w: 230, h: 150, fs: 13, icon: '🐬', tone: 'ceu', description: 'Grupos distantes desenvolvem soluções parecidas', detail: 'Golfinho (mamífero) e tubarão (peixe) têm corpo hidrodinâmico por viverem em ambientes semelhantes. Asa de ave e de inseto também são análogas.' },
    { id: 'homologia', label: 'Homologia\nmesma origem embrionária', x: 400, y: 320, w: 230, h: 150, fs: 13, icon: '🦇', tone: 'argila', description: 'Estruturas de mesma origem, funções que podem diferir', detail: 'Braço humano, asa do morcego e nadadeira da baleia têm o mesmo plano ósseo. Indicam ancestral comum e divergência adaptativa.' },
    { id: 'comportamento', label: 'Comportamento\nmigração e hibernação', x: 660, y: 320, w: 230, h: 150, fs: 13, icon: '🐦', tone: 'musgo', description: 'Adaptações não físicas', detail: 'Migração das aves, hibernação dos ursos, estivação de caramujos: estratégias comportamentais selecionadas que aumentam a sobrevivência.' },
  ],
}

export const metamorphosis: DiagramSpec = {
  id: 'metamorfose',
  title: 'Metamorfose em insetos e anfíbios',
  caption: 'Clique em cada fase do ciclo de vida.',
  enemTip: 'Metamorfose completa tem PUPA e larva muito diferente do adulto. Na incompleta, a ninfa já é parecida com o adulto. Anfíbios também têm metamorfose (girino → adulto).',
  viewBox: [800, 480],
  nodes: [
    { id: 'c-ovo', label: 'Ovo', x: 110, y: 120, w: 150, h: 70, icon: '🥚', tone: 'tinta', description: 'Início do ciclo', detail: 'A fêmea deposita os ovos em local com alimento para a larva.' },
    { id: 'c-larva', label: 'Larva', x: 300, y: 120, w: 150, h: 70, icon: '🐛', tone: 'verde', description: 'Fase de alimentação e crescimento', detail: 'A lagarta come muito e cresce, com ecdises. É muito diferente do adulto, e geralmente come outros alimentos.' },
    { id: 'c-pupa', label: 'Pupa', x: 490, y: 120, w: 150, h: 70, icon: '⏳', tone: 'sol', description: 'Fase de reorganização do corpo', detail: 'No casulo (ou crisálida), os tecidos larvais são remodelados e os órgãos do adulto se formam. Quase não se alimenta nem se move.' },
    { id: 'c-adulto', label: 'Adulto', x: 680, y: 120, w: 150, h: 70, icon: '🦋', tone: 'flor', description: 'Fase reprodutiva e de dispersão', detail: 'Borboletas, moscas, besouros, abelhas e mosquitos. Possui asas e está apto a reproduzir.' },
    { id: 'i-ovo', label: 'Ovo', x: 110, y: 262, w: 150, h: 70, icon: '🥚', tone: 'tinta', description: 'Início do ciclo', detail: 'Do ovo sai um jovem já parecido com o adulto.' },
    { id: 'i-ninfa', label: 'Ninfa', x: 300, y: 262, w: 150, h: 70, icon: '🐜', tone: 'argila', description: 'Jovem semelhante ao adulto, sem asas desenvolvidas', detail: 'Cresce por mudas sucessivas (ecdises). Não há pupa.' },
    { id: 'i-adulto', label: 'Adulto', x: 490, y: 262, w: 150, h: 70, icon: '🦗', tone: 'musgo', description: 'Asas funcionais e maturidade sexual', detail: 'Barata, gafanhoto, libélula, percevejo e cupim.' },
    { id: 'i-ametabolo', label: 'Ametábolos\n(traça): sem metamorfose', x: 680, y: 262, w: 150, h: 70, fs: 12, tone: 'tinta', description: 'Desenvolvimento direto', detail: 'O jovem é igual ao adulto, apenas menor. Típico de insetos primitivos sem asas, como traças.' },
    { id: 'a-ovo', label: 'Ovo', x: 110, y: 404, w: 150, h: 70, icon: '🥚', tone: 'tinta', description: 'Ovos gelatinosos na água', detail: 'Fecundação geralmente externa, em ambiente aquático.' },
    { id: 'a-girino', label: 'Girino', x: 300, y: 404, w: 150, h: 70, icon: '🐟', tone: 'ceu', description: 'Larva aquática com brânquias e cauda', detail: 'Alimenta-se de algas, respira por brânquias, coração com 2 cavidades. É controlado pelo hormônio tireoidiano.' },
    { id: 'a-adulto', label: 'Rã adulta', x: 490, y: 404, w: 150, h: 70, icon: '🐸', tone: 'verde', description: 'Quatro patas, pulmões e respiração cutânea', detail: 'Perde a cauda, ganha pernas e pulmões. Coração com 3 cavidades, vida semiterrestre.' },
  ],
  edges: [
    { from: 'c-ovo', to: 'c-larva' },
    { from: 'c-larva', to: 'c-pupa' },
    { from: 'c-pupa', to: 'c-adulto' },
    { from: 'i-ovo', to: 'i-ninfa' },
    { from: 'i-ninfa', to: 'i-adulto' },
    { from: 'a-ovo', to: 'a-girino' },
    { from: 'a-girino', to: 'a-adulto' },
  ],
  foreground: (
    <g fontFamily={FONT} fontSize={14} fontWeight={700} fill="#4e4b42">
      <text x={20} y={60}>Metamorfose completa (holometábolos)</text>
      <text x={20} y={202}>Metamorfose incompleta (hemimetábolos)</text>
      <text x={20} y={344}>Anfíbios (anuros)</text>
    </g>
  ),
}
