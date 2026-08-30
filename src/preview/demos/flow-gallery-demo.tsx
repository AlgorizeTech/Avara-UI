import React from "react";
import { FlowGallery, FlowGalleryProps } from "@/components/custom/flow-gallery";

export default function FlowGalleryDemo(props: FlowGalleryProps) {
    return (
        <div className="w-full flex items-center justify-center p-0">
            <FlowGallery {...props} />
        </div>
    );
}
