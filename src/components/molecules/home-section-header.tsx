import { ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type HomeSectionHeaderProps = {
  title: string;
  actionLabel: string;
  onPressAction?: () => void;
};

export function HomeSectionHeader({
  title,
  actionLabel,
  onPressAction,
}: HomeSectionHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Pressable onPress={onPressAction} style={styles.actionButton}>
        <Text style={[styles.action, { color: colors.activeText }]}>
          {actionLabel}
        </Text>
        <ChevronRight size={16} color={colors.activeText} strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  action: {
    fontSize: 13,
    fontWeight: "700",
  },
});
