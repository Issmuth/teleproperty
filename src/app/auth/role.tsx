import { useLocalSearchParams, useRouter } from "expo-router";
import {
    Briefcase,
    Building2,
    Home,
    Hotel,
    SquareUser,
    UserRound,
} from "lucide-react-native";
import { useEffect, useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAuth, type AuthRole } from "@/auth/auth-context";
import { readAuthRouteParams } from "@/auth/auth-routing";
import { AuthRoleCard } from "@/components/organisms/auth/auth-role-card";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { AuthStepper } from "@/components/organisms/auth/auth-stepper";
import { useAppTheme } from "@/theme/app-theme";

const roleCards: Array<{
  role: AuthRole;
  title: string;
  subtitle: string;
  icon: typeof Home;
}> = [
  {
    role: "buyer",
    title: "Buyer / Seeker",
    subtitle: "Looking to buy or rent",
    icon: Home,
  },
  {
    role: "owner",
    title: "Owner",
    subtitle: "List my property",
    icon: Building2,
  },
  {
    role: "agent",
    title: "Agent",
    subtitle: "Find & connect clients",
    icon: UserRound,
  },
  {
    role: "broker",
    title: "Broker",
    subtitle: "Manage listings & leads",
    icon: Briefcase,
  },
  {
    role: "developer",
    title: "Developer",
    subtitle: "Manage projects & units",
    icon: SquareUser,
  },
  {
    role: "hotel-partner",
    title: "Hotel Partner",
    subtitle: "List my hotel / guesthouse",
    icon: Hotel,
  },
];

export default function RoleAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { draft, updateDraft, completeAuth } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>(),
  );

  useEffect(() => {
    if (!draft.phoneNumber || !draft.fullName) {
      router.replace({
        pathname: "/auth/phone" as never,
        params: params.redirectTo
          ? {
              redirectTo: params.redirectTo,
              intent: params.intent ?? "authenticate",
            }
          : { intent: params.intent ?? "authenticate" },
      });
    }
  }, [
    draft.fullName,
    draft.phoneNumber,
    params.intent,
    params.redirectTo,
    router,
  ]);

  const canContinue = useMemo(() => Boolean(draft.role), [draft.role]);

  const handleContinue = async () => {
    await completeAuth();
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
        <AuthStepper currentStep={3} steps={3} />

        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            I am a...
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            Select your role to personalise your experience
          </Text>
        </View>

        <View style={styles.grid}>
          {roleCards.map((item) => (
            <View key={item.role} style={styles.gridItem}>
              <AuthRoleCard
                title={item.title}
                subtitle={item.subtitle}
                icon={item.icon}
                selected={draft.role === item.role}
                onPress={() => updateDraft({ role: item.role })}
              />
            </View>
          ))}
        </View>

        <Pressable
          onPress={handleContinue}
          disabled={!canContinue}
          style={({ pressed }) => [
            styles.primaryButton,
            {
              backgroundColor: canContinue
                ? colors.activeText
                : colors.surfaceMuted,
            },
            pressed && canContinue && styles.pressed,
          ]}
        >
          <Text
            style={[
              styles.primaryLabel,
              { color: canContinue ? "#FFFFFF" : colors.textMuted },
            ]}
          >
            Continue as ... →
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridItem: {
    width: "48%",
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
