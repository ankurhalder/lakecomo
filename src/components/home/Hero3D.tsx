'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useVideoTexture, Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import Link from 'next/link'
import FeaturesList from './FeaturesList'

function VideoPlane({ url }: { url: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const texture = useVideoTexture(url, {
    unsuspend: 'canplay',
    muted: true,
    loop: true,
    start: true,
    crossOrigin: 'Anonymous'
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.mouse.x * Math.PI) / 100, 
        0.05
      )
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        (state.mouse.y * Math.PI) / 100, 
        0.05
      )
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.05}>
      <mesh ref={meshRef} scale={[16, 9, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </Float>
  )
}

function FallbackMaterial() {
  return (
    <mesh scale={[16, 9, 1]}>
      <planeGeometry />
      <meshBasicMaterial color="#0a0a0a" />
    </mesh>
  )
}

export default function Hero3D({ data }: { data: any }) {
  const { preHeading, mainHeading, subHeading, ctaText, ctaLink, videoUrl } = data?.heroSection || {}
  const features = data?.featuresGrid || []

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-sans">
      
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={<FallbackMaterial />}>
            {videoUrl && <VideoPlane url={videoUrl} />}
            <mesh position={[0, 0, 0.05]}>
              <planeGeometry args={[100, 100]} />
              <meshBasicMaterial color="black" transparent opacity={0.3} />
            </mesh>
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 grid grid-cols-1 lg:grid-cols-2 h-full pt-20 pb-20 px-6 md:px-12 pointer-events-none">
        
        <div className="flex flex-col justify-center items-start text-left pointer-events-auto pl-4 lg:pl-10 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white/90 text-lg italic font-light mb-4 tracking-wide font-serif"
          >
            {preHeading}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tighter mb-6 drop-shadow-xl"
          >
            {mainHeading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-white/90 text-lg font-light tracking-wide mb-10 italic"
          >
            {subHeading}
          </motion.p>

          <Link href={ctaLink || '/contact'}>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="px-10 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest rounded-full hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg"
            >
              {ctaText}
            </motion.button>
          </Link>
        </div>

        <div className="hidden lg:flex justify-end items-center pointer-events-auto">
          <FeaturesList features={features} />
        </div>

      </div>
    </div>
  )
}