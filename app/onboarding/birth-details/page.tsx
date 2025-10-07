'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Info, MapPin, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BirthDetailsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    latitude: '',
    longitude: ''
  })
  const [hasExactTime, setHasExactTime] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleTimeToggle = (hasTime: boolean) => {
    setHasExactTime(hasTime)
    if (!hasTime) {
      setFormData(prev => ({ ...prev, timeOfBirth: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    } else {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      if (birthDate >= today) {
        newErrors.dateOfBirth = 'Date of birth must be in the past'
      }
    }
    
    if (hasExactTime && !formData.timeOfBirth) {
      newErrors.timeOfBirth = 'Time of birth is required for accurate readings'
    }
    
    if (!formData.placeOfBirth.trim()) {
      newErrors.placeOfBirth = 'Place of birth is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)
    
    try {
      // TODO: Implement actual birth details processing
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      
      // Redirect to astrological profile page
      router.push('/onboarding/profile')
    } catch (error) {
      console.error('Birth details error:', error)
      setErrors({ general: 'Something went wrong. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Link href="/auth/signup" className="inline-flex items-center text-mystical-400 hover:text-cosmic-400 transition-colors duration-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Signup
          </Link>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full mb-4 glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold cosmic-text mb-2">
            Your Birth Details
          </h1>
          <p className="text-mystical-300">
            Help Si create your personalized astrological profile
          </p>
        </motion.div>

        {/* Birth Details Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mystical-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-mystical-200 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className={`mystical-input w-full ${errors.fullName ? 'border-red-500' : ''}`}
                placeholder="Enter your full name as it appears on your birth certificate"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-mystical-200 mb-2">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mystical-400" />
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={`mystical-input w-full pl-10 ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Time of Birth Toggle */}
            <div>
              <label className="block text-sm font-medium text-mystical-200 mb-3">
                Do you know your exact time of birth?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => handleTimeToggle(true)}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                    hasExactTime
                      ? 'bg-cosmic-500/20 border-cosmic-500 text-cosmic-300'
                      : 'bg-mystical-800/50 border-mystical-600 text-mystical-300 hover:border-cosmic-500'
                  }`}
                >
                  Yes, I know the exact time
                </button>
                <button
                  type="button"
                  onClick={() => handleTimeToggle(false)}
                  className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                    !hasExactTime
                      ? 'bg-cosmic-500/20 border-cosmic-500 text-cosmic-300'
                      : 'bg-mystical-800/50 border-mystical-600 text-mystical-300 hover:border-cosmic-500'
                  }`}
                >
                  No, I don't know
                </button>
              </div>
            </div>

            {/* Time of Birth */}
            {hasExactTime && (
              <div>
                <label htmlFor="timeOfBirth" className="block text-sm font-medium text-mystical-200 mb-2">
                  Time of Birth
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mystical-400" />
                  <input
                    type="time"
                    id="timeOfBirth"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    className={`mystical-input w-full pl-10 ${errors.timeOfBirth ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.timeOfBirth && (
                  <p className="mt-1 text-sm text-red-400">{errors.timeOfBirth}</p>
                )}
                <p className="mt-1 text-sm text-mystical-400">
                  Even a few minutes can change your rising sign and planetary positions
                </p>
              </div>
            )}

            {/* Place of Birth */}
            <div>
              <label htmlFor="placeOfBirth" className="block text-sm font-medium text-mystical-200 mb-2">
                Place of Birth
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mystical-400" />
                <input
                  type="text"
                  id="placeOfBirth"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleInputChange}
                  className={`mystical-input w-full pl-10 ${errors.placeOfBirth ? 'border-red-500' : ''}`}
                  placeholder="City, State/Province, Country"
                />
              </div>
              {errors.placeOfBirth && (
                <p className="mt-1 text-sm text-red-400">{errors.placeOfBirth}</p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-cosmic-500/10 border border-cosmic-500/20 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-cosmic-400 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-mystical-300">
                  <p className="font-medium text-cosmic-300 mb-1">Why birth details matter</p>
                  <p>
                    Your exact birth time and location are crucial for accurate astrological calculations. 
                    They determine your rising sign, moon sign, and planetary positions, which Si uses to provide 
                    personalized guidance. If you don't know your birth time, you can still receive general readings.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mystical-button w-full flex items-center justify-center py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Create My Astrological Profile'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}