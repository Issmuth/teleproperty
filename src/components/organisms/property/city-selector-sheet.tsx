import { AppBottomSheet } from "@/components/atoms/app-bottom-sheet";
import { ethiopianCities, type CityItem } from "@/data/property";
import { useAppTheme } from "@/theme/app-theme";
import { Pressable, ScrollView, StyleSheet, Text } from "react-native";

type CitySelectorSheetProps = {
  visible: boolean;
  onClose: () => void;
  onSelect: (city: CityItem) => void;
};

export function CitySelectorSheet({
  visible,
  onClose,
  onSelect,
}: CitySelectorSheetProps) {
  const { colors } = useAppTheme();

  return (
    <AppBottomSheet
      visible={visible}
      onClose={onClose}
      title="Choose Your City"
      subtitle="Select the location for your property search"
      sheetStyle={styles.sheet}
    >
      <ScrollView
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      >
        {ethiopianCities.map((city) => (
          <Pressable
            key={city.id}
            style={({ pressed }) => [
              styles.tile,
              { backgroundColor: colors.surface, borderColor: colors.border },
              pressed && { opacity: 0.7 },
            ]}
            onPress={() => onSelect(city)}
          >
            <Text style={styles.icon}>{city.icon}</Text>
            <Text style={[styles.name, { color: colors.text }]}>
              {city.name}
            </Text>
            {city.subtext && (
              <Text style={[styles.subtext, { color: colors.textMuted }]}>
                {city.subtext}
              </Text>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </AppBottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    minHeight: "75%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  tile: {
    width: "31%",
    aspectRatio: 0.9,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginBottom: 12,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },
  subtext: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 2,
  },
});
