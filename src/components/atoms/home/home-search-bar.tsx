import { Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { ActionButton } from "@/components/atoms/action-button";
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
        <SlidersHorizontal
          size={18}
          color={colors.textMuted}
          strokeWidth={2.2}
        />
      </Pressable>

      <ActionButton
        label={actionLabel}
        icon={Search}
        backgroundColor={colors.activeText}
      />
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
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 4,
    elevation: 4,
    marginHorizontal: 16,
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
});
