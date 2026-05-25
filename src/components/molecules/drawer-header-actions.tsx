import { useNavigation, useRouter } from "expo-router";
import { Bell, Menu } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

import { HeaderIconButton } from "@/components/atoms/header-icon-button";
import { LanguageDropdown } from "@/components/atoms/language-dropdown";
import { ThemeToggle } from "@/components/atoms/theme-toggle";

export function DrawerHeaderActions() {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LanguageDropdown />
      <ThemeToggle />
      <HeaderIconButton
        icon={Bell}
        label="Open messages"
        onPress={() => router.push("/messages")}
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
    gap: 10,
    paddingRight: 8,
  },
});
