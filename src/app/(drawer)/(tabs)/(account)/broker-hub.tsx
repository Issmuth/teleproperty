import { useRouter } from "expo-router";
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    BookOpenText,
    Briefcase,
    Building2,
    CheckCircle2,
    ClipboardList,
    Clock3,
    Contact2,
    Gauge,
    Landmark,
    MessageSquareMore,
    PhoneCall,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    Waves
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const tabs = [
  "Overview",
  "Listings",
  "Agents",
  "Users",
  "Search",
  "Payments",
] as const;

type TabKey = (typeof tabs)[number];

const quickActions = [
  { label: "Register as Broker", icon: Briefcase },
  { label: "Upload Listings", icon: ClipboardList },
  { label: "Verified Leads", icon: Users },
  { label: "Client Inquiries", icon: MessageSquareMore },
] as const;

const overviewBenefits = [
  {
    icon: Users,
    title: "Receive verified buyer & tenant leads",
    subtitle: "Capture serious enquiries from active property seekers.",
  },
  {
    icon: TrendingUp,
    title: "Grow your client base across Ethiopia",
    subtitle: "Reach more buyers, renters, and investors in one place.",
  },
  {
    icon: Sparkles,
    title: "Featured placement for your listings",
    subtitle: "Give priority visibility to premium properties.",
  },
  {
    icon: ShieldCheck,
    title: "Earn broker reputation & verified badge",
    subtitle: "Build trust with a visible, verified profile.",
  },
] as const;

const listingItems = [
  {
    title: "3BR Villa - Bole",
    subtitle: "Samuel T. · Villa · ETB 4.5M",
    tag: "pending",
  },
  {
    title: "Office Space - Kazanchis",
    subtitle: "Meron A. · Commercial · ETB 12K/mo",
    tag: "pending",
  },
  {
    title: "2BR Apt - CMC Road",
    subtitle: "Yared G. · Apartment · ETB 22K/mo",
    tag: "pending",
  },
] as const;

const agentItems = [
  {
    name: "Dawit Bekele",
    company: "Bole Realty",
    status: "Pending",
  },
  {
    name: "Hana Tesfaye",
    company: "AA Properties",
    status: "Pending",
  },
  {
    name: "Samuel Tadesse",
    company: "Prime Homes",
    status: "Verified",
  },
] as const;

const userItems = [
  {
    title: "Broker Applications",
    subtitle: "3 new profiles awaiting approval",
    icon: Contact2,
  },
  {
    title: "Recent Users",
    subtitle: "New buyers and renters joined today",
    icon: Users,
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

export default function BrokerHubScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [selectedTab, setSelectedTab] = useState<TabKey>("Overview");

  const content = useMemo(() => {
    if (selectedTab === "Listings") {
      return (
        <View style={styles.sectionStack}>
          <Text style={styles.sectionLabel}>Pending Approval (3)</Text>
          {listingItems.map((item) => (
            <View key={item.title} style={styles.listCard}>
              <View style={styles.listCardHead}>
                <View>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <Text style={styles.listSubtitle}>{item.subtitle}</Text>
                </View>
                <View style={styles.pendingPill}>
                  <Text style={styles.pendingPillLabel}>{item.tag}</Text>
                </View>
              </View>
              <View style={styles.actionRow}>
                <Pressable style={styles.approveBtn}>
                  <CheckCircle2 size={14} color="#FFFFFF" />
                  <Text style={styles.approveBtnLabel}>Approve</Text>
                </Pressable>
                <Pressable style={styles.rejectBtn}>
                  <AlertCircle size={14} color="#EF4444" />
                  <Text style={styles.rejectBtnLabel}>Reject</Text>
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
            <View key={item.name} style={styles.agentCard}>
              <View style={styles.agentHeader}>
                <View>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.listSubtitle}>{item.company}</Text>
                </View>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillLabel}>{item.status}</Text>
                </View>
              </View>
              <View style={styles.contactLine}>
                <PhoneCall size={13} color="#94A3B8" />
                <Text style={styles.contactText}>+251912345678</Text>
              </View>
              <View style={styles.contactLine}>
                <MessageSquareMore size={13} color="#94A3B8" />
                <Text style={styles.contactText}>dawit@bolerealty.et</Text>
              </View>
              <View style={styles.actionRow}>
                <Pressable style={styles.verifyBtn}>
                  <CheckCircle2 size={14} color="#FFFFFF" />
                  <Text style={styles.approveBtnLabel}>Verify</Text>
                </Pressable>
                <Pressable style={styles.ghostBtn}>
                  <BookOpenText size={14} color="#475569" />
                  <Text style={styles.ghostBtnLabel}>Edit</Text>
                </Pressable>
                <Pressable style={styles.rejectBtn}>
                  <Text style={styles.rejectBtnLabel}>Remove</Text>
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
          {userItems.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.title} style={styles.userCard}>
                <View style={styles.userInfo}>
                  <View style={styles.userIconWrap}>
                    <Icon size={16} color="#1D4ED8" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listTitle}>{item.title}</Text>
                    <Text style={styles.listSubtitle}>{item.subtitle}</Text>
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
            );
          })}

          <Text style={styles.sectionLabel}>Recent Users</Text>
          <View style={styles.summaryPanel}>
            <View style={styles.summaryRow}>
              <Users size={16} color="#2563EB" />
              <Text style={styles.summaryText}>
                Buyer registrations, saved searches, and inquiries.
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <ShieldCheck size={16} color="#10B981" />
              <Text style={styles.summaryText}>
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
          <View style={styles.searchBox}>
            <Users size={16} color="#94A3B8" />
            <Text style={styles.searchPlaceholder}>
              Name, phone, email, ref# or referral code...
            </Text>
          </View>
          <View style={styles.filterRow}>
            <View style={styles.filterPillActive}>
              <Text style={styles.filterPillActiveLabel}>All</Text>
            </View>
            <View style={styles.filterPill}>
              <Text style={styles.filterPillLabel}>Users</Text>
            </View>
            <View style={styles.filterPill}>
              <Text style={styles.filterPillLabel}>Properties</Text>
            </View>
            <View style={styles.filterPill}>
              <Text style={styles.filterPillLabel}>Referrals</Text>
            </View>
          </View>
          <View style={styles.emptySearchState}>
            <View style={styles.emptySearchIcon}>
              <BarChart3 size={28} color="#CBD5E1" />
            </View>
            <Text style={styles.emptySearchText}>
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
            <View style={styles.paymentSummaryCardGreen}>
              <Text style={styles.paymentSummaryValue}>ETB 42,550</Text>
              <Text style={styles.paymentSummaryLabel}>
                Total Revenue (May)
              </Text>
            </View>
            <View style={styles.paymentSummaryCardBlue}>
              <Text style={styles.paymentSummaryValueBlue}>128</Text>
              <Text style={styles.paymentSummaryLabelBlue}>Transactions</Text>
            </View>
          </View>
          <Text style={styles.sectionLabel}>Recent Payments</Text>
          {paymentItems.map((item) => (
            <View key={item.title} style={styles.paymentCard}>
              <View>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listSubtitle}>{item.subtitle}</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.paymentAmount}>{item.amount}</Text>
                <View
                  style={
                    item.status === "success"
                      ? styles.successPill
                      : styles.failedPill
                  }
                >
                  <Text
                    style={
                      item.status === "success"
                        ? styles.successPillLabel
                        : styles.failedPillLabel
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
        <View style={styles.overviewNotice}>
          <View>
            <Text style={styles.noticeTitle}>2 New Matching Leads!</Text>
            <Text style={styles.noticeText}>
              Buyers looking in Bole & Kazanchis - unlock now
            </Text>
          </View>
          <Pressable style={styles.noticeButton}>
            <Text style={styles.noticeButtonLabel}>View</Text>
          </Pressable>
        </View>

        <View style={styles.benefitsCard}>
          <Text style={styles.sectionLabel}>Why join as a Broker?</Text>
          {overviewBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.title} style={styles.benefitRow}>
                <View style={styles.benefitIcon}>
                  <Icon size={16} color="#2563EB" />
                </View>
                <View style={styles.benefitCopy}>
                  <Text style={styles.benefitTitle}>{item.title}</Text>
                  <Text style={styles.benefitSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.metricsGrid}>
          {[
            { value: "4", label: "My Listings", icon: Building2 },
            { value: "2", label: "New Leads", icon: BellIcon },
            { value: "3", label: "Callbacks", icon: PhoneCall },
            { value: "ETB 400", label: "Wallet", icon: Landmark },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <View key={item.label} style={styles.metricCard}>
                <View style={styles.metricIconWrap}>
                  <Icon size={15} color="#2563EB" />
                </View>
                <Text style={styles.metricValue}>{item.value}</Text>
                <Text style={styles.metricLabel}>{item.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <Text style={styles.sectionLabel}>My Subscription</Text>
            <View style={styles.activePill}>
              <Text style={styles.activePillLabel}>Active</Text>
            </View>
          </View>
          <View style={styles.subscriptionRow}>
            <View style={styles.subscriptionBlock}>
              <Text style={styles.subscriptionValue}>Standard</Text>
              <Text style={styles.subscriptionLabel}>Current Plan</Text>
            </View>
            <View style={styles.subscriptionBlock}>
              <Text style={styles.subscriptionValue}>48 left</Text>
              <Text style={styles.subscriptionLabel}>Leads Remaining</Text>
            </View>
            <View style={styles.subscriptionBlock}>
              <Text style={styles.subscriptionValue}>Jun 3</Text>
              <Text style={styles.subscriptionLabel}>Renewal Date</Text>
            </View>
          </View>
          <Pressable style={styles.upgradeBtn}>
            <Text style={styles.upgradeBtnLabel}>Upgrade Plan</Text>
          </Pressable>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionRow}>
            <View style={styles.summaryIconWrap}>
              <Users size={16} color="#DC2626" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>Verified Leads</Text>
              <Text style={styles.listSubtitle}>2 new leads available</Text>
            </View>
            <View style={styles.newPill}>
              <Text style={styles.newPillLabel}>2 New</Text>
            </View>
          </View>
          <View style={styles.linkList}>
            {[
              {
                icon: Building2,
                title: "My Listings",
                subtitle: "4 listings · 2 active",
              },
              {
                icon: PlusIcon,
                title: "Add New Listing",
                subtitle: "Post a property for sale or rent",
              },
              {
                icon: Landmark,
                title: "Broker Wallet",
                subtitle: "Balance: ETB 400",
              },
              {
                icon: ShieldCheck,
                title: "Subscription & Plans",
                subtitle: "Standard Plan · Active",
              },
              {
                icon: Clock3,
                title: "Callback Requests",
                subtitle: "3 pending callbacks",
              },
              {
                icon: MessageSquareMore,
                title: "WhatsApp Inquiries",
                subtitle: "Messages from interested buyers",
              },
              {
                icon: BookOpenText,
                title: "Payment History",
                subtitle: "All billing transactions",
              },
              {
                icon: CheckCircle2,
                title: "Profile Verification",
                subtitle: "Complete profile to get badge",
              },
              {
                icon: Gauge,
                title: "Performance Analytics",
                subtitle: "Views, leads, conversions",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <View key={item.title} style={styles.linkRow}>
                  <View style={styles.linkIconWrap}>
                    <Icon size={16} color="#2563EB" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.linkTitle}>{item.title}</Text>
                    <Text style={styles.linkSubtitle}>{item.subtitle}</Text>
                  </View>
                  <ArrowRight size={16} color="#94A3B8" />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }, [selectedTab]);

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
            Broker Hub
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.textMuted }]}>
            Manage listings, leads, and your brokerage business
          </Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.heroWrap}>
          <View style={styles.heroAccent} />
          <View style={styles.heroAccentRight} />
          <View style={styles.heroIconWrap}>
            <Waves size={24} color="#FFFFFF" />
          </View>
          <Text style={styles.heroTitle}>Broker / Agent Hub</Text>
          <Text style={styles.heroCopy}>
            Join Ethiopia's fastest-growing property platform. Get verified
            leads, manage listings, and grow your business.
          </Text>

          <View style={styles.chipRow}>
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <View key={action.label} style={styles.chip}>
                  <Icon size={12} color="#FFFFFF" />
                  <Text style={styles.chipLabel}>{action.label}</Text>
                </View>
              );
            })}
          </View>

          <Pressable
            onPress={() => router.replace("/(account)/register" as never)}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Register as Broker →</Text>
          </Pressable>
        </View>

        <View style={styles.tabRow}>
          {tabs.map((tab) => {
            const selected = tab === selectedTab;
            return (
              <Pressable
                key={tab}
                onPress={() => setSelectedTab(tab)}
                style={styles.tabItem}
              >
                <Text style={selected ? styles.tabActive : styles.tabLabel}>
                  {tab}
                </Text>
                {selected ? <View style={styles.tabUnderline} /> : null}
              </Pressable>
            );
          })}
        </View>

        {content}
      </ScrollView>
    </View>
  );
}

function BellIcon({ size, color }: { size: number; color: string }) {
  return <AlertCircle size={size} color={color} />;
}

function PlusIcon({ size, color }: { size: number; color: string }) {
  return <ArrowRight size={size} color={color} />;
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
    backgroundColor: "#2F5BEA",
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
    gap: 10,
    minHeight: 240,
  },
  heroAccent: {
    position: "absolute",
    right: -32,
    top: -28,
    width: 108,
    height: 108,
    borderRadius: 108,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  heroAccentRight: {
    position: "absolute",
    right: -10,
    bottom: -8,
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
    color: "rgba(255,255,255,0.96)",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    maxWidth: 276,
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
    color: "#1D4ED8",
    fontSize: 13,
    fontWeight: "900",
  },
  tabRow: {
    flexDirection: "row",
    paddingHorizontal: 2,
    gap: 18,
    alignItems: "flex-end",
  },
  tabItem: {
    paddingBottom: 6,
  },
  tabLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
  },
  tabActive: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },
  tabUnderline: {
    marginTop: 8,
    height: 2,
    borderRadius: 999,
    backgroundColor: "#111827",
  },
  sectionStack: {
    gap: 12,
  },
  sectionLabel: {
    color: "#475569",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  overviewNotice: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
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
  noticeButton: {
    backgroundColor: "#EA580C",
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
  benefitsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 18,
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
    backgroundColor: "#EFF6FF",
  },
  benefitCopy: {
    flex: 1,
    gap: 2,
  },
  benefitTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#0F172A",
  },
  benefitSubtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    color: "#64748B",
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
    borderRadius: 18,
    padding: 14,
    gap: 6,
  },
  metricIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 12,
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
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 12,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  activePill: {
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  activePillLabel: {
    color: "#16A34A",
    fontWeight: "800",
    fontSize: 11,
  },
  subscriptionRow: {
    flexDirection: "row",
    gap: 8,
  },
  subscriptionBlock: {
    flex: 1,
    backgroundColor: "#EFF6FF",
    borderRadius: 14,
    padding: 12,
    gap: 2,
  },
  subscriptionValue: {
    color: "#1D4ED8",
    fontWeight: "900",
    fontSize: 13,
  },
  subscriptionLabel: {
    color: "#64748B",
    fontWeight: "600",
    fontSize: 11,
  },
  upgradeBtn: {
    backgroundColor: "#2563EB",
    borderRadius: 14,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  upgradeBtnLabel: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 13,
  },
  newPill: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 10,
    minHeight: 24,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  newPillLabel: {
    color: "#DC2626",
    fontWeight: "800",
    fontSize: 11,
  },
  summaryIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
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
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  userIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
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
  searchPlaceholder: {
    color: "#94A3B8",
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
  linkList: {
    gap: 10,
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 4,
  },
  linkIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  linkTitle: {
    color: "#0F172A",
    fontSize: 13,
    fontWeight: "800",
  },
  linkSubtitle: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
  },
});
