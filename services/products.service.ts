import BaseApiService from "@/services/baseApi.service";
import { ApiRoutes } from "@/services/constant";
import { ResponseType as Response } from "@/utils/response.type";
import { Product } from "@prisma/client";

class ProductService extends BaseApiService {
    constructor() {
        super();
    }
    async search(query?: string) {
        return this.httpClient.get<Response<Product[]>>(
            ApiRoutes.SEARCH_PRODUCT,
            {
                params: { query },
            }
        );
    }

    async getProductById(id: number) {
        return this.httpClient.get<Response<Product>>(
            ApiRoutes.GET_PRODUCT_BY_ID.replace(":id", id.toString())
        );
    }
}

const ProductServices = new ProductService();
export default ProductServices;
