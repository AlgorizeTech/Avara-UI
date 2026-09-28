import React from "react";
import InfrastructureTopology, { InfrastructureTopologyProps } from "@/components/custom/infrastructure-topology";

export default function InfrastructureTopologyDemo(props: InfrastructureTopologyProps) {
    return (
        <div className="w-full min-h-[600px] flex items-center justify-center p-4 bg-background">
            <InfrastructureTopology {...props} />
        </div>
    );
}
