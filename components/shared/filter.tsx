"use client";

import { CheckboxFiltersGroup, RangeSlider, Title } from "@/components/shared";
import { Input } from "@/components/ui";
import { useFiltersQuery } from "@/hooks/useFilterQuery";
import { useFilters } from "@/hooks/useFilters";
import { useIngredients } from "@/hooks/useIngredients";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect } from "react";

type Props = {
    className?: string;
};

export const Filters = ({ className }: Props) => {
    const { ingredients: ingredientItems, loading } = useIngredients();
    const filters = useFilters();

    useFiltersQuery(filters);

    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />

            {/* Size  */}
            <CheckboxFiltersGroup
                title="Size"
                className="mb-5"
                name="sizes"
                items={[
                    { text: "20cm", value: "20" },
                    { text: "30cm", value: "30" },
                    { text: "40cm", value: "40" },
                ]}
                loading={loading}
                onClickCheckbox={filters.toggleSizes}
                selected={filters.sizes}
            />

            {/* Type  */}
            <CheckboxFiltersGroup
                title="Size"
                className="mb-5"
                name="sizes"
                items={[
                    { text: "Thin", value: "thin" },
                    { text: "Traditional", value: "traditional" },
                ]}
                loading={loading}
                onClickCheckbox={filters.toggleTypes}
                selected={filters.types}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(filters.priceRange.priceFrom)}
                        onChange={(e) => filters.updatePriceRange({ priceFrom: Number(e.target.value) })}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        placeholder="1000"
                        value={String(filters.priceRange.priceTo)}
                        onChange={(e) => filters.updatePriceRange({ priceTo: Number(e.target.value) })}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={5000}
                    step={10}
                    value={[filters.priceRange.priceFrom || 0, filters.priceRange.priceTo || 1000]}
                    onValueChange={([from, to]) => filters.updatePriceRange({ priceFrom: from, priceTo: to })}
                />
            </div>
            <CheckboxFiltersGroup
                title="Ingredients"
                className="mt-5"
                name="ingredients"
                limit={6}
                defaultItem={ingredientItems.slice(0, 6)}
                items={ingredientItems}
                loading={loading}
                onClickCheckbox={filters.toggleIngredients}
                selected={filters.ingredients}
            />
        </div>
    );
};
