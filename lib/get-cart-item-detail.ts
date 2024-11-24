import { PizzaType, PizzaSize, mapPizzaType } from "@/constants/pizza";
import { CartStateItem } from "@/lib/get-cart-details";
import { Ingredient } from "@prisma/client";

export const getCartItemDetail = (
    pizzaType: PizzaType | null,
    pizzaSize: PizzaSize | null,
    ingredients: CartStateItem["ingredients"]
) => {
    const details = [];

    if (pizzaSize && pizzaType) {
        const typeName = mapPizzaType[pizzaType];
        details.push(`${typeName} - ${pizzaSize}cm`);
    }

    if (ingredients) {
        details.push(...ingredients.map((ingredient) => ingredient.name));
    }

    return details.join(", ");
};
