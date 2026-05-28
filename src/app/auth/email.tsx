import { useLocalSearchParams, useRouter } from "expo-router";
import { Lock, Mail } from "lucide-react-native";
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

export default function EmailAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, updateDraft, completeAuth } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  const isDisabled = useMemo(
    () => !draft.email.trim() || !draft.password.trim(),
    [draft.email, draft.password],
  );

  const handleLogin = async () => {
    await completeAuth({ method: "email" });
    router.replace((params.redirectTo ?? "/") as never);
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
        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Login with Email
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            Use your email and password to continue
          </Text>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Email</Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Mail size={16} color={colors.textMuted} />
            <TextInput
              value={draft.email}
              onChangeText={(value) => updateDraft({ email: value })}
              placeholder="name@example.com"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[styles.input, { color: colors.text }]}
            />
          </View>
        </View>

        <View style={styles.fieldGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Password</Text>
          <View
            style={[
              styles.inputWrap,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Lock size={16} color={colors.textMuted} />
            <TextInput
              value={draft.password}
              onChangeText={(value) => updateDraft({ password: value })}
              placeholder="Your password"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              style={[styles.input, { color: colors.text }]}
            />
          </View>
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={isDisabled}
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: isDisabled
                ? colors.surfaceMuted
                : colors.activeText,
            },
            pressed && !isDisabled && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.primaryLabel,
              { color: isDisabled ? colors.textMuted : "#FFFFFF" },
            ]}
          >
            Sign In
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
  pressed: {
    opacity: 0.92,
  },
});
