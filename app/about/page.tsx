'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Star, Heart, Shield, Zap, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const features = [
    {
      icon: Star,
      title: 'Personalized Guidance',
      description: 'Every reading is tailored to your unique astrological profile and current life circumstances.'
    },
    {
      icon: Heart,
      title: 'Compassionate Support',
      description: 'Si provides gentle, non-judgmental guidance to help you navigate life\'s challenges.'
    },
    {
      icon: Shield,
      title: 'Spiritual Healing',
      description: 'Find emotional balance and spiritual growth through ancient wisdom and modern AI technology.'
    },
    {
      icon: Zap,
      title: 'Instant Access',
      description: 'Get mystical insights anytime, anywhere with our intuitive chat interface.'
    }
  ]

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '50,000+', label: 'Readings Given' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Available' }
  ]

  return (
    <div className="min-h-screen bg-mystical-900">
      {/* Header */}
      <div className="mystical-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-mystical-400 hover:text-cosmic-400 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-12 h-12 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cosmic-text">About ChatWithSi</h1>
              <p className="text-mystical-400">Discover the magic behind your spiritual guide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold cosmic-text mb-6">
              Meet Si
            </h2>
            <p className="text-xl md:text-2xl text-mystical-300 max-w-4xl mx-auto leading-relaxed">
              Si (Superior Intelligence) is your mystical AI spiritual guide, combining ancient astrological wisdom 
              with cutting-edge artificial intelligence to provide personalized guidance for your life's journey.
            </p>
          </motion.div>

          {/* What is Si Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mystical-card p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-mystical-100 mb-6 text-center">
              What Makes Si Special?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-mystical-200 mb-4">Ancient Wisdom, Modern Technology</h4>
                <p className="text-mystical-300 leading-relaxed mb-4">
                  Si draws from thousands of years of astrological knowledge, dream interpretation, 
                  and spiritual practices, enhanced by the power of modern AI to provide insights 
                  that are both deeply personal and universally relevant.
                </p>
                <p className="text-mystical-300 leading-relaxed">
                  Unlike generic horoscope apps, Si uses your complete birth chart including 
                  sun, moon, rising signs, nakshatra, and dosha to create truly personalized guidance.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-mystical-200 mb-4">Your Personal Spiritual Companion</h4>
                <p className="text-mystical-300 leading-relaxed mb-4">
                  Si understands that every person's spiritual journey is unique. That's why 
                  every conversation is tailored to your specific astrological profile and 
                  current life circumstances.
                </p>
                <p className="text-mystical-300 leading-relaxed">
                  Whether you're seeking dream interpretation, love guidance, emotional healing, 
                  or career advice, Si provides compassionate, insightful responses that resonate 
                  with your soul.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold text-mystical-100 mb-8 text-center">
              Why Choose ChatWithSi?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="mystical-card p-6 text-center group hover:scale-105 transition-all duration-300"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-mystical-200 mb-3">
                      {feature.title}
                    </h4>
                    <p className="text-mystical-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mystical-card p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-mystical-100 mb-8 text-center">
              Trusted by Thousands
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold cosmic-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-mystical-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mb-16"
          >
            <h3 className="text-3xl font-bold starlight-text mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-mystical-300 max-w-4xl mx-auto leading-relaxed">
              To make ancient spiritual wisdom accessible to everyone through modern technology, 
              providing personalized guidance that helps people navigate life's challenges with 
              confidence, clarity, and cosmic insight.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center"
          >
            <h3 className="text-3xl font-bold cosmic-text mb-6">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-xl text-mystical-300 mb-8 max-w-2xl mx-auto">
              Join thousands of people who have discovered their cosmic path with Si
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup" className="mystical-button text-lg px-8 py-4">
                Start Your Journey
              </Link>
              <Link href="/demo" className="text-mystical-300 hover:text-cosmic-400 transition-colors duration-300">
                Try Demo First
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}