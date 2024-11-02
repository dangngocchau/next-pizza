"use client";

import { CheckboxFiltersGroup, FilterCheckbox, RangeSlider, Title } from "@/components/shared";
import { Input } from "@/components/ui";
import { useFilter } from "@/hooks/useFilterIngredients";
import React, { useState } from "react";
import { useSet } from "react-use";

type Props = {
    className?: string;
};

export const Filters = ({ className }: Props) => {
    const {
        sizes,
        types,
        ingredientData: ingredientItems,
        ingredients,
        loading,
        toggleIngredients,
        toggleSizes,
        toggleTypes,
        priceRange,
        updatePriceRange,
    } = useFilter();

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
                onClickCheckbox={toggleSizes}
                selected={sizes}
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
                onClickCheckbox={toggleTypes}
                selected={types}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        value={String(priceRange.priceFrom)}
                        onChange={(e) => updatePriceRange({ priceFrom: Number(e.target.value) })}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        value={String(priceRange.priceTo)}
                        onChange={(e) => updatePriceRange({ priceTo: Number(e.target.value) })}
                    />
                </div>
                <RangeSlider
                    min={0}
                    max={5000}
                    step={10}
                    value={[priceRange.priceFrom, priceRange.priceTo]}
                    onValueChange={([from, to]) => updatePriceRange({ priceFrom: from, priceTo: to })}
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
                onClickCheckbox={toggleIngredients}
                selected={ingredients}
            />
        </div>
    );
};
