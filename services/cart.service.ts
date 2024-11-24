import BaseApiService from "@/services/baseApi.service";
import { ApiRoutes } from "@/services/constant";
import { CartDTO } from "@/services/dto/cart.dto";
import { ResponseType as Response } from "@/utils/response.type";

class CartService extends BaseApiService {
    constructor() {
        super();
    }
    async getCart() {
        return this.httpClient.get<Response<CartDTO>>(ApiRoutes.CART);
    }
}

const CartServices = new CartService();
export default CartServices;
