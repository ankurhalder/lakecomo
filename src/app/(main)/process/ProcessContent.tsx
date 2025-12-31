'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Film } from 'lucide-react'
import ProcessHero from './ProcessHero'
import ProcessStep from './ProcessStep'
import type { ProcessPageData } from '@/sanity/lib/getProcessPage'

interface ProcessContentProps {
  data: ProcessPageData
}

export default function ProcessContent({ data }: ProcessContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const steps = data?.steps || []

  return (
    <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <ProcessHero hero={data?.hero} heroFeature={data?.heroFeature} />

      <section className="relative px-4 md:px-8 lg:px-16 xl:px-24 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <ProcessStep 
            key={step.stepNumber} 
            step={step} 
            index={index}
          />
        ))}
      </section>

      <section className="relative py-24 px-4">
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, var(--bg-primary), var(--bg-secondary), transparent)' }}
        />
        
        <motion.div 
          className="relative z-10 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Film className="w-10 h-10 mx-auto mb-4" style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
          
          <h2 
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: 'var(--text-primary)' }}
          >
            Ready to Create Your Movie?
          </h2>
          
          <p 
            className="text-sm md:text-base mb-8 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Start your cinematic journey today. Let us transform your celebration into an unforgettable movie experience.
          </p>
          
          <Link href="/contact">
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              Start Your Experience
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
