import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ProviderCard } from "./provider-card";

type Provider = {
  title: string;
  image?: string;
  badge?: string;
  discount?: string;
};

type FeaturedProvidersProps = {
  providers: readonly Provider[];
};

export function FeaturedProviders({ providers }: FeaturedProvidersProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Featured Service Providers</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {providers.map((p) => (
          <View key={p.title} style={styles.item}>
            <ProviderCard
              title={p.title}
              image={p.image}
              badge={p.badge}
              discount={p.discount}
              verified
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 18,
  },
  header: {
    fontWeight: "900",
    marginBottom: 10,
    fontSize: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0B8F55",
  },
  list: {
    paddingHorizontal: 8,
  },
  item: {
    width: 320,
    marginRight: 14,
  },
});
