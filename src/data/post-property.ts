import {
    House,
    LayoutGrid,
    MapPin,
    Plus,
    Sparkles,
    type LucideIcon,
} from "lucide-react-native";

export type PropertyTypeOption = {
  key: string;
  label: string;
  icon: LucideIcon;
};

export const postPropertyTypeOptions: PropertyTypeOption[] = [
  {
    key: "residential",
    label: "Residential",
    icon: House,
  },
  {
    key: "commercial",
    label: "Commercial",
    icon: LayoutGrid,
  },
  {
    key: "land",
    label: "Land Plot",
    icon: MapPin,
  },
  {
    key: "hotel",
    label: "Hotel / Guest House",
    icon: Sparkles,
  },
];

export type PropertyPurposeOption = {
  key: string;
  label: string;
  icon: LucideIcon;
};

export const postPropertyPurposeOptions: PropertyPurposeOption[] = [
  {
    key: "rent",
    label: "Rent",
    icon: Sparkles,
  },
  {
    key: "sale",
    label: "Sale",
    icon: Plus,
  },
  {
    key: "new-project",
    label: "New Project",
    icon: LayoutGrid,
  },
  {
    key: "short-term",
    label: "Short-term Rental",
    icon: House,
  },
];
