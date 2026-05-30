import { useI18n } from "@/i18n";
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
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.optionRow,
        { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
      ]}
    >
      <View
        style={[
          styles.leftIcon,
          { backgroundColor: color ?? palette.blue.primary },
        ]}
      />
      <View style={styles.optionBody}>
        <Text style={[styles.optionTitle, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.optionSubtitle, { color: colors.textMuted }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.optionPriceArea}>
        {price ? (
          <Text style={[styles.optionPrice, { color: colors.text }]}>
            {price}
          </Text>
        ) : (
          <Text style={[styles.optionChevron, { color: colors.iconMuted }]}>
            ›
          </Text>
        )}
      </View>
    </View>
  );
}

export function PayOptionsCard() {
  const { colors } = useAppTheme();
  const { t } = useI18n();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}
    >
      <View style={[styles.header, { backgroundColor: palette.brand.primary }]}>
        <Text style={styles.headerTitle}>{t("payments.payWith")}</Text>
        <Text style={styles.headerSubtitle}>
          {t("payments.payWithSubtitle")}
        </Text>
      </View>

      <View style={styles.optionsList}>
        <OptionRow
          title={t("payments.options.leadAccess.title")}
          subtitle={t("payments.options.leadAccess.subtitle")}
          price="ETB 50"
          color="#60A5FA"
        />
        <OptionRow
          title={t("payments.options.proSubscription.title")}
          subtitle={t("payments.options.proSubscription.subtitle")}
          price="ETB 500/mo"
          color="#C4B5FD"
        />
        <OptionRow
          title={t("payments.options.listProperty.title")}
          subtitle={t("payments.options.listProperty.subtitle")}
          price="ETB 200"
          color="#A7F3D0"
        />
        <OptionRow
          title={t("payments.options.servicePayment.title")}
          subtitle={t("payments.options.servicePayment.subtitle")}
          price={t("payments.options.servicePayment.price")}
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
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
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
  },
});
