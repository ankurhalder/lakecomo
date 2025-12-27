'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Clapperboard } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function Footer({ data }: { data: any }) {
  const { theme } = useTheme()
  const socialLinks = data?.socialLinks || [];

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('insta')) return <Instagram size={18} />;
    if (p.includes('face')) return <Facebook size={18} />;
    return <Clapperboard size={18} />; 
  }

  return (
    <motion.footer 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-0 left-0 w-full z-50 backdrop-blur-md px-6 md:px-12 h-24 md:h-20 flex flex-col md:flex-row items-center justify-between text-xs md:text-sm border-t transition-colors"
      style={{ 
        backgroundColor: 'var(--header-bg)',
        color: 'var(--text-primary)',
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}
    >
      <div className="flex flex-col items-center md:items-start gap-1">
        <span style={{ color: 'var(--text-secondary)' }}>{data?.copyright || '© 2025 Lake Como Style'}</span>
        <a href={`mailto:${data?.email}`} className="hover:opacity-70 transition-opacity">
          {data?.email || 'info@lakecomostyle.it'}
        </a>
      </div>

      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="block font-bold uppercase tracking-[0.2em] mb-1">Lake Como Style</span>
        <span className="block font-light italic text-xs" style={{ color: 'var(--text-secondary)' }}>{data?.footerTagline}</span>
      </div>

      <div className="flex gap-6 mt-2 md:mt-0">
        {socialLinks.map((social: any, idx: number) => (
          <Link 
            key={idx} 
            href={social.url} 
            target="_blank" 
            className="hover:opacity-70 transition-opacity"
          >
            {getIcon(social.platform)}
          </Link>
        ))}
      </div>
    </motion.footer>
  )
}