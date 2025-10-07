'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { Sparkles, Moon, Heart, Shield, TrendingUp, Plus, MessageCircle, Star, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    sunSign: 'Gemini',
    moonSign: 'Pisces',
    risingSign: 'Leo',
    element: 'Air'
  })
  
  const [recentSessions, setRecentSessions] = useState([
    {
      id: '1',
      title: 'Dream about flying',
      category: 'dream',
      lastMessage: 'The dream suggests a desire for freedom...',
      timestamp: '2 hours ago',
      unread: false
    },
    {
      id: '2',
      title: 'Love compatibility reading',
      category: 'love',
      lastMessage: 'Your Venus in Taurus creates...',
      timestamp: '1 day ago',
      unread: true
    },
    {
      id: '3',
      title: 'Career guidance session',
      category: 'wealth',
      lastMessage: 'The current Mars transit...',
      timestamp: '3 days ago',
      unread: false
    }
  ])

  const categories = [
    {
      icon: Moon,
      title: 'Dream Interpretation',
      description: 'Decode your dreams with mystical insights',
      color: 'from-purple-500 to-pink-500',
      href: '/chat?category=dream'
    },
    {
      icon: Heart,
      title: 'Love & Relationships',
      description: 'Explore compatibility and romance',
      color: 'from-pink-500 to-red-500',
      href: '/chat?category=love'
    },
    {
      icon: Shield,
      title: 'Healing & Balance',
      description: 'Find emotional and spiritual healing',
      color: 'from-green-500 to-teal-500',
      href: '/chat?category=healing'
    },
    {
      icon: TrendingUp,
      title: 'Wealth & Success',
      description: 'Align with abundance and prosperity',
      color: 'from-yellow-500 to-orange-500',
      href: '/chat?category=wealth'
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dream': return Moon
      case 'love': return Heart
      case 'healing': return Shield
      case 'wealth': return TrendingUp
      default: return MessageCircle
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'dream': return 'from-purple-500 to-pink-500'
      case 'love': return 'from-pink-500 to-red-500'
      case 'healing': return 'from-green-500 to-teal-500'
      case 'wealth': return 'from-yellow-500 to-orange-500'
      default: return 'from-blue-500 to-purple-500'
    }
  }

  return (
    <div className="min-h-screen bg-mystical-900">
      {/* Header */}
      <header className="mystical-card m-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cosmic-500 to-celestial-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold cosmic-text">Welcome back, {userProfile.name}</h1>
              <p className="text-mystical-400">{userProfile.sunSign} • {userProfile.element}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-mystical-400 hover:text-cosmic-400 transition-colors duration-300">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 text-mystical-400 hover:text-red-400 transition-colors duration-300">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mystical-card p-6"
            >
              <h2 className="text-xl font-bold text-mystical-100 mb-4">Start a New Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((category, index) => {
                  const IconComponent = category.icon
                  return (
                    <Link
                      key={index}
                      href={category.href}
                      className="group p-4 rounded-lg border border-mystical-700 hover:border-cosmic-500 transition-all duration-300 hover:scale-105"
                    >
                      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${category.color} rounded-full mb-3`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-mystical-200 mb-1 group-hover:text-cosmic-300 transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-sm text-mystical-400">{category.description}</p>
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            {/* Recent Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mystical-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-mystical-100">Recent Sessions</h2>
                <Link href="/sessions" className="text-cosmic-400 hover:text-cosmic-300 text-sm">
                  View All
                </Link>
              </div>
              
              <div className="space-y-3">
                {recentSessions.map((session) => {
                  const IconComponent = getCategoryIcon(session.category)
                  const colorClass = getCategoryColor(session.category)
                  
                  return (
                    <Link
                      key={session.id}
                      href={`/chat/${session.id}`}
                      className="block p-4 rounded-lg border border-mystical-700 hover:border-cosmic-500 transition-all duration-300 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-r ${colorClass} rounded-full flex items-center justify-center`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-mystical-200 group-hover:text-cosmic-300 transition-colors duration-300">
                              {session.title}
                            </h3>
                            {session.unread && (
                              <div className="w-2 h-2 bg-cosmic-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-mystical-400 mt-1 truncate">
                            {session.lastMessage}
                          </p>
                          <p className="text-xs text-mystical-500 mt-1">
                            {session.timestamp}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Astrological Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mystical-card p-6"
            >
              <h3 className="text-lg font-bold text-mystical-100 mb-4">Your Cosmic Profile</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-mystical-400">Sun Sign</span>
                  <span className="font-semibold text-mystical-200">{userProfile.sunSign}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mystical-400">Moon Sign</span>
                  <span className="font-semibold text-mystical-200">{userProfile.moonSign}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mystical-400">Rising Sign</span>
                  <span className="font-semibold text-mystical-200">{userProfile.risingSign}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-mystical-400">Element</span>
                  <span className="font-semibold text-mystical-200">{userProfile.element}</span>
                </div>
              </div>
              
              <Link
                href="/profile"
                className="block mt-4 text-center text-cosmic-400 hover:text-cosmic-300 text-sm transition-colors duration-300"
              >
                View Full Profile
              </Link>
            </motion.div>

            {/* Daily Insight */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mystical-card p-6"
            >
              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-starlight-400 mr-2" />
                <h3 className="text-lg font-bold text-mystical-100">Today's Insight</h3>
              </div>
              
              <p className="text-mystical-300 text-sm leading-relaxed">
                Your {userProfile.sunSign} energy is particularly strong today. 
                This is an excellent time for communication and creative expression. 
                Trust your intuition as it's heightened by the current lunar cycle.
              </p>
            </motion.div>

            {/* Premium Upgrade */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mystical-card p-6 bg-gradient-to-r from-cosmic-500/10 to-celestial-500/10 border-cosmic-500/20"
            >
              <h3 className="text-lg font-bold cosmic-text mb-2">Upgrade to Premium</h3>
              <p className="text-mystical-300 text-sm mb-4">
                Unlock unlimited readings, detailed analysis, and personalized guidance
              </p>
              <Link
                href="/premium"
                className="block w-full text-center bg-gradient-to-r from-cosmic-500 to-celestial-500 text-white py-2 px-4 rounded-lg hover:from-cosmic-600 hover:to-celestial-600 transition-all duration-300 text-sm font-medium"
              >
                Upgrade Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}