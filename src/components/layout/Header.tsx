'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header({ data }: { data: any }) {
  
  const logoText = data?.logoText || "Lake Como Style Official Site";
  const links = data?.links || [];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-black text-white px-6 md:px-12 h-20 flex items-center justify-between"
    >
      <Link href="/" className="text-xl font-bold tracking-wide font-sans">
        {logoText}
      </Link>
      
      <div className="flex items-center gap-8">
        {}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((link: any, idx: number) => (
            <Link 
              key={idx} 
              href={link.url} 
              className="text-sm font-light uppercase tracking-widest hover:text-gray-300 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {}
        <button className="flex flex-col gap-1.5 p-2 group">
          <div className="w-8 h-0.5 bg-white transition-all group-hover:w-6 ml-auto"></div>
          <div className="w-8 h-0.5 bg-white transition-all"></div>
          <div className="w-8 h-0.5 bg-white transition-all group-hover:w-6 ml-auto"></div>
        </button>
      </div>
    </motion.header>
  )
}