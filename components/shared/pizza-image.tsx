import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

type Props = {
    className?: string;
    imageUrl: string;
    size: 20 | 30 | 40;
};

export const PizzaImage = ({ className, imageUrl, size }: Props) => {
    const imageSize = {
        20: 300,
        30: 400,
        40: 500,
    }[size];

    return (
        <div className={cn("flex items-center justify-center flex-1 relative w-full", className)}>
            <Image
                src={imageUrl}
                width={imageSize}
                height={imageSize}
                alt="Logo"
                className={"relative left-2 top-2 transition-all z-10 duration-300"}
            />

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
        </div>
    );
};
