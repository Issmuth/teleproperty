import { PropertyCard } from "@/components/organisms/property/property-card";
import { sampleProperties, type PropertyItem } from "@/data/property";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import { Edit3, Eye, EyeOff, Trash2 } from "lucide-react-native";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function MyListingsScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const [items, setItems] = useState<PropertyItem[]>(sampleProperties);

  const activeCount = useMemo(
    () => items.filter((i) => i.forSale).length,
    [items],
  );

  function toggleVisible(id: string) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, forSale: !p.forSale } : p)),
    );
  }

  function remove(id: string) {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  function renderItem({ item }: { item: PropertyItem }) {
    return (
      <View style={styles.card} key={item.id}>
        <PropertyCard property={item} />

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.actionBtn}
            onPress={() =>
              router.push(`/post-property?edit=${item.id}` as never)
            }
          >
            <Edit3 size={16} color="#0B6BFF" />
            <Text style={styles.actionLabel}>Edit</Text>
          </Pressable>

          <Pressable
            style={styles.actionBtn}
            onPress={() => toggleVisible(item.id)}
          >
            {item.forSale ? (
              <Eye size={16} color="#059669" />
            ) : (
              <EyeOff size={16} color="#94A3B8" />
            )}
            <Text style={styles.actionLabel}>
              {item.forSale ? "Visible" : "Hidden"}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, styles.deleteBtn]}
            onPress={() => remove(item.id)}
          >
            <Trash2 size={16} color="#EF4444" />
            <Text style={[styles.actionLabel, { color: "#EF4444" }]}>
              Delete
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Listings</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={[styles.count, { color: colors.textMuted }]}>
            {activeCount} active
          </Text>
          <Pressable
            style={styles.addBtn}
            onPress={() => router.push("/post-property" as never)}
          >
            <Text style={styles.addLabel}>Add Listing</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontSize: 18, fontWeight: "900" },
  count: { marginRight: 8 },
  addBtn: {
    backgroundColor: "#0B8F55",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addLabel: { color: "white", fontWeight: "800" },
  list: { padding: 16, paddingBottom: 120, gap: 12 },
  card: { marginBottom: 12 },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    marginHorizontal: 8,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    flex: 1,
    justifyContent: "center",
  },
  actionLabel: { fontWeight: "800", color: "#0B6BFF" },
  deleteBtn: {
    borderColor: "rgba(239, 68, 68, 0.24)",
    backgroundColor: "rgba(239, 68, 68, 0.14)",
  },
});
