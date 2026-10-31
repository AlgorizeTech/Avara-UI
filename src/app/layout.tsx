import './globals.css';
import { ThemeProvider } from 'next-themes';
import { cooper, dmSans, geistMono } from '@/assets/fonts';
import { PackageManagerProvider } from '@/contexts/package-manager-context';
import { McpClientProvider } from '@/contexts/mcp-client-context';
import { ThemeContextProvider } from '@/contexts/theme-context';
import { ThemeCustomizerProvider } from '@/contexts/theme-customizer-context';
import { ThemeControl } from '@/components/theme-control/theme-control';
import { ThemeInitScript } from '@/components/theme-control/theme-init-script';
import { PerformanceMonitor } from '@/components/performance/PerformanceMonitor';
import { WebVitals } from '@/components/performance/web-vitals';
import { ResourcePreloader } from '@/components/performance/resource-preloader';
import { CriticalCSS } from '@/components/performance/critical-css';
import { MetaTags } from '@/components/seo/MetaTags';
import { StructuredData } from '@/components/seo/StructuredData';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { Analytics } from '@/components/analytics/Analytics';
import { Suspense } from 'react';
import { metadata } from '@/lib/metadata';
import Header from '@/components/site/header';
import { SolidProgressBar } from '@/components/ui/solid-progress-bar';

export { metadata };
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${cooper.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before anything paints — keep it first in <head>. */}
        <ThemeInitScript />
        <MetaTags />
        <CriticalCSS />
        <ResourcePreloader />
        <StructuredData />
      </head>
      <body
        className={`${geistMono.variable} antialiased min-h-screen bg-background text-foreground selection:bg-primary/25`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeContextProvider>
            <ThemeCustomizerProvider>
              <PackageManagerProvider>
                <McpClientProvider>
                  <SolidProgressBar />

                  <Header />
                  {children}
                  <ThemeControl />
                  <PerformanceMonitor />
                  <WebVitals />
                </McpClientProvider>
              </PackageManagerProvider>
            </ThemeCustomizerProvider>
          </ThemeContextProvider>
        </ThemeProvider>

        {/* Load analytics after initial render */}
        <GoogleAnalytics />
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
