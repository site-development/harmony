#!/bin/bash

# Script to prepare Harmony Real Estate Advanced application for Vercel deployment

echo "📦 Installing dependencies"
bun install

echo "🧪 Running tests"
# Add tests here when they exist
# bun test

echo "🏗️ Building the application"
bun run build

echo "✅ Application is ready for Vercel deployment"
echo "To deploy to Vercel, use one of the following methods:"
echo "1. Connect your GitHub repository to Vercel and push your changes"
echo "2. Install Vercel CLI and run 'vercel deploy'"
echo "3. Deploy using the Vercel dashboard at https://vercel.com/new"
