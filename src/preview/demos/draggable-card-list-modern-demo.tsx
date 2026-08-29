import React from "react";
import DraggableCardList from "@/components/custom/draggable-card-list";

export default function DraggableCardListModernDemo() {
    return (
        <div className="w-full min-h-[500px] flex items-center justify-center p-4 bg-background">
            <DraggableCardList variant="modern" />
        </div>
    );
}
