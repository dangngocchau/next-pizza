"use client";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
};

interface Props {
    items: readonly Variant[];
    onClick?: (value: Variant["value"]) => void;
    className?: string;
    selectedValue?: string;
}

export const GroupVariants = ({ className, items, onClick, selectedValue }: Props) => {
    return (
        <div className={cn(className, "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none")}>
            {items.map((item, index) => (
                <Button
                    key={item.name}
                    onClick={() => onClick?.(item.value)}
                    className={cn(
                        "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
                        {
                            "bg-white shadow": selectedValue === item.value,
                            "text-gray-500 opacity-50 pointer-events-none": item.disabled,
                        }
                    )}
                >
                    {item.name}
                </Button>
            ))}
        </div>
    );
};
