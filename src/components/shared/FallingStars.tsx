'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  size: number
  rotation: number
  rotationSpeed: number
  speed: number
  alpha: number
}

interface FallingStarsProps {
  count?: number
  mobileCount?: number
  minSize?: number
  maxSize?: number
  minSpeed?: number
  maxSpeed?: number
  color?: string
  className?: string
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, rotation: number) {
  const spikes = 5
  const outerRadius = size
  const innerRadius = size * 0.4
  
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rotation)
  ctx.beginPath()
  
  for (let i = 0; i < spikes * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius
    const angle = (i * Math.PI) / spikes - Math.PI / 2
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    
    if (i === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  
  ctx.closePath()
  ctx.restore()
}

export default function FallingStars({
  count = 20,
  mobileCount = 8,
  minSize = 8,
  maxSize = 28,
  minSpeed = 1.5,
  maxSpeed = 4,
  color,
  className = ''
}: FallingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        })
        setIsMobile(window.innerWidth < 768)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const activeCount = isMobile ? mobileCount : count
  const sizeRange = maxSize - minSize
  const speedRange = maxSpeed - minSpeed

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

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

    const spawnStar = (randomY = false): Star => {
      return {
        x: Math.random() * dimensions.width,
        y: randomY ? Math.random() * dimensions.height : -50 - Math.random() * 100,
        size: minSize + Math.random() * sizeRange,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        speed: minSpeed + Math.random() * speedRange,
        alpha: 0.6 + Math.random() * 0.4
      }
    }

    for (let i = 0; i < activeCount; i++) {
      stars.push(spawnStar(true))
    }

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      
      stars.forEach((star, index) => {
        star.y += star.speed
        star.rotation += star.rotationSpeed

        if (star.y > dimensions.height + star.size * 2) {
          stars[index] = spawnStar(false)
        }

        ctx.save()
        ctx.globalAlpha = star.alpha
        ctx.fillStyle = activeColor
        ctx.shadowBlur = star.size * 0.5
        ctx.shadowColor = activeColor
        
        drawStar(ctx, star.x, star.y, star.size, star.rotation)
        ctx.fill()
        
        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [dimensions, activeCount, minSize, sizeRange, minSpeed, speedRange, color])

  return (
    <canvas 
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-[1] ${className}`}
      style={{ opacity: 0.9 }}
    />
  )
}
