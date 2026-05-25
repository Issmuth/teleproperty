import { StyleSheet, Text, View } from "react-native";

type ScreenTemplateProps = {
  title: string;
  description?: string;
};

export function ScreenTemplate({
  title,
  description = "Blank template",
}: ScreenTemplateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.kicker}>TeleProperty</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7F8",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    gap: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#4B5563",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
});
