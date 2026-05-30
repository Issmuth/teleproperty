import { useRouter } from "expo-router";
import { Camera, CheckCircle2, ChevronRight } from "lucide-react-native";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { usePostPropertyDraft } from "@/components/organisms/post-property/post-property-draft-context";
import { PostPropertyShell } from "@/components/organisms/post-property/post-property-shell";
import { useI18n } from "@/i18n";
import { useAppTheme } from "@/theme/app-theme";

export default function PostPropertyStep3() {
  const { colors } = useAppTheme();
  const { t } = useI18n();
  const router = useRouter();
  const { draft, updateDraft } = usePostPropertyDraft();

  return (
    <PostPropertyShell
      step={3}
      title={t("property.postProperty.step3.title")}
      subtitle={t("property.postProperty.step3.subtitle")}
      footer={
        <Pressable
          onPress={() => router.replace("/" as never)}
          style={[styles.primaryButton, { backgroundColor: colors.activeText }]}
        >
          <View style={styles.primaryButtonContent}>
            <Text style={styles.primaryLabel}>
              {t("property.postProperty.reviewPackages")}
            </Text>
            <ChevronRight size={16} color="#FFFFFF" />
          </View>
        </Pressable>
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>
            {t("property.postProperty.contactOptions")}
          </Text>

          <Field
            label={t("property.postProperty.fields.whatsAppNumber")}
            value={draft.whatsapp}
            onChangeText={(value) => updateDraft({ whatsapp: value })}
            placeholder={t("property.postProperty.placeholders.whatsapp")}
            prefix="WA"
          />
          <Field
            label={t("property.postProperty.fields.telegram")}
            value={draft.telegram}
            onChangeText={(value) => updateDraft({ telegram: value })}
            placeholder={t("property.postProperty.placeholders.telegram")}
            prefix="TG"
          />
          <Field
            label={t("property.postProperty.fields.contactEmail")}
            value={draft.email}
            onChangeText={(value) => updateDraft({ email: value })}
            placeholder={t("property.postProperty.placeholders.email")}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>
            {t("property.postProperty.fields.description")}
          </Text>
          <TextInput
            value={draft.description}
            onChangeText={(value) => updateDraft({ description: value })}
            placeholder={t("property.postProperty.placeholders.description")}
            placeholderTextColor={colors.textMuted}
            multiline
            style={[
              styles.descriptionInput,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              },
            ]}
          />
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>
            {t("property.postProperty.uploadPhotos")}
          </Text>
          <Pressable
            style={[
              styles.uploadBox,
              {
                borderColor: colors.border,
                backgroundColor: colors.surfaceMuted,
              },
            ]}
          >
            <Camera size={24} color={colors.textMuted} />
            <Text style={[styles.uploadTitle, { color: colors.text }]}>
              {t("property.postProperty.tapToUpload")}
            </Text>
            <Text style={[styles.uploadSub, { color: colors.textMuted }]}>
              {t("property.postProperty.maxPhotos")}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.label, { color: colors.text }]}>
            {t("property.postProperty.verificationOptional")}
          </Text>
          <View style={styles.radioList}>
            {[
              {
                key: "owner-id",
                label: t("property.postProperty.verification.ownerId"),
              },
              {
                key: "broker-license",
                label: t("property.postProperty.verification.brokerLicense"),
              },
              {
                key: "developer-document",
                label: t(
                  "property.postProperty.verification.developerDocument",
                ),
              },
            ].map((item) => {
              const selected = draft.verificationType === item.key;

              return (
                <Pressable
                  key={item.key}
                  onPress={() =>
                    updateDraft({
                      verificationType:
                        item.key as typeof draft.verificationType,
                    })
                  }
                  style={[
                    styles.radioItem,
                    {
                      backgroundColor: selected
                        ? colors.activeSurface
                        : colors.surface,
                      borderColor: selected ? colors.activeText : colors.border,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      {
                        borderColor: selected
                          ? colors.activeText
                          : colors.textMuted,
                      },
                    ]}
                  >
                    {selected ? (
                      <CheckCircle2 size={13} color={colors.activeText} />
                    ) : null}
                  </View>
                  <Text style={[styles.radioLabel, { color: colors.text }]}>
                    {item.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </PostPropertyShell>
  );
}

function Field({
  label,
  value,
  onChangeText,
  placeholder,
  prefix,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  prefix?: string;
}) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.fieldGroup}>
      <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        {prefix ? (
          <View
            style={[
              styles.prefixBox,
              { backgroundColor: colors.activeSurface },
            ]}
          >
            <Text style={[styles.prefixText, { color: colors.activeText }]}>
              {prefix}
            </Text>
          </View>
        ) : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          style={[styles.input, { color: colors.text }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    paddingBottom: 8,
    gap: 12,
  },
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 14,
    gap: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
  },
  fieldGroup: {
    gap: 8,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "800",
  },
  inputRow: {
    minHeight: 46,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  prefixBox: {
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  prefixText: {
    fontSize: 12,
    fontWeight: "900",
  },
  input: {
    flex: 1,
    minHeight: 44,
    fontSize: 14,
    fontWeight: "600",
  },
  descriptionInput: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingTop: 14,
    textAlignVertical: "top",
    fontSize: 14,
    fontWeight: "600",
  },
  uploadBox: {
    minHeight: 132,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 16,
  },
  uploadTitle: {
    fontSize: 14,
    fontWeight: "900",
    textAlign: "center",
  },
  uploadSub: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  radioList: {
    gap: 8,
  },
  radioItem: {
    minHeight: 46,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
  },
  primaryButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  primaryLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },
});
