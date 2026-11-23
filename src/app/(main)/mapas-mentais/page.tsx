'use client'

import { Suspense } from 'react'
import { MindMapsContent } from './MindMapsContent'

export default function MindMapsPage() {
  return (
    <Suspense fallback={
      <div className="section">
        <div className="container-custom">
          <div className="flex items-center justify-center py-16">
            <div className="animate-pulse text-tinta-400">Carregando mapas mentais...</div>
          </div>
        </div>
      </div>
    }>
      <MindMapsContent />
    </Suspense>
  )
}