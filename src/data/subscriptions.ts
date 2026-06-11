import { Crown, Star, Zap, type LucideIcon } from "lucide-react-native";

export type SubscriptionPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  icon: LucideIcon;
  iconColor: string;
  cardBg: string;
  leads: string;
  listings: string;
  featured: string;
  popular: boolean;
  bestValue: boolean;
  features: string[];
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic Broker",
    price: "ETB 800",
    period: "/month",
    icon: Star,
    iconColor: "#94A3B8",
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
    name: "Professional",
    price: "ETB 1,500",
    period: "/month",
    icon: Zap,
    iconColor: "#FFF",
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
    name: "Agency",
    price: "ETB 3,500",
    period: "/month",
    icon: Crown,
    iconColor: "#FFF",
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
];

// Mock subscription state - in real app this would come from backend/API
export const mockUserSubscription = {
  hasSubscription: true,
  planId: "pro",
  startDate: new Date(2024, 0, 15),
  nextBilling: new Date(2024, 1, 15),
  autoRenew: true,
  transactionRef: "TLP-575485",
};
