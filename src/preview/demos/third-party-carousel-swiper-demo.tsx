"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Quote } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/custom/blocks/CardBlock";
import { Badge } from "@/components/custom/ui/badge";
import { accentStyle } from "@/lib/accent";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  { name: "Ada Okafor", role: "Head of Design, Northwind", quote: "We replaced three internal component libraries with this one and shipped the redesign a month early." },
  { name: "Marek Novak", role: "Staff Engineer, Contoso", quote: "The primitives compose the way the docs claim they do. That is rarer than it should be." },
  { name: "Priya Raman", role: "CTO, Fabrikam", quote: "Theming was one token file. Everything downstream — charts, grids, carousels — just followed." },
  { name: "Tom Halvorsen", role: "Product Lead, Tailspin", quote: "Our designers stopped filing tickets about spacing. That is the whole review." },
  { name: "Sofia Marino", role: "Frontend Lead, Litware", quote: "Accessible by default, so the audit was boring. Boring audits are the goal." },
];

/**
 * Swiper brings its own CSS, which is exactly why the slides stay ours:
 * import only the modules you use, then let `Card` own everything inside the
 * slide. The two CSS variables below re-point Swiper's own chrome — arrows and
 * bullets — at the design tokens instead of its default blue.
 */
export default function SwiperTestimonials({ color }: { color?: string } = {}) {
  return (
    <div
      style={accentStyle(color)}
      /**
       * Swiper reads its own CSS variables for arrows and bullets, so pointing
       * them at the design tokens is a class list rather than a stylesheet.
       * `items-stretch` + `h-auto` is what makes the cards share one height —
       * without it each slide is only as tall as its own quote.
       */
      className="w-full max-w-4xl [--swiper-navigation-color:var(--primary)] [--swiper-navigation-size:24px] [--swiper-pagination-bullet-inactive-color:var(--muted-foreground)] [--swiper-pagination-color:var(--primary)] [&_.swiper-slide]:h-auto [&_.swiper-wrapper]:items-stretch [&_.swiper-slide]:transition-opacity [&_.swiper-slide:not(.swiper-slide-active)]:opacity-60 [&_.swiper]:px-10 [&_.swiper]:pb-12"
    >
      <Swiper
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 90, modifier: 1, slideShadows: false }}
        navigation
        pagination={{ clickable: true }}
      >
        {testimonials.map((item) => (
          <SwiperSlide key={item.name} className="!w-[280px] sm:!w-[340px]">
            <Card className="h-full">
              <CardContent className="flex h-full flex-col gap-4 p-6">
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <p className="flex-1 text-sm leading-6 text-foreground/85">{item.quote}</p>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
                <Badge variant="outline" className="w-fit border-primary/25 bg-primary/10 text-primary font-medium">Verified customer</Badge>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
