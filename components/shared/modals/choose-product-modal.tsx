"use client";

import { IProduct } from "@/@types/prisma";
import { ProductForm } from "@/components/shared/product-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
    className?: string;
    product: IProduct | null;
};

export const ChooseProductModal = ({ className, product }: Props) => {
    const router = useRouter();

    if (!product) {
        return null;
    }

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                <ProductForm product={product} />
            </DialogContent>
        </Dialog>
    );
};
