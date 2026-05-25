import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

export type HomeSegment = {
  key: string;
  label: string;
};

type HomeSegmentedControlProps = {
  segments: readonly HomeSegment[];
  activeKey: string;
  onChange: (key: string) => void;
};

export function HomeSegmentedControl({
  segments,
  activeKey,
  onChange,
}: HomeSegmentedControlProps) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surfaceAccent, borderColor: colors.border },
      ]}
    >
      {segments.map((segment) => {
        const isActive = segment.key === activeKey;

        return (
          <Pressable
            key={segment.key}
            onPress={() => onChange(segment.key)}
            style={({ pressed }) => [
              styles.segment,
              isActive && {
                backgroundColor: colors.surface,
                shadowColor: colors.shadow,
              },
              pressed ? styles.pressed : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isActive ? colors.activeText : colors.textMuted },
              ]}
            >
              {segment.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 8,
    borderRadius: 22,
    borderWidth: 1,
    padding: 6,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
  },
});
