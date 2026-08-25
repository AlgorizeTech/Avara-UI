"use client";

import gsap from "gsap";
import { Check, Code2, PenTool, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const getCardData = (activePlans: string[]) => {
  const hasD = activePlans.includes("design");
  const hasV = activePlans.includes("development");
  const hasF = activePlans.includes("fast");

  if (!hasD && !hasV && !hasF) {
    return {
      title: "No Service Selected",
      tag: null,
      price: 0,
      features: ["What services are you looking for with us?"],
    };
  }

  let title = "";
  const tag = hasF ? "Fast Track" : "Standard";
  let price = 0;
  let features: string[] = [];

  if (hasD) price += 300;
  if (hasV) price += 400;
  if (hasF) price += 100;

  if (hasD && hasV && hasF) {
    title = "Fast & Development & Design";
    features = [
      "Avg. 1 week turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Top-notch custom design",
      "Figma design & interactive prototype",
      "Framer/Custom development",
      "Fast delivery (3X everything)",
    ];
  } else if (hasD && hasV) {
    title = "Design & Development";
    features = [
      "Avg. 2 weeks turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Top-notch custom design",
      "Figma design & interactive prototype",
      "Framer/Custom development",
    ];
  } else if (hasD && hasF) {
    title = "Design & Fast";
    features = [
      "Avg. 2 days turnaround",
      "3 rounds of revisions",
      "1 month of free support",
      "Top-notch custom design",
      "Figma design & interactive prototype",
      "Fast delivery (3X everything)",
      "Quick delivery solution",
    ];
  } else if (hasV && hasF) {
    title = "Fast & Development";
    features = [
      "Avg. 4 days turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Framer/Custom development",
      "Fast delivery (3X everything)",
      "Quick delivery solution",
    ];
  } else if (hasD) {
    title = "Design";
    features = [
      "Avg. 4 days turnaround",
      "3 rounds of revisions",
      "1 month of free support",
      "Top-notch custom design",
      "Figma design & interactive prototype",
    ];
  } else if (hasV) {
    title = "Development";
    features = [
      "Avg. 1 week turnaround",
      "5 rounds of revisions",
      "2 months of free support",
      "Framer/Custom development",
    ];
  } else if (hasF) {
    title = "Fast";
    features = [
      "Avg. 1 day turnaround",
      "0 rounds of revisions",
      "0 month of free support",
      "Fast delivery (3X everything)",
      "Quick delivery solution",
    ];
  }

  return { title, tag, price, features };
};

export default function PricingPlans({
  linkComponent: Link = "a",
}: {
  /**
   * The element used for links. Defaults to a plain `a`, so this component works
   * in any React app with no adaptation. In Next.js, pass `next/link` to keep
   * client-side navigation and prefetching: `linkComponent={Link}`.
   */
  linkComponent?: React.ElementType;
} = {}) {
  const [activePlans, setActivePlans] = useState<string[]>([]);
  const cardData = getCardData(activePlans);

  const cardContentRef = useRef<HTMLDivElement>(null);

  const togglePlan = (id: string) => {
    setActivePlans((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (cardContentRef.current) {
      gsap.fromTo(
        cardContentRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
      );
    }
  }, [activePlans]);

  return (
    <section className="min-h-screen bg-background text-foreground py-24 px-6 font-sans transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-6xl md:text-7xl lg:text-[80px] font-bold tracking-tight leading-tight">
            Pricing Plans
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-3xl mx-auto font-medium">
            For each plan we{" "}
            <span className="text-lime-600 dark:text-[#CCFF00]">
              Outperform
            </span>{" "}
            the competition in quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-4xl md:text-5xl font-semibold mb-3 text-lime-600 dark:text-[#CCFF00]">
                Landing Page
              </h3>
              <p className="text-xl md:text-2xl text-foreground font-medium">
                Choose what works for you
              </p>
              <p className="text-base text-muted-foreground mt-3 leading-relaxed">
                Every business needs a landing page, if you don&apos;t like the
                website we make, you will get a full refund.
              </p>
            </div>

            <div className="space-y-5 mt-10">
              <div className="flex items-center justify-between bg-muted border border-border p-6 rounded-2xl transition-colors">
                <div className="flex items-center gap-5">
                  <div
                    className={`p-3.5 rounded-xl transition-colors ${
                      activePlans.includes("design")
                        ? "bg-lime-100 text-lime-600 dark:bg-[#CCFF00]/20 dark:text-[#CCFF00]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <PenTool size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-left">Design</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Top-notch custom design
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => togglePlan("design")}
                  className={`cursor-pointer w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    activePlans.includes("design")
                      ? "bg-lime-500 dark:bg-[#CCFF00]"
                      : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-background rounded-full shadow-md transform transition-transform duration-300 ${
                      activePlans.includes("design")
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-muted border border-border p-6 rounded-2xl transition-colors">
                <div className="flex items-center gap-5">
                  <div
                    className={`p-3.5 rounded-xl transition-colors ${
                      activePlans.includes("development")
                        ? "bg-lime-100 text-lime-600 dark:bg-[#CCFF00]/20 dark:text-[#CCFF00]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Code2 size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-left">
                      Development
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Full development solution
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => togglePlan("development")}
                  className={`cursor-pointer w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    activePlans.includes("development")
                      ? "bg-lime-500 dark:bg-[#CCFF00]"
                      : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-background rounded-full shadow-md transform transition-transform duration-300 ${
                      activePlans.includes("development")
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between bg-muted border border-border p-6 rounded-2xl transition-colors">
                <div className="flex items-center gap-5">
                  <div
                    className={`p-3.5 rounded-xl transition-colors ${
                      activePlans.includes("fast")
                        ? "bg-lime-100 text-lime-600 dark:bg-[#CCFF00]/20 dark:text-[#CCFF00]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl text-left">Fast</h4>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      Quick budget solution
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => togglePlan("fast")}
                  className={`cursor-pointer w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    activePlans.includes("fast")
                      ? "bg-lime-500 dark:bg-[#CCFF00]"
                      : "bg-muted"
                  }`}
                >
                  <div
                    className={`w-6 h-6 bg-background rounded-full shadow-md transform transition-transform duration-300 ${
                      activePlans.includes("fast")
                        ? "translate-x-6"
                        : "translate-x-0"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-10 shadow-xl dark:shadow-2xl relative flex flex-col justify-between min-h-[500px] transition-colors">
            <div ref={cardContentRef}>
              <div className="flex justify-between items-center mb-8">
                <h4 className="text-2xl font-bold text-foreground">
                  {cardData.title}
                </h4>
                {cardData.tag && (
                  <span className="bg-lime-100 text-lime-700 border border-lime-200 dark:bg-[#CCFF00]/10 dark:text-[#CCFF00] dark:border-[#CCFF00]/20 px-3.5 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                    {cardData.tag}
                  </span>
                )}
              </div>

              <div className="mb-10">
                <span className="text-7xl md:text-[80px] font-extrabold text-lime-500 dark:text-[#CCFF00] tracking-tight leading-none">
                  ${cardData.price}
                </span>
              </div>

              <ul className="space-y-4 mb-10">
                {cardData.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check
                      className="text-lime-500 dark:text-[#CCFF00] shrink-0 mt-1"
                      size={22}
                    />
                    <span className="text-foreground text-lg">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="#"
              className="w-full text-center bg-lime-400 dark:bg-[#CCFF00] text-black hover:bg-lime-500 dark:hover:bg-[#b3e600] transition-colors font-bold text-xl py-5 rounded-xl shadow-[0_0_20px_rgba(163,230,53,0.3)] dark:shadow-[0_0_30px_rgba(204,255,0,0.15)] mt-auto flex items-center justify-center"
            >
              Book a 45-min call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}