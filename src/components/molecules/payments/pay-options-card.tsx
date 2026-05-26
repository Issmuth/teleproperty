import { useAppTheme } from "@/theme/app-theme";
import { palette } from "@/theme/palette";
import { StyleSheet, Text, View } from "react-native";

function OptionRow({
  title,
  subtitle,
  price,
  color,
}: {
  title: string;
  subtitle?: string;
  price?: string;
  color?: string;
}) {
  return (
    <View style={styles.optionRow}>
      <View
        style={[
          styles.leftIcon,
          { backgroundColor: color ?? palette.blue.primary },
        ]}
      />
      <View style={styles.optionBody}>
        <Text style={styles.optionTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.optionSubtitle}>{subtitle}</Text>
        ) : null}
      </View>
      <View style={styles.optionPriceArea}>
        {price ? (
          <Text style={styles.optionPrice}>{price}</Text>
        ) : (
          <Text style={styles.optionChevron}>›</Text>
        )}
      </View>
    </View>
  );
}

export function PayOptionsCard() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { backgroundColor: palette.brand.primary }]}>
        <Text style={styles.headerTitle}>Pay with Telebirr</Text>
        <Text style={styles.headerSubtitle}>
          Fast · Secure · Cashback eligible
        </Text>
      </View>

      <View style={styles.optionsList}>
        <OptionRow
          title="Lead Access"
          subtitle="Unlock property contact details"
          price="ETB 50"
          color="#60A5FA"
        />
        <OptionRow
          title="Pro Subscription"
          subtitle="Unlimited leads · Featured listing"
          price="ETB 500/mo"
          color="#C4B5FD"
        />
        <OptionRow
          title="List Property"
          subtitle="Basic listing (30 days)"
          price="ETB 200"
          color="#A7F3D0"
        />
        <OptionRow
          title="Service Payment"
          subtitle="Pay for booked home services"
          price="Variable"
          color="#FED7AA"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: palette.border.subtle,
  },
  header: {
    padding: 12,
  },
  headerTitle: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 12,
    marginTop: 6,
  },
  optionsList: {
    padding: 12,
    gap: 8,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 12,
    shadowColor: "rgba(0,0,0,0.04)",
    elevation: 1,
  },
  leftIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
  },
  optionBody: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontWeight: "800",
  },
  optionSubtitle: {
    color: palette.text.muted,
    fontSize: 13,
    marginTop: 4,
  },
  optionPriceArea: {
    minWidth: 64,
    alignItems: "flex-end",
  },
  optionPrice: {
    fontWeight: "800",
  },
  optionChevron: {
    fontSize: 20,
    color: palette.text.muted,
  },
});
