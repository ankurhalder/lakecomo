'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'
import { X, Film } from 'lucide-react'
import { useLenis } from '@/components/providers/SmoothScroll'
import FocusTrap from 'focus-trap-react'

interface Step {
  stepNumber: number
  titleLines: string[]
  tagline: string
  heading: string
  body: string
}

interface FilmStripProps {
  steps: Step[]
}

function StepModal({ step, onClose }: { step: Step | null, onClose: () => void }) {
  const { stop: stopLenis, start: startLenis } = useLenis()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!step) return
    
    stopLenis()
    
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const originalStyle = {
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight
    }
    
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleEscape)
    
    return () => {
      startLenis()
      document.body.style.overflow = originalStyle.overflow
      document.body.style.paddingRight = originalStyle.paddingRight
      window.removeEventListener('keydown', handleEscape)
    }
  }, [step, handleClose, stopLenis, startLenis])

  return (
    <AnimatePresence>
      {step && (
        <FocusTrap focusTrapOptions={{ initialFocus: () => closeButtonRef.current }}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="step-modal-title"
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          >
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
            
            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-xl border shadow-2xl"
              style={{ 
                backgroundColor: '#0f0f0f',
                borderColor: 'rgba(255,255,255,0.1)',
                overscrollBehavior: 'contain'
              }}
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                onClick={handleClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 bg-white/10 hover:bg-white/20"
                style={{ color: 'white' }}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Film size={20} className="text-white/70" />
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-[0.2em] block">Scene {String(step.stepNumber).padStart(2, '0')}</span>
                    <span className="text-xs sm:text-sm text-amber-500/80 uppercase tracking-wider">{step.tagline}</span>
                  </div>
                </div>

                <h2 id="step-modal-title" className="font-limelight text-2xl sm:text-3xl md:text-4xl text-white mb-2 sm:mb-3 leading-tight">
                  {step.titleLines.join(' ')}
                </h2>

                <h3 className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-4 sm:mb-6">
                  {step.heading}
                </h3>

                <div className="border-t border-white/10 pt-4 sm:pt-6">
                  <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed whitespace-pre-line">
                    {step.body}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>
  )
}

export default function FilmStrip({ steps }: FilmStripProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedStep, setSelectedStep] = useState<Step | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!stripRef.current || !containerRef.current) return
      
      const containerRect = containerRef.current.getBoundingClientRect()
      const scrollProgress = -containerRect.top / (containerRect.height - window.innerHeight)
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress))
      
      const totalWidth = stripRef.current.scrollWidth - window.innerWidth
      const translateX = clampedProgress * totalWidth
      
      stripRef.current.style.transform = `translateX(-${translateX}px)`

      const frames = stripRef.current.querySelectorAll('.film-frame')
      frames.forEach((frame) => {
        const rect = frame.getBoundingClientRect()
        const center = rect.left + rect.width / 2
        const screenCenter = window.innerWidth / 2
        
        if (Math.abs(screenCenter - center) < window.innerWidth * 0.35) {
          frame.classList.add('active')
        } else {
          frame.classList.remove('active')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <section 
        ref={containerRef}
        className="relative"
        style={{ height: `${(steps.length + 2) * 70}vh` }}
      >
        <div className="film-grain" />
        
        <div className="sticky top-0 h-screen w-screen overflow-hidden flex items-center"
          style={{ backgroundColor: '#0a0a0a' }}
        >
          <div 
            ref={stripRef}
            className="film-track flex items-center"
            style={{ paddingLeft: '50vw', paddingRight: '50vw' }}
          >
            <div className="film-frame title-frame">
              <span className="font-courier text-[10px] sm:text-xs text-amber-600/80 tracking-[0.4em] uppercase mb-2 sm:mb-4 block">Production Archive</span>
              <h1 className="font-limelight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-2 sm:mb-3" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
                THE PROCESS
              </h1>
              <p className="font-courier text-[9px] sm:text-[10px] md:text-xs text-white/30">REEL ID: LCS-2026 • 35MM</p>
            </div>

            {steps.map((step) => (
              <div key={step.stepNumber} className="film-frame">
                <div className="frame-content">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 h-full">
                    <div className="sm:w-2/5 flex flex-col justify-center text-center sm:text-left shrink-0">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2 justify-center sm:justify-start">
                        <span className="font-courier text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/40">Scene</span>
                        <span className="font-limelight text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/90">{String(step.stepNumber).padStart(2, '0')}</span>
                      </div>
                      
                      <div className="mb-2 sm:mb-3">
                        {step.titleLines.map((line, idx) => (
                          <h2 key={idx} className="font-limelight text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-wide leading-tight text-white/95">
                            {line}
                          </h2>
                        ))}
                      </div>
                      
                      <span className="inline-block px-2 py-0.5 sm:py-1 bg-white/10 text-[8px] sm:text-[9px] md:text-[10px] font-courier tracking-widest uppercase border border-white/20 text-white/70 mx-auto sm:mx-0 w-fit">
                        {step.tagline}
                      </span>
                    </div>

                    <div className="sm:w-3/5 flex flex-col justify-center border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-3 md:pl-4 lg:pl-6">
                      <h3 className="font-limelight text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-1 sm:mb-2">
                        {step.heading}
                      </h3>
                      <p className="font-courier text-[9px] sm:text-[10px] md:text-xs leading-relaxed text-white/60 line-clamp-3 sm:line-clamp-4 md:line-clamp-5">
                        {step.body.split('\n')[0]}
                      </p>
                      
                      <button
                        onClick={() => setSelectedStep(step)}
                        className="mt-2 sm:mt-3 self-start font-courier text-[9px] sm:text-[10px] md:text-xs uppercase tracking-wider text-amber-500/90 hover:text-amber-400 transition-colors flex items-center gap-1.5 group"
                      >
                        <span>See More</span>
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-1 sm:bottom-2 left-2 sm:left-3 font-courier text-[7px] sm:text-[8px] md:text-[9px] text-white/20">
                    FRAME {String(step.stepNumber).padStart(3, '0')}-A
                  </div>
                  <div className="absolute bottom-1 sm:bottom-2 right-2 sm:right-3 font-courier text-[7px] sm:text-[8px] md:text-[9px] text-white/20">
                    35MM KODAK
                  </div>
                </div>
              </div>
            ))}

            <div className="film-frame end-frame">
              <p className="font-courier text-[10px] sm:text-xs text-white/30 tracking-[0.3em] uppercase">End Reel</p>
            </div>
          </div>
        </div>
      </section>

      <StepModal step={selectedStep} onClose={() => setSelectedStep(null)} />
    </>
  )
}
