import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

type Ingredient = {
    text: string;
    value: string;
};

interface PriceRangeProps {
    priceFrom: number;
    priceTo: number;
}

interface ReturnProps {
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

//TODO: Implement the useFilter hook
export const useFilter = (): ReturnProps => {
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
    const [types, { toggle: toggleTypes }] = useSet(new Set<string>([]));
    const [ingredients, { toggle: toggleIngredients }] = useSet(new Set<string>([]));

    const [loading, setLoading] = useState<boolean>(false);
    const [ingredientData, setIngredientData] = useState<Ingredient[]>([]);
    const [priceRange, setPriceRange] = useState<PriceRangeProps>({
        priceFrom: 0,
        priceTo: 1000,
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
