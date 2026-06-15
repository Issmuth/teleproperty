import { useLocalSearchParams, useRouter } from "expo-router";
import { Phone } from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { readAuthRouteParams } from "@/auth/auth-routing";
import { AuthOptionCard } from "@/components/organisms/auth/auth-option-card";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function AuthIndexScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const { isAuthenticated, isHydrated } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>()
  );

  // Redirect if already authenticated
  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace((params.redirectTo ?? "/") as never);
    }
  }, [isAuthenticated, isHydrated, params.redirectTo, router]);

  return (
    <AuthShell
      title={t("auth.shell.title")}
      subtitle={t("auth.shell.phoneSignIn")}
      onClosePress={() => router.replace("/")}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            {t("auth.index.title")}
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            {t("auth.index.subtitle")}
          </Text>
        </View>

        <View style={styles.options}>
          <AuthOptionCard
            title={t("auth.index.continueWithPhone")}
            subtitle={t("auth.index.quickLogin")}
            icon={Phone}
            accentColor="#E8FFF0"
            tintColor="#22C55E"
            active
            onPress={() =>
              router.push({
                pathname: "/auth/phone" as never,
                params: {
                  redirectTo: params.redirectTo ?? "/",
                  intent: params.intent ?? "authenticate",
                },
              })
            }
          />
        </View>

        <View style={styles.footerNoteWrap}>
          <Text style={[styles.footerNote, { color: colors.textMuted }]}>
            {t("auth.index.termsNotice")}
          </Text>
        </View>
      </ScrollView>
    </AuthShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
    gap: 18,
  },
  copyBlock: {
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  heading: {
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  subheading: {
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
  options: {
    gap: 12,
    marginTop: 6,
  },
  footerNoteWrap: {
    paddingTop: 6,
  },
  footerNote: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
