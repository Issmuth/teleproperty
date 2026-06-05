import { useRouter } from "expo-router";
import { Building2, Mail, Phone, UserRound } from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function BrokerRegisterScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const [brokerName, setBrokerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const isSubmitDisabled =
    !brokerName.trim() || !phoneNumber.trim();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backButton, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <View>
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            {t("account.brokerRegister.title")}
          </Text>
          <Text style={[styles.pageSubtitle, { color: colors.textMuted }]}>
            {t("account.brokerRegister.subtitle")}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("account.brokerRegister.brokerName")}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <UserRound size={16} color={colors.textMuted} />
              <TextInput
                value={brokerName}
                onChangeText={setBrokerName}
                placeholder={t("account.brokerRegister.brokerNamePlaceholder")}
                placeholderTextColor={colors.textMuted}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("account.brokerRegister.companyName")}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Building2 size={16} color={colors.textMuted} />
              <TextInput
                value={companyName}
                onChangeText={setCompanyName}
                placeholder={t("account.brokerRegister.companyNamePlaceholder")}
                placeholderTextColor={colors.textMuted}
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("account.brokerRegister.phoneNumber")}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Phone size={16} color={colors.textMuted} />
              <TextInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder={t("account.brokerRegister.phoneNumberPlaceholder")}
                placeholderTextColor={colors.textMuted}
                keyboardType="phone-pad"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={[styles.label, { color: colors.text }]}>
              {t("account.brokerRegister.email")}
            </Text>
            <View
              style={[
                styles.inputWrap,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
            >
              <Mail size={16} color={colors.textMuted} />
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder={t("account.brokerRegister.emailPlaceholder")}
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                style={[styles.input, { color: colors.text }]}
              />
            </View>
          </View>

          <Pressable
            disabled={isSubmitDisabled}
            onPress={() => router.replace("/broker-dashboard" as never)}
            style={({ pressed }) => [
              styles.submitButton,
              {
                backgroundColor: isSubmitDisabled
                  ? colors.surfaceMuted
                  : colors.activeText,
              },
              pressed && !isSubmitDisabled && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.submitLabel,
                { color: isSubmitDisabled ? colors.textMuted : "#FFFFFF" },
              ]}
            >
              {t("account.brokerRegister.submitButton")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  topBar: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: {
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    marginTop: -2,
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "900",
  },
  pageSubtitle: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 16,
    gap: 14,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
  },
  inputWrap: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  submitButton: {
    marginTop: 4,
    minHeight: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  submitLabel: {
    fontSize: 13,
    fontWeight: "900",
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
});
