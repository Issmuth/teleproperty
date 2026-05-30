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
  // { label: "Services", icon: Wrench, color: palette.red.muted },
  // { label: "Interior", icon: Palette, color: palette.pink.primary },
  // { label: "Movers", icon: Truck, color: "#00B4D8" },
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
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
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
  buy: [
    {
      id: "buy-1",
      image:
        "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1200&q=80",
      titleKey: "home.stories.buy1.title",
      subtitleKey: "home.stories.buy1.subtitle",
      ctaKey: "home.stories.buy1.cta",
    },
    {
      id: "buy-2",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      titleKey: "home.stories.buy2.title",
      subtitleKey: "home.stories.buy2.subtitle",
      ctaKey: "home.stories.buy2.cta",
    },
  ],
  projects: [
    {
      id: "proj-1",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      titleKey: "home.stories.project1.title",
      subtitleKey: "home.stories.project1.subtitle",
      ctaKey: "home.stories.project1.cta",
    },
  ],
};
