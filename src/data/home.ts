import {
    Building2,
    DraftingCompass,
    Gift,
    Home,
    Palette,
    Truck,
    UserCheck,
    Wrench,
    type LucideIcon,
} from "lucide-react-native";

import { palette } from "@/theme/palette";

export const homeSegments = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "projects", label: "New Projects" },
] as const;

export type HomeSegmentKey = (typeof homeSegments)[number]["key"];

export type HomeCategory = {
  label: string;
  icon: LucideIcon;
  color: string;
};

export const homeCategories: HomeCategory[] = [
  { label: "Buy", icon: Home, color: palette.brand.primary },
  { label: "Rent", icon: Building2, color: palette.blue.strong },
  { label: "Projects", icon: DraftingCompass, color: palette.purple.strong },
  { label: "Services", icon: Wrench, color: palette.red.muted },
  { label: "Interior", icon: Palette, color: palette.pink.primary },
  { label: "Movers", icon: Truck, color: "#00B4D8" },
  { label: "Agents", icon: UserCheck, color: palette.brand.accent },
  { label: "Rewards", icon: Gift, color: palette.orange.primary },
];

export const featuredProjects = [
  {
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80",
    badge: "Under construction",
    title: "Diamond Plaza Complex",
    location: "Addis Ababa, Kazanchis",
    stats: "320+ units",
    rating: "4.9",
    price: "From ETB 3.2M",
    agency: "Elite Builders",
    accent: palette.brand.primary,
  },
  {
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80",
    badge: "Launch soon",
    title: "Skyline Residence",
    location: "Bole, Addis Ababa",
    stats: "180+ units",
    rating: "4.8",
    price: "From ETB 2.7M",
    agency: "Urban Nest",
    accent: palette.blue.primary,
  },
] as const;

export const featuredProperties = [
  {
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=900&q=80",
    title: "Modern family villa",
    location: "Megenagna, Addis Ababa",
    price: "ETB 8.4M",
  },
  {
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80",
    title: "Garden apartment",
    location: "CMC, Addis Ababa",
    price: "ETB 4.1M",
  },
  {
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    title: "Penthouse suite",
    location: "22, Addis Ababa",
    price: "ETB 12.5M",
  },
] as const;

export type Story = {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
  cta?: string;
};

export const categoryStories: Record<string, Story[]> = {
  Buy: [
    {
      id: "buy-1",
      image:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      title: "Buy Property",
      subtitle: "12,400+ listings",
      cta: "Browse Now",
    },
    {
      id: "buy-2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      title: "Cozy Family Homes",
      subtitle: "New listings today",
      cta: "Explore",
    },
  ],
  Projects: [
    {
      id: "proj-1",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      title: "Diamond Plaza Complex",
      subtitle: "Launch offers available",
      cta: "View Project",
    },
  ],
};
