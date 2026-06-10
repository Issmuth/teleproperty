import { Camera, CreditCard, FileText, type LucideIcon } from "lucide-react-native";

export const profileVerificationBenefits = [
  "Verified badge on your profile & listings",
  "Priority placement in search results",
  "Access to premium leads",
  "Higher trust from buyers & tenants",
];

export type VerificationDocument = {
  id: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
};

export const verificationDocuments: VerificationDocument[] = [
  {
    id: "nationalId",
    icon: CreditCard,
    title: "National ID / Passport",
    subtitle: "JPG, PNG or PDF · Max 5MB",
  },
  {
    id: "license",
    icon: FileText,
    title: "Business / Broker License",
    subtitle: "Official license document · Max 5MB",
  },
  {
    id: "photo",
    icon: Camera,
    title: "Profile Photo",
    subtitle: "Clear headshot · JPG or PNG",
  },
];
