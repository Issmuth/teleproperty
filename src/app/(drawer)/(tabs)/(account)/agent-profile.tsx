import { sampleAgents, type AgentProfile } from "@/data/agent-profile";
import { useAppTheme } from "@/theme/app-theme";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { CommonActions } from "expo-router/build/react-navigation";
import {
  BadgeCheck,
  ChevronLeft,
  Clock,
  Globe,
  MessageCircle,
  Phone,
  Star
} from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

function findAgent(id?: string): AgentProfile {
  if (!id) return sampleAgents["agent-1"];
  return sampleAgents[id] ?? sampleAgents["agent-1"];
}

function StatCard({ label, value, colors }: { label: string; value: string | number; colors: any }) {
  return (
    <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: colors.textMuted }]}>{label}</Text>
    </View>
  );
}

export default function AgentProfileScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const agent = useMemo(() => findAgent(id), [id]);

  const typeLabel = agent.type === "developer" ? "Developer" : agent.type === "broker" ? "Broker" : "Agent";

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes:[{name: '(accounts)'}]
              })
            )
            router.back()
          }}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <ChevronLeft size={20} color={colors.text} strokeWidth={2.5} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {typeLabel} Profile
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={[styles.topCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={[styles.avatar, { backgroundColor: colors.activeText }]}>
            <Text style={styles.avatarText}>
              {agent.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.text }]}>{agent.name}</Text>
            {agent.verified && (
              <BadgeCheck size={20} color="#16A34A" fill="#16A34A" />
            )}
          </View>

          <Text style={[styles.typeLabel, { color: colors.textMuted }]}>
            {typeLabel}
          </Text>

          <View style={styles.ratingRow}>
            <Star size={16} color="#F59E0B" fill="#F59E0B" strokeWidth={2} />
            <Text style={[styles.ratingText, { color: colors.text }]}>
              {agent.rating}
            </Text>
            <Text style={[styles.reviewsText, { color: colors.textMuted }]}>
              ({agent.totalReviews} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <StatCard label="Active Listings" value={agent.activeListings} colors={colors} />
          <StatCard label="Sold Properties" value={agent.soldProperties} colors={colors} />
          <StatCard label="Years Experience" value={agent.yearsExperience} colors={colors} />
          <StatCard label="Response Rate" value={agent.responseRate} colors={colors} />
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>About</Text>
          <Text style={[styles.bioText, { color: colors.textMuted }]}>{agent.bio}</Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Specialties</Text>
          <View style={styles.chipsWrap}>
            {agent.specialties.map((specialty) => (
              <View key={specialty} style={[styles.chip, { backgroundColor: colors.surfaceMuted }]}>
                <Text style={[styles.chipText, { color: colors.text }]}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Contact Info</Text>
          <View style={styles.infoRows}>
            <View style={styles.infoRow}>
              <View style={[styles.iconCircle, { backgroundColor: colors.surfaceMuted }]}>
                <Clock size={16} color={colors.text} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Response Time</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{agent.responseTime}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={[styles.iconCircle, { backgroundColor: colors.surfaceMuted }]}>
                <Globe size={16} color={colors.text} strokeWidth={2} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>Languages</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {agent.languages.join(", ")}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionBtn, styles.callBtn]}>
            <Phone size={18} color="#FFF" strokeWidth={2.5} />
            <Text style={styles.actionBtnText}>Call</Text>
          </Pressable>

          <Pressable style={[styles.actionBtn, styles.messageBtn]}>
            <MessageCircle size={18} color="#FFF" strokeWidth={2.5} />
            <Text style={styles.actionBtnText}>Message</Text>
          </Pressable>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 18, fontWeight: "900" },
  scroll: { paddingHorizontal: 16, paddingTop: 16, gap: 14, paddingBottom: 40 },

  topCard: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 24,
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  avatarText: { color: "#FFF", fontSize: 32, fontWeight: "900" },
  nameRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  name: { fontSize: 22, fontWeight: "900" },
  typeLabel: { fontSize: 14, fontWeight: "600" },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 6 },
  ratingText: { fontSize: 15, fontWeight: "900" },
  reviewsText: { fontSize: 13, fontWeight: "600" },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    flex: 1,
    minWidth: "47%",
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statValue: { fontSize: 24, fontWeight: "900" },
  statLabel: { fontSize: 12, fontWeight: "600", textAlign: "center" },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 18,
    gap: 14,
  },
  cardTitle: { fontSize: 16, fontWeight: "900" },
  bioText: { fontSize: 14, fontWeight: "500", lineHeight: 21 },

  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8 },
  chipText: { fontSize: 13, fontWeight: "700" },

  infoRows: { gap: 16 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: { fontSize: 12, fontWeight: "600", marginBottom: 2 },
  infoValue: { fontSize: 14, fontWeight: "700" },

  actionsRow: { flexDirection: "row", gap: 12, marginTop: 6 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderRadius: 14,
    minHeight: 52,
  },
  callBtn: { backgroundColor: "#16A34A" },
  messageBtn: { backgroundColor: "#3B82F6" },
  actionBtnText: { color: "#FFF", fontSize: 15, fontWeight: "900" },

  bottomSpacer: { height: 20 },
});
