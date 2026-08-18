"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type ImgSrc = string | StaticImageData;

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
};

export function ImageCarousel({
  images = [],
  rootClassName = "relative h-60 w-full min-w-80 overflow-hidden md:h-[470px] lg:h-[540px]",
  slideClassName = "h-60 min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px]",
  arrowClassName = "absolute top-1/2 z-50 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 hover:bg-white dark:bg-zinc-900/80 dark:hover:bg-zinc-900 shadow-md md:h-9 md:w-9 transition-all cursor-pointer",
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
}: ImageCarouselProps) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  const defaultPrevIcon = (
    <ArrowLeft className="h-4 w-4 text-zinc-800 dark:text-zinc-100 md:h-5 md:w-5" />
  );

  const defaultNextIcon = (
    <ArrowRight className="h-4 w-4 text-zinc-800 dark:text-zinc-100 md:h-5 md:w-5" />
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

type HeroSlide = {
  img: ImgSrc;
  title?: string;
  des?: string;
};

type HeroCarouselProps = {
  slides?: HeroSlide[];
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
};

export function HeroCarousel({
  slides = [],
  rootClassName = "relative z-50 flex h-60 w-full transform flex-col items-center justify-center gap-5 overflow-hidden bg-cover duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50 sm:h-96 md:h-[540px] lg:gap-10 xl:flex-row",
  textContainerClassName = "absolute left-0 w-1/2 rounded-lg px-4 text-white drop-shadow-lg",
  titleClassName = "mb-3 lg:text-3xl",
  descriptionClassName = "text-xs sm:text-sm md:text-base lg:text-lg",
  arrowContainerClassName = "absolute bottom-1/4 z-50 flex gap-3 px-5",
  arrowClassName = "flex h-8 w-8 items-center justify-center rounded-full bg-white/25 hover:bg-white/40 dark:bg-black/40 dark:hover:bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-md md:h-10 md:w-10 transition-all cursor-pointer",
  slideContainerClassName = "absolute -right-5 z-50 ml-auto w-1/2 overflow-hidden px-4 py-10 lg:-right-16",
  slideClassName = "h-[180px] min-w-[90px] sm:h-[200px] lg:h-[320px] lg:min-w-[184px] z-50 rounded-lg bg-black/50 shadow-lg shadow-black drop-shadow-lg duration-300",
  autoPlay = false,
  autoPlayInterval = 3000,
  transitionDuration = 1000,
  transitionEasing = "ease-linear",
  slideTransform = 200,
  imageWidth = 1200,
  imageHeight = 540,
}: HeroCarouselProps) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);

  const prevSlider = () =>
    setCurrentSlider((s) => (s > 0 ? s - 1 : 0));

  const nextSlider = useCallback(() => {
    setCurrentSlider((s) => s + 1);
  }, []);

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, slides.length]);

  if (!slides.length) return null;

  const activeIndex = currentSlider % slides.length;
  const currentSlide = slides[activeIndex];
  const bgSlideIndex =
    activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
  const backgroundImage = slides[bgSlideIndex].img;

  // Infinite repeated track so items always enter from right to left
  const infiniteSlides = Array.from({ length: 20 }, () => slides).flat();

  return (
    <div
      className={rootClassName}
      style={{
        backgroundImage: `url(${String(backgroundImage)})`,
        transitionDuration: `${transitionDuration}ms`,
        transitionTimingFunction: transitionEasing,
      }}
    >
      <div className={arrowContainerClassName}>
        <button
          onClick={prevSlider}
          className={arrowClassName}
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4 text-white md:h-5 md:w-5" />
        </button>
        <button
          onClick={nextSlider}
          className={arrowClassName}
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4 text-white md:h-5 md:w-5" />
        </button>
      </div>
      <div className={textContainerClassName}>
        <h1 className={titleClassName}>{currentSlide.title}</h1>
        <p className={descriptionClassName}>{currentSlide.des}</p>
      </div>
      <div className={slideContainerClassName}>
        <div
          className="flex items-center gap-4 duration-300 ease-linear"
          style={{
            transform: `translateX(-${currentSlider * slideTransform}px)`,
          }}
        >
          {infiniteSlides.map((slide, inx) => (
            <div
              key={inx}
              className={`${slideClassName} ${currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"}`}
            >
              <Image
                width={imageWidth}
                height={imageHeight}
                src={slide.img}
                alt={slide.title ?? `slide-${inx}`}
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type CustomItem = {
  img: ImgSrc;
  title?: string;
  des?: string;
};

type CustomCarouselProps = {
  items?: CustomItem[];
  rootClassName?: string;
  textClassName?: string;
  titleClassName?: string;
  descClassName?: string;
  thumbClassName?: string;
  activeThumbClassName?: string;
  autoPlay?: boolean;
  interval?: number;
  imageButtonPosition?: "bottom" | "left" | "right";
};

export function CustomCarousel({
  items = [],
  rootClassName = "flex h-60 w-full flex-col items-center justify-center gap-5 bg-cover bg-center sm:h-96 md:h-[540px] lg:gap-10",
  textClassName = "px-5 text-center text-white drop-shadow-lg duration-300 ease-linear",
  titleClassName = "mb-3 text-xl font-semibold lg:text-3xl",
  descClassName = "text-sm md:text-base lg:text-lg",
  thumbClassName = "h-6 w-10 bg-black/20 sm:h-8 md:h-12 md:w-20 box-content cursor-pointer rounded-md md:rounded-lg",
  activeThumbClassName = "border-2 border-black p-px",
  autoPlay = true,
  interval = 5000,
  imageButtonPosition = "bottom",
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
      className={`${rootClassName} relative duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50`}
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
      className={`${imageButtonPosition === "bottom" ? "flex-row justify-center" : "flex-col justify-center"} flex items-center gap-3 p-2`}
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
            alt={item.title ?? `thumb-${index}`}
          />
        </button>
      ))}
    </div>
  );

  if (imageButtonPosition === "left")
    return (
      <div className="flex items-center">
        {Thumbnails}
        {CarouselContent}
      </div>
    );
  if (imageButtonPosition === "right")
    return (
      <div className="flex items-center">
        {CarouselContent}
        {Thumbnails}
      </div>
    );
  return (
    <div>
      {CarouselContent}
      {Thumbnails}
    </div>
  );
}
