'use client'

import { useState, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Send, Sparkles, Check, AlertCircle, Mail, Phone, Users, Calendar, User, MessageSquare } from 'lucide-react'
import InteractiveCamera from './InteractiveCamera'
import { useTheme } from '@/components/providers/ThemeProvider'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  groupSize: string
  eventDate: string
  message: string
}

interface ContactPageData {
  hero?: {
    preHeading?: string
    mainHeading?: string
    description?: string
  }
  form?: {
    formTitle?: string
    firstNameLabel?: string
    firstNamePlaceholder?: string
    lastNameLabel?: string
    lastNamePlaceholder?: string
    emailLabel?: string
    emailPlaceholder?: string
    phoneLabel?: string
    phonePlaceholder?: string
    groupSizeLabel?: string
    groupSizeDefaultOption?: string
    groupSizeOptions?: string[]
    eventDateLabel?: string
    messageLabel?: string
    messagePlaceholder?: string
    submitButtonText?: string
    submitButtonLoadingText?: string
  }
  success?: {
    title?: string
    message?: string
    buttonText?: string
    buttonLink?: string
  }
  cameraImageUrl?: string | null
}

interface ContactContentProps {
  data?: ContactPageData | null
}

export default function ContactContent({ data }: ContactContentProps) {
  const { theme } = useTheme()
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
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [countryCode, setCountryCode] = useState('+1')

  const { scrollY } = useScroll()

  const hero = data?.hero || {}
  const form = data?.form || {}
  const success = data?.success || {}

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+39', country: 'IT' },
    { code: '+33', country: 'FR' },
    { code: '+49', country: 'DE' },
    { code: '+34', country: 'ES' },
    { code: '+41', country: 'CH' },
    { code: '+31', country: 'NL' },
    { code: '+32', country: 'BE' },
    { code: '+43', country: 'AT' },
    { code: '+351', country: 'PT' },
    { code: '+353', country: 'IE' },
    { code: '+45', country: 'DK' },
    { code: '+46', country: 'SE' },
    { code: '+47', country: 'NO' },
    { code: '+358', country: 'FI' },
    { code: '+48', country: 'PL' },
    { code: '+420', country: 'CZ' },
    { code: '+36', country: 'HU' },
    { code: '+30', country: 'GR' },
    { code: '+7', country: 'RU' },
    { code: '+81', country: 'JP' },
    { code: '+82', country: 'KR' },
    { code: '+86', country: 'CN' },
    { code: '+91', country: 'IN' },
    { code: '+61', country: 'AU' },
    { code: '+64', country: 'NZ' },
    { code: '+55', country: 'BR' },
    { code: '+52', country: 'MX' },
    { code: '+54', country: 'AR' },
    { code: '+971', country: 'UAE' },
    { code: '+966', country: 'SA' },
    { code: '+972', country: 'IL' },
    { code: '+27', country: 'ZA' },
    { code: '+65', country: 'SG' },
    { code: '+60', country: 'MY' },
    { code: '+66', country: 'TH' },
  ]

  const emailValidation = useMemo(() => {
    if (!formData.email) return { valid: false, message: '' }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(formData.email)) {
      return { valid: true, message: 'Valid email' }
    }
    if (formData.email.includes('@')) {
      return { valid: false, message: 'Complete the domain' }
    }
    return { valid: false, message: 'Add @ and domain' }
  }, [formData.email])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          countryCode,
        }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const groupSizeOptions = form.groupSizeOptions || ['2-5 people', '6-10 people', '11-20 people', '21-50 people', '50+ people']

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
            {success.title || 'The Spotlight Awaits!'}
          </h2>
          <p 
            className="text-base mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            {success.message || "Thank you for reaching out. We'll be in touch soon to help you create your unforgettable cinematic experience."}
          </p>
          <motion.a
            href={success.buttonLink || '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-full"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--bg-primary)' }}
          >
            {success.buttonText || 'Back to Home'}
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-28 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start relative">
          <motion.div
            className="lg:sticky lg:top-32 flex flex-col items-center lg:h-[calc(100vh-160px)] lg:justify-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-center lg:text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.p
                className="text-xs md:text-sm uppercase tracking-[0.4em] mb-3"
                style={{ color: 'var(--text-secondary)', opacity: 0.6 }}
              >
                {hero.preHeading || 'Get in Touch'}
              </motion.p>
              
              <motion.h1
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {hero.mainHeading || 'The Spotlight Awaits in Italy'}
              </motion.h1>
              
              <motion.div
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="h-px w-8 md:w-12" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
                <Sparkles size={16} style={{ color: 'var(--accent)' }} />
                <div className="h-px w-8 md:w-12" style={{ backgroundColor: 'var(--text-secondary)', opacity: 0.3 }} />
              </motion.div>
              
              <p 
                className="text-sm max-w-sm mx-auto leading-relaxed"
                style={{ color: 'var(--text-secondary)', opacity: 0.8 }}
              >
                {hero.description || "Ready to create your unforgettable cinematic experience? Fill out the form and we'll be in touch soon."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 hidden lg:block"
            >
              <InteractiveCamera 
                focusedField={focusedField} 
                isSubmitting={isSubmitting}
                cameraImageUrl={data?.cameraImageUrl}
              />
            </motion.div>
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
            {form.formTitle || 'Create Your Cinematic Event'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="firstName" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <User size={14} />
                  {form.firstNameLabel || 'First Name'}
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
                  placeholder={form.firstNamePlaceholder || 'John'}
                />
              </div>

              <div>
                <label 
                  htmlFor="lastName" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <User size={14} />
                  {form.lastNameLabel || 'Last Name'}
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
                  placeholder={form.lastNamePlaceholder || 'Doe'}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="email" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Mail size={14} />
                  {form.emailLabel || 'Email'} <span style={{ color: 'var(--accent)' }}>*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full px-4 py-3 pr-10 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      borderColor: formData.email ? (emailValidation.valid ? '#22c55e' : '#ef4444') : undefined
                    }}
                    placeholder={form.emailPlaceholder || 'john@example.com'}
                  />
                  {formData.email && (
                    <motion.div 
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                    >
                      {emailValidation.valid ? (
                        <Check size={18} className="text-green-500" />
                      ) : (
                        <AlertCircle size={18} className="text-red-400" />
                      )}
                    </motion.div>
                  )}
                </div>
                {formData.email && !emailValidation.valid && (
                  <motion.p 
                    className="text-xs mt-1.5 text-red-400"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {emailValidation.message}
                  </motion.p>
                )}
              </div>

              <div>
                <label 
                  htmlFor="phone" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Phone size={14} />
                  {form.phoneLabel || 'Phone'}
                </label>
                <div className="flex gap-2 min-w-0">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-[100px] px-2 min-h-[44px] rounded-lg text-xs md:text-sm transition-all focus:outline-none focus:ring-2 border border-white/20 shrink-0"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('phone')}
                    onBlur={() => setFocusedField(null)}
                    className="min-w-0 flex-1 px-3 md:px-4 min-h-[44px] rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                    style={{ 
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-primary)'
                    }}
                    placeholder={form.phonePlaceholder || '555 123-4567'}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label 
                  htmlFor="groupSize" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Users size={14} />
                  {form.groupSizeLabel || 'How many will you be?'}
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
                  <option value="">{form.groupSizeDefaultOption || 'Select group size'}</option>
                  {groupSizeOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label 
                  htmlFor="eventDate" 
                  className="flex items-center gap-2 text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Calendar size={14} />
                  {form.eventDateLabel || 'Date of Event'}
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('eventDate')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 min-h-[44px] rounded-lg text-sm transition-all focus:outline-none focus:ring-2 border border-white/20"
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    colorScheme: theme === 'dark' ? 'dark' : 'light'
                  }}
                />
              </div>
            </div>

            <div>
              <label 
                htmlFor="message" 
                className="flex items-center gap-2 text-sm font-medium mb-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <MessageSquare size={14} />
                {form.messageLabel || 'Tell us about your vision'}
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
                placeholder={form.messagePlaceholder || 'Describe your dream cinematic event...'}
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 rounded-lg border border-red-500/30"
                style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
              >
                <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </motion.div>
            )}

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
                    {form.submitButtonLoadingText || 'Sending...'}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {form.submitButtonText || 'Be A Star'}
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
