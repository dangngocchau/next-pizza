import { IProduct } from "@/@types/prisma";
import ProductServices from "@/services/products.service";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export interface ReturnProps {
    product: IProduct | undefined;
    loading: boolean;
}

export const useProductDetails = (id: number): ReturnProps => {
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct>();

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                setLoading(true);
                const product = await ProductServices.getProductById(id);
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
