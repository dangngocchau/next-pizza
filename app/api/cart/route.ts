import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { handleResponse } from "@/utils/handleResponse";
import { tryCatchWrapper } from "@/utils/tryCatchWrapper";
import { CreateCartItemValues } from "@/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/app/api/cart/[id]/route";

const findOrCreateCart = async (token: string) => {
    let userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
    });

    if (!userCart) {
        userCart = await prisma.cart.create({
            data: {
                token,
            },
        });
    }

    return userCart;
};

export const GET = tryCatchWrapper(async (req: NextRequest) => {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
        return NextResponse.json({
            message: "Cart is empty",
            item: [],
            totalAmount: 0,
        });
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

export const POST = tryCatchWrapper(async (req: NextRequest) => {
    let token = req.cookies.get("cartToken")?.value;
    const body = (await req.json()) as CreateCartItemValues;
    if (!token) {
        token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    console.log("userCart", userCart);

    const findCartItem = await prisma.cartItem.findFirst({
        where: {
            cartId: userCart.id,
            productItemId: body.productItemId,
            ingredients: {
                every: {
                    id: {
                        in: body.ingredients,
                    },
                },
            },
        },
    });

    if (findCartItem) {
        await prisma.cartItem.update({
            where: {
                id: findCartItem.id,
            },
            data: {
                quantity: findCartItem.quantity + 1,
            },
        });

        const updatedCart = await updateCartTotalAmount(userCart.id, token);
        const resp = NextResponse.json(updatedCart);
        resp.cookies.set("cartToken", token);
        return resp;
    }

    await prisma.cartItem.create({
        data: {
            cartId: userCart.id,
            productItemId: body.productItemId,
            quantity: 1,
            ingredients: { connect: body.ingredients?.map((id) => ({ id })) },
        },
    });

    const updatedUserCart = await updateCartTotalAmount(userCart.id, token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set("cartToken", token);
    return resp;
});
