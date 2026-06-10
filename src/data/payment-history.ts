export const paymentHistoryFilters = [
  "All",
  "Subscription",
  "Listing",
  "Service",
  "Booking",
] as const;
export type PaymentHistoryFilter = (typeof paymentHistoryFilters)[number];

export type PaymentHistoryTransaction = {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  date: string;
  amount: string;
  status: string;
};

export const paymentHistoryTransactions: PaymentHistoryTransaction[] = [
  {
    id: "1",
    icon: "⭐",
    iconBg: "#FFFBEB",
    title: "Broker Subscription – May 2026",
    date: "May 1, 2026 · TLP-10100",
    amount: "ETB 1,200",
    status: "Paid",
  },
  {
    id: "2",
    icon: "💳",
    iconBg: "#EFF6FF",
    title: "Premium Listing – Bole Villa",
    date: "Apr 30, 2026 · TLP-10050",
    amount: "ETB 450",
    status: "Paid",
  },
  {
    id: "3",
    icon: "🔧",
    iconBg: "#F0FDF4",
    title: "Home Cleaning Service – Kazanchis",
    date: "Apr 28, 2026 · TLP-09990",
    amount: "ETB 350",
    status: "Paid",
  },
  {
    id: "4",
    icon: "🏨",
    iconBg: "#EFF6FF",
    title: "Hotel Booking – Skylight AA",
    date: "Apr 25, 2026 · TLP-09940",
    amount: "ETB 3,200",
    status: "Paid",
  },
  {
    id: "5",
    icon: "💳",
    iconBg: "#F5F3FF",
    title: "Featured Listing – CMC Commercial",
    date: "Apr 22, 2026 · TLP-09880",
    amount: "ETB 150",
    status: "Paid",
  },
  {
    id: "6",
    icon: "⭐",
    iconBg: "#FFFBEB",
    title: "Broker Subscription – Apr 2026",
    date: "Apr 1, 2026 · TLP-09100",
    amount: "ETB 1,200",
    status: "Paid",
  },
  {
    id: "7",
    icon: "🔧",
    iconBg: "#F0FDF4",
    title: "Electrical Repair – Sarbet",
    date: "Mar 28, 2026 · TLP-08990",
    amount: "ETB 500",
    status: "Paid",
  },
  {
    id: "8",
    icon: "💳",
    iconBg: "#EFF6FF",
    title: "Lead Unlock – Apt Bole",
    date: "Mar 20, 2026 · TLP-08800",
    amount: "ETB 50",
    status: "Paid",
  },
];
