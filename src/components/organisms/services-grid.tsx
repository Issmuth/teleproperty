import { ServiceCard } from "@/components/atoms/service-card";
import { StyleSheet, View } from "react-native";

type GridItem = {
  title: string;
  image?: string;
};

type ServicesGridProps = {
  items: readonly GridItem[];
};

export function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item.title} style={styles.item}>
          <ServiceCard title={item.title} image={item.image} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
  },
});
