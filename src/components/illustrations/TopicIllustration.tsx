'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CellIllustration, DNAIllustration, MitosisIllustration } from '@/components/illustrations'
import { InteractiveDiagram, type DiagramSpec } from './InteractiveDiagram'
import {
  photosynthesis,
  plantHormones,
  flowerStructure,
  seedDispersal,
} from './specs/botanica'
import {
  punnettSquare,
  pedigree,
  replication,
  transcription,
  translation,
  meiosisComparison,
} from './specs/genetica'

interface TopicIllustrationProps {
  illustrations: string[]
  topicId?: string
}

const topicVisualizations: Record<string, { label: string; spec: DiagramSpec }[]> = {
  botanica: [
    { label: 'Fotossíntese', spec: photosynthesis },
    { label: 'Hormônios vegetais', spec: plantHormones },
    { label: 'Anatomia da flor', spec: flowerStructure },
    { label: 'Dispersão de sementes', spec: seedDispersal },
  ],
  'dna-rna-proteina': [
    { label: 'Replicação', spec: replication },
    { label: 'Transcrição', spec: transcription },
    { label: 'Tradução', spec: translation },
  ],
  'genetica-mendeliana': [
    { label: 'Quadrado de Punnett', spec: punnettSquare },
    { label: 'Heredograma', spec: pedigree },
    { label: 'Meiose', spec: meiosisComparison },
  ],
  biotecnologia: [
    { label: 'Replicação', spec: replication },
    { label: 'Transcrição', spec: transcription },
    { label: 'Tradução', spec: translation },
  ],
}

// Mapeamento de nomes técnicos para labels em português
const illustrationLabels: Record<string, string> = {
  'cell-animal': 'Célula Animal',
  'cell-vegetal': 'Célula Vegetal',
  'cell-bacteria': 'Bactéria (Procarionte)',
  'dna-structure': 'Estrutura do DNA',
  'replication': 'Replicação do DNA',
  'transcription': 'Transcrição',
  'translation': 'Tradução / Síntese Proteica',
  'mitosis-all': 'Mitose (Todas as Fases)',
  'meiosis-comparison': 'Mitose vs Meiose',
}

const getIllustrationComponent = (name: string) => {
  switch (name) {
    case 'cell-animal':
      return <CellIllustration type="animal" size="lg" />
    case 'cell-vegetal':
      return <CellIllustration type="vegetal" size="lg" />
    case 'cell-bacteria':
      return <CellIllustration type="bacteria" size="lg" />
    case 'dna-structure':
      return <DNAIllustration size="lg" showLabels />
    case 'replication':
    case 'transcription':
    case 'translation':
      return <DNAIllustration size="lg" showLabels />
    case 'mitosis-all':
    case 'meiosis-comparison':
      return <MitosisIllustration size="lg" phase="all" />
    default:
      return <CellIllustration type="animal" size="lg" />
  }
}

export function TopicIllustration({ illustrations, topicId }: TopicIllustrationProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const visualizations = topicId ? topicVisualizations[topicId] : undefined

  if (visualizations?.length) {
    const active = visualizations[Math.min(activeIndex, visualizations.length - 1)]
    return (
      <section className="mb-12" aria-label="Visualização interativa do conteúdo">
        <div className="overflow-hidden rounded-[26px] border border-[#dedbd2] bg-[#fbfaf6] shadow-[0_18px_55px_-38px_rgba(44,55,47,.42)]">
          <div className="border-b border-[#e8e5dc] px-5 py-5 sm:px-7 sm:py-6">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-[#71816f]">
              <span className="h-px w-6 bg-[#71816f]" />
              Caderno visual · biologia interativa
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-[#29372e] sm:text-3xl">
                  Visualização interativa
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#727a70]">
                  Explore o esquema, selecione as estruturas e abra cada explicação. Os detalhes foram organizados para acompanhar o conteúdo do tópico.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e1e6dc] bg-[#f1f5ed] px-3 py-2 text-[10px] font-semibold text-[#5c765f]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#729779]" />
                Selecione uma parte do esquema
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Modelos interativos">
              {visualizations.map((item, index) => (
                <button
                  key={item.spec.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === index}
                  onClick={() => setActiveIndex(index)}
                  className={activeIndex === index
                    ? 'rounded-full border border-[#486b50] bg-[#486b50] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all'
                    : 'rounded-full border border-[#e0dfd6] bg-white px-4 py-2.5 text-xs font-medium text-[#687268] transition-all hover:border-[#9eaf9b] hover:bg-[#f6f8f2]'}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={active.spec.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="px-3 py-5 sm:px-6 sm:py-7"
          >
            <InteractiveDiagram spec={active.spec} />
          </motion.div>
        </div>
      </section>
    )
  }

  if (illustrations.length === 0) return null
  const safeIndex = Math.min(activeIndex, illustrations.length - 1)
  const activeIllustration = illustrations[safeIndex]

  return (
    <section className="mb-12">
      <div className="card-base p-6 lg:p-8 text-center">
        <h2 className="text-display-sm font-display font-semibold text-tinta-900 mb-6">
          Visualização interativa
        </h2>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-2xl mx-auto min-h-[300px]">
            <motion.div
              key={activeIllustration}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full"
            >
              {getIllustrationComponent(activeIllustration)}
            </motion.div>
          </div>
          {illustrations.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center" role="tablist" aria-label="Ilustrações">
              {illustrations.map((ill, i) => (
                <button
                  key={ill}
                  role="tab"
                  type="button"
                  aria-selected={i === safeIndex}
                  aria-label={illustrationLabels[ill] || ill.replace(/-/g, ' ')}
                  onClick={() => setActiveIndex(i)}
                  className={safeIndex === i
                    ? 'px-4 py-1.5 text-sm font-medium rounded-organic bg-verde-600 text-papel-50 shadow-md'
                    : 'px-4 py-1.5 text-sm font-medium rounded-organic bg-papel-200 text-tinta-600 hover:bg-papel-300'}
                >
                  {illustrationLabels[ill] || ill.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
