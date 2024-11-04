import { Api } from "@/services/api-client";
import { useEffect, useState } from "react";

export type Ingredient = {
    text: string;
    value: string;
};

export interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
}

export const useIngredients = (): ReturnProps => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ingredients, setIngredient] = useState<Ingredient[]>([]);

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true);
                const ingredients = await Api.ingredients.getAll();
                const convertedIngredients = ingredients.map((ingredient) => ({
                    text: ingredient.name,
                    value: String(ingredient.id),
                }));
                setIngredient(convertedIngredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchIngredients();
    }, []);

    return {
        ingredients,
        loading,
    };
};
