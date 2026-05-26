import { palette } from "@/theme/palette";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function ValuationBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <View style={styles.outerContainer}>
      <LinearGradient
        colors={[palette.blue.strong, palette.brand.accent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <Pressable
          hitSlop={15}
          style={styles.closeButton}
          onPress={() => setVisible(false)}
        >
          <X size={14} color="white" />
        </Pressable>

        <Text style={styles.title}>Property Valuation Free</Text>
        <Text style={styles.subtitle}>
          Know your property worth in 2 minutes
        </Text>

        <View style={styles.buttonsRow}>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Free Assessment</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Get Valued &rarr;</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  container: {
    padding: 16,
    borderRadius: 16,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 16,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "white",
    padding: 6,
    borderRadius: 12,
  },
  primaryButton: {
    backgroundColor: "#ECFDF5", // Light green background
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: palette.brand.primary,
    fontSize: 13,
    fontWeight: "800",
  },
  secondaryButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: palette.blue.strong,
    fontSize: 13,
    fontWeight: "800",
  },
});
