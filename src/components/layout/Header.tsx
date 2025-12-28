'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface NavLink {
  label: string;
  url: string;
}

interface HeaderData {
  logoText?: string;
  links?: NavLink[];
  ctaText?: string;
  ctaLink?: string;
}

export default function Header({ data }: { data: HeaderData }) {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const logoText = data?.logoText || "Lake Como Style";
  const links = data?.links || [];

  const menuVariants = {
    closed: { 
      opacity: 0, 
      x: "100%",
      transition: { duration: 0.3, ease: "easeInOut" as const }
    },
    open: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeInOut" as const }
    }
  }

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.1 + i * 0.05 }
    })
  }

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-md px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between border-b transition-colors"
        style={{ 
          backgroundColor: 'var(--header-bg)',
          color: 'var(--text-primary)',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
      >
        <Link href="/" className="text-base md:text-xl font-bold tracking-wide font-sans z-10">
          {logoText}
        </Link>
        
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {links.map((link: NavLink, idx: number) => (
              <Link 
                key={idx} 
                href={link.url} 
                className="text-xs xl:text-sm font-light uppercase tracking-widest transition-colors relative group"
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
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-colors"
            style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button 
            className="lg:hidden flex items-center justify-center w-9 h-9 md:w-10 md:h-10 z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <nav className="flex flex-col items-center gap-6">
              {links.map((link: NavLink, idx: number) => (
                <motion.div
                  key={idx}
                  custom={idx}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                >
                  <Link 
                    href={link.url}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-light uppercase tracking-widest transition-colors hover:opacity-70"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.button 
              onClick={toggleTheme}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex items-center gap-3 px-6 py-3 rounded-full transition-colors"
              style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              <span className="text-sm uppercase tracking-wider">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}