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

## Project Structure

### App Router Structure (Recommended)

```bash
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

## Development Server

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

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

## First Steps

After installation, try these first steps:

1. **Edit the home page**:
   Modify `app/page.js` to change the content

2. **Add a new route**:
   Create `app/about/page.js`:
   ```jsx
   export default function About() {
     return About Page
   }
   ```

3. **Add a component**:
   Create `components/Header.js`:
   ```jsx
   export default function Header() {
     return My Header
   }
   ```

4. **Use the component**:
   Import and use in `app/page.js`:
   ```jsx
   import Header from '@/components/Header'
   
   export default function Home() {
     return (

         Hello, Next.js!
       
     )
   }
   ```

## Next Steps

After setting up your project, consider:

1. [Learning the basics](/docs/nextjs/routing) of Next.js routing
2. [Adding data fetching](/docs/nextjs/data-fetching) to your pages
3. [Styling your application](/docs/nextjs/styling) with CSS
4. [Optimizing performance](/docs/nextjs/performance) with built-in features
5. [Adding authentication](/docs/nextjs/authentication) to protect routes
6. [Testing your application](/docs/nextjs/testing) with Jest or Cypress
7. [Deploying your application](/docs/nextjs/deployment) to production

---

**Component Path:** `nextjs\installation\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
