import { useAppTheme } from "@/theme/app-theme";
import { LinearGradient } from "expo-linear-gradient";
import { User } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProfileCardProps = {
  onPress?: () => void;
  isAuthenticated?: boolean;
  name?: string;
  contact?: string;
  plan?: string;
  ctaLabel?: string;
};

export function ProfileCard({
  onPress,
  isAuthenticated = false,
  name,
  contact,
  plan,
  ctaLabel = "Sign In / Register",
}: ProfileCardProps) {
  const { isDark } = useAppTheme();

  return (
    <LinearGradient
      colors={isDark ? ["#0B8F55", "#10B981"] : ["#0B8F55", "#14B37B"]}
      style={styles.container}
    >
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <User color="white" />
        </View>
      </View>

      <View style={styles.body}>
        {isAuthenticated ? (
          <>
            <Text style={styles.title}>{name ?? "TeleProperty User"}</Text>
            <Text style={styles.subtitle}>{contact ?? "No contact added"}</Text>
            <View style={styles.planPill}>
              <Text style={styles.planLabel}>{plan ?? "Basic Plan"}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>
              Sign in to save properties & manage listings
            </Text>
            <Pressable style={styles.signBtn} onPress={onPress}>
              <Text style={styles.signLabel}>{ctaLabel}</Text>
            </Pressable>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  left: {},
  avatarWrap: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    alignItems: "flex-start",
    gap: 4,
  },
  title: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
  },
  planPill: {
    marginTop: 4,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  planLabel: {
    color: "white",
    fontWeight: "800",
    fontSize: 12,
  },
  signBtn: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  signLabel: {
    color: "#0B8F55",
    fontWeight: "800",
  },
});
