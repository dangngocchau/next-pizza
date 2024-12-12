import { ClearButton } from "@/components/shared/clear-button";
import { ErrorText } from "@/components/shared/error-text";
import { RequiredSymbol } from "@/components/shared/required-symbol";
import { Input } from "@/components/ui";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    className?: string;
    label?: string;
    required?: boolean;
}

export const FormInput = ({ className, name, label, required, ...props }: Props) => {
    const {
        register,
        formState: { errors },
        watch,
        setValue,
    } = useFormContext();

    const value = watch(name);
    const error = errors[name];

    const handleClear = () => {
        setValue(name, "", { shouldValidate: true });
    };

    return (
        <div className={className}>
            {label && (
                <p className="font-medium mb-2">
                    {label} {required && <RequiredSymbol />}
                </p>
            )}

            <div className="relative">
                <Input className="h-12 text-md" {...register(name)} {...props} />
                {value && <ClearButton onClick={handleClear} />}
            </div>

            {error && <ErrorText text="This field is required" className="mt-2" />}
        </div>
    );
};
