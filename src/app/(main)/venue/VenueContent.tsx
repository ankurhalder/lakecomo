'use client'

import { motion } from 'framer-motion'
import VenueHero from './VenueHero'
import ParallaxGallery from './ParallaxGallery'
import YouTubeEmbed from './YouTubeEmbed'
import type { VenuePageData } from '@/sanity/lib/getVenuePage'
import { ExternalLink, Users, Car, LayoutGrid, Landmark, Sparkles } from 'lucide-react'

interface VenueContentProps {
  data: VenuePageData
}

const FEATURE_ICONS: Record<string, React.ReactNode> = {
  'Capacity': <Users size={24} />,
  'Accessibility': <Car size={24} />,
  'Interior Spaces': <LayoutGrid size={24} />,
  'Historic Heritage': <Landmark size={24} />,
}

export default function VenueContent({ data }: VenueContentProps) {
  const { hero, heroFeature, description, features, eventInfo, galleryImages, youtubeUrl, externalLinks } = data

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <VenueHero hero={hero} heroFeature={heroFeature} galleryImages={galleryImages} />

      <section className="py-16 md:py-24 px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {description && description.length > 0 && (
            <div className="space-y-6 mb-16">
              {description.map((paragraph, idx) => (
                <motion.p
                  key={idx}
                  className="text-lg md:text-xl leading-relaxed font-light"
                  style={{ color: 'var(--text-secondary)' }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          )}

          {features && features.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {features.map((feature, idx) => {
                const icon = FEATURE_ICONS[feature.title] || <Sparkles size={24} />
                
                return (
                  <motion.div
                    key={feature.title}
                    className="p-6 rounded-xl group cursor-default"
                    style={{ backgroundColor: 'var(--bg-secondary)' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ 
                          backgroundColor: 'var(--accent)',
                          color: 'var(--bg-primary)'
                        }}
                        whileHover={{ rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                      >
                        {icon}
                      </motion.div>
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-bold mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {feature.title}
                        </h3>
                        {feature.description && (
                          <p 
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}

          {eventInfo && (
            <motion.div
              className="p-8 rounded-2xl text-center relative overflow-hidden"
              style={{ 
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="absolute top-4 left-4 opacity-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={60} style={{ color: 'var(--accent)' }} />
              </motion.div>
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: 'var(--text-primary)' }}
              >
                The Experience
              </h3>
              <p 
                className="text-base leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                {eventInfo}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <ParallaxGallery images={galleryImages} />

      {youtubeUrl && (
        <YouTubeEmbed url={youtubeUrl} title="Explore Palazzo Odescalchi" />
      )}

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
            Host Your Event at the Palace
          </h2>
          <p 
            className="text-base md:text-lg mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Create unforgettable memories in this historic setting.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              href={externalLinks?.bookingLink || '/contact'}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
            >
              Book Your Experience
            </motion.a>
            {externalLinks?.palaceWebsite && (
              <motion.a
                href={externalLinks.palaceWebsite}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-8 py-4 text-sm md:text-base font-bold uppercase tracking-widest rounded-full transition-colors border"
                style={{ 
                  borderColor: 'var(--text-secondary)',
                  color: 'var(--text-primary)'
                }}
              >
                Visit Palace Website
                <ExternalLink size={16} />
              </motion.a>
            )}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
