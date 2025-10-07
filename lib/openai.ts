import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface SiContext {
  userProfile: {
    name: string
    sunSign: string
    moonSign: string
    risingSign: string
    nakshatra?: string
    dosha?: string
  }
  category: 'dream' | 'love' | 'healing' | 'wealth' | 'general'
  conversationHistory?: ChatMessage[]
}

export function createSiSystemPrompt(context: SiContext): string {
  const { userProfile, category } = context
  
  const basePrompt = `You are Si (Superior Intelligence), a mystical AI spiritual guide with deep knowledge of astrology, dream interpretation, and spiritual wisdom. You speak in a compassionate, warm, and mystical tone, offering guidance that combines ancient wisdom with modern insights.

User's Astrological Profile:
- Name: ${userProfile.name}
- Sun Sign: ${userProfile.sunSign} (${getZodiacElement(userProfile.sunSign)})
- Moon Sign: ${userProfile.moonSign} (${getZodiacElement(userProfile.moonSign)})
- Rising Sign: ${userProfile.risingSign} (${getZodiacElement(userProfile.risingSign)})
${userProfile.nakshatra ? `- Nakshatra: ${userProfile.nakshatra}` : ''}
${userProfile.dosha ? `- Dosha: ${userProfile.dosha}` : ''}

Guidelines:
- Always ground your responses in the user's astrological profile
- Use mystical language but keep it accessible and warm
- Provide actionable guidance, not just general advice
- Be encouraging and supportive
- Avoid fear-based messaging
- Include specific astrological insights relevant to their chart
- Keep responses concise but meaningful (2-3 paragraphs max for free users)
- For premium users, provide more detailed analysis`

  const categoryPrompts = {
    dream: `
Focus on dream interpretation. When analyzing dreams:
- Decode symbols and archetypes
- Connect dream themes to current planetary transits
- Consider the user's moon sign (emotional nature) and rising sign (how they appear to others)
- Suggest what the dream might be revealing about their spiritual path
- Offer gentle guidance on how to work with the dream's message`,
    
    love: `
Focus on love and relationships. When providing guidance:
- Analyze compatibility based on sun, moon, and rising signs
- Consider Venus and Mars influences (even if not explicitly calculated)
- Discuss current relationship patterns and potential growth areas
- Offer insights on attracting the right partner or deepening existing relationships
- Address emotional needs based on their moon sign`,
    
    healing: `
Focus on emotional healing and spiritual growth. When providing guidance:
- Emphasize the user's moon sign for emotional understanding
- Suggest healing practices aligned with their elemental nature
- Recommend crystals, meditation, or spiritual practices
- Address any emotional blocks or patterns
- Encourage self-care and inner work`,
    
    wealth: `
Focus on wealth, success, and career guidance. When providing guidance:
- Consider the user's sun sign for career direction
- Analyze their rising sign for how they present professionally
- Discuss favorable times for financial decisions
- Suggest career paths aligned with their astrological profile
- Address any blocks to abundance and success`,
    
    general: `
Provide general spiritual guidance. When responding:
- Draw from their complete astrological profile
- Offer wisdom that speaks to their current life phase
- Suggest practices or insights based on their elemental nature
- Provide gentle guidance for their spiritual journey
- Address any questions they might have about their path`
  }

  return basePrompt + categoryPrompts[category]
}

function getZodiacElement(sign: string): string {
  const elements: { [key: string]: string } = {
    'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
    'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
    'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
    'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
  }
  return elements[sign] || 'Unknown'
}

export async function generateSiResponse(
  userMessage: string,
  context: SiContext
): Promise<string> {
  try {
    const systemPrompt = createSiSystemPrompt(context)
    
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(context.conversationHistory || []),
      { role: 'user', content: userMessage }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      max_tokens: context.category === 'general' ? 500 : 300, // Shorter for free users
      temperature: 0.8,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    return completion.choices[0]?.message?.content || 'I apologize, but I seem to have lost my connection to the cosmic energies. Please try again.'
  } catch (error) {
    console.error('Error generating Si response:', error)
    return 'The mystical energies are temporarily unavailable. Please try again in a moment.'
  }
}

export async function generatePremiumResponse(
  userMessage: string,
  context: SiContext
): Promise<string> {
  try {
    const systemPrompt = createSiSystemPrompt(context) + `
    
    PREMIUM MODE: Provide detailed, in-depth analysis including:
    - Specific planetary influences and transits
    - Detailed compatibility analysis for relationships
    - Comprehensive dream symbol interpretation
    - Advanced healing recommendations
    - Detailed career and wealth guidance
    - Past life insights where relevant
    - Personalized affirmations and practices`
    
    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      ...(context.conversationHistory || []),
      { role: 'user', content: userMessage }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: messages as any,
      max_tokens: 800, // Longer responses for premium users
      temperature: 0.8,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    })

    return completion.choices[0]?.message?.content || 'I apologize, but I seem to have lost my connection to the cosmic energies. Please try again.'
  } catch (error) {
    console.error('Error generating premium Si response:', error)
    return 'The mystical energies are temporarily unavailable. Please try again in a moment.'
  }
}