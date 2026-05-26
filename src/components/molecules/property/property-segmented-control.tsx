import { useAppTheme } from "@/theme/app-theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type PropertySegment = {
  key: string;
  label: string;
};

type PropertySegmentedControlProps = {
  segments: readonly PropertySegment[];
  activeKey: string;
  onChange: (key: string) => void;
};

export function PropertySegmentedControl({
  segments,
  activeKey,
  onChange,
}: PropertySegmentedControlProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceMuted }]}>
      {segments.map((segment) => {
        const isActive = segment.key === activeKey;

        return (
          <Pressable
            key={segment.key}
            onPress={() => onChange(segment.key)}
            style={({ pressed }) => [
              styles.segment,
              isActive && {
                backgroundColor: colors.activeText,
                shadowColor: colors.shadow,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
              },
              pressed ? styles.pressed : null,
            ]}
          >
            <Text
              style={[
                styles.label,
                { color: isActive ? "#FFFFFF" : colors.textMuted },
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
    gap: 0,
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  segment: {
    flex: 1,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
});
