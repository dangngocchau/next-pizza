import { FormInput } from "@/components/shared/form/form-input";
import { FormTextarea } from "@/components/shared/form/form-textarea";
import { WhiteBlock } from "@/components/shared/white-block";
import { Input } from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
    disabled?: boolean;
    className?: string;
};

export const CheckoutAddressForm = ({ className, disabled }: Props) => {
    return (
        <WhiteBlock title="3. Rating" className={cn(className, { "opacity-40 pointer-events-none": disabled })}>
            <div className="flex flex-col gap-5">
                <FormInput name="address" className="text-base" placeholder="Enter name..." />
                <FormTextarea name="comment" className="text-base" placeholder="Leave a comment" rows={5} />
            </div>
        </WhiteBlock>
    );
};
