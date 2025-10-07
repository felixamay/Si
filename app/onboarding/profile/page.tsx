'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Star, Moon, Sun, Zap, Heart, Shield, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { calculateAstrologicalProfile, getZodiacElement } from '@/lib/astrology'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulate loading and calculating astrological profile
    const loadProfile = async () => {
      setIsLoading(true)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock birth details (in real app, this would come from the previous step)
      const mockBirthDetails = {
        dateOfBirth: new Date('1990-06-15'),
        timeOfBirth: '14:30',
        placeOfBirth: 'New York, NY, USA'
      }
      
      const astroProfile = calculateAstrologicalProfile(mockBirthDetails)
      
      setProfile({
        name: 'Alex Johnson',
        ...astroProfile,
        element: getZodiacElement(astroProfile.sunSign)
      })
      
      setIsLoading(false)
    }
    
    loadProfile()
  }, [])

  const handleContinue = () => {
    router.push('/dashboard')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cosmic-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-mystical-300">Calculating your cosmic profile...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-mystical-300">Unable to load your profile. Please try again.</p>
          <Link href="/onboarding/birth-details" className="mystical-button mt-4 inline-block">
            Go Back
          </Link>
        </div>
      </div>
    )
  }

  const features = [
    {
      icon: Moon,
      title: 'Dream Interpretation',
      description: 'Unlock hidden messages in your dreams',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Love & Relationships',
      description: 'Discover compatibility and romance',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Healing & Balance',
      description: 'Find emotional and spiritual healing',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Wealth & Success',
      description: 'Align with abundance and prosperity',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full mb-6 glow">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold cosmic-text mb-4">
            Welcome, {profile.name}
          </h1>
          <p className="text-xl text-mystical-300">
            Your cosmic profile has been revealed
          </p>
        </motion.div>

        {/* Astrological Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mystical-card p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-mystical-100 mb-6 text-center">
            Your Astrological Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sun Sign */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-mystical-200 mb-1">Sun Sign</h3>
              <p className="text-2xl font-bold cosmic-text">{profile.sunSign}</p>
              <p className="text-sm text-mystical-400 capitalize">{profile.element}</p>
            </div>

            {/* Moon Sign */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
                <Moon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-mystical-200 mb-1">Moon Sign</h3>
              <p className="text-2xl font-bold cosmic-text">{profile.moonSign}</p>
              <p className="text-sm text-mystical-400">Emotional Nature</p>
            </div>

            {/* Rising Sign */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-mystical-200 mb-1">Rising Sign</h3>
              <p className="text-2xl font-bold cosmic-text">{profile.risingSign}</p>
              <p className="text-sm text-mystical-400">How Others See You</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mt-8 pt-6 border-t border-mystical-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              {profile.nakshatra && (
                <div>
                  <p className="text-sm text-mystical-400 mb-1">Nakshatra</p>
                  <p className="text-lg font-semibold text-mystical-200">{profile.nakshatra}</p>
                </div>
              )}
              {profile.dosha && (
                <div>
                  <p className="text-sm text-mystical-400 mb-1">Dosha</p>
                  <p className="text-lg font-semibold text-mystical-200">{profile.dosha}</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-mystical-100 mb-6 text-center">
            Your Spiritual Journey Awaits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="mystical-card p-4 text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-full mb-3`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-mystical-200 mb-1">{feature.title}</h3>
                <p className="text-sm text-mystical-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={handleContinue}
            className="mystical-button text-lg px-8 py-4"
          >
            Begin Chatting with Si
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </div>
  )
}