import { IProduct } from "@/@types/prisma";
import { IngredientItem, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";
import { PizzaImage } from "@/components/shared/pizza-image";
import { Button } from "@/components/ui";
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from "@/constants/pizza";
import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";
import React, { useState } from "react";
import { useSet } from "react-use";

type Props = {
    className?: string;
    name: string;
    imageUrl: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAdd?: VoidFunction;
};

export const ChoosePizzaForm = ({ className, name, ingredients, items, imageUrl, onClickAdd }: Props) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>

                <div className="flex flex-col mt-5">
                    <GroupVariants
                        items={pizzaSizes}
                        selectedValue={String(size)}
                        onClick={(value) => setSize(Number(value) as PizzaSize)}
                    />

                    <GroupVariants
                        items={pizzaTypes}
                        selectedValue={String(type)}
                        onClick={(value) => setType(Number(value) as PizzaType)}
                    />
                </div>

                <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
                    <div className="grid grid-cols-3 gap-3">
                        {ingredients.map((ingredient) => (
                            <IngredientItem
                                key={ingredient.id}
                                name={ingredient.name}
                                imageUrl={ingredient.imageUrl}
                                price={ingredient.price}
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => toggleIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">Lorem ipsum dolor sit.</Button>
            </div>
        </div>
    );
};
