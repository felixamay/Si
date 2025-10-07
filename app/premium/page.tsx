'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Check, Star, Crown, Zap, Infinity } from 'lucide-react'
import Link from 'next/link'

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const features = [
    'Unlimited chat sessions with Si',
    'Detailed astrological analysis',
    'Personalized dream interpretations',
    'Advanced love compatibility readings',
    'In-depth healing guidance',
    'Comprehensive wealth & success insights',
    'Past life regression readings',
    'Monthly personalized forecasts',
    'Priority customer support',
    'Exclusive premium content'
  ]

  const plans = {
    monthly: {
      price: 19.99,
      period: 'month',
      savings: null,
      popular: false
    },
    yearly: {
      price: 199.99,
      period: 'year',
      savings: '17%',
      popular: true
    }
  }

  return (
    <div className="min-h-screen bg-mystical-900">
      {/* Header */}
      <div className="mystical-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-mystical-400 hover:text-cosmic-400 transition-colors duration-300">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="w-12 h-12 bg-gradient-to-r from-starlight-500 to-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold starlight-text">Premium Membership</h1>
              <p className="text-mystical-400">Unlock the full power of Si's mystical guidance</p>
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
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
              Unlock Your Cosmic Potential
            </h2>
            <p className="text-xl text-mystical-300 max-w-3xl mx-auto">
              Experience unlimited access to Si's mystical wisdom with detailed astrological insights, 
              personalized guidance, and exclusive premium features.
            </p>
          </motion.div>

          {/* Pricing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-mystical-800/50 p-1 rounded-lg">
              <button
                onClick={() => setSelectedPlan('monthly')}
                className={`px-6 py-3 rounded-md transition-all duration-300 ${
                  selectedPlan === 'monthly'
                    ? 'bg-cosmic-500 text-white'
                    : 'text-mystical-400 hover:text-mystical-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setSelectedPlan('yearly')}
                className={`px-6 py-3 rounded-md transition-all duration-300 relative ${
                  selectedPlan === 'yearly'
                    ? 'bg-cosmic-500 text-white'
                    : 'text-mystical-400 hover:text-mystical-200'
                }`}
              >
                Yearly
                {plans.yearly.savings && (
                  <span className="absolute -top-2 -right-2 bg-starlight-500 text-mystical-900 text-xs px-2 py-1 rounded-full font-bold">
                    Save {plans.yearly.savings}
                  </span>
                )}
              </button>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mystical-card p-8"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-mystical-100 mb-2">Free</h3>
                <div className="text-4xl font-bold cosmic-text mb-2">$0</div>
                <p className="text-mystical-400">Perfect for getting started</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-mystical-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Basic astrological profile
                </li>
                <li className="flex items-center text-mystical-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  5 messages per day
                </li>
                <li className="flex items-center text-mystical-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  General daily insights
                </li>
                <li className="flex items-center text-mystical-300">
                  <Check className="w-5 h-5 text-green-500 mr-3" />
                  Basic dream interpretation
                </li>
              </ul>
              
              <button className="w-full py-3 px-6 border border-mystical-600 text-mystical-300 rounded-lg hover:border-cosmic-500 hover:text-cosmic-400 transition-all duration-300">
                Current Plan
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mystical-card p-8 bg-gradient-to-br from-cosmic-500/10 to-celestial-500/10 border-cosmic-500/20 relative"
            >
              {plans[selectedPlan as keyof typeof plans].popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-starlight-500 to-yellow-500 text-mystical-900 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold cosmic-text mb-2">Premium</h3>
                <div className="text-4xl font-bold starlight-text mb-2">
                  ${plans[selectedPlan as keyof typeof plans].price}
                </div>
                <p className="text-mystical-400">per {plans[selectedPlan as keyof typeof plans].period}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-mystical-300">
                    <Check className="w-5 h-5 text-cosmic-500 mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mystical-button w-full text-lg py-4">
                Upgrade to Premium
                <Crown className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-mystical-100 text-center mb-8">
              Premium Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Infinity className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-mystical-200 mb-2">Unlimited Access</h4>
                <p className="text-mystical-400">
                  Chat with Si as much as you want, whenever you need guidance
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-mystical-200 mb-2">Advanced Analysis</h4>
                <p className="text-mystical-400">
                  Get detailed astrological insights and personalized recommendations
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-mystical-200 mb-2">Exclusive Content</h4>
                <p className="text-mystical-400">
                  Access premium readings and exclusive spiritual guidance
                </p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mystical-card p-8"
          >
            <h3 className="text-2xl font-bold text-mystical-100 text-center mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-mystical-200 mb-2">
                  Can I cancel my subscription anytime?
                </h4>
                <p className="text-mystical-400">
                  Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your current billing period.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-mystical-200 mb-2">
                  Is my personal information secure?
                </h4>
                <p className="text-mystical-400">
                  Absolutely. We use industry-standard encryption to protect your data and never share your personal information with third parties.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-mystical-200 mb-2">
                  What if I don't know my exact birth time?
                </h4>
                <p className="text-mystical-400">
                  No problem! Si can still provide valuable guidance based on your date and place of birth. However, knowing your exact birth time allows for more precise readings.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}