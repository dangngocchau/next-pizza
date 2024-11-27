import BaseApiService from "@/services/baseApi.service";
import { ApiRoutes } from "@/services/constant";
import { CartDTO, CreateCartItemValues } from "@/services/dto/cart.dto";
import { ResponseType as Response } from "@/utils/response.type";

class CartService extends BaseApiService {
    constructor() {
        super();
    }
    async getCart() {
        return this.httpClient.get<Response<CartDTO>>(ApiRoutes.CART);
    }

    async updateCartItemQuantity(id: number, quantity: number): Promise<Response<CartDTO>> {
        return this.httpClient.patch<Response<CartDTO>>(ApiRoutes.CART_ITEM.replace(":id", id.toString()), {
            quantity,
        });
    }

    async deleteCartItem(id: number): Promise<Response<CartDTO>> {
        return this.httpClient.delete<Response<CartDTO>>(ApiRoutes.CART_ITEM.replace(":id", id.toString()));
    }

    async addCartItem(values: CreateCartItemValues): Promise<Response<CartDTO>> {
        return this.httpClient.post<Response<CartDTO>>(ApiRoutes.CART, values);
    }
}

const CartServices = new CartService();
export default CartServices;
