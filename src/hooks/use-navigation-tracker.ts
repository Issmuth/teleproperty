import { useNavigationStore } from "@/store";
import { useGlobalSearchParams, usePathname } from "expo-router";
import { useEffect } from "react";

/**
 * Hook to automatically track navigation changes across the app.
 * Place this in your root layout to enable global navigation tracking.
 */

export function useNavigationTracker() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const pushRoute = useNavigationStore((state) => state.pushRoute);

  useEffect(() => {
    if (pathname) {
      pushRoute(pathname, params as Record<string, any>);
      console.log("route: " + pathname)
    }
  }, [pathname, params, pushRoute]);
}
