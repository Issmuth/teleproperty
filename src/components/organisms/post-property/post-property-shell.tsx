import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import { ChevronLeft, Sparkles } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PostPropertyShellProps = {
  step: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function PostPropertyShell({
  step,
  title,
  subtitle,
  children,
  footer,
}: PostPropertyShellProps) {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <View style={styles.stepBars}>
          {Array.from({ length: 3 }, (_, index) => {
            const active = index + 1 <= step;
            return (
              <View
                key={index}
                style={[
                  styles.stepBar,
                  {
                    backgroundColor: active
                      ? colors.activeText
                      : colors.surfaceMuted,
                  },
                ]}
              />
            );
          })}
        </View>

        <View
          style={[
            styles.heroCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.heroTopRow}>
            <View
              style={[
                styles.heroBadge,
                { backgroundColor: colors.activeSurface },
              ]}
            >
              <Sparkles size={14} color={colors.activeText} />
              <Text
                style={[styles.heroBadgeText, { color: colors.activeText }]}
              >
                {t("property.postProperty.shell.listingWizard")}
              </Text>
            </View>

            <View
              style={[
                styles.stepBadge,
                {
                  backgroundColor: colors.surfaceMuted,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={[styles.stepBadgeText, { color: colors.textMuted }]}>
                {t("property.postProperty.shell.stepOf", { step })}
              </Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <View style={styles.titleCopy}>
              <Text style={[styles.title, { color: colors.text }]}>
                {title}
              </Text>
              <Text style={[styles.subtitle, { color: colors.textMuted }]}>
                {subtitle}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.body}>{children}</View>

      {footer ? <View style={styles.footer}>{footer}</View> : null}

      <Pressable
        onPress={() => router.back()}
        style={[
          styles.backFab,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <ChevronLeft size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 12,
    gap: 10,
  },
  stepBars: {
    flexDirection: "row",
    gap: 8,
  },
  stepBar: {
    flex: 1,
    height: 5,
    borderRadius: 999,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  titleCopy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "600",
  },
  stepBadge: {
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  stepBadgeText: {
    fontSize: 11,
    fontWeight: "900",
  },
  heroCard: {
    borderWidth: 1,
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingVertical: 14,
    gap: 12,
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 1,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backFab: {
    position: "absolute",
    left: 16,
    top: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    elevation: 6,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
});
