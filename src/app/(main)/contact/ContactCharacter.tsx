'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

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
  const [isBlinking, setIsBlinking] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 20, stiffness: 150 }
  const smoothMouseX = useSpring(mouseX, springConfig)
  const smoothMouseY = useSpring(mouseY, springConfig)

  const leftPupilX = useTransform(smoothMouseX, [-200, 200], [-10, 10])
  const leftPupilY = useTransform(smoothMouseY, [-200, 200], [-6, 6])
  const rightPupilX = useTransform(smoothMouseX, [-200, 200], [-10, 10])
  const rightPupilY = useTransform(smoothMouseY, [-200, 200], [-6, 6])

  const headRotate = useTransform(smoothMouseX, [-300, 300], [-8, 8])

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

  useEffect(() => {
    if (expression === 'privacy') return
    
    const blinkInterval = setInterval(() => {
      setIsBlinking(true)
      setTimeout(() => setIsBlinking(false), 150)
    }, 3000 + Math.random() * 2000)
    
    return () => clearInterval(blinkInterval)
  }, [expression])

  const getEyebrowPosition = () => {
    switch (expression) {
      case 'attentive': return { y: -6, rotation: 0 }
      case 'happy': return { y: -4, rotation: -5 }
      case 'concerned': return { y: 5, rotation: 10 }
      default: return { y: 0, rotation: 0 }
    }
  }

  const getMouthPath = () => {
    switch (expression) {
      case 'happy':
        return 'M 80 140 Q 100 168 120 140'
      case 'concerned':
        return 'M 85 155 Q 100 148 115 155'
      case 'attentive':
        return 'M 90 148 Q 100 153 110 148'
      default:
        return 'M 88 150 Q 100 156 112 150'
    }
  }

  const getEyeScale = () => {
    if (isBlinking) return { scaleY: 0.1 }
    if (expression === 'happy') return { scaleY: 0.5 }
    if (expression === 'privacy') return { scaleY: 0.08 }
    if (expression === 'attentive') return { scaleY: 1.1 }
    return { scaleY: 1 }
  }

  const getHeadTilt = () => {
    if (expression === 'privacy') return 30
    if (expression === 'happy') return -3
    if (expression === 'concerned') return 5
    return 0
  }

  const eyebrowData = getEyebrowPosition()

  return (
    <div ref={containerRef} className="relative w-56 h-56 md:w-64 md:h-64 mx-auto lg:mx-0">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ rotate: headRotate }}
        animate={{ rotate: getHeadTilt() }}
        transition={{ type: 'spring', damping: 15, stiffness: 100 }}
      >
        <defs>
          <linearGradient id="faceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFE8D0' }} />
            <stop offset="100%" style={{ stopColor: '#FFD4B8' }} />
          </linearGradient>
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#5A4030' }} />
            <stop offset="100%" style={{ stopColor: '#2D1F14' }} />
          </linearGradient>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.25" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g 
          filter="url(#softShadow)"
          animate={{ 
            y: expression === 'attentive' ? -3 : expression === 'happy' ? -2 : 0,
            scale: expression === 'happy' ? 1.02 : 1
          }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
        >
          <motion.g
            animate={{ y: [0, -1, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <ellipse 
              cx="100" 
              cy="165" 
              rx="48" 
              ry="28" 
              fill="url(#hairGradient)"
              opacity="0.9"
            />

            <motion.ellipse
              cx="52"
              cy="95"
              rx="14"
              ry="20"
              fill="url(#faceGradient)"
            />
            <motion.ellipse
              cx="148"
              cy="95"
              rx="14"
              ry="20"
              fill="url(#faceGradient)"
            />

            <ellipse 
              cx="100" 
              cy="100" 
              rx="52" 
              ry="62" 
              fill="url(#faceGradient)"
            />

            <path
              d="M 48 82 Q 58 28 100 22 Q 142 28 152 82 Q 147 48 100 42 Q 53 48 48 82"
              fill="url(#hairGradient)"
            />

            <ellipse cx="100" cy="22" rx="28" ry="14" fill="url(#hairGradient)" />

            <motion.g 
              animate={getEyeScale()} 
              style={{ transformOrigin: '72px 90px' }}
              transition={{ duration: 0.1 }}
            >
              <motion.path
                d="M 57 73 Q 72 68 87 73"
                stroke="#4A3728"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ 
                  y: eyebrowData.y,
                  rotate: eyebrowData.rotation
                }}
                style={{ transformOrigin: '72px 73px' }}
                transition={{ type: 'spring', damping: 12 }}
              />
              
              <ellipse cx="72" cy="90" rx="14" ry="12" fill="white" />
              <ellipse cx="72" cy="90" rx="13" ry="11" fill="#FAFAFA" />
              
              <motion.g style={{ x: leftPupilX, y: leftPupilY }}>
                <circle cx="72" cy="90" r="6" fill="#2D1F14" />
                <circle cx="69" cy="87" r="2" fill="white" />
              </motion.g>
            </motion.g>

            <motion.g 
              animate={getEyeScale()} 
              style={{ transformOrigin: '128px 90px' }}
              transition={{ duration: 0.1 }}
            >
              <motion.path
                d="M 113 73 Q 128 68 143 73"
                stroke="#4A3728"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                animate={{ 
                  y: eyebrowData.y, 
                  rotate: -eyebrowData.rotation 
                }}
                style={{ transformOrigin: '128px 73px' }}
                transition={{ type: 'spring', damping: 12 }}
              />
              
              <ellipse cx="128" cy="90" rx="14" ry="12" fill="white" />
              <ellipse cx="128" cy="90" rx="13" ry="11" fill="#FAFAFA" />
              
              <motion.g style={{ x: rightPupilX, y: rightPupilY }}>
                <circle cx="128" cy="90" r="6" fill="#2D1F14" />
                <circle cx="125" cy="87" r="2" fill="white" />
              </motion.g>
            </motion.g>

            <ellipse cx="100" cy="118" rx="6" ry="4" fill="#E8B090" />

            <motion.path
              d={getMouthPath()}
              stroke="#C97B7B"
              strokeWidth="4"
              fill={expression === 'happy' ? '#FFBABA' : 'none'}
              strokeLinecap="round"
              initial={false}
              animate={{ d: getMouthPath() }}
              transition={{ type: 'spring', damping: 12, stiffness: 80 }}
            />

            {expression === 'happy' && (
              <>
                <motion.ellipse 
                  cx="100" cy="152" rx="8" ry="4" 
                  fill="#FFB6B6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                />
              </>
            )}

            <motion.ellipse 
              cx="60" cy="112" rx="10" ry="6" 
              fill="#FFB6A3" 
              animate={{ opacity: expression === 'happy' ? 0.7 : 0.35 }}
              transition={{ duration: 0.3 }}
            />
            <motion.ellipse 
              cx="140" cy="112" rx="10" ry="6" 
              fill="#FFB6A3" 
              animate={{ opacity: expression === 'happy' ? 0.7 : 0.35 }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        </motion.g>

        {expression === 'privacy' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.text
              x="100"
              y="180"
              textAnchor="middle"
              fontSize="12"
              animate={{ y: [180, 178, 180] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🤫
            </motion.text>
          </motion.g>
        )}

        {expression === 'happy' && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.text
              x="45"
              y="50"
              fontSize="14"
              animate={{ 
                y: [50, 45, 50],
                rotate: [-5, 5, -5]
              }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ✨
            </motion.text>
            <motion.text
              x="150"
              y="55"
              fontSize="12"
              animate={{ 
                y: [55, 50, 55],
                rotate: [5, -5, 5]
              }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
            >
              ⭐
            </motion.text>
          </motion.g>
        )}
      </motion.svg>

      <motion.div
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-light whitespace-nowrap"
        style={{ color: 'var(--text-secondary)' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: focusedField || expression !== 'idle' ? 0.8 : 0.4,
          y: focusedField ? -4 : 0 
        }}
        transition={{ duration: 0.3 }}
      >
        {expression === 'privacy' && "🙈 Looking away..."}
        {expression === 'attentive' && focusedField && "👀 Listening intently..."}
        {expression === 'happy' && "🎉 Perfect!"}
        {expression === 'concerned' && "🤔 Hmm, check that..."}
        {expression === 'idle' && !focusedField && "👋 Hi there!"}
      </motion.div>
    </div>
  )
}
