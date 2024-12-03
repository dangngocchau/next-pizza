"use client";

import { Container, Title } from "@/components/shared";
import { CheckoutItem } from "@/components/shared/checkout-item";
import { CheckoutItemDetails } from "@/components/shared/checkout-item-details";
import CheckoutSidebar from "@/components/shared/checkout-sidebar";
import { WhiteBlock } from "@/components/shared/white-block";
import { Button, Input } from "@/components/ui";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { useCart } from "@/hooks/use-cart";
import { getCartItemDetail } from "@/lib/get-cart-item-detail";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

type Props = {
    className?: string;
};

export default function CheckoutPage({ className }: Props) {
    const { loading, totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

    const handleClickCountButton = (type: "plus" | "minus", id: number, quantity: number) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-5">
            <Title text="Checkout" size="xl" className="font-extrabold mb-8" />
            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Cart">
                        <div className="flex flex-col gap-5">
                            {items.map((item) => (
                                <CheckoutItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    price={item.price}
                                    imageUrl={item.imageUrl}
                                    quantity={item.quantity}
                                    details={getCartItemDetail(
                                        item.pizzaType as PizzaType,
                                        item.pizzaSize as PizzaSize,
                                        item.ingredients
                                    )}
                                    onClickCountButton={(type) => handleClickCountButton(type, item.id, item.quantity)}
                                    onClickRemove={() => removeCartItem(item.id)}
                                />
                            ))}
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="2. Test">
                        <div className="grid grid-cols-2 gap-5">
                            <Input name="firstName" className="text-base" placeholder="Enter name..." />
                            <Input name="firstName" className="text-base" placeholder="Enter name..." />
                            <Input name="firstName" className="text-base" placeholder="Enter name..." />
                            <Input name="firstName" className="text-base" placeholder="Enter name..." />
                        </div>
                    </WhiteBlock>

                    <WhiteBlock title="3. Test">
                        <div className="flex flex-col gap-5">
                            <Input name="firstName" className="text-base" placeholder="Enter name..." />
                            <textarea className="text-base" placeholder="" rows={5} />
                        </div>
                    </WhiteBlock>
                </div>

                <div className="w-[450px]">
                    <CheckoutSidebar totalAmount={totalAmount} />
                </div>
            </div>
        </Container>
    );
}
