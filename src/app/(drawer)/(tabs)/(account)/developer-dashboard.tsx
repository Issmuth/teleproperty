import { useRouter } from "expo-router";
import {
  Building2,
  CalendarDays,
  CheckCircle2,
  CirclePlus,
  MapPin,
  Phone,
} from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const tabs = ["Projects", "Leads", "Campaigns"] as const;
type TabKey = (typeof tabs)[number];

const projects = [
  {
    id: "1",
    name: "Sunrise Residences",
    location: "Bole",
    units: 48,
    sold: 12,
    completion: "Dec 2026",
    soldPct: 25,
    remaining: 36,
    price: "From ETB 2.8M",
    status: "Active" as const,
  },
  {
    id: "2",
    name: "Capital Towers",
    location: "Kazanchis",
    units: 120,
    sold: 45,
    completion: "Mar 2027",
    soldPct: 38,
    remaining: 75,
    price: "From ETB 5.5M",
    status: "Active" as const,
  },
];

const leads = [
  { id: "1", name: "Abebe M.", project: "2BR Sunrise Residences", time: "2h ago", status: "New" as const },
  { id: "2", name: "Sara T.", project: "3BR Capital Towers", time: "5h ago", status: "Contacted" as const },
  { id: "3", name: "Yared G.", project: "Studio Sunrise Residences", time: "1d ago", status: "New" as const },
];

const campaigns = [
  { id: "1", emoji: "⭐", title: "Featured Project", subtitle: "Top placement in search", price: "ETB 2,500/wk" },
  { id: "2", emoji: "📣", title: "Homepage Banner", subtitle: "Hero section for 1 week", price: "ETB 5,000/wk" },
  { id: "3", emoji: "✉️", title: "Email Campaign", subtitle: "10K targeted buyers", price: "ETB 1,500" },
  { id: "4", emoji: "📱", title: "SMS Blast", subtitle: "Reach 5K subscribers", price: "ETB 800" },
];

export default function DeveloperDashboardScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [selectedTab, setSelectedTab] = useState<TabKey>("Projects");

  const accent = isDark ? "#C2410C" : "#EA580C";

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => {
            router.dismiss()}
          }

          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>Developer Hub</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Profile header */}
        <View style={[styles.profileCard, { backgroundColor: accent }]}>
          <View style={styles.profileAccent} />
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <Text style={[styles.avatarText, { color: accent }]}>DE</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.profileTitleRow}>
                <Text style={styles.profileTitle}>Developer Profile</Text>
                <CheckCircle2 size={16} color="rgba(255,255,255,0.9)" />
              </View>
              <Text style={styles.profileSub}>2 Active Projects · 57 Leads Total</Text>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { value: "168", label: "Units", color: accent },
            { value: "57", label: "Leads", color: "#2563EB" },
            { value: "3", label: "New Leads", color: "#DC2626" },
            { value: "37%", label: "Sold", color: "#16A34A" },
          ].map((s) => (
            <View
              key={s.label}
              style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
            >
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => {
            const isSelected = tab === selectedTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={[
                  styles.tab,
                  isSelected
                    ? { backgroundColor: accent }
                    : { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
                ]}
              >
                <Text style={[styles.tabLabel, { color: isSelected ? "#FFFFFF" : colors.textMuted }]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Projects tab */}
        {selectedTab === "Projects" && (
          <View style={styles.tabContent}>
            <Pressable
              onPress={() => {
                router.navigate("/(drawer)/(tabs)/(property)/post-property" as never)
              }}
              style={[styles.addBtn, { backgroundColor: accent }]}>
              <CirclePlus size={18} color="#FFFFFF" />
              <Text style={styles.addBtnLabel}>Add New Project</Text>
            </Pressable>

            {projects.map((p) => (
              <View
                key={p.id}
                style={[styles.projectCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={styles.projectHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.projectName, { color: colors.text }]}>{p.name}</Text>
                    <View style={styles.projectMeta}>
                      <MapPin size={12} color="#16A34A" />
                      <Text style={[styles.projectMetaText, { color: colors.textMuted }]}>{p.location}</Text>
                    </View>
                  </View>
                  <View style={styles.activeBadge}>
                    <Text style={styles.activeBadgeLabel}>{p.status}</Text>
                  </View>
                </View>

                {/* Units / Sold / Completion */}
                <View style={styles.projectStats}>
                  <View style={styles.projectStatItem}>
                    <Building2 size={12} color={colors.textMuted} />
                    <Text style={[styles.projectStatText, { color: colors.textMuted }]}>{p.units} units</Text>
                  </View>
                  <View style={styles.projectStatItem}>
                    <CheckCircle2 size={12} color="#16A34A" />
                    <Text style={[styles.projectStatText, { color: colors.textMuted }]}>{p.sold} sold</Text>
                  </View>
                  <View style={styles.projectStatItem}>
                    <CalendarDays size={12} color="#7C3AED" />
                    <Text style={[styles.projectStatText, { color: colors.textMuted }]}>{p.completion}</Text>
                  </View>
                </View>

                {/* Progress bar */}
                <View style={styles.progressRow}>
                  <Text style={[styles.progressLabel, { color: colors.textMuted }]}>{p.soldPct}% sold</Text>
                  <Text style={[styles.progressLabel, { color: colors.textMuted }]}>{p.remaining} remaining</Text>
                </View>
                <View style={[styles.progressTrack, { backgroundColor: isDark ? colors.surfaceMuted : "#E5E7EB" }]}>
                  <View style={[styles.progressFill, { width: `${p.soldPct}%` as any }]} />
                </View>

                <Text style={styles.projectPrice}>{p.price}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Leads tab */}
        {selectedTab === "Leads" && (
          <View style={styles.tabContent}>
            {/* Notice */}
            <View style={styles.leadsNotice}>
              <Text style={styles.leadsNoticeIcon}>🔔</Text>
              <View>
                <Text style={styles.leadsNoticeTitle}>3 New Leads Today!</Text>
                <Text style={styles.leadsNoticeSub}>Interested buyers from Addis Ababa</Text>
              </View>
            </View>

            {leads.map((lead) => (
              <View
                key={lead.id}
                style={[styles.leadCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <View style={styles.leadRow}>
                  <View style={[styles.leadAvatar, { backgroundColor: accent }]}>
                    <Text style={styles.leadAvatarText}>{lead.name.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.leadName, { color: colors.text }]}>{lead.name}</Text>
                    <Text style={[styles.leadProject, { color: colors.textMuted }]}>{lead.project}</Text>
                    <Text style={[styles.leadTime, { color: colors.textMuted }]}>{lead.time}</Text>
                  </View>
                  <View style={styles.leadRight}>
                    {lead.status === "New" ? (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>New</Text>
                      </View>
                    ) : (
                      <Text style={[styles.contactedLabel, { color: colors.textMuted }]}>Contacted</Text>
                    )}
                    <Pressable style={[styles.callBtn, { backgroundColor: "#16A34A" }]}>
                      <Phone size={13} color="#FFFFFF" />
                      <Text style={styles.callBtnLabel}>Call</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Campaigns tab */}
        {selectedTab === "Campaigns" && (
          <View style={styles.tabContent}>
            <Text style={[styles.campaignHint, { color: colors.textMuted }]}>
              Boost your project visibility to attract more buyers
            </Text>
            {campaigns.map((c) => (
              <View
                key={c.id}
                style={[styles.campaignCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
              >
                <Text style={styles.campaignEmoji}>{c.emoji}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.campaignTitle, { color: colors.text }]}>{c.title}</Text>
                  <Text style={[styles.campaignSub, { color: colors.textMuted }]}>{c.subtitle}</Text>
                </View>
                <View style={styles.campaignRight}>
                  <Text style={[styles.campaignPrice, { color: "#16A34A" }]}>{c.price}</Text>
                  <Pressable style={[styles.activateBtn, { backgroundColor: accent }]}>
                    <Text style={styles.activateBtnLabel}>Activate</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        )}
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
  content: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 32, gap: 14 },

  // Profile
  profileCard: { borderRadius: 22, padding: 18, overflow: "hidden" },
  profileAccent: {
    position: "absolute", right: -24, top: -24,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  avatarWrap: {
    width: 56, height: 56, borderRadius: 16,
    backgroundColor: "#FFFFFF", alignItems: "center", justifyContent: "center",
  },
  avatarText: { fontSize: 18, fontWeight: "900" },
  profileTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  profileTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  profileSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "600", marginTop: 3 },

  // Stats
  statsRow: { flexDirection: "row", gap: 8 },
  statCard: {
    flex: 1, borderWidth: 1, borderRadius: 16,
    padding: 10, alignItems: "center", gap: 3,
  },
  statValue: { fontSize: 20, fontWeight: "900" },
  statLabel: { fontSize: 10, fontWeight: "600" },

  // Tabs
  tabRow: { flexDirection: "row", gap: 8 },
  tab: { flex: 1, minHeight: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  tabLabel: { fontSize: 13, fontWeight: "800" },

  tabContent: { gap: 12 },

  // Add button
  addBtn: {
    flexDirection: "row", alignItems: "center", justifyContent: "center",
    gap: 8, minHeight: 50, borderRadius: 16,
  },
  addBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },

  // Project card
  projectCard: { borderWidth: 1, borderRadius: 18, padding: 14, gap: 10 },
  projectHeader: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
  projectName: { fontSize: 15, fontWeight: "900" },
  projectMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  projectMetaText: { fontSize: 12, fontWeight: "600" },
  activeBadge: { backgroundColor: "#DCFCE7", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  activeBadgeLabel: { color: "#16A34A", fontSize: 12, fontWeight: "800" },
  projectStats: { flexDirection: "row", gap: 14 },
  projectStatItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  projectStatText: { fontSize: 12, fontWeight: "600" },
  progressRow: { flexDirection: "row", justifyContent: "space-between" },
  progressLabel: { fontSize: 11, fontWeight: "600" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#16A34A", borderRadius: 3 },
  projectPrice: { color: "#16A34A", fontSize: 14, fontWeight: "900" },

  // Leads
  leadsNotice: {
    backgroundColor: "#FFF1F2", borderRadius: 14,
    padding: 14, flexDirection: "row", alignItems: "center", gap: 10,
  },
  leadsNoticeIcon: { fontSize: 18 },
  leadsNoticeTitle: { color: "#BE123C", fontSize: 14, fontWeight: "900" },
  leadsNoticeSub: { color: "#E11D48", fontSize: 12, fontWeight: "600", marginTop: 2 },
  leadCard: { borderWidth: 1, borderRadius: 16, padding: 14 },
  leadRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  leadAvatar: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  leadAvatarText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900" },
  leadName: { fontSize: 14, fontWeight: "900" },
  leadProject: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  leadTime: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  leadRight: { alignItems: "flex-end", gap: 6 },
  newBadge: { backgroundColor: "#FEE2E2", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999 },
  newBadgeText: { color: "#DC2626", fontSize: 11, fontWeight: "800" },
  contactedLabel: { fontSize: 12, fontWeight: "700" },
  callBtn: {
    flexDirection: "row", alignItems: "center", gap: 5,
    paddingHorizontal: 12, minHeight: 30, borderRadius: 10,
  },
  callBtnLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "800" },

  // Campaigns
  campaignHint: { fontSize: 13, fontWeight: "600" },
  campaignCard: {
    borderWidth: 1, borderRadius: 16, padding: 14,
    flexDirection: "row", alignItems: "center", gap: 12,
  },
  campaignEmoji: { fontSize: 24 },
  campaignTitle: { fontSize: 14, fontWeight: "900" },
  campaignSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  campaignRight: { alignItems: "flex-end", gap: 6 },
  campaignPrice: { fontSize: 13, fontWeight: "900" },
  activateBtn: { paddingHorizontal: 14, minHeight: 32, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  activateBtnLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
});
