import { useQuery } from "@tanstack/react-query";

import { request } from "@/lib/api/client";
import { queryKeys } from "@/lib/api/query-keys";
import type { PropertyItem } from "@/data/property";

export function useSavedPropertiesQuery() {
  return useQuery({
    queryKey: queryKeys.saved.list(),
    queryFn: () => request<PropertyItem[]>("/saved-properties"),
  });
}