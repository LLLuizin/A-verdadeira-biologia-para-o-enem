'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Icon, Button, Card, CardContent, Badge } from '@/components/ui'
import { topics, categories, type Topic } from '@/content/topics'
import { TopicIllustration } from '@/components/illustrations/TopicIllustration'
import { HumanSystems3D } from '@/components/content/HumanSystems3D'
import { BiologyLearning3D } from '@/components/visualizations/BiologyLearning3D'
import { BiologyAtlas2D } from '@/components/visualizations/BiologyAtlas2D'

interface TopicContentProps {
  topic: Topic
}

function getCategoryBadgeVariant(category: string): 'verde' | 'argila' | 'flor' | 'musgo' | 'terra' | 'ceu' {
  switch (category) {
    case 'celular':
    case 'botanica':
      return 'verde'
    case 'genetica':
    case 'biotecnologia':
      return 'argila'
    case 'evolucao':
      return 'flor'
    case 'ecologia':
      return 'musgo'
    case 'fisiologia':
      return 'terra'
    default:
      return 'ceu'
  }
}

export function TopicContent({ topic }: TopicContentProps) {
  const categoryInfo = categories.find(c => c.id === topic.category)

  return (
    <article className="section">
      <div className="container-custom">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          aria-label="Navegação estrutural"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-tinta-500">
            <li>
              <Link href="/" className="hover:text-verde-700 transition-colors flex items-center gap-1">
                <Icon name="home" size="sm" />
                Início
              </Link>
            </li>
            <li><Icon name="chevronRight" size="sm" /></li>
            <li>
              <Link href="/topicos" className="hover:text-verde-700 transition-colors">Tópicos</Link>
            </li>
            <li><Icon name="chevronRight" size="sm" /></li>
            {categoryInfo && (
              <>
                <li>
                  <Link href={`/topicos?categoria=${topic.category}`} className="hover:text-verde-700 transition-colors">
                    {categoryInfo.name}
                  </Link>
                </li>
                <li><Icon name="chevronRight" size="sm" /></li>
              </>
            )}
            <li className="text-tinta-900 font-medium truncate max-w-[300px]" aria-current="page">
              {topic.title}
            </li>
          </ol>
        </motion.nav>

        {/* Hero */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-8">
            <div className="flex-1">
              {categoryInfo && (
                <Badge
                  variant={getCategoryBadgeVariant(topic.category)}
                  className="mb-3"
                >
                  <Icon name={categoryInfo.icon} size="xs" />
                  {categoryInfo.name}
                </Badge>
              )}
              <h1 className="text-display-lg font-display font-semibold text-tinta-900 mb-4 line-clamp-2">
                {topic.title}
              </h1>
              <p className="text-lead text-tinta-600 max-w-2xl">{topic.description}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="flex items-center gap-4 text-tinta-600">
                <div className="flex items-center gap-1">
                  <Icon name="clock" size="sm" />
                  <span className="font-medium">{topic.estimatedReadTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="star" size="sm" className="text-argila-500 fill-current" />
                  <span className="font-medium">{topic.frequency}/5</span>
                </div>
              </div>
              <Badge
                variant={topic.priority === 'alta' ? 'argila' : topic.priority === 'media' ? 'verde' : 'ceu'}
                className="text-sm"
              >
                Prioridade {topic.priority.charAt(0).toUpperCase() + topic.priority.slice(1)}
              </Badge>
            </div>
          </div>

          {/* Keywords */}
          {topic.id !== 'fisiologia-humana' && (
            <div className="flex flex-wrap gap-2">
              {topic.keywords.map(kw => (
                <span key={kw} className="px-3 py-1 text-sm bg-papel-100 border border-papel-200 text-tinta-700 rounded-full hover:bg-papel-200 transition-colors">
                  {kw}
                </span>
              ))}
            </div>
          )}
        </motion.header>

        {topic.id === 'fisiologia-humana' && <HumanSystems3D />}

        {topic.id === 'zoologia' && <BiologyLearning3D kind="zoologia" />}

        {(['evolucao', 'ecologia'] as string[]).includes(topic.id) && (
          <BiologyAtlas2D kind={topic.id as 'evolucao' | 'ecologia'} />
        )}

        {topic.id === 'divisao-celular' && <BiologyLearning3D kind="divisao-celular" />}

        {/* Main Illustration */}
        {topic.id !== 'fisiologia-humana' &&
          !(['evolucao', 'zoologia', 'ecologia', 'divisao-celular'] as string[]).includes(topic.id) &&
          topic.illustrations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <TopicIllustration illustrations={topic.illustrations} topicId={topic.id} />
          </motion.section>
        )}

        {/* Real Life Examples */}
        {topic.realLifeExamples.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-display-md font-display font-semibold text-tinta-900 flex items-center gap-3">
                <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                  <Icon name="sparkles" size="md" className="text-papel-50" />
                </span>
                Biologia na vida real
              </h2>
              <span className="text-body-sm text-tinta-500">
                {topic.realLifeExamples.length} exemplo{topic.realLifeExamples.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {topic.realLifeExamples.map((example, i) => (
                <motion.article
                  key={example.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 shrink-0 rounded-organic bg-gradient-to-br from-verde-500 to-musgo-600 flex items-center justify-center">
                          <Icon name={example.icon} size="lg" className="text-papel-50" />
                        </div>
                        <div className="flex-1">
                          <Badge
                            variant={
                              example.context === 'saude' ? 'argila' :
                              example.context === 'tecnologia' ? 'ceu' :
                              example.context === 'meio-ambiente' ? 'verde' :
                              example.context === 'alimentacao' ? 'flor' : 'musgo'
                            }
                            className="mb-2 text-xs"
                          >
                            {example.context.charAt(0).toUpperCase() + example.context.slice(1)}
                          </Badge>
                          <h3 className="font-medium text-tinta-900">{example.title}</h3>
                        </div>
                      </div>
                      <p className="text-body-sm text-tinta-600 flex-1">{example.description}</p>
                    </CardContent>
                  </Card>
                </motion.article>
              ))}
            </div>
          </motion.section>
        )}

        {/* Study Checklist */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-display-md font-display font-semibold text-tinta-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-argila-500 to-terra-600 flex items-center justify-center">
              <Icon name="check" size="md" className="text-papel-50" />
            </span>
            Checklist de estudo
          </h2>

          <Checklist topicId={topic.id} keywords={topic.keywords.slice(0, 8)} />
        </motion.section>

        {/* Navigation to related topics */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-display-md font-display font-semibold text-tinta-900 mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-organic bg-gradient-to-br from-ceu-500 to-flor-600 flex items-center justify-center">
              <Icon name="arrowRight" size="md" className="text-papel-50" />
            </span>
            Continuar estudando
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics
              .filter(t => t.category === topic.category && t.id !== topic.id)
              .slice(0, 3)
              .map((related, i) => (
                <motion.article
                  key={related.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                >
                  <Link href={`/topicos/${related.id}`} className="block h-full">
                    <Card className="h-full">
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <Badge
                            variant={getCategoryBadgeVariant(related.category)}
                            className="shrink-0"
                          >
                            {related.category.charAt(0).toUpperCase() + related.category.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1 text-argila-600">
                            {related.frequency}
                            <Icon name="star" size="xs" className="fill-current" />
                          </div>
                        </div>
                        <h3 className="text-display-sm font-display font-semibold text-tinta-900 mb-2 line-clamp-2">
                          {related.title}
                        </h3>
                        <p className="text-body-sm text-tinta-600 mb-4 flex-1 line-clamp-2">{related.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-papel-200">
                          <span className="text-sm font-medium text-verde-700">
                            Ler tópico <Icon name="arrowRight" size="xs" />
                          </span>
                          <span className="text-caption text-tinta-500">{related.estimatedReadTime} min</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
          </div>

          <div className="text-center mt-8">
            <Link href={`/topicos?categoria=${topic.category}`} className="btn-secondary">
              Ver todos de {categoryInfo?.name} <Icon name="arrowRight" size="sm" />
            </Link>
          </div>
        </motion.section>

        {/* Revisão com flashcards do módulo */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12"
          aria-labelledby="module-flashcards-title"
        >
          <div className="flex flex-col gap-6 rounded-organic border border-verde-200 bg-verde-50/70 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-verde-700">
                Revisão do módulo
              </p>
              <h2 id="module-flashcards-title" className="text-display-md font-display font-semibold text-tinta-900">
                Fixe o conteúdo com flashcards
              </h2>
              <p className="mt-2 text-body text-tinta-600">
                Teste sua memória com perguntas e respostas sobre {topic.title.toLowerCase()}. O baralho já será aberto com este módulo selecionado.
              </p>
            </div>
            <Link
              href={`/flashcards?topico=${topic.id}`}
              className="btn-primary inline-flex shrink-0 items-center justify-center gap-2"
            >
              Estudar flashcards deste módulo
              <Icon name="arrowRight" size="sm" />
            </Link>
          </div>
        </motion.section>
      </div>
    </article>
  )
}

// Checklist component with localStorage persistence
function Checklist({ topicId, keywords }: { topicId: string; keywords: string[] }) {
  const storageKey = `checklist-${topicId}`
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setChecked(JSON.parse(saved))
    } catch {}
  }, [storageKey])

  const toggle = (kw: string) => {
    const next = { ...checked, [kw]: !checked[kw] }
    setChecked(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch {}
  }

  const checkedCount = Object.values(checked).filter(Boolean).length
  const total = keywords.length

  if (!mounted) {
    return (
      <Card>
        <CardContent className="p-6">
          <ul className="space-y-3" role="list" aria-busy="true">
            {keywords.map((kw, i) => (
              <li key={kw} className="flex items-center gap-3 p-3 bg-papel-50 rounded-organic animate-pulse">
                <div className="w-6 h-6 rounded-full border-2 border-papel-300" />
                <span className="text-body text-tinta-700">{kw}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-6">
        <ul className="space-y-3" role="list">
          {keywords.map((kw, i) => {
            const isChecked = checked[kw]
            return (
              <motion.li
                key={kw}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
                className="flex items-center gap-3 p-3 bg-papel-50 rounded-organic hover:bg-papel-100 transition-colors group cursor-pointer"
                onClick={() => toggle(kw)}
                role="checkbox"
                aria-checked={isChecked}
                tabIndex={0}
                onKeyDown={(e) => e.key === ' ' && (e.preventDefault(), toggle(kw))}
              >
                <motion.div
                  className="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                  animate={{
                    backgroundColor: isChecked ? 'var(--color-verde-600)' : 'transparent',
                    borderColor: isChecked ? 'var(--color-verde-600)' : 'var(--color-papel-300)',
                    scale: isChecked ? 1.05 : 1
                  }}
                >
                  <Icon
                    name="check"
                    size="xs"
                    className={`text-papel-50 transition-opacity duration-150 ${isChecked ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                  />
                </motion.div>
                <span className={`text-body text-tinta-700 transition-colors ${isChecked ? 'line-through text-tinta-400' : ''}`}>
                  {kw}
                </span>
                <span className="ml-auto text-caption text-tinta-400">Conceito-chave</span>
              </motion.li>
            )
          })}
        </ul>
        <div className="mt-4 pt-4 border-t border-papel-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-tinta-500">
            <Icon name="info" size="sm" />
            <span>Marque os conceitos que já domina. Foque nos que ficaram em branco.</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-verde-700">
            <Icon name="checkCircle" size="sm" />
            <span>{checkedCount} / {total} concluídos</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}