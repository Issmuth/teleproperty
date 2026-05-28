import { AccountRow } from "@/components/molecules/account/account-row";
import { ProfileCard } from "@/components/molecules/account/profile-card";
import { useI18n } from "@/i18n";
import { useRouter } from "expo-router";
import {
    BadgeCheck,
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.content}>
          <ProfileCard onPress={() => router.push("/auth" as never)} />

          <View style={styles.listCard}>
            <AccountRow
              title="My Subscription"
              subtitle="Upgrade your plan"
              icon={<Star size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Saved Properties"
              subtitle="8 saved properties"
              icon={<Heart size={18} color="#FB7185" />}
              accentColor="#FFF1F2"
              onPress={() => router.push("/saved" as never)}
            />
            <View style={styles.divider} />
            <AccountRow
              title="My Listings"
              subtitle="0 active listings"
              icon={<Building2 size={18} color="#3B82F6" />}
              accentColor="#EFF6FF"
            />
            <View style={styles.divider} />
            <AccountRow
              title="My Callbacks"
              subtitle="2 pending"
              icon={<PhoneCall size={18} color="#22C55E" />}
              accentColor="#ECFDF5"
            />
            <View style={styles.divider} />
            <AccountRow
              title="My Payments"
              subtitle="Payment history"
              icon={<CreditCard size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
            />
            <View style={styles.divider} />
            <AccountRow
              title="My Reviews"
              subtitle="My reviews (3)"
              icon={<MessageSquareHeart size={18} color="#F59E0B" />}
              accentColor="#FFF7E6"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Referral & Rewards"
              subtitle="Earn 25% cashback"
              icon={<GiftIcon />}
              accentColor="#ECFDF5"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Fayda Verification"
              subtitle="Fayda Digital ID"
              icon={<BadgeCheck size={18} color="#60A5FA" />}
              accentColor="#EFF6FF"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Notifications"
              subtitle="Manage alerts"
              icon={<Bell size={18} color="#A855F7" />}
              accentColor="#F3E8FF"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Privacy & Security"
              subtitle="Account protection"
              icon={<Shield size={18} color="#64748B" />}
              accentColor="#F8FAFC"
            />
            <View style={styles.divider} />
            <AccountRow
              title="Support"
              subtitle="Help center · Call 8181"
              icon={<Headphones size={18} color="#14B8A6" />}
              accentColor="#ECFEFF"
            />
          </View>

          <View style={styles.langCard}>
            <AccountRow
              title="App Language"
              subtitle={t("languages.en") ?? "English"}
              icon={<Globe size={18} color="#22C55E" />}
              accentColor="#ECFDF5"
            />
          </View>

          <Pressable style={styles.signOutBtn}>
            <Text style={styles.signOutLabel}>Sign In / Register</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 120 },
  content: { gap: 12, padding: 16 },
  listCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    gap: 0,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  langCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
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
});

function GiftIcon() {
  return <Wallet size={18} color="#10B981" />;
}
