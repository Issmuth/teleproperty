import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function PremiumBanner() {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <LinearGradient
      colors={[palette.orange.primary, palette.orange.strong]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Pressable
        hitSlop={15}
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      >
        <X size={16} color="white" />
      </Pressable>

      <View style={styles.content}>
        <Text style={styles.overline}>{t("property.premium.overline")}</Text>
        <Text style={styles.title}>{t("property.premium.title")}</Text>
        <Text style={styles.subtitle}>{t("property.premium.subtitle")}</Text>

        <Pressable
          style={[styles.actionButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.actionText, { color: colors.text }]}>
            {t("property.premium.action")}
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  content: {
    padding: 20,
    alignItems: "flex-start",
  },
  overline: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
    maxWidth: "90%",
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
