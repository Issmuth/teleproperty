import { Drawer } from "expo-router/drawer";

import { AppLogo } from "@/components/atoms/app-logo";
import { DrawerHeaderActions } from "@/components/molecules/drawer-header-actions";
import { useI18n } from "@/i18n";

export default function DrawerLayout() {
  const { t } = useI18n();

  return (
    <Drawer
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerPosition: "right",
        headerTitle: () => null,
        headerLeft: () => <AppLogo />,
        headerRight: () => <DrawerHeaderActions />,
        headerStyle: {
          backgroundColor: "#FFFFFF",
          shadowOpacity: 0,
          elevation: 0,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: t("common.appName"),
          drawerLabel: t("nav.home"),
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: t("nav.saved"),
          drawerLabel: t("nav.saved"),
        }}
      />
      <Drawer.Screen
        name="messages"
        options={{
          title: t("nav.messages"),
          drawerLabel: t("nav.messages"),
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: t("nav.settings"),
          drawerLabel: t("nav.settings"),
        }}
      />
    </Drawer>
  );
}
