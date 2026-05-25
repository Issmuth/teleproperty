import { Image } from "expo-image";
import { Heart } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type HomePropertyCardProps = {
  image: string;
  title: string;
  location: string;
  price: string;
};

export function HomePropertyCard({
  image,
  title,
  location,
  price,
}: HomePropertyCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      style={[
        styles.card,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit="cover"
        />
        <View style={[styles.heartButton, { backgroundColor: colors.surface }]}>
          <Heart
            size={14}
            color={colors.activeText}
            fill={colors.surface}
            strokeWidth={2.1}
          />
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.location, { color: colors.textMuted }]}>
          {location}
        </Text>
        <Text style={[styles.price, { color: colors.activeText }]}>
          {price}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    borderRadius: 22,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrap: {
    height: 156,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "rgba(0,0,0,0.18)",
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 3,
  },
  body: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "800",
  },
  location: {
    fontSize: 12,
    fontWeight: "500",
  },
  price: {
    fontSize: 13,
    fontWeight: "800",
    marginTop: 4,
  },
});
