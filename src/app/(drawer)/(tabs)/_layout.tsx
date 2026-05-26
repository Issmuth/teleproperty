import { Tabs } from "expo-router";
import {
    Building2,
    CreditCard,
    House,
    User,
    Wrench,
} from "lucide-react-native";
import { Pressable, StyleSheet, type PressableProps } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type TabButtonProps = {
  children?: React.ReactNode;
  accessibilityState?: { selected?: boolean };
} & PressableProps;

function TabBarButton({
  children,
  onPress,
  accessibilityState,
  style,
  ...rest
}: TabButtonProps) {
  const { colors } = useAppTheme();
  const selected = Boolean(accessibilityState?.selected);

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: selected ? -2 : 0 }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 16, stiffness: 220, mass: 0.45 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 16, stiffness: 220, mass: 0.45 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
      style={[
        styles.tabButton,
        animatedStyle,
        style,
        selected && [
          styles.tabButtonActive,
          {
            backgroundColor: colors.activeSurface,
            borderColor: colors.activeBorder,
          },
        ],
      ]}
    >
      {children}
    </AnimatedPressable>
  );
}

export default function TabsLayout() {
  const { t } = useI18n();
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.activeText,
        tabBarInactiveTintColor: colors.iconMuted,
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarIconStyle: styles.icon,
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
            <House color={color} size={18} strokeWidth={2.1} />
          ),
        }}
      />
      <Tabs.Screen
        name="property"
        options={{
          title: t("nav.property"),
          tabBarIcon: ({ color }) => (
            <Building2 color={color} size={18} strokeWidth={2.1} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          title: t("nav.services"),
          tabBarIcon: ({ color }) => (
            <Wrench color={color} size={18} strokeWidth={2.1} />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: t("nav.payments"),
          tabBarIcon: ({ color }) => (
            <CreditCard color={color} size={18} strokeWidth={2.1} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("nav.account"),
          tabBarIcon: ({ color }) => (
            <User color={color} size={18} strokeWidth={2.1} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    bottom: 10,
    marginHorizontal: 10,
    height: 66,
    borderRadius: 20,
    borderTopWidth: 0,
    borderWidth: 1,
    elevation: 8,
    shadowColor: "rgba(15, 23, 42, 0.12)",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 2,
    zIndex: 100,
  },
  item: {
    paddingHorizontal: 0,
  },
  icon: {
    marginTop: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
  },
  tabButtonActive: {
    shadowColor: "rgba(15, 23, 42, 0.12)",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
});
