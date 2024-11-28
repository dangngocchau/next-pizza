"use client";

import { IProduct } from "@/@types/prisma";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/components/shared/choose-product-form";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

type Props = {
    className?: string;
    product: IProduct | null;
};

export const ChooseProductModal = ({ className, product }: Props) => {
    const router = useRouter();

    // Check if the product has a pizzaType property
    const isPizzaForm = Boolean(product?.items[0].pizzaType);

    const { addCartItem, loading } = useCartStore((state) => state);

    if (!product) {
        return null;
    }

    const onSubmit = (productItemId?: number, ingredients?: number[]) => {
        const itemId = productItemId || product.items[0].id;

        addCartItem(
            {
                productItemId: itemId,
                ingredients,
            },
            product.name
        );
    };

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                {isPizzaForm ? (
                    <ChoosePizzaForm
                        imageUrl={product?.imageUrl}
                        name={product?.name}
                        ingredients={product.ingredients}
                        items={product.items}
                        onSubmit={onSubmit}
                        loading={loading}
                    />
                ) : (
                    <ChooseProductForm
                        imageUrl={product?.imageUrl}
                        name={product?.name}
                        onSubmit={onSubmit}
                        price={product.items[0].price}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};
