import { House } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type AppLogoProps = {
  compact?: boolean;
};

export function AppLogo({ compact = false }: AppLogoProps) {
  return (
    <View style={[styles.container, compact && styles.compactContainer]}>
      <View style={[styles.mark, compact && styles.compactMark]}>
        <House color="#FFFFFF" size={compact ? 16 : 18} strokeWidth={2.5} />
      </View>
      <View style={styles.textBlock}>
        <Text style={[styles.title, compact && styles.compactTitle]}>
          TeleProperty
        </Text>
        {!compact ? <Text style={styles.subtitle}>Finder Ethiopia</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 10,
  },
  compactContainer: {
    gap: 8,
  },
  mark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#0E7C4B",
    alignItems: "center",
    justifyContent: "center",
  },
  compactMark: {
    width: 34,
    height: 34,
    borderRadius: 11,
  },
  textBlock: {
    justifyContent: "center",
  },
  title: {
    fontSize: 17,
    lineHeight: 20,
    fontWeight: "800",
    color: "#111827",
  },
  compactTitle: {
    fontSize: 15,
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "600",
    color: "#0E7C4B",
  },
});
