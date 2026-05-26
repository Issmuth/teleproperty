import { StyleSheet, Text, View } from "react-native";

import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

type ScreenTemplateProps = {
  title: string;
  description?: string;
  variant?: "default" | "compact";
};

export function ScreenTemplate({
  title,
  description,
  variant = "default",
}: ScreenTemplateProps) {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const isCompact = variant === "compact";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.kicker, { color: colors.textMuted }]}>
          {t("common.appName")}
        </Text>
        <Text
          style={[
            styles.title,
            isCompact && styles.titleCompact,
            { color: colors.text },
          ]}
        >
          {title}
        </Text>
        <Text
          style={[
            styles.description,
            isCompact && styles.descriptionCompact,
            { color: colors.textMuted },
          ]}
        >
          {description ?? t("common.blankTemplate")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7F8",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  titleCompact: {
    fontSize: 18,
    fontWeight: "800",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
  },
  descriptionCompact: {
    fontSize: 13,
    textAlign: "center",
  },
});
