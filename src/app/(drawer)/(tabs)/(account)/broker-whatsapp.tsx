import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "@/theme/app-theme";

const filters = ["All", "New (2)", "Contacted (2)", "Closed (2)"] as const;
type Filter = (typeof filters)[number];

const avatarColors = ["#16A34A", "#2563EB", "#7C3AED", "#EA580C", "#0891B2"];

const inquiries = [
  { id: "1", initials: "AK", name: "Abebe Kebede", property: "3BR Villa – Bole", time: "5 min ago", status: "New" as const, avatarColor: "#16A34A" },
  { id: "2", initials: "ST", name: "Sara Tesfaye", property: "2BR Apartment – Kazanchis", time: "1 hr ago", status: "New" as const, avatarColor: "#2563EB" },
  { id: "3", initials: "YG", name: "Yared Girma", property: "Studio – Piazza", time: "3 hrs ago", status: "Contacted" as const, avatarColor: "#7C3AED" },
  { id: "4", initials: "MA", name: "Meron Alemu", property: "Commercial – CMC", time: "Yesterday", status: "Contacted" as const, avatarColor: "#EA580C" },
];

export default function BrokerWhatsappScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.surface }]}>
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>WhatsApp Inquiries</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>WhatsApp Inquiries</Text>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>2 new messages</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {filters.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterChip,
                { backgroundColor: colors.surface, borderColor: colors.border },
                activeFilter === f && styles.filterChipActive,
              ]}
            >
              <Text style={[styles.filterLabel, { color: colors.textMuted }, activeFilter === f && styles.filterLabelActive]}>
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {inquiries.map((item) => (
          <View key={item.id} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={styles.cardTop}>
              <View style={[styles.avatar, { backgroundColor: item.avatarColor }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
                <View style={styles.propertyRow}>
                  <MapPin size={11} color="#16A34A" />
                  <Text style={[styles.property, { color: colors.textMuted }]}>{item.property}</Text>
                </View>
                <Text style={[styles.time, { color: colors.textMuted }]}>{item.time}</Text>
              </View>
              <View style={[
                styles.statusBadge,
                { backgroundColor: item.status === "New" ? "#FEE2E2" : "#E0E7FF" },
              ]}>
                <Text style={[styles.statusLabel, { color: item.status === "New" ? "#DC2626" : "#4F46E5" }]}>
                  {item.status}
                </Text>
              </View>
            </View>

            <View style={styles.actionsRow}>
              <Pressable style={styles.whatsappBtn}>
                <Text style={styles.whatsappBtnLabel}>💬 WhatsApp</Text>
              </Pressable>
              <Pressable style={[styles.outlineBtn, { borderColor: colors.border }]}>
                <Text style={[styles.outlineBtnLabel, { color: colors.text }]}>📞 Call</Text>
              </Pressable>
              <Pressable style={[styles.blueBtn]}>
                <Text style={styles.blueBtnLabel}>
                  {item.status === "New" ? "Mark Contacted" : "Close"}
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: { paddingTop: 14, paddingHorizontal: 16, paddingBottom: 10, flexDirection: "row", alignItems: "center", gap: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 32, gap: 14 },
  sectionTitle: { fontSize: 20, fontWeight: "900" },
  sectionSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },
  filtersRow: { gap: 8 },
  filterChip: { paddingHorizontal: 14, minHeight: 34, borderRadius: 999, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  filterChipActive: { backgroundColor: "#16A34A", borderColor: "#16A34A" },
  filterLabel: { fontSize: 13, fontWeight: "700" },
  filterLabelActive: { color: "#FFFFFF" },
  card: { borderWidth: 1, borderRadius: 18, padding: 14, gap: 12 },
  cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  avatar: { width: 46, height: 46, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  name: { fontSize: 14, fontWeight: "900" },
  propertyRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 3 },
  property: { fontSize: 12, fontWeight: "600" },
  time: { fontSize: 11, fontWeight: "600", marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  statusLabel: { fontSize: 12, fontWeight: "800" },
  actionsRow: { flexDirection: "row", gap: 8 },
  whatsappBtn: { flex: 1, backgroundColor: "#16A34A", borderRadius: 10, minHeight: 38, alignItems: "center", justifyContent: "center" },
  whatsappBtnLabel: { color: "#FFFFFF", fontSize: 12, fontWeight: "900" },
  outlineBtn: { flex: 1, borderWidth: 1, borderRadius: 10, minHeight: 38, alignItems: "center", justifyContent: "center" },
  outlineBtnLabel: { fontSize: 12, fontWeight: "800" },
  blueBtn: { flex: 1, backgroundColor: "#EEF2FF", borderRadius: 10, minHeight: 38, alignItems: "center", justifyContent: "center" },
  blueBtnLabel: { color: "#4F46E5", fontSize: 12, fontWeight: "800" },
});
