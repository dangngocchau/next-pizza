"use client";

import { Input } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Api } from "@/services/api-client";
import ProductServices from "@/services/products.service";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";

type Props = {
    classMame?: string;
};

export const SearchInput = ({ classMame }: Props) => {
    const [focus, setFocus] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const ref = useRef(null);

    const handleSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const onClickItem = () => {
        setFocus(false);
        setSearchQuery("");
        setProducts([]);
    };

    // Close search input when click outside
    useClickAway(ref, () => {
        setFocus(false);
    });

    //TODO: Store to zustand later
    useDebounce(
        async () => {
            const res = await ProductServices.search(searchQuery);
            setProducts(res.metadata);
        },
        250,
        [searchQuery]
    );

    return (
        <>
            {focus && (
                <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
            )}
            <div
                className={cn(
                    "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
                    classMame
                )}
                ref={ref}
            >
                <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search..."
                    className="rounded-2xl w-full outline-none bg-gray-100 pl-11"
                    onFocus={() => setFocus(true)}
                    value={searchQuery}
                    onChange={handleSearchQuery}
                />
                <div
                    className={cn(
                        "absolute w-full bg-white rounded-2xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
                        focus && "visible opacity-100 top-12"
                    )}
                >
                    {products.length > 0 &&
                        products.map((product) => (
                            <Link
                                className="flex items-center gap-5 px-3 py-2 hover:bg-primary/10"
                                href={"/product/1"}
                                key={`/product/${product.id}`}
                                onClick={onClickItem}
                            >
                                <Image
                                    className="rounded-sm "
                                    src={product.imageUrl}
                                    width={32}
                                    height={32}
                                    alt={product.name}
                                />
                                <span>{product.name}</span>
                            </Link>
                        ))}
                </div>
            </div>
        </>
    );
};
