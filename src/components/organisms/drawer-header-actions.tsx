import { useNavigation, useRouter } from "expo-router";
import { Bell, Menu } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { HeaderIconButton } from "@/components/atoms/header-icon-button";
import { ThemeToggle } from "@/components/atoms/theme-toggle";
import { LanguageDropdown } from "@/components/molecules/language-dropdown";

export function DrawerHeaderActions() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LanguageDropdown />
      <ThemeToggle />
      <HeaderIconButton
        icon={Bell}
        label="Open Notifications"
        onPress={() => router.push("/notifications")}
      />
      <HeaderIconButton
        icon={Menu}
        label="Open drawer"
        onPress={() => navigation.dispatch({ type: "TOGGLE_DRAWER" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingRight: 8,
  },
});
