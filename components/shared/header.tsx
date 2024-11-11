import { Container, SearchInput } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import Image from "next/image";
import React from "react";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

type HeaderProps = {
    className?: string;
};

export const Header: React.FC<HeaderProps> = ({ className }) => {
    return (
        <header className={cn("border border-b", className)}>
            <Container className="flex items-center justify-between py-8">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/svg/logo.svg"
                            alt="logo"
                            width={35}
                            height={35}
                        />
                        <div>
                            <h1 className="text-2xl uppercase font-black">
                                Next Pizza
                            </h1>
                            <p className="text-sm text-gray-400 leading-3">
                                Supper delicious
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="mx-10 flex-1">
                    <SearchInput />
                </div>
                {/* Button Action */}
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="flex items-center gap-1"
                    >
                        <User size={16} />
                        Profile
                    </Button>
                    <div>
                        <Button className="group relative">
                            <b>520 $</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3" />
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart
                                    className="h-4 24 relative"
                                    strokeWidth={2}
                                    size={16}
                                />
                                <b>3</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </div>
                </div>
            </Container>
        </header>
    );
};
