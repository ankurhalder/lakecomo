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

  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center py-16 md:py-24 px-4 md:px-8`}
    >
      <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start">
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <span 
            className="text-[120px] md:text-[160px] lg:text-[200px] font-black leading-none"
            style={{ 
              color: 'transparent',
              WebkitTextStroke: '2px var(--text-secondary)',
              opacity: 0.3
            }}
          >
            {String(step.stepNumber).padStart(2, '0')}
          </span>
        </motion.div>

        <div className="text-center lg:text-left">
          {step.titleLines.map((line, idx) => (
            <motion.h2
              key={idx}
              className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[0.9]"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, x: isEven ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              {line}
            </motion.h2>
          ))}
          
          <motion.p
            className="mt-4 text-xs md:text-sm uppercase tracking-[0.2em] font-medium"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {step.tagline}
          </motion.p>
        </div>
      </div>

      <div className="w-full lg:w-[55%]">
        <motion.div
          className="rounded-2xl p-6 md:p-8 border"
          style={{ 
            backgroundColor: 'var(--overlay)',
            borderColor: 'color-mix(in srgb, var(--text-primary) 10%, transparent)'
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 
            className="text-lg md:text-xl font-bold mb-4 uppercase tracking-wide"
            style={{ color: 'var(--text-primary)' }}
          >
            {step.heading}
          </h3>
          
          <div 
            className="text-sm md:text-base leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--text-secondary)' }}
          >
            {step.body}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
