import { type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  return (
    <AnimatedPressable
      style={[styles.actionButton, { backgroundColor }, style, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Icon size={iconSize} color={color} strokeWidth={2.2} />
      <Text style={[styles.actionLabel, { color }]}>{label}</Text>
    </AnimatedPressable>
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
