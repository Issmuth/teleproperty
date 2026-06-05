import { useRouter } from "expo-router";
import { CheckCircle2, CreditCard, Lock, Shield } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const plans = [
  {
    id: "basic",
    name: "Basic Broker Plan",
    price: "ETB 800",
    period: "/month",
    icon: "⭐",
    iconBg: "#1E293B",
    cardBg: "#1E293B",
    leads: "20",
    listings: "10",
    featured: "—",
    popular: false,
    bestValue: false,
    features: [
      "20 verified leads/month",
      "10 active property listings",
      "Basic broker profile",
      "Email & phone inquiries",
      "Standard search placement",
      "Broker dashboard access",
    ],
  },
  {
    id: "pro",
    name: "Professional Broker Plan",
    price: "ETB 1,500",
    period: "/month",
    icon: "⚡",
    iconBg: "rgba(255,255,255,0.2)",
    cardBg: "#16A34A",
    leads: "60",
    listings: "30",
    featured: "✓",
    popular: true,
    bestValue: false,
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
  },
  {
    id: "agency",
    name: "Developer / Agency Plan",
    price: "ETB 3,500",
    period: "/month",
    icon: "👑",
    iconBg: "rgba(255,255,255,0.2)",
    cardBg: "#EA580C",
    leads: "∞",
    listings: "∞",
    featured: "✓",
    popular: false,
    bestValue: true,
    features: [
      "Unlimited verified leads",
      "Unlimited property listings",
      "Premium agency badge ✓",
      "All contact channels",
      "Homepage featured placement",
      "Off-plan project showcase",
      "Unit management tools",
      "Campaign & SMS tools",
      "Dedicated account manager",
    ],
  },
] as const;

export default function BrokerSubscriptionsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [selected, setSelected] = useState("pro");

  const selectedPlan = plans.find((p) => p.id === selected);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.surface }]}>
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Subscription Plans</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Hero */}
        <View style={styles.heroBanner}>
          <View style={styles.heroIconWrap}>
            <Shield size={20} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>Broker Subscription Plans</Text>
            <Text style={styles.heroSub}>Monthly plans · Cancel anytime · Instant activation</Text>
          </View>
          <View style={styles.lockNotice}>
            <Lock size={12} color="rgba(255,255,255,0.8)" />
            <Text style={styles.lockNoticeText}>Contact details are locked until you subscribe</Text>
          </View>
        </View>

        {/* Plan cards */}
        {plans.map((plan) => {
          const isSelected = selected === plan.id;
          const isLight = plan.id === "basic";
          return (
            <Pressable key={plan.id} onPress={() => setSelected(plan.id)}>
              <View style={[styles.planCard, { backgroundColor: isLight ? (isDark ? colors.surface : "#1E293B") : plan.cardBg }]}>
                <View style={styles.planCardTop}>
                  <View style={[styles.planIconWrap, { backgroundColor: plan.iconBg }]}>
                    <Text style={{ fontSize: 18 }}>{plan.icon}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.planNameRow}>
                      <Text style={styles.planName}>{plan.name}</Text>
                      {plan.popular && <View style={styles.popularBadge}><Text style={styles.popularLabel}>Most Popular</Text></View>}
                      {plan.bestValue && <View style={styles.bestBadge}><Text style={styles.bestLabel}>Best Value</Text></View>}
                    </View>
                    <Text style={styles.planPrice}>
                      {plan.price} <Text style={styles.planPeriod}>{plan.period}</Text>
                    </Text>
                  </View>
                  <View style={[styles.radio, isSelected && styles.radioSelected]} />
                </View>

                <View style={styles.planStats}>
                  <View style={styles.planStat}>
                    <Text style={styles.planStatValue}>{plan.leads}</Text>
                    <Text style={styles.planStatLabel}>Leads/mo</Text>
                  </View>
                  <View style={styles.planStat}>
                    <Text style={styles.planStatValue}>{plan.listings}</Text>
                    <Text style={styles.planStatLabel}>Listings</Text>
                  </View>
                  <View style={styles.planStat}>
                    <Text style={styles.planStatValue}>{plan.featured}</Text>
                    <Text style={styles.planStatLabel}>Featured</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                {plan.features.map((f) => (
                  <View key={f} style={styles.featureRow}>
                    <CheckCircle2 size={14} color="#4ADE80" />
                    <Text style={styles.featureText}>{f}</Text>
                  </View>
                ))}
              </View>
            </Pressable>
          );
        })}

        {/* Payment methods */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <CreditCard size={15} color="#6366F1" />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Payment Methods</Text>
          </View>
          <View style={styles.paymentRow}>
            <View style={[styles.paymentMethod, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={styles.paymentEmoji}>📱</Text>
              <View>
                <Text style={[styles.paymentName, { color: colors.text }]}>Telebirr</Text>
                <Text style={[styles.paymentSub, { color: "#16A34A" }]}>Available now</Text>
              </View>
            </View>
            <View style={[styles.paymentMethod, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={styles.paymentEmoji}>💳</Text>
              <View>
                <Text style={[styles.paymentName, { color: colors.text }]}>Stripe</Text>
                <Text style={[styles.paymentSub, { color: colors.textMuted }]}>Coming soon</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CTA */}
        <Pressable style={styles.subscribeBtn}>
          <CreditCard size={16} color="#FFFFFF" />
          <Text style={styles.subscribeBtnLabel}>
            Subscribe to {selectedPlan?.name} →
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.backLink}>
          <Text style={[styles.backLinkLabel, { color: colors.textMuted }]}>← Back to Hub</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },
  heroBanner: { backgroundColor: "#14532D", borderRadius: 20, padding: 16, gap: 10 },
  heroIconWrap: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  heroSub: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600", marginTop: 2 },
  lockNotice: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  lockNoticeText: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "700", flex: 1 },
  planCard: { borderRadius: 20, padding: 16, gap: 12 },
  planCardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  planIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  planNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  planName: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  planPrice: { color: "#FFFFFF", fontSize: 22, fontWeight: "900", marginTop: 4 },
  planPeriod: { fontSize: 13, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  popularBadge: { backgroundColor: "#FFFFFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  popularLabel: { color: "#16A34A", fontSize: 10, fontWeight: "900" },
  bestBadge: { backgroundColor: "#FFFFFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  bestLabel: { color: "#EA580C", fontSize: 10, fontWeight: "900" },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "rgba(255,255,255,0.5)", marginTop: 2 },
  radioSelected: { borderColor: "#FFFFFF", backgroundColor: "#FFFFFF" },
  planStats: { flexDirection: "row", gap: 8 },
  planStat: { flex: 1, alignItems: "center" },
  planStatValue: { color: "#FFFFFF", fontSize: 18, fontWeight: "900" },
  planStatLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "600", marginTop: 2 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.15)" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  featureText: { color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: "600", flex: 1 },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 12 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: "900" },
  paymentRow: { flexDirection: "row", gap: 12 },
  paymentMethod: { flex: 1, borderWidth: 1, borderRadius: 14, padding: 12, flexDirection: "row", alignItems: "center", gap: 10 },
  paymentEmoji: { fontSize: 20 },
  paymentName: { fontSize: 13, fontWeight: "900" },
  paymentSub: { fontSize: 11, fontWeight: "600", marginTop: 1 },
  subscribeBtn: { backgroundColor: "#16A34A", borderRadius: 16, minHeight: 52, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  subscribeBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  backLink: { alignItems: "center", paddingVertical: 4 },
  backLinkLabel: { fontSize: 13, fontWeight: "700" },
});
