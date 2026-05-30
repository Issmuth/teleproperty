import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import { Briefcase, Clock, PhoneCall, User, X } from "lucide-react-native";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type CallbackItem = {
  id: string;
  type: "inquiry" | "broker" | "service" | "hotel";
  title: string;
  subtitle?: string;
  when: string;
  status: "pending" | "called" | "closed";
  phone: string;
};

const sample: CallbackItem[] = [
  {
    id: "cb1",
    type: "inquiry",
    title: "Property Inquiry",
    subtitle: "3BR Villa – Bole",
    when: "Today 09:15",
    status: "pending",
    phone: "+251 911 234 567",
  },
  {
    id: "cb2",
    type: "broker",
    title: "Broker Callback",
    subtitle: "Agent: Samuel Tadesse",
    when: "Today 11:00",
    status: "pending",
    phone: "+251 922 345 678",
  },
  {
    id: "cb3",
    type: "service",
    title: "Home Cleaning",
    subtitle: "Kazanchis, Addis Ababa",
    when: "Yesterday",
    status: "called",
    phone: "+251 933 456 789",
  },
  {
    id: "cb4",
    type: "hotel",
    title: "Hotel Booking",
    subtitle: "Skylight Hotel – Apr 28",
    when: "2 days ago",
    status: "closed",
    phone: "+251 944 567 890",
  },
];

export default function CallbacksScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors } = useAppTheme();

  function renderIcon(type: CallbackItem["type"]) {
    switch (type) {
      case "inquiry":
        return <User size={20} color={colors.activeText} />;
      case "broker":
        return <Briefcase size={20} color={colors.activeText} />;
      case "service":
        return <Clock size={20} color={colors.activeText} />;
      default:
        return <User size={20} color={colors.activeText} />;
    }
  }

  function StatusBadge({ status }: { status: CallbackItem["status"] }) {
    const bg =
      status === "pending"
        ? "rgba(245, 158, 11, 0.16)"
        : status === "called"
          ? "rgba(34, 197, 94, 0.16)"
          : colors.surfaceMuted;
    const color =
      status === "pending"
        ? "#FBBF24"
        : status === "called"
          ? colors.activeText
          : colors.textMuted;
    return (
      <View style={[styles.status, { backgroundColor: bg }]}>
        <Text style={[styles.statusLabel, { color }]}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Text>
      </View>
    );
  }

  function renderItem({ item }: { item: CallbackItem }) {
    return (
      <View style={styles.card} key={item.id}>
        <View style={styles.cardHeader}>
          <View style={styles.leftRow}>
            <View style={styles.iconWrap}>{renderIcon(item.type)}</View>
            <View style={styles.cardCopy}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              <Text style={styles.cardTime}>{item.when}</Text>
            </View>
          </View>
          <StatusBadge status={item.status} />
        </View>

        <View style={styles.cardFooter}>
          <Pressable style={styles.callButton} onPress={() => {}}>
            <PhoneCall size={16} color="white" />
            <Text style={styles.callText}>{item.phone}</Text>
          </Pressable>
          <Pressable style={styles.cancelButton} onPress={() => {}}>
            <X size={14} color="#EF4444" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={[styles.backText, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          My Callbacks
        </Text>
        <Pressable style={styles.requestBtn} onPress={() => {}}>
          <Text style={styles.requestLabel}>Request Callback</Text>
        </Pressable>
      </View>

      <FlatList
        data={sample}
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
    height: 72,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 20, fontWeight: "800" },
  headerTitle: { flex: 1, fontWeight: "800", fontSize: 16 },
  requestBtn: {
    backgroundColor: "#10B981",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  requestLabel: { color: "white", fontWeight: "800" },
  list: { padding: 16, paddingBottom: 120, gap: 12 },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    minWidth: 0,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCopy: { flex: 1, marginLeft: 12, minWidth: 0, paddingRight: 8 },
  cardTitle: { fontWeight: "800", fontSize: 15, flexShrink: 1 },
  cardSubtitle: { marginTop: 2 },
  cardTime: { marginTop: 4, fontSize: 12 },
  status: {
    maxWidth: 92,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  statusLabel: { fontWeight: "800", fontSize: 12 },
  cardFooter: { marginTop: 12, flexDirection: "row", alignItems: "center" },
  callButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  callText: { color: "white", fontWeight: "800", marginLeft: 6 },
  cancelButton: {
    marginLeft: 8,
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
