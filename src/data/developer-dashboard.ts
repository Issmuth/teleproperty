export const developerDashboardTabs = ["Projects", "Leads", "Campaigns"] as const;
export type DeveloperDashboardTab = (typeof developerDashboardTabs)[number];

export type DeveloperProject = {
  id: string;
  name: string;
  location: string;
  units: number;
  sold: number;
  completion: string;
  soldPct: number;
  remaining: number;
  price: string;
  status: "Active";
};

export const developerProjects: DeveloperProject[] = [
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
    status: "Active",
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
    status: "Active",
  },
];

export type DeveloperLead = {
  id: string;
  name: string;
  project: string;
  time: string;
  status: "New" | "Contacted";
};

export const developerLeads: DeveloperLead[] = [
  {
    id: "1",
    name: "Abebe M.",
    project: "2BR Sunrise Residences",
    time: "2h ago",
    status: "New",
  },
  {
    id: "2",
    name: "Sara T.",
    project: "3BR Capital Towers",
    time: "5h ago",
    status: "Contacted",
  },
  {
    id: "3",
    name: "Yared G.",
    project: "Studio Sunrise Residences",
    time: "1d ago",
    status: "New",
  },
];

export type DeveloperCampaign = {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  price: string;
};

export const developerCampaigns: DeveloperCampaign[] = [
  {
    id: "1",
    emoji: "⭐",
    title: "Featured Project",
    subtitle: "Top placement in search",
    price: "ETB 2,500/wk",
  },
  {
    id: "2",
    emoji: "📣",
    title: "Homepage Banner",
    subtitle: "Hero section for 1 week",
    price: "ETB 5,000/wk",
  },
  {
    id: "3",
    emoji: "✉️",
    title: "Email Campaign",
    subtitle: "10K targeted buyers",
    price: "ETB 1,500",
  },
  {
    id: "4",
    emoji: "📱",
    title: "SMS Blast",
    subtitle: "Reach 5K subscribers",
    price: "ETB 800",
  },
];
