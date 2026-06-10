import { useMemo, useState } from "react";
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
import {
  createFilterLabelMap,
  translateFilterConfig,
} from "@/utils/filter-translations";

export default function PropertyScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [activeSegment, setActiveSegment] = useState<string>("buy");
  const [filtersVisible, setFiltersVisible] = useState(false);

  const segments = useMemo(
    () =>
      propertySegments.map((segment) => ({
        key: segment.key,
        label: t(segment.labelKey),
      })),
    [t],
  );

  const localizedPropertySearchFiltersConfig = useMemo(() => {
    const labelMap = createFilterLabelMap(t);
    return translateFilterConfig(propertySearchFiltersConfig, labelMap);
  }, [t]);

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
            placeholder={t("property.searchPlaceholder")}
            variant="elevated"
            onFilterPress={() => setFiltersVisible(true)}
            containerStyle={styles.searchBar}
          />
          <PropertySegmentedControl
            segments={segments}
            activeKey={activeSegment}
            onChange={setActiveSegment}
          />
        </View>

        <Text style={[styles.resultsText, { color: colors.textMuted }]}>
          {t("property.resultsFound", { count: sampleProperties.length })}
        </Text>

        {sampleProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </ScrollView>

      <PromoBanner
        absoluteBottom
        kicker={t("property.valuation.kicker")}
        title={t("property.valuation.title")}
        subtitle={t("property.valuation.subtitle")}
        primaryLabel={t("property.valuation.primary")}
        secondaryLabel={t("property.valuation.secondary")}
        colors={["#14B37B", "#14B37B"]}
      />

      <SearchFiltersSheet
        visible={filtersVisible}
        onClose={() => setFiltersVisible(false)}
        config={localizedPropertySearchFiltersConfig}
        minFieldLabel={t("property.filters.min")}
        maxFieldLabel={t("property.filters.max")}
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
