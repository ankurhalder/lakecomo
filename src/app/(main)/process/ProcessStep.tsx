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

  // Enhanced 3D Scroll Animations
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [150, 0, 0, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85])
  const rotateX = useTransform(scrollYProgress, [0, 0.3], [15, 0])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale, rotateX, transformPerspective: 1200 }}
      className={`relative flex items-stretch w-full max-w-4xl mx-auto my-12 group ${isEven ? '' : 'flex-row-reverse'}`}
    >
      {/* Ticket Stub (Step Number) */}
      <div className={`relative w-[140px] flex-shrink-0 bg-[#F4E4BC] text-black overflow-hidden flex flex-col
        ${isEven ? 'rounded-l-xl border-r-2 border-dashed border-black/30' : 'rounded-r-xl border-l-2 border-dashed border-black/30'}
      `}>
        {/* Stub Texture/Effect */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-between py-6 z-10">
          <div className="w-full text-center border-y border-black/20 py-1.5">
            <span className="font-courier font-bold text-[10px] tracking-widest uppercase block transform scale-x-90">Admit One</span>
          </div>
          
          <div className="flex flex-col items-center justify-center flex-1">
             <span className="font-courier text-[10px] uppercase tracking-widest mb-1 opacity-60">Scene</span>
             <span className="font-limelight text-7xl leading-none transform translate-y-[-5%]">{String(step.stepNumber).padStart(2, '0')}</span>
          </div>

          <div className="w-full text-center border-y border-black/20 py-1.5">
            <span className="font-courier text-[9px] uppercase tracking-wider block opacity-60">No. 24891-B</span>
          </div>
        </div>
      </div>

      {/* Ticket Main Body */}
      <div className={`relative flex-1 bg-[#F4E4BC] text-black p-6 md:p-8 h-[280px] flex flex-col
        ${isEven ? 'rounded-r-xl' : 'rounded-l-xl'}
      `}>
         {/* Texture */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply" 
             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }} />

        {/* Decorative Corners */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-black/30" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-[1.5px] border-r-[1.5px] border-black/30" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-[1.5px] border-l-[1.5px] border-black/30" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-black/30" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-4 opacity-50">
            <div className="h-[1px] flex-1 bg-black/30" />
            <span className="font-courier text-[10px] font-bold uppercase tracking-[0.3em]">Lake Como Studios</span>
            <div className="h-[1px] flex-1 bg-black/30" />
          </div>

          <div className="flex-1 flex flex-col justify-center text-center px-4">
            {step.titleLines.map((line, idx) => (
              <h2
                key={idx}
                className="font-limelight text-2xl md:text-3xl uppercase tracking-wide leading-none text-black/90"
              >
                {line}
              </h2>
            ))}
            
            <p className="font-courier text-[10px] uppercase tracking-[0.2em] font-bold mt-2 text-black/60">
              {step.tagline}
            </p>
          </div>

          <div className="mt-auto pt-3 border-t border-black/10 flex justify-between items-start gap-4 h-[90px]">
             <div className="text-left flex-1 min-w-0 h-full flex flex-col">
                <h3 className="font-limelight text-base leading-tight mb-1">{step.heading}</h3>
                <div 
                  className="overflow-y-auto pr-2 custom-scrollbar flex-1 overscroll-contain"
                  data-lenis-prevent
                  onWheel={(e) => e.stopPropagation()}
                  onTouchMove={(e) => e.stopPropagation()}
                >
                  <p className="font-courier text-[10px] leading-relaxed opacity-75 whitespace-pre-line">
                    {step.body}
                  </p>
                </div>
             </div>
             <div className="opacity-40 shrink-0 mt-1">
                <svg width="24" height="24" viewBox="0 0 100 100">
                   <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="3" />
                   <path d="M50 20 L50 80 M20 50 L80 50" stroke="currentColor" strokeWidth="3" />
                </svg>
             </div>
          </div>
        </div>
      </div>
      
      {/* Semicircle cutouts */}
      <div className={`absolute top-[-8px] w-4 h-4 bg-black rounded-full z-20
         ${isEven ? 'left-[132px]' : 'right-[132px]'}
      `} />
      <div className={`absolute bottom-[-8px] w-4 h-4 bg-black rounded-full z-20
         ${isEven ? 'left-[132px]' : 'right-[132px]'}
      `} />
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </motion.div>
  )
}
