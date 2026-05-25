import { Pressable, StyleSheet, Text, View } from "react-native";

import { supportedLocales, useI18n } from "@/i18n";

export default function SettingsScreen() {
  const { locale, selectedLocale, setLocale, t } = useI18n();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.kicker}>{t("common.appName")}</Text>
        <Text style={styles.title}>{t("settings.title")}</Text>
        <Text style={styles.description}>{t("settings.description")}</Text>

        <View style={styles.languageSection}>
          <Text style={styles.sectionTitle}>
            {t("settings.languageSectionTitle")}
          </Text>

          <Pressable
            onPress={() => setLocale(null)}
            style={({ pressed }) => [
              styles.option,
              selectedLocale === null ? styles.optionActive : null,
              pressed ? styles.optionPressed : null,
            ]}
          >
            <Text
              style={[
                styles.optionLabel,
                selectedLocale === null ? styles.optionLabelActive : null,
              ]}
            >
              {t("settings.followSystem")}
            </Text>
          </Pressable>

          {supportedLocales.map((localeCode) => {
            const isActive = selectedLocale === localeCode;

            return (
              <Pressable
                key={localeCode}
                onPress={() => setLocale(localeCode)}
                style={({ pressed }) => [
                  styles.option,
                  isActive ? styles.optionActive : null,
                  pressed ? styles.optionPressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    isActive ? styles.optionLabelActive : null,
                  ]}
                >
                  {t(`languages.${localeCode}`)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.currentLanguage}>
          {t("settings.currentLanguage", {
            language: t(`languages.${locale}`),
          })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F7F8",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
    gap: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#4B5563",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
  languageSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 2,
  },
  option: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionActive: {
    borderColor: "#208AEF",
    backgroundColor: "#E6F4FE",
  },
  optionLabel: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },
  optionLabelActive: {
    color: "#125FA8",
  },
  currentLanguage: {
    marginTop: 10,
    textAlign: "center",
    color: "#4B5563",
    fontSize: 13,
  },
});
