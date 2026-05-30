import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function RewardsCard() {
  const { colors, isDark } = useAppTheme();
  const { t } = useI18n();

  return (
    <LinearGradient
      colors={isDark ? ["#7C4A00", "#A16207"] : ["#F59E0B", "#FBBF24"]}
      style={styles.container}
    >
      <View style={styles.rowTop}>
        <Text style={styles.kicker}>{t("payments.rewards.kicker")}</Text>
        <View style={styles.circle} />
      </View>

      <Text style={styles.points}>0</Text>
      <Text style={styles.pointsLabel}>{t("payments.rewards.points")}</Text>

      <View style={styles.actionsRow}>
        <Pressable
          style={[
            styles.actionBtn,
            styles.primaryBtn,
            { backgroundColor: colors.surfaceAccent },
          ]}
        >
          <Text style={styles.primaryLabel}>
            {t("payments.rewards.redeem")}
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.actionBtn,
            styles.secondaryBtn,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.secondaryLabel, { color: colors.text }]}>
            {t("payments.rewards.earnMore")}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    justifyContent: "center",
    gap: 6,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kicker: {
    color: "white",
    fontWeight: "700",
  },
  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  points: {
    color: "white",
    fontSize: 36,
    fontWeight: "900",
  },
  pointsLabel: {
    color: "white",
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  primaryBtn: {
    borderColor: "rgba(255,255,255,0.12)",
  },
  secondaryBtn: {
    borderWidth: 1,
  },
  primaryLabel: {
    color: "white",
    fontWeight: "800",
  },
  secondaryLabel: {
    fontWeight: "800",
  },
});
