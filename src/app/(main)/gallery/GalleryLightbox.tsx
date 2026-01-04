'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useCallback } from 'react'

interface GalleryLightboxProps {
  images: { imageUrl: string; alt: string; caption?: string }[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
}

export default function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: GalleryLightboxProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrevious()
    },
    [isOpen, onClose, onNext, onPrevious]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!images || images.length === 0) return null

  const currentImage = images[currentIndex]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

          <motion.button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} className="text-white" />
          </motion.button>

          {images.length > 1 && (
            <>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onPrevious()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={28} className="text-white" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  onNext()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={28} className="text-white" />
              </motion.button>
            </>
          )}

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.alt || `Gallery image ${currentIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
          </motion.div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            {currentImage.caption && (
              <p className="text-white text-sm text-center max-w-md px-4">
                {currentImage.caption}
              </p>
            )}
            <p className="text-white/60 text-xs">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
