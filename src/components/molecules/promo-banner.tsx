import { LinearGradient } from "expo-linear-gradient";
import { Play, X } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PromoBannerProps = {
  kicker?: string;
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  colors?: [string, string];
  showClose?: boolean;
  showPlayButton?: boolean;
  absoluteBottom?: boolean;
  onPrimary?: () => void;
  onSecondary?: () => void;
};

export function PromoBanner({
  kicker,
  title,
  subtitle,
  primaryLabel,
  secondaryLabel,
  colors = ["#0B3C2A", "#0F9D58"],
  showClose = true,
  showPlayButton = false,
  absoluteBottom = false,
  onPrimary,
  onSecondary,
}: PromoBannerProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const Outer: any = absoluteBottom ? View : View;

  return (
    <Outer style={absoluteBottom ? styles.outerContainer : undefined}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {showClose && (
          <Pressable
            hitSlop={12}
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <X size={14} color="white" />
          </Pressable>
        )}

        {kicker ? <Text style={styles.kicker}>{kicker}</Text> : null}

        {title ? <Text style={styles.title}>{title}</Text> : null}

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

        {showPlayButton ? (
          <View style={styles.playWrap} pointerEvents="none">
            <View style={styles.playCircle}>
              <Play size={22} color="white" />
            </View>
          </View>
        ) : null}

        <View style={styles.buttonsRow}>
          {primaryLabel ? (
            <Pressable style={styles.primaryButton} onPress={onPrimary}>
              <Text style={styles.primaryButtonText}>{primaryLabel}</Text>
            </Pressable>
          ) : null}

          {secondaryLabel ? (
            <Pressable style={styles.secondaryButton} onPress={onSecondary}>
              <Text style={styles.secondaryButtonText}>{secondaryLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </LinearGradient>
    </Outer>
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  kicker: {
    color: "rgba(255,255,255,0.95)",
    fontWeight: "800",
    marginBottom: 6,
    fontSize: 12,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  subtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  primaryButton: {
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: "#0B8F55",
    fontSize: 13,
    fontWeight: "800",
  },
  secondaryButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "800",
  },
  playWrap: {
    alignItems: "center",
    marginVertical: 16,
  },
  playCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
});
