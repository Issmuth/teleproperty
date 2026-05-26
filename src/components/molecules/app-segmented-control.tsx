import { useAppTheme } from "@/theme/app-theme";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type AppSegment = {
  key: string;
  label: string;
};

export type AppSegmentedControlVariant = "glassy" | "solid";

type AppSegmentedControlProps = {
  segments: readonly AppSegment[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: AppSegmentedControlVariant;
  containerStyle?: ViewStyle | ViewStyle[];
};

function SegmentItem({
  segment,
  isActive,
  isGlassy,
  colors,
  onChange,
}: {
  segment: AppSegment;
  isActive: boolean;
  isGlassy: boolean;
  colors: any;
  onChange: (key: string) => void;
}) {
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
      onPress={() => onChange(segment.key)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.segment,
        animatedStyle,
        isGlassy ? styles.glassySegment : styles.solidSegment,
        isActive &&
          (isGlassy
            ? {
                backgroundColor: colors.surface,
                shadowColor: colors.shadow,
              }
            : {
                backgroundColor: colors.activeText,
                shadowColor: colors.shadow,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              }),
        pressed && !isActive ? styles.pressed : null,
      ]}
    >
      <Text
        style={
          isGlassy
            ? [
                styles.glassyLabel,
                { color: isActive ? colors.activeText : "white" },
              ]
            : [
                styles.solidLabel,
                { color: isActive ? "#FFFFFF" : colors.textMuted },
              ]
        }
      >
        {segment.label}
      </Text>
    </AnimatedPressable>
  );
}

export function AppSegmentedControl({
  segments,
  activeKey,
  onChange,
  variant = "glassy",
  containerStyle,
}: AppSegmentedControlProps) {
  const { colors } = useAppTheme();
  const isGlassy = variant === "glassy";

  return (
    <View
      style={[
        styles.container,
        isGlassy
          ? [
              styles.glassyContainer,
              {
                backgroundColor: colors.surfaceAccent + "35",
                borderColor: "white",
              },
            ]
          : [styles.solidContainer, { backgroundColor: colors.surfaceMuted }],
        containerStyle,
      ]}
    >
      {segments.map((segment) => {
        const isActive = segment.key === activeKey;

        return (
          <SegmentItem
            key={segment.key}
            segment={segment}
            isActive={isActive}
            isGlassy={isGlassy}
            colors={colors}
            onChange={onChange}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  glassyContainer: {
    gap: 8,
    borderRadius: 22,
    borderWidth: 0.2,
    padding: 6,
  },
  solidContainer: {
    gap: 0,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  glassySegment: {
    minHeight: 44,
    borderRadius: 16,
  },
  solidSegment: {
    minHeight: 40,
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.9,
  },
  glassyLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  solidLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
