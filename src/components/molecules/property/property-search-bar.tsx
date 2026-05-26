import { useAppTheme } from "@/theme/app-theme";
import { Search, SlidersHorizontal } from "lucide-react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type PropertySearchBarProps = {
  placeholder: string;
};

export function PropertySearchBar({ placeholder }: PropertySearchBarProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputWrap,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
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
        style={[
          styles.filterButton,
          { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        ]}
      >
        <SlidersHorizontal
          size={18}
          color={colors.textMuted}
          strokeWidth={2.2}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  inputWrap: {
    flex: 1,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    paddingVertical: 0,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
