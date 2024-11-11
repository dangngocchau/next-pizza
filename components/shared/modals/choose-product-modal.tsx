"use client";

import { Title } from "@/components/shared/title";
import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
    className?: string;
    product: Product | null;
    loading: boolean;
};

export const ChooseProductModal = ({ className, product, loading }: Props) => {
    const router = useRouter();

    return (
        <Dialog open={true} onOpenChange={() => router.back()}>
            <DialogContent
                className={cn("p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden", className)}
            >
                {loading && !product ? <span>Loading...</span> : <Title text={product?.name as string} />}
            </DialogContent>
        </Dialog>
    );
};
