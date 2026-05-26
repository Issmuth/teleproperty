import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { propertySegments, sampleProperties } from "@/data/property";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

import { PropertySearchBar } from "@/components/molecules/property/property-search-bar";
import { PropertySegmentedControl } from "@/components/molecules/property/property-segmented-control";
import { CitySelectorSheet } from "@/components/organisms/property/city-selector-sheet";
import { PremiumBanner } from "@/components/organisms/property/premium-banner";
import { PropertyCard } from "@/components/organisms/property/property-card";
import { ValuationBanner } from "@/components/organisms/property/valuation-banner";

export default function PropertyScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();
  const [activeSegment, setActiveSegment] = useState<string>("buy");
  const [showCitySheet, setShowCitySheet] = useState<boolean>(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 }, // Extra padding for the absolute bottom banner
        ]}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <PremiumBanner />

        <View style={{ backgroundColor: colors.background }}>
          <PropertySearchBar placeholder="Search city, area, property..." />
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

      <ValuationBanner />

      <CitySelectorSheet
        visible={showCitySheet}
        onClose={() => setShowCitySheet(false)}
        onSelect={(city) => {
          console.log("Selected city:", city);
          setShowCitySheet(false);
        }}
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
});
