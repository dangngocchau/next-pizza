import { ProductImage, Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    className?: string;
    name: string;
    imageUrl: string;
    onClickAdd?: VoidFunction;
};

export const ChooseProductForm = ({ className, name, imageUrl, onClickAdd }: Props) => {
    return (
        <div className={cn(className, "flex flex-1")}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <img
                    src={imageUrl}
                    alt={name}
                    className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
                />
            </div>
            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">Lorem ipsum dolor sit.</Button>
            </div>
        </div>
    );
};