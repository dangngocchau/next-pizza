import { CartStateItem, getCartDetails } from "@/lib/get-cart-details";
import CartServices from "@/services/cart.service";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { create } from "zustand";

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];

    /* Получение товаров из корзины */
    fetchCartItems: () => Promise<void>;

    /* Запрос на обновление количества товара */
    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    /* Запрос на добавление товара в корзину */
    addCartItem: (values: CreateCartItemValues) => Promise<void>;

    /* Запрос на удаление товара из корзины */
    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,
    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const response = await CartServices.getCart();
            const data = getCartDetails(response.metadata);
            console.log(data);
            set({ ...data });
        } catch (error) {
            set({ error: true, loading: false });
        } finally {
            set({ loading: false });
        }
    },
    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await CartServices.updateCartItemQuantity(id, quantity);
            set(getCartDetails(data.metadata));
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    removeCartItem: async (id: number) => {
        try {
            set({ loading: true, error: false });
            const data = await CartServices.deleteCartItem(id);
            set(getCartDetails(data.metadata));
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await CartServices.addCartItem(values);
            set(getCartDetails(data.metadata));
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },
}));
