'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'text' | 'media'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 30, stiffness: 400, mass: 0.3 }
  const ringX = useSpring(cursorX, springConfig)
  const ringY = useSpring(cursorY, springConfig)

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

  useEffect(() => {
    if (isMobile) return

    const setupHoverListeners = () => {
      const buttons = document.querySelectorAll('a, button, [role="button"]')
      const inputs = document.querySelectorAll('input, textarea, select')
      const media = document.querySelectorAll('img, video, [data-cursor="media"]')

      buttons.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorType('pointer'))
        el.addEventListener('mouseleave', () => setCursorType('default'))
      })

      inputs.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorType('text'))
        el.addEventListener('mouseleave', () => setCursorType('default'))
      })

      media.forEach((el) => {
        el.addEventListener('mouseenter', () => setCursorType('media'))
        el.addEventListener('mouseleave', () => setCursorType('default'))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    setupHoverListeners()

    const observer = new MutationObserver(setupHoverListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      observer.disconnect()
    }
  }, [isMobile, handleMouseMove, handleMouseLeave, handleMouseEnter])

  if (isMobile) return null

  const getDotSize = () => {
    switch (cursorType) {
      case 'pointer': return 4
      case 'text': return 2
      case 'media': return 6
      default: return 6
    }
  }

  const getRingSize = () => {
    switch (cursorType) {
      case 'pointer': return 36
      case 'text': return 20
      case 'media': return 48
      default: return 28
    }
  }

  const getRingOpacity = () => {
    switch (cursorType) {
      case 'pointer': return 0.5
      case 'text': return 0.3
      case 'media': return 0.2
      default: return 0.25
    }
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{
            width: getDotSize(),
            height: getDotSize(),
          }}
          transition={{ duration: 0.15 }}
        />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            borderColor: 'var(--text-primary)',
          }}
          animate={{
            width: getRingSize(),
            height: getRingSize(),
            opacity: getRingOpacity(),
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  )
}
