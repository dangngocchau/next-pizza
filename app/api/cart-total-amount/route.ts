import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { calcCartItemTotalPrice } from "@/lib/calc-cart-item-total-price";

export const PATCH = tryCatchWrapper(async (req: NextRequest, params) => {
    const data = (await req.json()) as { token: number };
    const userCart = await prisma.cart.findFirst({
        where: {
            token: data.token,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: "desc",
                },
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
        return;
    }

    const totalAmount = userCart.items.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    const updateCart = await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
        include: {
            items: {
                orderBy: {
                    createdAt: "desc",
                },
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

    return handleResponse(updateCart, "Updated cart successfully");
});
