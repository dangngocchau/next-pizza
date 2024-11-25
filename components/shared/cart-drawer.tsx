"use client";

import { CartDrawerItem } from "@/components/shared/cart-drawer-item";
import { Button } from "@/components/ui";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { getCartItemDetail } from "@/lib/get-cart-item-detail";
import { useCartStore } from "@/store/cart";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const CartDrawer = ({ className, children }: Props) => {
    const { items, fetchCartItems, totalAmount, updateItemQuantity, removeCartItem } = useCartStore();

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    const handleClickCountButton = (type: "plus" | "minus", id: number, quantity: number) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <SheetHeader>
                    <SheetTitle>
                        <span className="font-bold">{items.length} Items In Your Cart</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                    {items.map((item) => (
                        <CartDrawerItem
                            key={item.id}
                            details={getCartItemDetail(
                                item.pizzaType as PizzaType,
                                item.pizzaSize as PizzaSize,
                                item.ingredients
                            )}
                            imageUrl={item.imageUrl}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            quantity={item.quantity}
                            onClickCountButton={(type) => handleClickCountButton(type, item.id, item.quantity)}
                            onClickRemoveItem={() => removeCartItem(item.id)}
                        />
                    ))}
                </div>

                <SheetFooter className="-mx-6 bg-white p-8">
                    <div className="w-full">
                        <div className="flex mb-4">
                            <span className="flex flex-1 text-lg text-neutral-500">
                                Total
                                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                            </span>
                            <span className="font-bold text-lg">{totalAmount}$</span>
                        </div>
                        <Link href={"/cart"}>
                            <Button type="submit" className="w-full h-12 text-base">
                                Place Order
                                <ArrowRight className="w-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
