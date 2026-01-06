'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Clapperboard } from 'lucide-react'
import Link from 'next/link'


interface SocialLink {
  platform: string;
  url: string;
}

interface FooterData {
  copyright?: string;
  email?: string;
  footerTagline?: string;
  socialLinks?: SocialLink[];
}

export default function Footer({ data }: { data: FooterData }) {
  const socialLinks = data?.socialLinks || [];

  const getIcon = (platform: string) => {
    const p = platform.toLowerCase();
    if (p.includes('insta')) return <Instagram size={16} />;
    if (p.includes('face')) return <Facebook size={16} />;
    return <Clapperboard size={16} />; 
  }

  return (
    <motion.footer 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-0 left-0 w-full z-40 backdrop-blur-md px-4 md:px-8 lg:px-12 py-3 md:py-0 md:h-20 flex flex-col md:flex-row items-center justify-between text-[10px] md:text-sm gap-2 md:gap-0 border-t transition-colors"
      style={{ 
        backgroundColor: 'var(--header-bg)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)'
      }}
      suppressHydrationWarning
    >
      <div className="flex flex-col items-center md:items-start gap-0.5 md:gap-1 order-2 md:order-1">
        <span style={{ color: 'var(--text-secondary)' }}>{data?.copyright || '© 2025 Lake Como Style'}</span>
        <a href={`mailto:${data?.email}`} className="hover:opacity-70 transition-opacity hidden md:block">
          {data?.email || 'info@lakecomostyle.it'}
        </a>
      </div>

      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="block font-bold uppercase tracking-[0.15em] lg:tracking-[0.2em] text-xs lg:text-sm mb-0.5">Lake Como Style</span>
        <span className="block font-light italic text-[10px] lg:text-xs" style={{ color: 'var(--text-secondary)' }}>{data?.footerTagline}</span>
      </div>

      <div className="flex gap-4 md:gap-6 order-1 md:order-3">
        {socialLinks.map((social: SocialLink, idx: number) => (
          <Link 
            key={idx} 
            href={social.url} 
            target="_blank" 
            className="hover:opacity-70 transition-opacity p-1"
          >
            {getIcon(social.platform)}
          </Link>
        ))}
      </div>
    </motion.footer>
  )
}