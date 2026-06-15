import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";
import { ChevronDown, Globe } from "lucide-react-native";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "am", label: "አማርኛ", flag: "🇪🇹" },
  { code: "om", label: "Afaan Oromoo", flag: "🇪🇹" },
  { code: "ti", label: "ትግርኛ", flag: "🇪🇹" },
] as const;

type LanguageSelectorProps = {
  light?: boolean;
};

export function LanguageSelector({ light = false }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();
  const { colors } = useAppTheme();
  const [visible, setVisible] = useState(false);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  return (
    <>
      <Pressable
        onPress={() => setVisible(true)}
        style={[
          styles.trigger,
          {
            borderColor: light ? "rgba(255,255,255,0.22)" : colors.border,
            backgroundColor: light ? "rgba(255,255,255,0.16)" : colors.surface,
          },
        ]}
      >
        <Globe
          size={14}
          color={light ? "#FFFFFF" : colors.text}
          strokeWidth={2.5}
        />
        <Text
          style={[
            styles.triggerText,
            { color: light ? "#FFFFFF" : colors.text },
          ]}
        >
          {currentLang.label}
        </Text>
        <ChevronDown
          size={14}
          color={light ? "rgba(255,255,255,0.7)" : colors.textMuted}
          strokeWidth={2.5}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <Pressable
              style={[styles.modal, { backgroundColor: colors.background }]}
              onPress={(e) => e.stopPropagation()}
            >
              <View style={styles.modalHeader}>
                <Globe size={20} color={colors.text} strokeWidth={2.5} />
                <Text style={[styles.modalTitle, { color: colors.text }]}>
                  Select Language
                </Text>
              </View>

              {languages.map((lang) => (
                <Pressable
                  key={lang.code}
                  onPress={() => {
                    setLocale(lang.code);
                    setVisible(false);
                  }}
                  style={[
                    styles.langOption,
                    {
                      backgroundColor:
                        locale === lang.code ? colors.activeSurface : "transparent",
                    },
                  ]}
                >
                  <Text style={styles.flag}>{lang.flag}</Text>
                  <Text
                    style={[
                      styles.langLabel,
                      { color: colors.text },
                      locale === lang.code && { fontWeight: "900" },
                    ]}
                  >
                    {lang.label}
                  </Text>
                  {locale === lang.code && (
                    <View style={styles.checkmark}>
                      <Text style={{ color: colors.activeText, fontSize: 16 }}>
                        ✓
                      </Text>
                    </View>
                  )}
                </Pressable>
              ))}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    minHeight: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  triggerText: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    maxWidth: 320,
  },
  modal: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  langOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    marginBottom: 6,
  },
  flag: {
    fontSize: 20,
    marginRight: 12,
  },
  langLabel: {
    fontSize: 15,
    fontWeight: "600",
    flex: 1,
  },
  checkmark: {
    marginLeft: 8,
  },
});
