import { CheckoutItemDetails } from "@/components/shared/checkout-item-details";
import { WhiteBlock } from "@/components/shared/white-block";
import { Button } from "@/components/ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import React from "react";

const VAT = 15;
const DELIVERY_FEE = 250;

type Props = {
    totalAmount: number;
    className?: string;
};

export default function CheckoutSidebar({ className, totalAmount }: Props) {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_FEE;

    return (
        <WhiteBlock className="p-6 sticky top-4">
            <div className="flex flex-col gap-1">
                <span className="text-xl">Total</span>
                <span className="font-extrabold text-4xl">{totalPrice}$</span>
            </div>

            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Package className="mr-2 text-gray-400" size={18} />
                        Price
                    </div>
                }
                value={`${totalAmount}`}
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Percent className="mr-2 text-gray-400" size={18} />
                        VAT
                    </div>
                }
                value={String(vatPrice)}
            />
            <CheckoutItemDetails
                title={
                    <div className="flex items-center">
                        <Truck className="mr-2 text-gray-500" size={18} />
                        Shipping Fee
                    </div>
                }
                value={String(DELIVERY_FEE)}
            />
            <Button type="submit" className="w-full h-14 rounded-2xl text-base font-bold">
                Paid
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    );
}
