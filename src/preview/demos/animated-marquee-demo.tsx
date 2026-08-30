import React from "react";
import { AnimatedMarquee, AnimatedMarqueeProps } from "@/components/custom/animated-marquee";

export default function AnimatedMarqueeDemo(props: AnimatedMarqueeProps) {
    return (
        <div className="w-full flex items-center justify-center p-0">
            <AnimatedMarquee {...props} />
        </div>
    );
}
