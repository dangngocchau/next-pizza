"use client";

import { ChooseProductForm, Container, ProductImage, Title } from "@/components/shared";
import { ChoosePizzaForm } from "@/components/shared/choose-pizza-form";
import { GroupVariants } from "@/components/shared/group-variants";
import { ProductForm } from "@/components/shared/product-form";
import { useProductDetails } from "@/hooks/useProductDetails";
import { notFound } from "next/navigation";

type ProductPageProps = {
    params: { id: string };
};

export default function ProductPage({ params: { id } }: ProductPageProps) {
    const { product, loading } = useProductDetails(Number(id));

    if (!product) {
        return;
    }

    return (
        <Container className="flex flex-col my-10">
            <ProductForm product={product} />
        </Container>
    );
}
