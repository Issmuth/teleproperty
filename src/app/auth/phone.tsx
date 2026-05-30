import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { useMemo } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "@/auth/auth-context";
import { readAuthRouteParams, withAuthRouteParams } from "@/auth/auth-routing";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { AuthStepper } from "@/components/organisms/auth/auth-stepper";
import { useAppTheme } from "@/theme/app-theme";

export default function PhoneAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, updateDraft } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  const isContinueDisabled = useMemo(
    () => !draft.fullName.trim() || !draft.phoneNumber.trim(),
    [draft.fullName, draft.phoneNumber],
  );

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Ethiopia's #1 Property Platform"
      onBackPress={() => router.back()}
      onClosePress={() => router.replace("/")}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <AuthStepper currentStep={1} steps={3} />

        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Enter Your Phone
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            We&apos;ll send a one-time code
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
          <TextInput
            value={draft.fullName}
            onChangeText={(value) => updateDraft({ fullName: value })}
            placeholder="Your full name"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.phoneRow}>
          <View
            style={[
              styles.countryBox,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.countryLabel, { color: colors.text }]}>
              ET
            </Text>
            <Text style={[styles.countryCode, { color: colors.textMuted }]}>
              +251
            </Text>
          </View>
          <TextInput
            value={draft.phoneNumber}
            onChangeText={(value) => updateDraft({ phoneNumber: value })}
            placeholder="9X XXX XXXX"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
            style={[
              styles.phoneInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Referral Code (Optional)
          </Text>
          <TextInput
            value={draft.referralCode}
            onChangeText={(value) => updateDraft({ referralCode: value })}
            placeholder="e.g. TPF-BIRUK-001"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/auth/verify" as never,
              params: withAuthRouteParams({}, params),
            })
          }
          disabled={isContinueDisabled}
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: isContinueDisabled
                ? colors.surfaceMuted
                : colors.activeText,
            },
            pressed && !isContinueDisabled && styles.pressed,
          ]}
        >
          <ArrowRight
            size={16}
            color={isContinueDisabled ? colors.textMuted : "#FFFFFF"}
          />
          <Text
            style={[
              styles.primaryLabel,
              { color: isContinueDisabled ? colors.textMuted : "#FFFFFF" },
            ]}
          >
            Send OTP
          </Text>
        </Pressable>

        <Text style={[styles.footerNote, { color: colors.textMuted }]}>
          By continuing you agree to our Terms &amp; Privacy Policy
        </Text>
      </ScrollView>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 24,
    gap: 14,
  },
  copyBlock: {
    marginTop: 4,
    gap: 4,
  },
  heading: {
    fontSize: 21,
    fontWeight: "900",
  },
  subheading: {
    fontSize: 13,
    fontWeight: "600",
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
  },
  input: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: "600",
  },
  phoneRow: {
    flexDirection: "row",
    gap: 10,
  },
  countryBox: {
    width: 88,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  countryLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  countryCode: {
    fontSize: 12,
    fontWeight: "800",
  },
  phoneInput: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  primaryLabel: {
    fontSize: 15,
    fontWeight: "900",
    textTransform: "none",
  },
  footerNote: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
  },
  pressed: {
    opacity: 0.92,
  },
});
