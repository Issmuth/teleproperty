import { useRouter } from "expo-router";
import {
  Building2,
  CreditCard,
  Search,
  Star,
  TrendingUp,
  Users,
  Wrench
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const statCards = [
  {
    icon: Users,
    color: "#6366F1",
    bg: "#EEF2FF",
    value: "1,240",
    label: "Total Users",
    trend: "↑ 28% this month",
    trendColor: "#16A34A",
  },
  {
    icon: Building2,
    color: "#16A34A",
    bg: "#ECFDF5",
    value: "287",
    label: "Active Listings",
    trend: "↑ 15% this week",
    trendColor: "#16A34A",
  },
  {
    icon: CreditCard,
    color: "#F59E0B",
    bg: "#FFFBEB",
    value: "ETB 42K",
    label: "Monthly Revenue",
    trend: "↑ 34% vs last mo",
    trendColor: "#16A34A",
  },
  {
    icon: Star,
    color: "#8B5CF6",
    bg: "#F5F3FF",
    value: "64",
    label: "Broker Subscriptions",
    trend: "12 new this month",
    trendColor: "#16A34A",
  },
  {
    icon: TrendingUp,
    color: "#EA580C",
    bg: "#FFF7ED",
    value: "8",
    label: "Developer Packages",
    trend: "3 active projects",
    trendColor: "#16A34A",
  },
  {
    icon: Wrench,
    color: "#EF4444",
    bg: "#FEF2F2",
    value: "156",
    label: "Service Bookings",
    trend: "↑ 22% this month",
    trendColor: "#16A34A",
  },
] as const;

const revenueData = [
  { day: "Mon", value: 5000 },
  { day: "Tue", value: 7500 },
  { day: "Wed", value: 3500 },
  { day: "Thu", value: 9200 },
  { day: "Fri", value: 11800 },
  { day: "Sat", value: 8800 },
  { day: "Sun", value: 6200 },
];

const cityData = [
  { name: "Addis Ababa", pct: 68, color: "#16A34A" },
  { name: "Dire Dawa", pct: 12, color: "#2563EB" },
  { name: "Hawassa", pct: 9, color: "#7C3AED" },
  { name: "Bahir Dar", pct: 7, color: "#EA580C" },
  { name: "Others", pct: 4, color: "#94A3B8" },
];

const topSearches = [
  { rank: 1, query: "3BR Apartment Bole", count: 1240 },
  { rank: 2, query: "Villa for Sale Addis", count: 980 },
  { rank: 3, query: "Apartment for Rent", count: 870 },
  { rank: 4, query: "Land in Addis Ababa", count: 740 },
  { rank: 5, query: "Commercial Space Bole", count: 620 },
];

const maxRevenue = Math.max(...revenueData.map((d) => d.value));

export default function BrokerAnalyticsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

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
          Performance Analytics
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Platform Analytics
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            TeleProperty Ethiopia — Live Overview
          </Text>
        </View>

        {/* Stats 2-col grid */}
        <View style={styles.statsGrid}>
          {statCards.map((item) => {
            const Icon = item.icon;
            return (
              <View
                key={item.label}
                style={[
                  styles.statCard,
                  { backgroundColor: colors.surface, borderColor: colors.border },
                ]}
              >
                <View
                  style={[
                    styles.statIcon,
                    { backgroundColor: isDark ? colors.surfaceMuted : item.bg },
                  ]}
                >
                  <Icon size={20} color={item.color} />
                </View>
                <Text style={[styles.statValue, { color: colors.text }]}>
                  {item.value}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                  {item.label}
                </Text>
                <Text style={[styles.statTrend, { color: item.trendColor }]}>
                  {item.trend}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Revenue bar chart */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Revenue — Last 7 Days (ETB)
          </Text>
          <View style={styles.barChart}>
            {revenueData.map((d) => {
              const heightPct = (d.value / maxRevenue) * 100;
              return (
                <View key={d.day} style={styles.barCol}>
                  <Text style={[styles.barValue, { color: colors.textMuted }]}>
                    {d.value >= 1000 ? `${d.value / 1000}K` : d.value}
                  </Text>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        { height: `${heightPct}%` as any },
                      ]}
                    />
                  </View>
                  <Text style={[styles.barDay, { color: colors.textMuted }]}>
                    {d.day}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Listings by city donut */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Listings by City (%)
          </Text>
          <View style={styles.cityRow}>
            {/* Simple donut representation */}
            <View style={styles.donutWrap}>
              <View style={styles.donutOuter}>
                <View style={[styles.donutInner, { backgroundColor: colors.surface }]} />
              </View>
            </View>
            <View style={styles.cityLegend}>
              {cityData.map((c) => (
                <View key={c.name} style={styles.legendRow}>
                  <View style={[styles.legendDot, { backgroundColor: c.color }]} />
                  <Text style={[styles.legendName, { color: colors.text }]}>
                    {c.name}
                  </Text>
                  <Text style={[styles.legendPct, { color: colors.textMuted }]}>
                    {c.pct}%
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Top searches */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.cardHeader}>
            <Search size={15} color={colors.textMuted} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              Top Searches
            </Text>
          </View>
          {topSearches.map((s) => (
            <View key={s.rank} style={styles.searchRow}>
              <Text style={[styles.searchRank, { color: colors.textMuted }]}>
                #{s.rank}
              </Text>
              <Text style={[styles.searchQuery, { color: colors.text }]}>
                {s.query}
              </Text>
              <View style={styles.searchBarWrap}>
                <View
                  style={[
                    styles.searchBar,
                    {
                      width: `${(s.count / 1240) * 100}%` as any,
                      backgroundColor: "#16A34A",
                    },
                  ]}
                />
              </View>
              <Text style={[styles.searchCount, { color: colors.text }]}>
                {s.count.toLocaleString()}
              </Text>
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
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  sectionSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  statsGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  statCard: {
    width: "47%",
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: { fontSize: 24, fontWeight: "900", marginTop: 4 },
  statLabel: { fontSize: 12, fontWeight: "600" },
  statTrend: { fontSize: 11, fontWeight: "700" },
  card: { borderWidth: 1, borderRadius: 20, padding: 16, gap: 14 },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardTitle: { fontSize: 15, fontWeight: "900" },
  barChart: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 120,
    gap: 4,
  },
  barCol: {
    flex: 1,
    alignItems: "center",
    gap: 4,
    height: "100%",
    justifyContent: "flex-end",
  },
  barValue: { fontSize: 9, fontWeight: "600" },
  barTrack: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    borderRadius: 4,
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    backgroundColor: "#16A34A",
    borderRadius: 4,
  },
  barDay: { fontSize: 10, fontWeight: "700" },
  cityRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  donutWrap: { alignItems: "center", justifyContent: "center" },
  donutOuter: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#16A34A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 14,
    borderColor: "#16A34A",
    // Simplified visual — real donut requires SVG/Victory
  },
  donutInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  cityLegend: { flex: 1, gap: 8 },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendDot: { width: 10, height: 10, borderRadius: 5 },
  legendName: { flex: 1, fontSize: 13, fontWeight: "700" },
  legendPct: { fontSize: 13, fontWeight: "800" },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchRank: { fontSize: 12, fontWeight: "700", width: 24 },
  searchQuery: { fontSize: 13, fontWeight: "700", flex: 1 },
  searchBarWrap: {
    width: 80,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E2E8F0",
    overflow: "hidden",
  },
  searchBar: { height: "100%", borderRadius: 3 },
  searchCount: { fontSize: 13, fontWeight: "900", width: 40, textAlign: "right" },
});
