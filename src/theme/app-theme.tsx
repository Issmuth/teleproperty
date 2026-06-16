import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useColorScheme } from "react-native";

import { palette } from "@/theme/palette";

export type AppThemeMode = "light" | "dark";

export type AppThemeColors = {
  background: string;
  surface: string;
  surfaceMuted: string;
  surfaceAccent: string;
  text: string;
  textMuted: string;
  textInverse: string;
  border: string;
  shadow: string;
  drawerBackground: string;
  headerBackground: string;
  tabBarBackground: string;
  iconButtonBackground: string;
  icon: string;
  iconMuted: string;
  activeSurface: string;
  activeBorder: string;
  activeText: string;
};

type AppThemeContextValue = {
  mode: AppThemeMode;
  isDark: boolean;
  colors: AppThemeColors;
  toggleTheme: () => void;
};

const lightColors: AppThemeColors = {
  background: palette.surface.canvas,
  surface: palette.surface.base,
  surfaceMuted: palette.surface.elevated,
  surfaceAccent: palette.surface.soft,
  text: palette.text.primary,
  textMuted: palette.text.secondary,
  textInverse: palette.text.inverse,
  border: palette.border.subtle,
  shadow: palette.shadow.overlay,
  drawerBackground: palette.surface.canvas,
  headerBackground: palette.surface.base,
  tabBarBackground: palette.surface.base,
  iconButtonBackground: palette.surface.elevated,
  icon: palette.text.primary,
  iconMuted: palette.text.secondary,
  activeSurface: palette.surface.soft,
  activeBorder: palette.brand.primary,
  activeText: palette.brand.primaryStrong,
};

const darkColors: AppThemeColors = {
  background: "#070809",
  surface: "#12161C",
  surfaceMuted: "#1A2027",
  surfaceAccent: "rgba(248, 250, 252, 0.06)",
  text: "#F8FAFC",
  textMuted: "#CBD5E1",
  textInverse: palette.text.inverse,
  border: "rgba(255, 255, 255, 0.08)",
  shadow: "rgba(0, 0, 0, 0.45)",
  drawerBackground: "#070809",
  headerBackground: "#12161C",
  tabBarBackground: "#12161C",
  iconButtonBackground: "rgba(255, 255, 255, 0.08)",
  icon: "#F8FAFC",
  iconMuted: "#CBD5E1",
  activeSurface: "rgba(24, 195, 106, 0.16)",
  activeBorder: palette.brand.accent,
  activeText: palette.brand.accent,
};

const navigationThemes = {
  light: {
    dark: false,
    colors: {
      primary: palette.brand.primary,
      background: lightColors.background,
      card: lightColors.surface,
      text: lightColors.text,
      border: lightColors.border,
      notification: palette.brand.accent,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800',
      },
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: palette.brand.accent,
      background: darkColors.background,
      card: darkColors.surface,
      text: darkColors.text,
      border: darkColors.border,
      notification: palette.brand.accent,
    },
    fonts: {
      regular: {
        fontFamily: 'System',
        fontWeight: '400',
      },
      medium: {
        fontFamily: 'System',
        fontWeight: '500',
      },
      bold: {
        fontFamily: 'System',
        fontWeight: '700',
      },
      heavy: {
        fontFamily: 'System',
        fontWeight: '800',
      },
    },
  },
} as const;

const themeStorageKey = "teleproperty.theme.mode";

const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const colorScheme = useColorScheme();
  const initialMode: AppThemeMode = colorScheme === "dark" ? "dark" : "light";
  const [mode, setMode] = useState<AppThemeMode>(initialMode);
  const [isHydrated, setIsHydrated] = useState(false);
  const currentModeRef = useRef(mode);

  useEffect(() => {
    currentModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    let cancelled = false;

    async function hydrateThemeMode() {
      try {
        const storedMode = await AsyncStorage.getItem(themeStorageKey);

        if (
          !cancelled &&
          (currentModeRef.current === initialMode ||
            currentModeRef.current === storedMode) &&
          (storedMode === "light" || storedMode === "dark")
        ) {
          setMode(storedMode);
        }
      } finally {
        if (!cancelled) {
          setIsHydrated(true);
        }
      }
    }

    void hydrateThemeMode();

    return () => {
      cancelled = true;
    };
  }, [initialMode]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    void AsyncStorage.setItem(themeStorageKey, mode);
  }, [isHydrated, mode]);

  const toggleTheme = useCallback(() => {
    setMode((currentMode) => (currentMode === "dark" ? "light" : "dark"));
  }, []);

  const colors = mode === "dark" ? darkColors : lightColors;
  const navigationTheme = navigationThemes[mode];

  const value = useMemo<AppThemeContextValue>(
    () => ({
      mode,
      isDark: mode === "dark",
      colors,
      toggleTheme,
    }),
    [colors, mode, toggleTheme],
  );

  return (
    <AppThemeContext.Provider value={value}>
      <ThemeProvider value={navigationTheme}>{children}</ThemeProvider>
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider");
  }

  return context;
}
