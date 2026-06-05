import { useI18n } from "@/i18n";
import { useRouter } from "expo-router";
import {
    ArrowRight,
    BarChart3,
    Bell,
    BookOpen,
    Building2,
    CirclePlus,
    MessageCircle,
    Phone,
    ShieldCheck,
    Star,
    Users,
    Wallet,
    Zap
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const metrics = [
  { value: "4", labelKey: "account.brokerDashboard.metrics.myListings", icon: Building2, color: "#6366F1", bg: "#EEF2FF" },
  { value: "2", labelKey: "account.brokerDashboard.metrics.newLeads", icon: Bell, color: "#EF4444", bg: "#FEF2F2" },
  { value: "3", labelKey: "account.brokerDashboard.metrics.callbacks", icon: Phone, color: "#8B5CF6", bg: "#F5F3FF" },
  { value: "ETB 400", labelKey: "account.brokerDashboard.metrics.wallet", icon: Wallet, color: "#10B981", bg: "#ECFDF5" },
] as const;

const quickLinks = [
  {
    icon: Users,
    color: "#EF4444",
    bg: "#FEF2F2",
    titleKey: "account.brokerDashboard.links.verifiedLeads",
    subtitleKey: "account.brokerDashboard.links.verifiedLeadsSubtitle",
    badge: "2 New",
    badgeColor: "#EF4444",
    badgeBg: "#FEF2F2",
    route: "/(account)/broker-verified-leads",
  },
  {
    icon: Building2,
    color: "#6366F1",
    bg: "#EEF2FF",
    titleKey: "account.brokerDashboard.links.myListings",
    subtitleKey: "account.brokerDashboard.links.myListingsSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/listings",
  },
  {
    icon: CirclePlus,
    color: "#10B981",
    bg: "#ECFDF5",
    titleKey: "account.brokerDashboard.links.addListing",
    subtitleKey: "account.brokerDashboard.links.addListingSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(drawer)/(tabs)/(property)/post-property",
  },
  {
    icon: Wallet,
    color: "#10B981",
    bg: "#ECFDF5",
    titleKey: "account.brokerDashboard.links.brokerWallet",
    subtitleKey: "account.brokerDashboard.links.brokerWalletSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/broker-wallet",
  },
  {
    icon: Star,
    color: "#F59E0B",
    bg: "#FFFBEB",
    titleKey: "account.brokerDashboard.links.subscriptionPlans",
    subtitleKey: "account.brokerDashboard.links.subscriptionPlansSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/subscriptions",
  },
  {
    icon: Phone,
    color: "#F97316",
    bg: "#FFF7ED",
    titleKey: "account.brokerDashboard.links.callbackRequests",
    subtitleKey: "account.brokerDashboard.links.callbackRequestsSubtitle",
    badge: "3",
    badgeColor: "#FFFFFF",
    badgeBg: "#EF4444",
    route: "/(account)/callbacks",
  },
  {
    icon: MessageCircle,
    color: "#10B981",
    bg: "#ECFDF5",
    titleKey: "account.brokerDashboard.links.whatsappInquiries",
    subtitleKey: "account.brokerDashboard.links.whatsappInquiriesSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/broker-whatsapp",
  },
  {
    icon: BookOpen,
    color: "#64748B",
    bg: "#F8FAFC",
    titleKey: "account.brokerDashboard.links.paymentHistory",
    subtitleKey: "account.brokerDashboard.links.paymentHistorySubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/payment-history",
  },
  {
    icon: ShieldCheck,
    color: "#6366F1",
    bg: "#EEF2FF",
    titleKey: "account.brokerDashboard.links.profileVerification",
    subtitleKey: "account.brokerDashboard.links.profileVerificationSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/broker-profile-verification",
  },
  {
    icon: BarChart3,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    titleKey: "account.brokerDashboard.links.analytics",
    subtitleKey: "account.brokerDashboard.links.analyticsSubtitle",
    badge: null,
    badgeColor: null,
    badgeBg: null,
    route: "/(account)/broker-analytics",
  },
] as const;

export default function BrokerDashboardScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const { t } = useI18n();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          {t("account.brokerDashboard.title")}
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: isDark ? "#1E3A8A" : "#2F5BEA" }]}>
          <View style={styles.profileAccent} />
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Text style={styles.avatarText}>AG</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.profileTitleRow}>
                <Text style={styles.profileTitle}>
                  {t("account.brokerDashboard.profileTitle")}
                </Text>
                <ShieldCheck size={16} color="rgba(255,255,255,0.8)" />
              </View>
              <Text style={styles.profilePlan}>
                {t("account.brokerDashboard.profilePlan")}
              </Text>
              <View style={styles.progressBarTrack}>
                <View style={styles.progressBarFill} />
              </View>
              <Text style={styles.profileCompletion}>
                {t("account.brokerDashboard.profileCompletion")}
              </Text>
            </View>
          </View>
        </View>

        {/* 2x2 Metrics Grid */}
        <View style={styles.metricsGrid}>
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <View
                key={item.labelKey}
                style={[
                  styles.metricCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View style={[styles.metricIconWrap, { backgroundColor: isDark ? colors.surfaceMuted : item.bg }]}>
                  <Icon size={18} color={item.color} />
                </View>
                <View>
                  <Text style={[styles.metricValue, { color: colors.text }]}>
                    {item.value}
                  </Text>
                  <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
                    {t(item.labelKey)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Subscription Card */}
        <View
          style={[
            styles.subscriptionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.subscriptionHeader}>
            <View style={styles.subscriptionTitleRow}>
              <Zap size={16} color="#2563EB" />
              <Text style={[styles.subscriptionTitle, { color: colors.text }]}>
                {t("account.brokerDashboard.subscription.title")}
              </Text>
            </View>
            <View style={styles.activePill}>
              <View style={styles.activeDot} />
              <Text style={styles.activePillLabel}>
                {t("account.brokerDashboard.subscription.active")}
              </Text>
            </View>
          </View>

          <View style={styles.subscriptionBlocks}>
            <View style={[styles.subscriptionBlock, { backgroundColor: isDark ? colors.surfaceMuted : "#EFF6FF" }]}>
              <Text style={[styles.subscriptionBlockValue, { color: "#2563EB" }]}>Standard</Text>
              <Text style={[styles.subscriptionBlockLabel, { color: colors.textMuted }]}>
                {t("account.brokerDashboard.subscription.currentPlan")}
              </Text>
            </View>
            <View style={[styles.subscriptionBlock, { backgroundColor: isDark ? colors.surfaceMuted : "#EFF6FF" }]}>
              <Text style={[styles.subscriptionBlockValue, { color: "#2563EB" }]}>48 left</Text>
              <Text style={[styles.subscriptionBlockLabel, { color: colors.textMuted }]}>
                {t("account.brokerDashboard.subscription.leadsRemaining")}
              </Text>
            </View>
            <View style={[styles.subscriptionBlock, { backgroundColor: isDark ? colors.surfaceMuted : "#EFF6FF" }]}>
              <Text style={[styles.subscriptionBlockValue, { color: "#2563EB" }]}>Jun 3</Text>
              <Text style={[styles.subscriptionBlockLabel, { color: colors.textMuted }]}>
                {t("account.brokerDashboard.subscription.renewalDate")}
              </Text>
            </View>
          </View>

          <Pressable style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnLabel}>
              ↑ {t("account.brokerDashboard.subscription.upgradePlan")}
            </Text>
          </Pressable>
        </View>

        {/* New Leads Notice */}
        <View style={styles.leadsNotice}>
          <View style={[styles.leadsNoticeIcon, { backgroundColor: "#FEF2F2" }]}>
            <Bell size={18} color="#EF4444" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.leadsNoticeTitle}>
              {t("account.brokerDashboard.leadsNotice.title", { count: "2" })}
            </Text>
            <Text style={styles.leadsNoticeText}>
              {t("account.brokerDashboard.leadsNotice.subtitle", { location: "Bole & Kazanchis" })}
            </Text>
          </View>
          <Pressable style={styles.leadsNoticeBtn}>
            <Text style={styles.leadsNoticeBtnLabel}>
              {t("account.brokerDashboard.leadsNotice.viewBtn")}
            </Text>
          </Pressable>
        </View>

        {/* Quick Links Card */}
        <View
          style={[
            styles.linksCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === quickLinks.length - 1;
            return (
              <Pressable key={item.titleKey} onPress={() => {
                if (!item.route) return;
                const isCrossTab = item.route.includes("/(drawer)/(tabs)/") && !item.route.includes("/(account)/");
                if (isCrossTab) {
                  router.navigate(item.route as never);
                } else {
                  router.push(item.route as never);
                }
              }}>
                <View
                  style={[
                    styles.linkRow,
                    !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border },
                  ]}
                >
                  <View style={[styles.linkIconWrap, { backgroundColor: isDark ? colors.surfaceMuted : item.bg }]}>
                    <Icon size={16} color={item.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.linkTitle, { color: colors.text }]}>
                      {t(item.titleKey)}
                    </Text>
                    <Text style={[styles.linkSubtitle, { color: colors.textMuted }]}>
                      {t(item.subtitleKey)}
                    </Text>
                  </View>
                  {item.badge ? (
                    <View style={[styles.linkBadge, { backgroundColor: item.badgeBg ?? "#EF4444" }]}>
                      <Text style={[styles.linkBadgeText, { color: item.badgeColor ?? "#FFFFFF" }]}>
                        {item.badge}
                      </Text>
                    </View>
                  ) : null}
                  <ArrowRight size={15} color={colors.textMuted} style={{ marginLeft: 6 }} />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
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
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 14,
  },

  // Profile Card
  profileCard: {
    borderRadius: 22,
    padding: 18,
    overflow: "hidden",
  },
  profileAccent: {
    position: "absolute",
    right: -24,
    top: -24,
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#2F5BEA",
    fontSize: 18,
    fontWeight: "900",
  },
  profileTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  profileTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "900",
  },
  profilePlan: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginTop: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    width: "25%",
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#FFFFFF",
  },
  profileCompletion: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
  },

  // Metrics
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    width: "47.5%",
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metricIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "900",
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },

  // Subscription
  subscriptionCard: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 16,
    gap: 14,
  },
  subscriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subscriptionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subscriptionTitle: {
    fontSize: 14,
    fontWeight: "900",
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    minHeight: 26,
    borderRadius: 999,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16A34A",
  },
  activePillLabel: {
    color: "#16A34A",
    fontSize: 12,
    fontWeight: "800",
  },
  subscriptionBlocks: {
    flexDirection: "row",
    gap: 8,
  },
  subscriptionBlock: {
    flex: 1,
    borderRadius: 14,
    padding: 12,
    gap: 2,
  },
  subscriptionBlockValue: {
    fontSize: 14,
    fontWeight: "900",
  },
  subscriptionBlockLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  upgradeBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeBtnLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  // Leads Notice
  leadsNotice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FECDD3",
    borderRadius: 18,
    padding: 14,
  },
  leadsNoticeIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  leadsNoticeTitle: {
    color: "#BE123C",
    fontSize: 13,
    fontWeight: "900",
  },
  leadsNoticeText: {
    color: "#E11D48",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  leadsNoticeBtn: {
    backgroundColor: "#E11D48",
    borderRadius: 999,
    paddingHorizontal: 14,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  leadsNoticeBtnLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "900",
  },

  // Quick Links
  linksCard: {
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  linkIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  linkTitle: {
    fontSize: 13,
    fontWeight: "900",
  },
  linkSubtitle: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 1,
  },
  linkBadge: {
    paddingHorizontal: 9,
    minHeight: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  linkBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
});
