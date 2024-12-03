"use client";

import { CartDrawerItem } from "@/components/shared/cart-drawer-item";
import { Title } from "@/components/shared/title";
import { Button } from "@/components/ui";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useCart } from "@/hooks/use-cart";
import { getCartItemDetail } from "@/lib/get-cart-item-detail";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
    className?: string;
    children: React.ReactNode;
};

export const CartDrawer = ({ className, children }: Props) => {
    const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
    const [redirecting, setRedirecting] = useState(false);

    const handleClickCountButton = (type: "plus" | "minus", id: number, quantity: number) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
                <div className={cn("flex flex-col h-full", !totalAmount && "justify-center")}>
                    {totalAmount > 0 && (
                        <SheetHeader>
                            <SheetTitle>
                                <span className="font-bold">{items.length} Items In Your Cart</span>
                            </SheetTitle>
                        </SheetHeader>
                    )}

                    {!totalAmount && (
                        <div className="flex flex-col items-center justify-center w-72 mx-auto">
                            <Image src="/assets/images/empty-box.png" alt="Empty Cart" width={120} height={120} />
                            <Title size="sm" text="Empty Cart" className="text-center font-bold my-2" />
                            <p className="text-center text-neutral-500 mb-5">
                                Please buy something to see it in your cart.
                            </p>

                            <SheetClose>
                                <Button className="w-56 h-12 text-base">
                                    <ArrowLeft className="w-5 mr-2" />
                                    Go Back
                                </Button>
                            </SheetClose>
                        </div>
                    )}

                    {totalAmount > 0 && (
                        <>
                            <div className="-mx-6 mt-5 overflow-auto flex-1 scrollbar">
                                {items.map((item) => (
                                    <div className="mb-2" key={item.id}>
                                        <CartDrawerItem
                                            details={getCartItemDetail(
                                                item.pizzaType as PizzaType,
                                                item.pizzaSize as PizzaSize,
                                                item.ingredients
                                            )}
                                            imageUrl={item.imageUrl}
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            disabled={item.disabled}
                                            quantity={item.quantity}
                                            onClickCountButton={(type) =>
                                                handleClickCountButton(type, item.id, item.quantity)
                                            }
                                            onClickRemoveItem={() => removeCartItem(item.id)}
                                        />
                                    </div>
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
                                    <Link href={"/checkout"}>
                                        <Button
                                            onClick={() => setRedirecting(true)}
                                            type="submit"
                                            className="w-full h-12 text-base"
                                        >
                                            Place Order
                                            <ArrowRight className="w-5 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </SheetFooter>
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
};
