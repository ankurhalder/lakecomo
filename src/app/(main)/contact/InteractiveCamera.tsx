'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface InteractiveCameraProps {
  focusedField?: string | null
  isSubmitting?: boolean
}

export default function InteractiveCamera({ focusedField, isSubmitting }: InteractiveCameraProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 120 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothMouseY, [-200, 200], [15, -15])
  const rotateY = useTransform(smoothMouseX, [-200, 200], [-20, 20])
  const rotateZ = useTransform(smoothMouseX, [-200, 200], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const reelRotation = focusedField ? 360 : 0
  const lensGlow = focusedField ? 0.6 : 0.3

  return (
    <div ref={containerRef} className="relative w-56 h-56 md:w-64 md:h-64 mx-auto" style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          rotateZ,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          animate={isSubmitting ? { rotate: [0, 360] } : {}}
          transition={isSubmitting ? { duration: 2, repeat: Infinity, ease: "linear" } : {}}
        >
          <defs>
            <linearGradient id="cameraBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#4A4A4A' }} />
              <stop offset="50%" style={{ stopColor: '#2A2A2A' }} />
              <stop offset="100%" style={{ stopColor: '#1A1A1A' }} />
            </linearGradient>
            <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#888' }} />
              <stop offset="50%" style={{ stopColor: '#555' }} />
              <stop offset="100%" style={{ stopColor: '#333' }} />
            </linearGradient>
            <linearGradient id="lensGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#1a3a5c' }} />
              <stop offset="50%" style={{ stopColor: '#0d1f30' }} />
              <stop offset="100%" style={{ stopColor: '#061520' }} />
            </linearGradient>
            <radialGradient id="lensReflection" cx="30%" cy="30%" r="60%">
              <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.4)' }} />
              <stop offset="100%" style={{ stopColor: 'transparent' }} />
            </radialGradient>
            <filter id="cameraShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" />
              <feOffset dx="3" dy="5" result="offsetblur" />
              <feComponentTransfer>
                <feFuncA type="linear" slope="0.3" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g filter="url(#cameraShadow)">
            <motion.g
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <rect x="40" y="70" width="120" height="80" rx="8" fill="url(#cameraBodyGradient)" />
              
              <rect x="45" y="75" width="110" height="70" rx="5" fill="#1a1a1a" opacity="0.5" />
              
              <rect x="55" y="50" width="90" height="25" rx="4" fill="url(#metalGradient)" />
              
              <motion.g
                animate={{ rotate: reelRotation }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: '75px 62px' }}
              >
                <circle cx="75" cy="62" r="12" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
                <circle cx="75" cy="62" r="8" fill="#1a1a1a" />
                <circle cx="75" cy="62" r="3" fill="#555" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <motion.circle
                    key={angle}
                    cx={75 + 6 * Math.cos((angle * Math.PI) / 180)}
                    cy={62 + 6 * Math.sin((angle * Math.PI) / 180)}
                    r="1"
                    fill="#666"
                  />
                ))}
              </motion.g>

              <motion.g
                animate={{ rotate: -reelRotation }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ transformOrigin: '125px 62px' }}
              >
                <circle cx="125" cy="62" r="12" fill="#2a2a2a" stroke="#444" strokeWidth="1" />
                <circle cx="125" cy="62" r="8" fill="#1a1a1a" />
                <circle cx="125" cy="62" r="3" fill="#555" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                  <motion.circle
                    key={angle}
                    cx={125 + 6 * Math.cos((angle * Math.PI) / 180)}
                    cy={62 + 6 * Math.sin((angle * Math.PI) / 180)}
                    r="1"
                    fill="#666"
                  />
                ))}
              </motion.g>

              <g>
                <circle cx="100" cy="110" r="32" fill="url(#metalGradient)" />
                <circle cx="100" cy="110" r="28" fill="#1a1a1a" />
                <circle cx="100" cy="110" r="25" fill="url(#lensGradient)" />
                
                <motion.circle
                  cx="100"
                  cy="110"
                  r="22"
                  fill="transparent"
                  stroke="rgba(100,180,255,0.3)"
                  strokeWidth="1"
                  animate={{ opacity: [0.3, lensGlow, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <circle cx="100" cy="110" r="20" fill="url(#lensReflection)" />
                
                <motion.circle
                  cx="90"
                  cy="100"
                  r="6"
                  fill="rgba(255,255,255,0.15)"
                  animate={{ opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                <circle cx="100" cy="110" r="8" fill="#0a1520" />
                <circle cx="100" cy="110" r="4" fill="#050a10" />
                
                {[0, 60, 120, 180, 240, 300].map((angle) => (
                  <line
                    key={angle}
                    x1={100 + 10 * Math.cos((angle * Math.PI) / 180)}
                    y1={110 + 10 * Math.sin((angle * Math.PI) / 180)}
                    x2={100 + 18 * Math.cos((angle * Math.PI) / 180)}
                    y2={110 + 18 * Math.sin((angle * Math.PI) / 180)}
                    stroke="rgba(80,80,80,0.5)"
                    strokeWidth="0.5"
                  />
                ))}
              </g>

              <rect x="155" y="90" width="12" height="30" rx="2" fill="url(#metalGradient)" />
              
              <motion.circle 
                cx="161" 
                cy="100" 
                r="4" 
                fill={focusedField ? "#ef4444" : "#333"}
                animate={focusedField ? { opacity: [1, 0.5, 1] } : {}}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              
              <rect x="35" y="100" width="8" height="20" rx="2" fill="url(#metalGradient)" />

              <rect x="60" y="148" width="20" height="8" rx="2" fill="#333" />
              <rect x="120" y="148" width="20" height="8" rx="2" fill="#333" />
            </motion.g>
          </g>
        </motion.svg>
      </motion.div>

      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-light whitespace-nowrap"
        style={{ color: 'var(--text-secondary)' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: focusedField ? 0.8 : 0.5,
          y: focusedField ? -4 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {isSubmitting ? "🎬 Rolling..." : focusedField ? "🎥 Recording..." : "📹 Ready to film"}
      </motion.div>
    </div>
  )
}
