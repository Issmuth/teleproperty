import type { ComponentType } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type HeaderIconButtonProps = {
  icon: IconComponent;
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export function HeaderIconButton({
  icon: Icon,
  label,
  onPress,
  style,
}: HeaderIconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Icon color="#0F172A" size={18} strokeWidth={2.2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 28,
    height: 28,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
