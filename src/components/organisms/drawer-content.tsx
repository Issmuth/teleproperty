import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { ChevronRight } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type DrawerContentProps = {
  navigation: {
    navigate: (name: string, params?: Record<string, unknown>) => void;
    closeDrawer: () => void;
  };
};

type MenuItem = {
  labelKey: string;
  onPress: () => void;
};

export default function DrawerContent({ navigation }: DrawerContentProps) {
  const { colors } = useAppTheme();
  const { t } = useI18n();

  const close = () => navigation.closeDrawer();

  const nav = (screen: string, params?: Record<string, unknown>) => {
    close();
    navigation.navigate(screen, params);
  };

  const menuItems: MenuItem[] = [
    { labelKey: t("nav.home"), onPress: () => nav("(tabs)") },
    {
      labelKey: t("drawer.searchProperty"),
      onPress: () => nav("(tabs)", { screen: "(property)" }),
    },
    {
      labelKey: t("drawer.postProperty"),
      onPress: () =>
        nav("(tabs)", { screen: "(property)", params: { screen: "post-property" } }),
    },
    {
      labelKey: t("drawer.newProjects"),
      onPress: () => nav("(tabs)", { screen: "(projects)" }),
    },
    {
      labelKey: t("drawer.developersHub"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "developer-hub" } }),
    },
    {
      labelKey: t("drawer.verifiedBrokers"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "broker-hub" } }),
    },
    {
      labelKey: t("drawer.subscriptionPlans"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "subscriptions" } }),
    },
    {
      labelKey: t("drawer.mySubscription"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "subscriptions" } }),
    },
    {
      labelKey: t("drawer.myPayments"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "payment-history" } }),
    },
    {
      labelKey: t("nav.settings"),
      onPress: () =>
        nav("(tabs)", { screen: "(account)", params: { screen: "privacy-security" } }),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.drawerBackground }]}>
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("drawer.menuTitle")}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={item.onPress}
            style={({ pressed }) => [
              styles.item,
              { backgroundColor: pressed ? colors.surfaceMuted : "transparent" },
            ]}
          >
            <Text style={[styles.label, { color: colors.text }]}>
              {item.labelKey}
            </Text>
            <ChevronRight size={16} color={colors.iconMuted} strokeWidth={2} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 52,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  list: {
    paddingVertical: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 15,
  },
});
