export const adminTabs = [
  "Overview",
  "Listings",
  "Agents",
  "Users",
  "Search",
  "Payments",
] as const;

export type AdminTab = (typeof adminTabs)[number];

export const adminListingItems = [
  {
    title: "3BR Villa - Bole",
    subtitle: "Samuel T. · Villa · ETB 4.5M",
    age: "Submitted 2h ago",
  },
  {
    title: "Office Space - Kazanchis",
    subtitle: "Meron A. · Commercial · ETB 12K/mo",
    age: "Submitted 5h ago",
  },
  {
    title: "2BR Apt - CMC Road",
    subtitle: "Yared G. · Apartment · ETB 22K/mo",
    age: "Submitted 1d ago",
  },
] as const;

export const adminAgentItems = [
  {
    name: "Dawit Bekele",
    company: "Bole Realty",
    email: "+251912345678",
    telegram: "@dawit_agent",
    status: "Pending" as const,
  },
  {
    name: "Hana Tesfaye",
    company: "AA Properties",
    email: "+251923456789",
    telegram: "@hana_agent",
    status: "Pending" as const,
  },
  {
    name: "Samuel Tadesse",
    company: "Prime Homes",
    email: "+251934567890",
    telegram: "@samuel_agent",
    status: "Verified" as const,
  },
] as const;

export const adminPaymentItems = [
  {
    title: "Samuel T.",
    subtitle: "Pro Subscription · Today",
    amount: "ETB 1,200",
    status: "success" as const,
  },
  {
    title: "Meron A.",
    subtitle: "Lead Unlock x2 · Today",
    amount: "ETB 100",
    status: "success" as const,
  },
  {
    title: "Liya H.",
    subtitle: "Pro Subscription · May 1",
    amount: "ETB 1,200",
    status: "failed" as const,
  },
] as const;
