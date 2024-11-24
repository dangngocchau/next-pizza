import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const PATCH = tryCatchWrapper(async (req: NextRequest, params) => {
    const id = Number(params?.params.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
        return NextResponse.json({ message: "Cart token not found" });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id,
        },
    });

    if (!cartItem) {
        return NextResponse.json({ message: "Cart item not found" });
    }

    await prisma.cartItem.update({
        where: {
            id,
        },
        data: {
            quantity: data.quantity,
        },
    });

    return handleResponse(cartItem, "Fetched products successfully");
});
