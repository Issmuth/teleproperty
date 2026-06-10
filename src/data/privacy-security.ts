import {
    EyeOff,
    Lock,
    MessageCircle,
    Phone,
    type LucideIcon,
} from "lucide-react-native";

export type PrivacyToggleSetting = {
  id: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
};

export const privacyToggleSettings: PrivacyToggleSetting[] = [
  {
    id: "twoStep",
    icon: Lock,
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
    title: "Two-Step Verification",
    subtitle: "Require OTP on every login",
  },
  {
    id: "hidePhone",
    icon: EyeOff,
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
    title: "Hide Phone Number",
    subtitle: "Only agents can see your number",
  },
  {
    id: "whatsapp",
    icon: MessageCircle,
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
    title: "Allow WhatsApp Inquiries",
    subtitle: "Receive messages from buyers",
  },
  {
    id: "callbacks",
    icon: Phone,
    iconBg: "#F1F5F9",
    iconColor: "#64748B",
    title: "Allow Callback Requests",
    subtitle: "Agents can request to call you",
  },
];
