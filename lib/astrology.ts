// Astrology calculation utilities
export interface BirthDetails {
  dateOfBirth: Date
  timeOfBirth?: string
  placeOfBirth: string
  latitude?: number
  longitude?: number
}

export interface AstrologicalProfile {
  sunSign: string
  moonSign: string
  risingSign: string
  nakshatra?: string
  dosha?: string
  planetaryPositions?: any
}

// Zodiac signs mapping
export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const

export const ZODIAC_ELEMENTS = {
  'Aries': 'Fire',
  'Taurus': 'Earth',
  'Gemini': 'Air',
  'Cancer': 'Water',
  'Leo': 'Fire',
  'Virgo': 'Earth',
  'Libra': 'Air',
  'Scorpio': 'Water',
  'Sagittarius': 'Fire',
  'Capricorn': 'Earth',
  'Aquarius': 'Air',
  'Pisces': 'Water'
} as const

// Nakshatras (Vedic astrology)
export const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra',
  'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni',
  'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha',
  'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
] as const

// Doshas (Ayurvedic constitution)
export const DOSHAS = ['Vata', 'Pitta', 'Kapha'] as const

export function calculateSunSign(dateOfBirth: Date): string {
  const month = dateOfBirth.getMonth() + 1
  const day = dateOfBirth.getDate()
  
  // Simple sun sign calculation based on date ranges
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Pisces'
  
  return 'Unknown'
}

export function calculateMoonSign(dateOfBirth: Date, timeOfBirth?: string): string {
  // This is a simplified calculation
  // In a real implementation, you would use proper astronomical calculations
  const sunSign = calculateSunSign(dateOfBirth)
  const sunIndex = ZODIAC_SIGNS.indexOf(sunSign as any)
  
  // Moon sign is typically 1-3 signs ahead of sun sign
  const moonIndex = (sunIndex + Math.floor(Math.random() * 3) + 1) % 12
  return ZODIAC_SIGNS[moonIndex]
}

export function calculateRisingSign(dateOfBirth: Date, timeOfBirth?: string): string {
  // This is a simplified calculation
  // In a real implementation, you would use proper astronomical calculations
  const sunSign = calculateSunSign(dateOfBirth)
  const sunIndex = ZODIAC_SIGNS.indexOf(sunSign as any)
  
  // Rising sign can be any sign, but we'll use a simple calculation
  const risingIndex = (sunIndex + Math.floor(Math.random() * 12)) % 12
  return ZODIAC_SIGNS[risingIndex]
}

export function getRandomNakshatra(): string {
  const randomIndex = Math.floor(Math.random() * NAKSHATRAS.length)
  return NAKSHATRAS[randomIndex]
}

export function getRandomDosha(): string {
  const randomIndex = Math.floor(Math.random() * DOSHAS.length)
  return DOSHAS[randomIndex]
}

export function calculateAstrologicalProfile(birthDetails: BirthDetails): AstrologicalProfile {
  const sunSign = calculateSunSign(birthDetails.dateOfBirth)
  const moonSign = calculateMoonSign(birthDetails.dateOfBirth, birthDetails.timeOfBirth)
  const risingSign = calculateRisingSign(birthDetails.dateOfBirth, birthDetails.timeOfBirth)
  
  return {
    sunSign,
    moonSign,
    risingSign,
    nakshatra: getRandomNakshatra(),
    dosha: getRandomDosha(),
    planetaryPositions: {
      sun: sunSign,
      moon: moonSign,
      rising: risingSign,
      // Add more planetary positions as needed
    }
  }
}

export function getZodiacElement(sign: string): string {
  return ZODIAC_ELEMENTS[sign as keyof typeof ZODIAC_ELEMENTS] || 'Unknown'
}

export function getCompatibilityScore(sign1: string, sign2: string): number {
  const element1 = getZodiacElement(sign1)
  const element2 = getZodiacElement(sign2)
  
  // Same elements are highly compatible
  if (element1 === element2) return 85
  
  // Fire and Air are compatible
  if ((element1 === 'Fire' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Fire')) return 75
  
  // Earth and Water are compatible
  if ((element1 === 'Earth' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Earth')) return 75
  
  // Opposite elements have moderate compatibility
  if ((element1 === 'Fire' && element2 === 'Water') || (element1 === 'Water' && element2 === 'Fire')) return 60
  if ((element1 === 'Earth' && element2 === 'Air') || (element1 === 'Air' && element2 === 'Earth')) return 60
  
  return 50 // Default compatibility
}