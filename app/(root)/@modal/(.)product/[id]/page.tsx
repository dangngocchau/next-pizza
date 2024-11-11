"use client";

import { ChooseProductModal } from "@/components/shared/modals/choose-product-modal";
import { useProductModalDetails } from "@/hooks/useProductModalDetails";
import { notFound } from "next/navigation";

type ProductPageModalPageProps = {
    params: { id: string };
};

export default function ProductPageModalPage({ params: { id } }: ProductPageModalPageProps) {
    const { product, loading } = useProductModalDetails(Number(id));

    return <ChooseProductModal product={product} loading={loading} />;
}
