type SearchParamValue = string | string[] | undefined;

type AuthRouteParams = {
  redirectTo?: string;
  intent?: string;
};

export const protectedRoutePrefixes = ["/saved", "/post-property"] as const;

export function isProtectedRoute(pathname: string) {
  return protectedRoutePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function isAuthRoute(pathname: string) {
  return pathname === "/auth" || pathname.startsWith("/auth/");
}

export function buildRoutePath(
  pathname: string,
  params?: Record<string, SearchParamValue>,
) {
  if (!params) {
    return pathname;
  }

  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value == null) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        query.append(key, item);
      }

      continue;
    }

    query.set(key, value);
  }

  const queryString = query.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function readSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function readAuthRouteParams(
  params: Record<string, SearchParamValue>,
): AuthRouteParams {
  return {
    redirectTo: readSearchParam(params.redirectTo),
    intent: readSearchParam(params.intent),
  };
}

export function withAuthRouteParams(
  params: Record<string, string>,
  authParams: AuthRouteParams,
) {
  return {
    ...params,
    ...(authParams.redirectTo ? { redirectTo: authParams.redirectTo } : {}),
    ...(authParams.intent ? { intent: authParams.intent } : {}),
  };
}
