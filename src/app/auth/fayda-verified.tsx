import { useLocalSearchParams, useRouter } from "expo-router";
import { CheckCircle2 } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "@/auth/auth-context";
import { readAuthRouteParams } from "@/auth/auth-routing";
import { useAppTheme } from "@/theme/app-theme";

export default function FaydaVerifiedScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, completeAuth } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );
  const didCompleteRef = useRef(false);

  useEffect(() => {
    if (!draft.faydaId.trim()) {
      router.replace({
        pathname: "/auth/fayda" as never,
        params: params.redirectTo
          ? {
              redirectTo: params.redirectTo,
              intent: params.intent ?? "authenticate",
            }
          : { intent: params.intent ?? "authenticate" },
      });
      return;
    }

    if (didCompleteRef.current) {
      return;
    }

    didCompleteRef.current = true;
    void completeAuth({ method: "fayda" });
  }, [completeAuth, draft.faydaId, params.intent, params.redirectTo, router]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.hero}>
        <View style={styles.logoMark}>
          <CheckCircle2 size={52} color={colors.activeText} />
        </View>
        <Text style={[styles.heading, { color: colors.text }]}>
          Fayda ID Verified!
        </Text>
        <Text style={[styles.subheading, { color: colors.textMuted }]}>
          {draft.fullName || "TeleProperty User"}
        </Text>
      </View>

      <View
        style={[
          styles.summaryCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.activeSurface,
          },
        ]}
      >
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
            Fayda ID
          </Text>
          <Text style={[styles.summaryValue, { color: colors.text }]}>
            {draft.faydaId || "234234234324234"}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={[styles.summaryLabel, { color: colors.textMuted }]}>
            Verification Status
          </Text>
          <View
            style={[
              styles.statusPill,
              { backgroundColor: colors.surfaceAccent },
            ]}
          >
            <Text style={[styles.statusText, { color: colors.activeText }]}>
              ✓ Verified
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => router.replace((params.redirectTo ?? "/") as never)}
        style={[styles.primaryButton, { backgroundColor: colors.activeText }]}
      >
        <Text style={styles.primaryLabel}>Continue to TeleProperty →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 90,
    gap: 16,
  },
  hero: {
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  logoMark: {
    width: 72,
    height: 72,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(16, 185, 129, 0.12)",
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
  summaryCard: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  summaryLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "900",
    flexShrink: 1,
    textAlign: "right",
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
  },
  primaryButton: {
    minHeight: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.2)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    elevation: 2,
  },
  primaryLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },
});
