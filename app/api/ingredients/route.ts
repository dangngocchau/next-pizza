import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const ingredients = await prisma.ingredient.findMany();
    return NextResponse.json(ingredients);
}
