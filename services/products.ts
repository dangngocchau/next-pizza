import { axiosInstance } from "@/services/instance";
import { Product } from "@prisma/client";
import { ApiRoutes } from "./constant";

export const search = async (query: string): Promise<Product[]> => {
    const { data } = await axiosInstance.get<Product[]>(
        ApiRoutes.SEARCH_PRODUCT,
        {
            params: { query },
        }
    );

    return data;
};
