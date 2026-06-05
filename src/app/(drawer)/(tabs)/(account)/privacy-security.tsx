import { useRouter } from "expo-router";
import {
    ArrowRight,
    EyeOff,
    Lock,
    LogOut,
    MessageCircle,
    Phone,
    Shield,
} from "lucide-react-native";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    View,
} from "react-native";

import { useAppTheme } from "@/theme/app-theme";

export default function PrivacySecurityScreen() {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const [twoStep, setTwoStep] = useState(false);
  const [hidePhone, setHidePhone] = useState(false);
  const [allowWhatsApp, setAllowWhatsApp] = useState(true);
  const [allowCallbacks, setAllowCallbacks] = useState(true);

  const toggleSettings = [
    {
      id: "twoStep",
      icon: Lock,
      iconBg: isDark ? colors.surfaceMuted : "#F1F5F9",
      iconColor: "#64748B",
      title: "Two-Step Verification",
      subtitle: "Require OTP on every login",
      value: twoStep,
      onToggle: setTwoStep,
    },
    {
      id: "hidePhone",
      icon: EyeOff,
      iconBg: isDark ? colors.surfaceMuted : "#F1F5F9",
      iconColor: "#64748B",
      title: "Hide Phone Number",
      subtitle: "Only agents can see your number",
      value: hidePhone,
      onToggle: setHidePhone,
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      iconBg: isDark ? colors.surfaceMuted : "#F1F5F9",
      iconColor: "#64748B",
      title: "Allow WhatsApp Inquiries",
      subtitle: "Receive messages from buyers",
      value: allowWhatsApp,
      onToggle: setAllowWhatsApp,
    },
    {
      id: "callbacks",
      icon: Phone,
      iconBg: isDark ? colors.surfaceMuted : "#F1F5F9",
      iconColor: "#64748B",
      title: "Allow Callback Requests",
      subtitle: "Agents can request to call you",
      value: allowCallbacks,
      onToggle: setAllowCallbacks,
    },
  ] as const;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Top bar */}
      <View style={[styles.topBar, { backgroundColor: colors.background }]}>
        <Pressable
          onPress={() => router.back()}
          style={[styles.backBtn, { backgroundColor: colors.surface }]}
        >
          <Text style={[styles.backLabel, { color: colors.text }]}>‹</Text>
        </Pressable>
        <Text style={[styles.pageTitle, { color: colors.text }]}>
          Privacy &amp; Security
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Section header */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Privacy &amp; Security
          </Text>
          <Text style={[styles.sectionSub, { color: colors.textMuted }]}>
            Manage your account protection settings
          </Text>
        </View>

        {/* Security prompt banner */}
        <View
          style={[
            styles.promptBanner,
            {
              backgroundColor: isDark ? "#3B2800" : "#FFFBEB",
              borderColor: isDark ? "#92400E" : "#FDE68A",
            },
          ]}
        >
          <View style={styles.promptIconWrap}>
            <Shield size={22} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.promptTitle}>Strengthen your security</Text>
            <Text style={styles.promptSub}>
              Enable two-step verification for extra safety.
            </Text>
          </View>
        </View>

        {/* Toggle settings card */}
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          {toggleSettings.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === toggleSettings.length - 1;
            return (
              <View
                key={item.id}
                style={[
                  styles.settingRow,
                  !isLast && {
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  },
                ]}
              >
                <View
                  style={[
                    styles.settingIcon,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Icon size={18} color={item.iconColor} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.settingTitle, { color: colors.text }]}>
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.settingSub, { color: colors.textMuted }]}
                  >
                    {item.subtitle}
                  </Text>
                </View>
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: "#D1D5DB", true: "#16A34A" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            );
          })}
        </View>

        {/* Change Password */}
        <Pressable
          style={[
            styles.card,
            styles.rowCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View
            style={[
              styles.settingIcon,
              {
                backgroundColor: isDark ? colors.surfaceMuted : "#EFF6FF",
              },
            ]}
          >
            <Lock size={18} color="#2563EB" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.settingTitle, { color: colors.text }]}>
              Change Password
            </Text>
            <Text style={[styles.settingSub, { color: colors.textMuted }]}>
              Update your account password
            </Text>
          </View>
          <ArrowRight size={16} color={colors.textMuted} />
        </Pressable>

        {/* Sign out */}
        <Pressable
          style={[
            styles.signOutBtn,
            {
              backgroundColor: isDark ? "#3B0F0F" : "#FEF2F2",
              borderColor: isDark ? "#7F1D1D" : "#FECACA",
            },
          ]}
        >
          <LogOut size={16} color="#EF4444" />
          <Text style={styles.signOutLabel}>Sign Out of Account</Text>
        </Pressable>

        {/* Version */}
        <Text style={[styles.version, { color: colors.textMuted }]}>
          TeleProperty · Version 1.0.0 MVP
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  topBar: {
    paddingTop: 14,
    paddingHorizontal: 16,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  backLabel: { fontSize: 24, lineHeight: 24, fontWeight: "700", marginTop: -2 },
  pageTitle: { fontSize: 18, fontWeight: "900" },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 40,
    gap: 14,
  },
  sectionTitle: { fontSize: 22, fontWeight: "900" },
  sectionSub: { fontSize: 13, fontWeight: "600", marginTop: 3 },

  promptBanner: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  promptIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FEF3C7",
    alignItems: "center",
    justifyContent: "center",
  },
  promptTitle: { color: "#D97706", fontSize: 14, fontWeight: "900" },
  promptSub: {
    color: "#D97706",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 2,
  },

  card: { borderWidth: 1, borderRadius: 18, overflow: "hidden" },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 12,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  settingTitle: { fontSize: 14, fontWeight: "900" },
  settingSub: { fontSize: 12, fontWeight: "600", marginTop: 2 },

  signOutBtn: {
    borderWidth: 1,
    borderRadius: 16,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  signOutLabel: { color: "#EF4444", fontSize: 14, fontWeight: "900" },

  version: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
  },
});
