import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
};

const categoriesMock = [
    "Pizza type 1",
    "Pizza type 2",
    "Pizza type 3",
    "Pizza type 4",
];
const activeIndex = 0;

export const Categories = ({ className }: Props) => {
    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {categoriesMock.map((category, index) => (
                <a
                    key={index}
                    href=""
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        activeIndex === index &&
                            "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                >
                    <button>{category}</button>
                </a>
            ))}
        </div>
    );
};
