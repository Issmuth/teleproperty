import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, House, X } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LanguageSelector } from "@/components/molecules/language-selector";
import { useAppTheme } from "@/theme/app-theme";

type AuthShellProps = {
  title: string;
  subtitle: string;
  onBackPress?: () => void;
  onClosePress?: () => void;
  children: ReactNode;
};

export function AuthShell({
  title,
  subtitle,
  onBackPress,
  onClosePress,
  children,
}: AuthShellProps) {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const topSpacing = Math.max(insets.top + 4, 18);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <LinearGradient
        colors={["#127C40", "#109146", "#19A856"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: topSpacing }]}
      >
        <View style={styles.heroChrome} />
        <View style={styles.heroChromeRight} />

        <View style={[styles.heroTopRow, { top: topSpacing }]}>
          <LanguageSelector light />

          {onClosePress ? (
            <Pressable
              onPress={onClosePress}
              style={[styles.iconButton, styles.closeButton]}
              hitSlop={8}
            >
              <X size={18} color="#FFFFFF" strokeWidth={2.5} />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.brandBlock}>
          <View style={styles.brandMarkWrap}>
            <View style={styles.brandMark}>
              <House size={22} color="#0F7B44" strokeWidth={2.4} />
            </View>
          </View>
          <Text style={styles.brandTitle}>{title}</Text>
          <Text style={styles.brandSubtitle}>{subtitle}</Text>
        </View>

        {onBackPress ? (
          <Pressable 
            onPress={onBackPress} 
            style={[styles.backButton, { top: topSpacing + 54 }]}
            hitSlop={8}
          >
            <ChevronLeft size={18} color="#FFFFFF" strokeWidth={2.5} />
          </Pressable>
        ) : null}
      </LinearGradient>

      <View style={[styles.body, { backgroundColor: colors.background }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hero: {
    minHeight: 210,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 20,
    position: "relative",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroChrome: {
    position: "absolute",
    left: -42,
    top: 54,
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroChromeRight: {
    position: "absolute",
    right: -18,
    top: -14,
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.10)",
  },
  heroTopRow: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  brandBlock: {
    alignItems: "center",
    gap: 8,
  },
  brandMarkWrap: {
    borderRadius: 16,
    padding: 4,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  brandTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    lineHeight: 28,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  brandSubtitle: {
    color: "rgba(255,255,255,0.94)",
    fontSize: 13,
    fontWeight: "700",
  },
  backButton: {
    position: "absolute",
    left: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
  },
  body: {
    flex: 1,
    marginTop: -18,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
    paddingTop: 22,
  },
});
