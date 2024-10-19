"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

type Props = {
    className?: string;
};

const categoriesMock = [
    {
        id: 1,
        name: "Pizza 1",
    },
    {
        id: 2,
        name: "Pizza 2",
    },
    {
        id: 3,
        name: "Pizza 3",
    },
    {
        id: 4,
        name: "Pizza 4",
    },
];

export const Categories = ({ className }: Props) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);

    return (
        <div
            className={cn(
                "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl",
                className
            )}
        >
            {categoriesMock.map(({ name, id }, index) => (
                <a
                    key={index}
                    href=""
                    className={cn(
                        "flex items-center font-bold h-11 rounded-2xl px-5",
                        categoryActiveId === id &&
                            "bg-white shadow-md shadow-gray-200 text-primary"
                    )}
                >
                    <button>{name}</button>
                </a>
            ))}
        </div>
    );
};
