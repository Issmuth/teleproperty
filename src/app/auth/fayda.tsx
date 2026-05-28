import { useLocalSearchParams, useRouter } from "expo-router";
import {
    CalendarDays,
    CheckSquare,
    IdCard,
    Phone,
    User,
} from "lucide-react-native";
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
import { readAuthRouteParams } from "@/auth/auth-routing";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { useAppTheme } from "@/theme/app-theme";

export default function FaydaAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, updateDraft } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  const canVerify = useMemo(
    () =>
      draft.faydaId.trim().length > 0 &&
      draft.phoneNumber.trim().length > 0 &&
      draft.fullName.trim().length > 0 &&
      draft.acceptedTerms,
    [draft.acceptedTerms, draft.faydaId, draft.fullName, draft.phoneNumber],
  );

  return (
    <AuthShell
      title="Fayda Digital ID"
      subtitle="Secure Identity Verification"
      onBackPress={() => router.back()}
      onClosePress={() => router.replace("/" as never)}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Login with Fayda ID
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            Verify your identity securely using Fayda Digital ID
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Fayda ID Number *
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <IdCard size={16} color={colors.textMuted} />
            <TextInput
              value={draft.faydaId}
              onChangeText={(value) => updateDraft({ faydaId: value })}
              placeholder="E.g., FIDA123456789"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, { color: colors.text }]}
            />
          </View>
          <Text style={[styles.helper, { color: colors.textMuted }]}>
            Demo: FIDA123456789
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Phone Number *
          </Text>
          <View style={styles.splitRow}>
            <View
              style={[
                styles.prefixBox,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text style={[styles.prefixText, { color: colors.text }]}>
                ET
              </Text>
              <Text style={[styles.prefixCode, { color: colors.textMuted }]}>
                +251
              </Text>
            </View>
            <View
              style={[
                styles.inputWrap,
                styles.flexGrow,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Phone size={16} color={colors.textMuted} />
              <TextInput
                value={draft.phoneNumber}
                onChangeText={(value) => updateDraft({ phoneNumber: value })}
                placeholder="9X XXX XXXX"
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Full Name *
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <User size={16} color={colors.textMuted} />
            <TextInput
              value={draft.fullName}
              onChangeText={(value) => updateDraft({ fullName: value })}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, { color: colors.text }]}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>
            Date of Birth (Optional)
          </Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <CalendarDays size={16} color={colors.textMuted} />
            <TextInput
              value={draft.dateOfBirth}
              onChangeText={(value) => updateDraft({ dateOfBirth: value })}
              placeholder="mm/dd/yyyy"
              placeholderTextColor={colors.textMuted}
              style={[styles.input, { color: colors.text }]}
            />
          </View>
        </View>

        <View
          style={[
            styles.consentCard,
            {
              backgroundColor: colors.surfaceAccent,
              borderColor: colors.activeSurface,
            },
          ]}
        >
          <CheckSquare size={16} color={colors.activeText} />
          <Pressable
            onPress={() => updateDraft({ acceptedTerms: !draft.acceptedTerms })}
            style={styles.consentCopy}
          >
            <Text style={[styles.consentText, { color: colors.text }]}>
              I agree to verify my identity using{" "}
              <Text style={styles.emphasis}>Fayda Digital ID</Text>. My
              information will be securely processed and stored.
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() =>
            router.push({
              pathname: "/auth/fayda-verified" as never,
              params: {
                redirectTo: params.redirectTo ?? "/",
                intent: params.intent ?? "authenticate",
              },
            })
          }
          disabled={!canVerify}
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: canVerify
                ? colors.activeText
                : colors.surfaceMuted,
            },
            pressed && canVerify && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.primaryLabel,
              { color: canVerify ? "#FFFFFF" : colors.textMuted },
            ]}
          >
            Verify with Fayda
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()} style={styles.backTextWrap}>
          <Text style={[styles.backText, { color: colors.textMuted }]}>
            ← Back
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
    gap: 4,
    marginTop: 4,
  },
  heading: {
    fontSize: 20,
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
  helper: {
    fontSize: 11,
    fontWeight: "600",
  },
  inputWrap: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  splitRow: {
    flexDirection: "row",
    gap: 10,
  },
  prefixBox: {
    width: 88,
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  prefixText: {
    fontSize: 13,
    fontWeight: "800",
  },
  prefixCode: {
    fontSize: 12,
    fontWeight: "800",
  },
  flexGrow: {
    flex: 1,
  },
  consentCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 14,
    borderWidth: 1,
    padding: 14,
  },
  consentCopy: {
    flex: 1,
  },
  consentText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },
  emphasis: {
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
  backTextWrap: {
    alignItems: "center",
    paddingTop: 2,
  },
  backText: {
    fontSize: 13,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.92,
  },
});
