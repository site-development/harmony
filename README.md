# Harmony Real Estate Advanced

An advanced real estate platform with property listings, neighborhood exploration, property comparisons, and user authentication.

## Features

- 🏠 Property listings with detailed information
- 🔍 Advanced property search with filters
- 🗺️ Neighborhood guides with interactive maps
- 💓 Save favorite properties to your wishlist
- 📊 Compare multiple properties side by side
- 👤 User authentication and profile management
- 📱 Fully responsive design for all devices

## Tech Stack

- **Framework**: Next.js 15
- **UI**: React + Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Authentication**: Custom implementation with JWT
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.0 or higher
- Bun or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
# or
npm install
```

3. Run the development server:

```bash
bun dev
# or
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Vercel

### Option 1: Deploy from GitHub

1. Push your code to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Select your GitHub repository
5. Configure your project settings (or use the defaults)
6. Click "Deploy"

### Option 2: Deploy with Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Log in to Vercel:

```bash
vercel login
```

3. Deploy from your project directory:

```bash
vercel
```

4. Follow the prompts to configure your deployment

### Environment Variables

The following environment variables are required for deployment:

- `NEXT_PUBLIC_API_URL`: API URL (for production)

## Project Structure

- `src/app`: Next.js App Router pages
- `src/components`: Reusable React components
- `src/contexts`: React context providers
- `src/data`: Mock data for properties and neighborhoods
- `src/lib`: Utility functions

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request
