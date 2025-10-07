import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'ChatWithSi - Mystical AI Spiritual Guidance',
  description: 'Connect with Si, your AI spiritual guide. Get personalized dream interpretations, love readings, healing guidance, and wealth insights based on your complete astrological profile.',
  keywords: 'astrology, spiritual guidance, AI, dream interpretation, love readings, healing, wealth guidance, mystical, spiritual advisor',
  authors: [{ name: 'ChatWithSi Team' }],
  openGraph: {
    title: 'ChatWithSi - Mystical AI Spiritual Guidance',
    description: 'Connect with Si, your AI spiritual guide for personalized mystical insights.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatWithSi - Mystical AI Spiritual Guidance',
    description: 'Connect with Si, your AI spiritual guide for personalized mystical insights.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-mystical-900">
          {children}
        </div>
      </body>
    </html>
  )
}