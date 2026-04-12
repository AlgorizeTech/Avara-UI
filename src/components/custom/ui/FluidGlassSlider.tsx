// components/ui/FluidGlassSlider.tsx
"use client";

import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

type Slide = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

const slidesData: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2574&auto=format&fit=crop",
    title: "Set within a peaceful rural garden plot in Braughing",
    subtitle: "HAY STREET",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2574&auto=format&fit=crop",
    title: "Rusty House exemplifies the art of transformation",
    subtitle: "RUSTY HOUSE",
  },
];

type Props = {
  className?: string;
};

export default function FluidGlassSlider({ className }: Props) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sliderRef.current) return;

    gsap.to(sliderRef.current, {
      x: `-${currentIndex * (100 / slidesData.length)}%`,
      duration: 1.2,
      ease: "power4.inOut",
    });

    if (!progressRef.current) return;

    const progressTween: any = gsap.fromTo(
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

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev < slidesData.length - 1 ? prev + 1 : 0));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : slidesData.length - 1));
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
          <h1 className="text-xl md:text-2xl font-medium tracking-wide pointer-events-auto cursor-pointer hover:opacity-70 transition">
            Fluid Glass
          </h1>
        </div>
        <div className="flex-1 flex justify-end">
          <a
            href="#"
            onMouseEnter={hideCursor}
            onMouseLeave={showCursor}
            className="group text-[10px] md:text-[11px] font-semibold tracking-[0.2em] uppercase flex items-center gap-2 pointer-events-auto"
          >
            GET A QUOTE
          </a>
        </div>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="relative z-10 w-full">
              <h2 className="text-3xl md:text-5xl lg:text-[4rem] font-bold leading-[1.1] mb-8 md:mb-14 tracking-tight max-w-4xl">
                {slide.title}
              </h2>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-gray-300">
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
            <div className="flex gap-1">
              <button
                onClick={prevSlide}
                onMouseEnter={hideCursor}
                onMouseLeave={showCursor}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition group rounded-sm cursor-pointer"
              >
                Prev
              </button>
              <button
                onClick={nextSlide}
                onMouseEnter={hideCursor}
                onMouseLeave={showCursor}
                className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/10 transition group rounded-sm cursor-pointer"
              >
                Next
              </button>
            </div>
            <div className="text-[11px] md:text-[13px] font-semibold tracking-widest font-mono">
              <span>0{currentIndex + 1}</span> / 0{slidesData.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
