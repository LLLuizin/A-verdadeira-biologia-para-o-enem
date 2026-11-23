'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { topics } from '@/content/topics'

type Branch = {
  title: string
  summary: string
  detail: string
  tone: 'verde' | 'musgo' | 'terra' | 'argila' | 'flor' | 'ceu'
}

type MapSpec = {
  eyebrow: string
  central: string
  subtitle: string
  kind: 'cell' | 'dna' | 'division' | 'genetics' | 'evolution' | 'ecology' | 'human' | 'plant' | 'animal' | 'lab'
  branches: Branch[]
}

const maps: Record<string, MapSpec> = {
  'celula-estrutura': {
    eyebrow: 'A unidade fundamental da vida', central: 'CÉLULA', subtitle: 'Estrutura, energia e comunicação', kind: 'cell',
    branches: [
      { title: 'Membrana plasmática', summary: 'Fronteira seletiva', detail: 'Bicamada de fosfolipídios com proteínas. Controla a entrada e a saída de substâncias por transporte passivo, ativo e vesicular.', tone: 'ceu' },
      { title: 'Núcleo e DNA', summary: 'Centro de informação', detail: 'Nas células eucarióticas, o núcleo abriga o DNA e coordena a expressão gênica. O nucléolo participa da formação dos ribossomos.', tone: 'flor' },
      { title: 'Mitocôndria', summary: 'Respiração celular', detail: 'Realiza etapas aeróbias da respiração celular e produz a maior parte do ATP usado pela célula. Possui DNA próprio e dupla membrana.', tone: 'terra' },
      { title: 'Ribossomos', summary: 'Fábricas de proteínas', detail: 'Leem o RNA mensageiro e unem aminoácidos. Estão livres no citoplasma ou associados ao retículo endoplasmático rugoso.', tone: 'argila' },
      { title: 'Sistema de endomembranas', summary: 'Produção e transporte', detail: 'Retículo endoplasmático sintetiza proteínas e lipídios; complexo golgiense modifica, empacota e distribui moléculas; lisossomos fazem digestão intracelular.', tone: 'musgo' },
      { title: 'Célula vegetal', summary: 'Parede e cloroplastos', detail: 'Além das estruturas comuns, possui parede de celulose, grande vacúolo central e plastídios. Cloroplastos realizam fotossíntese.', tone: 'verde' },
    ],
  },
  'divisao-celular': {
    eyebrow: 'Crescimento, renovação e reprodução', central: 'DIVISÃO', subtitle: 'Uma célula, dois caminhos', kind: 'division',
    branches: [
      { title: 'Interfase', summary: 'Preparação', detail: 'Na fase G1 a célula cresce; na fase S duplica o DNA; na G2 confere e prepara os componentes para a divisão.', tone: 'ceu' },
      { title: 'Mitose', summary: 'Duas células semelhantes', detail: 'Prófase, metáfase, anáfase e telófase organizam e separam cromátides-irmãs. Mantém o número de cromossomos e atua em crescimento e reparo.', tone: 'verde' },
      { title: 'Meiose I', summary: 'Separação dos homólogos', detail: 'Cromossomos homólogos pareiam e podem trocar segmentos no crossing-over. Depois, os homólogos são separados, reduzindo a ploidia.', tone: 'flor' },
      { title: 'Meiose II', summary: 'Separação das cromátides', detail: 'É semelhante à mitose: cromátides-irmãs se separam. Ao final, geralmente surgem quatro células haploides geneticamente diferentes.', tone: 'argila' },
      { title: 'Variabilidade genética', summary: 'Mistura de alelos', detail: 'Crossing-over e segregação independente criam novas combinações de alelos nos gametas, aumentando a diversidade entre descendentes.', tone: 'terra' },
      { title: 'Controle do ciclo', summary: 'Pontos de checagem', detail: 'Ciclinas e CDKs regulam o ciclo. Falhas em genes de controle, como supressores tumorais, podem favorecer divisões desordenadas.', tone: 'musgo' },
    ],
  },
  'dna-rna-proteina': {
    eyebrow: 'Do gene à característica', central: 'DNA → RNA', subtitle: 'A informação genética em ação', kind: 'dna',
    branches: [
      { title: 'DNA', summary: 'Armazenamento', detail: 'Dupla hélice formada por nucleotídeos. As bases se pareiam de modo complementar: A–T e C–G.', tone: 'ceu' },
      { title: 'Replicação', summary: 'Cópia semiconservativa', detail: 'Cada molécula nova conserva uma fita antiga e sintetiza uma fita complementar. Ocorre antes da divisão celular.', tone: 'verde' },
      { title: 'Transcrição', summary: 'DNA vira RNA', detail: 'A RNA-polimerase usa uma fita de DNA como molde para produzir RNA. No RNA, a uracila substitui a timina.', tone: 'flor' },
      { title: 'RNA mensageiro', summary: 'Leva a receita', detail: 'O mRNA transporta a sequência de códons que será lida pelo ribossomo para orientar a ordem dos aminoácidos.', tone: 'terra' },
      { title: 'Tradução', summary: 'RNA vira proteína', detail: 'Ribossomos leem códons do mRNA; tRNAs trazem aminoácidos correspondentes. A cadeia formada dobra e adquire função.', tone: 'argila' },
      { title: 'Mutações', summary: 'Mudanças na sequência', detail: 'Substituições, inserções e deleções podem não alterar a proteína, mudar um aminoácido ou interromper a tradução. O efeito depende do contexto.', tone: 'musgo' },
    ],
  },
  'genetica-mendeliana': {
    eyebrow: 'Como as características são herdadas', central: 'HERANÇA', subtitle: 'Alelos, cruzamentos e probabilidades', kind: 'genetics',
    branches: [
      { title: 'Gene e alelo', summary: 'Versões de um gene', detail: 'Um gene é um trecho de DNA associado a um produto funcional. Alelos são versões desse gene que podem gerar variações.', tone: 'ceu' },
      { title: 'Genótipo × fenótipo', summary: 'Constituição e expressão', detail: 'Genótipo é a composição de alelos; fenótipo é a característica observável, resultado da interação entre genes e ambiente.', tone: 'verde' },
      { title: '1ª Lei de Mendel', summary: 'Segregação dos alelos', detail: 'Os dois alelos de um gene se separam na formação dos gametas. Cada gameta recebe apenas um alelo do par.', tone: 'flor' },
      { title: 'Quadrado de Punnett', summary: 'Previsão de cruzamentos', detail: 'Organiza gametas e mostra proporções esperadas. Em Aa × Aa, a proporção genotípica é 1 AA : 2 Aa : 1 aa.', tone: 'argila' },
      { title: 'Herança não simples', summary: 'Codominância e outros padrões', detail: 'Na codominância, os dois alelos aparecem no heterozigoto, como IA e IB no sistema ABO. Dominância incompleta produz fenótipo intermediário.', tone: 'terra' },
      { title: 'Heredogramas', summary: 'Padrões na família', detail: 'Símbolos representam indivíduos e relações familiares. O padrão de transmissão ajuda a inferir herança dominante, recessiva ou ligada ao sexo.', tone: 'musgo' },
    ],
  },
  evolucao: {
    eyebrow: 'Mudanças nas populações ao longo das gerações', central: 'EVOLUÇÃO', subtitle: 'Variação, seleção e ancestralidade', kind: 'evolution',
    branches: [
      { title: 'Variação genética', summary: 'Matéria-prima', detail: 'Mutações originam novos alelos; recombinação e reprodução sexuada criam combinações. A seleção atua sobre variações já existentes.', tone: 'flor' },
      { title: 'Seleção natural', summary: 'Sucesso reprodutivo', detail: 'Indivíduos com características hereditárias vantajosas em determinado ambiente tendem a deixar mais descendentes. Populações mudam ao longo das gerações.', tone: 'verde' },
      { title: 'Deriva genética', summary: 'Acaso nas frequências', detail: 'Mudanças aleatórias nas frequências alélicas são mais intensas em populações pequenas. Efeito fundador e gargalo populacional são exemplos.', tone: 'ceu' },
      { title: 'Fluxo gênico', summary: 'Troca entre populações', detail: 'Migração de indivíduos férteis transfere alelos entre populações e pode reduzir diferenças genéticas entre elas.', tone: 'terra' },
      { title: 'Especiação', summary: 'Isolamento reprodutivo', detail: 'Quando populações acumulam diferenças e deixam de trocar genes, podem originar espécies distintas. Barreiras geográficas ou reprodutivas favorecem o processo.', tone: 'argila' },
      { title: 'Evidências', summary: 'Fósseis e parentesco', detail: 'Registro fóssil, anatomia e embriologia comparadas, biogeografia e semelhanças moleculares sustentam a ancestralidade comum.', tone: 'musgo' },
    ],
  },
  ecologia: {
    eyebrow: 'Relações entre organismos e ambiente', central: 'ECOSSISTEMA', subtitle: 'Energia flui; matéria circula', kind: 'ecology',
    branches: [
      { title: 'Níveis ecológicos', summary: 'Do indivíduo à biosfera', detail: 'Organismo → população → comunidade → ecossistema → bioma → biosfera. Cada nível amplia as relações estudadas.', tone: 'verde' },
      { title: 'Cadeias e teias', summary: 'Quem se alimenta de quem', detail: 'Produtores formam matéria orgânica; consumidores transferem energia; decompositores reciclam nutrientes. Teias conectam várias cadeias.', tone: 'terra' },
      { title: 'Fluxo de energia', summary: 'Perda a cada nível', detail: 'A energia entra principalmente pela fotossíntese e diminui a cada transferência trófica, pois parte é dissipada como calor.', tone: 'argila' },
      { title: 'Ciclos da matéria', summary: 'Água, carbono e nitrogênio', detail: 'Água circula por evaporação e precipitação; carbono por fotossíntese, respiração e combustão; nitrogênio depende de transformações microbianas.', tone: 'ceu' },
      { title: 'Sucessão ecológica', summary: 'Comunidades se transformam', detail: 'Espécies pioneiras modificam o ambiente e abrem caminho para outras. Na sucessão secundária já existe solo, por isso a recuperação tende a ser mais rápida.', tone: 'musgo' },
      { title: 'Impactos ambientais', summary: 'Pressões humanas', detail: 'Desmatamento, poluição, fragmentação e mudanças climáticas alteram habitats e ciclos. Conservação e uso sustentável reduzem esses impactos.', tone: 'flor' },
    ],
  },
  'fisiologia-humana': {
    eyebrow: 'Sistemas trabalhando em conjunto', central: 'CORPO', subtitle: 'Integração e equilíbrio interno', kind: 'human',
    branches: [
      { title: 'Homeostase', summary: 'Equilíbrio dinâmico', detail: 'Mecanismos de regulação mantêm variáveis internas dentro de faixas adequadas. O feedback negativo corrige desvios, como na temperatura corporal.', tone: 'verde' },
      { title: 'Sistema nervoso', summary: 'Sinais rápidos', detail: 'Neurônios recebem, processam e transmitem impulsos. Sinapses químicas usam neurotransmissores para comunicar células.', tone: 'flor' },
      { title: 'Sistema endócrino', summary: 'Mensagens hormonais', detail: 'Glândulas liberam hormônios no sangue. Insulina reduz a glicemia; glucagon ajuda a elevá-la, coordenando o metabolismo energético.', tone: 'terra' },
      { title: 'Circulação e respiração', summary: 'Transporte e trocas', detail: 'O coração impulsiona o sangue. Nos alvéolos ocorre hematose: O₂ entra no sangue e CO₂ sai para ser eliminado.', tone: 'argila' },
      { title: 'Digestão e excreção', summary: 'Obter e regular', detail: 'Enzimas quebram alimentos em moléculas absorvíveis. Rins filtram o sangue e ajustam água, sais e excretas por meio dos néfrons.', tone: 'ceu' },
      { title: 'Defesa e reprodução', summary: 'Proteção e continuidade', detail: 'Sistema imune reconhece agentes estranhos e forma memória. Sistemas reprodutores produzem gametas e possibilitam a fecundação.', tone: 'musgo' },
    ],
  },
  botanica: {
    eyebrow: 'A vida vegetal por dentro e por fora', central: 'PLANTA', subtitle: 'Energia, transporte e reprodução', kind: 'plant',
    branches: [
      { title: 'Fotossíntese', summary: 'Luz vira energia química', detail: 'Cloroplastos capturam energia luminosa. A fase fotoquímica produz ATP e NADPH; o ciclo de Calvin fixa CO₂ em moléculas orgânicas.', tone: 'verde' },
      { title: 'Xilema', summary: 'Seiva bruta', detail: 'Conduz água e sais minerais das raízes para as partes aéreas. A transpiração foliar contribui para a subida da coluna de água.', tone: 'ceu' },
      { title: 'Floema', summary: 'Seiva elaborada', detail: 'Distribui açúcares e outras substâncias orgânicas das regiões-fonte para regiões-dreno, conforme as necessidades da planta.', tone: 'terra' },
      { title: 'Hormônios vegetais', summary: 'Coordenação do crescimento', detail: 'Auxinas, giberelinas, citocininas, etileno e ácido abscísico regulam crescimento, germinação, amadurecimento e respostas ao estresse.', tone: 'flor' },
      { title: 'Reprodução', summary: 'Flores, frutos e sementes', detail: 'Nas angiospermas, a flor abriga estruturas reprodutivas. Após fecundação, o óvulo origina a semente e o ovário forma o fruto.', tone: 'argila' },
      { title: 'Adaptações', summary: 'Vida em diferentes ambientes', detail: 'Cutícula, estômatos, raízes e formas de folhas variam conforme a disponibilidade de água, luz e condições do ambiente.', tone: 'musgo' },
    ],
  },
  zoologia: {
    eyebrow: 'Diversidade e planos corporais animais', central: 'ANIMAIS', subtitle: 'Estrutura, função e adaptação', kind: 'animal',
    branches: [
      { title: 'Poríferos e cnidários', summary: 'Organização simples', detail: 'Poríferos filtram água e não possuem tecidos verdadeiros. Cnidários têm tecidos, simetria radial e cnidócitos para defesa e captura.', tone: 'ceu' },
      { title: 'Platelmintos e nematódeos', summary: 'Vermes e parasitismo', detail: 'Platelmintos são achatados e acelomados; nematódeos são cilíndricos e pseudocelomados. Ambos incluem espécies de importância médica.', tone: 'argila' },
      { title: 'Anelídeos e moluscos', summary: 'Segmentação e corpo mole', detail: 'Anelídeos têm corpo segmentado e circulação geralmente fechada. Moluscos possuem manto, massa visceral e pé muscular.', tone: 'terra' },
      { title: 'Artrópodes', summary: 'Exoesqueleto e apêndices', detail: 'Possuem apêndices articulados, exoesqueleto de quitina e crescimento por ecdise. É o filo com maior número de espécies conhecidas.', tone: 'verde' },
      { title: 'Equinodermos e cordados', summary: 'Deuterostômios', detail: 'Equinodermos são marinhos e têm sistema ambulacrário. Cordados apresentam, em alguma fase, notocorda, tubo nervoso dorsal e fendas faringianas.', tone: 'flor' },
      { title: 'Adaptações', summary: 'Relação com o ambiente', detail: 'Camuflagem, mimetismo, metamorfose e diferentes estratégias respiratórias e reprodutivas aumentam a sobrevivência em ambientes variados.', tone: 'musgo' },
    ],
  },
  biotecnologia: {
    eyebrow: 'Ferramentas para estudar e modificar sistemas vivos', central: 'BIOTEC', subtitle: 'DNA, diagnóstico e aplicações', kind: 'lab',
    branches: [
      { title: 'DNA recombinante', summary: 'Combinar sequências', detail: 'Fragmentos de DNA podem ser unidos e inseridos em vetores, como plasmídeos, para replicação ou expressão em uma célula hospedeira.', tone: 'ceu' },
      { title: 'PCR', summary: 'Amplificar DNA', detail: 'Ciclos de desnaturação, anelamento de primers e extensão pela DNA-polimerase geram milhões de cópias de um trecho específico.', tone: 'verde' },
      { title: 'Transgênicos', summary: 'Genes introduzidos', detail: 'Organismos transgênicos recebem material genético por engenharia genética. A característica depende do gene, da expressão e do contexto biológico.', tone: 'musgo' },
      { title: 'CRISPR-Cas', summary: 'Edição direcionada', detail: 'Um RNA guia direciona a proteína Cas a uma sequência-alvo. O reparo celular do DNA pode produzir alterações no local escolhido.', tone: 'flor' },
      { title: 'Células-tronco', summary: 'Diferenciação celular', detail: 'Células-tronco têm capacidade de autorrenovação e diferenciação. Potência varia: totipotentes, pluripotentes e multipotentes.', tone: 'terra' },
      { title: 'Bioética', summary: 'Responsabilidade e limites', detail: 'Avalia riscos, benefícios, consentimento, privacidade genética, biossegurança e justiça no acesso às tecnologias.', tone: 'argila' },
    ],
  },
}

const palettes: Record<Branch['tone'], { bg: string; border: string; ink: string; dot: string }> = {
  verde: { bg: '#edf4e9', border: '#c8d8c0', ink: '#35543b', dot: '#668c60' },
  musgo: { bg: '#eff2e9', border: '#d3dac8', ink: '#4b5b3e', dot: '#80916c' },
  terra: { bg: '#f7efe6', border: '#e7d4c0', ink: '#795338', dot: '#b47a4e' },
  argila: { bg: '#fbefe9', border: '#ebd0c4', ink: '#8b4c36', dot: '#c17a5c' },
  flor: { bg: '#f7edf2', border: '#e8d2dd', ink: '#78475f', dot: '#b77a98' },
  ceu: { bg: '#edf3f6', border: '#cbdbe4', ink: '#3c6276', dot: '#7298ac' },
}

function Specimen({ kind }: { kind: MapSpec['kind'] }) {
  const common = { fill: 'none', stroke: '#49634d', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  return (
    <svg viewBox="0 0 180 112" className="h-[104px] w-[170px]" role="img" aria-label="Ilustração científica do tema">
      {kind === 'cell' && <g {...common}>
        <path d="M20 57C19 27 48 12 88 17c38-7 69 15 70 46-3 28-31 39-70 32-41 8-67-10-68-38Z" fill="#dcebd7" />
        <ellipse cx="92" cy="55" rx="24" ry="20" fill="#c8d7e8" /><circle cx="98" cy="50" r="7" fill="#8da8c1" stroke="none" />
        <path d="M43 43c12-14 19 5 9 13-8 7-15-3-9-13ZM122 68c10-15 24-5 16 7-7 9-17 2-16-7Z" fill="#d8b78d" /><path d="M62 76c8-12 15-7 17 0M122 34l12 7M36 76l10-7" />
      </g>}
      {kind === 'dna' && <g {...common}>
        <path d="M48 10c65 22 20 68 84 92M132 10C67 32 112 78 48 102" strokeWidth="4" />
        {Array.from({ length: 6 }, (_, i) => <path key={i} d={'M' + (55 + i * 5) + ' ' + (20 + i * 14) + 'L' + (125 - i * 5) + ' ' + (20 + i * 14)} stroke="#b47755" strokeWidth="2.5" />)}
        <circle cx="48" cy="10" r="5" fill="#b47755" stroke="none" /><circle cx="132" cy="102" r="5" fill="#b47755" stroke="none" />
      </g>}
      {kind === 'division' && <g {...common}>
        <circle cx="42" cy="56" r="28" fill="#e9e2f0" /><circle cx="42" cy="56" r="11" fill="#b7a1c9" /><path d="M72 56h25m-8-8 8 8-8 8" />
        <circle cx="128" cy="56" r="23" fill="#e5efdf" /><path d="M117 44l22 24m0-24-22 24" stroke="#b47a4e" strokeWidth="3" /><circle cx="128" cy="56" r="4" fill="#668c60" stroke="none" />
      </g>}
      {kind === 'genetics' && <g {...common}>
        <path d="M20 24h140M20 88h140" stroke="#b9b7a9" strokeDasharray="3 5" />
        <g fill="#edf4e9"><circle cx="48" cy="38" r="17" /><circle cx="132" cy="38" r="17" /><circle cx="48" cy="78" r="17" /><circle cx="132" cy="78" r="17" /></g>
        <g fill="#35543b" stroke="none" fontSize="16" fontWeight="700" textAnchor="middle"><text x="48" y="44">A</text><text x="132" y="44">a</text><text x="48" y="84">a</text><text x="132" y="84">a</text></g>
        <path d="M65 38h50M48 55v6M132 55v6" stroke="#b47a4e" strokeWidth="2" />
      </g>}
      {kind === 'evolution' && <g {...common}>
        <path d="M90 98V58m0 0L44 24m46 34 44-34M90 58L62 42m28 16 29-16M44 24V13m0 11L26 10m18 14 17-9m67 0V13m0 11-18-14m18 14 18-14" />
        <circle cx="44" cy="24" r="6" fill="#b77a98" /><circle cx="134" cy="24" r="6" fill="#668c60" /><circle cx="26" cy="10" r="4" fill="#7298ac" /><circle cx="62" cy="42" r="4" fill="#b47a4e" /><circle cx="119" cy="42" r="4" fill="#b47a4e" /><path d="M78 98h24" strokeWidth="4" />
      </g>}
      {kind === 'ecology' && <g {...common}>
        <circle cx="90" cy="55" r="38" fill="#e8f0df" /><path d="M90 17v75M52 55h76M63 28l54 54M117 28 63 82" stroke="#8da17c" strokeWidth="1.7" />
        <path d="M90 17c-17 13-19 27 0 38 19-11 17-25 0-38Z" fill="#7da06b" /><path d="M52 55c13-17 27-19 38 0-11 19-25 17-38 0Z" fill="#c98b5e" /><path d="M90 93c-17-13-19-27 0-38 19 11 17 25 0 38Z" fill="#83a5b6" /><path d="M128 55c-13-17-27-19-38 0 11 19 25 17 38 0Z" fill="#b87f9d" />
      </g>}
      {kind === 'human' && <g {...common}>
        <circle cx="90" cy="18" r="12" fill="#ead9c9" /><path d="M90 31v46m-28-22 28-14 28 14M62 55l-11 30m65-30 11 30M90 77 70 103m20-26 20 26" strokeWidth="5" />
        <path d="M82 43c-11 13-8 25 8 28 16-3 19-15 8-28" fill="#d68a7e" stroke="#a75c50" /><path d="M90 50v15" stroke="#fff7ed" strokeWidth="2" />
      </g>}
      {kind === 'plant' && <g {...common}>
        <path d="M90 101V37m0 28C65 27 35 36 39 65c23 9 40 1 51-8Zm0-15c20-30 51-27 54 1-19 12-38 9-54-1Z" fill="#dcebd7" />
        <path d="M90 80c-24-18-40-9-37 9 18 8 30 3 37-9Zm0-8c20-18 40-9 37 9-18 8-30 3-37-9Z" fill="#a8c49b" /><path d="M76 101h28" strokeWidth="4" /><path d="M90 37c-13-12-11-25 0-30 11 5 13 18 0 30Z" fill="#b77a98" />
      </g>}
      {kind === 'animal' && <g {...common}>
        <path d="M38 65c-8-25 10-45 52-43 40-2 59 20 52 45-6 21-27 31-52 29-26 2-46-8-52-31Z" fill="#efe4d6" />
        <path d="M52 37 43 16l23 13m63 8 9-21-24 13" fill="#d3b99d" /><circle cx="71" cy="55" r="4" fill="#3b493d" stroke="none" /><circle cx="111" cy="55" r="4" fill="#3b493d" stroke="none" /><path d="M83 70q7 7 14 0m-7-1v-7M42 73 22 83m116-10 20 10" />
      </g>}
      {kind === 'lab' && <g {...common}>
        <path d="M68 12h44M80 12v31L51 89q-5 10 8 10h62q13 0 8-10l-29-46V12" fill="#e2edf0" /><path d="M63 76h55" stroke="#6f9bb0" strokeWidth="4" />
        <circle cx="78" cy="67" r="4" fill="#b77a98" stroke="none" /><circle cx="100" cy="57" r="4" fill="#b77a98" stroke="none" /><circle cx="109" cy="78" r="3" fill="#b77a98" stroke="none" /><path d="M32 26h18m-9-9v18m87 0h18m-9-9v18" stroke="#b47a4e" strokeWidth="2" />
      </g>}
    </svg>
  )
}

export function MindMapIllustration({ topicId }: { topicId: string }) {
  const topic = topics.find((item) => item.id === topicId)
  const spec = maps[topicId]
  const [activeIndex, setActiveIndex] = useState(0)

  if (!topic || !spec) return <div className="p-10 text-center text-tinta-500">Este mapa está sendo preparado.</div>

  const active = spec.branches[activeIndex]

  return (
    <section className="relative overflow-hidden bg-[#fbfaf6] p-5 sm:p-7 lg:p-9" aria-label={'Mapa mental: ' + topic.title}>
      <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(#c9c7b9 0.7px, transparent 0.7px)', backgroundSize: '18px 18px' }} />
      <div className="relative z-10 mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#71816f]"><span className="h-px w-7 bg-[#71816f]" /> Caderno de campo · mapa de conceitos</div>
          <h3 className="font-display text-xl font-semibold text-[#29372e] sm:text-2xl">{spec.eyebrow}</h3>
          <p className="mt-1 text-sm text-[#727a70]">Selecione um ramo para abrir a explicação e revisar as conexões.</p>
        </div>
        <span className="rounded-full border border-[#dfe4d8] bg-white/80 px-3 py-1.5 text-xs font-medium text-[#657661]">{spec.branches.length} núcleos de estudo</span>
      </div>

      <div className="relative z-10">
        <svg className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1000 690" preserveAspectRatio="none" aria-hidden="true">
          <g fill="none" stroke="#aab8a2" strokeWidth="2.1" strokeLinecap="round" strokeDasharray="4 7" opacity=".8">
            <path d="M500 345 C365 280 255 190 165 112" /><path d="M500 345 C500 260 500 185 500 110" /><path d="M500 345 C635 280 745 190 835 112" />
            <path d="M500 345 C365 410 255 500 165 578" /><path d="M500 345 C500 430 500 505 500 580" /><path d="M500 345 C635 410 745 500 835 578" />
          </g>
          <g fill="#8da17c"><circle cx="165" cy="112" r="5"/><circle cx="500" cy="110" r="5"/><circle cx="835" cy="112" r="5"/><circle cx="165" cy="578" r="5"/><circle cx="500" cy="580" r="5"/><circle cx="835" cy="578" r="5"/></g>
        </svg>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spec.branches.slice(0, 3).map((branch, index) => {
            const color = palettes[branch.tone]
            const selected = activeIndex === index
            return (
              <motion.button key={branch.title} type="button" whileHover={{ y: -3 }} whileTap={{ scale: 0.985 }} onClick={() => setActiveIndex(index)} aria-pressed={selected}
                className="relative min-h-[132px] rounded-[18px] border p-4 text-left transition-all"
                style={{ background: selected ? color.bg : 'rgba(255,255,255,.88)', borderColor: selected ? color.dot : '#e3e1d7', boxShadow: selected ? '0 10px 24px ' + color.dot + '22' : '0 5px 18px rgba(48,58,49,.045)' }}>
                <div className="mb-3 flex items-center justify-between"><span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: color.dot }}>{String(index + 1).padStart(2, '0')}</span><span className="h-2 w-2 rounded-full" style={{ background: color.dot }} /></div>
                <h4 className="font-display text-[17px] font-semibold leading-tight" style={{ color: color.ink }}>{branch.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#74776d]">{branch.summary}</p>
                <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-[.12em]" style={{ color: color.ink }}>{selected ? 'ramo selecionado' : 'explorar ramo'} ↗</span>
              </motion.button>
            )
          })}
        </div>

        <div className="relative my-5 flex min-h-[158px] items-center justify-center overflow-hidden rounded-[24px] border border-[#d9dfd2] bg-[#f0f3eb]/90 px-5 py-4">
          <div className="absolute -left-8 -top-14 h-36 w-36 rounded-full border border-[#d5dfce]" /><div className="absolute -bottom-20 -right-8 h-44 w-44 rounded-full border border-[#d5dfce]" />
          <div className="relative flex w-full max-w-xl flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-5 sm:text-left">
            <div className="flex h-[112px] w-[170px] shrink-0 items-center justify-center rounded-[20px] bg-white/65 shadow-[inset_0_0_0_1px_rgba(132,151,122,.16)]"><Specimen kind={spec.kind} /></div>
            <div><div className="text-[10px] font-bold uppercase tracking-[.2em] text-[#70836b]">{spec.subtitle}</div><div className="mt-1 font-display text-3xl font-bold tracking-[.08em] text-[#2f4836]">{spec.central}</div><div className="mt-1 text-xs text-[#738071]">Ideia central · {topic.title}</div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {spec.branches.slice(3, 6).map((branch, index) => {
            const realIndex = index + 3
            const color = palettes[branch.tone]
            const selected = activeIndex === realIndex
            return (
              <motion.button key={branch.title} type="button" whileHover={{ y: -3 }} whileTap={{ scale: 0.985 }} onClick={() => setActiveIndex(realIndex)} aria-pressed={selected}
                className="relative min-h-[132px] rounded-[18px] border p-4 text-left transition-all"
                style={{ background: selected ? color.bg : 'rgba(255,255,255,.88)', borderColor: selected ? color.dot : '#e3e1d7', boxShadow: selected ? '0 10px 24px ' + color.dot + '22' : '0 5px 18px rgba(48,58,49,.045)' }}>
                <div className="mb-3 flex items-center justify-between"><span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: color.dot }}>{String(realIndex + 1).padStart(2, '0')}</span><span className="h-2 w-2 rounded-full" style={{ background: color.dot }} /></div>
                <h4 className="font-display text-[17px] font-semibold leading-tight" style={{ color: color.ink }}>{branch.title}</h4>
                <p className="mt-1.5 text-xs leading-relaxed text-[#74776d]">{branch.summary}</p>
                <span className="mt-2 inline-block text-[10px] font-semibold uppercase tracking-[.12em]" style={{ color: color.ink }}>{selected ? 'ramo selecionado' : 'explorar ramo'} ↗</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <motion.div key={topicId + '-' + activeIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}
        className="relative z-10 mt-6 rounded-[20px] border border-[#dfe2d7] bg-white/90 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: palettes[active.tone].dot }}>{String(activeIndex + 1).padStart(2, '0')}</span>
          <div><div className="text-[10px] font-bold uppercase tracking-[.18em] text-[#899283]">Ramo em foco</div><h4 className="mt-1 font-display text-xl font-semibold text-[#29372e]">{active.title}</h4><p className="mt-2 max-w-4xl text-sm leading-7 text-[#626d63]">{active.detail}</p></div>
        </div>
      </motion.div>
      <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e3da] pt-4 text-xs text-[#8a8d82]"><span>Biologia ENEM · resumo visual para revisão</span><span>Use os ramos para conectar os conceitos</span></div>
    </section>
  )
}
