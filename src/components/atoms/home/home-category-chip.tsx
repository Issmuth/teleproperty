import type { ComponentType } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type HomeCategoryChipProps = {
  label: string;
  icon: IconComponent;
  color: string;
  selected?: boolean;
  onPress?: () => void;
};

export function HomeCategoryChip({
  label,
  icon: Icon,
  color,
  selected = false,
  onPress,
}: HomeCategoryChipProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.circle,
          { backgroundColor: color, shadowColor: color },
          selected && { borderColor: colors.activeBorder },
        ]}
      >
        <Icon color="#FFFFFF" size={24} strokeWidth={2.1} />
      </View>
      <Text style={[styles.label, { color: colors.textMuted }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 74,
    alignItems: "center",
    gap: 8,
  },
  circle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.9)",
    shadowOpacity: 0.32,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
