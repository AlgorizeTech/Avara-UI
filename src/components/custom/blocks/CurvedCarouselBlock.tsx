"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
export interface CurvedCarouselCard {
  id: string;
  title: string;
  code: string;
  image: string;
}

export type CurvedCarouselVariant = "arc-sweep" | "infinite-marquee";

export interface CurvedCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CurvedCarouselVariant;
  autoPlay?: boolean;
  speed?: number;
  color?: string;
  items?: CurvedCarouselCard[];
  className?: string;
}

const CAROUSEL_ITEMS: CurvedCarouselCard[] = [
  {
    id: "card-1",
    title: "Misty Pine Forest",
    code: "001",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
  {
    id: "card-2",
    title: "Alpine Mountain Reflection",
    code: "002",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
  },
  {
    id: "card-3",
    title: "Glacier Lake Wilderness",
    code: "003",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "card-4",
    title: "Autumn Woodland River",
    code: "004",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  },
  {
    id: "card-5",
    title: "Golden Hour Valley",
    code: "005",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1507272931001-fc06c17e4f43-1790150482276.jpg",
  },
  {
    id: "card-6",
    title: "Mountain Ridge Sunset",
    code: "006",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  },
  {
    id: "card-7",
    title: "Cascading Forest Waterfall",
    code: "007",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  },
  {
    id: "card-8",
    title: "Deep Wilderness Forest",
    code: "008",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  },
  {
    id: "card-9",
    title: "Emerald Mountain Meadow",
    code: "009",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  },
  {
    id: "card-10",
    title: "Serene Desert Canyon",
    code: "010",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1509316975850-ff9c5deb0cd9-1790146212209.jpg",
  },
  {
    id: "card-11",
    title: "Sunlit Pine Woods",
    code: "011",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg",
  },
  {
    id: "card-12",
    title: "Mystic Fog Peak",
    code: "012",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1519681393784-d120267933ba-1790146212210.jpg",
  },
  {
    id: "card-13",
    title: "Aurora Wilderness Night",
    code: "013",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150482/photo-1531366936337-7c912a4589a7-1790150482280.jpg",
  },
  {
    id: "card-14",
    title: "Wild Canyon River",
    code: "014",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1474044159687-1ee9f3a51722-1790150482274.jpg",
  },
  {
    id: "card-15",
    title: "Snowy Alpine Ridge",
    code: "015",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150482/photo-1530122037265-a5f1f91d3b99-1790150482279.jpg",
  },
  {
    id: "card-16",
    title: "Tranquil Forest Lake",
    code: "016",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  },
  {
    id: "card-17",
    title: "Bamboo Grove Walkway",
    code: "017",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150480/photo-1493976040374-85c8e12f0c0e-1790150482275.jpg",
  },
  {
    id: "card-18",
    title: "Serengeti Plains Nature",
    code: "018",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790150481/photo-1516426122078-c23e76319801-1790150482277.jpg",
  },
  {
    id: "card-19",
    title: "Fjords Ocean Horizon",
    code: "019",
    image: "https://images.unsplash.com/photo-1476514525535-ce74f4526d6b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-20",
    title: "Tropical Island Coast",
    code: "020",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg",
  },
  {
    id: "card-21",
    title: "Sunburst Cypress River",
    code: "021",
    image: "https://images.unsplash.com/photo-1511497584788-8767611136f6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-22",
    title: "Lush Mountain Slope",
    code: "022",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1473448912268-2022ce9509d8-1790148865110.jpg",
  },
  {
    id: "card-23",
    title: "Crater Lake Azure",
    code: "023",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  },
  {
    id: "card-24",
    title: "Highland Pine Crest",
    code: "024",
    image: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
  },
];

export function CurvedCarousel({
  variant = "arc-sweep",
  autoPlay = true,
  speed = 1,
  color = "primary",
  items,
  className,
  ...props
}: CurvedCarouselProps) {
  const carouselItems = items || CAROUSEL_ITEMS;
  const [rotationAngle, setRotationAngle] = useState(0);
  const [marqueeAngle, setMarqueeAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const sweepDirection = useRef<1 | -1>(1);

  let arcItems = carouselItems;
  if (carouselItems.length > 0 && carouselItems.length < 24) {
    const repeatCount = Math.ceil(24 / carouselItems.length);
    const duplicated: CurvedCarouselCard[] = [];
    for (let i = 0; i < repeatCount; i++) {
      carouselItems.forEach((item, idx) => {
        duplicated.push({
          ...item,
          id: `${item.id}-dup-${i}-${idx}`,
        });
      });
    }
    arcItems = duplicated.slice(0, 24);
  }

  const total = arcItems.length;

  useEffect(() => {
    // Track screen width dynamically for fluid scaling:
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Oscillates the giant wheel ring back and forth smoothly between -10° and +10° for arc-sweep
    const step = 0.08 * speed;
    const timer = autoPlay
      ? setInterval(() => {
          setRotationAngle((prev) => {
            if (prev >= 10) {
              sweepDirection.current = -1;
              return prev - step;
            }
            if (prev <= -10) {
              sweepDirection.current = 1;
              return prev + step;
            }
            return prev + step * sweepDirection.current;
          });

          // All-time continuous right-to-left marquee motion (decreases angle perpetually)
          setMarqueeAngle((prev) => (prev - 0.12 * speed) % 360);
        }, 20)
      : null;

    return () => {
      if (timer !== null) clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [autoPlay, speed]);

  // Fluid responsive parameters according to screen size:
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const baseRadius = isMobile ? 520 : isTablet ? 720 : 960;
  const baseCenterOffset = isMobile ? 480 : isTablet ? 660 : 880;

  // Custom styling for color support
  const activeColorStyle = React.useMemo(() => {
    if (!color || color === "primary") return { borderColor: "var(--primary)" };
    if (color === "indigo") return { borderColor: "#6366f1" };
    if (color === "rose") return { borderColor: "#f43f5e" };
    if (color === "emerald") return { borderColor: "#10b981" };
    if (color === "zinc") return { borderColor: "#71717a" };
    return { borderColor: color };
  }, [color]);

  if (variant === "infinite-marquee") {
    // 100% Constant Linear Speed Marquee Track with Strict 12px Card Spacing
    const cardWidth = isMobile ? 140 : isTablet ? 195 : 245;
    const gap = 12;
    const itemTotalWidth = cardWidth + gap;

    // Auto-duplicate items if the total width is too small to cover the viewport seamlessly
    let displayItems = carouselItems;
    if (carouselItems.length > 0) {
      const minTrackWidth = Math.max(windowWidth * 2.5, 2000);
      const singleSetWidth = carouselItems.length * itemTotalWidth;
      if (singleSetWidth < minTrackWidth) {
        const repeatCount = Math.ceil(minTrackWidth / singleSetWidth);
        const duplicated: CurvedCarouselCard[] = [];
        for (let i = 0; i < repeatCount; i++) {
          carouselItems.forEach((item, idx) => {
            duplicated.push({
              ...item,
              id: `${item.id}-dup-${i}-${idx}`,
            });
          });
        }
        displayItems = duplicated;
      }
    }

    const totalTrackWidth = displayItems.length * itemTotalWidth;

    // Linear continuous pixel offset for constant linear speed across entire track
    const currentOffset = (marqueeAngle * 10) % totalTrackWidth;

    return (
      <div
        className={cn(
          "relative w-full h-[400px] sm:h-[480px] md:h-[560px] rounded-[24px] sm:rounded-[32px] overflow-hidden select-none bg-background border border-border",
          "flex items-center justify-center p-0 m-0 isolation-auto",
          className
        )}
        {...props}
      >
        {/* Soft edge fade vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-r from-background via-background/90 to-transparent z-40 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 sm:w-48 bg-gradient-to-l from-background via-background/90 to-transparent z-40 pointer-events-none" />

        {/* Constant Linear Speed 3D Concave Track */}
        <div
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={{ perspective: "1100px" }}
        >
          {displayItems.map((item, index) => {
            let posX = index * itemTotalWidth + currentOffset;

            // Seamless infinite wrap around total track width
            while (posX > totalTrackWidth / 2) posX -= totalTrackWidth;
            while (posX < -totalTrackWidth / 2) posX += totalTrackWidth;

            // Visible range filter
            const maxVisibleRange = windowWidth / 2 + cardWidth;
            if (Math.abs(posX) > maxVisibleRange) return null;

            // Ultra Smooth Subtle Linear Side Height Scaling (No 30-40px big jumps):
            const normRatio = posX / (windowWidth * 0.5);
            const translateZ = (1 - Math.cos(normRatio * (Math.PI / 3))) * 180;
            const rotateY = -normRatio * 18;
            
            // Ultra subtle linear growth (~8-12px gradual total height transition)
            const scaleY = 1 + Math.abs(normRatio) * 0.12;

            return (
              <div
                key={`${item.id}-${index}`}
                style={{
                  transform: `translate3d(${posX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scaleY(${scaleY})`,
                  transformOrigin: "center center",
                  width: `${cardWidth}px`,
                  zIndex: Math.round(1000 - Math.abs(posX)),
                  ...activeColorStyle,
                }}
                className={cn(
                  "absolute h-[200px] sm:h-[280px] md:h-[350px] rounded-2xl overflow-hidden cursor-default shadow-xl pointer-events-none border border-black/80 dark:border-white/80",
                  "bg-zinc-900"
                )}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>

        {/* Sleek Label */}
        <div className="absolute bottom-6 sm:bottom-8 z-40 flex flex-col items-center pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[1.5px] bg-foreground/30" />
            <span className="text-foreground font-mono text-xs tracking-[0.25em] uppercase font-semibold">
              Continuous Curved Marquee
            </span>
            <span className="w-8 h-[1.5px] bg-foreground/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative w-full h-[440px] sm:h-[560px] md:h-[660px] rounded-[24px] sm:rounded-[32px] overflow-hidden select-none bg-background border border-border",
        "flex flex-col items-center justify-center p-0 m-0",
        className
      )}
      {...props}
    >
      {/* FLUID RESPONSIVE 360-DEGREE GIANT WHEEL RING */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {arcItems.map((item, index) => {
          // 15-degree step angle (360 / 24 = 15 deg)
          const spokeAngle = index * (360 / total);
          const currentAngle = spokeAngle + rotationAngle;

          const rad = (currentAngle * Math.PI) / 180;

          const translateX = Math.sin(rad) * baseRadius;
          const translateY = Math.cos(rad) * baseRadius + baseCenterOffset;
          const rotateZ = -currentAngle;

          // Inverted z-index stacking order so cards overlap in exact reverse order:
          const zIndex = (total - index) * 2;

          return (
            <div
              key={item.id}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0px) rotate(${rotateZ}deg)`,
                transformOrigin: "50% 50%",
                zIndex: zIndex,
                ...activeColorStyle,
              }}
              className={cn(
                "absolute w-[150px] sm:w-[210px] md:w-[280px] h-[210px] sm:h-[300px] md:h-[410px] rounded-xl sm:rounded-2xl overflow-hidden cursor-default shadow-none transition-none",
                "bg-zinc-900 border border-black/80 dark:border-white/80"
              )}
            >
              {/* Pure Image Only */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover rotate-180"
              />
            </div>
          );
        })}
      </div>

      {/* SLEEK MINIMAL TYPOGRAPHY LABEL */}
      <div className="absolute bottom-8 sm:bottom-12 z-40 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1.5px] bg-foreground/30" />
          <span className="text-foreground font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">
            Curved Carousel
          </span>
          <span className="w-8 h-[1.5px] bg-foreground/30" />
        </div>
      </div>
    </div>
  );
}

