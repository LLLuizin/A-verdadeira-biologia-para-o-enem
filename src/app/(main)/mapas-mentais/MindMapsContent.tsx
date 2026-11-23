'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon, Card, CardContent, Badge, Button } from '@/components/ui'
import { topics, categories, getTopicsByCategory } from '@/content/topics'
import { MindMapIllustration } from './MindMapIllustrations'
import { cn } from '@/lib/utils'

interface CategoryData {
  id: string
  name: string
  icon: string
  color: string
  topics: typeof topics
}

const categoryData: CategoryData[] = categories.map(cat => ({
  ...cat,
  topics: getTopicsByCategory(cat.id as any),
}))

function getCategoryColor(color: string): string {
  const colorMap: Record<string, string> = {
    verde: 'from-verde-500 to-musgo-600',
    argila: 'from-argila-500 to-terra-600',
    flor: 'from-flor-500 to-rubi-600',
    musgo: 'from-musgo-500 to-verde-600',
    terra: 'from-terra-500 to-argila-600',
    ceu: 'from-ceu-500 to-verde-600',
  }
  return colorMap[color] || 'from-verde-500 to-musgo-600'
}

function getCategoryTone(color: string): 'verde' | 'musgo' | 'terra' | 'argila' | 'flor' | 'ceu' {
  const toneMap: Record<string, 'verde' | 'musgo' | 'terra' | 'argila' | 'flor' | 'ceu'> = {
    verde: 'verde',
    argila: 'argila',
    flor: 'flor',
    musgo: 'musgo',
    terra: 'terra',
    ceu: 'ceu',
  }
  return toneMap[color] || 'verde'
}

export function MindMapsContent() {
  const [activeCategory, setActiveCategory] = useState<string>('celular')
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null)

  const currentCategory = categoryData.find(c => c.id === activeCategory)
  const currentTopics = currentCategory?.topics || []
  const activeTopic = activeTopicId ? currentTopics.find(t => t.id === activeTopicId) : currentTopics[0] || null

  return (
    <div className="section">
      <div className="container-custom">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="verde" className="text-sm mb-4 inline-flex items-center gap-1.5">
              <Icon name="sparkles" size="sm" />
              Mapas Mentais Interativos
            </Badge>
            <h1 className="text-display-xl font-display font-semibold text-tinta-900 mb-4 text-balance">
              Visualize a biologia <span className="text-gradient">conectada</span>
            </h1>
            <p className="text-lead text-tinta-600">
              Cada mapa mental organiza os conceitos-chave do tópico em uma estrutura visual.
              Clique nos nós para expandir, explore conexões e entenda como tudo se relaciona.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="overflow-x-auto pb-4 -mx-4 px-4">
            <div className="flex gap-3 min-w-max">
              {categoryData.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    const firstTopic = getTopicsByCategory(cat.id as any)[0]
                    setActiveTopicId(firstTopic?.id || null)
                  }}
                  className={cn(
                    'inline-flex items-center gap-2 whitespace-nowrap rounded-organic px-5 py-2.5 text-sm font-medium transition-all',
                    activeCategory === cat.id
                      ? 'bg-gradient-to-r text-papel-50 shadow-medium'
                      : 'bg-papel-100 text-tinta-700 hover:bg-papel-200 hover:text-tinta-900 border border-papel-200'
                  )}
                  style={{
                    backgroundImage: activeCategory === cat.id ? `linear-gradient(to right, var(--color-${cat.color}-500), var(--color-${cat.color}-600))` : 'none',
                  }}
                >
                  <Icon name={cat.icon} size="sm" />
                  {cat.name}
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/30 backdrop-blur-sm">
                    {cat.topics.length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Sidebar - Topic List */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-3"
          >
            <div className="card-base p-4">
              <h2 className="font-display font-semibold text-tinta-900 mb-4 flex items-center gap-2">
                <Icon name="book" size="md" className="text-verde-600" />
                Tópicos desta área
              </h2>
              <div className="space-y-2" role="list" aria-label="Lista de tópicos">
                {currentTopics.map((topic, i) => (
                  <motion.button
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => setActiveTopicId(topic.id)}
                    className={cn(
                      'w-full text-left p-4 rounded-organic transition-all duration-200',
                      activeTopicId === topic.id
                        ? 'bg-gradient-to-r text-papel-50 shadow-medium'
                        : 'bg-papel-50 hover:bg-papel-100 text-tinta-900 border border-papel-200'
                    )}
                    style={{
                      backgroundImage: activeTopicId === topic.id
                        ? `linear-gradient(to right, var(--color-${currentCategory?.color}-500), var(--color-${currentCategory?.color}-600))`
                        : 'none',
                      borderLeft: activeTopicId === topic.id ? '4px solid white' : 'none',
                    }}
                    role="listitem"
                    aria-current={activeTopicId === topic.id ? 'true' : 'false'}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-8 h-8 rounded-organic flex items-center justify-center shrink-0 flex-shrink-0',
                        activeTopicId === topic.id ? 'bg-white/30 text-papel-50' : 'bg-papel-200 text-tinta-600'
                      )}>
                        <Icon name={currentCategory?.icon || 'book'} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm leading-snug truncate">{topic.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getCategoryTone(currentCategory?.color || 'verde')} className="!text-xs !py-0.5 !px-2">
                            {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)}
                          </Badge>
                          <span className="flex items-center gap-0.5 text-xs text-tinta-500">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Icon key={i} name={i < topic.frequency ? 'star' : 'starEmpty'} size="xs" className={i < topic.frequency ? 'text-argila-500 fill-current' : 'text-papel-300'} />
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Legend / Key Concepts */}
            {activeTopic && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card-base p-4"
              >
                <h3 className="font-display font-semibold text-tinta-900 mb-3 flex items-center gap-2">
                  <Icon name="info" size="md" className="text-argila-500" />
                  Conceitos-chave
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activeTopic.keywords.slice(0, 8).map((kw, i) => (
                    <motion.span
                      key={kw}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.03 * i, duration: 0.2 }}
                      className="px-2.5 py-1 text-xs bg-papel-200 text-tinta-600 rounded-full"
                    >
                      {kw}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Real Life Example */}
            {activeTopic && activeTopic.realLifeExamples.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="card-base p-4 bg-gradient-to-br from-verde-50 to-musgo-50 border-verde-200"
              >
                <h3 className="font-display font-semibold text-tinta-900 mb-3 flex items-center gap-2">
                  <Icon name="heart" size="md" className="text-verde-600" />
                  Na vida real
                </h3>
                <div className="space-y-2">
                  {activeTopic.realLifeExamples.slice(0, 2).map((ex, i) => (
                    <motion.div
                      key={ex.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                      className="text-sm text-tinta-700 leading-relaxed"
                    >
                      <span className="font-medium text-verde-800">{ex.title}</span>
                      <p className="mt-0.5 text-tinta-600">{ex.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.aside>

          {/* Main Map Area */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {activeTopic ? (
              <>
                {/* Topic Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="card-base p-6 lg:p-8"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={getCategoryTone(currentCategory?.color || 'verde')}>
                          {currentCategory?.name}
                        </Badge>
                        <div className="flex items-center gap-1 text-argila-600">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Icon key={i} name={i < activeTopic.frequency ? 'star' : 'starEmpty'} size="sm" className={i < activeTopic.frequency ? 'fill-current text-argila-500' : 'text-papel-300'} />
                          ))}
                        </div>
                      </div>
                      <h2 className="text-display-lg font-display font-semibold text-tinta-900 mb-2">{activeTopic.title}</h2>
                      <p className="text-body text-tinta-600 max-w-2xl">{activeTopic.description}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 lg:ml-8">
                      <Button variant="secondary" size="sm" onClick={() => window.print()}>
                        <Icon name="download" size="sm" />
                        Salvar como PDF
                      </Button>
                      <div className="flex items-center gap-3 text-sm text-tinta-500">
                        <span className="flex items-center gap-1">
                          <Icon name="clock" size="sm" />
                          {activeTopic.estimatedReadTime} min
                        </span>
                        <Badge variant={activeTopic.priority === 'alta' ? 'argila' : activeTopic.priority === 'media' ? 'verde' : 'ceu'} className="!px-2 !py-1 !text-xs">
                          {activeTopic.priority.charAt(0).toUpperCase() + activeTopic.priority.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* The Mind Map */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="card-base overflow-hidden"
                >
                  <MindMapIllustration topicId={activeTopic.id} />
                </motion.div>

                {/* Navigation between topics in same category */}
                {currentTopics.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="card-base p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <span className="text-sm font-medium text-tinta-700">Navegar na categoria:</span>
                      <div className="flex flex-wrap gap-2">
                        {currentTopics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => setActiveTopicId(topic.id)}
                            className={cn(
                              'px-3 py-1.5 rounded-organic text-sm font-medium transition-all',
                              activeTopicId === topic.id
                                ? 'bg-verde-700 text-papel-50 shadow-sm'
                                : 'bg-papel-100 text-tinta-700 hover:bg-papel-200 hover:text-tinta-900'
                            )}
                          >
                            {topic.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card-base p-12 text-center"
              >
                <Icon name="book" size="xl" className="text-papel-300 mx-auto mb-4" />
                <h3 className="text-display-sm font-display font-medium text-tinta-700 mb-2">
                  Selecione uma categoria
                </h3>
                <p className="text-body text-tinta-500">
                  Escolha uma área da biologia acima para ver os mapas mentais dos tópicos.
                </p>
              </motion.div>
            )}
          </motion.section>
        </div>
      </div>
    </div>
  )
}