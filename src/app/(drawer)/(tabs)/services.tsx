import { AppSearchBar } from "@/components/molecules/app-search-bar";
import { PromoBanner } from "@/components/molecules/promo-banner";
import { BookServiceBanner } from "@/components/molecules/services/book-service-banner";
import { FeaturedProviders } from "@/components/molecules/services/featured-providers";
import { ServicesGrid } from "@/components/organisms/services-grid";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useMemo } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ServicesScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const items = useMemo(
    () => [
      {
        title: "Instant Services",
        image:
          "https://images.unsplash.com/photo-1581091012184-7f0f61f0a23d?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Full House Cleaning",
        image:
          "https://images.unsplash.com/photo-1545259742-2b092d8b5f75?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Packers & Movers",
        image:
          "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Electrical Services",
        image:
          "https://images.unsplash.com/photo-1547516508-0a3b7ff6aef3?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Plumbing Services",
        image:
          "https://images.unsplash.com/photo-1581092580499-7b5e1d6d2a64?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Carpentry Services",
        image:
          "https://images.unsplash.com/photo-1596367802364-9f2e3d63c0f2?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Home Painting",
        image:
          "https://images.unsplash.com/photo-1599492618200-bb9c5a7a5b8b?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Rental Agreement & Legal",
        image:
          "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Interior Design",
        image:
          "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Pest Control",
        image:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Furniture Assembly",
        image:
          "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      },
      {
        title: "Water Tank Cleaning",
        image:
          "https://images.unsplash.com/photo-1581090700227-6bb8c312b53a?auto=format&fit=crop&w=800&q=80",
      },
    ],
    [],
  );

  return (
    <>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 140 }}
      >
        <View style={{ padding: 16 }}>
          <PromoBanner
            kicker="CoolTech Services"
            title="AC Service Campaign"
            subtitle="Professional AC repair - Same-day service available"
            primaryLabel="Get Service"
            colors={["#0B3C2A", "#0F9D58"]}
            showPlayButton
          />
        </View>

        <View
          style={{
            backgroundColor: colors.background,
            paddingHorizontal: 16,
            paddingBottom: 12,
          }}
        >
          <AppSearchBar placeholder={t("home.searchPlaceholder")} />
        </View>

        <View style={{ gap: 12, paddingHorizontal: 16 }}>
          <View style={{ marginVertical: 8 }}>
            <BookServiceBanner
              title="Book Home Service Now"
              subtitle="Get instant quote - Fast service - Verified providers"
              buttonLabel="Book"
              colors={["#14B37B", "#0B8F55"]}
            />
          </View>

          <ServicesGrid items={items} />

          {/* Featured providers horizontal list */}
          <FeaturedProviders
            providers={useMemo(
              () => [
                {
                  title: "Plumbing & Electrical",
                  image:
                    "https://images.unsplash.com/photo-1581091012184-7f0f61f0a23d?auto=format&fit=crop&w=1200&q=80",
                  badge: "Sponsored",
                  discount: "20% Off First Service",
                },
                {
                  title: "Home Cleaning Co",
                  image:
                    "https://images.unsplash.com/photo-1545259742-2b092d8b5f75?auto=format&fit=crop&w=1200&q=80",
                },
                {
                  title: "Quick Movers",
                  image:
                    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
                },
              ],
              [],
            )}
          />
        </View>
      </ScrollView>
      <PromoBanner
        absoluteBottom
        title="Painting Special"
        subtitle="Professional home paintings at best rates"
        primaryLabel="30% discount"
        secondaryLabel="Get Valued →"
        colors={["#14B37B", "#14B37B"]}
      />
    </>
  );
}
