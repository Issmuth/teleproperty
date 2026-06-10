export const whatsappFilters = ["All", "New (2)", "Contacted (2)", "Closed (2)"] as const;
export type WhatsAppFilter = (typeof whatsappFilters)[number];

export const avatarColors = ["#16A34A", "#2563EB", "#7C3AED", "#EA580C", "#0891B2"];

export type WhatsAppInquiry = {
  id: string;
  initials: string;
  name: string;
  property: string;
  time: string;
  status: "New" | "Contacted";
  avatarColor: string;
};

export const whatsappInquiries: WhatsAppInquiry[] = [
  {
    id: "1",
    initials: "AK",
    name: "Abebe Kebede",
    property: "3BR Villa – Bole",
    time: "5 min ago",
    status: "New",
    avatarColor: "#16A34A",
  },
  {
    id: "2",
    initials: "ST",
    name: "Sara Tesfaye",
    property: "2BR Apartment – Kazanchis",
    time: "1 hr ago",
    status: "New",
    avatarColor: "#2563EB",
  },
  {
    id: "3",
    initials: "YG",
    name: "Yared Girma",
    property: "Studio – Piazza",
    time: "3 hrs ago",
    status: "Contacted",
    avatarColor: "#7C3AED",
  },
  {
    id: "4",
    initials: "MA",
    name: "Meron Alemu",
    property: "Commercial – CMC",
    time: "Yesterday",
    status: "Contacted",
    avatarColor: "#EA580C",
  },
];
