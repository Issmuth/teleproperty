import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { I18nProvider } from "@/i18n";
import { AppThemeProvider, useAppTheme } from "@/theme/app-theme";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <I18nProvider>
        <AppThemeProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <ThemeStatusBar />
        </AppThemeProvider>
      </I18nProvider>
    </GestureHandlerRootView>
  );
}

function ThemeStatusBar() {
  const { isDark } = useAppTheme();

  return <StatusBar style={isDark ? "light" : "dark"} />;
}
