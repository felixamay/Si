'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Sparkles, Moon, Heart, Shield, TrendingUp, Send, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { generateSiResponse, SiContext } from '@/lib/openai'

export default function DemoPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const categories = [
    {
      id: 'dream',
      icon: Moon,
      title: 'Dream Interpretation',
      description: 'Share a dream and get mystical insights',
      color: 'from-purple-500 to-pink-500',
      placeholder: 'I dreamed I was flying over a vast ocean...'
    },
    {
      id: 'love',
      icon: Heart,
      title: 'Love & Relationships',
      description: 'Ask about compatibility and romance',
      color: 'from-pink-500 to-red-500',
      placeholder: 'What does my love life look like?'
    },
    {
      id: 'healing',
      icon: Shield,
      title: 'Healing & Balance',
      description: 'Seek emotional and spiritual healing',
      color: 'from-green-500 to-teal-500',
      placeholder: 'I need help with emotional balance...'
    },
    {
      id: 'wealth',
      icon: TrendingUp,
      title: 'Wealth & Success',
      description: 'Get guidance on career and abundance',
      color: 'from-yellow-500 to-orange-500',
      placeholder: 'What career path should I pursue?'
    }
  ]

  // Mock user profile for demo
  const userProfile = {
    name: 'Demo User',
    sunSign: 'Gemini',
    moonSign: 'Pisces',
    risingSign: 'Leo',
    nakshatra: 'Rohini',
    dosha: 'Vata'
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setMessages([])
    setInputMessage('')
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedCategory || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)

    try {
      const context: SiContext = {
        userProfile,
        category: selectedCategory as any,
        conversationHistory: newMessages.slice(-5) // Last 5 messages for context
      }

      const response = await generateSiResponse(userMessage, context)
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      console.error('Error generating response:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I seem to have lost my connection to the cosmic energies. Please try again in a moment.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const selectedCategoryData = selectedCategory ? categories.find(c => c.id === selectedCategory) : null

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
              <h1 className="text-2xl font-bold cosmic-text">Try Si Demo</h1>
              <p className="text-mystical-400">Experience Si's mystical guidance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto">
          {!selectedCategory ? (
            /* Category Selection */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold cosmic-text mb-6">
                  Choose Your Reading
                </h2>
                <p className="text-xl text-mystical-300 max-w-3xl mx-auto">
                  Select a category to begin your mystical conversation with Si
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => {
                  const IconComponent = category.icon
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      onClick={() => handleCategorySelect(category.id)}
                      className="mystical-card p-6 text-center group hover:scale-105 transition-all duration-300"
                    >
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-full mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-mystical-100 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-mystical-400 leading-relaxed">
                        {category.description}
                      </p>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            /* Chat Interface */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mystical-card p-8"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-mystical-400 hover:text-cosmic-400 transition-colors duration-300"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className={`w-10 h-10 bg-gradient-to-r ${selectedCategoryData?.color} rounded-full flex items-center justify-center`}>
                    <selectedCategoryData?.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-mystical-100">{selectedCategoryData?.title}</h3>
                    <p className="text-sm text-mystical-400">Demo with Si</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-mystical-400">Si is online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-6 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-mystical-400 mb-4">
                      {selectedCategoryData?.placeholder}
                    </p>
                    <p className="text-sm text-mystical-500">
                      This is a demo. Si will respond based on your selected category.
                    </p>
                  </div>
                )}
                
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === 'user' 
                            ? 'bg-gradient-to-r from-mystical-600 to-mystical-700' 
                            : `bg-gradient-to-r ${selectedCategoryData?.color}`
                        }`}>
                          {message.role === 'user' ? (
                            <span className="text-sm font-medium text-mystical-200">D</span>
                          ) : (
                            <Sparkles className="w-4 h-4 text-white" />
                          )}
                        </div>
                        
                        <div className={`px-4 py-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-cosmic-500 to-celestial-500 text-white'
                            : 'bg-mystical-800/50 text-mystical-100'
                        }`}>
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r ${selectedCategoryData?.color} rounded-full flex items-center justify-center`}>
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-mystical-800/50 px-4 py-3 rounded-2xl">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-cosmic-400" />
                          <span className="text-mystical-400">Si is channeling cosmic wisdom...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={selectedCategoryData?.placeholder}
                    className="mystical-input w-full pr-12"
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  className="mystical-button px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}