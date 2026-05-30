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
  label: string;
  icon: LucideIcon;
  color: string;
};

export const homeCategories: HomeCategory[] = [
  { label: "Buy", icon: Home, color: palette.brand.primary },
  { label: "Rent", icon: Building2, color: palette.blue.strong },
  { label: "Projects", icon: DraftingCompass, color: palette.purple.strong },
  { label: "Agents", icon: UserCheck, color: palette.pink.primary },
  // { label: "Services", icon: Wrench, color: palette.red.muted },
  // { label: "Interior", icon: Palette, color: palette.pink.primary },
  // { label: "Movers", icon: Truck, color: "#00B4D8" },
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
};

export type HomeServiceBannerItem = {
  size?: "full" | "half";
  backgroundColor: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  image: string;
  actions?: HomeServiceBannerAction[];
};

export type HomeServiceBannerAction = {
  label: string;
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
      title: "Search Property",
      subtitle: "Buy & Rent Effortlessly",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80",

      actions: [{ label: "properties", pathname: "/property" }],
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
        title: "Post your Property",
        subtitle: "Free & Easy Listing",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            label: "create-property",
            pathname: "/post-property",
          },
        ],
      },
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: Building2,
        title: "New Projects",
        subtitle: "Off-Plan Developments",
        image:
          "https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            pathname: "/projects",
            label: "projects",
          },
        ],
      },
    ],
  },
  // {
  //   id: "home-services",
  //   layout: "single",
  //   item: {
  //     backgroundColor: "#0B3C2A",
  //     icon: Wrench,
  //     title: "Home Services",
  //     subtitle: "Cleaning, Plumbing & More",
  //     image:
  //       "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
  //   },
  // },
  // {
  //   id: "interiors-packers",
  //   layout: "pair",
  //   items: [
  //     {
  //       size: "half",
  //       backgroundColor: "#0B3C2A",
  //       icon: Sofa,
  //       title: "Interiors",
  //       subtitle: "Design & Furniture",
  //       image:
  //         "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80",
  //     },
  //     {
  //       size: "half",
  //       backgroundColor: "#0B3C2A",
  //       icon: Truck,
  //       title: "Packers & Movers",
  //       subtitle: "Safe Moving Services",
  //       image:
  //         "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80",
  //     },
  //   ],
  // },
  {
    id: "property-news-verified-brokers",
    layout: "pair",
    items: [
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: Briefcase,
        title: "Developer Hub",
        subtitle: "Build & Partner",
        image:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        actions: [
          {
            label: "Open Hub",
            pathname: "/developer-hub",
          },
        ],
      },
      {
        size: "half",
        backgroundColor: "#0B3C2A",
        icon: ShieldCheck,
        title: "Verified Brokers",
        subtitle: "Professional Agents",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80",
        actions: [
          {
            label: "Open Hub",
            pathname: "/broker-hub",
          },
        ],
      },
    ],
  },
  // {
  //   id: "telecom-integration",
  //   layout: "single",
  //   item: {
  //     backgroundColor: "#1A3A32",
  //     icon: Wrench,
  //     title: "Telecom Integration",
  //     subtitle: "Telebirr - IVR - USSD - SMS",
  //     image:
  //       "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80",
  //   },
  // },
];

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
