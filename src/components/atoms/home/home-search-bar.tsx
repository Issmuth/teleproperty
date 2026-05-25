import { Filter, Search } from "lucide-react-native";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type HomeSearchBarProps = {
  placeholder: string;
  actionLabel: string;
};

export function HomeSearchBar({
  placeholder,
  actionLabel,
}: HomeSearchBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View
        style={[
          styles.inputWrap,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Search size={18} color={colors.textMuted} strokeWidth={2.1} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.text }]}
        />
      </View>

      <Pressable
        style={[styles.filterButton, { backgroundColor: colors.surfaceMuted }]}
      >
        <Filter size={18} color={colors.textMuted} strokeWidth={2.2} />
      </Pressable>

      <Pressable
        style={[styles.actionButton, { backgroundColor: colors.activeText }]}
      >
        <Search size={16} color="#FFFFFF" strokeWidth={2.2} />
        <Text style={styles.actionLabel}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 22,
    padding: 10,
    shadowColor: "rgba(0, 0, 0, 0.12)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 8,
  },
  inputWrap: {
    flex: 1,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
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
    color: "#FFFFFF",
  },
});
