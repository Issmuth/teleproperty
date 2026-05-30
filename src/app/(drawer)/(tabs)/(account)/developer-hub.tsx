import { useRouter } from "expo-router";
import {
    Building2,
    ClipboardList,
    Gauge,
    Megaphone,
    Plus,
    ShieldCheck,
    Sparkles,
    Users,
    Waves,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const quickActions = [
  { label: "Add Projects", icon: Plus },
  { label: "Unit Management", icon: Building2 },
  { label: "Lead Dashboard", icon: ClipboardList },
  { label: "Campaigns", icon: Megaphone },
] as const;

const benefits = [
  {
    icon: Building2,
    title: "List off-plan and ready projects",
    subtitle: "Showcase developments with structured project details.",
  },
  {
    icon: Users,
    title: "Receive verified buyer leads",
    subtitle: "Capture and manage serious inquiries in one place.",
  },
  {
    icon: Gauge,
    title: "Track views, enquiries & sales",
    subtitle: "Measure the performance of each development or campaign.",
  },
  {
    icon: Megaphone,
    title: "Run sponsored campaigns",
    subtitle: "Promote flagship projects with targeted placement.",
  },
] as const;

export default function DeveloperHubScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <View>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            Developer Hub
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.textMuted }]}>
            List projects, manage units, and grow your pipeline
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
            { backgroundColor: isDark ? "#7C4A00" : "#EA580C" },
          ]}
        >
          <View style={styles.heroAccent} />
          <View style={styles.heroAccentRight} />
          <View style={styles.heroIconWrap}>
            <Waves size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>Developer Hub</Text>
          <Text style={styles.heroCopy}>
            List your projects, manage units, run campaigns, and receive
            qualified buyer leads.
          </Text>

          <View style={styles.chipRow}>
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <View
                  key={action.label}
                  style={[
                    styles.chip,
                    { backgroundColor: colors.iconButtonBackground },
                  ]}
                >
                  <Icon size={12} color={colors.icon} />
                  <Text style={[styles.chipLabel, { color: colors.text }]}>
                    {action.label}
                  </Text>
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={() => router.replace("/(account)/register" as never)}
            style={[
              styles.primaryButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.primaryButtonText, { color: colors.text }]}>
              Register as Developer →
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
          {benefits.map((item) => {
            const Icon = item.icon;

            return (
              <View key={item.title} style={styles.benefitRow}>
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
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.benefitSubtitle,
                      { color: colors.textMuted },
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                <ShieldCheck size={14} color={colors.activeText} />
              </View>
            );
          })}
        </View>

        <View style={styles.infoRow}>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Sparkles size={16} color={colors.activeText} />
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Partner ready
            </Text>
            <Text style={[styles.infoSubtitle, { color: colors.textMuted }]}>
              Onboard teams, brands, and agencies.
            </Text>
          </View>
          <View
            style={[
              styles.infoCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <ClipboardList size={16} color={colors.activeText} />
            <Text style={[styles.infoTitle, { color: colors.text }]}>
              Lead tracking
            </Text>
            <Text style={[styles.infoSubtitle, { color: colors.textMuted }]}>
              Watch every enquiry from one dashboard.
            </Text>
          </View>
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
    backgroundColor: "#EA580C",
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
    gap: 10,
    minHeight: 246,
  },
  heroAccent: {
    position: "absolute",
    right: -32,
    top: -28,
    width: 108,
    height: 108,
    borderRadius: 108,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  heroAccentRight: {
    position: "absolute",
    right: -10,
    top: 88,
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
    color: "rgba(255,255,255,0.95)",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    maxWidth: 260,
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
    color: "#C2410C",
    fontSize: 13,
    fontWeight: "900",
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
  infoRow: {
    flexDirection: "row",
    gap: 12,
  },
  infoCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "900",
  },
  infoSubtitle: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "500",
  },
});
