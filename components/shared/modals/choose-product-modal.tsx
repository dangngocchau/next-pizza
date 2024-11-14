"use client";

import { IProduct } from "@/@types/prisma";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { ChooseProductForm } from "@/components/shared/choose-product-form";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    className?: string;
    product: IProduct | null;
    loading: boolean;
};

export const ChooseProductModal = ({ className, product, loading }: Props) => {
    const router = useRouter();

    // Check if the product has a pizzaType property
    const isPizzaForm = Boolean(product?.items[0].pizzaType);

    if (!product) {
        return null;
    }

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
                    />
                ) : (
                    <ChooseProductForm imageUrl={product?.imageUrl} name={product?.name} />
                )}
            </DialogContent>
        </Dialog>
    );
};
