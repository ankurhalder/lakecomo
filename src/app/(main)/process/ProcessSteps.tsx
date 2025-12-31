'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import { Star, MapPin, Palette, PartyPopper, Film, Tv, Clapperboard } from 'lucide-react'
import type { ProcessStep } from '@/sanity/lib/getProcessPage'

interface ProcessStepsProps {
  steps: ProcessStep[]
}

const stepIcons = [
  <Star key="star" />,
  <MapPin key="map" />,
  <Palette key="palette" />,
  <PartyPopper key="party" />,
  <Film key="film" />,
  <Tv key="tv" />
]

const stepColors = ['amber', 'red', 'purple', 'emerald', 'blue', 'amber'] as const

type ColorTheme = typeof stepColors[number]

const themes: Record<ColorTheme, { bg: string; border: string; text: string }> = {
  amber: { bg: 'rgba(120, 53, 15, 0.8)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24' },
  red: { bg: 'rgba(127, 29, 29, 0.8)', border: 'rgba(239, 68, 68, 0.4)', text: '#f87171' },
  purple: { bg: 'rgba(88, 28, 135, 0.8)', border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc' },
  emerald: { bg: 'rgba(6, 78, 59, 0.8)', border: 'rgba(52, 211, 153, 0.4)', text: '#6ee7b7' },
  blue: { bg: 'rgba(30, 58, 138, 0.8)', border: 'rgba(59, 130, 246, 0.4)', text: '#60a5fa' },
}

function TicketCard({ 
  step, 
  icon, 
  color, 
  align = 'left' 
}: { 
  step: ProcessStep
  icon: React.ReactNode
  color: ColorTheme
  align?: 'left' | 'right'
}) {
  const theme = themes[color]
  const stepNum = String(step.stepNumber).padStart(2, '0')
  const title = step.titleLines.join(' ')

  return (
    <div className={`group relative transform transition-all duration-500 hover:scale-[1.02] ${align === 'right' ? 'ml-auto' : ''}`}>
      <div 
        className="relative flex items-stretch overflow-hidden backdrop-blur-md rounded-xl shadow-2xl"
        style={{
          backgroundColor: theme.bg,
          border: `1px solid ${theme.border}`,
        }}
      >
        <div 
          className="w-20 flex-shrink-0 flex flex-col items-center justify-center relative"
          style={{ 
            borderRight: `2px dashed ${theme.border}`,
            backgroundColor: 'rgba(0,0,0,0.2)'
          }}
        >
          <span 
            className="absolute text-[10px] tracking-[0.2em] rotate-180 font-mono h-full flex items-center justify-center pb-8"
            style={{ 
              writingMode: 'vertical-rl',
              color: 'rgba(255,255,255,0.3)'
            }}
          >
            LAKE COMO STYLE TICKET
          </span>
          <span className="text-3xl font-black z-10" style={{ color: theme.text }}>{stepNum}</span>
        </div>

        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wider leading-tight" style={{ color: 'var(--text-primary)' }}>
                {title}
              </h3>
              <h4 className="text-sm font-mono mt-1" style={{ color: theme.text, opacity: 0.9 }}>
                {step.subtitle}
              </h4>
            </div>
            <div 
              className="p-2 rounded-lg flex-shrink-0"
              style={{ 
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: theme.text
              }}
            >
              {icon}
            </div>
          </div>

          <div className="h-px w-full my-4" style={{ background: `linear-gradient(to right, ${theme.border}, transparent)`, opacity: 0.5 }} />

          <p className="text-sm md:text-base leading-relaxed font-light whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
            {step.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ProcessSteps({ steps }: ProcessStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.18) setActiveStep(0)
    else if (latest < 0.33) setActiveStep(1)
    else if (latest < 0.48) setActiveStep(2)
    else if (latest < 0.63) setActiveStep(3)
    else if (latest < 0.78) setActiveStep(4)
    else setActiveStep(5)
  })

  const verticalSlide = useTransform(smoothProgress, [0, 1], ["0%", "-66.66%"])
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "15%"])

  const points = [
    { x: 15, y: 15 },
    { x: 85, y: 30 },
    { x: 15, y: 48 },
    { x: 85, y: 65 },
    { x: 15, y: 82 },
    { x: 85, y: 100 },
  ]

  const pathD = `M ${points[0].x} ${points[0].y} ` + 
                `L ${points[1].x} ${points[1].y} ` + 
                `L ${points[2].x} ${points[2].y} ` + 
                `L ${points[3].x} ${points[3].y} ` + 
                `L ${points[4].x} ${points[4].y} ` + 
                `L ${points[5].x} ${points[5].y}`

  const ranges = [0.10, 0.25, 0.40, 0.55, 0.70, 0.85]

  const scrollToStep = (index: number) => {
    if (!containerRef.current) return
    const scrollHeight = containerRef.current.scrollHeight - window.innerHeight
    const targetY = scrollHeight * ranges[index]
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  const cardOpacity0 = useTransform(smoothProgress, [ranges[0] - 0.05, ranges[0]], [0, 1])
  const cardX0 = useTransform(smoothProgress, [ranges[0] - 0.05, ranges[0]], [-100, 0])
  
  const cardOpacity1 = useTransform(smoothProgress, [ranges[1] - 0.05, ranges[1]], [0, 1])
  const cardX1 = useTransform(smoothProgress, [ranges[1] - 0.05, ranges[1]], [100, 0])
  
  const cardOpacity2 = useTransform(smoothProgress, [ranges[2] - 0.05, ranges[2]], [0, 1])
  const cardX2 = useTransform(smoothProgress, [ranges[2] - 0.05, ranges[2]], [-100, 0])
  
  const cardOpacity3 = useTransform(smoothProgress, [ranges[3] - 0.05, ranges[3]], [0, 1])
  const cardX3 = useTransform(smoothProgress, [ranges[3] - 0.05, ranges[3]], [100, 0])
  
  const cardOpacity4 = useTransform(smoothProgress, [ranges[4] - 0.05, ranges[4]], [0, 1])
  const cardX4 = useTransform(smoothProgress, [ranges[4] - 0.05, ranges[4]], [-100, 0])
  
  const cardOpacity5 = useTransform(smoothProgress, [ranges[5] - 0.05, ranges[5]], [0, 1])
  const cardX5 = useTransform(smoothProgress, [ranges[5] - 0.05, ranges[5]], [100, 0])

  const cardTransforms = [
    { opacity: cardOpacity0, x: cardX0 },
    { opacity: cardOpacity1, x: cardX1 },
    { opacity: cardOpacity2, x: cardX2 },
    { opacity: cardOpacity3, x: cardX3 },
    { opacity: cardOpacity4, x: cardX4 },
    { opacity: cardOpacity5, x: cardX5 },
  ]

  const pathLength = useTransform(smoothProgress, [ranges[0], ranges[5]], [0, 1])

  const arrowLeft = useTransform(smoothProgress, ranges, points.map(p => `${p.x}%`))
  const arrowTop = useTransform(smoothProgress, ranges, points.map(p => `${p.y}%`))
  
  const arrowRotate = useTransform(smoothProgress,
    [ranges[0], ranges[1], ranges[1]+0.01, ranges[2], ranges[2]+0.01, ranges[3], ranges[3]+0.01, ranges[4], ranges[4]+0.01, ranges[5]],
    [10, 10, 170, 170, 10, 10, 170, 170, 10, 10]
  )
  
  const arrowOpacity = useTransform(smoothProgress, [ranges[0]-0.05, ranges[0], ranges[5], ranges[5]+0.05], [0, 1, 1, 0])

  const stepLabels = ['Theme', 'Venue', 'Design', 'Party', 'Film', 'Relive']

  if (!steps || steps.length === 0) return null

  const cardPositions = [
    { top: "15%", left: "5%", right: undefined },
    { top: "30%", left: undefined, right: "5%" },
    { top: "48%", left: "5%", right: undefined },
    { top: "65%", left: undefined, right: "5%" },
    { top: "82%", left: "5%", right: undefined },
    { top: "100%", left: undefined, right: "5%" },
  ]

  return (
    <div ref={containerRef} className="h-[900vh] relative" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center">
        
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, var(--bg-secondary), var(--bg-primary))' }} />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }} />
        </motion.div>

        <motion.div 
          style={{ y: verticalSlide }}
          className="relative w-full h-[300vh] z-10"
        >
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="gold-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <filter id="golden-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <path
              d={pathD}
              fill="none"
              stroke="rgba(100,100,100,0.3)"
              strokeWidth="0.3"
              strokeDasharray="4 4"
              vectorEffect="non-scaling-stroke"
            />

            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#gold-path-gradient)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
              filter="url(#golden-glow)"
            />
          </svg>

          <motion.div
            style={{ 
              left: arrowLeft, 
              top: arrowTop, 
              rotate: arrowRotate, 
              opacity: arrowOpacity 
            }}
            className="absolute z-40 pointer-events-none"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 relative">
              <div className="absolute inset-0 blur-md rounded-full" style={{ backgroundColor: 'rgba(245, 158, 11, 0.5)' }} />
              <div 
                className="relative z-10 p-3 rounded-full shadow-2xl"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid #f59e0b'
                }}
              >
                <Clapperboard size={24} style={{ color: '#fbbf24' }} /> 
              </div>
            </div>
          </motion.div>

          {steps.slice(0, 6).map((step, index) => (
            <motion.div 
              key={step.stepNumber}
              style={{ 
                opacity: cardTransforms[index].opacity, 
                x: cardTransforms[index].x,
                top: cardPositions[index].top,
                left: cardPositions[index].left,
                right: cardPositions[index].right
              }} 
              className="absolute z-20 w-full max-w-[400px] md:max-w-[500px]"
            >
              <TicketCard 
                step={step}
                icon={stepIcons[index]}
                color={stepColors[index]}
                align={index % 2 === 0 ? 'left' : 'right'}
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6 items-end">
          {stepLabels.map((label, index) => (
            <button 
              key={index}
              onClick={() => scrollToStep(index)}
              className="group flex items-center gap-4 focus:outline-none"
            >
              <div 
                className="hidden md:block text-xs font-mono uppercase tracking-widest transition-all duration-300"
                style={{
                  color: activeStep === index ? '#fbbf24' : 'rgba(100,100,100,0.6)',
                  transform: activeStep === index ? 'translateX(0)' : 'translateX(16px)',
                  opacity: activeStep === index ? 1 : 0
                }}
              >
                {label}
              </div>
              <div className="relative flex items-center justify-center">
                <div 
                  className="w-2 h-2 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: activeStep === index ? '#fbbf24' : 'rgba(100,100,100,0.5)',
                    transform: activeStep === index ? 'scale(1)' : 'scale(0.75)'
                  }}
                />
                <div 
                  className="absolute rounded-full transition-all duration-500"
                  style={{
                    border: '1px solid #f59e0b',
                    width: activeStep === index ? '32px' : '16px',
                    height: activeStep === index ? '32px' : '16px',
                    opacity: activeStep === index ? 1 : 0
                  }}
                />
              </div>
              <span 
                className="text-xs font-bold font-mono w-4 transition-colors duration-300"
                style={{ color: activeStep === index ? 'var(--text-primary)' : 'rgba(100,100,100,0.6)' }}
              >
                0{index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
