import React from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "@/components/shared/form/form-input";
import { cn } from "@/lib/utils";

interface Props {
    disabled?: boolean;
    className?: string;
}

export const CheckoutPersonalForm: React.FC<Props> = ({ className, disabled }) => {
    return (
        <WhiteBlock
            title="2. Персональные данные"
            className={cn(className, { "opacity-40 pointer-events-none": disabled })}
        >
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="First Name" />
                <FormInput name="lastName" className="text-base" placeholder="Last Name" />
                <FormInput name="email" className="text-base" placeholder="Email" />
                <FormInput name="phone" className="text-base" placeholder="Phone" />
            </div>
        </WhiteBlock>
    );
};
