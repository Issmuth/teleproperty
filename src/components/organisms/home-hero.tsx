import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

import { ActionButton } from "@/components/atoms/action-button";
import { HomeSearchBar } from "@/components/atoms/home/home-search-bar";
import {
    HomeSegmentedControl,
    type HomeSegment,
} from "@/components/atoms/home/home-segmented-control";
import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";
import { PlusCircle } from "lucide-react-native";

type HomeHeroProps = {
  activeSegment: string;
  onSegmentChange: (key: string) => void;
  segments: readonly HomeSegment[];
  kicker: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  searchAction: string;
  postLabel: string;
  localePill: string;
};

export function HomeHero({
  activeSegment,
  onSegmentChange,
  segments,
  kicker,
  title,
  subtitle,
  searchPlaceholder,
  searchAction,
  postLabel,
  localePill,
}: HomeHeroProps) {
  const { colors, isDark } = useAppTheme();

  const gradientColors = isDark
    ? (["#062D35", "#0A5135", "#0B8F55"] as const)
    : (["rgb(6, 78, 59)", "rgb(6, 95, 70)", "rgb(20, 83, 45)"] as const);

  return (
    <View style={{ gap: 16 }}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        style={styles.hero}
      >
        <View style={styles.topRow}>
          <Text style={styles.kicker}>{kicker}</Text>
          <View
            style={[
              styles.localePill,
              { backgroundColor: colors.surfaceMuted },
            ]}
          >
            <Text style={[styles.localePillText, { color: colors.textMuted }]}>
              {localePill}
            </Text>
          </View>
        </View>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <HomeSegmentedControl
          segments={segments}
          activeKey={activeSegment}
          onChange={onSegmentChange}
        />
      </LinearGradient>
      <HomeSearchBar
        placeholder={searchPlaceholder}
        actionLabel={searchAction}
      />
      <ActionButton
        label={postLabel}
        icon={PlusCircle}
        backgroundColor={palette.brand.accent}
        iconSize={20}
        style={styles.postButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 18,
    gap: 14,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  kicker: {
    fontSize: 13,
    fontWeight: "900",
    color: "rgba(255,255,255,0.9)",
  },
  localePill: {
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  localePillText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  titleBlock: {
    gap: 4,
  },
  title: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 0.4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "rgba(255,255,255,0.9)",
  },
  postButton: {
    minHeight: 54,
    borderRadius: 16,
    marginHorizontal: 16,
    gap: 10,
  },
});
