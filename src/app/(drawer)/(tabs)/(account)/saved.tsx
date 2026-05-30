import { PropertyCard } from "@/components/organisms/property/property-card";
import { sampleProperties } from "@/data/property";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const STORAGE_KEY = "teleproperty.saved";

export default function SavedScreen() {
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (cancelled) return;
      if (!raw) {
        setSavedIds([]);
        return;
      }

      try {
        const parsed = JSON.parse(raw) as string[];
        setSavedIds(parsed || []);
      } catch {
        setSavedIds([]);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  const savedProperties = useMemo(() => {
    return sampleProperties.filter((p) => savedIds.includes(p.id));
  }, [savedIds]);

  async function removeSaved(id: string) {
    const next = savedIds.filter((s) => s !== id);
    setSavedIds(next);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.header, { color: colors.text }]}>
          {t("nav.saved")}
        </Text>
        <Text style={[styles.sub, { color: colors.textMuted }]}>
          {t("account.saved.count", { count: savedProperties.length })}
        </Text>

        {savedProperties.length === 0 ? (
          <View
            style={[
              styles.empty,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              {t("account.saved.emptyTitle")}
            </Text>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              {t("account.saved.emptyBody")}
            </Text>
          </View>
        ) : (
          savedProperties.map((p) => (
            <View key={p.id} style={styles.cardWrap}>
              <PropertyCard property={p} />
              <View style={styles.cardActions}>
                <Pressable
                  style={[
                    styles.callBtn,
                    { backgroundColor: colors.activeText },
                  ]}
                >
                  <Text style={styles.callLabel}>
                    {t("account.actions.call")}
                  </Text>
                </Pressable>
                <Pressable
                  style={[styles.whatsappBtn, { backgroundColor: "#059669" }]}
                >
                  <Text style={styles.whatsappLabel}>
                    {t("account.actions.whatsApp")}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.detailsBtn,
                    {
                      backgroundColor: colors.surfaceMuted,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text style={styles.detailsLabel}>
                    {t("account.actions.details")}
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.removeBtn,
                    {
                      backgroundColor: "rgba(239, 68, 68, 0.14)",
                      borderColor: "rgba(239, 68, 68, 0.24)",
                    },
                  ]}
                  onPress={() => void removeSaved(p.id)}
                >
                  <Text style={styles.removeLabel}>
                    {t("account.actions.remove")}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  content: { padding: 16, paddingBottom: 120, gap: 12 },
  header: { fontSize: 18, fontWeight: "900" },
  sub: { marginTop: 4, marginBottom: 8 },
  empty: { marginTop: 40, alignItems: "center" },
  emptyTitle: { fontWeight: "800", fontSize: 16 },
  emptyText: { marginTop: 8 },
  cardWrap: { gap: 8 },
  cardActions: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  callBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  callLabel: { color: "white", fontWeight: "800" },
  whatsappBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  whatsappLabel: { color: "white", fontWeight: "800" },
  detailsBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  detailsLabel: { color: "#1D4ED8", fontWeight: "800" },
  removeBtn: {
    flex: 1,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
  },
  removeLabel: { color: "#EF4444", fontWeight: "800" },
});
