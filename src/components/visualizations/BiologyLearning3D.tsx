'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'

declare module 'react' { namespace JSX { interface IntrinsicElements extends ThreeElements {} } }

type Kind = 'evolucao' | 'zoologia' | 'ecologia' | 'divisao-celular'
type Detail = { id:string; name:string; subtitle:string; body:string; enem:string; color:string }
type Props = { selected:string; onSelect:(id:string)=>void; stage:number }

const content:Record<Kind,Detail[]> = {
  evolucao:[
    {id:'variacao',name:'Variação hereditária',subtitle:'O ponto de partida',body:'Indivíduos de uma população apresentam diferenças. Mutações e recombinação genética geram parte dessa diversidade; o ambiente não cria a característica de que o organismo precisa.',enem:'A variação aparece antes da seleção. Não confunda seleção natural com esforço ou necessidade individual.',color:'#b58b55'},
    {id:'pressao',name:'Pressão seletiva',subtitle:'O ambiente',body:'Predação, clima, doenças e disponibilidade de alimento influenciam quais características favorecem a sobrevivência e a reprodução em determinado contexto.',enem:'Uma característica vantajosa em um ambiente pode ser neutra ou desvantajosa em outro.',color:'#6e927c'},
    {id:'reproducao',name:'Sucesso reprodutivo',subtitle:'Seleção natural',body:'Indivíduos com características hereditárias que aumentam seu sucesso reprodutivo tendem a deixar mais descendentes. A seleção atua sobre fenótipos, alterando frequências de alelos ao longo das gerações.',enem:'Aptidão biológica significa contribuição reprodutiva, não força física nem superioridade absoluta.',color:'#8d779e'},
    {id:'populacao',name:'Mudança populacional',subtitle:'Escala de gerações',body:'Com o passar das gerações, variantes hereditárias podem se tornar mais frequentes. Evolução é mudança nas características hereditárias de populações, não transformação planejada de um indivíduo.',enem:'Indivíduos não evoluem durante a vida: populações evoluem ao longo das gerações.',color:'#668da2'},
    {id:'ancestral',name:'Ancestralidade comum',subtitle:'Árvore filogenética',body:'Os ramos representam linhagens que compartilham ancestrais. Espécies atuais não são degraus de uma escada: são pontas de ramos que seguiram histórias próprias.',enem:'Parentesco é indicado pelo ancestral comum mais recente, não pela posição visual dos grupos.',color:'#9a805d'}
  ],
  zoologia:[
    {id:'porifero',name:'Poríferos',subtitle:'Esponjas · animais filtradores',body:'O corpo da esponja funciona como um sistema de circulação de água. A água entra por pequenos poros (óstios), passa por câmaras revestidas por coanócitos e sai pelo ósculo. O movimento dos flagelos dos coanócitos cria a corrente; essas células também retêm partículas alimentares. Amebócitos distribuem nutrientes pelo corpo. A digestão é intracelular.',enem:'Não apresentam tecidos verdadeiros, órgãos, sistema nervoso ou sistema digestório. São geralmente sésseis, vivem em ambientes aquáticos e podem reproduzir-se sexuada ou assexuadamente por brotamento e fragmentação.',color:'#c58a5b'},
    {id:'cnidario',name:'Cnidários',subtitle:'Águas-vivas · anêmonas · corais',body:'São animais aquáticos de simetria radial e organização tecidual diploblástica. Seus cnidócitos contêm nematocistos, estruturas que disparam e ajudam a capturar presas e defender o animal. A cavidade gastrovascular possui uma única abertura, que funciona como boca. Podem apresentar forma de pólipo, geralmente fixa, ou medusa, geralmente natante.',enem:'Atenção à diferença entre pólipo e medusa. Corais, anêmonas e águas-vivas são cnidários. A digestão começa na cavidade gastrovascular e se completa dentro das células.',color:'#7b9eb4'},
    {id:'molusco',name:'Moluscos',subtitle:'Polvos · caracóis · mexilhões',body:'O plano corporal típico inclui pé muscular, massa visceral e manto. O manto pode secretar uma concha calcária, presente em muitos grupos. Gastrópodes incluem caracóis e lesmas; bivalves incluem ostras e mexilhões; cefalópodes incluem polvos e lulas. Nos cefalópodes, o pé é modificado em braços e sifão, usado na propulsão a jato. A maioria possui rádula, estrutura raspadora que falta nos bivalves.',enem:'Compare os três grupos: gastrópodes (pé para locomoção), bivalves (duas valvas filtradoras) e cefalópodes (braços e sistema nervoso desenvolvido). Nem todo molusco possui concha externa.',color:'#9a82a7'},
    {id:'artropode',name:'Artrópodes',subtitle:'Insetos · aracnídeos · crustáceos',body:'É o grupo animal mais diverso. Possuem exoesqueleto de quitina, corpo segmentado e apêndices articulados. Como o exoesqueleto não cresce junto com o animal, ocorre ecdise: a cutícula antiga é abandonada e uma nova se expande e endurece. Insetos têm cabeça, tórax, abdome e três pares de pernas; aracnídeos têm quatro pares de pernas; crustáceos geralmente apresentam dois pares de antenas.',enem:'Memorize a contagem de pernas: insetos = 6; aracnídeos = 8. A circulação é geralmente aberta e a respiração varia entre traqueias, brânquias e pulmões foliáceos.',color:'#8a9a63'},
    {id:'vertebrado',name:'Vertebrados',subtitle:'Peixes · anfíbios · répteis · aves · mamíferos',body:'Possuem endoesqueleto com crânio e coluna vertebral, além de sistema nervoso central protegido. Peixes respiram principalmente por brânquias; anfíbios dependem de ambientes úmidos e apresentam pele permeável; répteis têm pele queratinizada e ovo amniótico; aves possuem penas e são endotérmicas; mamíferos têm pelos e glândulas mamárias. Há grande diversidade de circulação, reprodução e regulação térmica.',enem:'Anfíbios têm pele fina e úmida; répteis, aves e mamíferos são amniotas. Aves são dinossauros terópodes atuais e, portanto, estão inseridas na linhagem dos répteis.',color:'#6b91a0'}
  ],
  ecologia:[
    {id:'produtor',name:'Produtores',subtitle:'Base energética',body:'Plantas e algas capturam energia luminosa e a convertem em energia química pela fotossíntese. Formam a base de muitas teias alimentares.',enem:'Energia entra no ecossistema principalmente pela luz. Matéria circula; energia flui e parte se dissipa como calor.',color:'#6e9b69'},
    {id:'consumidor',name:'Consumidores',subtitle:'Transferência de energia',body:'Herbívoros, carnívoros e onívoros obtêm matéria e energia ao se alimentar de outros organismos. Um mesmo animal pode ocupar mais de um nível trófico.',enem:'A seta aponta do alimento para quem o consome: indica o fluxo de matéria e energia.',color:'#bd9860'},
    {id:'decompositor',name:'Decompositores',subtitle:'Reciclagem da matéria',body:'Fungos e bactérias degradam restos e organismos mortos, devolvendo nutrientes ao ambiente. Atuam sobre matéria orgânica proveniente de todos os níveis tróficos.',enem:'Decompositores atuam sobre resíduos de toda a teia alimentar, não apenas no fim de uma cadeia.',color:'#9b8267'},
    {id:'agua',name:'Água e clima',subtitle:'Fatores abióticos',body:'Luz, temperatura, água, solo e nutrientes influenciam a distribuição dos seres vivos. A evapotranspiração das plantas participa do ciclo da água e da umidade atmosférica.',enem:'Fatores abióticos são componentes não vivos; fatores bióticos correspondem aos organismos e suas interações.',color:'#6c9eb2'},
    {id:'habitat',name:'Habitat e nicho',subtitle:'Organização ecológica',body:'Habitat é o local onde uma espécie vive. Nicho ecológico reúne seu modo de vida, recursos utilizados, tolerâncias e relações com outros organismos.',enem:'Habitat é o endereço; nicho é o papel ecológico e a forma como a espécie utiliza os recursos.',color:'#8e9a68'}
  ],
  'divisao-celular':[
    {id:'interfase',name:'Intérfase',subtitle:'G1 · S · G2',body:'A célula cresce, realiza suas funções e duplica o DNA na fase S. A intérfase não é repouso: concentra atividade metabólica e preparação para a divisão.',enem:'A duplicação ocorre na fase S. O número de cromossomos não dobra; cada cromossomo passa a ter duas cromátides-irmãs.',color:'#6e9a78'},
    {id:'profase',name:'Prófase',subtitle:'Condensação',body:'A cromatina se condensa em cromossomos visíveis. O fuso começa a se organizar e, na sequência, a carioteca se desorganiza para permitir o acesso aos cromossomos.',enem:'Na prófase, cromossomos já duplicados ficam mais compactos. Cada um possui duas cromátides-irmãs.',color:'#bd965e'},
    {id:'metafase',name:'Metáfase',subtitle:'Alinhamento',body:'Os cromossomos ligam-se aos microtúbulos do fuso e ficam organizados na região equatorial da célula. Isso ajuda a garantir a distribuição correta do material genético.',enem:'Na metáfase, os cromossomos ficam alinhados no plano equatorial; ainda não ocorreu a separação das cromátides.',color:'#7298b0'},
    {id:'anafase',name:'Anáfase',subtitle:'Separação',body:'As cromátides-irmãs se separam e são conduzidas para polos opostos. A partir da separação, cada cromátide passa a ser considerada um cromossomo independente.',enem:'Na mitose, separam-se cromátides-irmãs. Na meiose I, separam-se cromossomos homólogos.',color:'#b77f91'},
    {id:'telofase',name:'Telófase e citocinese',subtitle:'Duas células',body:'Os cromossomos chegam aos polos, começam a descondensar e novos núcleos se organizam. A citocinese divide o citoplasma, formando duas células-filhas.',enem:'Mitose preserva o número de cromossomos. A citocinese divide o citoplasma.',color:'#8b80a8'}
  ]
}

function Tube({points,color,radius=.025}:{points:[number,number,number][];color:string;radius?:number}) {
  const geometry=useMemo(()=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),24,radius,8,false),[points,radius])
  return <mesh geometry={geometry}><meshStandardMaterial color={color} roughness={.85}/></mesh>
}
function Tag({children,position}:{children:string;position:[number,number,number]}) {
  return <Html position={position} center distanceFactor={9} style={{pointerEvents:'none'}}><span className="whitespace-nowrap border border-white/80 bg-[#f8f6ef]/90 px-2 py-1 text-[10px] font-semibold text-[#46534a] shadow-sm">{children}</span></Html>
}
function Moth({position,color}:{position:[number,number,number];color:string}) {
  return <group position={position} scale={.82}>
    <mesh position={[0,0,.04]} rotation={[Math.PI/2,0,0]}><capsuleGeometry args={[.035,.19,5,10]}/><meshStandardMaterial color="#302f2b" roughness={.8}/></mesh>
    {[-1,1].map(s=><group key={s} position={[s*.07,.035,0]} rotation={[0,0,s*.22]}>
      <mesh scale={[.2,.115,.018]} rotation={[0,0,s*.16]}><sphereGeometry args={[1,28,20]}/><meshStandardMaterial color={color} roughness={1}/></mesh>
      <mesh position={[s*.045,.01,.02]} scale={[.095,.06,.012]}><sphereGeometry args={[1,20,14]}/><meshStandardMaterial color={color==='#3e403d'?'#68675f':'#f3ead9'} roughness={1}/></mesh>
    </group>)}
    <mesh position={[0,.015,.1]}><sphereGeometry args={[.055,16,12]}/><meshStandardMaterial color="#282a27"/></mesh>
    {[-1,1].map(s=><Tube key={s} points={[[s*.02,.12,.05],[s*.07,.2,.05],[s*.13,.24,.05]]} color="#383832" radius={.008}/>)}
  </group>
}
function Evolution({selected,stage}:Props) {
  if(selected==='ancestral') return <group>
    <mesh position={[0,-1.45,-.3]}><cylinderGeometry args={[.22,.32,3.1,20]}/><meshStandardMaterial color="#76624b" roughness={1}/></mesh>
    {[[0,-.3,0],[-1.25,.25,0],[1.25,.75,0],[-1.65,1.45,0],[.25,1.65,0],[1.8,1.85,0]].map((p,i)=><group key={i} position={p as [number,number,number]}><mesh><sphereGeometry args={[.28,28,20]}/><meshStandardMaterial color={['#6f9b9a','#78a36d','#9a8c68','#7295a7','#9b8067','#839d75'][i]} roughness={.55}/></mesh><Tag position={[0,.48,0]}>{['Ancestral dos tetrápodes','Anfíbios','Amniotas','Mamíferos','Répteis','Aves'][i]}</Tag></group>)}
    {[[0,-1.1,-.1,-1.25,.25],[0,-.2,-1.25,.25,-1.65],[0,-.2,1.25,.75,.25],[1.25,.75,.25,1.65,1.45],[1.25,.75,1.8,1.85,.25]].map((v,i)=><Tube key={i} points={[[v[0],v[1],0],[v[2],v[3],0],[v[4],v[3]+.15,0]] as [number,number,number][]} color="#8e765d" radius={.045}/>)}
    <Tag position={[0,-2.05,0]}>Ramos representam linhagens com ancestralidade compartilhada</Tag>
  </group>
  return <group>
    <mesh position={[0,-.1,-.65]} rotation={[0,0,-.08]}><cylinderGeometry args={[.28,.42,4.2,32]}/><meshStandardMaterial color="#62513f" roughness={1}/></mesh>
    {Array.from({length:12},(_,i)=><Tube key={i} points={[[0,-1.8,-.6],[Math.sin(i*.8)*.25,-.4,-.55],[Math.sin(i*.8)*.65,.65,-.5],[Math.sin(i*.8)*1.05,1.7,-.45]]} color="#76604a" radius={.055}/>)}
    {Array.from({length:8},(_,i)=><group key={i} position={[Math.sin(i*1.7)*.72,.8+(i%3)*.32,.0]}><mesh scale={[.55,.28,.08]} rotation={[0,0,i*.3]}><sphereGeometry args={[1,20,12]}/><meshStandardMaterial color="#687b50" roughness={1}/></mesh></group>)}
    {Array.from({length:12},(_,i)=>{
      const dark=stage>1?i<9:i<3
      return <Moth key={i} position={[-1.7+(i%4)*1.05,-1.25+Math.floor(i/4)*.95,.18]} color={dark?'#3e403d':'#d8cdb6'}/>
    })}
    <mesh position={[0,-2.02,0]}><boxGeometry args={[5.6,.12,1.2]}/><meshStandardMaterial color="#8e8a78" roughness={1}/></mesh>
    <Tag position={[-1.65,1.95,.2]}>{stage>1?'Após seleção: formas escuras mais frequentes':'Antes: há variação entre indivíduos'}</Tag>
    <Tag position={[1.65,-.25,.5]}>Tronco e líquens</Tag>
    <Tag position={[0,-2.28,.55]}>Exemplo clássico: mariposa-pimenta (Biston betularia)</Tag>
  </group>
}
function Zoology({selected}:Props) {
  const shell='#8d806b',skin='#b98c78'
  return <group>
    {selected==='porifero'&&<group>
      <mesh position={[0,-.15,0]} scale={[.78,1.3,.68]}><sphereGeometry args={[1,40,32]}/><meshStandardMaterial color="#b77b4e" roughness={.92}/></mesh>
      {[...Array(28)].map((_,i)=>{const a=i*2.399;const y=-1.05+(i%7)*.3;return <group key={i} position={[Math.cos(a)*.58,y,Math.sin(a)*.5]}><mesh rotation={[Math.cos(a)*.3,0,Math.sin(a)*.3]}><cylinderGeometry args={[.045,.075,.34,12]}/><meshStandardMaterial color="#e2b17b"/></mesh></group>})}
      <mesh position={[0,1.2,0]}><cylinderGeometry args={[.23,.31,.2,32]}/><meshStandardMaterial color="#e0ad78"/></mesh><mesh position={[0,1.32,0]}><torusGeometry args={[.23,.055,12,32]}/><meshStandardMaterial color="#73563f"/></mesh>
      <Tag position={[0,1.7,0]}>Ósculo: saída da água</Tag><Tag position={[1.15,-.15,.2]}>Óstios: entrada da água</Tag><Tag position={[-1.1,-.8,.1]}>Coanócitos no interior</Tag>
    </group>}
    {selected==='cnidario'&&<group>
      <mesh position={[0,.72,0]} scale={[1.12,.46,1.12]}><sphereGeometry args={[1,48,32,0,Math.PI*2,0,Math.PI/2]}/><meshPhysicalMaterial color="#9bc8ce" transparent opacity={.82} roughness={.18} transmission={.12}/></mesh>
      <mesh position={[0,.42,0]}><cylinderGeometry args={[.23,.34,.38,24]}/><meshStandardMaterial color="#b68c9d" roughness={.55}/></mesh>
      {Array.from({length:12},(_,i)=><group key={i}><Tube points={[[Math.cos(i*Math.PI/6)*.78,.45,Math.sin(i*Math.PI/6)*.78],[Math.cos(i*Math.PI/6)*.82,-.2,Math.sin(i*Math.PI/6)*.82],[Math.cos(i*Math.PI/6)*(.9+.12*(i%3)),-1.2,Math.sin(i*Math.PI/6)*(.9+.12*(i%3))]]} color="#7daeb9" radius={.025}/>{Array.from({length:5},(_,j)=><mesh key={j} position={[Math.cos(i*Math.PI/6)*(.84+j*.018),-.28-j*.15,Math.sin(i*Math.PI/6)*(.84+j*.018)]} scale={[.035,.055,.035]}><sphereGeometry args={[1,10,8]}/><meshStandardMaterial color="#d7a9a4"/></mesh>)}</group>)}
      <Tag position={[0,1.55,0]}>Umbrela gelatinosa</Tag><Tag position={[1.4,-.85,.1]}>Tentáculos com cnidócitos</Tag><Tag position={[0,.1,.65]}>Manúbrio e boca</Tag>
    </group>}
    {selected==='molusco'&&<group>
      <mesh position={[0,.25,0]} scale={[.58,.48,.55]}><sphereGeometry args={[1,40,28]}/><meshStandardMaterial color={skin} roughness={.4}/></mesh>
      <mesh position={[-.45,.62,-.1]} rotation={[0,0,-.25]} scale={[.55,.38,.5]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color={shell} roughness={.8}/></mesh>
      {Array.from({length:8},(_,i)=><group key={i}><Tube points={[[Math.cos(i*Math.PI/4)*.3,-.05,Math.sin(i*Math.PI/4)*.3],[Math.cos(i*Math.PI/4)*.65,-.45,Math.sin(i*Math.PI/4)*.65],[Math.cos(i*Math.PI/4)*1,-.95,Math.sin(i*Math.PI/4)*1],[Math.cos(i*Math.PI/4)*1.2,-.75,Math.sin(i*Math.PI/4)*1.2]]} color="#b77d80" radius={.075}/>{Array.from({length:4},(_,j)=><mesh key={j} position={[Math.cos(i*Math.PI/4)*(.75+j*.09),-.52-j*.08,Math.sin(i*Math.PI/4)*(.75+j*.09)]}><sphereGeometry args={[.045,10,8]}/><meshStandardMaterial color="#e8c6b7"/></mesh>)}</group>)}
      <mesh position={[.25,.4,.5]}><sphereGeometry args={[.09,16,12]}/><meshStandardMaterial color="#242b2b"/></mesh><Tag position={[-.6,1.25,0]}>Manto e massa visceral</Tag><Tag position={[1.5,-.85,.2]}>Braços com ventosas</Tag><Tag position={[-1.2,-.8,.3]}>Sifão: propulsão a jato</Tag>
    </group>}
    {selected==='artropode'&&<group>
      <mesh position={[0,.72,0]} scale={[.38,.34,.38]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color="#66734a" roughness={.48}/></mesh>
      <mesh position={[0,.05,0]} scale={[.45,.65,.42]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color="#8d754d" roughness={.55}/></mesh>
      <mesh position={[0,-.85,0]} scale={[.36,.48,.35]}><sphereGeometry args={[1,32,24]}/><meshStandardMaterial color="#6d7650" roughness={.5}/></mesh>
      {[-1,1].map(s=>[0,1,2].map(i=><group key={s+'-'+i}><Tube points={[[s*.28,.2-i*.42,0],[s*(.7+i*.08),.12-i*.42,.18],[s*(1.05+i*.1),-.25-i*.42,.18]]} color="#657044" radius={.055}/><mesh position={[s*(1.05+i*.1),-.25-i*.42,.18]} rotation={[0,0,s*.4]}><sphereGeometry args={[.07,12,10]}/><meshStandardMaterial color="#39432d"/></mesh></group>))}
      {[-1,1].map(s=><Tube key={s} points={[[s*.12,1,.05],[s*.28,1.45,.05],[s*.48,1.65,.05]]} color="#4f5941" radius={.025}/>)}
      <mesh position={[-.13,.77,.33]}><sphereGeometry args={[.09,16,12]}/><meshStandardMaterial color="#171c19"/></mesh><mesh position={[.13,.77,.33]}><sphereGeometry args={[.09,16,12]}/><meshStandardMaterial color="#171c19"/></mesh>
      <Tag position={[0,1.95,0]}>Cabeça · tórax · abdome</Tag><Tag position={[1.4,-.8,.2]}>3 pares de pernas</Tag><Tag position={[-1.2,.05,.2]}>Exoesqueleto de quitina</Tag>
    </group>}
    {selected==='vertebrado'&&<group>
      <mesh position={[0,0,0]} scale={[1.45,.48,.53]}><sphereGeometry args={[1,48,32]}/><meshStandardMaterial color="#718f9a" roughness={.42}/></mesh>
      <mesh position={[1.28,.02,0]} rotation={[0,0,-Math.PI/2]}><coneGeometry args={[.35,.7,24]}/><meshStandardMaterial color="#718f9a"/></mesh>
      <mesh position={[-1.48,.08,0]} rotation={[0,0,Math.PI/2]}><coneGeometry args={[.45,.85,3]}/><meshStandardMaterial color="#718f9a"/></mesh>
      {[-.35,.1,.55].map((x,i)=><mesh key={i} position={[x,-.05,.48]} rotation={[0,0,-.4]}><coneGeometry args={[.26,.62,3]}/><meshStandardMaterial color="#587c88" side={THREE.DoubleSide}/></mesh>)}
      <mesh position={[-.55,.18,.48]}><sphereGeometry args={[.075,16,12]}/><meshStandardMaterial color="#1c2526"/></mesh>
      {Array.from({length:7},(_,i)=><mesh key={i} position={[-.15+i*.13,.03,-.48]} rotation={[0,0,.25]}><torusGeometry args={[.16,.025,8,20,Math.PI]}/><meshStandardMaterial color="#b7c3b4"/></mesh>)}
      <Tag position={[0,1,0]}>Peixe ósseo: corpo fusiforme</Tag><Tag position={[1.65,-.65,.1]}>Nadadeiras e cauda</Tag><Tag position={[-.4,-.75,.55]}>Brânquias</Tag>
    </group>}
  </group>
}
function Ecology({selected}:Props) {
  const leafColors=['#355d43','#52764d','#6c8957','#829765']
  return <group>
    <mesh position={[0,-1.25,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[3.35,80]}/><meshStandardMaterial color="#9b8c6e" roughness={1}/></mesh>
    <mesh position={[-1.35,-1.13,.75]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[1.45,64]}/><meshPhysicalMaterial color="#4d8a9b" roughness={.18} metalness={.08}/></mesh>
    <mesh position={[-1.35,-1.1,.75]} rotation={[-Math.PI/2,0,0]}><ringGeometry args={[1.43,1.53,64]}/><meshStandardMaterial color="#667c64" roughness={.9}/></mesh>
    {[-2.45,-1.85,-.1,.8,1.8,2.55].map((x,i)=><group key={i} position={[x,-1.15,-.65+(i%2)*.2]}>
      <mesh position={[0,.78,0]}><cylinderGeometry args={[.09,.2,1.65,16]}/><meshStandardMaterial color="#6e4e35" roughness={1}/></mesh>
      {Array.from({length:9},(_,j)=><mesh key={j} position={[Math.sin(j*2.4)*.42,1.35+Math.cos(j*1.8)*.5,Math.cos(j*2.4)*.38]} scale={[.48,.58,.42]}><sphereGeometry args={[1,24,18]}/><meshStandardMaterial color={leafColors[(i+j)%4]} roughness={1}/></mesh>)}
      {Array.from({length:3},(_,j)=><Tube key={j} points={[[0,.9,0],[Math.sin(j*2)*.45,1.35,Math.cos(j*2)*.35],[Math.sin(j*2)*.7,1.8,Math.cos(j*2)*.5]]} color="#6e4e35" radius={.035}/>)}
    </group>)}
    {Array.from({length:38},(_,i)=><group key={i} position={[-2.9+(i%13)*.47,-1.05,1.35+Math.floor(i/13)*.48]} rotation={[0,0,(i%5-2)*.13]}><mesh position={[0,.23,0]}><cylinderGeometry args={[.012,.025,.48,7]}/><meshStandardMaterial color="#5e7e4c"/></mesh><mesh position={[.09,.42,0]} rotation={[0,0,-.4]} scale={[.16,.29,.045]}><sphereGeometry args={[1,16,10]}/><meshStandardMaterial color={leafColors[i%4]}/></mesh></group>)}
    {Array.from({length:9},(_,i)=><mesh key={i} position={[-2.7+(i%5)*.5,-.93,2.25+Math.floor(i/5)*.28]} scale={[.22,.1,.17]}><dodecahedronGeometry args={[1,1]}/><meshStandardMaterial color={i%2?'#777b70':'#8c8877'} roughness={1}/></mesh>)}
    <mesh position={[2.3,2.35,-.8]}><sphereGeometry args={[.31,32,24]}/><meshStandardMaterial color="#e3bb70" emissive="#bd8b43" emissiveIntensity={.35}/></mesh>
    {Array.from({length:5},(_,i)=><Tube key={i} points={[[2.3,2.35,-.8],[2.3+(i-2)*.42,1.75,-.55],[2.3+(i-2)*.7,1.25,-.3]]} color="#d3b56e" radius={.018}/>)}
    <mesh position={[-1.1,-.86,.85]} rotation={[0,0,.3]}><sphereGeometry args={[.14,18,12]}/><meshStandardMaterial color="#d8a35e"/></mesh>
    <mesh position={[.55,-.88,1.65]} scale={[.18,.1,.13]}><sphereGeometry args={[1,18,12]}/><meshStandardMaterial color="#a97b4f"/></mesh>
    <Tag position={[-1.4,.35,1.05]}>Lago: ambiente aquático</Tag><Tag position={[.2,2.45,.2]}>Dossel da floresta</Tag><Tag position={[2.25,.2,.4]}>Luz solar</Tag>
    {selected==='produtor'&&<Tag position={[.4,.15,1.1]}>Plantas: fotossíntese</Tag>}
    {selected==='consumidor'&&<Tag position={[.55,-.35,1.8]}>Consumidores: obtêm alimento</Tag>}
    {selected==='decompositor'&&<Tag position={[0,-1.35,1.8]}>Fungos e bactérias no solo</Tag>}
    {selected==='agua'&&<Tag position={[-1.6,1.75,.9]}>Evapotranspiração e precipitação</Tag>}
    {selected==='habitat'&&<Tag position={[1.5,-.55,1.1]}>Abrigo, alimento e território</Tag>}
  </group>
}
function Chromosome({position,color='#8c6c9d',scale=1}:{position:[number,number,number];color?:string;scale?:number}) {
  return <group position={position} scale={scale}>
    <Tube points={[[-.22,.42,0],[0,.12,0],[.22,-.18,0],[.22,-.42,0]]} color={color} radius={.075}/>
    <Tube points={[[.22,.42,0],[0,.12,0],[-.22,-.18,0],[-.22,-.42,0]]} color={color} radius={.075}/>
    <mesh position={[0,.12,.02]}><sphereGeometry args={[.09,12,10]}/><meshStandardMaterial color="#d8b36f"/></mesh>
  </group>
}
function CellDivision({selected}:Props) {
  const phase=Math.max(0,['interfase','profase','metafase','anafase','telofase'].indexOf(selected))
  return <group>
    <mesh scale={phase===4?[1.65,.78,.78]:[1.55,1.12,.95]}><sphereGeometry args={[1,48,36]}/><meshPhysicalMaterial color="#b9d4c5" transparent opacity={.2} roughness={.25} side={THREE.DoubleSide}/></mesh>
    {phase===0&&<group>
      <mesh><sphereGeometry args={[.63,32,24]}/><meshStandardMaterial color="#b6a2c4" transparent opacity={.65}/></mesh>
      {Array.from({length:8},(_,i)=><Tube key={i} points={[[Math.sin(i*2)*.2,Math.cos(i*2)*.2,.15],[Math.sin(i*2)*.35,Math.cos(i*2)*.3,.2],[Math.sin(i*2)*.45,Math.cos(i*2)*.4,.15]]} color="#795f91" radius={.025}/>)}<Tag position={[0,.9,0]}>Núcleo · DNA duplicado</Tag>
    </group>}
    {phase>0&&phase<4&&<group>
      <mesh><sphereGeometry args={[.58,32,24]}/><meshStandardMaterial color="#b6a2c4" transparent opacity={.12} wireframe/></mesh>
      {Array.from({length:4},(_,i)=>{
        const x=phase===2?(i-1.5)*.34:phase===3?(i%2===0?-.72:.72):Math.sin(i*1.7)*.5
        const y=phase===2?0:phase===3?(i<2?.25:-.25):Math.cos(i*1.7)*.42
        return <Chromosome key={i} position={[x,y,.15]} color={['#80669b','#c07b80','#718ca8','#b58b55'][i]} scale={.72}/>
      })}
      {[-1,1].map(s=><group key={s} position={[s*1.05,0,0]}><mesh><sphereGeometry args={[.13,20,16]}/><meshStandardMaterial color="#d2a95e"/></mesh>{Array.from({length:4},(_,i)=><Tube key={i} points={[[s*-.1,0,0],[s*-.35,(i-1.5)*.3,.1],[0,(i-1.5)*.42,.1]]} color="#d4b16d" radius={.012}/>)}</group>)}
    </group>}
    {phase===4&&[-.78,.78].map((x,i)=><group key={i} position={[x,0,0]}><mesh><sphereGeometry args={[.58,32,24]}/><meshStandardMaterial color="#b6a2c4" transparent opacity={.5}/></mesh>{Array.from({length:3},(_,j)=><Chromosome key={j} position={[(j-1)*.16,0,.1]} scale={.45} color="#80669b"/>)}</group>)}
    <Tag position={[0,-1.65,0]}>{['Interfase: DNA duplicado','Prófase: cromossomos condensam','Metáfase: alinhamento equatorial','Anáfase: cromátides se separam','Telófase: dois núcleos'][phase]}</Tag>
  </group>
}
function Scene({kind,selected,onSelect,stage}:Props&{kind:Kind}) {
  return <>
    <color attach="background" args={['#eeece4']}/>
    <hemisphereLight args={['#f4f0e3','#59634d',1.25]}/>
    <directionalLight position={[4,7,5]} intensity={2.1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048}/>
    <directionalLight position={[-5,3,-4]} intensity={.85} color="#dce8e0"/>
    <pointLight position={[0,2,4]} intensity={.35} color="#fff1d8"/>
    {kind==='evolucao'&&<Evolution selected={selected} onSelect={onSelect} stage={stage}/>}
    {kind==='zoologia'&&<Zoology selected={selected} onSelect={onSelect} stage={stage}/>}
    {kind==='ecologia'&&<Ecology selected={selected} onSelect={onSelect} stage={stage}/>}
    {kind==='divisao-celular'&&<CellDivision selected={selected} onSelect={onSelect} stage={stage}/>}
    <OrbitControls makeDefault enablePan={false} minDistance={3.5} maxDistance={9}/>
  </>
}
const titles:Record<Kind,{title:string;intro:string;hint:string}> = {
  evolucao:{title:'Como as populações evoluem',intro:'Observe a variação entre indivíduos e acompanhe como o ambiente altera a frequência de características ao longo das gerações.',hint:'Arraste para girar · role para aproximar · avance pelas etapas'},
  zoologia:{title:'Diversidade do reino animal',intro:'Compare planos corporais e estruturas que ajudam a reconhecer os principais grupos de animais.',hint:'Escolha um grupo para trocar o modelo · gire para observar a forma'},
  ecologia:{title:'Um ecossistema em três dimensões',intro:'Explore como os componentes vivos e não vivos se relacionam em um ambiente. A energia flui; a matéria é reciclada.',hint:'Gire o ambiente e selecione os conceitos para entender as relações'},
  'divisao-celular':{title:'A divisão celular por dentro',intro:'Acompanhe as mudanças na célula durante a mitose. Cada etapa altera a organização dos cromossomos e do núcleo.',hint:'Avance pelas fases e observe o destino dos cromossomos'}
}
function Atlas({kind}:{kind:Kind}) {
  const [index,setIndex]=useState(0)
  const [stage,setStage]=useState(0)
  const items=content[kind]
  const active=items[index]
  const info=titles[kind]
  const choose=(i:number)=>{setIndex(i);setStage(i)}
  return <section className="mb-12" aria-label={'Modelo 3D interativo: '+info.title}>
    <header className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#71816f]">Atlas de biologia · laboratório 3D</p><h2 className="font-display text-3xl font-semibold tracking-tight text-[#29372e] sm:text-4xl">{info.title}</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#727a70]">{info.intro}</p></div>
      <span className="w-fit border-b border-[#aab5a9] pb-1 text-[10px] font-medium text-[#66736a]">MODELO INTERATIVO · 3D</span>
    </header>
    <div className="overflow-hidden border-y border-[#d9d7cd] bg-[#f5f3eb]">
      <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(290px,.75fr)]">
        <div className="relative min-h-[430px] border-b border-[#d9d7cd] bg-[radial-gradient(ellipse_at_50%_45%,#fffdf7_0%,#eeece4_75%,#e6e4dc_100%)] lg:border-b-0 lg:border-r">
          <div className="absolute left-5 top-4 z-10"><p className="text-[9px] font-semibold uppercase tracking-[.18em] text-[#849087]">Vista de exploração</p><p className="mt-1 text-xs font-semibold text-[#425449]">{active.name}</p></div>
          <Canvas camera={{position:[4.8,2.8,6.4],fov:38}} dpr={[1,1.75]} shadows gl={{antialias:true,alpha:true}}><Scene kind={kind} selected={active.id} onSelect={(id)=>{const i=items.findIndex(d=>d.id===id);if(i>=0)choose(i)}} stage={stage}/></Canvas>
          <div className="absolute bottom-3 left-4 right-4 text-center text-[10px] text-[#7c887d]">{info.hint}</div>
        </div>
        <aside className="flex min-h-[430px] flex-col bg-[#fbfaf6] p-5 sm:p-7" aria-live="polite">
          <p className="text-[10px] font-semibold uppercase tracking-[.18em] text-[#849087]">{active.subtitle}</p><h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#2b392f]">{active.name}</h3>
          <div className="my-4 h-px bg-[#e8e9e1]"/><p className="text-sm leading-7 text-[#526057]">{active.body}</p>
          <div className="mt-5 border-l-2 pl-4" style={{borderColor:active.color}}><p className="mb-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#829087]">Para lembrar no ENEM</p><p className="text-xs leading-6 text-[#56665a]">{active.enem}</p></div>
          <div className="mt-auto border-t border-[#e8e9e1] pt-5"><p className="mb-3 text-[9px] font-bold uppercase tracking-[.16em] text-[#929b91]">Explore o conteúdo</p><div className="flex flex-wrap gap-2">{items.map((item,i)=><button key={item.id} type="button" onClick={()=>choose(i)} aria-pressed={index===i} className={index===i?'border px-3 py-2 text-xs font-semibold text-white':'border border-[#dedfd6] bg-white px-3 py-2 text-xs text-[#58665b] transition-colors hover:border-[#9caf9b]'} style={index===i?{backgroundColor:item.color,borderColor:item.color}:undefined}>{item.name}</button>)}</div></div>
        </aside>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d9d7cd] bg-[#eeece3] px-5 py-4">
        <span className="text-[10px] text-[#758075]">Representação didática esquemática · use o mouse ou o toque para explorar</span>
        <div className="flex items-center gap-2"><button type="button" onClick={()=>choose(Math.max(0,index-1))} disabled={index===0} className="border border-[#d1d0c6] bg-[#fbfaf6] px-3 py-2 text-xs text-[#58665b] disabled:opacity-40">Anterior</button><span className="min-w-[44px] text-center text-[10px] tabular-nums text-[#748075]">{index+1} / {items.length}</span><button type="button" onClick={()=>choose(Math.min(items.length-1,index+1))} disabled={index===items.length-1} className="border border-[#d1d0c6] bg-[#fbfaf6] px-3 py-2 text-xs text-[#58665b] disabled:opacity-40">Próximo</button></div>
      </div>
    </div>
  </section>
}
export const BiologyLearning3D=dynamic(()=>Promise.resolve(Atlas),{ssr:false})
