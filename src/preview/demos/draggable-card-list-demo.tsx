import React from "react";
import DraggableCardList, { DraggableCardListProps } from "@/components/custom/draggable-card-list";

export default function DraggableCardListDemo(props: DraggableCardListProps) {
    return (
        <div className="w-full min-h-[450px] flex items-center justify-center p-4 bg-background">
            <DraggableCardList {...props} />
        </div>
    );
}
