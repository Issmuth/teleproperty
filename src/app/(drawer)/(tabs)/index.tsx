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

    const labelMap: Record<string, string> = {
      "Advanced Filters": t("home.filters.title"),
      "Project Filters": t("home.filters.title"), // fallback if needed
      "Refine home searches by listing type, location, and property details": t(
        "home.filters.subtitle",
      ),
      "Refine property listings and sort by what matters most": t(
        "home.filters.subtitle", // use same subtitle or handle differently?
      ),
      "Filter by city, project status, and verified developers": t(
        "home.filters.subtitle", // fallback
      ),
      City: t("home.filters.city"),
      "Property Type": t("home.filters.propertyType"),
      "All Cities": t("home.filters.allCities"),
      "Addis Ababa": t("home.filters.addisAbaba"),
      Adama: t("home.filters.adama"),
      Hawassa: t("home.filters.hawassa"),
      "Bahir Dar": t("home.filters.bahirDar"),
      "All Types": t("home.filters.allTypes"),
      Apartment: t("home.filters.apartment"),
      House: t("home.filters.house"),
      Villa: t("home.filters.villa"),
      Land: t("home.filters.land"),
      "Price Range (ETB)": t("home.filters.priceRangeEtb"),
      "Min 0": t("home.filters.min0"),
      "Max Any": t("home.filters.maxAny"),
      "< 1M": t("home.filters.lt1m"),
      "1M-3M": t("home.filters.oneToThreeM"),
      "3M-8M": t("home.filters.threeToEightM"),
      "8M+": t("home.filters.eightMPlus"),
      "< 20K/mo": t("home.filters.lt20kMonth"),
      Bedrooms: t("home.filters.bedrooms"),
      Bathrooms: t("home.filters.bathrooms"),
      Any: t("home.filters.any"),
      Studio: t("home.filters.studio"),
      "5+": t("home.filters.fivePlus"),
      "4+": t("home.filters.fourPlus"),
      "Property Age": t("home.filters.propertyAge"),
      "Any Age": t("home.filters.anyAge"),
      "New (0–2 yrs)": t("home.filters.new0To2"),
      "Recent (3–5 yrs)": t("home.filters.recent3To5"),
      "5–10 yrs": t("home.filters.fiveToTen"),
      "10–20 yrs": t("home.filters.tenToTwenty"),
      "20+ yrs": t("home.filters.twentyPlus"),
      Amenities: t("home.filters.amenities"),
      Parking: t("home.filters.parking"),
      Generator: t("home.filters.generator"),
      Elevator: t("home.filters.elevator"),
      "24/7 Security": t("home.filters.security24"),
      "Water Tank": t("home.filters.waterTank"),
      Furnished: t("home.filters.furnished"),
      Balcony: t("home.filters.balcony"),
      "Garden / Compound": t("home.filters.gardenCompound"),
      CCTV: t("home.filters.cctv"),
      "WiFi / Fibre": t("home.filters.wifiFibre"),
      Gym: t("home.filters.gym"),
      "Swimming Pool": t("home.filters.swimmingPool"),
      // specific project filters mappings if they don't have localization yet:
      Developer: "Developer",
      "All Developers": "All Developers",
      "Capital Real Estate": "Capital Real Estate",
      "Sunshine Developers PLC": "Sunshine Developers PLC",
      "Modern Developments Ltd": "Modern Developments Ltd",
      "Blue Horizon Homes": "Blue Horizon Homes",
      Status: "Status",
      All: "All",
      "Off-plan": "Off-plan",
      "U/C": "U/C",
      Ready: "Ready",
      "Verified Developers Only": "Verified Developers Only",
      "Show only developers verified by TeleProperty":
        "Show only developers verified by TeleProperty",
      "Verified Listings Only": "Verified Listings Only",
      "Show only TeleProperty verified properties":
        "Show only TeleProperty verified properties",
      "Sort By": "Sort By",
      Newest: "Newest",
      "Price: Low-High": "Price: Low-High",
      "Price: High-Low": "Price: High-Low",
      "Most Popular": "Most Popular",
    };

    const translate = (value: string) => labelMap[value] ?? value;

    return {
      ...rawConfig,
      title: translate(rawConfig.title),
      subtitle: rawConfig.subtitle ? translate(rawConfig.subtitle) : undefined,
      sections: rawConfig.sections.map((section) => {
        if (section.kind === "segmented") {
          return {
            ...section,
            label: translate(section.label),
            options: section.options.map((option) => ({
              ...option,
              label: translate(option.label),
            })),
          };
        }

        if (section.kind === "dual-select") {
          return {
            ...section,
            fields: section.fields.map((field) => ({
              ...field,
              label: translate(field.label),
              value: translate(field.value),
              options: field.options.map((option) => ({
                ...option,
                label: translate(option.label),
              })),
            })) as typeof section.fields,
          };
        }

        if (section.kind === "range") {
          return {
            ...section,
            label: translate(section.label),
            minLabel: translate(section.minLabel),
            maxLabel: translate(section.maxLabel),
            quickOptions: section.quickOptions.map((option) => ({
              ...option,
              label: translate(option.label),
            })),
          };
        }

        if (section.kind === "chips") {
          return {
            ...section,
            label: translate(section.label),
            options: section.options.map((option) => ({
              ...option,
              label: translate(option.label),
            })),
          };
        }

        return {
          ...section,
          label: translate(section.label),
          description: translate(section.description),
        };
      }),
    };
  }, [t]);

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
          onPostPress={() => router.push("/post-property" as never)}
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
