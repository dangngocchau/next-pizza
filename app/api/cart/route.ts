import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const GET = tryCatchWrapper(async (req: NextRequest) => {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
        return NextResponse.json({ message: "Cart is empty", item: [], totalAmount: 0 });
    }

    const userCart = await prisma.cart.findFirst({
        where: {
            OR: [
                {
                    token,
                },
            ],
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

    return handleResponse(userCart, "Fetched products successfully");
});
