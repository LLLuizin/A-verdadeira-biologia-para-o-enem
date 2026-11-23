'use client'
import { useState } from 'react'

export type Organ = { id:string; name:string; x:number; y:number; shape:string; system:string; location:string; purpose:string; function:string }
export type System = { id:string; name:string; short:string; note:string; organs:Organ[] }

export const systems:System[] = [
{ id:'nervoso',name:'Sistema nervoso',short:'Nervoso',note:'Recebe informações, interpreta estímulos e coordena respostas. O sistema nervoso central integra os sinais; o periférico conecta o corpo a ele.',organs:[
{id:'cerebro',name:'Cérebro',x:50,y:12,shape:'brain',system:'Sistema nervoso',location:'Crânio, na região superior do encéfalo.',purpose:'Integra informações sensoriais e participa de memória, linguagem, pensamento e movimentos voluntários.',function:'Redes de neurônios comunicam-se por impulsos elétricos e sinapses químicas. Diferentes áreas trabalham em conjunto para interpretar estímulos e elaborar respostas.'},
{id:'cerebelo',name:'Cerebelo',x:59,y:17,shape:'brain',system:'Sistema nervoso',location:'Parte posterior do encéfalo, abaixo do cérebro.',purpose:'Ajusta equilíbrio, postura, precisão e aprendizagem dos movimentos.',function:'Compara informações sensoriais com os comandos motores e ajuda a corrigir a execução dos movimentos.'},
{id:'medula',name:'Medula espinal',x:51,y:31,shape:'bone',system:'Sistema nervoso',location:'Dentro do canal vertebral, protegida pela coluna.',purpose:'Conduz informações entre encéfalo e corpo e participa de reflexos.',function:'Feixes nervosos levam sinais em direção ao encéfalo e trazem comandos motores. Circuitos locais podem organizar respostas reflexas rápidas.'},
{id:'nervos',name:'Nervos periféricos',x:30,y:54,shape:'vessel',system:'Sistema nervoso',location:'Distribuídos por todo o corpo, fora do encéfalo e da medula.',purpose:'Conectam o sistema nervoso central aos órgãos, músculos e receptores.',function:'Fibras sensitivas levam informações ao SNC; fibras motoras conduzem comandos até músculos e glândulas.'}]},
{ id:'endocrino',name:'Sistema endócrino',short:'Endócrino',note:'Glândulas endócrinas lançam hormônios diretamente no sangue. Eles atuam em células que possuem receptores específicos e ajudam a manter a homeostase.',organs:[
{id:'hipofise',name:'Hipófise',x:51,y:17,shape:'gland',system:'Sistema endócrino',location:'Base do encéfalo, conectada ao hipotálamo.',purpose:'Coordena a atividade de várias glândulas e participa do crescimento, reprodução e equilíbrio hídrico.',function:'Libera hormônios como GH, TSH, ACTH, FSH e LH. A neuro-hipófise armazena e libera ADH e ocitocina produzidos no hipotálamo.'},
{id:'tireoide',name:'Tireoide',x:51,y:27,shape:'thyroid',system:'Sistema endócrino',location:'Parte anterior do pescoço, abaixo da laringe.',purpose:'Regula o metabolismo e participa do controle do cálcio no sangue.',function:'Produz T3 e T4, hormônios que influenciam o metabolismo. Suas células C produzem calcitonina.'},
{id:'suprarrenais',name:'Glândulas suprarrenais',x:43,y:48,shape:'gland',system:'Sistema endócrino',location:'Sobre cada rim.',purpose:'Participam da resposta ao estresse e do controle da pressão e dos sais.',function:'O córtex produz, entre outros, cortisol e aldosterona; a medula libera adrenalina e noradrenalina.'},
{id:'pancreas',name:'Pâncreas',x:57,y:51,shape:'pancreas',system:'Sistema endócrino e digestório',location:'Atrás do estômago, na parte superior do abdome.',purpose:'Ajuda a controlar a glicemia e também participa da digestão.',function:'As ilhotas pancreáticas liberam insulina e glucagon no sangue. A porção exócrina envia enzimas digestivas ao intestino por ductos.'},
{id:'ovarios-end',name:'Ovários',x:45,y:72,shape:'ovary',system:'Sistema endócrino e reprodutor',location:'Pelve, um de cada lado do útero.',purpose:'Produzem hormônios sexuais e ovócitos.',function:'Secretam principalmente estrogênios e progesterona, que participam do ciclo menstrual e da reprodução.'},
{id:'testiculos-end',name:'Testículos',x:55,y:80,shape:'testis',system:'Sistema endócrino e reprodutor',location:'Bolsa escrotal.',purpose:'Produzem testosterona e espermatozoides.',function:'Células de Leydig produzem testosterona; túbulos seminíferos são o local da espermatogênese.'}]},
{ id:'circulatorio',name:'Sistema cardiovascular',short:'Circulatório',note:'O coração mantém o sangue em movimento. Vasos distribuem oxigênio, nutrientes e hormônios e recolhem gás carbônico e resíduos.',organs:[
{id:'coracao',name:'Coração',x:53,y:37,shape:'heart',system:'Sistema cardiovascular',location:'Tórax, entre os pulmões, ligeiramente deslocado para a esquerda.',purpose:'Bombeia o sangue para os pulmões e para os demais tecidos.',function:'Contrações coordenadas dos átrios e ventrículos mantêm dois circuitos: pulmonar (pequena circulação) e sistêmico (grande circulação).'},
{id:'arterias',name:'Artérias',x:70,y:43,shape:'vessel',system:'Sistema cardiovascular',location:'Distribuem-se do coração em direção aos tecidos.',purpose:'Levam o sangue para fora do coração.',function:'Suas paredes musculares e elásticas suportam a pressão gerada pelos ventrículos. Artéria não significa necessariamente sangue rico em oxigênio.'},
{id:'veias',name:'Veias',x:28,y:43,shape:'vessel',system:'Sistema cardiovascular',location:'Retornam dos tecidos em direção ao coração.',purpose:'Devolvem o sangue ao coração.',function:'Possuem paredes relativamente mais finas; muitas apresentam válvulas que ajudam a impedir o refluxo.'},
{id:'capilares',name:'Capilares',x:50,y:57,shape:'vessel',system:'Sistema cardiovascular',location:'Rede microscópica entre arteríolas e vênulas nos tecidos.',purpose:'Permitem trocas entre o sangue e as células.',function:'A parede muito fina favorece a difusão de gases, nutrientes e resíduos entre o plasma e o líquido intersticial.'}]},
{ id:'respiratorio',name:'Sistema respiratório',short:'Respiratório',note:'Ventila os pulmões e realiza a hematose: o oxigênio passa para o sangue e o gás carbônico sai dele, principalmente nos alvéolos.',organs:[
{id:'nariz',name:'Cavidade nasal',x:50,y:20,shape:'nose',system:'Sistema respiratório',location:'Interior do nariz.',purpose:'Filtra, aquece e umidifica o ar inspirado.',function:'Muco e cílios retêm partículas; a vascularização da mucosa ajuda a aquecer o ar antes que ele alcance as vias inferiores.'},
{id:'traqueia',name:'Traqueia',x:50,y:31,shape:'trachea',system:'Sistema respiratório',location:'Pescoço e parte superior do tórax, à frente do esôfago.',purpose:'Conduz o ar até os brônquios.',function:'Anéis cartilaginosos mantêm a via aberta. O epitélio ciliado ajuda a remover partículas presas no muco.'},
{id:'pulmao',name:'Pulmões e alvéolos',x:42,y:42,shape:'lung',system:'Sistema respiratório',location:'Cavidade torácica, um de cada lado do coração.',purpose:'Realizam as trocas gasosas entre o ar e o sangue.',function:'Nos alvéolos, O₂ difunde para os capilares e CO₂ difunde para o ar alveolar, seguindo diferenças de pressão parcial.'},
{id:'diafragma',name:'Diafragma',x:50,y:54,shape:'muscle',system:'Sistema respiratório',location:'Abaixo dos pulmões, separando tórax e abdome.',purpose:'É o principal músculo da inspiração.',function:'Ao contrair, desce e aumenta o volume torácico, reduzindo a pressão interna e favorecendo a entrada de ar.'}]},
{ id:'digestorio',name:'Sistema digestório',short:'Digestório',note:'Transforma os alimentos em moléculas absorvíveis. A maior parte da absorção de nutrientes acontece no intestino delgado.',organs:[
{id:'boca',name:'Boca e glândulas salivares',x:50,y:20,shape:'gland',system:'Sistema digestório',location:'Cavidade oral e região ao redor da mandíbula.',purpose:'Inicia a digestão e prepara o alimento para a deglutição.',function:'A mastigação fragmenta o alimento; a saliva lubrifica e contém amilase salivar, que inicia a digestão do amido.'},
{id:'figado',name:'Fígado',x:39,y:43,shape:'liver',system:'Sistema digestório',location:'Parte superior direita do abdome, abaixo do diafragma.',purpose:'Produz bile e realiza funções metabólicas essenciais.',function:'A bile emulsifica gorduras no intestino. O fígado também processa nutrientes, armazena glicogênio e participa da desintoxicação e produção de proteínas plasmáticas.'},
{id:'estomago',name:'Estômago',x:59,y:46,shape:'stomach',system:'Sistema digestório',location:'Parte superior do abdome, mais à esquerda.',purpose:'Armazena e mistura o alimento, iniciando principalmente a digestão de proteínas.',function:'Movimentos musculares misturam o alimento ao suco gástrico. O ácido clorídrico cria pH ácido e a pepsina quebra proteínas.'},
{id:'pancreas-dig',name:'Pâncreas',x:51,y:53,shape:'pancreas',system:'Sistema digestório e endócrino',location:'Atrás do estômago.',purpose:'Libera enzimas e bicarbonato no intestino delgado.',function:'O suco pancreático contém enzimas que digerem carboidratos, proteínas e lipídios; o bicarbonato neutraliza a acidez que vem do estômago.'},
{id:'intestino',name:'Intestino delgado',x:51,y:63,shape:'intestine',system:'Sistema digestório',location:'Região central do abdome.',purpose:'Completa a digestão e absorve a maior parte dos nutrientes.',function:'Vilosidades e microvilosidades ampliam a superfície de contato. Nutrientes atravessam o epitélio e seguem para o sangue ou para a linfa.'},
{id:'intestino-grosso',name:'Intestino grosso',x:51,y:70,shape:'intestine',system:'Sistema digestório',location:'Contorna parte do intestino delgado.',purpose:'Absorve água e sais e participa da formação das fezes.',function:'A microbiota intestinal fermenta parte dos resíduos e participa da produção de algumas vitaminas.'}]},
{ id:'urinario',name:'Sistema urinário',short:'Urinário',note:'Os rins filtram o plasma e ajustam a quantidade de água, sais e resíduos eliminados. Também ajudam a controlar a pressão arterial e o pH.',organs:[
{id:'rins',name:'Rins',x:37,y:51,shape:'kidney',system:'Sistema urinário',location:'Parte posterior do abdome, um de cada lado da coluna.',purpose:'Filtram o sangue e produzem a urina.',function:'Nos néfrons ocorrem filtração glomerular, reabsorção e secreção tubular. O resultado é a urina, com resíduos e excesso de água e sais.'},
{id:'ureteres',name:'Ureteres',x:55,y:64,shape:'vessel',system:'Sistema urinário',location:'Tubos que ligam cada rim à bexiga.',purpose:'Conduzem a urina até a bexiga.',function:'Ondas de contração da musculatura lisa (peristaltismo) deslocam a urina em direção à bexiga.'},
{id:'bexiga',name:'Bexiga urinária',x:50,y:75,shape:'bladder',system:'Sistema urinário',location:'Pelve, atrás da sínfise púbica.',purpose:'Armazena temporariamente a urina.',function:'Sua parede muscular distende durante o enchimento e contrai durante a micção, coordenada por reflexos nervosos.'}]},
{ id:'imunologico',name:'Sistema imunológico',short:'Imunológico',note:'Combina barreiras, células e moléculas de defesa. A imunidade adaptativa cria memória, base do funcionamento das vacinas.',organs:[
{id:'medula-ossea',name:'Medula óssea',x:51,y:58,shape:'bone',system:'Sistema imunológico e esquelético',location:'Interior de alguns ossos, como pelve, esterno e vértebras.',purpose:'Produz células do sangue, incluindo células de defesa.',function:'Células-tronco hematopoiéticas originam hemácias, plaquetas e diferentes leucócitos. Linfócitos B amadurecem na medula óssea.'},
{id:'timo',name:'Timo',x:51,y:34,shape:'thymus',system:'Sistema imunológico',location:'Tórax, atrás do esterno e acima do coração.',purpose:'Promove a maturação dos linfócitos T.',function:'Linfócitos T passam por seleção e maturação no timo, processo essencial para reconhecer ameaças sem atacar o próprio organismo.'},
{id:'baco',name:'Baço',x:65,y:48,shape:'spleen',system:'Sistema imunológico e linfático',location:'Parte superior esquerda do abdome, próximo ao estômago.',purpose:'Filtra o sangue e participa da resposta imune.',function:'Remove células sanguíneas envelhecidas e permite o encontro de antígenos com células de defesa.'},
{id:'linfonodos',name:'Linfonodos',x:32,y:40,shape:'gland',system:'Sistema imunológico e linfático',location:'Ao longo dos vasos linfáticos, com agrupamentos no pescoço, axilas e virilhas.',purpose:'Filtram a linfa e organizam respostas imunes.',function:'Concentram linfócitos e células apresentadoras de antígenos, facilitando o reconhecimento de agentes estranhos.'}]},
{ id:'linfatico',name:'Sistema linfático',short:'Linfático',note:'Recolhe parte do líquido que sai dos capilares, devolve-o ao sangue e transporta lipídios absorvidos no intestino.',organs:[
{id:'linfa',name:'Vasos linfáticos',x:31,y:54,shape:'vessel',system:'Sistema linfático',location:'Rede distribuída por quase todo o corpo.',purpose:'Transportam a linfa dos tecidos de volta à circulação sanguínea.',function:'Válvulas e movimentos musculares ajudam o fluxo em sentido único, sem uma bomba central como o coração.'},
{id:'linfonodos-l',name:'Linfonodos',x:51,y:42,shape:'gland',system:'Sistema linfático e imunológico',location:'Pescoço, axilas, tórax, abdome e virilhas.',purpose:'Filtram a linfa e abrigam células de defesa.',function:'A linfa atravessa os linfonodos, onde partículas podem ser retidas e células imunes ativadas.'},
{id:'baco-l',name:'Baço',x:66,y:49,shape:'spleen',system:'Sistema linfático e imunológico',location:'Parte superior esquerda do abdome.',purpose:'Filtra o sangue e participa da defesa do organismo.',function:'A polpa branca participa da resposta imune; a polpa vermelha remove hemácias envelhecidas.'},
{id:'vasos-quiliferos',name:'Vasos quilíferos',x:51,y:65,shape:'vessel',system:'Sistema linfático',location:'No interior das vilosidades do intestino delgado.',purpose:'Absorvem e transportam lipídios da alimentação.',function:'Recebem partículas lipídicas chamadas quilomícrons e as conduzem pela linfa até a circulação.'}]},
{ id:'reprodutor',name:'Sistema reprodutor',short:'Reprodutor',note:'Produz gametas e hormônios sexuais. Na espécie humana, a fecundação geralmente ocorre na tuba uterina e a implantação no endométrio.',organs:[
{id:'ovarios',name:'Ovários',x:39,y:69,shape:'ovary',system:'Sistema reprodutor feminino',location:'Pelve, um de cada lado do útero.',purpose:'Produzem ovócitos e hormônios como estrogênio e progesterona.',function:'Os folículos ovarianos abrigam ovócitos. A atividade ovariana é regulada por FSH e LH, produzidos pela hipófise.'},
{id:'utero',name:'Útero',x:50,y:74,shape:'uterus',system:'Sistema reprodutor feminino',location:'Pelve, entre a bexiga e o reto.',purpose:'Abriga o desenvolvimento do embrião e do feto durante a gestação.',function:'O endométrio sofre alterações ao longo do ciclo menstrual e é o tecido onde ocorre a implantação embrionária.'},
{id:'testiculos',name:'Testículos',x:55,y:83,shape:'testis',system:'Sistema reprodutor masculino',location:'Bolsa escrotal, fora da cavidade abdominal.',purpose:'Produzem espermatozoides e testosterona.',function:'A produção de espermatozoides ocorre nos túbulos seminíferos e depende de regulação hormonal e temperatura adequada.'},
{id:'prostata',name:'Próstata',x:50,y:78,shape:'gland',system:'Sistema reprodutor masculino',location:'Abaixo da bexiga, envolvendo o início da uretra.',purpose:'Produz parte do líquido que compõe o sêmen.',function:'Sua secreção contribui para o meio em que os espermatozoides são transportados.'}]},
{ id:'locomotor',name:'Sistema locomotor',short:'Locomotor',note:'O esqueleto sustenta e protege; músculos geram força; articulações permitem movimento. A contração muscular depende de ATP e cálcio.',organs:[
{id:'esqueleto',name:'Ossos e articulações',x:50,y:48,shape:'bone',system:'Sistema esquelético',location:'Distribuídos por todo o corpo.',purpose:'Sustentam o corpo, protegem órgãos e armazenam minerais.',function:'O tecido ósseo é remodelado continuamente por osteoblastos e osteoclastos. Articulações conectam ossos e permitem movimentos.'},
{id:'musculos',name:'Músculos esqueléticos',x:30,y:54,shape:'muscle',system:'Sistema muscular',location:'Associados ao esqueleto por tendões.',purpose:'Produzem movimentos, mantêm a postura e geram calor.',function:'Filamentos de actina e miosina deslizam entre si durante a contração, com participação de ATP e íons cálcio.'},
{id:'tendao',name:'Tendões',x:68,y:60,shape:'vessel',system:'Sistema muscular',location:'Nas extremidades de muitos músculos, ligando-os aos ossos.',purpose:'Transmitem a força da contração muscular ao esqueleto.',function:'Feixes resistentes de colágeno suportam tração e permitem que a força muscular mova os ossos.'}]},
{ id:'tegumentar',name:'Sistema tegumentar',short:'Tegumentar',note:'A pele é uma barreira de proteção, participa da percepção sensorial e ajuda a regular a temperatura corporal.',organs:[
{id:'pele',name:'Pele',x:26,y:48,shape:'skin',system:'Sistema tegumentar',location:'Reveste toda a superfície externa do corpo.',purpose:'Protege contra agentes externos, reduz a perda de água e participa da termorregulação.',function:'A epiderme forma uma barreira; a derme abriga vasos, nervos, folículos e glândulas. A evaporação do suor ajuda a resfriar o corpo.'},
{id:'sudoriparas',name:'Glândulas sudoríparas',x:71,y:48,shape:'gland',system:'Sistema tegumentar',location:'Principalmente na derme, com ductos que chegam à superfície.',purpose:'Produzem suor e ajudam a controlar a temperatura.',function:'O suor chega à superfície por ductos; sua evaporação retira calor da pele. São glândulas exócrinas.'},
{id:'sebaceas',name:'Glândulas sebáceas',x:71,y:56,shape:'gland',system:'Sistema tegumentar',location:'Geralmente associadas aos folículos pilosos.',purpose:'Produzem sebo, que lubrifica pele e pelos.',function:'O sebo é lançado nos folículos ou diretamente na superfície. Também são glândulas exócrinas.'}]}
]

function OrganShape({shape}:{shape:string}) {
 const common={stroke:'currentColor',strokeWidth:1.8,strokeLinecap:'round' as const,strokeLinejoin:'round' as const}
 switch(shape) {
 case 'heart': return <path {...common} d="M0 8C-18 -5 -16 -19 -5 -19C2 -19 5 -13 6 -10C11 -23 27 -18 25 -5C23 7 8 19 5 22C2 19 -8 14 0 8Z"/>
 case 'lung': return <g {...common} fill="none"><path d="M0 -23V4M0 -5L-10 -13M0 -5L10 -13"/><path d="M-4 -12C-15 -25 -24 -6 -24 10C-24 24 -9 23 -3 11Z" fill="currentColor" fillOpacity=".18"/><path d="M4 -12C15 -25 24 -6 24 10C24 24 9 23 3 11Z" fill="currentColor" fillOpacity=".18"/></g>
 case 'brain': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-19 0C-25 -13 -13 -22 -5 -17C1 -26 14 -18 12 -10C26 -8 24 8 14 11C12 22 -3 22 -8 15C-19 18 -25 8 -19 0ZM-3 -15V15M-17 -5L-7 -3M6 -12L10 -3M-8 8L-1 4M10 9L15 4"/>
 case 'stomach': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-8 -19C-1 -10 -8 -4 -6 4C-4 18 11 22 20 10C29 -2 18 -10 11 -8C3 -6 5 -17 5 -20Z"/>
 case 'liver': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-25 -5C-12 -19 8 -17 25 -10C22 3 11 16 -5 16C-20 16 -28 7 -25 -5Z"/>
 case 'kidney': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-5 -22C-23 -22 -25 -2 -18 13C-12 27 4 19 8 8C12 -1 6 -7 0 -7C-7 -7 -8 -14 -5 -22Z"/>
 case 'intestine': return <path {...common} fill="none" strokeWidth="4" d="M-18 -15C-30 -15 -26 17 -14 17H14C27 17 28 -15 15 -15C5 -15 10 12 0 12C-10 12 -4 -12 -14 -12C-22 -12 -20 5 -10 5H10C19 5 18 -5 12 -5"/>
 case 'bladder': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-16 -7C-18 9 -9 20 0 20C9 20 18 9 16 -7C12 -17 -12 -17 -16 -7ZM0 -18V-25"/>
 case 'thyroid': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-5 -14C-22 -28 -25 -2 -12 8C-6 13 -2 5 0 2C2 5 6 13 12 8C25 -2 22 -28 5 -14Z"/>
 case 'pancreas': return <path {...common} fill="currentColor" fillOpacity=".22" d="M-26 2C-17 -13 -6 -7 1 -12C9 -17 16 -7 26 -4C19 4 12 10 2 7C-7 4 -15 18 -26 2Z"/>
 case 'uterus': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-5 -7C-14 -20 -27 -15 -23 -5C-19 4 -9 2 -5 5L-3 23H3L5 5C9 2 19 4 23 -5C27 -15 14 -20 5 -7Z"/>
 case 'ovary': return <ellipse {...common} cx="0" cy="0" rx="13" ry="9" fill="currentColor" fillOpacity=".2"/>
 case 'testis': return <g {...common} fill="currentColor" fillOpacity=".18"><ellipse cx="-8" cy="0" rx="10" ry="15"/><ellipse cx="9" cy="0" rx="10" ry="15"/></g>
 case 'bone': return <path {...common} fill="currentColor" fillOpacity=".18" d="M-20 -10C-28 -20 -15 -27 -8 -18L8 18C17 10 28 21 19 29C10 37 2 27 5 22L-11 -15C-20 -7 -27 -2 -20 -10Z"/>
 case 'muscle': return <path {...common} fill="currentColor" fillOpacity=".2" d="M-24 0C-15 -17 15 -17 24 0C15 17 -15 17 -24 0ZM-15 0H15"/>
 case 'skin': return <g {...common} fill="none"><path d="M-23 -13H23V13H-23Z" fill="currentColor" fillOpacity=".15"/><path d="M-23 -4H23M-23 5H23"/></g>
 case 'spleen': return <path {...common} fill="currentColor" fillOpacity=".2" d="M-8 -22C-24 -14 -23 10 -8 21C8 28 23 7 17 -8C13 -20 2 -26 -8 -22Z"/>
 case 'thymus': return <path {...common} fill="currentColor" fillOpacity=".2" d="M0 -19C-23 -27 -21 -2 -7 3C-18 20 0 22 0 8C0 22 18 20 7 3C21 -2 23 -27 0 -19Z"/>
 case 'nose': return <path {...common} fill="currentColor" fillOpacity=".2" d="M-4 -20C-4 -5 -14 7 -9 12C-3 18 8 18 13 11C16 6 5 3 4 -3Z"/>
 case 'trachea': return <g {...common} fill="none"><path d="M0 -24V24" strokeWidth="9"/><path d="M-5 -16H5M-5 -7H5M-5 2H5M-5 11H5"/></g>
 case 'vessel': return <g {...common} fill="none"><path d="M-22 0C-10 -16 10 16 22 0" strokeWidth="5"/><path d="M-22 0C-10 16 10 -16 22 0" strokeWidth="2"/></g>
 default: return <circle {...common} r="15" fill="currentColor" fillOpacity=".2"/>
 }
}

export function HumanSystems() {
 const [activeSystem,setActiveSystem]=useState('nervoso')
 const [activeOrgan,setActiveOrgan]=useState<Organ>(systems[0].organs[0])
 const [pinned,setPinned]=useState(false)
 const current=systems.find(s=>s.id===activeSystem)??systems[0]
 const chooseSystem=(s:System)=>{setActiveSystem(s.id);setActiveOrgan(s.organs[0]);setPinned(false)}
 const chooseOrgan=(o:Organ)=>{setActiveOrgan(o);setPinned(true)}
 return <section className="mb-16" aria-labelledby="atlas-title">
  <div className="mb-7 border-b border-papel-300 pb-5">
   <p className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-verde-800">Atlas de anatomia · Fisiologia humana</p>
   <div className="flex flex-wrap items-end justify-between gap-4"><div><h2 id="atlas-title" className="font-display text-3xl font-semibold tracking-tight text-tinta-900 sm:text-4xl">Explore o corpo humano</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-tinta-600">Escolha um sistema e investigue seus órgãos. Passe o cursor sobre uma estrutura para conhecer sua função.</p></div><span className="text-xs text-tinta-500">11 sistemas · conteúdo para o ENEM</span></div>
  </div>
  <div className="mb-5 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Sistemas do corpo humano">
   {systems.map(s=><button key={s.id} type="button" role="tab" aria-selected={activeSystem===s.id} onClick={()=>chooseSystem(s)} className={activeSystem===s.id?'shrink-0 border-b-2 border-verde-800 px-3 py-3 text-sm font-semibold text-verde-900':'shrink-0 border-b-2 border-transparent px-3 py-3 text-sm text-tinta-600 transition-colors hover:border-papel-400 hover:text-tinta-900'}>{s.short}</button>)}
  </div>
  <div className="grid overflow-hidden border border-papel-300 bg-[#f7f5ef] lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,.85fr)]">
   <div className="relative min-h-[570px] border-b border-papel-300 p-4 sm:p-7 lg:border-b-0 lg:border-r">
    <div className="mb-3 flex items-center justify-between"><span className="text-[11px] font-semibold uppercase tracking-[.16em] text-tinta-500">Vista anterior · mapa anatômico</span><span className="text-[11px] text-tinta-500">Selecione uma estrutura</span></div>
    <svg viewBox="0 0 100 100" className="mx-auto h-[500px] max-h-[68vh] w-full max-w-[470px]" role="img" aria-label="Mapa esquemático do corpo humano com órgãos interativos">
     <defs><linearGradient id="bodyTone" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#e7dfd0"/><stop offset="1" stopColor="#d6cbb9"/></linearGradient></defs>
     <g fill="url(#bodyTone)" stroke="#a99b86" strokeWidth=".42" strokeLinejoin="round">
      <ellipse cx="50" cy="10" rx="6.8" ry="8.2"/>
      <path d="M46 18L45 21C39 21 34 23 30 27L25 40Q24 43 27 44L31 45L38 32L37 49L33 72Q32 75 36 76L40 76L47 53H53L60 76L64 76Q68 75 67 72L63 49L62 32L69 45L73 44Q76 43 75 40L70 27C66 23 61 21 55 21L54 18Z"/>
      <path d="M30 28Q26 31 24 39L17 59Q16 63 20 64L23 63L34 43L39 31Z M70 28Q74 31 76 39L83 59Q84 63 80 64L77 63L66 43L61 31Z"/>
      <path d="M40 74L38 90Q38 93 42 93L46 93L50 78L54 93L58 93Q62 93 62 90L60 74Z"/>
      <path d="M44 22Q50 25 56 22M39 49Q50 53 61 49" fill="none" stroke="#c0b29d" strokeWidth=".55"/>
    </g>
    <g fill="none" stroke="#b7aa96" strokeWidth=".35" opacity=".65"><path d="M50 22V74M39 49H61M40 74H60" strokeDasharray="1 1.5"/></g>
     {current.organs.map(o=><g key={o.id} transform={'translate('+o.x+' '+o.y+')'} className="cursor-pointer" role="button" tabIndex={0} aria-label={'Ver '+o.name}
      onMouseEnter={()=>{if(!pinned)setActiveOrgan(o)}} onMouseLeave={()=>{if(!pinned)setActiveOrgan(current.organs[0])}} onFocus={()=>setActiveOrgan(o)} onClick={()=>chooseOrgan(o)}
      onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();chooseOrgan(o)}}}>
      <circle r="7.1" fill={activeOrgan.id===o.id?'#315e4b':'#fffdf7'} fillOpacity={activeOrgan.id===o.id?'.14':'.92'} stroke={activeOrgan.id===o.id?'#315e4b':'#9b8f7e'} strokeWidth={activeOrgan.id===o.id?'1.1':'.55'}/>
      <g transform="scale(.24)" fill={activeOrgan.id===o.id?'#315e4b':'#927b61'}><OrganShape shape={o.shape}/></g><circle r="1.35" fill={activeOrgan.id===o.id?'#315e4b':'#9b8f7e'}/><title>{o.name}</title>
     </g>)}
    </svg>
    <div className="mt-1 flex items-center justify-center gap-5 text-[11px] text-tinta-500"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-verde-800"/>Estrutura selecionada</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-[#9b8f7e] bg-white"/>Outras estruturas</span></div>
    <p className="mt-3 text-center text-[10px] leading-4 text-tinta-500">Representação esquemática para localização aproximada; não substitui uma prancha anatômica em escala.</p>
   </div>
   <aside className="flex min-h-[570px] flex-col bg-[#fbfaf6] p-6 sm:p-8" aria-live="polite">
    <div className="mb-5"><p className="text-[11px] font-semibold uppercase tracking-[.16em] text-verde-800">{current.name}</p><h3 className="mt-2 font-display text-2xl font-semibold text-tinta-900">{activeOrgan.name}</h3><p className="mt-2 text-sm leading-6 text-tinta-600">{current.note}</p></div>
    <div className="relative mb-5 flex min-h-[158px] items-center justify-center overflow-hidden border-y border-papel-300 bg-[#f4f1e8] py-3">
     <span className="absolute left-3 top-3 text-[9px] font-semibold uppercase tracking-[.18em] text-tinta-500">Prancha · detalhe anatômico</span>
     <svg key={activeOrgan.id} viewBox="-38 -38 76 76" className="atlas-specimen mt-3 h-32 w-32 overflow-visible text-[#927b61]" role="img" aria-label={'Ilustração esquemática de '+activeOrgan.name}>
      <circle r="31" fill="none" stroke="#d8d0c1" strokeWidth=".7" strokeDasharray="1.5 2.8"/>
      <circle r="25" fill="none" stroke="#e4ddd0" strokeWidth=".55"/>
      <g className={activeOrgan.id==='coracao'?'atlas-heart':activeOrgan.id==='pulmao'?'atlas-breath': 'atlas-organ'}><OrganShape shape={activeOrgan.shape}/></g>
     </svg>
     <span className="absolute bottom-3 right-3 font-mono text-[9px] tracking-wider text-tinta-400">FIG. {String(current.organs.findIndex(o=>o.id===activeOrgan.id)+1).padStart(2,'0')}</span>
    </div>
    <div className="mb-5 border-t border-papel-300 pt-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-tinta-500">Localização</p><p className="text-sm leading-6 text-tinta-800">{activeOrgan.location}</p></div>
    <div className="mb-5 border-t border-papel-300 pt-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-tinta-500">A qual sistema pertence</p><p className="text-sm font-medium leading-6 text-tinta-800">{activeOrgan.system}</p></div>
    <div className="mb-5 border-t border-papel-300 pt-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-tinta-500">Para que serve</p><p className="text-sm leading-6 text-tinta-800">{activeOrgan.purpose}</p></div>
    <div className="border-t border-papel-300 pt-5"><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.16em] text-tinta-500">Como funciona</p><p className="text-sm leading-6 text-tinta-800">{activeOrgan.function}</p></div>
    <div className="mt-auto border-t border-papel-300 pt-5"><p className="text-[10px] leading-5 text-tinta-500">Dica de estudo: relacione a função do órgão com o equilíbrio do organismo (homeostase).</p></div>
   </aside>
  </div>
  <div className="mt-5 border-b border-papel-300 pb-4"><p className="mb-3 text-[11px] font-semibold uppercase tracking-[.16em] text-tinta-500">Órgãos deste sistema</p><div className="flex flex-wrap gap-2">
   {current.organs.map(o=><button key={o.id} type="button" onMouseEnter={()=>{setActiveOrgan(o);setPinned(false)}} onFocus={()=>{setActiveOrgan(o);setPinned(false)}} onClick={()=>chooseOrgan(o)} aria-pressed={activeOrgan.id===o.id} className={activeOrgan.id===o.id?'border border-verde-800 bg-verde-800 px-3 py-2 text-xs font-medium text-white':'border border-papel-300 bg-transparent px-3 py-2 text-xs text-tinta-700 transition-colors hover:border-verde-700 hover:text-verde-900'}>{o.name}</button>)}
  </div></div>
  <section className="mt-8 grid gap-5 border-y border-papel-300 py-6 md:grid-cols-[.7fr_1.3fr]">
   <div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-verde-800">Conceito que cai no ENEM</p><h3 className="mt-2 font-display text-xl font-semibold text-tinta-900">Glândulas endócrinas × exócrinas</h3></div>
   <div className="grid gap-4 sm:grid-cols-2">
    <div className="border-l-2 border-[#9b8062] pl-4"><h4 className="text-sm font-semibold text-tinta-900">Endócrinas</h4><p className="mt-1 text-xs leading-5 text-tinta-600">Não possuem ductos: lançam hormônios no líquido intersticial e, em seguida, no sangue. Exemplos: hipófise, tireoide e suprarrenais.</p></div>
    <div className="border-l-2 border-[#66836c] pl-4"><h4 className="text-sm font-semibold text-tinta-900">Exócrinas</h4><p className="mt-1 text-xs leading-5 text-tinta-600">Possuem ductos que conduzem secreções até uma superfície ou cavidade. Exemplos: salivares, sudoríparas e sebáceas. O pâncreas exerce as duas funções.</p></div>
   </div>
  </section>
  <p className="mt-3 text-xs leading-5 text-tinta-500">No computador, passe o mouse sobre os órgãos no mapa. No celular, toque em uma estrutura ou use a lista abaixo do desenho.</p>
 </section>
}
