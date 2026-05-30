import { useRouter } from "expo-router";
import { useState } from "react";
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
import { homeSearchFiltersConfig } from "@/data/search-filters";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function HomeScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const router = useRouter();
  const [activeSegment, setActiveSegment] = useState<HomeSegmentKey>("buy");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const segments = homeSegments.map((segment) => ({
    key: segment.key,
    label:
      segment.key === "buy"
        ? t("home.buy")
        : segment.key === "rent"
          ? t("home.rent")
          : t("home.newProjects"),
  }));

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
            categories={homeCategories.map((category) => ({
              ...category,
              label:
                category.label === "Buy"
                  ? t("home.buy")
                  : category.label === "Rent"
                    ? t("home.rent")
                    : category.label === "Projects"
                      ? t("home.newProjects")
                      : category.label === "Services"
                        ? t("nav.services")
                        : category.label === "Interior"
                          ? t("home.interior")
                          : category.label === "Movers"
                            ? t("home.movers")
                            : category.label === "Agents"
                              ? t("home.agents")
                              : category.label === "Rewards"
                                ? t("home.rewards")
                                : category.label,
            }))}
            selected={selectedCategory}
            onSelect={(label) => setSelectedCategory(label)}
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
            data={featuredProjects}
            itemWidth={286}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <HomeListingCard {...item} />}
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
            data={featuredProperties}
            itemWidth={220}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => <HomePropertyCard {...item} />}
          />
        </View>

        {/* Quick Services Section */}
        {/* <View style={styles.sectionBlock}>
          <View style={styles.headerPad}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Services
            </Text>
          </View>
          <ScrollView
            horizontal
            />
            <QuickServiceCard
              title="Packers & Movers"
              subtitle="Safe moving & relocation services"
              icon={Package}
              backgroundColor={palette.orange.primary}
              style={{ width: 280 }}
            />
            <QuickServiceCard
              title="Hotel Booking"
              subtitle="Hotels & guest houses"
              icon={Building}
              backgroundColor={palette.brand.accent}
              style={{ width: 280 }}
            />
          </ScrollView>
        </View> */}

        <View style={[styles.sectionBlock, styles.headerPad]}>
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.text, marginBottom: 12 },
            ]}
          >
            All Services
          </Text>
          
          <View style={styles.grid}>
            {homeServiceBanners.map((section) =>
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
          visible={Boolean(selectedCategory)}
          categoryLabel={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
        <SearchFiltersSheet
          visible={filtersVisible}
          onClose={() => setFiltersVisible(false)}
          config={homeSearchFiltersConfig}
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
