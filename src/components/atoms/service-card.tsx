import { useAppTheme } from "@/theme/app-theme";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ServiceCardProps = {
  title: string;
  image?: string;
  onPress?: () => void;
};

export function ServiceCard({ title, image, onPress }: ServiceCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.mediaWrap}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View
            style={[
              styles.placeholder,
              { backgroundColor: colors.surfaceMuted },
            ]}
          />
        )}
      </View>

      <View style={styles.body}>
        <Text numberOfLines={2} style={[styles.title, { color: colors.text }]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
    margin: 8,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 14,
    elevation: 3,
  },
  pressed: {
    opacity: 0.95,
  },
  mediaWrap: {
    width: "100%",
    aspectRatio: 16 / 11,
    backgroundColor: "#eee",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholder: {
    flex: 1,
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "800",
  },
});
