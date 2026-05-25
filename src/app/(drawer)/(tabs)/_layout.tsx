import { Tabs, useTheme } from "expo-router";
import {
    Building2,
    CreditCard,
    House,
    User,
    Wrench,
} from "lucide-react-native";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelStyle: styles.label,
        tabBarStyle: [styles.tabBar, { backgroundColor: theme.colors.card }],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <House color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="property"
        options={{
          title: "Property",
          tabBarIcon: ({ color }) => (
            <Building2 color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: "Services",
          tabBarIcon: ({ color }) => (
            <Wrench color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color }) => (
            <CreditCard color={color} size={20} strokeWidth={2.25} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
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
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 12,
    height: 68,
    borderRadius: 22,
    borderTopWidth: 0,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    paddingBottom: 10,
    paddingTop: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
  },
});
