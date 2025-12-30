'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  size: number
  alpha: number
  tail: { x: number; y: number }[]
  color: string
}

interface FallingStarsProps {
  count?: number
  color?: string
  className?: string
}

export default function FallingStars({
  count = 50,
  color,
  className = ''
}: FallingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getComputedColor = (colorStr: string) => {
      if (!colorStr.startsWith('var(')) return colorStr
      const temp = document.createElement('div')
      temp.style.color = colorStr
      temp.style.display = 'none'
      document.body.appendChild(temp)
      const computed = window.getComputedStyle(temp).color
      document.body.removeChild(temp)
      return computed
    }

    let activeColor = getComputedColor(color || '#ffffff')

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          activeColor = getComputedColor(color || '#ffffff')
        }
      }
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`

    const stars: Star[] = []
    
    const GRAVITY = 0.05
    const MAX_VELOCITY = 15
    const TAIL_LENGTH = 10

    const spawnStar = (yOverride?: number): Star => {
      const side = Math.random() > 0.5 ? 'left' : 'right'
      const xPercent = side === 'left' 
        ? Math.random() * 0.2 
        : 0.8 + Math.random() * 0.2
      
      const x = xPercent * dimensions.width
      const y = yOverride ?? -50
      const z = 0.5 + Math.random() * 1.5
      
      return {
        x,
        y,
        z,
        vx: (Math.random() - 0.5) * 0.5 * z,
        vy: (2 + Math.random() * 5) * z,
        size: (0.5 + Math.random() * 1.5) * z,
        alpha: 0.4 + Math.random() * 0.6,
        tail: [],
        color: activeColor
      }
    }

    for (let i = 0; i < count; i++) {
        stars.push(spawnStar(Math.random() * dimensions.height))
    }

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      
      stars.forEach((star, index) => {
        star.vy = Math.min(star.vy + GRAVITY * star.z, MAX_VELOCITY)
        star.x += star.vx
        star.y += star.vy

        star.tail.unshift({ x: star.x, y: star.y })
        if (star.tail.length > TAIL_LENGTH) {
          star.tail.pop()
        }

        if (star.y > dimensions.height + 100) {
          stars[index] = spawnStar()
        }

        if (star.tail.length > 1) {
            ctx.beginPath()
            ctx.moveTo(star.tail[0].x, star.tail[0].y)
            for (let i = 1; i < star.tail.length; i++) {
                ctx.lineTo(star.tail[i].x, star.tail[i].y)
            }
            
            ctx.save()
            ctx.globalAlpha = star.alpha * 0.5
            ctx.strokeStyle = activeColor
            ctx.lineWidth = star.size
            ctx.lineCap = 'round'
            ctx.stroke()
            ctx.restore()
        }

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = activeColor
        ctx.globalAlpha = star.alpha
        ctx.shadowBlur = star.size * 2
        ctx.shadowColor = activeColor
        ctx.fill()
        ctx.shadowBlur = 0
        ctx.globalAlpha = 1.0
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, count, color])

  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ opacity: 0.8 }}
    />
  )
}
