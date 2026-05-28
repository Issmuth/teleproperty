import { useRouter } from "expo-router";
import {
    CircleDollarSign,
    Mail,
    Phone,
    UserRound
} from "lucide-react-native";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/auth/auth-context";
import { readAuthRouteParams } from "@/auth/auth-routing";
import { AuthOptionCard } from "@/components/organisms/auth/auth-option-card";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { useAppTheme } from "@/theme/app-theme";
import { useLocalSearchParams } from "expo-router";

export default function AuthIndexScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { isAuthenticated, isHydrated } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  useEffect(() => {
    if (!isHydrated || !isAuthenticated) {
      return;
    }

    router.replace((params.redirectTo ?? "/") as never);
  }, [isAuthenticated, isHydrated, params.redirectTo, router]);

  return (
    <AuthShell
      title="TeleProperty"
      subtitle="Finder Ethiopia"
      onClosePress={() => router.replace("/")}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            Sign In or Create Account
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            Choose a login method to continue
          </Text>
        </View>

        <View style={styles.options}>
          <AuthOptionCard
            title="Phone Number"
            subtitle="Quick login with OTP"
            icon={Phone}
            accentColor="#E8FFF0"
            tintColor="#22C55E"
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
          <AuthOptionCard
            title="Fayda Digital ID"
            subtitle="Secure identity verification"
            icon={CircleDollarSign}
            accentColor="#E6F0FF"
            tintColor="#2563EB"
            active
            onPress={() =>
              router.push({
                pathname: "/auth/fayda" as never,
                params: {
                  redirectTo: params.redirectTo ?? "/",
                  intent: params.intent ?? "authenticate",
                },
              })
            }
          />
          <AuthOptionCard
            title="Email & Password"
            subtitle="Register or login with email"
            icon={Mail}
            accentColor="#EEF2FF"
            tintColor="#3B82F6"
            onPress={() =>
              router.push({
                pathname: "/auth/email" as never,
                params: {
                  redirectTo: params.redirectTo ?? "/",
                  intent: params.intent ?? "authenticate",
                },
              })
            }
          />
          <AuthOptionCard
            title="Continue as Guest"
            subtitle="Browse properties"
            icon={UserRound}
            accentColor="#F3F4F6"
            tintColor="#6B7280"
            onPress={() => router.replace("/" as never)}
          />
        </View>

        <View style={styles.footerNoteWrap}>
          <Text style={[styles.footerNote, { color: colors.textMuted }]}>
            By signing in, you agree to our Terms of Service and Privacy Policy
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
