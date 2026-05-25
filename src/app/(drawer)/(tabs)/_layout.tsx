import { Tabs } from "expo-router";
import {
    Building2,
    CreditCard,
    House,
    User,
    Wrench,
} from "lucide-react-native";
import { StyleSheet } from "react-native";

import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function TabsLayout() {
  const { t } = useI18n();
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.activeText,
        tabBarInactiveTintColor: colors.iconMuted,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabBar,
          {
            backgroundColor: colors.tabBarBackground,
            borderColor: colors.border,
          },
        ],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("nav.home"),
          tabBarIcon: ({ color }) => (
            <House color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="property"
        options={{
          title: t("nav.property"),
          tabBarIcon: ({ color }) => (
            <Building2 color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t("nav.services"),
          tabBarIcon: ({ color }) => (
            <Wrench color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: t("nav.payments"),
          tabBarIcon: ({ color }) => (
            <CreditCard color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("nav.account"),
          tabBarIcon: ({ color }) => (
            <User color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    left: 16,
    right: 16,
    bottom: 12,
    height: 68,
    borderRadius: 22,
    borderTopWidth: 0,
    borderWidth: 1,
    elevation: 12,
    shadowColor: "rgba(0, 0, 0, 0.18)",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
