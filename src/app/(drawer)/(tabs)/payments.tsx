import { PayOptionsCard } from "@/components/molecules/payments/pay-options-card";
import {
    HistoryItem,
    PaymentHistory,
} from "@/components/molecules/payments/payment-history";
import { RewardsCard } from "@/components/molecules/payments/rewards-card";
import { useI18n } from "@/i18n";
import { ScrollView, StyleSheet, View } from "react-native";

export default function PaymentsScreen() {
  const { t } = useI18n();

  const history: HistoryItem[] = [
    {
      id: "1",
      title: "Lead Access – Villa Bole",
      date: "Apr 30",
      amount: "ETB 50",
      status: "Paid",
    },
    {
      id: "2",
      title: "Home Cleaning – Kazanchis",
      date: "Apr 28",
      amount: "ETB 350",
      status: "Paid",
    },
    {
      id: "3",
      title: "Pro Subscription – May",
      date: "May 1",
      amount: "ETB 500",
      status: "Active",
    },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerArea}></View>

        <View style={styles.content}>
          <RewardsCard />

          <View style={{ height: 12 }} />

          <PayOptionsCard />

          <PaymentHistory items={history} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 120 },
  headerArea: { paddingHorizontal: 16, paddingTop: 12 },
  content: { gap: 12, padding: 16 },
});
