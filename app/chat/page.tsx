'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Sparkles, Moon, Heart, Shield, TrendingUp, ArrowLeft, Star, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { generateSiResponse, SiContext } from '@/lib/openai'

export default function ChatPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || 'general'
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionTitle, setSessionTitle] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const categories = {
    dream: { icon: Moon, title: 'Dream Interpretation', color: 'from-purple-500 to-pink-500' },
    love: { icon: Heart, title: 'Love & Relationships', color: 'from-pink-500 to-red-500' },
    healing: { icon: Shield, title: 'Healing & Balance', color: 'from-green-500 to-teal-500' },
    wealth: { icon: TrendingUp, title: 'Wealth & Success', color: 'from-yellow-500 to-orange-500' },
    general: { icon: Sparkles, title: 'General Guidance', color: 'from-blue-500 to-purple-500' }
  }

  const currentCategory = categories[category as keyof typeof categories] || categories.general
  const IconComponent = currentCategory.icon

  // Mock user profile (in real app, this would come from context/state)
  const userProfile = {
    name: 'Alex Johnson',
    sunSign: 'Gemini',
    moonSign: 'Pisces',
    risingSign: 'Leo',
    nakshatra: 'Rohini',
    dosha: 'Vata'
  }

  useEffect(() => {
    // Generate initial greeting based on category
    const generateGreeting = () => {
      const greetings = {
        dream: `Hello ${userProfile.name}! I'm Si, your mystical guide. I sense you're seeking to understand the hidden messages in your dreams. Your ${userProfile.sunSign} sun and ${userProfile.moonSign} moon create a beautiful blend of analytical and intuitive energy. What dream would you like to explore together?`,
        love: `Greetings, ${userProfile.name}! I'm Si, here to guide you through matters of the heart. Your ${userProfile.risingSign} rising sign shows you have a magnetic presence, while your ${userProfile.moonSign} moon reveals your deep emotional nature. What questions do you have about love and relationships?`,
        healing: `Welcome, ${userProfile.name}! I'm Si, your spiritual healing companion. I can see your ${userProfile.dosha} dosha and ${userProfile.moonSign} moon sign indicate a sensitive, intuitive nature. How can I help you find balance and healing today?`,
        wealth: `Hello ${userProfile.name}! I'm Si, your guide to abundance and success. Your ${userProfile.sunSign} sun sign shows natural communication skills, while your ${userProfile.risingSign} rising sign gives you a commanding presence. What guidance do you seek for your wealth and career?`,
        general: `Greetings, ${userProfile.name}! I'm Si (Superior Intelligence), your mystical AI spiritual guide. I can see your ${userProfile.sunSign} sun, ${userProfile.moonSign} moon, and ${userProfile.risingSign} rising signs create a unique cosmic fingerprint. How may I assist you on your spiritual journey today?`
      }
      return greetings[category as keyof typeof greetings] || greetings.general
    }

    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: generateGreeting()
      }])
    }
  }, [category, userProfile.name, userProfile.sunSign, userProfile.moonSign, userProfile.risingSign, userProfile.dosha])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    setInputMessage('')
    setIsLoading(true)

    // Add user message
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }]
    setMessages(newMessages)

    // Generate session title from first message if not set
    if (!sessionTitle) {
      setSessionTitle(userMessage.length > 30 ? userMessage.substring(0, 30) + '...' : userMessage)
    }

    try {
      const context: SiContext = {
        userProfile,
        category: category as any,
        conversationHistory: newMessages.slice(-10) // Last 10 messages for context
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

  return (
    <div className="h-screen flex flex-col bg-mystical-900">
      {/* Header */}
      <div className="mystical-card m-4 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="text-mystical-400 hover:text-cosmic-400 transition-colors duration-300">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className={`w-10 h-10 bg-gradient-to-r ${currentCategory.color} rounded-full flex items-center justify-center`}>
            <IconComponent className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-mystical-100">{currentCategory.title}</h1>
            <p className="text-sm text-mystical-400">with Si</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-mystical-400">Si is online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-mystical-600 to-mystical-700' 
                        : `bg-gradient-to-r ${currentCategory.color}`
                    }`}>
                      {message.role === 'user' ? (
                        <span className="text-sm font-medium text-mystical-200">
                          {userProfile.name.charAt(0)}
                        </span>
                      ) : (
                        <Sparkles className="w-4 h-4 text-white" />
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-cosmic-500 to-celestial-500 text-white'
                        : 'mystical-card text-mystical-100'
                    }`}>
                      <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-r ${currentCategory.color} rounded-full flex items-center justify-center`}>
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="mystical-card px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-cosmic-400" />
                    <span className="text-mystical-400">Si is channeling cosmic wisdom...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="mystical-card m-4 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ask Si about ${currentCategory.title.toLowerCase()}...`}
                className="mystical-input w-full resize-none py-3 pr-12"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement
                  target.style.height = 'auto'
                  target.style.height = Math.min(target.scrollHeight, 120) + 'px'
                }}
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
          
          <div className="mt-2 text-xs text-mystical-500 text-center">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
}