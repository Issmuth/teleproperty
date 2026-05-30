import { ScrollView, StyleSheet } from "react-native";

import { HomeCategoryChip } from "@/components/atoms/home/home-category-chip";
import type { HomeCategory } from "@/data/home";

type HomeCategoryRowProps = {
  categories: readonly (HomeCategory & { label: string })[];
  selected?: string | null;
  onSelect?: (key: string) => void;
};

export function HomeCategoryRow({
  categories,
  selected,
  onSelect,
}: HomeCategoryRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {categories.map((category) => (
        <HomeCategoryChip
          key={category.key}
          label={category.label}
          icon={category.icon}
          color={category.color}
          selected={category.key === selected}
          onPress={() => onSelect?.(category.key)}
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
