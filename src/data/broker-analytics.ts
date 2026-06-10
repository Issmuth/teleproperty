import {
    Building2,
    CreditCard,
    Star,
    TrendingUp,
    Users,
    Wrench,
    type LucideIcon,
} from "lucide-react-native";

export type StatCard = {
  icon: LucideIcon;
  color: string;
  bg: string;
  value: string;
  label: string;
  trend: string;
  trendColor: string;
};

export const brokerAnalyticsStatCards: StatCard[] = [
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
];

export const revenueData = [
  { day: "Mon", value: 5000 },
  { day: "Tue", value: 7500 },
  { day: "Wed", value: 3500 },
  { day: "Thu", value: 9200 },
  { day: "Fri", value: 11800 },
  { day: "Sat", value: 8800 },
  { day: "Sun", value: 6200 },
];

export const cityData = [
  { name: "Addis Ababa", pct: 68, color: "#16A34A" },
  { name: "Dire Dawa", pct: 12, color: "#2563EB" },
  { name: "Hawassa", pct: 9, color: "#7C3AED" },
  { name: "Bahir Dar", pct: 7, color: "#EA580C" },
  { name: "Others", pct: 4, color: "#94A3B8" },
];

export const topSearches = [
  { rank: 1, query: "3BR Apartment Bole", count: 1240 },
  { rank: 2, query: "Villa for Sale Addis", count: 980 },
  { rank: 3, query: "Apartment for Rent", count: 870 },
  { rank: 4, query: "Land in Addis Ababa", count: 740 },
  { rank: 5, query: "Commercial Space Bole", count: 620 },
];
