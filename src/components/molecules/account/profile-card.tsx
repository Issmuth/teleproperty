import { LinearGradient } from "expo-linear-gradient";
import { User } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ProfileCard({ onPress }: { onPress?: () => void }) {
  return (
    <LinearGradient colors={["#0B8F55", "#14B37B"]} style={styles.container}>
      <View style={styles.left}>
        <View style={styles.avatarWrap}>
          <User color="white" />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>Your Profile</Text>
        <Text style={styles.subtitle}>
          Sign in to save properties & manage listings
        </Text>
        <Pressable style={styles.signBtn} onPress={onPress}>
          <Text style={styles.signLabel}>Sign In / Register</Text>
        </Pressable>
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
