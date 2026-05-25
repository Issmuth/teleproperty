import { ScrollView, StyleSheet } from "react-native";

import { HomeCategoryChip } from "@/components/atoms/home/home-category-chip";
import type { HomeCategory } from "@/data/home";

type HomeCategoryRowProps = {
  categories: readonly HomeCategory[];
};

export function HomeCategoryRow({ categories }: HomeCategoryRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <HomeCategoryChip
          key={category.label}
          label={category.label}
          icon={category.icon}
          color={category.color}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 14,
  },
});
