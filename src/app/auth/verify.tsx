import { useLocalSearchParams, useRouter } from "expo-router";
import { Lightbulb } from "lucide-react-native";
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

export default function VerifyAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, updateDraft } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  const code = draft.otp;
  const isContinueDisabled = useMemo(
    () => code.some((item) => item.trim().length === 0),
    [code],
  );

  const updateCodeAtIndex = (index: number, value: string) => {
    const next = [...code] as [string, string, string, string];
    next[index] = value.replace(/[^0-9]/g, "").slice(-1);
    updateDraft({ otp: next });
  };

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
        <AuthStepper currentStep={2} steps={3} />

        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Verify Code
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            We&apos;ll send a one-time code{" "}
            <Text style={styles.emphasis}>+251 4234343434</Text>
          </Text>
        </View>

        <View
          style={[
            styles.demoBox,
            {
              backgroundColor: colors.surfaceAccent,
              borderColor: colors.activeSurface,
            },
          ]}
        >
          <Lightbulb size={14} color={colors.activeText} />
          <Text style={[styles.demoText, { color: colors.activeText }]}>
            Demo OTP: 1 2 3 4 5
          </Text>
        </View>

        <View style={styles.otpRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              value={digit}
              onChangeText={(value) => updateCodeAtIndex(index, value)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                },
              ]}
            />
          ))}
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/auth/role" as never,
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
          <Text
            style={[
              styles.primaryLabel,
              { color: isContinueDisabled ? colors.textMuted : "#FFFFFF" },
            ]}
          >
            Verify &amp; Continue
          </Text>
        </Pressable>

        <Pressable
          style={styles.resendButton}
          onPress={() => updateDraft({ otp: ["", "", "", ""] })}
        >
          <Text style={[styles.resendText, { color: colors.activeText }]}>
            resend
          </Text>
        </Pressable>
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
    fontSize: 20,
    fontWeight: "900",
  },
  subheading: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  emphasis: {
    fontWeight: "900",
  },
  demoBox: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  demoText: {
    fontSize: 12,
    fontWeight: "800",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginTop: 6,
  },
  otpInput: {
    width: 46,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "900",
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  primaryLabel: {
    fontSize: 15,
    fontWeight: "900",
  },
  resendButton: {
    alignItems: "center",
    paddingTop: 6,
  },
  resendText: {
    fontSize: 13,
    fontWeight: "900",
  },
  pressed: {
    opacity: 0.92,
  },
});
