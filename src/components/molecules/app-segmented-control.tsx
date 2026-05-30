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
        pressed && !isActive ? styles.pressed : null,
      ]}
    >
      <View
        style={
          isGlassy
            ? [
                styles.glassyLabelWrap,
                {
                  backgroundColor: isActive
                    ? colors.activeSurface + "55"
                    : "transparent",
                  borderColor: isActive ? colors.activeBorder : "transparent",
                },
              ]
            : [
                styles.solidLabelWrap,
                {
                  backgroundColor: isActive ? colors.activeText : "transparent",
                },
              ]
        }
      >
        <Text
          style={
            isGlassy
              ? styles.glassyLabel
              : [
                  styles.solidLabel,
                  { color: isActive ? "#FFFFFF" : colors.textMuted },
                ]
          }
        >
          {segment.label}
        </Text>
      </View>
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
    alignItems: "stretch",
    justifyContent: "center",
  },
  glassySegment: {
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
    textAlign: "center",
  },
  glassyLabelWrap: {
    width: "100%",
    padding: 12,
    borderRadius: 16,
    overflow: "hidden",
  },
  solidLabel: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  solidLabelWrap: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
});
