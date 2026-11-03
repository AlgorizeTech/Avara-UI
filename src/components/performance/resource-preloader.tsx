interface ResourcePreloaderProps {
  fonts?: string[];
  images?: string[];
  scripts?: string[];
}

export function ResourcePreloader({
  fonts = [],
  images = [],
  scripts = [],
}: ResourcePreloaderProps) {
  return (
    <>
      {/* Preload critical fonts */}
      {fonts.map((font) => (
        <link
          key={font}
          rel="preload"
          href={font}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}

      {/* Preload critical images */}
      {images.map((image) => (
        <link key={image} rel="preload" href={image} as="image" />
      ))}

      {/* Preload critical scripts */}
      {scripts.map((script) => (
        <link key={script} rel="preload" href={script} as="script" />
      ))}

      {/* Imagery on the home page and the docs examples is served from
          Cloudinary. Next's fonts are self-hosted, so the Google Fonts
          origins this used to preconnect to were never contacted. */}
      <link rel="preconnect" href="https://res.cloudinary.com" />
      <link rel="dns-prefetch" href="//i.postimg.cc" />
      <link rel="dns-prefetch" href="//i.pinimg.com" />
      <link rel="dns-prefetch" href="//avatars.githubusercontent.com" />
    </>
  );
}
