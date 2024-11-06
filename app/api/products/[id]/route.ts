import { prisma } from "@/prisma/prisma-client";
import { NextRequest } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";

export const GET = tryCatchWrapper(async (req: NextRequest) => {
    const id = req.nextUrl.searchParams.get("id");

    const product = await prisma.product.findUnique({
        where: { id: Number(id) },
    });

    console.log("product", product, id);

    return handleResponse(product, "Fetched products successfully");
});
