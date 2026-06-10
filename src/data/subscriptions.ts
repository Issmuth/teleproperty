export type SubscriptionPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  icon: string;
  iconBg: string;
  cardBg: string;
  leads: string;
  listings: string;
  featured: string;
  popular: boolean;
  bestValue: boolean;
  features: readonly string[];
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic Broker Plan",
    price: "ETB 800",
    period: "/month",
    icon: "⭐",
    iconBg: "#1E293B",
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
    name: "Professional Broker Plan",
    price: "ETB 1,500",
    period: "/month",
    icon: "⚡",
    iconBg: "rgba(255,255,255,0.2)",
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
    name: "Developer / Agency Plan",
    price: "ETB 3,500",
    period: "/month",
    icon: "👑",
    iconBg: "rgba(255,255,255,0.2)",
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
