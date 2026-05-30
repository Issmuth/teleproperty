import { useAuthGate } from "@/auth/use-auth-gate";
import { type PropertyItem } from "@/data/property";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";
import { useRouter } from "expo-router";
import {
    BadgeCheck,
    Bath,
    Bed,
    Heart,
    Lock,
    MapPin,
    Square,
    Star,
} from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type PropertyCardProps = {
  property: PropertyItem;
};

export function PropertyCard({ property }: PropertyCardProps) {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const { requireAuth } = useAuthGate();

  const handlePress = () => {
    router.push({
      pathname: "/property-details",
      params: { id: property.id, source: "property" },
    });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: property.image }}
          style={styles.image}
          resizeMode="cover"
        />

        {/* Top left badges */}
        <View style={styles.topLeftBadges}>
          {property.featured && (
            <View style={[styles.badge, styles.featuredBadge]}>
              <Star size={12} color="white" fill="white" />
              <Text style={styles.badgeText}>
                {t("property.card.featured")}
              </Text>
            </View>
          )}
          {property.forSale && (
            <View style={[styles.badge, styles.forSaleBadge]}>
              <Text style={styles.badgeText}>{t("property.card.forSale")}</Text>
            </View>
          )}
          {property.verified && (
            <View style={[styles.badge, styles.verifiedBadge]}>
              <BadgeCheck size={14} color={palette.brand.primary} />
              <Text
                style={[
                  styles.badgeText,
                  { color: palette.brand.primaryStrong },
                ]}
              >
                {t("property.card.verified")}
              </Text>
            </View>
          )}
        </View>

        {/* Top right icon */}
        <Pressable
          style={styles.favoriteButton}
          onPress={() =>
            requireAuth(() => router.push("/saved" as never), {
              intent: "save-property",
              redirectTo: `/property-details?id=${property.id}&source=property`,
            })
          }
        >
          <Heart size={16} color={colors.textMuted} />
        </Pressable>

        {/* Bottom right price */}
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}>{property.price}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {property.title}
        </Text>

        <View style={styles.locationRow}>
          <MapPin size={14} color={palette.brand.accent} />
          <Text
            style={[styles.locationText, { color: colors.textMuted }]}
            numberOfLines={1}
          >
            {property.location}
          </Text>
          <View
            style={[styles.ageBadge, { backgroundColor: colors.surfaceMuted }]}
          >
            <Text style={[styles.ageText, { color: colors.textMuted }]}>
              {property.age}
            </Text>
          </View>
        </View>

        <View style={styles.specsRow}>
          <View style={styles.specItem}>
            <Bed size={16} color={colors.textMuted} />
            <Text style={[styles.specText, { color: colors.textMuted }]}>
              {t("property.card.beds", { count: property.beds })}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Bath size={16} color={colors.textMuted} />
            <Text style={[styles.specText, { color: colors.textMuted }]}>
              {t("property.card.baths", { count: property.baths })}
            </Text>
          </View>
          <View style={styles.specItem}>
            <Square size={16} color={colors.textMuted} />
            <Text style={[styles.specText, { color: colors.textMuted }]}>
              {t("property.card.area", { area: property.area })}
            </Text>
          </View>
        </View>

        <Pressable
          style={[styles.contactButton, { backgroundColor: colors.activeText }]}
        >
          <Lock size={16} color="white" />
          <Text style={styles.contactButtonText}>
            {t("property.card.subscribeToViewBroker")}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  imageContainer: {
    height: 180,
    width: "100%",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  topLeftBadges: {
    position: "absolute",
    top: 12,
    left: 12,
    flexDirection: "row",
    gap: 6,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  featuredBadge: {
    backgroundColor: "#FBA100",
  },
  forSaleBadge: {
    backgroundColor: "#10B981",
  },
  verifiedBadge: {
    backgroundColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  priceContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: "white",
    fontSize: 14,
    fontWeight: "800",
  },
  content: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "500",
    flexShrink: 1,
  },
  ageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginLeft: "auto",
  },
  ageText: {
    fontSize: 11,
    fontWeight: "600",
  },
  specsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  specItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  specText: {
    fontSize: 13,
    fontWeight: "600",
  },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    marginTop: 4,
  },
  contactButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
});
