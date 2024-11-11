import { Filters } from "@/hooks/useFilters";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect, useRef } from "react";

export const useFiltersQuery = (filters: Filters) => {
    const isMounted = useRef(false);
    const router = useRouter();

    useEffect(() => {
        if (isMounted.current) {
            const params = {
                ...filters.priceRange,
                pizzaTypes: Array.from(filters.types),
                sizes: Array.from(filters.sizes),
                ingredients: Array.from(filters.ingredients),
            };

            const query = qs.stringify(params, {
                arrayFormat: "comma",
            });

            router.push(`?${query}`, {
                scroll: false,
            });
        }

        isMounted.current = true;
    }, [filters, router]);
};
