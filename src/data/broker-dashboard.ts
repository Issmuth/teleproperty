import {
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
    type LucideIcon,
} from "lucide-react-native";

export type BrokerMetric = {
  value: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
  bg: string;
};

export const brokerDashboardMetrics: BrokerMetric[] = [
  {
    value: "4",
    labelKey: "account.brokerDashboard.metrics.myListings",
    icon: Building2,
    color: "#6366F1",
    bg: "#EEF2FF",
  },
  {
    value: "2",
    labelKey: "account.brokerDashboard.metrics.newLeads",
    icon: Bell,
    color: "#EF4444",
    bg: "#FEF2F2",
  },
  {
    value: "3",
    labelKey: "account.brokerDashboard.metrics.callbacks",
    icon: Phone,
    color: "#8B5CF6",
    bg: "#F5F3FF",
  },
  {
    value: "ETB 400",
    labelKey: "account.brokerDashboard.metrics.wallet",
    icon: Wallet,
    color: "#10B981",
    bg: "#ECFDF5",
  },
];

export type QuickLink = {
  icon: LucideIcon;
  color: string;
  bg: string;
  titleKey: string;
  subtitleKey: string;
  badge: string | null;
  badgeColor: string | null;
  badgeBg: string | null;
  route: string;
};

export const brokerDashboardQuickLinks: QuickLink[] = [
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
];
