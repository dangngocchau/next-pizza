import { prisma } from "@/prisma/prisma-client";
import { NextRequest } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const GET = tryCatchWrapper(async (req: NextRequest, params) => {
    const id = params?.params.id;

    const product = await prisma.product.findFirst({
        where: { id: Number(id) },
        include: {
            ingredients: true,
            category: {
                include: {
                    products: {
                        include: {
                            items: true,
                        },
                    },
                },
            },
            items: true,
        },
    });

    return handleResponse(product, "Fetched products successfully");
});
