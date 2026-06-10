import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { HomeListingCard } from "@/components/molecules/home-listing-card";
import { HomePropertyCard } from "@/components/molecules/home-property-card";
import { HomeSectionHeader } from "@/components/molecules/home-section-header";
import { HomeServiceBanner } from "@/components/molecules/home-service-banner";
import { HomeCarousel } from "@/components/organisms/home-carousel";
import { HomeCategoryRow } from "@/components/organisms/home-category-row";
import { HomeCategoryStory } from "@/components/organisms/home-category-story";
import { HomeHero } from "@/components/organisms/home-hero";
import { SearchFiltersSheet } from "@/components/organisms/search-filters-sheet";
import {
  featuredProjects,
  featuredProperties,
  homeCategories,
  homeSegments,
  homeServiceBanners,
  type HomeSegmentKey,
} from "@/data/home";
import {
  projectsSearchFiltersConfig,
  propertySearchFiltersConfig,
} from "@/data/search-filters";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import {
  createFilterLabelMap,
  translateFilterConfig,
} from "@/utils/filter-translations";

export default function HomeScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState<HomeSegmentKey>("buy");
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(
    null,
  );
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersState, setFiltersState] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const segments = homeSegments.map((segment) => ({
    key: segment.key,
    label:
      segment.key === "buy"
        ? t("home.buy")
        : segment.key === "rent"
          ? t("home.rent")
          : t("home.newProjects"),
  }));

  const categories = useMemo(
    () =>
      homeCategories.map((category) => ({
        ...category,
        label: t(category.labelKey),
      })),
    [t],
  );

  const localizedFeaturedProjects = useMemo(() => featuredProjects, []);

  const localizedFeaturedProperties = useMemo(() => featuredProperties, []);

  const localizedHomeServiceBanners = useMemo(
    () =>
      homeServiceBanners.map((section) =>
        section.layout === "single"
          ? {
              ...section,
              item: {
                ...section.item,
                title: t(section.item.titleKey),
                subtitle: t(section.item.subtitleKey),
              },
            }
          : {
              ...section,
              items: section.items.map((item) => ({
                ...item,
                title: t(item.titleKey),
                subtitle: t(item.subtitleKey),
              })) as typeof section.items,
            },
      ),
    [t],
  );

  const localizedSearchFiltersConfig = useMemo(() => {
    const rawConfig =
      activeSegment === "projects"
        ? projectsSearchFiltersConfig
        : propertySearchFiltersConfig;

    const labelMap = createFilterLabelMap(t);
    return translateFilterConfig(rawConfig, labelMap);
  }, [t, activeSegment]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.innerContainer}>
        <HomeHero
          activeSegment={activeSegment}
          onSegmentChange={(key) => setActiveSegment(key as HomeSegmentKey)}
          segments={segments}
          onFilterPress={() => setFiltersVisible(true)}
          onPostPress={() => router.push("/(drawer)/(tabs)/(property)/post-property" as never)}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearchPress={() => {
            const params = new URLSearchParams();
            if (searchQuery) params.append("q", searchQuery);

            Object.entries(filtersState).forEach(([k, v]) => {
              if (Array.isArray(v)) {
                v.forEach((val) => params.append(k, String(val)));
              } else if (v !== undefined && v !== null && v !== "") {
                params.append(k, String(v));
              }
            });

            if (activeSegment === "projects") {
              router.push(`/projects?${params.toString()}` as never);
            } else {
              router.push(`/property?${params.toString()}` as never);
            }
          }}
          kicker={t("home.heroKicker")}
          title={t("home.heroTitle")}
          subtitle={t("home.heroSubtitle")}
          searchPlaceholder={t("home.searchPlaceholder")}
          searchAction={t("home.searchAction")}
          postLabel={t("home.postPropertyFree")}
          localePill="GB EN"
        />

        <View style={styles.sectionSpacing}>
          <HomeCategoryRow
            categories={categories}
            selected={selectedCategoryKey}
            onSelect={(key) => setSelectedCategoryKey(key)}
          />
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.headerPad}>
            <HomeSectionHeader
              title={t("home.featuredProjects")}
              actionLabel={t("home.seeAll")}
              onPressAction={() => router.push("/projects" as never)}
            />
          </View>
          <HomeCarousel
            data={localizedFeaturedProjects}
            itemWidth={286}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
              <HomeListingCard
                {...item}
                onPress={() =>
                  router.push({
                    pathname: "/project-details" as never,
                    params: {
                      id: item.id,
                      title: item.title,
                      developer: item.agency,
                      price: item.price,
                      location: item.location,
                      image: item.image,
                    },
                  })
                }
              />
            )}
          />
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.headerPad}>
            <HomeSectionHeader
              title={t("home.featuredProperties")}
              actionLabel={t("home.browseAll")}
              onPressAction={() => router.push("/property" as never)}
            />
          </View>
          <HomeCarousel
            data={localizedFeaturedProperties}
            itemWidth={220}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <HomePropertyCard {...item} />}
          />
        </View>

        <View style={[styles.sectionBlock, styles.headerPad]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, marginBottom: 12 },
            ]}
          >
            {t("home.allServices")}
          </Text>

          <View style={styles.grid}>
            {localizedHomeServiceBanners.map((section) =>
              section.layout === "single" ? (
                <HomeServiceBanner key={section.id} {...section.item} />
              ) : (
                <View key={section.id} style={styles.halfGrid}>
                  {section.items.map((item) => (
                    <HomeServiceBanner key={item.title} {...item} />
                  ))}
                </View>
              ),
            )}
          </View>
        </View>
        <HomeCategoryStory
          visible={Boolean(selectedCategoryKey)}
          categoryKey={selectedCategoryKey}
          onClose={() => setSelectedCategoryKey(null)}
        />
        <SearchFiltersSheet
          visible={filtersVisible}
          onClose={() => setFiltersVisible(false)}
          config={localizedSearchFiltersConfig}
          minFieldLabel={t("home.filters.min")}
          maxFieldLabel={t("home.filters.max")}
          onChange={setFiltersState}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  innerContainer: {
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },
  sectionSpacing: {
    marginTop: 16,
  },
  sectionBlock: {
    marginTop: 20,
    gap: 12,
  },
  headerPad: {
    paddingHorizontal: 16,
  },
  cardsRow: {
    flexDirection: "row",
    gap: 14,
    paddingTop: 2,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  grid: {
    gap: 12,
  },
  halfGrid: {
    flexDirection: "row",
    gap: 12,
  },
});
