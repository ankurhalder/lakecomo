'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import ContactCharacter, { CharacterExpression } from './ContactCharacter'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  groupSize: string
  eventDate: string
  message: string
}

export default function ContactContent() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    groupSize: '',
    eventDate: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const getExpression = (): CharacterExpression => {
    if (submitted) return 'happy'
    if (isSubmitting) return 'attentive'
    if (focusedField === 'password') return 'privacy'
    if (focusedField) return 'attentive'
    return 'idle'
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Sparkles size={40} style={{ color: 'var(--bg-primary)' }} />
          </motion.div>
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            The Spotlight Awaits!
          </h2>
          <p 
            className="text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Thank you for reaching out. We&apos;ll be in touch soon to help you create your unforgettable cinematic experience.
          </p>
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            Back to Home
          </motion.a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary) 50%, var(--bg-primary))' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            className="lg:sticky lg:top-32 flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-center lg:text-left mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.4em] mb-3"
                style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              >
                Get in Touch
              </motion.p>
              
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                The Spotlight Awaits in Italy
              </motion.h1>
              
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-3 mb-4"
              >
                <div className="h-px w-8 md:w-12" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
                <Sparkles size={16} style={{ color: 'var(--accent)' }} />
                <div className="h-px w-8 md:w-12" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
              </motion.div>
              
              <p 
                className="text-sm max-w-sm"
                style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
              >
                Ready to create your unforgettable cinematic experience? Fill out the form and we&apos;ll be in touch soon.
              </p>
            </motion.div>
            
            <ContactCharacter 
              expression={getExpression()} 
              focusedField={focusedField} 
            />
          </motion.div>

          <motion.div
            className="relative p-6 md:p-8 rounded-2xl border border-white/20"
            style={{ 
              backgroundColor: 'var(--bg-primary)'
            }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 
              className="text-xl md:text-2xl font-bold mb-8 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
            Create Your Cinematic Event
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('firstName')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="John"
                />
              </div>

              <div>
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('lastName')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Email <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label 
                  htmlFor="phone" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="groupSize" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  How many will you be?
                </label>
                <select
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('groupSize')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <option value="">Select group size</option>
                  <option value="2-5">2-5 people</option>
                  <option value="6-10">6-10 people</option>
                  <option value="11-20">11-20 people</option>
                  <option value="21-50">21-50 people</option>
                  <option value="50+">50+ people</option>
                </select>
              </div>

              <div>
                <label 
                  htmlFor="eventDate" 
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Date of Event
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('eventDate')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="block text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                Tell us about your vision
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 resize-none border border-white/20"
                style={{ 
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)'
                }}
                placeholder="Describe your dream cinematic event..."
              />
            </div>

            <div className="text-center pt-4">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                className="inline-flex items-center gap-3 px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all disabled:opacity-70"
                style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Be A Star
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
