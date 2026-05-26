import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Star } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ProviderCardProps = {
  title: string;
  image?: string;
  rating?: number;
  reviews?: number;
  discount?: string;
  badge?: string;
  verified?: boolean;
  onPress?: () => void;
};

export function ProviderCard({
  title,
  image,
  rating = 4.5,
  reviews = 120,
  discount,
  badge,
  verified,
  onPress,
}: ProviderCardProps) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.media}>
        {image ? (
          <Image
            source={{ uri: image }}
            style={styles.image}
            contentFit="cover"
          />
        ) : (
          <View
            style={[styles.image, { backgroundColor: colors.surfaceMuted }]}
          />
        )}

        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.28)"]}
          style={styles.imageOverlay}
        />

        {badge ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.row}>
          <View style={styles.ratingRow}>
            <Star size={12} color="#F5C000" />
            <Text style={[styles.ratingText, { color: colors.textMuted }]}>
              {rating.toFixed(1)}
            </Text>
            <Text style={[styles.reviewsText, { color: colors.textMuted }]}>
              ({reviews})
            </Text>
          </View>

          {verified ? (
            <Text style={[styles.verified, { color: colors.textMuted }]}>
              Verified
            </Text>
          ) : null}
        </View>

        <View style={styles.footerRow}>
          {discount ? (
            <View style={styles.discountRow}>
              <Text style={styles.discountText}>{discount}</Text>
            </View>
          ) : (
            <View />
          )}

          <Pressable
            style={[
              styles.bookButton,
              { backgroundColor: palette.brand.primary },
            ]}
          >
            <Text style={styles.bookLabel}>Book Now</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    overflow: "hidden",
    marginVertical: 8,
    width: "100%",
    borderWidth: 1,
    shadowColor: "rgba(0,0,0,0.06)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 4,
  },
  media: {
    height: 140,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 64,
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(155,92,246,0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    zIndex: 4,
  },
  badgeText: {
    color: "white",
    fontWeight: "800",
    fontSize: 12,
  },
  body: {
    padding: 12,
    gap: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ratingText: {
    marginLeft: 6,
    fontWeight: "700",
    fontSize: 12,
  },
  reviewsText: {
    marginLeft: 6,
    fontSize: 12,
  },
  discountRow: {
    backgroundColor: "#E6FFF0",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  discountText: {
    color: "#0B8F55",
    fontWeight: "800",
    fontSize: 12,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
  },
  bookButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookLabel: {
    color: "white",
    fontWeight: "800",
    fontSize: 12,
  },
  verified: {
    fontSize: 12,
    fontWeight: "700",
  },
});
