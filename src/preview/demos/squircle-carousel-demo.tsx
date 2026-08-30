import React from "react";
import { SquircleCarousel } from "@/components/custom/squircle-carousel";

const NATURE_ITEMS = [
    {
        id: "1",
        title: "Misty Pine Forest",
        imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "2",
        title: "Alpine Glacier Lake",
        imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "3",
        title: "Sunset Mountain Range",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "4",
        title: "Lush River Valley",
        imageUrl: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "5",
        title: "Autumn Woodland Path",
        imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function SquircleCarouselDemo() {
    return (
        <div className="w-full flex items-center justify-center p-0">
            <SquircleCarousel
                items={NATURE_ITEMS}
                rows={4}
                gridGap={8}
                fadeWidthPercent={36}
            />
        </div>
    );
}
