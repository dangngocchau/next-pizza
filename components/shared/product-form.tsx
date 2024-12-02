"use client";

import { IProduct } from "@/@types/prisma";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/components/shared/choose-product-form";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    product: IProduct;
};

export const ProductForm = ({ product }: Props) => {
    const router = useRouter();
    const { addCartItem, loading } = useCartStore((state) => state);

    const firstItem = product.items[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType);

    const onSubmit = (productItemId?: number, ingredients?: number[]) => {
        const itemId = productItemId || product.items[0].id;

        addCartItem(
            {
                productItemId: itemId,
                ingredients,
            },
            product.name
            // () => router.back()
        );
    };

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm
                imageUrl={product?.imageUrl}
                name={product?.name}
                ingredients={product.ingredients}
                items={product.items}
                onSubmit={onSubmit}
                loading={loading}
            />
        );
    }

    return (
        <ChooseProductForm
            imageUrl={product?.imageUrl}
            name={product?.name}
            onSubmit={onSubmit}
            price={product.items[0].price}
            loading={loading}
        />
    );
};
