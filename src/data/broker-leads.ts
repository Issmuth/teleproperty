export const brokerLeadFilters = ["All", "Hot", "Warm", "Buyer", "Tenant"] as const;
export type BrokerLeadFilter = (typeof brokerLeadFilters)[number];

export const brokerLeadTagStyles: Record<string, { bg: string; color: string }> = {
  New: { bg: "#DCFCE7", color: "#16A34A" },
  Hot: { bg: "#FEF3C7", color: "#D97706" },
  Warm: { bg: "#FEF3C7", color: "#F59E0B" },
  Featured: { bg: "#F3E8FF", color: "#7C3AED" },
  Verified: { bg: "#ECFDF5", color: "#059669" },
};

export type BrokerLead = {
  id: string;
  tags: readonly ("New" | "Hot" | "Warm" | "Featured" | "Verified")[];
  score: number;
  type: string;
  mode: string;
  property: string;
  budget: string;
  location: string;
  unlocked: boolean;
};

export const brokerVerifiedLeads: BrokerLead[] = [
  {
    id: "1",
    tags: ["New", "Hot", "Verified"],
    score: 92,
    type: "Buyer",
    mode: "Buy",
    property: "Apartment",
    budget: "ETB 3M – 5M",
    location: "Bole, Addis Ababa",
    unlocked: false,
  },
  {
    id: "2",
    tags: ["New", "Warm", "Featured"],
    score: 78,
    type: "Tenant",
    mode: "Rent",
    property: "Office",
    budget: "ETB 15,000 – 25,000/mo",
    location: "Kazanchis, Addis Ababa",
    unlocked: false,
  },
  {
    id: "3",
    tags: ["Warm", "Verified"],
    score: 65,
    type: "Buyer",
    mode: "Buy",
    property: "Villa",
    budget: "ETB 6M – 9M",
    location: "CMC, Addis Ababa",
    unlocked: true,
  },
];
