import { useAuth } from "@/auth/auth-context";
import { useAuthGate } from "@/auth/use-auth-gate";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import {
    AlertCircle,
    ArrowLeft,
    Banknote,
    Building2,
    CheckCircle2,
    MessageSquareMore,
    PhoneCall,
    Search,
    Shield,
    ShieldCheck,
    Sparkles,
    Star,
    Users,
    Wrench,
} from "lucide-react-native";
import { useEffect, useMemo, useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const tabs = [
  "Overview",
  "Listings",
  "Agents",
  "Users",
  "Search",
  "Payments",
] as const;

type AdminTab = (typeof tabs)[number];

const listingItems = [
  {
    title: "3BR Villa - Bole",
    subtitle: "Samuel T. · Villa · ETB 4.5M",
    age: "Submitted 2h ago",
  },
  {
    title: "Office Space - Kazanchis",
    subtitle: "Meron A. · Commercial · ETB 12K/mo",
    age: "Submitted 5h ago",
  },
  {
    title: "2BR Apt - CMC Road",
    subtitle: "Yared G. · Apartment · ETB 22K/mo",
    age: "Submitted 1d ago",
  },
] as const;

const agentItems = [
  {
    name: "Dawit Bekele",
    company: "Bole Realty",
    email: "+251912345678",
    telegram: "@dawit_agent",
    status: "Pending",
  },
  {
    name: "Hana Tesfaye",
    company: "AA Properties",
    email: "+251923456789",
    telegram: "@hana_agent",
    status: "Pending",
  },
  {
    name: "Samuel Tadesse",
    company: "Prime Homes",
    email: "+251934567890",
    telegram: "@samuel_agent",
    status: "Verified",
  },
] as const;

const paymentItems = [
  {
    title: "Samuel T.",
    subtitle: "Pro Subscription · Today",
    amount: "ETB 1,200",
    status: "success",
  },
  {
    title: "Meron A.",
    subtitle: "Lead Unlock x2 · Today",
    amount: "ETB 100",
    status: "success",
  },
  {
    title: "Liya H.",
    subtitle: "Pro Subscription · May 1",
    amount: "ETB 1,200",
    status: "failed",
  },
] as const;

export default function AdminDashboard() {
  const { isAdmin, isAuthenticated } = useAuth();
  const { protectedRoute, isHydrated, openAuth } = useAuthGate();
  const router = useRouter();
  const { colors } = useAppTheme();
  const [selectedTab, setSelectedTab] = useState<AdminTab>("Overview");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    protectedRoute({ intent: "open_admin_dashboard", redirectTo: "/admin" });
  }, [protectedRoute]);

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) {
      return;
    }

    if (!isAdmin) {
      router.replace("/" as never);
    }
  }, [isAdmin, isAuthenticated, isHydrated, router]);

  const content = useMemo(() => {
    if (selectedTab === "Listings") {
      return (
        <View style={styles.sectionStack}>
          <Text style={styles.sectionLabel}>Pending Approval (3)</Text>
          {listingItems.map((item) => (
            <View
              key={item.title}
              style={[
                styles.listCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.listCardHead}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.listTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.listSubtitle, { color: colors.textMuted }]}
                  >
                    {item.subtitle}
                  </Text>
                  <Text style={[styles.metaText, { color: colors.textMuted }]}>
                    {item.age}
                  </Text>
                </View>
                <View
                  style={[
                    styles.pendingPill,
                    { backgroundColor: colors.activeSurface },
                  ]}
                >
                  <Text
                    style={[
                      styles.pendingPillLabel,
                      { color: colors.activeText },
                    ]}
                  >
                    pending
                  </Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Pressable
                  style={[
                    styles.approveBtn,
                    { backgroundColor: colors.activeText },
                  ]}
                >
                  <CheckCircle2 size={14} color={colors.textInverse} />
                  <Text
                    style={[
                      styles.approveBtnLabel,
                      { color: colors.textInverse },
                    ]}
                  >
                    Approve
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.rejectBtn,
                    {
                      backgroundColor: colors.surfaceMuted,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <AlertCircle size={14} color="#EF4444" />
                  <Text style={[styles.rejectBtnLabel, { color: colors.text }]}>
                    Reject
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      );
    }

    if (selectedTab === "Agents") {
      return (
        <View style={styles.sectionStack}>
          <Text style={styles.sectionLabel}>All Agents & Brokers (3)</Text>
          {agentItems.map((item) => (
            <View
              key={item.name}
              style={[
                styles.agentCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={styles.agentHeader}>
                <View>
                  <Text style={[styles.listTitle, { color: colors.text }]}>
                    {item.name}
                  </Text>
                  <Text
                    style={[styles.listSubtitle, { color: colors.textMuted }]}
                  >
                    {item.company}
                  </Text>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    { backgroundColor: colors.surfaceMuted },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusPillLabel,
                      { color: colors.textMuted },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={styles.contactLine}>
                <PhoneCall size={13} color={colors.iconMuted} />
                <Text style={[styles.contactText, { color: colors.textMuted }]}>
                  {item.email}
                </Text>
              </View>
              <View style={styles.contactLine}>
                <MessageSquareMore size={13} color={colors.iconMuted} />
                <Text style={[styles.contactText, { color: colors.textMuted }]}>
                  {item.telegram}
                </Text>
              </View>
              <View style={styles.actionRow}>
                <Pressable
                  style={[
                    styles.verifyBtn,
                    {
                      backgroundColor: colors.activeSurface,
                      borderColor: colors.activeBorder,
                    },
                  ]}
                >
                  <CheckCircle2 size={14} color={colors.activeText} />
                  <Text
                    style={[
                      styles.approveBtnLabel,
                      { color: colors.activeText },
                    ]}
                  >
                    Verify
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.ghostBtn,
                    {
                      backgroundColor: colors.surfaceMuted,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Wrench size={14} color={colors.iconMuted} />
                  <Text
                    style={[styles.ghostBtnLabel, { color: colors.textMuted }]}
                  >
                    Edit
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.rejectBtn,
                    {
                      backgroundColor: colors.surfaceMuted,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={[styles.rejectBtnLabel, { color: colors.text }]}>
                    Remove
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      );
    }

    if (selectedTab === "Users") {
      return (
        <View style={styles.sectionStack}>
          <Text style={styles.sectionLabel}>Broker Applications (3)</Text>
          {[
            {
              name: "Dawit Bekele",
              company: "Bole Realty · +251912345678",
              badge: "Pending",
            },
            {
              name: "Hana Tesfaye",
              company: "AA Properties · +251923456789",
              badge: "Pending",
            },
            {
              name: "Samuel Tadesse",
              company: "Prime Homes · +251934567890",
              badge: "Pending",
            },
          ].map((item) => (
            <View key={item.name} style={styles.userCard}>
              <View style={styles.listCardHead}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.listSubtitle}>{item.company}</Text>
                </View>
                <View style={styles.yellowPill}>
                  <Text style={styles.yellowPillLabel}>{item.badge}</Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Pressable style={styles.verifyBtn}>
                  <CheckCircle2 size={14} color="#FFFFFF" />
                  <Text style={styles.approveBtnLabel}>Approve Broker</Text>
                </Pressable>
                <Pressable style={styles.rejectBtn}>
                  <Text style={styles.rejectBtnLabel}>Reject</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <Text style={styles.sectionLabel}>Recent Users</Text>
          <View
            style={[
              styles.summaryPanel,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.summaryRow}>
              <Users size={16} color={colors.activeText} />
              <Text style={[styles.summaryText, { color: colors.textMuted }]}>
                Buyer registrations, saved searches, and inquiries.
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <ShieldCheck size={16} color={colors.activeText} />
              <Text style={[styles.summaryText, { color: colors.textMuted }]}>
                Verified broker profiles shown at the top of search results.
              </Text>
            </View>
          </View>
        </View>
      );
    }

    if (selectedTab === "Search") {
      return (
        <View style={styles.sectionStack}>
          <Text style={styles.sectionLabel}>Universal Search</Text>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Search size={16} color={colors.iconMuted} />
            <TextInput
              value={searchValue}
              onChangeText={setSearchValue}
              placeholder="Name, phone, email, ref# or referral code..."
              placeholderTextColor={colors.textMuted}
              style={[styles.searchInput, { color: colors.text }]}
            />
          </View>
          <View style={styles.filterRow}>
            <View
              style={[
                styles.filterPillActive,
                { backgroundColor: colors.activeSurface },
              ]}
            >
              {" "}
              <Text
                style={[
                  styles.filterPillActiveLabel,
                  { color: colors.activeText },
                ]}
              >
                All
              </Text>{" "}
            </View>
            <View
              style={[
                styles.filterPill,
                {
                  backgroundColor: colors.surfaceMuted,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.filterPillLabel, { color: colors.textMuted }]}
              >
                Users
              </Text>
            </View>
            <View
              style={[
                styles.filterPill,
                {
                  backgroundColor: colors.surfaceMuted,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.filterPillLabel, { color: colors.textMuted }]}
              >
                Properties
              </Text>
            </View>
            <View
              style={[
                styles.filterPill,
                {
                  backgroundColor: colors.surfaceMuted,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text
                style={[styles.filterPillLabel, { color: colors.textMuted }]}
              >
                Referrals
              </Text>
            </View>
          </View>
          <View style={styles.emptySearchState}>
            <View
              style={[
                styles.emptySearchIcon,
                { backgroundColor: colors.surfaceMuted },
              ]}
            >
              <Search size={28} color={colors.iconMuted} />
            </View>
            <Text style={[styles.emptySearchText, { color: colors.textMuted }]}>
              Type to search users, properties, or referral codes
            </Text>
          </View>
        </View>
      );
    }

    if (selectedTab === "Payments") {
      return (
        <View style={styles.sectionStack}>
          <View style={styles.paymentSummaryRow}>
            <View
              style={[
                styles.paymentSummaryCardGreen,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text
                style={[styles.paymentSummaryValue, { color: colors.text }]}
              >
                ETB 42,550
              </Text>
              <Text
                style={[
                  styles.paymentSummaryLabel,
                  { color: colors.textMuted },
                ]}
              >
                Total Revenue (May)
              </Text>
            </View>
            <View
              style={[
                styles.paymentSummaryCardBlue,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text
                style={[styles.paymentSummaryValueBlue, { color: colors.text }]}
              >
                128
              </Text>
              <Text
                style={[
                  styles.paymentSummaryLabelBlue,
                  { color: colors.textMuted },
                ]}
              >
                Transactions
              </Text>
            </View>
          </View>
          <Text style={styles.sectionLabel}>Recent Payments</Text>
          {paymentItems.map((item) => (
            <View
              key={item.title}
              style={[
                styles.paymentCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View>
                <Text style={[styles.listTitle, { color: colors.text }]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.listSubtitle, { color: colors.textMuted }]}
                >
                  {item.subtitle}
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.paymentAmount, { color: colors.text }]}>
                  {item.amount}
                </Text>
                <View
                  style={
                    item.status === "success"
                      ? [
                          styles.successPill,
                          { backgroundColor: colors.surfaceAccent },
                        ]
                      : [
                          styles.failedPill,
                          { backgroundColor: colors.surfaceMuted },
                        ]
                  }
                >
                  <Text
                    style={
                      item.status === "success"
                        ? [
                            styles.successPillLabel,
                            { color: colors.activeText },
                          ]
                        : [styles.failedPillLabel, { color: colors.text }]
                    }
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    }

    return (
      <View style={styles.sectionStack}>
        <View
          style={[
            styles.noticeCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.noticeIconWrap,
              { backgroundColor: colors.iconButtonBackground },
            ]}
          >
            <AlertCircle size={16} color={colors.activeText} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.noticeTitle, { color: colors.activeText }]}>
              3 Listings Pending Approval
            </Text>
            <Text style={[styles.noticeText, { color: colors.textMuted }]}>
              Review and approve property submissions
            </Text>
          </View>
          <Pressable
            style={[
              styles.noticeButton,
              { backgroundColor: colors.activeSurface },
            ]}
          >
            <Text
              style={[styles.noticeButtonLabel, { color: colors.activeText }]}
            >
              Review
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.noticeCardBlue,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.noticeIconWrapBlue,
              { backgroundColor: colors.iconButtonBackground },
            ]}
          >
            <Users size={16} color={colors.icon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.noticeTitleBlue, { color: colors.text }]}>
              3 Broker Applications
            </Text>
            <Text style={[styles.noticeTextBlue, { color: colors.textMuted }]}>
              New broker / agent registrations awaiting approval
            </Text>
          </View>
          <Pressable
            style={[
              styles.noticeButtonBlue,
              {
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[styles.noticeButtonLabelBlue, { color: colors.text }]}
            >
              Review
            </Text>
          </Pressable>
        </View>

        <View style={styles.metricsGrid}>
          {[
            { value: "287", label: "Active Listings", icon: Building2 },
            { value: "1.2K", label: "Total Users", icon: Users },
            { value: "ETB 42K", label: "Monthly Revenue", icon: Banknote },
            { value: "24", label: "New Projects", icon: Sparkles },
            { value: "56", label: "Service Bookings", icon: Wrench },
            { value: "94", label: "Subscriptions", icon: Star },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <View
                key={item.label}
                style={[
                  styles.metricCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.metricIconWrap,
                    { backgroundColor: colors.surfaceMuted },
                  ]}
                >
                  <Icon size={15} color={colors.icon} />
                </View>
                <Text style={[styles.metricValue, { color: colors.text }]}>
                  {item.value}
                </Text>
                <Text style={[styles.metricLabel, { color: colors.textMuted }]}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }, [selectedTab, searchValue]);

  if (!isHydrated || (!isAuthenticated && !isAdmin)) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>
          Loading admin dashboard...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.pageShell}>
        <View
          style={[styles.header, { backgroundColor: colors.headerBackground }]}
        >
          <Pressable
            style={[
              styles.backButton,
              { backgroundColor: colors.iconButtonBackground },
            ]}
            onPress={() => router.back()}
          >
            <ArrowLeft size={18} color={colors.icon} />
          </Pressable>
          <View
            style={[
              styles.headerIconWrap,
              { backgroundColor: colors.iconButtonBackground },
            ]}
          >
            <Shield size={20} color={colors.icon} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.title, { color: colors.text }]}>
              Admin Dashboard
            </Text>
            <Text style={[styles.sub, { color: colors.textMuted }]}>
              TeleProperty Management Console
            </Text>
          </View>
          <Pressable
            style={[
              styles.headerAction,
              { backgroundColor: colors.iconButtonBackground },
            ]}
            onPress={() =>
              openAuth({ intent: "admin_access", redirectTo: "/admin" })
            }
          >
            <Text style={[styles.headerActionLabel, { color: colors.text }]}>
              Access
            </Text>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          {[
            { value: "1.2K", label: "Users" },
            { value: "340", label: "Listings" },
            { value: "ETB 42K", label: "Revenue" },
            { value: "28", label: "Pending" },
          ].map((item) => (
            <View
              key={item.label}
              style={[styles.statCard, { backgroundColor: colors.surface }]}
            >
              <Text style={[styles.statValue, { color: colors.text }]}>
                {item.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textMuted }]}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsRow}
        >
          {tabs.map((tab) => {
            const selected = tab === selectedTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={styles.tabItem}
              >
                <Text
                  style={
                    selected
                      ? [styles.tabActive, { color: colors.text }]
                      : [styles.tab, { color: colors.textMuted }]
                  }
                >
                  {tab}
                </Text>
                {selected ? (
                  <View
                    style={[
                      styles.tabUnderline,
                      { backgroundColor: colors.activeText },
                    ]}
                  />
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.content}>{content}</View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#F8FAFC" },
  pageShell: { paddingBottom: 24 },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyTitle: {
    color: "#0F172A",
    fontWeight: "800",
  },
  header: {
    backgroundColor: "#0F172A",
    padding: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  headerAction: {
    minHeight: 36,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  headerActionLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  title: { color: "white", fontWeight: "800", fontSize: 18 },
  sub: { color: "#9CA3AF", marginTop: 4 },
  statsRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: { color: "white", fontWeight: "800" },
  statLabel: { color: "#94A3B8", marginTop: 6, fontSize: 12 },
  tabsRow: {
    paddingHorizontal: 12,
    gap: 18,
    paddingTop: 8,
    paddingBottom: 4,
    alignItems: "flex-end",
  },
  tabItem: {
    paddingHorizontal: 4,
    paddingBottom: 8,
  },
  tab: { color: "#6B7280", fontSize: 12, fontWeight: "700" },
  tabActive: { color: "#111827", fontSize: 12, fontWeight: "800" },
  tabUnderline: {
    marginTop: 10,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  content: {
    padding: 16,
  },
  sectionStack: {
    gap: 12,
  },
  noticeCard: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  noticeCardBlue: {
    backgroundColor: "#EFF6FF",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  noticeIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
  },
  noticeIconWrapBlue: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  noticeTitle: {
    color: "#C2410C",
    fontSize: 14,
    fontWeight: "900",
  },
  noticeText: {
    color: "#EA580C",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
  noticeTitleBlue: {
    color: "#1D4ED8",
    fontSize: 14,
    fontWeight: "900",
  },
  noticeTextBlue: {
    color: "#2563EB",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
  noticeButton: {
    backgroundColor: "#EA580C",
    borderRadius: 999,
    paddingHorizontal: 14,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeButtonBlue: {
    backgroundColor: "#2563EB",
    borderRadius: 999,
    paddingHorizontal: 14,
    minHeight: 34,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeButtonLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  noticeButtonLabelBlue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metricCard: {
    width: "48.5%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    gap: 6,
  },
  metricIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EFF6FF",
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
  },
  metricLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  listCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  listCardHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  listTitle: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
  },
  listSubtitle: {
    color: "#64748B",
    fontSize: 12,
    marginTop: 2,
    fontWeight: "600",
  },
  metaText: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 4,
    fontWeight: "600",
  },
  pendingPill: {
    backgroundColor: "#FDE68A",
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  pendingPillLabel: {
    color: "#B45309",
    fontWeight: "800",
    fontSize: 11,
  },
  statusPill: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPillLabel: {
    color: "#B45309",
    fontWeight: "800",
    fontSize: 11,
  },
  yellowPill: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowPillLabel: {
    color: "#B45309",
    fontWeight: "800",
    fontSize: 11,
  },
  actionRow: {
    flexDirection: "row",
    gap: 8,
  },
  approveBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#16A34A",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#2563EB",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  approveBtnLabel: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 12,
  },
  rejectBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  rejectBtnLabel: {
    color: "#EF4444",
    fontWeight: "900",
    fontSize: 12,
  },
  ghostBtn: {
    flex: 1,
    minHeight: 42,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  ghostBtnLabel: {
    color: "#475569",
    fontWeight: "900",
    fontSize: 12,
  },
  agentCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  agentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  contactLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  contactText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  summaryPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  summaryText: {
    flex: 1,
    color: "#475569",
    fontSize: 12,
    fontWeight: "600",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    minHeight: 52,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  filterPill: {
    backgroundColor: "#F8FAFC",
    borderRadius: 999,
    paddingHorizontal: 12,
    minHeight: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterPillActive: {
    backgroundColor: "#1E293B",
    borderRadius: 999,
    paddingHorizontal: 12,
    minHeight: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  filterPillLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "700",
  },
  filterPillActiveLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  emptySearchState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 30,
    gap: 12,
  },
  emptySearchIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
  },
  emptySearchText: {
    color: "#94A3B8",
    textAlign: "center",
    fontSize: 13,
    fontWeight: "600",
  },
  paymentSummaryRow: {
    flexDirection: "row",
    gap: 8,
  },
  paymentSummaryCardGreen: {
    flex: 1,
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  paymentSummaryCardBlue: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  paymentSummaryValue: {
    color: "#15803D",
    fontSize: 18,
    fontWeight: "900",
  },
  paymentSummaryLabel: {
    color: "#16A34A",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  paymentSummaryValueBlue: {
    color: "#1D4ED8",
    fontSize: 18,
    fontWeight: "900",
  },
  paymentSummaryLabelBlue: {
    color: "#2563EB",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
  paymentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  paymentAmount: {
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "900",
  },
  successPill: {
    marginTop: 6,
    backgroundColor: "#DCFCE7",
    borderRadius: 999,
    paddingHorizontal: 10,
    minHeight: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  successPillLabel: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "800",
  },
  failedPill: {
    marginTop: 6,
    backgroundColor: "#FEE2E2",
    borderRadius: 999,
    paddingHorizontal: 10,
    minHeight: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  failedPillLabel: {
    color: "#DC2626",
    fontSize: 11,
    fontWeight: "800",
  },
  backBtn: {
    backgroundColor: "#0B6BFF",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
});
