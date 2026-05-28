import { useRouter } from "expo-router";
import {
    Briefcase,
    Building,
    Building2,
    Gift,
    Newspaper,
    Package,
    Plus,
    Search,
    ShieldCheck,
    Sofa,
    Truck,
    Wallet,
    Wifi,
    Wrench,
} from "lucide-react-native";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { HomeListingCard } from "@/components/molecules/home-listing-card";
import { HomePropertyCard } from "@/components/molecules/home-property-card";
import { HomeSectionHeader } from "@/components/molecules/home-section-header";
import { HomeServiceBanner } from "@/components/molecules/home-service-banner";
import { QuickServiceCard } from "@/components/molecules/quick-service-card";
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
    type HomeSegmentKey,
} from "@/data/home";
import { homeSearchFiltersConfig } from "@/data/search-filters";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";

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

        <View style={styles.sectionBlock}>
          <View style={styles.headerPad}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Quick Services
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.cardsRow, { paddingHorizontal: 16 }]}
          >
            <QuickServiceCard
              title="Home Services"
              subtitle="Cleaning, plumbing, electrical & more"
              icon={Wrench}
              backgroundColor="#1CA1E3"
              style={{ width: 320 }}
            />
            <QuickServiceCard
              title="Interior Design"
              subtitle="Design, furniture & decoration"
              icon={Sofa}
              backgroundColor={palette.purple.primary}
              style={{ width: 280 }}
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
        </View>

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
            <HomeServiceBanner
              backgroundColor="#0B3C2A"
              icon={Search}
              title="Search Property"
              subtitle="Buy & Rent Effortlessly"
              image="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=80"
            />

            <View style={styles.halfGrid}>
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={Plus}
                title="Post your Property"
                subtitle="Free & Easy Listing"
                image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80"
              />
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={Building2}
                title="New Projects"
                subtitle="Off-Plan Developments"
                image="https://images.unsplash.com/photo-1541881451213-911293a9d905?auto=format&fit=crop&w=500&q=80"
              />
            </View>

            <HomeServiceBanner
              backgroundColor={palette.brand.accent}
              icon={Gift}
              title="Home Rewards"
              subtitle="Win Prizes & Rewards"
              image="https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&w=800&q=80"
            />

            <HomeServiceBanner
              backgroundColor="#0B3C2A"
              icon={Wallet}
              title="Telebirr Pay"
              subtitle="Mobile Payments"
              image="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
            />

            <HomeServiceBanner
              backgroundColor="#0B3C2A"
              icon={Wrench}
              title="Home Services"
              subtitle="Cleaning, Plumbing & More"
              image="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80"
            />

            <View style={styles.halfGrid}>
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={Sofa}
                title="Interiors"
                subtitle="Design & Furniture"
                image="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80"
              />
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={Truck}
                title="Packers & Movers"
                subtitle="Safe Moving Services"
                image="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
              />
            </View>

            <View style={styles.halfGrid}>
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={Newspaper}
                title="Property News"
                subtitle="Market & Land Updates"
                image="https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=500&q=80"
              />
              <HomeServiceBanner
                size="half"
                backgroundColor="#0B3C2A"
                icon={ShieldCheck}
                title="Verified Brokers"
                subtitle="Professional Agents"
                image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=500&q=80"
              />
            </View>

            <HomeServiceBanner
              backgroundColor="#0B3C2A"
              icon={Briefcase}
              title="Developer Hub"
              subtitle="Build & Partner"
              image="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
            />

            <HomeServiceBanner
              backgroundColor="#1A3A32"
              icon={Wifi}
              title="Telecom Integration"
              subtitle="Telebirr - IVR - USSD - SMS"
              image="https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?auto=format&fit=crop&w=800&q=80"
            />
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
