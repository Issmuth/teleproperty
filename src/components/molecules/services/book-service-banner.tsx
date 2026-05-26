import { useAppTheme } from "@/theme/app-theme";
import { LinearGradient } from "expo-linear-gradient";
import { Phone } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type BookServiceBanner = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
  colors?: [string, string];
  showPlayButton?: boolean;
};

export function BookServiceBanner({
  kicker,
  title,
  subtitle,
  buttonLabel = "",
  colors = ["#0B3C2A", "#0F9D58"],
  showPlayButton = false,
}: BookServiceBanner) {
  const { colors: themeColors } = useAppTheme();
  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View style={styles.leftRow}>
        <View style={styles.iconWrapper}>
          <Phone color={"white"} size={20} />
        </View>

        <View style={styles.textWrap}>
          {title ? <Text style={styles.title}>{title}</Text> : null}
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      {buttonLabel ? (
        <Pressable style={styles.button}>
          <Text style={[styles.buttonLabel, { color: colors[0] }]}>
            {buttonLabel}
          </Text>
        </Pressable>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: "hidden",
    padding: 12,
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  leftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  textWrap: {
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  kicker: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "800",
    marginBottom: 6,
  },
  title: {
    color: "white",
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 12,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonLabel: {
    fontWeight: "900",
  },
});
