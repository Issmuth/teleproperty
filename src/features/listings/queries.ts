import { useQuery } from "@tanstack/react-query";

import { request } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";
import type { PropertyItem } from "@/data/property";

export function useListingsQuery() {
  return useQuery({
    queryKey: queryKeys.listings.list(),
    queryFn: () => request<PropertyItem[]>("/listings"),
  });
}