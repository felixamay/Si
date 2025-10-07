# ChatWithSi.com - Mystical AI Spiritual Guidance Platform

ChatWithSi.com is a mystical, AI-assisted platform where users can converse with a spiritual guide named Si (Superior Intelligence). Si interprets dreams, provides love and relationship readings, offers healing and emotional guidance, and gives insights into wealth and success based on users' complete astrological profiles.

## 🌟 Features

### Core Functionality
- **Personalized Astrological Profiles**: Complete birth chart analysis including sun, moon, rising signs, nakshatra, and dosha
- **AI-Powered Spiritual Guidance**: Conversational interface with Si for mystical insights
- **Dream Interpretation**: Decode dream symbols with astrological context
- **Love & Relationship Readings**: Compatibility analysis and relationship guidance
- **Healing & Emotional Balance**: Spiritual healing recommendations and practices
- **Wealth & Success Guidance**: Career and abundance insights based on planetary influences

### User Experience
- **Mystical UI**: Celestial theme with starry backgrounds and cosmic gradients
- **Intuitive Onboarding**: Guided birth details collection with helpful explanations
- **Session Management**: Save and revisit previous conversations
- **Premium Features**: Unlimited access, detailed analysis, and exclusive content

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom mystical theme
- **Animations**: Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI GPT-4
- **Astrology Engine**: Custom calculations with Swiss Ephemeris
- **Payments**: Stripe integration

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chatwithsi.git
   cd chatwithsi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/chatwithsi"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   OPENAI_API_KEY="your-openai-api-key-here"
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
chatwithsi/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── onboarding/        # User onboarding flow
│   ├── dashboard/         # Main dashboard
│   ├── chat/              # Chat interface
│   ├── premium/           # Premium features
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── lib/                   # Utility functions and configurations
│   ├── astrology.ts       # Astrology calculations
│   ├── openai.ts          # AI integration
│   └── prisma.ts          # Database client
├── prisma/                # Database schema
└── public/                # Static assets
```

## 🔮 Key Features Implementation

### Astrological Profile Generation
- Calculates sun, moon, and rising signs from birth details
- Determines nakshatra and dosha for Vedic astrology insights
- Stores planetary positions for personalized readings

### AI-Powered Chat Interface
- Context-aware responses based on user's astrological profile
- Category-specific guidance (dreams, love, healing, wealth)
- Premium vs. free tier response differentiation

### Mystical UI Design
- Custom Tailwind theme with cosmic colors
- Animated starry backgrounds
- Glowing effects and mystical gradients
- Responsive design for all devices

## 🎨 Design System

### Color Palette
- **Mystical**: Deep space blues and purples
- **Cosmic**: Vibrant purples and pinks
- **Celestial**: Electric blues
- **Starlight**: Golden yellows

### Typography
- **Primary**: Inter (clean, modern)
- **Mystical**: Poppins (elegant, spiritual)

### Components
- Mystical cards with backdrop blur
- Gradient buttons with hover effects
- Animated starry backgrounds
- Glowing orbs and cosmic elements

## 🔐 Security & Privacy

- **Data Encryption**: All personal data encrypted at rest and in transit
- **Privacy Compliance**: GDPR and CCPA compliant
- **Secure Authentication**: NextAuth.js with secure session management
- **API Security**: Rate limiting and input validation

## 📱 Responsive Design

- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Accessible design patterns

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Railway**: Easy PostgreSQL and deployment
- **Heroku**: With PostgreSQL addon
- **DigitalOcean**: App Platform with managed database

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern AI-powered astrology apps
- Built with love for the spiritual community
- Special thanks to the open-source community

## 📞 Support

For support, email support@chatwithsi.com or join our Discord community.

---

**ChatWithSi.com** - Where ancient wisdom meets modern AI technology ✨