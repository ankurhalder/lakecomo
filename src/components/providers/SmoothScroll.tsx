'use client'

import { createContext, useContext, useEffect, useRef, type MutableRefObject } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenisRef: MutableRefObject<Lenis | null>
  stop: () => void
  start: () => void
}

const LenisContext = createContext<LenisContextType>({
  lenisRef: { current: null },
  stop: () => {},
  start: () => {},
})

export function useLenis() {
  return useContext(LenisContext)
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  const stop = () => {
    lenisRef.current?.stop()
  }

  const start = () => {
    lenisRef.current?.start()
  }

  return (
    <LenisContext.Provider value={{ lenisRef, stop, start }}>
      {children}
    </LenisContext.Provider>
  )
}