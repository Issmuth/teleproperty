import {
  Stack,
  useLocalSearchParams,
  usePathname,
  useRouter,
} from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  isAuthRoute,
  isProtectedRoute,
  readAuthRouteParams,
} from "@/auth/auth-routing";
import { ToastContainer } from "@/components/organisms/toast-container";
import { useAuth } from "@/hooks/use-auth";
import { useNavigationTracker } from "@/hooks/use-navigation-tracker";
import { I18nProvider } from "@/i18n";
import { TanstackProvider } from "@/lib/tanstack/tanstack-provider";
import { AppThemeProvider, useAppTheme } from "@/theme/app-theme";

export default function RootLayout() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "InteractionManager has been deprecated and will be removed in a future release",
    ]);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nProvider>
        <AppThemeProvider>
          <TanstackProvider>
            <NavigationMiddleware />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(drawer)" />
              <Stack.Screen
                name="auth"
                options={{
                  presentation: "fullScreenModal",
                  animation: "fade",
                }}
              />
            </Stack>
            <ThemeStatusBar />
            <ToastContainer />
          </TanstackProvider>
        </AppThemeProvider>
      </I18nProvider>
    </GestureHandlerRootView>
  );
}

function ThemeStatusBar() {
  const { isDark } = useAppTheme();

  return <StatusBar style={isDark ? "light" : "dark"} />;
}

function NavigationMiddleware() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useLocalSearchParams<Record<string, string | string[]>>();
  const { isAuthenticated, isHydrated } = useAuth();

  // Track navigation history
  useNavigationTracker();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (isAuthRoute(pathname)) {
      if (isAuthenticated && pathname === "/auth") {
        const { redirectTo } = readAuthRouteParams(params);
        router.replace((redirectTo ?? "/") as never);
      }

      return;
    }

    if (!isAuthenticated && isProtectedRoute(pathname)) {
      router.replace({
        pathname: "/auth" as never,
        params: {
          intent:
            pathname.includes("saved")
              ? "saved-properties"
              : pathname.includes("post-property")
                ? "post-property"
                : "authenticate",
          redirectTo: pathname,
        },
      });
    }
  }, [isAuthenticated, isHydrated, params, pathname, router]);

  return null;
}
