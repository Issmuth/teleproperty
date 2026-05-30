import { useRouter } from "expo-router";
import { CircleCheckBig, MapPin, Sparkles } from "lucide-react-native";
import { useMemo, useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppSearchBar } from "@/components/molecules/app-search-bar";
import { PromoBanner } from "@/components/molecules/promo-banner";
import { SearchFiltersSheet } from "@/components/organisms/search-filters-sheet";
import { featuredProjects } from "@/data/home";
import { projectsSearchFiltersConfig } from "@/data/search-filters";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

type ProjectCardData = {
  id: string;
  badge: string;
  title: string;
  developer: string;
  price: string;
  location: string;
  image: string;
  featured?: boolean;
};

const projectCards: ProjectCardData[] = [
  {
    id: "sunrise-residences",
    badge: "Verified",
    title: "Sunrise Residences",
    developer: "Sunshine Developers PLC",
    price: "From ETB 2,800,000",
    location: "Bole, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "tech-park-addis",
    badge: "Verified",
    title: "Tech Park Addis",
    developer: "Modern Developments Ltd",
    price: "From ETB 3,400,000",
    location: "CMC, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    featured: true,
  },
  {
    id: "capital-towers",
    badge: "Verified",
    title: "Capital Towers",
    developer: "Capital Real Estate",
    price: "From ETB 4,200,000",
    location: "Kazanchis, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "lakeside-heights",
    badge: "Verified",
    title: "Lakeside Heights",
    developer: "Blue Horizon Homes",
    price: "From ETB 2,100,000",
    location: "Ayat, Addis Ababa",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
];

function ProjectCard({
  id,
  badge,
  title,
  developer,
  price,
  location,
  image,
  featured = false,
}: ProjectCardData) {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { t } = useI18n();

  const openDetails = () => {
    router.push({
      pathname: "/project-details" as never,
      params: {
        id,
        title,
        developer,
        price,
        location,
        image,
      },
    });
  };

  return (
    <Pressable
      onPress={openDetails}
      style={[
        styles.projectCard,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={styles.projectImageWrap}>
        <Image source={{ uri: image }} style={styles.projectImage} />
        <View style={styles.badgeRow}>
          <View style={[styles.badge, styles.verifiedBadge]}>
            <CircleCheckBig size={11} color="#0F9D58" />
            <Text style={styles.verifiedBadgeText}>{badge}</Text>
          </View>
          {featured ? (
            <View style={[styles.badge, styles.featuredBadge]}>
              <Sparkles size={11} color="#B45309" />
              <Text style={styles.featuredBadgeText}>
                {t("projects.featured")}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.projectBody}>
        <View style={styles.projectCopy}>
          <Text style={[styles.projectTitle, { color: colors.text }]}>
            {title}
          </Text>
          <Text style={[styles.projectDeveloper, { color: colors.textMuted }]}>
            {developer}
          </Text>
          <View style={styles.locationRow}>
            <MapPin size={12} color={colors.textMuted} />
            <Text style={[styles.locationText, { color: colors.textMuted }]}>
              {location}
            </Text>
          </View>
          <Text style={[styles.priceText, { color: colors.activeText }]}>
            {price}
          </Text>
        </View>

        <View
          style={[
            styles.detailsButton,
            { backgroundColor: colors.activeSurface },
          ]}
        >
          <Text style={[styles.detailsLabel, { color: colors.activeText }]}>
            {t("projects.viewDetails")}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

export default function ProjectsScreen() {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const localizedFeaturedProjects = useMemo(
    () =>
      featuredProjects.map((project) => ({
        ...project,
      })),
    [],
  );

  const localizedProjectCards = useMemo(() => projectCards, []);

  const visibleProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return localizedProjectCards;

    return localizedProjectCards.filter((project) =>
      [project.title, project.developer, project.location]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query, localizedProjectCards, t]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 110 },
        ]}
        stickyHeaderIndices={[1]}
      >
        <View style={styles.heroCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroKicker}>{t("projects.heroKicker")}</Text>
            <Text style={styles.heroHeadline}>{t("projects.heroTitle")}</Text>
            <Text style={styles.heroSubheadline}>
              {t("projects.heroSubtitle")}
            </Text>
            <Pressable style={styles.heroButton} onPress={() => router.back()}>
              <Text style={styles.heroButtonLabel}>
                {t("projects.heroButton")}
              </Text>
            </Pressable>
          </View>
          <Pressable style={styles.heroClose}>
            <Text style={styles.heroCloseLabel}>×</Text>
          </Pressable>
        </View>

        <View style={{ backgroundColor: colors.background }}>
          <AppSearchBar
            placeholder={t("projects.searchPlaceholder")}
            variant="elevated"
            onFilterPress={() => setFiltersVisible(true)}
            containerStyle={styles.searchBar}
            value={query}
            onChangeText={setQuery}
          />
        </View>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.activeText }]}>
              50+
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {t("projects.stats.projects")}
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.activeText }]}>
              30+
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {t("projects.stats.developers")}
            </Text>
          </View>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statValue, { color: colors.activeText }]}>
              1000+
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {t("projects.stats.units")}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("projects.featuredHeader")}
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredRow}
        >
          {featuredProjects.map((project) => (
            <View key={project.id} style={styles.featuredCardWrap}>
              <ProjectCard
                id={project.id}
                badge={project.badge ?? ""}
                title={project.title ?? ""}
                developer={project.agency ?? ""}
                price={project.price ?? ""}
                location={project.location ?? ""}
                image={project.image}
                featured
              />
            </View>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {`${t("projects.allProjects")} (${visibleProjects.length})`}
          </Text>
        </View>

        <View style={styles.projectList}>
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              badge={project.badge}
              title={project.title}
              developer={project.developer}
              price={project.price}
              location={project.location}
              image={project.image}
              featured={project.featured}
            />
          ))}
        </View>
      </ScrollView>

      <PromoBanner
        absoluteBottom
        kicker={t("projects.promo.kicker")}
        title={t("projects.promo.title")}
        subtitle={t("projects.promo.subtitle")}
        primaryLabel={t("projects.promo.primaryLabel")}
        secondaryLabel={t("projects.promo.secondaryLabel")}
        colors={["#14B37B", "#0F9D58"]}
      />

      <SearchFiltersSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        config={useMemo(() => {
          const translate = (v: string) => v;
          return {
            ...projectsSearchFiltersConfig,
            title: projectsSearchFiltersConfig.title
              ? translate(projectsSearchFiltersConfig.title)
              : undefined,
            sections: projectsSearchFiltersConfig.sections.map((section) => {
              if (section.kind === "segmented") {
                return {
                  ...section,
                  label: section.label,
                  options: section.options.map((o) => ({ ...o })),
                };
              }
              return section;
            }),
          };
        }, [t])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
    gap: 16,
  },
  heroCard: {
    height: 146,
    borderRadius: 18,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#EA580C",
  },
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(215, 119, 0, 0.62)",
  },
  heroContent: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    gap: 4,
    maxWidth: 250,
  },
  heroKicker: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0.2,
  },
  heroHeadline: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  heroSubheadline: {
    color: "rgba(255,255,255,0.95)",
    fontSize: 12,
    fontWeight: "600",
  },
  heroButton: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    minHeight: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  heroButtonLabel: {
    color: "#8A4B00",
    fontWeight: "900",
    fontSize: 12,
  },
  heroClose: {
    position: "absolute",
    right: 12,
    top: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.22)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroCloseLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    lineHeight: 18,
    fontWeight: "700",
    marginTop: -2,
  },
  searchBar: {
    margin: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minHeight: 64,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 17,
    fontWeight: "900",
  },
  statLabel: {
    fontSize: 11,
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "900",
  },
  featuredRow: {
    paddingRight: 12,
    gap: 12,
  },
  featuredCardWrap: {
    width: 260,
  },
  projectList: {
    gap: 12,
  },
  projectCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: "hidden",
  },
  projectImageWrap: {
    height: 170,
    position: "relative",
  },
  projectImage: {
    width: "100%",
    height: "100%",
  },
  badgeRow: {
    position: "absolute",
    left: 12,
    top: 12,
    right: 12,
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  badge: {
    minHeight: 22,
    paddingHorizontal: 8,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  verifiedBadge: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  verifiedBadgeText: {
    color: "#0F9D58",
    fontSize: 10,
    fontWeight: "900",
  },
  featuredBadge: {
    backgroundColor: "rgba(255, 237, 213, 0.96)",
  },
  featuredBadgeText: {
    color: "#B45309",
    fontSize: 10,
    fontWeight: "900",
  },
  projectBody: {
    padding: 14,
    gap: 12,
  },
  projectCopy: {
    gap: 3,
  },
  projectTitle: {
    fontSize: 15,
    fontWeight: "900",
  },
  projectDeveloper: {
    fontSize: 12,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 2,
  },
  locationText: {
    fontSize: 12,
    fontWeight: "600",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "900",
    marginTop: 2,
  },
  detailsButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    minHeight: 34,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  detailsLabel: {
    fontSize: 12,
    fontWeight: "900",
  },
});
