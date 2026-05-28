import { type LucideIcon } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type AuthRoleCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  selected?: boolean;
  onPress: () => void;
};

export function AuthRoleCard({
  title,
  subtitle,
  icon: Icon,
  selected = false,
  onPress,
}: AuthRoleCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected ? colors.activeSurface : colors.surface,
          borderColor: selected ? colors.activeText : colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.iconWrap,
          {
            backgroundColor: selected ? colors.surface : colors.surfaceMuted,
          },
        ]}
      >
        <Icon
          size={18}
          color={selected ? colors.activeText : colors.textMuted}
          strokeWidth={2.1}
        />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 98,
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  pressed: {
    opacity: 0.92,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    gap: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "600",
    lineHeight: 15,
  },
});
