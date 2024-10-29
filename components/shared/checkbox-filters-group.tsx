"use client";

import {
    FilterChecboxProps,
    FilterCheckbox,
} from "@/components/shared/filter-checkbox";
import { Button, Input, Skeleton } from "@/components/ui";
import React, { ChangeEvent, useState } from "react";

type Item = FilterChecboxProps;

type Props = {
    className?: string;
    title: string;
    items: Item[];
    defaultItem: Item[];
    limit?: number;
    loading?: boolean;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    defaultValue?: string[];
};

export const CheckboxFiltersGroup = ({
    className,
    title,
    limit = 5,
    items,
    defaultItem,
    searchInputPlaceholder = "Search...",
    loading,
    onChange,
    defaultValue,
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState<string>("");

    const list = showAll
        ? items.filter((item) =>
              item.text.toLowerCase().includes(searchValue.toLowerCase())
          )
        : defaultItem?.slice(0, limit);

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>
                {...Array(limit)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            className="mb-4 h-6 rounded-[8px]"
                        />
                    ))}
                <Skeleton className="mb-4 w-28 h-6 rounded-[8px]" />
            </div>
        );
    }

    return (
        <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {showAll && (
                <div className="mb-5">
                    <Input
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                        onChange={onChangeSearchInput}
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(ids) => console.log(ids)}
                    />
                ))}
            </div>
            {items.length > limit && (
                <div
                    className={
                        showAll ? "border-t border-t-neutral-100 mt-4" : ""
                    }
                >
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-primary mt-3"
                    >
                        {showAll ? "Hide" : "+ Show All"}
                    </button>
                </div>
            )}
        </div>
    );
};
