import { pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductItem } from "@prisma/client";

export const getAvailabeSizes = (items: ProductItem[], type: PizzaType) => {
    const filteredPizzaByType = items.filter((item) => item.pizzaType === type);
    const availablePizzaSizes = pizzaSizes.map((item) => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzaByType.some((pizza) => pizza.size === Number(item.value)),
    }));

    return availablePizzaSizes;
};
