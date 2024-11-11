import { Title } from "@/components/shared";
import { Button } from "@/components/ui";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    className?: string;
    id: number;
    price: number;
    imageUrl?: string;
    name: string;
};

export const ProductCard = ({ className, id, name, price, imageUrl }: Props) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
                    <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
                </div>
                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
                <p className="text-sm text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae iure fuga ab quod provident aut
                    similique labore tempora vero repellendus.
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[20px]">
                        <b>{price}</b>
                    </span>

                    <Button variant="secondary">
                        <Plus size={20} className="w-5 h-5 mr-1" />
                        Add To Cart
                    </Button>
                </div>
            </Link>
        </div>
    );
};
