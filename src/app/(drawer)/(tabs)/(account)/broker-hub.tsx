import { useI18n } from "@/i18n";
import { useNavigation, useRouter } from "expo-router";
import {
  Briefcase,
  ClipboardList,
  MessageSquareMore,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Waves,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const quickActions = [
  { labelKey: "account.brokerHub.quick.register", icon: Briefcase },
  { labelKey: "account.brokerHub.quick.uploadListings", icon: ClipboardList },
  { labelKey: "account.brokerHub.quick.verifiedLeads", icon: Users },
  {
    labelKey: "account.brokerHub.quick.clientInquiries",
    icon: MessageSquareMore,
  },
] as const;

const benefits = [
  {
    icon: Users,
    titleKey: "account.brokerHub.benefit.receive.title",
    subtitleKey: "account.brokerHub.benefit.receive.subtitle",
  },
  {
    icon: TrendingUp,
    titleKey: "account.brokerHub.benefit.grow.title",
    subtitleKey: "account.brokerHub.benefit.grow.subtitle",
  },
  {
    icon: Sparkles,
    titleKey: "account.brokerHub.benefit.featured.title",
    subtitleKey: "account.brokerHub.benefit.featured.subtitle",
  },
  {
    icon: ShieldCheck,
    titleKey: "account.brokerHub.benefit.reputation.title",
    subtitleKey: "account.brokerHub.benefit.reputation.subtitle",
  },
] as const;

export default function BrokerHubScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { colors, isDark } = useAppTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => {
            const state = navigation.getState();
            const routes = state?.routeNames;

            router.replace('/(drawer)/(tabs)/(account)/account')
            router.back()
          }}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <View>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            {t("account.brokerHub.title")}
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.textMuted }]}>
            {t("account.brokerHub.subtitle")}
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.heroWrap,
            { backgroundColor: isDark ? "#1E3A8A" : "#2F5BEA" },
          ]}
        >
          <View style={styles.heroAccent} />
          <View style={styles.heroAccentRight} />
          <View style={styles.heroIconWrap}>
            <Waves size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>
            {t("account.brokerHub.hero.title")}
          </Text>
          <Text style={styles.heroCopy}>
            {t("account.brokerHub.hero.copy")}
          </Text>

          <View style={styles.chipRow}>
            {quickActions.map((action) => {
              const Icon = action.icon as any;

              return (
                <View key={action.labelKey} style={styles.chip}>
                  <Icon size={12} color="#FFFFFF" />
                  <Text style={styles.chipLabel}>{t(action.labelKey)}</Text>
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={() => router.push("/(account)/broker-register" as never)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>
              {t("account.brokerHub.registerButton")}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.benefitsCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
            {t("account.brokerHub.whyJoin")}
          </Text>
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <View key={item.titleKey} style={styles.benefitRow}>
                <View
                  style={[
                    styles.benefitIcon,
                    { backgroundColor: colors.surfaceMuted },
                  ]}
                >
                  <Icon size={16} color={colors.activeText} />
                </View>
                <View style={styles.benefitCopy}>
                  <Text style={[styles.benefitTitle, { color: colors.text }]}>
                    {t(item.titleKey)}
                  </Text>
                  <Text
                    style={[
                      styles.benefitSubtitle,
                      { color: colors.textMuted },
                    ]}
                  >
                    {t(item.subtitleKey)}
                  </Text>
                </View>
                <ShieldCheck size={14} color={colors.activeText} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    marginTop: -2,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  pageSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 16,
  },
  heroWrap: {
    backgroundColor: "#2F5BEA",
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
    gap: 10,
    minHeight: 240,
  },
  heroAccent: {
    position: "absolute",
    right: -32,
    top: -28,
    width: 108,
    height: 108,
    borderRadius: 108,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  heroAccentRight: {
    position: "absolute",
    right: -10,
    bottom: -8,
    width: 88,
    height: 88,
    borderRadius: 88,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  heroIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
  },
  heroCopy: {
    color: "rgba(255,255,255,0.96)",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    maxWidth: 276,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 2,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    minHeight: 26,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  chipLabel: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  primaryButton: {
    marginTop: 8,
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: 16,
    borderRadius: 14,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  primaryButtonText: {
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: "900",
  },
  sectionLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  benefitsCard: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 14,
    gap: 14,
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  benefitIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  benefitCopy: {
    flex: 1,
    gap: 2,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: "900",
  },
  benefitSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
  },
});
