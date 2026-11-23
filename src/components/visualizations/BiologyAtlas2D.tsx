'use client'
import { useState } from 'react'

type Part={title:string;text:string}
type Item={id:string;name:string;subtitle:string;intro:string;parts:Part[];enem:string;example:string}
const make=(id:string,name:string,subtitle:string,intro:string,parts:Part[],enem:string,example:string):Item=>({id,name,subtitle,intro,parts,enem,example})
const data:Record<string,{title:string;intro:string;items:Item[]}> = {
evolucao:{title:'Evolução biológica',intro:'Entenda como as populações mudam ao longo das gerações, quais mecanismos produzem essas mudanças e quais evidências permitem reconstruir a história da vida.',items:[
make('variation','Variabilidade genética','A matéria-prima da evolução','Indivíduos de uma população apresentam diferenças hereditárias. Essa diversidade é essencial para que a composição genética das populações possa mudar.',[
{title:'Mutações',text:'São alterações na sequência do DNA. Podem originar novos alelos e surgem sem direcionamento pela necessidade do organismo. Seus efeitos podem ser neutros, prejudiciais ou vantajosos, dependendo do contexto.'},
{title:'Recombinação genética',text:'Na meiose, crossing-over e segregação independente dos cromossomos produzem combinações diferentes de alelos. A fecundação também combina material genético de dois gametas, ampliando a variabilidade.'},
{title:'Genótipo e fenótipo',text:'Genótipo é a constituição genética; fenótipo é o conjunto de características observáveis, resultante da interação entre genótipo e ambiente. A evolução ocorre nas populações, não pela transformação genética dirigida de um indivíduo.'}
],'A seleção natural não cria a variação de que o organismo precisa. Ela atua sobre diferenças hereditárias que já existem.','Em uma população bacteriana, mutações podem gerar resistência antes mesmo do contato com um antibiótico.'),
make('selection','Seleção natural','Diferenças no sucesso reprodutivo','O ambiente influencia quais características hereditárias contribuem mais para a sobrevivência e, principalmente, para a reprodução.',[
{title:'Etapas do processo',text:'Há variação hereditária entre indivíduos; os organismos enfrentam pressões ambientais, como predadores, doenças, clima e competição; alguns fenótipos deixam proporcionalmente mais descendentes; os alelos associados podem aumentar de frequência nas gerações seguintes.'},
{title:'Aptidão biológica',text:'Aptidão (fitness) é o sucesso reprodutivo relativo de um organismo. Não significa ser o mais forte, rápido ou resistente em termos absolutos. Uma característica só é vantajosa em relação às condições de determinado ambiente.'},
{title:'Seleção e adaptação',text:'A seleção natural não tem intenção nem objetivo. Uma característica vantajosa em certo ambiente pode ser neutra ou prejudicial em outro. Adaptações são características hereditárias que se tornaram comuns ao longo da história evolutiva.'}
],'Indivíduos são selecionados, mas quem evolui é a população: mudam as frequências de características hereditárias ao longo das gerações.','Bactérias resistentes sobrevivem e se reproduzem proporcionalmente mais quando o antibiótico elimina as sensíveis.'),
make('mechanisms','Outros mecanismos evolutivos','Deriva, fluxo gênico e seleção sexual','Além da seleção natural, outros processos alteram a frequência dos alelos e ajudam a explicar a diversidade genética das populações.',[
{title:'Deriva genética',text:'É a mudança aleatória das frequências alélicas. Seus efeitos são mais intensos em populações pequenas e podem fazer alelos desaparecerem ou se tornarem comuns mesmo sem conferir vantagem adaptativa.'},
{title:'Efeito fundador e gargalo',text:'O efeito fundador ocorre quando poucos indivíduos originam uma nova população, levando apenas parte da diversidade da população original. O gargalo populacional acontece quando uma redução brusca do tamanho da população altera ao acaso as frequências dos alelos dos sobreviventes.'},
{title:'Fluxo gênico e seleção sexual',text:'Fluxo gênico é a transferência de alelos entre populações por migração e reprodução. Seleção sexual envolve diferenças no sucesso de obtenção de parceiros e pode favorecer características que aumentam o acasalamento, mesmo com custos para a sobrevivência.'}
],'Deriva genética é aleatória; seleção natural depende de diferenças no sucesso reprodutivo associadas às características. Fluxo gênico conecta populações.','Após uma catástrofe, poucos indivíduos podem restar. Por acaso, alguns alelos podem ficar muito frequentes na população sobrevivente.'),
make('speciation','Especiação e isolamento','Como surgem novas espécies','A especiação é o processo pelo qual linhagens divergem e passam a apresentar isolamento reprodutivo, reduzindo ou impedindo o fluxo gênico entre elas.',[
{title:'Isolamento geográfico',text:'Rios, montanhas, ilhas ou grandes distâncias podem separar populações. Com menor fluxo gênico, mutações, seleção natural e deriva genética podem produzir divergência. Esse processo é associado à especiação alopátrica.'},
{title:'Isolamento reprodutivo',text:'Barreiras pré-zigóticas impedem o encontro dos gametas ou a fecundação, por diferenças de comportamento, época reprodutiva ou estruturas. Barreiras pós-zigóticas reduzem a viabilidade ou fertilidade dos híbridos.'},
{title:'Adaptação não é esforço',text:'Organismos não desenvolvem intencionalmente uma estrutura porque precisam dela. Variações hereditárias surgem por processos naturais; ao longo das gerações, algumas podem ser favorecidas e se tornar mais frequentes.'}
],'Isolamento geográfico pode favorecer a especiação, mas o critério central é o isolamento reprodutivo.','Populações separadas por uma barreira podem acumular diferenças durante muitas gerações e, eventualmente, deixar de produzir descendentes férteis entre si.'),
make('evidence','Evidências da evolução','Fósseis, anatomia e biologia molecular','Diferentes áreas da ciência fornecem evidências complementares de que as espécies mudam ao longo do tempo e compartilham ancestrais.',[
{title:'Registro fóssil',text:'Fósseis são restos ou vestígios preservados de organismos. Sua distribuição nas camadas geológicas permite investigar a sequência temporal de formas de vida, extinções e transições evolutivas.'},
{title:'Homologia e analogia',text:'Estruturas homólogas compartilham origem evolutiva, embora possam exercer funções diferentes, como braço humano, asa de morcego e nadadeira de baleia. Estruturas análogas têm função semelhante, mas origem evolutiva distinta, como asas de insetos e aves.'},
{title:'Embriologia, DNA e filogenia',text:'Semelhanças no desenvolvimento embrionário e em sequências de DNA e proteínas ajudam a estimar parentesco. Árvores filogenéticas representam hipóteses de ancestralidade: o parentesco é indicado pelo ancestral comum mais recente, não pela posição visual dos nomes.'}
],'Homologia indica ancestralidade comum da estrutura; analogia indica semelhança funcional sem necessariamente compartilhar a mesma origem.','Os membros anteriores de humanos, baleias e morcegos têm o mesmo plano estrutural, modificado para funções diferentes.')
]},
ecologia:{title:'Ecologia',intro:'Estude os níveis de organização, as relações alimentares, o fluxo de energia, a ciclagem da matéria, as interações ecológicas e os impactos ambientais.',items:[
make('organization','Níveis de organização','Do organismo à biosfera','A Ecologia investiga as relações dos seres vivos entre si e com os componentes físicos e químicos do ambiente.',[
{title:'Organismo, população e comunidade',text:'Organismo é um indivíduo. População reúne indivíduos da mesma espécie em uma área e período. Comunidade reúne populações de espécies diferentes que coexistem e interagem.'},
{title:'Ecossistema e bioma',text:'Ecossistema inclui a comunidade e os fatores abióticos, como água, luz, temperatura, solo e nutrientes. Bioma é uma grande unidade regional caracterizada por clima, vegetação e conjuntos de seres vivos.'},
{title:'Habitat e nicho ecológico',text:'Habitat é o local onde uma espécie vive. Nicho reúne seu modo de vida: recursos utilizados, condições toleradas, horários de atividade, reprodução e relações com outras espécies. Biosfera reúne todos os ecossistemas da Terra.'}
],'Habitat é o endereço; nicho é o papel ecológico e a maneira como a espécie utiliza os recursos.','Duas espécies podem viver na mesma floresta, mas ocupar nichos diferentes por consumirem alimentos distintos.'),
make('foodweb','Cadeias e teias alimentares','Relações de alimentação','As relações alimentares conectam organismos e permitem acompanhar a transferência de matéria e energia no ecossistema.',[
{title:'Produtores',text:'Organismos autotróficos, como plantas, algas e algumas bactérias, produzem matéria orgânica. Na fotossíntese utilizam energia luminosa; alguns microrganismos realizam quimiossíntese.'},
{title:'Consumidores',text:'São heterotróficos. Consumidores primários alimentam-se de produtores; secundários alimentam-se de primários; terciários podem alimentar-se de secundários. Onívoros podem ocupar mais de um nível trófico.'},
{title:'Decompositores e setas',text:'Fungos e bactérias decompõem matéria orgânica e liberam nutrientes. Detritívoros fragmentam restos. Em cadeias e teias, a seta aponta do alimento para quem o consome, indicando a transferência de matéria e energia.'}
],'Decompositores atuam sobre restos de todos os níveis tróficos, não apenas no final de uma cadeia.','Capim → gafanhoto → sapo → cobra. O capim é produtor; o gafanhoto é consumidor primário; o sapo é secundário.'),
make('energy','Fluxo de energia','Pirâmides ecológicas','A energia entra continuamente nos ecossistemas e passa pelos níveis tróficos. Parte é utilizada no metabolismo e dissipada como calor em cada transferência.',[
{title:'Transferência entre níveis',text:'Nem toda a biomassa é consumida ou assimilada. Os organismos utilizam energia na respiração, movimento e manutenção. Por isso, em geral, a energia disponível diminui nos níveis tróficos mais altos.'},
{title:'Pirâmide de energia',text:'Representa a energia disponível em cada nível trófico por área e tempo. É sempre direta, nunca invertida. A regra dos 10% é uma aproximação didática, não uma lei fixa; a eficiência real varia.'},
{title:'Biomassa e números',text:'Pirâmides de biomassa representam a massa de matéria orgânica e podem ser invertidas em alguns ambientes aquáticos. Pirâmides de números representam indivíduos e também podem ser invertidas, como uma árvore que sustenta muitos insetos.'}
],'A pirâmide de energia nunca é invertida. As de biomassa e de números podem ser invertidas dependendo do ecossistema.','Em um exemplo didático, 10.000 kJ nos produtores poderiam resultar em cerca de 1.000 kJ nos consumidores primários e 100 kJ nos secundários.'),
make('cycles','Ciclos biogeoquímicos','A circulação da matéria','Elementos químicos circulam entre os seres vivos e os componentes não vivos do planeta. A matéria é reutilizada, ao contrário da energia, que flui.',[
{title:'Água e carbono',text:'A água evapora e é liberada pela transpiração; o vapor condensa e retorna por precipitação. No ciclo do carbono, a fotossíntese incorpora CO₂ à matéria orgânica, enquanto respiração, decomposição e combustão devolvem carbono ao ambiente.'},
{title:'Nitrogênio',text:'Fixação transforma N₂ em compostos assimiláveis. Amonificação libera amônia/amônio; nitrificação forma nitrito e nitrato; plantas assimilam compostos nitrogenados; desnitrificação devolve N₂ à atmosfera.'},
{title:'Fósforo',text:'O fósforo circula principalmente entre rochas, solo, água e organismos. O intemperismo libera fosfatos, que são absorvidos por produtores e transferidos pela alimentação. Não há uma fase gasosa atmosférica importante.'}
],'O ciclo do fósforo é predominantemente sedimentar; os ciclos do carbono e do nitrogênio possuem etapas atmosféricas importantes.','O excesso de fertilizantes com nitrogênio e fósforo pode chegar a lagos e provocar eutrofização.'),
make('interactions','Relações ecológicas','Cooperação, competição e exploração','As relações ecológicas podem ocorrer entre indivíduos da mesma espécie (intraespecíficas) ou de espécies diferentes (interespecíficas).',[
{title:'Relações harmônicas',text:'Colônia: indivíduos da mesma espécie unidos fisicamente. Sociedade: cooperação sem união corporal. Mutualismo: espécies diferentes se beneficiam, com dependência na associação clássica. Protocooperação: ambas se beneficiam, mas a associação não é obrigatória. Comensalismo: uma se beneficia e a outra não é significativamente afetada.'},
{title:'Relações desarmônicas',text:'Competição ocorre pela disputa de recursos limitados. Predação envolve captura e consumo de uma presa; herbivoria é consumo de partes de plantas ou algas. Parasitismo beneficia o parasita e prejudica o hospedeiro.'},
{title:'Amensalismo e simbiose',text:'No amensalismo, uma espécie é prejudicada e a outra não é significativamente afetada. Antibiose é um caso em que substâncias liberadas por um organismo inibem outro. Simbiose é um termo amplo para associações íntimas entre espécies.'}
],'Mutualismo e protocooperação beneficiam ambas as espécies; a diferença cobrada com frequência é a dependência da associação.','Liquens são associações entre fungos e organismos fotossintetizantes, com troca de proteção, água e matéria orgânica.'),
make('populations','Dinâmica de populações','Crescimento e capacidade de suporte','O tamanho populacional varia conforme nascimentos, mortes, imigração e emigração, além das condições ambientais.',[
{title:'Densidade populacional',text:'É o número de indivíduos por unidade de área ou volume. Natalidade e imigração tendem a aumentar a população; mortalidade e emigração tendem a diminuí-la.'},
{title:'Potencial biótico e resistência ambiental',text:'Potencial biótico é a capacidade de reprodução em condições ideais. Alimento, espaço, predadores, parasitas, doenças e clima atuam como fatores limitantes e compõem a resistência ambiental.'},
{title:'Crescimento e capacidade de suporte',text:'O crescimento exponencial acelera quando recursos não limitam a população. No modelo logístico, o crescimento desacelera ao se aproximar da capacidade de suporte (K), o tamanho que o ambiente consegue sustentar em determinadas condições.'}
],'A capacidade de suporte não é fixa: pode mudar com recursos, clima e interações ecológicas.','Uma população de coelhos pode crescer quando há alimento abundante, mas desacelerar quando alimento e espaço se tornam limitantes.'),
make('impacts','Impactos ambientais','Alterações nos ecossistemas','Atividades humanas podem modificar habitats, ciclos biogeoquímicos, populações e relações ecológicas em escalas locais e globais.',[
{title:'Eutrofização',text:'O excesso de nutrientes, especialmente nitrogênio e fósforo, favorece a proliferação de algas. A decomposição da matéria orgânica aumenta o consumo de oxigênio e pode provocar hipóxia e morte de organismos aquáticos.'},
{title:'Bioacumulação e biomagnificação',text:'Bioacumulação é o acúmulo de uma substância em um organismo ao longo do tempo. Biomagnificação é o aumento da concentração de certos contaminantes persistentes nos níveis tróficos mais altos.'},
{title:'Fragmentação e mudanças climáticas',text:'Desmatamento e estradas dividem habitats, isolam populações e reduzem fluxo gênico. O aumento de gases de efeito estufa intensifica o aquecimento global e altera padrões de temperatura e precipitação.'}
],'Eutrofização está ligada ao excesso de nutrientes; biomagnificação, ao aumento de contaminantes persistentes ao longo dos níveis tróficos.','Mercúrio pode se acumular em organismos aquáticos e atingir concentrações maiores em predadores de topo.')
]},
zoologia:{title:'Zoologia',intro:'Compare os principais grupos animais por organização corporal, sistemas, reprodução, características exclusivas e exemplos de importância ecológica e médica.',items:[
make('porifera','Poríferos','Esponjas: animais filtradores','Poríferos são animais aquáticos, predominantemente marinhos, geralmente fixos ao substrato na fase adulta. O corpo apresenta poros e canais por onde a água circula.',[
{title:'Organização corporal',text:'Não possuem tecidos verdadeiros, órgãos ou sistemas. A organização é celular. Podem apresentar organização asconóide, siconóide ou leuconóide, com canais e câmaras que aumentam a superfície de filtração.'},
{title:'Caminho da água e nutrição',text:'A água entra pelos óstios, atravessa canais e câmaras e sai pelo ósculo. Coanócitos movimentam os flagelos, gerando a corrente, e retêm partículas alimentares. Amebócitos distribuem nutrientes. A digestão é intracelular.'},
{title:'Sustentação e reprodução',text:'Espículas minerais ou fibras de espongina sustentam o corpo. A reprodução pode ser assexuada, por brotamento, fragmentação ou gemulação, e sexuada. Muitas espécies são hermafroditas e apresentam larva livre-natante.'}
],'Poríferos não possuem tecidos verdadeiros. Coanócitos movimentam a água e capturam alimento; a digestão é intracelular.','Esponjas filtram a água, retendo partículas e microrganismos.'),
make('cnidaria','Cnidários','Águas-vivas, anêmonas e corais','Cnidários são animais aquáticos com simetria radial e tecidos verdadeiros. Possuem células especializadas para captura de presas e defesa.',[
{title:'Cnidócitos e nematocistos',text:'Cnidócitos são células características do grupo. Muitos contêm nematocistos, cápsulas que disparam estruturas capazes de prender ou inocular substâncias na presa. São abundantes nos tentáculos.'},
{title:'Organização e digestão',text:'São diblásticos: possuem ectoderme e endoderme, separadas pela mesogleia. A cavidade gastrovascular tem uma única abertura, que funciona como boca. A digestão começa na cavidade e termina dentro das células.'},
{title:'Pólipo, medusa e reprodução',text:'Pólipo é geralmente séssil, com boca e tentáculos voltados para cima. Medusa tem forma de umbrela e é geralmente natante. A reprodução pode ser sexuada ou assexuada; em alguns ciclos ocorre alternância entre pólipo e medusa.'}
],'Cnidócitos são células características do grupo; a cavidade gastrovascular possui uma única abertura.','Águas-vivas são medusas; anêmonas são pólipos; muitos corais formam colônias de pólipos.'),
make('worms','Platelmintos e nematódeos','Vermes achatados e cilíndricos','Esses grupos incluem espécies de vida livre e parasitas. Comparar a forma do corpo, a cavidade corporal e o tubo digestório ajuda a diferenciá-los.',[
{title:'Platelmintos',text:'Têm corpo achatado, simetria bilateral e são acelomados. Muitos possuem sistema digestório incompleto; cestódeos, como tênias, não possuem sistema digestório e absorvem nutrientes pela superfície corporal. Não têm sistemas circulatório e respiratório especializados.'},
{title:'Nematódeos',text:'Possuem corpo cilíndrico não segmentado, são pseudocelomados e têm tubo digestório completo, com boca e ânus. O corpo é revestido por cutícula que sofre mudas. Também não possuem sistemas circulatório e respiratório especializados.'},
{title:'Doenças parasitárias',text:'Esquistossomose envolve caramujo como hospedeiro intermediário e cercárias que penetram pela pele. Ascaridíase é transmitida pela ingestão de ovos em água ou alimentos contaminados. Ancilostomídeos podem penetrar pela pele e causar anemia.'},
{title:'Teníase e cisticercose',text:'Teníase decorre da tênia adulta no intestino após ingestão de carne com larvas. Cisticercose ocorre quando ovos de Taenia solium são ingeridos e larvas se desenvolvem em tecidos. São condições diferentes.'}
],'Nematódeos possuem tubo digestório completo. Teníase e cisticercose têm formas de transmissão diferentes.','Ascaris lumbricoides é transmitido pela ingestão de ovos presentes em água ou alimentos contaminados.'),
make('annelida','Anelídeos','Corpo dividido em segmentos','Anelídeos apresentam corpo alongado dividido em metâmeros. A segmentação permite maior controle dos movimentos.',[
{title:'Características gerais',text:'São triblásticos, celomados e de simetria bilateral. O celoma pode funcionar como esqueleto hidrostático. Possuem sistema circulatório fechado, no qual o sangue permanece em vasos.'},
{title:'Grupos tradicionais',text:'Oligoquetas incluem minhocas, com poucas cerdas por segmento. Poliquetas são predominantemente marinhos e possuem muitas cerdas associadas a parapódios. Hirudíneos incluem sanguessugas, geralmente sem cerdas.'},
{title:'Respiração e importância',text:'As trocas gasosas ocorrem pela superfície corporal úmida ou por brânquias, dependendo do grupo. Metanefrídios atuam na excreção. Minhocas escavam galerias, aeram o solo e participam da decomposição.'}
],'Anelídeos são celomados, segmentados e possuem circulação fechada. Minhocas são oligoquetas.','A atividade das minhocas melhora a estrutura e a aeração do solo.'),
make('mollusca','Moluscos','Corpo mole e grande diversidade','Moluscos são animais de corpo mole e não segmentado. Muitos possuem concha calcária produzida pelo manto.',[
{title:'Plano corporal',text:'O pé muscular atua na locomoção ou é modificado em braços nos cefalópodes. A massa visceral abriga órgãos internos. O manto recobre a massa visceral e pode secretar a concha. A cavidade do manto participa das trocas gasosas.'},
{title:'Gastrópodes e bivalves',text:'Gastrópodes incluem caracóis, caramujos e lesmas. Bivalves, como ostras e mexilhões, possuem duas valvas e geralmente são filtradores. Bivalves não possuem rádula.'},
{title:'Cefalópodes',text:'Polvos, lulas e sépias têm cabeça desenvolvida, olhos complexos e sistema nervoso elaborado. O pé é modificado em braços e sifão. A água expelida pelo sifão promove propulsão a jato; possuem circulação fechada.'}
],'Bivalves não possuem rádula. Cefalópodes têm circulação fechada e pé modificado em braços e sifão.','Polvo é cefalópode; mexilhão é bivalve; caracol é gastrópode.'),
make('arthropoda','Artrópodes','Apêndices articulados e exoesqueleto','Artrópodes constituem o grupo animal mais diverso. Possuem corpo segmentado, apêndices articulados e exoesqueleto rico em quitina.',[
{title:'Exoesqueleto e ecdise',text:'O exoesqueleto protege, sustenta e reduz a perda de água. Como não cresce continuamente, precisa ser substituído periodicamente por meio da ecdise (muda). O novo exoesqueleto inicialmente é flexível.'},
{title:'Insetos e aracnídeos',text:'Insetos geralmente têm cabeça, tórax e abdome, três pares de pernas, um par de antenas e respiração traqueal. Aracnídeos, como aranhas e escorpiões, geralmente têm cefalotórax e abdome, quatro pares de pernas e não possuem antenas.'},
{title:'Crustáceos e miriápodes',text:'Crustáceos, como camarões e caranguejos, geralmente têm dois pares de antenas e respiram por brânquias. Quilópodes (centopeias) têm um par de pernas por segmento do tronco; diplópodes geralmente apresentam dois pares por diplosegmento.'},
{title:'Circulação e desenvolvimento',text:'A circulação é geralmente aberta, com hemolinfa banhando órgãos. Insetos podem apresentar desenvolvimento ametábolo, hemimetábolo ou holometábolo. Borboletas têm metamorfose completa: ovo, larva, pupa e adulto.'}
],'Insetos: 6 pernas e 1 par de antenas. Aracnídeos: 8 pernas e sem antenas. Crustáceos: 2 pares de antenas.','Borboletas passam por ovo, larva, pupa e adulto.'),
make('echinodermata','Equinodermos','Animais exclusivamente marinhos','Equinodermos incluem estrelas-do-mar, ouriços, pepinos-do-mar e lírios-do-mar. São exclusivamente marinhos e possuem endoesqueleto calcário.',[
{title:'Simetria e desenvolvimento',text:'Larvas apresentam simetria bilateral, enquanto adultos geralmente exibem simetria radial pentâmera. São deuterostômios, assim como os cordados: o blastóporo origina o ânus durante o desenvolvimento.'},
{title:'Sistema ambulacrário',text:'É um sistema hidráulico formado por canais preenchidos por água do mar e pés ambulacrais. Atua na locomoção, fixação, captura de alimento e trocas gasosas.'},
{title:'Alimentação e reprodução',text:'Estrelas-do-mar podem everter o estômago sobre a presa. Ouriços apresentam lanterna de Aristóteles. A reprodução é geralmente sexuada, com fecundação externa e desenvolvimento indireto.'}
],'Equinodermos são exclusivamente marinhos, deuterostômios e possuem sistema ambulacrário.','Estrelas-do-mar usam pés ambulacrais para locomoção e fixação.'),
make('chordata','Cordados e vertebrados','Características embrionárias e diversidade','Cordados apresentam, em alguma fase do desenvolvimento, notocorda, tubo nervoso dorsal oco, fendas faringianas e cauda pós-anal.',[
{title:'Características dos cordados',text:'A notocorda é um eixo de sustentação embrionário, substituído total ou parcialmente pela coluna vertebral nos vertebrados. O tubo nervoso dorsal origina o sistema nervoso central. Fendas faringianas podem atuar na alimentação ou respiração.'},
{title:'Peixes e anfíbios',text:'Peixes respiram principalmente por brânquias e apresentam circulação simples. Anfíbios geralmente dependem de ambientes úmidos; a pele fina e vascularizada participa da respiração. Muitos têm fase larval aquática e adulto com pulmões e respiração cutânea.'},
{title:'Répteis, aves e mamíferos',text:'Répteis têm pele queratinizada, respiração pulmonar e ovo amniótico. Aves possuem penas, sacos aéreos, circulação dupla completa e são endotérmicas. Mamíferos possuem pelos e glândulas mamárias; monotremados põem ovos, marsupiais têm desenvolvimento inicial associado ao marsúpio e placentários possuem placenta desenvolvida.'},
{title:'Comparação da circulação',text:'Peixes apresentam circulação simples. Anfíbios e a maioria dos répteis têm circulação dupla incompleta. Aves, mamíferos e crocodilianos apresentam coração com quatro cavidades e circulação dupla completa.'}
],'Anfíbios dependem mais da água; répteis, aves e mamíferos são amniotas. Aves pertencem à linhagem evolutiva dos dinossauros terópodes.','Aves e mamíferos apresentam coração com quatro cavidades e circulação dupla completa.')
]}}
function Diagram({kind,id}:{kind:'evolucao'|'ecologia';id:string}) {
 const evolution = {
  variation: <g>
   <text x="34" y="38" fill="#42536a" fontSize="15" fontWeight="700">A diversidade já existe na população</text>
   <rect x="34" y="62" width="238" height="112" rx="17" fill="#e8edf6"/>
   {Array.from({length:12},(_,i)=><g key={i}><circle cx={61+(i%6)*36} cy={91+Math.floor(i/6)*48} r="12" fill={['#4c8cb4','#da8b69','#799a70','#8f78aa'][i%4]}/><circle cx={61+(i%6)*36} cy={91+Math.floor(i/6)*48} r="4" fill="#ffffff" opacity=".65"/></g>)}
   <path d="M284 118H335" stroke="#73839a" strokeWidth="3" strokeLinecap="round"/><path d="M326 108L337 118L326 128" fill="none" stroke="#73839a" strokeWidth="3" strokeLinecap="round"/>
   <rect x="350" y="62" width="296" height="112" rx="17" fill="#f4e9df"/>
   <path d="M390 83C460 123 460 123 530 83M390 154C460 114 460 114 530 154" fill="none" stroke="#4c8cb4" strokeWidth="5" strokeLinecap="round"/>
   {Array.from({length:6},(_,i)=><path key={i} d={'M'+(405+i*22)+' '+(92+i*9)+'L'+(405+i*22)+' '+(145-i*9)} stroke={i===3?'#d66c50':'#d6a15b'} strokeWidth={i===3?5:3} strokeLinecap="round"/>)}
   <circle cx="471" cy="118" r="24" fill="none" stroke="#d66c50" strokeWidth="2.5" strokeDasharray="4 4"/>
   <text x="153" y="204" textAnchor="middle" fill="#526178" fontSize="12" fontWeight="700">Fenótipos variados</text><text x="498" y="204" textAnchor="middle" fill="#815e4e" fontSize="12" fontWeight="700">DNA: novas combinações</text>
   <rect x="34" y="232" width="612" height="54" rx="13" fill="#fff" stroke="#e6e4de"/>
   <circle cx="58" cy="259" r="7" fill="#4c8cb4"/><text x="74" y="263" fill="#5c6674" fontSize="11">Alelos herdados</text><circle cx="215" cy="259" r="7" fill="#d66c50"/><text x="231" y="263" fill="#5c6674" fontSize="11">Mutação</text><circle cx="335" cy="259" r="7" fill="#799a70"/><text x="351" y="263" fill="#5c6674" fontSize="11">Recombinação</text><text x="630" y="263" textAnchor="end" fill="#7d8793" fontSize="10">Diversidade hereditária</text>
  </g>,
  selection: <g>
   <text x="34" y="38" fill="#42533f" fontSize="15" fontWeight="700">A seleção depende do ambiente</text>
   <rect x="34" y="59" width="190" height="225" rx="16" fill="#f3ecdf"/><text x="129" y="83" fill="#6d6555" fontSize="12" textAnchor="middle" fontWeight="700">VARIAÇÃO INICIAL</text>
   <rect x="103" y="101" width="52" height="117" rx="12" fill="#8e7456"/>
   {Array.from({length:7},(_,i)=><path key={i} d={'M'+(111+(i%2)*15)+' '+(111+i*14)+'l10 7'} stroke="#b79c78" strokeWidth="2" opacity=".7"/>)}
   {[[70,120,'#d9c7a8'],[179,145,'#d9c7a8'],[71,190,'#4e4b45'],[181,215,'#4e4b45']].map((v,i)=><g key={i}><ellipse cx={v[0] as number} cy={v[1] as number} rx="15" ry="8" fill={v[2] as string}/><ellipse cx={v[0] as number} cy={v[1] as number} rx="3" ry="8" fill="#332f2b"/></g>)}
   <text x="129" y="253" fill="#655d51" fontSize="11" textAnchor="middle">Claras e escuras</text>
   <path d="M239 170H282" stroke="#7e8e7a" strokeWidth="3" strokeLinecap="round"/><path d="M273 161L284 170L273 179" fill="none" stroke="#7e8e7a" strokeWidth="3"/>
   <rect x="296" y="59" width="160" height="225" rx="16" fill="#e7eee4"/><text x="376" y="83" fill="#527057" fontSize="12" textAnchor="middle" fontWeight="700">PRESSÃO AMBIENTAL</text>
   <rect x="350" y="101" width="52" height="117" rx="12" fill="#4e4b45"/>
   {Array.from({length:7},(_,i)=><path key={i} d={'M'+(358+(i%2)*15)+' '+(111+i*14)+'l10 7'} stroke="#77736b" strokeWidth="2" opacity=".7"/>)}
   <ellipse cx="326" cy="137" rx="13" ry="7" fill="#d9c7a8"/><ellipse cx="326" cy="137" rx="3" ry="7" fill="#332f2b"/><ellipse cx="427" cy="182" rx="13" ry="7" fill="#45423e"/><ellipse cx="427" cy="182" rx="3" ry="7" fill="#201f1d"/>
   <text x="376" y="253" fill="#527057" fontSize="11" textAnchor="middle">Camuflagem importa</text>
   <path d="M470 170H511" stroke="#7e8e7a" strokeWidth="3" strokeLinecap="round"/><path d="M502 161L513 170L502 179" fill="none" stroke="#7e8e7a" strokeWidth="3"/>
   <rect x="525" y="59" width="121" height="225" rx="16" fill="#e8edf4"/><text x="585" y="83" fill="#536a83" fontSize="12" textAnchor="middle" fontWeight="700">GERAÇÕES</text>
   {Array.from({length:8},(_,i)=><circle key={i} cx={555+(i%4)*20} cy={119+Math.floor(i/4)*49} r="7" fill={i<2?'#d9c7a8':'#45423e'}/>)}
   <text x="585" y="226" fill="#536a83" fontSize="11" textAnchor="middle">Frequência</text><text x="585" y="241" fill="#536a83" fontSize="11" textAnchor="middle">muda</text>
  </g>,
  mechanisms: <g>
   <text x="34" y="38" fill="#42536a" fontSize="15" fontWeight="700">Quatro processos, efeitos diferentes</text>
   {[
    {x:34,y:59,bg:'#e8edf5',title:'Deriva genética',sub:'Sorteio ao acaso',colors:['#4c8cb4','#d58c6b','#799a70','#8f78aa','#4c8cb4','#d58c6b']},
    {x:349,y:59,bg:'#f4eadf',title:'Efeito fundador',sub:'Poucos colonizam',colors:['#d58c6b','#d58c6b','#d58c6b']},
    {x:34,y:183,bg:'#e7efe5',title:'Fluxo gênico',sub:'Migração entre grupos',colors:['#4c8cb4','#4c8cb4','#799a70','#d58c6b']},
    {x:349,y:183,bg:'#f0eaf3',title:'Seleção sexual',sub:'Sucesso de acasalamento',colors:['#8f78aa','#8f78aa','#8f78aa']}
   ].map((card,i)=><g key={card.title}><rect x={card.x} y={card.y} width="297" height="108" rx="15" fill={card.bg}/><text x={card.x+15} y={card.y+24} fill="#455365" fontSize="12" fontWeight="700">{card.title}</text><text x={card.x+15} y={card.y+42} fill="#748091" fontSize="10">{card.sub}</text>
    {card.colors.map((c,j)=><circle key={j} cx={card.x+25+(j%6)*21} cy={card.y+72+Math.floor(j/6)*17} r="7" fill={c}/>)}
    {i===0&&<g><path d={'M'+(card.x+158)+' '+(card.y+70)+'h45'} stroke="#8593a2" strokeWidth="2"/><path d={'M'+(card.x+197)+' '+(card.y+64)+'l8 6l-8 6'} fill="none" stroke="#8593a2" strokeWidth="2"/><circle cx={card.x+226} cy={card.y+69} r="7" fill="#d58c6b"/><circle cx={card.x+247} cy={card.y+69} r="7" fill="#d58c6b"/></g>}
    {i===1&&<g><path d={'M'+(card.x+116)+' '+(card.y+65)+'h30m-7 -7l7 7l-7 7'} fill="none" stroke="#9a806d" strokeWidth="2"/><path d={'M'+(card.x+151)+' '+(card.y+65)+'h30'} stroke="#9a806d" strokeWidth="2"/></g>}
    {i===2&&<g><path d={'M'+(card.x+126)+' '+(card.y+77)+'C'+(card.x+160)+' '+(card.y+48)+' '+(card.x+181)+' '+(card.y+48)+' '+(card.x+210)+' '+(card.y+77)} fill="none" stroke="#6f9477" strokeWidth="2.5"/><path d={'M'+(card.x+201)+' '+(card.y+68)+'l10 9l-13 1'} fill="none" stroke="#6f9477" strokeWidth="2.5"/></g>}
    {i===3&&<g><path d={'M'+(card.x+146)+' '+(card.y+77)+'q25 -48 50 0q-25 -16 -50 0'} fill="#a78bb2"/><path d={'M'+(card.x+171)+' '+(card.y+74)+'v-28'} stroke="#7d6688" strokeWidth="2"/></g>}
   </g>)}
   <text x="340" y="317" textAnchor="middle" fill="#738092" fontSize="11">Nem toda mudança de frequência alélica é causada pela seleção natural.</text>
  </g>,
  speciation: <g>
   <text x="34" y="38" fill="#42536a" fontSize="15" fontWeight="700">O isolamento reduz o fluxo gênico</text>
   <rect x="34" y="58" width="612" height="225" rx="18" fill="#e9f0ed"/><path d="M34 180C140 160 180 200 272 180S420 160 646 182V283H34Z" fill="#9dc5d2"/>
   <path d="M274 58L322 108L350 82L388 135L421 58Z" fill="#b2a493"/><path d="M274 58L322 108L350 82L388 135L421 58" fill="none" stroke="#8f806f" strokeWidth="3"/>
   {Array.from({length:5},(_,i)=><g key={i}><ellipse cx={104+i*32} cy={130+(i%2)*14} rx="11" ry="8" fill="#6d9a7b"/><circle cx={115+i*32} cy={126+(i%2)*14} r="4" fill="#6d9a7b"/><ellipse cx={510+i*22} cy={130+(i%2)*14} rx="11" ry="8" fill="#bc8466"/><circle cx={520+i*22} cy={126+(i%2)*14} r="4" fill="#bc8466"/></g>)}
   <path d="M185 112C230 85 260 90 292 105M396 105C432 85 463 87 490 108" fill="none" stroke="#789487" strokeWidth="2.5" strokeDasharray="6 5"/>
   <text x="168" y="249" textAnchor="middle" fill="#4e715b" fontSize="12" fontWeight="700">População A</text><text x="510" y="249" textAnchor="middle" fill="#95664f" fontSize="12" fontWeight="700">População B</text>
   <text x="340" y="268" textAnchor="middle" fill="#4b6874" fontSize="10">Barreira geográfica · divergência · isolamento reprodutivo</text>
  </g>,
  evidence: <g>
   <text x="34" y="38" fill="#42536a" fontSize="15" fontWeight="700">Estruturas diferentes podem revelar uma origem comum</text>
   <rect x="34" y="58" width="390" height="225" rx="16" fill="#f0e9df"/><text x="229" y="82" textAnchor="middle" fill="#7b6857" fontSize="12" fontWeight="700">MEMBROS ANTERIORES HOMÓLOGOS</text>
   {['Humano','Morcego','Baleia'].map((name,i)=><g key={name} transform={'translate('+(93+i*126)+',112)'}><path d="M0 0L18 22L31 53L48 73" stroke="#c58a5a" strokeWidth="9" strokeLinecap="round" fill="none"/><path d="M18 22L-1 48L-11 81M31 53L54 45L68 61" stroke="#dfad7b" strokeWidth="6" strokeLinecap="round" fill="none"/><path d="M48 73L66 94L80 99" stroke="#a97854" strokeWidth="5" strokeLinecap="round" fill="none"/><text x="30" y="127" textAnchor="middle" fill="#6b5b4d" fontSize="10">{name}</text></g>)}
   <rect x="442" y="58" width="204" height="225" rx="16" fill="#e7edf3"/><text x="544" y="82" textAnchor="middle" fill="#58728b" fontSize="12" fontWeight="700">PARENTESCO</text>
   <path d="M545 108V145M545 145L495 182M545 145L595 182M495 182V214M595 182V214" stroke="#6b91ad" strokeWidth="3" fill="none" strokeLinecap="round"/><circle cx="545" cy="108" r="7" fill="#6b91ad"/><circle cx="495" cy="214" r="7" fill="#d58c6b"/><circle cx="595" cy="214" r="7" fill="#799a70"/>
   <text x="544" y="246" textAnchor="middle" fill="#58728b" fontSize="10">Ancestralidade comum</text><text x="340" y="317" textAnchor="middle" fill="#738092" fontSize="11">Homologia indica origem evolutiva compartilhada; analogia indica função semelhante.</text>
  </g>
 };
 const ecology = {
  organization: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">Níveis de organização ecológica</text>
   {[
    {x:40,w:112,c:'#dce9d6',label:'Organismo',sub:'um indivíduo'},
    {x:160,w:112,c:'#c8dfca',label:'População',sub:'mesma espécie'},
    {x:280,w:112,c:'#b5d6d0',label:'Comunidade',sub:'várias espécies'},
    {x:400,w:112,c:'#a8cbd4',label:'Ecossistema',sub:'seres + ambiente'},
    {x:520,w:112,c:'#d9d2e5',label:'Biosfera',sub:'vida na Terra'}
   ].map((v,i)=><g key={v.label}><rect x={v.x} y="93" width={v.w} height="113" rx="15" fill={v.c}/>{i===0?<g><circle cx={v.x+56} cy="130" r="18" fill="#8cae79"/><path d={'M'+(v.x+56)+' 148v27m-12 -12l12 -9l12 9'} stroke="#527c59" strokeWidth="4" fill="none" strokeLinecap="round"/></g>:i===1?<g>{[0,1,2,3].map(j=><circle key={j} cx={v.x+33+(j%2)*42} cy={128+Math.floor(j/2)*25} r="8" fill="#6b9a70"/>)}</g>:i===2?<g>{['#729e76','#d49b65','#7d9fb0','#a17da6'].map((c,j)=><circle key={j} cx={v.x+35+(j%2)*42} cy={127+Math.floor(j/2)*25} r="8" fill={c}/>)}</g>:i===3?<g><path d={'M'+(v.x+21)+' 158q15 -36 30 0q15 -32 40 0'} fill="none" stroke="#548a68" strokeWidth="5"/><path d={'M'+(v.x+20)+' 169h72'} stroke="#6997ab" strokeWidth="7" strokeLinecap="round"/></g>:<g><circle cx={v.x+56} cy="143" r="28" fill="#93b5c2"/><path d={'M'+(v.x+30)+' 143q20 -25 39 -5q10 11 15 1'} fill="none" stroke="#68956c" strokeWidth="8" strokeLinecap="round"/></g>}<text x={v.x+56} y="229" textAnchor="middle" fill="#415f52" fontSize="11" fontWeight="700">{v.label}</text><text x={v.x+56} y="246" textAnchor="middle" fill="#718278" fontSize="9">{v.sub}</text></g>)}
   <path d="M153 148h5m112 0h5m112 0h5m112 0h5" stroke="#718b7b" strokeWidth="2.5"/><rect x="91" y="270" width="498" height="25" rx="12" fill="#f0f3ec"/><text x="340" y="287" textAnchor="middle" fill="#65806f" fontSize="11">A comunidade + fatores abióticos formam um ecossistema.</text>
  </g>,
  foodweb: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">Teia alimentar: várias cadeias conectadas</text>
   <defs><marker id="foodArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6Z" fill="#718e79"/></marker></defs>
   <g fill="none" stroke="#718e79" strokeWidth="2.4" markerEnd="url(#foodArrow)"><path d="M115 224L205 185M115 224L204 260M246 180L335 131M246 180L335 228M246 255L335 228M378 128L478 91M378 228L478 170M378 228L478 91"/></g>
   <rect x="42" y="191" width="118" height="80" rx="15" fill="#dcebd8"/><path d="M78 226q15 -32 29 0q15 -32 29 0" fill="none" stroke="#548d61" strokeWidth="6" strokeLinecap="round"/><text x="101" y="252" textAnchor="middle" fill="#496e50" fontSize="11" fontWeight="700">Plantas</text><text x="101" y="265" textAnchor="middle" fill="#68836b" fontSize="9">produtores</text>
   <rect x="185" y="142" width="120" height="77" rx="15" fill="#f3e8d1"/><circle cx="224" cy="174" r="10" fill="#c9954f"/><circle cx="244" cy="174" r="10" fill="#c9954f"/><path d="M217 184l-9 8m42 -8l9 8" stroke="#8a714b" strokeWidth="3"/><text x="245" y="205" textAnchor="middle" fill="#83673f" fontSize="11" fontWeight="700">Insetos</text>
   <rect x="185" y="232" width="120" height="64" rx="15" fill="#e8efe1"/><ellipse cx="244" cy="256" rx="18" ry="10" fill="#88a476"/><circle cx="262" cy="251" r="7" fill="#88a476"/><text x="245" y="286" textAnchor="middle" fill="#55714e" fontSize="11" fontWeight="700">Roedores</text>
   <rect x="319" y="99" width="120" height="68" rx="15" fill="#e3edf2"/><ellipse cx="359" cy="126" rx="16" ry="10" fill="#78a1b2"/><circle cx="374" cy="120" r="7" fill="#78a1b2"/><text x="380" y="151" textAnchor="middle" fill="#557687" fontSize="11" fontWeight="700">Aves</text>
   <rect x="319" y="196" width="120" height="68" rx="15" fill="#e6e9dc"/><ellipse cx="358" cy="224" rx="17" ry="10" fill="#95a46d"/><circle cx="374" cy="218" r="7" fill="#95a46d"/><text x="380" y="251" textAnchor="middle" fill="#68764b" fontSize="11" fontWeight="700">Anfíbios</text>
   <rect x="466" y="62" width="116" height="68" rx="15" fill="#eee5ef"/><path d="M489 98q22 -25 44 0" fill="none" stroke="#9978a0" strokeWidth="4"/><text x="524" y="116" textAnchor="middle" fill="#795e82" fontSize="11" fontWeight="700">Predadores</text>
   <rect x="466" y="145" width="116" height="68" rx="15" fill="#f1e6dc"/><path d="M493 180q18 -20 40 0" fill="none" stroke="#bd896a" strokeWidth="4"/><text x="524" y="198" textAnchor="middle" fill="#8c654e" fontSize="11" fontWeight="700">Serpentes</text>
   <rect x="466" y="227" width="148" height="65" rx="15" fill="#e8e4d9"/><circle cx="500" cy="252" r="8" fill="#9f896d"/><circle cx="519" cy="252" r="8" fill="#79916b"/><text x="540" y="276" textAnchor="middle" fill="#776b59" fontSize="10" fontWeight="700">Decompositores</text>
   <text x="340" y="325" textAnchor="middle" fill="#738276" fontSize="10">As setas apontam do alimento para quem o consome.</text>
  </g>,
  energy: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">A energia diminui a cada transferência</text>
   <circle cx="105" cy="112" r="34" fill="#f0c66f"/><g stroke="#e4b452" strokeWidth="4" strokeLinecap="round">{Array.from({length:8},(_,i)=><path key={i} d={'M'+(105+Math.cos(i*Math.PI/4)*45)+' '+(112+Math.sin(i*Math.PI/4)*45)+'L'+(105+Math.cos(i*Math.PI/4)*58)+' '+(112+Math.sin(i*Math.PI/4)*58)}/>)}</g>
   <path d="M151 112H202" stroke="#d4a957" strokeWidth="3"/><path d="M194 104L204 112L194 120" fill="none" stroke="#d4a957" strokeWidth="3"/>
   <path d="M258 77L420 77L394 137L284 137Z" fill="#73a66f"/><path d="M284 144L394 144L370 201L308 201Z" fill="#83a3b5"/><path d="M308 208L370 208L352 258L326 258Z" fill="#bd8a6c"/>
   <text x="339" y="112" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">Produtores</text><text x="339" y="129" textAnchor="middle" fill="#f4fff1" fontSize="11">10.000 kJ</text><text x="339" y="170" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">Consumidores primários</text><text x="339" y="188" textAnchor="middle" fill="#fff" fontSize="11">1.000 kJ</text><text x="339" y="230" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="700">Secundários</text><text x="339" y="246" textAnchor="middle" fill="#fff" fontSize="10">100 kJ</text>
   <path d="M445 105q55 0 55 -30M445 171q55 0 55 -26M420 235q80 0 80 -26" fill="none" stroke="#d28b68" strokeWidth="2.5" strokeDasharray="5 5"/><text x="520" y="77" textAnchor="middle" fill="#a86f55" fontSize="11" fontWeight="700">Calor</text><text x="520" y="94" textAnchor="middle" fill="#927e70" fontSize="10">dissipado</text>
   <rect x="35" y="278" width="610" height="33" rx="12" fill="#edf1e9"/><text x="340" y="299" textAnchor="middle" fill="#5f7764" fontSize="11">A pirâmide de energia é sempre direta — nunca fica invertida.</text>
  </g>,
  cycles: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">A matéria circula entre ambiente e organismos</text>
   {[
    {x:34,y:58,title:'ÁGUA',bg:'#e4eff3',accent:'#5e9db7',name:'Evaporação · chuva'},
    {x:349,y:58,title:'CARBONO',bg:'#eee9df',accent:'#9b805e',name:'Fotossíntese · respiração'},
    {x:34,y:190,title:'NITROGÊNIO',bg:'#e7efe4',accent:'#71956c',name:'Fixação · nitrificação'},
    {x:349,y:190,title:'FÓSFORO',bg:'#f1e9df',accent:'#b58b5e',name:'Rochas · fosfatos'}
   ].map((v,i)=><g key={v.title}><rect x={v.x} y={v.y} width="297" height="112" rx="16" fill={v.bg}/><text x={v.x+17} y={v.y+24} fill={v.accent} fontSize="12" fontWeight="800">{v.title}</text>
    {i===0?<g><path d={'M'+(v.x+45)+' '+(v.y+72)+'q-9 -15 7 -22q6 -17 24 -8q16 -8 24 7q17 2 12 20z'} fill="#fff" stroke={v.accent} strokeWidth="2.5"/><path d={'M'+(v.x+60)+' '+(v.y+78)+'l-5 9m20 -9l-5 9m20 -9l-5 9'} stroke={v.accent} strokeWidth="3" strokeLinecap="round"/><path d={'M'+(v.x+70)+' '+(v.y+45)+'q-9 12 0 18q9 -6 0 -18'} fill="#72b7d2"/></g>
    :i===1?<g><path d={'M'+(v.x+70)+' '+(v.y+87)+'v-28'} stroke="#8b6849" strokeWidth="5" strokeLinecap="round"/><path d={'M'+(v.x+70)+' '+(v.y+69)+'q-28 -3 -23 -23q20 -3 23 23q2 -29 25 -30q5 22 -25 30'} fill="#6f9b69" stroke="#4f8058" strokeWidth="2"/><circle cx={v.x+96} cy={v.y+49} r="9" fill="#fff" stroke={v.accent} strokeWidth="2"/><text x={v.x+96} y={v.y+53} textAnchor="middle" fontSize="8" fontWeight="700" fill={v.accent}>CO₂</text></g>
    :i===2?<g><path d={'M'+(v.x+45)+' '+(v.y+70)+'q10 -17 20 0t20 0t20 0'} fill="none" stroke="#8aa77c" strokeWidth="3"/>{[0,1,2].map(j=><g key={j}><ellipse cx={v.x+52+j*18} cy={v.y+61+(j%2)*12} rx="7" ry="4" fill={v.accent}/><path d={'M'+(v.x+49+j*18)+' '+(v.y+56+(j%2)*12)+'l-3 -5m10 5l3 -5'} stroke={v.accent} strokeWidth="1.5"/></g>)}<rect x={v.x+82} y={v.y+43} width="34" height="23" rx="8" fill="#fff" stroke={v.accent}/><text x={v.x+99} y={v.y+59} textAnchor="middle" fill={v.accent} fontSize="12" fontWeight="700">N₂</text></g>
    :<g><path d={'M'+(v.x+43)+' '+(v.y+82)+'l9 -31l20 -9l20 14l-5 30z'} fill="#b99b77" stroke="#8e7659" strokeWidth="2"/><path d={'M'+(v.x+52)+' '+(v.y+51)+'l12 13l-3 23m20 -31l-3 31'} fill="none" stroke="#8e7659" strokeWidth="2"/><circle cx={v.x+96} cy={v.y+54} r="6" fill="#d6ad69"/><circle cx={v.x+107} cy={v.y+67} r="5" fill="#d6ad69"/><circle cx={v.x+91} cy={v.y+75} r="4" fill="#d6ad69"/></g>}
    <text x={v.x+132} y={v.y+65} fill="#516457" fontSize="11" fontWeight="700">{v.name.split(' · ')[0]}</text><text x={v.x+132} y={v.y+82} fill="#718176" fontSize="10">{v.name.split(' · ')[1]}</text></g>)}
   <text x="340" y="330" textAnchor="middle" fill="#738276" fontSize="10">Fósforo: ciclo sedimentar, sem fase gasosa atmosférica importante.</text>
  </g>,
  interactions: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">Quem ganha, quem perde e quem não é afetado?</text>
   {[
    {x:34,y:59,title:'Mutualismo',sign:'+ / +',bg:'#e3efdf',a:'#6f9d6b',b:'#d9a65c',desc:'ambos se beneficiam'},
    {x:349,y:59,title:'Comensalismo',sign:'+ / 0',bg:'#e4edf2',a:'#6d9bb0',b:'#8b9b86',desc:'um se beneficia'},
    {x:34,y:185,title:'Competição',sign:'− / −',bg:'#f1e9dc',a:'#c38d63',b:'#9a7d61',desc:'disputa por recursos'},
    {x:349,y:185,title:'Parasitismo',sign:'+ / −',bg:'#eee6ee',a:'#9979a2',b:'#b88a79',desc:'parasita / hospedeiro'}
   ].map(v=><g key={v.title}><rect x={v.x} y={v.y} width="297" height="108" rx="15" fill={v.bg}/><circle cx={v.x+50} cy={v.y+54} r="17" fill={v.a}/><circle cx={v.x+94} cy={v.y+54} r="17" fill={v.b}/><path d={'M'+(v.x+68)+' '+(v.y+54)+'H'+(v.x+76)} stroke="#768276" strokeWidth="3"/><text x={v.x+128} y={v.y+36} fill="#4d6154" fontSize="12" fontWeight="700">{v.title}</text><text x={v.x+128} y={v.y+57} fill="#6c7b70" fontSize="11">{v.desc}</text><rect x={v.x+238} y={v.y+69} width="45" height="24" rx="12" fill="#fff" opacity=".8"/><text x={v.x+260} y={v.y+85} textAnchor="middle" fill="#536657" fontSize="11" fontWeight="700">{v.sign}</text></g>)}
   <text x="340" y="325" textAnchor="middle" fill="#738276" fontSize="10">Exemplos concretos ajudam a identificar a relação em questões contextualizadas.</text>
  </g>,
  populations: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">Crescimento populacional e limite ambiental</text>
   <path d="M77 70V276H628" fill="none" stroke="#87968a" strokeWidth="2"/><path d="M77 112H625" stroke="#d09b62" strokeWidth="2" strokeDasharray="7 6"/><text x="616" y="101" textAnchor="end" fill="#a7774a" fontSize="11" fontWeight="700">Capacidade de suporte (K)</text>
   <path d="M82 265C150 255 177 226 218 173S280 118 345 113S475 112 610 112" fill="none" stroke="#67976f" strokeWidth="5" strokeLinecap="round"/><path d="M82 265C160 245 220 210 274 165S390 95 610 67" fill="none" stroke="#8ba5b6" strokeWidth="3" strokeDasharray="7 6" strokeLinecap="round"/>
   <text x="455" y="151" fill="#5f8a68" fontSize="11" fontWeight="700">Crescimento logístico</text><text x="455" y="63" fill="#6c8ca0" fontSize="10">Exponencial (sem limites)</text><text x="70" y="64" textAnchor="end" fill="#778579" fontSize="10">Nº de</text><text x="70" y="76" textAnchor="end" fill="#778579" fontSize="10">indivíduos</text><text x="620" y="295" textAnchor="end" fill="#778579" fontSize="10">Tempo</text>
   <rect x="94" y="291" width="475" height="29" rx="12" fill="#edf1e9"/><text x="331" y="310" textAnchor="middle" fill="#5f7764" fontSize="11">Natalidade + imigração − mortalidade − emigração</text>
  </g>,
  impacts: <g>
   <text x="34" y="38" fill="#385d50" fontSize="15" fontWeight="700">Três impactos que alteram ecossistemas</text>
   <rect x="34" y="59" width="190" height="227" rx="16" fill="#e5eff0"/><text x="129" y="83" textAnchor="middle" fill="#527d88" fontSize="12" fontWeight="700">EUTROFIZAÇÃO</text><path d="M50 185Q129 163 208 185V249H50Z" fill="#6fa4a1"/><path d="M50 185Q129 163 208 185" fill="none" stroke="#477f7c" strokeWidth="4"/>
   {Array.from({length:13},(_,i)=><ellipse key={i} cx={58+(i%7)*22} cy={177+Math.floor(i/7)*10} rx="9" ry="4" fill="#86b26c"/>)}
   <text x="129" y="270" textAnchor="middle" fill="#527d88" fontSize="10">Excesso de nutrientes</text>
   <rect x="245" y="59" width="190" height="227" rx="16" fill="#f1e9dd"/><text x="340" y="83" textAnchor="middle" fill="#8b6d4d" fontSize="12" fontWeight="700">BIOMAGNIFICAÇÃO</text>
   {[{y:112,w:130,label:'Predador',c:'#bd8664'},{y:158,w:92,label:'Peixes',c:'#8ba5b2'},{y:204,w:52,label:'Plâncton',c:'#7ca16f'}].map(v=><g key={v.label}><rect x={340-v.w/2} y={v.y} width={v.w} height="30" rx="8" fill={v.c}/><text x="340" y={v.y+19} fill="#fff" fontSize="10" textAnchor="middle" fontWeight="700">{v.label}</text></g>)}
   <text x="340" y="268" textAnchor="middle" fill="#8b6d4d" fontSize="10">Concentração aumenta na cadeia</text>
   <rect x="456" y="59" width="190" height="227" rx="16" fill="#e8ecdf"/><text x="551" y="83" textAnchor="middle" fill="#617a59" fontSize="12" fontWeight="700">FRAGMENTAÇÃO</text><path d="M470 109Q505 92 531 119Q560 93 631 113V245H470Z" fill="#81a477"/><path d="M470 109Q505 92 531 119Q560 93 631 113" fill="none" stroke="#63875c" strokeWidth="5"/><path d="M541 98L564 254" stroke="#ddd2bd" strokeWidth="20"/><path d="M541 98L564 254" stroke="#9c927e" strokeWidth="2" strokeDasharray="8 5"/><text x="551" y="270" textAnchor="middle" fill="#617a59" fontSize="10">Habitat dividido</text>
  </g>
 };
 return <svg viewBox="0 0 680 350" role="img" aria-label={kind==='evolucao'?'Ilustração sobre '+id:'Ilustração ecológica sobre '+id} className="h-full w-full">
  <rect x="0" y="0" width="680" height="350" rx="22" fill={kind==='evolucao'?'#fbf8f2':'#f6f8f1'}/>
  {kind==='evolucao'?(evolution[id as keyof typeof evolution]||evolution.variation):(ecology[id as keyof typeof ecology]||ecology.organization)}
 </svg>
}
export function BiologyAtlas2D({kind}:{kind:'evolucao'|'ecologia'}) {
 const topic=data[kind];const [index,setIndex]=useState(0);const active=topic.items[index]
 const accent=kind==='evolucao'?'#a76f58':'#64866a'
 return <section className="mb-14" aria-label={topic.title}>
  <header className="mb-6 max-w-3xl"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em]" style={{color:accent}}>Atlas de biologia · material visual</p><h2 className="font-display text-3xl font-semibold tracking-tight text-[#29372e] sm:text-4xl">{topic.title}</h2><p className="mt-3 text-sm leading-7 text-[#657166]">{topic.intro}</p></header>
  <div className="overflow-hidden rounded-[24px] border border-[#deded5] bg-[#fbfaf6] shadow-[0_20px_55px_-42px_rgba(40,58,42,.4)]">
   <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,.92fr)]">
    <div className="border-b border-[#e3e2da] bg-[#f4f3ed] p-4 sm:p-6 lg:border-b-0 lg:border-r">
     <div className="mb-3 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7d897d]">Ilustração explicativa</span><span className="text-xs tabular-nums text-[#8b9388]">{String(index+1).padStart(2,'0')} / {String(topic.items.length).padStart(2,'0')}</span></div>
     <div className="flex min-h-[300px] items-center rounded-[18px] border border-[#e5e3da] bg-white p-2 sm:min-h-[350px] sm:p-3"><Diagram kind={kind} id={active.id}/></div>
     <p className="mt-3 text-[10px] leading-5 text-[#8a9187]">Esquema autoral para visualizar a relação entre as estruturas e os processos.</p>
    </div>
    <div className="flex flex-col p-5 sm:p-7">
     <p className="text-[10px] font-bold uppercase tracking-[.16em]" style={{color:accent}}>{active.subtitle}</p><h3 className="mt-2 font-display text-2xl font-semibold text-[#2b392f]">{active.name}</h3><p className="mt-3 text-sm leading-7 text-[#59675d]">{active.intro}</p>
     <div className="mt-5 space-y-5">{active.parts.map((part,i)=><article key={part.title} className="border-t border-[#e8e7df] pt-4"><div className="mb-2 flex items-center gap-2"><span className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{backgroundColor:accent}}>{i+1}</span><h4 className="text-sm font-semibold text-[#3d5144]">{part.title}</h4></div><p className="text-sm leading-7 text-[#5c685f]">{part.text}</p></article>)}</div>
     <div className="mt-6 border-l-[3px] border-[#b38b5f] bg-[#f4f0e7] px-4 py-3"><h4 className="mb-1 text-[10px] font-bold uppercase tracking-[.13em] text-[#806b4e]">Atenção para o ENEM</h4><p className="text-sm leading-6 text-[#566057]">{active.enem}</p></div>
     <div className="mt-4 border-l-[3px] border-[#7e9fac] bg-[#edf2f3] px-4 py-3"><h4 className="mb-1 text-[10px] font-bold uppercase tracking-[.13em] text-[#607c83]">Exemplo aplicado</h4><p className="text-sm leading-6 text-[#56635f]">{active.example}</p></div>
    </div>
   </div>
   <nav aria-label="Seções do conteúdo" className="border-t border-[#deded4] bg-[#f8f7f2] p-4 sm:p-5">
    <div className="mb-3 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#879084]">Explorar assunto</p><span className="text-[10px] text-[#879084]">{active.name}</span></div>
    <div className="flex flex-wrap gap-2">{topic.items.map((item,i)=><button key={item.id} type="button" onClick={()=>setIndex(i)} aria-pressed={i===index} className="rounded-lg border px-3 py-2 text-left text-xs transition-all" style={i===index?{backgroundColor:accent,borderColor:accent,color:'#fff',boxShadow:'0 4px 12px rgba(40,60,45,.12)'}:{backgroundColor:'#fff',borderColor:'#dedfd6',color:'#58665b'}}>{item.name}</button>)}</div>
    <div className="mt-4 flex items-center justify-between gap-3"><button type="button" onClick={()=>setIndex(Math.max(0,index-1))} disabled={index===0} className="rounded-lg border border-[#d1d0c6] bg-white px-4 py-2 text-xs text-[#58665b] disabled:opacity-35">Anterior</button><span className="text-[10px] tabular-nums text-[#778477]">{index+1} de {topic.items.length}</span><button type="button" onClick={()=>setIndex(Math.min(topic.items.length-1,index+1))} disabled={index===topic.items.length-1} className="rounded-lg border border-[#d1d0c6] bg-white px-4 py-2 text-xs text-[#58665b] disabled:opacity-35">Próximo</button></div>
   </nav>
  </div>
 </section>
}
