import { CheckoutItem } from "@/components/shared/checkout-item";
import { CheckoutItemSkeleton } from "@/components/shared/checkout-item-skeleton";
import { WhiteBlock } from "@/components/shared/white-block";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import { CartStateItem } from "@/lib/get-cart-details";
import { getCartItemDetail } from "@/lib/get-cart-item-detail";

type Props = {
    className?: string;
    items: CartStateItem[];
    handleClickCountButton: (type: "plus" | "minus", id: number, quantity: number) => void;
    removeCartItem: (id: number) => void;
    loading?: boolean;
};

export const CheckoutCart = ({ className, items, handleClickCountButton, removeCartItem, loading }: Props) => {
    return (
        <WhiteBlock title="1. Cart">
            <div className="flex flex-col gap-5">
                {loading
                    ? [...Array(4)].map((_, i) => <CheckoutItemSkeleton key={i} className="h-20" />)
                    : items.map((item) => (
                          <CheckoutItem
                              key={item.id}
                              id={item.id}
                              name={item.name}
                              price={item.price}
                              imageUrl={item.imageUrl}
                              quantity={item.quantity}
                              details={getCartItemDetail(
                                  item.pizzaType as PizzaType,
                                  item.pizzaSize as PizzaSize,
                                  item.ingredients
                              )}
                              onClickCountButton={(type) => handleClickCountButton(type, item.id, item.quantity)}
                              onClickRemove={() => removeCartItem(item.id)}
                          />
                      ))}
            </div>
        </WhiteBlock>
    );
};
