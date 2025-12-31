'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

export type CharacterExpression = 'idle' | 'attentive' | 'happy' | 'concerned' | 'privacy'

interface ContactCharacterProps {
  expression?: CharacterExpression
  focusedField?: string | null
}

export default function ContactCharacter({ 
  expression = 'idle',
  focusedField 
}: ContactCharacterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 200 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const leftPupilX = useTransform(smoothMouseX, [-200, 200], [-8, 8])
  const leftPupilY = useTransform(smoothMouseY, [-200, 200], [-5, 5])
  const rightPupilX = useTransform(smoothMouseX, [-200, 200], [-8, 8])
  const rightPupilY = useTransform(smoothMouseY, [-200, 200], [-5, 5])

  const headRotate = useTransform(smoothMouseX, [-300, 300], [-5, 5])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || expression === 'privacy') return
      
      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, expression])

  const getEyebrowPosition = () => {
    switch (expression) {
      case 'attentive': return -5
      case 'happy': return -3
      case 'concerned': return 4
      default: return 0
    }
  }

  const getMouthPath = () => {
    switch (expression) {
      case 'happy':
        return 'M 82 142 Q 100 165 118 142'
      case 'concerned':
        return 'M 85 152 Q 100 145 115 152'
      case 'attentive':
        return 'M 90 148 Q 100 152 110 148'
      default:
        return 'M 88 148 Q 100 154 112 148'
    }
  }

  const getEyeScale = () => {
    if (expression === 'happy') return { scaleY: 0.6 }
    if (expression === 'privacy') return { scaleY: 0.1 }
    return { scaleY: 1 }
  }

  const getHeadTilt = () => {
    if (expression === 'privacy') return 25
    return 0
  }

  return (
    <div ref={containerRef} className="relative w-48 h-48 md:w-56 md:h-56 mx-auto">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ rotate: headRotate }}
        animate={{ rotate: getHeadTilt() }}
        transition={{ type: 'spring', damping: 20, stiffness: 150 }}
      >
        <defs>
          <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFE4C9' }} />
            <stop offset="100%" style={{ stopColor: '#FFD4B3' }} />
          </linearGradient>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4A3728' }} />
            <stop offset="100%" style={{ stopColor: '#2D1F14' }} />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="3" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g 
          filter="url(#softShadow)"
          animate={{ y: expression === 'attentive' ? -2 : 0 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <ellipse 
            cx="100" 
            cy="165" 
            rx="45" 
            ry="25" 
            fill="url(#hairGradient)"
            opacity="0.9"
          />

          <motion.ellipse
            cx="55"
            cy="95"
            rx="12"
            ry="18"
            fill="url(#faceGradient)"
            style={{ transformOrigin: 'center' }}
          />
          <motion.ellipse
            cx="145"
            cy="95"
            rx="12"
            ry="18"
            fill="url(#faceGradient)"
            style={{ transformOrigin: 'center' }}
          />

          <ellipse 
            cx="100" 
            cy="100" 
            rx="50" 
            ry="60" 
            fill="url(#faceGradient)"
          />

          <path
            d="M 50 80 Q 60 30 100 25 Q 140 30 150 80 Q 145 50 100 45 Q 55 50 50 80"
            fill="url(#hairGradient)"
          />

          <ellipse cx="100" cy="25" rx="25" ry="12" fill="url(#hairGradient)" />

          <motion.g animate={getEyeScale()} style={{ transformOrigin: '75px 90px' }}>
            <motion.g animate={{ y: getEyebrowPosition() }}>
              <path
                d="M 60 75 Q 75 70 90 75"
                stroke="#4A3728"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </motion.g>
            
            <ellipse cx="75" cy="90" rx="12" ry="10" fill="white" />
            <ellipse cx="75" cy="90" rx="11" ry="9" fill="#FAFAFA" />
            
            <motion.g style={{ x: leftPupilX, y: leftPupilY }}>
              <circle cx="75" cy="90" r="5" fill="#2D1F14" />
              <circle cx="72" cy="88" r="1.5" fill="white" />
            </motion.g>
          </motion.g>

          <motion.g animate={getEyeScale()} style={{ transformOrigin: '125px 90px' }}>
            <motion.g animate={{ y: getEyebrowPosition() }}>
              <path
                d="M 110 75 Q 125 70 140 75"
                stroke="#4A3728"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </motion.g>
            
            <ellipse cx="125" cy="90" rx="12" ry="10" fill="white" />
            <ellipse cx="125" cy="90" rx="11" ry="9" fill="#FAFAFA" />
            
            <motion.g style={{ x: rightPupilX, y: rightPupilY }}>
              <circle cx="125" cy="90" r="5" fill="#2D1F14" />
              <circle cx="122" cy="88" r="1.5" fill="white" />
            </motion.g>
          </motion.g>

          <ellipse cx="100" cy="115" rx="5" ry="3" fill="#EEBB99" />

          <motion.path
            d={getMouthPath()}
            stroke="#C97B7B"
            strokeWidth="4"
            fill={expression === 'happy' ? '#FFB6B6' : 'none'}
            strokeLinecap="round"
            initial={false}
            animate={{ d: getMouthPath() }}
            transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          />

          <ellipse cx="65" cy="110" rx="8" ry="5" fill="#FFB6A3" opacity="0.4" />
          <ellipse cx="135" cy="110" rx="8" ry="5" fill="#FFB6A3" opacity="0.4" />
        </motion.g>

        {expression === 'privacy' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <text
              x="100"
              y="175"
              textAnchor="middle"
              fontSize="8"
              fill="var(--text-secondary)"
              opacity="0.6"
            >
              🤫
            </text>
          </motion.g>
        )}
      </motion.svg>

      <motion.div
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-light"
        style={{ color: 'var(--text-secondary)', opacity: 0.5 }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: focusedField ? 0.7 : 0.4,
          y: focusedField ? -2 : 0 
        }}
      >
        {expression === 'privacy' && "I'll look away..."}
        {expression === 'attentive' && focusedField && "I'm listening..."}
        {expression === 'happy' && "Wonderful!"}
      </motion.div>
    </div>
  )
}
