import { useLocalSearchParams, useRouter } from "expo-router";
import { Info } from "lucide-react-native";
import { useRef } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { readAuthRouteParams, withAuthRouteParams } from "@/auth/auth-routing";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { AuthStepper } from "@/components/organisms/auth/auth-stepper";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function VerifyAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const { draft, updateDraft } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>()
  );

  const otpRefs = useRef<Array<TextInput | null>>([]);
  const code = draft.otp;
  const phoneLabel = draft.phoneNumber.trim()
    ? `+251 ${draft.phoneNumber.trim()}`
    : "+251";

  const isContinueDisabled = code.some((item) => item.trim().length === 0);

  const updateCodeAtIndex = (index: number, value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "").slice(-1);
    const next = [...code] as [string, string, string, string];
    next[index] = sanitized;
    updateDraft({ otp: next });

    // Auto-advance to next input
    if (sanitized && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    // Move back on backspace if current is empty
    if (key === "Backspace" && !code[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <AuthShell
      title={t("auth.shell.title")}
      subtitle={t("auth.shell.subtitle")}
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
            {t("auth.verify.title")}
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            {t("auth.verify.subtitle", { phone: phoneLabel })}
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
          <Info size={16} color={colors.activeText} strokeWidth={2.5} />
          <Text style={[styles.demoText, { color: colors.activeText }]}>
            {t("auth.verify.demoHint")}
          </Text>
        </View>

        <View style={styles.otpRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                otpRefs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(value) => updateCodeAtIndex(index, value)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              style={[
                styles.otpInput,
                {
                  backgroundColor: colors.surface,
                  borderColor: digit ? colors.activeText : colors.border,
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
            {t("auth.verify.verifyAndContinue")}
          </Text>
        </Pressable>

        <Pressable
          style={styles.resendButton}
          onPress={() => updateDraft({ otp: ["", "", "", ""] })}
        >
          <Text style={[styles.resendText, { color: colors.activeText }]}>
            {t("auth.verify.resendCode")}
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
    width: 52,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    textAlign: "center",
    fontSize: 20,
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
