import { IProduct } from "@/@types/prisma";
import ProductServices from "@/services/products.service";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export interface ReturnProps {
    product: IProduct | null;
    loading: boolean;
}

export const useProductModalDetails = (id: number): ReturnProps => {
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                setLoading(true);
                const product = await ProductServices.getProductModalById(id);
                setProduct(product.metadata);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProductDetails();
    }, [id]);

    return {
        product,
        loading,
    };
};
