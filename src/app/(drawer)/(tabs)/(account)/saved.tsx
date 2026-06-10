import { PropertyCard } from "@/components/organisms/property/property-card";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useFocusEffect, useRouter } from "expo-router";
import { Heart } from "lucide-react-native";
import { useCallback } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function SavedScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const router = useRouter();
  const { savedProperties, loading, refresh } = useSavedProperties();

  // Refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  if (loading) {
    return (
      <View style={[styles.screen, styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.activeText} />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header with back button */}
      <View style={[styles.header, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => {
            router.replace('/(drawer)/(tabs)/(account)/account')
            router.back()
          }}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <View style={styles.headerText}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {t("nav.saved")}
          </Text>
          <Text style={[styles.headerSub, { color: colors.textMuted }]}>
            {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        {savedProperties.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View
              style={[
                styles.emptyCard,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <View style={[styles.emptyIcon, { backgroundColor: colors.surfaceMuted }]}>
                <Heart size={32} color={colors.textMuted} strokeWidth={1.5} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>
                {t("account.saved.emptyTitle")}
              </Text>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                {t("account.saved.emptyBody")}
              </Text>
            </View>
          </View>
        ) : (
          savedProperties.map((property) => {
            // Convert saved property format to PropertyItem format
            const propertyItem = {
              id: property.id,
              title: property.title,
              location: property.location,
              price: property.price,
              image: property.image,
              age: "N/A",
              beds: 0,
              baths: 0,
              area: 0,
              featured: false,
              forSale: true,
              verified: false,
            };

            return <PropertyCard key={property.id} property={propertyItem} onSaveToggle={refresh} />;
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { justifyContent: "center", alignItems: "center" },
  header: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    marginTop: -2,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  headerSub: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  content: {
    padding: 16,
    paddingBottom: 120,
    gap: 12,
  },
  emptyContainer: {
    flex: 1,
    paddingTop: 60,
  },
  emptyCard: {
    borderWidth: 1,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    gap: 12,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  emptyTitle: {
    fontWeight: "800",
    fontSize: 18,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
