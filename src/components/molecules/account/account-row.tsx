import { useAppTheme } from "@/theme/app-theme";
import { ChevronRight } from "lucide-react-native";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function AccountRow({
  title,
  subtitle,
  icon,
  accentColor = "#E2E8F0",
  onPress,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  accentColor?: string;
  onPress?: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.surfaceMuted }]}
    >
      <View style={[styles.leftIcon, { backgroundColor: accentColor }]}>
        {icon}
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.chev}>
        <ChevronRight color={colors.iconMuted} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 10,
  },
  leftIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontWeight: "800",
  },
  subtitle: {
    color: "#94A3B8",
    marginTop: 4,
    fontSize: 13,
  },
  chev: {},
});
