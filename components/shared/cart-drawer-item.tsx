import { cn } from "@/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "@/components/shared/cart-item-details/cart-item-details.types";
import { CountButton } from "@/components/shared/count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemoveItem?: () => void;
    className?: string;
}

export const CartDrawerItem = ({
    className,
    imageUrl,
    details,
    name,
    price,
    quantity,
    disabled,
    onClickCountButton,
    onClickRemoveItem,
}: Props) => {
    return (
        <div
            className={cn(
                "flex bg-white p-5 gap-6",
                {
                    "opacity-50 pointer-events-none": disabled,
                },
                className
            )}
        >
            <CartItem.Image src={imageUrl} />
            <div className="flex-1">
                <CartItem.Info name={name} details={details} />
                <hr className="my-3" />
                <div className="flex items-center justify-between">
                    <CountButton onClick={onClickCountButton} value={quantity} />
                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon
                            onClick={onClickRemoveItem}
                            className="text-gray-400 cursor-pointer hover:text-gray-600"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
