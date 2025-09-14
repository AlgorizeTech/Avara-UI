# Image Optimization

The `next/image` component automatically optimizes images for performance.

## Basic Usage

Use the `next/image` component instead of ``:

```jsx

export default function Page() {
  return (
    
  )
}
```

## Remote Images

For remote images, configure domains in `next.config.js`:

```js
// next.config.js
const nextConfig = {
  images: {
    domains: ['example.com', 'cdn.example.com'],
  },
}
 
module.exports = nextConfig
```

Then use remote images:

```jsx

```

## Local Images

Import local images directly:

```jsx

export default function Page() {
  return (
    
  )
}
```

## Responsive Images

The Image component automatically creates responsive images:

```jsx

```

## Fill Container

Use `fill` to make an image fill its parent container:

```jsx

```

## Priority Loading

Use `priority` for above-the-fold images:

```jsx

```

## Image Sizing

Specify image dimensions:

```jsx
// Fixed size

// Aspect ratio

```

## Styling Images

Style images with the `style` prop:

```jsx

```

## Placeholders

Use placeholders for better loading experience:

```jsx
// Blur placeholder (default for local images)

// Data URL placeholder

```

## Quality Control

Control image quality:

```jsx

```

## Loading Behavior

Control loading behavior:

```jsx

```

## On Load Events

Handle image load events:

```jsx
 console.log('Image loaded')}
  onError={() => console.log('Image failed to load')}
/>
```

## Best Practices

1. **Always specify width and height** to prevent layout shift
2. **Use priority** for above-the-fold images
3. **Configure remote domains** in next.config.js
4. **Use placeholders** for better loading experience
5. **Optimize image quality** for file size vs visual quality
6. **Use responsive sizes** for different screen widths
7. **Leverage automatic optimization** instead of manual optimization

---

**Component Path:** `nextjs\image-optimization\page.mdx`

<<<<<<< HEAD
**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.
=======
**Web Version:** Visit the interactive version at the corresponding URL on the Next.js Documentation site for live previews and interactive examples.
>>>>>>> 8e21847a0a67777192006855ac652c1bf8ef7b1d
