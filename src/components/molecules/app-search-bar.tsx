import { useAppTheme } from "@/theme/app-theme";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { ReactNode } from "react";
import {
    Pressable,
    StyleSheet,
    TextInput,
    View,
    ViewStyle,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type AppSearchBarVariant = "elevated" | "muted";

type AppSearchBarProps = {
  placeholder: string;
  variant?: AppSearchBarVariant;
  showFilter?: boolean;
  onFilterPress?: () => void;
  rightAccessory?: ReactNode;
  containerStyle?: ViewStyle | ViewStyle[];
};

export function AppSearchBar({
  placeholder,
  variant = "elevated",
  showFilter = true,
  onFilterPress,
  rightAccessory,
  containerStyle,
}: AppSearchBarProps) {
  const { colors } = useAppTheme();
  const isElevated = variant === "elevated";

  const scale = useSharedValue(1);

  const filterAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleFilterPressIn = () => {
    scale.value = withSpring(0.92, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  const handleFilterPressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 200, mass: 0.5 });
  };

  return (
    <View
      style={[
        styles.container,
        isElevated
          ? [styles.elevatedContainer, { backgroundColor: colors.surface }]
          : styles.mutedContainer,
        containerStyle,
      ]}
    >
      <View
        style={[
          styles.inputWrap,
          isElevated ? styles.elevatedInputWrap : styles.mutedInputWrap,
          isElevated
            ? { backgroundColor: colors.surface, borderColor: colors.border }
            : {
                backgroundColor: colors.surfaceMuted,
                borderColor: colors.border,
              },
        ]}
      >
        <Search size={18} color={colors.textMuted} strokeWidth={2.1} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.text }]}
        />
      </View>

      {showFilter && (
        <AnimatedPressable
          onPress={onFilterPress}
          onPressIn={handleFilterPressIn}
          onPressOut={handleFilterPressOut}
          style={[
            styles.filterButton,
            filterAnimatedStyle,
            isElevated ? styles.elevatedFilterButton : styles.mutedFilterButton,
            isElevated
              ? { backgroundColor: colors.surfaceMuted }
              : {
                  backgroundColor: colors.surfaceMuted,
                  borderColor: colors.border,
                },
          ]}
        >
          <SlidersHorizontal
            size={18}
            color={colors.textMuted}
            strokeWidth={2.2}
          />
        </AnimatedPressable>
      )}

      {rightAccessory}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  elevatedContainer: {
    gap: 8,
    borderRadius: 22,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 4,
    elevation: 4,
  },
  mutedContainer: {
    gap: 12,
    marginVertical: 16,
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    fontSize: 14,
    fontWeight: "500",
  },
  filterButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  // Elevated specific inner styles
  elevatedInputWrap: {
    minHeight: 44,
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  elevatedFilterButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
  },
  // Muted specific inner styles
  mutedInputWrap: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  mutedFilterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
  },
});
