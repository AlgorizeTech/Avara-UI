"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { ProductCard } from "@/components/custom/blocks/ProductCardBlock";
import { Bell, CreditCard, Download, Settings, Upload } from "lucide-react";

export default function CardDemo({
  variant = "bordered",
  interactive = false,
  layout = "standard",
}: {
  variant?: "bordered" | "default" | "flat";
  interactive?: boolean;
  layout?: "standard" | "grid" | "stats" | "ecommerce";
}) {
  const [sneakerBg, setSneakerBg] = useState(
    "bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30"
  );
  const [watchBg, setWatchBg] = useState(
    "bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-zinc-900 border-indigo-500/30"
  );

  return (
    <div className="w-full flex items-center justify-center min-h-[400px] p-4 relative z-10 overflow-hidden">
      {layout === "standard" && (
        <Card variant={variant} interactive={interactive} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Bell className="w-5 h-5 text-indigo-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">System Update</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  A new version is available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Settings className="w-5 h-5 text-rose-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Account Notice</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Please verify your email address.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              Mark all as read
            </button>
          </CardFooter>
        </Card>
      )}

      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-500" /> Download Report
              </CardTitle>
              <CardDescription>
                Export your analytics data as a CSV file for external processing.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" /> Import Data
              </CardTitle>
              <CardDescription>
                Upload legacy customer profiles to merge into your active CRM.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {layout === "stats" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Subscriptions
              </CardTitle>
              <Bell className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Active Now
              </CardTitle>
              <Settings className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-zinc-500 font-medium mt-1">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {layout === "ecommerce" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl my-4">
          {/* Product Card 1: Headphones (Full Width Soft Light Gradient Background) */}
          <ProductCard
            title="Wireless Noise-Cancelling Headphones"
            subtitle="AudioTech Pro"
            description="Pure bass acoustics, 40h battery life & dual microphone noise suppression."
            price="$249.00"
            originalPrice="$299.00"
            rating={4.9}
            reviewsCount={128}
            badge="Best Seller"
            badgeVariant="emerald"
            image={
              <div className="w-full h-full bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 flex items-center justify-center">
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">🎧</span>
              </div>
            }
            onAddToCart={() => {}}
            onFavoriteToggle={(liked) => console.log("Liked Headphones:", liked)}
            interactive={interactive}
          />

          {/* Product Card 2: Sneakers with Soft Light Tint Color Swatches */}
          <ProductCard
            title="Urban Runner Sneakers X"
            subtitle="Footwear Co"
            description="Ultra-lightweight mesh knit with responsive cushion soles for daily runs."
            price="$89.00"
            originalPrice="$129.00"
            badge="-30% OFF"
            badgeVariant="rose"
            image={
              <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${sneakerBg}`}>
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">👟</span>
              </div>
            }
            colors={[
              {
                name: "Amber",
                value:
                  "bg-amber-600 border-amber-500|bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30",
              },
              {
                name: "Rose",
                value:
                  "bg-rose-600 border-rose-500|bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 dark:from-rose-500/20 dark:to-zinc-900 border-rose-500/30",
              },
              {
                name: "Emerald",
                value:
                  "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 border-emerald-500/30",
              },
              {
                name: "Dark",
                value:
                  "bg-zinc-900 border-zinc-700|bg-gradient-to-br from-zinc-500/15 via-zinc-400/10 to-zinc-500/5 dark:from-zinc-800/30 dark:to-zinc-900 border-zinc-500/30",
              },
            ]}
            onColorChange={(col) => setSneakerBg(col.value.split("|")[1])}
            onQuickView={() => {}}
            onFavoriteToggle={(liked) => console.log("Liked Sneakers:", liked)}
            interactive={interactive}
          />

          {/* Product Card 3: Smartwatch Tech Gadget with Soft Light Tint Color Swatches */}
          <ProductCard
            title="Smart Watch Ultra Series"
            subtitle="Tech Wearables"
            description="24/7 heart rate monitor, sleep tracking, and 50m water resistance."
            price="$199.00"
            badge="New Arrival"
            badgeVariant="indigo"
            inStock={true}
            image={
              <div className={`w-full h-full flex items-center justify-center transition-all duration-300 ${watchBg}`}>
                <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">⌚</span>
              </div>
            }
            colors={[
              {
                name: "Indigo",
                value:
                  "bg-indigo-600 border-indigo-500|bg-gradient-to-br from-indigo-500/15 via-purple-500/10 to-indigo-500/5 dark:from-indigo-500/20 dark:to-zinc-900 border-indigo-500/30",
              },
              {
                name: "Emerald",
                value:
                  "bg-emerald-600 border-emerald-500|bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/5 dark:from-emerald-500/20 dark:to-zinc-900 border-emerald-500/30",
              },
              {
                name: "Rose",
                value:
                  "bg-rose-600 border-rose-500|bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-rose-500/5 dark:from-rose-500/20 dark:to-zinc-900 border-rose-500/30",
              },
              {
                name: "Amber",
                value:
                  "bg-amber-600 border-amber-500|bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-amber-500/5 dark:from-amber-500/20 dark:to-zinc-900 border-amber-500/30",
              },
            ]}
            onColorChange={(col) => setWatchBg(col.value.split("|")[1])}
            onBuyNow={() => {}}
            interactive={interactive}
          />

          {/* Product Card 4: Compact Horizontal Deal Card */}
          <div className="sm:col-span-2 lg:col-span-3">
            <ProductCard
              variant="horizontal"
              title="Ergonomic Wireless Optical Mouse"
              description="Dual Bluetooth & 2.4GHz wireless connection with silent tactile clicks."
              price="$49.00"
              originalPrice="$69.00"
              badge="Flash Deal"
              badgeVariant="rose"
              rating={4.9}
              image={
                <div className="w-full h-full bg-gradient-to-br from-rose-500/15 via-pink-500/10 to-transparent flex items-center justify-center">
                  <span className="text-4xl drop-shadow-md">🖱️</span>
                </div>
              }
              onAddToCart={() => {}}
              interactive={interactive}
            />
          </div>
        </div>
      )}
    </div>
  );
}
