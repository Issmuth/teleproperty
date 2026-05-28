import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { propertySegments, sampleProperties } from "@/data/property";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

import { AppSearchBar } from "@/components/molecules/app-search-bar";
import { PromoBanner } from "@/components/molecules/promo-banner";
import { PropertySegmentedControl } from "@/components/molecules/property/property-segmented-control";
// City selector sheet removed — stories UI handles category-driven browsing
import { PremiumBanner } from "@/components/organisms/property/premium-banner";
import { PropertyCard } from "@/components/organisms/property/property-card";
import { SearchFiltersSheet } from "@/components/organisms/search-filters-sheet";
import { propertySearchFiltersConfig } from "@/data/search-filters";

export default function PropertyScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [activeSegment, setActiveSegment] = useState<string>("buy");
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <PremiumBanner />

        <View style={{ backgroundColor: colors.background }}>
          <AppSearchBar
            placeholder="Search city, area, property..."
            variant="elevated"
            onFilterPress={() => setFiltersVisible(true)}
            containerStyle={styles.searchBar}
          />
          <PropertySegmentedControl
            segments={propertySegments}
            activeKey={activeSegment}
            onChange={setActiveSegment}
          />
        </View>

        <Text style={[styles.resultsText, { color: colors.textMuted }]}>
          {sampleProperties.length} properties found
        </Text>

        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>

      <PromoBanner
        absoluteBottom
        kicker="Property Valuation"
        title="Property Valuation Free"
        subtitle="Know your property worth in 2 minutes"
        primaryLabel="Free Assessment"
        secondaryLabel="Get Valued →"
        colors={["#14B37B", "#14B37B"]}
      />

      <SearchFiltersSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        config={propertySearchFiltersConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  scrollContent: {
    flexGrow: 1,
  },
  resultsText: {
    fontSize: 13,
    fontWeight: "500",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchBar: {
    margin: 16,
  },
});
