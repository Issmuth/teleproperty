import DrawerContent from "@/components/organisms/drawer-content";
import { Drawer } from "expo-router/drawer";

import { AppLogo } from "@/components/atoms/app-logo";
import { DrawerHeaderActions } from "@/components/organisms/drawer-header-actions";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function DrawerLayout() {
  const { t } = useI18n();
  const { colors } = useAppTheme();

  return (
    <Drawer
      initialRouteName="(tabs)"
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerPosition: "right",
        drawerStyle: {
          backgroundColor: colors.drawerBackground,
          width: 250,
          borderBottomLeftRadius: 0,
          borderTopLeftRadius: 0,
        },
        drawerActiveTintColor: colors.activeText,
        drawerInactiveTintColor: colors.iconMuted,
        drawerActiveBackgroundColor: colors.activeSurface,
        drawerContentStyle: {
          paddingVertical: 20,
        },
        headerTitle: () => null,
        headerLeft: () => <AppLogo />,
        headerRight: () => <DrawerHeaderActions />,
        headerStyle: {
          backgroundColor: colors.headerBackground,
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
    </Drawer>
  );
}
