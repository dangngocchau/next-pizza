import { useIngredients } from "@/hooks/useIngredients";
import { Api } from "@/services/api-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSet } from "react-use";

export type Ingredient = {
    text: string;
    value: string;
};

export interface PriceRangeProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceRangeProps {
    sizes: string[];
    types: string[];
    ingredients: string[];
}

export interface Filters {
    sizes: Set<string>;
    types: Set<string>;
    ingredients: Set<string>;
    priceRange: PriceRangeProps;
}

interface ReturnProps extends Filters {
    updatePriceRange: (values: Partial<PriceRangeProps>) => void;
    toggleTypes: (value: string) => void;
    toggleSizes: (value: string) => void;
    toggleIngredients: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    const [sizes, { toggle: toggleSizes }] = useSet(
        new Set<string>(searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : [])
    );

    const [types, { toggle: toggleTypes }] = useSet(
        new Set<string>(searchParams.has("types") ? searchParams.get("types")?.split(",") : [])
    );

    const [ingredients, { toggle: toggleIngredients }] = useSet(
        new Set<string>(searchParams.has("ingredients") ? searchParams.get("ingredients")?.split(",") : [])
    );

    const [priceRange, setPriceRange] = useState<PriceRangeProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePriceRange = useCallback((values: Partial<PriceRangeProps>) => {
        setPriceRange((prev) => ({
            ...prev,
            ...values,
        }));
    }, []);

    return useMemo(
        () => ({
            sizes,
            types,
            ingredients,
            toggleSizes,
            toggleTypes,
            toggleIngredients,
            updatePriceRange,
            priceRange,
        }),
        [sizes, types, ingredients, priceRange, toggleSizes, toggleTypes, toggleIngredients, updatePriceRange]
    );
};
