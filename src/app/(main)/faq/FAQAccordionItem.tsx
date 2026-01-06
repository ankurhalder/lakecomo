'use client'

import { motion } from 'framer-motion'

interface FAQAccordionItemProps {
  index: number
  question: string
  answer: string
  searchQuery: string
  highlightText: (text: string, query: string) => React.ReactNode
}

export default function FAQAccordionItem({
  index,
  question,
  answer,
  searchQuery,
  highlightText,
}: FAQAccordionItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-xl border overflow-hidden transition-colors p-5"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="flex items-start gap-4 text-left">
        <span
          className="text-sm font-medium tabular-nums pt-1"
          style={{ color: 'var(--text-secondary)', opacity: 0.4, minWidth: '28px' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <div className="flex-1 space-y-3">
          <h3
            className="text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            {highlightText(question, searchQuery)}
          </h3>
          <div
            style={{ color: 'var(--text-secondary)' }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.85 }}
            >
              {highlightText(answer, searchQuery)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
