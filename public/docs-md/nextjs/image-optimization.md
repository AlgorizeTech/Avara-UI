# Image Optimization

Next.js provides an Image component that extends the native HTML `<img>` element to provide automatic image optimization.

## next/image Component

The `next/image` component optimizes images automatically:

```jsx
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={500}
      height={500}
    />
  )
}
```

## Optimization Features

### Automatic Image Optimization

Images are optimized on-demand as users request them, reducing build times.

### Improved Performance

- **Modern Formats**: Automatically serves WebP and AVIF formats when supported
- **Lazy Loading**: Images load only when they enter the viewport
- **Responsive**: Automatically generates correct size images for different devices

### Image Sizing

You must provide `width` and `height` props to prevent Cumulative Layout Shift (CLS):

```jsx
<Image
  src="/large-image.jpg"
  alt="Large image"
  width={2000}
  height={1000}
  style={{
    width: '100%',
    height: 'auto',
  }}
/>
```

### Remote Images

For remote images, you need to configure `remotePatterns` in `next.config.js`:

```js
// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
```

Then you can use remote images:

```jsx
<Image
  src="https://example.com/account123/profile.jpg"
  alt="Profile"
  width={400}
  height={400}
/>
```

### Local Images

For local images, import them directly:

```jsx
import profilePic from '../public/me.png'

export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
    />
  )
}
```

## Image Component Props

### Priority

Use the `priority` prop for above-the-fold images to preload them:

```jsx
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
/>
```

### Fill

Use `fill` for images that need to stretch to fill their parent container:

```jsx
<div style={{ position: 'relative', width: '500px', height: '400px' }}>
  <Image
    src="/hero.jpg"
    alt="Hero image"
    fill
    style={{
      objectFit: 'cover',
    }}
  />
</div>
```

### Quality

Control the quality of optimized images (1-100):

```jsx
<Image
  src="/photo.jpg"
  alt="Photo"
  width={800}
  height={600}
  quality={75}
/>
```

## Unoptimized Images

To disable optimization for specific images, use the `unoptimized` prop:

```jsx
<Image
  src="/logo.png"
  alt="Logo"
  width={100}
  height={50}
  unoptimized
/>
```

## Custom Loader

You can provide a custom loader function for advanced use cases:

```jsx
import Image from 'next/image'

const myLoader = ({ src, width, quality }) => {
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

export default function MyImage() {
  return (
    <Image
      loader={myLoader}
      src="me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```