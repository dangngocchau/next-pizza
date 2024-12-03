import { CartButton, Container, SearchInput } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import Image from "next/image";
import React from "react";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    hasSearch?: boolean;
    hasCart?: boolean;
    className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className, hasSearch = true, hasCart = true }) => {
    return (
        <header className={cn("border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/svg/logo.svg" alt="logo" width={35} height={35} />
                        <div>
                            <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                            <p className="text-sm text-gray-400 leading-3">Supper delicious</p>
                        </div>
                    </div>
                </Link>
                {hasSearch && (
                    <div className="mx-10 flex-1">
                        <SearchInput />
                    </div>
                )}
                {/* Button Action */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="flex items-center gap-1">
                        <User size={16} />
                        Profile
                    </Button>
                    {hasCart && <CartButton />}
                </div>
            </Container>
        </header>
    );
};
