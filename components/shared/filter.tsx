import { FilterCheckbox, RangeSlider, Title } from "@/components/shared";
import { Input } from "@/components/ui";
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

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price:</p>
                <div className="flex gap-3 mb-5">
                    <Input
                        type="number"
                        placeholder="0"
                        min={0}
                        max={1000}
                        defaultValue={0}
                    />
                    <Input
                        type="number"
                        min={100}
                        max={1000}
                        defaultValue={1000}
                    />
                </div>
                <RangeSlider min={0} max={5000} step={10} value={[0, 5000]} />
            </div>
        </div>
    );
};
