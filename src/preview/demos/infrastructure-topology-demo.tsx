import React from "react";
import InfrastructureTopology, { InfrastructureTopologyProps } from "@/components/custom/infrastructure-topology";

export default function InfrastructureTopologyDemo(props: InfrastructureTopologyProps) {
    return (
        <div className="w-full py-[10px] flex items-center justify-center">
            <InfrastructureTopology {...props} />
        </div>
    );
}
