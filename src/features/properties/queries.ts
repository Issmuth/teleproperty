import { useQuery } from "@tanstack/react-query";

import { request } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";
import type { PropertyItem } from "@/data/property";

export function usePropertiesQuery() {
  return useQuery({
    queryKey: queryKeys.properties.list(),
    queryFn: () => request<PropertyItem[]>("/properties"),
  });
}