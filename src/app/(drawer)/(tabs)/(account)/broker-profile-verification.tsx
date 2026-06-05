import { useRouter } from "expo-router";
import { Camera, CheckCircle2, CreditCard, FileText, Info } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const benefits = [
  "Verified badge on your profile & listings",
  "Priority placement in search results",
  "Access to premium leads",
  "Higher trust from buyers & tenants",
];

const documents = [
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
] as const;

export default function BrokerProfileVerificationScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({});

  const allUploaded = documents.every((d) => uploaded[d.id]);

  function toggle(id: string) {
    setUploaded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Profile Verification
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Profile Verification
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            Get your verified broker / developer badge
          </Text>
        </View>

        {/* Docs required notice */}
        <View
          style={[
            styles.noticeCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.noticeIcon,
              { backgroundColor: isDark ? colors.surfaceMuted : "#F1F5F9" },
            ]}
          >
            <Info size={20} color={colors.textMuted} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.noticeTitle, { color: colors.text }]}>
              Documents Required
            </Text>
            <Text style={[styles.noticeSub, { color: colors.textMuted }]}>
              Upload your documents below to start verification.
            </Text>
          </View>
        </View>

        {/* Benefits */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Benefits of Verification
          </Text>
          {benefits.map((b) => (
            <View key={b} style={styles.benefitRow}>
              <CheckCircle2 size={16} color="#16A34A" />
              <Text style={[styles.benefitText, { color: colors.text }]}>
                {b}
              </Text>
            </View>
          ))}
        </View>

        {/* Required Documents */}
        <Text style={[styles.reqTitle, { color: colors.text }]}>
          Required Documents
        </Text>
        {documents.map((doc) => {
          const Icon = doc.icon;
          const done = !!uploaded[doc.id];
          return (
            <View
              key={doc.id}
              style={[
                styles.docCard,
                {
                  borderColor: done ? "#16A34A" : colors.border,
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <View
                style={[
                  styles.docIcon,
                  {
                    backgroundColor: done
                      ? "#DCFCE7"
                      : isDark
                        ? colors.surfaceMuted
                        : "#F8FAFC",
                  },
                ]}
              >
                <Icon size={18} color={done ? "#16A34A" : colors.textMuted} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.docTitle, { color: colors.text }]}>
                  {doc.title}
                </Text>
                <Text style={[styles.docSub, { color: colors.textMuted }]}>
                  {doc.subtitle}
                </Text>
              </View>
              <Pressable
                onPress={() => toggle(doc.id)}
                style={[
                  styles.uploadBtn,
                  {
                    borderColor: done ? "#16A34A" : colors.border,
                    backgroundColor: done ? "#DCFCE7" : colors.background,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.uploadBtnLabel,
                    { color: done ? "#16A34A" : colors.text },
                  ]}
                >
                  {done ? "✓ Done" : "↑ Upload"}
                </Text>
              </Pressable>
            </View>
          );
        })}

        {/* Warning */}
        {!allUploaded && (
          <View style={styles.warningCard}>
            <Info size={14} color="#D97706" />
            <Text style={styles.warningText}>
              Please upload all 3 documents before submitting.
            </Text>
          </View>
        )}

        {/* Submit */}
        <Pressable
          disabled={!allUploaded}
          style={[
            styles.submitBtn,
            { backgroundColor: allUploaded ? "#16A34A" : colors.surfaceMuted },
          ]}
        >
          <Text
            style={[
              styles.submitBtnLabel,
              { color: allUploaded ? "#FFFFFF" : colors.textMuted },
            ]}
          >
            Submit for Verification →
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  sectionSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  noticeCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  noticeIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  noticeTitle: { fontSize: 14, fontWeight: "900" },
  noticeSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  card: { borderWidth: 1, borderRadius: 18, padding: 16, gap: 12 },
  cardTitle: { fontSize: 15, fontWeight: "900" },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  benefitText: { fontSize: 13, fontWeight: "600", flex: 1 },
  reqTitle: { fontSize: 16, fontWeight: "900" },
  docCard: {
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  docIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  docTitle: { fontSize: 14, fontWeight: "900" },
  docSub: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  uploadBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  uploadBtnLabel: { fontSize: 13, fontWeight: "800" },
  warningCard: {
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  warningText: { color: "#D97706", fontSize: 12, fontWeight: "700", flex: 1 },
  submitBtn: {
    borderRadius: 14,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnLabel: { fontSize: 14, fontWeight: "900" },
});
