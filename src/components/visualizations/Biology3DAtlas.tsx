'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, useMemo, useState } from 'react'
import * as THREE from 'three'
import type { ThreeElements } from '@react-three/fiber'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}

type Variant = 'botanica' | 'dna' | 'mendel'
type Detail = { id: string; name: string; subtitle: string; color: string; location: string; function: string; enem: string }

const plantDetails: Detail[] = [
  { id: 'raiz', name: 'Raiz', subtitle: 'Fixação e absorção', color: '#b87945', location: 'Geralmente abaixo do solo, ligada à base do caule.', function: 'Fixa a planta ao substrato e absorve água e sais minerais. Em algumas espécies, também armazena reservas, como a cenoura e a mandioca.', enem: 'A absorção ocorre principalmente na região dos pelos absorventes. A água entra por osmose, acompanhando o gradiente de potencial hídrico.' },
  { id: 'xilema', name: 'Xilema', subtitle: 'Seiva bruta', color: '#3b82b5', location: 'Tecido vascular que percorre raízes, caule e folhas.', function: 'Transporta água e sais minerais das raízes em direção às folhas. A transpiração foliar ajuda a manter essa coluna de água em movimento.', enem: 'Xilema conduz seiva bruta, predominantemente no sentido raiz → folhas. Seus elementos condutores são células mortas na maturidade.' },
  { id: 'floema', name: 'Floema', subtitle: 'Seiva elaborada', color: '#d58b37', location: 'Tecido vascular distribuído por todos os órgãos da planta.', function: 'Distribui açúcares e outras substâncias orgânicas produzidas ou armazenadas pela planta. O transporte vai de regiões fonte para regiões dreno.', enem: 'Não memorize como um fluxo obrigatoriamente descendente: o floema pode transportar em diferentes direções, conforme a relação fonte–dreno.' },
  { id: 'folha', name: 'Folha', subtitle: 'Principal órgão fotossintético', color: '#4d9b61', location: 'Ligada ao caule pelos pecíolos ou diretamente, dependendo da espécie.', function: 'Capta luz e realiza trocas gasosas. No mesófilo, os cloroplastos fazem fotossíntese; os estômatos regulam a entrada de CO₂ e a saída de vapor de água.', enem: 'A clorofila absorve principalmente luz azul e vermelha e reflete mais a luz verde. Por isso, a maioria das folhas parece verde.' },
  { id: 'estomato', name: 'Estômatos', subtitle: 'Controle das trocas gasosas', color: '#72b6a0', location: 'Na epiderme das folhas e, em alguns grupos, também em caules jovens.', function: 'Poros delimitados por células-guarda. Permitem entrada de CO₂ e saída de O₂ e vapor de água; sua abertura varia conforme luz, disponibilidade hídrica e sinais hormonais.', enem: 'Na seca, o ácido abscísico favorece o fechamento estomático, reduzindo a perda de água — mas também limita a entrada de CO₂ e pode diminuir a fotossíntese.' },
  { id: 'flor', name: 'Flor', subtitle: 'Estrutura reprodutiva', color: '#d77ba8', location: 'Estrutura reprodutiva característica das angiospermas.', function: 'Reúne estruturas que participam da reprodução sexuada. O androceu produz grãos de pólen; o gineceu contém ovário e óvulos.', enem: 'Após a fecundação, o ovário geralmente origina o fruto e o óvulo origina a semente. Polinização é transporte do pólen; não é sinônimo de fecundação.' },
  { id: 'fruto', name: 'Fruto e semente', subtitle: 'Proteção e dispersão', color: '#d49b45', location: 'O fruto desenvolve-se a partir do ovário; a semente, a partir do óvulo fecundado.', function: 'O fruto protege as sementes e pode favorecer sua dispersão. A semente contém o embrião, reservas nutritivas e envoltórios protetores.', enem: 'Fruto não é qualquer estrutura comestível: botanicamente, é o ovário desenvolvido. Maçã e morango incluem tecidos acessórios e são exemplos de pseudofrutos.' },
]

const dnaDetails: Detail[] = [
  { id: 'dna', name: 'DNA — dupla hélice', subtitle: 'Armazenamento da informação', color: '#3c8cbb', location: 'Em eucariontes, principalmente no núcleo; também existe DNA em mitocôndrias e cloroplastos.', function: 'É formado por duas fitas antiparalelas de nucleotídeos. A sequência das bases nitrogenadas guarda a informação hereditária.', enem: 'Adenina pareia com timina (A–T) e citosina com guanina (C–G). As duas fitas são complementares.' },
  { id: 'gene', name: 'Gene', subtitle: 'Trecho funcional do DNA', color: '#8d75bd', location: 'É uma região do DNA localizada em um cromossomo.', function: 'Contém informação para produzir um RNA funcional e, em muitos casos, orientar a produção de uma proteína. A expressão gênica depende de regulação.', enem: 'Gene não é sinônimo de característica pronta: ambiente e regulação da expressão também influenciam o fenótipo.' },
  { id: 'bases', name: 'Bases nitrogenadas', subtitle: 'A, T, C e G', color: '#d58b37', location: 'Ficam voltadas para o interior da dupla hélice, pareadas entre as duas fitas.', function: 'A ordem das bases constitui a sequência genética. As pontes de hidrogênio estabilizam o pareamento: A–T forma duas e C–G forma três.', enem: 'No RNA, a uracila (U) ocupa o lugar da timina. O pareamento durante a transcrição envolve A–U e C–G.' },
  { id: 'nucleotideo', name: 'Nucleotídeo', subtitle: 'Unidade do DNA e RNA', color: '#4d9b61', location: 'Cada fita é uma cadeia de nucleotídeos unidos por ligações fosfodiéster.', function: 'Cada nucleotídeo possui um açúcar, um grupo fosfato e uma base nitrogenada. No DNA, o açúcar é desoxirribose; no RNA, ribose.', enem: 'Nucleosídeo = açúcar + base. Nucleotídeo = açúcar + base + fosfato.' },
  { id: 'cromossomo', name: 'Cromossomo', subtitle: 'DNA associado a proteínas', color: '#d77ba8', location: 'No núcleo das células eucarióticas; também há cromossomos em procariontes.', function: 'É DNA associado a proteínas, especialmente histonas nos eucariontes. A compactação organiza o material genético e permite sua distribuição na divisão celular.', enem: 'Após a duplicação, um cromossomo pode apresentar duas cromátides-irmãs unidas pelo centrômero. Cromátides não são cromossomos homólogos.' },
  { id: 'replicacao', name: 'Replicação', subtitle: 'Cópia semiconservativa', color: '#b87945', location: 'Ocorre antes da divisão celular; em eucariontes, durante a fase S da intérfase.', function: 'Cada fita antiga serve de molde para a síntese de uma fita nova. Ao final, formam-se duas moléculas de DNA com uma fita original e uma recém-sintetizada.', enem: 'A replicação é semiconservativa. A DNA polimerase adiciona nucleotídeos no sentido 5′ → 3′.' },
]

const mendelDetails: Detail[] = [
  { id: 'cromossomos', name: 'Cromossomos homólogos', subtitle: 'Um de origem materna e outro paterna', color: '#3c8cbb', location: 'Formam pares nas células diploides, ocupando posições correspondentes.', function: 'Carregam genes para os mesmos caracteres nos mesmos loci, embora possam apresentar alelos diferentes.', enem: 'Homólogos não são cópias idênticas: um veio de cada genitor e eles podem carregar alelos distintos.' },
  { id: 'alelos', name: 'Alelos', subtitle: 'Versões de um mesmo gene', color: '#8d75bd', location: 'Ocupam o mesmo locus em cromossomos homólogos.', function: 'São variantes de um gene. Em um indivíduo diploide, um par de alelos pode ser AA, Aa ou aa em um modelo de herança simples.', enem: 'Dominância descreve a relação entre alelos no heterozigoto; não significa que um alelo seja melhor ou mais comum.' },
  { id: 'meiose', name: 'Meiose', subtitle: 'Separação dos alelos', color: '#4d9b61', location: 'Ocorre nas células germinativas que originam gametas nos animais.', function: 'Na meiose I, os cromossomos homólogos se separam. Assim, cada gameta recebe apenas um alelo de cada par.', enem: 'A segregação dos alelos explica a 1ª Lei de Mendel: cada gameta recebe apenas um dos alelos de cada gene.' },
  { id: 'gametas', name: 'Gametas', subtitle: 'Células haploides', color: '#d58b37', location: 'Espermatozoides e óvulos nos animais.', function: 'Carregam um conjunto haploide de cromossomos. Na fecundação, os conjuntos se unem e restauram a diploidia.', enem: 'Um indivíduo Aa forma, em um modelo simples, 50% de gametas A e 50% de gametas a.' },
  { id: 'punnett', name: 'Quadrado de Punnett', subtitle: 'Previsão de probabilidades', color: '#d77ba8', location: 'É uma ferramenta de representação dos possíveis encontros entre gametas.', function: 'No cruzamento Aa × Aa, cada genitor pode fornecer A ou a. As combinações possíveis são AA, Aa, Aa e aa.', enem: 'Proporção genotípica: 1 AA : 2 Aa : 1 aa. Com dominância completa, proporção fenotípica: 3 : 1.' },
]

function PlantModel({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const leaf = (position: [number, number, number], rotation: [number, number, number], scale = 1) => (
    <mesh position={position} rotation={rotation} scale={scale} onPointerOver={() => onSelect('')} onClick={() => onSelect('')} castShadow>
      <sphereGeometry args={[0.72, 24, 16]} />
      <meshStandardMaterial color={selected === 'folha' ? '#a8df8e' : '#438e55'} roughness={0.72} />
    </mesh>
  )
  return <group>
    <mesh position={[0, 0.25, 0]} castShadow onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.13, 0.22, 2.7, 16]} />
      <meshStandardMaterial color={selected === 'xilema' ? '#75bde7' : '#668b4c'} />
    </mesh>
    {leaf([-0.85, 0.8, 0], [0, 0, 0.65], 1.1)}
    {leaf([0.85, 1.05, 0], [0, 0, -0.65], 1.1)}
    {leaf([-0.7, 1.75, 0], [0, 0, 0.55], 0.9)}
    {leaf([0.7, 2.0, 0], [0, 0, -0.55], 0.9)}
    <mesh position={[0, 2.65, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.3, 24, 18]} />
      <meshStandardMaterial color={selected === 'flor' ? '#f6a9ce' : '#d98bb2'} />
    </mesh>
    {Array.from({ length: 6 }).map((_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 3) * 0.36, 2.65, Math.sin(i * Math.PI / 3) * 0.36]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.2, 16, 12]} />
      <meshStandardMaterial color="#f2c4d9" />
    </mesh>)}
    <mesh position={[0, -1.25, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.035, 0.12, 2.2, 10]} />
      <meshStandardMaterial color={selected === 'raiz' ? '#d7a16e' : '#9b6946'} />
    </mesh>
    {Array.from({ length: 7 }).map((_, i) => <mesh key={i} position={[(i - 3) * 0.17, -1.55 - Math.abs(i - 3) * 0.08, 0]} rotation={[0, 0, (i - 3) * 0.18]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.025, 0.012, 0.85, 8]} />
      <meshStandardMaterial color="#b17c54" />
    </mesh>)}
    <mesh position={[0, -0.05, 0.02]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.17, 0.24, 2.3, 16, 1, true]} />
      <meshStandardMaterial color={selected === 'floema' ? '#f0b45e' : '#d18b43'} side={THREE.DoubleSide} transparent opacity={0.72} />
    </mesh>
    <mesh position={[0, 0.1, 0.24]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.07, 0.07, 2.15, 12]} />
      <meshStandardMaterial color="#78b9df" />
    </mesh>
    <mesh position={[1.55, 0.15, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.34, 24, 20]} />
      <meshStandardMaterial color={selected === 'fruto' ? '#f4c76b' : '#d68b39'} />
    </mesh>
    <mesh position={[-1.45, 0.8, 0.2]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.22, 20, 16]} />
      <meshStandardMaterial color={selected === 'estomato' ? '#9bd9c1' : '#6ba78f'} />
    </mesh>
  </group>
}

function DnaModel({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const pairs = useMemo(() => Array.from({ length: 25 }, (_, i) => {
    const t = i / 24
    const a = t * Math.PI * 5
    return { y: (t - 0.5) * 4.8, x1: Math.cos(a) * 0.72, z1: Math.sin(a) * 0.72, x2: -Math.cos(a) * 0.72, z2: -Math.sin(a) * 0.72, color: ['#e4a24b', '#4c9bc4', '#d77ba8', '#8e79bb'][i % 4] }
  }), [])
  return <group>
    {pairs.map((p, i) => <group key={i}>
      <mesh position={[p.x1, p.y, p.z1]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
        <sphereGeometry args={[0.105, 12, 10]} />
        <meshStandardMaterial color="#3f8fb8" />
      </mesh>
      <mesh position={[p.x2, p.y, p.z2]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
        <sphereGeometry args={[0.105, 12, 10]} />
        <meshStandardMaterial color="#d477a2" />
      </mesh>
      <mesh position={[(p.x1 + p.x2) / 2, p.y, (p.z1 + p.z2) / 2]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
        <cylinderGeometry args={[0.035, 0.035, 1.44, 8]} />
        <meshStandardMaterial color={p.color} />
      </mesh>
    </group>)}
    <mesh position={[0, 0, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <cylinderGeometry args={[0.95, 0.95, 1.25, 48, 1, true]} />
      <meshStandardMaterial color={selected === 'gene' ? '#b69adf' : '#d7c4ec'} transparent opacity={0.13} side={THREE.DoubleSide} />
    </mesh>
    <mesh position={[1.45, 0, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.18, 18, 14]} />
      <meshStandardMaterial color="#75b67c" />
    </mesh>
    <mesh position={[-1.45, 0, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.18, 18, 14]} />
      <meshStandardMaterial color="#d6a45b" />
    </mesh>
  </group>
}

function ChromosomeModel({ selected }: { selected: string }) {
  return <group rotation={[0, 0, -0.12]}>
    {[-1, 1].map((side) => <group key={side} position={[side * 0.28, 0, 0]} rotation={[0, 0, side * 0.12]}>
      <mesh position={[0, 0.72, 0]} rotation={[0, 0, side * 0.52]}>
        <capsuleGeometry args={[0.18, 1.25, 8, 16]} />
        <meshStandardMaterial color={selected === 'alelos' ? '#b69adf' : side === -1 ? '#4d9ac1' : '#d77ba8'} />
      </mesh>
      <mesh position={[0, -0.72, 0]} rotation={[0, 0, -side * 0.52]}>
        <capsuleGeometry args={[0.18, 1.25, 8, 16]} />
        <meshStandardMaterial color={selected === 'alelos' ? '#b69adf' : side === -1 ? '#4d9ac1' : '#d77ba8'} />
      </mesh>
    </group>)}
    <mesh position={[0, 0, 0.1]}>
      <sphereGeometry args={[0.22, 20, 16]} />
      <meshStandardMaterial color="#e7bd69" />
    </mesh>
  </group>
}

function MendelModel({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return <group>
    <group onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <ChromosomeModel selected={selected} />
    </group>
    <mesh position={[-1.2, 0.8, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.23, 20, 16]} />
      <meshStandardMaterial color="#4d9ac1" />
    </mesh>
    <mesh position={[1.2, 0.8, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.23, 20, 16]} />
      <meshStandardMaterial color="#d77ba8" />
    </mesh>
    <mesh position={[-1.2, -0.8, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.23, 20, 16]} />
      <meshStandardMaterial color="#4d9ac1" />
    </mesh>
    <mesh position={[1.2, -0.8, 0]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <sphereGeometry args={[0.23, 20, 16]} />
      <meshStandardMaterial color="#d77ba8" />
    </mesh>
    {[-1, 1].map((x) => [-1, 1].map((z) => <mesh key={x + ':' + z} position={[x * 0.24, -1.9, z * 0.24]} onPointerOver={() => onSelect('')} onClick={() => onSelect('')}>
      <boxGeometry args={[0.44, 0.12, 0.44]} />
      <meshStandardMaterial color={selected === 'punnett' ? '#e8bd78' : '#d5b16d'} />
    </mesh>))}
  </group>
}

function Scene({ variant, selected, onSelect }: { variant: Variant; selected: string; onSelect: (id: string) => void }) {
  return <>
    <ambientLight intensity={1.15} />
    <directionalLight position={[4, 7, 5]} intensity={2.1} castShadow />
    <pointLight position={[-4, 2, -3]} intensity={0.65} color="#d7e9ff" />
    {variant === 'botanica' ? <PlantModel selected={selected} onSelect={onSelect} /> : variant === 'dna' ? <DnaModel selected={selected} onSelect={onSelect} /> : <MendelModel selected={selected} onSelect={onSelect} />}
    <OrbitControls enablePan={false} minDistance={3.2} maxDistance={8} />
  </>
}

export function Biology3DAtlas({ variant }: { variant: Variant }) {
  const details = variant === 'botanica' ? plantDetails : variant === 'dna' ? dnaDetails : mendelDetails
  const [selected, setSelected] = useState(details[0].id)
  useEffect(() => setSelected(details[0].id), [variant])
  const active = details.find(item => item.id === selected) || details[0]
  const heading = variant === 'botanica' ? 'Anatomia e funcionamento das plantas' : variant === 'dna' ? 'Do DNA ao funcionamento dos genes' : 'Como os alelos são herdados'

  return <section className="mb-14" aria-label="Atlas biológico tridimensional interativo">
    <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#66816d]">Laboratório de biologia · modelo 3D</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-[#26352b] sm:text-4xl">{heading}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68766d]">Gire o modelo com o mouse, aproxime e selecione os conceitos para explorar cada estrutura com explicações completas.</p>
      </div>
      <span className="rounded-full border border-[#dce5d9] bg-[#f2f7ef] px-3 py-2 text-[11px] font-semibold text-[#52765a]">Interativo · arraste para girar</span>
    </div>
    <div className="overflow-hidden rounded-[26px] border border-[#dce0d6] bg-[#f7f7f1] shadow-[0_18px_55px_-35px_rgba(30,55,38,.38)]">
      <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,.8fr)]">
        <div className="relative min-h-[420px] border-b border-[#dce0d6] bg-[radial-gradient(ellipse_at_50%_45%,#fff_0%,#f0f3e9_72%,#e8ede2_100%)] lg:border-b-0 lg:border-r">
          <div className="absolute left-5 top-5 z-10">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#849087]">Modelo tridimensional</p>
            <p className="mt-1 text-xs font-semibold text-[#425449]">{active.name}</p>
          </div>
          <Canvas camera={{ position: [4.2, 2.4, 5.2], fov: 42 }} shadows dpr={[1, 1.6]}>
            <Scene variant={variant} selected={selected} onSelect={setSelected} />
          </Canvas>
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#7c887d]">
            <span>Arraste: girar · Rodinha: aproximar</span><span>Modelo didático, sem escala</span>
          </div>
        </div>
        <aside className="flex min-h-[420px] flex-col bg-[#fffefa] p-5 sm:p-7" aria-live="polite">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#849087]">Ficha de estudo</span>
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: active.color }} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[#829087]">{active.subtitle}</p>
          <h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-[#2b392f]">{active.name}</h3>
          <div className="my-4 h-px bg-[#e8e9e1]" />
          <div className="space-y-4">
            <div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#929b91]">Onde fica</p><p className="text-sm leading-6 text-[#526057]">{active.location}</p></div>
            <div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#929b91]">O que faz</p><p className="text-sm leading-6 text-[#526057]">{active.function}</p></div>
            <div className="rounded-xl border border-[#e4e9df] bg-[#f5f8f1] p-3.5"><p className="mb-1 text-[10px] font-bold uppercase tracking-[.15em] text-[#65806a]">Atenção no ENEM</p><p className="text-xs leading-5 text-[#56665a]">{active.enem}</p></div>
          </div>
          <div className="mt-auto pt-5"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#929b91]">Explore outro conceito</p><div className="flex flex-wrap gap-2">
            {details.map(item => <button key={item.id} type="button" onClick={() => setSelected(item.id)} aria-pressed={selected === item.id} className={selected === item.id ? 'rounded-full border px-3 py-2 text-xs font-semibold text-white' : 'rounded-full border border-[#dce2d8] bg-white px-3 py-2 text-xs text-[#58665b] transition-colors hover:border-[#9caf9b]'} style={selected === item.id ? { backgroundColor: item.color, borderColor: item.color } : undefined}>{item.name}</button>)}
          </div></div>
        </aside>
      </div>
    </div>
    <p className="mt-3 text-[10px] leading-5 text-[#899188]">Visualização tridimensional educativa. As formas são modelos esquemáticos para facilitar a compreensão das relações entre as estruturas.</p>
  </section>
}
