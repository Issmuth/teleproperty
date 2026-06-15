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

import { readAuthRouteParams } from "@/auth/auth-routing";
import { AuthRoleCard } from "@/components/organisms/auth/auth-role-card";
import { AuthShell } from "@/components/organisms/auth/auth-shell";
import { AuthStepper } from "@/components/organisms/auth/auth-stepper";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { toast, type AuthRole } from "@/store";
import { useAppTheme } from "@/theme/app-theme";

export default function RoleAuthScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const { draft, updateDraft, completeAuth } = useAuth();
  const params = readAuthRouteParams(
    useLocalSearchParams<Record<string, string | string[]>>()
  );

  const roleCards: Array<{
    role: AuthRole;
    titleKey: string;
    subtitleKey: string;
    icon: typeof Home;
  }> = [
    {
      role: "buyer",
      titleKey: "auth.role.buyer.title",
      subtitleKey: "auth.role.buyer.subtitle",
      icon: Home,
    },
    {
      role: "owner",
      titleKey: "auth.role.owner.title",
      subtitleKey: "auth.role.owner.subtitle",
      icon: Building2,
    },
    {
      role: "agent",
      titleKey: "auth.role.agent.title",
      subtitleKey: "auth.role.agent.subtitle",
      icon: UserRound,
    },
    {
      role: "broker",
      titleKey: "auth.role.broker.title",
      subtitleKey: "auth.role.broker.subtitle",
      icon: Briefcase,
    },
    {
      role: "developer",
      titleKey: "auth.role.developer.title",
      subtitleKey: "auth.role.developer.subtitle",
      icon: SquareUser,
    },
    {
      role: "hotel-partner",
      titleKey: "auth.role.hotelPartner.title",
      subtitleKey: "auth.role.hotelPartner.subtitle",
      icon: Hotel,
    },
  ];

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
  const selectedRole = roleCards.find((r) => r.role === draft.role);

  const handleContinue = async () => {
    await completeAuth();
    toast.success(t("auth.welcome", { name: draft.fullName }));
    router.replace((params.redirectTo ?? "/") as never);
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
        <AuthStepper currentStep={3} steps={3} />

        <View style={styles.copyBlock}>
          <Text style={[styles.heading, { color: colors.text }]}>
            {t("auth.role.title")}
          </Text>
          <Text style={[styles.subheading, { color: colors.textMuted }]}>
            {t("auth.role.subtitle")}
          </Text>
        </View>

        <View style={styles.grid}>
          {roleCards.map((item) => (
            <View key={item.role} style={styles.gridItem}>
              <AuthRoleCard
                title={t(item.titleKey)}
                subtitle={t(item.subtitleKey)}
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
            {selectedRole 
              ? t("auth.role.continueAs", { role: t(selectedRole.titleKey) })
              : t("auth.role.selectRole")}
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
