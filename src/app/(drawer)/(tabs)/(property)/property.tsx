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
    const labelMap: Record<string, string> = {
      "Advanced Filters": t("property.filters.title"),
      "Refine property listings and sort by what matters most": t(
        "property.filters.subtitle",
      ),
      City: t("property.filters.city"),
      "Property Type": t("property.filters.propertyType"),
      "All Cities": t("property.filters.allCities"),
      "Addis Ababa": t("property.filters.addisAbaba"),
      Adama: t("property.filters.adama"),
      Hawassa: t("property.filters.hawassa"),
      "Bahir Dar": t("property.filters.bahirDar"),
      "All Types": t("property.filters.allTypes"),
      Apartment: t("property.filters.apartment"),
      House: t("property.filters.house"),
      Villa: t("property.filters.villa"),
      Land: t("property.filters.land"),
      "Price Range (ETB)": t("property.filters.priceRangeEtb"),
      "Min 0": t("property.filters.min0"),
      "Max Any": t("property.filters.maxAny"),
      "< 1M": t("property.filters.lt1m"),
      "1M-3M": t("property.filters.oneToThreeM"),
      "3M-8M": t("property.filters.threeToEightM"),
      "8M+": t("property.filters.eightMPlus"),
      "< 20K/mo": t("property.filters.lt20kMonth"),
      Bedrooms: t("property.filters.bedrooms"),
      Bathrooms: t("property.filters.bathrooms"),
      Any: t("property.filters.any"),
      Studio: t("property.filters.studio"),
      "5+": t("property.filters.fivePlus"),
      "4+": t("property.filters.fourPlus"),
      "Property Age": t("property.filters.propertyAge"),
      "Any Age": t("property.filters.anyAge"),
      "New (0–2 yrs)": t("property.filters.new0To2"),
      "Recent (3–5 yrs)": t("property.filters.recent3To5"),
      "5–10 yrs": t("property.filters.fiveToTen"),
      "10–20 yrs": t("property.filters.tenToTwenty"),
      "20+ yrs": t("property.filters.twentyPlus"),
      Amenities: t("property.filters.amenities"),
      Parking: t("property.filters.parking"),
      Generator: t("property.filters.generator"),
      Elevator: t("property.filters.elevator"),
      "24/7 Security": t("property.filters.security24"),
      "Water Tank": t("property.filters.waterTank"),
      Furnished: t("property.filters.furnished"),
      Balcony: t("property.filters.balcony"),
      "Garden / Compound": t("property.filters.gardenCompound"),
      CCTV: t("property.filters.cctv"),
      "WiFi / Fibre": t("property.filters.wifiFibre"),
      Gym: t("property.filters.gym"),
      "Swimming Pool": t("property.filters.swimmingPool"),
      "Verified Listings Only": t("property.filters.verifiedListingsOnly"),
      "Show only TeleProperty verified properties": t(
        "property.filters.verifiedListingsDescription",
      ),
      "Sort By": t("property.filters.sortBy"),
      Newest: t("property.filters.newest"),
      "Price: Low-High": t("property.filters.priceLowHigh"),
      "Price: High-Low": t("property.filters.priceHighLow"),
      "Most Popular": t("property.filters.mostPopular"),
    };

    const translate = (value: string) => labelMap[value] ?? value;

    return {
      ...propertySearchFiltersConfig,
      title: translate(propertySearchFiltersConfig.title),
      subtitle: propertySearchFiltersConfig.subtitle
        ? translate(propertySearchFiltersConfig.subtitle)
        : undefined,
      sections: propertySearchFiltersConfig.sections.map((section) => {
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
