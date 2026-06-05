import { useRouter } from "expo-router";
import { Lock, MapPin, TrendingUp } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const filters = ["All", "Hot", "Warm", "Buyer", "Tenant"] as const;
type Filter = (typeof filters)[number];

const leads = [
  {
    id: "1",
    tags: ["New", "Hot", "Verified"] as const,
    score: 92,
    type: "Buyer",
    mode: "Buy",
    property: "Apartment",
    budget: "ETB 3M – 5M",
    location: "Bole, Addis Ababa",
    unlocked: false,
  },
  {
    id: "2",
    tags: ["New", "Warm", "Featured"] as const,
    score: 78,
    type: "Tenant",
    mode: "Rent",
    property: "Office",
    budget: "ETB 15,000 – 25,000/mo",
    location: "Kazanchis, Addis Ababa",
    unlocked: false,
  },
  {
    id: "3",
    tags: ["Warm", "Verified"] as const,
    score: 65,
    type: "Buyer",
    mode: "Buy",
    property: "Villa",
    budget: "ETB 6M – 9M",
    location: "CMC, Addis Ababa",
    unlocked: true,
  },
];

const tagStyles: Record<string, { bg: string; color: string }> = {
  New: { bg: "#DCFCE7", color: "#16A34A" },
  Hot: { bg: "#FEF3C7", color: "#D97706" },
  Warm: { bg: "#FEF3C7", color: "#F59E0B" },
  Featured: { bg: "#F3E8FF", color: "#7C3AED" },
  Verified: { bg: "#ECFDF5", color: "#059669" },
};

export default function BrokerVerifiedLeadsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.surface }]}>
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Verified Leads</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Verified Leads</Text>
            <Text style={[styles.sectionSub, { color: colors.textMuted }]}>2 new · 5 total</Text>
          </View>
          <View style={styles.unlocksBadge}>
            <Text style={styles.unlocksText}>5 leads unlocks left</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
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
              <Text style={[styles.filterLabel, { color: colors.textMuted }, activeFilter === f && styles.filterLabelActive]}>
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Upgrade banner */}
        <View style={styles.upgradeBanner}>
          <View style={styles.upgradeBannerIcon}>
            <TrendingUp size={18} color="#FFFFFF" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.upgradeBannerTitle}>Get More Lead Unlocks</Text>
            <Text style={styles.upgradeBannerSub}>Upgrade your plan or top up wallet</Text>
          </View>
          <Pressable style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnLabel}>Upgrade</Text>
          </Pressable>
        </View>

        {/* Lead cards */}
        {leads.map((lead) => (
          <View
            key={lead.id}
            style={[styles.leadCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
          >
            {/* Tags + score */}
            <View style={styles.leadCardTop}>
              <View style={styles.tagsRow}>
                {lead.tags.map((tag) => (
                  <View key={tag} style={[styles.tag, { backgroundColor: tagStyles[tag]?.bg ?? "#F1F5F9" }]}>
                    <Text style={[styles.tagText, { color: tagStyles[tag]?.color ?? "#64748B" }]}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={[styles.score, { color: colors.textMuted }]}>⭐ {lead.score} score</Text>
            </View>

            {/* Info grid */}
            <View style={[styles.infoGrid, { backgroundColor: isDark ? colors.surfaceMuted : "#F8FAFC" }]}>
              <View style={styles.infoCell}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Type</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{lead.type}</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Mode</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{lead.mode}</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Property</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{lead.property}</Text>
              </View>
              <View style={[styles.infoCell, { backgroundColor: isDark ? "#14532D" : "#DCFCE7", borderRadius: 8, padding: 8 }]}>
                <Text style={[styles.infoLabel, { color: "#16A34A" }]}>Budget</Text>
                <Text style={[styles.infoValue, { color: "#16A34A" }]}>{lead.budget}</Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationRow}>
              <MapPin size={13} color="#16A34A" />
              <Text style={[styles.locationText, { color: colors.textMuted }]}>{lead.location}</Text>
            </View>

            {/* Locked fields */}
            {!lead.unlocked && (
              <>
                <View style={[styles.lockedField, { backgroundColor: isDark ? colors.surfaceMuted : "#F8FAFC", borderColor: colors.border }]}>
                  <Text style={[styles.lockedLabel, { color: colors.textMuted }]}>Buyer Name</Text>
                  <Lock size={14} color={colors.textMuted} />
                </View>
                <View style={[styles.lockedField, { backgroundColor: isDark ? colors.surfaceMuted : "#F8FAFC", borderColor: colors.border }]}>
                  <Text style={[styles.lockedLabel, { color: colors.textMuted }]}>Phone Number</Text>
                  <Lock size={14} color={colors.textMuted} />
                </View>
                <Pressable style={styles.unlockBtn}>
                  <Lock size={15} color="#FFFFFF" />
                  <Text style={styles.unlockBtnLabel}>Unlock Lead — ETB 50</Text>
                </Pressable>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: 14, paddingHorizontal: 16, paddingBottom: 10,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  backBtn: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  sectionSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  unlocksBadge: { backgroundColor: "#DCFCE7", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 },
  unlocksText: { color: "#16A34A", fontSize: 12, fontWeight: "800" },
  filtersRow: { gap: 8, paddingVertical: 2 },
  filterChip: {
    paddingHorizontal: 14, minHeight: 34, borderRadius: 999,
    borderWidth: 1, alignItems: "center", justifyContent: "center",
  },
  filterChipActive: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  filterLabel: { fontSize: 13, fontWeight: "700" },
  filterLabelActive: { color: "#FFFFFF" },
  upgradeBanner: {
    backgroundColor: "#2563EB", borderRadius: 16,
    padding: 14, flexDirection: "row", alignItems: "center", gap: 12,
  },
  upgradeBannerIcon: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center",
  },
  upgradeBannerTitle: { color: "#FFFFFF", fontSize: 13, fontWeight: "900" },
  upgradeBannerSub: { color: "rgba(255,255,255,0.8)", fontSize: 11, fontWeight: "600", marginTop: 1 },
  upgradeBtn: {
    backgroundColor: "#FFFFFF", borderRadius: 999,
    paddingHorizontal: 14, minHeight: 34, alignItems: "center", justifyContent: "center",
  },
  upgradeBtnLabel: { color: "#2563EB", fontSize: 12, fontWeight: "900" },
  leadCard: { borderWidth: 1.5, borderColor: "#16A34A", borderRadius: 18, padding: 14, gap: 12 },
  leadCardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  tagsRow: { flexDirection: "row", gap: 6 },
  tag: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999 },
  tagText: { fontSize: 11, fontWeight: "800" },
  score: { fontSize: 12, fontWeight: "700" },
  infoGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, borderRadius: 12, padding: 10 },
  infoCell: { width: "47%" },
  infoLabel: { fontSize: 11, fontWeight: "600" },
  infoValue: { fontSize: 13, fontWeight: "900", marginTop: 2 },
  locationRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  locationText: { fontSize: 12, fontWeight: "600" },
  lockedField: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    borderWidth: 1, borderRadius: 10, paddingHorizontal: 12, minHeight: 40,
  },
  lockedLabel: { fontSize: 13, fontWeight: "600" },
  unlockBtn: {
    backgroundColor: "#16A34A", borderRadius: 12, minHeight: 48,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  unlockBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },
});
