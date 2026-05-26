import { useState } from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
} from "react-native";

import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";

type CarouselProps<T> = {
  data: readonly T[];
  renderItem: ({
    item,
    index,
  }: {
    item: T;
    index: number;
  }) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  itemWidth: number;
  gap?: number;
};

export function HomeCarousel<T>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  gap = 12,
}: CarouselProps<T>) {
  const { colors } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const slideSize = itemWidth + gap;
    const scrollPosition = contentOffset.x;

    // Check if we've scrolled to the very end of the list
    const isAtEnd =
      scrollPosition + layoutMeasurement.width >= contentSize.width - 10;

    if (isAtEnd) {
      setActiveIndex(data.length - 1);
    } else {
      const index = Math.round(scrollPosition / slideSize);
      setActiveIndex(Math.min(Math.max(index, 0), data.length - 1));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, { gap }]}
        snapToInterval={itemWidth + gap}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
      <View style={styles.dots}>
        {data.map((_, i) => {
          const isActive = i === activeIndex;
          return (
            <View
              key={i}
              style={[
                styles.dot,
                isActive ? styles.dotActive : styles.dotInactive,
                {
                  backgroundColor: isActive
                    ? palette.brand.primary
                    : colors.border,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 2,
    paddingBottom: 8,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 20,
  },
  dotInactive: {
    width: 6,
  },
});
