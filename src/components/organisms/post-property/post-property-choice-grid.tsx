import { useAppTheme } from "@/theme/app-theme";
import { type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type PostPropertyChoiceOption = {
  key: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon;
};

type PostPropertyChoiceGridProps = {
  options: PostPropertyChoiceOption[];
  selectedKey: string;
  onSelect: (key: string) => void;
  twoColumn?: boolean;
};

export function PostPropertyChoiceGrid({
  options,
  selectedKey,
  onSelect,
  twoColumn = false,
}: PostPropertyChoiceGridProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.grid, twoColumn && styles.twoColumnGrid]}>
      {options.map((option) => {
        const selected = option.key === selectedKey;
        const Icon = option.icon;

        return (
          <Pressable
            key={option.key}
            onPress={() => onSelect(option.key)}
            style={[
              styles.card,
              twoColumn && styles.cardTwoColumn,
              {
                backgroundColor: selected ? colors.activeText : colors.surface,
                borderColor: selected ? colors.activeText : colors.border,
              },
            ]}
          >
            <View style={styles.cardTopRow}>
              <View
                style={[
                  styles.iconWrap,
                  {
                    backgroundColor: selected
                      ? "rgba(255,255,255,0.18)"
                      : colors.surfaceMuted,
                  },
                ]}
              >
                <Icon
                  size={18}
                  color={selected ? "#FFFFFF" : colors.textMuted}
                  strokeWidth={2.1}
                />
              </View>

              {selected ? (
                <View style={styles.checkPill}>
                  <Text style={styles.checkPillText}>Selected</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.copyBlock}>
              <Text
                style={[
                  styles.label,
                  { color: selected ? "#FFFFFF" : colors.text },
                ]}
              >
                {option.label}
              </Text>
              {option.subtitle ? (
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: selected
                        ? "rgba(255,255,255,0.9)"
                        : colors.textMuted,
                    },
                  ]}
                >
                  {option.subtitle}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 12,
    justifyContent: "space-between",
  },
  twoColumnGrid: {
    rowGap: 12,
  },
  card: {
    width: "100%",
    minHeight: 102,
    borderWidth: 1,
    borderRadius: 18,
    padding: 12,
    gap: 10,
    justifyContent: "space-between",
  },
  cardTwoColumn: {
    width: "48.5%",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 10,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  checkPill: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  checkPillText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },
  copyBlock: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
});
