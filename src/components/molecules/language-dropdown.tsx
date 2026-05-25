import { Globe } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { HeaderIconButton } from "@/components/atoms/header-icon-button";
import { supportedLocales, useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export function LanguageDropdown() {
  const { locale, selectedLocale, setLocale, t } = useI18n();
  const { colors } = useAppTheme();
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderIconButton
        icon={Globe}
        label={t("settings.languageSectionTitle")}
        onPress={() => setOpen(true)}
        style={styles.iconButton}
        iconColor={colors.activeText}
      />

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={[styles.backdrop, { backgroundColor: colors.shadow }]}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />

          <View
            style={[
              styles.menu,
              { backgroundColor: colors.surface, shadowColor: colors.shadow },
            ]}
          >
            <Text style={[styles.menuTitle, { color: colors.textMuted }]}>
              {t("settings.languageSectionTitle")}
            </Text>

            <Pressable
              onPress={() => {
                setLocale(null);
                setOpen(false);
              }}
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
                  onPress={() => {
                    setLocale(localeCode);
                    setOpen(false);
                  }}
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
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  iconButton: {
    backgroundColor: "transparent",
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 56,
    right: 16,
    width: 220,
    borderRadius: 18,
    padding: 12,
    gap: 8,
    shadowOpacity: 0.16,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 12,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  option: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 11,
    paddingHorizontal: 12,
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
});
