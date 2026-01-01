'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import { Globe, Instagram, Linkedin, Twitter } from 'lucide-react'

interface CrewMemberSocials {
  website?: string
  instagram?: string
  linkedin?: string
  twitter?: string
}

interface CrewMemberCardProps {
  name: string
  role: string
  imageUrl?: string
  bio: string[]
  socials?: CrewMemberSocials
  index: number
  isReversed?: boolean
}

export default function CrewMemberCard({ 
  name, 
  role, 
  imageUrl, 
  bio, 
  socials, 
  index,
  isReversed = false 
}: CrewMemberCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const imageDirection = isReversed ? 1 : -1
  const textDirection = isReversed ? -1 : 1
  
  return (
    <motion.article 
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className={`max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isReversed ? 'lg:grid-flow-dense' : ''}`}>
        <motion.div 
          className={`relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl ${isReversed ? 'lg:col-start-2' : ''}`}
          initial={{ 
            opacity: 0, 
            x: imageDirection * 100,
            clipPath: isReversed 
              ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' 
              : 'polygon(0 0, 0 0, 0 100%, 0 100%)'
          }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <span 
                className="text-6xl font-bold opacity-20"
                style={{ color: 'var(--text-primary)' }}
              >
                {name.charAt(0)}
              </span>
            </div>
          )}
          
          <motion.div 
            className="absolute inset-0"
            style={{ 
              background: isReversed 
                ? 'linear-gradient(to left, transparent 60%, var(--bg-primary))' 
                : 'linear-gradient(to right, transparent 60%, var(--bg-primary))'
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          />
        </motion.div>

        <motion.div 
          className={`space-y-6 ${isReversed ? 'lg:col-start-1 lg:text-right' : ''}`}
          initial={{ 
            opacity: 0, 
            x: textDirection * 100,
            clipPath: isReversed 
              ? 'polygon(0 0, 0 0, 0 100%, 0 100%)' 
              : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
          }}
          animate={isInView ? { 
            opacity: 1, 
            x: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          } : {}}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <div>
            <motion.span
              className="text-xs md:text-sm uppercase tracking-[0.3em] font-medium"
              style={{ color: 'var(--accent)' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6 }}
            >
              {role}
            </motion.span>
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.7 }}
            >
              {name}
            </motion.h2>
          </div>

          <div className="space-y-4">
            {bio.map((paragraph, idx) => (
              <motion.p
                key={idx}
                className="text-sm md:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.8 + idx * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {socials && Object.values(socials).some(Boolean) && (
            <motion.div 
              className={`flex gap-4 pt-4 ${isReversed ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1.2 }}
            >
              {socials.website && (
                <a 
                  href={socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-label={`${name}'s website`}
                >
                  <Globe size={18} />
                </a>
              )}
              {socials.instagram && (
                <a 
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-label={`${name}'s Instagram`}
                >
                  <Instagram size={18} />
                </a>
              )}
              {socials.linkedin && (
                <a 
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-label={`${name}'s LinkedIn`}
                >
                  <Linkedin size={18} />
                </a>
              )}
              {socials.twitter && (
                <a 
                  href={socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  aria-label={`${name}'s Twitter`}
                >
                  <Twitter size={18} />
                </a>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute left-0 right-0 bottom-0 h-px"
        style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.1 }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />
    </motion.article>
  )
}
