import { type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type ActionButtonProps = {
  label: string;
  icon: LucideIcon;
  backgroundColor: string;
  color?: string;
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  iconSize?: number;
};

export function ActionButton({
  label,
  icon: Icon,
  backgroundColor,
  color = "#FFFFFF",
  onPress,
  style,
  iconSize = 16,
}: ActionButtonProps) {
  return (
    <Pressable
      style={[styles.actionButton, { backgroundColor }, style]}
      onPress={onPress}
    >
      <Icon size={iconSize} color={color} strokeWidth={2.2} />
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  actionButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
});
