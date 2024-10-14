import { FilterCheckbox, Title } from "@/components/shared";
import React from "react";

type Props = {
    className?: string;
};

export const Filters = ({ className }: Props) => {
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className="mb-5 font-bold" />
            <div className="flex flex-col gap-4">
                <FilterCheckbox text="Checkbox 1" value="1" />
                <FilterCheckbox text="Checkbox 2" value="2" />
            </div>
        </div>
    );
};
