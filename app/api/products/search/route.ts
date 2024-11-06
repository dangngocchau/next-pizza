import { prisma } from "@/prisma/prisma-client";
import { NextRequest } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const GET = tryCatchWrapper(async (req: NextRequest) => {
    const query = req.nextUrl.searchParams.get("query") || "";

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: query,
                mode: "insensitive",
            },
        },
        take: 5,
    });

    return handleResponse(products, "Fetched products successfully");
});
