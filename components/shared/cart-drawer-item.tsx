import { cn } from "@/lib/utils";
import React from "react";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "@/components/shared/cart-item-details/cart-item-details.types";
import { CountButton } from "@/components/shared/count-button";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
    className?: string;
}

export const CartDrawerItem = ({ className, imageUrl, details, id, name, price, quantity, disabled }: Props) => {
    return (
        <div className={cn("flex bg-white p-5 gap-6", className)}>
            <CartItem.Image src={imageUrl} />
            <div className="flex-1">
                <CartItem.Info name={name} details={details} />
                <hr className="my-3" />
                <div className="flex items-center justify-between">
                    <CountButton onClick={(type) => console.log(type)} value={quantity} />
                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon className="text-gray-400 cursor-pointer hover:text-gray-600" size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};
