import { type LucideIcon, ChevronRight } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type AuthOptionCardProps = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accentColor: string;
  tintColor: string;
  onPress: () => void;
  active?: boolean;
};

export function AuthOptionCard({
  title,
  subtitle,
  icon: Icon,
  accentColor,
  tintColor,
  onPress,
  active = false,
}: AuthOptionCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: active ? tintColor : colors.surface,
          borderColor: active ? tintColor : colors.border,
          shadowColor: colors.shadow,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.iconWrap, { backgroundColor: accentColor }]}>
        <Icon size={19} color={tintColor} strokeWidth={2.2} />
      </View>
      <View style={styles.copy}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          {subtitle}
        </Text>
      </View>
      <ChevronRight size={18} color={active ? tintColor : colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 84,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 18,
    elevation: 1,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "600",
  },
});
