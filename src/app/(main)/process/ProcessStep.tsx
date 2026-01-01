'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

interface ProcessStepProps {
  step: {
    stepNumber: number
    titleLines: string[]
    tagline: string
    heading: string
    body: string
  }
  index: number
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  const isEven = index % 2 === 0
  const cardRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [10, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale, rotateX, transformPerspective: 1200 }}
      className={`relative flex flex-col sm:flex-row items-stretch w-full max-w-[280px] xs:max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto my-6 sm:my-8 md:my-10 group ${isEven ? '' : 'sm:flex-row-reverse'}`}
    >
      <div className={`relative w-full sm:w-[80px] md:w-[100px] lg:w-[120px] flex-shrink-0 bg-[#F4E4BC] text-black overflow-hidden flex flex-row sm:flex-col
        rounded-t-lg sm:rounded-t-none
        ${isEven ? 'sm:rounded-l-lg sm:border-r-2' : 'sm:rounded-r-lg sm:border-l-2'}
        border-b-2 sm:border-b-0 border-dashed border-black/30
      `}>
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }} />
        
        <div className="relative flex flex-row sm:flex-col items-center justify-between sm:justify-between w-full py-3 sm:py-4 px-4 sm:px-2 z-10">
          <div className="hidden sm:block w-full text-center border-y border-black/20 py-1">
            <span className="font-courier font-bold text-[7px] md:text-[8px] lg:text-[9px] tracking-widest uppercase block transform scale-x-90">Admit One</span>
          </div>
          
          <div className="flex flex-row sm:flex-col items-center justify-center sm:flex-1 gap-2 sm:gap-0">
             <span className="font-courier text-[8px] md:text-[9px] uppercase tracking-widest sm:mb-1 opacity-60">Scene</span>
             <span className="font-limelight text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-none">{String(step.stepNumber).padStart(2, '0')}</span>
          </div>

          <div className="hidden sm:block w-full text-center border-y border-black/20 py-1">
            <span className="font-courier text-[7px] md:text-[8px] uppercase tracking-wider block opacity-60">No. 24891-B</span>
          </div>
          
          <span className="sm:hidden font-courier font-bold text-[8px] tracking-widest uppercase opacity-60">Admit One</span>
        </div>
      </div>

      <div className={`relative flex-1 bg-[#F4E4BC] text-black p-3 sm:p-4 md:p-5 lg:p-6 min-h-[180px] sm:min-h-[160px] md:min-h-[180px] lg:min-h-[200px] flex flex-col
        rounded-b-lg sm:rounded-b-none
        ${isEven ? 'sm:rounded-r-lg' : 'sm:rounded-l-lg'}
      `}>
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }} />

        <div className="absolute top-2 left-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-t-[1px] border-l-[1px] border-black/30" />
        <div className="absolute top-2 right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-t-[1px] border-r-[1px] border-black/30" />
        <div className="absolute bottom-2 left-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b-[1px] border-l-[1px] border-black/30" />
        <div className="absolute bottom-2 right-2 w-2 h-2 sm:w-2.5 sm:h-2.5 border-b-[1px] border-r-[1px] border-black/30" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-3 opacity-50">
            <div className="h-[1px] flex-1 bg-black/30" />
            <span className="font-courier text-[7px] sm:text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em]">Lake Como Studios</span>
            <div className="h-[1px] flex-1 bg-black/30" />
          </div>

          <div className="flex-1 flex flex-col justify-center text-center px-1 sm:px-2 md:px-3">
            {step.titleLines.map((line, idx) => (
              <h2
                key={idx}
                className="font-limelight text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] uppercase tracking-wide leading-tight text-black/90"
              >
                {line}
              </h2>
            ))}
            
            <p className="font-courier text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold mt-1.5 sm:mt-2 text-black/60">
              {step.tagline}
            </p>
          </div>

          <div className="mt-auto pt-2 sm:pt-3 border-t border-black/10 flex justify-between items-start gap-2 sm:gap-3">
             <div className="text-left flex-1 min-w-0 flex flex-col">
                <h3 className="font-limelight text-xs sm:text-sm md:text-base leading-tight mb-0.5 sm:mb-1">{step.heading}</h3>
                <div 
                  className="overflow-y-auto pr-1 sm:pr-2 custom-scrollbar max-h-[80px] sm:max-h-[90px] md:max-h-[100px] overscroll-contain"
                  data-lenis-prevent
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <p className="font-courier text-[8px] sm:text-[9px] md:text-[10px] leading-relaxed opacity-75 whitespace-pre-line">
                    {step.body}
                  </p>
                </div>
             </div>
             <div className="opacity-40 shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                   <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="3" />
                </svg>
             </div>
          </div>
        </div>
      </div>
      
      <div className={`hidden sm:block absolute top-[-6px] md:top-[-7px] w-3 h-3 md:w-3.5 md:h-3.5 bg-black rounded-full z-20
         ${isEven ? 'left-[72px] md:left-[92px] lg:left-[112px]' : 'right-[72px] md:right-[92px] lg:right-[112px]'}
      `} />
      <div className={`hidden sm:block absolute bottom-[-6px] md:bottom-[-7px] w-3 h-3 md:w-3.5 md:h-3.5 bg-black rounded-full z-20
         ${isEven ? 'left-[72px] md:left-[92px] lg:left-[112px]' : 'right-[72px] md:right-[92px] lg:right-[112px]'}
      `} />
      
      <div className={`sm:hidden absolute left-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full z-20`} />
      <div className={`sm:hidden absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full z-20`} />
    </motion.div>
  )
}
