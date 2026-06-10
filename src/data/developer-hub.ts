import {
    Building2,
    ClipboardList,
    Gauge,
    Megaphone,
    Plus,
    Users,
    type LucideIcon,
} from "lucide-react-native";

export type DeveloperQuickAction = {
  label: string;
  icon: LucideIcon;
};

export const developerHubQuickActions: DeveloperQuickAction[] = [
  { label: "Add Projects", icon: Plus },
  { label: "Unit Management", icon: Building2 },
  { label: "Lead Dashboard", icon: ClipboardList },
  { label: "Campaigns", icon: Megaphone },
];

export type DeveloperBenefit = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export const developerHubBenefits: DeveloperBenefit[] = [
  {
    icon: Building2,
    title: "List off-plan and ready projects",
    subtitle: "Showcase developments with structured project details.",
  },
  {
    icon: Users,
    title: "Receive verified buyer leads",
    subtitle: "Capture and manage serious inquiries in one place.",
  },
  {
    icon: Gauge,
    title: "Track views, enquiries & sales",
    subtitle: "Measure the performance of each development or campaign.",
  },
  {
    icon: Megaphone,
    title: "Run sponsored campaigns",
    subtitle: "Promote flagship projects with targeted placement.",
  },
];
