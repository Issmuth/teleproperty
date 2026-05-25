import { Globe } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { HeaderIconButton } from "@/components/atoms/header-icon-button";
import { supportedLocales, useI18n } from "@/i18n";

export function LanguageDropdown() {
  const { locale, selectedLocale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <HeaderIconButton
        icon={Globe}
        label={t("settings.languageSectionTitle")}
        onPress={() => setOpen(true)}
        style={styles.iconButton}
      />

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.backdrop}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setOpen(false)}
          />

          <View style={styles.menu}>
            <Text style={styles.menuTitle}>
              {t("settings.languageSectionTitle")}
            </Text>

            <Pressable
              onPress={() => setLocale(null)}
              onPressOut={() => setOpen(false)}
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
                  onPressOut={() => setOpen(false)}
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
    backgroundColor: "#F8FAFC",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.16)",
  },
  menu: {
    position: "absolute",
    top: 56,
    right: 16,
    width: 220,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    padding: 12,
    gap: 8,
    shadowColor: "#000",
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
    color: "#64748B",
    paddingHorizontal: 4,
    paddingBottom: 2,
  },
  option: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingVertical: 11,
    paddingHorizontal: 12,
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
    color: "#0F172A",
    fontWeight: "600",
  },
  optionLabelActive: {
    color: "#125FA8",
  },
});
