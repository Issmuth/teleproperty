import { useRouter } from "expo-router";
import { CreditCard, Megaphone, Plus, Star, Wallet } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const topUpAmounts = ["ETB 100", "ETB 250", "ETB 500", "ETB 1,000", "ETB 2,000", "ETB 2,500"];

const txFilters = ["All", "Top-up", "Lead Unlock", "Promotion", "Subscription"] as const;
type TxFilter = (typeof txFilters)[number];

const transactions = [
  { id: "1", icon: "topup", title: "Wallet Top-up via Telebirr", date: "Today 09:15 · TLP-10291", amount: "+ETB 500", type: "Top-up", positive: true },
  { id: "2", icon: "lock", title: "Lead Unlock – Villa Bole", date: "Today 10:30 · TLP-10292", amount: "ETB 50", type: "Lead Unlock", positive: false },
  { id: "3", icon: "lock", title: "Lead Unlock – Apt Kazanchis", date: "Yesterday · TLP-10280", amount: "ETB 50", type: "Lead Unlock", positive: false },
  { id: "4", icon: "star", title: "Standard Plan – May 2026", date: "May 1 · TLP-10100", amount: "ETB 1,200", type: "Subscription", positive: false },
  { id: "5", icon: "promo", title: "Featured Listing – Sarbet Villa", date: "Apr 30 · TLP-10050", amount: "ETB 150", type: "Promotion", positive: false },
  { id: "6", icon: "topup", title: "Wallet Top-up via Telebirr", date: "Apr 28 · TLP-09990", amount: "+ETB 2,000", type: "Top-up", positive: true },
];

const promoItems = [
  { emoji: "⭐", title: "Featured Listing", subtitle: "7-day boost in search", price: "ETB 150" },
  { emoji: "🏆", title: "Featured Listing", subtitle: "30-day premium placement", price: "ETB 450" },
  { emoji: "📣", title: "Homepage Banner", subtitle: "1 week hero placement", price: "ETB 500" },
  { emoji: "🔥", title: "Urgent Tag", subtitle: "Highlight as urgent sale", price: "ETB 80" },
];

export default function BrokerWalletScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [selectedAmount, setSelectedAmount] = useState("ETB 500");
  const [activeTxFilter, setActiveTxFilter] = useState<TxFilter>("All");

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.surface }]}>
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Broker Wallet</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Balance card */}
        <View style={styles.balanceCard}>
          <View style={styles.balanceCardAccent} />
          <View style={styles.balanceCardRow}>
            <Text style={styles.balancePlanLabel}>TeleProperty Wallet</Text>
            <View style={styles.planBadge}>
              <Text style={styles.planBadgeLabel}>Standard Plan ✓</Text>
            </View>
          </View>
          <Text style={styles.balanceAmount}>ETB 400</Text>
          <Text style={styles.balanceSub}>≈ 8 lead unlocks available</Text>
          <View style={styles.balanceStats}>
            <View style={styles.balanceStat}>
              <Text style={styles.balanceStatValue}>ETB 3,500</Text>
              <Text style={styles.balanceStatLabel}>Total Added</Text>
            </View>
            <View style={styles.balanceStat}>
              <Text style={styles.balanceStatValue}>ETB 1,950</Text>
              <Text style={styles.balanceStatLabel}>Total Spent</Text>
            </View>
            <View style={styles.balanceStat}>
              <Text style={styles.balanceStatValue}>8</Text>
              <Text style={styles.balanceStatLabel}>Transactions</Text>
            </View>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <Pressable style={styles.topupBtn}>
            <Plus size={18} color="#FFFFFF" />
            <Text style={styles.topupBtnLabel}>Top Up{"\n"}via Telebirr</Text>
          </Pressable>
          <Pressable style={styles.upgradeBtn}>
            <Star size={18} color="#FFFFFF" />
            <Text style={styles.upgradeBtnLabel}>Upgrade{"\n"}Broker Plan</Text>
          </Pressable>
        </View>

        {/* Top Up amounts */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Plus size={15} color="#16A34A" />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Top Up Wallet</Text>
          </View>
          <View style={styles.amountsGrid}>
            {topUpAmounts.map((amt) => (
              <Pressable
                key={amt}
                onPress={() => setSelectedAmount(amt)}
                style={[
                  styles.amountChip,
                  { borderColor: colors.border, backgroundColor: colors.background },
                  selectedAmount === amt && styles.amountChipActive,
                ]}
              >
                <Text style={[styles.amountLabel, { color: colors.text }, selectedAmount === amt && styles.amountLabelActive]}>
                  {amt}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.payBtn}>
            <CreditCard size={16} color="#FFFFFF" />
            <Text style={styles.payBtnLabel}>Pay {selectedAmount} via Telebirr</Text>
          </Pressable>
        </View>

        {/* Promote Your Listing */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.cardHeader}>
            <Megaphone size={15} color="#8B5CF6" />
            <Text style={[styles.cardTitle, { color: colors.text }]}>Promote Your Listing</Text>
          </View>
          <View style={styles.promoGrid}>
            {promoItems.map((item) => (
              <View key={item.title + item.price} style={[styles.promoCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                <Text style={styles.promoEmoji}>{item.emoji}</Text>
                <Text style={[styles.promoTitle, { color: colors.text }]}>{item.title}</Text>
                <Text style={[styles.promoSub, { color: colors.textMuted }]}>{item.subtitle}</Text>
                <Text style={styles.promoPrice}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Current Plan */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.planRow}>
            <View style={[styles.planIcon, { backgroundColor: isDark ? colors.surfaceMuted : "#EFF6FF" }]}>
              <Wallet size={16} color="#2563EB" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.planName, { color: colors.text }]}>Standard Broker Plan</Text>
              <Text style={[styles.planRenew, { color: colors.textMuted }]}>Renews June 1, 2026 · ETB 1,200/mo</Text>
            </View>
            <View style={styles.activePill}>
              <Text style={styles.activePillLabel}>Active</Text>
            </View>
          </View>
          <View style={styles.planStats}>
            <View style={styles.planStat}>
              <Text style={[styles.planStatValue, { color: colors.text }]}>25/30</Text>
              <Text style={[styles.planStatLabel, { color: colors.textMuted }]}>Leads Left</Text>
            </View>
            <View style={styles.planStat}>
              <Text style={[styles.planStatValue, { color: colors.text }]}>10/30</Text>
              <Text style={[styles.planStatLabel, { color: colors.textMuted }]}>Listings</Text>
            </View>
            <View style={styles.planStat}>
              <Text style={[styles.planStatValue, { color: colors.text }]}>5 days</Text>
              <Text style={[styles.planStatLabel, { color: colors.textMuted }]}>Remaining</Text>
            </View>
          </View>
          <Pressable style={styles.upgradePlanBtn}>
            <Star size={14} color="#16A34A" />
            <Text style={styles.upgradePlanLabel}>Upgrade Plan ›</Text>
          </Pressable>
        </View>

        {/* Transaction History */}
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.txHeader}>
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>Transaction History</Text>
              <View style={[styles.txCountBadge, { backgroundColor: colors.surfaceMuted }]}>
                <Text style={[styles.txCountLabel, { color: colors.textMuted }]}>8</Text>
              </View>
            </View>
            <Pressable style={styles.exportBtn}>
              <Text style={styles.exportLabel}>↓ Export</Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.txFilters}>
            {txFilters.map((f) => (
              <Pressable
                key={f}
                onPress={() => setActiveTxFilter(f)}
                style={[
                  styles.txFilterChip,
                  { backgroundColor: colors.background, borderColor: colors.border },
                  activeTxFilter === f && styles.txFilterChipActive,
                ]}
              >
                <Text style={[styles.txFilterLabel, { color: colors.textMuted }, activeTxFilter === f && styles.txFilterLabelActive]}>
                  {f}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.txSummaryRow}>
            <View>
              <Text style={[styles.txSummaryMeta, { color: colors.textMuted }]}>Money In</Text>
              <Text style={styles.txSummaryIn}>+ETB 3,500</Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={[styles.txSummaryMeta, { color: colors.textMuted }]}>Money Out</Text>
              <Text style={[styles.txSummaryOut, { color: colors.text }]}>ETB 1,950</Text>
            </View>
          </View>

          {transactions.map((tx, i) => (
            <View
              key={tx.id}
              style={[
                styles.txRow,
                i < transactions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
              ]}
            >
              <View style={[styles.txIcon, { backgroundColor: isDark ? colors.surfaceMuted : "#F0FDF4" }]}>
                <Text style={{ fontSize: 14 }}>
                  {tx.icon === "topup" ? "↙" : tx.icon === "lock" ? "🔒" : tx.icon === "star" ? "⭐" : "📣"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.txTitle, { color: colors.text }]}>{tx.title}</Text>
                <Text style={[styles.txDate, { color: colors.textMuted }]}>{tx.date}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.txAmount, { color: tx.positive ? "#16A34A" : colors.text }]}>{tx.amount}</Text>
                <Text style={[styles.txType, { color: tx.positive ? "#16A34A" : "#6366F1" }]}>{tx.type}</Text>
              </View>
            </View>
          ))}
        </View>
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
  balanceCard: { backgroundColor: "#16A34A", borderRadius: 22, padding: 18, overflow: "hidden", gap: 8 },
  balanceCardAccent: { position: "absolute", right: -30, top: -30, width: 110, height: 110, borderRadius: 55, backgroundColor: "rgba(255,255,255,0.12)" },
  balanceCardRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  balancePlanLabel: { color: "rgba(255,255,255,0.9)", fontSize: 13, fontWeight: "700" },
  planBadge: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 4 },
  planBadgeLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },
  balanceAmount: { color: "#FFFFFF", fontSize: 42, fontWeight: "900" },
  balanceSub: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600" },
  balanceStats: { flexDirection: "row", gap: 8, marginTop: 4 },
  balanceStat: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 12, padding: 10 },
  balanceStatValue: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  balanceStatLabel: { color: "rgba(255,255,255,0.8)", fontSize: 10, fontWeight: "600", marginTop: 2 },
  actionRow: { flexDirection: "row", gap: 12 },
  topupBtn: { flex: 1, backgroundColor: "#16A34A", borderRadius: 16, minHeight: 64, alignItems: "center", justifyContent: "center", gap: 6 },
  topupBtnLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", textAlign: "center" },
  upgradeBtn: { flex: 1, backgroundColor: "#F59E0B", borderRadius: 16, minHeight: 64, alignItems: "center", justifyContent: "center", gap: 6 },
  upgradeBtnLabel: { color: "#FFFFFF", fontSize: 13, fontWeight: "900", textAlign: "center" },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 14 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: "900" },
  amountsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  amountChip: { width: "31%", minHeight: 42, borderWidth: 1, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  amountChipActive: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  amountLabel: { fontSize: 13, fontWeight: "800" },
  amountLabelActive: { color: "#FFFFFF" },
  payBtn: { backgroundColor: "#16A34A", borderRadius: 14, minHeight: 50, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8 },
  payBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
  promoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  promoCard: { width: "47%", borderWidth: 1, borderRadius: 16, padding: 12, gap: 4 },
  promoEmoji: { fontSize: 22 },
  promoTitle: { fontSize: 13, fontWeight: "900", marginTop: 4 },
  promoSub: { fontSize: 11, fontWeight: "600" },
  promoPrice: { color: "#16A34A", fontSize: 14, fontWeight: "900", marginTop: 4 },
  planRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  planIcon: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  planName: { fontSize: 14, fontWeight: "900" },
  planRenew: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  activePill: { backgroundColor: "#DCFCE7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  activePillLabel: { color: "#16A34A", fontSize: 12, fontWeight: "800" },
  planStats: { flexDirection: "row", gap: 8 },
  planStat: { flex: 1, alignItems: "center" },
  planStatValue: { fontSize: 16, fontWeight: "900" },
  planStatLabel: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  upgradePlanBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 },
  upgradePlanLabel: { color: "#16A34A", fontSize: 13, fontWeight: "900" },
  txHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  txCountBadge: { borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 6 },
  txCountLabel: { fontSize: 12, fontWeight: "800" },
  exportBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#E2E8F0" },
  exportLabel: { color: "#16A34A", fontSize: 12, fontWeight: "800" },
  txFilters: { gap: 8 },
  txFilterChip: { paddingHorizontal: 12, minHeight: 32, borderRadius: 999, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  txFilterChipActive: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  txFilterLabel: { fontSize: 12, fontWeight: "700" },
  txFilterLabelActive: { color: "#FFFFFF" },
  txSummaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  txSummaryMeta: { fontSize: 11, fontWeight: "600" },
  txSummaryIn: { color: "#16A34A", fontSize: 18, fontWeight: "900" },
  txSummaryOut: { fontSize: 18, fontWeight: "900" },
  txRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  txIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  txTitle: { fontSize: 13, fontWeight: "800" },
  txDate: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: "900" },
  txType: { fontSize: 11, fontWeight: "700", marginTop: 2 },
});
