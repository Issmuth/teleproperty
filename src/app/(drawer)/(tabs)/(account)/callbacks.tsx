import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { useRouter } from "expo-router";
import {
  Briefcase,
  Building2,
  CirclePlus,
  Clock,
  Hotel,
  PhoneCall,
  User,
  Wrench,
  X,
} from "lucide-react-native";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Category = "inquiry" | "broker" | "service" | "hotel";

const categoryOptions: { id: Category; label: string; Icon: any }[] = [
  { id: "inquiry", label: "Property Inquiry", Icon: Building2 },
  { id: "broker", label: "Broker Callback", Icon: Briefcase },
  { id: "service", label: "Home Service", Icon: Wrench },
  { id: "hotel", label: "Hotel Booking", Icon: Hotel },
];

type CallbackItem = {
  id: string;
  type: Category;
  titleKey: string;
  subtitleKey?: string;
  whenKey: string;
  status: "pending" | "called" | "closed";
  phone: string;
};

const sample: CallbackItem[] = [
  {
    id: "cb1",
    type: "inquiry",
    titleKey: "account.callbacks.sample.inquiry.title",
    subtitleKey: "account.callbacks.sample.inquiry.subtitle",
    whenKey: "account.callbacks.sample.today915",
    status: "pending",
    phone: "+251 911 234 567",
  },
  {
    id: "cb2",
    type: "broker",
    titleKey: "account.callbacks.sample.broker.title",
    subtitleKey: "account.callbacks.sample.broker.subtitle",
    whenKey: "account.callbacks.sample.today1100",
    status: "pending",
    phone: "+251 922 345 678",
  },
  {
    id: "cb3",
    type: "service",
    titleKey: "account.callbacks.sample.service.title",
    subtitleKey: "account.callbacks.sample.service.subtitle",
    whenKey: "account.callbacks.sample.yesterday",
    status: "called",
    phone: "+251 933 456 789",
  },
  {
    id: "cb4",
    type: "hotel",
    titleKey: "account.callbacks.sample.hotel.title",
    subtitleKey: "account.callbacks.sample.hotel.subtitle",
    whenKey: "account.callbacks.sample.twoDaysAgo",
    status: "closed",
    phone: "+251 944 567 890",
  },
];

export default function CallbacksScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { colors } = useAppTheme();
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("inquiry");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState("");

  function renderTypeIcon(type: Category) {
    const opt = categoryOptions.find((c) => c.id === type);
    if (!opt) return <User size={20} color={colors.activeText} />;
    const Icon = opt.Icon;
    return <Icon size={20} color={colors.activeText} />;
  }

  function StatusBadge({ status }: { status: CallbackItem["status"] }) {
    const bg =
      status === "pending"
        ? "rgba(245,158,11,0.16)"
        : status === "called"
          ? "rgba(34,197,94,0.16)"
          : colors.surfaceMuted;
    const color =
      status === "pending"
        ? "#D97706"
        : status === "called"
          ? colors.activeText
          : colors.textMuted;
    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Clock size={11} color={color} />
        <Text style={[styles.statusLabel, { color }]}>
          {t(`account.callbacks.status.${status}`)}
        </Text>
      </View>
    );
  }

  function renderItem({ item }: { item: CallbackItem }) {
    return (
      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <View style={styles.cardHeader}>
          <View style={styles.leftRow}>
            <View style={[styles.iconWrap, { backgroundColor: colors.surfaceMuted }]}>
              {renderTypeIcon(item.type)}
            </View>
            <View style={styles.cardCopy}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>
                {t(item.titleKey)}
              </Text>
              {item.subtitleKey ? (
                <View style={styles.subtitleRow}>
                  <Text style={[styles.cardSubtitle, { color: "#16A34A" }]}>📍</Text>
                  <Text style={[styles.cardSubtitle, { color: colors.textMuted }]}>
                    {t(item.subtitleKey)}
                  </Text>
                </View>
              ) : null}
              <Text style={[styles.cardTime, { color: colors.textMuted }]}>
                {t(item.whenKey)}
              </Text>
            </View>
          </View>
          <StatusBadge status={item.status} />
        </View>

        <View style={styles.cardFooter}>
          <Pressable style={[styles.callButton, { backgroundColor: "#16A34A" }]}>
            <PhoneCall size={16} color="#FFFFFF" />
            <Text style={styles.callText}>{item.phone}</Text>
          </Pressable>
          <Pressable style={[styles.cancelButton, { backgroundColor: "#FEF2F2", borderColor: "#FECACA", borderWidth: 1 }]}>
            <X size={14} color="#EF4444" />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backText, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t("account.callbacks.title")}
        </Text>
        <Pressable
          style={styles.requestBtn}
          onPress={() => setShowForm((v) => !v)}
        >
          <CirclePlus size={15} color="#FFFFFF" />
          <Text style={styles.requestLabel}>{t("account.callbacks.request")}</Text>
        </Pressable>
      </View>

      <FlatList
        data={sample}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          showForm ? (
            <View style={[styles.formCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              {/* Form header */}
              <View style={styles.formHeader}>
                <Text style={[styles.formTitle, { color: colors.text }]}>
                  New Callback Request
                </Text>
                <Pressable onPress={() => setShowForm(false)}>
                  <X size={18} color={colors.textMuted} />
                </Pressable>
              </View>

              {/* Category */}
              <Text style={[styles.fieldLabel, { color: colors.text }]}>Category</Text>
              <View style={styles.categoryGrid}>
                {categoryOptions.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const Icon = cat.Icon;
                  return (
                    <Pressable
                      key={cat.id}
                      onPress={() => setSelectedCategory(cat.id)}
                      style={[
                        styles.categoryChip,
                        {
                          borderColor: isSelected ? "#16A34A" : colors.border,
                          backgroundColor: isSelected ? "#16A34A" : colors.background,
                        },
                      ]}
                    >
                      <Icon size={14} color={isSelected ? "#FFFFFF" : colors.textMuted} />
                      <Text style={[styles.categoryLabel, { color: isSelected ? "#FFFFFF" : colors.text }]}>
                        {cat.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              {/* Details */}
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Details (optional)
              </Text>
              <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput
                  value={details}
                  onChangeText={setDetails}
                  placeholder="e.g. 3BR Villa in Bole"
                  placeholderTextColor={colors.textMuted}
                  style={[styles.input, { color: colors.text }]}
                />
              </View>

              {/* Phone */}
              <Text style={[styles.fieldLabel, { color: colors.text }]}>
                Your Phone Number
              </Text>
              <View style={[styles.inputWrap, { borderColor: colors.border, backgroundColor: colors.background }]}>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+251 9X XXX XXXX"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="phone-pad"
                  style={[styles.input, { color: colors.text }]}
                />
              </View>

              {/* Submit */}
              <Pressable
                style={styles.submitBtn}
                onPress={() => setShowForm(false)}
              >
                <Text style={styles.submitBtnLabel}>Submit Callback Request</Text>
              </Pressable>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    height: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  headerTitle: { flex: 1, fontWeight: "900", fontSize: 17 },
  requestBtn: {
    backgroundColor: "#16A34A",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  requestLabel: { color: "#FFFFFF", fontWeight: "800", fontSize: 13 },
  list: { padding: 16, paddingBottom: 120, gap: 12 },

  // Form card
  formCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    gap: 12,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formTitle: { fontSize: 16, fontWeight: "900" },
  fieldLabel: { fontSize: 13, fontWeight: "900" },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryChip: {
    width: "47%",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  categoryLabel: { fontSize: 13, fontWeight: "700", flex: 1 },
  inputWrap: {
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 48,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  input: { fontSize: 14, fontWeight: "600" },
  submitBtn: {
    backgroundColor: "#16A34A",
    borderRadius: 14,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  submitBtnLabel: { color: "#FFFFFF", fontSize: 14, fontWeight: "900" },

  // List cards
  card: {
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    marginBottom: 4,
    gap: 12,
  },
  cardHeader: { flexDirection: "row", alignItems: "flex-start" },
  leftRow: { flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 12 },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardCopy: { flex: 1 },
  cardTitle: { fontWeight: "900", fontSize: 14 },
  subtitleRow: { flexDirection: "row", alignItems: "center", gap: 3, marginTop: 3 },
  cardSubtitle: { fontSize: 12, fontWeight: "600" },
  cardTime: { marginTop: 3, fontSize: 12, fontWeight: "600" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  statusLabel: { fontWeight: "800", fontSize: 12 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 8 },
  callButton: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  callText: { color: "#FFFFFF", fontWeight: "900", fontSize: 14 },
  cancelButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
