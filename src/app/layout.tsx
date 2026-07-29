import './globals.css';
import { ThemeProvider } from 'next-themes';
import { geistMono } from '@/assets/fonts';
import { PackageManagerProvider } from '@/contexts/package-manager-context';
import { ThemeContextProvider } from '@/contexts/theme-context';
import { ThemeCustomizerProvider } from '@/contexts/theme-customizer-context';
import { ThemeControl } from '@/components/theme-control/theme-control';
import { Inter } from 'next/font/google';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { WebVitals } from '@/components/performance/web-vitals';
import { ResourcePreloader } from '@/components/performance/resource-preloader';
import { CriticalCSS } from '@/components/performance/critical-css';
import { MetaTags } from '@/components/seo/MetaTags';
import { StructuredData } from '@/components/seo/StructuredData';
import { LazyOpenGraph } from '@/components/seo/LazyOpenGraph';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { metadata } from '@/lib/metadata';
import Header from '@/components/site/header';
import { SolidProgressBar } from '@/components/ui/solid-progress-bar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export { metadata };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <MetaTags />
        <CriticalCSS />
        <ResourcePreloader fonts={[]} images={['/logo.svg', '/og-image.png']} />
      </head>
      <body
        className={`${inter.className} ${geistMono.variable} antialiased min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThemeContextProvider>
            <ThemeCustomizerProvider>
              <PackageManagerProvider>
                <SolidProgressBar />

                <Header />
                {children}
                <ThemeControl />
                <PerformanceMonitor />
                <WebVitals />
              </PackageManagerProvider>
            </ThemeCustomizerProvider>
          </ThemeContextProvider>
        </ThemeProvider>

        {/* Load analytics and structured data after initial render */}
        <GoogleAnalytics />
        <StructuredData />
        <LazyOpenGraph />
      </body>
    </html>
  );
}
