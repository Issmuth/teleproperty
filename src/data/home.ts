import {
  Briefcase,
  Building2,
  DraftingCompass,
  Home,
  Plus,
  Search,
  ShieldCheck,
  UserCheck,
  type LucideIcon,
} from "lucide-react-native";

import { palette } from "@/theme/palette";

export const homeSegments = [
  { key: "buy", label: "Buy" },
  { key: "rent", label: "Rent" },
  { key: "projects", label: "Projects" },
] as const;

export type HomeSegmentKey = (typeof homeSegments)[number]["key"];

export type HomeCategory = {
  key: string;
  labelKey: string;
  icon: LucideIcon;
  color: string;
};

export const homeCategories: HomeCategory[] = [
  {
    key: "buy",
    labelKey: "home.categories.buy",
    icon: Home,
    color: palette.brand.primary,
  },
  {
    key: "rent",
    labelKey: "home.categories.rent",
    icon: Building2,
    color: palette.blue.strong,
  },
  {
    key: "projects",
    labelKey: "home.categories.projects",
    icon: DraftingCompass,
    color: palette.purple.strong,
  },
  {
    key: "agents",
    labelKey: "home.categories.agents",
    icon: UserCheck,
    color: palette.pink.primary,
  },
];

export const featuredProjects = [
  {
    id: "diamond-plaza",
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
    id: "skyline-residence",
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
    id: "featured-property-1",
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=900&q=80",
    title: "Modern family villa",
    location: "Megenagna, Addis Ababa",
    price: "ETB 8.4M",
  },
  {
    id: "featured-property-2",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=900&q=80",
    title: "Garden apartment",
    location: "CMC, Addis Ababa",
    price: "ETB 4.1M",
  },
  {
    id: "featured-property-3",
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
  pathname?: string;
  params?: Record<string, string>;
};

export type HomeServiceBannerItem = {
  size?: "full" | "half";
  backgroundColor: string;
  icon: LucideIcon;
  titleKey: string;
  subtitleKey: string;
  image: string;
  actions?: HomeServiceBannerAction[];
};

export type HomeServiceBannerAction = {
  labelKey: string;
  pathname: string;
  params?: Record<string, string>;
};

export type HomeServicesGroup =
  | {
      id: string;
      layout: "single";
      item: HomeServiceBannerItem;
    }
  | {
      id: string;
      layout: "pair";
      items: [HomeServiceBannerItem, HomeServiceBannerItem];
    };

export const homeServiceBanners: HomeServicesGroup[] = [
  {
    id: "search-property",
    layout: "single",
    item: {
      backgroundColor: "#0B3C2A",
      icon: Search,
      titleKey: "home.services.searchProperty.title",
      subtitleKey: "home.services.searchProperty.subtitle",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",

      actions: [
        {
          labelKey: "home.services.searchProperty.action",
          pathname: "/property",
        },
      ],
    },
  },
  {
    id: "post-property-new-projects",
    layout: "pair",
    items: [
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: Plus,
        titleKey: "home.services.postProperty.title",
        subtitleKey: "home.services.postProperty.subtitle",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            labelKey: "home.services.postProperty.action",
            pathname: "/post-property",
          },
        ],
      },
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: Building2,
        titleKey: "home.services.newProjects.title",
        subtitleKey: "home.services.newProjects.subtitle",
        image:
          "https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            pathname: "/projects",
            labelKey: "home.services.newProjects.action",
          },
        ],
      },
    ],
  },
  {
    id: "property-news-verified-brokers",
    layout: "pair",
    items: [
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: Briefcase,
        titleKey: "home.services.developerHub.title",
        subtitleKey: "home.services.developerHub.subtitle",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        actions: [
          {
            labelKey: "home.services.developerHub.action",
            pathname: "/developer-hub",
          },
        ],
      },
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: ShieldCheck,
        titleKey: "home.services.verifiedBrokers.title",
        subtitleKey: "home.services.verifiedBrokers.subtitle",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            labelKey: "home.services.verifiedBrokers.action",
            pathname: "/(account)/broker-hub",
          },
        ],
      },
    ],
  },
];

export const categoryStories: Record<string, Story[]> = {
  buy: [
    {
      id: "property-1",
      image:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      title: "Modern Family Villa",
      subtitle: "4 Beds · 3 Baths · 350 m² · Megenagna, Addis Ababa · ETB 8.4M",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "prop-villa-1", source: "story" },
    },
    {
      id: "property-2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      title: "Luxury Penthouse Suite",
      subtitle: "3 Beds · 2 Baths · 280 m² · 22, Addis Ababa · ETB 12.5M",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "prop-penthouse-1", source: "story" },
    },
    {
      id: "property-3",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      title: "Contemporary Apartment",
      subtitle: "2 Beds · 2 Baths · 180 m² · Bole, Addis Ababa · ETB 5.8M",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "prop-apt-1", source: "story" },
    },
  ],
  rent: [
    {
      id: "rental-1",
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      title: "Furnished Studio Apartment",
      subtitle: "1 Bed · 1 Bath · 65 m² · CMC, Addis Ababa · ETB 18K/month",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "rent-studio-1", source: "story" },
    },
    {
      id: "rental-2",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1de2d1d0cb?auto=format&fit=crop&w=1200&q=80",
      title: "Modern 2BR Apartment",
      subtitle: "2 Beds · 1 Bath · 95 m² · Kazanchis, Addis Ababa · ETB 28K/month",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "rent-2br-1", source: "story" },
    },
    {
      id: "rental-3",
      image:
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1200&q=80",
      title: "Spacious Family Home",
      subtitle: "3 Beds · 2 Baths · 220 m² · Megenagna, Addis Ababa · ETB 45K/month",
      cta: "View details",
      pathname: "/property-details",
      params: { id: "rent-house-1", source: "story" },
    },
  ],
  projects: [
    {
      id: "project-1",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      title: "Diamond Plaza Complex",
      subtitle: "320+ units · Under Construction · Kazanchis · From ETB 3.2M",
      cta: "View project",
      pathname: "/project-details",
      params: { id: "diamond-plaza", source: "story" },
    },
    {
      id: "project-2",
      image:
        "https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=1200&q=80",
      title: "Skyline Residence",
      subtitle: "180+ units · Launch Soon · Bole · From ETB 2.7M",
      cta: "View project",
      pathname: "/project-details",
      params: { id: "skyline-residence", source: "story" },
    },
    {
      id: "project-3",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
      title: "Green Valley Homes",
      subtitle: "150+ units · Pre-Launch · Lebu · From ETB 4.5M",
      cta: "View project",
      pathname: "/project-details",
      params: { id: "green-valley", source: "story" },
    },
  ],
  agents: [
    {
      id: "agent-1",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1200&q=80",
      title: "Sarah Bekele",
      subtitle: "Verified Broker · 8 years experience · 250+ properties sold · 4.9★",
      cta: "View profile",
      pathname: "/(account)/broker-hub",
      params: { id: "agent-sarah", source: "story" },
    },
    {
      id: "agent-2",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80",
      title: "Michael Tadesse",
      subtitle: "Verified Broker · 5 years experience · 180+ properties sold · 4.8★",
      cta: "View profile",
      pathname: "/(account)/broker-hub",
      params: { id: "agent-michael", source: "story" },
    },
    {
      id: "agent-3",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
      title: "Daniel Alemu",
      subtitle: "Verified Broker · 12 years experience · 400+ properties sold · 5.0★",
      cta: "View profile",
      pathname: "/(account)/broker-hub",
      params: { id: "agent-daniel", source: "story" },
    },
  ],
};
