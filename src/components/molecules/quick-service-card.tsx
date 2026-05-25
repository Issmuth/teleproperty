import { type LucideIcon, ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";

type QuickServiceCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  backgroundColor: string;
  overlayColor?: string;
  style?: ViewStyle;
};

export function QuickServiceCard({
  title,
  subtitle,
  icon: Icon,
  backgroundColor,
  overlayColor = "rgba(255, 255, 255, 0.15)",
  style,
}: QuickServiceCardProps) {
  return (
    <Pressable style={[styles.container, { backgroundColor }, style]}>
      <View style={[styles.overlayShape, { backgroundColor: overlayColor }]} />

      <View style={styles.topContent}>
        <View style={styles.headerRow}>
          <Icon size={24} color="#FFFFFF" strokeWidth={2} />
          <View style={styles.textStack}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <Text style={styles.footerText}>Tap to book →</Text>
      </View>

      <View style={styles.arrowWrap}>
        <ChevronRight size={20} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: "hidden",
    height: 110,
    position: "relative",
    padding: 16,
    justifyContent: "space-between",
  },
  overlayShape: {
    position: "absolute",
    right: -40,
    top: -20,
    bottom: -80,
    width: 130,
    height: 130,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  topContent: {
    zIndex: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  textStack: {
    flex: 1,
    marginTop: 2,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "400",
    opacity: 0.9,
  },
  bottomRow: {
    zIndex: 2,
  },
  footerText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.8,
  },
  arrowWrap: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 2,
  },
});
