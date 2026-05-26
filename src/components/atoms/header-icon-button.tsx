import type { ComponentType } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { useAppTheme } from "@/theme/app-theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.button,
        animatedStyle,
        { backgroundColor: colors.iconButtonBackground },
        pressed && styles.pressed,
        style,
      ]}
    >
      <Icon color={resolvedIconColor} size={18} strokeWidth={2.2} />
    </AnimatedPressable>
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
