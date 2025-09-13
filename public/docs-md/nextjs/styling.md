# CSS & Styling

Next.js provides several ways to style your applications, from global stylesheets to component-level styling.

## Global Styles

### CSS Files

Import global CSS files in your application:

```js
// pages/_app.js
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

### CSS Modules

CSS Modules allow you to locally scope CSS class names:

```css
/* styles/Button.module.css */
.button {
  background: #0070f3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
}
```

```jsx
// components/Button.js
import styles from '../styles/Button.module.css'

export default function Button() {
  return (
    <button className={styles.button}>
      Click me
    </button>
  )
}
```

## Tailwind CSS

Next.js has built-in support for Tailwind CSS:

1. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Configure `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add Tailwind directives to your CSS:
```css
/* styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Use Tailwind classes in your components:
```jsx
export default function Home() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

## Styled JSX

Next.js includes built-in support for styled-jsx:

```jsx
export default function Home() {
  return (
    <div>
      <h1>Hello World</h1>
      <style jsx>{`
        h1 {
          color: red;
          font-size: 24px;
        }
      `}</style>
    </div>
  )
}
```

## CSS-in-JS

### Emotion

```bash
npm install @emotion/react @emotion/styled
```

```jsx
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

export default function Home() {
  return (
    <div>
      <h1 css={css`
        color: hotpink;
        &:hover {
          color: purple;
        }
      `}>
        This has a hotpink background on hover!
      </h1>
    </div>
  )
}
```

### Styled Components

```bash
npm install styled-components
```

```jsx
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;
`

export default function Home() {
  return <Title>My page</Title>
}
```

## Sass Support

Next.js has built-in support for Sass:

```bash
npm install sass
```

Create a file with `.scss` or `.sass` extension:
```scss
/* styles/Home.module.scss */
$primary-color: #0070f3;

.title {
  color: $primary-color;
  font-size: 2rem;
}
```

```jsx
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <h1 className={styles.title}>
      Hello World
    </h1>
  )
}
```

## PostCSS

Next.js automatically configures PostCSS to compile CSS. You can customize it by creating a `postcss.config.js` file:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## CSS Variables

You can use CSS custom properties (variables) in your CSS files:

```css
/* styles/globals.css */
:root {
  --primary-color: #0070f3;
  --secondary-color: #ff0080;
}

.primary {
  color: var(--primary-color);
}
```

## Responsive Design

All CSS approaches work with responsive design:

### Tailwind CSS
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Responsive grid */}
</div>
```

### CSS Modules
```css
/* Responsive.module.css */
.container {
  padding: 1rem;
}

@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}
```

## Dark Mode

### Tailwind CSS Dark Mode
```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

```jsx
<h1 className="text-black dark:text-white">
  This text changes color in dark mode
</h1>
```

### CSS Custom Properties
```css
:root {
  --background: white;
  --text: black;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: black;
    --text: white;
  }
}

body {
  background: var(--background);
  color: var(--text);
}
```