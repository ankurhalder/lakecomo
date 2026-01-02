'use client'

import { motion } from 'framer-motion'
import CrewHero from './CrewHero'
import CrewMemberCard from './CrewMemberCard'
import type { CrewPageData } from '@/sanity/lib/getCrewPage'

interface CrewContentProps {
  data: CrewPageData
}

export default function CrewContent({ data }: CrewContentProps) {
  const { hero, heroFeature, crewMembers } = data

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <CrewHero hero={hero} heroFeature={heroFeature} />

      <section className="relative">
        {crewMembers && crewMembers.length > 0 ? (
          <div>
            {crewMembers.map((member, index) => (
              <CrewMemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                imageUrl={member.imageUrl}
                bio={member.bio}
                index={index}
                isReversed={index % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p style={{ color: 'var(--text-secondary)' }}>
              No crew members found. Add them in Sanity Studio.
            </p>
          </div>
        )}
      </section>

      <section className="px-4 md:px-8 lg:px-12 py-16 md:py-24">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Ready to Create Magic Together?
          </h2>
          <p 
            className="text-base md:text-lg mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Let our international team bring your cinematic vision to life.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </section>
    </div>
  )
}
