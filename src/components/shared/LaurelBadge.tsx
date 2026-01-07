'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MotionLink = motion.create(Link);

export interface LaurelBadgeProps {
  title: string;
  subtitle?: string;
  tag?: string;
  link?: string;
  themeAware?: boolean;
  index?: number;
}

const itemVariants = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
}

export default function LaurelBadge({ 
  title, 
  subtitle, 
  tag, 
  link, 
  themeAware = false,
  index = 0 
}: LaurelBadgeProps) {
  const textColor = themeAware ? 'var(--text-primary)' : '#ffffff'
  const subtitleColor = themeAware ? 'var(--text-secondary)' : 'rgba(255, 255, 255, 0.9)'
  
  return (
    <MotionLink
      href={link || '#'}
      variants={itemVariants}
      whileHover={{ 
        scale: 1.08, 
        rotate: 2,
        transition: { type: "spring" as const, stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative w-[120px] sm:w-[130px] md:w-[140px] lg:w-[140px] xl:w-[150px] 2xl:w-[200px] aspect-[4/3] flex items-center justify-center text-center"
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ rotate: -5, opacity: 0 }}
        animate={{ rotate: 0, opacity: 0.9 }}
        transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
        style={themeAware ? { filter: 'var(--laurel-filter, none)' } : undefined}
      >
        <Image
          src="/assets/laurel-wreath.png"
          alt="Laurel wreath decoration"
          fill
          sizes="220px"
          className="object-contain pointer-events-none"
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center justify-center gap-0.5 md:gap-0.5 px-5 sm:px-7 md:px-8 py-3 sm:py-4 md:py-5">
        {subtitle && (
          <motion.p 
            className="text-[5.5px] sm:text-[6px] md:text-[7px] lg:text-[8px] uppercase tracking-wider font-light leading-tight max-w-[80px] sm:max-w-[90px] md:max-w-[100px]"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h3 
          className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg 2xl:text-xl font-extrabold uppercase tracking-tighter leading-none drop-shadow-lg font-sans my-0.5 md:my-1"
          style={{ color: textColor }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1 + index * 0.2, type: "spring" as const }}
        >
          {title}
        </motion.h3>

        {tag && (
          <motion.p 
            className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-[12px] uppercase tracking-[0.2em] font-medium"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + index * 0.2 }}
          >
            {tag}
          </motion.p>
        )}
      </div>
    </MotionLink>
  );
}
