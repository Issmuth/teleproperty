import { AccountRow } from "@/components/molecules/account/account-row";
import { ProfileCard } from "@/components/molecules/account/profile-card";
import { useI18n } from "@/i18n";
import { useAuthStore } from "@/store";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import {
    Bell,
    Building2,
    CreditCard,
    Globe,
    Headphones,
    Heart,
    MessageSquareHeart,
    PhoneCall,
    Shield,
    Star,
    Wallet,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  const { t } = useI18n();
  const router = useRouter();
  const { colors } = useAppTheme();
  
  // Subscribe to session state directly to ensure re-renders
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  
  // Derive computed values from session
  const isAuthenticated = Boolean(session);
  const isAdmin = session?.role === "developer" || session?.role === "owner";

  const contactLine =
    session?.phoneNumber ?? session?.email ?? "No contact added";
  const planLabel =
    session?.role === "developer"
      ? "Developer Plan"
      : session?.role === "broker"
        ? "Broker Plan"
        : session?.role === "agent"
          ? "Agent Plan"
          : session?.role === "owner"
            ? "Owner Plan"
            : session?.role === "hotel-partner"
              ? "Partner Plan"
              : "Basic Plan";

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ backgroundColor: colors.background }}
    >
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.content}>
          <ProfileCard
            isAuthenticated={isAuthenticated}
            name={session?.displayName}
            contact={contactLine}
            plan={planLabel}
            onPress={() => router.push("/auth" as never)}
          />

          {isAdmin && (
            <Pressable
              style={styles.adminBtn}
              onPress={() => router.push("/admin" as never)}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <Shield size={18} color="white" />
                <Text style={styles.adminLabel}>
                  {t("account.adminDashboard")}
                </Text>
              </View>
            </Pressable>
          )}

          <View
            style={[
              styles.listCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <AccountRow
              title={t("account.mySubscription.title")}
              subtitle={t("account.mySubscription.subtitle")}
              icon={<Star size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
              onPress={() => router.push("/subscriptions" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.savedProperties.title")}
              subtitle={t("account.savedProperties.subtitle")}
              icon={<Heart size={18} color="#FB7185" />}
              accentColor="#FFF1F2"
              onPress={() => router.push("/saved" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.myListings.title")}
              subtitle={t("account.myListings.subtitle")}
              icon={<Building2 size={18} color="#3B82F6" />}
              accentColor="#EFF6FF"
              onPress={() => router.push("/listings" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.myCallbacks.title")}
              subtitle={t("account.myCallbacks.subtitle")}
              icon={<PhoneCall size={18} color="#22C55E" />}
              accentColor="#ECFDF5"
              onPress={() => router.push("/callbacks" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.myPayments.title")}
              subtitle={t("account.myPayments.subtitle")}
              icon={<CreditCard size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
              onPress={() => router.push("/payment-history" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.myReviews.title")}
              subtitle={t("account.myReviews.subtitle")}
              icon={<MessageSquareHeart size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
              onPress={() => router.push("/reviews" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.notifications.title")}
              subtitle={t("account.notifications.subtitle")}
              icon={<Bell size={18} color="#A855F7" />}
              accentColor="#F3E8FF"
              onPress={() => router.push("/notifications" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.privacy.title")}
              subtitle={t("account.privacy.subtitle")}
              icon={<Shield size={18} color="#64748B" />}
              accentColor="#F8FAFC"
              onPress={() => router.push("/privacy-security" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title={t("account.support.title")}
              subtitle={t("account.support.subtitle")}
              icon={<Headphones size={18} color="#14B8A6" />}
              accentColor="#ECFEFF"
            />
          </View>

          <View
            style={[
              styles.langCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <AccountRow
              title={t("account.appLanguage.title")}
              subtitle={t("languages.en") ?? "English"}
              icon={<Globe size={18} color="#22C55E" />}
              accentColor="#ECFDF5"
            />
          </View>

          {isAuthenticated ? (
            <Pressable
              style={styles.signOutBtn}
              onPress={async () => {
                await signOut();
              }}
            >
              <Text style={styles.signOutLabel}>{t("account.signOut")}</Text>
            </Pressable>
          ) : (
            <Pressable
              style={styles.signOutBtn}
              onPress={() => router.push("/auth" as never)}
            >
              <Text style={styles.signOutLabel}>{t("account.signIn")}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 120 },
  content: { gap: 12, padding: 16 },
  listCard: {
    borderRadius: 16,
    padding: 8,
    gap: 0,
    borderWidth: 1,
  },
  langCard: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
  },
  divider: {
    height: 8,
  },
  signOutBtn: {
    backgroundColor: "#0B8F55",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  signOutLabel: { color: "white", fontWeight: "800" },
  adminBtn: {
    backgroundColor: "#0B6BFF",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  adminLabel: { color: "white", fontWeight: "800" },
});

function GiftIcon() {
  return <Wallet size={18} color="#10B981" />;
}
