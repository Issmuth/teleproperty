import { useAppTheme } from "@/theme/app-theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type DrawerRoute = {
  key: string;
  name: string;
};

type DrawerState = {
  index: number;
  routes: DrawerRoute[];
};

type DescriptorOptions = {
  drawerLabel?: string | React.ReactNode;
  title?: string | React.ReactNode;
};

type DrawerDescriptor = unknown;

type DrawerContentProps = {
  navigation: { navigate: (name: string) => void };
  state: DrawerState;
  descriptors: Record<string, unknown>;
};

export default function DrawerContent(props: DrawerContentProps) {
  const { navigation, state } = props;
  const { colors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.drawerBackground }]}
    >
      {state.routes.map((route: DrawerRoute, idx: number) => {
        const focused = state.index === idx;
        let label = route.name;

        const desc = props.descriptors[route.key];
        if (desc && typeof desc === "object" && "options" in desc) {
          const options = (desc as { options?: Record<string, unknown> })
            .options;
          if (options) {
            const dl = options.drawerLabel;
            const ti = options.title;
            if (typeof dl === "string") label = dl;
            else if (typeof ti === "string") label = ti;
          }
        }

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={({ pressed }) => [
              styles.item,
              {
                backgroundColor: focused
                  ? colors.activeSurface
                  : pressed
                    ? colors.surfaceMuted
                    : "transparent",
              },
            ]}
          >
            <View
              style={[
                styles.accent,
                {
                  backgroundColor: focused
                    ? colors.activeBorder
                    : "transparent",
                },
              ]}
            />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.label,
                { color: focused ? colors.activeText : colors.iconMuted },
              ]}
            >
              {String(label)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    borderRadius: 8,
    overflow: "hidden",
  },
  accent: {
    width: 4,
    height: 28,
    borderRadius: 4,
    marginRight: 12,
  },
  label: {
    fontSize: 16,
  },
});
