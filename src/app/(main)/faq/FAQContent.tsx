'use client'

import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, ChevronDown, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import LaurelBadge from '@/components/shared/LaurelBadge'
import FAQAccordionItem from './FAQAccordionItem'

interface Category {
  name: string
  slug: string
}

interface FAQItem {
  question: string
  answer: string
  category: string
}

interface FAQPageData {
  title?: string
  hero?: {
    preHeading?: string
    mainHeading?: string
    description?: string
    searchPlaceholder?: string
  }
  categories?: Category[]
  faqs?: FAQItem[]
  contactCta?: {
    text?: string
    buttonText?: string
    buttonLink?: string
  }
}

const defaultCategories: Category[] = [
  { name: 'Experience', slug: 'experience' },
  { name: 'Logistics', slug: 'logistics' },
  { name: 'Booking', slug: 'booking' },
  { name: 'Pricing', slug: 'pricing' },
]

const defaultFaqs: FAQItem[] = [
  {
    question: 'What costumes do you offer?',
    answer: 'We offer a collection of over 3,000 couture costumes and props, spanning multiple time periods, styles, and themes. The collection includes elegant, theatrical, historical, fantasy, and bespoke pieces, each selected for its craftsmanship, visual impact, and suitability for immersive, high-end events.',
    category: 'experience',
  },
  {
    question: 'Can the experience be customized for a specific event?',
    answer: 'Yes. Every experience is bespoke and tailored to the event\'s setting, guest profile, and overall atmosphere. Customization is managed entirely by our team as part of the experience.',
    category: 'experience',
  },
  {
    question: 'Where are your offices based?',
    answer: 'We have offices in New Jersey, USA, and on Lake Como, Italy. From these locations, our team manages creative direction, costume curation, and event logistics, providing seamless support for clients both locally and internationally.',
    category: 'logistics',
  },
  {
    question: 'Where do you provide services?',
    answer: 'We provide immersive experiences for clients in Italy and the USA, including destination weddings and private events. All logistics, transport, and coordination are handled by our team to ensure a seamless experience.',
    category: 'logistics',
  },
  {
    question: 'Can clients preview the experience before booking?',
    answer: 'Yes. We offer private presentations and curated previews, either in person or virtually, allowing clients to explore themes, costumes, and storytelling approaches in advance.',
    category: 'experience',
  },
  {
    question: 'Do you provide on-site support during events?',
    answer: 'Yes. We manage all elements of the on-site execution, including costume styling, coordination, creative oversight, and filming to ensure the experience is delivered exactly as designed.',
    category: 'logistics',
  },
  {
    question: 'How far in advance should we book?',
    answer: 'Unforgettable experiences take time to perfect. As we plan for each season ahead, early bookings are essential to secure your preferred date. During peak wedding and event seasons, we do not accept last-minute bookings, as each experience is carefully orchestrated to create a seamless, cinematic event.',
    category: 'booking',
  },
  {
    question: 'How does pricing work?',
    answer: 'Our experiences are offered in packages starting at €4,995 (~$5,850 USD), with final pricing depending on the scope of the experience, including costumes, storytelling, staffing, filming, duration, and location. All proposals are custom-tailored to the event.',
    category: 'pricing',
  },
  {
    question: 'How do we get started?',
    answer: 'Clients may reach out directly to book or schedule a consultation. Our team handles all aspects of the experience, from planning to execution, ensuring a seamless process.',
    category: 'booking',
  },
]

export default function FAQContent({ data }: { data?: FAQPageData | null }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const hero = data?.hero || {}
  const categories = data?.categories?.length ? data.categories : defaultCategories
  const faqs = data?.faqs?.length ? data.faqs : defaultFaqs
  const contactCta = data?.contactCta || {}

  const filteredFaqs = useMemo(() => {
    let results = faqs

    if (activeCategory !== 'all') {
      results = results.filter((faq) => faq.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }

    return results
  }, [faqs, activeCategory, searchQuery])

  const clearSearch = () => {
    setSearchQuery('')
  }

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-white/20 text-white px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <section className="min-h-[50vh] flex items-center px-4 md:px-8 lg:px-12 relative">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto pt-28 pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.p
              className="text-xs md:text-sm uppercase tracking-[0.4em] mb-4"
              style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {hero.preHeading || 'Help Center'}
            </motion.p>

            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 tracking-tight leading-[1.1]"
              style={{ color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hero.mainHeading || 'Frequently Asked Questions'}
            </motion.h1>

            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mb-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div
                className="h-px w-8 md:w-12"
                style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}
              />
              <span
                className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-light"
                style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              >
                Find Your Answers
              </span>
              <div
                className="h-px w-8 md:w-12"
                style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}
              />
            </motion.div>

            {hero.description && (
              <motion.p
                className="max-w-xl leading-relaxed text-sm md:text-base mx-auto lg:mx-0"
                style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {hero.description}
              </motion.p>
            )}

            <motion.div
              className="mt-8 flex flex-col items-center lg:items-start gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span
                className="text-xs uppercase tracking-[0.2em] font-light"
                style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
              >
                Scroll to explore
              </span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                <ChevronDown size={28} style={{ color: 'var(--text-secondary)', opacity: 0.4 }} />
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:flex justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
          >
            <LaurelBadge
              title="GET ANSWERS"
              subtitle="Questions? We're Here to Help"
              tag="24/7"
              link="/contact"
              themeAware={true}
              index={0}
            />
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          className="relative mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={hero.searchPlaceholder || 'Search questions...'}
              className="w-full pl-12 pr-12 py-4 rounded-xl text-base transition-all focus:outline-none focus:ring-2 focus:ring-white/30 border"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-color)',
              }}
            />
            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearSearch}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors hover:bg-white/20"
                  style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                  aria-label="Clear search"
                >
                  <X size={16} style={{ color: 'var(--text-primary)' }} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
              activeCategory === 'all'
                ? 'bg-white text-black border-white'
                : 'bg-transparent border-white/20 hover:border-white/40'
            }`}
            style={{
              color: activeCategory === 'all' ? undefined : 'var(--text-primary)',
            }}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                activeCategory === cat.slug
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent border-white/20 hover:border-white/40'
              }`}
              style={{
                color: activeCategory === cat.slug ? undefined : 'var(--text-primary)',
              }}
            >
              {cat.name}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="flex items-center justify-between mb-4 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
            Showing {filteredFaqs.length} of {faqs.length} questions
          </span>
        </motion.div>

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQAccordionItem
                  key={faq.question}
                  index={index}
                  question={faq.question}
                  answer={faq.answer}
                  searchQuery={searchQuery}
                  highlightText={highlightText}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <HelpCircle size={28} style={{ color: 'var(--text-secondary)', opacity: 0.5 }} />
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                  No questions found
                </h3>
                <p
                  className="text-sm mb-6"
                  style={{ color: 'var(--text-secondary)', opacity: 0.7 }}
                >
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setActiveCategory('all')
                  }}
                  className="px-6 py-2 text-sm font-medium rounded-full border transition-all hover:bg-white hover:text-black"
                  style={{
                    borderColor: 'var(--text-secondary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div
            className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-color)',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              <MessageCircle size={24} style={{ color: 'var(--bg-primary)' }} />
            </div>
            <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>
              {contactCta.text || 'Still have questions?'}
            </p>
            <Link href={contactCta.buttonLink || '/contact'}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider rounded-full transition-all"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                {contactCta.buttonText || 'Contact Us'}
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
