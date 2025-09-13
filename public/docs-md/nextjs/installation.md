# Installation & Setup Guide

Get started with Next.js by creating a new project or adding it to an existing application.

## System Requirements

Before installing Next.js, ensure you have the following:

- Node.js 18.17 or later
- npm, yarn, or pnpm package manager
- Text editor (VS Code recommended)
- Terminal or command prompt

## Creating a New Next.js App

### Using create-next-app

The easiest way to get started is with `create-next-app`, which sets up everything automatically:

```bash
npx create-next-app@latest
```

For TypeScript support:
```bash
npx create-next-app@latest --typescript
```

For the App Router (default in Next.js 13+):
```bash
npx create-next-app@latest --app
```

You can also combine flags:
```bash
npx create-next-app@latest my-app --typescript --app
```

### Manual Installation

To manually create a Next.js app, follow these steps:

1. Create a new directory and navigate to it:
```bash
mkdir my-next-app
cd my-next-app
```

2. Initialize a new npm project:
```bash
npm init -y
```

3. Install Next.js and React:
```bash
npm install next react react-dom
```

4. Add scripts to `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

5. Create the project structure:
```bash
mkdir app
touch app/page.js
touch app/layout.js
```

6. Create a basic page in `app/page.js`:
```jsx
export default function Home() {
  return <h1>Hello, Next.js!</h1>
}
```

7. Create a root layout in `app/layout.js`:
```jsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

## Project Structure

### App Router Structure (Recommended)

```
my-next-app/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── api/
│   └── [slug]/
│       └── page.js
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── components/
├── lib/
├── next.config.js
├── package.json
├── README.md
└── .gitignore
```

### Pages Router Structure (Legacy)

```
my-next-app/
├── pages/
│   ├── index.js
│   ├── about.js
│   └── api/
│       └── hello.js
├── public/
│   └── favicon.ico
├── styles/
│   └── globals.css
├── components/
├── lib/
├── next.config.js
├── package.json
├── README.md
└── .gitignore
```

## Development Server

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

### Custom Port

To run on a different port:
```bash
npm run dev -- -p 3001
```

### Custom Hostname

To run on a specific hostname:
```bash
npm run dev -- -H 0.0.0.0
```

## TypeScript Setup

### New Projects

Create a TypeScript project:
```bash
npx create-next-app@latest --typescript
```

### Existing Projects

Add TypeScript to an existing project:

1. Install TypeScript dependencies:
```bash
npm install --save-dev typescript @types/react @types/node @types/react-dom
```

2. Create a `tsconfig.json` file:
```bash
touch tsconfig.json
```

3. Start the development server:
```bash
npm run dev
```

Next.js will automatically configure TypeScript for you.

## Environment Variables

### Setting Up

Create a `.env.local` file in your project root:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
```

### Using in Code

Access environment variables in your application:
```jsx
// Public environment variables (available in browser)
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// Private environment variables (server-side only)
const databaseUrl = process.env.DATABASE_URL
```

## CSS Setup

### Global Styles

Create `app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

Import global styles in your root layout:
```jsx
// app/layout.js
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  )
}
```

### Tailwind CSS

Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## Linting and Formatting

### ESLint

Next.js includes ESLint by default. Configure in `.eslintrc`:
```json
{
  "extends": "next/core-web-vitals"
}
```

Run ESLint:
```bash
npm run lint
```

### Prettier

Install Prettier:
```bash
npm install --save-dev prettier
```

Create `.prettierrc`:
```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false
}
```

## Useful Development Tools

### VS Code Extensions

Recommended VS Code extensions:
- ES7+ React/Redux/React-Native snippets
- Auto Rename Tag
- Bracket Pair Colorizer
- Prettier - Code formatter
- ES7 React/Redux/GraphQL/React-Native snippets

### Browser Extensions

- React Developer Tools
- Redux DevTools

## Next.js Configuration

### next.config.js

Basic configuration:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
```

### Common Options

```js
const nextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  
  // Enable SWC minification
  swcMinify: true,
  
  // Configure images
  images: {
    domains: ['example.com'],
  },
  
  // Configure environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Configure webpack
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    
    return config
  },
}

module.exports = nextConfig
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   Change the port or kill the process using the port

2. **Module not found**:
   Check imports and ensure files exist

3. **CSS not loading**:
   Verify global CSS import in layout file

4. **Environment variables not working**:
   Ensure proper prefix (`NEXT_PUBLIC_`) for client-side variables

### Clear Cache

Clear Next.js cache:
```bash
rm -rf .next
```

Clear npm cache:
```bash
npm cache clean --force
```

## First Steps

After installation, try these first steps:

1. **Edit the home page**:
   Modify `app/page.js` to change the content

2. **Add a new route**:
   Create `app/about/page.js`:
   ```jsx
   export default function About() {
     return <h1>About Page</h1>
   }
   ```

3. **Add a component**:
   Create `components/Header.js`:
   ```jsx
   export default function Header() {
     return <header>My Header</header>
   }
   ```

4. **Use the component**:
   Import and use in `app/page.js`:
   ```jsx
   import Header from '@/components/Header'
   
   export default function Home() {
     return (
       <div>
         <Header />
         <h1>Hello, Next.js!</h1>
       </div>
     )
   }
   ```

## Next Steps

After setting up your project, consider:

1. [Learning the basics](/docs/routing) of Next.js routing
2. [Adding data fetching](/docs/data-fetching) to your pages
3. [Styling your application](/docs/styling) with CSS
4. [Optimizing performance](/docs/performance) with built-in features
5. [Adding authentication](/docs/authentication) to protect routes
6. [Testing your application](/docs/testing) with Jest or Cypress
7. [Deploying your application](/docs/deployment) to production

## Community Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)
- [Next.js Examples](https://github.com/vercel/next.js/tree/canary/examples)
- [Vercel Community](https://vercel.community/)