export const mapPizzaSize = {
    20: "Small",
    30: "Medium",
    40: "Large",
} as const;

export const mapPizzaType = {
    1: "Traditional",
    2: "Thin",
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
    name,
    value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
    name,
    value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;

// Derive the type for pizzaSizes
export type PizzaSizesType = (typeof pizzaSizes)[number]; // { name: string; value: string | number; }

// Derive the type for pizzaTypes
export type PizzaTypesType = (typeof pizzaTypes)[number]; // { name: string; value: string | number; }
