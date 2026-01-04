'use client'

import { motion } from 'framer-motion'
import { Film, Share2, Clock, Check } from 'lucide-react'

interface DeliverableItem {
  title: string
  description?: string
  features?: string[]
}

interface DeliverablesSectionProps {
  deliverables: DeliverableItem[]
}

const iconMap: { [key: string]: React.ReactNode } = {
  '3-Minute Movie Trailer': <Film size={32} />,
  'Social Media Ready Cuts': <Share2 size={32} />,
  'Timeline': <Clock size={32} />,
}

export default function DeliverablesSection({ deliverables }: DeliverablesSectionProps) {
  return (
    <section className="relative py-20 pb-28 md:py-28 px-4 md:px-8 lg:px-12">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-secondary), var(--bg-primary))' }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Deliverables
          </h2>
          <p 
            className="text-sm md:text-base max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Everything included in your cinematic experience package
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {deliverables.map((deliverable, index) => (
            <motion.div
              key={deliverable.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group"
            >
              <div 
                className="relative h-full p-6 md:p-8 rounded-2xl border transition-all duration-300 group-hover:scale-[1.02]"
                style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  borderColor: 'var(--text-secondary)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  opacity: 0.9
                }}
              >
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    background: 'linear-gradient(135deg, var(--accent) 0%, transparent 50%)',
                    opacity: 0.05
                  }}
                />
                
                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                  >
                    <span style={{ color: 'var(--accent)' }}>
                      {iconMap[deliverable.title] || <Film size={32} />}
                    </span>
                  </div>

                  <h3 
                    className="text-xl md:text-2xl font-bold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {deliverable.title}
                  </h3>

                  {deliverable.description && (
                    <p 
                      className="text-sm mb-4"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {deliverable.description}
                    </p>
                  )}

                  {deliverable.features && deliverable.features.length > 0 && (
                    <ul className="space-y-2">
                      {deliverable.features.map((feature, idx) => (
                        <li 
                          key={idx}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          <Check 
                            size={16} 
                            className="mt-0.5 flex-shrink-0" 
                            style={{ color: 'var(--accent)' }}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Start Your Movie
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
