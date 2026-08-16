"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, PanInfo } from "framer-motion";

export interface CurvedCarouselCard {
  id: string;
  title: string;
  code: string;
  image: string;
}

export interface CurvedCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  autoPlay?: boolean;
  speed?: number;
  className?: string;
}

const CAROUSEL_ITEMS: CurvedCarouselCard[] = [
  {
    id: "card-1",
    title: "Misty Pine Forest",
    code: "001",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-2",
    title: "Alpine Mountain Reflection",
    code: "002",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-3",
    title: "Glacier Lake Wilderness",
    code: "003",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-4",
    title: "Autumn Woodland River",
    code: "004",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-5",
    title: "Golden Hour Valley",
    code: "005",
    image: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-6",
    title: "Mountain Ridge Sunset",
    code: "006",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-7",
    title: "Cascading Forest Waterfall",
    code: "007",
    image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-8",
    title: "Deep Wilderness Forest",
    code: "008",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-9",
    title: "Emerald Mountain Meadow",
    code: "009",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-10",
    title: "Serene Desert Canyon",
    code: "010",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-11",
    title: "Sunlit Pine Woods",
    code: "011",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-12",
    title: "Mystic Fog Peak",
    code: "012",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-13",
    title: "Aurora Wilderness Night",
    code: "013",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-14",
    title: "Wild Canyon River",
    code: "014",
    image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-15",
    title: "Snowy Alpine Ridge",
    code: "015",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-16",
    title: "Tranquil Forest Lake",
    code: "016",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-17",
    title: "Bamboo Grove Walkway",
    code: "017",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-18",
    title: "Serengeti Plains Nature",
    code: "018",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-23",
    title: "Crater Lake Azure",
    code: "023",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "card-24",
    title: "Highland Pine Crest",
    code: "024",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80",
  },
];

export function CurvedCarousel({
  autoPlay = true,
  speed = 1,
  className,
  ...props
}: CurvedCarouselProps) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);
  const sweepDirection = useRef<1 | -1>(1);

  const total = CAROUSEL_ITEMS.length;

  useEffect(() => {
    // Track screen width dynamically for fluid scaling:
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Oscillates the giant wheel ring back and forth smoothly between -10° and +10°
    const timer = setInterval(() => {
      setRotationAngle((prev) => {
        if (prev >= 10) {
          sweepDirection.current = -1;
          return prev - 0.08;
        }
        if (prev <= -10) {
          sweepDirection.current = 1;
          return prev + 0.08;
        }
        return prev + 0.08 * sweepDirection.current;
      });
    }, 20);
    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Fluid responsive parameters according to screen size:
  // Mobile (<640px), Tablet (640px-1024px), Desktop (>1024px)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const baseRadius = isMobile ? 520 : isTablet ? 720 : 960;
  const baseCenterOffset = isMobile ? 480 : isTablet ? 660 : 880;

  return (
    <div
      className={cn(
        "relative w-full h-[440px] sm:h-[560px] md:h-[660px] rounded-[24px] sm:rounded-[32px] overflow-hidden select-none bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800",
        "flex flex-col items-center justify-center p-0 m-0",
        className
      )}
      {...props}
    >
      {/* FLUID RESPONSIVE 360-DEGREE GIANT WHEEL RING */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {CAROUSEL_ITEMS.map((item, index) => {
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
                borderColor: "var(--primary)",
                zIndex: zIndex,
              }}
              className={cn(
                "absolute w-[150px] sm:w-[210px] md:w-[280px] h-[210px] sm:h-[300px] md:h-[410px] rounded-xl sm:rounded-2xl overflow-hidden cursor-default shadow-none transition-none",
                "bg-zinc-900 border-[2px] sm:border-[3px] border-primary"
              )}
            >
              {/* Pure Image Only */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* SLEEK MINIMAL TYPOGRAPHY LABEL */}
      <div className="absolute bottom-8 sm:bottom-12 z-40 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="w-8 h-[1.5px] bg-primary/60" />
          <span className="text-zinc-900 dark:text-white font-mono text-xs sm:text-sm tracking-[0.25em] uppercase font-bold">
            Curved Carousel
          </span>
          <span className="w-8 h-[1.5px] bg-primary/60" />
        </div>
      </div>
    </div>
  );
}

