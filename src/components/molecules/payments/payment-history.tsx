import { useAppTheme } from "@/theme/app-theme";
import { StyleSheet, Text, View } from "react-native";

export type HistoryItem = {
  id: string;
  title: string;
  date: string;
  amount: string;
  status?: "Paid" | "Active" | "Pending";
};

export function PaymentHistory({ items }: { items: HistoryItem[] }) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <Text style={[styles.header, { color: colors.text }]}>
        Payment History
      </Text>

      {items.map((it) => (
        <View key={it.id} style={styles.row}>
          <View style={styles.meta}>
            <Text style={[styles.title, { color: colors.text }]}>
              {it.title}
            </Text>
            <Text style={[styles.date, { color: colors.textMuted }]}>
              {it.date}
            </Text>
          </View>

          <View style={styles.amountCol}>
            <Text style={[styles.amount, { color: colors.text }]}>
              {it.amount}
            </Text>
            {it.status ? (
              <View
                style={[
                  styles.statusPill,
                  it.status === "Paid" ? styles.paid : styles.active,
                ]}
              >
                <Text style={styles.statusLabel}>{it.status}</Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    marginTop: 12,
  },
  header: {
    fontWeight: "800",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
  },
  meta: {},
  title: {
    fontWeight: "800",
  },
  date: {
    fontSize: 12,
  },
  amountCol: {
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "800",
  },
  statusPill: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusLabel: {
    fontWeight: "700",
    fontSize: 12,
  },
  paid: {
    backgroundColor: "#EEF2FF",
  },
  active: {
    backgroundColor: "#ECFDF5",
  },
});
