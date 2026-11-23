'use client'

import { Suspense } from 'react'
import { FlashcardsContent } from './FlashcardsContent'

export default function FlashcardsPage() {
  return (
    <Suspense fallback={
      <div className="section">
        <div className="container-custom">
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse text-tinta-400">Carregando flashcards...</div>
          </div>
        </div>
      </div>
    }>
      <FlashcardsContent />
    </Suspense>
  )
}