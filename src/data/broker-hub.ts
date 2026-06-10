import {
    Briefcase,
    ClipboardList,
    MessageSquareMore,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Users,
    type LucideIcon,
} from "lucide-react-native";

export type QuickAction = {
  labelKey: string;
  icon: LucideIcon;
};

export const brokerHubQuickActions: QuickAction[] = [
  { labelKey: "account.brokerHub.quick.register", icon: Briefcase },
  { labelKey: "account.brokerHub.quick.uploadListings", icon: ClipboardList },
  { labelKey: "account.brokerHub.quick.verifiedLeads", icon: Users },
  {
    labelKey: "account.brokerHub.quick.clientInquiries",
    icon: MessageSquareMore,
  },
];

export type BrokerBenefit = {
  icon: LucideIcon;
  titleKey: string;
  subtitleKey: string;
};

export const brokerHubBenefits: BrokerBenefit[] = [
  {
    icon: Users,
    titleKey: "account.brokerHub.benefit.receive.title",
    subtitleKey: "account.brokerHub.benefit.receive.subtitle",
  },
  {
    icon: TrendingUp,
    titleKey: "account.brokerHub.benefit.grow.title",
    subtitleKey: "account.brokerHub.benefit.grow.subtitle",
  },
  {
    icon: Sparkles,
    titleKey: "account.brokerHub.benefit.featured.title",
    subtitleKey: "account.brokerHub.benefit.featured.subtitle",
  },
  {
    icon: ShieldCheck,
    titleKey: "account.brokerHub.benefit.reputation.title",
    subtitleKey: "account.brokerHub.benefit.reputation.subtitle",
  },
];
