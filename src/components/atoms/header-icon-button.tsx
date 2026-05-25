import type { ComponentType } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type IconComponent = ComponentType<{
  color?: string;
  size?: number;
  strokeWidth?: number;
}>;

type HeaderIconButtonProps = {
  icon: IconComponent;
  label: string;
  onPress?: () => void;
  iconColor?: string;
  style?: ViewStyle;
};

export function HeaderIconButton({
  icon: Icon,
  label,
  onPress,
  iconColor,
  style,
}: HeaderIconButtonProps) {
  const { colors } = useAppTheme();
  const resolvedIconColor = iconColor ?? colors.icon;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.iconButtonBackground },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon color={resolvedIconColor} size={18} strokeWidth={2.2} />
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
