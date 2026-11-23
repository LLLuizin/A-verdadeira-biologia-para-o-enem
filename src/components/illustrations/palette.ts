// Paleta com valores reais (hex). As ilustrações SVG não podem depender de
// variáveis CSS que não existem, então usamos as mesmas cores do tailwind.config.ts.

export const tones = {
  verde: { fill: '#dcfce7', mid: '#4ade80', stroke: '#15803d', text: '#14532d' },
  musgo: { fill: '#e3ebe0', mid: '#7d9b71', stroke: '#3f5138', text: '#2e392a' },
  terra: { fill: '#f0e6db', mid: '#b3855a', stroke: '#734630', text: '#4e3328' },
  argila: { fill: '#f9eedc', mid: '#d8965c', stroke: '#9d4e28', text: '#683824' },
  flor: { fill: '#fce7f3', mid: '#f472b6', stroke: '#be185d', text: '#831843' },
  ceu: { fill: '#dbeafe', mid: '#60a5fa', stroke: '#1d4ed8', text: '#1e3a8a' },
  tinta: { fill: '#edece7', mid: '#a8a496', stroke: '#5e5b50', text: '#24221e' },
  sol: { fill: '#fef3c7', mid: '#fbbf24', stroke: '#b45309', text: '#78350f' },
  rubi: { fill: '#fee2e2', mid: '#f87171', stroke: '#b91c1c', text: '#7f1d1d' },
} as const

export type Tone = keyof typeof tones
