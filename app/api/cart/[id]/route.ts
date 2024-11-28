import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { calcCartItemTotalPrice } from "@/lib/calc-cart-item-total-price";

const getCartItem = async (id: number) => {
    return await prisma.cartItem.findFirst({ where: { id } });
};

const updateCartItemQuantity = async (id: number, quantity: number) => {
    return await prisma.cartItem.update({
        where: { id },
        data: { quantity },
    });
};

const getUserCart = async (token: string) => {
    return await prisma.cart.findFirst({
        where: { token },
        include: {
            items: {
                orderBy: { createdAt: "desc" },
                include: {
                    productItem: { include: { product: true } },
                    ingredients: true,
                },
            },
        },
    });
};

export const updateCartTotalAmount = async (cartId: number, token: string) => {
    const userCart = await getUserCart(token);

    if (!userCart) {
        return handleResponse(null, "Cart not found");
    }

    const cartTotalAmount = userCart?.items.reduce((acc, item) => acc + calcCartItemTotalPrice(item), 0);

    return await prisma.cart.update({
        where: { id: userCart.id },
        data: { totalAmount: cartTotalAmount },
        include: {
            items: {
                orderBy: { createdAt: "desc" },
                include: {
                    productItem: { include: { product: true } },
                    ingredients: true,
                },
            },
        },
    });
};
export const PATCH = tryCatchWrapper(async (req: NextRequest, params) => {
    const token = req.cookies.get("cartToken")?.value;
    const { quantity } = (await req.json()) as { quantity: number };
    const id = Number(params?.params.id);

    if (!token) {
        return NextResponse.json({ message: "Cart token not found" });
    }

    const cartItem = await getCartItem(id);
    if (!cartItem) {
        return NextResponse.json({ message: "Cart item not found" });
    }

    await updateCartItemQuantity(id, quantity);

    const updatedCart = await updateCartTotalAmount(id, token);

    return handleResponse(updatedCart, "Updated cart successfully");
});

export const DELETE = tryCatchWrapper(async (req: NextRequest, params) => {
    const token = req.cookies.get("cartToken")?.value;
    const id = Number(params?.params.id);

    if (!token) {
        return NextResponse.json({ message: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: { id: Number(id) },
    });

    if (!cartItem) {
        return NextResponse.json({ message: "Cart item not found" });
    }

    const deletedItem = await prisma.cartItem.delete({ where: { id } });

    const updatedCart = await updateCartTotalAmount(id, token);

    return handleResponse(updatedCart, "Delete cart successfully");
});
