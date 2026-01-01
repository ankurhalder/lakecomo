'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, X, Menu } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'
import { useLenis } from '@/components/providers/SmoothScroll'

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
  const { theme, toggleTheme, mounted } = useTheme()
  const { stop: stopLenis, start: startLenis } = useLenis()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  
  const logoText = data?.logoText || "Lake Como Style";
  const links = data?.links || [];

  useEffect(() => {
    if (isSidebarOpen) {
      stopLenis()
      document.body.style.overflow = 'hidden'
    } else {
      startLenis()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen, stopLenis, startLenis])

  const sidebarVariants = {
    closed: { 
      x: "100%",
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
    },
    open: { 
      x: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as const }
    }
  }

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  }

  const linkVariants = {
    closed: { opacity: 0, x: 30 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.2 + i * 0.08, duration: 0.4, ease: "easeOut" as const }
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
          borderColor: (!mounted || theme === 'dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
        }}
      >
        <Link href="/" className="text-base md:text-xl font-bold tracking-wide font-sans z-10">
          {logoText}
        </Link>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-colors"
            style={{ backgroundColor: (!mounted || theme === 'dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            aria-label="Toggle theme"
          >
            {mounted ? (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />) : <Sun size={16} />}
          </button>

          <button 
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-colors"
            style={{ backgroundColor: (!mounted || theme === 'dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              variants={overlayVariants}
              initial="closed"
              animate="open"
              exit="closed"
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-full max-w-md z-[70] flex flex-col border-l overflow-y-auto"
              style={{ 
                backgroundColor: 'var(--bg-primary)',
                borderColor: (!mounted || theme === 'dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                overscrollBehavior: 'contain'
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <span className="text-xs uppercase tracking-[0.3em] font-light" style={{ color: 'var(--text-secondary)' }}>
                  Menu
                </span>
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSidebarOpen(false)
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setIsSidebarOpen(false)
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-colors touch-manipulation"
                  style={{ backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col justify-start px-8 py-8 gap-1 overflow-y-auto">
                {links.map((link: NavLink, idx: number) => (
                  <motion.div
                    key={link.label}
                    custom={idx}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link 
                      href={link.url}
                      onClick={() => setIsSidebarOpen(false)}
                      className="block py-3 text-2xl md:text-3xl font-light tracking-tight transition-all hover:translate-x-2 hover:opacity-70"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-8 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                <p className="text-center text-xs" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>
                  Cinematic Event Experiences
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}