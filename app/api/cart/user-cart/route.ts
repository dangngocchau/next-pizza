import { prisma } from "@/prisma/prisma-client";
import { NextRequest } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { calcCartItemTotalPrice } from "@/lib/calc-cart-item-total-price";

export const POST = tryCatchWrapper(async (req: NextRequest) => {
    const body = (await req.json()) as { token: string };

    const userCart = await prisma.cart.findFirst({
        where: {
            token: body.token,
        },
        include: {
            items: {
                include: {
                    productItem: {
                        include: {
                            product: true,
                        },
                    },
                    ingredients: true,
                },
            },
        },
    });

    if (!userCart) {
        return handleResponse(userCart, "Cart is empty");
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
    });

    return handleResponse(userCart, "Fetched products successfully");
});
