#!/bin/bash

# ChatWithSi Setup Script
echo "🌟 Welcome to ChatWithSi Setup! 🌟"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created from template"
    echo "⚠️  Please update .env with your actual API keys and database URL"
else
    echo "✅ .env file already exists"
fi

# Generate Prisma client
echo "🗄️  Generating Prisma client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi

echo "✅ Prisma client generated"

# Check if database is configured
if grep -q "postgresql://username:password@localhost:5432/chatwithsi" .env; then
    echo "⚠️  Database URL is still using default values"
    echo "   Please update DATABASE_URL in .env with your actual PostgreSQL connection string"
    echo "   Example: postgresql://user:password@localhost:5432/chatwithsi"
fi

# Check if OpenAI API key is configured
if grep -q "your-openai-api-key-here" .env; then
    echo "⚠️  OpenAI API key is not configured"
    echo "   Please update OPENAI_API_KEY in .env with your actual OpenAI API key"
    echo "   Get your API key from: https://platform.openai.com/api-keys"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual API keys and database URL"
echo "2. Set up your PostgreSQL database"
echo "3. Run: npx prisma db push"
echo "4. Run: npm run dev"
echo ""
echo "For more information, see README.md"
echo ""
echo "✨ May the cosmic energies guide your development journey! ✨"