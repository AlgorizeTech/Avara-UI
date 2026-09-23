import React from "react";
import { SquircleCarousel } from "@/components/custom/squircle-carousel";

const NATURE_ITEMS = [
    {
        id: "1",
        title: "Misty Pine Forest",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
    },
    {
        id: "2",
        title: "Alpine Glacier Lake",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1464822759023-fed622ff2c3b-1790145143491.jpg",
    },
    {
        id: "3",
        title: "Sunset Mountain Range",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
    },
    {
        id: "4",
        title: "Lush River Valley",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
    },
    {
        id: "5",
        title: "Autumn Woodland Path",
        imageUrl: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145141/photo-1448375240586-882707db888b-1790145143491.jpg",
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
