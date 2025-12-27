'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/providers/ThemeProvider'

export default function Header({ data }: { data: any }) {
  const { theme, toggleTheme } = useTheme()
  
  const logoText = data?.logoText || "Lake Como Style Official Site";
  const links = data?.links || [];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md px-6 md:px-12 h-20 flex items-center justify-between border-b transition-colors"
      style={{ 
        backgroundColor: 'var(--header-bg)',
        color: 'var(--text-primary)',
        borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
      }}
    >
      <Link href="/" className="text-xl font-bold tracking-wide font-sans">
        {logoText}
      </Link>
      
      <div className="flex items-center gap-8">
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link: any, idx: number) => (
            <Link 
              key={idx} 
              href={link.url} 
              className="text-sm font-light uppercase tracking-widest transition-colors relative group"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: 'var(--accent)' }}
              />
            </Link>
          ))}
        </nav>

        <button 
          onClick={toggleTheme}
          className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full transition-colors"
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="lg:hidden flex flex-col gap-1.5 p-2 group">
          <div className="w-8 h-0.5 transition-all group-hover:w-6 ml-auto" style={{ backgroundColor: 'var(--text-primary)' }} />
          <div className="w-8 h-0.5 transition-all" style={{ backgroundColor: 'var(--text-primary)' }} />
          <div className="w-8 h-0.5 transition-all group-hover:w-6 ml-auto" style={{ backgroundColor: 'var(--text-primary)' }} />
        </button>
      </div>
    </motion.header>
  )
}