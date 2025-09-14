# CSS & Styling

Next.js supports multiple ways to style your application.

## Global Styles

Import global styles in your root layout:

```css
/* app/globals.css */
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

```jsx
// app/layout.js
import './globals.css'
 
export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

## CSS Modules

Create scoped CSS with CSS Modules:

```css
/* app/components/Button.module.css */
.button {
  padding: 16px;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
}

.button:hover {
  background-color: #0051cc;
}
```

```jsx
// app/components/Button.js

export default function Button({ children }) {
  return (
    
      {children}
    
  )
}
```

## Tailwind CSS

Install and configure Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
// tailwind.config.js
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

```js
// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Use Tailwind classes in your components:

```jsx
// app/components/Card.js
export default function Card({ title, children }) {
  return (

        {title}
        
          {children}

  )
}
```

## Styled Components

Install and configure Styled Components:

```bash
npm install styled-components
npm install -D @types/styled-components
```

```jsx
// app/components/Button.js
'use client'

const StyledButton = styled.button`
  padding: 16px;
  border: none;
  border-radius: 4px;
  background-color: #0070f3;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: #0051cc;
  }
`
 
export default function Button({ children }) {
  return (
    
      {children}
    
  )
}
```

## CSS-in-JS

Use inline styles for simple styling:

```jsx
// app/components/Box.js
export default function Box({ children }) {
  const styles = {
    padding: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f5f5f5'
  }
  
  return (
    
      {children}
    
  )
}
```

## Sass/SCSS

Install Sass support:

```bash
npm install sass
```

Create Sass files with `.scss` or `.sass` extension:

```scss
// app/components/Button.scss
$primary-color: #0070f3;

.button {
  padding: 16px;
  border: none;
  border-radius: 4px;
  background-color: $primary-color;
  color: white;
  cursor: pointer;
  
  &:hover {
    background-color: darken($primary-color, 10%);
  }
}
```

```jsx
// app/components/Button.js
import './Button.scss'
 
export default function Button({ children }) {
  return (
    
      {children}
    
  )
}
```

## Component Libraries

Integrate popular component libraries:

### Material UI

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
```

```jsx
// app/layout.js
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
 
export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

```jsx
// app/page.js
'use client'

export default function Home() {
  return (
    
      Hello World
    
  )
}
```

### Ant Design

```bash
npm install antd
```

```jsx
// app/layout.js
import 'antd/dist/reset.css'
 
export default function RootLayout({ children }) {
  return (
    
      {children}
    
  )
}
```

```jsx
// app/page.js
'use client'

export default function Home() {
  return (
    
      Hello World
    
  )
}
```

## Best Practices

1. **Use global styles** for base styles and CSS resets
2. **CSS Modules** for component-scoped styling
3. **Tailwind CSS** for utility-first styling
4. **Styled Components** for dynamic styling
5. **Avoid inline styles** for complex styling
6. **Use CSS variables** for themeable designs
7. **Optimize for performance** by minimizing CSS bundle size
8. **Follow a consistent naming convention** across your project

---

**Component Path:** `nextjs\styling\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
