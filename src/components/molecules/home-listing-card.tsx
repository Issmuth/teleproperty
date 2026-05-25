import { Image } from "expo-image";
import { MapPin, Star } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

type HomeListingCardProps = {
  image: string;
  badge: string;
  title: string;
  location: string;
  stats: string;
  rating: string;
  price: string;
  agency: string;
  accent: string;
};

export function HomeListingCard({
  image,
  badge,
  title,
  location,
  stats,
  rating,
  price,
  agency,
  accent,
}: HomeListingCardProps) {
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
        <View style={[styles.badge, { backgroundColor: colors.surface }]}>
          <Text style={[styles.badgeLabel, { color: colors.activeText }]}>
            {badge}
          </Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <View style={styles.locationRow}>
          <MapPin size={13} color={colors.textMuted} strokeWidth={2.1} />
          <Text style={[styles.location, { color: colors.textMuted }]}>
            {location}
          </Text>
        </View>

        <View style={styles.pillsRow}>
          <View style={[styles.pill, { backgroundColor: accent + "1A" }]}>
            <Text style={[styles.pillLabel, { color: accent }]}>{stats}</Text>
          </View>
          <View style={[styles.pill, { backgroundColor: colors.surfaceMuted }]}>
            <Star size={13} color={accent} fill={accent} strokeWidth={2} />
            <Text style={[styles.pillLabel, { color: accent }]}>{rating}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.activeText }]}>
            {price}
          </Text>
          <Text style={[styles.agency, { color: colors.textMuted }]}>
            {agency}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 286,
    borderRadius: 22,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageWrap: {
    height: 164,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  badge: {
    position: "absolute",
    top: 12,
    right: 12,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeLabel: {
    fontSize: 11,
    fontWeight: "800",
  },
  body: {
    padding: 14,
    gap: 10,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  location: {
    fontSize: 12,
    fontWeight: "500",
  },
  pillsRow: {
    flexDirection: "row",
    gap: 8,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    minWidth: 88,
  },
  pillLabel: {
    fontSize: 12,
    fontWeight: "800",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 13,
    fontWeight: "800",
  },
  agency: {
    fontSize: 12,
    fontWeight: "600",
  },
});
