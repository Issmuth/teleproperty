import { useLocalSearchParams, usePathname, useRouter } from "expo-router";
import { useCallback } from "react";

import { useAuth } from "@/auth/auth-context";
import { buildRoutePath, readSearchParam } from "@/auth/auth-routing";

type AuthGateOptions = {
  intent?: string;
  redirectTo?: string;
};

export function useAuthGate() {
  const { isAuthenticated, isHydrated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams =
    useLocalSearchParams<Record<string, string | string[]>>();

  const currentPath = buildRoutePath(pathname, searchParams);

  const openAuth = useCallback(
    (options?: AuthGateOptions) => {
      router.replace({
        pathname: "/auth" as never,
        params: {
          intent: options?.intent ?? "authenticate",
          redirectTo: options?.redirectTo ?? currentPath,
        },
      });
    },
    [currentPath, router],
  );

  const requireAuth = useCallback(
    (onAllowed: () => void, options?: AuthGateOptions) => {
      if (!isHydrated) {
        return false;
      }

      if (isAuthenticated) {
        onAllowed();
        return true;
      }

      openAuth(options);
      return false;
    },
    [isAuthenticated, isHydrated, openAuth],
  );

  const protectedRoute = useCallback(
    (options?: AuthGateOptions) => {
      if (!isHydrated) {
        return;
      }

      if (!isAuthenticated) {
        openAuth(options);
      }
    },
    [isAuthenticated, isHydrated, openAuth],
  );

  return {
    isAuthenticated,
    isHydrated,
    currentPath,
    openAuth,
    requireAuth,
    protectedRoute,
    redirectToParam: readSearchParam,
  };
}
