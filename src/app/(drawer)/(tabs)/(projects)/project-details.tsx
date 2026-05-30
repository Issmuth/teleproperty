import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    BadgeCheck,
    Building2,
    CalendarDays,
    ChevronLeft,
    CircleCheckBig,
    Heart,
    MapPin,
    MessageCircle,
    Phone,
    ShieldCheck,
    Star,
} from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/theme/app-theme";

type ProjectDetailsModel = {
  title: string;
  developer: string;
  location: string;
  price: string;
  image: string;
  units: string;
  completion: string;
  status: string;
  about: string;
  rating: string;
  reviews: string;
  chips: string[];
  amenities: string[];
};

const defaultProject: ProjectDetailsModel = {
  title: "Sunrise Residences",
  developer: "Sunshine Developers PLC",
  location: "Bole, Addis Ababa",
  price: "From ETB 2,800,000",
  image:
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
  units: "48 Units",
  completion: "Dec 2026",
  status: "Off-plan",
  about:
    "Luxury residential complex with premium finishes and modern amenities in the heart of Bole.",
  rating: "4.8",
  reviews: "24",
  chips: ["1BR", "2BR", "3BR", "Penthouse"],
  amenities: ["Pool", "Gym", "Security", "Parking", "Garden"],
};

function readValue(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function buildProjectFromParams(
  params: Record<string, string | string[] | undefined>,
) {
  const title = readValue(params.title) ?? defaultProject.title;

  return {
    title,
    developer: readValue(params.developer) ?? defaultProject.developer,
    location: readValue(params.location) ?? defaultProject.location,
    price: readValue(params.price) ?? defaultProject.price,
    image: readValue(params.image) ?? defaultProject.image,
    units: defaultProject.units,
    completion: defaultProject.completion,
    status: defaultProject.status,
    about: defaultProject.about,
    rating: defaultProject.rating,
    reviews: defaultProject.reviews,
    chips: defaultProject.chips,
    amenities: defaultProject.amenities,
  } satisfies ProjectDetailsModel;
}

export default function ProjectDetailsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<Record<string, string | string[]>>();

  const project = useMemo(() => buildProjectFromParams(params), [params]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
        <View style={styles.heroWrap}>
          <Image
            source={{ uri: project.image }}
            style={styles.heroImage}
            contentFit="cover"
          />
          <View style={styles.heroOverlay} />

          <Pressable
            onPress={() => router.back()}
            style={[styles.heroIconButton, styles.heroLeftIcon]}
          >
            <ChevronLeft size={16} color="#FFFFFF" />
          </Pressable>
          <Pressable style={[styles.heroIconButton, styles.heroRightIcon]}>
            <Heart size={16} color="#FFFFFF" />
          </Pressable>

          <View style={styles.dotsRow}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleBlock}>
            <Text style={[styles.projectTitle, { color: colors.text }]}>
              {project.title}
            </Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#14B37B" />
              <Text style={[styles.locationText, { color: colors.textMuted }]}>
                {project.location}
              </Text>
            </View>
            <Text style={[styles.price, { color: colors.activeText }]}>
              {project.price}
            </Text>
            <Text style={[styles.subLabel, { color: colors.textMuted }]}>
              30% down · {project.status.toLowerCase()} plan
            </Text>
          </View>

          <View style={styles.statsRow}>
            <StatCard
              icon={<Building2 size={16} color="#14B37B" />}
              value={project.units}
              label="Units"
              colors={colors}
            />
            <StatCard
              icon={<CalendarDays size={16} color="#14B37B" />}
              value={project.completion}
              label="Completion"
              colors={colors}
            />
            <StatCard
              icon={<BadgeCheck size={16} color="#14B37B" />}
              value={project.status}
              label="Status"
              colors={colors}
            />
          </View>

          <SectionCard title="Unit Types" colors={colors}>
            <View style={styles.chipRow}>
              {project.chips.map((chip) => (
                <View
                  key={chip}
                  style={[
                    styles.chip,
                    { backgroundColor: colors.activeSurface },
                  ]}
                >
                  <Text style={[styles.chipText, { color: colors.activeText }]}>
                    {chip}
                  </Text>
                </View>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Amenities" colors={colors}>
            <View style={styles.amenityList}>
              {project.amenities.map((amenity) => (
                <View key={amenity} style={styles.amenityRow}>
                  <CircleCheckBig size={16} color="#14B37B" />
                  <Text style={[styles.amenityText, { color: colors.text }]}>
                    {amenity}
                  </Text>
                </View>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="About This Project" colors={colors}>
            <Text style={[styles.bodyText, { color: colors.textMuted }]}>
              {project.about}
            </Text>
          </SectionCard>

          <SectionCard colors={colors}>
            <View style={styles.developerCard}>
              <View
                style={[
                  styles.developerAvatar,
                  { backgroundColor: colors.activeText },
                ]}
              >
                <Text style={styles.developerAvatarText}>S</Text>
              </View>
              <View style={styles.developerCopy}>
                <Text style={[styles.developerName, { color: colors.text }]}>
                  {project.developer}
                </Text>
                <View style={styles.ratingRow}>
                  <View style={styles.starRow}>
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Star
                        key={index}
                        size={12}
                        color="#F59E0B"
                        fill="#F59E0B"
                      />
                    ))}
                  </View>
                  <Text
                    style={[styles.ratingText, { color: colors.textMuted }]}
                  >
                    {" "}
                    {project.rating} ({project.reviews})
                  </Text>
                </View>
              </View>
              <ShieldCheck size={18} color="#14B37B" />
            </View>
          </SectionCard>

          <View style={styles.actionsRow}>
            <Pressable
              style={[
                styles.callButton,
                { backgroundColor: colors.activeText },
              ]}
            >
              <Phone size={16} color="#FFFFFF" />
              <Text style={styles.callLabel}>Call</Text>
            </Pressable>
            <Pressable
              style={[
                styles.whatsAppButton,
                {
                  backgroundColor: colors.activeSurface,
                  borderColor: colors.activeText,
                },
              ]}
            >
              <MessageCircle size={16} color="#14B37B" />
              <Text
                style={[styles.whatsAppLabel, { color: colors.activeText }]}
              >
                WhatsApp
              </Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              styles.advisorButton,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.advisorLabel, { color: colors.text }]}>
              📋 Request Advisor
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function SectionCard({
  title,
  children,
  colors,
}: {
  title?: string;
  children: React.ReactNode;
  colors: ReturnType<typeof useAppTheme>["colors"];
}) {
  return (
    <View
      style={[
        styles.sectionCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      {title ? (
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
  colors,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  colors: ReturnType<typeof useAppTheme>["colors"];
}) {
  return (
    <View
      style={[
        styles.statCard,
        { backgroundColor: colors.activeSurface, borderColor: colors.border },
      ]}
    >
      {icon}
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textMuted }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "900",
  },
  topSpacer: {
    flex: 1,
  },
  heroWrap: {
    height: 260,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.12)",
  },
  heroIconButton: {
    position: "absolute",
    top: 12,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(51,65,85,0.72)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  heroLeftIcon: {
    left: 12,
  },
  heroRightIcon: {
    right: 12,
  },
  dotsRow: {
    position: "absolute",
    bottom: 14,
    alignSelf: "center",
    flexDirection: "row",
    gap: 6,
    zIndex: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    width: 20,
    backgroundColor: "#FFFFFF",
  },
  content: {
    padding: 12,
    gap: 12,
  },
  titleBlock: {
    gap: 4,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    fontSize: 13,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "900",
    marginTop: 2,
  },
  subLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minHeight: 86,
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "900",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    minHeight: 28,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  chipText: {
    fontSize: 12,
    fontWeight: "900",
  },
  amenityList: {
    gap: 8,
  },
  amenityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amenityText: {
    fontSize: 13,
    fontWeight: "600",
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
  developerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  developerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  developerAvatarText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
  developerCopy: {
    flex: 1,
    gap: 3,
  },
  developerName: {
    fontSize: 14,
    fontWeight: "900",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  starRow: {
    flexDirection: "row",
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 10,
  },
  callButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  callLabel: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "900",
  },
  whatsAppButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 1,
  },
  whatsAppLabel: {
    fontSize: 13,
    fontWeight: "900",
  },
  advisorButton: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  advisorLabel: {
    fontSize: 13,
    fontWeight: "900",
  },
});
