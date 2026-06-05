import { useRouter } from "expo-router";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  RefreshCw,
  Shield,
} from "lucide-react-native";
import { useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const plans = [
  {
    id: "basic",
    name: "Basic Broker Plan",
    price: "ETB 800",
    period: "/month",
    icon: "⭐",
    iconBg: "#1E293B",
    cardBg: "#1E293B",
    leads: "20",
    listings: "10",
    featured: "—",
    popular: false,
    bestValue: false,
    features: [
      "20 verified leads/month",
      "10 active property listings",
      "Basic broker profile",
      "Email & phone inquiries",
      "Standard search placement",
      "Broker dashboard access",
    ],
  },
  {
    id: "pro",
    name: "Professional Broker Plan",
    price: "ETB 1,500",
    period: "/month",
    icon: "⚡",
    iconBg: "rgba(255,255,255,0.2)",
    cardBg: "#16A34A",
    leads: "60",
    listings: "30",
    featured: "✓",
    popular: true,
    bestValue: false,
    features: [
      "60 verified leads/month",
      "30 active property listings",
      "Featured broker badge ✓",
      "WhatsApp + Phone + Email leads",
      "Priority search placement",
      "Advanced analytics dashboard",
      "Verified broker profile",
      "Call center support",
    ],
  },
  {
    id: "agency",
    name: "Developer / Agency Plan",
    price: "ETB 3,500",
    period: "/month",
    icon: "👑",
    iconBg: "rgba(255,255,255,0.2)",
    cardBg: "#EA580C",
    leads: "∞",
    listings: "∞",
    featured: "✓",
    popular: false,
    bestValue: true,
    features: [
      "Unlimited verified leads",
      "Unlimited property listings",
      "Premium agency badge ✓",
      "All contact channels",
      "Homepage featured placement",
      "Off-plan project showcase",
      "Unit management tools",
      "Campaign & SMS tools",
      "Dedicated account manager",
    ],
  },
] as const;

type Plan = (typeof plans)[number];
type Step = "plans" | "confirm" | "otp" | "success" | "my-subscription";

function Stat({ val, label }: { val: string; label: string }) {
  return (
    <View style={s.stat}>
      <Text style={s.statVal}>{val}</Text>
      <Text style={s.statLbl}>{label}</Text>
    </View>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: Plan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Pressable onPress={onSelect}>
      <View style={[s.planCard, { backgroundColor: plan.cardBg }]}>
        <View style={s.planCardTop}>
          <View style={[s.planIcon, { backgroundColor: plan.iconBg }]}>
            <Text style={{ fontSize: 18 }}>{plan.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.planNameRow}>
              <Text style={s.planName}>{plan.name}</Text>
              {plan.popular && (
                <View style={s.popularBadge}>
                  <Text style={s.popularLbl}>Most Popular</Text>
                </View>
              )}
              {plan.bestValue && (
                <View style={s.bestBadge}>
                  <Text style={s.bestLbl}>Best Value</Text>
                </View>
              )}
            </View>
            <Text style={s.planPrice}>
              {plan.price}{" "}
              <Text style={s.planPeriod}>{plan.period}</Text>
            </Text>
          </View>
          <View style={[s.radio, selected && s.radioOn]} />
        </View>
        <View style={s.statsRow}>
          <Stat val={plan.leads} label="Leads/mo" />
          <Stat val={plan.listings} label="Listings" />
          <Stat val={plan.featured} label="Featured" />
        </View>
        <View style={s.divider} />
        {plan.features.map((f) => (
          <View key={f} style={s.featureRow}>
            <CheckCircle2 size={14} color="#4ADE80" />
            <Text style={s.featureTxt}>{f}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export default function BrokerSubscriptionsScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [step, setStep] = useState<Step>("plans");
  const [selectedId, setSelectedId] = useState("pro");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const plan = plans.find((p) => p.id === selectedId)!;

  const today = new Date();
  const nextBilling = new Date(today);
  nextBilling.setMonth(nextBilling.getMonth() + 1);
  const fmt = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  const handleOtp = (val: string, i: number) => {
    const next = [...otp];
    next[i] = val.replace(/\D/g, "").slice(-1);
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const otpDone = otp.every((d) => d !== "");

  function Bar({ onBack }: { onBack: () => void }) {
    return (
      <View style={[s.bar, { backgroundColor: colors.background }]}>
        <Pressable onPress={onBack} style={[s.backBtn, { backgroundColor: colors.surface }]}>
          <Text style={[s.backArrow, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[s.barTitle, { color: colors.text }]}>Subscription Plans</Text>
      </View>
    );
  }

  // ── Plans ────────────────────────────────────────────────
  if (step === "plans") {
    return (
      <View style={[s.screen, { backgroundColor: colors.background }]}>
        <Bar onBack={() => router.back()} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <View style={s.hero}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={s.heroIcon}><Shield size={20} color="#FFF" /></View>
              <View style={{ flex: 1 }}>
                <Text style={s.heroTitle}>Broker Subscription Plans</Text>
                <Text style={s.heroSub}>Monthly plans · Cancel anytime · Instant activation</Text>
              </View>
            </View>
            <View style={s.lockRow}>
              <Lock size={12} color="rgba(255,255,255,0.8)" />
              <Text style={s.lockTxt}>Contact details are locked until you subscribe</Text>
            </View>
          </View>

          {plans.map((p) => (
            <PlanCard key={p.id} plan={p} selected={selectedId === p.id} onSelect={() => setSelectedId(p.id)} />
          ))}

          <Pressable style={s.btn} onPress={() => setStep("confirm")}>
            <CreditCard size={16} color="#FFF" />
            <Text style={s.btnLbl}>Subscribe to {plan.name} →</Text>
          </Pressable>
          <Pressable onPress={() => router.back()} style={s.ghost}>
            <Text style={[s.ghostLbl, { color: colors.textMuted }]}>← Back to Hub</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ── Confirm ──────────────────────────────────────────────
  if (step === "confirm") {
    return (
      <View style={[s.screen, { backgroundColor: colors.background }]}>
        <Bar onBack={() => setStep("plans")} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <Text style={[s.h1, { color: colors.text }]}>Confirm Subscription</Text>
          <Text style={[s.sub, { color: colors.textMuted }]}>Monthly plan · Cancel anytime</Text>

          <View style={[s.planCard, { backgroundColor: plan.cardBg }]}>
            <Text style={[s.planName, { fontSize: 16 }]}>{plan.name}</Text>
            <Text style={s.planPeriodLine}>{plan.price}/month · Auto-renews monthly</Text>
            <View style={s.statsRow}>
              <Stat val={plan.leads} label="Leads/mo" />
              <Stat val={plan.listings} label="Listings" />
              <Stat val={plan.featured} label="Featured" />
            </View>
          </View>

          <Text style={[s.h1, { color: colors.text }]}>Choose Payment Method</Text>
          <View style={[s.telebirrCard, {
            borderColor: "#16A34A",
            backgroundColor: isDark ? "rgba(22,163,74,0.12)" : "#F0FDF4",
          }]}>
            <Text style={{ fontSize: 24 }}>📱</Text>
            <Text style={[s.planName, { color: colors.text, fontSize: 14 }]}>Telebirr</Text>
          </View>

          <View style={[s.phoneCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Text style={[s.phoneLabel, { color: colors.text }]}>Telebirr Phone Number</Text>
            <View style={[s.phoneRow, { borderColor: colors.border, backgroundColor: colors.background }]}>
              <View style={s.prefix}>
                <Text style={[s.prefixFlag, { color: colors.textMuted }]}>ET</Text>
                <Text style={[s.prefixNum, { color: colors.text }]}>+251</Text>
              </View>
              <View style={[s.phoneSep, { backgroundColor: colors.border }]} />
              <TextInput
                style={[s.phoneInput, { color: colors.text }]}
                placeholder="9X XXX XXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>
          </View>

          <Pressable style={[s.btn, !phone && s.btnOff]} onPress={() => { if (phone) setStep("otp"); }}>
            <CreditCard size={16} color="#FFF" />
            <Text style={s.btnLbl}>Pay {plan.price} & Activate</Text>
          </Pressable>
          <Pressable onPress={() => setStep("plans")} style={s.ghost}>
            <Text style={[s.ghostLbl, { color: colors.textMuted }]}>← Back to Plans</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ── OTP ──────────────────────────────────────────────────
  if (step === "otp") {
    return (
      <View style={[s.screen, { backgroundColor: colors.background }]}>
        <Bar onBack={() => setStep("confirm")} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
          <Text style={[s.h1, { color: colors.text }]}>Telebirr Verification</Text>
          <Text style={[s.sub, { color: colors.textMuted }]}>
            Enter the 6-digit OTP sent to your Telebirr number
          </Text>

          <View style={[s.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {([
              { label: "Plan", value: plan.name, bold: true },
              { label: "Amount", value: `${plan.price}/month`, green: true },
              { label: "Phone", value: `+251 ${phone}` },
            ] as Array<{ label: string; value: string; bold?: boolean; green?: boolean }>).map((row) => (
              <View key={row.label} style={s.summaryRow}>
                <Text style={[s.summaryLbl, { color: colors.textMuted }]}>{row.label}</Text>
                <Text style={[
                  s.summaryVal,
                  { color: row.green ? "#16A34A" : colors.text },
                  row.bold ? s.summaryBold : undefined,
                ]}>{row.value}</Text>
              </View>
            ))}
          </View>

          <View style={[s.demoHint, { backgroundColor: isDark ? "#1E293B" : "#EFF6FF" }]}>
            <Text style={[s.demoTxt, { color: isDark ? "#93C5FD" : "#1E40AF" }]}>
              💡 Demo OTP:{" "}
              {["1","2","3","4","5","6"].map((d, i) => (
                <Text key={i} style={{ color: isDark ? "#60A5FA" : "#1D4ED8", fontWeight: "900" }}>{d} </Text>
              ))}
            </Text>
          </View>

          <View style={s.otpRow}>
            {otp.map((digit, i) => (
              <TextInput
                key={i}
                ref={(r) => { otpRefs.current[i] = r; }}
                style={[s.otpBox, {
                  borderColor: digit ? "#16A34A" : colors.border,
                  backgroundColor: colors.surface,
                  color: colors.text,
                }]}
                value={digit}
                onChangeText={(v) => handleOtp(v, i)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <Pressable style={[s.btn, !otpDone && s.btnOff]} onPress={() => { if (otpDone) setStep("success"); }}>
            <Text style={s.btnLbl}>Confirm & Activate · {plan.price}</Text>
          </Pressable>
          <Pressable onPress={() => setStep("confirm")} style={s.ghost}>
            <Text style={[s.ghostLbl, { color: colors.textMuted }]}>← Back</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ── Success ──────────────────────────────────────────────
  if (step === "success") {
    return (
      <View style={[s.screen, { backgroundColor: colors.background }]}>
        <View style={[s.bar, { backgroundColor: colors.background }]}>
          <View style={{ width: 36 }} />
          <Text style={[s.barTitle, { color: colors.text }]}>Subscription Plans</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[s.scroll, s.scrollCenter]}>
          <View style={s.successCircle}>
            <CheckCircle2 size={48} color="#16A34A" strokeWidth={2} />
          </View>
          <Text style={[s.successTitle, { color: colors.text }]}>Subscription Active!</Text>
          <Text style={[s.sub, { color: colors.textMuted }]}>{plan.name}</Text>

          <Pressable style={s.verifiedBadge}>
            <Shield size={14} color="#FFF" />
            <Text style={s.verifiedLbl}>Verified Subscriber</Text>
          </Pressable>

          <View style={[s.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border, width: "100%" }]}>
            {([
              { label: "Plan", value: plan.name, bold: true },
              { label: "Monthly price", value: `${plan.price}/month`, green: true },
              { label: "Next billing", value: fmt(nextBilling), bold: true },
              { label: "Transaction ref", value: "TLP-575485" },
            ] as Array<{ label: string; value: string; bold?: boolean; green?: boolean }>).map((row) => (
              <View key={row.label} style={s.summaryRow}>
                <Text style={[s.summaryLbl, { color: colors.textMuted }]}>{row.label}</Text>
                <Text style={[
                  s.summaryVal,
                  { color: row.green ? "#16A34A" : colors.text },
                  row.bold ? s.summaryBold : undefined,
                ]}>{row.value}</Text>
              </View>
            ))}
          </View>

          <View style={[s.unlockedCard, { backgroundColor: isDark ? "rgba(22,163,74,0.12)" : "#F0FDF4", width: "100%" }]}>
            <View style={s.unlockedHead}>
              <CheckCircle2 size={14} color="#16A34A" />
              <Text style={s.unlockedTitle}>Now unlocked for you:</Text>
            </View>
            {plan.features.slice(0, 4).map((f) => (
              <View key={f} style={s.featureRow}>
                <CheckCircle2 size={13} color="#16A34A" />
                <Text style={[s.featureTxt, { color: isDark ? "#4ADE80" : "#15803D" }]}>{f}</Text>
              </View>
            ))}
          </View>

          <Pressable style={[s.btn, { width: "100%" }]} onPress={() => setStep("my-subscription")}>
            <Text style={s.btnLbl}>Go to My Subscription →</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }

  // ── My Subscription ───────────────────────────────────────
  return (
    <View style={[s.screen, { backgroundColor: colors.background }]}>
      <Bar onBack={() => setStep("plans")} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        <Text style={[s.h1, { color: colors.text }]}>My Subscription</Text>
        <Text style={[s.sub, { color: colors.textMuted }]}>Your active broker plan</Text>

        <View style={s.activeBanner}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10, flex: 1 }}>
            <Shield size={16} color="#FFF" />
            <View>
              <Text style={s.bannerTitle}>Subscription Active</Text>
              <Text style={s.bannerSub}>{plan.name} · Auto-renews monthly</Text>
            </View>
          </View>
          <CheckCircle2 size={20} color="#FFF" />
        </View>

        <View style={[s.planCard, { backgroundColor: plan.cardBg }]}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={[s.planName, { fontSize: 16 }]}>{plan.name}</Text>
              <Text style={s.planPeriodLine}>{plan.price}/month</Text>
            </View>
            <CheckCircle2 size={22} color="rgba(255,255,255,0.9)" />
          </View>
          <View style={s.statsRow}>
            <Stat val={plan.leads} label="Leads/mo" />
            <Stat val={plan.listings} label="Listings" />
            <Stat val={plan.featured} label="Featured" />
          </View>
        </View>

        <View style={[s.detailCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {([
            { label: "Monthly price", value: plan.price, bold: true },
            { label: "Start date", value: fmt(today), bold: true },
            { label: "Next billing", value: fmt(nextBilling), bold: true },
            { label: "Auto-renew", isToggle: true },
          ] as Array<{ label: string; value?: string; bold?: boolean; isToggle?: boolean }>).map((row) => (
            <View key={row.label} style={s.detailRow}>
              <Text style={[s.detailLbl, { color: colors.textMuted }]}>{row.label}</Text>
              {row.isToggle ? (
                <View style={s.toggleBadge}>
                  <RefreshCw size={11} color="#6366F1" />
                  <Text style={s.toggleTxt}>ON</Text>
                </View>
              ) : (
                <Text style={[s.detailVal, { color: colors.text }, row.bold ? s.detailBold : undefined]}>
                  {row.value}
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={[s.unlockedCard, { backgroundColor: isDark ? "rgba(22,163,74,0.12)" : "#F0FDF4" }]}>
          <View style={s.unlockedHead}>
            <Shield size={14} color="#16A34A" />
            <Text style={s.unlockedTitle}>Unlocked Features</Text>
          </View>
          {plan.features.map((f) => (
            <View key={f} style={s.featureRow}>
              <CheckCircle2 size={13} color="#16A34A" />
              <Text style={[s.featureTxt, { color: isDark ? "#4ADE80" : "#15803D" }]}>{f}</Text>
            </View>
          ))}
        </View>

        <Pressable style={s.btn} onPress={() => setStep("plans")}>
          <Text style={s.btnLbl}>Upgrade Plan →</Text>
        </Pressable>
        <Pressable onPress={() => router.back()} style={s.ghost}>
          <Text style={[s.ghostLbl, { color: colors.textMuted }]}>← Back to Account</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  bar: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  backArrow: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  barTitle: { fontSize: 18, fontWeight: "900" },
  scroll: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40, gap: 14 },
  scrollCenter: { alignItems: "center" },

  // Hero
  hero: { backgroundColor: "#14532D", borderRadius: 20, padding: 16, gap: 10 },
  heroIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroTitle: { color: "#FFF", fontSize: 16, fontWeight: "900" },
  heroSub: { color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: "600", marginTop: 2 },
  lockRow: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(0,0,0,0.25)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 7 },
  lockTxt: { color: "rgba(255,255,255,0.85)", fontSize: 11, fontWeight: "700", flex: 1 },

  // Plan card
  planCard: { borderRadius: 20, padding: 16, gap: 12 },
  planCardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  planIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  planNameRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  planName: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  planPrice: { color: "#FFF", fontSize: 22, fontWeight: "900", marginTop: 4 },
  planPeriod: { fontSize: 13, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  planPeriodLine: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600", marginTop: 4 },
  popularBadge: { backgroundColor: "#FFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  popularLbl: { color: "#16A34A", fontSize: 10, fontWeight: "900" },
  bestBadge: { backgroundColor: "#FFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 2 },
  bestLbl: { color: "#EA580C", fontSize: 10, fontWeight: "900" },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: "rgba(255,255,255,0.5)", marginTop: 2 },
  radioOn: { borderColor: "#FFF", backgroundColor: "#FFF" },
  statsRow: { flexDirection: "row", gap: 8 },
  stat: { flex: 1, alignItems: "center" },
  statVal: { color: "#FFF", fontSize: 18, fontWeight: "900" },
  statLbl: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "600", marginTop: 2 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.15)" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  featureTxt: { fontSize: 13, fontWeight: "600", flex: 1 },

  // Buttons
  btn: { backgroundColor: "#16A34A", borderRadius: 16, minHeight: 52, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  btnOff: { backgroundColor: "#94A3B8" },
  btnLbl: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  ghost: { alignItems: "center", paddingVertical: 4 },
  ghostLbl: { fontSize: 13, fontWeight: "700" },
  h1: { fontSize: 22, fontWeight: "900" },
  sub: { fontSize: 13, fontWeight: "600", marginTop: -6 },

  // Telebirr card
  telebirrCard: { borderWidth: 2, borderRadius: 14, padding: 16, alignItems: "center", gap: 8 },

  // Phone
  phoneCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 10 },
  phoneLabel: { fontSize: 14, fontWeight: "800" },
  phoneRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, overflow: "hidden", minHeight: 48 },
  prefix: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14 },
  prefixFlag: { fontSize: 12, fontWeight: "700" },
  prefixNum: { fontSize: 14, fontWeight: "800" },
  phoneSep: { width: 1, height: 28, opacity: 0.4 },
  phoneInput: { flex: 1, paddingHorizontal: 14, fontSize: 15, fontWeight: "600" },

  // Summary
  summaryCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 12 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  summaryLbl: { fontSize: 13, fontWeight: "600" },
  summaryVal: { fontSize: 13, fontWeight: "700" },
  summaryBold: { fontWeight: "900" },

  // Demo / OTP
  demoHint: { borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10 },
  demoTxt: { fontSize: 13, fontWeight: "700" },
  otpRow: { flexDirection: "row", gap: 10, justifyContent: "center" },
  otpBox: { width: 48, height: 56, borderWidth: 1.5, borderRadius: 14, fontSize: 22, fontWeight: "900" },

  // Success
  successCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center", marginTop: 16, marginBottom: 8 },
  successTitle: { fontSize: 26, fontWeight: "900" },
  verifiedBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#16A34A", borderRadius: 999, paddingHorizontal: 20, paddingVertical: 10, marginVertical: 4 },
  verifiedLbl: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  unlockedCard: { borderRadius: 16, padding: 16, gap: 10 },
  unlockedHead: { flexDirection: "row", alignItems: "center", gap: 8 },
  unlockedTitle: { fontSize: 14, fontWeight: "900", color: "#16A34A" },

  // My Subscription
  activeBanner: { backgroundColor: "#16A34A", borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  bannerTitle: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  bannerSub: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "600", marginTop: 2 },
  detailCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 14 },
  detailRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  detailLbl: { fontSize: 14, fontWeight: "600" },
  detailVal: { fontSize: 14, fontWeight: "700" },
  detailBold: { fontWeight: "900" },
  toggleBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#EEF2FF", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  toggleTxt: { color: "#6366F1", fontSize: 13, fontWeight: "900" },
});
