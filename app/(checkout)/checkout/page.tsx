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
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckoutCart } from "@/components/shared/checkout/checkout-cart";
import { CheckoutPersonalForm } from "@/components/shared/checkout/checkout-personal-form";
import { CheckoutAddressForm } from "@/components/shared/checkout/checkout-address-form";
import { checkoutFormSchema, CheckoutFormValues } from "@/schema/checkout/checkout-form";

type Props = {
    className?: string;
};

export default function CheckoutPage({ className }: Props) {
    const { loading, totalAmount, updateItemQuantity, items, removeCartItem } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            comment: "",
        },
    });

    const handleClickCountButton = (type: "plus" | "minus", id: number, quantity: number) => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
    };

    return (
        <Container className="mt-5">
            <Title text="Checkout" size="xl" className="font-extrabold mb-8" />
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart
                                handleClickCountButton={handleClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                                loading={loading}
                            />
                            <CheckoutPersonalForm disabled={loading} />
                            <CheckoutAddressForm disabled={loading} />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    );
}
