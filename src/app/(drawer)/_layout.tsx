import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      initialRouteName="(tabs)"
      screenOptions={{
        headerShown: true,
        drawerType: "front",
        drawerPosition: "left",
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "TeleProperty",
          drawerLabel: "Home",
        }}
      />
      <Drawer.Screen
        name="saved"
        options={{
          title: "Saved",
          drawerLabel: "Saved",
        }}
      />
      <Drawer.Screen
        name="messages"
        options={{
          title: "Messages",
          drawerLabel: "Messages",
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: "Settings",
          drawerLabel: "Settings",
        }}
      />
    </Drawer>
  );
}
