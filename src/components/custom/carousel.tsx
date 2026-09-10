"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

/**
 * An image source.
 *
 * A plain URL string in any React app. Next.js users importing a static asset
 * get a `StaticImageData` object instead, which `next/image` accepts — hence the
 * structural second branch rather than a `next/image` type import, which would
 * make this file Next-only.
 */
type StaticImageLike = { src: string; height?: number; width?: number; blurDataURL?: string };
type ImgSrc = string | StaticImageLike;

type ImageCarouselProps = {
  images?: ImgSrc[];
  rootClassName?: string;
  slideClassName?: string;
  arrowClassName?: string;
  dotClassName?: string;
  activeDotClassName?: string;
  prevIcon?: React.ReactNode;
  nextIcon?: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  transitionDuration?: number;
  transitionEasing?: string;
  imageWidth?: number;
  imageHeight?: number;
  showArrows?: boolean;
  showDots?: boolean;
  /**
   * The element used for images. Defaults to a plain `img`, so this component
   * works in any React app with no adaptation. In Next.js, pass `next/image`
   * to keep automatic optimisation: `imageComponent={Image}`.
   */
  imageComponent?: React.ElementType;
};

export function ImageCarousel({
  images = [],
  rootClassName = "relative h-60 w-full min-w-80 overflow-hidden rounded-lg md:h-[470px] md:rounded-xl lg:h-[540px]",
  slideClassName = "h-60 min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px]",
  arrowClassName = "absolute top-1/2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 hover:bg-card dark:bg-zinc-900/80 shadow-md md:h-9 md:w-9 transition-all cursor-pointer",
  dotClassName = "rounded-full bg-white duration-500 h-2",
  activeDotClassName = "w-8",
  prevIcon,
  nextIcon,
  autoPlay = false,
  autoPlayInterval = 3000,
  transitionDuration = 500,
  transitionEasing = "ease-linear",
  imageWidth = 1200,
  imageHeight = 540,
  showArrows = true,
  showDots = true,
  imageComponent: Image = "img",
}: ImageCarouselProps) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  const defaultPrevIcon = (
    <ArrowLeft className="h-4 w-4 text-foreground md:h-5 md:w-5" />
  );

  const defaultNextIcon = (
    <ArrowRight className="h-4 w-4 text-foreground md:h-5 md:w-5" />
  );

  const prevSlider = () =>
    setCurrentSlider((s) => (s === 0 ? images.length - 1 : s - 1));

  const nextSlider = useCallback(() => {
    setCurrentSlider((s) => (s === images.length - 1 ? 0 : s + 1));
  }, [images.length]);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, images.length]);

  if (!images.length) return null;

  return (
    <div className={rootClassName}>
      {showArrows && (
        <button onClick={prevSlider} className={`left-3 ${arrowClassName}`}>
          {prevIcon ?? defaultPrevIcon}
        </button>
      )}
      {showArrows && (
        <button onClick={nextSlider} className={`right-3 ${arrowClassName}`}>
          {nextIcon ?? defaultNextIcon}
        </button>
      )}
      {showDots && (
        <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlider(idx)}
              className={`${dotClassName} ${currentSlider === idx ? activeDotClassName : "w-2"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
      <div
        className="relative flex transform-gpu"
        style={{
          transform: `translateX(-${currentSlider * 100}%)`,
          transitionDuration: `${transitionDuration}ms`,
          transitionTimingFunction: transitionEasing,
        }}
      >
        {images.map((img, idx) => (
          <div key={`${String(img)}_${idx}`} className="min-w-full">
            <Image
              width={imageWidth}
              height={imageHeight}
              src={img}
              className={slideClassName}
              alt={`Slider - ${idx + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export type HeroSlide = {
  img: ImgSrc;
  title?: string;
  des?: string;
};

export type HeroCarouselProps = {
  slides?: HeroSlide[];
  className?: string;
  rootClassName?: string;
  textContainerClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  arrowContainerClassName?: string;
  arrowClassName?: string;
  slideContainerClassName?: string;
  slideClassName?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  transitionDuration?: number;
  transitionEasing?: string;
  slideTransform?: number;
  imageWidth?: number;
  imageHeight?: number;
  /**
   * The element used for images. Defaults to a plain `img`, so this component
   * works in any React app with no adaptation. In Next.js, pass `next/image`
   * to keep automatic optimisation: `imageComponent={Image}`.
   */
  imageComponent?: React.ElementType;
};

export function HeroCarousel({
  slides = [],
  rootClassName = "relative z-50 flex h-60 max-lg:h-[360px] w-full transform flex-col items-center justify-center gap-5 overflow-hidden rounded-lg bg-cover duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50 sm:h-96 md:h-[540px] md:rounded-xl lg:gap-10 xl:flex-row",
  textContainerClassName = "absolute max-lg:top-12 max-lg:pl-[15px] left-0 w-full lg:w-1/2 rounded-lg px-4 text-white drop-shadow-lg z-40",
  titleClassName = "mb-3 text-xl font-bold sm:text-2xl lg:text-3xl",
  descriptionClassName = "text-xs sm:text-sm md:text-base lg:text-lg max-lg:line-clamp-2",
  arrowContainerClassName: _arrowContainerClassName = "absolute bottom-1/4 max-lg:translate-y-0 max-lg:left-14 z-50 flex gap-3 px-0 lg:px-5",
  arrowClassName: _arrowClassName = "flex h-8 w-8 items-center justify-center rounded-full bg-white/25 hover:bg-white/40 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md md:h-10 md:w-10 transition-all cursor-pointer",
  slideContainerClassName = "absolute -right-5 max-lg:translate-y-[80px] z-50 ml-auto w-1/2 overflow-hidden px-4 py-10 lg:-right-16",
  slideClassName = "h-[180px] min-w-[90px] sm:h-[200px] lg:h-[320px] lg:min-w-[184px] z-50 rounded-lg duration-300",
  autoPlay = false,
  autoPlayInterval = 3000,
  transitionDuration = 1000,
  transitionEasing = "ease-linear",
  slideTransform: _slideTransform = 200,
  imageWidth = 1200,
  imageHeight = 540,
  imageComponent: Image = "img",
}: HeroCarouselProps) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const [animatingKey, setAnimatingKey] = useState<number>(0);

  const nextSlider = useCallback(() => {
    setCurrentSlider((s) => s + 1);
    setAnimatingKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, slides.length, currentSlider]);

  const [slideWidth, setSlideWidth] = useState<number>(200);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Measures the first preview card so the track can be translated by an exact
  // pixel amount. Kept above the `slides.length` guard: hooks must run in the
  // same order on every render, including the one where `slides` is empty.
  useEffect(() => {
    const measure = () => {
      if (cardRef.current) {
        // 16px is the gap-4 distance between cards
        setSlideWidth(cardRef.current.offsetWidth + 16);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  if (!slides.length) return null;

  // Modulo math that supports negative numbers correctly
  const positiveModulo = (n: number, m: number) => ((n % m) + m) % m;

  const activeIndex = positiveModulo(currentSlider, slides.length);
  const currentSlide = slides[activeIndex];

  // Center offset base so negative indexing shifts track seamlessly in both directions
  const baseOffsetIndex = 100 * slides.length;
  // Exact offset so the 1st preview card aligns at the left edge of container (showing 2 full cards + 3rd cut off on right)
  const virtualSliderIndex = baseOffsetIndex + currentSlider;

  // Large infinite repeated slides array centered around base offset
  const infiniteSlides = Array.from({ length: 200 }, () => slides).flat();

  return (
    <div
      className={rootClassName}
      style={{
        backgroundImage: `url(${String(currentSlide.img)})`,
        transitionDuration: `${transitionDuration}ms`,
        transitionTimingFunction: transitionEasing,
      }}
    >
      <div className={textContainerClassName}>
        <div key={animatingKey} className="animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-forwards">
          <h1 className={titleClassName}>{currentSlide.title}</h1>
          <p className={descriptionClassName}>{currentSlide.des}</p>
        </div>
      </div>
      <div className={slideContainerClassName}>
        <div
          className="flex items-center gap-4 duration-500 ease-in-out transition-transform"
          style={{
            transform: `translateX(-${virtualSliderIndex * slideWidth}px)`,
          }}
        >
          {infiniteSlides.map((slide, inx) => {
            const slideIndex = positiveModulo(inx, slides.length);
            return (
              <div
                key={inx}
                ref={inx === 0 ? cardRef : undefined}
                onClick={() => {
                  setCurrentSlider(inx - baseOffsetIndex);
                  setAnimatingKey((k) => k + 1);
                }}
                className={`${slideClassName} cursor-pointer transition-transform hover:scale-105 ${
                  slideIndex === activeIndex ? "ring-2 ring-white/80 shadow-lg scale-102" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  width={imageWidth}
                  height={imageHeight}
                  src={slide.img}
                  alt={slide.title ?? `slide-${inx}`}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type CustomItem = {
  img: ImgSrc;
  title?: string;
  des?: string;
};

export type CustomCarouselProps = {
  items?: CustomItem[];
  className?: string;
  rootClassName?: string;
  textClassName?: string;
  titleClassName?: string;
  descClassName?: string;
  thumbClassName?: string;
  activeThumbClassName?: string;
  autoPlay?: boolean;
  interval?: number;
  imageButtonPosition?: "bottom" | "left" | "right";
  /**
   * The element used for images. Defaults to a plain `img`, so this component
   * works in any React app with no adaptation. In Next.js, pass `next/image`
   * to keep automatic optimisation: `imageComponent={Image}`.
   */
  imageComponent?: React.ElementType;
};

export function CustomCarousel({
  items = [],
  rootClassName = "flex h-60 w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-lg bg-cover bg-center sm:h-96 md:h-[540px] md:rounded-xl lg:gap-10",
  textClassName = "px-5 text-center text-white drop-shadow-lg duration-300 ease-linear",
  titleClassName = "mb-3 text-xl font-semibold lg:text-3xl",
  descClassName = "text-sm md:text-base lg:text-lg",
  thumbClassName = "h-6 w-10 shrink-0 overflow-hidden bg-black/20 sm:h-8 md:h-12 md:w-20 cursor-pointer rounded-md md:rounded-lg",
  activeThumbClassName = "outline-2 outline-offset-2 outline-black",
  autoPlay = true,
  interval = 5000,
  imageButtonPosition = "bottom",
  imageComponent: Image = "img",
}: CustomCarouselProps) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = setInterval(() => {
      setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, items.length]);

  if (!items.length) return null;

  const CarouselContent = (
    <div
      className={`${rootClassName} relative min-w-0 duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50`}
      style={{ backgroundImage: `url(${String(items[current].img)})` }}
    >
      <div className={textClassName}>
        <h1 className={titleClassName}>{items[current].title}</h1>
        <p className={descClassName}>{items[current].des}</p>
      </div>
    </div>
  );

  const Thumbnails = (
    <div
      className={`${imageButtonPosition === "bottom" ? "w-full flex-row flex-wrap justify-center" : "shrink-0 flex-col justify-center"} flex items-center gap-3 p-2`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => setCurrent(index)}
          className={`${thumbClassName} ${current === index ? activeThumbClassName : ""}`}
          aria-label={`Select slide ${index + 1}`}
        >
          <Image
            src={item.img}
            width={1200}
            height={540}
            className="h-full w-full object-cover"
            alt={item.title ?? `thumb-${index}`}
          />
        </button>
      ))}
    </div>
  );

  if (imageButtonPosition === "left")
    return (
      <div className="flex w-full items-center">
        {Thumbnails}
        {CarouselContent}
      </div>
    );
  if (imageButtonPosition === "right")
    return (
      <div className="flex w-full items-center">
        {CarouselContent}
        {Thumbnails}
      </div>
    );
  return (
    <div className="w-full">
      {CarouselContent}
      {Thumbnails}
    </div>
  );
}

export type FanCarouselItem = {
  img: ImgSrc;
  title: string;
  price?: string;
  rating?: number | string;
  category?: string;
  des?: string;
};

export type RadialCarouselItem = FanCarouselItem;

export type FanCarouselProps = {
  items?: FanCarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  stepAngle?: number;
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
  /**
   * The element used for images. Defaults to a plain `img`, so this component
   * works in any React app with no adaptation. In Next.js, pass `next/image`
   * to keep automatic optimisation: `imageComponent={Image}`.
   */
  imageComponent?: React.ElementType;
};

export type RadialCarouselProps = FanCarouselProps;

const defaultRadialItems: FanCarouselItem[] = [
  {
    title: "Misty Pine Forest",
    category: "Nature",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Lush River Valley",
    category: "Wilderness",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Autumn Woodland Path",
    category: "Landscape",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Cascading Waterfalls",
    category: "Sanctuary",
    rating: "4.7",
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Emerald Mountain Peak",
    category: "Expedition",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Serene Alpine Lake",
    category: "Reflections",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Sunset Coastal Shore",
    category: "Ocean",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Northern Wilderness",
    category: "Aurora",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Golden Desert Dunes",
    category: "Landscape",
    rating: "4.6",
    img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Grand Canyon River",
    category: "Sanctuary",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Alpine Cloud Ridge",
    category: "Expedition",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Tropical Lagoon Bay",
    category: "Paradise",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Mist Forest Ridge",
    category: "Wilderness",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Glacial Ice Valley",
    category: "Arctic",
    rating: "5.0",
    img: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Sunlit Birch Grove",
    category: "Forest",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Starlight Mountain Peak",
    category: "Cosmos",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Volcanic Obsidian Coast",
    category: "Geothermal",
    rating: "4.7",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Deep Canyon Oasis",
    category: "Sanctuary",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop",
  },
];

export function RadialCarousel({
  items = defaultRadialItems,
  autoPlay = false,
  autoPlayInterval = 3500,
  stepAngle,
  showArrows = false,
  showDots = false,
  className = "",
  imageComponent: Image = "img",
}: RadialCarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const displayItems = React.useMemo(() => {
    if (!items || !items.length) return [];
    if (items.length >= 10) return items;
    const repeats = Math.ceil(12 / items.length);
    return Array.from({ length: repeats }, () => items).flat();
  }, [items]);

  const total = displayItems.length;
  const angleStep = stepAngle ?? (total > 0 ? 360 / total : 20);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!autoPlay || total <= 1 || isDragging) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, total, current, isDragging]);

  if (!total) return null;

  const dragAngle = dragOffset / 7; // Sensitivity factor: 7px = 1 degree

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, isCardCenter: boolean) => {
    if (!isCardCenter) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const stepShift = Math.round(dragAngle / angleStep);
    if (stepShift !== 0) {
      setCurrent((prev) => prev - stepShift);
    }
    setDragOffset(0);
  };

  const positiveModulo = (n: number, m: number) => ((n % m) + m) % m;

  const wheelRotation = -current * angleStep + dragAngle;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      className={`relative w-full max-w-full overflow-hidden py-4 flex flex-col items-center justify-center select-none ${className}`}
    >
      <div className="relative w-full max-w-3xl h-[520px] sm:h-[600px] md:h-[680px] flex items-center justify-center">
        {displayItems.map((item, index) => {
          const cardBaseAngle = index * angleStep;
          const totalAngle = cardBaseAngle + wheelRotation;

          let normAngle = positiveModulo(totalAngle, 360);
          if (normAngle > 180) normAngle -= 360;

          const distRatio = Math.abs(normAngle) / 180;
          const isCenter = Math.abs(normAngle) < 1.5;

          const zIndex = Math.round(60 - distRatio * 40);
          const scale = isCenter ? 1.05 : Math.max(0.72, 1 - distRatio * 0.28);
          const translateY = isCenter ? -10 : 0;
          const opacity = isCenter ? 1 : Math.max(0.7, 1 - distRatio * 0.32);
          const brightness = isCenter ? 1 : Math.max(0.55, 1 - distRatio * 0.42);

          return (
            <div
              key={index}
              onMouseDown={(e) => handleMouseDown(e, isCenter)}
              onTouchStart={(e) => handleMouseDown(e, isCenter)}
              onClick={(e) => {
                e.stopPropagation();
                if (!isCenter) return; // Clicks on non-active background cards do NOTHING!
                if (Math.abs(dragOffset) > 5) return;
                nextSlide();
              }}
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 105%",
                transform: `translate(-50%, -100%) rotate(${totalAngle}deg) translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `brightness(${brightness})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`absolute w-[110px] sm:w-[170px] md:w-[220px] h-[150px] sm:h-[230px] md:h-[300px] rounded-[14px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden border-2 border-black/80 dark:border-black shadow-2xl cursor-grab active:cursor-grabbing ${
                isCenter
                  ? "ring-2 ring-black dark:ring-zinc-700 shadow-black/60 brightness-105"
                  : "hover:brightness-95"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3.5 md:p-5 flex flex-col justify-end text-white">
                  <h3 className="text-[11px] sm:text-base md:text-lg font-extrabold tracking-wide uppercase drop-shadow-md line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-0.5 text-[9px] sm:text-xs md:text-sm">
                    {item.price ? (
                      <span className="font-semibold text-zinc-200">{item.price}</span>
                    ) : item.category ? (
                      <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold text-zinc-300 px-1.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm truncate max-w-[60px] sm:max-w-none">
                        {item.category}
                      </span>
                    ) : null}

                    {item.rating && (
                      <div className="flex items-center gap-0.5 bg-black/50 backdrop-blur-md px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold text-amber-400 border border-white/10">
                        <span>★</span>
                        <span className="text-white">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {(showArrows || showDots) && (
        <div className="flex items-center gap-4 mt-2 z-10">
          {showArrows && (
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-full bg-background border border-border text-foreground hover:bg-muted transition-all cursor-pointer shadow-md"
              aria-label="Previous card"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          {showDots && (
            <div className="flex items-center gap-1.5 max-w-[200px] overflow-hidden flex-wrap justify-center">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    const activeIdx = positiveModulo(current, items.length);
                    let diff = idx - activeIdx;
                    if (diff > Math.floor(items.length / 2)) diff -= items.length;
                    if (diff < -Math.floor(items.length / 2)) diff += items.length;
                    setCurrent((c) => c + diff);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    positiveModulo(current, items.length) === idx
                      ? "w-6 bg-primary"
                      : "w-2 bg-zinc-300 dark:bg-zinc-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {showArrows && (
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-full bg-background border border-border text-foreground hover:bg-muted transition-all cursor-pointer shadow-md"
              aria-label="Next card"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}

const defaultFanDeckItems: FanCarouselItem[] = [
  {
    title: "FUTURE UI",
    price: "$145.00",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop",
  },
  {
    title: "NIKE AIR RETRO",
    price: "$199.99",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&fit=crop",
  },
  {
    title: "RAMEN BOWL",
    price: "$18.50",
    rating: "4.7",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&fit=crop",
  },
  {
    title: "SKATEBOARD PRO",
    price: "$129.00",
    rating: "4.6",
    img: "https://images.unsplash.com/photo-1520040245346-76e79acb253d?w=800&fit=crop",
  },
  {
    title: "CYBER CITY",
    price: "$210.00",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&fit=crop",
  },
  {
    title: "NEON SOUNDS",
    price: "$85.00",
    rating: "4.8",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&fit=crop",
  },
  {
    title: "PEAK RETREAT",
    price: "$399.00",
    rating: "4.9",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&fit=crop",
  },
];

export function FanCarousel({
  items = defaultFanDeckItems,
  autoPlay = false,
  autoPlayInterval = 3500,
  stepAngle,
  showArrows = false,
  showDots = false,
  className = "",
  imageComponent: Image = "img",
}: FanCarouselProps) {
  const [current, setCurrent] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const displayItems = React.useMemo(() => {
    if (!items || !items.length) return [];
    if (items.length >= 10) return items;
    const repeats = Math.ceil(12 / items.length);
    return Array.from({ length: repeats }, () => items).flat();
  }, [items]);

  const total = displayItems.length;
  const angleStep = stepAngle ?? (total > 0 ? 360 / total : 20);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => prev - 1);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!autoPlay || total <= 1 || isDragging) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, nextSlide, total, current, isDragging]);

  if (!total) return null;

  const dragAngle = dragOffset / 7; // Sensitivity factor: 7px = 1 degree

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, isCardCenter: boolean) => {
    if (!isCardCenter) return;
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const stepShift = Math.round(dragAngle / angleStep);
    if (stepShift !== 0) {
      setCurrent((prev) => prev - stepShift);
    }
    setDragOffset(0);
  };

  const positiveModulo = (n: number, m: number) => ((n % m) + m) % m;

  const wheelRotation = -current * angleStep + dragAngle;

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      className={`relative w-full max-w-full overflow-hidden py-4 flex flex-col items-center justify-center select-none ${className}`}
    >
      {/* Hand Gesture Hint Badge */}
      <div className="absolute top-2 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-medium text-white/90 border border-white/10 pointer-events-none shadow-lg">
        <Hand className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Drag active card</span>
      </div>

      {/* 360 Degree Fan Wheel Container */}
      <div className="relative w-full max-w-3xl h-[520px] sm:h-[600px] md:h-[680px] flex items-center justify-center">
        {displayItems.map((item, index) => {
          const cardBaseAngle = index * angleStep;
          const totalAngle = cardBaseAngle + wheelRotation;

          let normAngle = positiveModulo(totalAngle, 360);
          if (normAngle > 180) normAngle -= 360;

          const distRatio = Math.abs(normAngle) / 180;
          const isCenter = Math.abs(normAngle) < 1.5;

          const zIndex = Math.round(60 - distRatio * 40);
          const scale = isCenter ? 1.05 : Math.max(0.72, 1 - distRatio * 0.28);
          const translateY = isCenter ? -10 : 0;
          const opacity = isCenter ? 1 : Math.max(0.7, 1 - distRatio * 0.32);
          const brightness = isCenter ? 1 : Math.max(0.55, 1 - distRatio * 0.42);

          return (
            <div
              key={index}
              onMouseDown={(e) => handleMouseDown(e, isCenter)}
              onTouchStart={(e) => handleMouseDown(e, isCenter)}
              onClick={(e) => {
                e.stopPropagation();
                if (!isCenter) return; // Clicks on non-active background cards do NOTHING!
                if (Math.abs(dragOffset) > 5) return;
                nextSlide();
              }}
              style={{
                top: "50%",
                left: "50%",
                transformOrigin: "50% 105%",
                transform: `translate(-50%, -100%) rotate(${totalAngle}deg) translateY(${translateY}px) scale(${scale})`,
                zIndex,
                opacity,
                filter: `brightness(${brightness})`,
                transition: isDragging
                  ? "none"
                  : "transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), filter 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className={`absolute w-[110px] sm:w-[170px] md:w-[220px] h-[150px] sm:h-[230px] md:h-[300px] rounded-[14px] sm:rounded-[20px] md:rounded-[24px] overflow-hidden border-2 border-black/80 dark:border-black shadow-2xl cursor-grab active:cursor-grabbing ${
                isCenter
                  ? "ring-2 ring-black dark:ring-zinc-700 shadow-black/60 brightness-105"
                  : "hover:brightness-95"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover pointer-events-none"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-2 sm:p-3.5 md:p-5 flex flex-col justify-end text-white">
                  <h3 className="text-[11px] sm:text-base md:text-lg font-extrabold tracking-wide uppercase drop-shadow-md line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center justify-between mt-0.5 text-[9px] sm:text-xs md:text-sm">
                    {item.price ? (
                      <span className="font-semibold text-zinc-200">{item.price}</span>
                    ) : item.category ? (
                      <span className="text-[8px] sm:text-[10px] md:text-xs uppercase font-semibold text-zinc-300 px-1.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm truncate max-w-[60px] sm:max-w-none">
                        {item.category}
                      </span>
                    ) : null}

                    {item.rating && (
                      <div className="flex items-center gap-0.5 bg-black/50 backdrop-blur-md px-1 sm:px-1.5 py-0.5 rounded-full text-[9px] sm:text-xs font-bold text-amber-400 border border-white/10">
                        <span>★</span>
                        <span className="text-white">{item.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Center Pivot Hub Pin / Dot Button matching uploaded screenshot */}
        <div
          onClick={nextSlide}
          title="Rotate wheel"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-zinc-950/90 border-2 border-zinc-700 shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
        >
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-zinc-400/90 shadow-inner" />
        </div>
      </div>

      {showArrows && (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="p-2.5 rounded-full bg-zinc-950/90 border border-zinc-700 text-white transition-transform hover:scale-110 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="p-2.5 rounded-full bg-zinc-950/90 border border-zinc-700 text-white transition-transform hover:scale-110 active:scale-95"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {showDots && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          {displayItems.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={positiveModulo(current, total) === index}
              className={cn(
                "h-2 rounded-full transition-all",
                positiveModulo(current, total) === index
                  ? "w-6 bg-zinc-900 dark:bg-zinc-200"
                  : "w-2 bg-zinc-400/60 dark:bg-zinc-600",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   FLUID GLASS SLIDER COMPONENT (GSAP Liquid Distortion Slider)
   ============================================================================ */

export type FluidGlassSlide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const DEFAULT_GLASS_SLIDES: FluidGlassSlide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2574&auto=format&fit=crop",
    title: "Discover pristine tropical beaches and crystal-clear waters",
    subtitle: "TROPICAL PARADISE",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2574&auto=format&fit=crop",
    title: "Escape to the serene mountain heights and wilderness trails",
    subtitle: "MOUNTAIN ADVENTURES",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2574&auto=format&fit=crop",
    title: "Surround yourself with majestic peaks and alpine lakes",
    subtitle: "ALPINE RETREAT",
  },
];

export type FluidGlassSliderProps = {
  slides?: FluidGlassSlide[];
  className?: string;
};

export function FluidGlassSlider({ slides, className }: FluidGlassSliderProps) {
  const slidesData = slides && slides.length > 0 ? slides : DEFAULT_GLASS_SLIDES;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slidesData.length - 1;

  useEffect(() => {
    if (!sliderRef.current) return;

    gsap.to(sliderRef.current, {
      x: `-${currentIndex * (100 / slidesData.length)}%`,
      duration: 1.2,
      ease: "power4.inOut",
    });

    if (!progressRef.current) return;

    const progressTween = gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: () => {
          setCurrentIndex((prev) =>
            prev < slidesData.length - 1 ? prev + 1 : 0,
          );
        },
      },
    );

    return () => {
      if (progressTween && typeof progressTween.kill === "function")
        progressTween.kill();
    };
  }, [currentIndex, slidesData.length]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      if (!cursor) return;
      gsap.to(cursor, {
        x: (e.clientX || 0) + 15,
        y: (e.clientY || 0) + 15,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  const nextSlide = () => {
    if (!isLastSlide) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isFirstSlide) setCurrentIndex((prev) => prev - 1);
  };

  const showCursor = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, scale: 1 });
  };
  const hideCursor = () => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { opacity: 0, duration: 0.2, scale: 0.8 });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={showCursor}
      onMouseLeave={hideCursor}
      className={cn(
        "relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#111] text-white font-sans rounded-2xl shadow-xl",
        className,
      )}
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold tracking-widest uppercase flex items-center justify-center opacity-0 z-[100] pointer-events-none scale-80"
      >
        VIEW
      </div>
      <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-8 pointer-events-none">
        <div className="flex-1 hidden sm:block"></div>
        <div className="flex-1 text-left sm:text-center">
          <h1 className="text-xl md:text-2xl font-medium tracking-wide drop-shadow-md pointer-events-auto cursor-pointer hover:opacity-70 transition">
            Fluid Glass
          </h1>
        </div>
        <div className="flex-1 hidden sm:block"></div>
      </header>
      <main
        ref={sliderRef}
        className="flex h-full"
        style={{ width: `${slidesData.length * 100}%` }}
      >
        {slidesData.map((slide) => (
          <section
            key={slide.id}
            className="relative flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-cover bg-center h-full"
            style={{
              backgroundImage: `url(${slide.image})`,
              width: `${100 / slidesData.length}%`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>

            <div className="relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 md:mb-14 tracking-tight max-w-4xl drop-shadow-xl">
                {slide.title}
              </h2>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-300 drop-shadow-md">
                {slide.subtitle}
              </p>
            </div>
          </section>
        ))}
      </main>
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 pb-6 md:pb-10 px-6 md:px-12 flex items-end">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 sm:gap-0">
          <div className="w-full sm:flex-1 sm:mr-12 h-[2px] bg-gray-600/30 rounded-full overflow-hidden">
            <div ref={progressRef} className="h-full bg-white w-0" />
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-8 pointer-events-auto shrink-0">
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={isFirstSlide}
                onMouseEnter={hideCursor}
                onMouseLeave={showCursor}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${
                  isFirstSlide
                    ? "bg-black/20 border-white/10 opacity-30 cursor-not-allowed"
                    : "bg-black/40 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer"
                }`}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                disabled={isLastSlide}
                onMouseEnter={hideCursor}
                onMouseLeave={showCursor}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all ${
                  isLastSlide
                    ? "bg-black/20 border-white/10 opacity-30 cursor-not-allowed"
                    : "bg-black/40 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer"
                }`}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <div className="text-[11px] md:text-[13px] font-semibold tracking-widest font-mono drop-shadow-md">
              <span>0{currentIndex + 1}</span> / 0{slidesData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   UNIFIED CAROUSEL DEFAULT EXPORT (Support variant prop)
   ============================================================================ */

export type CarouselVariant = "image" | "hero" | "thumbnails" | "radial" | "glass" | "fluid";

/**
 * Discriminated on `variant`, so each one takes exactly the props its
 * carousel takes. The old shape accepted `any[]` for `slides`/`items` plus a
 * catch-all index signature, which meant nothing you passed was checked and
 * a slide array meant for one variant compiled fine against another.
 */
export type CarouselComponentProps =
  | ({ variant?: "image"; className?: string } & Omit<
      ImageCarouselProps,
      "rootClassName"
    >)
  | ({ variant: "hero" } & HeroCarouselProps)
  | ({ variant: "thumbnails" } & CustomCarouselProps)
  | ({ variant: "radial" } & RadialCarouselProps)
  | ({ variant: "glass" | "fluid" } & FluidGlassSliderProps);

export default function Carousel(props: CarouselComponentProps) {
  if (props.variant === "glass" || props.variant === "fluid") {
    const { variant: _variant, ...rest } = props;
    return <FluidGlassSlider {...rest} />;
  }
  if (props.variant === "hero") {
    const { variant: _variant, ...rest } = props;
    return <HeroCarousel {...rest} />;
  }
  if (props.variant === "thumbnails") {
    const { variant: _variant, ...rest } = props;
    return <CustomCarousel {...rest} />;
  }
  if (props.variant === "radial") {
    const { variant: _variant, ...rest } = props;
    return <RadialCarousel {...rest} />;
  }
  const { variant: _variant, className, ...rest } = props;
  return <ImageCarousel rootClassName={className} {...rest} />;
}
