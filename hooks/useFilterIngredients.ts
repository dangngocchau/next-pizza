import { Api } from "@/services/api-client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

export type Ingredient = {
    text: string;
    value: string;
};

export interface PriceRangeProps {
    priceFrom?: number;
    priceTo?: number;
}

export interface ReturnProps {
    ingredientData: Ingredient[];
    loading: boolean;
    sizes: Set<string>;
    types: Set<string>;
    ingredients: Set<string>;
    toggleSizes: (size: string) => void;
    toggleTypes: (type: string) => void;
    toggleIngredients: (ingredient: string) => void;
    updatePriceRange: (values: Partial<PriceRangeProps>) => void;
    priceRange: PriceRangeProps;
}

interface QueryFilters extends PriceRangeProps {
    sizes: string[];
    types: string[];
    ingredients: string[];
}

//TODO: Implement the useFilter hook
export const useFilter = (): ReturnProps => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    console.log("🐖 ~ useFilter ~ searchParams:", searchParams);

    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [types, { toggle: toggleTypes }] = useSet(new Set<string>([]));
    const [ingredients, { toggle: toggleIngredients }] = useSet(new Set<string>([]));

    const [loading, setLoading] = useState<boolean>(false);
    const [ingredientData, setIngredientData] = useState<Ingredient[]>([]);
    const [priceRange, setPriceRange] = useState<PriceRangeProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const updatePriceRange = (values: Partial<PriceRangeProps>) => {
        setPriceRange((prev) => ({
            ...prev,
            ...values,
        }));
    };

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                const convertedIngredients = ingredients.map((ingredient) => ({
                    text: ingredient.name,
                    value: String(ingredient.id),
                }));
                setIngredientData(convertedIngredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    return {
        sizes,
        types,
        ingredients,
        toggleSizes,
        toggleTypes,
        toggleIngredients,
        ingredientData,
        loading,
        updatePriceRange,
        priceRange,
    };
};
