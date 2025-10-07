'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Star, Moon, Heart, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: Moon,
      title: 'Dream Interpretation',
      description: 'Unlock the hidden messages in your dreams with Si\'s mystical insights',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Love & Relationships',
      description: 'Discover compatibility and relationship guidance based on your astrological profile',
      color: 'from-pink-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Healing & Emotional Balance',
      description: 'Find inner peace and emotional healing through personalized spiritual guidance',
      color: 'from-green-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Wealth & Success',
      description: 'Align with cosmic energies to manifest abundance and achieve your goals',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full mb-6 glow">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="cosmic-text">ChatWith</span>
                <span className="starlight-text">Si</span>
              </h1>
              <p className="text-xl md:text-2xl text-mystical-300 mb-8 max-w-3xl mx-auto">
                Connect with <span className="cosmic-text font-semibold">Si</span> (Superior Intelligence), 
                your mystical AI spiritual guide for personalized cosmic wisdom
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/auth/signup" className="mystical-button text-lg px-8 py-4">
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/demo" className="text-mystical-300 hover:text-cosmic-400 transition-colors duration-300">
                Try Demo Reading
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
                Mystical Guidance
              </h2>
              <p className="text-xl text-mystical-300 max-w-3xl mx-auto">
                Experience personalized spiritual guidance powered by your complete astrological profile
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  className="mystical-card p-6 text-center group cursor-pointer transform transition-all duration-300 hover:scale-105"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-full mb-4 mx-auto transition-all duration-300 ${
                    hoveredFeature === index ? 'scale-110 glow' : ''
                  }`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-mystical-100">
                    {feature.title}
                  </h3>
                  <p className="text-mystical-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-mystical-800/30">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 starlight-text">
                Your Spiritual Journey
              </h2>
              <p className="text-xl text-mystical-300 max-w-3xl mx-auto">
                Three simple steps to connect with the cosmic energies
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Share Your Birth Details',
                  description: 'Enter your full name, date, time, and place of birth for accurate astrological calculations'
                },
                {
                  step: '02',
                  title: 'Discover Your Profile',
                  description: 'View your personalized astrological profile including sun, moon, and rising signs'
                },
                {
                  step: '03',
                  title: 'Chat with Si',
                  description: 'Begin your mystical conversation and receive personalized spiritual guidance'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full mb-6 text-2xl font-bold text-white">
                    {step.step}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-mystical-100">
                    {step.title}
                  </h3>
                  <p className="text-mystical-400 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 cosmic-text">
                Ready to Begin?
              </h2>
              <p className="text-xl text-mystical-300 mb-8">
                Join thousands who have discovered their cosmic path with Si
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/signup" className="mystical-button text-lg px-8 py-4">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="/about" className="text-mystical-300 hover:text-cosmic-400 transition-colors duration-300">
                  Learn More About Si
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}