import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import { ChevronLeft, MessageSquareDashed, Star } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ReviewsScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const averageRating = 0;
  const totalReviews = 0;
  const pendingApproval = 0;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <Pressable
          style={[styles.backBtn, { backgroundColor: colors.surfaceMuted }]}
          onPress={() => router.back()}
        >
          <ChevronLeft size={18} color={colors.text} />
        </Pressable>
        <Text style={[styles.backLabel, { color: colors.text }]}>Back</Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>My Reviews</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          Manage and track your reviews
        </Text>

        <View style={styles.statsRow}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              Average Rating
            </Text>
            <View style={styles.ratingRow}>
              <Text style={[styles.statValue, { color: colors.text }]}>
                {averageRating}
              </Text>
              <View style={styles.starsRow}>
                <Star size={14} color={colors.iconMuted} />
                <Star size={14} color={colors.iconMuted} />
                <Star size={14} color={colors.iconMuted} />
                <Star size={14} color={colors.iconMuted} />
                <Star size={14} color={colors.iconMuted} />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              Total Reviews
            </Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {totalReviews}
            </Text>
            <Text style={[styles.pendingText, { color: colors.textMuted }]}>
              {pendingApproval} pending approval
            </Text>
          </View>
        </View>

        <View style={styles.filterRow}>
          <Pressable
            style={[
              styles.filterPill,
              styles.filterActive,
              { backgroundColor: colors.activeSurface },
            ]}
          >
            <Text style={styles.filterActiveLabel}>All (0)</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterPill,
              { backgroundColor: colors.surfaceMuted },
            ]}
          >
            <Text style={styles.filterLabel}>Pending (0)</Text>
          </Pressable>
          <Pressable
            style={[
              styles.filterPill,
              { backgroundColor: colors.surfaceMuted },
            ]}
          >
            <Text style={styles.filterLabel}>Approved (0)</Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.emptyCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.emptyIconWrap,
              { backgroundColor: colors.surfaceMuted },
            ]}
          >
            <MessageSquareDashed size={34} color={colors.iconMuted} />
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No reviews yet.
          </Text>
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            Your reviews will appear here after you submit them.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    height: 60,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    marginLeft: 10,
    fontWeight: "800",
    fontSize: 14,
    color: "#111827",
  },
  content: { padding: 12, gap: 14 },
  title: { fontSize: 18, fontWeight: "900" },
  subtitle: { fontSize: 12 },
  statsRow: { flexDirection: "row", gap: 10 },
  statCard: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    padding: 12,
  },
  statLabel: { fontSize: 12, marginBottom: 10 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  statValue: { fontSize: 22, fontWeight: "900" },
  starsRow: { flexDirection: "row", gap: 2 },
  pendingText: { marginTop: 4, fontSize: 12 },
  filterRow: { flexDirection: "row", gap: 10 },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  filterActive: {},
  filterLabel: { color: "#CBD5E1", fontWeight: "800", fontSize: 12 },
  filterActiveLabel: { color: "#ECFDF5", fontWeight: "800", fontSize: 12 },
  emptyCard: {
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  emptyIconWrap: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emptyTitle: { fontWeight: "800", marginBottom: 4 },
  emptyText: { fontSize: 12, textAlign: "center" },
});
