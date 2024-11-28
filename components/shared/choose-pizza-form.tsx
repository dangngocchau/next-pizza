import { IngredientItem, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";
import { PizzaImage } from "@/components/shared/pizza-image";
import { Button } from "@/components/ui";
import { mapPizzaType, PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { usePizzaDetail } from "@/hooks/usePizzaDetails";
import { calcTotalPizzaPrice } from "@/lib/calc-total-pizza-price";
import { cn } from "@/lib/utils";
import { Ingredient, ProductItem } from "@prisma/client";

type Props = {
    className?: string;
    name: string;
    imageUrl: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onSubmit: (id: number, ingredients: number[]) => void;
    loading?: boolean;
};

export const ChoosePizzaForm = ({ className, name, ingredients, items, imageUrl, onSubmit, loading }: Props) => {
    const { size, type, selectedIngredients, availablePizzaSizes, setSize, setType, toggleIngredient, currentItemId } =
        usePizzaDetail(items);

    const totalPrice = calcTotalPizzaPrice(items, ingredients, size, type, selectedIngredients);

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    };

    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <p className="text-gray-400">{`${size} cm, ${mapPizzaType[type]} pizza`}</p>

                <div className="flex flex-col mt-5">
                    <GroupVariants
                        items={availablePizzaSizes}
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

                <Button
                    onClick={handleClickAdd}
                    loading={loading}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                >{`Add To Cart With ${totalPrice}$`}</Button>
            </div>
        </div>
    );
};
