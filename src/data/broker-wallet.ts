export const topUpAmounts = [
  "ETB 100",
  "ETB 250",
  "ETB 500",
  "ETB 1,000",
  "ETB 2,000",
  "ETB 2,500",
];

export const transactionFilters = [
  "All",
  "Top-up",
  "Lead Unlock",
  "Promotion",
  "Subscription",
] as const;
export type TransactionFilter = (typeof transactionFilters)[number];

export type WalletTransaction = {
  id: string;
  icon: "topup" | "lock" | "star" | "promo";
  title: string;
  date: string;
  amount: string;
  type: string;
  positive: boolean;
};

export const walletTransactions: WalletTransaction[] = [
  {
    id: "1",
    icon: "topup",
    title: "Wallet Top-up via Telebirr",
    date: "Today 09:15 · TLP-10291",
    amount: "+ETB 500",
    type: "Top-up",
    positive: true,
  },
  {
    id: "2",
    icon: "lock",
    title: "Lead Unlock – Villa Bole",
    date: "Today 10:30 · TLP-10292",
    amount: "ETB 50",
    type: "Lead Unlock",
    positive: false,
  },
  {
    id: "3",
    icon: "lock",
    title: "Lead Unlock – Apt Kazanchis",
    date: "Yesterday · TLP-10280",
    amount: "ETB 50",
    type: "Lead Unlock",
    positive: false,
  },
  {
    id: "4",
    icon: "star",
    title: "Standard Plan – May 2026",
    date: "May 1 · TLP-10100",
    amount: "ETB 1,200",
    type: "Subscription",
    positive: false,
  },
  {
    id: "5",
    icon: "promo",
    title: "Featured Listing – Sarbet Villa",
    date: "Apr 30 · TLP-10050",
    amount: "ETB 150",
    type: "Promotion",
    positive: false,
  },
  {
    id: "6",
    icon: "topup",
    title: "Wallet Top-up via Telebirr",
    date: "Apr 28 · TLP-09990",
    amount: "+ETB 2,000",
    type: "Top-up",
    positive: true,
  },
];

export type PromoItem = {
  emoji: string;
  title: string;
  subtitle: string;
  price: string;
};

export const promoItems: PromoItem[] = [
  {
    emoji: "⭐",
    title: "Featured Listing",
    subtitle: "7-day boost in search",
    price: "ETB 150",
  },
  {
    emoji: "🏆",
    title: "Featured Listing",
    subtitle: "30-day premium placement",
    price: "ETB 450",
  },
  {
    emoji: "📣",
    title: "Homepage Banner",
    subtitle: "1 week hero placement",
    price: "ETB 500",
  },
  {
    emoji: "🔥",
    title: "Urgent Tag",
    subtitle: "Highlight as urgent sale",
    price: "ETB 80",
  },
];
