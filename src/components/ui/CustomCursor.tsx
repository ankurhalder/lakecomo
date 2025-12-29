'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue, AnimatePresence } from 'framer-motion'

type CursorVariant = 'default' | 'pointer' | 'text' | 'media' | 'hidden'

interface CursorState {
  variant: CursorVariant
  text?: string
}

export default function CustomCursor() {
  const [cursorState, setCursorState] = useState<CursorState>({ variant: 'default' })
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const isSmallScreen = window.innerWidth < 1024
      setIsMobile(isTouchDevice || isSmallScreen)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
    if (!isVisible) setIsVisible(true)
  }, [cursorX, cursorY, isVisible])

  const handleMouseLeave = useCallback(() => setIsVisible(false), [])
  const handleMouseEnter = useCallback(() => setIsVisible(true), [])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    
    const cursorText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text')
    if (cursorText) {
      setCursorState({ variant: 'pointer', text: cursorText })
      return
    }

    if (target.closest('[data-cursor="hidden"]')) {
      setCursorState({ variant: 'hidden' })
      return
    }

    if (target.closest('a, button, [role="button"], [data-cursor="pointer"]')) {
      setCursorState({ variant: 'pointer' })
      return
    }

    if (target.closest('input, textarea, [contenteditable="true"]')) {
      setCursorState({ variant: 'text' })
      return
    }

    if (target.closest('img, video, [data-cursor="media"]')) {
      setCursorState({ variant: 'media' })
      return
    }
  }, [])

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    const relatedTarget = e.relatedTarget as HTMLElement | null

    if (target.closest('a, button, [role="button"], input, textarea, img, video, [data-cursor]')) {
      if (!relatedTarget?.closest('a, button, [role="button"], input, textarea, img, video, [data-cursor]')) {
        setCursorState({ variant: 'default' })
      }
    }
  }, [])

  useEffect(() => {
    if (isMobile) return

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isMobile, handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseOver, handleMouseOut])

  if (isMobile) return null

  const { variant, text } = cursorState

  const getCursorSize = () => {
    switch (variant) {
      case 'pointer': return text ? 80 : 50
      case 'text': return 4
      case 'media': return 100
      case 'hidden': return 0
      default: return 12
    }
  }

  const getInnerSize = () => {
    switch (variant) {
      case 'pointer': return 0
      case 'text': return 20
      case 'media': return 0
      case 'hidden': return 0
      default: return 4
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: getCursorSize(),
          height: getCursorSize(),
          opacity: isVisible && variant !== 'hidden' ? 1 : 0,
          backgroundColor: variant === 'media' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : variant === 'pointer'
            ? 'rgba(255, 255, 255, 0.15)'
            : 'transparent',
          borderWidth: variant === 'default' ? 1 : 0,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          mixBlendMode: variant === 'media' ? 'difference' : 'normal' as const,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <AnimatePresence>
          {text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-medium uppercase tracking-wider text-white text-center px-2"
            >
              {text}
            </motion.span>
          )}
          {variant === 'media' && !text && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-[10px] font-medium uppercase tracking-wider text-white"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full bg-white mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: getInnerSize(),
          height: getInnerSize(),
          opacity: isVisible && variant !== 'hidden' ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}
