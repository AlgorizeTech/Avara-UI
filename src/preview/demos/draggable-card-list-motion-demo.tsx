import React from "react";
import DraggableCardList, { DraggableCardListProps } from "@/components/custom/framer/draggable-card-list";

export default function DraggableCardListFramerDemo(props: DraggableCardListProps) {
    return (
        <div className="w-full min-h-[580px] sm:min-h-[620px] flex items-center justify-center p-4 bg-background overflow-hidden relative">
            <DraggableCardList {...props} />
        </div>
    );
}
