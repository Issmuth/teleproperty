import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const filters = ["All", "Subscription", "Listing", "Service", "Booking"] as const;
type Filter = (typeof filters)[number];

const transactions = [
  { id: "1", icon: "⭐", iconBg: "#FFFBEB", title: "Broker Subscription – May 2026", date: "May 1, 2026 · TLP-10100", amount: "ETB 1,200", status: "Paid" },
  { id: "2", icon: "💳", iconBg: "#EFF6FF", title: "Premium Listing – Bole Villa", date: "Apr 30, 2026 · TLP-10050", amount: "ETB 450", status: "Paid" },
  { id: "3", icon: "🔧", iconBg: "#F0FDF4", title: "Home Cleaning Service – Kazanchis", date: "Apr 28, 2026 · TLP-09990", amount: "ETB 350", status: "Paid" },
  { id: "4", icon: "🏨", iconBg: "#EFF6FF", title: "Hotel Booking – Skylight AA", date: "Apr 25, 2026 · TLP-09940", amount: "ETB 3,200", status: "Paid" },
  { id: "5", icon: "💳", iconBg: "#F5F3FF", title: "Featured Listing – CMC Commercial", date: "Apr 22, 2026 · TLP-09880", amount: "ETB 150", status: "Paid" },
  { id: "6", icon: "⭐", iconBg: "#FFFBEB", title: "Broker Subscription – Apr 2026", date: "Apr 1, 2026 · TLP-09100", amount: "ETB 1,200", status: "Paid" },
  { id: "7", icon: "🔧", iconBg: "#F0FDF4", title: "Electrical Repair – Sarbet", date: "Mar 28, 2026 · TLP-08990", amount: "ETB 500", status: "Paid" },
  { id: "8", icon: "💳", iconBg: "#EFF6FF", title: "Lead Unlock – Apt Bole", date: "Mar 20, 2026 · TLP-08800", amount: "ETB 50", status: "Paid" },
];

export default function BrokerPaymentHistoryScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Payment History</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Payment History</Text>
            <Text style={[styles.sectionSub, { color: colors.textMuted }]}>8 transactions</Text>
          </View>
          <Pressable style={[styles.exportBtn, { borderColor: colors.border }]}>
            <Text style={styles.exportLabel}>↓ Export</Text>
          </Pressable>
        </View>

        {/* Total card */}
        <View style={styles.totalCard}>
          <View style={styles.totalCardAccent} />
          <Text style={styles.totalCardKicker}>↗ Total Paid (All Time)</Text>
          <Text style={styles.totalAmount}>ETB 6,550</Text>
          <Text style={styles.totalSub}>via Telebirr · 6 successful payments</Text>
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {filters.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
                activeFilter === f && styles.filterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.filterLabel,
                  { color: colors.textMuted },
                  activeFilter === f && styles.filterLabelActive,
                ]}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Transactions list */}
        <View
          style={[
            styles.listCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {transactions.map((tx, i) => (
            <View
              key={tx.id}
              style={[
                styles.txRow,
                i < transactions.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
              ]}
            >
              <View
                style={[
                  styles.txIcon,
                  {
                    backgroundColor: isDark ? colors.surfaceMuted : tx.iconBg,
                  },
                ]}
              >
                <Text style={{ fontSize: 16 }}>{tx.icon}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.txTitle, { color: colors.text }]}>
                  {tx.title}
                </Text>
                <Text style={[styles.txDate, { color: colors.textMuted }]}>
                  {tx.date}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.txAmount, { color: colors.text }]}>
                  {tx.amount}
                </Text>
                <View style={styles.paidBadge}>
                  <Text style={styles.paidBadgeLabel}>{tx.status}</Text>
                </View>
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
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  sectionSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  exportBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  exportLabel: { color: "#16A34A", fontSize: 13, fontWeight: "800" },
  totalCard: {
    backgroundColor: "#16A34A",
    borderRadius: 20,
    padding: 18,
    gap: 6,
    overflow: "hidden",
  },
  totalCardAccent: {
    position: "absolute",
    right: -20,
    top: -20,
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  totalCardKicker: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    fontWeight: "700",
  },
  totalAmount: { color: "#FFFFFF", fontSize: 40, fontWeight: "900" },
  totalSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "600",
  },
  filtersRow: { gap: 8 },
  filterChip: {
    paddingHorizontal: 14,
    minHeight: 34,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipActive: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  filterLabel: { fontSize: 13, fontWeight: "700" },
  filterLabelActive: { color: "#FFFFFF" },
  listCard: { borderWidth: 1, borderRadius: 20, overflow: "hidden" },
  txRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  txIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  txTitle: { fontSize: 13, fontWeight: "800" },
  txDate: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  txAmount: { fontSize: 14, fontWeight: "900" },
  paidBadge: {
    marginTop: 4,
    backgroundColor: "#DCFCE7",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  paidBadgeLabel: { color: "#16A34A", fontSize: 11, fontWeight: "800" },
});
