import { Pressable, StyleSheet, Text, View } from "react-native";

import { supportedLocales, useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function SettingsScreen() {
  const { locale, selectedLocale, setLocale, t } = useI18n();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.kicker, { color: colors.textMuted }]}>
          {t("common.appName")}
        </Text>
        <Text style={[styles.title, { color: colors.text }]}>
          {t("settings.title")}
        </Text>
        <Text style={[styles.description, { color: colors.textMuted }]}>
          {t("settings.description")}
        </Text>

        <View style={styles.languageSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {t("settings.languageSectionTitle")}
          </Text>

          <Pressable
            onPress={() => setLocale(null)}
            style={({ pressed }) => [
              styles.option,
              { backgroundColor: colors.surface, borderColor: colors.border },
              selectedLocale === null ? styles.optionActive : null,
              pressed ? styles.optionPressed : null,
            ]}
          >
            <Text
              style={[
                styles.optionLabel,
                { color: colors.text },
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
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                  isActive ? styles.optionActive : null,
                  pressed ? styles.optionPressed : null,
                ]}
              >
                <Text
                  style={[
                    styles.optionLabel,
                    { color: colors.text },
                    isActive ? styles.optionLabelActive : null,
                  ]}
                >
                  {t(`languages.${localeCode}`)}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={[styles.currentLanguage, { color: colors.textMuted }]}>
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
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderWidth: 1,
    gap: 10,
  },
  kicker: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 8,
  },
  languageSection: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 2,
  },
  option: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionActive: {
    borderColor: "#0B8F55",
    backgroundColor: "#ECFDF5",
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  optionLabelActive: {
    color: "#0A7A4A",
  },
  currentLanguage: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 13,
  },
});
