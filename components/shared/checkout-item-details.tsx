import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

type Props = {
    className?: string;
    title?: ReactNode;
    value?: string;
};

export function CheckoutItemDetails({ className, title, value }: Props) {
    return (
        <div className={cn("flex my-4", className)}>
            <span className="flex flex-1 text-lg text-neutral-500">
                {title}
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                <span className="font-bold text-lg">{value}$</span>
            </span>
        </div>
    );
}
