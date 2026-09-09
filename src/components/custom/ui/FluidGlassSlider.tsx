"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

export type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const DEFAULT_SLIDES_DATA: Slide[] = [
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

type Props = {
  slides?: Slide[];
  className?: string;
};

export default function FluidGlassSlider({ slides, className }: Props) {
  const slidesData = slides && slides.length > 0 ? slides : DEFAULT_SLIDES_DATA;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === slidesData.length - 1;

  useEffect(() => {
    if (!sliderRef.current) return;

    // Slide animation
    gsap.to(sliderRef.current, {
      x: `-${currentIndex * (100 / slidesData.length)}%`,
      duration: 1.2,
      ease: "power4.inOut",
    });

    if (!progressRef.current) return;

    // Auto-play progress bar (Infinite Loop)
    const progressTween = gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: () => {
          // Auto-play continues infinitely
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
  }, [currentIndex]);

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
      className={`relative w-full h-[500px] md:h-[650px] overflow-hidden bg-[#111] text-white font-sans rounded-2xl shadow-xl ${className || ""}`}
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
