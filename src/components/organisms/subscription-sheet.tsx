import { AppBottomSheet } from "@/components/atoms/app-bottom-sheet";
import { subscriptionPlans, type SubscriptionPlan } from "@/data/subscriptions";
import { useAppTheme } from "@/theme/app-theme";
import {
    CheckCircle2,
    CreditCard,
    Shield,
    Sparkles,
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

type Step = "plans" | "confirm" | "otp" | "success";

type SubscriptionSheetProps = {
  visible: boolean;
  onClose: () => void;
};

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
  plan: SubscriptionPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = plan.icon;

  return (
    <Pressable onPress={onSelect}>
      <View style={[s.planCard, { backgroundColor: plan.cardBg }]}>
        <View style={s.planCardTop}>
          <View style={[s.planIcon, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <Icon size={22} color={plan.iconColor} strokeWidth={2} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={s.planNameRow}>
              <Text style={s.planName}>{plan.name}</Text>
              {plan.popular && (
                <View style={s.popularBadge}>
                  <Sparkles size={10} color="#16A34A" strokeWidth={3} />
                  <Text style={s.popularLbl}>Popular</Text>
                </View>
              )}
              {plan.bestValue && (
                <View style={s.bestBadge}>
                  <Text style={s.bestLbl}>Best Value</Text>
                </View>
              )}
            </View>
            <View style={s.priceRow}>
              <Text style={s.planPrice}>{plan.price}</Text>
              <Text style={s.planPeriod}>{plan.period}</Text>
            </View>
          </View>
          <View style={[s.radio, selected && s.radioOn]}>
            {selected && <CheckCircle2 size={18} color={plan.cardBg} strokeWidth={3} />}
          </View>
        </View>
        <View style={s.statsRow}>
          <Stat val={plan.leads} label="Leads" />
          <Stat val={plan.listings} label="Listings" />
          <Stat val={plan.featured} label="Featured" />
        </View>
        <View style={s.divider} />
        <View style={s.featuresWrap}>
          {plan.features.slice(0, 3).map((f) => (
            <View key={f} style={s.featureRow}>
              <CheckCircle2 size={13} color="#4ADE80" strokeWidth={2.5} />
              <Text style={s.featureTxt}>{f}</Text>
            </View>
          ))}
          {plan.features.length > 3 && (
            <Text style={s.moreFeatures}>
              +{plan.features.length - 3} more features
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export function SubscriptionSheet({ visible, onClose }: SubscriptionSheetProps) {
  const { colors, isDark } = useAppTheme();
  const [step, setStep] = useState<Step>("plans");
  const [selectedId, setSelectedId] = useState("pro");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const plan = subscriptionPlans.find((p) => p.id === selectedId)!;

  const handleOtp = (val: string, i: number) => {
    const next = [...otp];
    next[i] = val.replace(/\D/g, "").slice(-1);
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  const otpDone = otp.every((d) => d !== "");

  const handleSubscribeSuccess = () => {
    setStep("success");
    setTimeout(() => {
      onClose();
      setStep("plans");
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep("plans");
      setPhone("");
      setOtp(["", "", "", "", "", ""]);
    }, 300);
  };

  const renderContent = () => {
    if (step === "plans") {
      return (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.sheetScroll}>
            {subscriptionPlans.map((p) => (
              <PlanCard key={p.id} plan={p} selected={selectedId === p.id} onSelect={() => setSelectedId(p.id)} />
            ))}
          </ScrollView>

          <View style={s.sheetFooter}>
            <Pressable style={s.btn} onPress={() => setStep("confirm")}>
              <CreditCard size={16} color="#FFF" strokeWidth={2.5} />
              <Text style={s.btnLbl}>Continue with {plan.name}</Text>
            </Pressable>
          </View>
        </>
      );
    }

    if (step === "confirm") {
      const Icon = plan.icon;
      return (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.sheetScroll}>
            <View style={[s.planCard, { backgroundColor: plan.cardBg }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={[s.planIcon, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                  <Icon size={20} color={plan.iconColor} strokeWidth={2} />
                </View>
                <View>
                  <Text style={[s.planName, { fontSize: 16 }]}>{plan.name} Plan</Text>
                  <Text style={s.planPeriodLine}>{plan.price}/month · Auto-renews</Text>
                </View>
              </View>
            </View>

            <Text style={[s.sectionTitle, { color: colors.text }]}>Payment Method</Text>
            <View style={[s.telebirrCard, {
              borderColor: "#16A34A",
              backgroundColor: isDark ? "rgba(22,163,74,0.12)" : "#F0FDF4",
            }]}>
              <Shield size={24} color="#16A34A" strokeWidth={2} />
              <Text style={[s.telebirrLabel, { color: colors.text }]}>Telebirr</Text>
            </View>

            <View style={[s.phoneCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[s.phoneLabel, { color: colors.text }]}>Phone Number</Text>
              <View style={[s.phoneRow, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <View style={s.prefix}>
                  <Text style={[s.prefixNum, { color: colors.text }]}>+251</Text>
                </View>
                <View style={[s.phoneSep, { backgroundColor: colors.border }]} />
                <TextInput
                  style={[s.phoneInput, { color: colors.text }]}
                  placeholder="9XX XXX XXX"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>
            </View>
          </ScrollView>

          <View style={[s.sheetFooter, { borderTopColor: colors.border }]}>
            <Pressable style={[s.btn, !phone && s.btnOff]} onPress={() => { if (phone) setStep("otp"); }}>
              <CreditCard size={16} color="#FFF" strokeWidth={2.5} />
              <Text style={s.btnLbl}>Pay {plan.price}</Text>
            </Pressable>
          </View>
        </>
      );
    }

    if (step === "otp") {
      return (
        <>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.sheetScroll}>
            <View style={[s.demoHint, { backgroundColor: isDark ? "#1E293B" : "#EFF6FF" }]}>
              <Text style={[s.demoTxt, { color: isDark ? "#93C5FD" : "#1E40AF" }]}>
                💡 Demo OTP:{" "}
                {["1", "2", "3", "4", "5", "6"].map((d, i) => (
                  <Text key={i} style={{ fontWeight: "900" }}>{d} </Text>
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
          </ScrollView>

          <View style={[s.sheetFooter, { borderTopColor: colors.border }]}>
            <Pressable style={[s.btn, !otpDone && s.btnOff]} onPress={() => { if (otpDone) handleSubscribeSuccess(); }}>
              <Text style={s.btnLbl}>Confirm & Activate</Text>
            </Pressable>
          </View>
        </>
      );
    }

    if (step === "success") {
      return (
        <View style={{ alignItems: "center", paddingVertical: 40 }}>
          <View style={s.successCircle}>
            <CheckCircle2 size={48} color="#16A34A" strokeWidth={2.5} />
          </View>
          <Text style={[s.successTitle, { color: colors.text }]}>Subscription Active!</Text>
          <Text style={[s.sheetSub, { color: colors.textMuted }]}>{plan.name} Plan activated</Text>
          <View style={s.verifiedBadge}>
            <Shield size={14} color="#FFF" strokeWidth={2.5} />
            <Text style={s.verifiedLbl}>Verified Subscriber</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <AppBottomSheet 
      visible={visible} 
      onClose={handleClose}
      title={
        step === "plans" ? "Choose Your Plan" :
        step === "confirm" ? "Confirm Subscription" :
        step === "otp" ? "Enter OTP" :
        "Success!"
      }
      subtitle={
        step === "plans" ? "Monthly billing · Cancel anytime" :
        step === "confirm" ? "Monthly plan · Cancel anytime" :
        step === "otp" ? `Enter the 6-digit code sent to +251 ${phone}` :
        undefined
      }
    >
      {renderContent()}
    </AppBottomSheet>
  );
}

const s = StyleSheet.create({
  sheetScroll: { paddingBottom: 20, gap: 14 },
  sheetFooter: { paddingVertical: 16, paddingHorizontal: 20, borderTopWidth: 1, borderTopColor: "rgba(0,0,0,0.08)", marginTop: 10 },
  sheetSub: { fontSize: 14, fontWeight: "600", color: "#64748B" },
  sectionTitle: { fontSize: 16, fontWeight: "800", marginTop: 8 },
  planCard: { borderRadius: 18, padding: 16, gap: 14 },
  planCardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  planIcon: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  planNameRow: { flexDirection: "row", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 },
  planName: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  planPrice: { color: "#FFF", fontSize: 24, fontWeight: "900" },
  planPeriod: { fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.8)" },
  planPeriodLine: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "600", marginTop: 2 },
  popularBadge: { backgroundColor: "#FFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3, flexDirection: "row", alignItems: "center", gap: 4 },
  popularLbl: { color: "#16A34A", fontSize: 10, fontWeight: "900" },
  bestBadge: { backgroundColor: "#FFF", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  bestLbl: { color: "#EA580C", fontSize: 10, fontWeight: "900" },
  radio: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: "rgba(255,255,255,0.6)", marginTop: 2, alignItems: "center", justifyContent: "center" },
  radioOn: { borderColor: "#FFF", backgroundColor: "#FFF" },
  statsRow: { flexDirection: "row", gap: 12 },
  stat: { flex: 1, alignItems: "center" },
  statVal: { color: "#FFF", fontSize: 20, fontWeight: "900" },
  statLbl: { color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: "700", marginTop: 3 },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 4 },
  featuresWrap: { gap: 10 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureTxt: { fontSize: 13, fontWeight: "600", flex: 1, color: "rgba(255,255,255,0.95)" },
  moreFeatures: { fontSize: 12, fontWeight: "700", color: "rgba(255,255,255,0.7)", marginTop: 4 },
  btn: { backgroundColor: "#16A34A", borderRadius: 14, minHeight: 52, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  btnOff: { backgroundColor: "#94A3B8" },
  btnLbl: { color: "#FFF", fontSize: 15, fontWeight: "900" },
  telebirrCard: { borderWidth: 2, borderRadius: 14, padding: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 },
  telebirrLabel: { fontSize: 16, fontWeight: "800" },
  phoneCard: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 12 },
  phoneLabel: { fontSize: 15, fontWeight: "800" },
  phoneRow: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 12, overflow: "hidden", minHeight: 50 },
  prefix: { paddingHorizontal: 16 },
  prefixNum: { fontSize: 15, fontWeight: "800" },
  phoneSep: { width: 1, height: 28 },
  phoneInput: { flex: 1, paddingHorizontal: 16, fontSize: 16, fontWeight: "600" },
  demoHint: { borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12 },
  demoTxt: { fontSize: 13, fontWeight: "700" },
  otpRow: { flexDirection: "row", gap: 10, justifyContent: "center", marginVertical: 20 },
  otpBox: { width: 50, height: 58, borderWidth: 1.5, borderRadius: 14, fontSize: 24, fontWeight: "900" },
  successCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center", marginBottom: 16 },
  successTitle: { fontSize: 26, fontWeight: "900", marginBottom: 8 },
  verifiedBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#16A34A", borderRadius: 999, paddingHorizontal: 20, paddingVertical: 12, marginVertical: 16 },
  verifiedLbl: { color: "#FFF", fontSize: 15, fontWeight: "900" },
});
