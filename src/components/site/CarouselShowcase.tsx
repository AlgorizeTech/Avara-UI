"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  CustomCarousel,
  HeroCarousel,
  ImageCarousel,
} from "@/components/custom/carousel";
import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// ==========================================
// 1. TYPESCRIPT ENGINE CODES
// ==========================================
const CAROUSEL_ENGINE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import Image, { StaticImageData } from "next/image";
import React, { useCallback, useEffect, useState } from "react";

type ImgSrc = string | StaticImageData;

// --- 1. Image Carousel ---
export function ImageCarousel({
  images = [], rootClassName = "relative h-60 w-full min-w-80 overflow-hidden md:h-[470px] lg:h-[540px]", slideClassName = "h-60 min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px]", arrowClassName = "absolute top-1/2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 hover:bg-white/90 md:h-8 md:w-8", dotClassName = "rounded-full bg-white duration-500 h-2", activeDotClassName = "w-8", prevIcon, nextIcon, autoPlay = false, autoPlayInterval = 3000, transitionDuration = 500, transitionEasing = "ease-linear", imageWidth = 1200, imageHeight = 540, showArrows = true, showDots = true,
}: any) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const defaultPrevIcon = <svg className="h-4 w-4 fill-black/50 md:h-6 md:w-6" viewBox="0 0 1024 1024"><path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg>;
  const defaultNextIcon = <svg className="h-4 w-4 fill-black/50 md:h-6 md:w-6" viewBox="0 0 1024 1024" transform="rotate(180)"><path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg>;

  const prevSlider = () => setCurrentSlider((s) => (s === 0 ? images.length - 1 : s - 1));
  const nextSlider = useCallback(() => setCurrentSlider((s) => (s === images.length - 1 ? 0 : s + 1)), [images.length]);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, images.length]);

  if (!images.length) return null;

  return (
    <div className={rootClassName}>
      {showArrows && <button onClick={prevSlider} className={\`left-3 \${arrowClassName}\`}>{prevIcon ?? defaultPrevIcon}</button>}
      {showArrows && <button onClick={nextSlider} className={\`right-3 \${arrowClassName}\`}>{nextIcon ?? defaultNextIcon}</button>}
      {showDots && (
        <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
          {images.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlider(idx)} className={\`\${dotClassName} \${currentSlider === idx ? activeDotClassName : "w-2"}\`} aria-label={\`Go to slide \${idx + 1}\`} />
          ))}
        </div>
      )}
      <div className="relative flex transform-gpu" style={{ transform: \`translateX(-\${currentSlider * 100}%)\`, transitionDuration: \`\${transitionDuration}ms\`, transitionTimingFunction: transitionEasing }}>
        {images.map((img: any, idx: number) => (
          <div key={idx} className="min-w-full">
            <Image width={imageWidth} height={imageHeight} src={img} className={slideClassName} alt={\`Slider - \${idx + 1}\`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 2. Hero Carousel ---
export function HeroCarousel({
  slides = [], rootClassName = "relative z-50 flex h-60 w-full transform flex-col items-center justify-center gap-5 overflow-hidden bg-cover duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50 sm:h-96 md:h-[540px] lg:gap-10 xl:flex-row", textContainerClassName = "absolute left-0 w-1/2 rounded-lg px-4 text-white drop-shadow-lg", titleClassName = "mb-3 lg:text-3xl", descriptionClassName = "text-xs sm:text-sm md:text-base lg:text-lg", arrowContainerClassName = "absolute bottom-1/4 z-50 flex gap-3 px-5", arrowClassName = "flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/30 md:h-8 md:w-8", slideContainerClassName = "absolute -right-5 z-50 ml-auto w-1/2 overflow-hidden px-4 py-10 lg:-right-16", slideClassName = "h-[180px] min-w-[90px] sm:h-[200px] lg:h-[320px] lg:min-w-[184px] z-50 rounded-lg bg-black/50 shadow-lg shadow-black drop-shadow-lg duration-300", autoPlay = false, autoPlayInterval = 3000, transitionDuration = 1000, transitionEasing = "ease-linear", slideTransform = 200, imageWidth = 1200, imageHeight = 540,
}: any) {
  const [currentSlider, setCurrentSlider] = useState<number>(0);
  const prevSlider = () => setCurrentSlider((s) => (s === 0 ? slides.length - 1 : s - 1));
  const nextSlider = useCallback(() => setCurrentSlider((s) => (s === slides.length - 1 ? 0 : s + 1)), [slides.length]);

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, slides.length]);

  if (!slides.length) return null;
  const currentSlide = slides[currentSlider];
  const backgroundImage = currentSlider === 0 ? slides[slides.length - 1].img : slides[currentSlider - 1].img;

  return (
    <div className={rootClassName} style={{ backgroundImage: \`url(\${String(backgroundImage)})\`, transitionDuration: \`\${transitionDuration}ms\`, transitionTimingFunction: transitionEasing }}>
      <div className={arrowContainerClassName}>
        <button onClick={prevSlider} className={arrowClassName}><svg viewBox="0 0 1024 1024" className="h-4 w-4 md:h-6 md:w-6"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg></button>
        <button onClick={nextSlider} className={arrowClassName}><svg viewBox="0 0 1024 1024" className="h-4 w-4 md:h-6 md:w-6" transform="rotate(180)"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg></button>
      </div>
      <div className={textContainerClassName}>
        <h1 className={titleClassName}>{currentSlide.title}</h1>
        <p className={descriptionClassName}>{currentSlide.des}</p>
      </div>
      <div className={slideContainerClassName}>
        <div className="flex items-center gap-4 duration-300 ease-linear" style={{ transform: \`translateX(-\${currentSlider * slideTransform}px)\` }}>
          {slides.map((slide: any, inx: number) => (
            <div key={inx} className={\`\${slideClassName} \${currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"}\`}>
              <Image width={imageWidth} height={imageHeight} src={slide.img} alt={slide.title ?? \`slide-\${inx}\`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 3. Thumbnail Carousel ---
export function CustomCarousel({
  items = [], rootClassName = "flex h-60 w-full flex-col items-center justify-center gap-5 bg-cover bg-center sm:h-96 md:h-[540px] lg:gap-10", textClassName = "px-5 text-center text-white drop-shadow-lg duration-300 ease-linear", titleClassName = "mb-3 text-xl font-semibold lg:text-3xl", descClassName = "text-sm md:text-base lg:text-lg", thumbClassName = "h-6 w-10 bg-black/20 sm:h-8 md:h-12 md:w-20 box-content cursor-pointer rounded-md md:rounded-lg", activeThumbClassName = "border-2 border-black p-px", autoPlay = true, interval = 5000, imageButtonPosition = "bottom",
}: any) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = setInterval(() => setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1)), interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, items.length]);

  if (!items.length) return null;

  const CarouselContent = (
    <div className={\`\${rootClassName} relative duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50\`} style={{ backgroundImage: \`url(\${String(items[current].img)})\` }}>
      <div className={textClassName}>
        <h1 className={titleClassName}>{items[current].title}</h1>
        <p className={descClassName}>{items[current].des}</p>
      </div>
    </div>
  );

  const Thumbnails = (
    <div className={\`\${imageButtonPosition === "bottom" ? "flex-row justify-center" : "flex-col justify-center"} flex items-center gap-3 p-2\`}>
      {items.map((item: any, index: number) => (
        <button key={index} onClick={() => setCurrent(index)} className={\`\${thumbClassName} \${current === index ? activeThumbClassName : ""}\`}>
          <Image src={item.img} width={1200} height={540} alt={item.title ?? \`thumb-\${index}\`} />
        </button>
      ))}
    </div>
  );

  if (imageButtonPosition === "left") return <div className="flex items-center">{Thumbnails}{CarouselContent}</div>;
  if (imageButtonPosition === "right") return <div className="flex items-center">{CarouselContent}{Thumbnails}</div>;
  return <div>{CarouselContent}{Thumbnails}</div>;
}`;

const FLUID_GLASS_ENGINE_TS = `"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type Slide = { id: number; image: string; title: string; subtitle: string; };

const slidesData: Slide[] = [
  { id: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop", title: "Set within a peaceful rural garden plot", subtitle: "HAY STREET" },
  { id: 2, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2574&auto=format&fit=crop", title: "Exemplifies the art of transformation", subtitle: "RUSTY HOUSE" },
];

export default function FluidGlassSlider({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slidesData.length - 1;

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.to(sliderRef.current, { x: \`-\${currentIndex * (100 / slidesData.length)}%\`, duration: 1.2, ease: "power4.inOut" });

    if (!progressRef.current) return;
    
    // Auto-play loops infinitely
    const progressTween: any = gsap.fromTo(progressRef.current, { width: "0%" }, { width: "100%", duration: 5, ease: "none", onComplete: () => setCurrentIndex((prev) => prev < slidesData.length - 1 ? prev + 1 : 0) });
    return () => { if (progressTween && typeof progressTween.kill === "function") progressTween.kill(); };
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;
    const onMouseMove = (e: MouseEvent) => gsap.to(cursor, { x: (e.clientX || 0) + 15, y: (e.clientY || 0) + 15, duration: 0.1, ease: "power2.out" });
    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Manual navigation capped
  const nextSlide = () => { if (!isLastSlide) setCurrentIndex((prev) => prev + 1); };
  const prevSlide = () => { if (!isFirstSlide) setCurrentIndex((prev) => prev - 1); };
  
  const showCursor = () => { if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, scale: 1 }); };
  const hideCursor = () => { if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.2, scale: 0.8 }); };

  return (
    <div ref={containerRef} onMouseEnter={showCursor} onMouseLeave={hideCursor} className={\`relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#111] text-white font-sans rounded-2xl shadow-xl \${className || ""}\`}>
      <div ref={cursorRef} className="fixed top-0 left-0 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold tracking-widest uppercase flex items-center justify-center opacity-0 z-[100] pointer-events-none scale-80">VIEW</div>
      <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-8 pointer-events-none">
        <div className="flex-1 hidden sm:block"></div>
        <div className="flex-1 text-left sm:text-center"><h1 className="text-xl md:text-2xl font-medium tracking-wide drop-shadow-md pointer-events-auto cursor-pointer hover:opacity-70 transition">Fluid Glass</h1></div>
        <div className="flex-1 flex justify-end"><a href="#" onMouseEnter={hideCursor} onMouseLeave={showCursor} className="group text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase drop-shadow-md flex items-center gap-2 pointer-events-auto">GET A QUOTE</a></div>
      </header>
      <main ref={sliderRef} className="flex h-full" style={{ width: \`\${slidesData.length * 100}%\` }}>
        {slidesData.map((slide) => (
          <section key={slide.id} className="relative flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-cover bg-center h-full" style={{ backgroundImage: \`url(\${slide.image})\`, width: \`\${100 / slidesData.length}%\` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>
            <div className="relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 md:mb-14 tracking-tight max-w-4xl drop-shadow-xl">{slide.title}</h2>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-300 drop-shadow-md">{slide.subtitle}</p>
            </div>
          </section>
        ))}
      </main>
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 pb-6 md:pb-10 px-6 md:px-12 flex items-end">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 sm:gap-0">
          <div className="w-full sm:flex-1 sm:mr-12 h-[2px] bg-gray-600/30 rounded-full overflow-hidden"><div ref={progressRef} className="h-full bg-white w-0" /></div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-8 pointer-events-auto shrink-0">
            <div className="flex gap-2">
              <button onClick={prevSlide} disabled={isFirstSlide} onMouseEnter={hideCursor} onMouseLeave={showCursor} className={\`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all \${isFirstSlide ? 'bg-black/20 border-white/10 opacity-30 cursor-not-allowed' : 'bg-black/40 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer'}\`}><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={nextSlide} disabled={isLastSlide} onMouseEnter={hideCursor} onMouseLeave={showCursor} className={\`w-10 h-10 md:w-12 md:h-12 rounded-full backdrop-blur-sm border flex items-center justify-center transition-all \${isLastSlide ? 'bg-black/20 border-white/10 opacity-30 cursor-not-allowed' : 'bg-black/40 border-white/20 hover:bg-white/20 hover:scale-105 cursor-pointer'}\`}><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
            <div className="text-[11px] md:text-[13px] font-semibold tracking-widest font-mono drop-shadow-md"><span>0{currentIndex + 1}</span> / 0{slidesData.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

// ==========================================
// 2. JAVASCRIPT ENGINE CODES
// ==========================================
const CAROUSEL_ENGINE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

// --- 1. Image Carousel ---
export function ImageCarousel({
  images = [], rootClassName = "relative h-60 w-full min-w-80 overflow-hidden md:h-[470px] lg:h-[540px]", slideClassName = "h-60 min-w-full bg-black/20 object-cover sm:h-96 md:h-[540px]", arrowClassName = "absolute top-1/2 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white/70 hover:bg-white/90 md:h-8 md:w-8", dotClassName = "rounded-full bg-white duration-500 h-2", activeDotClassName = "w-8", prevIcon, nextIcon, autoPlay = false, autoPlayInterval = 3000, transitionDuration = 500, transitionEasing = "ease-linear", imageWidth = 1200, imageHeight = 540, showArrows = true, showDots = true,
}) {
  const [currentSlider, setCurrentSlider] = useState(0);
  const defaultPrevIcon = <svg className="h-4 w-4 fill-black/50 md:h-6 md:w-6" viewBox="0 0 1024 1024"><path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg>;
  const defaultNextIcon = <svg className="h-4 w-4 fill-black/50 md:h-6 md:w-6" viewBox="0 0 1024 1024" transform="rotate(180)"><path d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg>;

  const prevSlider = () => setCurrentSlider((s) => (s === 0 ? images.length - 1 : s - 1));
  const nextSlider = useCallback(() => setCurrentSlider((s) => (s === images.length - 1 ? 0 : s + 1)), [images.length]);

  useEffect(() => {
    if (autoPlay && images.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, images.length]);

  if (!images.length) return null;

  return (
    <div className={rootClassName}>
      {showArrows && <button onClick={prevSlider} className={\`left-3 \${arrowClassName}\`}>{prevIcon ?? defaultPrevIcon}</button>}
      {showArrows && <button onClick={nextSlider} className={\`right-3 \${arrowClassName}\`}>{nextIcon ?? defaultNextIcon}</button>}
      {showDots && (
        <div className="absolute bottom-4 z-50 flex w-full items-center justify-center gap-1 rounded-full">
          {images.map((_, idx) => (
            <button key={idx} onClick={() => setCurrentSlider(idx)} className={\`\${dotClassName} \${currentSlider === idx ? activeDotClassName : "w-2"}\`} aria-label={\`Go to slide \${idx + 1}\`} />
          ))}
        </div>
      )}
      <div className="relative flex transform-gpu" style={{ transform: \`translateX(-\${currentSlider * 100}%)\`, transitionDuration: \`\${transitionDuration}ms\`, transitionTimingFunction: transitionEasing }}>
        {images.map((img, idx) => (
          <div key={idx} className="min-w-full">
            <Image width={imageWidth} height={imageHeight} src={img} className={slideClassName} alt={\`Slider - \${idx + 1}\`} />
          </div>
        ))}
      </div>
    </div>
  );
}

// --- 2. Hero Carousel ---
export function HeroCarousel({
  slides = [], rootClassName = "relative z-50 flex h-60 w-full transform flex-col items-center justify-center gap-5 overflow-hidden bg-cover duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50 sm:h-96 md:h-[540px] lg:gap-10 xl:flex-row", textContainerClassName = "absolute left-0 w-1/2 rounded-lg px-4 text-white drop-shadow-lg", titleClassName = "mb-3 lg:text-3xl", descriptionClassName = "text-xs sm:text-sm md:text-base lg:text-lg", arrowContainerClassName = "absolute bottom-1/4 z-50 flex gap-3 px-5", arrowClassName = "flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/30 md:h-8 md:w-8", slideContainerClassName = "absolute -right-5 z-50 ml-auto w-1/2 overflow-hidden px-4 py-10 lg:-right-16", slideClassName = "h-[180px] min-w-[90px] sm:h-[200px] lg:h-[320px] lg:min-w-[184px] z-50 rounded-lg bg-black/50 shadow-lg shadow-black drop-shadow-lg duration-300", autoPlay = false, autoPlayInterval = 3000, transitionDuration = 1000, transitionEasing = "ease-linear", slideTransform = 200, imageWidth = 1200, imageHeight = 540,
}) {
  const [currentSlider, setCurrentSlider] = useState(0);
  const prevSlider = () => setCurrentSlider((s) => (s === 0 ? slides.length - 1 : s - 1));
  const nextSlider = useCallback(() => setCurrentSlider((s) => (s === slides.length - 1 ? 0 : s + 1)), [slides.length]);

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(nextSlider, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlider, slides.length]);

  if (!slides.length) return null;
  const currentSlide = slides[currentSlider];
  const backgroundImage = currentSlider === 0 ? slides[slides.length - 1].img : slides[currentSlider - 1].img;

  return (
    <div className={rootClassName} style={{ backgroundImage: \`url(\${String(backgroundImage)})\`, transitionDuration: \`\${transitionDuration}ms\`, transitionTimingFunction: transitionEasing }}>
      <div className={arrowContainerClassName}>
        <button onClick={prevSlider} className={arrowClassName}><svg viewBox="0 0 1024 1024" className="h-4 w-4 md:h-6 md:w-6"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg></button>
        <button onClick={nextSlider} className={arrowClassName}><svg viewBox="0 0 1024 1024" className="h-4 w-4 md:h-6 md:w-6" transform="rotate(180)"><path fill="#0095FF" d="M685.248 104.704a64 64 0 010 90.496L368.448 512l316.8 316.8a64 64 0 01-90.496 90.496L232.704 557.248a64 64 0 010-90.496l362.048-362.048a64 64 0 0190.496 0z" /></svg></button>
      </div>
      <div className={textContainerClassName}>
        <h1 className={titleClassName}>{currentSlide.title}</h1>
        <p className={descriptionClassName}>{currentSlide.des}</p>
      </div>
      <div className={slideContainerClassName}>
        <div className="flex items-center gap-4 duration-300 ease-linear" style={{ transform: \`translateX(-\${currentSlider * slideTransform}px)\` }}>
          {slides.map((slide, inx) => (
            <div key={inx} className={\`\${slideClassName} \${currentSlider - 1 === inx ? "scale-0" : "scale-100 delay-500"}\`}>
              <Image width={imageWidth} height={imageHeight} src={slide.img} alt={slide.title ?? \`slide-\${inx}\`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- 3. Thumbnail Carousel ---
export function CustomCarousel({
  items = [], rootClassName = "flex h-60 w-full flex-col items-center justify-center gap-5 bg-cover bg-center sm:h-96 md:h-[540px] lg:gap-10", textClassName = "px-5 text-center text-white drop-shadow-lg duration-300 ease-linear", titleClassName = "mb-3 text-xl font-semibold lg:text-3xl", descClassName = "text-sm md:text-base lg:text-lg", thumbClassName = "h-6 w-10 bg-black/20 sm:h-8 md:h-12 md:w-20 box-content cursor-pointer rounded-md md:rounded-lg", activeThumbClassName = "border-2 border-black p-px", autoPlay = true, interval = 5000, imageButtonPosition = "bottom",
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = setInterval(() => setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1)), interval);
    return () => clearInterval(id);
  }, [autoPlay, interval, items.length]);

  if (!items.length) return null;

  const CarouselContent = (
    <div className={\`\${rootClassName} relative duration-1000 ease-linear before:absolute before:inset-0 before:bg-black/50\`} style={{ backgroundImage: \`url(\${String(items[current].img)})\` }}>
      <div className={textClassName}>
        <h1 className={titleClassName}>{items[current].title}</h1>
        <p className={descClassName}>{items[current].des}</p>
      </div>
    </div>
  );

  const Thumbnails = (
    <div className={\`\${imageButtonPosition === "bottom" ? "flex-row justify-center" : "flex-col justify-center"} flex items-center gap-3 p-2\`}>
      {items.map((item, index) => (
        <button key={index} onClick={() => setCurrent(index)} className={\`\${thumbClassName} \${current === index ? activeThumbClassName : ""}\`}>
          <Image src={item.img} width={1200} height={540} alt={item.title ?? \`thumb-\${index}\`} />
        </button>
      ))}
    </div>
  );

  if (imageButtonPosition === "left") return <div className="flex items-center">{Thumbnails}{CarouselContent}</div>;
  if (imageButtonPosition === "right") return <div className="flex items-center">{CarouselContent}{Thumbnails}</div>;
  return <div>{CarouselContent}{Thumbnails}</div>;
}`;

const FLUID_GLASS_ENGINE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const slidesData = [
  { id: 1, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop", title: "Set within a peaceful rural garden plot", subtitle: "HAY STREET" },
  { id: 2, image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2574&auto=format&fit=crop", title: "Exemplifies the art of transformation", subtitle: "RUSTY HOUSE" },
];

export default function FluidGlassSlider({ className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const progressRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    gsap.to(sliderRef.current, { x: \`-\${currentIndex * (100 / slidesData.length)}%\`, duration: 1.2, ease: "power4.inOut" });

    if (!progressRef.current) return;
    const progressTween = gsap.fromTo(progressRef.current, { width: "0%" }, { width: "100%", duration: 5, ease: "none", onComplete: () => setCurrentIndex((prev) => prev < slidesData.length - 1 ? prev + 1 : 0) });
    return () => { if (progressTween && typeof progressTween.kill === "function") progressTween.kill(); };
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    const onMouseMove = (e) => gsap.to(cursor, { x: (e.clientX || 0) + 15, y: (e.clientY || 0) + 15, duration: 0.1, ease: "power2.out" });
    container.addEventListener("mousemove", onMouseMove);
    return () => container.removeEventListener("mousemove", onMouseMove);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev < slidesData.length - 1 ? prev + 1 : 0));
  const prevSlide = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slidesData.length - 1));
  const showCursor = () => { if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 1, duration: 0.2, scale: 1 }); };
  const hideCursor = () => { if (cursorRef.current) gsap.to(cursorRef.current, { opacity: 0, duration: 0.2, scale: 0.8 }); };

  return (
    <div ref={containerRef} onMouseEnter={showCursor} onMouseLeave={hideCursor} className={\`relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#111] text-white font-sans rounded-2xl shadow-xl \${className || ""}\`}>
      <div ref={cursorRef} className="fixed top-0 left-0 px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-semibold tracking-widest uppercase flex items-center justify-center opacity-0 z-[100] pointer-events-none scale-80">VIEW</div>
      <header className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-6 md:p-8 pointer-events-none">
        <div className="flex-1 hidden sm:block"></div>
        <div className="flex-1 text-left sm:text-center"><h1 className="text-xl md:text-2xl font-medium tracking-wide pointer-events-auto cursor-pointer hover:opacity-70 transition">Fluid Glass</h1></div>
        <div className="flex-1 flex justify-end"><a href="#" onMouseEnter={hideCursor} onMouseLeave={showCursor} className="group text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 pointer-events-auto">GET A QUOTE</a></div>
      </header>
      <main ref={sliderRef} className="flex h-full" style={{ width: \`\${slidesData.length * 100}%\` }}>
        {slidesData.map((slide) => (
          <section key={slide.id} className="relative flex items-end pb-24 md:pb-32 px-6 md:px-12 bg-cover bg-center h-full" style={{ backgroundImage: \`url(\${slide.image})\`, width: \`\${100 / slidesData.length}%\` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 md:mb-14 tracking-tight max-w-4xl">{slide.title}</h2>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-300">{slide.subtitle}</p>
            </div>
          </section>
        ))}
      </main>
      <div className="absolute bottom-0 left-0 w-full pointer-events-none z-20 pb-6 md:pb-10 px-6 md:px-12 flex items-end">
        <div className="w-full flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-6 sm:gap-0">
          <div className="w-full sm:flex-1 sm:mr-12 h-[2px] bg-gray-600/30 rounded-full overflow-hidden"><div ref={progressRef} className="h-full bg-white w-0" /></div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-8 pointer-events-auto shrink-0">
            <div className="flex gap-1">
              <button onClick={prevSlide} onMouseEnter={hideCursor} onMouseLeave={showCursor} className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition group rounded-sm cursor-pointer">Prev</button>
              <button onClick={nextSlide} onMouseEnter={hideCursor} onMouseLeave={showCursor} className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition group rounded-sm cursor-pointer">Next</button>
            </div>
            <div className="text-[11px] md:text-[13px] font-semibold tracking-widest font-mono"><span>0{currentIndex + 1}</span> / 0{slidesData.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

// ==========================================
// COMPONENT STATE & LOGIC
// ==========================================
type CarouselType = "image" | "hero" | "thumbnails" | "fluid";
type ThumbPosition = "bottom" | "left" | "right";

const sampleImages = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
];

const sampleSlides = [
  {
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
    title: "Tropical Paradise",
    des: "Discover pristine beaches and crystal-clear waters.",
  },
  {
    img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop",
    title: "Peak Adventures",
    des: "Challenge yourself with epic mountain trails.",
  },
  {
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop",
    title: "Mountain Retreat",
    des: "Escape to the serene heights and breathe fresh air.",
  },
];

export function CarouselShowcase() {
  const [carouselType, setCarouselType] = useState<CarouselType>("image");
  const [thumbPosition, setThumbPosition] = useState<ThumbPosition>("bottom");

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    if (carouselType === "image") {
      return `import { ImageCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const images = [
    "https://images.unsplash.com/photo-1506905925346...",
    "https://images.unsplash.com/photo-1441974231531..."
  ];

  return (
    <div className="w-full max-w-4xl mx-auto border rounded-xl overflow-hidden shadow-sm">
      <ImageCarousel images={images} autoPlay={true} autoPlayInterval={3000} />
    </div>
  );
}`;
    }

    if (carouselType === "hero") {
      return `import { HeroCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const slides = [
    { img: "https://images.unsplash.com/...", title: "Tropical Paradise", des: "Discover pristine beaches." },
    { img: "https://images.unsplash.com/...", title: "Peak Adventures", des: "Challenge yourself." }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <HeroCarousel slides={slides} autoPlay={true} />
    </div>
  );
}`;
    }

    if (carouselType === "thumbnails") {
      return `import { CustomCarousel } from "@/components/custom/carousel";

export default function CarouselDemo()${typeDef} {
  const items = [
    { img: "https://images.unsplash.com/...", title: "Ocean Paradise", des: "Experience serenity." },
    { img: "https://images.unsplash.com/...", title: "Mountain Summit", des: "Conquer new heights." }
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden border">
      <CustomCarousel items={items} imageButtonPosition="${thumbPosition}" />
    </div>
  );
}`;
    }

    if (carouselType === "fluid") {
      return `import FluidGlassSlider from "@/components/custom/ui/FluidGlassSlider";

export default function CarouselDemo()${typeDef} {
  return (
    <div className="w-full">
      {/* Note: The FluidGlassSlider has its data hardcoded in the component itself 
        for performance with GSAP. Edit the component file directly to change slides. 
      */}
      <FluidGlassSlider className="rounded-xl border shadow-sm" />
    </div>
  );
}`;
    }
    return "";
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <VariantTabs
          variants={[
            { value: "image", label: "Standard Image" },
            { value: "hero", label: "Hero Slider" },
            { value: "thumbnails", label: "Thumbnails" },
            { value: "fluid", label: "Fluid Glass" },
          ]}
          label="Carousel Variant"
          defaultValue={carouselType}
          onValueChange={(v) => setCarouselType(v as CarouselType)}
        />

        {carouselType === "thumbnails" && (
          <div className="animate-in fade-in duration-300">
            <VariantTabs
              variants={["bottom", "left", "right"]}
              label="Thumbnail Position"
              defaultValue={thumbPosition}
              onValueChange={(v) => setThumbPosition(v as ThumbPosition)}
            />
          </div>
        )}
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Carousel"
        // Here we pass the correct engine code (both TS and JS) based on what tab is selected
        tsCode={
          carouselType === "fluid" ? FLUID_GLASS_ENGINE_TS : CAROUSEL_ENGINE_TS
        }
        jsCode={
          carouselType === "fluid" ? FLUID_GLASS_ENGINE_JS : CAROUSEL_ENGINE_JS
        }
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="carousel"
        sandboxProps={{ carouselType, thumbPosition }}
      >
        <div className="w-full">
          {carouselType === "image" && (
            <div className="max-w-4xl mx-auto border dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm">
              <ImageCarousel
                images={sampleImages}
                autoPlay={true}
                autoPlayInterval={3000}
              />
            </div>
          )}

          {carouselType === "hero" && (
            <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm">
              <HeroCarousel slides={sampleSlides} autoPlay={true} />
            </div>
          )}

          {carouselType === "thumbnails" && (
            <div className="w-full rounded-xl overflow-hidden border dark:border-zinc-800 shadow-sm">
              <CustomCarousel
                items={sampleSlides}
                imageButtonPosition={thumbPosition}
              />
            </div>
          )}

          {carouselType === "fluid" && (
            <FluidGlassSlider className="rounded-xl border dark:border-zinc-800 shadow-sm w-full" />
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
