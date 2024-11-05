import React from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { Filters } from "@/hooks/useFilters";

export const useFiltersQuery = (filters: Filters) => {
    const isMounted = React.useRef(false);
    const router = useRouter();

    React.useEffect(() => {
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
