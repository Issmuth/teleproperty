import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BottomBannerProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  colors?: [string, string];
  onPress?: () => void;
};

export function BottomBanner({
  title,
  subtitle,
  actionLabel = "",
  colors = ["#0B3C2A", "#0F9D58"],
  onPress,
}: BottomBannerProps) {
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {actionLabel ? (
        <Pressable onPress={onPress} style={styles.button}>
          <Text style={styles.buttonLabel}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "white",
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
  },
  button: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonLabel: {
    fontWeight: "800",
  },
});
