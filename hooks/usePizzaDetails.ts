import { Variant } from "@/components/shared/group-variants";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { calcTotalPizzaPrice } from "@/lib/calc-total-pizza-price";
import { getAvailabeSizes } from "@/lib/get-available-pizza-size";
import ProductServices from "@/services/products.service";
import { Product, ProductItem } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

export interface ReturnProps {
    size: PizzaSize;
    type: PizzaType;
    selectedIngredients: Set<number>;
    availablePizzaSizes: Variant[];
    currentItemId?: number;
    setSize: (size: PizzaSize) => void;
    setType: (size: PizzaType) => void;
    toggleIngredient: (id: number) => void;
}

export const usePizzaDetail = (items: ProductItem[]): ReturnProps => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);

    const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

    const availablePizzaSizes = getAvailabeSizes(items, type);

    const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;

    useEffect(() => {
        const availableSize = availablePizzaSizes.find((item) => !item.disabled);
        if (!availablePizzaSizes.some((item) => item.value === String(size) && !item.disabled) && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type, availablePizzaSizes, size]);

    return {
        size,
        type,
        selectedIngredients,
        availablePizzaSizes,
        setSize,
        setType,
        toggleIngredient,
        currentItemId,
    };
};
