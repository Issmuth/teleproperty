import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Bath,
  Bed,
  Camera,
  ChevronLeft,
  Heart,
  Lock,
  MapPin,
  MessageCircleMore,
  Share2,
  Square,
  Star,
  Upload
} from "lucide-react-native";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { SubscriptionSheet } from "@/components/organisms/subscription-sheet";
import { sampleProperties } from "@/data/property";
import { usePropertySaved } from "@/hooks/use-saved-properties";
import { useSubscriptionSheet } from "@/hooks/use-subscription-sheet";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { shortenPriceLabel } from "@/utils/number-format";

type PropertyDetailModel = {
  title: string;
  location: string;
  price: string;
  image: string;
  gallery: string[];
  description: string;
  beds: number;
  baths: number;
  area: number;
  agentName: string;
  agentLabel: string;
  rating: string;
  reviewsCount: string;
};

const detailById: Record<string, PropertyDetailModel> = {
  "1": {
    title: "5BR Executive Villa – Bole",
    location: "Bole, Addis Ababa",
    price: "ETB 9,500,000",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "This premium property is located in one of Addis Ababa's most sought-after neighborhoods. Featuring modern architecture, quality finishes, and excellent access to transport, schools, and amenities. The property is fully verified and ready for immediate viewing.",
    beds: 5,
    baths: 4,
    area: 420,
    agentName: "Samuel Tadesse",
    agentLabel: "Verified Agent · Addis Ababa",
    rating: "4.9",
    reviewsCount: "42 reviews",
  },
  "2": {
    title: "Modern 3BR Apartment – Kazanchis",
    location: "Kazanchis, Addis Ababa",
    price: "ETB 4,200,000",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560185008-b033106af3d0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "A bright and efficient apartment with a smart layout, good natural light, and a convenient central location for everyday living.",
    beds: 3,
    baths: 2,
    area: 150,
    agentName: "Amina Yusuf",
    agentLabel: "Verified Agent · Addis Ababa",
    rating: "4.8",
    reviewsCount: "28 reviews",
  },
  "featured-property-1": {
    title: "Modern family villa",
    location: "Megenagna, Addis Ababa",
    price: "ETB 8.4M",
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "A spacious villa with premium finishes and a calm neighborhood feel, designed for family living and long-term comfort.",
    beds: 4,
    baths: 3,
    area: 260,
    agentName: "Daniel Bekele",
    agentLabel: "Premium Agent · Addis Ababa",
    rating: "4.9",
    reviewsCount: "36 reviews",
  },
  "featured-property-2": {
    title: "Garden apartment",
    location: "CMC, Addis Ababa",
    price: "ETB 4.1M",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560185008-b033106af3d0?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "A clean and modern apartment with a usable private outdoor edge and strong access to nearby shops and transport.",
    beds: 3,
    baths: 2,
    area: 180,
    agentName: "Marta Solomon",
    agentLabel: "Verified Agent · Addis Ababa",
    rating: "4.7",
    reviewsCount: "21 reviews",
  },
  "featured-property-3": {
    title: "Penthouse suite",
    location: "22, Addis Ababa",
    price: "ETB 12.5M",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    ],
    description:
      "An elevated penthouse with city views, generous proportions, and premium finishes suited for executive living.",
    beds: 4,
    baths: 4,
    area: 310,
    agentName: "Selam Getachew",
    agentLabel: "Premium Agent · Addis Ababa",
    rating: "5.0",
    reviewsCount: "19 reviews",
  },
};

const fallbackDetail: PropertyDetailModel = {
  title: "Property Details",
  location: "Addis Ababa, Ethiopia",
  price: "ETB 0",
  image:
    "https://images.unsplash.com/photo-1600607687644-c7f34d46d3d7?auto=format&fit=crop&w=1400&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1600607687644-c7f34d46d3d7?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  ],
  description:
    "This premium property is located in one of Addis Ababa's most sought-after neighborhoods. Featuring modern architecture, quality finishes, and excellent access to transport, schools, and amenities.",
  beds: 5,
  baths: 4,
  area: 420,
  agentName: "Samuel Tadesse",
  agentLabel: "Verified Agent · Addis Ababa",
  rating: "4.9",
  reviewsCount: "42 reviews",
};

function findDetail(id?: string) {
  if (!id) {
    return fallbackDetail;
  }

  if (id in detailById) {
    return detailById[id];
  }

  const fromPropertyList = sampleProperties.find((item) => item.id === id);
  if (fromPropertyList) {
    return {
      title: fromPropertyList.title,
      location: fromPropertyList.location,
      price: fromPropertyList.price,
      image: fromPropertyList.image,
      gallery: [
        fromPropertyList.image,
        fromPropertyList.image,
        fromPropertyList.image,
        fromPropertyList.image,
      ],
      description:
        "This premium property is located in one of Addis Ababa's most sought-after neighborhoods. Featuring modern architecture, quality finishes, and excellent access to transport, schools, and amenities. The property is fully verified and ready for immediate viewing.",
      beds: fromPropertyList.beds,
      baths: fromPropertyList.baths,
      area: fromPropertyList.area,
      agentName: "Samuel Tadesse",
      agentLabel: "Verified Agent · Addis Ababa",
      rating: "4.9",
      reviewsCount: "42 reviews",
    };
  }

  return fallbackDetail;
}

export default function PropertyDetails() {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const { id, source } = useLocalSearchParams<{
    id?: string;
    source?: string;
  }>();

  const detail = useMemo(() => findDetail(id), [id]);
  const formattedPrice = useMemo(
    () => shortenPriceLabel(detail.price),
    [detail.price],
  );

  const { isSaved, toggleSaved } = usePropertySaved(id || "");
  const { visible, openSheet, closeSheet } = useSubscriptionSheet();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleToggleSave = async () => {
    try {
      await toggleSaved({
        id: id || "",
        title: detail.title,
        location: detail.location,
        price: detail.price,
        image: detail.image,
      });
    } catch (error) {
      console.error("Failed to toggle save:", error);
    }
  };

  const handleBackPress = () => {
    if (source === "home") {
      router.replace("/");
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/property");
  };

  const handleSubmitReview = () => {
    if (reviewText.trim() && reviewRating > 0) {
      // TODO: Submit review to backend
      console.log("Review submitted:", { rating: reviewRating, text: reviewText });
      setReviewText("");
      setReviewRating(0);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: detail.gallery[selectedImageIndex] }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroTopBar}>
            <Pressable
              onPress={handleBackPress}
              style={[
                styles.heroIconButton,
                { backgroundColor: "rgba(0,0,0,0.5)" },
              ]}
            >
              <ChevronLeft size={22} color="#fff" strokeWidth={2.5} />
            </Pressable>

            <View style={styles.heroActions}>
              <Pressable
                style={[
                  styles.heroIconButton,
                  { backgroundColor: "rgba(0,0,0,0.5)" },
                ]}
              >
                <Share2 size={18} color="#fff" strokeWidth={2.5} />
              </Pressable>
              <Pressable
                style={[
                  styles.heroIconButton,
                  { backgroundColor: "rgba(0,0,0,0.5)" },
                ]}
                onPress={handleToggleSave}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Heart
                  size={18}
                  color={isSaved ? "#EF4444" : "#fff"}
                  fill={isSaved ? "#EF4444" : "transparent"}
                  strokeWidth={2.5}
                />
              </Pressable>
            </View>
          </View>

          {/* Image counter badge */}
          <View style={styles.imageCounter}>
            <Camera size={14} color="#fff" />
            <Text style={styles.imageCounterText}>
              {selectedImageIndex + 1} / {detail.gallery.length}
            </Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.thumbnailScroll}
          contentContainerStyle={styles.thumbnailRow}
        >
          {detail.gallery.map((image, index) => (
            <Pressable
              key={`${image}-${index}`}
              onPress={() => setSelectedImageIndex(index)}
            >
              <View
                style={[
                  styles.thumbnail,
                  index === selectedImageIndex && {
                    borderColor: colors.activeText,
                    borderWidth: 2,
                  },
                ]}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.thumbnailImage}
                  contentFit="cover"
                />
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <Text style={[styles.propertyTitle, { color: colors.text }]}>
              {detail.title}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#0F9D58" />
              <Text style={[styles.locationText, { color: colors.textMuted }]}>
                {detail.location}
              </Text>
            </View>
          </View>
          <Text style={[styles.price, { color: colors.activeText }]}>
            {formattedPrice}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            label={`${detail.beds}`}
            sublabel={t("property.details.bedrooms")}
            colors={colors}
            icon="bed"
          />
          <StatCard
            label={`${detail.baths}`}
            sublabel={t("property.details.bathrooms")}
            colors={colors}
            icon="bath"
          />
          <StatCard
            label={`${detail.area} m²`}
            sublabel={t("property.details.area")}
            colors={colors}
            icon="square"
          />
        </View>

        <SectionCard
          title={t("property.details.aboutProperty")}
          colors={colors}
        >
          <Text style={[styles.bodyText, { color: colors.textMuted }]}>
            {detail.description}
          </Text>
        </SectionCard>

        <SectionCard title={t("property.details.agent")} colors={colors}>
          <Pressable 
            style={styles.agentRow}
            onPress={() => router.push({
              pathname: "/agent-profile",
              params: { id: "agent-1" }
            })}
          >
            <View
              style={[
                styles.agentAvatar,
                { backgroundColor: colors.activeText },
              ]}
            >
              <Text style={styles.agentAvatarText}>AG</Text>
            </View>
            <View style={styles.agentCopy}>
              <Text style={[styles.agentName, { color: colors.text }]}>
                {detail.agentName}
              </Text>
              <Text style={[styles.agentLabel, { color: colors.textMuted }]}>
                {detail.agentLabel}
              </Text>
              <View style={styles.ratingRow}>
                <View style={styles.starsRow}>
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={12} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </View>
                <Text style={[styles.reviewsText, { color: colors.textMuted }]}>
                  ({detail.reviewsCount})
                </Text>
              </View>
            </View>
          </Pressable>
        </SectionCard>

        <SectionCard
          title={t("property.details.contactDetailsLocked")}
          colors={colors}
        >
          <View style={styles.lockBox}>
            <View
              style={[
                styles.lockCircle,
                { backgroundColor: colors.surfaceMuted },
              ]}
            >
              <Lock size={22} color={colors.textMuted} />
            </View>
            <Text style={[styles.lockTitle, { color: colors.text }]}>
              {t("property.details.contactDetailsLocked")}
            </Text>
            <Text style={[styles.lockBody, { color: colors.textMuted }]}>
              {t("property.details.lockedBody")}
            </Text>
            <Pressable
              style={[
                styles.unlockButton,
                { backgroundColor: colors.activeText },
              ]}
              onPress={openSheet}
            >
              <Text style={styles.unlockButtonText}>
                {t("property.details.subscribeToUnlock")}
              </Text>
            </Pressable>
          </View>
        </SectionCard>

        <SectionCard
          title={t("property.details.reviews")}
          colors={colors}
          headerAction={
            <View style={styles.ratingDisplay}>
              <Star size={16} color="#F59E0B" fill="#F59E0B" />
              <Text style={[styles.ratingText, { color: colors.text }]}>
                {detail.rating}
              </Text>
            </View>
          }
        >
          {/* Write Review Section */}
          <View style={[styles.writeReviewCard, { backgroundColor: colors.surfaceMuted, borderColor: colors.border }]}>
            <Text style={[styles.writeReviewTitle, { color: colors.text }]}>
              Write a Review
            </Text>
            
            {/* Star Rating */}
            <View style={styles.starRatingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => setReviewRating(star)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Star
                    size={28}
                    color="#F59E0B"
                    fill={star <= reviewRating ? "#F59E0B" : "transparent"}
                    strokeWidth={2}
                  />
                </Pressable>
              ))}
            </View>

            {/* Review Text Input */}
            <TextInput
              style={[
                styles.reviewInput,
                { 
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text,
                }
              ]}
              placeholder="Share your experience with this property..."
              placeholderTextColor={colors.textMuted}
              value={reviewText}
              onChangeText={setReviewText}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            {/* Photo Upload (Optional) */}
            <Pressable style={[styles.photoUploadBtn, { borderColor: colors.border }]}>
              <Upload size={16} color={colors.textMuted} />
              <Text style={[styles.photoUploadText, { color: colors.textMuted }]}>
                Add Photo (Optional)
              </Text>
            </Pressable>

            {/* Submit Button */}
            <Pressable
              style={[
                styles.submitReviewBtn,
                { backgroundColor: reviewText.trim() && reviewRating > 0 ? colors.activeText : colors.surfaceMuted },
              ]}
              onPress={handleSubmitReview}
              disabled={!reviewText.trim() || reviewRating === 0}
            >
              <MessageCircleMore size={16} color="#fff" />
              <Text style={styles.submitReviewText}>Submit Review</Text>
            </Pressable>
          </View>

          {/* No Reviews Yet */}
          <Text style={[styles.reviewIntro, { color: colors.textMuted }]}>
            {t("property.details.noReviewsYet")}
          </Text>
          <View
            style={[
              styles.emptyReviewCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <MessageCircleMore size={32} color={colors.textMuted} />
            <Text style={[styles.emptyReviewText, { color: colors.textMuted }]}>
              {t("property.details.noReviewsPrompt")}
            </Text>
          </View>
        </SectionCard>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <SubscriptionSheet visible={visible} onClose={closeSheet} />
    </View>
  );
}

function SectionCard({
  title,
  children,
  colors,
  headerAction,
}: {
  title: string;
  children: React.ReactNode;
  colors: ReturnType<typeof useAppTheme>["colors"];
  headerAction?: React.ReactNode;
}) {
  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </Text>
        {headerAction}
      </View>
      {children}
    </View>
  );
}

function StatCard({
  label,
  sublabel,
  colors,
  icon,
}: {
  label: string;
  sublabel: string;
  colors: ReturnType<typeof useAppTheme>["colors"];
  icon: "bed" | "bath" | "square";
}) {
  const iconColor = "#0F9D58";

  return (
    <View
      style={[
        styles.statCard,
        { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
      ]}
    >
      {icon === "bed" && <Bed size={16} color={iconColor} />}
      {icon === "bath" && <Bath size={16} color={iconColor} />}
      {icon === "square" && <Square size={16} color={iconColor} />}
      <Text style={[styles.statValue, { color: colors.text }]}>{label}</Text>
      <Text style={[styles.statLabel, { color: colors.textMuted }]}>
        {sublabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  heroWrap: {
    height: 360,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroTopBar: {
    position: "absolute",
    top: 14,
    left: 14,
    right: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  heroIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCounter: {
    position: "absolute",
    bottom: 14,
    right: 14,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  imageCounterText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  thumbnailScroll: {
    marginTop: 14,
  },
  thumbnailRow: {
    gap: 10,
    paddingHorizontal: 16,
  },
  thumbnail: {
    width: 74,
    height: 74,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "transparent",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  titleRow: {
    paddingHorizontal: 16,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  titleBlock: {
    flex: 1,
    gap: 6,
  },
  propertyTitle: {
    fontSize: 20,
    fontWeight: "900",
    lineHeight: 26,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "500",
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    borderWidth: 1,
    gap: 6,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  sectionCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    gap: 10,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 21,
  },
  agentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  agentAvatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  agentAvatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "900",
  },
  agentCopy: {
    flex: 1,
    gap: 3,
  },
  agentName: {
    fontSize: 15,
    fontWeight: "900",
  },
  agentLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 2,
  },
  starsRow: {
    flexDirection: "row",
    gap: 2,
  },
  reviewsText: {
    fontSize: 12,
    fontWeight: "600",
  },
  lockBox: {
    alignItems: "center",
    gap: 10,
    borderRadius: 18,
    borderWidth: 1,
    borderStyle: "dashed",
    paddingVertical: 24,
    paddingHorizontal: 18,
  },
  lockCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  lockTitle: {
    fontSize: 15,
    fontWeight: "900",
    textAlign: "center",
  },
  lockBody: {
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 20,
    textAlign: "center",
  },
  unlockButton: {
    marginTop: 6,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
  },
  unlockButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "900",
  },
  ratingDisplay: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "800",
  },
  writeReviewCard: {
    borderRadius: 16,
    padding: 16,
    gap: 14,
    borderWidth: 1,
  },
  writeReviewTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  starRatingRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  reviewInput: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    minHeight: 100,
    fontWeight: "500",
  },
  photoUploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 14,
  },
  photoUploadText: {
    fontSize: 13,
    fontWeight: "700",
  },
  submitReviewBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  submitReviewText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  reviewButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "800",
  },
  reviewIntro: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
  },
  emptyReviewCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
  },
  emptyReviewText: {
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
  bottomSpacer: {
    height: 24,
  },
});
