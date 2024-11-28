"use client";

import { CartDrawer } from "@/components/shared/cart-drawer";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { ArrowRight, ShoppingCart } from "lucide-react";
import React from "react";

type Props = {
    className?: string;
};

export const CartButton = ({ className }: Props) => {
    const { totalAmount, loading, items } = useCartStore();

    return (
        <CartDrawer>
            <Button loading={loading} className={cn("group relative", { "w-[105px]": loading }, className)}>
                <b>{totalAmount}$</b>
                <span className="h-full w-[1px] bg-white/30 mx-3" />
                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                    <ShoppingCart className="h-4 24 relative" strokeWidth={2} size={16} />
                    <b>{items.length}</b>
                </div>
                <ArrowRight
                    size={20}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    );
};
