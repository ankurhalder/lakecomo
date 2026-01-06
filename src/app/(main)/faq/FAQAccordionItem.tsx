'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

interface FAQAccordionItemProps {
  index: number
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
  searchQuery: string
  highlightText: (text: string, query: string) => React.ReactNode
}

export default function FAQAccordionItem({
  index,
  question,
  answer,
  isExpanded,
  onToggle,
  searchQuery,
  highlightText,
}: FAQAccordionItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-xl border overflow-hidden transition-colors"
      style={{
        backgroundColor: isExpanded ? 'var(--bg-secondary)' : 'transparent',
        borderColor: isExpanded ? 'var(--text-secondary)' : 'var(--border-color)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-expanded={isExpanded}
      >
        <span
          className="text-sm font-medium tabular-nums"
          style={{ color: 'var(--text-secondary)', opacity: 0.4, minWidth: '28px' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span
          className="flex-1 text-base font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          {highlightText(question, searchQuery)}
        </span>
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
          style={{
            backgroundColor: isExpanded ? 'var(--accent)' : 'var(--text-secondary)',
            opacity: isExpanded ? 1 : 0.2,
          }}
        >
          <Plus
            size={18}
            style={{ color: isExpanded ? 'var(--bg-primary)' : 'var(--text-primary)' }}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-0 pl-[72px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-sm leading-relaxed"
                style={{ opacity: 0.85 }}
              >
                {highlightText(answer, searchQuery)}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
