import { useRouter } from "expo-router";
import { CheckCircle2, RefreshCw, Shield } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

// Mock active subscription — replace with real data source
const activePlan = {
  name: "Professional Broker Plan",
  price: "ETB 1,500",
  cardBg: "#16A34A",
  leads: "60",
  listings: "30",
  featured: "✓",
  features: [
    "60 verified leads/month",
    "30 active property listings",
    "Featured broker badge ✓",
    "WhatsApp + Phone + Email leads",
    "Priority search placement",
    "Advanced analytics dashboard",
    "Verified broker profile",
    "Call center support",
  ],
};

export default function MySubscriptionScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const today = new Date();
  const nextBilling = new Date(today);
  nextBilling.setMonth(nextBilling.getMonth() + 1);
  const fmt = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          My Subscription
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.heading, { color: colors.text }]}>
          My Subscription
        </Text>
        <Text style={[styles.subheading, { color: colors.textMuted }]}>
          Your active broker plan
        </Text>

        {/* Status banner */}
        <View style={styles.activeBanner}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
            <Shield size={16} color="#FFFFFF" />
            <View>
              <Text style={styles.bannerTitle}>Subscription Active</Text>
              <Text style={styles.bannerSub}>
                {activePlan.name} · Auto-renews monthly
              </Text>
            </View>
          </View>
          <CheckCircle2 size={20} color="#FFFFFF" />
        </View>

        {/* Plan card */}
        <View style={[styles.planCard, { backgroundColor: activePlan.cardBg }]}>
          <View style={styles.planCardRow}>
            <View>
              <Text style={styles.planName}>{activePlan.name}</Text>
              <Text style={styles.planSub}>{activePlan.price}/month</Text>
            </View>
            <CheckCircle2 size={22} color="rgba(255,255,255,0.9)" />
          </View>
          <View style={styles.statsRow}>
            {[
              { val: activePlan.leads, label: "Leads/mo" },
              { val: activePlan.listings, label: "Listings" },
              { val: activePlan.featured, label: "Featured" },
            ].map((s) => (
              <View key={s.label} style={styles.stat}>
                <Text style={styles.statVal}>{s.val}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Billing details */}
        <View
          style={[
            styles.detailsCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {[
            { label: "Monthly price", value: activePlan.price, bold: true },
            { label: "Start date", value: fmt(today), bold: true },
            { label: "Next billing", value: fmt(nextBilling), bold: true },
            { label: "Auto-renew", isToggle: true },
          ].map((row) => (
            <View key={row.label} style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: colors.textMuted }]}>
                {row.label}
              </Text>
              {row.isToggle ? (
                <View style={styles.toggleBadge}>
                  <RefreshCw size={11} color="#6366F1" />
                  <Text style={styles.toggleText}>ON</Text>
                </View>
              ) : (
                <Text
                  style={[
                    styles.detailValue,
                    { color: colors.text },
                    row.bold && styles.detailValueBold,
                  ]}
                >
                  {row.value}
                </Text>
              )}
            </View>
          ))}
        </View>

        {/* Unlocked features */}
        <View
          style={[
            styles.unlockedCard,
            { backgroundColor: isDark ? "rgba(22,163,74,0.12)" : "#F0FDF4" },
          ]}
        >
          <View style={styles.unlockedHeader}>
            <Shield size={14} color="#16A34A" />
            <Text style={styles.unlockedTitle}>Unlocked Features</Text>
          </View>
          {activePlan.features.map((f) => (
            <View key={f} style={styles.featureRow}>
              <CheckCircle2 size={13} color="#16A34A" />
              <Text
                style={[
                  styles.featureText,
                  { color: isDark ? "#4ADE80" : "#15803D" },
                ]}
              >
                {f}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.upgradeBtn}
          onPress={() => router.push("./subscriptions")}
        >
          <Text style={styles.upgradeBtnLabel}>Upgrade Plan →</Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={[styles.backLinkLabel, { color: colors.textMuted }]}>
            ← Back to Account
          </Text>
        </Pressable>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40, gap: 14 },
  heading: { fontSize: 22, fontWeight: "900" },
  subheading: { fontSize: 13, fontWeight: "600", marginTop: -6 },
  activeBanner: {
    backgroundColor: "#16A34A",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bannerTitle: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "600", marginTop: 2 },
  planCard: { borderRadius: 20, padding: 16, gap: 12 },
  planCardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  planName: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  planSub: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600", marginTop: 4 },
  statsRow: { flexDirection: "row", gap: 8 },
  stat: { flex: 1, alignItems: "center" },
  statVal: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  statLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "600", marginTop: 2 },
  detailsCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 14 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  detailLabel: { fontSize: 14, fontWeight: "600" },
  detailValue: { fontSize: 14, fontWeight: "700" },
  detailValueBold: { fontWeight: "900" },
  toggleBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  toggleText: { color: "#6366F1", fontSize: 13, fontWeight: "900" },
  unlockedCard: { borderRadius: 16, padding: 16, gap: 10 },
  unlockedHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  unlockedTitle: { fontSize: 14, fontWeight: "900", color: "#16A34A" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  featureText: { fontSize: 13, fontWeight: "600", flex: 1 },
  upgradeBtn: {
    backgroundColor: "#16A34A",
    borderRadius: 16,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  backLink: { alignItems: "center", paddingVertical: 4 },
  backLinkLabel: { fontSize: 13, fontWeight: "700" },
});
